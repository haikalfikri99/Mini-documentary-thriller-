#!/usr/bin/env python3
"""Penggalian kandidat topik skala besar, gratis: (1) autocomplete YouTube ID untuk banyak benda x awalan tanya;
(2) pemenang views di kueri pola niche ('alasan sebenarnya', 'rahasia di balik', ...) via yt-dlp.
Pakai: python3 kit/tools/gali_topik.py autocomplete seeds.txt out.json | outlier queries.txt out.json"""
import json, sys, time, subprocess
import requests

PREFIX = ["kenapa ", "kok ", "alasan ", "rahasia ", "asal usul ", "ternyata ", "sejarah "]

def ac(q):
    r = requests.get("https://suggestqueries.google.com/complete/search",
                     params={"client": "firefox", "ds": "yt", "hl": "id", "gl": "id", "q": q}, timeout=15)
    return r.json()[1]

def mode_ac(seeds, out):
    res = {}
    for s in seeds:
        got = set()
        for p in PREFIX:
            try:
                got.update(ac(p + s))
            except Exception:
                pass
            time.sleep(0.2)
        res[s] = sorted(got)
        json.dump(res, open(out, "w"), ensure_ascii=False)
    return res

def mode_outlier(queries, out, n=40):
    vids = {}
    for q in queries:
        try:
            o = subprocess.run(["yt-dlp", "--flat-playlist", "-J", f"ytsearch{n}:{q}"],
                               capture_output=True, text=True, timeout=180).stdout
            for e in json.loads(o).get("entries", []):
                v = vids.setdefault(e["id"], dict(views=e.get("view_count") or 0, ch=e.get("channel"),
                                                  title=e.get("title"), dur=e.get("duration"), q=[]))
                v["q"].append(q)
        except Exception:
            pass
        time.sleep(1)
        json.dump(vids, open(out, "w"), ensure_ascii=False)
    return vids

if __name__ == "__main__":
    mode, inp, out = sys.argv[1:4]
    lines = [l.strip() for l in open(inp) if l.strip() and not l.startswith("#")]
    (mode_ac if mode == "autocomplete" else mode_outlier)(lines, out)
