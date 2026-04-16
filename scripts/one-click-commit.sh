#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-chore: one-click snapshot commit}"

echo "Running checks..."
npm run lint
npm run build

echo "Staging all tracked and untracked changes..."
git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

echo "Creating commit: $MESSAGE"
git commit -m "$MESSAGE"
echo "✅ Done"
