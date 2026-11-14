#!/usr/bin/env bash
# Makes stories/*/kolase/lib (→ kit/collage) and stories/*/kolase/audio (→ ../audio) so a fresh clone / GitHub zip works.
# Symlinks are not committed (zip downloads and Windows break them); falls back to a copy where symlinks are not allowed.
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
for K in "$ROOT"/stories/*/kolase; do
  [ -d "$K" ] || continue
  for pair in "lib:../../../kit/collage" "audio:../audio"; do
    n="${pair%%:*}"; t="${pair#*:}"
    { [ -e "$K/$n" ] || [ -L "$K/$n" ]; } && continue
    [ "$n" = audio ] && [ ! -d "$K/$t" ] && continue
    ln -s "$t" "$K/$n" 2>/dev/null || cp -r "$K/$t" "$K/$n"
  done
done
