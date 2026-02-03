#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() {
  printf "\n[%s] %s\n" "$(date +"%H:%M:%S")" "$1"
}

export ASTRO_TELEMETRY_DISABLED=1
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/tmp}"
export CI="${CI:-1}"
export NPM_CONFIG_LOGLEVEL=error

QUICK=0
if [[ "${1:-}" == "--quick" ]]; then
  QUICK=1
fi

if [[ "$QUICK" -eq 0 ]]; then
  log "Install dependencies."
  pnpm install --frozen-lockfile
fi

log "Build site."
pnpm run build

log "Validation complete."
