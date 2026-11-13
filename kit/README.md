# KIT — alat produksi Mini Thriller IDN (gaya ARSIP Kolase sejak #003)
Semua video baru dibuat dari kit ini. Gaya, komponen seri, caption, audio, dan pipeline **tidak didesain ulang per episode**: episode hanya mengisi cerita, gambar arsip, shot, dan cue. Aturan gaya: `styles/arsip-kolase/STYLE.md`. Workflow: skill `arsip-kasus`.

## Peta folder
| Path | Isi |
|---|---|
| `styles/arsip-kolase/` | STYLE.md (aturan), CHANGES.md (beda dari lemo-opuscar *vintage-collage*), style.json |
| `collage/engine.js` | meja kertas: sprite (tepi potong, bayangan sesuai tinggi, sisi belakang), `putK` pose on twos dengan overshoot/settle/jitter, `slap` `slide` `drop` `rest`, `putA` (engsel/pendulum), `stampAt`, `typed`, kamera rostrum `cam/applyCam/shake`, vektor minimal `arrow/route/bow`, caption slip robek, `EV` (kejadian suara) |
| `collage/shotkit.js` | helper episode: `at` (waktu kata), `bg` (meja + bidang warna, set `BG`), `stage` (kamera per shot), `ransomRow`, `fileOverlay` (map ARSIP), `heartbeat` |
| `collage/parts.py` + `collage_lib.py` | baker: kertas meja, bidang warna robek, slip ketik, ransom letters, potongan cetakan (`cut`), halftone, stempel karet, coretan tinta, batang gravir data, siluet, dokumen PIL (`doc`) |
| `collage/signature.py` | bagian tetap seri: bidang warna, map ARSIP + label, stempel TERUNGKAP/DIBUKA, coretan, siluet; `bake_prints` dari `prints.json` |
| `collage/engr_objects.py` | benda bergaya gravir bila tidak ada arsip (jarum suntik, gelas, botol susu, garam, bola dunia; tambah di sini) |
| `collage/fetch_raw.py` | unduh arsip episode dari `SOURCES.jsonl` (sopan pada rate limit) + gambar benda gravir yang dibutuhkan |
| `collage/template/` | kerangka episode (bake.py, film.js, score_full.py, fullmix.py, prints.json, SOURCES.jsonl) |
| `collage/fonts/` | IM FELL, Courier Prime, Alfa Slab One, Abril Fatface, Oswald, Old Standard (OFL) |
| `audio/arsip_audio.py` | SFX sintetis + **foley kertas** (`paperSlap/Slide/Pat`, `stampThump`, `penScratch`, `typeKey`) + `Mixer` (ducking, carve pita suara, laporan margin per bagian dan per kata) |
| `audio/score_lib.py` | skor MIDI → fluidsynth + FluidR3_GM (MIT) |
| `audio/vo_chain.py` · `audio/check_audio.py` | rantai VO → `vo_level.wav` · QA tanpa telinga (Whisper mix vs VO) |
| `tools/setup_env.sh` | sekali per container (scipy, mido, faster-whisper, fluidsynth) |
| `tools/new_episode.sh` | `stories/<slug>/kolase` dari template (+ symlink `lib`, `audio`) |
| `tools/line_starts.py` | START per kalimat dari `vo_words.json` + durasi ke `episode.json` |
| `tools/keyframes_2d.mjs` | storyboard bernomor (`board/storyboard.jpg`) dalam hitungan detik |
| `tools/render_2d.mjs` | render frame → H.264, atau dump kejadian suara (`events`) |
| `tools/make_kolase.sh` | satu perintah: arsip → VO chain → kejadian → skor → mix → **gerbang QA audio** → render → mux (grain, −14 LUFS) |

## Lisensi
Mesin kolase diadaptasi dari [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) oleh Lemomo (LemoLab): kode MIT (`collage/LICENSE-lemo-opuscar`), dokumen gaya CC BY-NC 4.0 dengan izin tambahan untuk membuat film sendiri termasuk komersial. Film kita tidak wajib memberi kredit; kredit tetap ditulis di deskripsi. Font OFL. Gambar arsip: lisensi per file di `stories/<slug>/kolase/SOURCES.jsonl`.
