#!/usr/bin/env python3
"""Hand-tint an engraved AI print (vintage hand-coloured engraving look) — ARSIP Kolase, batch #009+.
Colour follows the engraving's own closed outlines: the non-ink paper is split into regions (connected components after
closing small gaps in the lines); every region takes the colour of the rough zone (polygon, 0..1 of the image) that covers
most of it; ink pixels take the colour of the nearest region (colour sits under the hatching). Output: RGBA PNG
'<name>.tint.png' next to the source (RGB = wash colour, A = wash strength 0..1), read by Baker.cut(tint_map=...).
Zones file (JSON): {"zones": [{"color": "#D9A75E", "poly": [[x,y],...]}, ...]}  later zones win where they overlap.
  python3 kit/collage/handtint.py stories/burger/kolase/ai/burger_tebal.jpg stories/burger/kolase/tint/burger_tebal.json [--preview out.jpg]
"""
import sys, json, argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi


def hexc(h):
    h = h.lstrip('#'); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)


def build(src, zones, ink_thr=150, close_px=2, blur=2.0, strength=0.62):
    g = np.asarray(Image.open(src).convert('L'), float)
    H, W = g.shape
    ink = g < ink_thr
    lines = ndi.binary_dilation(ink, iterations=close_px)
    lab, n = ndi.label(~lines)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    # zone index map (0 = none)
    zmap = Image.new('I', (W, H), 0); d = ImageDraw.Draw(zmap)
    cols = [None]
    for i, z in enumerate(zones, 1):
        d.polygon([(x * W, y * H) for x, y in z['poly']], fill=i); cols.append(hexc(z['color']))
    zmap = np.asarray(zmap)
    # majority zone per region
    reg_zone = np.zeros(n + 1, int)
    idx = np.nonzero((lab > 0) & (zmap > 0))
    if idx[0].size:
        pairs = lab[idx].astype(np.int64) * (len(cols) + 1) + zmap[idx]
        cnt = np.bincount(pairs, minlength=(n + 1) * (len(cols) + 1)).reshape(n + 1, len(cols) + 1)
        size = np.bincount(lab.ravel(), minlength=n + 1)
        cnt[:, 0] = 0
        # a region is coloured only when a zone covers most of it (paper wrappers etc. next to a zone stay plain)
        reg_zone = cnt.argmax(1) * (cnt.max(1) >= 0.5 * np.maximum(size, 1))
    for b in border: reg_zone[b] = 0
    zone_px = reg_zone[lab]
    zone_px[lab == 0] = 0
    # ink / line pixels inherit nearest coloured region; keep only inside the object's silhouette
    sil = ndi.binary_fill_holes(ndi.binary_closing(g < 225, iterations=6))
    has = lab > 0   # nearest paper region of any kind (plain regions keep their ink plain)
    _, (iy, ix) = ndi.distance_transform_edt(~has, return_indices=True)
    zone_full = zone_px[iy, ix] * sil
    rgb = np.ones((H, W, 3)) * 255
    a = np.zeros((H, W))
    for i in range(1, len(cols)):
        m = zone_full == i
        rgb[m] = cols[i]; a[m] = zones[i - 1].get('strength', strength)
    # soft watercolour edge
    a = ndi.gaussian_filter(a, blur)
    for c in range(3): rgb[..., c] = ndi.gaussian_filter(rgb[..., c], blur)
    return g, rgb, a


def preview(g, rgb, a, paper=(246, 236, 210), ink=(30, 25, 21)):
    base = np.ones(rgb.shape) * np.array(paper, float)
    base = base * (1 - 0.85 * a[..., None]) + rgb * 0.85 * a[..., None]
    lo, hi = np.percentile(g, 3), np.percentile(g, 88)
    k = np.clip((hi - g) / max(1, hi - lo), 0, 1) ** 0.9
    out = base * (1 - k[..., None]) + np.array(ink, float) * k[..., None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('zones'); ap.add_argument('--preview')
    A = ap.parse_args()
    Z = json.load(open(A.zones))
    g, rgb, a = build(A.src, Z['zones'], **Z.get('params', {}))
    out = A.src.rsplit('.', 1)[0] + '.tint.png'
    Image.fromarray(np.dstack([rgb, a * 255]).clip(0, 255).astype(np.uint8), 'RGBA').save(out)
    print('tint ->', out)
    if A.preview: preview(g, rgb, a).save(A.preview, quality=90); print('preview ->', A.preview)
