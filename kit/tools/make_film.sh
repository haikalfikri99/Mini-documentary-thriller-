#!/usr/bin/env bash
# One command from approved shots to the final file (channel pipeline):
#   VO chain → captions → score → SFX mix (+ voice-margin report) → HyperFrames check + render → mux with loudnorm → audio QA
# usage: kit/tools/make_film.sh stories/<slug>/film [version]   → stories/<slug>/renders/ARSIP_<no>_<slug>_v<version>.mp4
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; FILM="$(cd "$1" && pwd)"; V="${2:-1}"
SLUG=$(python3 -c "import json;print(json.load(open('$FILM/episode.json'))['slug'])"); NO=$(python3 -c "import json;print('%03d'%json.load(open('$FILM/episode.json'))['no'])")
python3 "$ROOT/kit/audio/vo_chain.py" "$FILM" | tail -1
python3 "$ROOT/kit/tools/build_captions.py" "$FILM"
(cd "$FILM" && python3 score_full.py && python3 fullmix.py | grep -E "worst|under|ok")
cp "$FILM/mix_full.wav" "$FILM/assets/mix.wav"
(cd "$FILM" && DO_NOT_TRACK=1 npx hyperframes check | tail -1 && DO_NOT_TRACK=1 npx hyperframes render -o renders/visual.mp4 > renders/render.log 2>&1 && tail -1 renders/render.log)
OUT="$FILM/../renders/ARSIP_${NO}_${SLUG}_v${V}.mp4"; mkdir -p "$(dirname "$OUT")"
ffmpeg -v error -y -i "$FILM/renders/visual.mp4" -i "$FILM/mix_full.wav" -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 -c:a aac -b:a 192k -shortest "$OUT"
ffmpeg -nostats -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -A14 Summary | grep -E "I:|Peak:"
python3 "$ROOT/kit/audio/check_audio.py" "$FILM" 2>/dev/null | grep -E "intelligib|missed"
echo "→ $OUT"
