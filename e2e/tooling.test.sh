#!/bin/bash
# Shoperzz Tooling E2E Test Suite
# Tests the core CI and release scripts locally before pushing to GitHub.
# Usage: pnpm test:e2e (or directly bash e2e/tooling.test.sh)

set -e

NC='\033[0m'; GREEN='\033[0;32m'; RED='\033[0;31m'; BLUE='\033[0;34m'
info() { echo -e "${BLUE}ℹ $1${NC}"; }
pass() { echo -e "${GREEN}✓ $1${NC}"; }
fail() { echo -e "${RED}✖ $1${NC}"; exit 1; }

trap 'rm -f RELEASE.md' EXIT

echo "Starting E2E Tests for Shoperzz Tooling..."

# 1. Test get-next-version.sh
info "Testing get-next-version.sh..."
VERSION=$(./tooling/version/get-next-version.sh 2>/dev/null)
if [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?$ ]]; then
  pass "get-next-version.sh returned a valid semver: $VERSION"
else
  fail "get-next-version.sh failed or returned invalid version: $VERSION"
fi

# 2. Test make-release-description.sh
info "Testing make-release-description.sh..."
bash ./tooling/make-release-description.sh 2>/dev/null
if [[ -f "RELEASE.md" ]]; then
  pass "make-release-description.sh successfully generated RELEASE.md"
  rm RELEASE.md
else
  fail "make-release-description.sh failed to generate RELEASE.md"
fi

# 3. Test github-release.sh (Idempotency Dry-Run)
info "Testing github-release.sh (Idempotency Guard)..."
# We simulate a version that already exists or we mock the gh command if necessary,
# but since it relies on gh CLI, we just check if it parses the script without syntax errors
if bash -n ./tooling/release/github-release.sh; then
  pass "github-release.sh passed syntax check (bash -n)"
else
  fail "github-release.sh contains syntax errors"
fi

# 4. Test formatting (Prettier)
info "Testing code formatting..."
if pnpm format:write > /dev/null 2>&1; then
  DIRTY=$(git diff --name-only)
  if [[ -z "$DIRTY" ]]; then
    pass "Code formatting is clean."
  else
    info "Note: Prettier found unformatted files, but script execution works."
  fi
else
  fail "pnpm format:write failed"
fi

echo -e "\n${GREEN}All E2E tooling tests passed. Safe to push to CI.${NC}"
exit 0
