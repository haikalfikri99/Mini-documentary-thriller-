# STATE: baca ini dulu di awal sesi (±600 token), lalu berhenti
Tujuan file: sesi baru tidak perlu membaca ulang riwayat atau seluruh `references/`. Muat file lain **hanya** saat langkahnya tiba (tabel "Muat saat" di bawah). Perbarui file ini di akhir setiap sesi/langkah; ganti isi, jangan ditumpuk jadi log.

_Terakhir diperbarui: 2026-11-13 (dibuat dari README, meta.json, dan log git; belum ditinjau user)_

## Terkonfirmasi (keputusan user, jangan dibuka ulang tanpa bukti baru)
- Gaya: **ARSIP Kolase** saja. Tanpa video AI, tanpa stock footage. Arsip asli dulu (Openverse → Wikimedia), gambar AI boleh bila perlu, lisensi ke `SOURCES.jsonl`.
- Pilar ±70% "alasan asli di balik benda/tempat/harga/merek yang kamu kenal"; selingan ±30% (W4 keputusan fatal, W6 sejarah). Tidak dipakai: misteri, klenik, kasus pidana berjalan.
- Script: Formula ARSIP v4.1. VO: ElevenLabs, Saos Cocol, `eleven_v4`. Target 1 video/hari, ±60 dtk, 9:16.
- Subagen: Haiku mekanis, Sonnet riset/analisis, Opus penilaian kreatif. Sesi utama effort high.
- Drive: `Mini Thriller IDN/NNN Judul`; Claude hanya unggah < 10 MB; video final diunggah user.

## Status film
| # | Slug | Status | Langkah berikut |
|---|---|---|---|
| 001 | molase | tayang (gaya lama) | selesai |
| 002 | scroll | tayang (gaya lama) | selesai |
| 003 | micin | v1 dirender, **siap upload** (`stories/micin/UPLOAD.md`). Data awal: 47,0% bertahan di menit 114 (vs 37,2% di #002) | user unggah; data 48 jam/7 hari → `6-pelajaran.md` |
| — | kalah | script v2 formula **v3.1** (lebih lama dari v4.1), menunggu persetujuan script | putuskan: tulis ulang ke v4.1 untuk ARSIP Kolase, atau tunda. (Label "#003" di `meta.json` bentrok dengan micin → beri nomor baru) |
| — | sinila | fakta inti dicek, script belum ada | kandidat selingan |

## Belum diputuskan
- Film berikutnya (#004): kalah atau sinila atau judul baru dari `research/niche/BANK_IDE.md`.
- Hasil data #003 di 48 jam/7 hari belum masuk tabel.
- Analytics: skrip Apps Script siap di `kit/tools/yt-analytics/AnalyticsSheet.gs` (belum diuji di akun asli; hanya dites dengan mock). Menunggu user menempel, menyetujui izin, dan mengirim link Sheet. "Viewed vs swiped" tetap dari screenshot Studio (tidak ada di API). Bandingkan episode pakai `engagedViews`, bukan `views` (aturan hitung YouTube berubah 27 Agu 2026).

## Ditolak
- Gaya 2D RIG, 3D, toon: dihapus 13 Nov 2026 (sumber di git `0259929`). Jangan dihidupkan lagi.
- claude-mem, Obsidian, Graphify: tidak dipasang (13 Nov 2026). Alasan: sesi cloud sementara, repo kecil, memori sudah di file. Tinjau Graphify bila repo > ±100 file kode.

## Muat saat (jangan baca di luar langkahnya)
| Langkah | Baca |
|---|---|
| Shortlist, fact sheet, script | `references/1-cerita-dan-script.md` (25 KB, terbesar), `7-selera-dan-cara-kerja.md` |
| Gambar, storyboard | `2-visual-dan-animasi.md`, `kit/styles/arsip-kolase/STYLE.md` |
| VO, skor, QA audio | `3-audio.md` |
| Render/QA akhir | `4-standar-kualitas-10.md` |
| Upload, cover | `5-upload-dan-thumbnail.md` |
| Revisi/pelajaran | `6-pelajaran.md` |
| Selalu sebelum mengirim ke user | `7-selera-dan-cara-kerja.md` (aturan CLAUDE.md) |

## Awal sesi baru
`kit/tools/setup_env.sh` hanya kalau akan render/bake (±40 dtk); untuk diskusi/script tidak perlu.
