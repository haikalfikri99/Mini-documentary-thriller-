"""OPTIONAL: generate the narration straight from a local agent / terminal with the ElevenLabs HTTP API (standard library only).
  python3 kit/audio/tts_elevenlabs.py stories/<slug>/audio/vo_prompt_elevenlabs.txt stories/<slug>/audio/raw_take1.mp3 --yes
COSTS CREDITS and must only be run with the owner's permission (hence the required --yes). Never loop or retry automatically: one call = one billed take.
Key: ELEVENLABS_API_KEY from the environment or a local .env (git-ignored). Input = the TAGGED text only ([curious] … lines), plain UTF-8.
Defaults = channel settings (SKILL.md): voice Saos Cocol R86jddkroI9bJwXFfjsr, model eleven_v4. The main path stays: the owner generates in
elevenlabs.io (or Claude's ElevenLabs connector) from audio/vo_prompt_elevenlabs.md. Afterwards: kit/audio/vo_tighten.py → align_vo.py."""
import os, sys, json, argparse, urllib.request, urllib.error

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))


def key():
    k = os.environ.get('ELEVENLABS_API_KEY')
    p = os.path.join(ROOT, '.env')
    if not k and os.path.exists(p):
        for l in open(p, encoding='utf-8'):
            if l.strip().startswith('ELEVENLABS_API_KEY='): k = l.split('=', 1)[1].strip().strip('"\'')
    return k


ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
ap.add_argument('text_file'); ap.add_argument('out_mp3')
ap.add_argument('--voice', default=os.environ.get('ELEVENLABS_VOICE_ID', 'R86jddkroI9bJwXFfjsr'))
ap.add_argument('--model', default=os.environ.get('ELEVENLABS_MODEL', 'eleven_v4'))
ap.add_argument('--yes', action='store_true', help='confirm that the owner allowed spending credits')
a = ap.parse_args()
if not a.yes: sys.exit('Berhenti: ini memakai kredit ElevenLabs. Minta izin pemilik channel, lalu jalankan lagi dengan --yes.')
if os.path.exists(a.out_mp3): sys.exit('Berhenti: %s sudah ada (tidak ditimpa; hapus dulu bila memang mau take baru).' % a.out_mp3)
k = key()
if not k: sys.exit('ELEVENLABS_API_KEY belum diisi (.env atau environment).')
text = open(a.text_file, encoding='utf-8').read().strip()
req = urllib.request.Request('https://api.elevenlabs.io/v1/text-to-speech/%s?output_format=mp3_44100_128' % a.voice,
                             data=json.dumps({'text': text, 'model_id': a.model}).encode('utf-8'),
                             headers={'xi-api-key': k, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'})
try:
    audio = urllib.request.urlopen(req, timeout=180).read()
except urllib.error.HTTPError as e:
    sys.exit('ElevenLabs HTTP %d: %s' % (e.code, e.read().decode('utf-8', 'replace')[:300]))
open(a.out_mp3, 'wb').write(audio); print('✓', a.out_mp3, len(audio) // 1024, 'KB (1 take dibebankan)')
