# Audit produksi ARSIP KASUS — apakah 1 Short/hari mungkin?
Tanggal audit: 13 Nov 2026 (commit terakhir 03:27 UTC). Sumber: SKILL.md + references 1–6, `kit/` (README, HYBRID3D, tools, audio), episode #002 (`stories/scroll/`), #001 (`stories/molase/`), `git log`, `research/niche/KEPUTUSAN_RISET.md`.
Legenda: **[U]** = terukur/tertulis di repo atau git · **[E]** = estimasi saya (belum diukur) · **[I]** = inferensi dari riwayat git.

## Kesimpulan satu paragraf
Dengan alur sekarang, 1 video/hari **tidak tercapai**. #002 memakan **±15 jam wall-clock [U, git]**, ±5 jam 25 menit sejak VO ada sampai final. Render **bukan** hambatan utama (11 m 24 s per film 3D 44,8 dtk [U]). Hambatan terbesar: (1) naskah/pemilihan cerita yang berputar 8 versi dan satu cerita ditolak (9 jam 14 menit wall-clock, sebagian besar menunggu), (2) eksplorasi arah visual yang dibuang (±2 jam 38 menit), (3) setiap episode menulis ulang kode shot/set (738 baris, ±67 KB), (4) putaran persetujuan dan VO yang dibuat user, (5) setup container tiap sesi. Episode 3D (standar sejak #003) **belum pernah dibuat utuh**, jadi biaya per episode 3D sebenarnya belum terukur; hanya ada satu uji end-to-end memakai VO dan cue #002.

---
## 1. Tabel pipeline saat ini (urutan SKILL.md)
Durasi #002 diambil dari timestamp commit (UTC). "Gerbang user" = ✋ di SKILL.md atau aksi manual user.

| # | Langkah | Siapa | Manual / otomatis | Input → Output | Durasi | Gerbang user |
|---|---|---|---|---|---|---|
| 1a | Shortlist 8–10 judul + skor | Claude (riset vidIQ/web) | manual (prompt + MCP) | bank ide, vidIQ → daftar di chat | tidak ada log [E: 20–40 mnt] | **1 ✋** pilih judul |
| 1b | Fact sheet ≥2 sumber/klaim | Claude | manual | judul → `README.md` fact sheet (#002: 14 klaim) | tidak terpisah di git; [E: 30–60 mnt] | 0 (disetujui bersama script) |
| 2 | Script Formula ARSIP v3/v3.1 + scorecard 14 cek + gerbang H1–H7/R1–R6 | Claude, review user | manual | fact sheet → script + scorecard | **#002: 15:45 → 00:59 = 9 j 14 mnt wall-clock [U]**; jeda 16:33→23:10 (6 j 37 mnt, user tidak aktif/malam) sehingga aktif ±2 j 40 mnt [I]. **8 versi script + 1 cerita ditolak (Gruen)** [U] | **1 ✋** (script), praktis ≥3 putaran [I] |
| 3 | Prompt ElevenLabs bertag → VO | Claude tulis prompt; **user generate** (kuota) | manual | script → `vo_prompt_elevenlabs.md` → `vo_<slug>.mp3` | prompt 01:04 → VO take 1 01:30 = **26 mnt [U]** | **1 aksi user** (generate + pilih take) |
| 4 | Setup container + alignment kata + koreksi `vo_words.json` | Claude + tool | setup: skrip; alignment: snippet Whisper manual | mp3 → `vo_words.json` | setup: tidak diukur [E: 3–8 mnt, lihat §2]; alignment Whisper small CPU [E: 1–2 mnt]; koreksi manual bila kata "tanpa suara" | 0 |
| 5 | Storyboard: bangun shot/dunia, render keyframe, artifact, user komentar | Claude; **user komentar** | manual (kode per shot) | words + script → `shots.js`/`world.js` → `board/` → artifact | **#002: 04:28 → 05:11 = 43 mnt untuk 25 shot draf 1; revisi v2 (+175/−70 baris) selesai 05:33; fix S12 05:40 [U]**. Sebelumnya: eksplorasi look 01:50 → 04:28 = **2 j 38 mnt** (noir → look bible → style frames → "tanpa wajah" → analisis referensi → rig) [U] | **1 ✋** (storyboard), #002 2 putaran |
| 6 | Timing kamera (`film.js`), skor (`score_full.py`), SFX cue (`fullmix.py`) | Claude | manual (kode per episode) | timeline + cue | 05:40 → 05:48 = **8 mnt** untuk film.js+skor+SFX draf [U] | 0 |
| 7a | Mix + audio QA (gerbang) | tool (`make_film.sh`) | otomatis (cue ditulis manual) | VO → `mix_full.wav` + lap. margin | bagian dari "±7 mnt" total `make_film` untuk film 2D [U, README/SKILL]; porsi audio sendiri tidak dicatat [E: 1–3 mnt] | 0 |
| 7b | QA 3D (determinisme, error, contact sheet) | tool (`qa_3d.mjs`) | otomatis | world.js → `renders/qa3d/sheet.png` | probe ±1,1 dtk/frame; 12 frame + 6 render determinisme ≈ **20–30 dtk [E dari angka probe U]** | 0 |
| 7c | Render HyperFrames + mux −14 LUFS | tool | otomatis (background) | → `ARSIP_<no>_<slug>_v1.mp4` | **3D 44,8 dtk = 11 m 24 s [U]**; film 2D ±7 mnt untuk seluruh `make_film` [U] | 0 |
| 7d | QA visual (contact sheet per detik + rubrik ≥9) → kirim film | Claude → user | manual | mp4 → skor rubrik | tidak diukur [E: 15–30 mnt] | **1 ✋** (film) |
| 8 | Revisi dari review + tulis pelajaran + pindahkan aset ke kit | Claude | manual | komentar → v3 | #002: film v1 05:48 → revisi 06:13 → kit 06:35 → final 06:55 = **±1 j 07 mnt** [U] | masuk gerbang 7d (≥1 putaran) |
| 9 | Thumbnail + judul/deskripsi/hashtag (`UPLOAD.md`) | Claude; **user upload manual** | semi: teks otomatis dari template, thumbnail via `?thumb` di film.js | → `UPLOAD.md`, thumbnail | metadata ikut commit 06:55–06:56 [U]; thumbnail #002 tidak ada di `stories/scroll` [catatan: tidak terlihat di git] | **1 aksi user** (upload YouTube Studio, thumbnail kustom bila eligible) |
| 10 | Data 7 hari → `6-pelajaran.md` | Claude (vidIQ) | manual | analitik → tabel | n/a (paska tayang) | 0 |

**Total gerbang menunggu user per episode (SKILL.md): 4 ✋ (shortlist, script, storyboard, film) + 2 aksi manual (generate VO, upload).** Pada #002 nyatanya lebih banyak putaran: script ≥3 (Gruen ditolak, pivot ke teritori 2, "kembali ke cerita shortlist #2" di v8) [I], storyboard 2 putaran, film 1–2 putaran.

---
## 2. Fakta terukur

| Fakta | Nilai | Status | Sumber |
|---|---|---|---|
| Render 3D, film 44,8 dtk 1080×1920 | **11 m 24 s = 684 dtk → 15,3 dtk render / dtk film** | [U] | HYBRID3D.md |
| Render 3D, take 8 dtk penuh gerak | 3 m 46 s = 28,3 dtk/dtk | [U] | HYBRID3D.md |
| Kisaran render 3D yang dicatat | 15–28 dtk per dtk film (kamera bergerak terus = lebih lama) | [U] | HYBRID3D.md, `qa_3d.mjs` memakai 28 |
| Render 2D | tidak ada log tersendiri. Satu angka: `make_film.sh` penuh (VO chain + skor + mix + QA + render + mux) "±7 menit" untuk film 44,8 dtk | [U] angka total saja | SKILL.md perintah. Perkiraan kasar 2D render ≈ 4–5 mnt ≈ 6 dtk/dtk **[E]** |
| Pratinjau cepat 3D (`preview_3d.mjs`, 540 px) | 0,5 dtk/frame → 8 dtk film (240 frame) ≈ **2 mnt**; film penuh 44,8 dtk (1.344 frame) ≈ **11 mnt** | [U] angka per-frame, hasil hitung saya | HYBRID3D.md. Jadi pratinjau penuh ≈ sama dengan render akhir; hanya berguna untuk **potongan** |
| Probe QA | ≈ 1,1 dtk/frame di 1080×1920 | [U] | HYBRID3D.md |
| Pipeline audio (VO chain + skor fluidsynth + mix SFX + Whisper QA) | tidak dicatat terpisah; dalam "±7 mnt" total 2D | porsi audio **[E] 1–3 mnt** (Whisper small int8 CPU dominan) |
| Setup container baru | `setup_env.sh` = pip (scipy, mido, faster-whisper) + apt (fluidsynth, soundfont) + unduh model Whisper `small` + npx hyperframes (+ Chromium). **Tidak ada durasi tercatat.** Di container audit ini: `mido` dan fluidsynth/soundfont belum ada, `npx hyperframes` gagal → setup wajib tiap sesi | kondisi [U]; durasi **[E] 3–8 mnt**, bergantung mirror/jaringan; kegagalan host diblok = kerja berhenti |
| Alignment kata | Whisper small CPU int8, per film 45 dtk | **[E] 1–2 mnt** + model sudah ter-unduh oleh setup |
| #002 wall-clock total (pilih cerita → final+metadata) | 11 Nov 15:45 → 12 Nov 06:55 UTC = **15 j 10 mnt** | [U] | git; KEPUTUSAN_RISET.md menulis "±15 jam" |
| #002 sejak VO ada → final | 01:30 → 06:55 = **5 j 25 mnt** | [U] | git |
| #002 arah visual diganti | ±5 kali (noir, look bible, style frames E, "tanpa wajah", rig+kulit sawo) | [U] | git + KEPUTUSAN_RISET.md |
| Retensi #002 | 37,2% stayed to watch (ambang ≥60% menurut Galloway); #001 70,4% | [U] | HYBRID3D.md, 6-pelajaran |
| Cadence yang direncanakan riset | **3 video/minggu**, target pemilik di SKILL.md: **1/hari** (keputusan user) — bertentangan; audit ini mengikuti 1/hari | [U] | KEPUTUSAN_RISET.md §4, SKILL.md |

Catatan jujur: tidak ada satu pun episode 3D yang lengkap. Angka 11 m 24 s berasal dari episode uji (template + VO #002 + cue #002), bukan dari dunia yang dibangun per cerita.

---
## 3. Hambatan, urut berdasarkan biaya waktu (per episode, basis #002)

| Peringkat | Hambatan | Biaya terukur / estimasi | Kenapa menghambat 1/hari |
|---|---|---|---|
| 1 | **Naskah + pemilihan cerita + putaran persetujuan script** | 9 j 14 mnt wall-clock (aktif ±2 j 40 mnt), 8 versi + 1 cerita ditolak [U/I] | Terbesar di jam dinding, dan sebagian besar adalah *menunggu* dan *berputar ulang*. Satu gerbang yang gagal menggeser seluruh hari. Fact-check dikerjakan per cerita dari nol |
| 2 | **Eksplorasi arah visual / gaya per episode** | 2 j 38 mnt (01:50–04:28) dibuang ke noir/look bible/style frames [U] | Sudah diatasi sebagian: gaya dikunci (kit + 3D) dan riset menyimpulkan gaya bukan variabel penentu. Risiko kambuh pada episode 3D pertama karena dunia baru tiap cerita |
| 3 | **Kode shot/set kustom per episode** | #002: `shots.js` **417 baris (39,2 KB)** + `sets.js` **195 baris (17,2 KB)** = 612 baris, 56 KB; 25 shot ≈ **16,7 baris / 1,6 KB per shot** (43 baris >200 karakter, padat). Generasi draf 25 shot ≈ 43 mnt, tetapi revisi dari review menambah 175 baris dan menghapus 70 (storyboard v2) lalu 60/31 (film v1) [U]. Estimasi per episode 3D: 1,5–3 jam kerja Claude **[E]** karena dunia 3D baru tiap cerita belum teruji (tokoh berjalan, dua tokoh berinteraksi belum diuji, HYBRID3D "Batas yang diketahui") |
| 4 | **Putaran persetujuan user** (4 ✋ + upload) | Tidak terukur per putaran; total tunggu #002 ≈ sisa wall-clock yang bukan kerja (16:33→23:10 saja 6 j 37 mnt) [U]. Tiap putaran = konteks hilang + build ulang | 4 gerbang × jam tidur/sibuk user. Bila tiap gerbang menunggu rata-rata 2–4 jam [E], itu 8–16 jam dinding, melebihi 24 jam kerja jika berurutan |
| 5 | **VO dibuat user** | 26 mnt aktif (prompt → take 1) [U]; plus 2 take, pilih, koreksi pelafalan | Satu blokade manual yang *tidak perlu*: tool ElevenLabs (`creative_generate_speech`, `creative_list_voices`, `creative_transcribe_audio`) tersedia di sesi Claude ini. SKILL.md menulis "user yang generate bila kuota habis" — kuota/penggunaan MCP belum diverifikasi. Voice Saos Cocol `R86jddkroI9bJwXFfjsr` harus ada di workspace yang terhubung — **belum dicek** |
| 6 | **Render + rework render** | 11–21 mnt per render penuh 3D (15–28 dtk/dtk) [U]; tiap revisi = render penuh lagi (§ pratinjau 2 mnt per 8 dtk) | Bukan penghambat bila render jalan di latar dan revisi dikumpulkan; menjadi masalah bila ada 3+ putaran revisi (33–60 mnt) |
| 7 | **Setup container tiap sesi** | [E] 3–8 mnt, hingga gagal bila host diblok (PyPI, apt, huggingface.co, npm) | Kecil per episode, tetapi menghilangkan sesi bila gagal; sudah dibuat `setup_env.sh` (idempoten). Bisa dibakukan di environment (`update_environment` setup script) |
| 8 | Audio: cue SFX/skor ditulis tangan per episode | `fullmix.py` 33 baris + `score_full.py` 56 baris per episode; gerbang menolak cue yang menutup kata (benar). Waktu: bagian dari 8 mnt di langkah 6 [U] | Murah, tetapi rawan iterasi bila ada kata < 8 dB |
| 9 | Thumbnail + upload | upload manual user; thumbnail kustom Shorts butuh YPP (belum) | Kecil jika frame 0 dipakai |

---
## 4. Yang bisa dipakai ulang vs ditulis ulang per episode

### Kit (dipakai ulang)
| Bagian | Berkas | Baris |
|---|---|---|
| `kit/src` (rig, scene-kit, sets-lib, card, film-engine, diorama, cam3d, rooms3d, acting, evidence, vo-sync) | 11 | **1.219** (≈153 KB) |
| `kit/audio` | 4 | 201 |
| `kit/tools` | 6 | 167 |
| **Total kit** (tanpa vendor three.js, tanpa lab/template) | 21 | **1.587** |
| Template 2D `kit/template/film` | 6 | 70 |
| Template 3D `kit/template/film3d` (world.js 62 + contoh menara 44 + index 23 + words 1) | 4 | 130 |

### Per episode (#002, tidak dipakai ulang)
| Berkas | Baris | Isi |
|---|---|---|
| `film/shots.js` | 417 | 25 shot + helper lokal (setD, setE, crt, page06, tunnel, bigButton, gripHand, handCursor, feedScreen) |
| `film/sets.js` | 195 | set A/B/C, kantor 2006, tokoh (RASKIN06, KAMU, …), S1/S5/S17 (sebagian sudah dipindah ke `kit/src/sets-lib.js`, 244 baris) |
| `film/film.js` | 18 | START per shot, CAM per shot, FLASHES |
| `film/fullmix.py` | 33 | cue SFX |
| `film/score_full.py` | 56 | not skor per babak |
| `film/index.html` | 19 | |
| **Kode episode** | **738 baris (≈67 KB)** | = **47% dari ukuran seluruh kit** ditulis ulang per video |
| Dokumen/input: `README.md` 133, `UPLOAD.md` 40, `ADAPTASI.md` 70, `vo_prompt` 23, `storyboard_artifact/index.html` 113 | 379 | naskah, fact sheet, metadata, storyboard |
| Berkas dilacak git di `stories/scroll/` | 26 | |

Rasio: kode kit ~1.587 baris dipakai semua episode; kode per episode 738 baris. Yang benar-benar generik di kit adalah **karakter, kamera, audio, QA**. Yang masih kustom: **apa yang digambar di tiap shot** (benda, ruang, diagram). #001 (molase) bahkan memakai engine lama (`toon/`, 4 file panel + loader).

Untuk 3D: `world.js` template 62 baris adalah satu take penuh. Jumlah baris per episode 3D yang riil belum ada data [belum terukur].

---
## 5. Peluang otomasi / templating (estimasi penghematan, **semua [E]**)

| # | Peluang | Hemat per episode | Syarat / catatan |
|---|---|---|---|
| A | **Pustaka tipe adegan** dengan parameter: *benda pahlawan close-up* (sesuai keputusan riset: benda besar, tengah, frame 0), *potongan melintang / cara kerja* (cutaway diagram), *peta*, *dokumen arsip* (`evidence.paper` sudah ada), *label harga*, *reaksi tokoh* (`acting.js` ada), *pengungkapan penjahat/pelaku*, *timeline*, *angka besar*, *perbandingan A vs B* | **1–2 j** dari item 3 (kode shot) menjadi isi parameter | Bangun ±8–10 tipe + lembar acuan; setiap episode baru menambah tipe ke kit (aturan yang sudah ada di kit/README). Risiko: benda pahlawan 3D belum ada di kit |
| B | **Shot list berbasis data dari script** (`shots.json`: beat, kata pemicu, tipe adegan, parameter, kamera `why`) → generator `world.js`/`film.js`/cue SFX default | **1–1,5 j** (menghapus film.js manual, sinkron kata otomatis lewat `vo-sync`) | Perlu kompiler kecil (±200–300 baris) di kit; `T('kata')` sudah ada |
| C | **VO lewat ElevenLabs MCP** (generate, pilih take dengan durasi/pelafalan, transcribe untuk kata) | **25–40 mnt** aktif user + menghilangkan satu gerbang tunggu | Verifikasi: voice Saos Cocol tersedia di akun terhubung, kuota, kecocokan `eleven_v4`; `creative_transcribe_audio` mungkin menggantikan Whisper lokal (belum dicek akurasi per kata; pertahankan Whisper lokal sebagai cadangan) |
| D | **Gerbang persetujuan dikelompokkan** (satu sesi review: 1 halaman berisi script + scorecard + storyboard kontak sheet; atau persetujuan batch 7 judul per minggu) | **4–10 j dinding** per episode (menunggu), tanpa mengurangi kendali | Lihat §6 |
| E | **Auto-storyboard**: preview 3D keyframe (`preview_3d`) → kontak sheet → artifact otomatis dari `shots.json` | **20–40 mnt** | Format `stories/scroll/storyboard_artifact/` sudah ada |
| F | **Pratinjau potongan** (`preview_3d` 8 dtk ≈ 2 mnt) menggantikan render penuh saat revisi; render penuh hanya sekali di akhir | **10–30 mnt** per revisi | sudah ada tool-nya |
| G | **Setup di environment** (setup script tersimpan di environment cloud lewat `update_environment`/`create_environment`; dependensi, model Whisper, soundfont sudah terpasang) | **3–8 mnt** per sesi; menghilangkan risiko host diblok | Perlu allowlist host (PyPI, huggingface.co, apt) sekali |
| H | **Template fact-check + naskah** (isi 7 beat dari lembar F2, scorecard otomatis hitung H1/H3 dari `vo_words.json`, cek `humanizer` otomatis) | **30–60 mnt** aktif; mengurangi versi dari 8 ke 2–3 | Otomasi cek H1–H3 mudah (waktu kata dari JSON); H2/H4 butuh penilaian |
| I | **Metadata & thumbnail otomatis**: `UPLOAD.md` dari template (fact sheet → deskripsi + sumber), thumbnail dari frame 0 yang sudah dirender (`?thumb`) | **15–25 mnt** | vidIQ MCP punya `video_upload`, `update_video_thumbnail`, `generate_titles`, `score_title`: potensi mengunggah otomatis, **belum dicoba** dan perlu otorisasi YouTube; thumbnail tetap dari kode (aturan tanpa AI image) |
| J | **Cue SFX/skor bawaan per tipe adegan** (library: tipe adegan → SFX/tema default) | **10–20 mnt** | tetap melewati gerbang audio (menolak cue yang menutup kata) |
| K | **Rotasi antrean (pipeline berlapis)**: naskah hari D+2, build hari D+1, render/upload hari D | mengubah 15 j sekuensial menjadi throughput 1/hari tanpa mempercepat satu episode | Syarat utama target 1/hari; butuh antrean ide dan persetujuan batch |

Estimasi total bila A–K selesai: kerja aktif Claude per episode ≈ **2,5–3,5 jam [E]** (naskah 40–60 mnt, build adegan 45–75 mnt, audio+QA 15 mnt, revisi 30 mnt, metadata 10 mnt) dan waktu aktif user ≈ **25–40 mnt [E]**. Itu muat 1 episode/hari bila dipipelinekan; tidak muat bila berurutan dengan gerbang menunggu.

---
## 6. Jadwal harian realistis untuk 1 video/hari (usulan, **[E]**)

Prinsip: pipeline 3 hari paralel; user menyentuh 3 gerbang yang digabung menjadi dua sesi pendek per hari; Claude bekerja di sela-sela.

| Waktu (WIB) | Claude | User | Gerbang yang dipertahankan |
|---|---|---|---|
| 08:00–08:15 | kirim "paket pagi": (1) FILM hari D (kontak sheet + mp4 + skor rubrik + metadata + thumbnail), (2) STORYBOARD D+1 (keyframe + VO sudah jadi), (3) SCRIPT D+2 (+ scorecard F6/F7 + VO draf) | review 15–25 mnt, balas satu pesan: setuju / komentar per item | **Film final** (wajib), **Script** (wajib, termasuk persetujuan VO), **Storyboard** (opsional setelah library matang: default setuju kecuali dikomentari) |
| 08:30–10:00 | publikasikan paket pagi; rilis revisi dari komentar kemarin sore; generate VO D+2 via ElevenLabs bila script D+2 disetujui | upload video D ke YouTube (5 mnt), isi thumbnail/metadata dari `UPLOAD.md` | upload manual user |
| 10:00–14:00 | bangun adegan D+1 dari shot list (tipe adegan), pratinjau potongan, audio+QA, render D+1 di latar (11–21 mnt) | — | — |
| 14:00–16:00 | riset+fact-check+script D+3 (stok cerita dari antrean batch yang sudah disetujui) | — | — |
| 16:00–16:15 | kirim "paket sore": revisi D+1, script D+3 | review 10–15 mnt | Script D+3 |
| 17:00–19:00 | revisi sore, tulis pelajaran ke `6-pelajaran.md`, ambil data tayang 7 hari lalu (vidIQ) | — | — |
| Mingguan (Minggu) | shortlist 7 judul + skor + cerita 2 kalimat | pilih 7 judul sekaligus | **Shortlist** (1× per minggu, bukan per video) |

Gerbang tersisa: shortlist batch mingguan, script harian, film harian, upload manual (storyboard opsional). Gerbang yang digabung/dibuang: storyboard terpisah (digabung ke paket pagi), VO oleh user (dihilangkan), shortlist per video (jadi per minggu).

### Yang harus dibangun lebih dulu (urut, tiap item dengan hasil yang bisa diuji)
1. **Satu episode 3D utuh sebagai ukur nyata** (#003 "kalah"): catat jam tiap langkah. Tanpa ini semua estimasi 3D tetap tebakan. *Hemat risiko terbesar.*
2. **Setup environment baku** (G) dan cek ketersediaan ElevenLabs voice + kuota (C). Cepat, menghilangkan 2 blokade.
3. **Pustaka tipe adegan + shot list data (A + B)**. Mulai dari 5 tipe yang paling sering muncul dalam pilar "alasan asli di balik benda/tempat/harga/merek": benda pahlawan, cara kerja/potongan, label harga/angka, dokumen arsip, reaksi tokoh. Ini perubahan terbesar (1–2,5 j per episode).
4. **Paket review tunggal** (script + scorecard + storyboard kontak sheet + film) sebagai satu artifact; gerbang jadi 2 per hari.
5. **Cek otomatis H1–H3/R-gerbang dari `vo_words.json`**, tes bisu otomatis (kontak sheet), supaya iterasi script turun dari 8 ke ≤3.
6. **Generator metadata + thumbnail dari frame 0**, lalu uji vidIQ upload (opsional, butuh otorisasi pemilik).
7. **Antrean 7 ide siap-produksi** (dari `BANK_IDE.md`, fact sheet awal) agar pipeline berlapis tidak kosong.

### Risiko yang perlu diputuskan pemilik
- Kualitas vs kecepatan: rubrik internal terbukti terlalu murah hati (hook 9 vs 37,2% nyata). Harian dengan library = visual lebih seragam; sesuai temuan riset (gaya bukan variabel penentu, isi frame 0 yang menentukan).
- Cadence resmi: SKILL.md menulis 1/hari, KEPUTUSAN_RISET.md menyarankan 3/minggu dan "bila #003 > 1 hari kerja, sederhanakan shot". Rekomendasi saya: **tetapkan 3/minggu dulu sampai episode ke-3 3D terukur ≤ 1 hari kerja Claude**, lalu naik; 1/hari sebelum item 1–3 selesai hampir pasti memaksa penurunan kualitas atau antrean macet.
- Kebergantungan ke akun: ElevenLabs/vidIQ/YouTube memakai kredit dan otorisasi pemilik.
