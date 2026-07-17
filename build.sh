#!/usr/bin/env bash
# Cloudflare Pages build: hand-rolled homepage + MkDocs blog at /blog/
set -euo pipefail

pip install -r requirements.txt

rm -rf public
mkdir -p public

# Homepage (no build — copied verbatim)
cp index.html main.js _headers public/
cp -r vendor public/vendor
mkdir -p public/.well-known
cp .well-known/security.txt public/.well-known/

# Blog (MkDocs Material)
python3 -m mkdocs build -f blog-src/mkdocs.yml -d "$(pwd)/public/blog"

echo "Build complete:"
find public -maxdepth 2 -type d
