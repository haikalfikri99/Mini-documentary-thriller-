"""ARSIP #004 Aqua · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/aqua/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner
(kolase/ai/, copied into raw/ here) + public-domain archive prints (raw/, fetched by kit/collage/fetch_raw.py).
This file draws what is special to the episode: the gold star, price tags, the agreement and the e-mail (reconstructions of
what the KPPU decision describes, marked as such), the red card, stamps, labels and years. No real brand logos."""
import os, sys, json, math, shutil, glob
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'kit', 'collage'))
from parts import *
from parts import font
from signature import bake_signature, bake_prints
from collage_lib import engrave
HERE = os.path.dirname(os.path.abspath(__file__))
EP = json.load(open(os.path.join(HERE, 'episode.json')))
bk = Baker(os.path.join(HERE, 'parts'), os.path.join(HERE, 'raw'))
C = lambda a: tuple(int(v) for v in a)
ONLY = set(sys.argv[1:]); want = lambda g: not ONLY or g in ONLY
GOLD = hexc('#D9A43A')


def ai_to_raw():
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')):
        dst = os.path.join(bk.raw, 'ai_' + os.path.basename(f))
        if not os.path.exists(dst):
            shutil.copy(f, dst)


def star_pts(cx, cy, R, r, rot=-90):
    return [(cx + (R if i % 2 == 0 else r) * math.cos(math.radians(rot + i * 36)),
             cy + (R if i % 2 == 0 else r) * math.sin(math.radians(rot + i * 36))) for i in range(10)]


# ---------- the gold star of a "star outlet" (our own printed badge) ----------
def stars():
    S = 300
    def shape(dm, k, P):
        dm.polygon([(P + x * k, P + y * k) for x, y in star_pts(S / 2, S / 2 + 6, 146, 62)], fill=255)
        for x, y in star_pts(S / 2, S / 2 + 6, 140, 62)[::2]:
            dm.ellipse([P + (x - 14) * k, P + (y - 14) * k, P + (x + 14) * k, P + (y + 14) * k], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        pts = star_pts(S / 2, S / 2 + 6, 140, 60)
        d.polygon([(X(x), X(y)) for x, y in pts], fill=C(GOLD))
        c = (X(S / 2), X(S / 2 + 6))
        # bevel: every second facet in shadow, engraved with parallel lines
        hatch = Image.new('L', img.size, 0); dh = ImageDraw.Draw(hatch)
        for i in range(10):
            if i % 2: continue
            a, b = pts[i], pts[(i + 1) % 10]
            dh.polygon([c, (X(a[0]), X(a[1])), (X(b[0]), X(b[1]))], fill=255)
        hm = np.asarray(hatch, float) / 255 > 0.5
        yy, xx = np.mgrid[:img.size[1], :img.size[0]].astype(float)
        lines = engrave(np.full(hm.shape, 0.42), yy + 0.6 * xx, 5.5 * k) * hm
        arr = np.asarray(img, float)
        arr = arr * (1 - lines[..., None] * 0.85) + INK * lines[..., None] * 0.85
        img.paste(Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)))
        d2 = ImageDraw.Draw(img)
        for i in range(10):
            d2.line([c, (X(pts[i][0]), X(pts[i][1]))], fill=C(INK), width=max(1, int(1.6 * k)))
        d2.polygon([(X(x), X(y)) for x, y in pts], outline=C(INK), width=max(2, int(4 * k)))
        inner = star_pts(S / 2, S / 2 + 6, 112, 48)
        d2.polygon([(X(x), X(y)) for x, y in inner], outline=C(INK), width=max(1, int(1.8 * k)))
        for x, y in pts[::2]:   # rivet balls on the tips
            d2.ellipse([X(x - 13), X(y - 13), X(x + 13), X(y + 13)], fill=C(GOLD * 1.05), outline=C(INK), width=max(2, int(3 * k)))
            d2.ellipse([X(x - 7), X(y - 8), X(x - 1), X(y - 2)], fill=C(CARD))
    bk.doc('star', S, S + 12, CARD, draw, seed=601, rough=0.4, shape=shape)

    # the mark a removed star leaves on the sign board: a dusty dashed outline (ink only)
    B = bk.B; N = int(320 * B)
    img = Image.new('L', (N, N), 0); d = ImageDraw.Draw(img)
    pts = star_pts(N / 2, N / 2 + 6 * B, 140 * B, 60 * B) + [star_pts(N / 2, N / 2 + 6 * B, 140 * B, 60 * B)[0]]
    for i in range(10):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        L = math.hypot(x1 - x0, y1 - y0); n = int(L / (16 * B))
        for j in range(n):
            if j % 2: continue
            f0, f1 = j / n, min(1, (j + 1) / n)
            d.line([(x0 + (x1 - x0) * f0, y0 + (y1 - y0) * f0), (x0 + (x1 - x0) * f1, y0 + (y1 - y0) * f1)], fill=255, width=int(6 * B))
    a = np.asarray(img, float) / 255
    dust = np.asarray(Image.new('L', (N, N), 0), float)
    m = poly_mask(N, N, star_pts(N / 2, N / 2 + 6 * B, 140 * B, 60 * B)) > 0.5
    r = np.random.default_rng(7); dust = (r.random((N, N)) < 0.025) * m * 0.35   # a cleaner patch where the star was
    bk.save('star_ghost', INK[None, None, :], np.maximum(a * 0.85, dust), ink=1)


# ---------- price tags (no real prices: the decision talks about "lebih mahal", not amounts) ----------
def tags():
    w, h = 540, 230
    def shape(dm, k, P):
        dm.polygon([(P + 70 * k, P), (P + w * k, P), (P + w * k, P + h * k), (P + 70 * k, P + h * k), (P, P + h / 2 * k)], fill=255)
        dm.ellipse([P + 40 * k, P + (h / 2 - 16) * k, P + 72 * k, P + (h / 2 + 16) * k], fill=0)
    def mk(name, word, col, up):
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            fs = font(F_CPB, 34 * k); d.text((X(100), X(22)), 'HARGA AQUA', font=fs, fill=C(INK))
            d.line([X(100), X(66), X(510), X(66)], fill=C(INK), width=max(1, int(1.5 * k)))
            fb = font(F_SLAB, 78 * k); d.text((X(100), X(84)), word, font=fb, fill=C(col))
            ax = X(480); ay0, ay1 = (X(200), X(96)) if up else (X(96), X(200))
            d.line([ax, ay0, ax, ay1], fill=C(col), width=int(12 * k))
            s = -1 if up else 1
            d.polygon([(ax - 26 * k, ay1 - s * 30 * k), (ax + 26 * k, ay1 - s * 30 * k), (ax, ay1 + s * 6 * k)], fill=C(col))
            d.ellipse([X(40), X(h / 2 - 16), X(72), X(h / 2 + 16)], outline=C(INK * 2), width=max(2, int(3 * k)))
        bk.doc(name, w, h, CARD, draw, seed=611 + up, rough=0.5, shape=shape)
    mk('tag_murah', 'MURAH', GREEN, False)
    mk('tag_mahal', 'MAHAL', RED, True)


# ---------- documents (reconstructions of what the decision describes) ----------
def documents():
    def agreement(img, d, k, P):
        X = lambda v: P + v * k
        fh = font(F_FELLSC, 46 * k); s = 'Perjanjian Toko'
        d.text((X(320) - fh.getlength(s) / 2, X(40)), s, font=fh, fill=C(INK))
        fs = font(F_CP, 24 * k); s = 'program STAR OUTLET'
        d.text((X(320) - fs.getlength(s) / 2, X(104)), s, font=fs, fill=C(INK))
        d.line([X(50), X(146), X(590), X(146)], fill=C(INK), width=max(1, int(1.4 * k)))
        r = np.random.default_rng(3)
        f = font(F_CPB, 26 * k)
        y = 172
        for n in range(1, 4):
            d.text((X(50), X(y)), f'Pasal {n}', font=f, fill=C(INK)); y += 40
            for j in range(3):
                d.rectangle([X(50), X(y + 6), X(50 + r.uniform(0.7, 1) * 540), X(y + 16)], fill=C(INK * 3.0)); y += 30
            y += 12
        hl = [X(36), X(y - 4), X(604), X(y + 4 * 44 + 6)]
        d.rectangle(hl, fill=C(AMBER * 1.12))
        d.text((X(50), X(y)), 'Pasal 4', font=f, fill=C(INK))
        fc = font(F_CP, 28 * k)
        for i, l in enumerate(['Bila toko menjual Le Minerale,', 'status STAR OUTLET', 'diturunkan.']):
            d.text((X(50), X(y + 44 + i * 42)), l, font=fc, fill=C(INK))
        d.text((X(50), X(790)), '(isi klausul menurut putusan KPPU)', font=font(F_CP, 20 * k), fill=C(INK * 2.4))
    bk.doc('perjanjian', 640, 830, CARD, agreement, seed=621)

    def email(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_CP, 27 * k); fb = font(F_CPB, 27 * k)
        d.rectangle([X(0), X(0), X(760), X(56)], fill=C(NEWS * 0.92))
        d.text((X(28), X(12)), 'EMAIL', font=fb, fill=C(INK))
        rows = [('Dari', None), ('Kepada', None), ('Subjek', 'Star Outlet Degradation')]
        y = 84
        for lab, val in rows:
            d.text((X(28), X(y)), f'{lab}:', font=fb, fill=C(INK))
            if val is None:
                d.rectangle([X(200), X(y + 4), X(200 + (330 if lab == 'Dari' else 280)), X(y + 30)], fill=C(INK))   # redacted
            y += 48
        ys = 84 + 2 * 48
        d.rectangle([X(190), X(ys - 6), X(742), X(ys + 82)], fill=C(AMBER * 1.12))
        d.text((X(200), X(ys)), 'Star Outlet Degradation', font=fb, fill=C(INK))
        d.text((X(200), X(ys + 40)), 'Being a Wholesaler', font=fb, fill=C(INK))
        d.line([X(28), X(ys + 104), X(732), X(ys + 104)], fill=C(INK), width=max(1, int(1.2 * k)))
        r = np.random.default_rng(9)
        for j in range(6):
            yy = ys + 132 + j * 30
            d.rectangle([X(28), X(yy), X(28 + r.uniform(0.55, 1) * 700), X(yy + 10)], fill=C(INK * 3.0))
        d.text((X(28), X(ys + 330)), '(subjek email menurut putusan KPPU)', font=font(F_CP, 20 * k), fill=C(INK * 2.4))
    bk.doc('email', 760, 560, CARD, email, seed=631)

    # the referee's red card (KPPU = "wasit")
    def card(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(10), X(10), X(230), X(330)], outline=C(RED * 0.7), width=max(2, int(3 * k)))
    bk.doc('kartu', 240, 340, RED, card, seed=641, rough=0.3)


def stamps():
    """verdict stamps pressed onto a small cream card, so the red reads over busy engravings (review #004)."""
    def card(name, text, size, color, seed, sub=None):
        bk.stamp(name + '_ink', text, size, color, seed=seed, sub=sub)
        a = np.asarray(Image.open(os.path.join(bk.out, name + '_ink.png')), float)[..., 3] / 255
        os.remove(os.path.join(bk.out, name + '_ink.png')); bk.M.pop(name + '_ink')
        a = np.clip(a * 1.7, 0, 1)
        P = int(14 * bk.B); h, w = a.shape
        A = np.zeros((h + 2 * P, w + 2 * P)); A[P:P + h, P:P + w] = a
        m = np.zeros(A.shape, bool); m[P // 3:-P // 3, P // 3:-P // 3] = True
        from collage_lib import torn, paper_texture
        body, _ = torn(m, rough=1.2 * bk.B, seed=seed, amp=0.4)
        tex = paper_texture(*A.shape, seed=seed, fibers=200); tex = 1 + (tex - 1) * 0.6
        col = CARD[None, None, :] * tex[..., None]
        col = col * (1 - A[..., None]) + color * A[..., None]
        bk.save(name, col, body)
    card('st_denda', 'DIDENDA', 120, RED, 81)
    card('st_dibantah', 'DIBANTAH', 104, RED, 82)
    card('st_batal', 'DIBATALKAN', 96, GREEN * 0.85, 83, sub='PENGADILAN NEGERI')
    card('st_belum', 'BELUM', 124, RED, 84)
    card('st_dicopot', 'DICOPOT', 108, RED, 85)
    card('st_menang', 'KPPU MENANG', 96, RED, 86, sub='MAHKAMAH AGUNG')
    card('st_bukti', 'BUKTI', 100, RED, 88)


def slips():
    bk.strip('s_138', 'Rp13,8 M', F_SLAB, 150, AMBER, INK, 401, padx=22)
    T = [('s_aqua', 'AQUA', F_CPB, 44, CARD, INK), ('s_lemin', 'LE MINERALE', F_CPB, 40, CARD, INK), ('s_merek', 'merek lain', F_CPB, 40, CARD, INK),
         ('s_star', 'STAR OUTLET', F_CPB, 50, AMBER, INK), ('s_bintang', '= warung bintang', F_CP, 36, CARD, INK),
         ('s_syarat', 'SATU SYARAT', F_CPB, 48, CARD, RED), ('s_manis', '"ada manis-manisnya"', F_FELLI, 44, CARD, INK),
         ('s_kppu', 'KPPU', F_SLAB, 92, CARD, INK), ('s_kppu2', 'Komisi Pengawas Persaingan Usaha', F_CP, 27, NEWS, INK),
         ('s_wasit', 'wasit persaingan bisnis', F_CPB, 34, CARD, INK), ('s_distributor', 'DISTRIBUTOR', F_CPB, 42, CARD, INK),
         ('s_ulah', '"ulah distributor"', F_FELLI, 42, CARD, INK), ('s_pn', 'PENGADILAN', F_CPB, 44, CARD, INK),
         ('s_ma', 'MAHKAMAH AGUNG', F_CPB, 44, CARD, INK), ('s_turunin', '= turunin status warung bintang', F_CPB, 32, AMBER, INK),
         ('s_satu', '1 warung', F_CPB, 40, CARD, RED), ('s_pilihan', 'pilihan siapa?', F_FELLI, 44, CARD, INK),
         ('s_rumah', 'warung dekat rumahmu', F_CPB, 38, CARD, INK), ('s_pihak', 'pihak AQUA', F_CPB, 40, CARD, INK), ('s_terdakwa', 'terdakwa: air putih', F_CPB, 38, CARD, RED)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('ry16', '2016', 120, 3)
    bk.ransom('ry17', '2017', 120, 5)
    bk.ransom('ry19', '2019', 120, 7)
    bk.ransom('rq', '?', 190, 4)
    bk.ransom('rq2', '?', 150, 2)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('stars', stars), ('tags', tags), ('docs', documents), ('stamps', stamps), ('slips', slips),
                  ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    bk.done()
