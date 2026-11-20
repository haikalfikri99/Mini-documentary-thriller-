# ARSIP KASUS #010: kantong
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
`audio/raw_take1.mp3` (konektor ElevenLabs, Saos Cocol, eleven_v4, 1 take, 1.070 kredit) → `vo_tighten.py --min-dur 0 --max-dur 999 --hold <idx>:<dtk>` → `audio/vo_kantong.mp3`: akhir kata 54,9 dtk, 2,66 kata/dtk, atempo 1,035, jeda pengungkapan 0,58 dtk (diukur). `vo_words.json` = align_vo pada file final.

## Prompt Flow (17 Nov 2026)
`kolase/flow_prompts.md` (dibuat generator batch `research/batch_009_012/flow_prompts_gen.py`; halaman salin https://claude.ai/artifact/FhZiaveDueextaSFX3VAab). Hasil → folder Drive episode → `kolase/ai/<label>.jpg`.

## Gambar Flow diterima (17 Nov 2026)
Ditarik dari Drive `Bahan images` ke `kolase/ai/`. 9/9 ada; `kasir_kantong` diulang (gulungan kantong terbaca seperti tisu); tambah `timbangan` (prestige). Resolusi ±1024 px → minta unduhan upscaled. Prompt perbaikan: `research/batch_009_012/flow_ulang_lokal.txt`. VO + script_vo diunggah ke folder Drive episode.

## Fase 4 — bake + storyboard v1 (17 Nov 2026)
**Dibuat:** `kolase/bake.py` (label Rp200 / BAYAR 5 SEN / BONUS 5 SEN, koin 200 rupiah + koin 5¢ generik, struk minimarket 2016 + varian stabilo `struk_hl`/`struk_tot`, peta uji coba + pin, kalender FEB–MEI 2016, grafik pemakaian 100 → 70, halaman jurnal 2018, siluet pembeli pria/perempuan berkerudung + ikon kantong, cap DITOLAK/BERBAYAR/RUGI/RASA RUGI/GRATIS; **timbangan AI dipotong jadi 4 potongan teregistrasi** `tb_post/tb_beam/tb_panL/tb_panR` sehingga lengan bisa miring sementara piring tetap tergantung tegak), `prints.json` (9 gambar AI; `koin_permen` memakai `tint_map`), `film.js` 23 shot (1,36–3,46 dtk; dur 55,22), `episode.json` (judul, dur), `storyboard.json`, `SOURCES.jsonl` (10 gambar AI). `check_visual.mjs`: **0 serius, 0 peringatan**. Halaman storyboard dibuat di scratchpad sesi (`sb010/storyboard_010.html`), belum diterbitkan.
**Pelajaran #009 diterapkan:** tiap frame 1 subjek + 2–4 bukti; perbandingan Amerika berdampingan (kiri merah bayar, kanan kuning bonus); kuantitas orang = barisan siluet (3/10 menolak di hook ≈ 30% KLHK; 2/5 berhenti vs 0/5 di AS ≈ −42 poin vs nyaris sama); tanpa strip sumber (atribusi mini di sudut grafik dan di jurnal).
**Kelemahan jujur:** (1) harga barang di struk (24.200 dst.) dan tanggal 21-02-2016 = ilustrasi; (2) peta Indonesia digambar kasar dari poligon, 17 pin tanpa nama kota (jumlah resmi 22/23 beda antar-sumber); (3) proporsi siluet 3/10 dan 2/5 adalah pembulatan visual dari angka pemakaian, bukan jumlah orang; (4) caption "NILAINYA" muncul di awal jeda 0,6 dtk karena `vo_words.json` memasukkan jeda ke kata itu (timing VO tidak diubah); (5) shot 12 sisi kanan masih kosong sampai kamera membuka di shot 13 (disengaja); (6) di shot 14–15 tokoh AS memakai gambar waist-up vs full-body, kepala disamakan dengan skala (≈ 120 px), sambungan torso peluk terpotong di pinggang.
**Berikutnya:** sesi utama menerbitkan Artifact → review user → v2 → audio (score_full, fullmix) → render.


**Penanda v6.1 (log batch #009–#012, ditambahkan 18 Nov 2026 untuk `kit/tools/lint_episode.py`):** [HOOK: Ketidaknyamanan Kontra-Intuitif] [ENDING: Pemicu Dunia Nyata] [SEGAR: 2016 (uji coba KLHK; studi Homonoff 2018)] [MESIN: A2] [LATAR: benda]

## Upload (18 Nov 2026)
`UPLOAD.md` siap salin (judul 52 karakter, deskripsi, 21 tag/436 karakter, thumbnail, komentar pin, pengaturan, catatan hukum). Thumbnail: `renders/thumbnail_kantong_1080x1920.jpg` dari `kolase/cover.json` (t 0,9). Deskripsi menyebut uji coba dihentikan Aprindo 1 Okt 2016; fact sheet tidak memuat konteks 2026, jadi hanya ada kalimat "video ini tentang uji coba 2016, cek aturan daerah terbaru". Belum diisi (sesi utama setelah render): baris File, QA, `cover_frame_<t>s.jpg`, `pack_upload.py`, unggah Drive. Jadwal usul: Jumat 20 Nov 2026, 18.00 WIB.

## Render final v1 (18 Nov 2026)
`renders/ARSIP_010_kantong_v1.mp4` lolos QA audio + visual (header `UPLOAD.md`). Drive folder episode: `UPLOAD_010_kantong.txt`, thumbnail, frame cadangan. MP4 > 10 MB dikirim lewat chat, user menaruhnya di Drive. **Jadwal (keputusan user):** Hari 2 = Jumat 20 Nov 2026, 18.00 WIB (atau 12.00), urutan batch #009 → #010 → #012 → #011.
