"""Lint ARSIP KASUS episodes against Formula ARSIP v7.0 (20 Nov 2026; SSOT AGENTS.md §2/§2A, 1-cerita… §M7 + §M9, 8-hook… §I + §J, 2-visual… §M + §O).
    python3 kit/tools/lint_episode.py <slug> [<slug> ...]            per-episode checks
    python3 kit/tools/lint_episode.py --batch <s1> <s2> <s3> <s4>    + batch checks, slugs in PUBLISHING order (+ checks against stories/episode_log.json)
    python3 kit/tools/lint_episode.py --log <s1> [<s2> ...]          write/refresh these episodes in stories/episode_log.json (history for --batch)
Reads stories/<slug>/README.md (markers [HOOK: …] [ENDING: …] [MODE: Ringkas|Investigasi] [MESIN: A1|A2|B3|B4] [LATAR: …] [ARTEFAK: …] [LOOP: detail → makna @detik]
[LABEL: …], optional [SEGAR: <tahun>|klasik] (a note only, NOT checked) and optional [SLOT-UJI]), audio/script_vo.txt, kolase/episode.json, UPLOAD.md (if present).
Checks: markers, word range of the 2 duration modes, Kuda Troya in title (<= 55 chars) and H1, ABT connectors / no list transitions, zero spoken citation,
blacklist of closing-sentence openers (Jadi, Kesimpulannya, Pada akhirnya, Nah itulah, Intinya, Lain kali, Kalau kamu, Kalo kamu, Ingat ya), upload package
(2-3 sentence description + Sumber, pinned-comment question), batch: hook/ending/mode alternation, latar rotation (no 3 same in a row), Mesin A 2-3 of 4, 3:1 title slot.
v7.0 (ERRORS for #017+, warnings before; #013–#016 scripts are locked): 'tapi'/'padahal' forbidden in title AND first sentence (0–4 s) but allowed in the body
(valid ABT glue; warning if > 3 uses); [MESIN] and [LATAR] markers; stiff spoken citations ('menurut studi/penelitian'); BATCH: > 1 of 4 episodes whose first sentence
has the form '[benda] ini / kayak gini …' (the word 'ini' or 'kayak gini/begini/gini' within the first 8 words) = warning (8-hook §J: vary the opening form; ERROR→WARN 23 Nov 2026, 10-kitab-cerita).
Attribution chain: >= 3 different institutions with a spoken attribution verb in one script = warning (10-kitab-cerita §3).
Warnings: sentence > 17 words, 3+ staccato sentences (≤ 4 words) in a row, stiff words (tersebut, sehingga, melakukan), 'sapu nominalisasi/pasif' (many
pe-…-an / ke-…-an / per-…-an / -isasi words or di-/ter- passives in one script). Freshness ([SEGAR]) and the repeated 'X—tapi Y' H1 pattern are no longer checked.
v6.1 rules are ERRORS for episodes #013+ and WARNINGS (history log) for #001–#012. Exit code 1 when any error. Standard library only."""
import os, re, sys, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STRICT_FROM = 13
V7_FROM = 17                                   # Formula ARSIP v7.0 rules are errors from this episode (#013–#016 are locked scripts: warnings)
LOG_PATH = os.path.join(ROOT, 'stories', 'episode_log.json')
MESINS = ['A1', 'A2', 'B3', 'B4']             # A1 skandal/kartel/celah aturan · A2 backfire · B3 jebakan harga/desain · B4 anomali perilaku
LATARS = ['layar', 'dokumen', 'kemasan', 'benda', 'peta', 'grafik', 'tempat']   # main visual background/artefact family (2-visual §O)
HOOKS = ['Bom di Bawah Meja', 'Ketidaknyamanan Kontra-Intuitif', 'Bukti Visual Mendahului Konteks', 'Celah Ujung Lidah', 'Titik Balik Hasil Ekstrem']
ENDINGS = ['Reframing Sistemik', 'Cermin Personal', 'Dilema Abu-Abu', 'Lingkar Naratif Mulus', 'Pemicu Dunia Nyata']
EXIT_OPENERS = ['jadi', 'kesimpulannya', 'pada akhirnya', 'nah itulah', 'intinya', 'lain kali', 'kalau kamu', 'kalo kamu', 'ingat ya']
OLD_EXIT = ('jadi', 'kesimpulannya', 'pada akhirnya', 'nah itulah')                # always errors (v6.0)
TROJAN = ['psikologi', 'bias', 'kenapa', 'padahal', 'tapi', 'ternyata']          # forbidden in title (and frame 0) unless [SLOT-UJI]
TROJAN_H1 = ['psikologi', 'bias', 'kenapa', 'padahal', 'ternyata']               # spoken H1 (first sentence, 0–4 s); v7.0 adds 'tapi' (TROJAN_H1_V7), replacing 7-selera #80c
TROJAN_H1_V7 = ['tapi']
TITLE_MAX = 55
ABT = ['tetapi', 'tapi', 'padahal', 'anehnya', 'masalahnya', 'akibatnya', 'karena itu']   # v7.0: tapi/padahal = valid ABT glue in the BODY (not in title / first sentence)
LIST_TRANSITIONS = ['selain itu', 'berikutnya', 'tidak hanya itu', 'dan kemudian']
CITATION = [r'\bet al\b', r'\bdoi\b', r'\bjurnal\b', r'\bjournal\b', r'\bmeta[- ]?analisis\b', r'\b(profesor|prof\.|guru besar)\b',
            r'\b(menurut|dalam|di) (sebuah |satu )?(studi|penelitian|makalah|riset)\b[^.]{0,80}\b(19|20)\d\d\b']
STIFF_CITATION = [r'\b(menurut|berdasarkan) (sebuah |satu )?(studi|penelitian|riset)\b']   # v7.0: spoken sources go on the card, not in the VO
STIFF_WORDS = ['tersebut', 'sehingga', 'melakukan']                                 # v7.0: stiff written-style words (use lisan: itu, jadi/bikin, ngelakuin)
MAX_SENT_WORDS = 17
OPEN_ITU = re.compile(r'(?<![a-z0-9])(ini|kayak gini|kayak begini|begini|gini)(?![a-z0-9])')   # opener form '[benda] ini / kayak gini …' (8-hook §J: max 1 of 4 per batch)
OPEN_ITU_WORDS = 8
# attribution chain (WARN, 10-kitab-cerita §3): >= 3 different institutions each given a spoken attribution ("kata Polri", "Satgas nyebut", "Kementan mengklaim")
ATTR_VERB = re.compile(r'(?<![a-z0-9])(kata|katanya|menurut|hitungan|nyebut|menyebut|mengklaim|klaim|bilang|mencatat|ngaku|mengaku)(?![a-z0-9])')
ATTR_INST = {'polri': r'polri|polisi|satgas', 'kementan': r'kementan|kementerian pertanian|mentan', 'kemendag': r'kemendag|kementerian perdagangan|mendag',
             'kppu': r'kppu', 'ojk': r'ojk', 'bpom': r'bpom', 'bps': r'bps', 'ylki': r'ylki', 'ombudsman': r'ombudsman', 'bapanas': r'bapanas',
             'komdigi': r'komdigi|kominfo|menkomdigi', 'mk': r'mahkamah konstitusi|\bmk\b', 'ma': r'mahkamah agung', 'bi': r'bank indonesia'}
ATTR_CHAIN_MAX = 3
# 'sapu nominalisasi/pasif' (WARN): nominal pe-…-an/ke-…-an/per-…-an/-isasi words and di-/ter- passives; stoplists = common concrete nouns / non-passive words
NOMINAL = re.compile(r'(?<![a-z0-9])(?:(?:pe(?:ng|ny|m|n)?|ke|per)[a-z]{3,}an|[a-z]{3,}isasi)(?![a-z0-9])')
PASSIVE = re.compile(r'(?<![a-z0-9])(?:di|ter)[a-z]{4,}(?![a-z0-9])')
NOMINAL_STOP = set('kementan kemudian kemahalan kelihatan perhatikan perusahaan pelanggan pengadilan pekerjaan pecahan pesanan pertengahan persaingan pemerintah'.split())
PASSIVE_STOP = set('dilema diskon digital dinding dimana direktur diri dingin dinas diam distributor terus terlalu terakhir termasuk tertentu ternyata terlanjur terjadi terbesar terbesarnya terkecil terbaru terdekat teratas terbaik tertinggi terendah dibanding'.split())
NOMINAL_MAX, NOMINAL_PASSIVE_MAX = 4, 9      # warn if nominal >= 4, or nominal + passive >= 9 in one script
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


def opens_with_itu(first):
    """first sentence has the form '[benda] ini / kayak gini …': 'ini' or 'kayak gini/begini/gini' within the first 8 words"""
    head = ' '.join(re.findall(r"[\w’'-]+", first.lower())[:OPEN_ITU_WORDS])
    return OPEN_ITU.search(head) is not None


def sapu_nominalisasi(low):
    """(nominal words, passive words) of a lowercase script, after the stoplists"""
    return ([m.group(0) for m in NOMINAL.finditer(low) if m.group(0) not in NOMINAL_STOP],
            [m.group(0) for m in PASSIVE.finditer(low) if m.group(0) not in PASSIVE_STOP])


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
    seg = marker(readme, 'SEGAR')                                              # optional note only (v7.0: not a gate, not checked)
    return dict(slug=slug, no=ep.get('no') or 0, dur=dur, words=words, mode=mode,
                hook=pick(marker(readme, 'HOOK'), HOOKS), hook_raw=marker(readme, 'HOOK'),
                ending=pick(marker(readme, 'ENDING'), ENDINGS), ending_raw=marker(readme, 'ENDING'),
                segar_raw=seg,
                mode_decl=pick(marker(readme, 'MODE'), list(MODES)), mode_raw=marker(readme, 'MODE'),
                mesin=pick(marker(readme, 'MESIN'), MESINS), mesin_raw=marker(readme, 'MESIN'), latar=pick(marker(readme, 'LATAR'), LATARS), latar_raw=marker(readme, 'LATAR'),
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
    lv7 = 'E' if e['no'] >= V7_FROM else 'W'
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
    # --- v6.1+ penanda dramaturgi
    if not e['artefak']: out.append((lv, '[ARTEFAK: <benda fisik di Frame 0>] tidak ada di README'))
    if not e['loop'] or '→' not in e['loop'] and '->' not in e['loop']: out.append((lv, '[LOOP: <detail Frame 0> → <makna yang terungkap> @<detik>] tidak ada/tidak lengkap di README'))
    if not e['label']: out.append((lv, '[LABEL: DATA INDONESIA + EKSPERIMEN … | satu asal] tidak ada di README'))
    elif '+' in e['label'] and not (has_word(e['label'], 'indonesia') and re.search(r'eksperimen|studi', e['label'], re.I)):
        out.append((lv, '[LABEL] campuran asal harus memuat DATA INDONESIA dan EKSPERIMEN/STUDI <negara>: %s' % e['label']))
    # --- v7.0 markers
    if not e['mesin']: out.append((lv7, '[MESIN: %s] tidak ada/tidak dikenal di README' % '|'.join(MESINS) + (': %s' % e['mesin_raw'] if e['mesin_raw'] else '')))
    if not e['latar']: out.append((lv7, '[LATAR: %s] tidak ada/tidak dikenal di README (latar visual utama, rotasi batch)' % '|'.join(LATARS) + (': %s' % e['latar_raw'] if e['latar_raw'] else '')))
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
        bad7 = [w for w in TROJAN_H1_V7 if has_word(e['first'], w)]
        if bad7: out.append((lv7, 'v7.0: kalimat pembuka (0–4 dtk) memuat %s (boleh di body/ABT, bukan di hook): %s' % (', '.join(bad7), e['first'][:80])))
    # --- ABT, daftar, sitasi
    if e['script']:
        low = e['script'].lower()
        if not any(has_word(low, c) for c in ABT): out.append((lv, 'perekat ABT tidak ada (tetapi/anehnya/masalahnya/akibatnya/karena itu)'))
        for lt in LIST_TRANSITIONS:
            if has_word(low, lt): out.append((lv, 'transisi daftar terlarang "%s" (ABT, §M3)' % lt))
        for pat in CITATION:
            m = re.search(pat, low)
            if m: out.append((lv, 'sitasi akademik lisan kaku (Zero-Citation): "%s"' % m.group(0)[:60]))
        for pat in STIFF_CITATION:
            m = re.search(pat, low)
            if m: out.append((lv7, 'v7.0: kutipan lisan kaku "%s" (sumber ditaruh di kartu visual, bukan dibaca)' % m.group(0)))
        n_tp = len(re.findall(r'(?<![a-z0-9])(tapi|padahal)(?![a-z0-9])', low))
        if n_tp > 3: out.append(('W', 'v7.0: "tapi/padahal" dipakai %d kali di body (maks wajar 3; variasikan perekat ABT)' % n_tp))
        sents = sentences(e['script'])
        for sn in sents:
            wc = len(re.findall(r"[\w’'-]+", sn))
            if wc > MAX_SENT_WORDS: out.append(('W', 'v7.0: kalimat %d kata (> %d; pecah agar satu tarikan napas): %s…' % (wc, MAX_SENT_WORDS, sn[:60])))
        run = 0
        for sn in sents + ['x x x x x x']:
            if len(re.findall(r"[\w’'-]+", sn)) <= 4: run += 1
            else:
                if run >= 3: out.append(('W', 'v7.0: %d kalimat pendek (≤ 4 kata) beruntun; terasa staccato' % run))
                run = 0
        attributed = set()
        for sn in sents:
            sl = sn.lower()
            if ATTR_VERB.search(sl): attributed |= {k for k, p in ATTR_INST.items() if re.search(r'(?<![a-z0-9])(%s)(?![a-z0-9])' % p, sl)}
        if len(attributed) >= ATTR_CHAIN_MAX:
            out.append(('W', 'rantai atribusi: %d lembaga berbeda diberi atribusi lisan (%s); terdengar seperti notulen. Jadikan lembaga pelaku adegan, sisanya ke kartu layar (10-kitab-cerita §3)' % (len(attributed), ', '.join(sorted(attributed)))))
        stiff = [w for w in STIFF_WORDS if has_word(low, w)]
        if stiff: out.append(('W', 'v7.0: kata kaku ala tulisan baku: %s (pakai bahasa lisan)' % ', '.join(stiff)))
        nom, pas = sapu_nominalisasi(low)
        if len(nom) >= NOMINAL_MAX or len(nom) + len(pas) >= NOMINAL_PASSIVE_MAX:
            out.append(('W', 'v7.0 sapu nominalisasi/pasif: %d kata benda berimbuhan (%s) + %d pasif di-/ter- (%s); ubah ke kata kerja aktif lisan' % (len(nom), ', '.join(sorted(set(nom))[:6]) or '-', len(pas), ', '.join(sorted(set(pas))[:6]) or '-')))
    out += lint_upload(e, lv)
    return out


def load_log():
    try: return json.load(open(LOG_PATH, encoding='utf-8'))
    except (OSError, ValueError): return []


def write_log(eps):
    log = {x['slug']: x for x in load_log()}
    for e in eps:
        log[e['slug']] = dict(no=e['no'], slug=e['slug'], title=e['title'], mode=e['mode'], mesin=e['mesin'], hook=e['hook'],
                              ending=e['ending'], latar=e['latar'], segar=e['segar_raw'])
    json.dump(sorted(log.values(), key=lambda x: x['no']), open(LOG_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(LOG_PATH, 'a').write('\n')


def lint_vs_log(eps):
    """batch checks against episodes already published/logged before the first episode of this batch (stories/episode_log.json)"""
    out = []; first = eps[0]; slugs = {e['slug'] for e in eps}
    prev = [x for x in load_log() if x['slug'] not in slugs and 0 < x['no'] < first['no']]
    if not prev: return out
    p = max(prev, key=lambda x: x['no']); lv = 'E' if first['no'] >= V7_FROM else 'W'
    if first['hook'] and p.get('hook') == first['hook']: out.append((lv, 'arketipe hook sama dengan episode sebelumnya di log: #%03d %s → %s (%s)' % (p['no'], p['slug'], first['slug'], first['hook'])))
    if first['ending'] and p.get('ending') == first['ending']: out.append((lv, 'arketipe penutup sama dengan episode sebelumnya di log: #%03d %s → %s (%s)' % (p['no'], p['slug'], first['slug'], first['ending'])))
    if first['mode'] and p.get('mode') == first['mode']: out.append((lv, 'mode durasi tidak selang-seling dengan #%03d %s (keduanya %s)' % (p['no'], p['slug'], first['mode'])))
    seq = [x.get('latar') for x in sorted(prev, key=lambda x: x['no'])[-2:]] + [e['latar'] for e in eps]
    for i in range(len(seq) - 2):
        if seq[i] and seq[i] == seq[i + 1] == seq[i + 2]: out.append((lv, 'latar visual sama 3 episode berturut-turut (termasuk log): %s' % seq[i])); break
    return out


def lint_batch(eps):
    out = []
    strict = any(e['no'] >= STRICT_FROM for e in eps); lv = 'E' if strict else 'W'
    for a, b in zip(eps, eps[1:]):
        if a['hook'] and a['hook'] == b['hook']: out.append((lv, 'arketipe hook sama berurutan: %s → %s (%s)' % (a['slug'], b['slug'], a['hook'])))
        if a['ending'] and a['ending'] == b['ending']: out.append((lv, 'arketipe penutup sama berurutan: %s → %s (%s)' % (a['slug'], b['slug'], a['ending'])))
        if a['mode'] and a['mode'] == b['mode']: out.append((lv, 'mode durasi tidak selang-seling: %s → %s (keduanya %s)' % (a['slug'], b['slug'], a['mode'])))
    if sum(e['slot_uji'] for e in eps) > 1: out.append((lv, 'kuota judul 3:1: lebih dari 1 [SLOT-UJI] di batch'))
    lv7 = 'E' if any(e['no'] >= V7_FROM for e in eps) else 'W'
    seq = [e['latar'] for e in eps]
    for i in range(len(seq) - 2):
        if seq[i] and seq[i] == seq[i + 1] == seq[i + 2]: out.append((lv7, 'v7.0: latar visual sama 3 episode berturut-turut: %s (rotasi latar, 2-visual §O)' % seq[i])); break
    if len(eps) >= 4 and all(e['mesin'] for e in eps):
        a = sum(e['mesin'].startswith('A') for e in eps)
        if not 2 <= a <= 3: out.append((lv7, 'v7.0: porsi Mesin A %d dari %d episode (target ~60%% = 2–3 dari 4)' % (a, len(eps))))
    itu = [e for e in eps if e['first'] and opens_with_itu(e['first'])]
    if len(itu) > 1:
        out.append(('W', 'v7.0: %d dari %d episode dibuka dengan pola "[benda] ini / kayak gini …" (maks 1): %s. Ganti bentuk lain di 8-hook §K (hasil angka, kontras angka, tokoh+angka, peristiwa, artefak tanpa penjelasan, dua kondisi kembar, ancaman tak disadari, intuisi dibantah, sapaan "kamu", kalimat bersyarat); benda Frame 0 cukup ditunjuk lewat visual'
                    % (len(itu), len(eps), '; '.join('#%03d %s ("%s")' % (e['no'], e['slug'], e['first'][:40]) for e in itu))))
    out += lint_vs_log(eps)
    modes = {e['mode'] for e in eps}
    if not {'Ringkas', 'Investigasi'} <= modes: out.append((lv, 'batch wajib memuat Mode Ringkas DAN Investigasi (ada: %s)' % (', '.join(sorted(m for m in modes if m)) or '-')))
    return out


def main(argv):
    batch = '--batch' in argv; slugs = [a for a in argv if not a.startswith('--')]
    if not slugs: print(__doc__); return 2
    eps = [load(s) for s in slugs]; errors = 0
    if '--log' in argv:
        write_log(eps); print('episode_log.json: %d episode dicatat/diperbarui' % len(eps)); return 0
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
