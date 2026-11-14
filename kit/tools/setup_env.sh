#!/usr/bin/env bash
# One-time setup (idempotent) for ANY machine: Claude Code cloud container, Linux, macOS, WSL, GitHub Codespaces/devcontainer.
#   kit/tools/setup_env.sh        # then: kit/tools/new_episode.sh … / make_kolase.sh …
# Needs: python3.10+, node 18+, ffmpeg (system), network for PyPI, huggingface.co (Whisper model), Wikimedia/Openverse (archive prints).
# Windows: use WSL2 or GitHub Codespaces (bash tools + symlinks); native Windows is not supported.
set -uo pipefail
cd "$(dirname "$0")/../.."
ok=1; OS="$(uname -s)"
bash kit/tools/links.sh
pip install -q -r requirements.txt || ok=0
node -e "require('playwright')" 2>/dev/null || { echo "→ npm: playwright"; npm install --silent || ok=0; }   # the Claude cloud container already has a global playwright: never shadow it
# Chromium: preinstalled in the Claude cloud container; elsewhere install once
node -e "const {chromium}=require('playwright');chromium.launch().then(b=>b.close()).catch(()=>process.exit(1))" 2>/dev/null || { echo "→ playwright chromium"; npx --yes playwright install chromium >/dev/null 2>&1 || ok=0; }
sf2() { for p in "${SF2:-}" /usr/share/sounds/sf2/FluidR3_GM.sf2 /usr/share/soundfonts/FluidR3_GM.sf2 /opt/homebrew/share/soundfonts/FluidR3_GM.sf2 /usr/local/share/soundfonts/FluidR3_GM.sf2; do [ -n "$p" ] && [ -f "$p" ] && return 0; done; return 1; }
if ! command -v fluidsynth >/dev/null || ! sf2; then
  if [ "$OS" = Darwin ]; then echo "→ brew: fluid-synth + FluidR3_GM"; brew install fluid-synth >/dev/null 2>&1; [ -f /opt/homebrew/share/soundfonts/FluidR3_GM.sf2 ] || echo "  put FluidR3_GM.sf2 (MIT) somewhere and export SF2=/path/to/FluidR3_GM.sf2"
  else echo "→ apt: fluidsynth fluid-soundfont-gm"; (sudo -n true 2>/dev/null && S=sudo || S=""; $S apt-get update -qq && DEBIAN_FRONTEND=noninteractive $S apt-get install -y -qq fluidsynth fluid-soundfont-gm ffmpeg) >/dev/null 2>&1 || ok=0; fi
fi
command -v ffmpeg >/dev/null || { echo "✗ ffmpeg missing (apt install ffmpeg / brew install ffmpeg)"; ok=0; }
python3 - <<'PY' 2>&1 | tail -1 || ok=0
from faster_whisper import WhisperModel
WhisperModel('small', compute_type='int8'); print('whisper small: ready')
PY
for t in numpy scipy mido faster_whisper PIL; do python3 -c "import $t" 2>/dev/null && echo "✓ $t" || { echo "✗ $t"; ok=0; }; done
command -v fluidsynth >/dev/null && sf2 && echo "✓ fluidsynth + FluidR3_GM" || { echo "✗ fluidsynth/soundfont"; ok=0; }
command -v yt-dlp >/dev/null && echo "✓ yt-dlp" || echo "· yt-dlp optional (riset topik)"
[ $ok = 1 ] && echo "environment ready" || { echo "environment NOT ready (see ✗ above)"; exit 1; }
