# Standar Kualitas 10/10 — rubrik penilaian setiap video
Disusun dari riset viral (riset-viral-shorts.md) dan skill terpasang: short-form-video (data retensi dan safe area 9:16),
animation-principles + filmmaker (12 prinsip animasi), cinematography-180-degree-rule, photo-composition-critic,
color-grading-finishing, sound-design-film (prinsip Walter Murch) + sound-design-foley. Setiap aspek dinilai 1–10; video baru boleh rilis bila **tidak ada aspek di bawah 8** dan rata-rata ≥ 9.

| # | Aspek | Seperti apa 10/10 | Cara cek |
|---|---|---|---|
| 1 | **Hook (0–1 dtk)** | Frame 0 sudah visual terkuat + teks hook; tidak ada fade-in dari hitam; wajah manusia + ancaman dalam satu frame | Still t=0 dibaca dalam 1 detik tanpa suara |
| 2 | **Kejelasan cerita per shot** | Satu shot = satu gagasan dari kalimat VO; penonton tahu apa yang harus dilihat (fokus tunggal) | Tes "bisu": tiap still dimengerti tanpa caption |
| 3 | **Komposisi** | Fokus di 900×1400 tengah; garis pengarah (perspektif) menuju subjek; latar depan/tengah/belakang; skala (ancaman lebih besar dari manusia) | Contact sheet; nilai tonal dibaca dalam grayscale |
| 4 | **Akting karakter** | Line of action jelas, antisipasi → aksi → follow-through; arah hadap = arah gerak; wajah mengekspresikan satu emosi kuat; secondary action (topi, syal) | Putar 0,25×; cek tak ada pose "boneka" |
| 5 | **Animasi efek (cairan, debu, partikel)** | Massa terasa berat dan terus bergerak (surge), kental (lambat, melengkung), bukan garis-garis statis | Bandingkan frame awal vs akhir shot |
| 6 | **Sinematografi** | Setiap gerak kamera punya motif (reveal, slam, push-in, establishing); parallax multiplane; aturan 180° konsisten | Tulis alasan tiap gerak kamera dalam satu kalimat |
| 7 | **Editing & transisi** | Pergantian visual tiap 1,5–3 dtk, interval tidak seragam; cut di kata VO; transisi bermakna (freeze→foto arsip, foto→hidup) | Timeline vs timestamp kata VO |
| 8 | **Caption & tipografi** | Sinkron per kata (alignment whisper), pop-in, frasa ≤ 3 kata, kata kunci warna ancaman, y≈1330 (di atas 320 px UI bawah) | Cek t0 tiap kata vs `vo_words.json` |
| 9 | **Warna & cahaya** | Aturan Warna Ancaman (amber satu-satunya warna jenuh); grade dua suhu; vignette/grain halus; nilai gelap-terang memisahkan subjek | Histogram & grayscale |
| 10 | **Suara** | VO jernih di atas segalanya (ducking musik); skor dengan instrumen nyata yang mengikuti emosi; SFX untuk setiap slam/flash/stempel; ambience; −14 LUFS, peak ≤ −1 dBTP | `ebur128`; dengar dengan & tanpa musik |

## Pipeline yang menegakkan standar ini
- **Caption**: `faster-whisper` → `stories/<cerita>/audio/vo_words.json` (timestamp per kata, dikoreksi manual) → `timedCaption()` di `toon/engine/brand.js`.
- **Motion blur**: akumulasi 5 sub-frame (shutter ~126°) pada shot cepat; pose wajib *on ones* di shot yang di-blur (on twos + blur = ghosting).
- **Skor**: `score.py` (MIDI, mido) → fluidsynth + FluidR3_GM (MIT) → `score.wav`; `mix.py` menambah SFX, ducking sidechain dari VO.
- **Finishing**: paintover p5.brush, `paint/grade2/dof/grain/vignette`; mux dengan `loudnorm=I=-12.7` (hasil terukur ≈ −14 LUFS untuk klip pendek).

## Penilaian preview adegan kunci v3 (jujur)
| Aspek | v2 | v3 | Yang masih menahan 10 |
|---|---|---|---|
| Hook | 7 | 9 | — (wajah berteriak + ombak + teks di frame 0) |
| Kejelasan cerita | 6,5 | 9 | P8 kini menunjukkan tangki di ujung jalan |
| Komposisi | 7 | 9 | Pekerja P8 terpotong tepi kiri saat awal shot |
| Akting karakter | 6 | 7,5 | Rig Cast Kit masih kaku: lengan pendek, tanpa lip-sync, pose terbatas |
| Animasi efek | 6,5 | 8 | Ombak tumbuh & condong, tapi bentuk tidak mengalir (bukan simulasi) |
| Sinematografi | 7,5 | 9 | — |
| Editing & transisi | 7,5 | 9 | — |
| Caption | 7,5 | 9,5 | — |
| Warna & cahaya | 7,5 | 8,5 | Grade P8 agak datar abu-abu |
| Suara | 6,5 | 8,5 | Soundfont GM bukan library orkestra kelas atas; SFX masih sintetis |
