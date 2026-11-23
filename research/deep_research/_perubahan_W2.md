# Perubahan W2 (23 Nov 2026): AGENTS.md, CLAUDE.md, SKILL.md, adaptor, gold_standard
Brief: `_BRIEF_PERBAIKAN.md`. Berkas disunting: `AGENTS.md`, `CLAUDE.md`, `.claude/skills/arsip-kasus/SKILL.md`, `.cursorrules`, `.github/copilot-instructions.md`, `GEMINI.md`, `research/gold_standard/README.md`. Tidak ada commit/push. "Jalur Paket Gemini" (AGENTS §3, SKILL) tidak disentuh (brief #11).

## 1. Tabel tindakan
| ID matriks | Tindakan | Berkas:baris baru |
|---|---|---|
| C-1 / B1 | `description` frontmatter -> "Formula ARSIP v7.0 (2 Mesin A/B ...; riset per batch 6 -> 4 ...)" | SKILL:3 |
| C-2 | Kompas v6.1 + Garis Merah 3 butir + "Mesin 3" diganti Kompas v7.0 (menunjuk AG §2/§2A) + Garis Merah 4 butir + Channel-Fit Gate; teks lama diarsipkan | SKILL:13-16 |
| B2 / SKILL ±25-28 | Model/effort: user mengatur `/effort` diganti Delegasi otonom (Claude memilih model+effort subagen; user tidak mengganti); pengingat "kapan Opus+high" diganti "ingatkan sekali lalu tetap delegasi" | SKILL:25, 28 |
| B5 / SKILL 1a, 2, blok Mode Batch | Langkah 1a "8-10 judul" -> riset per batch 6 -> verifikasi -> 4 terkunci (`9-playbook` §D); langkah 2 buang "paket dari user + Gemini" (diganti rujukan Jalur Paket Gemini) + lint --batch 0 error; blok "Mode Batch YPP" ditulis ulang (nama diubah "Mode Batch ... v7.0") | SKILL:43, 45, 67-68 |
| C-9 / B3 / B4 | Langkah 3 + paragraf VO: 1 take, 2,50-2,66 kata/dtk, atempo <= 1,10, ekor <= 0,15 dtk, konektor = jalur utama; rujukan RISET_VO_TEMPO: 2,6-2,7 = riwayat #004 | SKILL:22, 46, 108 |
| K 3.1 / C-1..C-6 sisa | "Komposisi konten": 3 Mesin/pilar 70% usang -> 2 Mesin A/B; pilar kanal dipertahankan | SKILL:23 |
| B-3 / G10c (brief #9) | Target 1 video/hari tetap + "KEPUTUSAN USER TERTUNDA" | SKILL:24; AG:23 |
| SKILL ±10-11 | Protokol batch #009-#012 diringkas jadi 1 paragraf + penunjuk; aturan aktif (lint, kuota 3:1, jangkar 0-15 dtk) dipertahankan | SKILL:10-11 |
| (rujukan) | Penunjuk ke `RULEBOOK_V7.md` (dibuat 23 Nov 2026), `research/deep_research/README.md`, `MATRIKS_JEJAK.md`, `arsip-riwayat/` | SKILL:109 |
| M-4 / H10 (SOP) | AGENTS §1 butir 6: pointer RULEBOOK_V7.md + README riset + MATRIKS_JEJAK.md sebagai "dasar riset aturan" | AG:7 |
| Strategi B-1, H-3, G12/G17 (brief #8) | Monetisasi ditulis ulang: semua angka ⚠; RPM dua sumber (AIR US$0,012; Dynamoi US$0,14); YPP dua versi (s.d. 31 Jan 2027: 1.000 sub + 4.000 jam ATAU 10 jt; mulai 1 Feb 2027: 8.000 jam [⚠ hanya blueprint] ATAU 20 jt) + jendela daftar ±2,5 bulan; Shopping Affiliate (500 sub; KEP menambah 3 jt engaged views); klaster 4-5 episode (menggantikan "3-4" di KEP); Inauthentic Content "15 Jul 2025 (⚠ sumber lain ...)" | AG:23 |
| B-3 (brief #9) | Frekuensi unggah: tidak diubah, "KEPUTUSAN USER TERTUNDA" | AG:23, SKILL:24 |
| B-2 / E1, E2, E5 (brief #10) | Share/viralitas: kedua pandangan ditulis (riset zero-CTA WhatsApp + Berger-Milkman arousal tinggi vs ANALISIS_PASAR "share tidak bisa diandalkan" ⚠); putusan = ukur share rate kanal sendiri di Studio | AG:22 |
| X4 / brief #4 | `//` 0,5-0,6 -> 0,5-0,8 dtk | AG:18 |
| C-10 / brief #5 | Atribusi lembaga SEKALI boleh dan dianjurkan, wajib untuk klaim sensitif; sitasi akademik panjang dilarang | AG:18 |
| brief #2, #3 | Aturan batch pembuka: bentuk kalimat pembuka divariasikan (10 bentuk), kata tunjuk visual tidak wajib, maks 1 dari 4 episode "[benda] ini / kayak gini [klaim]"; "Bukan X, tapi/melainkan Y" boleh di body maks 1/skrip, dilarang di judul/hook | AG:17 |
| C-8 / brief #6 | Ambang topik: rubrik 20 poin >= 16, tak ada <= 2, monetisasi tidak dinilai (pembeda saja), gerbang Lokal >= 4 / Cerita >= 3 / Celah >= 3 | AG:14 |
| brief #7 | Kesegaran = catatan `[SEGAR]` saja, bukan gerbang, tak dicek linter (linter sudah diubah agen lain; terkonfirmasi di `git diff kit/tools/lint_episode.py`) | AG:14, 20 |
| K 2C | Batch: Mesin A 2-3 + Mesin B 1-2 | AG:12 |
| AG ±28-30 | Protokol Hibrida + rincian #009-#012 diarsipkan; tersisa 1 baris aktif (Claude penuh, #009 terkunci, jangkar 0-15 dtk, kuota 3:1) | AG:30 |
| AG ±33 | Otomasi v6.1 diarsipkan; tersisa 1 baris "Gold standard reference" | AG:33 |
| CLAUDE.md:2 | Riwayat batch #009-#012 diarsipkan; baris aktif + pointer RULEBOOK/riset; bullet konektor diselaraskan dengan AG §5 (storyboard = lembar berlabel default, Artifact hanya bila diminta) | CLAUDE.md:2, 5 |
| B6 | `.cursorrules`, `copilot-instructions`, `GEMINI.md`: "protokol hibrida" ditandai DIBATALKAN 17 Nov 2026, arahkan ke AGENTS.md §1/§3 + RULEBOOK | .cursorrules:1; copilot-instructions:2; GEMINI.md:2 |
| C-6 (GS:3) / "temuan kecil" | gold_standard: "batch hibrida" -> dikerjakan penuh Claude; "mesin 1/2/3" -> A1/A2/B3/B4 | research/gold_standard/README.md:2-3 |

## 2. Dipindah ke `.claude/skills/arsip-kasus/arsip-riwayat/` (teks asli utuh, header asal/tanggal/alasan)
`AGENTS.md_baris29-30.md`, `AGENTS.md_baris33.md`, `SKILL.md_baris10-11.md`, `SKILL.md_baris15-16.md`, `SKILL.md_baris22-23.md`, `SKILL.md_baris25-28.md`, `SKILL.md_baris67-68.md`, `CLAUDE.md_baris2-riwayat.md`, `cursorrules_baris1.md`, `copilot-instructions_baris2.md`, `GEMINI.md_baris2.md`, `gold_standard_README_baris1-3.md`. Tiap tempat asal punya penunjuk `[DIARSIPKAN -> arsip-riwayat/...]` (adaptor dan gold_standard memakai teks baru tanpa penunjuk; teks lamanya ada di arsip). Catatan: SKILL baris 22-28 diarsipkan sebagai blok (22-23, 25-28) tetapi isi baris 24, 26, 27 (Target, Rantai shortlist, Batasan sesi) tetap di tempat.

## 3. PERTANYAAN USER
1. Frekuensi unggah: 1 video/hari (repo) atau 3-4 Shorts/minggu lalu 1-5/bulan (riset)? Ditandai "KEPUTUSAN USER TERTUNDA", tidak diubah.
2. Share/viralitas: apakah dirancang pemicu share (riset) atau tidak diandalkan (ANALISIS_PASAR)? Ditunda sampai share rate kanal sendiri diukur.
3. Slot uji judul per batch (`[SLOT-UJI]`, kuota 3:1) masih ada di SKILL Mode Batch dan AGENTS (judul/pembuka); dokumen riset K melarang tanpa pengecualian (M-1). Dipertahankan; konfirmasi bila dihapus.
4. Atribusi lembaga: brief #5 "boleh dan dianjurkan", sedangkan v7.0 lama "wajib sekali untuk klaim sensitif". Saya menulis keduanya (dianjurkan umum, wajib untuk klaim sensitif). Setuju?
5. Ambang Shopping Affiliate: AGENTS lama "±500 subscriber" vs KEPUTUSAN_RISET "500 sub + 3 juta engaged views"; ditulis keduanya ⚠, perlu verifikasi YouTube Help (belum dilakukan).
6. Angka "8.000 jam" (YPP 1 Feb 2027) hanya dari blueprint riset; KEPUTUSAN_RISET menandainya ⚠ sedangkan RISET_NICHE_V2 menulis "resmi". Ditulis ⚠ di AGENTS.
7. Kesegaran `[SEGAR]` kini bukan gerbang (brief #7), tetapi `1-cerita` §M7.4 (baris ±243) dan `9-playbook` §A.2 masih menyebut "wajib >= 2 dari 4" dan "(lint)"; berkas itu bukan milik W2, mohon agen pemilik menyelaraskan.

## 4. Sengaja tidak diubah
- "Jalur Paket Gemini" di AGENTS §3 (baris 32) dan SKILL (bagian Jalur Paket Gemini): utuh (brief #11).
- Garis Merah/Stress-Test 4 uji/Kompas §2A, §4 gerbang kualitas, §5 matriks pengganti fitur, §6 routing + Delegasi otonom, §7 aturan kerja: sudah v7.0.
- SKILL: Irama harian (H-2/H-1/H, konsisten dengan 1 video/hari), tabel "Titik ingat", Struktur, Perintah inti, langkah 4-10, daftar Rujukan lainnya.
- Angka views #001-#007 di 6-pelajaran (C-15): bukan berkas W2; perlu keputusan user soal ekspor mana yang final.
- Item matriks lain (C-3, C-4, C-5, C-7, C-11..C-14, H-1..H-10, X1..X3) berlokasi di berkas agen lain.
- Tidak ada riset yang dihapus; `RULEBOOK_V7.md` dan `MATRIKS_JEJAK.md` belum ada saat ini (pointer menunjuk ke berkas yang akan dibuat sesi utama).
