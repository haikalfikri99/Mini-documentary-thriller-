---
name: arsip-kasus
description: Produksi end-to-end satu video YouTube Shorts channel Mini Thriller IDN ("Real Stories. Unexpected Truths." — kisah nyata dari 6 wilayah, pilar "alasan asli di balik benda, tempat, harga, merek yang kamu kenal"; seri visual ARSIP KASUS; bahasa Indonesia; animasi 2D dengan ARSIP RIG yang digambar dengan kode). Pakai untuk memilih cerita, menulis script dengan Formula ARSIP v4, fact-check, VO ElevenLabs, alignment kata, storyboard artifact, membangun shot dengan kit/, render, skor dan mix audio, QA, thumbnail, metadata upload, dan revisi film.
---

# Mini Thriller IDN — workflow produksi (terkunci sejak ARSIP #002)
**Real Stories. Unexpected Truths.** Satu video = satu kasus nyata, dibuka sebagai **ARSIP KASUS**, 40–60 dtk, 9:16. Rujukan lengkap: `stories/scroll/` (#002, gaya & kit saat ini). #001 `stories/molase/` memakai engine lama `toon/`.
Gaya visual, karakter, kartu arsip, caption, audio, dan pipeline **tidak didesain ulang per episode**; episode hanya mengisi cerita, shot, dan cue. Perubahan hanya lewat `references/6-pelajaran.md` (butuh bukti).

## Aturan tetap (keputusan user)
- **Kebenaran:** dramatisasi penyajian, jangan mengarang bukti; klaim penting ≥ 2 sumber.
- **Tanpa AI image/video dan tanpa stock.** Semua gambar dari kode (`kit/`). Musik/SFX dibuat dengan kode (FluidR3 MIT + sintesis).
- **VO:** ElevenLabs, suara Saos Cocol (`R86jddkroI9bJwXFfjsr`), `eleven_v4`, prompt bertag; **Claude generate lewat konektor ElevenLabs** (izin user 13 Nov 2026, memakai kredit user); user generate manual hanya bila konektor/kuota gagal. Isi VO tidak diubah setelah disetujui; boleh diproses.
- **Komposisi konten (keputusan 13 Nov 2026, `research/niche/KEPUTUSAN_RISET.md`):** pilar ±70% = **"alasan ASLI di balik benda, tempat, harga, dan merek yang kamu kenal, terutama di Indonesia"** (psikologi/ekonomi/sejarah/kartel = isi jawaban, bukan pintu masuk). Selingan ±30%: **W4 keputusan fatal** (proyek/perusahaan/desain gagal, ±20%) + **W6 sejarah & tempat** (asal-usul tersembunyi, ±10%), W1/W5 sesekali; **W3 misteri, klenik, kasus pidana berjalan = tidak dipakai**. Semua selingan memakai lensa "alasan asli di balik…". Ide: `research/niche/BANK_IDE.md`, `RISET_SELINGAN.md`. Topik sensitif: bahas mekanisme, jangan promosikan.
- **Target produksi: 1 video/hari** (keputusan user) → workflow harus dirancang untuk itu; gaya tidak diganti per episode.
- **Subagen paralel:** pilih model sesuai kesulitan tugas agar hemat token: Haiku untuk tugas mekanis (unduh/daftar/ekstraksi data, format ulang, cek file), Sonnet untuk riset terstruktur, analisis data, dan penulisan laporan dengan instruksi jelas, Opus hanya untuk penilaian kreatif/strategis yang sulit (keputusan editorial, script final, review kualitas). Jangan memberi tugas sulit ke model kecil.
- Jawab dalam bahasa Indonesia, lugas, kritis, beri rekomendasi; minim beban CLI untuk user.
- Claude tidak bisa mendengar: audio selalu dicek dengan alat dan dilaporkan apa adanya.
- Commit/push ke branch sesi; tanpa PR kecuali diminta.

## Irama harian (target 1 video/hari, keputusan user 13 Nov 2026)
Produksi berlapis: **H-2** shortlist/fact sheet/script ✋ · **H-1** VO + storyboard ✋ + animasi + render · **H** film ✋ → tayang. User menerima **satu paket review per hari** (script untuk lusa + storyboard untuk besok + film hari ini). Naik bertahap: 3/minggu selama pustaka adegan dibangun, lalu 1/hari. Catat jam kerja per episode di README cerita.

## Alur kerja (✋ = tunggu persetujuan user)
| # | Langkah | Hasil | Rujukan |
|---|---|---|---|
| 1a | **Shortlist 8–10 judul**: cerita 1–2 kalimat, wilayah, skor perkiraan, rekomendasi; fakta ditandai *belum dicek* ✋ | chat | `1-cerita…` §D |
| 1b | Fact sheet judul terpilih (≥ 2 sumber/klaim, skor seleksi ≥ 20) | `stories/<slug>/README.md` | `1-cerita…` §C, §J |
| 2 | **Script dengan Formula ARSIP v4**: lembar kerja F2 → 7 beat → bahasa F5 → **scorecard F6 (14 cek + V1–V5 + gerbang F7) semua lulus**, dikirim bersama script ✋ | README | `1-cerita…` §F |
| 3 | Prompt ElevenLabs bertag + target durasi → **Claude generate VO via konektor ElevenLabs** (2 take, pilih; cek H1/H3 dari timestamp) → `audio/vo_<slug>.mp3` | `audio/vo_prompt_elevenlabs.md` | `1-cerita…` §F5 |
| 4 | **sesi/container baru: jalankan `kit/tools/setup_env.sh` dulu** · `kit/tools/new_episode.sh <slug> <no> <durasi>` → alignment kata (perintah di bawah) → koreksi → `audio/vo_words.json`; isi `film/episode.json` | timestamp kata | — |
| 5 | **Storyboard artifact**: `new_episode.sh <slug> <no> <durasi> --2d`; shot list dari **pustaka tipe adegan** (`2-visual…` §0b) dengan frame 0 = benda pahlawan; render keyframe (`film/board/`), kartu per shot di artifact; user berkomentar → revisi ✋ | artifact | `2-visual…` §0, §0b, §F |
| 6 | Animasi (`film.js`, timing, kamera) + skor (`score_full.py`) + SFX (`fullmix.py`) | | `2-visual…`, `3-audio` |
| 7 | `kit/tools/make_film.sh stories/<slug>/film 1`: **audio QA dulu sebagai gerbang** (margin per bagian ≥ 10 dB, kata < 8 dB = none, Whisper mix = Whisper VO); gagal → render dibatalkan, perbaiki cue; lulus → render + mux −14 LUFS. Lalu contact sheet per detik + rubrik `4-standar` ≥ 9 → kirim film ✋ | `renders/ARSIP_<no>_<slug>_v1.mp4` | `3-audio`, `4-standar…` |
| 8 | Revisi dari review → **tulis pelajarannya** di `6-pelajaran.md` dan pindahkan aset/set baru ke `kit/` | | `6-pelajaran.md` |
| 9 | Thumbnail, judul, deskripsi, hashtag; master ke Drive (user unggah video manual) | | `5-upload…` |
| 10 | 7 hari setelah tayang: data Studio ke tabel `6-pelajaran.md`; satu hipotesis per video | | `1-cerita…` §L |

## Struktur
```
kit/                     alat channel (README = panduan lengkap): src/ (rig, sets-lib, scene-kit, arsip-card, film-engine, **diorama-kit, cam3d, rooms3d, acting, evidence, vo-sync = dunia 3D**),
                         audio/ (arsip_audio, score_lib, vo_chain, check_audio), tools/ (new_episode, make_film, build_captions, **qa_3d, preview_3d**),
                         template/film/, lab/ + renders/ (lembar semua aset)
stories/<slug>/
  README.md              fact sheet, script + scorecard, log koreksi, metadata, catatan setelah tayang
  audio/                 vo_<slug>.mp3, vo_words.json, vo_prompt_elevenlabs.md
  film/                  episode.json, index.html, film.js, shots.js, (sets.js), board/, score_full.py, fullmix.py, rig → kit/src
  storyboard_artifact/   sumber halaman storyboard
  renders/               output (git-ignored) → Google Drive
research/referensi/      analisa referensi 2D (terukur)
```
Repo = kode + input; output video/wav diabaikan git. Drive `Mini Thriller IDN/`: satu folder per film (master, thumbnail, VO, metadata).

## Perintah
```bash
# sekali per container
sudo apt-get install -y fluidsynth fluid-soundfont-gm && pip install faster-whisper mido scipy
# episode baru
kit/tools/new_episode.sh <slug> <no> <durasi_vo>
# alignment kata (decode via ffmpeg)
python3 - <<'PY'
import json, subprocess, numpy as np
from faster_whisper import WhisperModel
a = np.frombuffer(subprocess.run(['ffmpeg','-loglevel','error','-i','stories/<slug>/audio/vo_<slug>.mp3','-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout, np.float32)
segs, _ = WhisperModel('small', device='cpu', compute_type='int8').transcribe(a, language='id', word_timestamps=True)
json.dump([[round(w.start,2), round(w.end,2), w.word.strip()] for s in segs for w in s.words], open('stories/<slug>/audio/vo_words.json','w'), ensure_ascii=False)
PY
# cek kata yang "tanpa suara" di laporan mix = timing alignment meleset → koreksi json
# pratinjau shot
cd stories/<slug>/film && DO_NOT_TRACK=1 npx hyperframes snapshot --at 0.5,2.5,5
# film penuh + audio + QA (satu perintah, ±7 menit)
kit/tools/make_film.sh stories/<slug>/film <versi>
```
Render HyperFrames harus dijalankan sebagai proses latar dari tool (run_in_background), bukan `&` di shell yang langsung selesai (render dibatalkan saat induknya keluar).

## Rujukan
- `references/1-cerita-dan-script.md` — identitas, 6 wilayah + bank ide, aturan faktual, seleksi, sinyal Shorts, **Formula ARSIP v3 (bukti, lembar kerja, 7 beat, pola hook, bahasa VO, scorecard)**, delivery, fact-check, analitik
- `references/2-visual-dan-animasi.md` — gaya terkunci, aturan menggambar, kamera, akting, komposisi, storyboard
- `references/3-audio.md` — rantai VO, skor, SFX, mix, QA tanpa telinga
- `references/4-standar-kualitas-10.md` — rubrik 10 aspek + skor #001/#002
- `references/5-upload-dan-thumbnail.md` — judul, deskripsi, hashtag, thumbnail
- `references/6-pelajaran.md` — aturan dari review, data per episode, hipotesis yang diuji
- `references/riset-viral-shorts.md` — data vidIQ dan pola retensi
- Skill pendukung: `short-form-video-script`, `humanizer` (wajib di setiap script), `hook-and-headline-writing`, `youtube-shorts`, `youtube-scriptwriting`, `fact-checking`, `filmmaker`, `animation-principles`, `2d-character-rig-animation`, `character-animation-qa`, `cinematography-180-degree-rule`, `photo-composition-critic`, `color-grading-finishing`, `sound-design-film`, `sound-design-foley`, `hyperframes`, `hyperframes-cli`, `find-skills`.
