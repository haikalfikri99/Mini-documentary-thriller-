#!/usr/bin/env bash
# New ARSIP Kolase episode scaffold.   kit/tools/new_episode.sh <slug> <no> ["CASE LINE"]
#   → stories/<slug>/{README.md, meta.json, audio/} + stories/<slug>/kolase/ (template bake.py, film.js, score_full.py, fullmix.py,
#     prints.json, SOURCES.jsonl, episode.json; lib → kit/collage, audio → ../audio)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; SLUG="$1"; NO="$2"; LINE="${3:-$(echo "$SLUG" | tr a-z A-Z)}"
S="$ROOT/stories/$SLUG"; K="$S/kolase"
[ -e "$K" ] && { echo "sudah ada: $K"; exit 1; }
mkdir -p "$S/audio" "$K"
cp "$ROOT/kit/collage/template/"* "$K/"
ln -s ../../../kit/collage "$K/lib"; ln -s ../audio "$K/audio"
python3 - "$K/episode.json" "$SLUG" "$NO" "$LINE" <<'PY'
import json, sys
p, slug, no, line = sys.argv[1:]
json.dump(dict(slug=slug, no=int(no), title='', case_line=line, vo=f'audio/vo_{slug}.mp3', words='audio/vo_words.json', dur=0, report=[[0, 0]]), open(p, 'w'), indent=1)
PY
[ -f "$S/meta.json" ] || printf '{"id":"%s","series":"ARSIP KASUS #%03d","style":"arsip-kolase","status":"fact sheet"}\n' "$SLUG" "$NO" > "$S/meta.json"
[ -f "$S/README.md" ] || printf '# ARSIP KASUS #%03d — %s\n\n## Fact sheet\n| # | Klaim | Status | Sumber |\n|---|---|---|---|\n\n## Judul\n\n## Script\n' "$NO" "$SLUG" > "$S/README.md"
echo "→ $K   langkah berikut: VO + vo_words.json, lalu python3 kit/tools/line_starts.py stories/$SLUG"
