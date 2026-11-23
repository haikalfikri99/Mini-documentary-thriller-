# Perubahan W3 (23 Nov 2026): references 2-visual, 3-audio, 4-standar, 5-upload, 6-pelajaran, 7-selera
Berkas sunting: `.claude/skills/arsip-kasus/references/{2-visual-dan-animasi,3-audio,4-standar-kualitas-10,5-upload-dan-thumbnail,6-pelajaran,7-selera-dan-cara-kerja}.md`. Tidak ada commit/push. Nomor baris di bawah = bagian/butir (baris bergeser; cari dengan judul bagian atau nomor butir).

## 1. Tabel tindakan
| ID matriks | Tindakan | Lokasi baru |
|---|---|---|
| B3/C-9 (3A:72 "2 take") | Butir "2 take" dipindah ke arsip; tag SUPERSEDED 1 take | 3-audio §I (butir terakhir, `[DIARSIPKAN]`), tabel §K |
| B4/C-9 (3A:51 tempo 2,6–2,7) | Tag SUPERSEDED; standar tunggal 2,50–2,66 | 3-audio "Revisi v4.1" butir 1; §K |
| 3A:80 "tempo tetap 2,60–2,75" | Tag SUPERSEDED → 2,50–2,66 | 3-audio §J butir terakhir |
| brief #4 (standar tunggal) | Tabel standar VO: 1 take, 2,50–2,66, atempo ≤ 1,10, `//` 0,5–0,8, `/` ≈ 0,25, kalimat 8–13 (WARN > 17), H1 ≤ 14 kata/≤ 4,0 dtk, dua mode, ekor ≤ 0,15 | 3-audio §K (awal) |
| X4 (hening `//`) | Pengecualian "sunyi > 0,3 dtk" = hanya `//` 0,5–0,8 | 3-audio "Revisi v4.1" butir 2 |
| 3A ±62–73 (pelajaran #004) | §H–§I dipadatkan, aturan aktif dipertahankan (diagnosis wajib Whisper, timpani/tuba, ElevenLabs 1 versi, pengucapan); log mentah dipindah | 3-audio §H, §I |
| H6 (tahan hero 3–4 dtk) | Butir baru §A.7 | 2-visual §A butir 7; 4-standar baris 7 |
| H1 spek (tepi atas y < 100) | Dicatat: belum ada di `check_visual.mjs`, tugas W5 bila diputuskan | 2-visual §H (paragraf "Celah alat") + 4-standar catatan v7.0 |
| (selisih kecil) stempel ≤ 0,2 vs 0,25 | Diselaraskan 0,25 (v7.0 §N) | 2-visual §A.1; 4-standar baris 1 |
| K.v7 judul §K "psikologi perilaku" | Tag judul historis, isi tetap berlaku | 2-visual §K |
| 2V:98 (#013–#014 vs #013–#015) | Catatan ⚠ selisih | 2-visual §O.1 |
| 5U:41 / H-4 / G19 | Test & Compare 3 thumbnail (Fase 4, long-form; Shorts belum) ⚠ | 5-upload §G |
| G18 | Takarir .srt Inggris long-form (Fase 4) ⚠ | 5-upload §G |
| C-14, brief #8 | Ambang YPP dua versi (s.d. 31 Jan 2027; mulai 1 Feb 2027) ⚠; RPM dua sumber ⚠; tanggal Inauthentic Content ⚠; frekuensi unggah ⚠ KEPUTUSAN USER TERTUNDA | 5-upload §G |
| (konflik internal 5U) | Tag legacy pada §A judul (≤ 50 → v7.0 ≤ 55), templat deskripsi §B, tabel hashtag "psikologi", teks thumbnail "kok bisa", komentar pin "debat" vs §F "pengalaman" | 5-upload §A, §B, §C, §D, "Paket upload wajib" |
| H-1 | #004 engaged views 12.948 + pola 4 pembalikan sampai dtk 42 (label sumber Konteks ⚠) | 6-pelajaran "Data tambahan dari dokumen Konteks v7.0" |
| H-2 | Penyebab #007 melandai = judul tanpa nominal uang + tengah melandai (label hipotesis Konteks) | idem |
| C-15 | Dua versi angka views #001–#007 berlabel + PERTANYAAN USER | 6-pelajaran "⚠ Dua versi angka penayangan" |
| D5 / B-2 | Audit penurunan retensi ≥ 4% + ukur share rate kanal sendiri | 6-pelajaran "Cara memakai" butir 3–4 |
| 6P ±9–88 | Log #001–#005 diarsip; ringkasan 5 baris tersisa; protokol Hibrida (dibatalkan) diarsip dengan 1 kalimat yang masih hidup (gold standard) | 6-pelajaran "Ringkasan log", bagian Hipotesis/#003/#004/"Data Studio" |
| X3/#78 (7S:115) | Bagian "format kirim" tag SUPERSEDED by §M4 (skrip AV 2 kolom di README) | 7-selera #78 |
| C-10/#80b (7S:118) | Tag SUPERSEDED: atribusi pendek lembaga sekali boleh dan dianjurkan; sitasi panjang dilarang | 7-selera #80(b) |
| #37 kata tunjuk | Tidak wajib lagi; variasi bentuk pembuka; maks 1 dari 4 episode "[benda] ini/kayak gini" (brief #2) | 7-selera #37 |
| C-4 (#69/#83/#87 7S:106/122/126) | Tag SUPERSEDED v7.0; #87 "Mesin 2 & 3" → "Mesin B (B3 & B4)" | 7-selera #69, #83, #87 |
| #138 kesegaran | "catatan [SEGAR], bukan gerbang, tidak dicek linter" (brief #7) | 7-selera §E |
| usang lain | Tag/selaraskan: B.6 (durasi), C.6 (effort → AGENTS §6), #31 (tempo), #36 (pilar 70%), #39 ("?" hook; 3 menit), #50 (a–g), #53 (Mode Batch), #58 ("padahal" di H1), #62 (psikologi wajib), #89 (format storyboard → #93) | 7-selera butir terkait |

## 2. Dipindah ke `.claude/skills/arsip-kasus/arsip-riwayat/`
- `3-audio_baris62-73.md` (§H–§I log #004 + "2 take").
- `6-pelajaran_baris9-100.md` (tabel #001–#002; hipotesis #002–#003; data #003; proses #004; "Tambahan #004"; data #004 ±11 jam; protokol Hibrida dibatalkan).
- `7-selera_baris90-111.md` (#54 keputusan penutup #005; #74 Protokol Hibrida dibatalkan). Jalur Paket Gemini tidak disentuh.

## 3. PERTANYAAN USER
1. **Ekspor Studio mana yang final** untuk views #001–#007: dokumen Konteks (23.423 / 17.277 / 16.605 / 1.485 untuk #004–#007) atau ekspor 19 Nov (25.982 / 52.660 / 24.140 / 8.868)? Persentase stayed/APV sama kecuali #001. Kedua versi ditulis berlabel; tabel lama tidak ditimpa.
2. Frekuensi unggah: 1 video/hari (repo) vs 3–4 Shorts/minggu lalu 1–5/bulan (riset) = ⚠ KEPUTUSAN USER TERTUNDA (tidak diubah).
3. Atribusi lembaga: brief "boleh dan dianjurkan" vs `AGENTS.md` §2 "wajib untuk klaim sensitif" (sekali). Di 7-selera #80b ditulis keduanya; konfirmasi bahwa maksudnya "wajib sekali untuk klaim sensitif".
4. Ambang YPP (500+3.000 jam/3 jt; 1.000+4.000 jam/10 jt; 8.000 jam/20 jt mulai 1 Feb 2027) belum diverifikasi ke YouTube Help; semua ⚠.
5. Konteks menyebut rotasi latar pelajaran #013–#015, repo #013–#014: koreksi?

## 4. Sengaja tidak diubah
- Craft visual (§B–§N 2-visual), rantai VO/skor/foley/QA audio, rubrik 10 aspek, desain thumbnail dan paket upload; aturan sapaan/gaya di 7-selera.
- Baris SUPERSEDED yang sudah bertag (mis. #50c, #51, #71, #80c/d, #84) dibiarkan sebagai riwayat; Jalur Paket Gemini tidak disentuh.
- Konflik di luar berkas W3 (dicatat untuk agen lain): `AGENTS.md` §2 hening `//` "0,5–0,6" vs 0,5–0,8 di 1-cerita/NE/3-audio §K; `kit/tools/check_visual.mjs` belum punya cek `y < 100` (W5); `SKILL.md` "2 take / ±1,2" (agen SKILL).
