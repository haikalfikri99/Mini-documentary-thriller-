# Mini Thriller IDN — seri "ARSIP KASUS"
**Real Stories. Unexpected Truths.** Channel YouTube Shorts berbahasa Indonesia: alasan asli di balik benda, tempat, harga, dan merek yang kamu kenal (pilar ±70%), plus keputusan fatal dan sejarah tempat (±30%), dikemas sebagai berkas **ARSIP KASUS** (±60 detik, 9:16).
Prinsip: **dramatisasi penyajian, jangan pernah mengarang bukti.** Gaya visual **ARSIP Kolase**: cetakan arsip asli dipotong di meja kertas dan digerakkan dengan kode (tanpa video AI, tanpa stock footage).

## Mulai dari sini
**Workflow lengkap (cerita → script → VO → gambar arsip → storyboard → animasi → audio → render → upload):** skill [`.claude/skills/arsip-kasus/`](.claude/skills/arsip-kasus/SKILL.md). Di Claude Code cukup minta "buat video ARSIP KASUS berikutnya" atau panggil `/arsip-kasus`. Sesi baru: jalankan `kit/tools/setup_env.sh` dulu, dan set `/effort high`.

## Struktur repo
```
.claude/skills/arsip-kasus/   skill produksi (SKILL.md + references/ 1 cerita & Formula v4.1, 2 visual, 3 audio, 4 standar, 5 upload, 6 pelajaran)
kit/styles/arsip-kolase/      aturan gaya ARSIP Kolase (STYLE.md, CHANGES.md)
kit/collage/                  mesin kolase (engine.js, shotkit.js, parts.py, signature.py, engr_objects.py, fetch_raw.py, template/, fonts/)
kit/audio/                    VO chain, skor MIDI, SFX + foley kertas, Mixer, QA audio
kit/tools/                    setup_env, new_episode, line_starts, keyframes_2d (storyboard), render_2d, make_kolase
research/niche/               riset pilar, selingan, judul, struktur script, audio/caption, thumbnail + keputusan (KEPUTUSAN_RISET.md)
channel/                      identitas channel (bio, kata kunci, aset profil)
stories/<slug>/               satu folder per film: fact sheet + script (README), UPLOAD.md, audio/, kolase/
```

## Film
| # | Slug | Judul | Status |
|---|---|---|---|
| 001 | `molase` | Banjir Ini Bukan Air (Boston 1919) | tayang — media di Google Drive `Mini Thriller IDN/001 …` (gaya lama) |
| 002 | `scroll` | Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya | tayang (gaya lama, sumber di riwayat git `0259929`) |
| 003 | `micin` | Micin Dituduh Bikin Bodoh Gara-gara Satu Surat 1968 | v1 siap upload — `stories/micin/UPLOAD.md` (ARSIP Kolase pertama) |

**Penyimpanan:** repo hanya berisi kode, panduan, dan input (VO). Semua media hasil (video, thumbnail, profil, banner) ada di Google Drive folder **Mini Thriller IDN**.
