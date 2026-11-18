"""Lint ARSIP KASUS episodes against the anti-monotony rules v6.1 (18 Nov 2026; references/1-cerita… §M7, 8-hook… §I, 2-visual… §M).
    python3 kit/tools/lint_episode.py <slug> [<slug> ...]            per-episode checks
    python3 kit/tools/lint_episode.py --batch <s1> <s2> <s3> <s4>    + batch checks, slugs in PUBLISHING order
Reads stories/<slug>/README.md (markers [HOOK: …] [ENDING: …] [SEGAR: <tahun>|klasik] [MODE: Ringkas|Investigasi] [ARTEFAK: …] [LOOP: detail → makna @detik]
[LABEL: …] and optionally [SLOT-UJI]), audio/script_vo.txt, kolase/episode.json, UPLOAD.md (if present).
Checks (v6.1 + 18 Nov 2026 additions): markers, word range of the 2 duration modes, Kuda Troya in title (<= 55 chars) and H1, ABT connectors / no list
transitions, zero spoken citation, blacklist of closing-sentence openers (Jadi, Kesimpulannya, Pada akhirnya, Nah itulah, Intinya, Lain kali, Kalau kamu,
Kalo kamu, Ingat ya), upload package (2-3 sentence description + Sumber, pinned-comment question).
v6.1 rules are ERRORS for episodes #013+ and WARNINGS (history log) for #001–#012. Exit code 1 when any error. Standard library only."""
import os, re, sys, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STRICT_FROM = 13
HOOKS = ['Bom di Bawah Meja', 'Ketidaknyamanan Kontra-Intuitif', 'Bukti Visual Mendahului Konteks', 'Celah Ujung Lidah', 'Titik Balik Hasil Ekstrem']
ENDINGS = ['Reframing Sistemik', 'Cermin Personal', 'Dilema Abu-Abu', 'Lingkar Naratif Mulus', 'Pemicu Dunia Nyata']
EXIT_OPENERS = ['jadi', 'kesimpulannya', 'pada akhirnya', 'nah itulah', 'intinya', 'lain kali', 'kalau kamu', 'kalo kamu', 'ingat ya']
OLD_EXIT = ('jadi', 'kesimpulannya', 'pada akhirnya', 'nah itulah')                # always errors (v6.0)
TROJAN = ['psikologi', 'bias', 'kenapa', 'padahal', 'tapi', 'ternyata']          # forbidden in title (and frame 0) unless [SLOT-UJI]
TROJAN_H1 = ['psikologi', 'bias', 'kenapa', 'padahal', 'ternyata']               # spoken H1: 'tapi' is governed by the batch "—tapi" rule (7-selera #80c)
TITLE_MAX = 55
ABT = ['tetapi', 'anehnya', 'masalahnya', 'akibatnya', 'karena itu']
LIST_TRANSITIONS = ['selain itu', 'berikutnya', 'tidak hanya itu', 'dan kemudian']
CITATION = [r'\bet al\b', r'\bdoi\b', r'\bjurnal\b', r'\bjournal\b', r'\bmeta[- ]?analisis\b', r'\b(profesor|prof\.|guru besar)\b',
            r'\b(menurut|dalam|di) (sebuah |satu )?(studi|penelitian|makalah|riset)\b[^.]{0,80}\b(19|20)\d\d\b']
MODES = {'Ringkas': ((85, 105), (35, 42)), 'Investigasi': ((115, 135), (48, 55))}
norm = lambda s: re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def marker(text, key):
    m = re.search(r'\[' + key + r'\s*:\s*([^\]]+)\]', text, re.I)
    v = m.group(1).strip() if m else None
    return None if v is None or '<' in v else v          # '<…>' = unfilled scaffold placeholder


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


def has_word(text, w):
    return re.search(r'(?<![a-z0-9])' + re.escape(w) + r'(?![a-z0-9])', text.lower()) is not None


def fence_after(text, heading):
    """first ``` block after a markdown heading line containing `heading` (case-insensitive)"""
    m = re.search(r'^#{1,4}[^\n]*' + heading + r'[^\n]*\n(.*?)```[^\n]*\n(.*?)```', text, re.I | re.S | re.M)
    return m.group(2).strip() if m else None


def find_title(readme, upload):
    if upload:
        t = fence_after(upload, 'Judul')
        if t: return t.splitlines()[0].strip()
    m = re.search(r'^\*\*Judul[^:*]*:\*\*\s*`?([^`\n·]+)', readme, re.M) or re.search(r'^Judul[^\n:]*:\s*`?([^`\n·]+)', readme, re.M)
    return m.group(1).strip() if m else None


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
    mode_decl = pick(marker(readme, 'MODE'), list(MODES))
    if not mode and dur: mode = next((m for m, (_, (d0, d1)) in MODES.items() if d0 <= dur <= d1), None)
    if not script and mode_decl: mode = mode_decl                              # before the script exists the declared mode stands in
    up = os.path.join(d, 'UPLOAD.md')
    upload = open(up, encoding='utf-8').read() if os.path.exists(up) else None
    seg = marker(readme, 'SEGAR')
    year = int(re.search(r'(19|20)\d\d', seg).group(0)) if seg and re.search(r'(19|20)\d\d', seg) else None
    return dict(slug=slug, no=ep.get('no') or 0, dur=dur, words=words, mode=mode,
                hook=pick(marker(readme, 'HOOK'), HOOKS), hook_raw=marker(readme, 'HOOK'),
                ending=pick(marker(readme, 'ENDING'), ENDINGS), ending_raw=marker(readme, 'ENDING'),
                fresh=(year is not None and year >= 2020), segar_raw=seg,
                mode_decl=pick(marker(readme, 'MODE'), list(MODES)), mode_raw=marker(readme, 'MODE'),
                artefak=marker(readme, 'ARTEFAK'), loop=marker(readme, 'LOOP'), label=marker(readme, 'LABEL'),
                slot_uji=bool(re.search(r'\[SLOT-UJI\]', readme, re.I)), title=find_title(readme, upload), upload=upload, script=script,
                first=sents[0] if sents else '', last=sents[-1] if sents else '', last_para=paras[-1] if paras else '')


def lint_upload(e, lv):
    out = []; u = e.get('upload')
    if not u: return out
    if re.search(r'TODO|<<', u): return [('W', 'UPLOAD.md masih kerangka (TODO); pemeriksaan paket upload ditunda')]
    desc = fence_after(u, 'Deskripsi')
    if desc:
        n = len(sentences(desc.split('\n\n')[0].replace('\n', ' ')))
        if not 2 <= n <= 3: out.append((lv, 'deskripsi: paragraf pembuka harus 2–3 kalimat (ada %d)' % n))
        if not re.search(r'^\s*Sumber\b', desc, re.M | re.I): out.append((lv, 'deskripsi: daftar "Sumber:" tidak ada'))
    else: out.append((lv, 'UPLOAD.md: blok "Deskripsi" (``` … ```) tidak ditemukan'))
    pin = fence_after(u, 'Komentar pin')
    if pin:
        if '?' not in pin or not has_word(pin, 'kamu'): out.append((lv, 'komentar pin: wajib memuat pertanyaan pengalaman pribadi penonton (kata "kamu" + "?")'))
    else: out.append((lv, 'UPLOAD.md: blok "Komentar pin" (``` … ```) tidak ditemukan'))
    return out


def lint_episode(e):
    out = []                                                     # (level, message); level 'E' error / 'W' warning
    lv = 'E' if e['no'] >= STRICT_FROM else 'W'
    if not e['hook']: out.append((lv, '[HOOK: <arketipe>] tidak ada/tidak dikenal di README (pilihan: %s)' % ' · '.join(HOOKS)))
    if not e['ending']: out.append((lv, '[ENDING: <arketipe>] tidak ada/tidak dikenal di README (pilihan: %s)' % ' · '.join(ENDINGS)))
    if e['ending'] == 'Lingkar Naratif Mulus' and e['mode'] != 'Ringkas':
        out.append((lv, 'penutup Lingkar Naratif Mulus khusus Mode Ringkas (mode episode: %s)' % (e['mode'] or 'di luar rentang')))
    for label, s in (('kalimat terakhir', e['last']), ('paragraf penutup', e['last_para'])):
        o = exit_opener(s)
        if o: out.append(('E' if o in OLD_EXIT else lv, '%s diawali kata terlarang "%s": %s' % (label, o, s[:80])))
    # --- 2 mode durasi
    if e['mode_raw'] is not None and not e['mode_decl']: out.append((lv, '[MODE: …] tidak dikenal (pilihan: Ringkas | Investigasi): %s' % e['mode_raw']))
    elif e['mode_decl']:
        (w0, w1), _ = MODES[e['mode_decl']]
        if e['script'] and not w0 <= e['words'] <= w1:
            out.append((lv, '[MODE: %s] butuh %d–%d kata, skrip %d kata' % (e['mode_decl'], w0, w1, e['words'])))
    else:
        if e['no'] >= STRICT_FROM and e['script']: out.append((lv, '[MODE: Ringkas|Investigasi] tidak ada di README'))
    if not e['mode']:
        out.append(('W', '%d kata%s: di luar Mode Ringkas (85–105 kata, 35–42 dtk) dan Investigasi (115–135 kata, 48–55 dtk)'
                    % (e['words'], ' / %.1f dtk' % e['dur'] if e['dur'] else '')))
    if e['segar_raw'] is None: out.append((lv, '[SEGAR: <tahun fenomena/studi> | klasik] tidak ada di README'))
    # --- v6.1+ penanda dramaturgi
    if not e['artefak']: out.append((lv, '[ARTEFAK: <benda fisik di Frame 0>] tidak ada di README'))
    if not e['loop'] or '→' not in e['loop'] and '->' not in e['loop']: out.append((lv, '[LOOP: <detail Frame 0> → <makna yang terungkap> @<detik>] tidak ada/tidak lengkap di README'))
    if not e['label']: out.append((lv, '[LABEL: DATA INDONESIA + EKSPERIMEN … | satu asal] tidak ada di README'))
    elif '+' in e['label'] and not (has_word(e['label'], 'indonesia') and re.search(r'eksperimen|studi', e['label'], re.I)):
        out.append((lv, '[LABEL] campuran asal harus memuat DATA INDONESIA dan EKSPERIMEN/STUDI <negara>: %s' % e['label']))
    # --- Kuda Troya: judul + H1
    if e['title']:
        if len(e['title']) > TITLE_MAX: out.append((lv, 'judul %d karakter (maks %d): %s' % (len(e['title']), TITLE_MAX, e['title'])))
        if not e['slot_uji']:
            bad = [w for w in TROJAN if has_word(e['title'], w)] + (['?'] if '?' in e['title'] else [])
            if bad: out.append((lv, 'Kuda Troya: judul memuat %s (kecuali [SLOT-UJI]): %s' % (', '.join(bad), e['title'])))
    elif e['no'] >= STRICT_FROM: out.append(('W', 'judul tidak ditemukan (README **Judul:** atau UPLOAD.md ## 1. Judul)'))
    if e['first'] and not e['slot_uji']:
        bad = [w for w in TROJAN_H1 if has_word(e['first'], w)] + (['?'] if '?' in e['first'] else [])
        if bad: out.append((lv, 'Kuda Troya: H1 memuat %s: %s' % (', '.join(bad), e['first'][:80])))
    # --- ABT, daftar, sitasi
    if e['script']:
        low = e['script'].lower()
        if not any(has_word(low, c) for c in ABT): out.append((lv, 'perekat ABT tidak ada (tetapi/anehnya/masalahnya/akibatnya/karena itu)'))
        for lt in LIST_TRANSITIONS:
            if has_word(low, lt): out.append((lv, 'transisi daftar terlarang "%s" (ABT, §M3)' % lt))
        for pat in CITATION:
            m = re.search(pat, low)
            if m: out.append((lv, 'sitasi akademik lisan kaku (Zero-Citation): "%s"' % m.group(0)[:60]))
    out += lint_upload(e, lv)
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
    if sum(e['slot_uji'] for e in eps) > 1: out.append((lv, 'kuota judul 3:1: lebih dari 1 [SLOT-UJI] di batch'))
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
