# Riset audio, caption, dan metadata upload (13 Nov 2026)
Tujuan: aturan mix audio, tempo VO, caption, dan metadata untuk Mini Thriller IDN. Data mentah: `RISET_AUDIO_CAPTION_METRICS.csv` (audio+caption, 11 video) dan `RISET_META_UPLOAD.csv` (30 Shorts).

**Peringatan sampel:** Bagian A hanya **11 video** (7 WIN, 3 FLOP, 1 milik kita), dari 6 channel. Tidak ada uji statistik; semua pola di bawah adalah pengamatan, bukan bukti kausal. WIN/FLOP berasal dari label rasio dalam channel (lihat KEPUTUSAN_RISET). Bagian B: 30 Shorts, dengan satu pengacau besar (usia video, lihat B).

## A. Audio dan caption (11 rekaman)
Metode: ffmpeg `ebur128` (LUFS, true peak), Whisper small (kata + stempel waktu), RMS 40 ms. "Lantai" = persentil-10 RMS seluruh klip (proxy bunyi latar saat VO paling pelan). Selisih VO−lantai besar = tidak ada bed musik; kecil = ada bed/ambience kuat. Rekaman adalah file hasil unduh/rekam layar, jadi LUFS = level file, belum normalisasi pemutar YouTube.

### A1. Loudness, tempo, sunyi
| Video | Hasil | LUFS | True peak | Kata/dtk (rentang) | Kata/dtk (saat bicara) | VO−lantai (dB) | Sunyi >0,3 dtk (n / total dtk) | Bunyi mulai | Sunyi di 3 dtk pertama |
|---|---|---|---|---|---|---|---|---|---|
| SN 99 sen | WIN | −11,6 | +0,4 | 3,18 | 3,61 | 11 | 0 / 0 | 0,06 | 0,04 |
| SN Dyson | WIN | −16,5 | −2,4 | 3,23 | 3,62 | 18 | 0 / 0 | 0,06 | 0,04 |
| SN gempa | FLOP | −14,0 | −1,4 | 2,71 | 2,96 | 8 | 0 / 0 | 0,07 | 0,08 |
| Zack tukan | WIN | −10,6 | +1,0 | 2,98 | 3,38 | 47 | 0 / 0 | 0,06 | 0,04 |
| Zack food | FLOP | −14,1 | −2,5 | 2,60 | 3,12 | 27 | 0 / 0 | 0,06 | 0,02 |
| WSJ Twinkies | WIN | −24,0 | +0,3 | 3,02 | 3,54 | 14 | 0 / 0 | 0,14 | 0,14 |
| Kok Bisa piranha | WIN | −10,1 | +0,3 | 2,66 | 3,04 | 52 | 0 / 0 | 0,11 | 0,10 |
| Ngomongin Uang | WIN | −10,1 | +0,5 | 3,10 | 3,27 | 51 | 0 / 0 | 0,09 | 0,08 |
| Kamus Unik danau | WIN | −7,5 | +0,5 | 2,63 | 3,02 | 31 | 0 / 0 | 0,12 | 0,10 |
| Pantesan Laku | FLOP | −14,7 | −4,1 | 2,20 | 2,90 | tak terhingga (digital silence) | **7 / 8,8 dtk** | 0,24 | **0,28** |
| **ARSIP #002 (kita)** | – | −14,1 | −0,9 | **2,24** | 2,45 | 21 | 0 / 0 | 0,02 | 0,00 |

Ringkas: WIN (n=7) rata-rata 2,97 kata/dtk (rentang 2,63–3,23); FLOP (n=3) 2,50; kita 2,24. Nilai "saat bicara" WIN 3,0–3,6; kita 2,45, **paling lambat dari semua kecuali satu FLOP**. Seluruh video mulai bunyi pada ≤0,24 dtk, jadi "bunyi sejak 0,0 dtk" bukan pembeda (kita juga 0,02 dtk). Satu-satunya video dengan jeda sunyi nyata (8,8 dtk dari 45 dtk, tanpa musik) adalah FLOP Pantesan Laku. Catatan: "lantai" WIN yang tinggi (SN 99 sen 11 dB, Dyson 18) menandakan bed/ambience kuat; WIN lain (tukan, piranha, talking head) hampir tanpa bed. Jadi **ada/tidaknya musik tidak membedakan WIN dari FLOP**.

Densitas onset (kejadian/menit, termasuk onset dari kata) 72–113/mnt; WIN 82–111, FLOP 72–88, kita 113. Pengukuran onset di wilayah non-bicara hanya bisa untuk 2 video karena celah antarkata sangat sempit; angka ini tidak bisa dipakai untuk menilai kepadatan SFX.

### A2. Caption (visual; dari 12 contact sheet frame + piksel)
| Video | Caption | Posisi (0 atas–1 bawah) | Gaya | Kata per layar | Highlight warna |
|---|---|---|---|---|---|
| SN 99 sen (WIN) | jarang (hanya 1 baris saya lihat) + label tulisan tangan | ≈0,8 | putih kapital + outline | 2–4 | tidak |
| SN Dyson (WIN) | ada, kecil | 0,79 | putih kapital kecil | 2–4 | tidak |
| SN gempa (FLOP) | ada, kecil | 0,77 | sama dgn SN lain | 2–4 | tidak |
| Zack tukan (WIN) | ada, sedang | 0,77 | putih sentence-case tebal | 2–3 | tidak |
| Zack food (FLOP) | ada, sedang | 0,77 | sama | 3–5 | tidak |
| WSJ (WIN) | ada, kecil + lower-third nama | 0,70 | putih reguler | 5–6 (kalimat) | tidak |
| Kok Bisa piranha (WIN) | **tidak terlihat** di sampel (kartun + animasi ekspresif) | – | – | – | – |
| Ngomongin Uang (WIN) | ada, **besar** | 0,65 | putih kapital tebal | 2–4, menumpuk | **kuning pada kata kunci** |
| Kamus Unik (WIN) | ada, **besar** | 0,77 | putih kapital tebal + outline | **1 kata/layar** | kata kunci lebih tebal |
| Pantesan Laku (FLOP) | tidak ada subtitle; teks statis kecil | 0,90 | abu kecil | kalimat utuh | merah-bata |
| **ARSIP #002** | ada, sedang, kumulatif per kata | 0,69 | putih kapital + outline | 1–2, menumpuk | kuning/biru kata kunci |

Pengamatan: semua caption WIN ada di pita 0,63–0,80 tinggi layar (bukan paling bawah), kecuali WSJ 0,70 yang juga di sana. Gaya #002 (kumulatif word-by-word dengan highlight, y 0,69) sudah mirip dua WIN berbahasa Indonesia (Ngomongin Uang, Kamus Unik); caption kita lebih kecil dari mereka. Tidak ada WIN yang meniru satu pola saja: ada word-by-word (Kamus Unik), frase 2–4 kata (SN, Zack), kalimat (WSJ), dan tanpa caption sama sekali (Kok Bisa). Detektor piksel untuk jumlah perubahan caption terlalu bising (latar bercampur putih), jadi kata/layar di atas dari pembacaan visual.

## B. Metadata upload (30 Shorts, Apify johnvc/YoutubeTranscripts, biaya ±US$0,2)
Pilihan: per channel 3 teratas + 3 terbawah menurut rasio views terhadap median channel. Tanggal upload tersedia, **jam tidak tersedia** (hanya tanggal) → analisis jam UTC tidak bisa. Panjang deskripsi adalah perkiraan (±10%) untuk teks panjang.
**Pengacau besar:** "bawah" SmartNonsense dan ZackDFilms (BOT*, 6 video) diunggah 10–12 Nov 2026, yaitu 1–3 hari sebelum data diambil, jadi rasio rendah = belum sempat menumpuk views, **bukan bukti kualitas**. Hanya KokBisa, KamusUnik, NgomonginUang (±18 video) bisa dibandingkan wajar, dan di NgomonginUang 3 "bawah" adalah promosi produk, bukan konten editorial.

| Channel | TOP: desc (huruf) / hashtag desc / tags | BOT: desc / hashtag / tags | Sumber/tautan |
|---|---|---|---|
| SmartNonsense | 17–58 / 0 / 0–4 | 0–17 / 0 / 0–4 (baru) | hanya "smartnonsense.com" |
| ZackDFilms | 0 / 0 / 0 | 0 / 0 / 0 (baru) | tidak ada, dan tetap 60 jt+ views |
| KokBisa | ≈2.100–2.700 / 0 / 21 | ≈1.500–2.700 / 0–2 / 23 | **template panjang, referensi 3–5 sumber akademik/media**, sosmed; sama persis antara TOP dan BOT |
| KamusUnik | ≈480–750 / 0 (hashtag di judul 3–5) / 2–15 | ≈430–700 / 0 (judul 4–5) / 5–14 | blok kata kunci + disclaimer fair use; tanpa sumber |
| NgomonginUang | 40–1.050 / 0–20 / 0 | 38–230 / 0 / 0 | TOP: ringkasan/teaser; BOT: tautan produk Ngomu.id |

Hari upload (UTC, tanggal saja): TOP (n=14 bertanggal) Jumat 9, lainnya masing-masing 1; BOT (n=13) Kamis 6, Selasa 4, Rabu 2, Jumat 1, Sabtu 1. Jumat mendominasi TOP, tetapi 6 BOT adalah unggahan baru (Rab–Kam) dan TOP SmartNonsense/KamusUnik beberapa dari akun yang rutin Jumat; kemungkinan besar artefak, bukan efek hari.
Pola lain: panjang deskripsi dan jumlah tag/hashtag **tidak** membedakan TOP dari BOT (KokBisa TOP dan BOT memakai template identik; ZackDFilms dengan metadata kosong menghasilkan 60 jt views). Durasi: TOP rata-rata ±47 dtk (24–110), BOT ±53 (28–110); Shorts >60 dtk muncul di kedua kelompok.

## C. Aturan untuk kita
1. **Tempo VO 2,8–3,2 kata/dtk (rentang), bukan 2,2–2,4.** — WIN 2,6–3,2 (rata-rata 2,97), FLOP 2,2–2,7, kita 2,24 (#002). **Lemah** (n=11, ada WIN 2,63 dan FLOP 2,71 yang tumpang tindih; selaras dengan temuan "shot 2–3 dtk"). Praktis: percepat VO ±15% atau potong jeda, jangan tambah kata.
2. **Mulai bunyi pada ≤0,15 dtk dan jangan pernah memberi jeda sunyi >0,3 dtk.** — semua 10 video lain bunyi ≤0,24 dtk; satu-satunya video dengan jeda sunyi (8,8 dtk) adalah FLOP. **Lemah** (hanya 1 FLOP, kemungkinan karena faktor lain: visual statis juga). Kita sudah memenuhi (0,02 dtk, 0 sunyi).
3. **Target loudness −14 LUFS/−1 dBTP (sudah dipakai) tetap dipertahankan; jangan dikejar lebih keras.** — WIN berkisar −7,5 s/d −24 LUFS (WSJ −24 pun WIN), FLOP −14 s/d −14,7; keras tidak berkorelasi dengan WIN dan YouTube menormalkan ke bawah. **Tidak terbukti** bahwa lebih keras membantu. Satu perbaikan teknis: 6 dari 7 WIN punya true peak positif (hasil unduhan), jadi tidak masalah, tetapi tetap jaga TP ≤ −1.
4. **Musik/bed bukan syarat dan bukan pembeda.** — WIN dengan bed kuat (SN, Kamus Unik) dan WIN hampir tanpa bed (tukan, piranha, talking head) sama-sama ada; FLOP juga campuran. **Tidak terbukti.** Pertahankan aturan 3-audio.md (VO ≥10 dB di atas latar); #002 sudah di 21 dB, lebih dari cukup, boleh dinaikkan sedikit untuk energi, tetapi bukan prioritas.
5. **Caption wajib, besar, di pita y 0,65–0,78 (bukan tepi bawah), putih tebal + outline, 1–4 kata per layar, kata kunci diberi warna (kuning).** — 9 dari 10 video non-kita memakai caption di pita itu; dua WIN Indonesia (Ngomongin Uang, Kamus Unik) memakai ukuran paling besar; #002 sudah di 0,69 tetapi kecil. **Lemah** (WIN dan FLOP sama-sama punya caption; Kok Bisa menang tanpa caption). Praktis: perbesar caption #003 ±30–40%.
6. **Caption word-by-word tidak terbukti lebih baik daripada frase 2–4 kata.** — keduanya muncul di WIN. **Tidak terbukti.** Pilih mana saja; konsisten saja (kita sudah kumulatif per kata).
7. **Deskripsi: tulis 2–5 baris editorial + 3–5 sumber (judul + URL) bila ada, tidak perlu daftar tag panjang atau hashtag banyak.** — KokBisa selalu mencantumkan referensi (tetapi TOP dan BOT identik, jadi bukan pembeda); SmartNonsense dan ZackD tanpa sumber pun mencapai puluhan juta. Manfaat sumber: kredibilitas dan perlindungan fakta, bukan views. **Tidak terbukti untuk views; kuat sebagai praktik integritas** (selaras dengan Formula ARSIP: fact-check).
8. **Hashtag: ≤3 di judul/desc (mis. #shorts plus topik), tanpa tumpukan.** — KamusUnik TOP dan BOT sama-sama 3–5 hashtag judul; NgomonginUang TOP terbesar justru tanpa hashtag; berita 20 hashtag tidak istimewa. **Tidak terbukti.**
9. **Hari/jam upload: jangan dioptimalkan sekarang.** — Jumat tampak dominan di TOP (9/14) tetapi sampel bias dan jam tidak tersedia. **Tidak terbukti.** Uji sendiri: unggah #003–#005 pada hari/jam berbeda dan catat di `data/`.
10. **Durasi: tetap 40–60 dtk (kita 44,8 dtk).** — TOP 24–110 dtk, BOT 28–110 dtk, tidak ada pola. **Tidak terbukti** bahwa durasi tertentu menang; gunakan panjang yang dibutuhkan cerita dengan tempo butir 1.

## D. Keterbatasan
- 11 video; label WIN/FLOP dari rasio dalam channel; audio dari file unduhan/rekaman layar.
- Estimasi musik hanya proxy lantai RMS (tidak ada pemisahan sumber); densitas SFX tidak terukur dengan baik.
- Deteksi caption otomatis tidak andal (latar putih); posisi dan kata per layar dari pembacaan 12 lembar frame (t≈4–7 dtk dan ≈15–18 dtk), bisa meleset untuk bagian lain video.
- Metadata: jam upload tidak ada; panjang deskripsi diperkirakan; 6 video "BOT" terlalu baru; views di aktor ≠ views di dataset lama.
