#!/usr/bin/env bash
# Wistant Kode PR Description Generator
# Generates a rich, structured PR description from commits between current branch and main.

set -euo pipefail

# Source UI Theme & Helpers if available
THEME_PATH="$(dirname "$0")/theme.sh"
if [[ -f "$THEME_PATH" ]]; then
  source "$THEME_PATH"
else
  # Minimal fallback formatting
  info() { echo -e "\033[36m[INFO]\033[0m $*"; }
  success() { echo -e "\033[32m[SUCCESS]\033[0m $*"; }
  warn() { echo -e "\033[33m[WARN]\033[0m $*"; }
  error() { echo -e "\033[31m[ERROR]\033[0m $*"; }
  header() { echo -e "\n\033[1;35m=== $* ===\033[0m\n"; }
  divider() { echo -e "\033[37m---------------------------------------\033[0m"; }
  RESET="\033[0m"
  YELLOW="\033[33m"
fi

OUTPUT="PR_DESCRIPTION.md"
BASE_BRANCH="main"

# Resolve previous base branch from git
if git show-ref --verify --quiet refs/remotes/origin/main; then
  BASE_BRANCH="origin/main"
elif git show-ref --verify --quiet refs/heads/main; then
  BASE_BRANCH="main"
fi

info "Comparing current branch with $BASE_BRANCH..."

# Collect commits
COMMITS=$(git log "${BASE_BRANCH}..HEAD" --pretty=format:"%s ||| %ae ||| %h" --no-merges 2>/dev/null || echo "")

if [[ -z "$COMMITS" ]]; then
  warn "No unmerged commits found between current branch and $BASE_BRANCH."
  echo "Are you up-to-date with $BASE_BRANCH?"
  exit 0
fi

# Categorize commits
declare -A CATEGORIES=(
  ["feat"]="Features"
  ["fix"]="Bug Fixes"
  ["docs"]="Documentation"
  ["ui"]="UI / Design"
  ["style"]="Formatting & Style"
  ["refactor"]="Refactoring"
  ["perf"]="Performance Improvements"
  ["test"]="Tests"
  ["ci"]="CI / Infrastructure"
  ["chore"]="Maintenance Tasks"
)

declare -A BUCKETS

while IFS= read -r line; do
  [[ -z "$line" ]] && continue

  SUBJECT=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $1}')
  AUTHOR_EMAIL=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $2}')
  HASH=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $3}')

  # Extract username from email
  AUTHOR=$(echo "$AUTHOR_EMAIL" | awk -F'@' '{print $1}' | sed 's/^[0-9]\++//')
  if [[ "$AUTHOR" == "contact" || "$AUTHOR_EMAIL" == *"wistant"* ]]; then
    AUTHOR="wistant"
  fi

  # Extract type prefix (e.g. feat, fix, docs, etc.)
  TYPE=$(echo "$SUBJECT" | grep -oP '^[a-z]+(?=[\(!\:])' || echo "other")

  ENTRY="- \`$HASH\` - $SUBJECT (by @$AUTHOR)"

  if [[ -n "${CATEGORIES[$TYPE]+x}" ]]; then
    BUCKETS["$TYPE"]+="${ENTRY}"$'\n'
  else
    BUCKETS["other"]+="${ENTRY}"$'\n'
    CATEGORIES["other"]="Other Changes"
  fi
done <<< "$COMMITS"

# Write PR_DESCRIPTION.md
{
  echo "# 🚀 Pull Request Description"
  echo ""
  echo "## 📝 Summary of Changes"
  echo "This Pull Request introduces the following logical adjustments:"
  echo ""

  # Output in defined order
  for TYPE in feat fix ui style refactor docs ci perf test chore other; do
    if [[ -n "${BUCKETS[$TYPE]+x}" && -n "${BUCKETS[$TYPE]}" ]]; then
      echo "### ${CATEGORIES[$TYPE]}"
      echo "${BUCKETS[$TYPE]}"
    fi
  done

  echo ""
  echo "## 🔍 Quality Check List"
  echo "- [x] Code is formatted according to Prettier standards"
  echo "- [x] Commits are structured atomically following the COMMIT convention"
  echo "- [x] Verified on local environment"
} > "$OUTPUT"

success "PR description successfully written to $OUTPUT."
if [[ $(type -t divider) == "function" ]]; then
  divider
else
  echo -e "${YELLOW}---------------------------------------${RESET}"
fi
cat "$OUTPUT"
if [[ $(type -t divider) == "function" ]]; then
  divider
else
  echo -e "${YELLOW}---------------------------------------${RESET}"
fi
