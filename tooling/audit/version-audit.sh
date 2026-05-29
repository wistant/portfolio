# Shoperzz Version Consistency Audit
# This script ensures local and remote environments are synchronized.

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Helpers
info() { echo -e "${BLUE}ℹ  $1${NC}"; }
success() { echo -e "${GREEN}✓  $1${NC}"; }
warn() { echo -e "${YELLOW}⚠  $1${NC}"; }
error() { echo -e "${RED}✖  $1${NC}"; }

# 1. Get local version (Source: @shoperzz/core)
LOCAL_VERSION=$(node -p "require('./packages/core/package.json').version")
info "Detected local version (@shoperzz/core): ${LOCAL_VERSION}"

# 2. Sync remote tags
info "Synchronizing tags from GitHub..."
git fetch --tags origin > /dev/null 2>&1 || warn "Could not fetch tags (check connection or SSH)."

# 3. Identify last official tag (vX.Y.Z*)
REMOTE_TAG=$(git tag -l "v*" --sort=-v:refname | head -n 1)

if [[ -z "$REMOTE_TAG" ]]; then
  success "No remote tags found. Initial deployment?"
  exit 0
fi

# Extract version from tag
REMOTE_VERSION="${REMOTE_TAG#v}"
info "Found remote tag on GitHub: ${REMOTE_TAG}"

# 4. Logical Comparison (SemVer)
if [[ "$LOCAL_VERSION" == "$REMOTE_VERSION" ]]; then
  success "Perfect consistency: Local (${LOCAL_VERSION}) == Remote (${REMOTE_VERSION})"
  exit 0
fi

# Conflict: Local < Remote
IS_BEHIND=$(node -p "require('semver').lt('$LOCAL_VERSION', '$REMOTE_VERSION') ? 'true' : 'false'" 2>/dev/null || echo "unknown")

if [[ "$IS_BEHIND" == "true" ]]; then
  error "CONFLICT DETECTED: Your local version ($LOCAL_VERSION) is BEHIND remote tag ($REMOTE_VERSION)."
  warn "This happens if a bot or another contributor already pushed a higher version."
  warn "Action: Use 'git pull' or adjust your release intent."
  exit 1
elif [[ "$IS_BEHIND" == "false" ]]; then
  success "Version progression validated: Local ($LOCAL_VERSION) > Remote ($REMOTE_VERSION)."
  exit 0
else
  # Fallback basic string comparison
  warn "Using simple string comparison (semver package not detected)..."
  if [[ "$LOCAL_VERSION" < "$REMOTE_VERSION" ]]; then
    error "Likely conflict: $LOCAL_VERSION < $REMOTE_VERSION"
    exit 1
  fi
fi
