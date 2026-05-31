#!/bin/bash
# Wistant Kode Release Note Generator
# Generates rich, full-project release notes from git log.
# - Covers all changes (not just package bumps)
# - Groups by commit type (feat, fix, docs, ci, refactor...)
# - Attributes each commit to its author (@github-handle or git name)
# - No emoji, plain Markdown
#
# Usage: bash ./tooling/release/make-release-description.sh
# Output: RELEASE.md (used by create-github-release.sh)

set -euo pipefail

OUTPUT="RELEASE.md"

# Resolve version and previous tag
CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")
PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")

# Collect commits since last tag (or all if first release)
if [[ -n "$PREV_TAG" ]]; then
  LOG_RANGE="${PREV_TAG}..HEAD"
else
  LOG_RANGE="HEAD"
fi

# Format: TYPE(SCOPE): subject ||| AUTHOR_EMAIL ||| HASH
COMMITS=$(git log "$LOG_RANGE" --pretty=format:"%s ||| %ae ||| %h" --no-merges 2>/dev/null || echo "")

# Categorize commits
declare -A CATEGORIES=(
  ["feat"]="Features"
  ["fix"]="Bug Fixes"
  ["docs"]="Documentation"
  ["ci"]="CI / Infrastructure"
  ["refactor"]="Refactoring"
  ["chore"]="Maintenance"
  ["test"]="Tests"
  ["perf"]="Performance"
  ["build"]="Build"
  ["release"]="Release Governance"
)

declare -A BUCKETS

while IFS= read -r line; do
  [[ -z "$line" ]] && continue

  SUBJECT=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $1}')
  AUTHOR_EMAIL=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $2}')
  HASH=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $3}')

  # Extract username from email (handles GitHub noreply masks: 1234+name@users.noreply.github.com)
  AUTHOR=$(echo "$AUTHOR_EMAIL" | awk -F'@' '{print $1}' | sed 's/^[0-9]\++//')

  # Fallback mapping for Wistant to ensure their handle @wistant is used
  if [[ "$AUTHOR" == "contact" || "$AUTHOR_EMAIL" == *"wistant"* ]]; then
    AUTHOR="wistant"
  fi

  # Resolve Bot and GitHub Actions attribution
  if [[ "$AUTHOR_EMAIL" == *"github-actions"* || "$AUTHOR" == "github-actions" ]]; then
    AUTHOR="github-actions[bot]"
  elif [[ "$AUTHOR_EMAIL" == *"wistant-bot"* || "$AUTHOR" == "wistant-bot" || "$AUTHOR" == *"bot"* ]]; then
    AUTHOR="wistant-bot"
  fi

  PR_NUM=""
  if [[ "$SUBJECT" =~ \(\#([0-9]+)\)$ ]]; then
    PR_NUM="${BASH_REMATCH[1]}"
    SUBJECT=$(echo "$SUBJECT" | sed -E 's/ \(\#[0-9]+\)$//')
  fi

  # If no PR number is in the commit message, try to find the merge commit that introduced it
  if [[ -z "$PR_NUM" ]]; then
    merge_commit=$(git log --merges --ancestry-path --oneline "${HASH}..HEAD" 2>/dev/null | grep -E "Merge pull request #|Merge branch.*into.*\(#[0-9]+\)" | head -n 1 || true)
    if [[ -n "$merge_commit" ]]; then
      if [[ "$merge_commit" =~ \#([0-9]+) ]]; then
        PR_NUM="${BASH_REMATCH[1]}"
      elif [[ "$merge_commit" =~ \(\#([0-9]+)\) ]]; then
        PR_NUM="${BASH_REMATCH[1]}"
      fi
    fi
  fi

  # Extract type prefix (feat, fix, etc.)
  TYPE=$(echo "$SUBJECT" | grep -oP '^[a-z]+(?=[\(!\:])' || echo "other")

  if [[ -n "$PR_NUM" ]]; then
    ENTRY="- ${HASH} - ${SUBJECT} by @${AUTHOR} in #${PR_NUM}"
  else
    ENTRY="- ${HASH} - ${SUBJECT} by @${AUTHOR}"
  fi

  if [[ -n "${CATEGORIES[$TYPE]+x}" ]]; then
    BUCKETS["$TYPE"]+="${ENTRY}"$'\n'
  else
    BUCKETS["other"]+="${ENTRY}"$'\n'
    CATEGORIES["other"]="Other"
  fi
done <<< "$COMMITS"

# Write RELEASE.md
{
  echo "## What's Changed"
  echo ""

  # Output in a defined order
  for TYPE in feat fix refactor ci docs build test perf chore release other; do
    if [[ -n "${BUCKETS[$TYPE]+x}" && -n "${BUCKETS[$TYPE]}" ]]; then
      echo "### ${CATEGORIES[$TYPE]}"
      echo "${BUCKETS[$TYPE]}"
    fi
  done

  # Process Package Changes
  echo "### Configuration Updates"
  echo ""
  if [[ -n "$PREV_TAG" ]]; then
    CHANGED_PKGS=$(git diff --name-only ${PREV_TAG}..HEAD | grep "package\.json$" || true)
    if [[ -n "$CHANGED_PKGS" ]]; then
      for pkg in $CHANGED_PKGS; do
        if [[ -f "$pkg" ]]; then
          PKG_NAME=$(node -p "require('./$pkg').name" 2>/dev/null || echo "unknown")
          PKG_VERSION=$(node -p "require('./$pkg').version" 2>/dev/null || echo "unknown")
          
          if [[ "$PKG_NAME" != "unknown" ]]; then
            # Extract previous version
            PREV_PKG_VERSION=$(git show "${PREV_TAG}:$pkg" 2>/dev/null | grep '"version":' | head -n 1 | sed -E 's/.*"version": "(.*)",?/\1/' || echo "unknown")
            if [[ "$PKG_VERSION" != "$PREV_PKG_VERSION" && -n "$PREV_PKG_VERSION" ]]; then
               echo "- \`$PKG_NAME\`: \`$PREV_PKG_VERSION\` -> \`$PKG_VERSION\`"
            fi
          fi
        fi
      done
    else
      echo "- No version bump detected in project files."
    fi
  else
    echo "- Initial release. Portfolio at its starting version."
  fi
  
  echo ""
  echo "---"
  echo "**Full Changelog**: https://github.com/wistant/portfolio/compare/${PREV_TAG}...${CURRENT_VERSION}"

} > "$OUTPUT"

echo "Release notes written to $OUTPUT."
