#!/bin/bash
# Shoperzz GitHub Release Creator v1.0
# Responsible for creating GitHub Releases.
# Idempotent — safe to run on every push to main.
# Handles pre-release tagging (alpha, beta, rc) automatically.
#
# Usage: bash ./tooling/release/create-github-release.sh

set -euo pipefail

NC='\033[0m'; GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'
info()    { echo -e "${BLUE}ℹ  $*${NC}"; }
success() { echo -e "${GREEN}✓  $*${NC}"; }
warn()    { echo -e "${YELLOW}⚠  $*${NC}"; }

# 1. Resolve current version
VERSION="$(node -p "require('./packages/core/package.json').version")"
info "Target version: $VERSION"

# 2. Idempotency Guard
# If a release already exists for this version, exit cleanly with success.
EXISTING=$(gh release view "$VERSION" --json tagName --jq '.tagName' 2>/dev/null || echo "")
if [ -n "$EXISTING" ]; then
  success "GitHub Release $VERSION already exists. Nothing to do."
  exit 0
fi

# 3. Generate Release Notes
info "Generating release notes..."
bash ./tooling/make-release-description.sh
success "Release notes written to RELEASE.md."

# 4. Pre-release Detection
# Automatically marks alpha, beta and rc versions as GitHub pre-releases.
PRERELEASE_FLAG=""
if echo "$VERSION" | grep -qE '\-(alpha|beta|rc)\.'; then
  PRERELEASE_FLAG="--prerelease"
  warn "Pre-release tag detected ($VERSION) → publishing as GitHub pre-release."
fi

# 5. Create the Unified GitHub Release
info "Creating GitHub Release $VERSION..."
gh release create "$VERSION" \
  --title "$VERSION" \
  --notes-file RELEASE.md \
  --target main \
  $PRERELEASE_FLAG

success "GitHub Release $VERSION published successfully."
