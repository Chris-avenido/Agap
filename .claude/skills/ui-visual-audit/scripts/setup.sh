#!/usr/bin/env bash
# One-time, idempotent install of Playwright, Chromium and axe-core inside the skill folder.
set -e
cd "$(dirname "$0")/.."
MAJOR=$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)
if [ "$MAJOR" -lt 20 ]; then
  echo "ERROR: Node 20+ required (found: $(node -v 2>/dev/null || echo none))." >&2; exit 1
fi
if [ -d node_modules/playwright ] && [ -d node_modules/axe-core ]; then
  echo "ui-visual-audit: dependencies already installed."; exit 0
fi
[ -f package.json ] || npm init -y >/dev/null
if ! npm install playwright axe-core --no-audit --no-fund; then
  echo "ERROR: npm install failed. Check network access and retry." >&2; exit 1
fi
if ! npx playwright install chromium; then
  echo "ERROR: Chromium download failed. Check network access and retry." >&2; exit 1
fi
echo "ui-visual-audit: setup complete."
