#!/usr/bin/env bash
# Start a new episode from the channel template: kit/tools/new_episode.sh <slug> <no> <vo_duration_s> [--2d]
# Default = the 3D world (template/film3d: diorama + one continuous camera). --2d = the legacy flat-shot template.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; SLUG="$1"; NO="$2"; DUR="${3:-45}"; MODE="${4:---3d}"; D="$ROOT/stories/$SLUG"
[ -e "$D/film" ] && { echo "stories/$SLUG/film already exists"; exit 1; }
mkdir -p "$D/audio" "$D/renders"; cp -r "$ROOT/kit/template/film" "$D/film"
if [ "$MODE" != "--2d" ]; then cp "$ROOT"/kit/template/film3d/* "$D/film/"; rm -f "$D/film/film.js" "$D/film/shots.js"; fi
for f in "$D"/film/*.js "$D"/film/*.py "$D"/film/*.json "$D"/film/index.html; do sed -i "s/__SLUG__/$SLUG/g; s/__NO__/$NO/g; s/__DUR__/$DUR/g" "$f"; done
ln -s ../../../kit/src "$D/film/rig"
[ -e "$D/README.md" ] || printf '# ARSIP KASUS #%03d — %s\n\n## Fact sheet (≥ 2 sumber per klaim)\n\n## Script (formula: references/1-cerita-dan-script.md)\n\n## Catatan produksi & pelajaran\n' "$NO" "$SLUG" > "$D/README.md"
echo "stories/$SLUG ready ($MODE): put vo_$SLUG.mp3 + vo_words.json in audio/, build the world in film/world.js (3D) or shots in film/shots.js (2D), then kit/tools/make_film.sh stories/$SLUG/film"
