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
  git log "${LAST_TAG}..HEAD" --pretty=format:"- \`%h\` %s — by @%an" --no-merges >> "$OUTPUT_FILE"
else
  git log --pretty=format:"- \`%h\` %s — by @%an" --no-merges | head -30 >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Footer
cat >> "$OUTPUT_FILE" << EOF
---

**Full Changelog**: https://github.com/wistant/portfolio/compare/${LAST_TAG}...${VERSION}
EOF

echo "Release notes written to $OUTPUT_FILE."
