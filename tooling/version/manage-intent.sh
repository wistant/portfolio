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

# 2. Remote check (NPM check removed since this is a GitHub project)
# We trust the local branch state and remote tags instead.
REMOTE_TRACK="Stable"

# 3. Intent & Purge check
EXISTING_CHANGESETS=$(find .changeset -name "*.md" ! -name "README.md" 2>/dev/null | wc -l)
if [ "$EXISTING_CHANGESETS" -gt 0 ]; then
  header "Sovereign Intent Manager v4.0"
  warn "Existing release intents found ($EXISTING_CHANGESETS file(s))."
  echo -e "What would you like to do?"
  echo -e "  [c] ${GREEN}Continue${NC} (Add to existing intents)"
  echo -e "  [r] ${YELLOW}Reset${NC}    (Purge everything and start fresh)"
  echo -e "  [q] Quit"
  read -p "Choice: " ACTION
  if [ "$ACTION" == "r" ]; then
    info "Purging existing intents..."
    find .changeset -name "*.md" ! -name "README.md" -delete
    success "Intents purged."
  elif [ "$ACTION" == "q" ]; then
    exit 0
  fi
fi

# 4. Filtered Console
header "Sovereign Intent Manager v4.0"
info "Current Focus: [${YELLOW}${CURRENT_TAG^^}${NC}] | Registry: [${CYAN}${REMOTE_TRACK^^}${NC}]"

echo -e "\nWhat is your next move?"
echo -e "  [i] ${GREEN}Create Intent${NC}    (Stay in ${CURRENT_TAG^^} - Increments 0, 1, 2...)"

# Switch Menu (Only superior tracks)
SWITCH_OPTS=0
if [[ "$CURRENT_RANK" -lt 1 ]]; then echo -e "  [a] ${YELLOW}Switch to Alpha${NC}"; SWITCH_OPTS=$((SWITCH_OPTS+1)); fi
if [[ "$CURRENT_RANK" -lt 2 ]]; then echo -e "  [b] ${YELLOW}Switch to Beta${NC}"; SWITCH_OPTS=$((SWITCH_OPTS+1)); fi
if [[ "$CURRENT_RANK" -lt 3 ]]; then echo -e "  [r] ${YELLOW}Switch to RC${NC}"; SWITCH_OPTS=$((SWITCH_OPTS+1)); fi

if [[ "$CURRENT_RANK" -gt 0 ]]; then
  echo -e "  [x] ${RED}Exit to Stable${NC} (Finalize release)"
fi
echo -e "  [q] Quit"

read -p "Your choice: " CHOICE

case $CHOICE in
  i)
    echo -e "\nIntent level for ${CURRENT_TAG^^}:"
    echo -e "  [1] ${GREEN}Patch${NC} (Bugs)"
    echo -e "  [2] ${GREEN}Minor${NC} (Features)"
    echo -e "  [3] ${GREEN}Major${NC} (Breaking)"
    echo -e "${YELLOW}>> L'orchestrateur va ouvrir Changesets. Vous pourrez y confirmer ce choix et le lier ou non à d'autres paquets.${NC}"
    warn "PACKAGE SELECTION: L'utilitaire officiel va s'ouvrir. Utilisez ESPACE pour sélectionner 'portfolio', puis ENTREE."
    info "Creating changeset..."
    pnpm changeset
    ;;
  a|b|r)
    TAG="alpha"; [[ "$CHOICE" == "b" ]] && TAG="beta"; [[ "$CHOICE" == "r" ]] && TAG="rc"
    NEW_RANK=$(get_rank "$TAG")
    if [ "$NEW_RANK" -le "$CURRENT_RANK" ] && [ "$CURRENT_TAG" != "Stable" ]; then
        error "Illogical switch: Cannot move from ${CURRENT_TAG} to ${TAG}."
    fi
    CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "?")
    info "Switching track: ${CURRENT_TAG} -> ${TAG}..."
    [[ "$CURRENT_TAG" != "Stable" ]] && pnpm changeset pre exit
    pnpm changeset pre enter "$TAG"
    git add .changeset/pre.json
    git commit -m "release: switch ${CURRENT_VERSION} from ${CURRENT_TAG} to ${TAG}"
    success "Successfully moved to ${TAG} track."
    ;;
  x)
    [[ "$CURRENT_RANK" -eq 0 ]] && error "Already in Stable mode."
    warn "Going stable will close the current pre-release cycle."
    read -p "Are you sure? (y/N): " CONFIRM
    if [[ "$CONFIRM" =~ ^([yY][eE][sS]|[yY])$ ]]; then
      CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "?")
      STABLE_VERSION=$(echo "$CURRENT_VERSION" | sed 's/-[a-z]\+\.[0-9]\+//')
      pnpm changeset pre exit
      git add .changeset/pre.json || true
      git commit -m "release: exit ${CURRENT_VERSION} to stable ${STABLE_VERSION}" || true
      success "Returned to STABLE track."
    fi
    ;;
  q|*)
    echo "Operation cancelled."
    exit 0
    ;;
esac

success "Governance cycle completed."
