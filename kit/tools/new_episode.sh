#!/usr/bin/env bash
# New ARSIP Kolase episode scaffold.   kit/tools/new_episode.sh <slug> <no> ["CASE LINE"]
#   → stories/<slug>/{README.md, meta.json, audio/} + stories/<slug>/kolase/ (template bake.py, film.js, score_full.py, fullmix.py,
#     prints.json, SOURCES.jsonl, episode.json; lib → kit/collage, audio → ../audio)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; SLUG="$1"; NO="$2"; LINE="${3:-$(echo "$SLUG" | tr a-z A-Z)}"
S="$ROOT/stories/$SLUG"; K="$S/kolase"
[ -e "$K" ] && { echo "sudah ada: $K"; exit 1; }
mkdir -p "$S/audio" "$K"
find "$ROOT/kit/collage/template" -maxdepth 1 -type f -exec cp {} "$K/" \;   # files only (a __pycache__ dir in the template made `cp *` abort under set -e)
"$ROOT/kit/tools/links.sh"
python3 - "$K/episode.json" "$SLUG" "$NO" "$LINE" <<'PY'
import json, sys
p, slug, no, line = sys.argv[1:]
json.dump(dict(slug=slug, no=int(no), title='', case_line=line, vo=f'audio/vo_{slug}.mp3', words='audio/vo_words.json', dur=0, report=[[0, 0]]), open(p, 'w'), indent=1)
PY
[ -f "$S/meta.json" ] || printf '{"id":"%s","series":"ARSIP KASUS #%03d","style":"arsip-kolase","status":"fact sheet"}\n' "$SLUG" "$NO" > "$S/meta.json"
if [ ! -f "$S/README.md" ]; then   # (the old one-liner printed the template to the terminal: it had no redirect)
  NO3=$(printf '%03d' "$NO")
  cat > "$S/README.md" <<'README_TPL'
# ARSIP KASUS #__NO3__: __SLUG__
**Formula ARSIP v7.0** · **Status:** validasi topik · **Mode produksi:** Otomatis (Claude penuh; riset per batch: 6 kandidat → 4 terkunci, `AGENTS.md` §3) · **Model:** Sonnet untuk riset/fact sheet, model penalaran tertinggi + effort high untuk skrip final dan `film.js`

**Penanda wajib (dibaca `python3 kit/tools/lint_episode.py --batch …`; isi semuanya sebelum VO):**
[HOOK: ] [ENDING: ] [MESIN: A1|A2|B3|B4] [LATAR: layar|dokumen|kemasan|benda|peta|grafik|tempat] [SEGAR: <tahun>|klasik] [MODE: Ringkas|Investigasi] [ARTEFAK: <benda fisik Frame 0>] [LOOP: <detail Frame 0> → <makna yang terungkap> @<detik>] [LABEL: DATA INDONESIA + EKSPERIMEN <negara> | satu asal] (+ [SLOT-UJI] bila ini slot uji judul 3:1)

## Kompas & Channel-Fit Gate (v7.0; `AGENTS.md` §2A; semua ✓ sebelum fact sheet)
- [ ] Garis Merah v7.0: bukan self-help/tips/nasihat · bukan bantahan mitos datar atau bacaan pasal tanpa konflik · bukan topik basi/klise · bukan meta-YouTube · bukan studi Daftar Hitam
- [ ] Topic Stress-Test v7.0: belum diperah kreator besar 2 tahun terakhir · dekat dompet/waktu/kesehatan usia 20–45 · 3 Pilar Konflik (antagonis sistemik + stakes + The Turn) · Vox Handle (artefak fisik untuk kolase)
- [ ] Artefak fisik Frame 0 (≥ 486 px, stempel merah ≤ 0,25 dtk; bukan otak/kartun berpikir): 
- [ ] Antagonis tak kasatmata + taruhan nyata: 
- [ ] The Turn (pembalikan babak): 
- [ ] Penutup Curtain-Pull Reveal (tanpa menggurui; salah satu dari 5 arketipe): 
- [ ] Mesin B4 (anomali perilaku): jangkar kejadian nyata Indonesia di 0–4 dtk sebelum eksperimen: 

## Tangga bukti (micro-rehook tiap 12–15 dtk; `1-cerita…` §M8.2)
| Detik | Tingkat | Isi |
|---|---|---|
| ±0–12 | Asumsi Awal | |
| ±12–27 | Jangkar Lokal | |
| ±27–40 | Eksperimen Kontrol | |
| ±40–55 | Pembalikan Otak (+ Conceptual Loop terungkap) | |

## Klasifikasi (v7.0)
| Kolom | Isi |
|---|---|
| Mesin cerita (v7.0: A ~60% · B ~40%) | A1 skandal/kartel/celah aturan · A2 backfire produk/kebijakan · B3 jebakan harga/desain pilihan · B4 anomali perilaku teruji |
| Mode durasi | Ringkas (35–42 dtk, 85–105 kata) / Investigasi (48–55 dtk, 115–135 kata) |
| Arketipe hook (K1–K5) / penutup (1–5) / latar visual utama | |
| Pola judul (kuota 3:1) | Pola 1 / uji Pola 3-4-5 |
| **Status replikasi studi** (Filter Anti-Krisis; wajib bila bersandar pada studi psikologi) | replikasi besar / meta-analisis / kritik utama + sumber; Daftar Hitam? |

## Validasi topik (skor ≥ 16/20, tidak ada nilai ≤ 2)
Rubrik: `research/niche/topik/RUMUS_PEMILIHAN.md` (4 kriteria × 5) + gerbang (Lokal ≥ 4, Celah ≥ 3, Cerita ≥ 3) + Topic Stress-Test v6.0 (celah 33–67% · Retention Anchor · Vox Handle · satu ide + The Turn).
| Kriteria | Skor (1–5) | Alasan |
|---|---|---|
| Kedekatan sehari-hari | | |
| Kontras intuisi / twist | | |
| Ketersediaan bukti visual kolase | | |
| Keamanan hukum & monetisasi | | |
| **Total** | /20 | |
Hasil `riset_topik.py`: saran = , video = , ≥100k = , ≥1M = (saran kecil BUKAN alasan gugur: Feed Curiosity; ukur kejenuhan sesudut `n_1m`)

## Anatomi konflik non-kriminal (lembar kerja F2, v6.0)
1. Antagonis tak kasatmata (arsitektur pilihan / variable reward / angka jangkar / tekanan konformitas):
2. Taruhan nyata (uang, waktu, fokus, keselamatan penonton):
3. Tiga babak: The Pledge → The Turn → The Prestige:

## Uji POV penonton (4 pertanyaan, jawab sebelum menulis script)
1. Siapa melawan siapa / siapa pelakunya?
2. Objek fisik konkret apa yang ditunjuk di layar?
3. Taruhan langsung ke penonton (uang, waktu, keselamatan)?
4. "Alasan ASLI" yang dibawa pulang penonton (satu kalimat):

## Fact sheet (2 lapis sumber)
Lapis lokal: ≥ 2 sumber yang membuktikan peristiwa/putusan di Indonesia. Lapis mekanisme/primer: ≥ 1 putusan/dokumen/penelitian primer; bila primer tidak terbaca (403/PDF), tulis "primer: tidak terbaca" dan ucapkan klaimnya sebagai "menurut [lembaga/laporan]".
| # | Klaim | Lapis | Status | Sumber |
|---|---|---|---|---|
| 1 | | lokal | | |
| 2 | | primer | | |
Angka hanya bila eksplisit di sumber dan konsisten antar-sumber; bila sumber hanya menyebut arah ("lebih murah"), pakai perbandingan perilaku.

## Celah & batas hukum
Tidak diketahui (tidak boleh diucapkan):
Bantahan pihak terkait:
Atribusi pendek ("kata ...") di kalimat sesudah hook, tahun di layar, tanpa logo asli, "tidak disponsori":

## Judul & penguncian 3-titik (0,0–4,0 dtk) — Aturan Kuda Troya (tanpa psikologi/bias/kenapa/padahal/tapi/ternyata/? di judul dan frame 0, kecuali slot uji)
Judul (≤ 55 karakter, ideal 38–48):
Frame 0 (hero ≥ 45% lebar ≈ ≥ 486 px di y 150–1150 + hantaman stempel/label ≤ 0,25 dtk; barang bukti fisik, bukan kartun orang berpikir):
Kalimat H1 (selesai ≤ 4,0 dtk, ≤ 14 kata, kata tunjuk visual bila merujuk objek di layar):

## Skrip AV 2 kolom (final; `1-cerita…` §M4)
Tempo VO 2,50–2,66 kata/dtk, atempo ≤ 1,10. Notasi: `/` jeda ≈ 0,25 dtk · `//` hening ≈ 0,6 dtk · `KAPITAL` penekanan · `[perlambat: teks]` · `(intonasi)`. Micro-rehook tiap 12–15 dtk; hening 0,5–0,8 dtk sebelum pengungkapan utama; transisi ABT; tanpa sitasi akademik panjang; penutup tanpa "Jadi/Kesimpulannya/Pada akhirnya/Nah itulah".
| # | Visual kolase (arsip / dokumen / gerak) | Audio: VO word-for-word + notasi + SFX |
|---|---|---|
| 1 | | |
VO bersih (tanpa notasi) → `audio/script_vo.txt`; bertag → `audio/vo_prompt_elevenlabs.md`.
Bahasa lisan luwes (nggak/bikin/aja/udah), 8–13 kata per kalimat; "tapi/padahal" TIDAK di judul dan kalimat pembuka (0–4 dtk), boleh di body (ABT).
Penutup (rotasi 5 arketipe, bukan default; Curtain-Pull Reveal; ekor audio ≤ 0,15 dtk):

## Scorecard v7.0 (16 cek §F6 + cek 17–22 `1-cerita…` §M6 + gerbang H1–H7/R1–R6)

## Catatan lanjut
README_TPL
  sed -i.bak "s/__NO3__/$NO3/; s/__SLUG__/$SLUG/" "$S/README.md" && rm -f "$S/README.md.bak"
fi
if [ ! -f "$S/UPLOAD.md" ]; then   # kerangka paket upload v7.0 (5-upload… §F); lint_episode.py + pack_upload.py memeriksanya
  cat > "$S/UPLOAD.md" <<'UPLOAD_TPL'
# Upload — ARSIP KASUS #__NO3__ __SLUG__
**File:** TODO · **QA:** TODO · **Jadwal (usul):** TODO

## 1. Judul (≤ 55 karakter; Kuda Troya: tanpa psikologi/bias/kenapa/tapi/padahal/ternyata/?)
```
TODO judul
```

## 2. Deskripsi (2–3 kalimat pembuka kaya kata kunci alami; lalu Sumber + kredit)
```
TODO kalimat 1. TODO kalimat 2.

Sumber:
• TODO

Video ini tidak disponsori merek mana pun.

#shorts #TODO #TODO
```

## 3. Tag
```
TODO
```

## 4. Thumbnail
- TODO (`python3 kit/tools/make_cover.py stories/__SLUG__/kolase`) + frame cadangan

## 5. Komentar pin (satu pertanyaan pengalaman pribadi penonton, memakai "kamu")
```
TODO pertanyaan pengalaman?
```

## 6. Pengaturan saat upload
Bukan untuk anak-anak · Kategori Pendidikan · Indonesia · konten sintetis: Ya

## 7. Catatan hukum
TODO
UPLOAD_TPL
  sed -i.bak "s/__NO3__/$(printf %03d "$NO")/; s/__SLUG__/$SLUG/g" "$S/UPLOAD.md" && rm -f "$S/UPLOAD.md.bak"
fi
echo "→ $K   langkah berikut: VO + vo_words.json, lalu python3 kit/tools/line_starts.py stories/$SLUG"
