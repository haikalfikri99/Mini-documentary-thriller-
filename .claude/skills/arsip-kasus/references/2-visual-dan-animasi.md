# 2. Visual dan Animasi — ARSIP Kolase (sejak #003, keputusan user 13 Nov 2026)
Aturan gaya lengkap: **`kit/styles/arsip-kolase/STYLE.md`** (dasar: lemo-opuscar *Vintage Engraving Collage*, MIT/CC BY-NC dengan izin membuat film komersial; kredit LemoLab ada di file gaya). Contoh lengkap: `stories/micin/kolase/`.
**Kenapa gaya ini:** data kita menunjukkan gaya animasi tidak membedakan performa (`research/niche/KEPUTUSAN_RISET.md`: 1.886 thumbnail, selisih ≈ 0); yang menentukan adalah isi frame 0 dan kecepatan produksi. User menolak tampilan 2D vektor buatan kode (terlalu sederhana); kolase cetakan arsip memberi detail kaya tanpa menggambar dari nol, cocok dengan merek ARSIP (kertas, stempel, slip ketik), dan cocok untuk "alasan asli di balik benda" (bukti visual). Gaya lama (2D ARSIP RIG, 3D) dihapus.

## A. Frame & tempo (Formula v4.1, terukur dari 11 rekaman pemenang)
1. **Frame 0 = benda pahlawan besar di tengah, sudah bergerak**; stempel/kata hook mendarat ≤ 0,2 dtk.
2. Satu kalimat VO = satu shot ±1,5–3 dtk; potongan baru atau gerak baru setiap ≤ 1 dtk. **Tidak ada momen layar kosong**: subjek shot ada sejak awal shot (slide ≤ 0,2 dtk), benda yang disebut belakangan boleh menyusul.
3. Benda pahlawan ≥ 45% lebar frame; teks layar ≥ 40 px dunia; satu subjek per frame; **±5–6 potongan maksimum**.
4. Zona: atas 0–150 kosong (UI), subjek y 150–1150, **pita caption y 1210–1536 bersih**, bawah = latar.
5. Teks layar = stempel, label, angka, slip ketik pendek. Kalimat yang sama dengan VO tidak ditulis ulang (caption sudah ada).
6. Loop: shot terakhir kembali ke komposisi frame 0.

## B. Bahasa visual (native moves)
Slap (ditepuk), slide (geser + overshoot), drop (jatuh memantul), pendulum (`putA`), **stempel** (`stampAt`: BODOH?, MUSUH, AMAN, TERUNGKAP, DIBANTAH), **ransom letters** untuk tahun/kata kunci, **slip mesin ketik** (`typed`), **data engraving** (batang gravir tumbuh, garis ukur), **map ARSIP** (`fileOverlay`, ≤ 1,3 dtk di awal setup), belah/potong (clip), coret/centang (`m_cross`, `m_tick_s`). Vektor minimal (`arrow`, `route`, `bow`): hanya untuk arah/aliran/ukuran yang sulit dipahami tanpa panah (berita menyebar, zat masuk ke ASI, ×10). Tinta gelap di atas latar terang; garis terang (`comp:'source-over'`) di atas latar gelap.

## C. Sumber gambar (urutan kerja)
1. Daftar benda per shot dulu (dari script); **cari hanya yang punya tempat di shot**, satu gambar terbaik per benda.
2. **Openverse** (`api.openverse.org/v1/images/?q=…&license=cc0,pdm,by`) — gratis, tanpa kunci, mengumpulkan Wikimedia/Met/NGA/rawpixel/Flickr Commons.
3. **Wikimedia Commons** (Pearson Scott Foresman "(PSF)" = garis bersih domain publik; Gray's Anatomy; Wellcome Collection = CC BY wajib kredit). API dibatasi kecepatan (HTTP 429): satu permintaan per detik, User-Agent generik; URL langsung `upload.wikimedia.org/wikipedia/commons/<a>/<ab>/<File>` (a/ab = md5 nama file) lebih ringan.
4. Tolak: clip-art modern, foto produk bermerek, foto orang modern yang bisa dikenali, lisensi BY-SA/tidak jelas, gambar dengan banyak teks di dalamnya.
5. Tidak ada arsipnya → gambar bergaya gravir (`kit/collage/engr_objects.py`, tambah fungsi baru ke pustaka) atau cetakan kita sendiri di `bake.py` (contoh: sachet MICIN, surat, koran). Gambar AI boleh bila tetap tidak ada, lalu diperlakukan sebagai cetakan (dipotong, diberi tinta).
6. Catat setiap file di `SOURCES.jsonl` (url, page, license, credit) → kredit CC BY masuk deskripsi YouTube.

## D. Storyboard (gerbang wajib sebelum animasi penuh)
`node kit/tools/keyframes_2d.mjs stories/<slug>/kolase` → `board/storyboard.jpg` (frame di 85% tiap shot, bernomor). Kirim bersama tabel: shot, detik, isi, native move. Catat jujur yang masih kurang. User berkomentar per nomor → revisi → setuju → baru skor/foley/render.

## E. Pelajaran review #003 (wajib dicek di setiap storyboard)
- **Gambar harus logis terhadap kalimat:** eksperimen pada manusia → ada manusianya; jarum suntik **mengarah ke** tikus; dot botol susu bulat, bukan lancip.
- **Kalimat yang mirip butuh visual berbeda** (shot 11 vs 15: barisan tikus + jarum → close-up satu tikus ditusuk).
- **Jangan pakai gambar yang tidak berhubungan** hanya karena "keluarga" di kalimat (gravir religius ditolak); lebih kuat menampilkan klaim yang dicap DIBANTAH.
- Simbol harus jelas maknanya: "?" diletakkan di samping orang yang ragu.
- Cek fakta visual juga (uji MSG Geha 2000 = tanpa makanan → sampel identik A/B, bukan piring makanan).
- Ukuran: benda kecil (tikus) di HP harus ≥ 300 px; jangan ada stempel berwarna sama dengan latarnya.

## F. Teknis
- Dunia = layar 1080×1920; part di-bake pada B = 1,5×. Gerak potongan on twos (12/dtk), kamera tiap frame; jitter tangan saat bergerak.
- Caption: slip hitam robek, Courier Prime Bold 84 px kapital, 1–3 kata, kata kunci amber (`caption.hot`), pusat y 1360.
- Render: `kit/tools/render_2d.mjs` (Playwright → JPEG → ffmpeg), ±5 menit/56 dtk; grain ditambahkan saat mux.
