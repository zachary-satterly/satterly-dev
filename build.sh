#!/usr/bin/env bash
# Cloudflare Pages build: copy the static site into public/. No build step.
set -euo pipefail

rm -rf public
mkdir -p public/.well-known
cp index.html main.js favicon.svg _headers public/
cp -r vendor public/vendor
cp .well-known/security.txt public/.well-known/
