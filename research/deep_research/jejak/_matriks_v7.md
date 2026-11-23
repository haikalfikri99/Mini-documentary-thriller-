# Matriks audit kelengkapan v7.0: dokumen riset asli → lokasi adopsi di repo (23 Nov 2026, read-only)
Sumber: `Konteks_Lengkap_Evaluasi_Upgrade_Formula_ARSIP_v7.0.txt` (K, 230 baris; poin 4 dan 5 diabaikan atas perintah user) dan `Analisis_Pasar_Shorts_Dokumenter_Indonesia.txt` (A, 1098 baris). Aturan resolusi: v7.0 terbaru dan menang. Semua lokasi diverifikasi dengan grep/baca langsung (bukan tebakan).
Singkatan: AG=`AGENTS.md` · SK=`.claude/skills/arsip-kasus/SKILL.md` · 1C/2V/3A/5U/6P/7S/8H/9P=`.claude/skills/arsip-kasus/references/{1-cerita-dan-script,2-visual-dan-animasi,3-audio,5-upload-dan-thumbnail,6-pelajaran,7-selera-dan-cara-kerja,8-hook-dan-judul,9-playbook-riset-batch}.md` · KR=`research/niche/KEPUTUSAN_RISET.md` · RP=`research/niche/topik/RUMUS_PEMILIHAN.md` · AP=`research/niche/ANALISIS_PASAR_2026-11.md` · LINT=`kit/tools/lint_episode.py` · NEW=`kit/tools/new_episode.sh` · GS=`research/gold_standard/README.md`.
Status: ADA · HILANG · BERTENTANGAN · DIGANTIKAN. **Hitungan baris tabel §2 (83 baris): ADA 55 · BERTENTANGAN 12 · HILANG 10 · DIGANTIKAN 6** (ringkasan §1a memuat 15 konflik C-1…C-15 yang sebagian menggabungkan beberapa baris). Catatan angka analisis pasar: tidak ada yang tercantum sebagai FAKTA tanpa label; RPM US$0,012, 85% evergreen, 14,6x ada di AP (berlabel ⚠, `AP:2,4,7,8`) dan di 9P:15,19 (tanpa ⚠ per baris, hanya berlabel tingkat-bagian "belum diverifikasi" di `9P:14`; lihat baris M-3).

## 1. Ringkasan

### 1a. BERTENTANGAN (harus diperbaiki; v7.0 menang)
| # | Konflik (lokasi repo vs v7.0) | Usulan tindakan 1 baris |
|---|---|---|
| C-1 | `SK:3` (frontmatter `description`) masih "Formula ARSIP v6.1 (3 Mesin Psikologi Perilaku…)" vs `AG:10-11` | Ganti description ke "Formula ARSIP v7.0 (2 Mesin A/B…)"; ini yang dibaca agen saat memilih skill. |
| C-2 | `SK:15-16` (Kompas v6.1 "Investigasi Forensik Perilaku & Rekayasa Tersembunyi", Garis Merah 3 butir, "Mesin 3 berjangkar") tanpa tag SUPERSEDED vs `AG:10,12,26` | Tambah `[SUPERSEDED by v7.0]` atau ganti dengan 2 kalimat yang menunjuk `AG` §2/§2A (Garis Merah 4 butir). |
| C-3 | `KR:4` dan `KR:23` (v6.0-A "tidak berubah/tetap berlaku": "rekayasa perilaku & bias kognitif") vs `AG:10` (identitas v7.0) | Tandai `KR:23` `[SUPERSEDED by v7.0: identitas = AG §2A]` dan koreksi `KR:4` (v6.0-A tidak lagi tetap). |
| C-4 | `7S:106` (#69 "kanal menjadi investigasi rekayasa perilaku"), `7S:122` (#83 Kompas v6.1 + Garis Merah 3 butir + "Mesin 3"), `7S:126` (#87 "Mesin 2 & 3") tanpa tag SUPERSEDED vs `AG:10-12` | Beri tag `[SUPERSEDED by v7.0 (#90)]` pada #69/#83; di #87 ganti "Mesin 2 & 3" jadi "B3 & B4". |
| C-5 | `1C:25` ("wilayah 2 = pilar ~70%"), `1C:236` ("mesin cerita (1/2/3)"), `1C:251` (M8.4 "Mesin 3 Human Anomalies") tanpa tag vs `AG:11` (A ~60%/B ~40%, B4) | Tag SUPERSEDED/revisi ke "mesin A1/A2/B3/B4"; `1C:251` menjadi aturan B4 (jangkar kejadian nyata Indonesia 0–4 dtk). |
| C-6 | `RP:86`, `RP:91` (Mesin 3 / "Mesin 2 & 3") dan `GS:3` ("mesin cerita (1/2/3)") masih memakai skema 3 Mesin vs `AG:11` | Tag SUPERSEDED di `RP:86,91`; ganti `GS:3` ke "mesin A1/A2/B3/B4". |
| C-7 | `NEW:53-54` heading "Validasi topik" menyebut "Topic Stress-Test v6.0 (celah 33–67% · Retention Anchor …)" vs `AG:13` (Stress-Test v7.0, 4 uji; celah 33–67% = pedoman) | Ganti ke "Topic Stress-Test v7.0 (4 uji, `AG` §2)"; template ini dicetak ke setiap README episode baru. |
| C-8 | Rubrik 20 poin menilai "Keamanan hukum & monetisasi" 1–5 dengan gerbang total ≥ 16 dan tak ada nilai ≤ 2 (`RP:54-56`, `NEW:53-60`, `9P:25`) vs keputusan user "monetisasi = pembeda, BUKAN gerbang" (`AG:13`, `RP:98`, `7S:133`) | Ubah kriteria 4 menjadi "Keamanan hukum" saja; pindahkan monetisasi ke baris pembeda terpisah (tidak masuk skor/gerbang). |
| C-9 | Pembaruan v7.0 VO "1 take, tempo 2,50–2,66 kata/dtk, atempo ≤ 1,10" (`AG:17,41`, `3A:83`) vs `SK:46` ("2 take… target tempo 2,6–2,7… atempo ±1,2"), `3A:72` ("2 take"), `1C:134` ("Dua take") | Revisi `SK:46` (langkah 3 alur kerja, dibaca tiap episode) ke "1 take, 2,50–2,66, atempo ≤ 1,10"; tag SUPERSEDED di `3A:72` dan `1C:134`. |
| C-10 | `7S:118` (#80b "Tanpa atribusi lisan", tanpa tag) vs `AG:17` + `1C:219` (atribusi pendek lembaga untuk klaim sensitif tetap WAJIB sekali) | Tag `[SUPERSEDED by v7.0/#72: atribusi pendek sekali tetap wajib]` pada #80(b). |
| C-11 | `1C:121` (F4 pola hook 1 "Ini [benda]. Tapi [anggapan] itu salah.") dan `8H:23,9,33` (H-D "Benarkah…?" boleh, pertanyaan boleh) tanpa tag vs `AG:16` + `8H:94` (hook 0–4 dtk dilarang "tapi" dan "?") | Tag SUPERSEDED by v7.0 pada `1C:121` dan baris H-D `8H:23`; contoh hook tanpa "tapi/?". |
| C-12 | `1C:107,129` (kalimat "6–13 kata") vs `AG:17`, `1C:258` (8–13 kata) | Ganti "6–13" ke "8–13" atau tag SUPERSEDED. |
| C-13 | Penamaan klaster outlier "K1–K5" di `9P:15` bentrok dengan arketipe hook "K1–K5" (`8H:76-82`, `SK:107`, `GS:3`); `K1`=klaster korporasi vs `K1`=Bom di Bawah Meja | Ganti penamaan klaster di `9P:15` ke "Klaster 1–5" (sama dengan A:196-252). |
| C-14 | Ambang YPP: `KR:46` menulis "8.000 jam ⚠" dan "20 juta/90 hari per 1 Feb 2027 (log lama… resmi)"; A:501-504 menyebut Tier 1 = 500 sub + 3.000 jam/3 juta views Shorts, Tier 2 = 1.000 sub + 4.000 jam/10 juta views | Verifikasi ke YouTube Help; sampai itu, beri ⚠ pada "20 juta" di `KR:46` dan ganti "8.000" menjadi "4.000 jam (A)" dengan ⚠. |
| C-15 | Angka penayangan di K:29-41 (#001 1.546, #003 1.367, #004 23.423 + 12.948 engaged, #005 17.277, #006 16.605, #007 1.485) berbeda dari ekspor Studio 19 Nov di `6P:113-125` (1.512, 1.379, 25.982, 52.660, 24.140, 8.868); persentase stayed/APV sama kecuali #001 (K: 70,56/72,77 vs 6P: 70,79/72,78) | Minta user memastikan ekspor mana yang final; jangan menimpa `6P` sebelum itu (persentase cocok, hanya jumlah views yang berbeda). |

### 1b. HILANG (temuan penting tak ada di repo)
| # | Temuan hilang | Usulan tindakan 1 baris |
|---|---|---|
| H-1 | K:29-31: #004 punya 12.948 engaged views dan anatomi kemenangan "4 pembalikan babak sampai detik ke-42" sebagai pola baku | Tambah 1 baris di `6P` "Ekspor Studio" (engaged views #004) dan di `KR` v7.0 (pola 4 pembalikan ≤ detik 42). |
| H-2 | K:38-40: #007 tertahan karena judul tanpa nominal uang + tengah melandai (tidak tercantum sebagai sebab di `6P`) | Tambah satu kalimat pelajaran #007 di `6P` "Temuan" (judul tanpa nominal uang). |
| H-3 | A:468-479, 499-509: detail syarat afiliasi (wajib YPP aktif, Komisi XTRA, tautan tak boleh disebar di luar YouTube, Short Series untuk barang non-elektronik, syarat 10.000 sub di Shopee Help lama) | Tambah 1 baris ⚠ di `KR` v6.0-D/`AP:8` (rujuk A:470-479, 496-498). |
| H-4 | A:480-498: klaster optimal 20–45 = Klaster 1 + 4; Klaster 2/3 sulit ditautkan ke produk (alasan pembeda monetisasi) | Tambah 1 kalimat di `AP` "Temuan yang selaras" (Klaster 2/3 sulit ditag). |
| H-5 | A:370-401: tiga langkah topik beragam: lensa tunggal, **jangkar visual + ritme pembuka seragam (title card dtk 7–12, peta dtk 50–75)**, **merek seri** (Vox Pop/Strikethrough; Vox drop ke 56–176 rb saat podcast 20–51 mnt); HAI menyaring 124.882 ide | Tambah 3 baris ringkas di `9P` §B (setelah L16): "seri bermerek" dan "jangan mencampur format di kanal utama". |
| H-6 | A:405-427: celah pasar Indonesia diukur: SS 17,62 jt/28 hr vs Kok Bisa 15,14 jt; Shorts SS 59–925 rb berformat komentar layar; ruang di Klaster 1 + 4 untuk vertikal cepat | Tambah angka pembanding berlabel ⚠ ke `9P:18` (saat ini hanya 1 kalimat tanpa angka). |
| H-7 | A:436-454: peringkat Dynamoi 77/86, RPM keseluruhan US$0,118 (vs 1,09), iklan 18/100 views, tonton 1,2 mnt; simulasi Upload-Post Rp142.557–801.884/juta; MilX Edu US$10,22 vs Kids US$0,33 | Tambah 1 baris ⚠ di `AP:8` (hanya bila user ingin bukti kuantitatif; ini topik meta, bukan konten). |
| H-8 | A:246-252, 253-262: Klaster 5 true crime berisiko batasan iklan; Klaster 1 audiens 82–85% pria dan tahan lama (Coca-Cola 4 th, Rockefeller 3 th) | Tambah 1 kalimat ke `AP:4` (risiko iklan true crime). |
| H-9 | A:511-1020: bank 25 topik; topik #13 (eksodus Malaysia/"Kabur Aja Dulu"), #18 (hiu putih), #19 (subtitle), #21 (pasir Saudi) tidak dinilai di `AP:11-16` | Tambah 4 baris keputusan di `AP:12-13` (tolak/uji) agar tidak dinilai ulang. |
| H-10 | A:342-352: komentar rata-rata nol di sampel Indonesia (hanya share −95%, like 2,7x, subscribe 14,6x yang ada di `AP:7`) | Tambah "komentar ≈ 0" di `AP:7` (mendukung pemilihan topik pemicu komentar). |

## 2. Tabel lengkap (menurut bidang)
Kolom Tindakan: "-" = tidak perlu; kode C-/H-/M- merujuk ringkasan di atas atau catatan di bagian 3.

### 2.1 Identitas kanal & Garis Merah
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2A (L72-81) | Nama Mini Thriller IDN, label ARSIP KASUS, estetika 2D paper-cutout/engraving di putih #FFFFFF tetap | `AG:10,20`; `CLAUDE.md:3`; `KR:6`; `2V:100-102` | ADA | - |
| K 2A (L77-81) | DNA = investigasi forensik atas sistem, uang, desain harga, kebijakan, anomali perilaku; bukan psikologi murni, bukan berita/hukum kaku | `AG:10,26`; `KR:6`; `6P:107-109`; `7S:129` (#90) | ADA | - |
| K 2A / SK | Kompas v7.0 masih belum konsisten di skill yang dibaca tiap sesi | `SK:3,15-16`; `KR:4,23`; `7S:106,122,126`; `1C:25,236,251`; `RP:86,91`; `GS:3` vs `AG:10-12` | BERTENTANGAN | C-1…C-6 |
| K 2B-1 (L83-84) | Garis Merah 1: bukan self-help/tips/motivasi/nasihat | `AG:12`; `KR:11`; `RP:99`; `9P:24`; `NEW:28` | ADA | - |
| K 2B-2 (L85-87) | Garis Merah 2: bukan bantahan mitos datar/pasal kaku tanpa The Turn | `AG:12`; `KR:11`; `RP:99`; `9P:24`; `NEW:28` | ADA | - |
| K 2B-3 (L88-91) | Garis Merah 3: bukan topik basi (.900, susu pojok, popcorn, micin, plastik Rp200, cap cuci mobil) dan studi gagal replikasi (Power Posing, Ego Depletion, Priming, Stanford, Marshmallow) | `AG:12`; `KR:11`; `RP:99` | ADA | - |
| K 2B-4 (L92-93) | Garis Merah 4: bukan meta-YouTube (algoritma, RPM, tutorial monetisasi) | `AG:12`; `KR:11`; `AP:11`; `9P:24` | ADA | - |
| K 2B | Ringkasan Garis Merah di SK hanya 3 butir (tanpa topik basi dan meta-YouTube) | `SK:16`; `7S:122` | BERTENTANGAN | C-2, C-4 |
| K 1 Fase 3 (L42-64) | "Psikologi murni" (v5→v6.1) dihentikan karena #010/#012/monoton/kontradiksi tapi/riset borongan | `AG:9`; `KR:5-6`; `6P:107-111`; `7S:129-131` | DIGANTIKAN | Riwayat v6.x diganti v7.0 (tag SUPERSEDED sudah ada di `AG`, `KR:25`) |

### 2.2 Dua Mesin A/B + proporsi
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2C (L95-108) | Mesin A ~60% (A1 skandal/kartel/celah aturan; A2 produk/kebijakan bumerang) dan Mesin B ~40% (B3 jebakan harga; B4 anomali perilaku teruji) | `AG:11`; `KR:7-10`; `RP:96`; `9P:23`; `LINT:21`; `NEW:44-48` | ADA | - |
| K 2C (L96-97) | Per batch 4 episode: A 2–3 + B 1–2 | `AG:11` (A 2–3); `9P:23` (A 2–3 + B 1–2); `LINT:257` (cek A 2–3) | ADA | - (B 1–2 implisit dari A 2–3) |
| K 2C (L106-108) | Mekanisme psikologi = pisau bedah segmen tengah, bukan syarat tiap episode; B4 terikat benda/situasi Indonesia | `AG:11,26`; `KR:6,10` | ADA | - |
| K 2C | Penanda `[MESIN: A1\|A2\|B3\|B4]` diperiksa linter | `AG:19`; `LINT:21,168`; `NEW:25,47` | ADA | - |
| K §3.2 (L178-181) | `episode_log.json`: mesin dan latar #009–#012 harus terisi | `stories/episode_log.json` (#009 A2/benda, #010 A2/benda, #011 B3/layar, #012 B4/dokumen; `mode` #009/#010 = null) | ADA | Opsional: isi `mode` #009/#010 bila perlu pengecekan selang-seling lintas batch |
| K §3.1 (L173-177) | Sisa aturan lama (3 Mesin, maks 1 Ringkas, Jembatan Audiens, default) harus berlabel SUPERSEDED | Berlabel: `SK:23`; `KR:25,32`; `RP:58`; `1C:117,148,173,213,226`; `7S:87,90,108`. Tidak berlabel: `1C:236,251`; `RP:86,91`; `GS:3`; `SK:3,16` | BERTENTANGAN | C-1…C-6 |
| K §3.1 | Micro-Rehook 12–15 dtk, Conceptual Loop, templat `UPLOAD_<no>_<slug>.txt` tetap utuh | `1C:218,248-249`; `2V:94-95`; `5U:60-75`; `NEW:36-42,109-148`; `kit/tools/pack_upload.py` | ADA | - |

### 2.3 Topic Stress-Test 4 uji + gerbang + Fact Sheet 2 Lapis + riset per batch
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2D-1..4 (L110-118) | 4 uji: anti-basi 2 tahun; kedekatan dompet/waktu/kesehatan 20–45; 3 Pilar Konflik; Vox Handle Visual Test | `AG:13`; `RP:97`; `9P:25`; `NEW:27-35` | ADA | - |
| K 2D | Semua uji wajib lulus sebelum fact sheet (gerbang) + gerbang skor Lokal ≥ 4, Cerita ≥ 3, Celah ≥ 3 | `AG:13`; `RP:97,95`; `9P:25` | ADA | - |
| K 2D | Template README masih berlabel "Topic Stress-Test v6.0" | `NEW:53-54` | BERTENTANGAN | C-7 |
| K 2F (L162-165) | Kesiapan produk afiliasi = pembeda (tie-breaker), bukan gerbang | `AG:13`; `KR:12`; `RP:98`; `7S:133` (#94); `LAPORAN_AUDIT_V7.md` | ADA | - |
| K 2F | Rubrik 20 poin menilai monetisasi dan memakai ambang ≥ 16 / tak ada ≤ 2 (efektif gerbang) | `RP:54-56`; `NEW:53-60`; `9P:25` | BERTENTANGAN | C-8 |
| K 2D-5 (L119-122) | Fact Sheet 2 Lapis (lokal + primer/putusan/studi), dilarang mengarang angka | `AG:15`; `1C:54 (protokol anti-halusinasi)`; `NEW:75-86`; `9P:25,51-56` | ADA | - |
| K 2D-5 | Label negara/lembaga sumber eksplisit di kartu visual (`DATA INDONESIA` vs `EKSPERIMEN AS`) | `AG:15,26`; `1C:250` (M8.3); `2V:97` (§N.3); `LINT` (cek `[LABEL]`) | ADA | - |
| K 2D-5 | Dilarang membacakan nomor pasal di VO | `AG:15`; `RP:100`; `KR:14` | ADA | - |
| K 1 Fase 3.5 (L62-65) | Riset borongan 18–25 topik gagal; per batch 6 kandidat → verifikasi → 4 terkunci; riset ≠ skrip | `AG:15,31`; `RP:100`; `KR:14`; `9P:28-35`; `6P:110` | ADA | - |

### 2.4 Judul dan hook (0–4 dtk)
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2E (L125-126) | Judul ≤ 55 karakter (ideal 38–48), memuat benda/merek/angka uang/kontradiksi | `AG:16`; `8H:94`; `5U:75`; `LINT:30,171-173`; `NEW:88-92,109-148` | ADA | - |
| K 2E (L127-129) | Kata terlarang di judul DAN pembuka 0–4 dtk: psikologi, bias, kenapa, padahal, tapi, ternyata, "?" | `AG:16`; `8H:94`; `1C:256`; `LINT:27-29,171-182`; `5U:75` | ADA | Catatan M-1: repo menyisakan 1 slot uji/batch (`[SLOT-UJI]`, kuota 3:1) yang tidak ada di K |
| K 2E (L130-134) | "tapi/padahal" boleh di body (ABT), tak monoton, tanpa kata sambung daftar | `AG:16`; `8H:95`; `1C:217,256`; `LINT:195`; `7S:130` (#91) | ADA | - |
| K 2E | Pola lama yang membolehkan "tapi"/"?" di hook | `1C:121` (F4 pola 1), `8H:9,23,33` (H-D "Benarkah…?"); `7S:118` (#80c, sudah bertag) | BERTENTANGAN | C-11 |
| K 2E | 5 arketipe hook, tidak sama 2 berurutan | `8H:75-83,85-91,96`; `AG:16`; `LINT:23,241-250` | ADA | - |
| K 2E-penguncian | Judul ↔ frame 0 ↔ H1 ≤ 4,0 dtk, ≤ 14 kata | `AG:16`; `8H:70,74`; `NEW:88-92` | ADA | - |

### 2.5 Spoken Indonesian, jeda, zero-citation, dua mode durasi
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2E (L135-138) | Bahasa lisan luwes (nggak, bikin, aja, udah, nyampe, biar), bukan baku kaku atau slang lebay | `AG:17`; `1C:257`; `7S:131` (#92); `LINT:36,206-207` (peringatan) | ADA | - |
| K 2E (L139-141) | 8–13 kata/kalimat, pecah > 15–16 kata, hindari 3+ staccato ≤ 4 kata | `AG:17`; `1C:258`; `LINT:37,199,204` (peringatan > 17) | ADA | Ambang linter 17 lebih longgar dari 15–16 (disengaja, `AG:17`) |
| K 2E | Sisa "6–13 kata" | `1C:107,129` | BERTENTANGAN | C-12 |
| K 2E (L142-143) | Penanda `/` (~0,25 dtk) dan `//` (~0,5–0,6 dtk sebelum The Turn) | `AG:17`; `1C:223,258`; `NEW:94` | ADA | - |
| K 2E (L144-146) | Dua mode: Ringkas 35–42 dtk/85–105 kata, Investigasi 48–55 dtk/115–135 kata (tanpa padding), selang-seling | `AG:17`; `1C:208-213,242,259`; `7S:108`; `LINT:38,260`; `NEW:46` | ADA | - |
| K 2E (L146-147) | Zero-citation lisan; sumber di visual | `AG:17`; `1C:219,252,259`; `LINT:33-35,189-192` | ADA | - |
| K 2E | Aturan lisan lama bentrok (tanpa atribusi lisan sama sekali) | `7S:118` (#80b) vs `AG:17`, `1C:219` | BERTENTANGAN | C-10 |
| K 2F (L160-161) | VO jalur utama = konektor ElevenLabs (dari `vo_prompt_elevenlabs.md`) | `AG:41`; `3A:82-83`; `CLAUDE.md:3`; `7S:132` | ADA | - |
| K 2F | VO 1 take, tempo 2,50–2,66, atempo ≤ 1,10 vs sisa "2 take / 2,6–2,7 / ±1,2" | `AG:17,41` vs `SK:46`; `3A:72,51,80`; `1C:134` | BERTENTANGAN | C-9 |
| K 2E (L148-149) | Tight Audio Tail ≤ 0,15 dtk | `AG:17,41`; `3A:74-81` (§J); `1C:225`; `kit/audio/vo_tail.py` | ADA | - |

### 2.6 Lima arketipe penutup + Anti-Exit Words + Conceptual Loop
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2E (L148-150) | Rotasi 5 arketipe penutup tanpa default, tak sama pada 2 episode berurutan | `AG:18`; `1C:224-226,240`; `LINT:24,143-144` | ADA | - |
| K 2E (L150-151) | Anti-Exit Words: Jadi, Kesimpulannya, Pada akhirnya, Nah itulah, Lain kali/kalo | `AG:18`; `1C:221,241,260`; `LINT:25-26` (superset: + Intinya, Kalau kamu, Kalo kamu, Ingat ya) | ADA | - |
| K 2E (L149) | Conceptual Loop (panggil ulang objek Frame 0) | `1C:248`; `2V:94-95`; `NEW:25`; `LINT` (cek `[LOOP]`) | ADA | - |
| K 1 Fase 2 (L30-35) | Curtain-Pull Reveal (penutup #004 "isi warung nggak selalu pilihan pemiliknya") | `AG:26`; `1C:248`; `8H:48` | ADA | - |

### 2.7 Rotasi latar, Flow/kolase, audio, deliverable
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 2F (L154-156) | Rotasi `[LATAR]`: tak ada 3 episode berturut sama jenisnya (dokumen/benda/kemasan/grafik/ruang) | `AG:20`; `2V:98-102` (§O.1); `LINT:22,237,254`; `NEW:25,47` | ADA | - |
| K 2F (L157-159) | Flow 1 variasi/gambar, latar #FFFFFF, kode warna (merah jebakan, biru sistem, kuning bukti), Frame 0 ≥ 486 px + stempel ≤ 0,25 dtk, grafik y ≤ 1180 | `AG:20`; `2V:100-101`; `kit/collage/template/flow_prompt_template.md:7,34,49` | ADA | - |
| K 1 Fase 3.3 (L53-56) | #013–#015 sama-sama layar aplikasi belanja = monoton | `2V:98` (menyebut #013–#014; sumber K menyebut #013–#015) | ADA | Opsional: koreksi menjadi #013–#015 |
| K 2 / 9P | Deliverable standar = metadata + Fact Sheet 2 Lapis + Skrip AV 2 kolom | `9P:26`; `NEW` (README scaffold L75-100 + `UPLOAD.md` scaffold); `1C:222-223` | ADA | Opsional: satu baris eksplisit di `AG` §2 (SSOT tidak memuat frasa "deliverable standar") |
| K 3 (L169-172) | `gold_standard` #009 hanya acuan ritme/visual, bukan bahasa | `GS:6` (catatan v7.0) | ADA | - |

### 2.8 Data empiris Studio (K §1) dan klaster outlier, pola premis, pasar (A)
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 1 Fase 1-2 (L14-41) | Persentase stayed/APV #001–#008 (#002 44,79/67,78; #003 46,60/54,44; #004 78,48/102,05; #005 72,97/92,78; #006 72,05/96,35; #007 65,71/93,82; #008 70,80/74,15) | `6P:113-125`; `AG:9`; `KR:5` | ADA | - |
| K 1 (L29-41) | Jumlah views dan engaged views berbeda dari ekspor 19 Nov | `6P:113-125` | BERTENTANGAN | C-15 |
| K 1 (L29-31) | #004 12.948 engaged views; kemenangan = merek harian + denda + 4 pembalikan sampai dtk 42 | `6P:118` (tanpa engaged; `stories/aqua/README.md:17` memuat PN membatalkan KPPU) | HILANG | H-1 |
| K 1 (L37) | #004–#006 = 78% penayangan | `6P` (Temuan 1); `AP:18` | ADA | - |
| K 1 (L38-39) | Penyebab #007 melandai: tanpa nominal uang di judul + tengah melandai | `6P` (tanpa penyebab ini) | HILANG | H-2 |
| K 1 Fase 3 (L46-52) | #009 80,90/91,49; #010 70,32/46,41 stakes receh | `6P:120,123,129-131`; `AG:9`; `AP:18` | ADA | - |
| K 1 Fase 3.4 (L57-61) | Kontradiksi "tapi/padahal" v6.1 (ABT butuh kontras) | `8H:93-95`; `7S:130`; `1C:256` | ADA | - |
| A 1 (L36-252) | 12 kanal pembanding (Fern, MagnatesMedia, Vox, HAI, Wendover, Zack D., SS, Kok Bisa, Kamar JERI, SunnyV2, Infographics, Economics Explained) | `AP:4`; `9P:14`; tabel penuh hanya di arsip `A` (`research/deep_research/…txt`) | ADA | - (detail per kanal sengaja tidak disalin) |
| A klaster (L196-252) | 5 klaster: korporasi/siber-finansial; geopolitik/kebijakan; anomali sains/sejarah; mekanisme tubuh+desain produk (puncak Shorts); true crime | `AP:4`; `9P:15` | ADA | - |
| A klaster | Penamaan "K1–K5" untuk klaster bentrok dengan K1–K5 arketipe hook | `9P:15` vs `8H:76-82` | BERTENTANGAN | C-13 |
| A klaster (L246-252) | Klaster 5 berisiko pengiklan sensitif; Klaster 1 82–85% pria, evergreen | `AP:4` (≈85% ⚠, tanpa risiko iklan) | HILANG | H-8 |
| A pola premis (L269-272) | Hidden Problem, Beginner's Secret, Myth Buster, Behind the Scenes, Immediate Gratification | `AP:5`; `9P:17` | ADA | - |
| A banding (L273-341) | Flop = premis klise/definisi/biografi, ceramah normatif, stakes rendah; outlier = benda harian + monopoli tersembunyi, underdog vs raksasa | `AP:5`; `9P:17` | ADA | - |
| A (L421-427) | Funny Pricing Tactic 2,03 jt vs 18,4–270,8 rb | `AP:4`; `9P:15` | ADA | - |
| A dinamika (L342-366) | Net subscribe 14,6x, like 2,7x, share −95%; tema pemicu percakapan (identitas sejarah, kecemasan finansial, mitos harian) | `AP:7`; `9P:19` | ADA | - |
| A dinamika (L348-349) | Komentar rata-rata nol | `AP:7` (tidak ada) | HILANG | H-10 |
| A topik beragam (L368-401) | 3 langkah: lensa tunggal + demografi inti; jangkar visual + ritme pembuka; disiplin format/merek seri | `9P:16` (langkah 1 dan sebagian 2); `AP:6` | HILANG | H-5 (langkah 3 + detail Vox) |
| A celah (L405-427) | Celah suplai: Shorts dokumenter vertikal bergaya arsip 35–60 dtk kosong di Indonesia (Klaster 1 + 4) | `9P:18` (tanpa angka pembanding) | HILANG | H-6 (arah ADA; angka SS/Kok Bisa hilang) |
| A ekonomi (L429-454) | RPM Shorts Indonesia US$0,012 (AIR); AdSense Shorts tak layak | `AP:8`; `9P:19`; `AG:22` (ambang ⚠) | ADA | M-3 (⚠ per baris) |
| A ekonomi | Dynamoi peringkat 77/86, US$0,118, iklan 18/100; simulasi Upload-Post; MilX Kids US$0,33 | tidak ada | HILANG | H-7 |
| A ekonomi (L457-464) | Long-form 8–15 mnt bisnis/keuangan RPM Rp10–20 rb | `AP:8`; `9P:19`; `KR:15,47` (⚠) | ADA | - |
| A afiliasi (L470-479, 496-498) | YouTube Shopping Affiliate: 500 sub sejak akhir Maret 2026, komisi 1% elektronik s.d. 4–5% non-elektronik, cair 60–120 hari, mitra Shopee/Lazada/Blibli/Zalora, Made for Kids dilarang | `AP:8`; `AG:22`; `KR:15,45` | ADA | - |
| A afiliasi | Syarat tambahan: wajib YPP, Komisi XTRA, Short Series, tautan tak boleh di luar YouTube, Shopee Help lama 10.000 sub | tidak ada | HILANG | H-3 |
| A optimal (L480-498) | Klaster 1 + 4 paling layak komersial untuk 20–45; Klaster 2/3 sulit ditag produk | `AG:22`; `9P:15`; `AP:4` (hanya sisi Mesin) | HILANG | H-4 (alasan tag produk) |
| A YPP (L499-506) | Tier 1: 500 sub + 3.000 jam / 3 jt views Shorts; Tier 2: 1.000 sub + 4.000 jam / 10 jt views | `KR:45-46` (3 jt/10 jt ⚠; "8.000 jam"; "20 juta 1 Feb 2027") | BERTENTANGAN | C-14 |
| A (L506-509) | Penindakan konten AI repetitif (Des 2025); suara AI diizinkan bila skrip riset orisinal | `AP:9`; `KR:39` | ADA | - |
| A bank (L511-1020) | Topik 8–12 = meta-YouTube/monetisasi/AI slop | `AP:11` (dilarang Garis Merah 4) | DIGANTIKAN | Ditolak Garis Merah 4 |
| A bank | Topik geopolitik/sejarah/true crime (Krakatau 536, Konfrontasi, penyadapan, Piala ASEAN, CIA/Xbox) | `AP:12` | DIGANTIKAN | Ditolak Tes Grup WA (#86) + angka tak terverifikasi |
| A bank | Topik global yang sudah diperah (McFlurry, jahitan, WhatsApp, Coca-Cola, Funny Pricing) | `AP:13` | DIGANTIKAN | Ditolak Uji Anti-Basi |
| A bank | 5 arah layak uji (#15 menu harga, #22 ghost flights, #20 emisi VW, #23 kepemilikan gim, #24 bunga kredit/paylater) | `AP:16` | ADA | - |
| A bank | Topik #13, #18, #19, #21 tidak dinilai | `AP:11-16` (tidak ada) | HILANG | H-9 |

### 2.9 Poin yang diabaikan atas perintah user
| Dokumen/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|
| K 4 (L183-203) | Alur hibrida Gemini → Claude Code | `AG:14,32`; `SK:36-37`; `9P:11` masih memuat "Jalur Paket Gemini" | DIGANTIKAN | Dibatalkan user; lihat catatan M-2 |
| K 5 (L205-230) | Status kandidat #017–#020 | `9P:71-74`; `stories/migor`, `beras`, `bankkeliling`, `kuota` | DIGANTIKAN | Dibatalkan user; tidak diaudit |

## 3. Catatan tambahan
- **M-1 (selisih kecil, dihitung ADA):** K melarang kata terlarang di judul/pembuka tanpa pengecualian; repo (`AG:16`, `8H:94`, `LINT:27`) menyisakan 1 `[SLOT-UJI]` per batch (kuota 3:1). Konfirmasi ke user apakah slot uji dihapus di v7.0.
- **M-2 (di luar bidang):** `AG:14,32`, `SK:36-37`, `9P:11` mempertahankan "Jalur Paket Gemini (berlaku sejak 22 Nov)" padahal poin K 4 dibatalkan user, dan `CLAUDE.md:3` menulis Protokol Hibrida/Gemini dibatalkan; tinjau apakah jalur itu dihapus atau dipertahankan.
- **M-3 (label ⚠ angka pasar):** tidak ada angka analisis pasar yang tercantum sebagai FAKTA tanpa label: `AP:2,4,7,8` berlabel ⚠; `AG:22` dan `KR:15,45-47` berlabel ⚠; `9P:14` memberi label tingkat-bagian ("belum diverifikasi ulang satu per satu"), tetapi `9P:15` (85% evergreen, 143–214 jt, 2,03 jt) dan `9P:19` (US$0,012, 14,6x, Rp10–20 rb) tanpa ⚠ per baris. Tindakan: tambah ⚠ inline di `9P:15,19`.
- **M-4:** `research/deep_research/README.md` merujuk `MATRIKS_JEJAK.md` yang tidak ada di folder; matriks ini bisa menggantikannya (ganti rujukan README).
- **M-5 (linter/template):** `LINT` tidak memeriksa H1 ≤ 14 kata/≤ 4,0 dtk, "pecah > 15–16 kata" (ambang 17), dan batas B 1–2 per batch; `test_lint_episode.py` = 19 tes lulus (dijalankan 23 Nov, tanpa mengubah berkas). Pola batch "[X]—tapi [Y]" (`LINT:59 h1_pattern`) kini redundan karena "tapi" di H1 sudah error untuk #017+.
