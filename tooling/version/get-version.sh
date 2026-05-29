#!/bin/bash
# tooling/version/get-version.sh
# Renvoie la version actuelle du portfolio
# ---------------------------------------------------------
node -p "require('./package.json').version"
