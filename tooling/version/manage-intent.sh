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

# Define Intent creation function
create_intent() {
  local tag_name="$1"
  echo -e "\nIntent level for ${tag_name^^}:"
  echo -e "  [1] ${GREEN}Patch${NC} (Bugs)"
  echo -e "  [2] ${GREEN}Minor${NC} (Features)"
  echo -e "  [3] ${GREEN}Major${NC} (Breaking)"
  read -p "Choice: " LEVEL
  local level_str="patch"
  [[ "$LEVEL" == "2" ]] && level_str="minor"
  [[ "$LEVEL" == "3" ]] && level_str="major"

  info "Auto-collecting commits since last release tag..."

  # Collect commits since last tag (or all commits if no tag)
  local last_tag=$(git tag -l "v*" --sort=-v:refname | head -n 1)
  local commits=""
  if [[ -n "$last_tag" ]]; then
    commits=$(git log "${last_tag}..HEAD" --pretty=format:"- %s" --no-merges 2>/dev/null || true)
  else
    commits=$(git log --pretty=format:"- %s" --no-merges 2>/dev/null | head -20 || true)
  fi

  if [[ -z "$commits" ]]; then
    commits="- Minor updates and improvements"
  fi

  info "Creating changeset with auto-generated summary..."
  local changeset_file=".changeset/release-$(date +%s).md"
  local pkg_name=$(node -p "require('./package.json').name" 2>/dev/null || echo "portfolio")

  {
    echo "---"
    echo "\"${pkg_name}\": ${level_str}"
    echo "---"
    echo ""
    echo "${commits}"
  } > "$changeset_file"

  success "Changeset created: $changeset_file"
  info "Summary (auto-generated from git log):"
  echo -e "${GRAY}${commits}${NC}"
}

# 4. Filtered Console with dynamic version predictions
header "Sovereign Intent Manager v4.0"
info "Current Focus: [${YELLOW}${CURRENT_TAG^^}${NC}] | Registry: [${CYAN}${REMOTE_TRACK^^}${NC}]"

CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# Pre-calculate track option versions
NEXT_ALPHA=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'prerelease', 'alpha'))" 2>/dev/null || echo "")
NEXT_BETA=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'prerelease', 'beta'))" 2>/dev/null || echo "")
NEXT_RC=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'prerelease', 'rc'))" 2>/dev/null || echo "")
NEXT_STABLE=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'patch'))" 2>/dev/null || echo "")
if [[ "$CURRENT_TAG" != "Stable" ]]; then
  NEXT_STABLE=$(node -e "console.log('${CURRENT_VERSION}'.split('-')[0])" 2>/dev/null || echo "")
fi

echo -e "\nWhat is your next move?"
if [[ "$CURRENT_TAG" != "Stable" ]]; then
  NEXT_SELF=$(node -e "const semver = require('semver'); console.log(semver.inc('${CURRENT_VERSION}', 'prerelease', '${CURRENT_TAG}'))" 2>/dev/null || echo "")
  echo -e "  [i] ${GREEN}Create Intent${NC}    (Stay in ${CURRENT_TAG^^} — Next: ${NEXT_SELF})"
else
  echo -e "  [i] ${GREEN}Create Intent${NC}    (Standard version bump — Patch/Minor/Major)"
fi

# Switch Menu (Only superior tracks)
SWITCH_OPTS=0
if [[ "$CURRENT_RANK" -lt 1 ]]; then 
  echo -e "  [a] ${YELLOW}Switch to Alpha${NC}  (Next: ${NEXT_ALPHA})"
  SWITCH_OPTS=$((SWITCH_OPTS+1))
fi
if [[ "$CURRENT_RANK" -lt 2 ]]; then 
  echo -e "  [b] ${YELLOW}Switch to Beta${NC}   (Next: ${NEXT_BETA})"
  SWITCH_OPTS=$((SWITCH_OPTS+1))
fi
if [[ "$CURRENT_RANK" -lt 3 ]]; then 
  echo -e "  [r] ${YELLOW}Switch to RC${NC}     (Next: ${NEXT_RC})"
  SWITCH_OPTS=$((SWITCH_OPTS+1))
fi

if [[ "$CURRENT_RANK" -gt 0 ]]; then
  echo -e "  [x] ${RED}Exit to Stable${NC}  (Next: ${NEXT_STABLE})"
fi
echo -e "  [q] Quit"

read -p "Your choice: " CHOICE

case $CHOICE in
  i)
    create_intent "$CURRENT_TAG"
    ;;
  a|b|r)
    TAG="alpha"; [[ "$CHOICE" == "b" ]] && TAG="beta"; [[ "$CHOICE" == "r" ]] && TAG="rc"
    NEW_RANK=$(get_rank "$TAG")
    if [ "$NEW_RANK" -le "$CURRENT_RANK" ] && [ "$CURRENT_TAG" != "Stable" ]; then
        error "Illogical switch: Cannot move from ${CURRENT_TAG} to ${TAG}."
    fi
    
    # Calculate prospective version
    PROSPECTIVE_VERSION=""
    [[ "$TAG" == "alpha" ]] && PROSPECTIVE_VERSION="$NEXT_ALPHA"
    [[ "$TAG" == "beta" ]] && PROSPECTIVE_VERSION="$NEXT_BETA"
    [[ "$TAG" == "rc" ]] && PROSPECTIVE_VERSION="$NEXT_RC"

    info "Switching track: ${CURRENT_TAG} -> ${TAG}..."
    [[ "$CURRENT_TAG" != "Stable" ]] && pnpm changeset pre exit
    pnpm changeset pre enter "$TAG"
    git add .changeset/pre.json
    git commit -m "release: switch ${CURRENT_VERSION} from ${CURRENT_TAG} to ${TAG}"
    success "Successfully moved to ${TAG} track (Prospective Version: ${PROSPECTIVE_VERSION})."

    # Prompts immediately to declare an intent for the new track
    echo -e "\nYou are now on the [${YELLOW}${TAG^^}${NC}] pre-release track."
    read -p "Would you like to declare a release intent file (changeset) now? (Y/n) " ADD_INTENT_NOW
    if [[ "$ADD_INTENT_NOW" =~ ^[Yy]$ || -z "$ADD_INTENT_NOW" ]]; then
      create_intent "$TAG"
    fi
    ;;
  x)
    [[ "$CURRENT_RANK" -eq 0 ]] && error "Already in Stable mode."
    warn "Going stable will close the current pre-release cycle."
    read -p "Are you sure? (y/N): " CONFIRM
    if [[ "$CONFIRM" =~ ^([yY][eE][sS]|[yY])$ ]]; then
      STABLE_VERSION=$(echo "$CURRENT_VERSION" | sed 's/-[a-z]\+\.[0-9]\+//')
      pnpm changeset pre exit
      git add .changeset/pre.json || true
      git commit -m "release: exit ${CURRENT_VERSION} to stable ${STABLE_VERSION}" || true
      success "Returned to STABLE track (Target Version: ${STABLE_VERSION})."
    fi
    ;;
  q|*)
    echo "Operation cancelled."
    exit 0
    ;;
esac

success "Governance cycle completed."
