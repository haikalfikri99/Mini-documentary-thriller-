# Catatan lanjut (23 Nov 2026) — mulai sesi baru: `/clear`, `/model` Opus, `/effort high`
**Aturan hemat (keputusan user):** tulis skrip SENDIRI di sesi utama Opus high, TANPA subagen kreatif (biaya mulai-dari-nol per agen ±160–280 rb token). Subagen hanya untuk pekerjaan mekanis luas (Haiku/Sonnet). Jalur baca minimal: `.claude/skills/arsip-kasus/RULEBOOK_V7.md` + README episode yang dikerjakan. Jangan audit/matriks baru. Potong keluaran alat.

## Status
- Batch #017–#020 terkunci user: migor A1 · bankkeliling B3 · beras A1 · kuota A2. Scaffold + fakta terverifikasi di `stories/<slug>/README.md` ("Fakta terverifikasi"). Skrip versi terbaru ada tetapi DITOLAK user ("jelek, bagusan yang sebelumnya"). Versi lama yang user sukai: `git show 049d0a6:stories/<slug>/audio/script_vo.txt` (beras jauh lebih bagus; #017 "sisanya oke").
- Selesai & di-push: dasar riset asli di `research/deep_research/` + `MATRIKS_JEJAK.md`; `RULEBOOK_V7.md`; arsip riwayat; linter v7.0 (22 tes OK); perapian aturan v7.0 (kata tunjuk tidak wajib, kesegaran bukan gerbang, dll.).
- Belum ada VO. Jangan pakai kredit ElevenLabs sebelum user menyetujui skrip.

## Keluhan user per episode (pegangan utama)
- **#017:** pakai hook "Tiga perusahaan raksasa sawit dihukum bayar tujuh belas koma tujuh triliun." Sisanya oke (versi "wajib mengganti", tanpa klarifikasi triliunan).
- **#018:** paling tidak jelas: cerita tentang pinjaman/rentenir/bank/apa? Pembuka harus langsung menyebut **bank keliling** + pinjaman. Masih ada citation lisan ("diteliti di Klaten…") → pindah ke kartu layar.
- **#019:** versi lama JAUH lebih bagus. Jangan rantai "kata Polri / Satgas nyebut / Kementan mengklaim". Ceritanya harus jelas dan menarik; jangan mikirin fakta sampai cerita hilang.
- **#020:** apa jalan ceritanya? Harus relate, antagonis jelas dan bikin kesal, emosional, memancing komentar. **Berlaku untuk SEMUA skrip.**
- "Struktur dramaturgi thriller sudah dikasih masa masih tidak bagus" → user minta aku RISET cara menulis skrip yang bagus dan jadi expert, bukan hanya menuruti input.

## Putusan user
- Sudut "kamu" + adegan hipotetis ("Bayangin kamu pedagang pasar…", "Hari ke-29, sisa kuotamu 20 GB…"); TANPA tokoh rekaan bernama; Didi Supandi (fakta, ojol, 30 GB ±Rp60–70 rb, terpakai 10 GB, 20 GB hangus, gugat MK bersama Wahyu Triana Sari) tetap pahlawan #020.
- Korpus transkrip: yt-dlp gratis dulu (vidIQ 5 kredit/panggilan hanya bila gagal dan atas izin).
- Kalibrasi: 3 varian #019 dulu (user memilih "suara" kanal), baru #018, #020, #017.

## Temuan analisis (jangan diulang)
Skrip pemenang kanal (#004 Aqua, #005 Skutik; `stories/aqua|skutik/audio/script_vo.txt`): hook merek+angka+sebab kecil; keyakinan penonton dibalik ("kamu kira…"); bukti konkret visual ("Buktinya? Lapangan golf", email "Star Outlet Degradation"); tanya-jawab pendek ("Lolos? Nggak."); pembalikan berlapis; antagonis membantah ("Dua-duanya membantah"); jargon diterjemahkan ("wasitnya persaingan bisnis"); penutup kembali ke dunia penonton. **Atribusi ("Kata KPPU") ADA di skrip pemenang → larangan atribusi total SALAH**; yang buruk = rantai atribusi birokratis tanpa detail konkret.
Riset (Consensus): cerita > statistik bila emosi tinggi (Freling 2020, meta 61 studi); akhir negatif lebih kuat (Morris 2019); kemarahan moral mendorong berbagi (McLoughlin 2024 *Science*; Leach 2025); efek korban teridentifikasi lemah/gagal replikasi (Maier 2024) → andalkan sudut "kamu" + antagonis.

## Progres 23 Nov 2026 (sesi lanjutan)
- 2a: yt-dlp DIBLOKIR YouTube dari server ("Sign in to confirm you're not a bot"; tidak ditembus). vidIQ hanya 10 kredit (= 2 transkrip) → tidak dipakai. Korpus luar ditunda; user bisa menyalin transkrip via tombol "Tampilkan transkrip" ke `research/korpus/`.
- 2b SELESAI: `.claude/skills/arsip-kasus/references/10-kitab-cerita.md` (+ penunjuk di AGENTS §1, RULEBOOK §4, SKILL.md).
- 2c SELESAI: linter WARN "rantai atribusi" (≥ 3 lembaga beratribusi); cek "[benda] ini" ERROR→WARN; 23 tes OK.
- 3 SELESAI: `research/batch_017_020/varian_beras_019.md` (A korban "kamu" · B misteri-bukti · C antagonis duluan; rekomendasi A). **Menunggu user memilih.** File episode #019 belum diubah.
- User: "gabungkan yang memaksimalkan viral, engagement, retensi; lanjut #018, #020, #017".
- 4 SELESAI (skrip v4, semua dengan Gerbang Cerita di README, AV + vo_prompt + UPLOAD judul diperbarui; lint batch 0 error, 0 peringatan, 24 tes OK):
  - #017 migor: hook pilihan user "Tiga perusahaan raksasa sawit dihukum bayar…" + "Lolos? Belum."; sisanya revisi 2.
  - #018 bankkeliling: "Pinjaman bank keliling dua ratus ribu, cairnya seratus delapan puluh." · "Bayangin kamu pedagang pasar" · tanpa sitasi lisan (kartu layar) · pemicu pinjol · K4. Judul baru `Bank Keliling: Cair Rp180 Ribu, Bayar Rp240 Ribu`.
  - #019 beras: gabungan A+B+C, hook SPHP (tuduhan Kementan) + bukti bertingkat + "Cuma itu? Nggak." + Turn uji lab + cermin · K3. Judul baru `Kementan: Beras Murah Pemerintah Dijual Jadi Premium`.
  - #020 kuota: "Sisa kuotamu dua puluh giga, besok pagi hangus." → Didi → menang → Telkomsel 76/95, Indosat 71/94, XLSmart 9/101 → notifikasi · K1. Judul baru `Kuota 20 GB Hangus, Ojol Bawa ke MK dan Menang`.
- **Berikut: user menyetujui 4 skrip + 3 judul baru → VO via konektor ElevenLabs (1 take/episode) → `lint --log` → Flow/kolase/render.** Jangan pakai kredit sebelum persetujuan.

## Langkah berikut (rencana disetujui: /root/.claude/plans/virtual-gathering-micali.md)
2a. Satu skrip Bash `yt-dlp` ambil subtitle otomatis ±12 Shorts outlier (#004/#005/#009 sudah ada; ±9 dari `research/niche/data_shorts_per_channel.jsonl`: top views Ngomongin Uang, Sepulang Sekolah, RaymondChins, MagnatesMedia, Vox, Smart Nonsense). 2b. Cerna → `references/10-kitab-cerita.md` (≤ ±80 baris: teknik terbukti + bukti riset + sebelum/sesudah + **Gerbang Cerita**: Cerita Brief 5 baris [protagonis "kamu", antagonis yang bikin kesal, taruhan, Turn+detik, emosi target+pemicu komentar], Uji Penonton 4 pertanyaan, aturan atribusi yang benar); penunjuk di RULEBOOK/AGENTS §1/SKILL. 2c. Linter: WARN rantai atribusi; cek "ini" ERROR→WARN; sesuaikan tes. 3. Tulis 3 varian #019 (A korban "kamu" · B misteri-bukti ala #005 · C antagonis menyangkal), kirim, user memilih. 4. Tulis #018, #020, #017 dengan suara terpilih (+ Cerita Brief + Uji Penonton), lint batch, kirim semua VO. 5. Commit + push; tanya sekali: frekuensi unggah (riset 3–4/minggu vs repo 1/hari), ekspor views final #004–#007, syarat Shopping Affiliate/"8.000 jam", slot uji 3:1.

## Fakta kunci tiap episode
Lihat README episode + `research/batch_017_020/shortlist.md` (putaran 1–18). #017: MA 8432 K/PID.SUS/2025 (15 Sep 2025; PN Tipikor lepas 19 Mar 2025); uang pengganti Rp17,7 T (Wilmar Rp11,88 T/Musim Mas Rp4,89 T/Permata Hijau Rp0,94 T). #018: skema Rp200 rb→terima Rp180 rb→10 rb×24 hari (studi Klaten 2012, Lebak 2024), bunga >5× batas OJK 0,3%/hari. #019: Polri 24 Jul 2025 (5 merek/3 produsen; belum vonis), Kementan klaim 212/268, Kemendag ±Rp14 rb/5 kg, Helfi Assegaf = Kasatgas Pangan Polri (produsen tak pernah uji lab). #020: MK 273/PUU-XXIII/2025 (23 Jul 2026), SE Menkomdigi 4/2026 (28 Agu), 156 dari 290 paket belum rollover (Telkomsel 76/95, Indosat 71/94, XLSmart 9/101; per 28 Sep).

## v5 (23 Nov 2026, koreksi user atas v4)
- #017 OKE (dikunci user). #018/#019/#020 ditulis ulang v5: satu cerita + satu pertanyaan inti + jawaban di akhir; fakta yang tidak melayani pertanyaan dibuang (uji lab #019, rincian operator #020).
- #018 pertanyaan: "pinjaman yang kelihatan murah kok lebih kejam dari pinjol?" (Klaten disebut langsung). #019: "tulisan premium itu bisa dipercaya nggak?" (merek tampil di karung, tidak diucapkan). #020: "MK bilang sisa kuota milikmu, terus kenapa masih hangus?"
- Menunggu user. Setelah setuju: selaraskan tabel AV README (masih v4) → VO.
- Pelajaran (masuk 10-kitab-cerita): tulis PERTANYAAN INTI dulu; tiap kalimat harus mendekatkan jawaban; kalimat yang tidak = buang, walau faktanya benar.
