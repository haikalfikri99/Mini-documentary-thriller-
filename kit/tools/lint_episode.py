"""Lint ARSIP KASUS episodes against the anti-monotony rules v6.1 (18 Nov 2026; references/1-cerita… §M7, 8-hook… §I, 2-visual… §M).
    python3 kit/tools/lint_episode.py <slug> [<slug> ...]            per-episode checks
    python3 kit/tools/lint_episode.py --batch <s1> <s2> <s3> <s4>    + batch checks, slugs in PUBLISHING order
Reads stories/<slug>/README.md (markers [HOOK: …] [ENDING: …] [SEGAR: <tahun>|klasik]), audio/script_vo.txt, kolase/episode.json.
v6.1 rules are ERRORS for episodes #013+ and WARNINGS (history log) for #001–#012. Exit code 1 when any error. Standard library only."""
import os, re, sys, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STRICT_FROM = 13
HOOKS = ['Bom di Bawah Meja', 'Ketidaknyamanan Kontra-Intuitif', 'Bukti Visual Mendahului Konteks', 'Celah Ujung Lidah', 'Titik Balik Hasil Ekstrem']
ENDINGS = ['Reframing Sistemik', 'Cermin Personal', 'Dilema Abu-Abu', 'Lingkar Naratif Mulus', 'Pemicu Dunia Nyata']
EXIT_OPENERS = ['jadi', 'kesimpulannya', 'pada akhirnya', 'nah itulah', 'lain kali', 'kalau kamu', 'kalo kamu', 'ingat ya']
MODES = {'Ringkas': ((85, 105), (35, 42)), 'Investigasi': ((115, 135), (48, 55))}
norm = lambda s: re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def marker(text, key):
    m = re.search(r'\[' + key + r'\s*:\s*([^\]]+)\]', text, re.I)
    return m.group(1).strip() if m else None


def pick(value, names):
    """'5. Titik Balik Hasil Ekstrem (K5)' → the canonical name, or None"""
    if not value: return None
    v = norm(value)
    return next((n for n in names if norm(n) in v), None)


def sentences(text):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+', text.strip()) if s.strip()]


def h1_pattern(first):
    """'[X]—tapi [Y]': a contrast hinge 'tapi' after a dash or comma in the first sentence"""
    return bool(re.search(r'(—|–|-|,)\s*tapi\b', first, re.I))


def exit_opener(s):
    t = norm(s)
    return next((o for o in EXIT_OPENERS if t == o or t.startswith(o + ' ')), None)


def load(slug, root=ROOT):
    d = os.path.join(root, 'stories', slug)
    readme = open(os.path.join(d, 'README.md'), encoding='utf-8').read() if os.path.exists(os.path.join(d, 'README.md')) else ''
    sp = os.path.join(d, 'audio', 'script_vo.txt')
    script = open(sp, encoding='utf-8').read() if os.path.exists(sp) else ''
    ep = {}
    for p in (os.path.join(d, 'kolase', 'episode.json'), os.path.join(d, 'meta.json')):
        if os.path.exists(p):
            j = json.load(open(p, encoding='utf-8'))
            ep.setdefault('no', j.get('no') or (int(re.search(r'#(\d+)', j.get('series', '#0')).group(1)) if j.get('series') else None))
            ep.setdefault('dur', j.get('dur'))
    paras = [p.strip() for p in script.strip().split('\n') if p.strip()]
    sents = sentences(script)
    words = len(re.findall(r"[\w’'-]+", script))
    dur = ep.get('dur') or None
    mode = next((m for m, ((w0, w1), _) in MODES.items() if w0 <= words <= w1), None)
    if not mode and dur: mode = next((m for m, (_, (d0, d1)) in MODES.items() if d0 <= dur <= d1), None)
    seg = marker(readme, 'SEGAR')
    year = int(re.search(r'(19|20)\d\d', seg).group(0)) if seg and re.search(r'(19|20)\d\d', seg) else None
    return dict(slug=slug, no=ep.get('no') or 0, dur=dur, words=words, mode=mode,
                hook=pick(marker(readme, 'HOOK'), HOOKS), hook_raw=marker(readme, 'HOOK'),
                ending=pick(marker(readme, 'ENDING'), ENDINGS), ending_raw=marker(readme, 'ENDING'),
                fresh=(year is not None and year >= 2020), segar_raw=seg,
                first=sents[0] if sents else '', last=sents[-1] if sents else '', last_para=paras[-1] if paras else '')


def lint_episode(e):
    out = []                                                     # (level, message); level 'E' error / 'W' warning
    lv = 'E' if e['no'] >= STRICT_FROM else 'W'
    if not e['hook']: out.append((lv, '[HOOK: <arketipe>] tidak ada/tidak dikenal di README (pilihan: %s)' % ' · '.join(HOOKS)))
    if not e['ending']: out.append((lv, '[ENDING: <arketipe>] tidak ada/tidak dikenal di README (pilihan: %s)' % ' · '.join(ENDINGS)))
    if e['ending'] == 'Lingkar Naratif Mulus' and e['mode'] != 'Ringkas':
        out.append((lv, 'penutup Lingkar Naratif Mulus khusus Mode Ringkas (mode episode: %s)' % (e['mode'] or 'di luar rentang')))
    for label, s in (('kalimat terakhir', e['last']), ('paragraf penutup', e['last_para'])):
        o = exit_opener(s)
        if o: out.append(('E' if o in ('jadi', 'kesimpulannya', 'pada akhirnya', 'nah itulah') else lv, '%s diawali kata terlarang "%s": %s' % (label, o, s[:80])))
    if not e['mode']:
        out.append(('W', '%d kata%s: di luar Mode Ringkas (85–105 kata, 35–42 dtk) dan Investigasi (115–135 kata, 48–55 dtk)'
                    % (e['words'], ' / %.1f dtk' % e['dur'] if e['dur'] else '')))
    if e['segar_raw'] is None: out.append((lv, '[SEGAR: <tahun fenomena/studi> | klasik] tidak ada di README'))
    return out


def lint_batch(eps):
    out = []
    strict = any(e['no'] >= STRICT_FROM for e in eps); lv = 'E' if strict else 'W'
    for a, b in zip(eps, eps[1:]):
        if a['hook'] and a['hook'] == b['hook']: out.append((lv, 'arketipe hook sama berurutan: %s → %s (%s)' % (a['slug'], b['slug'], a['hook'])))
        if a['ending'] and a['ending'] == b['ending']: out.append((lv, 'arketipe penutup sama berurutan: %s → %s (%s)' % (a['slug'], b['slug'], a['ending'])))
        if a['mode'] and a['mode'] == b['mode']: out.append((lv, 'mode durasi tidak selang-seling: %s → %s (keduanya %s)' % (a['slug'], b['slug'], a['mode'])))
    tapi = [e['slug'] for e in eps if h1_pattern(e['first'])]
    if len(tapi) > 1: out.append((lv, 'pola H1 "[X]—tapi [Y]" berulang di batch: %s' % ', '.join(tapi)))
    modes = {e['mode'] for e in eps}
    if not {'Ringkas', 'Investigasi'} <= modes: out.append((lv, 'batch wajib memuat Mode Ringkas DAN Investigasi (ada: %s)' % (', '.join(sorted(m for m in modes if m)) or '-')))
    fresh = sum(e['fresh'] for e in eps)
    if len(eps) >= 4 and fresh < 2: out.append((lv, 'filter kesegaran: hanya %d dari %d episode bertopik segar 2020–2026 (min 2)' % (fresh, len(eps))))
    return out


def main(argv):
    batch = '--batch' in argv; slugs = [a for a in argv if not a.startswith('--')]
    if not slugs: print(__doc__); return 2
    eps = [load(s) for s in slugs]; errors = 0
    for e in eps:
        res = lint_episode(e); errors += sum(l == 'E' for l, _ in res)
        print('#%03d %-12s %s · %d kata · hook=%s · ending=%s · segar=%s' % (e['no'], e['slug'], e['mode'] or 'mode?', e['words'], e['hook'] or '-', e['ending'] or '-', e['segar_raw'] or '-'))
        for l, m in res: print('   %s %s' % ('✗' if l == 'E' else '⚠', m))
    if batch:
        res = lint_batch(eps); errors += sum(l == 'E' for l, _ in res)
        print('batch (%s):' % ' → '.join(e['slug'] for e in eps))
        for l, m in res: print('   %s %s' % ('✗' if l == 'E' else '⚠', m))
        if not res: print('   ok')
    print('lint: %d error' % errors)
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
