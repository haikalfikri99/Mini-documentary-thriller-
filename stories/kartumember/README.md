# ARSIP KASUS #012: kartumember
**Formula ARSIP v6.0** · **Status:** validasi topik · **Mode produksi:** Hibrida (#009–#012: topik + fact sheet + skrip AV dari user/Gemini) atau Otomatis (#013+) · **Model:** Sonnet untuk riset/fact sheet, model penalaran tertinggi + effort high untuk skrip final dan `film.js`

## Klasifikasi (v6.0)
| Kolom | Isi |
|---|---|
| Mesin cerita | 1 Behavioral Backfires / 2 Hidden Choice Design / 3 Human Anomalies |
| Mode durasi | Ringkas (35–42 dtk, 85–105 kata) / Investigasi (48–55 dtk, 115–135 kata) |
| Arketipe hook (K1–K5) / penutup (1–5) | |
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
Penutup (default: Reframing Sistemik / Circular Reframe Loop; ekor audio ≤ 0,15 dtk):

## Scorecard v6.0 (16 cek §F6 + cek 17–22 `1-cerita…` §M6 + gerbang H1–H7/R1–R6)

## Catatan lanjut

## VO (17 Nov 2026)
`audio/raw_take1.mp3` (konektor ElevenLabs, Saos Cocol, eleven_v4, 1 take, 943 kredit) → `vo_tighten.py --min-dur 0 --max-dur 999 --hold <idx>:<dtk>` → `audio/vo_kartumember.mp3`: akhir kata 50,0 dtk, 2,66 kata/dtk, atempo 1,094, jeda pengungkapan 0,59 dtk (diukur). `vo_words.json` = align_vo pada file final.

## Prompt Flow (17 Nov 2026)
`kolase/flow_prompts.md` (dibuat generator batch `research/batch_009_012/flow_prompts_gen.py`; halaman salin https://claude.ai/artifact/FhZiaveDueextaSFX3VAab). Hasil → folder Drive episode → `kolase/ai/<label>.jpg`.

## Gambar Flow diterima (17 Nov 2026)
Ditarik dari Drive `Bahan images` ke `kolase/ai/`. 8/8 ada; `kasir_kartu` diulang (kartu terlalu kecil & miring untuk ditempel 2 cap). Catatan: `cuci_mobil` ada coretan busa mirip huruf di kaca (kecil, diterima). Resolusi ±1024–1200 px → minta upscaled. Prompt perbaikan: `research/batch_009_012/flow_ulang_lokal.txt`. VO + script_vo diunggah ke folder Drive episode.

## Fase 4 — bake + storyboard v1 (17 Nov 2026)
- **Dibuat:** `kolase/bake.py` (pola #009: `ai_to_raw()` + kartu cap dicetak kode langsung di kartu kosong gambar AI — `tangan_a` = cermin `kartu_tangan` + kartu 8 kotak kosong, `tangan_b`/`tangan_b0` = kartu 10 kotak dengan/tanpa 2 cap GRATIS, `kasir_b` = `kasir_kartu` + kartu 10 kotak 2 cap; cap merah lewat peta tint §L; `stempel_hand` = `stempel_tangan` tanpa kertas & bantalan tinta supaya bisa menekan kartu kode; geometri kotak/kartu/ujung stempel ditulis ke manifest), `prints.json` (10 potongan), `SOURCES.jsonl` (8 gambar AI), `film.js` (24 shot, 50,4 dtk), `episode.json` (judul, dur 50,4, case line `KARTU · 2006`), `storyboard.json` v1. Halaman: `make_page.py` → scratchpad `sb012/storyboard_012.html` (diterbitkan sesi utama).
- **Isi visual:** frame 0 = dua tangan + dua kartu (8 kosong vs 10 dengan 2 cap) sudah bergerak di 0,00, cap 8 CAP di 0,12/0,22 dtk; jangkar Indonesia (kartu kopi, cuci motor, meja kedai kopi, motor berbusa); kasus cuci mobil + map ARSIP + dua siluet pengamat + catatan kunjungan; barisan 10 pelanggan dibelah dua kelompok; stabilo kotak sisa 8 = 8; kerumunan 20 orang 4 vs 7 menyala; grafik 19% vs 34% (hanya layar); garis waktu tanpa jumlah hari; voucher identik; pelari start/berlari di lintasan 8 vs 10 kotak (2 sudah dicap); kasir + lingkaran 2 cap; 2 cap GRATIS dicoret, SISA 8; loop ke frame 0 + CUMA TERASA.
- **QA:** `check_visual.mjs` 0 serius, 0 peringatan. 3 putaran revisi keyframe (stempel keluar frame, cap merah di pita merah, cap hijau di lingkaran hijau, label map menimpa #012, BEDA JAUH/SAMA PERSIS menutup judul kartu, grafik & lintasan terpotong tepi).
- **Kelemahan jujur:** (1) peneliti = siluet bertopi seri (`sil_man`), terbaca "pengamat/detektif", bukan wajah peneliti; (2) piktogram pelanggan & kartu buatan kode tetap "grafis", detail gravir hanya dari 8 gambar AI; (3) kotak & teks aturan kartu di tangan kecil (kotak ±60–75 px, aturan "10 cap = 1x GRATIS" ±25 px) — terbaca sebagai pola, tidak sebagai teks; (4) "± 9 bulan" dan 34%/19% dari sumber sekunder (sama status dengan fact sheet); (5) shot 12–13 dan 23 sama-sama memakai kartu + stabilo (dibedakan: tumpuk dua kartu vs satu kartu dengan cap GRATIS dicoret); (6) beberapa frame masih menyisakan ruang kosong di y ±1000–1180 di atas caption.
- **Berikutnya:** review user di halaman Artifact → revisi v2 → `score_full.py` + `fullmix.py` → `make_kolase.sh`.


**Penanda v6.1 (log batch #009–#012, ditambahkan 18 Nov 2026 untuk `kit/tools/lint_episode.py`):** [HOOK: Celah Ujung Lidah] [ENDING: Reframing Sistemik] [SEGAR: klasik (studi 2006)]


## Upload (18 Nov 2026)
`UPLOAD.md` siap salin (judul 45 karakter, deskripsi, 20 tag, komentar pin, pengaturan, catatan hukum). Thumbnail: `renders/thumbnail_kartumember_1080x1920.jpg` dari `kolase/cover.json` (t 0,6; slip "SAMA-SAMA 8 CAP LAGI / HASILNYA BEDA JAUH"). Jadwal usul: Sabtu 21 Nov 2026 18.00 WIB (Hari 3). Slot uji Pola 4: catat hasil 48 jam. Sesi utama mengisi `File:` dan `QA:` setelah render, membuat `cover_frame_0.6s.jpg`, lalu `pack_upload`.

## Render final v1 (18 Nov 2026)
`renders/ARSIP_012_kartumember_v1.mp4` lolos QA audio + visual (header `UPLOAD.md`). Drive folder episode: `UPLOAD_012_kartumember.txt`, thumbnail, frame cadangan. MP4 > 10 MB dikirim lewat chat, user menaruhnya di Drive. **Jadwal (keputusan user):** Hari 3 = Sabtu 21 Nov 2026, 18.00 WIB (atau 12.00), urutan batch #009 → #010 → #012 → #011.
