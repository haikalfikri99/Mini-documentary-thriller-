# PLAN produksi — ARSIP KASUS #002 "Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya"
Status: ✋ menunggu persetujuan plan. VO take 1 (ElevenLabs, 44,8 dtk) ada di `audio/vo_scroll.mp3`; transkrip kasar `audio/vo_words_raw.json`.

## 0. Temuan yang harus diputuskan dulu (blind spot)
| # | Temuan | Dampak | Usulan |
|---|---|---|---|
| 1 | **Lisensi VO.** Paket gratis ElevenLabs tidak memberi lisensi komersial (help center resmi ElevenLabs) dan mewajibkan atribusi. Channel ini mengejar YPP = penggunaan komersial. Berlaku juga untuk VO #001 bila dibuat di paket gratis. | Risiko klaim/hak; tidak bisa dimonetisasi dengan aman | Langganan **Starter** (≈ US$6/bln; di aplikasimu ada diskon 50% bulan pertama), lalu **generate ulang VO final** dengan teks & setelan yang sama. Lakukan **sebelum** alignment dan storyboard, karena timing kata akan berubah. Cek juga status VO #001 |
| 2 | **Lonjakan level di "Tahun 2006"** (±8–10 dB lebih keras dari hook) | Terdengar seperti dua rekaman berbeda | Generate ulang (sekalian butir 1), pilih take yang rata; sisa ketidakrataan diratakan leveller di mix (aturan #001: VO boleh diproses, isi tidak diubah) |
| 3 | Musik/SFX dari AI ElevenLabs juga butuh paket berbayar untuk komersial | — | Jika Starter: SFX ElevenLabs untuk foley UI (klik, geser, koin). Jika tidak: metode #001 (MIDI + SFX sintesis, aman lisensi) |

## 1. Pelajaran #001 yang dibawa
- **Yang berhasil (pertahankan):** potong di awal kata VO; caption per kata tersinkron; satu fokus per shot; Warna Ancaman tunggal; ARSIP KASUS sebagai seri visual; loop ke frame 0; ukur audio, jangan menebak (VO ≥ 10 dB di atas latar 300 Hz–4 kHz); gerbang persetujuan.
- **Yang menahan skor:** panel pendukung terlalu sederhana (8,5), audio GM soundfont (8,5–9), banyak waktu untuk menggambar manual. Bug: komentar `//` di tengah baris; motion blur + pose on twos = ghosting.
- **Yang baru untuk #002:** cerita UI/sistem (tombol, feed, iklan), bukan bencana fisik → butuh tipografi kinetik & grafis UI yang rapi, sesuatu yang lemah di `toon/` (kanvas p5 murni).

## 2. Mesin: HyperFrames (komposisi) + `toon/` (dunia lukis) — hibrida
| Opsi | Kelebihan | Kekurangan | Putusan |
|---|---|---|---|
| A. `toon/` saja (seperti #001) | terbukti; gaya motion comic kita | UI/teks/transisi harus digambar manual di kanvas; tanpa alat cek otomatis | ditolak sebagai satu-satunya mesin |
| B. HyperFrames saja | GSAP (easing kelas profesional), caption, transisi, `check`/`snapshot --review`, audio di timeline, render deterministik; **sudah dites jalan di container ini** (v0.9.36, render 10 dtk dalam 5 dtk) | gaya karakter lukis kita hilang | ditolak |
| **C. Hibrida** | HyperFrames = timeline, kamera, UI (tombol, feed, notifikasi), tipografi kinetik, caption, transisi, audio, QA. `toon/` p5 = karakter & dunia lukis, ditanam sebagai lapisan kanvas lewat protokol `hf-seek` (didukung resmi untuk p5) | integrasi perlu dibuktikan | **dipilih**, dengan **spike 1 adegan** dulu; bila gagal dalam 1 sesi, kembali ke opsi A + pelajaran HyperFrames |

## 3. Arah visual
- **Medium:** motion comic tinta + cat air (identitas #001) untuk dunia & tokoh; **UI digambar sebagai benda nyata dalam dunia komik** (tombol tebal bertinta, bukan mockup datar).
- **Warna Ancaman #002:** **cahaya layar** (biru-putih dingin, satu-satunya warna jenuh). Wajah, tangan, dan ruangan diterangi layar; dunia lain sepia/kertas. Kata kunci caption memakai warna ini. Amber tetap untuk aksen identitas (map ARSIP, stempel).
- **Tokoh:** satu saja, Aza Raskin (muda 2006 → lebih tua 2019), digambar sebagai karakter komik, **bukan potret mirip wajah asli**, ditandai kartu nama. Plus "kamu" = tangan/jempol penonton (POV).
- **Motif berulang:** tombol "Halaman berikutnya ›" = **rem**. Muncul, hilang, dan dipasang kembali oleh penonton di akhir.
- **BANNED** (dari HyperFrames `spec.md` + pelajaran #001): latar void gelap dengan elemen melayang, glow/neon/partikel dekoratif, gradasi ungu-biru, semua elemen fade+slide-up, teks bergerak saat dibaca, tiga kartu sejajar, mockup UI datar, logo di sudut, napas/pulse pada judul.

## 4. Storyboard kasar (dari timestamp VO take 1; disesuaikan ulang setelah VO final)
| # | Detik | VO | Gambar | Transisi masuk |
|---|---|---|---|---|
| 1 | 0,0 | Pria ini merancang fitur | frame 0: jempol menggeser feed tanpa ujung (POV), cahaya layar di wajah gelap; teks "DIA MENYESAL" | — |
| 2 | 1,4 | yang lagi kamu pakai… | kamera mundur: feed itu ternyata di HP penonton (layar dalam layar) | dorong mundur |
| 3 | 3,0 | dan dia menyesal. | siluet pria memegang kepala di depan layar raksasa | potong di "dan" |
| 4 | 4,6 | (slam) | ARSIP KASUS #002 dibanting, foto beku jadi berkas | freeze→arsip (#001) |
| 5 | 5,0 | Tahun 2006, Aza Raskin | meja kerja 2006, monitor tabung; kartu "AZA RASKIN · 2006" | stempel waktu |
| 6 | 6,9 | bikin scroll tanpa ujung. | halaman web menyambung terus ke bawah | gerak kamera turun |
| 7 | 8,3 | Niatnya baik: | Raskin tersenyum, menghapus tombol | — |
| 8 | 9,6 | biar kita nggak usah klik "halaman berikutnya" terus. | tangan mengklik tombol "Halaman berikutnya ›" berkali-kali, capek | potong cepat per klik |
| 9 | 11,8 | Tapi | **jeda**: semua berhenti, zoom ke tombol | dip cut |
| 10 | 12,7 | tombol kecil itu punya tugas penting. | tombol diterangi seperti rem | punch-in |
| 11 | 15,0 | Di situ kamu berhenti, dan mikir… | jempol berhenti di atas tombol | — |
| 12 | 17,3 | lanjut, atau udahan? | dua pilihan: "LANJUT ›" / "UDAHAN" | teks kinetik |
| 13 | 19,1 | Begitu tombolnya hilang, | tombol retak lalu pecah | hit |
| 14 | 20,8 | kamu nggak pernah ketemu titik berhenti lagi. | feed jadi lorong tanpa dasar; jempol terus turun | benda menjadi dunia |
| 15 | 22,9 | Lalu media sosial memakainya. | ikon aplikasi (bentuk generik, tanpa logo asli) menempel di lorong | — |
| 16 | 24,9 | Makin lama kamu scroll, | jam pasir: menit milikmu mengalir | — |
| 17 | 26,6 | makin banyak iklan terjual. | tiap layar lewat = koin iklan jatuh ke celengan | match cut pasir→koin |
| 18 | 28,1 | Belakangan, Raskin ngaku… | Raskin lebih tua, ruang gelap; kartu "2019" | dip/sepia |
| 19 | 30,3 | "Dengan menghapus tanda berhenti, | kutipan tampil sebagai dokumen bertanda tangan | tipografi per kata |
| 20 | 32,9 | saya bisa membuat kamu melakukan apa yang saya mau." | jempol-jempol bergerak serempak seperti boneka tali | — |
| 21 | 35,6 | Dan dia menyesal. | Raskin menutup laptop, wajah diterangi cahaya layar terakhir | hold 0,5 dtk |
| 22 | 37,6 | Video ini sebentar lagi selesai. | progress bar video ini hampir penuh | — |
| 23 | 39,6 | Feed kamu… nggak akan pernah. | feed di balik progress bar terus mengalir | — |
| 24 | 41,5 | Jadi tanda berhentinya… kamu yang pasang. | jempol menaruh kembali tombol "Halaman berikutnya" → loop ke frame 0 | loop |
≈ 24 shot, rata-rata 1,9 dtk (#001: 36 panel/61 dtk).

## 5. Audio
- **VO:** rantai #001 (HPF 100 Hz, leveller per frasa, presence) → −14 LUFS master, TP −1 dBTP.
- **Skor:** dingin & minimal (pulse sintetis rendah + piano/celesta "jam"), naik di #13–17, hampir sunyi di #18–21, motif terbuka di akhir. Metode: MIDI (aman lisensi) atau ElevenLabs Music bila paket berbayar.
- **SFX hanya untuk aksi terlihat** (aturan HyperFrames sound.md): klik tombol, swipe, retak/pecah tombol, koin, slam map, stempel; puncak SFX 1 frame setelah gambar; variasikan 2–3 take untuk bunyi berulang.

## 6. Caption & teks
Caption per kata (gaya #001: Oswald kapital, garis tinta) di pita y ≈ 1330, 2–4 kata per grup, kata kunci warna layar. Teks layar lain di pita 168–1250 px, di dalam 80% title-safe. Uji baca di lebar 360 px.

## 7. Alur & gerbang
1. ✋ **Plan ini** + keputusan lisensi VO
2. VO final → alignment kata (koreksi: "menyesal", "Aza Raskin", "Niatnya", "feed") → `words.json`
3. Storyboard final (`storyboard.md`) ✋
4. **Spike hibrida + 3 adegan kunci** (#1 hook, #9–10 "Tapi… tombol", #19–20 kutipan) → preview ✋
5. Semua adegan per batch → `hyperframes check` + `snapshot --review` + rubrik #001 → film penuh visual ✋
6. Audio (skor, SFX, mix, loudness) ✋
7. Final, thumbnail (frame 0 + teks), metadata, unggah aset ke Drive

## 8. QA (setiap batch)
`hyperframes check --json` (teks terlalu singkat, stretch mati > 3 dtk, frame 0 kosong) · `snapshot --review` (contact sheet, strip tiap potongan, lebar ponsel 360 px) · tes bisu (gambar saja menceritakan cerita) · rubrik 10 aspek #001 · catatan P0/P1/P2 di `REVIEW.md` · audio diukur (`ebur128`, rasio VO/latar), bukan didengar.
