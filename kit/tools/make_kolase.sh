#!/usr/bin/env bash
# ARSIP Kolase: one command from approved shots to the final file. AUDIO QA IS A GATE BEFORE THE RENDER:
#   VO chain → on-screen events (render_2d events) → score → foley mix → audio QA (margin ≥ 10 dB, no word < 8 dB,
#   Whisper on the mix hears what it hears on the VO) → only if it passes: frame render → mux (light grain, loudnorm −14 LUFS)
# usage: kit/tools/make_kolase.sh stories/<slug>/kolase [version]  → stories/<slug>/renders/ARSIP_<no>_<slug>_v<version>.mp4
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; FILM="$(cd "$1" && pwd)"; V="${2:-1}"
SLUG=$(python3 -c "import json;print(json.load(open('$FILM/episode.json'))['slug'])"); NO=$(python3 -c "import json;print('%03d'%json.load(open('$FILM/episode.json'))['no'])")
python3 "$ROOT/kit/collage/fetch_raw.py" "$FILM" | tail -1                     # archive prints + engraved stand-ins (raw/ is git-ignored)
[ -f "$FILM/parts/manifest.json" ] || (cd "$FILM" && python3 bake.py | tail -1)
python3 "$ROOT/kit/audio/vo_chain.py" "$FILM" | tail -1
node "$ROOT/kit/tools/render_2d.mjs" "$FILM" events "$FILM/events.json" 30
(cd "$FILM" && python3 score_full.py && python3 fullmix.py | grep -E "worst|under|ok|GAGAL") || { echo "→ render dibatalkan: audio QA gagal"; exit 2; }
QA=$(python3 "$ROOT/kit/audio/check_audio.py" "$FILM" mix_full.wav 2>/dev/null | grep intelligib); BASE=$(python3 "$ROOT/kit/audio/check_audio.py" "$FILM" vo_level.wav 2>/dev/null | grep intelligib)
echo "mix: $QA"; echo "VO : $BASE"
NQ=$(echo "$QA" | grep -o "[0-9]*/" | head -1 | tr -d /); NB=$(echo "$BASE" | grep -o "[0-9]*/" | head -1 | tr -d /)
[ "$NQ" -ge "$NB" ] || { echo "→ render dibatalkan: mix menutupi kata yang terbaca di VO saja ($NQ < $NB)"; exit 2; }
node "$ROOT/kit/tools/render_2d.mjs" "$FILM" video "$FILM/renders/visual.mp4" 30
OUT="$FILM/../renders/ARSIP_${NO}_${SLUG}_v${V}.mp4"; mkdir -p "$(dirname "$OUT")"
ffmpeg -v error -y -i "$FILM/renders/visual.mp4" -i "$FILM/mix_full.wav" -map 0:v -map 1:a -vf "noise=alls=2:allf=t" -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
ffmpeg -nostats -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -A14 Summary | grep -E "I:|Peak:"
echo "→ $OUT"
