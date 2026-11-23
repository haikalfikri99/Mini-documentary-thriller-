# Matriks kelengkapan: Strategi_Kanal_Psikologi_Perilaku_YouTube.md -> repo (audit read-only, 23 Nov 2026)

Dokumen sumber: `research/deep_research/Strategi_Kanal_Psikologi_Perilaku_YouTube.md` (bab 1-6). Aturan resolusi: Formula ARSIP v7.0 (`AGENTS.md` §2/§2A, `1-cerita` §M9, `8-hook` §J) menang atas v6.x dan aturan lama; bab 5 (bank topik psikologi sebagai pintu masuk) = DIGANTIKAN 2 Mesin v7.0; angka YPP/RPM belum terverifikasi ditandai ⚠.
Singkatan berkas: `AGENTS`=AGENTS.md · `SKILL`=.claude/skills/arsip-kasus/SKILL.md · `1-cerita`/`2-visual`/`3-audio`/`5-upload`/`6-pelajaran`/`7-selera`/`8-hook`/`9-playbook` = `.claude/skills/arsip-kasus/references/<n>-*.md` · `KEP`=research/niche/KEPUTUSAN_RISET.md · `ANAL`=research/niche/ANALISIS_PASAR_2026-11.md · `NV2`=research/niche/RISET_NICHE_V2.md · `RUMUS`=research/niche/topik/RUMUS_PEMILIHAN.md · `lint`=kit/tools/lint_episode.py · `newep`=kit/tools/new_episode.sh. Nomor setelah titik dua = baris.

## 1. Ringkasan

Total 77 baris temuan (hitungan per status di bagian 3).

### 1a. BERTENTANGAN (repo bertentangan, bukan karena v7.0) + usulan tindakan
- **B-1 RPM Indonesia Shorts (G9):** `ANAL:8` dan `9-playbook:19` menulis ±US$0,012/1.000 (atribusi AIR Media-Tech), sedangkan `KEP:47` menulis ~US$0,14 dan dokumen riset menulis $0,14 (Dynamoi, bukan tarif resmi) vs AIR $0,15-0,33. Selisih ±12x dan atribusi sumber berbeda. Tindakan: seragamkan ke satu angka berlabel ⚠ sumber (Dynamoi $0,14, atau AIR bila terbukti), jangan jadi dasar uang.
- **B-2 Strategi share (E1):** dokumen riset menyuruh merancang pemicu share zero-CTA (WhatsApp Indonesia); `ANAL:7` menyimpulkan "Share tidak bisa diandalkan" (share 95% lebih rendah, Dynamoi ⚠) dan mengalihkan ke komentar. Tindakan: ukur share rate kanal sendiri dari Studio (`6-pelajaran`), tulis keputusan di `9-playbook`/`ANAL`, pertahankan zero-CTA.
- **B-3 Frekuensi unggah (G10c):** dokumen riset Fase 1 = 3-4 Shorts/minggu lalu 1-5/bulan setelah long-form; `SKILL:24`, `7-selera:38`, `KEP:49` = 1 video/hari (keputusan user lama #13, bukan v7.0). Tindakan: tanyakan user apakah 1/hari tetap sampai Tahap 2 (catatan jujur `KEP:49` sudah ada), tulis di `KEP` v7.0 bagian monetisasi.

### 1b. HILANG (temuan penting tak ada di repo) + usulan tindakan 1 baris
- **H-1 Berger-Milkman (E2, E5):** tak ada dasar arousal tinggi (awe/marah/cemas > sedih) untuk pemilihan topik dan arah emosi; tambahkan 1 baris di `1-cerita` §F1 (tabel bukti, baris ±82-92) dan kriteria Stress-Test di `RUMUS`/`9-playbook`.
- **H-2 Definisi view 2025-2026 (A5):** repo hanya punya "replay dihitung view sejak 31 Mar 2025" (`1-cerita:92`); pemisahan view vs Engaged views dan perluasan 24 Agu 2026 tidak ada; tambahkan di `KEP` v6.0-C dengan ⚠ verifikasi Help.
- **H-3 Jendela daftar YPP (G6):** peninjauan ±1 bulan, jendela efektif ±2,5 bulan sebelum 1 Feb 2027; belum ada tenggat operasional di `KEP:46`/`AGENTS:22`; tambahkan tanggal batas daftar (⚠ verifikasi Help).
- **H-4 Test & Compare thumbnail (G20):** `5-upload:41` hanya mencatat "belum mendukung Shorts"; rencana uji 3 thumbnail untuk long-form (Fase 4) tak ada; tambahkan ke `KEP:48`.
- **H-5 Tes aktif & dilema pilihan sebagai hook (C6):** pre-test miskonsepsi, paksa pilih dalam 2 detik, risky-choice framing tak ada di K1-K5; tambahkan sebagai varian opsional K2/K4 di `8-hook` §H tanpa menambah arketipe (linter `lint:23` mengunci 5).
- **H-6 Bukti AIR within-channel (G10b):** penurunan RPM Entertainment 4,99 -> 1,15 pada 21+ Shorts/bulan dan pertumbuhan subscriber kanal Education 3,3x lebih buruk; tak ada di repo; tambahkan ke `KEP:47` (⚠ kausalitas belum terbukti).
- **H-7 Audit penurunan retensi >= 4% (D5):** tak ada; tambahkan satu aturan di `1-cerita` §L dan tabel `6-pelajaran`.
- **H-8 Bukti replikasi efek kokoh (F4):** Ruggeri 2020 (framing 16/17), Schley 2023 (anchoring), Many Labs 1/2 dan OSC 2015 tak ada; tambahkan ke `RUMUS` bagian Filter Replikasi sebagai bukti awal baris "Status replikasi".
- **H-9 Lain (prioritas rendah):** persyaratan aktivitas kanal YPP (G5), Premium Lite 60%/mid-roll >= 8 menit/55% iklan (G7), RPM Indonesia 0,15-0,30x AS + musiman Q4 (G11), data WhatsApp Indonesia (E4), Li & Shi 2026 (C5), cek otomatis kata pengendali di linter (C4b).

### 1c. Catatan konsistensi internal repo (bukan temuan dokumen, tetapi memengaruhi uang)
- 8.000 jam: `NV2:41` menyebut "resmi, Help 12843009" tetapi `KEP:46` menandainya ⚠ belum diverifikasi. Verifikasi ke Help YouTube lalu samakan.
- Tanggal Inauthentic Content: dokumen 15 Jul 2025; `NV2:43` "Jul 2025, penegakan Jan 2026"; `ANAL:9` "sejak Des 2025 ⚠". Samakan.
- Klaster long-form: `KEP:47` 3-4 episode vs `AGENTS:22`/`9-playbook` 4-5 episode; v7.0 (4-5) menang, `KEP:47` belum ditandai.
- `RUMUS:67` masih berlabel "prioritas produksi" untuk 5 kategori taksonomi, padahal bagian v6.0-nya SUPERSEDED v7.0 (header `RUMUS:58` hanya menyebut 3 Mesin/Jembatan/Stress-Test). Tambahkan tag `[SUPERSEDED by v7.0]` pada baris itu.

## 2. Tabel pemetaan

Status: ADA · HILANG · BERTENTANGAN · DIGANTIKAN. ⚠ = angka/klaim belum diverifikasi ke sumber primer.

### 2A. Algoritma Shorts (bab 1)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| A1 | 1 | Rekomendasi pull-based (Beaupré): kandidat disaring tiap app dibuka, bukan didorong ke audiens acak | `KEP:35` | ADA | - |
| A2 | 1 | Tidak ada penalty box; tiap video dinilai mandiri | `KEP:35`; `AGENTS:21` ("jangan mengubah formula dari satu video"); `7-selera` #51 | ADA | - |
| A3 | 1 | Jangan menilai dalam jam; video bisa menemukan audiens berminggu-minggu kemudian | `AGENTS:21` (>= 48 jam); `KEP:35` | ADA | Nuansa "berminggu-minggu" tidak ada; opsional tambah 1 klausa di `AGENTS:21` |
| A4 | 1 | Seed Audience Testing bergelombang: kelompok perintis dulu, lalu audiens dingin/beranda/pencarian/video terkait | `KEP:35` (nama istilah saja) | ADA | Mekanisme gelombang tak dijelaskan; tak perlu |
| A5 | 1 | Definisi view: sejak 31 Mar 2025 (Shorts), 24 Agu 2026 (semua format) view = putar mulai tanpa syarat waktu; "bertahan" dipisah ke Engaged views | `1-cerita:92` (hanya "replay dihitung view sejak 31 Mar 2025") | HILANG | Tambah di `KEP` v6.0-C: view != engaged view; perluasan 24 Agu 2026 ⚠ verifikasi Help |
| A6 | 1 | Engaged views = dasar kelayakan YPP dan bagi hasil Shorts | `KEP:45-46` (target "engaged views"); `AGENTS:22`; `KEP:15` (⚠) | ADA ⚠ | Verifikasi ke Help sebelum jadi dasar uang |
| A7 | 1 | Filter pencarian Shorts 2026: kata kunci judul/deskripsi relevan kembali | `5-upload:71` (deskripsi kaya kata kunci "pencarian Shorts 2026"); `lint:128` (deskripsi 2-3 kalimat) | ADA | - |
| A8 | 1 | Corong 4 tahap: Shown in feed -> Stayed to watch -> Engaged views -> APV/AVD | `AGENTS:21`; `KEP:36-37` (2 gerbang); `1-cerita:201` (§L) | ADA | "Shown in feed" tak disebut (minor) |
| A9 | 1 | Tolok ukur: stayed 60-79% baik, >= 80% breakout; APV baik 60-90% | `AGENTS:21` (target >= 75%, min 65%, APV 95-105%); `KEP:36-37`; `1-cerita:90` (Galloway 2023) | ADA | Angka repo lebih ketat dan berbasis data kanal; bukan pertentangan |
| A10 | 1 | Ketimpangan stayed rendah (31,9%) + APV tinggi (260%) tetap menahan distribusi; gerbang stayed duluan | `KEP:36-37`; `AGENTS:9` (#010 kasus kebalikan); `6-pelajaran:36,62` | ADA | - |
| A11 | 1 | APV > 100% karena replay; replay tidak menambah engaged views | `KEP:38` (⚠ klaim blueprint) | ADA ⚠ | Verifikasi Help |
| A12 | 1 | Agensi: tunggu 48 jam sebelum menilai | `AGENTS:21`; `KEP:35`; `SKILL:54` | ADA | - |
| A13 | 1 | Studi kasus kanal (Vsauce/Aperture/Pursuit of Wonder/Satu Persen/Kok Bisa tak punya data skrip/retensi terverifikasi; dibatasi fakta format) | `ANAL:4`; `9-playbook:14-16`; `KEP:18` (konvensi ⚠) | ADA | - |

### 2B. Kebijakan Inauthentic Content + label sintetis (bab 1)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| B1 | 1 | Inauthentic Content 15 Jul 2025 menarget produksi massal bertemplat tanpa keputusan editorial | `KEP:39`; `NV2:43`; `RISET_SELINGAN:128` | ADA ⚠ | Tanggal tak seragam (`NV2:43` penegakan Jan 2026; `ANAL:9` Des 2025); samakan ke Help |
| B2 | 1 | Faceless tetap sah bila sudut spesifik, skrip riset orisinal, variasi visual mengikuti cerita | `KEP:39`; `AGENTS:20` (rotasi latar); `lint` ([LATAR] tak 3 berturut); `2-visual` §O | ADA | - |
| B3 | 1 | Trivia "Top 10 Fakta #347" + suara sintetis + stok video pasif gagal kurasi | `AGENTS:12,20,23` (tanpa stock footage/video AI; Garis Merah) | ADA | - |
| B4 | 1 | Wajib label konten sintetis bila media fotorealistis menyerupai tokoh/peristiwa nyata | `AGENTS:23` (label = Ya); `5-upload:73`; `newep:144` | ADA | - |
| B5 | 1 | Sejak 27 Mei 2026 YouTube memberi label otomatis untuk fotorealistis tak diungkap | `KEP:39` (27 Mei 2026, ⚠) | ADA ⚠ | Verifikasi Help |
| B6 | 1 | Suara AI sah selama skrip riset orisinal dan visual tidak berulang | `ANAL:9` (⚠) | ADA ⚠ | - |

### 2C. Rekayasa hook kognitif (bab 2)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| C1 | 2 | Jendela putus 1-2 dtk; kunci perhatian sampai detik 4 | `AGENTS:16` (H1 <= 4,0 dtk, <= 14 kata, penguncian 3-titik); `8-hook` §G/§J; `1-cerita:157` (F7) | ADA | - |
| C2 | 2 | RPE: pembuka yang sama dengan dugaan = error ~0; benturkan intuisi vs eksperimen | `8-hook:79` (K2 Ketidaknyamanan Kontra-Intuitif, RPE); `AGENTS:16` | ADA | - |
| C3 | 2 | Information-Gap (Loewenstein 1994): petunjuk konkret, bukan pertanyaan generik | `1-cerita:86` (F1); `8-hook:81` (K4); `RUMUS:71` (celah 33-67%); `AGENTS:16` (larang "?" dan "kenapa") | ADA | - |
| C4 | 2 | Reaktansi Brehm: bahasa pengendali memicu penolakan; arahkan ancaman otonomi ke sistem eksternal | `8-hook:78` (K1 tanpa kata pengendali, ancaman sistem eksternal); `AGENTS:12` (Garis Merah 1); `RUMUS:67` | ADA | - |
| C4b | 2 | (turunan) larangan kata pengendali ke penonton perlu penegakan | `lint` tidak punya cek "harus/wajib/jangan pernah" di VO (grep: hanya cek deskripsi/pin) | HILANG | Tambah peringatan di `lint_episode.py` (hanya atas persetujuan user; di luar lingkup audit) |
| C5 | 2 | Li & Shi 2026 (r = 0,20; r = -0,23): "psikologi terbalik" mentah merusak kepercayaan | tak ada angka; prinsip ada di `8-hook:78` | HILANG | Rendah; tambah 1 klausa di `8-hook` K1 (⚠ ringkasan sekunder) |
| C6 | 2 | Tes aktif & dilema pilihan: paksa jawab dalam 2 dtk, pre-test miskonsepsi (Muller), risky-choice framing (Tversky-Kahneman) | tidak ada di K1-K5 (`8-hook:76-84`) atau `AGENTS:16`; "Dilema Abu-Abu" hanya arketipe penutup (`1-cerita:225`) | HILANG | Tambah sebagai varian opsional K2/K4 di `8-hook` §H; jangan tambah arketipe ke-6 (linter `lint:23` mengunci 5) |
| C7 | 2 | Eksperimen Muller (6/26 -> 6,3/26) dan Legitbait: bongkar miskonsepsi dulu | `8-hook:79` (Veritasium); `RUMUS:67` (Legitbait) | ADA | Angka eksperimen tak perlu |
| C8 | 2 | Tabel hook lemah vs kuat + arahan visual 0-4 dtk (grafik skor, roda angka, "HARUS" terbakar, kartu untung/rugi) | `2-visual:6-7` (§A Frame 0 benda pahlawan); `AGENTS:20`; `8-hook` §B contoh H-A..H-E | ADA | Contoh spesifik dokumen tak dipakai; prinsip sama |
| C9 | 2 | Contoh hook kuat berupa kalimat panjang 30+ kata dengan "jika... malah..." | v7.0: H1 <= 14 kata, dilarang "tapi/padahal/kenapa/?" (`AGENTS:16`; `8-hook` §J.1) | DIGANTIKAN | v7.0: pakai H1 pendek; jangan salin contoh dokumen |

### 2D. Arsitektur cerita (bab 3)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| D1 | 3 | Antagonis non-kriminal = mekanisme tak kasatmata (arsitektur pilihan, framing, desain lingkungan) | `1-cerita:214` (M2); `AGENTS:13` (3 Pilar Konflik), `AGENTS:26` | ADA | - |
| D2 | 3 | Anggaran kata: 150 wpm (2,5 kata/dtk), 45-55 dtk = 112,5-137,5 kata, target 100-125 kata | `1-cerita:208-212` (M1: Ringkas 85-105 / Investigasi 115-135); `AGENTS:17`; `lint:154-158`; `3-audio:51` (2,6-2,7 kata/dtk) | DIGANTIKAN | v7.0 dua mode menang; tak ada tindakan |
| D3 | 3 | Struktur 5 babak (00-04 cold open, 04-15 taruhan, 15-28 rehook 1, 28-42 rehook 2/twist, 42-52 resolusi) | `1-cerita:106-116` (F3 6 segmen, ditandai SUPERSEDED), `:247` (M8.2 tangga bukti), `:214` (Pledge-Turn-Prestige) | ADA | Pemotongan detik berbeda tetapi setara |
| D4 | 3 | Micro-rehook tiap 12-15 dtk berupa perubahan tingkat bukti, bukan transisi grafis kosong | `1-cerita:218` (M3), `:247` (M8.2); `AGENTS:17,26` | ADA | - |
| D5 | 3 | Audit tiap penurunan kurva retensi >= 4% | grep "4%/turun grafik" nihil; `1-cerita:201` (§L) hanya diagnosis umum | HILANG | Tambah aturan di §L dan kolom catatan `6-pelajaran` |
| D6 | 3 | Hening total 0,5-1 dtk sebelum kalimat kunci twist | `1-cerita:218,223` (`//` ~0,6 dtk; hening 0,5-0,8), `:248`; `AGENTS:17` | ADA | - |
| D7 | 3 | Conceptual loop: detail Frame 0 terungkap di detik ~45-52, bukan memotong kalimat | `1-cerita:249` (M8.1 `[LOOP: ... @detik]`); `2-visual:92-94` (§N); `AGENTS:26`; `3-audio:75`; `lint` ([LOOP]) | ADA | - |
| D8 | 3 | Cold open 4-6 bingkai arsip cepat, teks 1-3 kata kapital, SFX klik | `2-visual:5-9` (§A), `:37` (caption 1-3 kata); `4-standar:6`; `3-audio:22` | ADA | - |
| D9 | 3 | Kode warna: merah = ancaman, biru = sistem/teknologi, kuning = sorotan | `AGENTS:20`; `2-visual:72` | ADA | - |
| D10 | 3 | Model 3D/figur tanpa raut wajah ala Fern/Vox | `KEP:105` (3D dan 2D RIG dihapus; gaya ARSIP Kolase); `CLAUDE.md` | DIGANTIKAN | Gaya kolase dikunci user (13 Nov 2026) |
| D11 | 3 | Kalimat pendek + eksposisi, tipografi kinetik, sound design | `AGENTS:17`; `2-visual:37`; `3-audio` | ADA | - |

### 2E. Viralitas dan share zero-CTA (bab 4)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| E1 | 4 | Share = sinyal berharga; rancang pemicu share zero-CTA di WhatsApp Indonesia | zero-CTA ada (`AGENTS:17`); tetapi `ANAL:7` ("share 95% lebih rendah... Share tidak bisa diandalkan") | BERTENTANGAN | Lihat B-2: ukur share kanal sendiri, putuskan, tulis di `9-playbook` |
| E2 | 4 | Berger & Milkman 2012: arousal fisiologis tinggi (awe, marah, cemas) > rendah (sedih) menentukan viral | grep Berger/Milkman/arousal/awe nihil | HILANG | Tambah 1 baris di `1-cerita` §F1 + kriteria emosi di `RUMUS` Stress-Test |
| E3 | 4 | Presentasi diri dan kegunaan praktis mendorong berbagi (Berger 2011) | padanan operasional: Tes Objek Harian & Grup WA `7-selera:125` (#86), `RUMUS:90`, `AGENTS:13` | ADA | Dasar teori tak tertulis; opsional |
| E4 | 4 | Data WhatsApp Indonesia (61,8% penetrasi, 112 juta pengguna, Wahyuti & Sudarmanti 2025, narasi preventif, 53 misinformasi/1 bantahan, Astria & Kuntari 2026, Prihantoro 2022) | grep nihil | HILANG | Rendah; 1 baris konteks di `9-playbook` (⚠ belum primer) |
| E5 | 4 | Formula zero-CTA 1: awe kognitif yang memicu presentasi diri (ilusi/anomali berpikir) | tak ada | HILANG | Gabung dengan H-1 (E2) |
| E6 | 4 | Formula zero-CTA 2: kecemasan konstruktif protektif, salahkan rekayasa eksternal agar diteruskan ke orang tua/pasangan | `1-cerita:251` (nol menyalahkan penonton); `8-hook:78` (K1); `AGENTS:12` | ADA | Kerangka "forward ke keluarga" tak eksplisit |
| E7 | 4 | Formula zero-CTA 3: mudah dicerna, tanpa jargon, terbaca dari pratinjau WhatsApp | `7-selera:94` (#58 bahasa sehari-hari), `AGENTS:17`, `lint:36` (kata kaku), `7-selera:125` (#86) | ADA | - |

### 2F. Krisis replikasi dan daftar hitam topik (bab 5)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| F1 | 5 | OSC 2015 (25%/50%), Many Labs 1/2 (14 efek 50%, d 0,60 -> 0,15, dst.) | grep nihil (hanya implikasi) | HILANG | Rendah; 1 baris latar di `RUMUS` Filter Replikasi (⚠) |
| F2 | 5 | Daftar hitam mutlak: power posing, ego depletion, priming, pen-in-mouth, Bem, SPE, marshmallow | `AGENTS:12`; `RUMUS:66`; `7-selera:107` (#70); `1-cerita:230` | ADA | Detail Carney 2016/23 lab tak ada (minor) |
| F3 | 5 | Setiap topik berbasis studi wajib punya "Status replikasi" sebelum fact sheet | `newep:51`; `RUMUS:64-68`; `1-cerita:230` (#17); `AGENTS:13` | ADA | Tidak dicek `lint_episode.py` (hanya README manual) |
| F4 | 5 | Efek kokoh dengan bukti: Prospect Theory/framing (Ruggeri 2020, 16/17), anchoring (Schley 2023), reaktansi, default effect berkontribusi terbatas | nama efek di `RUMUS:67`; tanpa Ruggeri/Schley/angka | HILANG | Isi bukti awal di `RUMUS` agar verifikasi "Status replikasi" lebih cepat |
| F5 | 5 | Taksonomi 5 kategori topik sebagai pintu masuk/prioritas produksi | `RUMUS:67` (tanpa tag SUPERSEDED); v7.0 2 Mesin `AGENTS:11` | DIGANTIKAN | Tambah `[SUPERSEDED by v7.0]` di `RUMUS:67` (kategori 1/2/4 hanya bahan B3/B4) |
| F6 | 5 | Kategori 5: bedah forensik runtuhnya power posing/ego depletion/SPE sebagai konten | `AGENTS:12` Garis Merah (2) bantahan mitos datar dan (3) studi Daftar Hitam dilarang | DIGANTIKAN | SPE hanya bila kritik jadi inti cerita (`RUMUS:66`) |
| F7 | 5 | Keamanan topik: pintu masuk tetap benda/harga konkret | `AGENTS:16`; `8-hook` §H (Kuda Troya); `KEP:31` | ADA | - |

### 2G. YPP, monetisasi, roadmap (bab 6)
| ID | Bab | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| G1 | 6 | Tier awal: 500 sub + 3.000 jam / 3 jt Shorts (90 hari), tak berubah 1 Feb 2027 | `KEP:45`, `:93`; `NV2:41` | ADA ⚠ | `KEP:45` ⚠; `NV2:41` menulis resmi; verifikasi Help |
| G2 | 6 | YPP penuh 1.000 sub + 4.000 jam / 10 jt -> 8.000 jam / 20 jt per 1 Feb 2027 | `KEP:46`, `:93-94` (20 jt); `NV2:41` (8.000 jam, "resmi Help 12843009") | ADA ⚠ | Inkonsisten: `KEP:46` menandai 8.000 jam ⚠ belum diverifikasi; verifikasi lalu samakan |
| G3 | 6 | Jam tayang Shorts dari feed tidak dihitung ke kuota jam; sprint 10 jt engaged views jalur tercepat | `NV2:41`; `KEP:46` | ADA | - |
| G4 | 6 | Creator Pool 45%; harus jaga 10 jt/90 hari untuk bagi hasil Shorts (YPP long-form tetap aman) | `NV2:42` (45%); `KEP:46` ("partner aktif menjaga 10 juta/90 hari") | ADA ⚠ | Klausa "jika turun, YPP tetap aman" tak ada (minor) |
| G5 | 6 | Syarat aktivitas kanal YPP (1.000 jam, atau 1 jt Shorts views, atau 2 video panjang/5 Shorts per 90 hari; pemulihan) | grep nihil | HILANG | Rendah-sedang; 1 baris di `KEP` v6.0-D ⚠ |
| G6 | 6 | Peninjauan YPP ±1 bulan -> jendela efektif ±2,5 bulan sampai Jan 2027 | grep nihil; `KEP:46` hanya "sebelum 31 Jan 2027" | HILANG | Tambah tenggat daftar operasional (⚠ verifikasi apakah ambang dihitung saat daftar atau tinjau) |
| G7 | 6 | Pendapatan: 55% iklan long-form, mid-roll >= 8 menit, Premium Lite 60% | grep nihil | HILANG | Rendah ⚠; 1 baris di `KEP:47` |
| G8 | 6 | AIR: RPM Shorts 3-14% RPM long-form (butuh 11.000-34.000 views Shorts = 1.000 long-form) | `KEP:47` ("7x-30x", ⚠ angka blueprint) | ADA ⚠ | Setara secara ordo; angka AIR persis tak ada |
| G9 | 6 | RPM Indonesia: Dynamoi $0,14 vs AS $5,12 (bukan tarif resmi) | `KEP:47` (~US$0,14); `ANAL:8` dan `9-playbook:19` (±US$0,012, AIR) | BERTENTANGAN | Lihat B-1 |
| G10a | 6 | Setelah long-form berjalan, pangkas Shorts ke 1-5/bulan (sweet spot AIR) | `KEP:47` | ADA | - |
| G10b | 6 | Bukti AIR: Entertainment RPM 4,99 -> 1,15 pada 21+ Shorts/bulan (-77%, kausal belum terbukti); Education beralih ke Shorts subscriber 3,3x lebih buruk | grep nihil | HILANG | Tambah ke `KEP:47` (⚠) |
| G10c | 6 | Fase 1: 3-4 Shorts/minggu | `SKILL:24`, `7-selera:38`, `KEP:49` = 1 video/hari | BERTENTANGAN | Lihat B-3 (keputusan user lama, bukan v7.0) |
| G11 | 6 | Learning Revolution: Indonesia 0,15-0,30x tarif AS; dokumenter Asia $1-2,50 RPM; musiman Q4 +30-40%/Q1 -20-25%; Education $14,97-18,23 | `ANAL:8` hanya "Rp10.000-20.000 RPM long-form bisnis/keuangan" (AksesDigital) | HILANG | Rendah ⚠; opsional |
| G12 | 6 | Fase 1: 500 sub + 3 jt views dalam 45-60 hari; daftar Shopping Affiliate | `KEP:45`; `AGENTS:22` | ADA ⚠ | - |
| G13 | 6 | Afiliasi turun ke 500 sub sejak Mar 2026 (bukan kanal musik/anak), mitra Shopee, Lazada, Blibli, Zalora | `KEP:45` (4 mitra); `ANAL:8` (500 sub akhir Mar 2026; Made for Kids dilarang) | ADA ⚠ | Verifikasi Help |
| G14 | 6 | Komisi Shopee 4% non-elektronik, 1% elektronik, Komisi XTRA; 1-5% lintas lokapasar | `ANAL:8` (1% s.d. 4-5%); XTRA tak ada | ADA ⚠ | XTRA minor |
| G15 | 6 | Maks 3 tag produk; produk buku ekonomi perilaku/jurnal keputusan/game strategi dibahas organik | `KEP:45`; `AGENTS:13,22`; `7-selera:133` (#94) | ADA | - |
| G16 | 6 | Fase 2: 1.000 sub + 10 jt engaged sebelum 31 Jan 2027, topik high-arousal dan miskonsepsi | `KEP:46`; `KEP:94` (hitung 222 rb views/hari); "high-arousal" tak ada (lihat E2) | ADA ⚠ | Pantau kelayakan (`KEP:94`; `NV2:41` menilai tak realistis tanpa viral) |
| G17 | 6 | Fase 3: long-form 8-15 menit, Shorts jadi cuplikan, Related Video, judul seragam, end screen, playlist "Start Here" | `KEP:47` (klaster, Related Video); `AGENTS:22`; `9-playbook:19,48`; `6-pelajaran:111` | ADA | End screen/playlist/judul seragam tak ada; samakan 3-4 vs 4-5 episode (v7.0 = 4-5) |
| G18 | 6 | Fase 4: takarir .srt Inggris bersih + metadata adaptasi untuk AS/Australia | `KEP:48` (.srt Inggris AS/Australia) | ADA | Metadata adaptasi tak disebut |
| G19 | 6 | Test & Compare hingga 3 thumbnail (watch-time share) untuk long-form | `5-upload:41` hanya "belum mendukung Shorts" | HILANG | Lihat H-4 |
| G20 | 6 | Produk margin tinggi: psikotes/kursus ala Satu Persen, permainan meja bias (Overconfidence Veritasium) | `KEP:48` ("kursus/asesmen/permainan meja penguji bias") | ADA | - |
| G21 | 6 | Iklan Shorts rapuh sebagai penopang utama | `AGENTS:22`; `9-playbook:19`; `ANAL:8` | ADA | - |

## 3. Hitungan per status

| Status | Jumlah |
|---|---|
| ADA (termasuk ADA ⚠) | 53 |
| HILANG | 16 |
| BERTENTANGAN | 3 |
| DIGANTIKAN v7.0 | 5 |
| Total | 77 |

HILANG (16): A5, C4b, C5, C6, D5, E2, E4, E5, F1, F4, G5, G6, G7, G10b, G11, G19. BERTENTANGAN (3): E1, G9, G10c. DIGANTIKAN (5): C9, D2, D10, F5, F6.
