---
name: arsip-kasus
description: Produksi end-to-end satu video YouTube Shorts channel Mini Thriller IDN ("Real Stories. Unexpected Truths."; pilar "alasan asli di balik benda, tempat, harga, merek yang kamu kenal"; seri ARSIP KASUS; bahasa Indonesia; gaya visual ARSIP Kolase = kolase cetakan arsip di meja kertas, digerakkan dengan kode). Pakai untuk memilih cerita, menulis script dengan Formula ARSIP v4.1, fact-check, VO ElevenLabs, alignment kata, storyboard, sumber gambar arsip, animasi kolase, skor + foley, QA audio, render, cover, metadata upload, dan revisi film.
---

# Mini Thriller IDN — workflow produksi (gaya ARSIP Kolase sejak #003)
**Real Stories. Unexpected Truths.** Satu video = satu kasus nyata, dibuka sebagai **ARSIP KASUS**, 40–60 dtk, 9:16. **Contoh lengkap terbaru: `stories/micin/` (#003)**. Gaya, pipeline, dan komponen tetap tidak didesain ulang per episode; episode hanya mengisi cerita, gambar arsip, shot, dan cue. Perubahan gaya hanya lewat `references/6-pelajaran.md` (butuh bukti atau keputusan user).

## Aturan tetap (keputusan user)
- **Kebenaran:** dramatisasi penyajian, jangan mengarang bukti; klaim penting ≥ 2 sumber; klaim yang diperdebatkan disebut "mengaku … dibantah".
- **Visual:** gaya **ARSIP Kolase** (`kit/styles/arsip-kolase/STYLE.md`): cetakan arsip asli (domain publik/CC0/CC BY) dipotong di meja kertas + benda yang kita cetak sendiri dengan kode + elemen vektor minimal (panah, garis putus-putus, garis ukur) **hanya bila membantu cerita**. Layar tidak boleh penuh: ±5–6 potongan per frame, teks layar hanya stempel/label/angka.
- **AI:** gambar AI **boleh bila perlu** (benda yang tidak ada arsipnya), lebih utama arsip asli; **video dari model AI tidak dipakai**. Tanpa stock footage. Musik/SFX dibuat dengan kode (FluidR3 MIT + sintesis).
- **VO:** ElevenLabs, suara Saos Cocol (`R86jddkroI9bJwXFfjsr`), `eleven_v4`, prompt bertag; Claude generate lewat konektor ElevenLabs (tanya dulu: memakai kredit user); #004 user generate manual di ElevenLabs → Claude mengirim **script bersih + prompt bertag + settingan** dalam satu paket (`audio/vo_prompt_elevenlabs.md`), user mengunggah mp3 ke chat; bila konektor/kuota gagal user generate manual dan menaruhnya di Drive. Isi VO tidak diubah setelah disetujui; boleh diproses (rapatkan jeda, atempo ringan ke 2,6–3,0 kata/dtk).
- **Komposisi konten (`research/niche/KEPUTUSAN_RISET.md`):** pilar ±70% = **"alasan ASLI di balik benda, tempat, harga, dan merek yang kamu kenal, terutama di Indonesia"**; peristiwa/hal yang dikenal penonton boleh ditambah bila menarik (keputusan user 14 Nov). Selingan ±30%: **W4 keputusan fatal** (±20%) + **W6 sejarah & tempat** (±10%), W1/W5 sesekali; **W3 misteri, klenik, kasus pidana berjalan = tidak dipakai**. Ide: `research/niche/BANK_IDE.md`, `RISET_SELINGAN.md`.
- **Target produksi: 1 video/hari.**
- **Model & effort:** sesi utama (kode film, keputusan kreatif) = Opus dengan **effort high** (arahan lemo-opuscar; user mengatur `/effort high`). Subagen dipilih Claude sesuai kesulitan: Haiku = mekanis (unduh, cek file), Sonnet = riset terstruktur (cari gambar, data), Opus = penilaian kreatif sulit.
- **Rantai shortlist → judul → hook → cover → alur menahan penonton: baca `references/8-hook-dan-judul.md` sebelum shortlist dan sebelum script.** Fakta benar, kemasan semaksimal mungkin; benda/merek dikenal + klaim di kata 1–3; angka/uang/KAPITAL di judul; jawaban bertahap + loop bertumpuk; janji pilar dibayar; uji POV penonton baru.
- **Batasan tetap sesi:** YouTube memblokir pengambilan otomatis dari server (jangan ditembus; riset memakai data yang sudah ada). Apify hanya dipakai bila user menyetujui dan dengan batas biaya (riset tempo VO #004 selesai, US$1,50). Generate ElevenLabs memakai kredit user → tanya dulu. Wikimedia: satu permintaan/detik, hormati 429. Tanpa logo/foto bermerek asli, tanpa video AI, tanpa stock footage.
- **Pengingat model/effort:** di awal episode baru ingatkan user kapan harus Opus + effort high (script final, keputusan kreatif, kode film); riset dan fact sheet cukup Sonnet. Subagen memakai model sesuai tugas (CLAUDE.md).
- **Pengingat `/compact` / `/clear` (wajib, user meminta):** di tiap titik di tabel "Titik ingat" bawah, Claude menulis catatan "Lanjut setelah /compact" di `stories/<slug>/README.md`, commit + push, lalu **mengatakan jelas di akhir balasan**: "Silakan `/compact` sekarang" (atau `/clear`) + kalimat apa yang diketik setelahnya. Ingatkan juga bila konteks terasa berat di luar titik itu (banyak gambar/tangkapan layar, keluaran alat panjang, >3 putaran revisi).
- Jawab dalam bahasa Indonesia, lugas, kritis, beri rekomendasi; minim beban CLI untuk user. Claude tidak bisa mendengar: audio dicek dengan alat dan dilaporkan apa adanya.
- Commit/push ke branch sesi; tanpa PR kecuali diminta; `main` hanya diperbarui atas izin user.

## Irama harian
**H-2** shortlist/fact sheet/script ✋ · **H-1** VO + gambar arsip + storyboard ✋ · **H** animasi + render + film ✋ → tayang. User menerima satu paket review per hari.

## Alur kerja (✋ = tunggu persetujuan user)
| # | Langkah | Hasil | Rujukan |
|---|---|---|---|
| 0 | Sesi/container baru: `kit/tools/setup_env.sh` (±40 dtk) | | |
| 1a | **Shortlist 8–10 judul** berbasis riset segar (`python3 kit/tools/riset_topik.py`: permintaan + celah; uji hook + sudut Indonesia sebagai gerbang) ✋ | chat | `1-cerita…` §D, `8-hook…`, `7-selera` #14–16 |
| 1b | Fact sheet (≥ 2 sumber/klaim; PubMed/Consensus untuk klaim sains) | `stories/<slug>/README.md` | `1-cerita…` §C, §J |
| 2 | **Script Formula ARSIP v4.1** + scorecard F6 + V1–V5 + gerbang F7, dikirim bersama ✋ | README | `1-cerita…` §F |
| 3 | VO ElevenLabs (2 take, pilih dengan alat; **target tempo 2,6–2,7 kata/dtk**, rapatkan jeda ≤ 0,25 dtk lalu atempo ±1,2; kredit user → tanya dulu; `kit/tools/align_vo.py`) → `audio/vo_<slug>.mp3`; alignment Whisper → `audio/vo_words.json` (ejaan dari script) | | `3-audio` |
| 4 | `kit/tools/new_episode.sh <slug> <no> "CASE LINE"` → `python3 kit/tools/line_starts.py stories/<slug>` (START per kalimat; gabung/potong manual sampai ±2–2,5 dtk/shot) | `kolase/` | — |
| 5 | **Gambar:** daftar benda per shot → cari arsip (Openverse dulu, Wikimedia; lihat `2-visual…` §C) → `kolase/prints.json` + `SOURCES.jsonl` (lisensi & kredit); benda tanpa arsip → `kit/collage/engr_objects.py` atau gambar sendiri di `bake.py` | | `2-visual…` §C |
| 6 | **Storyboard:** `bake.py` + `film.js` (shot = fungsi waktu) → tulis `kolase/storyboard.json` (contoh `stories/aqua/kolase/storyboard.json`) → `python3 kit/tools/storyboard_page/make_page.py stories/<slug>/kolase <scratchpad>/sbNNN` → terbitkan sebagai **Artifact yang bisa dikomentari** (bukan gambar grid); user berkomentar lalu bilang "cek komentar" → baca semua dengan `ArtifactComments`, jawab di chat, isi `note` = kotak "Revisi vN", terbitkan ulang ke URL sama (7-selera #24) ✋ | storyboard | `2-visual…` §B, §D |
| 6b | Gambar AI (bila arsip tidak ada; user boleh diminta menyediakan walau aturan awal mengutamakan arsip: pertimbangkan sendiri mana yang lebih kuat): Claude menulis **satu prompt blok untuk semua gambar sekaligus** (`kit/collage/template/flow_prompt_template.md`), **user membuatnya di Google Flow (Nano Banana)** → taruh di `kolase/ai/*.jpg`; `bake.py ai_to_raw()` menyalin ke `raw/`, `prints.json` memotongnya (`tint_poly` untuk mewarnai sebagian), `SOURCES.jsonl` mencatat "AI-generated image (Google Flow), made by the channel owner; no logos" | | `2-visual…` §C |
| 7 | `score_full.py` (ansambel kecil per babak) + `fullmix.py` (foley otomatis dari kejadian layar) | | `3-audio` §G |
| 8 | `kit/tools/make_kolase.sh stories/<slug>/kolase <versi>`: ambil arsip → **gerbang QA audio** (margin ≥ 10 dB, tidak ada kata < 8 dB, Whisper mix ≥ Whisper VO) → render frame → mux (grain tipis, −14 LUFS). Lalu cek contact sheet (tidak ada frame kosong, tidak ada teks di pita caption) → kirim film ✋ (preview < 30 MB bila file final gagal terkirim) | `renders/ARSIP_<no>_<slug>_v1.mp4` | `4-standar…` |
| 9 | `UPLOAD.md`: judul, deskripsi + sumber + kredit gambar CC BY, 3 hashtag, cover detik ±0,5 | | `5-upload…` |
| 10 | Revisi → tulis pelajaran di `6-pelajaran.md`; 48 jam/7 hari setelah tayang: data Studio ke tabel | | `6-pelajaran.md` |

## Titik ingat (compact / clear / model)
| Titik | Ingatkan | Setelahnya user bilang |
|---|---|---|
| Awal episode baru | sesi baru (`/clear`) bila sesi lama sudah ada episode selesai; riset + fact sheet cukup Sonnet | "lanjut episode berikutnya" |
| Script disetujui, sebelum VO/gambar | `/compact`; **ganti ke Opus + effort high** sebelum storyboard (kode film) | "lanjut storyboard" |
| Gambar AI + VO sudah masuk, sebelum membangun storyboard | `/compact` (zip + tangkapan layar membuat konteks berat) | "lanjut storyboard" |
| Storyboard v2/v3 disetujui, sebelum audio + render | `/compact` | "lanjut render" / "cek komentar" |
| Film terkirim + UPLOAD.md + Drive selesai, sebelum merge pelajaran | `/clear` (episode selesai) setelah semua di-push ke `main` | "lanjut episode berikutnya" |
Catatan lanjut ditulis **sebelum** mengingatkan, supaya tidak ada yang hilang saat compact.

## Struktur
```
kit/styles/arsip-kolase/   STYLE.md (aturan gaya), CHANGES.md (beda dari lemo-opuscar vintage-collage), style.json
kit/collage/               engine.js (meja kertas: sprite, pose on twos, slap/slide/drop, stempel, kamera, caption, vektor, kejadian suara)
                           shotkit.js (at, bg, stage, ransomRow, fileOverlay) · parts.py + collage_lib.py (baker) · signature.py (bagian tetap seri)
                           engr_objects.py (benda bergaya gravir) · fetch_raw.py (unduh arsip) · template/ · fonts/ (OFL)
kit/audio/                 arsip_audio.py (SFX + foley kertas + Mixer), score_lib.py, vo_chain.py, check_audio.py
kit/tools/                 setup_env.sh, new_episode.sh, line_starts.py, keyframes_2d.mjs, render_2d.mjs, make_kolase.sh
stories/<slug>/            README.md (fact sheet, script, scorecard), UPLOAD.md, meta.json, audio/ (VO, vo_words.json)
  kolase/                  episode.json, bake.py, prints.json, SOURCES.jsonl, film.js, score_full.py, fullmix.py, board/ (storyboard)
                           raw/ parts/ renders/ *.wav = di-ignore git (dibuat ulang oleh skrip)
```
Repo = kode + input; video/wav di-ignore. Drive `Mini Thriller IDN/`: satu folder per film. Gaya lama (2D ARSIP RIG, 3D, toon) dihapus 13 Nov 2026; sumbernya ada di riwayat git (commit `0259929`).

## Perintah inti
```bash
kit/tools/setup_env.sh
kit/tools/new_episode.sh <slug> <no> "BENDA · TAHUN"
python3 kit/tools/line_starts.py stories/<slug>
python3 kit/collage/fetch_raw.py stories/<slug>/kolase && (cd stories/<slug>/kolase && python3 bake.py)
node kit/tools/keyframes_2d.mjs stories/<slug>/kolase            # board/storyboard.jpg (cek cepat Claude)
python3 kit/tools/storyboard_page/make_page.py stories/<slug>/kolase <outdir>   # halaman storyboard untuk review user
kit/tools/make_kolase.sh stories/<slug>/kolase 1                 # ±7 menit
```

## Rujukan
- **`references/7-selera-dan-cara-kerja.md` — selera & cara kerja user dari semua revisi; baca sebelum mengirim apa pun (cek D)**
- `references/1-cerita-dan-script.md` — identitas, wilayah, aturan faktual, seleksi, **Formula ARSIP v4.1**, scorecard, analitik
- `references/2-visual-dan-animasi.md` — gaya ARSIP Kolase dalam praktik: frame & tempo, storyboard, sumber gambar, pelajaran review
- `references/3-audio.md` — rantai VO, skor, foley otomatis, mix, QA tanpa telinga
- `references/4-standar-kualitas-10.md` — rubrik 10 aspek
- `references/5-upload-dan-thumbnail.md` — judul, deskripsi, kredit, cover
- `references/8-hook-dan-judul.md` — rantai shortlist → judul → hook → cover → alur menahan penonton (bukti + batasnya)
- `research/niche/RISET_VO_TEMPO.md` (tempo VO tidak membedakan laku/gagal; target 2,6–2,7), `RISET_STRUKTUR_SCRIPT.md`, `topik/` (riset topik)
- `references/6-pelajaran.md` — aturan dari review, data per episode, hipotesis
- `references/riset-viral-shorts.md` — data vidIQ dan pola retensi
- Skill pendukung: `short-form-video-script`, `humanizer` (wajib di setiap script), `hook-and-headline-writing`, `youtube-shorts`, `fact-checking`, `filmmaker`, `animation-principles`, `motion-art-direction`, `photo-composition-critic`, `sound-design-film`, `sound-design-foley`.
