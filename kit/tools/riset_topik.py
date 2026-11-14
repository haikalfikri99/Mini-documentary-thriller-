#!/usr/bin/env python3
"""Riset topik gratis tanpa API key: permintaan (autocomplete YouTube ID) + pasokan (video ID yang sudah ada, via yt-dlp).
Pakai:  pip install yt-dlp requests ; python3 kit/tools/riset_topik.py kandidat.json hasil.json
kandidat.json = [{"id":"susu","judul":"...","demand":["susu kental manis","kenapa susu kental manis"],"supply":["susu kental manis bukan susu","bpom susu kental manis shorts"]}]
Aturan baca hasil: lihat research/niche/topik/RUMUS_PEMILIHAN.md"""
import json, sys, time, subprocess, urllib.parse, concurrent.futures as cf
import requests

PREFIX = ["", "kenapa ", "kok ", "alasan ", "rahasia ", "sejarah "]

def autocomplete(q):
    r = requests.get("https://suggestqueries.google.com/complete/search",
                     params={"client": "firefox", "ds": "yt", "hl": "id", "gl": "id", "q": q}, timeout=15)
    return r.json()[1]

def demand(terms):
    seen = {}
    for t in terms:
        for p in PREFIX:
            q = (p + t).strip()
            try:
                for s in autocomplete(q):
                    seen[s] = q
            except Exception:
                pass
            time.sleep(0.25)
    key = [t.lower() for t in terms]
    rel = [s for s in seen if any(k.split()[0] in s.lower() for k in key)]
    return sorted(rel)

def supply(queries, n=10):
    vids = {}
    for q in queries:
        try:
            out = subprocess.run(["yt-dlp", "--flat-playlist", "-J", f"ytsearch{n}:{q}"],
                                 capture_output=True, text=True, timeout=120).stdout
            for e in json.loads(out).get("entries", []):
                vids[e["id"]] = dict(views=e.get("view_count") or 0, dur=e.get("duration"),
                                     ch=e.get("channel"), title=e.get("title"),
                                     short="/shorts/" in (e.get("url") or ""))
        except Exception:
            pass
        time.sleep(1)
    return sorted(vids.values(), key=lambda v: -v["views"])

def one(c):
    d = demand(c["demand"])
    s = supply(c["supply"])
    v = [x["views"] for x in s]
    return dict(id=c["id"], judul=c["judul"], n_saran=len(d), saran=d[:12],
                n_video=len(s), max_views=max(v) if v else 0,
                n_100k=sum(x >= 1e5 for x in v), n_1m=sum(x >= 1e6 for x in v),
                top=s[:5])

if __name__ == "__main__":
    cands = json.load(open(sys.argv[1]))
    with cf.ThreadPoolExecutor(3) as ex:
        res = list(ex.map(one, cands))
    json.dump(res, open(sys.argv[2], "w"), ensure_ascii=False, indent=1)
    for r in res:
        print(f"{r['id']:10} saran={r['n_saran']:3} video={r['n_video']:2} max={r['max_views']:>9,} >=100k:{r['n_100k']} >=1M:{r['n_1m']}  {r['judul']}")
