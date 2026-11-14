# Aturan kerja untuk Claude di repo ini
- Workflow produksi video: skill `arsip-kasus` (`.claude/skills/arsip-kasus/SKILL.md`).
- **Subagen paralel: pilih model sesuai kapabilitas agar hemat token.** Haiku = tugas mekanis (unduh/daftar data, ekstraksi, format ulang, cek file). Sonnet = riset terstruktur, analisis data, laporan dengan instruksi jelas. Opus = penilaian kreatif/strategis sulit (keputusan editorial, script final, review kualitas). Jangan memberi tugas sulit ke model kecil, dan jangan memakai model besar untuk tugas mudah.
- **Gaya visual: ARSIP Kolase** (`kit/styles/arsip-kolase/STYLE.md`, mesin `kit/collage/`). Gaya lama (2D RIG, 3D, toon) sudah dihapus; jangan dihidupkan lagi tanpa keputusan user.
- **Sesi utama pada effort high** untuk kode film dan keputusan kreatif (arahan lemo-opuscar). Bila effort sesi rendah, ingatkan user sekali.
- **Gambar:** arsip asli dulu (Openverse → Wikimedia, satu permintaan/detik); gambar AI boleh bila perlu; **tanpa video AI**, tanpa stock footage. Catat lisensi di `SOURCES.jsonl`.
- **Rantai shortlist → judul → hook → alur:** `.claude/skills/arsip-kasus/references/8-hook-dan-judul.md` — baca sebelum shortlist dan sebelum script. Storyboard direview user lewat **halaman Artifact yang bisa dikomentari** (`kit/tools/storyboard_page/make_page.py`), bukan gambar grid.
- **Selera & cara kerja user:** `.claude/skills/arsip-kasus/references/7-selera-dan-cara-kerja.md` — baca sebelum mengirim shortlist/script/storyboard/film; tambah baris setiap ada koreksi baru.
- Google Drive: folder `Mini Thriller IDN/NNN Judul` per episode; Claude hanya bisa mengunggah file < 10 MB (metadata, cover, storyboard); video final diunggah user.
