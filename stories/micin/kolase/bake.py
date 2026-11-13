"""ARSIP #003 Micin · bake every paper part into parts/ (ARSIP Kolase style).  python3 stories/micin/kolase/bake.py
Archive prints come from raw/ (downloaded by fetch.py from SOURCES.jsonl); everything else is drawn here."""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'kit', 'collage'))
from parts import *
from parts import font
HERE = os.path.dirname(os.path.abspath(__file__))
from scipy import ndimage as ndi

bk = Baker(os.path.join(HERE, 'parts'), os.path.join(HERE, 'raw'))
C = lambda a: tuple(int(v) for v in a)
ONLY = set(sys.argv[1:])           # bake a subset: python3 bake.py prints
want = lambda g: not ONLY or g in ONLY


def flats():
    bk.paper()
    bk.flat('f_green', GREEN, poly=[(-460, -380), (420, -430), (470, 300), (300, 380), (60, 330), (-200, 420), (-470, 300)], seed=11, rough=4)
    bk.flat('f_amber', AMBER, ell=(300, 300), seed=13, rough=3)
    bk.flat('f_amber_s', AMBER, ell=(170, 170), seed=14, rough=3)
    bk.flat('f_red', RED, poly=[(-700, -120), (700, -160), (690, 120), (-690, 150)], seed=15, rough=4)
    bk.flat('f_manila', MANILA, poly=[(-400, -300), (400, -290), (390, 300), (-410, 310)], seed=17, rough=3, mottle=0.05)
    bk.flat('f_cream', CARD * 0.99, poly=[(-650, -95), (650, -120), (640, 110), (-660, 95)], seed=19, rough=4, mottle=0.03)
    bk.flat('f_green_s', GREEN, ell=(230, 230), seed=21, rough=3)
    bk.flat('f_news', NEWS, poly=[(-480, -620), (470, -600), (480, 610), (-470, 630)], seed=23, rough=3, mottle=0.04)


# ---------- hero object: the MICIN sachet (our own printed packet, generic, no brand) ----------
def crystals_draw(d, k, cx, cy, s, seed, ink=C(INK), n=7, spread=1.0):
    r = np.random.default_rng(seed)
    for i in range(n):
        x, y, a = cx + r.normal(0, 60) * s * spread, cy + r.normal(0, 30) * s * spread, r.uniform(16, 30) * s
        top = [(x, y - a), (x + a, y - a * 0.5), (x, y), (x - a, y - a * 0.5)]
        left = [(x - a, y - a * 0.5), (x, y), (x, y + a), (x - a, y + a * 0.5)]
        right = [(x, y), (x + a, y - a * 0.5), (x + a, y + a * 0.5), (x, y + a)]
        P = lambda pts: [(px * k, py * k) for px, py in pts]
        d.polygon(P(top), fill=C(CARD), outline=ink, width=max(2, int(1.6 * k)))
        d.polygon(P(left), fill=C(CARD * 0.93), outline=ink, width=max(2, int(1.6 * k)))
        d.polygon(P(right), fill=C(CARD * 0.86), outline=ink, width=max(2, int(1.6 * k)))
        for j in range(1, 5):   # engraved hatching on the dark face
            f = j / 5
            d.line(P([(x + a * f, y - a * 0.5 * f + 2), (x + a * f, y + a - a * 0.5 * f - 2)]), fill=ink, width=max(1, int(0.9 * k)))


def sachet(name, opened=False, seed=31):
    w, h = 520, 720
    def shape(dm, k, P):
        zz = 26
        top = [(P + i * zz * k / 2 * 2, P + (0 if i % 2 == 0 else zz * 0.6 * k)) for i in range(int(w / zz) + 1)]
        if opened:
            r = np.random.default_rng(seed)
            top = [(P + x * k, P + (70 + r.normal(0, 7) + 18 * math.sin(x / 40)) * k) for x in np.linspace(0, w, 40)]
        bot = [(P + w * k - i * zz * k, P + h * k - (0 if i % 2 == 0 else zz * 0.6 * k)) for i in range(int(w / zz) + 1)]
        dm.polygon(top + [(P + w * k, P + h * k)] + bot + [(P, P + h * k)], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(0), X(0), X(w), X(70)], fill=C(CARD * 0.95))            # crimp band
        d.rectangle([X(0), X(80), X(w), X(300)], fill=C(RED))                  # red plate
        f = font(F_SLAB, 128 * k)
        tw = f.getlength('MICIN'); d.text((X(w / 2) - tw / 2, X(118)), 'MICIN', font=f, fill=C(CARD))
        fs = font(F_CPB, 30 * k); s = 'PENYEDAP RASA'
        d.text((X(w / 2) - fs.getlength(s) / 2, X(318)), s, font=fs, fill=C(INK))
        for i in range(3):
            d.line([X(40), X(366 + i * 7), X(w - 40), X(366 + i * 7)], fill=C(INK), width=max(1, int(1.2 * k)))
        crystals_draw(d, k, X(w / 2) / k, X(500) / k, 2.0, seed, n=6, spread=0.55)
        d.rectangle([X(0), X(620), X(w), X(h - 14)], fill=C(AMBER))
        fb = font(F_CPB, 34 * k); s = 'MONOSODIUM GLUTAMAT'
        d.text((X(w / 2) - fb.getlength(s) / 2, X(642)), s, font=fb, fill=C(INK))
    bk.doc(name, w, h, CARD, draw, seed=seed, rough=0.6, shape=shape)


def crystals():
    for i in range(4):
        def draw(img, d, k, P, i=i):
            crystals_draw(d, k, (P / k) + 50, (P / k) + 58, 1.6, 100 + i, n=1, spread=0)
        def shape(dm, k, P, i=i):
            r = np.random.default_rng(100 + i)
            dm.ellipse([P + 4 * k, P + 4 * k, P + 96 * k, P + 104 * k], fill=255)
        bk.doc(f'xtal{i}', 100, 110, CARD, draw, seed=200 + i, shape=shape)


# ---------- documents ----------
def documents():
    # envelope (address typed; the 1968 stamp is a separate cut-out pasted on it)
    def env(img, d, k, P):
        X = lambda v: P + v * k
        d.line([X(0), X(0), X(320), X(210), X(640), X(0)], fill=C(INK * 1.6), width=max(1, int(1.5 * k)))
        f = font(F_CP, 26 * k)
        for i, l in enumerate(['To the Editor', 'New England Journal of Medicine', 'Boston, Mass.']):
            d.text((X(150), X(250 + i * 36)), l, font=f, fill=C(INK))
    bk.doc('envelope', 640, 400, CARD * 0.98, env, seed=41)

    # the 1968 letter (short opening quote, typed)
    lines = ['I have experienced a strange', 'syndrome whenever I have eaten', 'out in a Chinese restaurant ...', '',
             'The most prominent symptoms', 'are numbness at the back of the', 'neck, gradually radiating to', 'both arms and the back, general', 'weakness and palpitation ...']
    def letter(img, d, k, P):
        X = lambda v: P + v * k
        fh = font(F_FELLSC, 40 * k); s = 'Chinese-Restaurant Syndrome'
        d.text((X(380) - fh.getlength(s) / 2, X(60)), s, font=fh, fill=C(INK))
        d.line([X(60), X(120), X(700), X(120)], fill=C(INK), width=max(1, int(1.2 * k)))
        d.text((X(60), X(150)), 'To the Editor:', font=font(F_FELLI, 34 * k), fill=C(INK))
        f = font(F_CP, 31 * k)
        hl = Image.new('RGBA', img.size, (0, 0, 0, 0)); dh = ImageDraw.Draw(hl)
        for i, l in enumerate(lines):
            y = X(220 + i * 52)
            if i in (5, 6):   # amber marker under "numbness at the back of the neck"
                x0 = X(60) + (f.getlength('are ') if i == 5 else 0); x1 = X(60) + f.getlength(l if i == 5 else 'neck,')
                dh.rectangle([x0 - 4 * k, y - 2 * k, x1 + 4 * k, y + 38 * k], fill=C(AMBER) + (150,))
        img.paste(Image.alpha_composite(img.convert('RGBA'), hl).convert('RGB'))
        d2 = ImageDraw.Draw(img)
        for i, l in enumerate(lines):
            d2.text((X(60), X(220 + i * 52)), l, font=f, fill=C(INK))
        d2.text((X(330), X(730)), 'Robert Ho Man Kwok, M.D.', font=font(F_FELLI, 34 * k), fill=C(INK))
        d2.text((X(330), X(775)), 'Silver Spring, Md.', font=font(F_FELLI, 28 * k), fill=C(INK))
        d2.text((X(60), X(850)), 'N Engl J Med 1968; 278: 796', font=font(F_CP, 22 * k), fill=C(INK * 2.2))
    bk.doc('letter', 760, 900, CARD, letter, seed=43)

    # 1968 newspaper (a prop: invented masthead, greeked columns)
    def news(img, d, k, P):
        X = lambda v: P + v * k
        fm = font(F_FELL, 70 * k); s = 'The Evening Courier'
        d.text((X(410) - fm.getlength(s) / 2, X(30)), s, font=fm, fill=C(INK))
        d.line([X(30), X(122), X(790), X(122)], fill=C(INK), width=max(2, int(2 * k)))
        d.text((X(30), X(130)), 'VOL. LXXII', font=font(F_CP, 20 * k), fill=C(INK)); d.text((X(620), X(130)), 'MAY 1968', font=font(F_CP, 20 * k), fill=C(INK))
        d.line([X(30), X(160), X(790), X(160)], fill=C(INK), width=max(1, int(1 * k)))
        fh = font(F_OLD, 64 * k)
        for i, l in enumerate(['"CHINESE RESTAURANT', 'SYNDROME" PUZZLES', 'DOCTORS']):
            d.text((X(410) - fh.getlength(l) / 2, X(178 + i * 74)), l, font=fh, fill=C(INK))
        r = np.random.default_rng(5)
        d.rectangle([X(30), X(420), X(400), X(700)], fill=C(NEWS * 0.8))
        for c0 in (430, 620):
            for j in range(26):
                y = X(420 + j * 22); L = r.uniform(0.6, 1.0) * 170
                d.rectangle([X(c0), y, X(c0 + L), y + 8 * k], fill=C(INK * 3.2))
        for j in range(12):
            y = X(720 + j * 22); d.rectangle([X(30), y, X(30 + r.uniform(0.6, 1) * 370), y + 8 * k], fill=C(INK * 3.2))
    bk.doc('newspaper', 820, 1000, NEWS, news, seed=45)

    for i in range(5):   # small clippings that spread around the world
        def clip(img, d, k, P, i=i):
            X = lambda v: P + v * k
            hl = ['MSG SCARE', 'GLUTAMATE?', 'NEW SYNDROME', 'ADA APA DGN MICIN?', 'MSG WARNING'][i]
            fh = font(F_OLD, 34 * k); d.text((X(16), X(14)), hl, font=fh, fill=C(INK))
            r = np.random.default_rng(i)
            for j in range(5):
                y = X(66 + j * 18); d.rectangle([X(16), y, X(16 + r.uniform(0.6, 1) * 250), y + 7 * k], fill=C(INK * 3.2))
        bk.doc(f'clip{i}', 300, 170, NEWS, clip, seed=60 + i, rough=1.4, amp=0.45)

    # ARSIP case-file folder with its tab
    def folder_shape(dm, k, P):
        dm.polygon([(P, P + 70 * k), (P + 40 * k, P + 70 * k), (P + 70 * k, P), (P + 400 * k, P), (P + 430 * k, P + 70 * k),
                    (P + 860 * k, P + 70 * k), (P + 860 * k, P + 640 * k), (P, P + 640 * k)], fill=255)
    def folder(img, d, k, P):
        X = lambda v: P + v * k
        d.line([X(0), X(120), X(860), X(120)], fill=C(MANILA * 0.85), width=max(2, int(2 * k)))
        f = font(F_CPB, 40 * k); d.text((X(90), X(14)), 'ARSIP KASUS', font=f, fill=C(INK))
    bk.doc('folder', 860, 640, MANILA, folder, seed=71, shape=folder_shape)
    bk.strip('lbl_case', '#003', F_CPB, 64, CARD, INK, 73, mono=True)
    bk.strip('lbl_case2', 'MICIN · 1968', F_CPB, 40, CARD, INK, 74, mono=True)


def stamps():
    bk.stamp('st_bodoh', 'BODOH?', 120, RED, seed=81)
    bk.stamp('st_musuh', 'MUSUH', 120, RED, seed=82)
    bk.stamp('st_aman', 'AMAN', 120, GREEN * 0.8, seed=83, sub='BPOM · FDA')
    bk.stamp('st_terungkap', 'TERUNGKAP', 100, RED, seed=84)
    bk.stamp('st_dibantah', 'DIBANTAH', 104, RED, seed=85)
    bk.stamp('st_dibuka', 'DIBUKA', 60, RED, seed=86)
    bk.stamp('st_post', '1968', 44, INK * 1.4, seed=87, sub='BOSTON MASS')
    bk.mark('m_cross', 'cross', 220, RED, seed=91)
    bk.mark('m_cross_s', 'cross', 120, RED, seed=92)
    bk.mark('m_tick_s', 'tick', 120, GREEN * 0.9, seed=93)
    bk.mark('m_circle', 'circle', 300, RED, seed=94, width=0.05)
    bk.mark('m_eq', 'eq', 130, INK, seed=95)


def slips():
    T = [('s_arak', 'arak masak', F_CPB, 40, CARD, INK), ('s_garam', 'garam', F_CPB, 40, CARD, INK), ('s_micin', 'micin', F_CPB, 40, AMBER, INK),
         ('s_jurnal', 'JURNAL KEDOKTERAN AS', F_CPB, 34, CARD, INK), ('s_sindrom', 'SINDROM RESTORAN TIONGHOA', F_CPB, 40, CARD, RED),
         ('s_disuntik', 'DISUNTIK, BUKAN DIMAKAN', F_CPB, 38, CARD, RED), ('s_dosis', 'dosis besar · bayi tikus', F_CP, 30, NEWS, INK),
         ('s_bpom', 'BPOM', F_CPB, 44, CARD, INK), ('s_fda', 'FDA', F_CPB, 44, CARD, INK),
         ('s_glutamat', 'GLUTAMAT', F_CPB, 52, CARD, INK), ('s_asi', 'ASI', F_CPB, 50, CARD, INK), ('s_sapi', 'SUSU SAPI', F_CPB, 40, CARD, INK),
         ('s_taruhan', '"cuma taruhan"', F_CPB, 44, CARD, INK), ('s_keluarga', 'keluarga Dr. Kwok', F_CP, 32, NEWS, INK),
         ('s_tanpatahu', 'tanpa tahu mana yang micin', F_CP, 32, NEWS, INK), ('s_A', 'A', F_SLAB, 90, CARD, INK), ('s_B', 'B', F_SLAB, 90, CARD, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.45, pa, ik, 400 + i, mono=f.startswith('Courier'))
    bk.strip('s_10x', '±10×', F_SLAB, 110, AMBER, INK, 431, padx=20)
    bk.strip('s_1x', '1×', F_SLAB, 70, CARD, INK, 432)
    bk.ransom('ry68', '1968', 130, 3)
    bk.ransom('ry69', '1969', 130, 5)
    bk.ransom('ry18', '2018', 130, 7)
    bk.ransom('rmic', 'MICIN!', 140, 2)
    bk.ransom('rq', '?', 160, 4)


def bars():
    bk.bar('bar_asi', 170, 860, seed=501, wash=AMBER)
    bk.bar('bar_sapi', 170, 86, seed=502, wash=hexc('#7E9C97'))


def molecule():
    """glutamate, ball and stick, engraved spheres (C ink, O red hand colour, N green)."""
    B = bk.B; Wm, Hm = 620, 420
    atoms = [('O', 40, 120), ('C', 120, 170), ('O', 110, 260), ('C', 210, 130), ('N', 210, 40), ('C', 300, 180), ('C', 390, 130), ('C', 480, 180), ('O', 560, 130), ('O', 490, 270)]
    bonds = [(0, 1), (1, 2), (1, 3), (3, 4), (3, 5), (5, 6), (6, 7), (7, 8), (7, 9)]
    w, h = int(Wm * B), int(Hm * B)
    yy, xx = np.mgrid[:h, :w].astype(float)
    ink = np.zeros((h, w)); col = np.ones((h, w, 3)) * CARD; mask = np.zeros((h, w), bool)
    img = Image.new('L', (w, h), 0); d = ImageDraw.Draw(img)
    for a, b in bonds:
        (_, x0, y0), (_, x1, y1) = atoms[a], atoms[b]
        d.line([x0 * B, y0 * B, x1 * B, y1 * B], fill=255, width=int(12 * B))
    sticks = np.asarray(img, float) / 255
    mask |= ndi.binary_dilation(sticks > 0.5, iterations=int(4 * B))
    ink = np.maximum(ink, sticks * 0.9)
    for kind, x, y in atoms:
        r = (36 if kind == 'C' else 32) * B; cx, cy = x * B, y * B
        dd = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2); inside = dd < r
        nz = np.sqrt(np.clip(1 - (dd / r) ** 2, 0, 1))
        light = np.clip(((-(xx - cx) / r) * 0.5 + (-(yy - cy) / r) * 0.6 + nz * 0.7), 0, 1)
        tone = np.clip(1 - light, 0, 1) * 0.95
        tint = INK * 0 + {'C': CARD * 0.9, 'O': RED * 1.15, 'N': GREEN * 1.6}[kind]
        col[inside] = tint
        e = engrave(tone, yy + 0.3 * xx, 4.0 * B) * inside
        ink[inside] = e[inside]
        ring = inside & (dd > r - 2.2 * B); ink[ring] = 1
        mask |= dd < r + 6 * B
    col = col * (1 - ink[..., None]) + INK * ink[..., None]
    body, _ = torn(mask, rough=1.0 * B, seed=511, amp=0.25)
    bk.save('molecule', col, np.maximum(body, mask * 1.0))


def silhouettes():
    P = [(250, 120), (250, 120), (420, 112), (420, 112), (425, 140), (428, 175), (430, 205), (470, 206), (510, 210), (528, 222),
         (515, 236), (470, 236), (418, 234), (424, 262), (432, 288), (440, 300), (446, 318), (452, 330), (470, 352), (476, 362), (462, 370), (452, 374),
         (456, 392), (458, 404), (452, 412), (458, 424), (456, 444), (440, 460), (420, 474), (398, 480), (392, 500), (392, 520), (400, 540), (430, 556),
         (470, 572), (500, 640), (512, 800), (300, 800), (100, 800), (10, 800), (14, 700), (40, 600), (120, 560), (190, 536), (220, 520), (226, 470),
         (214, 420), (204, 360), (212, 300), (218, 260), (222, 240), (226, 236), (190, 236), (120, 230), (104, 222), (120, 210), (180, 206), (238, 204),
         (244, 170), (248, 140), (250, 120)]
    bk.silhouette('sil_man', bezier_pts(P), seed=341)


# ---------- archive prints (filled in from the sourcing picks) ----------
PRINTS = json.load(open(os.path.join(HERE, 'prints.json'))) if os.path.exists(os.path.join(HERE, 'prints.json')) else {}


def prints():
    for name, p in PRINTS.items():
        kw = {k: v for k, v in p.items() if k not in ('file', 'width', 'tint', 'plate', 'halftone')}
        if p.get('halftone'):
            bk.halftone(name, p['file'], p['width'], crop=p.get('crop'), caption=p.get('caption'), seed=sum(map(ord, name)) % 1000)
            continue
        tint = hexc(p['tint']) if p.get('tint') else None
        plate = hexc(p['plate']) if p.get('plate') else None
        try:
            bk.cut(name, p['file'], p['width'], tint=tint, plate=plate, **kw)
            print('cut', name)
        except Exception as e:
            print('FAILED', name, e)


if __name__ == '__main__':
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('flats', flats), ('sachet', lambda: (sachet('sachet'), sachet('sachet_open', True), crystals())), ('docs', documents),
                  ('stamps', stamps), ('slips', slips), ('bars', bars), ('molecule', molecule), ('sil', silhouettes), ('prints', prints)]:
        if want(g):
            fn(); print('baked', g)
    bk.done()
