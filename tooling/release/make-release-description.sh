#!/usr/bin/env bash

# tooling/release/make-release-description.sh
# Generates a clean GitHub Release description from CHANGELOG and git log.

set -e

VERSION="v$(node -p "require('./package.json').version")"
OUTPUT_FILE="RELEASE.md"
LAST_TAG=$(git tag -l "v*" --sort=-v:refname | grep -v "^${VERSION}$" | head -n 1)

echo "Generating release notes for ${VERSION}..."

# Header
cat > "$OUTPUT_FILE" << EOF
# Wistant Portfolio ${VERSION}

EOF

# Changelog section (extract the latest version block from CHANGELOG.md)
if [[ -f "CHANGELOG.md" ]]; then
  # Extract the block under the first version heading
  CHANGELOG_BLOCK=$(awk '/^## [0-9]/{found++; if(found==2) exit} found==1' CHANGELOG.md)
  if [[ -n "$CHANGELOG_BLOCK" ]]; then
    echo "## What Changed" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "$CHANGELOG_BLOCK" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
  fi
fi

# Commits section (all commits since last tag)
echo "## Commits" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

if [[ -n "$LAST_TAG" ]]; then
  LOG_RANGE="${LAST_TAG}..HEAD"
else
  LOG_RANGE="HEAD"
fi

COMMITS=$(git log "$LOG_RANGE" --pretty=format:"%h ||| %s ||| %an ||| %ae" --no-merges 2>/dev/null || echo "")

while IFS= read -r line; do
  [[ -z "$line" ]] && continue

  HASH=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $1}')
  SUBJECT=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $2}')
  AUTHOR_NAME=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $3}')
  AUTHOR_EMAIL=$(echo "$line" | awk -F' \\|\\|\\| ' '{print $4}')

  # Extract username from email
  AUTHOR_USER=$(echo "$AUTHOR_EMAIL" | awk -F'@' '{print $1}' | sed 's/^[0-9]\++//')

  # Fallback mapping for Wistant to ensure their handle @wistant is used
  if [[ "$AUTHOR_USER" == "contact" || "$AUTHOR_NAME" == *"Wistant"* || "$AUTHOR_EMAIL" == *"wistant"* ]]; then
    AUTHOR_USER="wistant"
  fi

  # Extract type, scope, and clean subject using regex
  REGEX='^([a-z]+)(\(([^)]+)\))?(!?):[[:space:]]*(.+)$'
  if [[ "$SUBJECT" =~ $REGEX ]]; then
    TYPE="${BASH_REMATCH[1]}"
    SCOPE="${BASH_REMATCH[3]:-}"
    IS_BREAKING="${BASH_REMATCH[4]:-}"
    CLEAN_SUBJECT="${BASH_REMATCH[5]}"
  else
    TYPE="other"
    SCOPE=""
    IS_BREAKING=""
    CLEAN_SUBJECT="$SUBJECT"
  fi

  # Format subject with scope if present
  FORMATTED_MSG=""
  if [[ -n "$SCOPE" ]]; then
    FORMATTED_MSG="**${SCOPE}**: ${CLEAN_SUBJECT}"
  else
    FORMATTED_MSG="${CLEAN_SUBJECT}"
  fi

  if [[ -n "$IS_BREAKING" ]]; then
    FORMATTED_MSG="💥 [BREAKING] ${FORMATTED_MSG}"
  fi

  echo "$HASH: - [$TYPE] $FORMATTED_MSG — by @$AUTHOR_USER" >> "$OUTPUT_FILE"
done <<< "$COMMITS"

echo "" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Footer
cat >> "$OUTPUT_FILE" << EOF
---

**Full Changelog**: https://github.com/wistant/portfolio/compare/${LAST_TAG}...${VERSION}
EOF

echo "Release notes written to $OUTPUT_FILE."
