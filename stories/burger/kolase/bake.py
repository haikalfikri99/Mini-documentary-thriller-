"""ARSIP #009 Burger Sepertiga Pound · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/burger/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google Flow
(kolase/ai/, copied into raw/ here, with the hand-tint maps *.tint.png for the two burgers, §L). This file draws what is special to
the episode: identical price tags, the 1/3 vs 1/4 typed strips, the taste-test card, the sales chart (no numbers: none are known),
the interview sheet, the "more than half" bar, the big 3 and 4, the shelf promo tags, stamps and the source strips.
No real logos; brand names appear only on our own typed strips."""
import os, sys, json, shutil, glob
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'kit', 'collage'))
from parts import *
from parts import font
from signature import bake_signature, bake_prints
HERE = os.path.dirname(os.path.abspath(__file__))
EP = json.load(open(os.path.join(HERE, 'episode.json')))
bk = Baker(os.path.join(HERE, 'parts'), os.path.join(HERE, 'raw'))
C = lambda a: tuple(int(v) for v in a)
ONLY = set(sys.argv[1:]); want = lambda g: not ONLY or g in ONLY


def ai_to_raw():
    """AI prints + their hand-tint maps → raw/ai_<name>.(jpg|tint.png); always refreshed (redone images keep the same name)"""
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')) + glob.glob(os.path.join(HERE, 'ai', '*.tint.png')):
        shutil.copy(f, os.path.join(bk.raw, 'ai_' + os.path.basename(f)))


def price_tag():
    """a shop price tag on a string: HARGA + an empty handwritten line (the real price is not known, so no number)"""
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(0), X(60)), (X(60), X(0)), (X(300), X(0)), (X(300), X(190)), (X(60), X(190)), (X(0), X(130))], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.ellipse([X(28), X(80), X(58), X(110)], fill=C(INK * 1.2))
        d.line([X(43), X(95), X(-10), X(40)], fill=C(INK), width=max(2, int(3 * k)))
        f = font(F_SLAB, 44 * k); d.text((X(84), X(34)), 'HARGA', font=f, fill=C(INK))
        for x in range(84, 280, 22): d.line([X(x), X(140), X(x + 12), X(140)], fill=C(INK), width=max(2, int(4 * k)))
    bk.doc('tag_harga', 300, 190, CARD, draw, seed=901, rough=0.3, shape=shape)


def taste_card():
    """blind taste-test score card: two rows, the 1/3-pound row ticked"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(2, int(4 * k))
        f = font(F_SLAB, 50 * k); d.text((X(40), X(26)), 'UJI RASA', font=f, fill=C(INK))
        d.line([X(30), X(100), X(470), X(100)], fill=C(INK), width=w)
        fr = font(F_CPB, 44 * k)
        for i, t in enumerate(['1/3 POUND', '1/4 POUND']):
            y = 140 + i * 110
            d.rectangle([X(40), X(y), X(100), X(y + 60)], outline=C(INK), width=w)
            d.text((X(130), X(y + 6)), t, font=fr, fill=C(INK))
    bk.doc('kartu_rasa', 500, 380, CARD, draw, seed=911, rough=0.4)


def chart():
    """sales chart frame: axes + PENJUALAN, no numbers (the size of the drop is unknown); the red line is drawn live in film.js"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        d.line([X(70), X(40), X(70), X(460), X(640), X(460)], fill=C(INK), width=w)
        for y in range(90, 460, 70): d.line([X(70), X(y), X(640), X(y)], fill=C(INK * 3.2), width=max(1, int(1.5 * k)))
        f = font(F_SLAB, 44 * k); d.text((X(100), X(470)), 'PENJUALAN', font=f, fill=C(INK))
    bk.doc('grafik', 680, 540, CARD, draw, seed=921, rough=0.4)


def interview():
    """interview sheet of the market researchers: the question and the wrong tick on 1/4 (from the memoir as quoted)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(2, int(4 * k))
        f = font(F_SLAB, 40 * k); d.text((X(40), X(32)), 'LEMBAR WAWANCARA', font=f, fill=C(INK))
        d.line([X(30), X(100), X(640), X(100)], fill=C(INK), width=w)
        fq = font(F_CPB, 38 * k); d.text((X(40), X(130)), 'Mana yang lebih besar?', font=fq, fill=C(INK))
        fr = font(F_CPB, 50 * k)
        for i, t in enumerate(['1/3 pound', '1/4 pound']):
            y = 220 + i * 110
            d.rectangle([X(50), X(y), X(110), X(y + 60)], outline=C(INK), width=w)
            d.text((X(140), X(y + 2)), t, font=fr, fill=C(INK))
        for y in (460, 510): d.line([X(40), X(y), X(640), X(y)], fill=C(INK * 3), width=max(1, int(1.5 * k)))
    bk.doc('lembar_wawancara', 680, 560, NEWS, draw, seed=931, rough=0.5)


def half_bar():
    """'more than half': a bar with the half mark, the red fill passing it (no exact share: sources disagree)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        d.rectangle([X(30), X(60), X(30 + 0.58 * 560), X(150)], fill=C(RED))
        for x in range(36, int(30 + 0.58 * 560), 14): d.line([X(x), X(146), X(x + 12), X(64)], fill=C(RED * 0.7), width=max(1, int(1.4 * k)))
        d.rectangle([X(30), X(60), X(590), X(150)], outline=C(INK), width=w)
        d.line([X(310), X(30), X(310), X(180)], fill=C(INK), width=max(3, int(6 * k)))
        f = font(F_CPB, 34 * k); t = 'SEPARUH'; d.text((X(310) - f.getlength(t) / 2, X(186)), t, font=f, fill=C(INK))
    bk.doc('bar_separuh', 620, 240, CARD, draw, seed=941, rough=0.4)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_gaklaku', 'GAK LAKU', 120, RED, 81, None), ('st_cek', 'CEK ULANG', 104, GREEN * 0.85, 83, None)]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)
    bk.flat('hl_amber', AMBER, poly=[(-200, -36), (200, -40), (204, 36), (-198, 40)], seed=951, rough=2, mottle=0.03)


def slips():
    T = [('s_aw', '1/3 POUND · A&W', F_CPB, 44, CARD, INK), ('s_mcd', "1/4 POUND · McDONALD'S", F_CPB, 40, CARD, INK),
         ('s_tes', 'tes rasa tertutup', F_FELLI, 48, CARD, INK), ('s_dijual', 'mulai dijual', F_CPB, 44, NEWS, INK),
         ('s_peneliti', 'peneliti pasar', F_CPB, 42, CARD, INK), ('s_pembeli', 'pembeli', F_CPB, 42, CARD, INK),
         ('s_lt', '1/3 < 1/4 ?', F_SLAB, 80, AMBER, INK), ('s_bodoh', 'BODOH?', F_SLAB, 90, CARD, INK),
         ('s_c3', '1/3 = 0,33', F_CPB, 64, CARD, INK), ('s_c4', '1/4 = 0,25', F_CPB, 64, CARD, INK),
         ('s_pecahan', 'pecahan', F_FELLI, 52, AMBER, INK),
         ('tag_13', 'BONUS 1/3', F_SLAB, 52, CARD, RED), ('tag_14', 'HEMAT 1/4', F_SLAB, 52, CARD, RED),
         ('s_src1', 'menurut memoar pemilik A&W (2007)', F_CP, 30, NEWS, INK),
         ('tag_13h', 'BONUS 1/3', F_SLAB, 52, AMBER, RED)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    for n, tx, f, s, pa, ik, sd in [('n3', '3', F_SLAB, 420, CARD, INK, 471), ('n4', '4', F_SLAB, 420, CARD, INK, 472),
                                    ('n_lt', '<', F_SLAB, 260, AMBER, INK, 473), ('n_vs', 'vs', F_FELLI, 110, NEWS, INK, 474)]:
        bk.strip(n, tx, f, s, pa, ik, sd, padx=26, pady=4)
    src = ['sumber: Culinary Lore · blog A&W (2021) · Wikipedia', 'memoar A. Alfred Taubman, Threshold Resistance (2007)']
    bk.strip('s_src', src[0], F_CP, 26, NEWS, INK, 480, mono=True, lines=src, align='center')
    bk.ransom('ry80', '1980-AN', 120, 3)
    bk.ransom('rq', '?', 190, 4)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('docs', lambda: (price_tag(), taste_card(), chart(), interview(), half_bar())),
                  ('stamps', stamps), ('slips', slips), ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    bk.done()
