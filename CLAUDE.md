# Aturan kerja untuk Claude di repo ini
- Workflow produksi video: skill `arsip-kasus` (`.claude/skills/arsip-kasus/SKILL.md`).
- **Subagen paralel: pilih model sesuai kapabilitas agar hemat token.** Haiku = tugas mekanis (unduh/daftar data, ekstraksi, format ulang, cek file). Sonnet = riset terstruktur, analisis data, laporan dengan instruksi jelas. Opus = penilaian kreatif/strategis sulit (keputusan editorial, script final, review kualitas). Jangan memberi tugas sulit ke model kecil, dan jangan memakai model besar untuk tugas mudah.
- **Gaya visual: ARSIP Kolase** (`kit/styles/arsip-kolase/STYLE.md`, mesin `kit/collage/`). Gaya lama (2D RIG, 3D, toon) sudah dihapus; jangan dihidupkan lagi tanpa keputusan user.
- **Sesi utama pada effort high** untuk kode film dan keputusan kreatif (arahan lemo-opuscar). Bila effort sesi rendah, ingatkan user sekali.
- **Gambar:** arsip asli dulu (Openverse → Wikimedia, satu permintaan/detik); gambar AI boleh bila perlu; **tanpa video AI**, tanpa stock footage. Catat lisensi di `SOURCES.jsonl`.
