#!/usr/bin/env python3
"""Alignment kata VO: Whisper (faster-whisper small, CPU) + ejaan dari script.
Pakai: python3 kit/tools/align_vo.py audio.mp3 script.txt out_vo_words.json
script.txt = VO bersih (tanpa tag). Kata yang tak cocok langsung diinterpolasi menurut panjang huruf."""
import sys, json, re, difflib, subprocess, numpy as np
from faster_whisper import WhisperModel
aud, scr, out = sys.argv[1:4]
a = np.frombuffer(subprocess.run(["ffmpeg", "-loglevel", "error", "-i", aud, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout, np.float32)
segs, _ = WhisperModel("small", device="cpu", compute_type="int8").transcribe(a, language="id", word_timestamps=True, beam_size=5)
W = [[w.start, w.end, w.word.strip()] for s in segs for w in s.words]
S = re.sub(r"\[[^\]]*\]", "", open(scr).read()).split()
SUB = {"akuah": "aqua", "akua": "aqua", "lay": "le", "leh": "le", "gak": "nggak", "dapet": "dapat", "deket": "dekat"}
def norm(t):
    t = re.sub(r"[^a-z0-9]", "", t.lower()); return SUB.get(t, t)
sm = difflib.SequenceMatcher(None, [norm(x) for x in S], [norm(w[2]) for w in W], autojunk=False)
T = [None] * len(S)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == "equal":
        for k in range(i2 - i1): T[i1 + k] = W[j1 + k][:2]
    elif i2 > i1:
        t0, t1 = (W[j1][0], W[j2 - 1][1]) if j2 > j1 else ((W[j1 - 1][1] if j1 else 0.0), (W[j1][0] if j1 < len(W) else (W[j1 - 1][1] if j1 else 0) + .3))
        L = [len(x) for x in S[i1:i2]]; c = t0
        for k, l in enumerate(L):
            d = (t1 - t0) * l / sum(L); T[i1 + k] = [c, c + d]; c += d
res = [[round(t[0], 2), round(t[1], 2), w] for t, w in zip(T, S)]
json.dump(res, open(out, "w"), ensure_ascii=False)
eq = sum(i2 - i1 for t, i1, i2, _, _ in sm.get_opcodes() if t == "equal")
gap3 = max([res[k + 1][0] - res[k][1] for k in range(len(res) - 1) if res[k + 1][0] < 3.0] or [0])
print(f"kata script {len(S)}, whisper {len(W)}, cocok langsung {eq}; akhir {res[-1][1]} dtk; {len(S)/res[-1][1]:.2f} kata/dtk; jeda terbesar <3 dtk {gap3:.2f}")
for t, i1, i2, j1, j2 in sm.get_opcodes():
    if t != "equal": print(" ", t, S[i1:i2], "→", [w[2] for w in W[j1:j2]])
