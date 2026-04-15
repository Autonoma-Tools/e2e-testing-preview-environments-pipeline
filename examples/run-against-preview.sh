#!/usr/bin/env bash
# Usage: ./examples/run-against-preview.sh <preview-url>
#
# Runs the Playwright E2E suite against a preview deployment URL.
# This is the same thing the GitHub Actions workflow does, but
# you can use it locally to debug failures.

set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <preview-url>"
  echo "  e.g. $0 https://my-app-abc123.vercel.app"
  exit 1
fi

PREVIEW_URL="$1"

echo "Running E2E tests against: ${PREVIEW_URL}"
BASE_URL="${PREVIEW_URL}" npx playwright test "$@"
