# Mini-Documentary Thriller — seri "ARSIP KASUS"
Channel YouTube Shorts berbahasa Indonesia: kisah nyata bencana dan kesalahan manusia paling aneh, dikemas sebagai **mini-dokumenter thriller motion comic** (60 detik, 9:16).
Prinsip: **dramatisasi penyajian, jangan pernah mengarang bukti.** Semua gambar digambar dengan kode — tanpa AI image/video, tanpa stock footage.

## Mulai dari sini
**Workflow lengkap (cerita → script → VO → storyboard → animasi → audio → render → thumbnail → upload):** skill [`.claude/skills/arsip-kasus/`](.claude/skills/arsip-kasus/SKILL.md). Di Claude Code cukup minta "buat video ARSIP KASUS berikutnya" atau panggil `/arsip-kasus`.

## Struktur repo
```
.claude/skills/
  arsip-kasus/            skill produksi channel (SKILL.md + references/: cerita & script, visual & animasi,
                          audio, standar kualitas 10/10, upload & thumbnail, riset viral)
  <12 skill pendukung>    animasi, sinematografi, komposisi, grading, suara, p5-brush, find-skills (lihat skills-lock.json)
toon/                     toolkit animasi 2D (engine/ + core/render/) — dipakai semua film
stories/
  molase/                 ARSIP KASUS #001 "Banjir Ini Bukan Air" — selesai (README = fakta, sumber, metadata upload)
```

## Film
| # | Slug | Judul | Status |
|---|---|---|---|
| 001 | `molase` | Banjir Ini Bukan Air (Boston 1919) | final v1 — `stories/molase/renders/master_molase.mp4` |
