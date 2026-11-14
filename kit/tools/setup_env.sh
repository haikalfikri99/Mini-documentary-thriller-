#!/usr/bin/env bash
# One-time setup for a fresh container/session (idempotent): everything the film pipeline needs that is not in git.
#   kit/tools/setup_env.sh        # then: kit/tools/new_episode.sh … / make_kolase.sh …
# Needs network to: PyPI, the apt mirror, huggingface.co (Whisper model for the audio QA gate). Playwright + Chromium are preinstalled
# in the cloud container (renderer: kit/tools/render_2d.mjs); archive prints come from Wikimedia/Openverse (kit/collage/fetch_raw.py).
set -uo pipefail
ok=1
python3 -c "import scipy, mido, faster_whisper" 2>/dev/null || { echo "→ pip: scipy mido faster-whisper"; pip install -q scipy mido faster-whisper || ok=0; }
command -v yt-dlp >/dev/null || { echo "→ pip: yt-dlp (riset topik)"; pip install -q yt-dlp || ok=0; }
if ! command -v fluidsynth >/dev/null || [ ! -f /usr/share/sounds/sf2/FluidR3_GM.sf2 ]; then echo "→ apt: fluidsynth fluid-soundfont-gm"; (apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq fluidsynth fluid-soundfont-gm) >/dev/null 2>&1 || ok=0; fi
command -v ffmpeg >/dev/null || { echo "✗ ffmpeg missing"; ok=0; }
python3 - <<'PY' 2>&1 | tail -1 || ok=0
from faster_whisper import WhisperModel
WhisperModel('small', compute_type='int8'); print('whisper small: ready')
PY
for t in scipy mido faster_whisper; do python3 -c "import $t" 2>/dev/null && echo "✓ $t" || { echo "✗ $t"; ok=0; }; done
command -v fluidsynth >/dev/null && [ -f /usr/share/sounds/sf2/FluidR3_GM.sf2 ] && echo "✓ fluidsynth + FluidR3_GM" || { echo "✗ fluidsynth/soundfont"; ok=0; }
[ $ok = 1 ] && echo "environment ready" || { echo "environment NOT ready (see ✗ above; a blocked host must be allowed in the environment's network settings)"; exit 1; }
