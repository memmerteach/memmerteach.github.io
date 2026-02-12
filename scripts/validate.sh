#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -f "$ROOT_DIR/../scripts/sanitize-runtime-env.sh" ]]; then
  # shellcheck source=/dev/null
  source "$ROOT_DIR/../scripts/sanitize-runtime-env.sh"
  sanitize_runtime_env
fi

log() {
  printf "\n[%s] %s\n" "$(date +"%H:%M:%S")" "$1"
}

check_duplicate_content_ids() {
  local content_dir="$1"
  local label="$2"

  if [[ ! -d "$content_dir" ]]; then
    return 0
  fi

  local duplicates
  duplicates="$(
    find "$content_dir" -type f \
      \( -name "*.md" -o -name "*.mdx" -o -name "*.markdown" -o -name "*.markdoc" \) \
      -printf "%P\n" \
      | awk '
          {
            stem = $0
            sub(/\.[^.]+$/, "", stem)
            id = tolower(stem)
            count[id]++
            files[id] = files[id] sprintf("  - %s\n", $0)
          }
          END {
            for (id in count) {
              if (count[id] > 1) {
                printf "id: %s\n%s", id, files[id]
              }
            }
          }
        '
  )"

  if [[ -n "$duplicates" ]]; then
    printf "\n[%s] Duplicate content IDs detected in %s.\n" "$(date +"%H:%M:%S")" "$label" >&2
    printf "Rename one of the conflicting files so each stem is unique.\n\n" >&2
    printf "%s\n" "$duplicates" >&2
    return 1
  fi
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

log "Check content IDs."
check_duplicate_content_ids "$ROOT_DIR/src/content/posts" "posts"
check_duplicate_content_ids "$ROOT_DIR/src/content/projects" "projects"

log "Build site."
pnpm run build

log "Validation complete."
