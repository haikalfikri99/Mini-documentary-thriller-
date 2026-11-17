#!/usr/bin/env bash
# Makes stories/*/kolase/lib (→ kit/collage) and stories/*/kolase/audio (→ ../audio) so a fresh clone / zip / local desktop folder works.
# Safe to run any number of times, from any folder:  bash kit/tools/links.sh
# - symlinks are not committed (zip downloads and Windows break them);
# - broken symlinks are repaired;
# - where symlinks are not allowed (Windows without Developer Mode, some network drives) it falls back to a COPY marked with
#   .copied_by_links and refreshes that copy on every run, so lib/ never goes stale after kit/collage changes.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"
export MSYS=winsymlinks:nativestrict CYGWIN=winsymlinks:nativestrict   # Git Bash / MSYS2: real symlinks or fail (then we copy)
for K in "$ROOT"/stories/*/kolase; do
  [ -d "$K" ] || continue
  for pair in "lib:../../../kit/collage" "audio:../audio"; do
    n="${pair%%:*}"; t="${pair#*:}"
    [ "$n" = audio ] && [ ! -d "$K/$t" ] && continue
    if [ -L "$K/$n" ]; then
      [ -e "$K/$n" ] && continue                 # healthy symlink
      rm -f "$K/$n"                               # broken symlink: repair below
    elif [ -d "$K/$n" ]; then
      [ -f "$K/$n/.copied_by_links" ] || continue # a real directory we did not create: never touch
      rm -rf "$K/$n"                              # refresh our own copy
    elif [ -e "$K/$n" ]; then
      continue
    fi
    if ! ln -s "$t" "$K/$n" 2>/dev/null || [ ! -e "$K/$n" ]; then
      rm -rf "$K/$n"; cp -r "$K/$t" "$K/$n" && : > "$K/$n/.copied_by_links"
    fi
  done
done
