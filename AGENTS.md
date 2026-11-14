# Instruksi untuk agen AI mana pun (Claude Code, Codex, Cursor, dll.)
Repo ini produksi video YouTube Shorts "ARSIP KASUS" (Mini Thriller IDN). **Baca berurutan:**
1. `CLAUDE.md` (aturan kerja; berlaku untuk semua agen, bukan hanya Claude).
2. `.claude/skills/arsip-kasus/SKILL.md` (workflow lengkap, tabel "Titik ingat") lalu `references/7-selera-dan-cara-kerja.md` (selera user, **wajib sebelum mengirim apa pun**) dan `references/8-hook-dan-judul.md` (sebelum shortlist/script).
3. Jalankan `kit/tools/setup_env.sh` sekali (Linux/macOS/WSL/Codespaces; Windows native tidak didukung).
Catatan portabilitas: fitur khusus Claude (konektor ElevenLabs/Drive, halaman Artifact berkomentar, subagen) tidak ada di agen lain. Gantinya: VO dibuat user di elevenlabs.io dari `stories/<slug>/audio/vo_prompt_elevenlabs.md`; storyboard: `python3 kit/tools/storyboard_page/make_page.py stories/<slug>/kolase <outdir>` menghasilkan `storyboard_NNN.html` yang bisa dibuka langsung di browser; upload Drive/YouTube oleh user. Bahasa kerja: Indonesia.
