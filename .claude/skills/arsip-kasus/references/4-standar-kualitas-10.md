# Standar Kualitas 10/10 — rubrik penilaian setiap video
Disusun dari riset viral (riset-viral-shorts.md) dan skill terpasang: short-form-video (data retensi dan safe area 9:16),
animation-principles + filmmaker (12 prinsip animasi), cinematography-180-degree-rule, photo-composition-critic,
color-grading-finishing, sound-design-film (prinsip Walter Murch) + sound-design-foley. Setiap aspek dinilai 1–10; video baru boleh rilis bila **tidak ada aspek di bawah 8** dan rata-rata ≥ 9.

| # | Aspek | Seperti apa 10/10 | Cara cek |
|---|---|---|---|
| 1 | **Hook (0–1 dtk)** | Frame 0 sudah visual terkuat + teks hook; tidak ada fade-in dari hitam; wajah manusia + ancaman dalam satu frame | Still t=0 dibaca dalam 1 detik tanpa suara **dan** gerbang F7 (H1–H7) lulus terukur. Nilai > 8 hanya boleh bila data Studio episode sebelumnya ≥ 60% stayed to watch (#002: 9 internal vs 37,2% nyata) |
| 2 | **Kejelasan cerita per shot** | Satu shot = satu gagasan dari kalimat VO; penonton tahu apa yang harus dilihat (fokus tunggal) | Tes "bisu": tiap still dimengerti tanpa caption |
| 3 | **Komposisi** | Fokus di 900×1400 tengah; garis pengarah (perspektif) menuju subjek; latar depan/tengah/belakang; skala (ancaman lebih besar dari manusia) | Contact sheet; nilai tonal dibaca dalam grayscale |
| 4 | **Akting karakter** | Gerak hanya yang mendukung kalimat (menoleh, tertunduk, tangan di perangkat); antisipasi → aksi → settle; kedip/napas idle; tangan dan benda logis (monitor + keyboard + mouse) | Putar 0,25×; cek tak ada pose "boneka" atau benda melayang |
| 5 | **Animasi efek (cairan, debu, partikel)** | Massa terasa berat dan terus bergerak (surge), kental (lambat, melengkung), bukan garis-garis statis | Bandingkan frame awal vs akhir shot |
| 6 | **Sinematografi** | Setiap gerak kamera punya motif (reveal, slam, push-in, establishing); parallax multiplane; aturan 180° konsisten | Tulis alasan tiap gerak kamera dalam satu kalimat |
| 7 | **Editing & transisi** | Pergantian visual tiap 1,5–3 dtk, interval tidak seragam; cut di kata VO; transisi bermakna (freeze→foto arsip, foto→hidup) | Timeline vs timestamp kata VO |
| 8 | **Caption & tipografi** | Sinkron per kata (alignment whisper), pop-in, frasa ≤ 3 kata, kata kunci warna ancaman, y≈1330 (di atas 320 px UI bawah) | Cek t0 tiap kata vs `vo_words.json` |
| 9 | **Warna & cahaya** | Satu sumber cahaya logis per shot, rim warna sumber, latar desaturasi + satu aksen (cyan ancaman / amber rem); latar tidak kosong; DOF 3 lapis | Grayscale + cek arah cahaya |
| 10 | **Suara** | VO jernih di atas segalanya; skor mengikuti emosi per babak; SFX untuk setiap kejadian; −14 LUFS, peak ≤ −1 dBTP; margin per kata ≥ 8 dB | `make_film.sh` (ebur128, laporan per kata, Whisper mix = VO) |

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
