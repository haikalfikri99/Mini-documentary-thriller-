#!/usr/bin/env python3
"""Uji fitur judul (negativitas, angka, uang, kontras, dst) pada data Shorts kita. Rasio = views / median channel; breakout = rasio >= 3.
Baseline & filter channel sama dengan RISET_JUDUL.md. Bootstrap per CHANNEL (cluster) untuk CI yang jujur."""
import json, re, random, statistics as st, collections, sys
rows = [json.loads(l) for l in open('data_shorts_per_channel.jsonl')] + [json.loads(l) for l in open('data_selingan_channels.jsonl')]
seen = {}; 
for r in rows:
    if r.get('v') and r['id'] not in seen: seen[r['id']] = r
rows = list(seen.values())
by = collections.defaultdict(list)
for r in rows: by[r['h']].append(r)
EXC = {'Kompas','kompascom','NarasiNewsroom','tirtoid','WSJ','CNBC','CNBCMakeIt','businessinsider','Vox','OtakKanan'}
ID = {'KokBisa','KamusUnik','NgomonginUang','TauGakSih.Official','NihongoMantappu','PantesanLaku','DetektifAstral','TaksakaSeta','KTJ','MEDIA_ID','AlamSemenit','TakTerdugaID','RaymondChins'}
data = []
for h, v in by.items():
    if len(v) < 40 or h in EXC: continue
    med = st.median(x['v'] for x in v)
    for x in v: data.append(dict(h=h, t=x['t'], ratio=x['v'] / med if med else 0, lang='id' if h in ID else 'en'))
NEG = r"\b(denda|didenda|bangkrut|larang|dilarang|bahaya|berbahaya|mematikan|maut|tewas|korban|gagal|tertipu|menipu|penipuan|dihukum|hukuman|ancam|diancam|rugi|kerugian|bohong|dibohongi|terbongkar|skandal|kartel|monopoli|jebakan|racun|beracun|mati|tragis|kelam|gelap|sengaja|disembunyikan|rahasia|ditutupi|marah|ngeri|seram|horor|kutukan|hancur|runtuh|kehilangan|menyesal|dilarang|ditarik|ilegal|curang|licik|jahat|musuh|bahaya|terlarang|"
NEG += r"ban|banned|fined|fine|lawsuit|sued|scam|lie|lied|lies|deadly|dangerous|danger|kill|killed|dies|died|death|fail|failed|bankrupt|ruined|destroy|destroyed|secret|hidden|hide|hides|cartel|illegal|trap|toxic|poison|worst|crazy|insane|terrifying|horrifying|disaster|collapse|angry|regret|cheat|cheats|scandal)\b"
POS = r"\b(bagus|hebat|keren|sukses|untung|berhasil|indah|bahagia|manis|enak|terbaik|menang|juara|happy|best|amazing|beautiful|love|win|wins|success|perfect|great|incredible)\b"
def has(rx, t): return re.search(rx, t, re.I) is not None
FEATS = {
 'negatif(kata)': lambda t: has(NEG, t),
 'positif(kata)': lambda t: has(POS, t),
 'angka/digit': lambda t: bool(re.search(r"\d", t)),
 'uang/harga': lambda t: has(r"\b(rp|rupiah|harga|mahal|murah|miliar|triliun|juta|\$|dollar|price|cost|billion|million|cents?)\b|[$€£]", t),
 'tanda_tanya': lambda t: '?' in t,
 'mulai_kenapa/why': lambda t: has(r"^(kenapa|kok|mengapa|why|how|apa)\b", t),
 'ternyata/real/truth': lambda t: has(r"\b(ternyata|sebenarnya|sesungguhnya|real|truth|actually)\b", t),
 'superlatif': lambda t: has(r"\b(paling|terbesar|terkecil|termahal|terburuk|terbaik|pertama|satu-satunya|biggest|largest|worst|best|first|only|most)\b", t),
 'kontras(tapi/padahal)': lambda t: has(r"\b(tapi|padahal|namun|but|yet|instead|except)\b", t),
 'CAPS(kata>=3huruf)': lambda t: bool(re.search(r"\b[A-Z]{3,}\b", t)),
 'merek/nama_diri(kapital tengah)': lambda t: bool(re.search(r"(?<!^)(?<![.!?] )\b[A-Z][a-z]+", t)),
 'ancaman/denda/larangan': lambda t: has(r"\b(denda|didenda|dilarang|larang|diancam|ancam|ban|banned|fined|sued|lawsuit|illegal|ilegal)\b", t),
 'panjang<=6kata': lambda t: len(t.split()) <= 6,
}
base = sum(d['ratio'] >= 3 for d in data) / len(data)
print(f"N={len(data)} judul, channel={len({d['h'] for d in data})}, baseline breakout={base:.3f}")
random.seed(1)
chans = sorted({d['h'] for d in data}); idx = {c: [d for d in data if d['h'] == c] for c in chans}
def rate(ds, f):
    a = [d['ratio'] >= 3 for d in ds if f(d['t'])]; b = [d['ratio'] >= 3 for d in ds if not f(d['t'])]
    return (sum(a) / len(a) if a else float('nan'), len(a), sum(b) / len(b) if b else float('nan'))
def boot(ds_by, f, n=400):
    out = []
    for _ in range(n):
        cs = [random.choice(chans) for _ in chans]; ds = [d for c in cs for d in ds_by.get(c, [])]
        ra, na, rb = rate(ds, f)
        if na >= 5: out.append(ra - rb)
    out.sort(); return (out[int(.025 * len(out))], out[int(.975 * len(out))]) if len(out) > 50 else (float('nan'), float('nan'))
for lang in ('id', 'en', 'all'):
    ds = [d for d in data if lang == 'all' or d['lang'] == lang]
    dsb = collections.defaultdict(list)
    for d in ds: dsb[d['h']].append(d)
    print(f"\n== {lang}  n={len(ds)}  baseline={sum(d['ratio']>=3 for d in ds)/len(ds):.3f}")
    print(f"{'fitur':34} {'n_ya':>5} {'breakout_ya':>11} {'breakout_tdk':>12} {'selisih':>8} {'CI95 (cluster)':>18} {'ch+/ch':>7}")
    for name, f in FEATS.items():
        ra, na, rb = rate(ds, lambda t: f(t))
        if na < 8: continue
        lo, hi = boot(dsb, f)
        pos = tot = 0
        for c, v in dsb.items():
            a = [x['ratio'] for x in v if f(x['t'])]; b = [x['ratio'] for x in v if not f(x['t'])]
            if len(a) >= 3 and len(b) >= 3:
                tot += 1; pos += st.median(a) > st.median(b)
        print(f"{name:34} {na:5} {ra:11.3f} {rb:12.3f} {ra-rb:+8.3f} [{lo:+.3f},{hi:+.3f}] {pos:>3}/{tot}")
