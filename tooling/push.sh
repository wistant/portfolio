#!/usr/bin/env bash
# push.sh - Elite Push Orchestrator for Shoperzz Monorepo

set -euo pipefail

# Source UI Theme & Helpers
source "$(dirname "$0")/theme.sh"


# Arguments
SKIP_VERIFY=false
[[ "$*" == *"--no-verify"* ]] && SKIP_VERIFY=true

clear
logo


# Detection of current track
CURRENT_TRACK="Stable"
[[ -f ".changeset/pre.json" ]] && CURRENT_TRACK=$(node -p "require('./.changeset/pre.json').tag" 2>/dev/null || echo "Prerelease")

# Step 0: Version & Git Audit
header "Step 0: Version & Git Audit"
LOCAL_VERSION=$(node -p "require('./package.json').version")
info "Detected local version: $LOCAL_VERSION"

info "Synchronizing tags from GitHub..."
LOCAL_BRANCH=$(git branch --show-current)
if [[ -z "$LOCAL_BRANCH" ]]; then
  error "You are in 'detached HEAD' mode. Please return to a branch."
  exit 1
fi

# 2. Call Audit Module (Verifies GitHub Tags vs Local)
bash ./tooling/audit/version-audit.sh || {
  divider
  error "ABORTED: Version inconsistency detected."
  info "Please resolve the conflict manually or via 'git pull' before pushing."
  exit 1
}

# Step 1: Formatting Audit (Surgical)
header "Step 1: Formatting Audit"

FILES_DIRTY_BEFORE=$(git diff --name-only)
info "Running Prettier on modified files..."
pnpm format > /dev/null 2>&1 || true
FILES_DIRTY_AFTER=$(git diff --name-only)

# Identify files fixed by Prettier
FILES_FIXED=$(comm -13 <(echo "$FILES_DIRTY_BEFORE" | sort) <(echo "$FILES_DIRTY_AFTER" | sort))

if [[ -n "$FILES_FIXED" ]]; then
  warn "Formatting corrections applied to:"
  echo -e "${YELLOW}$FILES_FIXED${RESET}"
    read -rp "     Commit these style fixes automatically? (Y/n) " AUTO_COMMIT_FORMAT
    if [[ "$AUTO_COMMIT_FORMAT" != "n" && "$AUTO_COMMIT_FORMAT" != "N" ]]; then
      echo "$FILES_FIXED" | xargs git add
      
      FILE_COUNT=$(echo "$FILES_FIXED" | wc -l)
      FIRST_FILE=$(echo "$FILES_FIXED" | head -n 1 | awk -F/ '{print $NF}')
      
      if [ "$FILE_COUNT" -eq 1 ]; then
        COMMIT_MSG="style: reformat $FIRST_FILE"
      elif [ "$FILE_COUNT" -eq 2 ]; then
        SECOND_FILE=$(echo "$FILES_FIXED" | sed -n '2p' | awk -F/ '{print $NF}')
        COMMIT_MSG="style: reformat $FIRST_FILE and $SECOND_FILE"
      else
        COMMIT_MSG="style: reformat $FIRST_FILE and $((FILE_COUNT - 1)) other files"
      fi
      
      git commit -m "$COMMIT_MSG"
      success "Formatting committed: $COMMIT_MSG"
    else
    error "Push blocked: Style fixes must be committed."
    exit 1
  fi
fi

# Step 2: Intent & Release Management
header "Step 2: Intent & Release Management (Changesets)"

# Detect existing changesets
CHANGESETS=$(ls .changeset/*.md 2>/dev/null | grep -v "README.md" || true)

if [[ -z "$CHANGESETS" ]]; then
  warn "No changeset detected. Your changes will NOT be versioned."
  read -p "Would you like to declare a release intent now? (Y/n) " ADD_INTENT
  if [[ "$ADD_INTENT" =~ ^[Yy]$ ]]; then
    # Call Intent Module
    bash ./tooling/version/manage-intent.sh
    
    # Get predicted version for the commit message
    # We keep the full string to show exactly where we are going (including -beta.0)
    NEXT_VERSION=$(./tooling/version/get-next-version.sh)
    
    read -p "Would you like to commit this intent (v${NEXT_VERSION} on ${CURRENT_TRACK^^}) automatically? (Y/n) " AUTO_COMMIT
    if [[ "$AUTO_COMMIT" =~ ^[Yy]$ || -z "$AUTO_COMMIT" ]]; then
       git add .changeset/*.md .changeset/pre.json 2>/dev/null || true
       git diff --staged --quiet || git commit -m "release: ${NEXT_VERSION}"
       success "Intent ${NEXT_VERSION} committed."
    fi
  fi
else
  info "Changesets detected: $(echo $CHANGESETS | wc -w) file(s)."
fi

# Step 3: Quality Validation (Turbo)
header "Step 3: Quality Validation (Turbo)"

if [[ "$SKIP_VERIFY" == "true" ]]; then
  warn "Skipping local validation (--no-verify)..."
else
  info "Running lint, typecheck, tests and commitlint..."
  if pnpm lint && pnpm typecheck && pnpm test && pnpm commitlint --from main; then
    success "All quality checks passed."
  else
    error "Quality checks failed. Fix errors before pushing."
    exit 1
  fi
fi

# Step 4: Final Security Check (RODIN Protocol)
header "Step 4: RODIN Security Audit"

# Block if there's remaining "dirty" code (uncommitted functional changes)
# We ignore changeset files and package.json which are managed by the bot
DIRTY_REMAINING=$(git status --porcelain | grep -vE "^( |M| ) (.changeset/|package\.json)" || true)

if [[ -n "$DIRTY_REMAINING" ]]; then
  error "PUSH BLOCKED: You have uncommitted functional changes."
  echo "$DIRTY_REMAINING"
  info "RODIN Protocol requires all functional changes to be manually committed."
  exit 1
fi

# Step 5: Upstream Synchronization
header "Step 5: Synchronization Audit"

if git remote | grep -q "origin"; then
    info "Checking alignment with origin/$LOCAL_BRANCH..."
    git fetch origin "$LOCAL_BRANCH" > /dev/null 2>&1 || true
    
    BEHIND_COUNT=$(git rev-list --count HEAD..origin/"$LOCAL_BRANCH" 2>/dev/null || echo 0)
    if [ "$BEHIND_COUNT" -gt 0 ]; then
        error "Your branch is $BEHIND_COUNT commit(s) behind GitHub."
        info "Please run 'pnpm sync' to align before pushing."
        exit 1
    fi
    success "Branch is perfectly synchronized."
fi

# Step 6: Final Push
header "Step 6: Pushing to GitHub"

info "Pushing $LOCAL_BRANCH to origin..."

if git push origin "$LOCAL_BRANCH"; then
    success "Push successful!"
    info "Shoperzz Infrastructure is secure."
else
    error "Push failed. Check connectivity or branch permissions."
    exit 1
fi
