#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="$ROOT/var/log"
mkdir -p "$LOG_DIR"
NODE_BIN="$(command -v node)"
PNPM_BIN="$(command -v pnpm)"
CODEX_BIN="$(command -v codex)"
GH_BIN="$(command -v gh)"
PATH_VALUE="$(dirname "$NODE_BIN"):$(dirname "$PNPM_BIN"):$(dirname "$CODEX_BIN"):$(dirname "$GH_BIN"):/usr/local/bin:/usr/bin:/bin"
BEGIN="# BEGIN CONQUENSE-DEV NEWS"
END="# END CONQUENSE-DEV NEWS"
LEGACY_BEGIN="# BEGIN CONQUENSE-DEV BLOG"
LEGACY_END="# END CONQUENSE-DEV BLOG"
TEMP_CRON="$(mktemp)"
trap 'rm -f "$TEMP_CRON"' EXIT

{ crontab -l 2>/dev/null || true; } | sed "/$BEGIN/,/$END/d; /$LEGACY_BEGIN/,/$LEGACY_END/d" > "$TEMP_CRON"
cat >> "$TEMP_CRON" <<EOF
$BEGIN
PATH=$PATH_VALUE
CRON_TZ=Europe/Madrid
45 9 * * * cd $ROOT && /usr/bin/flock -n $ROOT/var/news-worker.lock env NEWS_MAX_ARTICLES=3 $PNPM_BIN news:worker >> $LOG_DIR/news-worker.cron.log 2>&1
$END
EOF
crontab "$TEMP_CRON"
printf 'News cron instalado: todos los días a las 09:45 (zona horaria del sistema).\n'
