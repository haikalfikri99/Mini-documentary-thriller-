# Aturan kerja untuk Claude di repo ini
- Workflow produksi video: skill `arsip-kasus` (`.claude/skills/arsip-kasus/SKILL.md`).
- **Subagen paralel: pilih model sesuai kapabilitas agar hemat token.** Haiku = tugas mekanis (unduh/daftar data, ekstraksi, format ulang, cek file). Sonnet = riset terstruktur, analisis data, laporan dengan instruksi jelas. Opus = penilaian kreatif/strategis sulit (keputusan editorial, script final, review kualitas). Jangan memberi tugas sulit ke model kecil, dan jangan memakai model besar untuk tugas mudah.
