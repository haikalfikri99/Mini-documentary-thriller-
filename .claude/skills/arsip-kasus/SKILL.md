---
name: arsip-kasus
description: Produksi end-to-end satu video YouTube Shorts channel ini (seri "ARSIP KASUS": mini-dokumenter thriller kisah nyata, bahasa Indonesia, motion comic 2D yang digambar dengan kode). Pakai untuk memilih cerita, menulis dan mengecek fakta script, menyelaraskan VO per kata, storyboard, membangun panel dan animasi di toon/, kamera dan transisi, render, skor dan mix audio, thumbnail, serta judul/deskripsi/hashtag upload. Juga untuk merevisi film yang sudah ada.
---

# ARSIP KASUS — workflow produksi
Satu video = satu kasus nyata, 45–75 detik, 9:16. Film pertama (rujukan lengkap): `stories/molase/` "Banjir Ini Bukan Air".

## Aturan tetap (keputusan user — jangan diubah tanpa izin)
- **Kebenaran:** dramatisasi penyajian, jangan pernah mengarang bukti. Angka dan klaim wajib ≥ 2 sumber; kalau sumber berbeda, tampilkan hanya yang disepakati (contoh: P30 hanya menstempel "+4°C").
- **Tanpa AI image/video generation dan tanpa stock footage.** Semua gambar digambar dengan kode di `toon/` (gaya motion comic). Aset/musik/font hanya yang berlisensi jelas (MIT/CC0).
- **VO dari user** dan tidak diubah isinya; boleh diproses (EQ, leveller) di mix.
- Jawab user dalam bahasa Indonesia, lugas, kritis, beri rekomendasi; minim beban CLI untuk user.
- **Jalankan gerbang persetujuan:** storyboard → adegan kunci (preview) → film penuh visual → audio → final. Audio dikerjakan terakhir, setelah visual disetujui.
- Commit/push ke branch yang ditentukan sesi; jangan buat PR tanpa diminta.

## Alur kerja (gerbang ✋ = tunggu persetujuan user)
| # | Langkah | Hasil | Rujukan |
|---|---|---|---|
| 1 | Pilih cerita (≥ 4 dari 6 kriteria), fact sheet + sumber | `stories/<slug>/README.md` | `references/1-cerita-dan-script.md` |
| 2 | Script 9 bagian, kalimat ≤ 12 kata, penutup loop ke hook ✋ | script di README | sama |
| 3 | User merekam VO → `stories/<slug>/audio/vo_<slug>.mp3` | — | — |
| 4 | Alignment per kata (faster-whisper), koreksi manual → `audio/vo_words.json` → `film/words.js` | timestamp kata | bagian "Perintah" |
| 5 | Storyboard: 1 panel per 1,5–2 dtk, dipotong di awal kata VO ✋ | `stories/<slug>/storyboard.md` | `references/2-visual-dan-animasi.md` |
| 6 | Bangun 3 adegan kunci (hook, establishing, satu karakter), poles sampai rubrik ≥ 9 ✋ | preview | `references/4-standar-kualitas-10.md` |
| 7 | Bangun semua panel per batch (6–10 panel), cek still tiap batch, perbaiki, lalu render film penuh ✋ | `renders/` | rujukan 2 |
| 8 | Audio: skor MIDI per babak + SFX sinkron + mix VO ✋ | `film/score_full.py`, `film/fullmix.py` | `references/3-audio.md` |
| 9 | Render final, cek loudness, thumbnail, judul/deskripsi/hashtag | `renders/master_<slug>.mp4`, `thumbnail/` | `references/5-upload-dan-thumbnail.md` |
| 10 | Setelah tayang: baca analitik, catat pelajaran di README cerita | — | rujukan 1 §Belajar |

## Struktur satu film (salin dari `stories/molase/film/`)
```
stories/<slug>/
  README.md            fact sheet + sumber, script, status, metadata upload
  storyboard.md        tabel panel: detik, VO, isi, kamera
  audio/               vo_<slug>.mp3, vo_words.json
  film/
    index.html, loader.js    halaman: ?film (film penuh), ?thumb (thumbnail), tanpa query = still P1/P3/P8
    panels.js          set bersama (jalan perspektif, tangki, cast, paintover p5.brush) + panel kunci berlapis (multiplane)
    panels2..4.js      panel per batch (setiap panel membaca U = detik di dalam panel)
    film.js            tabel SEG (awal panel = awal kata VO), kamera per panel, transisi, blur, caption otomatis, thumbnail
    words.js           timestamp kata VO
    score_full.py      skor orkestra (MIDI → fluidsynth) → score_full.wav
    fullmix.py         SFX + VO chain + ducking → mix_full.wav
  thumbnail/           thumbnail_shorts_1080x1920.jpg
  renders/             (diabaikan git kecuali master_<slug>.mp4)
```

## Perintah
```bash
# sekali per container
cd toon && npm install                       # p5, p5.brush
sudo apt-get install -y fluidsynth fluid-soundfont-gm && pip install faster-whisper mido scipy
export PLAYWRIGHT_CHROME=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell

# alignment kata (decode via ffmpeg; versi av di container menolak argumen faster-whisper)
python3 - <<'PY'
import json, subprocess, numpy as np
from faster_whisper import WhisperModel
a = np.frombuffer(subprocess.run(['ffmpeg','-loglevel','error','-i','stories/<slug>/audio/vo_<slug>.mp3','-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout, np.float32)
segs, _ = WhisperModel('small', device='cpu', compute_type='int8').transcribe(a, language='id', word_timestamps=True)
json.dump([[round(w.start,2), round(w.end,2), w.word.strip()] for s in segs for w in s.words], open('stories/<slug>/audio/vo_words.json','w'), ensure_ascii=False)
PY
# lalu koreksi ejaan (whisper salah dengar nama/angka), gabungkan token ",3" / "-anak", tulis film/words.js

# still untuk cek (dari toon/): waktu = detik film
node core/render/still.mjs ../stories/<slug>/film 1.2 9.5 30 --q film --size 1080x1920 --out /tmp/cek
# film penuh (≈ 4,5 menit untuk 61 dtk, 4 worker) dan thumbnail
node core/render/video.mjs ../stories/<slug>/film --q film --size 1080x1920 --fps 24 --workers 4 --out out/film.mp4
node core/render/still.mjs ../stories/<slug>/film 0 --q thumb --size 1080x1920 --out ../stories/<slug>/thumbnail
# audio dan mux final (dari stories/<slug>/film/)
python3 score_full.py && python3 fullmix.py
ffmpeg -i ../../../toon/out/film.mp4 -i mix_full.wav -map 0:v -map 1:a -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p \
  -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k -shortest ../renders/master_<slug>.mp4
```

## Pelajaran yang wajib diingat (dari film #001)
1. **Logika gerak dulu, gaya kemudian.** Arah hadap = arah gerak; orang lari *menjauhi* ancaman (ombak dari belakang → lari ke kamera). Cek setiap animasi: "wajar tidak di dunia nyata?"
2. **Akting:** setiap karakter utama punya ketukan emosi (`keys()` di `toon/engine/motion.js`): antisipasi → aksi dengan overshoot → settle; mata bergerak sebelum kepala. Gestur tidak boleh menutupi wajah.
3. **Komposisi:** satu fokus per shot, garis perspektif menuju subjek (tangki di ujung jalan), karakter tidak saling tumpang tindih, elemen penting di 900×1400 tengah; caption di y≈1330, jangan ada teks lain di pita itu.
4. **Motion blur hanya dengan pose *on ones*** (pose on twos + blur = ghosting).
5. **Audio:** ukur, jangan menebak — VO harus ≥ 10 dB di atas latar pada 300 Hz–4 kHz; dentuman besar diletakkan di bawah 260 Hz atau sesudah kata.
6. **Jujur menilai:** pakai rubrik; jangan menaikkan skor tanpa mengecek frame. Lebih baik fokus ke faktor besar (hook, keterbacaan, logika, akting, ritme, caption, kejernihan VO) daripada detail yang tidak terlihat di ponsel.
7. **Bug kode yang pernah terjadi:** menambah komentar `//` di tengah baris yang diganti → sisa baris ikut jadi komentar. Cek sintaks modul dengan `node --input-type=module --check < file.js` (bukan `node --check`).

## Rujukan
- `references/1-cerita-dan-script.md` — kriteria cerita, standar kebenaran, struktur script, riset & fact-check, YPP, analitik
- `references/2-visual-dan-animasi.md` — bahasa visual, toolkit `toon/`, jenis panel, akting, kamera, transisi
- `references/3-audio.md` — rantai VO, skor per babak, pustaka SFX, ducking, loudness
- `references/4-standar-kualitas-10.md` — rubrik 10 aspek + skor film #001
- `references/5-upload-dan-thumbnail.md` — judul, deskripsi, hashtag, thumbnail Shorts
- `references/riset-viral-shorts.md` — data vidIQ dan pola retensi
- Skill pendukung yang terpasang: `filmmaker`, `animation-principles`, `2d-character-rig-animation`, `character-animation-qa`, `cinematography-180-degree-rule`, `photo-composition-critic`, `color-grading-finishing`, `short-form-video`, `sound-design-film`, `sound-design-foley`, `p5-brush`, `find-skills`.
