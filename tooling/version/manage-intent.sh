#!/bin/bash
# Shoperzz Sovereign Intent Manager v4.0 (Logical Guard)
# This script ensures rigorous governance by preventing track regressions.

set -e

# Source UI Theme & Helpers
source "$(dirname "$0")/../theme.sh"

# 1. Detection of local track ranking
get_rank() {
  case $1 in
    "alpha") echo 1 ;;
    "beta") echo 2 ;;
    "rc") echo 3 ;;
    "Stable") echo 0 ;;
    *) echo 0 ;;
  esac
}

CURRENT_TAG="Stable"
[[ -f ".changeset/pre.json" ]] && CURRENT_TAG=$(node -p "require('./.changeset/pre.json').tag" 2>/dev/null || echo "Prerelease")
CURRENT_RANK=$(get_rank "$CURRENT_TAG")
CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

REMOTE_TRACK="Stable"

# 3. Intent & Purge check
EXISTING_CHANGESETS=$(find .changeset -name "*.md" ! -name "README.md" 2>/dev/null | wc -l)
if [ "$EXISTING_CHANGESETS" -gt 0 ]; then
  header "Sovereign Intent Manager v4.0"
  warn "Des intentions de release existantes ont été trouvées ($EXISTING_CHANGESETS fichier(s) changeset)."
  echo -e "Que souhaitez-vous faire ?"
  echo -e "  [c] ${GREEN}Continuer${NC} (Conserver les intentions en cours et y ajouter de nouvelles modifications)"
  echo -e "  [r] ${YELLOW}Réinitialiser (Reset)${NC} (Purger toutes les intentions existantes pour repartir à zéro)"
  echo -e "  [q] Quitter le script"
  read -p "Votre choix [c/r/q] : " ACTION
  if [ "$ACTION" == "r" ]; then
    info "Purge des intentions existantes..."
    find .changeset -name "*.md" ! -name "README.md" -delete
    success "Intents purgés avec succès."
  elif [ "$ACTION" == "q" ]; then
    exit 0
  fi
fi

# Define Intent creation function
create_intent() {
  local tag_name="$1"
  
  # Pre-calculate exact versions for the prompt
  local next_patch=""
  local next_minor=""
  local next_major=""
  
  local version_json=$(node -e "
    const semver = require('semver');
    const current = '${CURRENT_VERSION}';
    const tag = '${tag_name}';
    if (tag === 'Stable') {
      console.log(JSON.stringify({
        patch: semver.inc(current, 'patch'),
        minor: semver.inc(current, 'minor'),
        major: semver.inc(current, 'major')
      }));
    } else {
      const hasPrerelease = current.includes('-');
      console.log(JSON.stringify({
        patch: hasPrerelease ? semver.inc(current, 'prerelease', tag) : semver.inc(current, 'prepatch', tag),
        minor: semver.inc(current, 'preminor', tag),
        major: semver.inc(current, 'premajor', tag)
      }));
    }
  " 2>/dev/null || echo "")

  if [[ -n "$version_json" ]]; then
    next_patch=$(node -p "JSON.parse('$version_json').patch" 2>/dev/null || echo "")
    next_minor=$(node -p "JSON.parse('$version_json').minor" 2>/dev/null || echo "")
    next_major=$(node -p "JSON.parse('$version_json').major" 2>/dev/null || echo "")
  fi

  # Fallbacks if node fails
  [[ -z "$next_patch" ]] && next_patch="1.0.1"
  [[ -z "$next_minor" ]] && next_minor="1.1.0"
  [[ -z "$next_major" ]] && next_major="2.0.0"

  echo -e "\nNiveau d'impact des modifications pour le canal [${tag_name^^}] :"
  echo -e "  [1] ${GREEN}Patch${NC} (Corrections de bugs, optimisations mineures — ex: ${CURRENT_VERSION} -> ${next_patch})"
  echo -e "  [2] ${GREEN}Minor${NC} (Nouvelles fonctionnalités rétrocompatibles — ex: ${CURRENT_VERSION} -> ${next_minor})"
  echo -e "  [3] ${GREEN}Major${NC} (Ruptures de compatibilité ou changements majeurs — ex: ${CURRENT_VERSION} -> ${next_major})"
  read -p "Votre choix d'impact [1/2/3] : " LEVEL
  local level_str="patch"
  [[ "$LEVEL" == "2" ]] && level_str="minor"
  [[ "$LEVEL" == "3" ]] && level_str="major"

  info "Collecte automatique des nouveaux commits depuis la dernière release..."

  # Collect commits since last release commit or last tag (fallback to 10 commits if none)
  local last_ref=""
  
  # 1. Search for last release commit hash (ignoring prerelease track switches)
  local last_release_commit=""
  while read -r commit_hash; do
    if [[ -n "$commit_hash" ]]; then
      local commit_msg=$(git log --format="%s" -n 1 "$commit_hash" 2>/dev/null || "")
      if [[ "$commit_msg" != *"switch"* ]]; then
        last_release_commit="$commit_hash"
        break
      fi
    fi
  done < <(git log --grep="^release:" --grep="^chore(release):" --format="%H" 2>/dev/null || true)

  # 2. Search for last tag
  local last_tag=$(git tag -l "v*" --sort=-v:refname | head -n 1 2>/dev/null || true)

  if [[ -n "$last_release_commit" ]]; then
    last_ref="$last_release_commit"
  elif [[ -n "$last_tag" ]]; then
    last_ref="$last_tag"
  fi

  local commits=""
  if [[ -n "$last_ref" ]]; then
    commits=$(git log "${last_ref}..HEAD" --pretty=format:"- %s" --no-merges 2>/dev/null || true)
  else
    commits=$(git log --pretty=format:"- %s" --no-merges 2>/dev/null | head -15 || true)
  fi

  if [[ -z "$commits" ]]; then
    commits="- Minor updates and improvements"
  fi

  info "Création du fichier d'intention changeset..."
  local changeset_file=".changeset/release-$(date +%s).md"
  local pkg_name=$(node -p "require('./package.json').name" 2>/dev/null || echo "portfolio")

  {
    echo "---"
    echo "\"${pkg_name}\": ${level_str}"
    echo "---"
    echo ""
    echo "${commits}"
  } > "$changeset_file"

  success "Fichier d'intention créé avec succès : $changeset_file"
  info "Sommaire généré à partir des commits :"
  echo -e "${GRAY}${commits}${NC}"
}

# 4. Filtered Console with dynamic version predictions
header "Sovereign Intent Manager v4.0"
info "Canal Actuel : [${YELLOW}${CURRENT_TAG^^}${NC}] | Registre : [${CYAN}${REMOTE_TRACK^^}${NC}]"

CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# Pre-calculate track option versions
NEXT_ALPHA=$(node -e "
  const semver = require('semver');
  const current = '${CURRENT_VERSION}';
  const tag = 'alpha';
  const parsed = semver.parse(current);
  if (parsed && parsed.prerelease.length > 0) {
    const base = parsed.major + '.' + parsed.minor + '.' + parsed.patch;
    const index = parsed.prerelease[1];
    const nextIndex = Number(index) + 1;
    console.log(base + '-' + tag + '.' + nextIndex);
  } else {
    console.log(semver.inc(current, 'prepatch', tag));
  }
" 2>/dev/null || echo "")

NEXT_BETA=$(node -e "
  const semver = require('semver');
  const current = '${CURRENT_VERSION}';
  const tag = 'beta';
  const parsed = semver.parse(current);
  if (parsed && parsed.prerelease.length > 0) {
    const base = parsed.major + '.' + parsed.minor + '.' + parsed.patch;
    const index = parsed.prerelease[1];
    const nextIndex = Number(index) + 1;
    console.log(base + '-' + tag + '.' + nextIndex);
  } else {
    console.log(semver.inc(current, 'prepatch', tag));
  }
" 2>/dev/null || echo "")

NEXT_RC=$(node -e "
  const semver = require('semver');
  const current = '${CURRENT_VERSION}';
  const tag = 'rc';
  const parsed = semver.parse(current);
  if (parsed && parsed.prerelease.length > 0) {
    const base = parsed.major + '.' + parsed.minor + '.' + parsed.patch;
    const index = parsed.prerelease[1];
    const nextIndex = Number(index) + 1;
    console.log(base + '-' + tag + '.' + nextIndex);
  } else {
    console.log(semver.inc(current, 'prepatch', tag));
  }
" 2>/dev/null || echo "")

NEXT_STABLE=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'patch'))" 2>/dev/null || echo "")
if [[ "$CURRENT_TAG" != "Stable" ]]; then
  NEXT_STABLE=$(node -e "console.log('${CURRENT_VERSION}'.split('-')[0])" 2>/dev/null || echo "")
fi

echo -e "\n${BOLD}Que souhaitez-vous faire ?${NC}"

if [[ "$CURRENT_TAG" != "Stable" ]]; then
  NEXT_SELF=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'prerelease', '${CURRENT_TAG}'))" 2>/dev/null || echo "")
  echo -e "  [${GREEN}i${NC}] ${GREEN}Déclarer des modifications (Create Intent)${NC}"
  echo -e "      -> Rester sur le canal [${CURRENT_TAG^^}] et incrémenter la version de test actuelle."
  echo -e "      -> Prochaine version après publication : ${YELLOW}${NEXT_SELF}${NC}"
else
  echo -e "  [${GREEN}i${NC}] ${GREEN}Déclarer des modifications (Create Intent)${NC}"
  echo -e "      -> Pour un cycle classique sur la branche principale (Patch/Minor/Major)."
fi

echo -e "\n${BOLD}Changement de canal (Maturation de la version) :${NC}"

if [[ "$CURRENT_RANK" -lt 1 ]]; then 
  echo -e "  [${YELLOW}a${NC}] ${YELLOW}Passer au canal Alpha${NC}"
  echo -e "      -> Démarrer un cycle de pré-release initial pour tester les intégrations."
  echo -e "      -> Première version générée : ${YELLOW}${NEXT_ALPHA}${NC}"
fi

if [[ "$CURRENT_RANK" -lt 2 ]]; then 
  echo -e "  [${YELLOW}b${NC}] ${YELLOW}Passer au canal Beta${NC}"
  echo -e "      -> Figer les fonctionnalités et se concentrer sur la correction de bugs."
  echo -e "      -> Première version générée : ${YELLOW}${NEXT_BETA}${NC}"
fi

if [[ "$CURRENT_RANK" -lt 3 ]]; then 
  echo -e "  [${YELLOW}r${NC}] ${YELLOW}Passer au canal RC (Release Candidate)${NC}"
  echo -e "      -> Version finalisée prête pour la mise en production sous réserve de derniers tests."
  echo -e "      -> Première version générée : ${YELLOW}${NEXT_RC}${NC}"
fi

if [[ "$CURRENT_RANK" -gt 0 ]]; then
  echo -e "  [${RED}x${NC}] ${RED}Sortir vers le canal Stable (Mise en Production)${NC}"
  echo -e "      -> Fermer le cycle de pré-release en cours et publier la version définitive."
  echo -e "      -> Version finale publiée : ${GREEN}${NEXT_STABLE}${NC}"
fi

echo -e "  [${GRAY}q${NC}] Quitter le script sans apporter de modifications."

read -p "Votre choix : " CHOICE

case $CHOICE in
  i)
    create_intent "$CURRENT_TAG"
    ;;
  a|b|r)
    TAG="alpha"; [[ "$CHOICE" == "b" ]] && TAG="beta"; [[ "$CHOICE" == "r" ]] && TAG="rc"
    NEW_RANK=$(get_rank "$TAG")
    if [ "$NEW_RANK" -le "$CURRENT_RANK" ] && [ "$CURRENT_TAG" != "Stable" ]; then
        error "Changement de track illogique : Impossible de rétrograder de ${CURRENT_TAG} à ${TAG}."
    fi
    
    # Calculate prospective version
    PROSPECTIVE_VERSION=""
    [[ "$TAG" == "alpha" ]] && PROSPECTIVE_VERSION="$NEXT_ALPHA"
    [[ "$TAG" == "beta" ]] && PROSPECTIVE_VERSION="$NEXT_BETA"
    [[ "$TAG" == "rc" ]] && PROSPECTIVE_VERSION="$NEXT_RC"

    info "Bascule de canal en cours : ${CURRENT_TAG} -> ${TAG}..."
    [[ "$CURRENT_TAG" != "Stable" ]] && pnpm changeset pre exit
    pnpm changeset pre enter "$TAG"
    git add .changeset/pre.json
    git commit -m "release: switch ${CURRENT_VERSION} from ${CURRENT_TAG} to ${TAG}"
    success "Bascule vers le canal [${TAG^^}] effectuée avec succès (Version prévisionnelle : ${PROSPECTIVE_VERSION})."

    # Prompts immediately to declare an intent for the new track
    echo -e "\nVous êtes maintenant sur le canal [${YELLOW}${TAG^^}${NC}]."
    echo -e "Pour que ce canal génère effectivement la version ${YELLOW}${PROSPECTIVE_VERSION}${NC}, vous devez déclarer une intention de modification (changeset)."
    read -p "Souhaitez-vous déclarer cette intention de modification maintenant ? (Y/n) " ADD_INTENT_NOW
    if [[ "$ADD_INTENT_NOW" =~ ^[Yy]$ || -z "$ADD_INTENT_NOW" ]]; then
      create_intent "$TAG"
    fi
    ;;
  x)
    [[ "$CURRENT_RANK" -eq 0 ]] && error "Déjà sur le canal Stable."
    warn "Sortir vers le canal Stable clôturera définitivement le cycle de pré-release en cours."
    read -p "Êtes-vous sûr de vouloir effectuer cette action ? (y/N) : " CONFIRM
    if [[ "$CONFIRM" =~ ^([yY][eE][sS]|[yY])$ ]]; then
      STABLE_VERSION=$(echo "$CURRENT_VERSION" | sed 's/-[a-z]\+\.[0-9]\+//')
      pnpm changeset pre exit
      git add .changeset/pre.json || true
      git commit -m "release: exit ${CURRENT_VERSION} to stable ${STABLE_VERSION}" || true
      success "Retour au canal STABLE (Version finale : ${STABLE_VERSION})."
    fi
    ;;
  q|*)
    echo "Opération annulée."
    exit 0
    ;;
esac

success "Cycle de gouvernance terminé avec succès."
