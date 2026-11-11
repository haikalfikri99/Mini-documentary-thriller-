# Mini Thriller IDN — seri "ARSIP KASUS"
**Real Stories. Unexpected Truths.** Channel YouTube Shorts berbahasa Indonesia: cerita nyata yang lebih mengejutkan daripada yang terlihat — kejadian luar biasa, sistem tersembunyi & psikologi, misteri, keputusan katastrofik, sains & eksperimen gelap, sejarah & tempat terlupakan — dikemas sebagai **mini-dokumenter thriller motion comic** (±60 detik, 9:16), seri visual ARSIP KASUS.
Prinsip: **dramatisasi penyajian, jangan pernah mengarang bukti.** Semua gambar digambar dengan kode — tanpa AI image/video, tanpa stock footage.

## Mulai dari sini
**Workflow lengkap (cerita → script → VO → storyboard → animasi → audio → render → thumbnail → upload):** skill [`.claude/skills/arsip-kasus/`](.claude/skills/arsip-kasus/SKILL.md). Di Claude Code cukup minta "buat video ARSIP KASUS berikutnya" atau panggil `/arsip-kasus`.

## Struktur repo
```
.claude/skills/
  arsip-kasus/            skill produksi channel (SKILL.md + references/: cerita & script, visual & animasi,
                          audio, standar kualitas 10/10, upload & thumbnail, riset viral)
  <16 skill pendukung>    naskah (youtube-scriptwriting, hook-and-headline-writing, youtube-shorts, fact-checking), animasi, sinematografi, komposisi, grading, suara, p5-brush, find-skills (lihat skills-lock.json)
channel/                  identitas channel Mini Thriller IDN: bio, foto profil, banner (dirender dari kode)
toon/                     toolkit animasi 2D (engine/ + core/render/) — dipakai semua film
stories/
  molase/                 ARSIP KASUS #001 "Banjir Ini Bukan Air" — selesai (README = fakta, sumber, metadata upload)
```

## Film
| # | Slug | Judul | Status |
|---|---|---|---|
| 001 | `molase` | Banjir Ini Bukan Air (Boston 1919) | final v1 — `stories/molase/renders/master_molase.mp4` |
