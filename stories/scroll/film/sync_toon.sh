#!/usr/bin/env bash
# Copies the channel's toon engine into the HyperFrames project (HyperFrames needs relative asset paths),
# rewriting the absolute '/core/lib.js' imports. Run again whenever toon/engine changes.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$HERE/../../.."; DST="$HERE/../hf/lib/toon"
mkdir -p "$DST" "$HERE/../hf/assets/fonts"
for f in "$ROOT"/toon/engine/*.js; do sed "s#'/core/lib.js'#'./lib.js'#g" "$f" > "$DST/$(basename "$f")"; done
cp "$ROOT/toon/core/lib.js" "$DST/lib.js"
cp "$ROOT"/toon/fonts/*.woff2 "$HERE/../hf/assets/fonts/"
cp "$HERE/vo_level.wav" "$HERE/../hf/assets/vo.wav"
echo "toon engine synced → $DST"
