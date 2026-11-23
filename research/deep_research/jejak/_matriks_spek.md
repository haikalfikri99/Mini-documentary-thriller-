# Matriks kelengkapan spesifikasi: v5.0 + Prompt v6.0 -> repo (audit read-only, 23 Nov 2026)

Sumber: `Spesifikasi_Upgrade_Editorial_Teknis_Repo_v5.0.md` (sebut **S5**) dan `Prompt_v6.0.txt` (**P6**). Aturan resolusi (keputusan user): Formula ARSIP v7.0 (`AGENTS.md` §2/§2A, `1-cerita` §M9, `8-hook` §J) menang atas v5.0/v6.x; Protokol Hibrida/Gemini dibatalkan 17 Nov 2026 = DIGANTIKAN. Lokasi ditulis `berkas:baris` (verifikasi grep; `1-cerita`, `2-visual`, `3-audio`, `5-upload`, `6-pelajaran`, `7-selera`, `8-hook` = `.claude/skills/arsip-kasus/references/<n>-*.md`; `SKILL` = `.claude/skills/arsip-kasus/SKILL.md`).

Catatan berkas sumber: **`Prompt_v6.0.txt` terpotong di baris 113** (kalimat Bagian III berhenti di "buat `vo_prompt_eleven"). Sisa Bagian III (langkah produksi #009-#012 dan otomasi #013+) tidak ada di berkas; isinya hanya bisa disimpulkan dari `AGENTS.md` §3, `7-selera` #74-#75 dan `6-pelajaran`. Dokumen `research/niche/RISET_*.md` adalah data dasar (bukan penampung aturan); aturan dari S5/P6 ditampung di `KEPUTUSAN_RISET.md`, `topik/RUMUS_PEMILIHAN.md` dan `references/`.

## 1. Ringkasan: HILANG dan BERTENTANGAN

### HILANG (2)
| # | Spesifikasi | Usulan tindakan (1 baris) |
|---|---|---|
| H1 | S5 §BAGIAN 2.1: cek caption-safe juga untuk tepi atas (`y < 100`); `check_visual.mjs` hanya memeriksa pita caption dan potongan tepi >= 25% (tidak ada ambang `y < 100`) | Tambah pemeriksaan zona `y < 100` di `kit/tools/check_visual.mjs` (peringatan, bukan serius), atau tulis di `2-visual` bahwa sengaja tidak dipakai. |
| H2 | `research/deep_research/README.md` merujuk `MATRIKS_JEJAK.md` (matriks riset -> aturan) yang **tidak ada** di folder | Buat `MATRIKS_JEJAK.md` (boleh menautkan berkas ini) atau hapus rujukannya dari README. |

### BERTENTANGAN (7; semuanya sisa v6.x/v5.0 tanpa tanda SUPERSEDED, bukan keputusan v7.0)
| # | Pertentangan (kedua lokasi) | Usulan tindakan (1 baris) |
|---|---|---|
| B1 | `SKILL.md:3` (frontmatter `description`) masih "Formula ARSIP v6.1 (3 Mesin Psikologi Perilaku ...)" vs `AGENTS.md:1,16` + `SKILL.md:8` badan = v7.0, 2 Mesin A/B | Ganti `description` SKILL.md ke "Formula ARSIP v7.0 (2 Mesin A/B ...)". |
| B2 | Model/effort: `SKILL.md:25-26` ("sesi utama = Opus effort high; user mengatur `/effort high`"; "ingatkan user kapan harus Opus + effort high") vs `AGENTS.md:§6 Delegasi otonom` + `CLAUDE.md` (user TIDAK mengganti model/effort; Claude mendelegasikan ke subagen Opus/high) | Tulis ulang dua baris SKILL.md itu mengikuti `AGENTS.md` §6. |
| B3 | Jumlah take VO: `1-cerita:134` ("Dua take"), `3-audio:72` ("2 take"), `SKILL.md:46` ("2 take") vs `AGENTS.md` §3/§5 + `3-audio:83` (konektor, **1 take**, ulang hanya setelah user setuju) | Beri tanda `[SUPERSEDED by v7.0: 1 take]` di tiga baris itu (sesuaikan dengan konvensi repo). |
| B4 | Tempo VO: `3-audio:51` dan `SKILL.md:46,108` ("target 2,6-2,7 kata/dtk") vs `AGENTS.md` §2, `1-cerita` §M1, `new_episode.sh:94` (2,50-2,66; `vo_tighten.py --wps 2.66`) | Samakan ke 2,50-2,66 (atau catat 2,6-2,7 sebagai riwayat #004) di `3-audio:51` dan `SKILL.md:46`. |
| B5 | Alur riset: `SKILL.md:44` langkah 1a "Shortlist 8-10 judul", langkah 2 "(#009-#012: paket ini datang dari user + Gemini)", `SKILL.md` "Mode Batch YPP: Fase 1 riset + 4 fact sheet paralel" vs `AGENTS.md:§2` "DILARANG meriset borongan ...; 6 kandidat -> verifikasi -> kunci 4" dan Hibrida dibatalkan | Revisi langkah 1a/2 dan blok Mode Batch di SKILL.md ke "6 kandidat -> 4" dan hapus rujukan Gemini-hibrida. |
| B6 | Adaptor `.cursorrules:1` dan `.github/copilot-instructions.md:2` menyebut "protokol hibrida / Protokol Transisi Hibrida #009-#012" seolah masih aktif, sedangkan `AGENTS.md:§3` = dibatalkan 17 Nov | Ganti frasa itu dengan "Jalur Paket Gemini (v7.0) dan protokol batch" atau hapus. |
| B7 | Rubrik 20 poin: `RUMUS_PEMILIHAN.md:55` (kriteria "Keamanan hukum & monetisasi", nilai <= 2 menggugurkan) vs `AGENTS.md:§2` + `7-selera` #87/#94 (monetisasi = pembeda, BUKAN gerbang; Mesin B bebas syarat larangan hukum) | Beri catatan di `RUMUS_PEMILIHAN.md:55`: kriteria 4 hanya skor informatif untuk topik tanpa produk/tanpa risiko hukum (sesuai v7.0). |

Temuan kecil (bukan baris matriks): `research/gold_standard/README.md:1-3` masih menyebut "batch hibrida #009-#012" dan "mesin 1/2/3"; `SKILL.md:24` (dalam teks lama) menunjuk `research/niche/BANK_IDE.md` yang sudah dihapus 14 Nov (`research/niche/README.md:3`); `AGENTS.md:22` (Shopping Affiliate "±500 subscriber", klaster "4-5 episode") sedikit berbeda dari `KEPUTUSAN_RISET.md:44-47` ("500 subscriber + 3 juta engaged views", klaster "3-4 episode"); keduanya bertanda ⚠ belum diverifikasi ke YouTube Help.

## 2. Tabel pemetaan

Status: ADA · HILANG · BERTENTANGAN · DIGANTIKAN (v7.0 / pembatalan Hibrida). Kolom tindakan "-" = tidak perlu tindakan.

### 2.1 Editorial (judul, hook, dramaturgi, bahasa, topik)
| Dokumen/bagian | Spesifikasi | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| S5 §1 Persona | Sapaan "kamu"/"kita" konsisten | `1-cerita:128` (F5) | ADA | - |
| S5 §1 Persona | Karakter suara investigatif, jahil saat ironi, berwibawa | `1-cerita:128` | ADA | - |
| S5 §1 Larangan | Tanpa "Halo guys/Tahukah kamu/Pernahkah kalian" dan klise AI | `1-cerita:110,128` | ADA | - |
| S5 §1 Larangan | "email" bukan "surel", "nggak" bukan "tidak" | `1-cerita:129`; `7-selera:74` (#38); `7-selera` #80a | ADA | - |
| S5 §2A Mesin Ide | Rotasi 4 Pilar 50/25/15/10 | `RUMUS_PEMILIHAN.md:36` (ditandai DIGANTIKAN); `AGENTS.md:§2` 2 Mesin A60/B40 | DIGANTIKAN | - (2 Mesin v7.0) |
| S5 §2B | 5 Lensa pembangkit seed | `RUMUS_PEMILIHAN.md:45` | ADA | - |
| S5 §2C | Alur `gali_topik.py` autocomplete/outlier -> `riset_topik.py` | `RUMUS_PEMILIHAN.md` (v5.0 bagian alur); `kit/tools/gali_topik.py`, `riset_topik.py` | ADA | - |
| S5 §2C | Prioritas lolos `n_saran` tinggi dan `n_1m == 0` | `RUMUS_PEMILIHAN.md:76-77` (Feed Curiosity: `n_saran` kecil tidak menggugurkan) | DIGANTIKAN | - (v6.0 koreksi) |
| S5 §2C | Rubrik validasi 20 poin, lolos >= 16/20, tak ada nilai <= 2 | `RUMUS_PEMILIHAN.md:54-56`; `new_episode.sh:53` | ADA | - (lihat B7) |
| S5 §2C / B7 | Kriteria 4 "Keamanan hukum & monetisasi" sebagai gerbang | `RUMUS_PEMILIHAN.md:55` vs `AGENTS.md` §2, `7-selera` #87/#94 | BERTENTANGAN | Catatan v7.0 di RUMUS:55 (B7) |
| S5 §3 Judul | Pola 1 `[Merek] [Tindakan] Gara-Gara [Objek]`, <= 55 kar., ideal 38-48 | `8-hook:57-59`; `AGENTS.md:§2` Judul & Hook | ADA | - |
| S5 §3 Judul | Pola 2 "Trik Psikologi di Balik ..." | `8-hook:60` (dicoret, DILARANG; Kuda Troya) | DIGANTIKAN | - (v6.0/v7.0) |
| S5 §3 Judul | Pola 3 "Kenapa ... ?", Pola 4 "Cara Halus ...", Pola 5 "Alasan Asli ..." | `8-hook:61-63`; kuota uji 3:1 `8-hook:65,74` | ADA | - (hanya 1 slot uji per batch) |
| S5 §3 | Uji POV penonton (4 pertanyaan sebelum script) | `8-hook:68`; `new_episode.sh` (bagian "Uji POV penonton") | ADA | - |
| S5 §3 | Penguncian 3-titik judul <-> frame 0 <-> H1 (<= 4,0 dtk, <= 14 kata) | `8-hook:70`; `AGENTS.md:§2`; `new_episode.sh` | ADA | - |
| S5 §4 | Lokasi script resmi `README.md` + `script_vo.txt`, bukan `SCRIPT.md` | `1-cerita:55`; `AGENTS.md:§3` | ADA | - |
| S5 §4 | 120-145 kata, 48-55 dtk, tempo 2,60-2,75 | `1-cerita:106` (SUPERSEDED); `1-cerita` §M1 (85-105 / 115-135, 2,50-2,66) | DIGANTIKAN | - (v6.0/v6.1) |
| S5 §4 | Kalimat 6-13 kata | `1-cerita:107`; v7.0 `1-cerita` §M9.3 (8-13) | DIGANTIKAN | - |
| S5 §4 | `line_starts.py` memecah 18-24 shot (2,1-2,6 dtk/shot) | `1-cerita:107`; `kit/tools/line_starts.py` | ADA | - |
| S5 §4 | Struktur 6 segmen (Hook, 2A, 2B, Payoff) | `1-cerita:108-114` (F3) | ADA | - |
| S5 §4 | Micro-rehook 16-18 dtk dan 36-39 dtk | `1-cerita:172` (R3); `1-cerita` §M3 (tiap 12-15 dtk, menggantikan) | DIGANTIKAN | - |
| S5 §4 | Circular Reframe Loop sebagai penutup default, zero-CTA | `1-cerita:117` (SUPERSEDED v6.1); §M5 rotasi 5 arketipe; §M8.1 Conceptual Loop; `AGENTS.md:§2` Penutup | DIGANTIKAN | - |
| S5 §4 | Zero-CTA di VO | `AGENTS.md:§2` (Bahasa lisan, Monetisasi) | ADA | - |
| S5 §5 | Fact sheet 2 lapis (>= 2 lokal + 1 primer) | `1-cerita:54`; `new_episode.sh` (Fact sheet 2 lapis); `AGENTS.md:§2` | ADA | - |
| S5 §5 | Dilarang mengarang angka; pakai perbandingan perilaku bila sumber hanya arah | `1-cerita:54`; `new_episode.sh` (baris bawah tabel fact sheet) | ADA | - |
| S5 §5 | Pagar hukum: sebut status putusan/lembaga, muat bantahan, tanpa logo, tahun di layar | `1-cerita:155` (cek 16); `new_episode.sh` ("Celah & batas hukum"); `7-selera:81` (#45) | ADA | - |
| P6 I.1 | Identitas: pertahankan "Mini Thriller IDN" + label "ARSIP KASUS", bukan "Arsip Perilaku" | `AGENTS.md:§2` Identitas; `CLAUDE.md` | ADA | - (posisi "psikologi perilaku" digantikan v7.0) |
| P6 I.1 | 3 Mesin Psikologi Perilaku 35/40/25 | `KEPUTUSAN_RISET.md:28-31` (SUPERSEDED); `AGENTS.md:§2` 2 Mesin A60/B40 | DIGANTIKAN | - |
| P6 I.2 | Aturan Jembatan Audiens #009-#010 | `KEPUTUSAN_RISET.md:32` (SUPERSEDED; selesai) | DIGANTIKAN | - |
| P6 I.2 | Filter Anti-Krisis Replikasi + Daftar Hitam (7 studi) | `RUMUS_PEMILIHAN.md:64-66`; `AGENTS.md:§2` Garis Merah; `7-selera` #70; `new_episode.sh:51` | ADA | - |
| P6 I.2 | 5 kategori taksonomi kokoh | `RUMUS_PEMILIHAN.md:67` | ADA | - |
| P6 I.2 | Topic Stress-Test v6.0 (celah 33-67%, Retention Anchor, Vox Handle, satu ide tanpa "dan") | `RUMUS_PEMILIHAN.md:70-75` (riwayat); v7.0: `AGENTS.md:§2` Stress-Test 4 uji berbeda | DIGANTIKAN | - |
| P6 I.2 | `riset_topik.py` = Feed Curiosity; `n_1m` ukur kejenuhan, `n_saran` kecil tak menggugurkan | `RUMUS_PEMILIHAN.md:76-77`; `new_episode.sh:~52`; `kit/tools/riset_topik.py:61` | ADA | - |
| S5 §2 Teknis 4 | `riset_topik.py`: pencocokan frasa/kata bermakna >= 4 huruf, bukan hanya kata pertama | `kit/tools/riset_topik.py:16-26` (`relevant()`); `RUMUS_PEMILIHAN.md` (catatan alur) | ADA | - |
| P6 I.3 | Aturan Kuda Troya (daftar kata terlarang di judul + frame 0/H1) | `8-hook:73` (§H), §J (`8-hook:93`); `AGENTS.md:§2` | ADA | - (v7.0 mengizinkan "tapi/padahal" di body) |
| P6 I.3 | Kuota uji judul 3:1 per batch 4 episode | `8-hook:65,74`; `AGENTS.md:§3`; `SKILL.md` Mode Batch | ADA | - |
| P6 I.3 | 5 arketipe hook K1-K5 (Bom di Bawah Meja, Ketidaknyamanan, Cold Artifact, Celah Ujung Lidah, Result-First), K1 tanpa kata pengendali | `8-hook:78-82`; `AGENTS.md:§2` | ADA | - |
| P6 I.4 | 2 mode durasi (Ringkas 35-42 / 85-105; Investigasi 48-55 / 115-135; tempo 2,50-2,66) | `1-cerita` §M1 (206-213), §M7.3; `AGENTS.md:§2` | ADA | - |
| P6 I.4 | Anatomi konflik non-kriminal (antagonis, stakes, 3 babak Prestige) | `1-cerita` §M2; `new_episode.sh` ("Anatomi konflik") | ADA | - |
| P6 I.4 | ABT + sapu bersih transisi daftar | `1-cerita` §M3; `AGENTS.md:§2`; `lint_episode.py` | ADA | - |
| P6 I.4 | Question-to-Report, micro-rehook 12-15 dtk, hening 0,5-0,8 dtk | `1-cerita` §M3, §M8.2; `new_episode.sh:94` | ADA | - |
| P6 I.4 | Visual Evidence Then Context + Zero-Citation lisan | `1-cerita` §M3, §M9.4; `AGENTS.md:§2` | ADA | - |
| P6 I.4 | Ladder of Abstraction, Branch to the Right, nominalisasi/pasif | `1-cerita:220` (§M3) | ADA | - |
| P6 I.4 | 2-3-1 / burstiness (selang-seling 2-5 dan 8-12 kata) | `1-cerita:220` (ditandai diganti §M9.3: 8-13 kata, tanpa staccato) | DIGANTIKAN | - |
| P6 I.4 | Maks 1-2 kontras angka; Anti-Exit Words ("Jadi/Kesimpulannya/Pada akhirnya/Nah itulah") | `1-cerita` §M3, §M7.2 (diperluas); `AGENTS.md:§2`; `lint_episode.py` | ADA | - |
| P6 I.4 | Skrip AV 2 kolom + notasi `/` `//` KAPITAL `[perlambat:]` `(intonasi)` | `1-cerita` §M4; `new_episode.sh:94`; `AGENTS.md:§2` | ADA | - |
| P6 I.4 | 5 arketipe penutup (Reframing default, Cermin, Dilema, Lingkar Mulus, X-Ray) | `1-cerita` §M5, §M7.1 (rotasi tanpa default); `AGENTS.md:§2` Penutup | ADA | - (default DIGANTIKAN; arketipe tetap) |
| P6 I.4 | Scorecard v6.0 (cek replikasi, Kuda Troya, ABT, zero-citation, anti-exit, AV) | `1-cerita` §M6 (cek 17-22), §M9.7 (#23); `AGENTS.md:§4` | ADA | - |
| P6 I.1 | Tahap 1 monetisasi: 500 sub + 3 juta engaged views, Shopping Affiliate, maks 3 tag | `KEPUTUSAN_RISET.md:44`; `AGENTS.md:§2` Monetisasi (tanpa "3 juta") | BERTENTANGAN | Samakan angka AGENTS:22 dengan KEPUTUSAN:44 atau tandai sama-sama ⚠ |

### 2.2 Visual / kolase
| Dokumen/bagian | Spesifikasi | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| S5 §2.1 | Visual QA gate otomatis di `make_kolase.sh` setelah Audio QA | `kit/tools/make_kolase.sh:4,19`; `AGENTS.md:§4.3`; `SKILL.md` langkah 8 | ADA | - |
| S5 §2.1 | Dead-frame: area panggung `y 120-1190`, statis > 2,5 dtk | `kit/tools/check_visual.mjs:5,72,86` (sampel 0,25 dtk, lebih ketat dari 0,5 dtk) | ADA | - |
| S5 §2.1 | Zona aman pita caption `y 1210-1536` | `check_visual.mjs:6-8,78` (teks 1300-1440, non-teks 1210-1536) | ADA | - |
| S5 §2.1 | Tidak ada elemen terpotong di tepi atas `y < 100` | `check_visual.mjs` hanya potongan tepi >= 25% (tidak ada ambang `y < 100`) | HILANG | Tambah pemeriksaan `y < 100` atau catat sengaja ditiadakan (H1) |
| S5 §3 | Frame 0 hero >= 45% lebar (>= 486 px) di `y 150-1150`, stempel <= 0,25 dtk | `8-hook:70`; `AGENTS.md:§2,§4.4`; `2-visual:73,101` (cek manual, tidak otomatis) | ADA | - |
| S5 §5 | Semua stempel `bk.stamp(..., legible=True)` | `2-visual:42`; `7-selera:58` (#22); `kit/collage/parts.py:236` | ADA | - |
| S5 §5 | Tanpa logo merek asli; tahun kejadian tampil di layar | `AGENTS.md:§2` Tetap dari aturan lama; `1-cerita:155`; `7-selera:81` (#45) | ADA | - |
| P6 I.5 | Semiotika artefak: tanpa kartun "orang berpikir"/otak generik di Frame 0 | `2-visual:71`; `AGENTS.md:§2` Visual; `7-selera:110` (#73) | ADA | - |
| P6 I.5 | Kode warna: biru/hijau arsip `#2F4F4A` (sistem), merah `#B3261E` (ancaman), kuning stabilo (bukti) | `2-visual:72,101`; `AGENTS.md:§2` Visual | ADA | - |
| P6 I.5 | Guardrail #004-#008 (<= 5-6 layer, `y <= 1180` masuk dari samping, kutipan layar 100% Indonesia, caption self-contained, tanpa kotak putih `bk.doc(shape=)`) | `2-visual:66,73`; `7-selera:101-103` (#65-#67), #61 | ADA | - |
| P6 I.0 | Template prompt Flow `kit/collage/template/flow_prompt_template.md` | berkas ada; `1 variation each` (baris 11); `7-selera` #64 | ADA | - |

### 2.3 Audio / VO
| Dokumen/bagian | Spesifikasi | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| S5 §2.2 | Tight Audio Tail <= 0,15 dtk (pangkas hening < -45 dB, tanpa fade panjang) di `vo_chain.py` | `3-audio:74-78`; `kit/audio/vo_chain.py:42`; `kit/audio/vo_tail.py:2-4` (ambang -45 dBFS); `AGENTS.md:§2,§5` | ADA | - |
| S5 §3 peta | Pertahankan Audio QA gate (margin VO, kata < 8 dB, Whisper) | `AGENTS.md:§4.2`; `make_kolase.sh:4` | ADA | - |
| S5 §4 | Tempo 2,60-2,75 kata/dtk | `1-cerita` §M1 (2,50-2,66) | DIGANTIKAN | - |
| P6 I.4 | Tempo 2,50-2,66, atempo <= 1,10 | `1-cerita` §M1; `new_episode.sh:94`; `kit/audio/vo_tighten.py:13`; tetapi `3-audio:51` dan `SKILL.md:46,108` masih 2,6-2,7 | BERTENTANGAN | B4: samakan teks |
| P6 II.2 | VO ElevenLabs dual-mode: paket `vo_prompt_elevenlabs.md` + `kit/audio/tts_elevenlabs.py` (`ELEVENLABS_API_KEY` di `.env`) | `AGENTS.md:§5` (konektor = jalur utama v7.0; skrip = cadangan); `3-audio:83`; `kit/audio/tts_elevenlabs.py:4`; `doctor.py:62` | ADA | - |
| P6 II.2 / v7.0 | VO 1 take lewat konektor, ulang hanya atas persetujuan | `AGENTS.md:§3,§5`; `3-audio:83` vs `1-cerita:134`, `3-audio:72`, `SKILL.md:46` ("2 take") | BERTENTANGAN | B3: tandai "2 take" sebagai riwayat |

### 2.4 Upload / metadata / monetisasi
| Dokumen/bagian | Spesifikasi | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| P6 I.6 | Thumbnail wajib `make_cover.py` + `cover.json` 1080x1920 | `5-upload:43,63`; `AGENTS.md:§5`; `7-selera:105` (#68) | ADA | - |
| P6 I.6 / II.2 | Frame cadangan `cover_frame_<t>s.jpg` | `5-upload:64` | ADA | - |
| P6 I.6 | Komentar pin: meluruskan salah baca + 1 pertanyaan | `5-upload:66`; `7-selera:105` (#68); kerangka `new_episode.sh` (UPLOAD.md bagian 5) | ADA | - |
| P6 I.6 / II.2 | `UPLOAD_<no>_<slug>.txt` mentah UTF-8, tanpa konversi Google Doc (emoji 4-byte) | `5-upload:65`; `AGENTS.md:§5`; `kit/tools/pack_upload.py` | ADA | - |
| P6 II.2 | Folder `stories/<slug>/upload_pack/` (mp4 `ARSIP_<no>_<slug>_v<N>`, `thumbnail_<slug>_1080x1920.jpg`, frame cadangan, txt) | `5-upload:62-65`; `pack_upload.py:1-5`; `.gitignore` (`upload_pack/`) | ADA | - |
| P6 I.1 | Tahap 2: 1.000 sub + 10 juta engaged views; YPP berlipat 1 Feb 2027 (20 juta / 8.000 jam) | `KEPUTUSAN_RISET.md:46`; `RISET_NICHE_V2.md:41` (⚠ "8.000 jam" belum diverifikasi) | ADA | Verifikasi ke YouTube Help sebelum jadi dasar target |
| P6 I.1 | Tahap 3: long-form 8-15 menit, klaster 3-4 episode, Shorts dipangkas 1-5/bulan, Related Video | `KEPUTUSAN_RISET.md:47`; `AGENTS.md:§2` (klaster 4-5, tanpa "1-5/bulan") | ADA | - (selisih kecil dengan AGENTS, lihat temuan kecil) |
| P6 I.1 | Tahap 4: takarir Inggris `.srt`, produk sendiri | `KEPUTUSAN_RISET.md:48` | ADA | - |
| P6 I.1 | Metrik target: stayed >= 75% (min 65%), APV 95-105%, evaluasi >= 48 jam | `KEPUTUSAN_RISET.md:35-37`; `AGENTS.md:§2` Metrik | ADA | - |
| P6 I.1 | Replay tidak dihitung engaged views; aman dari Inauthentic Content (15 Jul 2025) / label sintetis (27 Mei 2026) | `KEPUTUSAN_RISET.md:38-39` (⚠ klaim blueprint) | ADA | Verifikasi ke sumber resmi |
| P6 I.6 | `6-pelajaran`: metrik #001-#005 + keputusan migrasi v6.0 | `6-pelajaran:90-98` (#001 1.525/70,56/72,77 ... #004 7.346/79,18/104,12; #005 1.500/64,6) | ADA | - |

### 2.5 Proses / protokol batch / portabilitas
| Dokumen/bagian | Spesifikasi | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| S5 §3 peta | Surgical merge ke berkas kanonik: RUMUS, 8-hook, 1-cerita, 3-audio, 7-selera, SKILL/AGENTS | `RUMUS_PEMILIHAN.md:33`; `8-hook:56`; `1-cerita:77`; `3-audio:74`; `7-selera:86` (#50, karena #43-#49 sudah terpakai); `AGENTS.md`, `SKILL.md` | ADA | - |
| S5 §3 | Hapus aturan lama "grammatical loop" (kalimat menggantung) | `1-cerita:117` (dicabut 14 Nov 2026) | ADA | - |
| S5 §2.3 | Kerangka README `new_episode.sh` (validasi topik, POV, fact sheet, celah hukum, 3-titik, paket final) | `kit/tools/new_episode.sh:47-110` (kini v7.0) | ADA | - |
| P6 I.6 | Kerangka README memuat Mesin, Mode, Status Replikasi, Anatomi, POV, Fact Sheet, 3-titik, AV 2 kolom, Scorecard | `new_episode.sh:47-51,53,~60-110` | ADA | - |
| P6 I.6 | Seragamkan versi di `SKILL.md` dan `new_episode.sh` | `new_episode.sh` = v7.0; `SKILL.md` badan = v7.0 tetapi `SKILL.md:3` = "v6.1 (3 Mesin ...)" | BERTENTANGAN | B1: perbarui `description` |
| P6 III / v7.0 | Riset per batch (6 kandidat -> 4) tanpa Hibrida/Gemini | `AGENTS.md:§2,§3` vs `SKILL.md:44` (langkah 1a "8-10 judul"; langkah 2 "paket dari user + Gemini"; blok Mode Batch "4 fact sheet paralel") | BERTENTANGAN | B5: revisi SKILL.md |
| P6 I.6 | `7-selera` poin #69-#75 (keputusan v6.0), tanpa menimpa #1-#68 | `7-selera:106-112` | ADA | - |
| P6 I.6 | `6-pelajaran` mencatat keputusan migrasi v6.0 | `6-pelajaran:98` | ADA | - |
| P6 II.1 | `AGENTS.md` = konstitusi model-agnostic (urutan baca, ringkasan aturan, QA, matriks pengganti) | `AGENTS.md:§1-§7` | ADA | - |
| P6 II.1 | Adaptor tipis `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.github/copilot-instructions.md` | semuanya ada dan menunjuk ke AGENTS.md | ADA | - |
| P6 II.1 | Adaptor tidak memuat klaim usang | `.cursorrules:1`, `copilot-instructions.md:2` menyebut "protokol hibrida" | BERTENTANGAN | B6: perbarui frasa |
| P6 II.2 | Review storyboard lokal-pertama (HTML mandiri, revisi via chat/`note`) | `AGENTS.md:§5`; `kit/tools/storyboard_page/make_page.py`; `storyboard_sheet.py` (default sejak #013) | ADA | - |
| P6 II.2 | Routing tanpa subagen: berurutan + checklist gerbang per tahap | `AGENTS.md:§6` | ADA | - |
| P6 II.2 / CLAUDE.md | Pemilihan model/effort subagen | `AGENTS.md:§6` (Claude yang memilih) vs `SKILL.md:25-26` (user mengatur `/effort`) | BERTENTANGAN | B2: revisi SKILL.md |
| P6 II.3 | `kit/tools/doctor.py` (stdlib; python, node, ffmpeg, fluidsynth, soundfont, paket, Playwright, symlink; perintah perbaikan) | `kit/tools/doctor.py:3,33-62` | ADA | - |
| P6 II.3 | `links.sh` aman dijalankan berulang | `kit/tools/links.sh:11-24` (symlink sehat dilewati, direktori asing tidak disentuh) | ADA | - |
| P6 II.3 | `.env.example` dan `.gitignore` bersih (`raw/ parts/ *.wav .env .venv/ node_modules/`) | `.env.example`; `.gitignore` (semua ada) | ADA | - |
| P6 III.1 | Mode Hibrida #009-#012: riset/skrip oleh user + Gemini, agen tidak meriset sendiri | `AGENTS.md:§3` (dibatalkan 17 Nov); `7-selera:111` (#74 DIBATALKAN), #76; `6-pelajaran:99` | DIGANTIKAN | - |
| P6 III (dicatat di CLAUDE/AGENTS/SKILL/6-pelajaran) | Catat protokol Hibrida di empat berkas | keempatnya mencatat sebagai dibatalkan / Jalur Paket Gemini v7.0 | DIGANTIKAN | - |
| P6 III.2 | Batch #013+ otomasi + gold standard di `research/gold_standard/` | `AGENTS.md:§3` bullet Otomasi; `research/gold_standard/README.md` (folder kosong by design; teks README masih "batch hibrida") | ADA | Perbarui README gold_standard (temuan kecil) |
| P6 III (terpotong) | Langkah Tahap Produksi Teknis setelah paket skrip diterima (`new_episode.sh` -> `vo_prompt_eleven...`) | berkas P6 terpotong; padanan: `AGENTS.md:§3` Jalur Paket Gemini (1)-(3) | DIGANTIKAN | Catat bahwa berkas P6 tidak lengkap (sudah di catatan atas) |
| `research/deep_research/README.md` | Matriks jejak `MATRIKS_JEJAK.md` | tidak ada berkas | HILANG | H2 |
