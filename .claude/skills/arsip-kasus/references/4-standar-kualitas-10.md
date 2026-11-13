# Standar Kualitas 10/10 — rubrik penilaian setiap video
Disusun dari riset viral (riset-viral-shorts.md) dan skill terpasang: short-form-video (data retensi dan safe area 9:16),
animation-principles + filmmaker (12 prinsip animasi), cinematography-180-degree-rule, photo-composition-critic,
color-grading-finishing, sound-design-film (prinsip Walter Murch) + sound-design-foley. Setiap aspek dinilai 1–10; video baru boleh rilis bila **tidak ada aspek di bawah 8** dan rata-rata ≥ 9.

| # | Aspek | Seperti apa 10/10 | Cara cek |
|---|---|---|---|
| 1 | **Hook (0–1 dtk)** | Frame 0 = benda pahlawan besar di tengah, sudah bergerak; stempel/kata hook mendarat ≤ 0,2 dtk; tidak ada fade-in | Still t=0 dibaca dalam 1 detik tanpa suara **dan** gerbang F7 (H1–H7) lulus terukur. Nilai > 8 hanya boleh bila data video sebelumnya ≥ 60% stayed |
| 2 | **Kejelasan cerita per shot** | Satu shot = satu gagasan dari kalimat VO; penonton tahu apa yang harus dilihat (fokus tunggal) | Tes "bisu": tiap still dimengerti tanpa caption |
| 3 | **Komposisi & kepadatan** | Satu subjek per frame, ±5–6 potongan maksimum, subjek y 150–1150, pita caption bersih, tidak ada momen layar kosong | Contact sheet per 1,7 dtk dari render |
| 4 | **Logika gambar** | Gambar sesuai kalimat dan fakta (manusia di uji manusia, jarum mengarah ke subjek, benda realistis); kalimat mirip = visual berbeda; tidak ada gambar yang tak berhubungan | Daftar `2-visual…` §E per shot |
| 5 | **Gerak kertas** | On twos dengan overshoot/settle; bayangan membesar saat terangkat; stempel/slap terasa berat; tidak ada skala/fade halus ala software | Putar 0,25× beberapa shot |
| 6 | **Kamera** | Setiap gerak punya motif (push ke detail, shake di benturan, pull back untuk skala); tetap di atas meja kertas | Tulis alasan tiap gerak kamera dalam satu kalimat |
| 7 | **Editing & transisi** | Pergantian visual tiap 1,5–3 dtk, interval tidak seragam; cut di kata VO; transisi bermakna (freeze→foto arsip, foto→hidup) | Timeline vs timestamp kata VO |
| 8 | **Caption & tipografi** | Sinkron per kata (alignment Whisper), slip hitam 84 px, 1–3 kata, kata kunci amber, pusat y≈1360; teks layar ≥ 40 px, angka dengan figur lining | Cek t0 tiap kata vs `vo_words.json` |
| 9 | **Warna & cetakan** | Palet ARSIP Kolase; merah hanya untuk vonis/angka kunci; stempel kontras dengan latarnya; cetakan arsip bersih (tanpa clip-art/foto modern), lisensi tercatat | Grayscale + `SOURCES.jsonl` |
| 10 | **Suara** | VO jernih di atas segalanya; skor mengikuti emosi per babak; SFX untuk setiap kejadian; −14 LUFS, peak ≤ −1 dBTP; margin per kata ≥ 8 dB | `make_kolase.sh` (ebur128, laporan per kata, Whisper mix = VO) |

## Cara memakai
- Nilai dari **frame** (still di 2–3 titik per panel + contact sheet film penuh) dan **angka** (level audio, loudness), bukan dari ingatan. Jangan menaikkan skor tanpa bukti.
- Prioritaskan faktor besar yang terlihat di ponsel: hook, keterbacaan shot, logika gerak, akting, ritme, caption, kejernihan VO. Detail kecil yang tidak terlihat tidak perlu dikejar.
- Laporkan skor jujur ke user beserta apa yang menahan angka 10.

## Skor film #001 "Banjir Ini Bukan Air" (final v1)
| Aspek | Skor | Catatan |
|---|---|---|
| Hook | 9,5 | wajah teror + ombak + teks di frame 0 |
| Kejelasan cerita | 9 | satu gagasan per panel, tangki sebagai fokus berulang |
| Komposisi | 9 | — |
| Akting karakter | 9 / 8,5 | adegan kunci / panel pendukung |
| Animasi efek | 8,5–9 | ombak hidup (bibir menukik, gumpalan lepas, percikan), bukan simulasi |
| Sinematografi | 9 | gerak kamera bermotif, parallax |
| Editing & transisi | 9,5 | potong di kata VO, freeze→arsip, kilat, halaman dibalik, loop |
| Caption | 9,5 | sinkron per kata (faster-whisper) |
| Warna & cahaya | 9 | aturan Warna Ancaman konsisten |
| Suara | 8,5–9 | soundfont GM + SFX sintetis (tanpa API key); VO ≥ 10 dB di atas latar |
| Ilustrasi panel pendukung | 8,5 | P21, P26 paling sederhana |

## Skor film #002 "Pembuat Fitur Ini Menyesal…" (v3, setelah review user)
| Aspek | Skor | Catatan |
|---|---|---|
| Hook | 9 | Raskin + judul di frame 0, menoleh ke kamera di "fitur" |
| Kejelasan cerita | 9 | satu kalimat = satu shot; storyboard disetujui lewat komentar |
| Komposisi | 9 | latar terisi; ruang berbeda per tokoh |
| Akting karakter | 8,5 | sederhana tapi mendukung kalimat; badan masih kaku di shot dekat |
| Animasi efek | 9 | tombol utuh → retak → pecah di kata; UDAHAN ditekan |
| Sinematografi | 9 | kamera bermotif, slam arsip, shake di pecah |
| Editing & transisi | 9 | flash/dip bermakna, loop ke frame 0 |
| Caption | 9,5 | per kata, disembunyikan saat kutipan |
| Warna & cahaya | 9 | cahaya jendela logis, rim per sumber |
| Suara | 9 | margin ≥ 10,6 dB per bagian, tidak ada kata < 8 dB; rasa musik belum dinilai user |
