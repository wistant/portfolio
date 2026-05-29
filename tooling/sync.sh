#!/usr/bin/env bash
# sync.sh - Smart synchronization script for Wistant portfolio
# Usage: ./tooling/sync.sh [--force] [--branch <name>]
set -euo pipefail

# Source UI Theme & Helpers
source "$(dirname "$0")/theme.sh"

# Arguments
FORCE=false
TARGET_BRANCH=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --force)   FORCE=true; shift ;;
    --branch)  TARGET_BRANCH="$2"; shift 2 ;;
    *)         shift ;;
  esac
done

# Initial Checks
clear
logo

# Check if we are in a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  error "This directory is not a git repository."
  exit 1
fi

# Check if remotes exist
if ! git remote get-url origin > /dev/null 2>&1; then
  error "Remote 'origin' not found. Check your git configuration."
  exit 1
fi

UPSTREAM_EXISTS=true
if ! git remote get-url upstream > /dev/null 2>&1; then
  warn "Remote 'upstream' not found."
  warn "If you are working on a fork, add upstream:"
  echo -e "     ${CYAN}git remote add upstream https://github.com/wistant/portfolio.git${RESET}\n"
  UPSTREAM_EXISTS=false
fi

# Detect Current Local Branch
LOCAL_BRANCH=$(git branch --show-current)

if [[ -z "$LOCAL_BRANCH" ]]; then
  error "You are in 'detached HEAD' mode. Return to a branch before syncing."
  echo -e "     ${CYAN}git checkout dev${RESET}"
  exit 1
fi

info "Current local branch: ${BOLD}$LOCAL_BRANCH${RESET}"

# Check Protected Branches
PROTECTED_BRANCHES=("main" "dev")

if [[ " ${PROTECTED_BRANCHES[*]} " != *" $LOCAL_BRANCH "* ]]; then
  warn "You are on branch '${BOLD}$LOCAL_BRANCH${RESET}' (feature branch)."
  warn "This script syncs main branches. To update your feature branch:"
  echo -e "     ${CYAN}git fetch upstream${RESET}"
  echo -e "     ${CYAN}git rebase upstream/dev${RESET}\n"

  if [[ "$FORCE" != true ]]; then
    read -rp "  Continue anyway? (y/N) " CONFIRM
    if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
      info "Synchronization cancelled."
      exit 0
    fi
  fi
fi

# Check Local Uncommitted Changes
header "Verifying local changes"

if ! git diff --quiet || ! git diff --cached --quiet; then
  warn "You have uncommitted changes:"
  git status --short
  echo ""

  if [[ "$FORCE" != true ]]; then
    error "Commit or stash your changes before syncing."
    echo -e "     ${CYAN}git stash${RESET}          ← set aside temporarily"
    echo -e "     ${CYAN}git stash pop${RESET}      ← restore after sync"
    exit 1
  else
    warn "--force enabled: automatic stash of local changes..."
    git stash push -m "sync.sh auto-stash $(date '+%Y-%m-%d %H:%M:%S')"
    STASHED=true
  fi
else
  success "No pending local changes."
  STASHED=false
fi

# Fetch from remotes
header "Fetching remote data"

info "Fetching from origin..."
git fetch origin --tags --prune 2>/dev/null && success "origin updated" || warn "Could not contact origin"

if [[ "$UPSTREAM_EXISTS" == true ]]; then
  info "Fetching from upstream..."
  git fetch upstream --tags --prune 2>/dev/null && success "upstream updated" || warn "Could not contact upstream"
fi

# Analyze Remote Changes
header "Analyzing remote changes"

REMOTE="upstream"
[[ "$UPSTREAM_EXISTS" == false ]] && REMOTE="origin"

for BRANCH in "${PROTECTED_BRANCHES[@]}"; do
  if git rev-parse --verify "$REMOTE/$BRANCH" > /dev/null 2>&1; then
    LOCAL_HASH=$(git rev-parse "$BRANCH" 2>/dev/null || echo "")
    REMOTE_HASH=$(git rev-parse "$REMOTE/$BRANCH")

    if [[ -z "$LOCAL_HASH" ]]; then
      warn "Branch '$BRANCH' does not exist locally."
      echo -e "     ${CYAN}git checkout -b $BRANCH $REMOTE/$BRANCH${RESET}"
      continue
    fi

    BEHIND=$(git rev-list --count "$BRANCH..$REMOTE/$BRANCH" 2>/dev/null || echo "0")
    AHEAD=$(git rev-list  --count "$REMOTE/$BRANCH..$BRANCH" 2>/dev/null || echo "0")

    if [[ "$BEHIND" -eq 0 && "$AHEAD" -eq 0 ]]; then
      success "Branch '${BOLD}$BRANCH${RESET}' — Up to date"
    elif [[ "$BEHIND" -gt 0 && "$AHEAD" -eq 0 ]]; then
      warn "Branch '${BOLD}$BRANCH${RESET}' — ${BOLD}$BEHIND commit(s) behind${RESET} $REMOTE"
    elif [[ "$AHEAD" -gt 0 && "$BEHIND" -eq 0 ]]; then
      info "Branch '${BOLD}$BRANCH${RESET}' — ${BOLD}$AHEAD commit(s) ahead${RESET} of $REMOTE (not pushed)"
    else
      warn "Branch '${BOLD}$BRANCH${RESET}' — Diverged ($BEHIND behind / $AHEAD ahead) — Rebase required"
    fi
  fi
done

# Detect Version Changes in package.json
header "Detecting version changes"

CHANGED_PACKAGES=()

while IFS= read -r -d '' PKG_FILE; do
  PKG_NAME=$(node -pe "require('$PKG_FILE').name" 2>/dev/null || echo "unknown")
  
  LOCAL_VERSION=$(node -pe "require('$PKG_FILE').version" 2>/dev/null || echo "")
  REMOTE_VERSION=$(git show "$REMOTE/$BRANCH:$PKG_FILE" 2>/dev/null | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).version" 2>/dev/null || echo "")

  if [[ -n "$LOCAL_VERSION" && -n "$REMOTE_VERSION" && "$LOCAL_VERSION" != "$REMOTE_VERSION" ]]; then
    CHANGED_PACKAGES+=("$PKG_NAME : $LOCAL_VERSION → $REMOTE_VERSION")
  fi
done < <(find . -name "package.json" \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -print0 2>/dev/null)

if [[ ${#CHANGED_PACKAGES[@]} -gt 0 ]]; then
  warn "Versions have changed on $REMOTE since your last sync:"
  for PKG in "${CHANGED_PACKAGES[@]}"; do
    echo -e "  ${YELLOW}→${RESET} $PKG"
  done
  echo ""
  info "Run 'pnpm install' after sync to update your dependencies."
fi

# Detect new tags (new releases)
NEW_TAGS=$(git log --oneline "$LOCAL_BRANCH...$REMOTE/main" --tags --simplify-by-decoration 2>/dev/null | head -5)
if [[ -n "$NEW_TAGS" ]]; then
  info "New release tags detected:"
  echo "$NEW_TAGS" | while read -r line; do
    echo -e "  ${CYAN}→${RESET} $line"
  done
fi

# Effective Synchronization
header "Synchronization"

SYNC_BRANCH="${TARGET_BRANCH:-$LOCAL_BRANCH}"

# If on a protected branch, rebase
if [[ " ${PROTECTED_BRANCHES[*]} " == *" $SYNC_BRANCH "* ]]; then
  if git rev-parse --verify "$REMOTE/$SYNC_BRANCH" > /dev/null 2>&1; then
    info "Rebasing '${BOLD}$SYNC_BRANCH${RESET}' on $REMOTE/$SYNC_BRANCH..."

    if git rebase "$REMOTE/$SYNC_BRANCH"; then
      success "Branch '${BOLD}$SYNC_BRANCH${RESET}' successfully synchronized."
    else
      error "Conflicts during rebase. Resolve conflicts then run:"
      echo -e "     ${CYAN}git rebase --continue${RESET}"
      echo -e "     ${CYAN}git rebase --abort${RESET}      ← to cancel"
      exit 1
    fi
  fi
fi

# Backport: pull version bumps from main → dev
# The Changesets CI bot commits version bumps directly to main after each
# release. This step automatically brings those changes back to dev.
if [[ "$SYNC_BRANCH" == "dev" ]]; then
  COMMITS_FROM_MAIN=$(git rev-list --count "HEAD..origin/main" 2>/dev/null || echo "0")

  if [[ "$COMMITS_FROM_MAIN" -gt 0 ]]; then
    info "Backporting $COMMITS_FROM_MAIN bot commit(s) from origin/main → dev..."
    info "(These are version bumps generated by the Changesets CI robot)"

    # Merge main into dev. On conflict in package.json/CHANGELOG, prefer main.
    if git merge origin/main \
        --no-edit \
        -m "chore(sync): backport version bumps from main to dev" \
        -X theirs 2>/dev/null; then
      success "Version bumps from main successfully backported to dev."
    else
      warn "Merge conflict detected. Resolving package.json conflicts in favor of main..."
      git checkout origin/main -- $(git diff --name-only --diff-filter=U | grep "package.json" || true) 2>/dev/null || true
      git add . && git commit -m "chore(sync): resolve version conflicts in favor of main" || true
      success "Conflicts resolved automatically."
    fi
  else
    success "dev is already up to date with main. No backport needed."
  fi
fi

# Restore stash if necessary
if [[ "${STASHED:-false}" == true ]]; then
  header "Restoring local changes"
  if git stash pop; then
    success "Local changes restored."
  else
    warn "Conflict during stash restoration."
    echo -e "     ${CYAN}git stash list${RESET}    ← view your stashes"
    echo -e "     ${CYAN}git stash pop${RESET}     ← retry manually"
  fi
fi

# Check if pnpm install is needed
if [[ ${#CHANGED_PACKAGES[@]} -gt 0 ]]; then
  echo ""
  read -rp "  Some packages have changed. Run 'pnpm install' now? (Y/n) " INSTALL
  if [[ "$INSTALL" != "n" && "$INSTALL" != "N" ]]; then
    info "Installing dependencies..."
    pnpm install && success "Dependencies updated."
  fi
fi

# Final Summary
header "Synchronization Complete"
divider
info "Local branch: ${BOLD}$LOCAL_BRANCH${RESET}"
success "Repository synchronized with $REMOTE."
echo ""
