#!/usr/bin/env python3
"""Rapatkan jeda VO lalu atempo terbatas (keputusan #004 + batch #005–#008). File mentah tidak diubah.
    python3 kit/audio/vo_tighten.py raw.mp3 raw_words.json out.mp3 [--max 1.10] [--wps 2.66] [--min-dur 50.5] [--max-dur 54.5]
raw_words.json = keluaran kit/tools/align_vo.py pada file mentah (ejaan script, tanda baca menempel di kata).
1) Hening sungguhan (level 10 ms < suara median - 30 dB) di tiap celah antar-kata dipendekkan ke target AKHIR:
   titik/tanya/seru 0,22 dtk (--sent) · elipsis (jeda dramatis) 0,25 · titik dua 0,15 · koma 0,13 (--comma) · tanpa tanda baca 0,10;
   hening yang sudah lebih pendek dibiarkan. Potongan diambil dari tengah hening, sambungan crossfade 8 ms.
2) atempo = durasi_rapat / target, dengan target = kata / wps dijepit ke [min-dur, max-dur], faktor dijepit ke [1,00, max].
   Bila faktor mentok di batas: jeda turun ke batas bawah (titik 0,18 · koma 0,10), lalu durasi dibiarkan di atas target
   (suara natural lebih penting; keputusan user 15 Nov 2026: atempo tidak pernah > 1,10)."""
import sys, json, argparse, subprocess, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('raw'); ap.add_argument('words'); ap.add_argument('out')
ap.add_argument('--max', type=float, default=1.10); ap.add_argument('--wps', type=float, default=2.66)
ap.add_argument('--sent', type=float, default=.22); ap.add_argument('--comma', type=float, default=.13)
ap.add_argument('--min-dur', type=float, default=50.5); ap.add_argument('--max-dur', type=float, default=54.5)
A = ap.parse_args()
SR, HOP = 48000, 480
TGT = {'.': A.sent, '?': A.sent, '!': A.sent, '…': .25, ':': .15, ',': A.comma, '': .10}
y = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', A.raw, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                                 capture_output=True).stdout, np.float32).astype(np.float64)
W = json.load(open(A.words)); n = len(y) // HOP
db = 20 * np.log10(np.sqrt(np.mean(y[:n * HOP].reshape(n, HOP) ** 2, axis=1)) + 1e-9)
voiced = db > np.max(db) - 40; thr = np.median(db[voiced]) - 30; sil = db < thr
first = int(np.argmax(~sil))
def punct(w):
    t = w.rstrip('"\')')
    if t.endswith('…') or t.endswith('...'): return '…'
    return t[-1] if t and t[-1] in '.?!:,' else ''
def runs():
    """longest silent run (frames) inside each inter-word gap, with its punctuation class"""
    R = []
    for k in range(len(W) - 1):
        a, b = int((W[k][1] - .08) * SR / HOP), int((W[k + 1][0] + .08) * SR / HOP)
        best, s = (0, 0), None
        for i in range(max(a, 0), min(b, n)):
            if sil[i] and s is None: s = i
            if (not sil[i] or i == min(b, n) - 1) and s is not None:
                e = i if not sil[i] else i + 1
                if e - s > best[1] - best[0]: best = (s, e)
                s = None
        R.append((best, punct(W[k][2])))
    return R
R = runs()
def tighten(f):
    """cut list [(start_sample, end_sample)] for tempo factor f (targets are final values, so pre-tempo target = t*f)"""
    cuts = [(0, max(0, first * HOP - int(.03 * SR)))]
    for (s, e), p in R:
        have = (e - s) * HOP / SR; want = TGT[p] * f
        if have > want + .02:
            mid = (s + e) * HOP // 2; half = int((have - want) * SR / 2); cuts.append((mid - half, mid + half))
    return cuts
def new_time(t, cuts):
    x = int(t * SR); return (x - sum(min(max(x - a, 0), b - a) for a, b in cuts)) / SR
target = min(max(len(W) / A.wps, A.min_dur), A.max_dur)
def solve():
    f = 1.0
    for _ in range(4):
        d = new_time(W[-1][1], tighten(f)); f = min(max(d / target, 1.0), A.max)
    return f
f = solve(); mode = 'tengah'
if f >= A.max - 1e-6:                      # tempo mentok di batas: pakai batas bawah rentang jeda dulu, jangan tambah atempo
    TGT.update({'.': .18, '?': .18, '!': .18, ',': .10}); f = solve(); mode = 'rapat (tempo mentok di batas)'
cuts = tighten(f)
keep, pos, xf = [], 0, int(.008 * SR)
for a, b in sorted(cuts):
    if b > a: keep.append(y[pos:a]); pos = b
keep.append(y[pos:])
out = keep[0]
for seg in keep[1:]:
    if len(out) > xf and len(seg) > xf:
        r = np.linspace(0, 1, xf); out = np.concatenate([out[:-xf], out[-xf:] * (1 - r) + seg[:xf] * r, seg[xf:]])
    else: out = np.concatenate([out, seg])
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'f64le', '-ar', str(SR), '-ac', '1', '-i', '-', '-af', f'atempo={f:.4f}',
                '-c:a', 'libmp3lame', '-b:a', '192k', A.out], input=out.astype(np.float64).tobytes(), check=True)
raw_end, tight_end = W[-1][1], new_time(W[-1][1], cuts); fin = tight_end / f
cut_s = sum(b - a for a, b in cuts) / SR
print(json.dumps({'kata': len(W), 'mentah_akhir_kata': round(raw_end, 2), 'mentah_wps': round(len(W) / raw_end, 2),
                  'jeda_dipangkas_dtk': round(cut_s, 2), 'setelah_rapat': round(tight_end, 2), 'atempo': round(f, 3),
                  'akhir_kata_final': round(fin, 2), 'wps_final': round(len(W) / fin, 2), 'target': round(target, 2), 'jeda': mode}))
