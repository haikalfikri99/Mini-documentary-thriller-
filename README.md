# Mini Thriller IDN — seri "ARSIP KASUS"
**Real Stories. Unexpected Truths.** Channel YouTube Shorts berbahasa Indonesia: alasan asli di balik benda, tempat, harga, dan merek yang kamu kenal (pilar ±70%), plus keputusan fatal dan sejarah tempat (±30%), dikemas sebagai berkas **ARSIP KASUS** (±60 detik, 9:16).
Prinsip: **dramatisasi penyajian, jangan pernah mengarang bukti.** Gaya visual **ARSIP Kolase**: cetakan arsip asli dipotong di meja kertas dan digerakkan dengan kode (tanpa video AI, tanpa stock footage).

## Mulai dari sini
**Workflow lengkap (cerita → script → VO → gambar arsip → storyboard → animasi → audio → render → upload):** skill [`.claude/skills/arsip-kasus/`](.claude/skills/arsip-kasus/SKILL.md). Di Claude Code cukup minta "buat video ARSIP KASUS berikutnya" atau panggil `/arsip-kasus`. Sesi/container baru: jalankan `kit/tools/setup_env.sh` dulu (±40 dtk); script final dan kode film pakai Opus + `/effort high`. Aturan kerja dan selera user: `CLAUDE.md` dan `references/7-selera-dan-cara-kerja.md`.

## Struktur repo
```
.claude/skills/arsip-kasus/   skill produksi (SKILL.md + references/ 1 cerita & Formula v4.1, 2 visual, 3 audio, 4 standar, 5 upload, 6 pelajaran, 7 selera & cara kerja, 8 hook & judul)
kit/styles/arsip-kolase/      aturan gaya ARSIP Kolase (STYLE.md, CHANGES.md)
kit/collage/                  mesin kolase (engine.js, shotkit.js, parts.py, signature.py, engr_objects.py, fetch_raw.py, template/, fonts/)
kit/audio/                    VO chain, skor MIDI, SFX + foley kertas, Mixer, QA audio
kit/tools/                    setup_env, new_episode, line_starts, align_vo, riset_topik + gali_topik (riset topik gratis), keyframes_2d, storyboard_page (halaman Artifact berkomentar), render_2d, make_kolase
research/niche/               riset pilar, selingan, judul, struktur script, audio/caption, tempo VO, thumbnail + keputusan (KEPUTUSAN_RISET.md); topik/ = riset topik + rumus pemilihan; topik/ditolak/ = fact sheet yang tidak diproduksi
channel/                      identitas channel (bio, kata kunci, aset profil)
stories/<slug>/               satu folder per film: fact sheet + script (README), UPLOAD.md, audio/, kolase/
```

## Film
| # | Slug | Judul | Status |
|---|---|---|---|
| 001 | `molase` | Banjir Ini Bukan Air (Boston 1919) | tayang — media di Google Drive `Mini Thriller IDN/001 …` (gaya lama) |
| 002 | `scroll` | Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya | tayang (gaya lama, sumber di riwayat git `0259929`) |
| 003 | `micin` | Micin Dituduh Bikin Bodoh Gara-gara Satu Surat 1968 | tayang (ARSIP Kolase pertama) — `stories/micin/UPLOAD.md` |
| 004 | `aqua` | Aqua Didenda Rp13,8 Miliar Gara-Gara Warung | v1 dirender; menunggu upload user — `stories/aqua/UPLOAD.md` (gambar AI Google Flow pertama) |

**Penyimpanan:** repo hanya berisi kode, panduan, dan input (VO). Semua media hasil (video, thumbnail, profil, banner) ada di Google Drive folder **Mini Thriller IDN**.
