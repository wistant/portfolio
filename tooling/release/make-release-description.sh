#!/usr/bin/env bash

# tooling/make-release-description.sh
# Aggregates changelogs from all packages into a single professional RELEASE.md

set -e

# Extract the version from the core package (Single Source of Truth)
VERSION="v$(node -p "require('./packages/core/package.json').version")"
OUTPUT_FILE="RELEASE.md"

echo "Generating Unified Release Notes for $VERSION..."

cat <<EOF > "$OUTPUT_FILE"
# Shoperzz v$VERSION

This document provides a comprehensive overview of the changes included in the Shoperzz ecosystem for the current release.

## Core Infrastructure
All core packages are synchronized to maintain architectural integrity.
EOF

# Process Core Packages
for pkg in packages/*; do
    if [ -f "$pkg/CHANGELOG.md" ]; then
        if [ -f "$pkg/package.json" ]; then
            PKG_NAME=$(node -p "require('./$pkg/package.json').name")
            echo "### $PKG_NAME" >> "$OUTPUT_FILE"
            
            # Extract content under the first H2 header
            sed -n '/^## [0-9]/,/^## [0-9]/p' "$pkg/CHANGELOG.md" | sed '1d;$d' >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
        fi
    fi
done

# Process Plugins
if [ -d "plugins" ] && [ "$(ls -A plugins 2>/dev/null)" ]; then
    echo "## Extension System (Plugins)" >> "$OUTPUT_FILE"
    for pkg in plugins/*; do
        if [ -f "$pkg/CHANGELOG.md" ]; then
            if [ -f "$pkg/package.json" ]; then
                PKG_NAME=$(node -p "require('./$pkg/package.json').name")
                echo "### $PKG_NAME" >> "$OUTPUT_FILE"
                sed -n '/^## [0-9]/,/^## [0-9]/p' "$pkg/CHANGELOG.md" | sed '1d;$d' >> "$OUTPUT_FILE"
                echo "" >> "$OUTPUT_FILE"
            fi
        fi
    done
fi

echo "---" >> "$OUTPUT_FILE"
echo "Release management facilitated by Shoperzz CI/CD protocols." >> "$OUTPUT_FILE"

echo "$OUTPUT_FILE generated successfully."
