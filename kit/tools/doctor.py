"""Environment doctor for a LOCAL checkout (Claude Desktop folder, Cursor, Codex, Gemini CLI, Windsurf, Cline, ...).
  python3 kit/tools/doctor.py            (standard library only; macOS / Linux / WSL / Windows)
Checks python, node, ffmpeg, fluidsynth + FluidR3_GM.sf2, Python packages, Playwright + Chromium, symlink permission, .env and prints the
exact fix command for each missing piece. Exit code 0 = ready, 1 = something required is missing. It changes nothing."""
import os, sys, shutil, subprocess, platform, importlib.util, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SYS = platform.system()                     # Darwin / Linux / Windows
WSL = SYS == 'Linux' and 'microsoft' in platform.release().lower()
bad = []; warn = []


def say(ok, name, detail='', fix='', required=True):
    print(('  ✓ ' if ok else ('  ✗ ' if required else '  · ')) + name + (' — ' + detail if detail else ''))
    if not ok:
        (bad if required else warn).append((name, fix))


def run(cmd, timeout=30):
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, shell=isinstance(cmd, str)); return r.returncode, (r.stdout + r.stderr).strip()
    except Exception as e:
        return 1, str(e)


def hint(mac, linux, win):
    return {'Darwin': mac, 'Linux': linux, 'Windows': win}[SYS]


print('ARSIP KASUS doctor · %s%s · Python %s · %s' % (SYS, ' (WSL)' if WSL else '', platform.python_version(), ROOT))
v = sys.version_info
say(v >= (3, 10), 'python >= 3.10', '%d.%d' % v[:2], hint('brew install python@3.12', 'sudo apt install python3 python3-pip', 'winget install Python.Python.3.12'))
n = shutil.which('node'); nv = run(['node', '-v'])[1] if n else ''
say(bool(n) and int(nv.lstrip('v').split('.')[0] or 0) >= 18, 'node >= 18', nv, hint('brew install node', 'sudo apt install nodejs npm  (atau nvm)', 'winget install OpenJS.NodeJS.LTS'))
say(bool(shutil.which('ffmpeg')) and bool(shutil.which('ffprobe')), 'ffmpeg + ffprobe', shutil.which('ffmpeg') or '', hint('brew install ffmpeg', 'sudo apt install ffmpeg', 'winget install Gyan.FFmpeg'))
fs = shutil.which('fluidsynth')
say(bool(fs), 'fluidsynth', fs or '', hint('brew install fluid-synth', 'sudo apt install fluidsynth', 'winget install FluidSynth.FluidSynth  (atau pakai WSL2)'))
cands = [os.environ.get('SF2', ''), '/usr/share/sounds/sf2/FluidR3_GM.sf2', '/usr/share/soundfonts/FluidR3_GM.sf2', '/opt/homebrew/share/soundfonts/FluidR3_GM.sf2',
         '/usr/local/share/soundfonts/FluidR3_GM.sf2', os.path.join(ROOT, 'FluidR3_GM.sf2')]
sf = next((c for c in cands if c and os.path.isfile(c)), '')
say(bool(sf), 'soundfont FluidR3_GM.sf2', sf, hint('taruh FluidR3_GM.sf2 (MIT) lalu export SF2=/path/FluidR3_GM.sf2', 'sudo apt install fluid-soundfont-gm  (atau export SF2=...)', 'unduh FluidR3_GM.sf2 lalu set SF2=C:\\path\\FluidR3_GM.sf2'))
print('Paket Python (pip install -r requirements.txt):')
for mod, pipname, req in [('numpy', 'numpy', 1), ('scipy', 'scipy', 1), ('PIL', 'pillow', 1), ('mido', 'mido', 1), ('requests', 'requests', 1),
                          ('faster_whisper', 'faster-whisper', 1), ('yt_dlp', 'yt-dlp', 0)]:
    say(importlib.util.find_spec(mod) is not None, pipname, '' if req else 'opsional (riset topik)', 'pip install ' + pipname, bool(req))
print('Playwright + Chromium:')
if n:
    rc, out = run(['node', '-e', "const {chromium}=require('playwright');chromium.launch().then(b=>b.close()).then(()=>console.log('ok')).catch(e=>{console.log(e.message.split('\\n')[0]);process.exit(1)})"], 60)
    say(rc == 0, 'playwright + chromium', out if rc else '', 'cd %s && npm install && npx playwright install chromium' % ROOT)
else:
    say(False, 'playwright + chromium', 'node tidak ada', 'pasang node dulu')
print('Folder kerja:')
d = tempfile.mkdtemp(prefix='doctor_')
try:
    os.symlink('.', os.path.join(d, 'l')); say(True, 'hak membuat symlink')
except (OSError, NotImplementedError, AttributeError):
    say(False, 'hak membuat symlink', 'tidak diizinkan; links.sh memakai SALINAN bertanda .copied_by_links', hint('-', '-', 'Windows: aktifkan Developer Mode atau pakai WSL2'), required=False)
finally:
    shutil.rmtree(d, ignore_errors=True)
say(os.access(ROOT, os.W_OK), 'folder repo bisa ditulis', ROOT, 'periksa izin folder')
env = os.path.join(ROOT, '.env')
say(os.path.exists(env), '.env (opsional: ELEVENLABS_API_KEY untuk kit/audio/tts_elevenlabs.py)', '' if os.path.exists(env) else 'salin .env.example → .env bila mau generate VO dari skrip', 'cp .env.example .env', required=False)
if SYS == 'Windows':
    print('  · Windows native: skrip *.sh butuh Git Bash/WSL2. Disarankan WSL2 (Ubuntu) untuk pipeline penuh.')
print()
if bad:
    print('BELUM SIAP. Perbaiki:'); [print('  - %s: %s' % x) for x in bad]; sys.exit(1)
print('SIAP.' + ('' if not warn else '  (%d opsional belum ada)' % len(warn)))
