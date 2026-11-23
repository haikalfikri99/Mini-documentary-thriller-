# Standar Kualitas 10/10 — rubrik penilaian setiap video
Rubrik penilaian film ARSIP Kolase. Dasar: riset niche (`research/niche/`), standar retensi Shorts (safe area 9:16, hook 0–1 dtk) dan prinsip suara Murch (VO nomor satu). Setiap aspek dinilai 1–10; video baru boleh rilis bila **tidak ada aspek di bawah 8** dan rata-rata ≥ 9.

| # | Aspek | Seperti apa 10/10 | Cara cek |
|---|---|---|---|
| 1 | **Hook (0–1 dtk)** | Frame 0 = benda pahlawan besar di tengah, sudah bergerak; stempel/kata hook mendarat ≤ 0,25 dtk (v7.0, `2-visual…` §N; v4.1 menulis 0,2); tidak ada fade-in | Still t=0 dibaca dalam 1 detik tanpa suara **dan** gerbang F7 (H1–H7) lulus terukur. Nilai > 8 hanya boleh bila data video sebelumnya ≥ 60% stayed |
| 2 | **Kejelasan cerita per shot** | Satu shot = satu gagasan dari kalimat VO; penonton tahu apa yang harus dilihat (fokus tunggal) | Tes "bisu": tiap still dimengerti tanpa caption |
| 3 | **Komposisi & kepadatan** | Satu subjek per frame, ±5–6 potongan maksimum, subjek y 150–1150, pita caption bersih, tidak ada momen layar kosong | Contact sheet per 1,7 dtk dari render |
| 4 | **Logika gambar** | Gambar sesuai kalimat dan fakta (manusia di uji manusia, jarum mengarah ke subjek, benda realistis); kalimat mirip = visual berbeda; tidak ada gambar yang tak berhubungan | Daftar `2-visual…` §E per shot |
| 5 | **Gerak kertas** | On twos dengan overshoot/settle; bayangan membesar saat terangkat; stempel/slap terasa berat; tidak ada skala/fade halus ala software | Putar 0,25× beberapa shot |
| 6 | **Kamera** | Setiap gerak punya motif (push ke detail, shake di benturan, pull back untuk skala); tetap di atas meja kertas | Tulis alasan tiap gerak kamera dalam satu kalimat |
| 7 | **Editing & transisi** | Pergantian visual tiap 1,5–3 dtk, interval tidak seragam; cut di kata VO; transisi bermakna (freeze→foto arsip, foto→hidup); di klimaks hero boleh ditahan 3–4 dtk asal sorotan/garis penghubung terus bergerak (SOP T3, `2-visual…` §A.7) | Timeline vs timestamp kata VO |
| 8 | **Caption & tipografi** | Sinkron per kata (alignment Whisper), slip hitam 84 px, 1–3 kata, kata kunci amber, pusat y≈1360; teks layar ≥ 40 px, angka dengan figur lining | Cek t0 tiap kata vs `vo_words.json` |
| 9 | **Warna & cetakan** | Palet ARSIP Kolase; merah hanya untuk vonis/angka kunci; stempel kontras dengan latarnya; cetakan arsip bersih (tanpa clip-art/foto modern), lisensi tercatat | Grayscale + `SOURCES.jsonl` |
| 10 | **Suara** | VO jernih di atas segalanya; skor mengikuti emosi per babak; SFX untuk setiap kejadian; −14 LUFS, peak ≤ −1 dBTP; margin per kata ≥ 8 dB | `make_kolase.sh` (ebur128, laporan per kata, Whisper mix = VO) |

## Cara memakai
- Nilai dari **frame** (still di 2–3 titik per panel + contact sheet film penuh) dan **angka** (level audio, loudness), bukan dari ingatan. Jangan menaikkan skor tanpa bukti.
- Prioritaskan faktor besar yang terlihat di ponsel: hook, keterbacaan shot, logika gerak, akting, ritme, caption, kejernihan VO. Detail kecil yang tidak terlihat tidak perlu dikejar.
- Laporkan skor jujur ke user beserta apa yang menahan angka 10.

## Catatan
Skor film #001–#002 (gaya animasi lama) dihapus 14 Nov 2026; riwayat ada di git `6fe8616`. Skor #003–#004: lihat `6-pelajaran.md`.
- **v7.0 (23 Nov 2026):** rubrik tidak berubah; pemeriksaan otomatis `check_visual.mjs` belum mencakup ukuran hero Frame 0, waktu stempel, dan tepi atas `y < 100` (`2-visual…` §H) sehingga aspek 1 dan 3 tetap dicek manual di keyframe.
