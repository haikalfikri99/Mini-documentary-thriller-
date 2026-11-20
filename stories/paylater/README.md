# ARSIP KASUS #011: paylater
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
`audio/raw_take1.mp3` (konektor ElevenLabs, Saos Cocol, eleven_v4, 1 take, 863 kredit) → `vo_tighten.py --min-dur 0 --max-dur 999 --hold <idx>:<dtk>` → `audio/vo_paylater.mp3`: akhir kata 43,5 dtk, 2,64 kata/dtk, atempo 1,100, jeda pengungkapan 0,56 dtk (diukur). `vo_words.json` = align_vo pada file final.
⚠ Whisper small/medium/large-v3 mendengar "dompet **rasa**" (bukan "terasa") di ±34 dtk final: kemungkinan "t" melebur. Menunggu dengar user; generate ulang hanya bila janggal.

## Prompt Flow (17 Nov 2026)
`kolase/flow_prompts.md` (dibuat generator batch `research/batch_009_012/flow_prompts_gen.py`; halaman salin https://claude.ai/artifact/FhZiaveDueextaSFX3VAab). Hasil → folder Drive episode → `kolase/ai/<label>.jpg`.

## Gambar Flow diterima (17 Nov 2026)
Ditarik dari Drive `Bahan images` ke `kolase/ai/`. 8/8 ada; `kalender_sobek` diulang (halaman robek terbaca seperti kertas sobek, bukan kalender). Resolusi ±1024 px → minta upscaled. Prompt perbaikan: `research/batch_009_012/flow_ulang_lokal.txt`. VO + script_vo diunggah ke folder Drive episode.

## Fase 4 — bake + storyboard v1 (17 Nov 2026)
- `kolase/bake.py`: `ai_to_raw()` + **layar HP dicetak kode langsung ke area layar putih `ai/jempol_hp.jpg`** (jempol tetap di atas) dalam 3 varian + peta tint (tombol PAYLATER amber, header aplikasi biru arsip): `jempol_checkout` (KERANJANG, TOTAL Rp250.000, BAYAR SEKARANG, PAYLATER), `jempol_bank` (ubin Transfer/Tagihan/Top up/PAYLATER), `jempol_riwayat` (6 baris Paylater); kalender sobek dicetak 4 varian (JUNI 2026, HARI INI 1, JATUH TEMPO 30, MINGGU KE-26). Dokumen kode (tepi sobek/siluet): label harga Rp250.000 & $25, struk panjang, kartu debit generik, kartu 32,8 JUTA, TAGIHAN, amplop pos udara, lembar DATA PEMBELI, garis waktu SEBELUM|SESUDAH, batang gravir 100 vs 110, grafik 26 minggu, catatan UANG KELUAR Rp0, siluet pembeli biru/amber, cap HARGA SAMA / BAYAR HARI INI / MENUNGGU / BERTAHAN / SAMA, slip & huruf tebusan. `prints.json` = 13 potongan (gambar AI + varian cetak).
- `kolase/film.js`: 21 shot, 43,75 dtk (= panjang mp3), shot 1,04–3,38 dtk; jeda pengungkapan 30,84–31,40 dibekukan; shot 21 kembali ke komposisi frame 0. `check_visual.mjs`: **0 peringatan**. Storyboard: `kolase/storyboard.json` → halaman `make_page.py` (21 kartu).
- Pelajaran #009 diterapkan: tiap shot 4–8 lapis; kerumunan 18 siluet untuk "32 juta rekening"; pembanding ditampilkan berdampingan (dua keranjang + dua label $25 sama; batang 100 vs 110 + keranjang lama memudar); grafik dengan sumbu, minggu 0/13/26, garis paylater masuk, ikon keranjang di ujung garis; tanpa strip sumber (hanya "data OJK, Juni 2026" sangat kecil di shot 6).
- **Kelemahan jujur:** (1) shot 7 "Belanja sekarang" (10,52–12,66) gabungan dua kalimat (kalimat kedua 1,04 dtk terlalu pendek sendiri); shot 7 dan 8 sama-sama memakai dua kalender (isi beda: paket+tagihan vs dua label sama), bisa terasa mirip. (2) siluet seri bertopi (gaya lama) untuk pembeli modern AS; kerumunan shot 6 tumpang tindih padat. (3) harga Rp250.000/$25, isi struk, riwayat, data pembeli = ilustrasi (bukan klaim). (4) jempol kecil 0,1 dtk shot 1 menimpa sebagian tombol PAYLATER (disengaja, "mau menekan"). (5) angka layar HP kecil di shot 2/17/11 (HP diperkecil) hanya dekorasi. (6) Shot 20 pembeli berwajah Indonesia, shot 9–16 = studi AS (siluet); konsisten dengan "kamu" di penutup.
- Usulan gambar Flow (opsional, belum dipakai): `kasir_ritel_as` — pria kasir di supermarket besar bergaya gravir, untuk "peritel besar" di shot 10; `pembeli_keranjang` — pria dewasa membawa keranjang penuh, pose sedikit menyesal, pengganti siluet di shot 16.


**Penanda v6.1 (log batch #009–#012, ditambahkan 18 Nov 2026 untuk `kit/tools/lint_episode.py`):** [HOOK: Ketidaknyamanan Kontra-Intuitif] [ENDING: Cermin Personal] [SEGAR: 2026 (data OJK Juni 2026)] [MESIN: B3] [LATAR: layar]

## Upload (18 Nov 2026)
`UPLOAD.md` (judul 51 karakter, deskripsi, 21 tag, thumbnail, komentar pin, pengaturan, catatan hukum) dan `kolase/cover.json` siap; thumbnail `renders/thumbnail_paylater_1080x1920.jpg` (frame 0,6 dtk, hook "SESUDAH ADA PAYLATER / KERANJANG +10%"). Header `**File:**` dan `**QA:**` diisi sesi utama setelah render. `cover_frame_<t>s.jpg` dan `upload_pack/` menunggu render mp4. Jadwal: Minggu 22 Nov 2026, 18.00 WIB (Hari 4). Tidak diunggah ke Drive, tidak di-commit.

## Render final v1 (18 Nov 2026)
`renders/ARSIP_011_paylater_v1.mp4` lolos QA audio + visual (header `UPLOAD.md`). Drive folder episode: `UPLOAD_011_paylater.txt`, thumbnail, frame cadangan. MP4 > 10 MB dikirim lewat chat, user menaruhnya di Drive. **Jadwal (keputusan user):** Hari 4 = Minggu 22 Nov 2026, 18.00 WIB (atau 12.00), urutan batch #009 → #010 → #012 → #011.
