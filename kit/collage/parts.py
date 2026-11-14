"""ARSIP Kolase · part baker shared by every episode (vertical 1080x1920 world, pixels = world x B).
Built on lemo-opuscar's vintage-collage bake (MIT, LemoLab; see LICENSE-lemo-opuscar). Episode scripts do:
    import sys; sys.path.insert(0, '<repo>/kit/collage'); from parts import *
    bk = Baker(out_dir, raw_dir); bk.paper(); bk.flat(...); bk.strip(...); bk.cut(...); ...; bk.done()
Every part is a PNG in out_dir plus one row in out_dir/manifest.json (w, h, crop, k, and flags the page reads:
ink=1 -> printed ink (stamps, marks): no paper edge, no shadow; flat=1 -> torn colour paper with world x,y).
"""
import os, json, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi
import collage_lib as cl
from collage_lib import fbm, torn, paper_texture, poly_mask, ellipse_mask, engrave

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, 'fonts')
hexc = lambda h: np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], float)

# ---------- ARSIP Kolase palette (kit/styles/arsip-kolase/STYLE.md §3) ----------
PAL = dict(paper='#E6D8BC', card='#F3EAD6', manila='#E4C68C', ink='#1E1915', red='#B3261E',
           green='#2F4F4A', amber='#D58E2A', news='#E3DDD0')
PAPER, CARD, MANILA, INK = hexc(PAL['paper']), hexc(PAL['card']), hexc(PAL['manila']), hexc(PAL['ink'])
RED, GREEN, AMBER, NEWS = hexc(PAL['red']), hexc(PAL['green']), hexc(PAL['amber']), hexc(PAL['news'])
cl.PAPER, cl.PAPER_HI, cl.INK = PAPER, CARD, INK

F_FELL, F_FELLI, F_FELLSC = 'IMFeENrm28P.ttf', 'IMFeENit28P.ttf', 'IMFeENsc28P.ttf'
F_CP, F_CPB = 'CourierPrime-Regular.ttf', 'CourierPrime-Bold.ttf'
F_SLAB, F_ABRIL, F_OSW, F_OLD = 'AlfaSlabOne-Regular.ttf', 'AbrilFatface-Regular.ttf', 'Oswald.ttf', 'OldStandard-Bold.ttf'
font = lambda f, s: ImageFont.truetype(os.path.join(FONTS, f), max(4, int(s)))

RANSOM = [  # font, paper, ink  (lining figures only: IM Fell is never used for digits)
    (F_FELLSC, INK * 1.05, CARD), (F_SLAB, CARD, INK), (F_CPB, AMBER, INK), (F_ABRIL, NEWS, INK),
    (F_FELLSC, RED, CARD), (F_OSW, GREEN, CARD), (F_CPB, CARD, RED), (F_SLAB, MANILA, INK),
]


def rs(a, w, h):
    return np.asarray(Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).resize((max(1, w), max(1, h)), Image.LANCZOS), float) / 255


class Baker:
    def __init__(self, out, raw=None, B=1.5):
        self.out, self.raw, self.B, self.M = out, raw, B, {}
        cl.RAW = raw
        os.makedirs(out, exist_ok=True)

    # ---------- save ----------
    def save(self, name, rgb, alpha, **meta):
        a = np.clip(alpha, 0, 1)
        ys, xs = np.nonzero(a > 0.004)
        y0, y1, x0, x1 = max(0, ys.min() - 2), min(a.shape[0], ys.max() + 3), max(0, xs.min() - 2), min(a.shape[1], xs.max() + 3)
        im = np.dstack([np.clip(rgb * np.ones(a.shape + (1,)), 0, 255), a * 255])[y0:y1, x0:x1].astype(np.uint8)
        Image.fromarray(im, 'RGBA').save(os.path.join(self.out, name + '.png'), compress_level=3)
        m = dict(w=int(x1 - x0), h=int(y1 - y0), crop=[int(x0), int(y0)], **meta)
        self.M[name] = m
        return m

    def done(self, **extra):
        self.M['_'] = dict(B=self.B, palette=PAL, **extra)
        json.dump(self.M, open(os.path.join(self.out, 'manifest.json'), 'w'), indent=1)
        print('parts:', len(self.M) - 1)

    # ---------- table paper (tiles mirrored in the page) ----------
    def paper(self, w=1200, h=2100, seed=1):
        tex = paper_texture(h, w, seed=seed, fibers=1500)
        tex = 1 + (tex - 1) * 0.8
        col = PAPER[None, None, :] * tex[..., None]
        Image.fromarray(np.clip(col, 0, 255).astype(np.uint8)).save(os.path.join(self.out, 'paper.jpg'), quality=92)
        self.M['paper'] = dict(w=w, h=h, x=-60, y=-90, scale=1.0)

    def tear_sprite(self, mask, color, seed, rough, mottle=0.06, fringe=True):
        B = self.B
        body, fr = torn(mask, rough=rough, seed=seed)
        h, w = mask.shape
        t = 1 + mottle * fbm(h, w, scales=(3 * B, 12 * B, 40 * B), weights=(0.3, 0.4, 0.3), seed=seed + 11)
        col = color[None, None, :] * t[..., None]
        if fringe:
            a = np.maximum(body, fr * 0.92)
            w_ = np.clip(fr * 0.92 - body, 0, 1) / np.maximum(a, 1e-6)
            col = col * (1 - w_[..., None]) + CARD * 1.01 * w_[..., None]
        else:
            a = body
        return col, a

    # ---------- torn colour paper; shape in world units, centred on its own origin ----------
    def flat(self, name, color, poly=None, ell=None, seed=0, rough=4, mottle=0.06):
        B = self.B
        if poly is None:
            rx, ry = ell
            poly = [(rx * math.cos(a), ry * math.sin(a)) for a in np.linspace(0, 2 * math.pi, 90, endpoint=False)]
        xs, ys = [p[0] for p in poly], [p[1] for p in poly]
        pad = 30
        X0, Y0 = min(xs) - pad, min(ys) - pad
        w, h = int((max(xs) - X0 + pad) * B), int((max(ys) - Y0 + pad) * B)
        m = poly_mask(h, w, [((x - X0) * B, (y - Y0) * B) for x, y in poly]) > 0.5
        col, a = self.tear_sprite(m, color, seed, rough * B, mottle)
        return self.save(name, col, a, flat=1)

    # ---------- paper slips with type ----------
    def strip(self, name, text, fnt, size, paper, ink, seed, padx=14, pady=8, mono=False, lines=None, lead=1.25, align='left', **meta):
        B = self.B
        f = font(fnt, size * B)
        lines = lines or [text]
        asc, desc = f.getmetrics()
        lh = int((asc + desc) * lead)
        tw = int(max(f.getlength(l) for l in lines))
        th = lh * (len(lines) - 1) + asc + desc
        px, py = int(padx * B), int(pady * B)
        w, h = tw + 2 * px, th + 2 * py
        P = int(8 * B)
        m = np.zeros((h + 2 * P, w + 2 * P), bool); m[P:P + h, P:P + w] = True
        body, _ = torn(m, rough=1.2 * B, seed=seed, amp=0.45)
        tex = paper_texture(h + 2 * P, w + 2 * P, seed=seed, fibers=max(10, int(w * h / 1800))); tex = 1 + (tex - 1) * 0.6
        col = paper[None, None, :] * tex[..., None]
        img = Image.new('L', (w + 2 * P, h + 2 * P), 0); d = ImageDraw.Draw(img)
        for i, l in enumerate(lines):
            lx = P + px + (tw - f.getlength(l)) / 2 if align == 'center' else P + px
            d.text((lx, P + py + i * lh), l, font=f, fill=255)
        tx = np.asarray(img, float) / 255
        r_ = np.random.default_rng(seed)
        tx *= (0.85 + 0.15 * (r_.random(tx.shape) > 0.25)) if mono else (0.92 + 0.08 * (r_.random(tx.shape) > 0.2))
        col = col * (1 - tx[..., None]) + ink * tx[..., None]
        mm = self.save(name, col, body, text=text, **meta)
        mm['tx'] = (P + px - mm['crop'][0]) / B
        mm['n'] = len(text)
        return mm

    def ransom(self, prefix, text, size, seed0):
        out = []
        for i, ch in enumerate(text):
            if ch == ' ':
                out.append(None); continue
            f, pa, ik = RANSOM[(i * 3 + seed0) % len(RANSOM)]
            if (ch.isdigit() or ch in '?!×±%') and f.startswith('IMFe'):
                f = [F_CPB, F_SLAB, F_OSW][(i + seed0) % 3]
            s = size * (0.86 + 0.28 * ((i * 7 + seed0) % 5) / 4)
            self.strip(f'{prefix}{i}', ch, f, s, pa, ik, seed0 * 31 + i, padx=10, pady=4)
            out.append(f'{prefix}{i}')
        self.M.setdefault('_ransom', {})[prefix] = out
        return out

    # ---------- a found print cut out with its white margin ----------
    def load(self, file, crop=None, maxdim=None):
        im = Image.open(os.path.join(self.raw, file))
        if im.mode in ('RGBA', 'LA', 'P'):
            im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im); im = bg
        im = im.convert('RGB')
        if crop:
            W0, H0 = im.size
            c = [v * (W0 if i % 2 == 0 else H0) if v <= 1 else v for i, v in enumerate(crop)]
            im = im.crop(tuple(int(v) for v in c))
        if maxdim and max(im.size) > maxdim:
            k = maxdim / max(im.size); im = im.resize((int(im.size[0] * k), int(im.size[1] * k)), Image.LANCZOS)
        return im

    def cut(self, name, file, width, crop=None, thresh=205, close=0.012, tint=None, tint_k=0.55, margin=4, seed=0, rect=False, keep=0.04, ink_gain=1.0, plate=None, tint_poly=None, **meta):
        """width = world width of the cut-out. tint = hand colour inside the cut (np colour). plate = re-ink colour for the lines (e.g. RED).
        tint_poly = [[x, y], ...] in 0..1 of the (cropped) source: hand colour only inside that polygon (e.g. one object in a print)."""
        B = self.B
        im = self.load(file, crop, maxdim=int(width * B * 2.2))
        g = np.asarray(im.convert('L'), float)
        h, w = g.shape
        if tint_poly is not None:
            tm = poly_mask(h, w, [(x * w, y * h) for x, y in tint_poly])
            tm = ndi.gaussian_filter((tm > 0.5).astype(float), 1.5)
            tint, tint_poly = None, (tint if tint is not None else AMBER, tm)
        if rect:
            mask = np.zeros((h, w)); e = int(0.01 * max(h, w)); mask[e:h - e, e:w - e] = 1
        else:
            ink = g < thresh
            it = max(1, int(close * max(h, w)))
            m = ndi.binary_closing(np.pad(ink, it + 2), iterations=it)[it + 2:-it - 2, it + 2:-it - 2]
            m = ndi.binary_fill_holes(m)
            lab, n = ndi.label(m)
            if n > 1:
                sizes = np.bincount(lab.ravel()); sizes[0] = 0
                m = np.isin(lab, np.nonzero(sizes >= keep * sizes.max())[0])
            m = ndi.binary_dilation(m, iterations=max(1, it // 3))
            mask = (ndi.gaussian_filter(m.astype(float), max(1.0, it / 3)) > 0.5).astype(float)
        ys, xs = np.nonzero(mask > 0.5)
        scale = width * B / (xs.max() - xs.min() + 1)
        rgba = cl.cutout(g, mask, scale, tint=None if tint_poly is None else tint_poly[0], tint_mask=None if tint_poly is None else tint_poly[1],
                         margin=margin * B, seed=seed, paper=CARD, ink_gain=ink_gain)
        col, a = rgba[..., :3], rgba[..., 3]
        if tint is not None or plate is not None:
            inkamt = np.clip(1 - (col.mean(2) - INK.mean()) / (CARD.mean() - INK.mean()), 0, 1)
            base = CARD[None, None, :] * np.ones_like(col)
            if tint is not None:
                # hand colour: only where the cut-out's own paper is (not the white margin): approximate by the alpha core
                core = ndi.binary_erosion(a > 0.5, iterations=int(margin * B) + 2).astype(float)
                core = ndi.gaussian_filter(core, 1.5)
                base = base * (1 - tint_k * core[..., None]) + tint * tint_k * core[..., None]
            ik = INK if plate is None else plate
            col = base * (1 - inkamt[..., None]) + ik * inkamt[..., None]
        return self.save(name, col, a, **meta)

    # ---------- a photograph re-screened as a newsprint halftone clipping ----------
    def halftone(self, name, file, width, crop=None, caption=None, seed=0, cell=5.0):
        B = self.B
        im = self.load(file, crop).convert('L')
        Wd = int(width * B); Hd = int(Wd * im.size[1] / im.size[0])
        g = np.asarray(im.resize((Wd, Hd), Image.LANCZOS), float) / 255
        g = np.clip((g - 0.1) / 0.8, 0, 1) ** 1.1
        yy, xx = np.mgrid[:Hd, :Wd].astype(float)
        cl_ = cell * B
        c, s = math.cos(math.pi / 4), math.sin(math.pi / 4)
        u, v = (xx * c + yy * s) / cl_, (-xx * s + yy * c) / cl_
        d = np.sqrt(((u % 1) - 0.5) ** 2 + ((v % 1) - 0.5) ** 2)
        dots = np.clip((np.sqrt(np.clip(1 - g, 0, 1) / math.pi) * 1.05 - d) * cl_ * 0.9 + 0.5, 0, 1)
        P = int(20 * B); capH = int(40 * B) if caption else 0
        Hc, Wc = Hd + 2 * P + capH, Wd + 2 * P
        m = np.zeros((Hc + 20, Wc + 20), bool); m[10:10 + Hc, 10:10 + Wc] = True
        body, _ = torn(m, rough=1.6 * B, seed=seed, amp=0.5)
        tex = paper_texture(Hc + 20, Wc + 20, seed=seed + 2, fibers=300); tex = 1 + (tex - 1) * 0.7
        col = NEWS[None, None, :] * tex[..., None]
        ink = np.zeros(body.shape); ink[10 + P:10 + P + Hd, 10 + P:10 + P + Wd] = dots * 0.92
        if caption:
            img = Image.new('L', (Wc + 20, Hc + 20), 0)
            ImageDraw.Draw(img).text((10 + P, 10 + P + Hd + 10 * B), caption, font=font(F_CP, 18 * B), fill=235)
            ink = np.maximum(ink, np.asarray(img, float) / 255)
        col = col * (1 - ink[..., None]) + INK * ink[..., None]
        return self.save(name, col, body)

    # ---------- rubber stamp (ink only: distressed, no paper) ----------
    def stamp(self, name, text, size=90, color=RED, seed=0, frame=True, sub=None, fnt=F_SLAB, legible=False):
        """rubber-stamp ink. legible=True (standard since #004, 7-selera #22): ink ×1.6 drawn opaque (over=1, no multiply) plus a
        faint paper-coloured halo hugging letters and frame, so the red reads over busy engravings while staying transparent ink
        (no card, no paper edge). Default False keeps the look of #001–#003 when they are re-baked."""
        B = self.B
        f = font(fnt, size * B); fs = font(F_CPB, size * 0.32 * B)
        tw = f.getlength(text); asc, desc = f.getmetrics()
        sw = fs.getlength(sub) if sub else 0
        px, py = int(size * 0.28 * B), int(size * 0.18 * B)
        W_ = int(max(tw, sw) + 2 * px); H_ = int(asc + desc * 0.3 + 2 * py + (size * 0.42 * B if sub else 0))
        P = int(12 * B)
        img = Image.new('L', (W_ + 2 * P, H_ + 2 * P), 0); d = ImageDraw.Draw(img)
        if frame:
            lw = max(3, int(size * 0.07 * B))
            d.rounded_rectangle([P, P, P + W_, P + H_], radius=int(size * 0.12 * B), outline=255, width=lw)
            d.rounded_rectangle([P + lw * 2, P + lw * 2, P + W_ - lw * 2, P + H_ - lw * 2], radius=int(size * 0.08 * B), outline=255, width=max(2, lw // 2))
        d.text((P + (W_ - tw) / 2, P + py), text, font=f, fill=255)
        if sub:
            d.text((P + (W_ - sw) / 2, P + py + asc + desc * 0.1), sub, font=fs, fill=255)
        a = np.asarray(img, float) / 255
        h, w = a.shape
        n = fbm(h, w, scales=(1.2, 3, 9), weights=(0.4, 0.35, 0.25), seed=seed)
        a = a * np.clip(0.55 + 0.6 * n + 0.35, 0, 1) * (np.random.default_rng(seed).random((h, w)) > 0.06)
        a = ndi.gaussian_filter(a, 0.5) * 0.92
        if not legible:
            return self.save(name, color[None, None, :], a, ink=1)
        a = np.clip(a * 1.6, 0, 1)
        halo = ndi.gaussian_filter(ndi.binary_dilation(a > 0.25, iterations=int(4 * B)).astype(float), 2.5 * B) * 0.55
        alpha = np.maximum(a, halo); wink = a / np.maximum(alpha, 1e-6)
        col = CARD[None, None, :] * (1 - wink[..., None]) + color * wink[..., None]
        return self.save(name, col, alpha, ink=1, over=1)

    def mirror(self, name):
        """left-right mirrored copy <name>_m of a baked part (a negative sx in film.js would show the paper's back)."""
        Image.open(os.path.join(self.out, name + '.png')).transpose(Image.FLIP_LEFT_RIGHT).save(os.path.join(self.out, name + '_m.png'))
        self.M[name + '_m'] = dict(self.M[name])

    # ---------- ink marks: tick, cross, circle, arrow (hand-drawn strokes, ink only) ----------
    def mark(self, name, kind, size=120, color=RED, seed=0, width=0.11):
        B = self.B
        S = int(size * B); P = int(10 * B)
        img = Image.new('L', (S + 2 * P, S + 2 * P), 0); d = ImageDraw.Draw(img)
        r = np.random.default_rng(seed); j = lambda: r.normal(0, S * 0.015)
        lw = max(3, int(S * width))
        def stroke(pts):
            pts = [(P + x * S + j(), P + y * S + j()) for x, y in pts]
            d.line(pts, fill=255, width=lw, joint='curve')
            for x, y in (pts[0], pts[-1]):
                d.ellipse([x - lw / 2, y - lw / 2, x + lw / 2, y + lw / 2], fill=255)
        if kind == 'cross':
            stroke([(0.1, 0.12), (0.5, 0.5), (0.9, 0.9)]); stroke([(0.88, 0.1), (0.5, 0.52), (0.12, 0.9)])
        elif kind == 'tick':
            stroke([(0.08, 0.55), (0.38, 0.86), (0.92, 0.12)])
        elif kind == 'circle':
            t = np.linspace(0.2, 2 * math.pi + 0.6, 60)
            stroke([(0.5 + 0.44 * math.cos(a) * (1 + 0.03 * math.sin(3 * a)), 0.5 + 0.40 * math.sin(a)) for a in t])
        elif kind == 'eq':
            stroke([(0.1, 0.36), (0.9, 0.34)]); stroke([(0.1, 0.66), (0.9, 0.64)])
        a = np.asarray(img, float) / 255
        n = fbm(*a.shape, scales=(1.5, 5), weights=(0.6, 0.4), seed=seed + 1)
        a = a * np.clip(0.8 + 0.3 * n, 0, 1)
        return self.save(name, color[None, None, :], a, ink=1)

    # ---------- engraved data bar (the swelling copperplate line) ----------
    def bar(self, name, width, height, seed=0, wash=AMBER, label=None):
        B = self.B
        w, h = int(width * B), int(height * B)
        P = int(10 * B)
        yy, xx = np.mgrid[:h + 2 * P, :w + 2 * P].astype(float)
        inside = (xx >= P) & (xx < P + w) & (yy >= P) & (yy < P + h)
        u = (xx - P) / max(1, w)
        tone = np.clip(0.12 + 0.5 * (1 - np.sin(np.clip(u, 0, 1) * math.pi)) ** 1.4 + 0.06 * fbm(*xx.shape, scales=(4, 12), weights=(0.5, 0.5), seed=seed), 0, 1)
        ink = engrave(tone, xx * 0.35 + yy, 7.0 * B, wobble=0.05 * fbm(*xx.shape, scales=(8,), weights=(1,), seed=seed + 3)) * inside
        edge = inside & ~ndi.binary_erosion(inside, iterations=max(2, int(1.6 * B)))
        ink = np.maximum(ink, edge * 1.0)
        col = CARD[None, None, :] * np.ones(xx.shape + (1,))
        col = col * (1 - 0.7 * inside[..., None]) + wash * 0.7 * inside[..., None]
        col = col * (1 - ink[..., None]) + INK * ink[..., None]
        m = np.zeros(xx.shape, bool); m[P // 2:-P // 2, P // 2:-P // 2] = True
        body, _ = torn(ndi.binary_dilation(inside, iterations=int(4 * B)), rough=1.0 * B, seed=seed, amp=0.25)
        return self.save(name, col, np.maximum(body, inside * 1.0))

    # ---------- black paper silhouette from a polygon (world units) ----------
    def silhouette(self, name, pts, seed=0, band=None):
        B = self.B
        xs, ys = [p[0] for p in pts], [p[1] for p in pts]
        w, h = int((max(xs) + 20) * B), int((max(ys) + 20) * B)
        m = poly_mask(h, w, [(x * B, y * B) for x, y in pts]) > 0.5
        body, _ = torn(m, rough=0.8 * B, seed=seed, amp=0.2)
        tex = 1 + 0.06 * fbm(h, w, scales=(2, 10, 40), weights=(0.3, 0.4, 0.3), seed=seed + 2)
        col = INK[None, None, :] * 1.08 * tex[..., None]
        return self.save(name, col, body)

    # ---------- a printed/typed document drawn with PIL on its own paper (world w x h) ----------
    def doc(self, name, w, h, paper, draw, seed=0, rough=0.7, amp=0.2, shape=None, **meta):
        """draw(img: PIL RGB at pixel size, d: ImageDraw, k: px per world unit). shape(d_mask, k) may draw a custom
        outline on an 'L' mask (default: the full rectangle). Paper texture is multiplied over everything."""
        B = self.B
        P = int(10 * B)
        W_, H_ = int(w * B) + 2 * P, int(h * B) + 2 * P
        img = Image.new('RGB', (W_, H_), tuple(int(c) for c in paper)); d = ImageDraw.Draw(img)
        mk = Image.new('L', (W_, H_), 0); dm = ImageDraw.Draw(mk)
        if shape is None:
            dm.rectangle([P, P, W_ - P, H_ - P], fill=255)
        else:
            shape(dm, B, P)
        draw(img, d, B, P)
        m = np.asarray(mk, float) > 127
        body, _ = torn(m, rough=rough * B, seed=seed, amp=amp)
        tex = paper_texture(H_, W_, seed=seed + 1, fibers=max(20, int(W_ * H_ / 2500))); tex = 1 + (tex - 1) * 0.6
        col = np.asarray(img, float) * tex[..., None]
        return self.save(name, col, body, **meta)


def bezier_pts(pts, n=24):
    out = []
    for i in range(0, len(pts) - 3, 3):
        p0, p1, p2, p3 = [np.array(p, float) for p in pts[i:i + 4]]
        for t in np.linspace(0, 1, n, endpoint=False):
            out.append(tuple((1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3))
    out.append(tuple(pts[-1]))
    return out
