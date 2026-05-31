#!/usr/bin/env bash
# github-release.sh - Publish script for Changesets GitHub Action

set -euo pipefail

echo "Publish triggered successfully."
echo "Forwarding intent strictly to GitHub Releases..."

bash ./tooling/release/create-github-release.sh

