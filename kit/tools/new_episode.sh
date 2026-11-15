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
**Status:** validasi topik · **Model:** Sonnet untuk riset/fact sheet, Opus + effort high sebelum script (SKILL.md "Titik ingat")

## Validasi topik (skor ≥ 16/20, tidak ada nilai ≤ 2)
Rubrik: `research/niche/topik/RUMUS_PEMILIHAN.md` (4 kriteria × 5) + gerbang lama (Lokal ≥ 4, Celah ≥ 3, Cerita ≥ 3).
| Kriteria | Skor (1–5) | Alasan |
|---|---|---|
| Kedekatan sehari-hari | | |
| Kontras intuisi / twist | | |
| Ketersediaan bukti visual kolase | | |
| Keamanan hukum & monetisasi | | |
| **Total** | /20 | |
Hasil `riset_topik.py`: saran = , video = , ≥100k = , ≥1M =

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
Atribusi ("menurut ..."), tahun di layar, tanpa logo asli, "tidak disponsori":

## Judul & penguncian 3-titik (0,0–4,0 dtk)
Judul (≤ 55 karakter, ideal 38–48):
Frame 0 (objek utama ≥ 45% lebar frame di y 150–1150 + hantaman stempel/label ≤ 0,25 dtk):
Kalimat H1 (selesai ≤ 4,0 dtk, ≤ 14 kata, kata tunjuk visual bila merujuk objek di layar):

## Paket final script
120–145 kata, 48–55 dtk @ 2,60–2,75 kata/dtk. Salin VO bersih ke `kolase/audio/script_vo.txt`; prompt bertag ke `audio/vo_prompt_elevenlabs.md`.
6 segmen + 2 micro-rehook: (1) hook 0–4 dtk · (2A) aturan main · micro-rehook 1 (~16–18 dtk) · (2B) bedah intrik · micro-rehook 2 (~36–39 dtk) · (3–4) payoff + penutup.
Penutup (default: Circular Reframe Loop; varian: pertanyaan reflektif):

**VO bersih:**
>

## Scorecard (Formula v5.0, 16 cek + gerbang H1–H7/R1–R6)

## Catatan lanjut
README_TPL
  sed -i.bak "s/__NO3__/$NO3/; s/__SLUG__/$SLUG/" "$S/README.md" && rm -f "$S/README.md.bak"
fi
echo "→ $K   langkah berikut: VO + vo_words.json, lalu python3 kit/tools/line_starts.py stories/$SLUG"
