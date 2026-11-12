# Mini Thriller IDN — seri "ARSIP KASUS"
**Real Stories. Unexpected Truths.** Channel YouTube Shorts berbahasa Indonesia: cerita nyata yang lebih mengejutkan daripada yang terlihat — kejadian luar biasa, sistem tersembunyi & psikologi, misteri, keputusan katastrofik, sains & eksperimen gelap, sejarah & tempat terlupakan — dikemas sebagai **mini-dokumenter thriller motion comic** (±60 detik, 9:16), seri visual ARSIP KASUS.
Prinsip: **dramatisasi penyajian, jangan pernah mengarang bukti.** Semua gambar digambar dengan kode — tanpa AI image/video, tanpa stock footage.

## Mulai dari sini
**Workflow lengkap (cerita → script → VO → storyboard → animasi → audio → render → thumbnail → upload):** skill [`.claude/skills/arsip-kasus/`](.claude/skills/arsip-kasus/SKILL.md). Di Claude Code cukup minta "buat video ARSIP KASUS berikutnya" atau panggil `/arsip-kasus`.

## Struktur repo
```
.claude/skills/
  arsip-kasus/            skill produksi channel (SKILL.md + references/: 1 cerita & Formula ARSIP v3, 2 visual (gaya terkunci),
                          3 audio, 4 standar kualitas, 5 upload & thumbnail, 6 pelajaran & data per episode, riset viral)
  <skill pendukung>       naskah, animasi, sinematografi, komposisi, grading, suara, hyperframes (lihat skills-lock.json)
kit/                      ALAT PRODUKSI (gaya terkunci sejak #002): ARSIP RIG (karakter modular, 24 preset), pustaka set,
                          kartu ARSIP KASUS, film engine, audio (SFX + mixer + skor + QA), new_episode.sh, make_film.sh — lihat kit/README.md
research/referensi/       analisa terukur dua video 2D referensi (anatomi karakter, cahaya, kamera, ritme, audio)
channel/                  identitas channel: bio, kata kunci, kode render foto profil & banner
toon/                     engine lama (#001), disimpan untuk rebuild
stories/
  molase/                 ARSIP KASUS #001 "Banjir Ini Bukan Air" (engine toon)
  scroll/                 ARSIP KASUS #002 "Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya" (kit)
  sinila/                 bank ide (Dieng 1979, fakta sudah dicek)
```

## Film
| # | Slug | Judul | Status |
|---|---|---|---|
| 001 | `molase` | Banjir Ini Bukan Air (Boston 1919) | final v1 — media di Google Drive `Mini Thriller IDN/001 …` |
| 002 | `scroll` | Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya | v3 (render: `kit/tools/make_film.sh stories/scroll/film 3`) |

**Penyimpanan:** repo hanya berisi kode, panduan, dan input (VO). Semua media hasil (video, thumbnail, profil, banner) ada di Google Drive folder **Mini Thriller IDN**.
