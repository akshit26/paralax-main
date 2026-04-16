#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-feat: vertical y-axis 3d experience update}"

FILES=(
  "src/components/MainCanvas.tsx"
  "src/components/ProximityHtml.tsx"
  "src/components/scenes/Scene1MilkyWay.tsx"
  "src/components/scenes/Scene2Earth.tsx"
  "src/app/page.tsx"
  "src/app/globals.css"
)

echo "Staging core 3D scene files..."
git add "${FILES[@]}"

echo "Running quick checks (lint + build) before commit..."
npm run lint
npm run build

echo "Creating commit: $MESSAGE"
git commit -m "$MESSAGE"

echo "Done. Commit created successfully."
