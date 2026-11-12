#!/usr/bin/env bash
# Start a new episode from the channel template: kit/tools/new_episode.sh <slug> <no> <vo_duration_s>
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; SLUG="$1"; NO="$2"; DUR="${3:-45}"; D="$ROOT/stories/$SLUG"
[ -e "$D/film" ] && { echo "stories/$SLUG/film already exists"; exit 1; }
mkdir -p "$D/audio" "$D/renders"; cp -r "$ROOT/kit/template/film" "$D/film"
for f in "$D"/film/*.js "$D"/film/*.py "$D"/film/*.json "$D"/film/index.html; do sed -i "s/__SLUG__/$SLUG/g; s/__NO__/$NO/g; s/__DUR__/$DUR/g" "$f"; done
ln -s ../../../kit/src "$D/film/rig"
[ -e "$D/README.md" ] || printf '# ARSIP KASUS #%03d — %s\n\n## Fact sheet (≥ 2 sumber per klaim)\n\n## Script (formula: references/1-cerita-dan-script.md)\n\n## Catatan produksi & pelajaran\n' "$NO" "$SLUG" > "$D/README.md"
echo "stories/$SLUG ready: put vo_$SLUG.mp3 + vo_words.json in audio/, build shots in film/shots.js, then kit/tools/make_film.sh stories/$SLUG/film"
