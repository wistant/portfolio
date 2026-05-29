#!/bin/bash
# tooling/version/get-version.sh
# Renvoie la version actuelle de @shoperzz/core

node -p "require('./packages/core/package.json').version"
