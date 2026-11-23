---
name: arsip-kasus
description: Produksi end-to-end satu video YouTube Shorts channel Mini Thriller IDN ("Real Stories. Unexpected Truths."; pilar "alasan asli di balik benda, tempat, harga, merek yang kamu kenal"; seri ARSIP KASUS; bahasa Indonesia; gaya visual ARSIP Kolase = kolase cetakan arsip di meja kertas, digerakkan dengan kode). Pakai untuk memilih cerita, menulis script dengan Formula ARSIP v7.0 (2 Mesin A/B: sistem, bisnis, uang, kebijakan + desain produk/harga/anomali perilaku; riset per batch 6 kandidat → 4 terkunci; Aturan Kuda Troya; skrip AV 2 kolom), fact-check, VO ElevenLabs, alignment kata, storyboard, sumber gambar arsip, animasi kolase, skor + foley, QA audio, render, cover, metadata upload, dan revisi film.
---

# Mini Thriller IDN — workflow produksi (gaya ARSIP Kolase sejak #003 · **Formula ARSIP v7.0 sejak #017** (v6.0/v6.1 = riwayat #009–#016))
> **Konstitusi lintas-agen: `AGENTS.md` di root repo (baca lebih dulu).** **Aturan v7.0 (`AGENTS.md` §2 = SSOT) menang atas v6.1/v6.0;** v6.x menang atas aturan lama untuk #009+; aturan lama dipertahankan sebagai log #001–#008.
**Real Stories. Unexpected Truths.** Satu video = satu kasus nyata, dibuka sebagai **ARSIP KASUS**, 35–55 dtk (mode Ringkas/Investigasi), 9:16. **Contoh lengkap terbaru: `stories/micin/` (#003)**. Gaya, pipeline, dan komponen tetap tidak didesain ulang per episode; episode hanya mengisi cerita, gambar arsip, shot, dan cue. Perubahan gaya hanya lewat `references/6-pelajaran.md` (butuh bukti atau keputusan user).

## Protokol batch #009–#012 (selesai; Hibrida dibatalkan 17 Nov 2026) → aturan aktif: `AGENTS.md` §3 (Batch #017+ v7.0 dan Jalur Paket Gemini)
Claude mengerjakan seluruh rantai (riset topik, fact sheet 2 lapis, skrip AV 2 kolom, VO konektor ElevenLabs 1 take atas instruksi user, prompt Flow, kolase, render, paket upload); skrip #009 (`stories/burger/`) terkunci user, koreksi fakta dilaporkan sebelum VO. Wajib: jangkar benda/harga/antarmuka Indonesia di detik 0–15; kuota judul 3:1. Scorecard manual + **`kit/tools/lint_episode.py`** (anti-monoton: penanda `[HOOK]`/`[ENDING]`/`[MODE]`/`[LATAR]`/…, rotasi arketipe, pembuka penutup terlarang, selang-seling mode; tes `kit/tools/test_lint_episode.py`); `cli.py` tidak ada. Naskah terbaik batch boleh disimpan di `research/gold_standard/` bila user setuju. `[DIARSIPKAN → .claude/skills/arsip-kasus/arsip-riwayat/SKILL.md_baris10-11.md]` (rincian #010–#012, "maks 1 Mode Ringkas" = [SUPERSEDED by v7.0: selang-seling]).

## Kompas Identitas Kanal (v7.0, 20 Nov 2026; sumber lengkap `AGENTS.md` §2 + §2A; versi v6.1 "psikologi perilaku" digantikan)
**v7.0:** investigasi forensik terhadap sistem, uang, desain produk/harga, kebijakan, dan anomali perilaku nyata (2 Mesin A ~60% / B ~40%; riset per batch 6 → 4; "tapi/padahal" dilarang hanya di judul + pembuka; bahasa lisan 8–13 kata/kalimat; rotasi latar visual; `stories/episode_log.json` + `lint_episode.py --batch/--log`).
**Mini Thriller IDN (`ARSIP KASUS`) = Investigasi Forensik terhadap Sistem, Uang, Desain Harga, Kebijakan, dan Anomali Perilaku Nyata** yang menyentuh keseharian warga Indonesia (`AGENTS.md` §2A; versi v6.1 "Investigasi Forensik Perilaku & Rekayasa Tersembunyi" = [SUPERSEDED by v7.0]).
**Garis Merah v7.0 (4 butir):** (1) bukan self-help/tips/motivasi/nasihat; (2) bukan bantahan mitos datar atau pembacaan pasal/berita kaku tanpa konflik dan The Turn; (3) bukan topik basi/klise yang sudah diperah kreator lain atau studi Daftar Hitam replikasi; (4) bukan meta-YouTube. **Channel-Fit Gate** (wajib per topik): (1) artefak fisik di Frame 0 (≥ 486 px, stempel merah ≤ 0,25 dtk; tanpa ilustrasi otak/kartun berpikir) + detail kecil untuk Conceptual Loop; (2) antagonis tak kasatmata + taruhan nyata; (3) The Turn dengan bukti naik tiap 12–15 dtk; (4) penutup Curtain-Pull Reveal tanpa menggurui. **B4** berjangkar kejadian nyata Indonesia di 0–4 dtk. Dramaturgi: `1-cerita…` §M7–§M9; visual `2-visual…` §M–§N; upload `5-upload…` §F; linter `kit/tools/lint_episode.py`. `[DIARSIPKAN → .claude/skills/arsip-kasus/arsip-riwayat/SKILL.md_baris15-16.md]`

## Aturan tetap (keputusan user)
- **Kebenaran:** dramatisasi penyajian, jangan mengarang bukti; klaim penting ≥ 2 sumber; klaim yang diperdebatkan disebut "mengaku … dibantah".
- **Visual:** gaya **ARSIP Kolase** (`kit/styles/arsip-kolase/STYLE.md`): cetakan arsip asli (domain publik/CC0/CC BY) dipotong di meja kertas + benda yang kita cetak sendiri dengan kode + elemen vektor minimal (panah, garis putus-putus, garis ukur) **hanya bila membantu cerita**. Layar tidak boleh penuh: ±5–6 potongan per frame, teks layar hanya stempel/label/angka.
- **AI:** gambar AI **boleh bila perlu** (benda yang tidak ada arsipnya), lebih utama arsip asli; **video dari model AI tidak dipakai**. Tanpa stock footage. Musik/SFX dibuat dengan kode (FluidR3 MIT + sintesis).
- **VO:** ElevenLabs, suara Saos Cocol (`R86jddkroI9bJwXFfjsr`), `eleven_v4`, prompt bertag. **Jalur utama v7.0 = konektor ElevenLabs**, dari `audio/vo_prompt_elevenlabs.md`, **1 take** (ulang hanya setelah user setuju; tanya dulu: memakai kredit user); generate manual di web elevenlabs.io dari file yang sama = cadangan (user mengunggah mp3 ke chat/Drive). Isi VO tidak diubah setelah disetujui; boleh diproses: rapatkan jeda, tempo **2,50–2,66 kata/dtk**, `atempo ≤ 1,10`, ekor audio ≤ 0,15 dtk. `[DIARSIPKAN → .claude/skills/arsip-kasus/arsip-riwayat/SKILL.md_baris22-23.md]` (versi lama: 2 take, 2,6–2,7, atempo ±1,2).
- **Komposisi konten (v7.0):** 2 Mesin A ~60% / B ~40% (`AGENTS.md` §2). Pilar kanal tetap **"alasan ASLI di balik benda, tempat, harga, dan merek yang kamu kenal, terutama di Indonesia"**; peristiwa yang dikenal penonton boleh ditambah bila menarik (keputusan user 14 Nov). W3 misteri/klenik/kasus pidana berjalan = tidak dipakai. `[DIARSIPKAN → .claude/skills/arsip-kasus/arsip-riwayat/SKILL.md_baris22-23.md]` (3 Mesin v6.0-B 35/40/25%, pilar ±70% + selingan W4/W6; `BANK_IDE.md` sudah dihapus 14 Nov).
- **Target produksi: 1 video/hari** (keputusan lama, tidak diubah). **⚠ KEPUTUSAN USER TERTUNDA:** riset menyarankan 3–4 Shorts/minggu lalu 1–5/bulan setelah long-form jalan; putuskan bersama user saat Tahap 2 tercapai (`AGENTS.md` §2 Monetisasi).
- **Model & effort (Delegasi otonom, `AGENTS.md` §6; keputusan user 22 Nov 2026):** user TIDAK mengganti model/effort. Claude memilih `model` + `effort` tiap subagen: mekanis (unduh, ekstraksi, cek file, format) = Haiku/low; riset terstruktur, fact sheet, analisis = Sonnet/medium; skrip final, `film.js`, review kualitas, keputusan editorial = Opus/high. Sesi utama tidak bisa mengganti modelnya sendiri: pekerjaan kreatif/sulit selalu didelegasikan ke subagen Opus. `[DIARSIPKAN → .claude/skills/arsip-kasus/arsip-riwayat/SKILL.md_baris25-28.md]` (versi lama: user mengatur `/effort high`).
- **Rantai shortlist → judul → hook → cover → alur menahan penonton: baca `references/8-hook-dan-judul.md` sebelum shortlist dan sebelum script.** Fakta benar, kemasan semaksimal mungkin; benda/merek dikenal + klaim di kata 1–3; angka/uang/KAPITAL di judul; jawaban bertahap + loop bertumpuk; janji pilar dibayar; uji POV penonton baru.
- **Batasan tetap sesi:** YouTube memblokir pengambilan otomatis dari server (jangan ditembus; riset memakai data yang sudah ada). Apify hanya dipakai bila user menyetujui dan dengan batas biaya (riset tempo VO #004 selesai, US$1,50). Generate ElevenLabs memakai kredit user → tanya dulu. Wikimedia: satu permintaan/detik, hormati 429. Tanpa logo/foto bermerek asli, tanpa video AI, tanpa stock footage.
- **Pengingat model/effort:** bila sesi utama terlihat berjalan di effort rendah, ingatkan user SEKALI saja, lalu tetap mendelegasikan pekerjaan sulit ke subagen Opus/high (jangan meminta user mengubah setelan).
- **Pengingat `/compact` / `/clear` (wajib, user meminta):** di tiap titik di tabel "Titik ingat" bawah, Claude menulis catatan "Lanjut setelah /compact" di `stories/<slug>/README.md`, commit + push, lalu **mengatakan jelas di akhir balasan**: "Silakan `/compact` sekarang" (atau `/clear`) + kalimat apa yang diketik setelahnya. Ingatkan juga bila konteks terasa berat di luar titik itu (banyak gambar/tangkapan layar, keluaran alat panjang, >3 putaran revisi).
- Jawab dalam bahasa Indonesia, lugas, kritis, beri rekomendasi; minim beban CLI untuk user. Claude tidak bisa mendengar: audio dicek dengan alat dan dilaporkan apa adanya.
- Commit/push ke branch sesi; tanpa PR kecuali diminta; `main` hanya diperbarui atas izin user.

## Irama harian
**H-2** shortlist/fact sheet/script ✋ · **H-1** VO + gambar arsip + storyboard ✋ · **H** animasi + render + film ✋ → tayang. User menerima satu paket review per hari.

## Jalur Paket Gemini (v7.0, 22 Nov 2026; sumber: `AGENTS.md` §3)
Bila user menyerahkan paket **Fact Sheet 2 Lapis + Skrip AV 2 Kolom (Formula v7.0)** dari Gemini: **lewati langkah 1a–1c (shortlist/riset topik)**; topik dan skrip sudah diputuskan user. Jalankan berurutan: **(1)** cek cepat fakta kunci; laporkan hanya yang keliru/tak terverifikasi + sumber, **tanpa mengubah gaya bahasa/kalimat skrip sepihak** (skrip terkunci; koreksi fakta hanya atas persetujuan user). **(2)** `kit/tools/new_episode.sh <slug>` → isi `README.md` (fact sheet + penanda MESIN/LATAR/HOOK/ENDING/SEGAR/MODE/ARTEFAK/LOOP/LABEL), `audio/script_vo.txt`, `audio/vo_prompt_elevenlabs.md`; `python3 kit/tools/lint_episode.py <slug>` (atau `--batch`) **0 error**; error yang menuntut ubah kata dilaporkan, bukan diubah. **(3)** produksi teknis: VO via konektor ElevenLabs (1 take) → prompt Google Flow (1 variasi) → kolase + render (`make_kolase.sh`) → `--log`. Garis Merah, label asal data, tanpa logo asli tetap berlaku.

## Alur kerja (✋ = tunggu persetujuan user)
| # | Langkah | Hasil | Rujukan |
|---|---|---|---|
| 0 | Sesi/container baru: `kit/tools/setup_env.sh` (±40 dtk) | | |
| 1a | **Riset topik per batch (v7.0): 6 kandidat → verifikasi ketat → 4 terkunci** (DILARANG borongan belasan topik; fase riset terpisah dari fase skrip; alur `9-playbook` §D; `python3 kit/tools/riset_topik.py` untuk kejenuhan; Stress-Test 4 uji + Garis Merah sebagai gerbang; presentasi sebagai cerita) ✋ | chat | `AGENTS.md` §2–§3, `9-playbook…` §D–§E, `1-cerita…` §D, `8-hook…`, `7-selera` #14–16 |
| 1b | Fact sheet (≥ 2 sumber/klaim; PubMed/Consensus untuk klaim sains) | `stories/<slug>/README.md` | `1-cerita…` §C, §J |
| 2 | **Script Formula ARSIP v7.0 (§M9)** (skrip AV 2 kolom, mode Ringkas/Investigasi) + scorecard 22 cek (F6 + §M6) + gerbang F7, dikirim bersama ✋; `lint_episode.py --batch` 0 error sebelum VO. Filter replikasi + Topic Stress-Test sebelum fact sheet. (paket skrip dari user = Jalur Paket Gemini di bawah) | README | `1-cerita…` §M, §F |
| 3 | VO ElevenLabs lewat konektor (**1 take**, ulang hanya setelah user setuju; **tempo 2,50–2,66 kata/dtk**, rapatkan jeda ≤ 0,25 dtk lalu `atempo ≤ 1,10`; kredit user → tanya dulu; `kit/tools/align_vo.py`) → `audio/vo_<slug>.mp3`; alignment Whisper → `audio/vo_words.json` (ejaan dari script) | | `3-audio` |
| 4 | `kit/tools/new_episode.sh <slug> <no> "CASE LINE"` → `python3 kit/tools/line_starts.py stories/<slug>` (START per kalimat; gabung/potong manual sampai ±2–2,5 dtk/shot) | `kolase/` | — |
| 5 | **Gambar:** daftar benda per shot → cari arsip (Openverse dulu, Wikimedia; lihat `2-visual…` §C) → `kolase/prints.json` + `SOURCES.jsonl` (lisensi & kredit); benda tanpa arsip → `kit/collage/engr_objects.py` atau gambar sendiri di `bake.py` | | `2-visual…` §C |
| 6 | **Storyboard:** `bake.py` + `film.js` (shot = fungsi waktu) → tulis `kolase/storyboard.json` (contoh `stories/aqua/kolase/storyboard.json`) → `python3 kit/tools/storyboard_page/make_page.py stories/<slug>/kolase <scratchpad>/sbNNN` → **#013+ default: `python3 kit/tools/storyboard_sheet.py stories/<slug>/kolase` → lembar PDF/PNG berlabel di luar frame (user mengoper ke Gemini juga; 7-selera #89)**; Artifact berkomentar hanya bila user minta; user berkomentar lalu bilang "cek komentar" → baca semua dengan `ArtifactComments`, jawab di chat, isi `note` = kotak "Revisi vN", terbitkan ulang ke URL sama (7-selera #24) ✋ | storyboard | `2-visual…` §B, §D |
| 6b | Gambar AI (bila arsip tidak ada; user boleh diminta menyediakan walau aturan awal mengutamakan arsip: pertimbangkan sendiri mana yang lebih kuat): Claude menulis **satu prompt blok untuk semua gambar sekaligus** (`kit/collage/template/flow_prompt_template.md`), **user membuatnya di Google Flow (Nano Banana)** → taruh di `kolase/ai/*.jpg`; `bake.py ai_to_raw()` menyalin ke `raw/`, `prints.json` memotongnya (`tint_poly` untuk mewarnai sebagian), `SOURCES.jsonl` mencatat "AI-generated image (Google Flow), made by the channel owner; no logos" | | `2-visual…` §C |
| 7 | `score_full.py` (ansambel kecil per babak) + `fullmix.py` (foley otomatis dari kejadian layar) | | `3-audio` §G |
| 8 | `kit/tools/make_kolase.sh stories/<slug>/kolase <versi>`: ambil arsip → **gerbang QA audio** (margin ≥ 10 dB, tidak ada kata < 8 dB, Whisper mix ≥ Whisper VO) → **gerbang visual QA** (`check_visual.mjs`: dead frame, teks di bawah caption, objek terpotong) → render frame → mux (grain tipis, −14 LUFS). Lalu cek contact sheet (tidak ada frame kosong, tidak ada teks di pita caption) → kirim film ✋ (preview < 30 MB bila file final gagal terkirim) | `renders/ARSIP_<no>_<slug>_v1.mp4` | `4-standar…` |
| 9 | `UPLOAD.md` (judul, deskripsi + sumber + kredit, 3 hashtag, komentar pin, pengaturan) + thumbnail kustom (`make_cover.py` + `kolase/cover.json`) + `python3 kit/tools/pack_upload.py <slug>` → `upload_pack/` (mp4, thumbnail, frame cadangan, `UPLOAD_<no>_<slug>.txt` mentah) | | `5-upload…` |
| 10 | Revisi → tulis pelajaran di `6-pelajaran.md`; 48 jam/7 hari setelah tayang: data Studio ke tabel | | `6-pelajaran.md` |

## Titik ingat (compact / clear / model)
| Titik | Ingatkan | Setelahnya user bilang |
|---|---|---|
| Awal episode baru | sesi baru (`/clear`) bila sesi lama sudah ada episode selesai; riset + fact sheet cukup Sonnet | "lanjut episode berikutnya" |
| Script disetujui, sebelum VO/gambar | `/compact`; **Claude mendelegasikan kode film/storyboard ke subagen Opus + effort high** (user tidak perlu mengganti model; `AGENTS.md` §6) | "lanjut storyboard" |
| Gambar AI + VO sudah masuk, sebelum membangun storyboard | `/compact` (zip + tangkapan layar membuat konteks berat) | "lanjut storyboard" |
| Storyboard v2/v3 disetujui, sebelum audio + render | `/compact` | "lanjut render" / "cek komentar" |
| Sebelum render (`make_kolase.sh`): audio QA lalu **visual QA** (`check_visual.mjs`: dead frame, teks di bawah caption, objek terpotong; ±70 dtk) | bila gagal: perbaiki shot yang disebut, jangan `SKIP_VISUAL_QA` tanpa menilai manual | "perbaiki lalu render" |
| Film terkirim + UPLOAD.md + Drive selesai, sebelum merge pelajaran | `/clear` (episode selesai) setelah semua di-push ke `main` | "lanjut episode berikutnya" |
Catatan lanjut ditulis **sebelum** mengingatkan, supaya tidak ada yang hilang saat compact.

## Mode Batch (4 episode sekaligus; v7.0; rincian `7-selera…` #53–55 dan `9-playbook…`)
Fase 1 riset per batch (6 kandidat → verifikasi → 4 terkunci) + 4 fact sheet (Sonnet/medium) → `/compact` → fase 2 4 skrip + 4 prompt ElevenLabs (Opus/high; `lint_episode.py --batch` 0 error) → VO via konektor (1 take) → `/compact` → fase 3 prompt blok Google Flow → user membuat gambar → `/compact` → fase 4 bake, storyboard, audio, render per episode. **Kuota judul 3 : 1** per batch (3 episode Pola 1, 1 episode menguji Pola 3/4/5, `[SLOT-UJI]`; `8-hook…` §G). Penutup dirotasi 5 arketipe tanpa default, mode Ringkas/Investigasi selang-seling. MP4 final boleh di-cross-post ke TikTok/Reels sebagai laboratorium drop-off, bukan sumber uang (#55). `[DIARSIPKAN → .claude/skills/arsip-kasus/arsip-riwayat/SKILL.md_baris67-68.md]` (4 fact sheet paralel "YPP", keputusan #005 Circular Reframe default = [SUPERSEDED by v6.1/v7.0]).

## Struktur
```
kit/styles/arsip-kolase/   STYLE.md (aturan gaya), CHANGES.md (beda dari lemo-opuscar vintage-collage), style.json
kit/collage/               engine.js (meja kertas: sprite, pose on twos, slap/slide/drop, stempel, kamera, caption, vektor, kejadian suara)
                           shotkit.js (at, bg, stage, ransomRow, fileOverlay) · parts.py + collage_lib.py (baker) · signature.py (bagian tetap seri)
                           engr_objects.py (benda bergaya gravir) · fetch_raw.py (unduh arsip) · template/ · fonts/ (OFL)
kit/audio/                 arsip_audio.py (SFX + foley kertas + Mixer), score_lib.py, vo_chain.py, check_audio.py, tts_elevenlabs.py (opsional, memakai kredit)
kit/tools/                 setup_env.sh, doctor.py, links.sh, new_episode.sh, line_starts.py, keyframes_2d.mjs, render_2d.mjs, make_kolase.sh,
                           make_cover.py, pack_upload.py, check_visual.mjs, riset_topik.py, storyboard_page/
stories/<slug>/            README.md (fact sheet, script, scorecard), UPLOAD.md, meta.json, audio/ (VO, vo_words.json)
  kolase/                  episode.json, bake.py, prints.json, SOURCES.jsonl, film.js, score_full.py, fullmix.py, board/ (storyboard)
                           raw/ parts/ renders/ *.wav = di-ignore git (dibuat ulang oleh skrip)
```
Repo = kode + input; video/wav di-ignore. Drive `Mini Thriller IDN/`: satu folder per film. Gaya lama (2D ARSIP RIG, 3D, toon) dihapus 13 Nov 2026; sumbernya ada di riwayat git (commit `0259929`).

## Perintah inti
```bash
python3 kit/tools/doctor.py                                       # cek lingkungan lokal (tidak mengubah apa pun)
kit/tools/setup_env.sh
kit/tools/new_episode.sh <slug> <no> "BENDA · TAHUN"
python3 kit/tools/line_starts.py stories/<slug>
python3 kit/collage/fetch_raw.py stories/<slug>/kolase && (cd stories/<slug>/kolase && python3 bake.py)
node kit/tools/keyframes_2d.mjs stories/<slug>/kolase            # board/storyboard.jpg (cek cepat Claude)
python3 kit/tools/storyboard_page/make_page.py stories/<slug>/kolase <outdir>   # halaman storyboard untuk review user
kit/tools/make_kolase.sh stories/<slug>/kolase 1                 # ±7 menit
python3 kit/tools/make_cover.py stories/<slug>/kolase             # thumbnail kustom
python3 kit/tools/pack_upload.py <slug>                           # upload_pack/
```

## Rujukan
- **`references/9-playbook-riset-batch.md` — playbook riset batch (prinsip user, basis riset eksternal, alur, format presentasi topik, verifikasi, alat/jebakan, pelajaran); baca sebelum riset topik**
- **`references/7-selera-dan-cara-kerja.md` — selera & cara kerja user dari semua revisi; baca sebelum mengirim apa pun (cek D)**
- `references/1-cerita-dan-script.md` — identitas, wilayah, aturan faktual, seleksi, **Formula ARSIP v7.0 (§M9; v6.1 §M7–§M8; v5.0/v6.0 §F–§M6 = dasar)**, scorecard, analitik
- `references/2-visual-dan-animasi.md` — gaya ARSIP Kolase dalam praktik: frame & tempo, storyboard, sumber gambar, pelajaran review
- `references/3-audio.md` — rantai VO, skor, foley otomatis, mix, QA tanpa telinga
- `references/4-standar-kualitas-10.md` — rubrik 10 aspek
- `references/5-upload-dan-thumbnail.md` — judul, deskripsi, kredit, cover
- `references/8-hook-dan-judul.md` — rantai shortlist → judul → hook → cover → alur menahan penonton (bukti + batasnya); **§H v6.0 + §J v7.0: Aturan Kuda Troya + arketipe K1–K5**
- `research/niche/RISET_VO_TEMPO.md` (tempo VO tidak membedakan laku/gagal; data tempo; standar v7.0 = 2,50–2,66, 2,6–2,7 = riwayat #004), `RISET_STRUKTUR_SCRIPT.md`, `topik/` (riset topik)
- **`RULEBOOK_V7.md` (ringkasan aturan aktif v7.0; dibuat 23 Nov 2026)** di folder skill ini, dan **dasar riset aturan:** `research/deep_research/README.md` + `MATRIKS_JEJAK.md` (riset asli → aturan). `arsip-riwayat/` = teks usang yang dipindah 23 Nov 2026 (bukan aturan).
- `references/6-pelajaran.md` — aturan dari review, data per episode, hipotesis
- Skill pendukung (terpasang): `short-form-video-script`, `humanizer` (wajib di setiap script), `hook-and-headline-writing`, `youtube-shorts`, `fact-checking`. Skill animasi/sinema/sound-design generik dihapus 14 Nov 2026 (tidak dipakai pipeline kolase; ada di riwayat git `6fe8616`).
