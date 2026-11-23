# Matriks audit kelengkapan: SOP_Naskah_Thriller_Psikologi_Pendek.md → repo (23 Nov 2026)
Audit read-only. Sumber: `research/deep_research/SOP_Naskah_Thriller_Psikologi_Pendek.md` (Tahap 1–6, 232 baris). Aturan resolusi: Formula ARSIP v7.0 (`AGENTS.md` §2/§2A, `1-cerita…` §M9, `8-hook…` §J) menang atas v6.x dan aturan lama; contoh riset yang melanggar v7.0 berstatus DIGANTIKAN, bukan HILANG.
Singkatan berkas: **AG** = `AGENTS.md` · **1C** = `.claude/skills/arsip-kasus/references/1-cerita-dan-script.md` · **8H** = `…/8-hook-dan-judul.md` · **2V** = `…/2-visual-dan-animasi.md` · **3A** = `…/3-audio.md` · **4S** = `…/4-standar-kualitas-10.md` · **7S** = `…/7-selera-dan-cara-kerja.md` · **9P** = `…/9-playbook-riset-batch.md` · **RP** = `research/niche/topik/RUMUS_PEMILIHAN.md` · **NE** = `kit/tools/new_episode.sh` · **LT** = `kit/tools/lint_episode.py`.
Status: ADA · HILANG · BERTENTANGAN · DIGANTIKAN v7.0.

## 1. Ringkasan

### HILANG (temuan SOP yang tidak ada di repo; urut kepentingan)
1. **H1. Anggaran kata per segmen + variasi tempo per segmen** (SOP T3 tabel: ±9/26/38/26/17 kata; tempo 2,2 → 2,4 → 2,5 → 2,2 → 2,1 kata/dtk, melambat di klimaks dan payoff). Repo hanya punya total kata per mode (1C:208-212) dan tempo seragam 2,50–2,66. Usul: tambah tabel anggaran per segmen yang diskalakan ke 115–135 kata (dan 85–105) di `1C` §M9 atau `NE` (blok Skrip AV).
2. **H2. Kaidah penekanan posisi 2-3-1** (kata paling tajam di ujung kalimat sebelum titik, terkuat kedua di awal, jangan dikubur di tengah). `1C:220` menandai "2-3-1 / burstiness" sebagai diganti §M9.3, tetapi §M9.3 hanya menggantikan burstiness (panjang kalimat), bukan aturan posisi kata. Usul: tambah 1 baris di `1C` §M9.3.
3. **H3. Gerbang "sapu nominalisasi/pasif" sebagai butir scorecard** (SOP T6 QC #3). Aturannya ada (`1C:220`) tetapi tidak ada butir di scorecard M6/#23 dan `LT:36` hanya menandai 3 kata (tersebut, sehingga, melakukan), bukan imbuhan pe-an/ke-an/per-an/-sasi atau pasif di-/ter-. Usul: tambah cek #23b di `1C` §M9.7 dan peringatan linter (heuristik imbuhan).
4. **H4. Larangan "kala kini palsu"** untuk peristiwa arsip yang sudah selesai (SOP T4). Tidak ada di repo. Usul: 1 baris di `1C` §M9.2.
5. **H5. Penn & Teller: membongkar mekanisme tipuan sebagai babak keempat** (SOP T1). Tidak ada; praktiknya implisit (Segmen 2B membedah mekanisme). Prioritas rendah; usul: 1 kalimat di `1C` §M2 bila ingin eksplisit.
6. **H6. Tahan hero visual 3–4 dtk di klimaks sambil menggerakkan sorotan** (SOP T3 baris 30–42 dtk). Repo menetapkan potongan ≤ 1 dtk dan shot 1,5–3 dtk (2V:7, 4S:12) tetapi tidak ada aturan "tahan" di klimaks. Prioritas rendah; usul: 1 baris di `2V` §A.
7. **H7. Toleransi ambiguitas berbeda antar-budaya** (celah terlalu menggantung memicu kebingungan; SOP T2). Tidak ada. Prioritas rendah; cukup catatan di `RP` Stress-Test.
8. **H8. Dasar teori penutup: emosi high-arousal + social currency + triggers (Berger–Milkman)** (SOP T5). Arketipe penutupnya ada (1C:224-226) dan dasar peak-end ada (1C:89), tetapi alasan Berger–Milkman tidak. Prioritas rendah; usul: 1 baris di tabel F1 `1C`.
9. **H9. Studi kasus kanal Indonesia Nessie Judge (visual kontekstual + narasi personal) dan Ferry Irwandi (retorika kritis-sarkastik)** (SOP T1). Tidak dipakai di aturan mana pun (Sepulang Sekolah ada di 9P:14-18). Prioritas sangat rendah; tidak perlu tindakan.
10. **H10. `MATRIKS_JEJAK.md` dirujuk `research/deep_research/README.md:3` tetapi berkas tidak ada.** Usul: berkas ini (`_matriks_sop.md`) mengisi celah itu; perbaiki rujukan README (di luar mandat audit ini).

### BERTENTANGAN (tanpa alasan v7.0; sebut kedua lokasi)
1. **X1. "Bukan X tapi Y" dilarang di `1C:132`** (Dilarang: "bukan X tapi Y"), padahal v7.0 membolehkan "tapi" di body (`AG:16`, `1C:256`, `8H:95`) dan SOP memakai kontras "bukan … TETAPI …" sebagai teknik inti (SOP T4 tabel baris 1 dan 4). Alasan larangan = pola template-AI (humanizer, `7S:114` #77), bukan v7.0, dan kini ambigu terhadap kata "tapi". Usul: ubah `1C:132` menjadi "dilarang pola kontras template 'bukan X, melainkan/tapi Y' sebagai kalimat berantai; kata 'tapi' sendiri boleh di body (§M9.1)" dan pindahkan ke §M9.
2. **X2. `NE:54` masih menyebut "Topic Stress-Test v6.0 (celah 33–67% · Retention Anchor · Vox Handle · satu ide + The Turn)"**, sementara `NE:29` dan `AG:13` = Stress-Test v7.0 (4 uji berbeda). Usul: ganti `NE:54` ke rumusan v7.0.
3. **X3. `7S:115` (#78) "TIDAK ada tabel/file AV terpisah; hanya durasi + skrip di chat"** vs `1C:222-223` (§M4 skrip AV 2 kolom "final yang diserahkan ke produksi"), `NE:92-97` dan `AG:17` ("Skrip AV 2 kolom"), serta SOP Tahap 6. Usul: tandai #78 bagian "format kirim" sebagai `[SUPERSEDED by v7.0 / M4]` atau tegaskan: AV 2 kolom di README, chat hanya durasi + skrip.
4. **X4. Durasi hening `//`**: `AG:17` = 0,5–0,6 dtk; `1C:218`/`1C:249`/`NE:94` = 0,5–0,8 dtk (sama dengan SOP T6). Usul: samakan `AG:17` ke 0,5–0,8 (atau nyatakan 0,6 sebagai nilai tengah).

## 2. Tabel pemetaan

### A. Copywriting judul + hook
| # | Tahap/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| A1 | T5 Taksonomi hook | 5 arketipe hook (Bom di Bawah Meja, Ketidaknyamanan Kontra-Intuitif, Bukti Visual Mendahului Konteks, Celah Ujung Lidah, Titik Balik Hasil Ekstrem) | 8H:75-83 (K1–K5), 8H:87; AG:16; LT:23 | ADA | tidak ada |
| A2 | T5 | Hook tanpa basa-basi/salam/definisi; taruhan atau celah di kalimat pertama | 1C:110, 1C:128, 1C:161 (H1); 8H:17 | ADA | tidak ada |
| A3 | T5 | Hook ±8–11 kata | 8H:17 (≤ 10 kata); AG:16 (≤ 14); 1C:258 (8–13) | ADA | catatan: LT tidak memeriksa H1 ≤ 14 kata/≤ 4,0 dtk (celah alat, bukan celah aturan) |
| A4 | T5 | Hook memilih arketipe menurut karakter bukti visual dan arah pergeseran model mental | 8H:75-83 ("pilih menurut jenis cerita"), 8H:30-31 | ADA | tidak ada |
| A5 | T5 | Variasi anti-templat: jangan satu pola pembuka/penutup terus | 8H:87-89 (rotasi, tak sama 2 episode berurutan); LT:245-246, 232-233 | ADA | tidak ada |
| A6 | T5/T3 | Jeda dampak ±0,3 dtk di akhir hook | 1C:163 (H3: hening ≤ 0,25 dtk) | ADA | tidak ada (selisih 0,05 dtk, tidak material) |
| A7 | T5 | Contoh hook memakai "Kenapa…?", "Tapi satu kata kecil…", "Ini bukan kesalahan desain" | AG:16; 8H:94; LT:27-29, 178-181 | DIGANTIKAN v7.0 (kenapa/tapi/? dilarang di 0–4 dtk) | tidak ada |
| A8 | T5 | Hook memanfaatkan Zeigarnik/celah ujung lidah dan Hitchcock sebagai mekanisme | 8H:78, 8H:81 | ADA | tidak ada |

### B. Dramaturgi thriller
| # | Tahap/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| B1 | T1 Hitchcock | Bom di bawah meja: ketegangan = penonton tahu ancaman lebih dulu, bukan kejutan; "rooting" | 8H:78 (K1 asimetri informasi); 8H:73 | ADA | tidak ada (istilah dipakai, penjelasan surprise vs suspense singkat) |
| B2 | T1 Prestige | Tiga babak Pledge → Turn → Prestige | 1C:215 (§M2.3); NE:67; 9P:25 (The Turn) | ADA | tidak ada |
| B3 | T1 Prestige | Petunjuk diletakkan sejak detik awal sehingga pembalikan terasa tak terelakkan | 1C:248 (Conceptual Loop), 2V:94; AG:25 (Curtain-Pull) | ADA | tidak ada |
| B4 | T1 Prestige | Misdirection/asumsi keliru penonton di The Turn | 1C:249 (tangga bukti: Asumsi Awal → … → Pembalikan); 1C:44 membatasi agar tidak menyesatkan fakta | ADA (setara, dengan pagar fakta) | tidak ada |
| B5 | T1 Penn & Teller | Membongkar mekanisme tipuan justru menjadi babak keempat yang memukau | tidak ditemukan (praktik implisit di Segmen 2B, 8H:61) | HILANG (rendah) | opsional: 1 kalimat di 1C §M2 |
| B6 | T1 Johnny Harris | Visual evidence, then context | 1C:219; 8H:80 (K3); 2V:71 (§K.1) | ADA | tidak ada |
| B7 | T1/T3 Anchor & Bridge, utang naratif | Jangkar bukti lalu jembatan (observasi → pertanyaan → jawaban parsial → komplikasi) | 1C:218 (utang naratif); 1C:170 (R1); 8H:40 | ADA (istilah "Anchor & Bridge" tidak dipakai, praktik setara) | tidak ada |
| B8 | T1 Veritasium | Productive discomfort + satu realisasi akhir (Retention Anchor) | 8H:79 (K2); 1C:215; AG:26 (Curtain-Pull Reveal); RP:72 | ADA | tidak ada |
| B9 | T1 LEMMiNO/Fern | Kronologi visual rapi, siluet minimalis terbaca sekali lirik, nada tenang-serius | 8H:80; 2V:6-8 (satu subjek per frame, ±5–6 potongan) | ADA (nada kanal sengaja santai-jahil, 1C:128-130) | tidak ada |
| B10 | T1 kanal Indonesia | Nessie Judge (narasi personal + visual kontekstual), Ferry Irwandi (sarkastik); Sepulang Sekolah (ringan-terstruktur) | 9P:14-18 hanya Sepulang Sekolah | HILANG (sangat rendah) | tidak perlu |
| B11 | T1 Tabel 4 ranah | Rumusan antagonis + stakes + pembalikan untuk harga/menu, bias angka, eksperimen sosial, kebiasaan digital | kerangka 3 unsur: 1C:214-215 (§M2), NE:63-66; ranah psikologi-kognitif sebagai bank topik: AG:11-12 menggantinya dengan 2 Mesin A/B | DIGANTIKAN v7.0 (bank topik psikologi sebagai pintu masuk) | tidak ada |
| B12 | T1 Tropi thriller | Asimetri pengetahuan, batas waktu, pengawasan tersembunyi, kompromi moral | antagonis tak kasatmata: 1C:215; kompromi moral: Dilema Abu-Abu 1C:225; "batas waktu" tidak ada | ADA (sebagian; tak material) | tidak ada |
| B13 | T3 Tabel 5 segmen | Fungsi segmen: Cold-Open 0–4, Pledge 4–15, Turn 15–30, Climax 30–42, Prestige 42–50 | 1C:108-115 (F3 6 segmen + 2 micro-rehook); 1C:249 (tangga bukti 12–15 dtk); NE:40-43 | ADA (batas waktu sedikit beda, tidak bertentangan) | tidak ada |
| B14 | T3 Tabel 5 segmen | Anggaran kata per segmen (9/26/38/26/17) + tempo bervariasi 2,1–2,5 kata/dtk per segmen | tidak ditemukan; hanya total (1C:208-212) dan tempo seragam (AG:17, 3A:51) | HILANG | lihat H1 |
| B15 | T3 Ritme visual | Klip pembuka < 1 dtk; 1,5–2,5 dtk; ganti visual tepat di kata pengubah makna; tahan hero 3–4 dtk di klimaks | 2V:7 (potongan ≤ 1 dtk, shot 1,5–3); 4S:12 (cut di kata VO, 1,5–3 dtk); "tahan hero 3–4 dtk" tidak ada | ADA (sebagian); bagian "tahan hero" HILANG (rendah) | lihat H6 |
| B16 | T3 Klimaks | Perlambat tempo + hening 0,5–0,8 dtk sebelum pengungkapan utama | 1C:218, 1C:249; AG:17 (`//`); NE:94 | ADA (lihat X4 untuk selisih angka) | samakan angka (X4) |
| B17 | T2/T3 Hook-turn | Titik belokan di pertengahan durasi agar retensi tidak turun | 1C:249 (bukti naik tiap 12–15 dtk); 1C:147 (twist 65–75%); 8H:41 | ADA | tidak ada |
| B18 | T6 Contoh AV 115 kata | Skrip contoh (topik video pendek/dopamin; penutup "Jadi rasa hampa…", "Anehnya, kenapa…?") | 7S:114 (#77: dipakai sebagai metode, bukan template kata); deep_research/README.md:5 | DIGANTIKAN v7.0 ("Jadi" di penutup, "kenapa/?" di tubuh hook, bank topik psikologi digital) | tidak ada |

### C. Narasi lisan Indonesia (laju bicara, anggaran kata, connective tissue, mikro-copywriting)
| # | Tahap/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| C1 | T3 Laju bicara | Rentang aman 130–150 WPM (2,17–2,50 kata/dtk) | tempo 2,50–2,66: AG:17, 1C:208, 3A:51; dasar data kanal 3A:51, RISET_VO_TEMPO.md (28 Shorts ID; tempo tak membedakan laku/gagal) | DIGANTIKAN v7.0 (tempo 2,50–2,66 = keputusan user + data) | tidak ada |
| C2 | T3 Anggaran kata | 35 dtk 69–80; 45 dtk 91–105; 50 dtk 102–118; 55 dtk 113–130 | Ringkas 35–42 dtk/85–105; Investigasi 48–55 dtk/115–135: AG:17, 1C:208-212, 1C:242 (43–47 dtk = peringatan) | DIGANTIKAN v7.0 (dua mode, tempo lebih cepat) | tidak ada |
| C3 | T3 | Sisakan ±3,0 dtk untuk jeda dramatis + SFX; naskah ≈ 90% kapasitas | 1C:208 (±3,0 dtk); 1C:213 (batas 135 kata agar ≤ 55 dtk) | ADA | tidak ada |
| C4 | T3 ABT / Therefore-But | Ganti kata sambung aditif "dan kemudian" dengan TETAPI / KARENA ITU / AKIBATNYA (Parker–Stone, Olson) | 1C:91 (F1), 1C:217 (§M3 ABT), 1C:232 (#19); AG:16; LT:31, 185 | ADA | tidak ada |
| C5 | T3 | Sapu transisi daftar ("selain itu", "berikutnya", "tidak hanya itu") | 1C:217; LT:32, 186-187 (error bila ada) | ADA | tidak ada |
| C6 | T3 Question-to-Report | Jangan melunasi pertanyaan sebelum membuka pertanyaan turunan (open loop) | 1C:218; 1C:170 (R1); 8H:40 | ADA | tidak ada |
| C7 | T6 QC #4 | Periksa tiap sambungan antar-kalimat bukan daftar datar | manual: 1C:232 (#19 per transisi segmen); LT:185 hanya cek ≥ 1 konektor ABT ada | ADA (sebagian; alat lebih longgar dari SOP) | opsional: linter cek per-segmen |
| C8 | T4 Panjang kalimat | Rata-rata 13–14 kata (berita TV), satu ide per kalimat; memori kerja pendengar | AG:17 (8–13 kata; pecah > 15–16); 1C:258 (§M9.3); LT:37, 199 (⚠ > 17) | ADA | tidak ada |
| C9 | T4 Branch to the Right | Subjek + kata kerja di pangkal kalimat | 1C:220 | ADA | tidak ada |
| C10 | T4 Penekanan 2-3-1 | Kata paling tajam di ujung kalimat sebelum jeda, terkuat kedua di awal, jangan dikubur di tengah | 1C:220 menandainya "diganti §M9.3", tetapi §M9.3 hanya soal panjang kalimat | HILANG | lihat H2 |
| C11 | T4 Nominalisasi & pasif | Hapus pe-an/ke-an/per-an/-isme/-sasi dan pasif di-/ter-; aktif menegaskan pelaku | 1C:220; 1C:129 (kata kerja aktif dengan objek); LT:36 hanya 3 kata kaku | ADA (aturan); alat/gerbang HILANG | lihat H3 |
| C12 | T4 Passive-Aggressive Tool | Pasif disengaja untuk menempatkan audiens sebagai korban/menyembunyikan antagonis | 1C:220 | ADA | tidak ada |
| C13 | T4 Kala kini palsu | Jangan memakai present tense palsu untuk peristiwa arsip lampau | tidak ditemukan | HILANG (rendah) | lihat H4 |
| C14 | T4 Burstiness (Provost) | Selingi kalimat panjang dengan kalimat pendek 3–6 kata untuk pukulan | 1C:220 + 1C:258 (diganti: 8–13 kata, tanpa 3+ staccato); AG:17; LT:201-204 | DIGANTIKAN v7.0 | tidak ada |
| C15 | T4 Keheningan | Jeda = penanda emosi utama (kontur nada datar), ruang berpikir | AG:17; 1C:218, 1C:223; NE:94 | ADA | tidak ada |
| C16 | T4 Tabel contoh luwes vs kaku | Contoh penulisan ulang memakai "Bukan peretas dari luar. / Kesalahan mereka sendiri." dan "bukan karena … TETAPI …" | 1C:132 melarang "bukan X tapi Y"; 7S:114 (#77) mencatat pola tidak disalin | BERTENTANGAN (internal, lihat X1) | lihat X1 |
| C17 | T4 Tabel contoh | Contoh "kebocoran kata sandi", "meta-analisis 100 ribu partisipan", "ujung lidah" (topik psikologi/IT) | tidak disalin; metode ada di 1C:220, 129 | DIGANTIKAN v7.0 (topik di luar 2 Mesin; zero-citation 1C:219) | tidak ada |
| C18 | T4 Zero-citation | Tanpa kutipan verbal panjang; atribusi di lapisan visual (halaman jurnal + stabilo) | 1C:219; AG:17; 2V:72 (stabilo); 7S:#80b; LT:33-35, 188-193 | ADA | tidak ada |
| C19 | T2 langkah 3 | Jangan sebut nama peneliti/tahun di kalimat pembuka | 1C:167 (H7); 7S:97 (#61) | ADA | tidak ada |
| C20 | T2 Ladder of Abstraction (Clark) | Mulai dari benda fisik → nama mekanisme → kembali ke benda | 1C:220 | ADA | tidak ada |
| C21 | T2 Storycraft/Gutkind (laporan vs cerita, adegan konkret, 4 langkah konversi jurnal → adegan) | Adegan terukur, bukan ringkasan abstrak | praktik: 1C:129 (satu kalimat = satu gambar), 1C:171 (R2), 7S:115 (#78 adegan konkret); sumber teori tidak disebut | ADA (praktik; nama Hart/Gutkind tidak ada, tak perlu) | tidak ada |
| C22 | T5/T6 Zero-CTA | Penutup tanpa ajakan bertindak eksplisit | AG:17; 1C:137 (V5) | ADA | tidak ada |
| C23 | T4 Sapaan/kata ganti | (SOP memakai "kamu") | 1C:128 (kamu/kita); AG:17 (lisan luwes) | ADA | tidak ada |

### D. Format VO/AV + simbol penandaan
| # | Tahap/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| D1 | T6 | Skrip AV 2 kolom (visual kiri, audio kanan) | 1C:222-223 (§M4); NE:92-97; AG:17 | ADA | selaraskan 7S:115 (lihat X3) |
| D2 | T6 Simbol 1 | `/` jeda napas 0,2–0,3 dtk | AG:17 (~0,25); 1C:223; NE:94 | ADA | tidak ada |
| D3 | T6 Simbol 2 | `//` hening 0,5–0,8 dtk sebelum pembalikan/pukulan | AG:17 (0,5–0,6); 1C:218, NE:94 (0,5–0,8) | ADA (angka tak seragam) | lihat X4 |
| D4 | T6 Simbol 3 | HURUF KAPITAL = penekanan | 1C:223; NE:94 | ADA | tidak ada |
| D5 | T6 Simbol 4 | `[perlambat: teks]` | 1C:223; NE:94 | ADA | tidak ada |
| D6 | T6 Simbol 5 | `(catatan)` = arahan emosi, tidak dibacakan; `[SFX: …]` | 1C:223 (`(intonasi)` + SFX) | ADA | tidak ada |
| D7 | T6 | Notasi dibuang di VO bersih; model Saos Cocol memakai tag emosi, bukan `/` | 1C:223; NE:98; 1C:134 (F5 tag) | ADA (adaptasi) | tidak ada |
| D8 | T6 | Cegah dead air dan orphaned visuals; tiap baris audio punya visual spesifik, bukan stok generik | 1C:235 (#22); 1C:153 (F6 #14); 2V:7; 4S:8-9 | ADA | catatan: LT tidak memeriksa AV 2 kolom, hanya script_vo.txt |
| D9 | T6 | Skrip AV contoh siap rekam (50 dtk/115 kata) sebagai templat | 7S:114 (#77); 1C:222-223 (format dipakai, contoh tidak) | DIGANTIKAN v7.0 (lihat B18) | tidak ada |

### E. Quality gate
| # | Tahap/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| E1 | T6 QC #1 | Baca lantang ber-stopwatch; durasi 35–55 dtk termasuk jeda | 1C:103; 1C:151 (#12); 1C:262 (#23); 1C:257 | ADA | tidak ada |
| E2 | T6 QC #2 | Audit isolasi: baca 0–4 dtk berdampingan dengan penutup; ancaman pembuka terbayar tanpa nasihat | 1C:137 (V4), 1C:142 (#3), 1C:148 (#9); 8H:48 (P) | ADA (setara) | tidak ada |
| E3 | T6 QC #3 | Sapu nominalisasi/pasif sebagai butir gerbang | tidak ada butir di scorecard M6/#23; LT:36 minim | HILANG | lihat H3 |
| E4 | T6 QC #4 | Verifikasi perekat ABT antar-kalimat | 1C:232 (#19); LT:185 | ADA | lihat C7 |
| E5 | T6 QC #5 | Audit keselarasan dua kolom, tanpa visual kosong/stok generik | 1C:235 (#22), 1C:153 (#14) | ADA | tidak ada |
| E6 | T6 QC #6 | Uji tanpa suara | 1C:152 (#13), 1C:154 (#15); 7S:97 (#61); 4S:6-7 | ADA | tidak ada |
| E7 | T6 | Enam cek berurutan sebelum rekam; gerbang di tiap transisi tahap | 1C:194-199 (K); AG:36 (§4); 1C:227-236 | ADA | tidak ada |
| E8 | Pendahuluan | Catatan jujur: tidak ada kurva retensi detik-per-detik khusus kanal faceless ID 35–55 dtk; cetak biru = sintesis | 8H:54 (Batas bukti); 1C:75, 1C:213; 7S:114 (⚠) | ADA | tidak ada |
| E9 | T6 | Penutup berrotasi, tanpa nasihat; Anti-Exit Words (contoh SOP "Jadi saat…" dan "Lain kali jarimu…" melanggar) | AG:18; 1C:221, 1C:241; LT:25, 146-148 | DIGANTIKAN v7.0 (contoh), aturan ADA | tidak ada |

### F. Penutup (6 detik terakhir) dan Topik/Stress-Test
| # | Tahap/bagian | Temuan | Lokasi di repo | Status | Tindakan |
|---|---|---|---|---|---|
| F1 | T5 Penutup | 5 arketipe: Reframing Sistemik, Cermin Personal, Dilema Abu-Abu, Lingkar Naratif Mulus (Ringkas), Pemicu Dunia Nyata | 1C:224-226, 1C:240; AG:18; LT:24, 144-145 | ADA | tidak ada |
| F2 | T5 Penutup | Silent Mirror memancing komentar organik tanpa ajakan | 1C:225; komentar pin berisi pertanyaan: LT:131-134 | ADA | tidak ada |
| F3 | T5 Penutup | Lonjakan emosi di 2 detik terakhir + Berger–Milkman (high-arousal, social currency, triggers) | peak-end: 1C:89; Berger–Milkman tidak ada | ADA (peak-end); Berger–Milkman HILANG (rendah) | lihat H8 |
| F4 | T5 Seamless Loop | Baris akhir bersambung tata bahasa ke detik 0:00 | 1C:225 (khusus Ringkas); 1C:117 (grammar loop paksa dicabut 14 Nov); 1C:248 (Conceptual Loop) | ADA (dibatasi Ringkas) | tidak ada |
| F5 | T2 Stress-Test, rangka | Topik dipilih menurut ketegangan yang dapat dibangun, bukan keunikan fakta; uji go/no-go sebelum menulis | AG:13; 1C:58, 1C:66; RP:97; NE:29 | ADA | tidak ada |
| F6 | T2 Uji 1 | Zona celah informasi menengah (Loewenstein, kurva U 33–67%, berguna) | RP:70-71 (v6.0); AG:13 | DIGANTIKAN v7.0 (RP:97: "celah 33–67% jadi pedoman, bukan gerbang") | tidak ada |
| F7 | T2 Uji 1 | Celah yang mengancam identitas memicu penyangkalan/kecemasan; anomali familier tapi aman | RP:71 ("tanpa menyerang ego"); RP:90 (#86 Tes Objek Harian & Grup WA); AG:12 (Garis Merah) | ADA | tidak ada |
| F8 | T2 Uji 1 | Toleransi ambiguitas berbeda antar-budaya | tidak ditemukan | HILANG (rendah) | lihat H7 |
| F9 | T2 Uji 2 | Retention Anchor: realisasi baru, bukan rangkuman/nasihat | RP:72 (v6.0); 1C:215, 1C:248; AG:12 (Garis Merah (1)), AG:26 (Curtain-Pull) | ADA (turun ke Channel-Fit Gate #4, bukan gerbang Stress-Test v7.0) | tidak ada |
| F10 | T2 Uji 3 | Vox Handle: ≥ 2 dari 3 pilar (geografi, angka, waktu) + artefak yang dapat dianimasikan | v7.0: artefak fisik (struk, kemasan, tabel harga, dokumen, peta, grafik) AG:13, RP:97; versi pilar: RP:73 (v6.0) | DIGANTIKAN v7.0 | tidak ada |
| F11 | T2 Uji 4 | Satu ide tanpa kata "dan", satu pertanyaan, satu titik belok, satu pengungkapan; tolak daftar sub-topik | 1C:97 (kalimat cerita), AG:13 (3 Pilar Konflik incl. The Turn), RP:74 (v6.0) | ADA (rumusan "tanpa dan" DIGANTIKAN v7.0, substansi hidup) | tidak ada |
| F12 | T2 | Konversi jurnal → adegan 4 langkah; atribusi jurnal di lapisan visual | lihat C18-C21 | ADA | tidak ada |
| F13 | T1 Tabel 4 ranah + bank bias | Klaim studi (video pendek menurunkan fokus, dopamin "wanting vs enjoying", ~100.000 partisipan) | 7S:114 (#77: klaim studi ditandai ⚠); deep_research/README.md:6 (bank psikologi DIGANTIKAN v7.0) | DIGANTIKAN v7.0 (tidak dipakai; topik ber-pintu psikologi) | verifikasi sumber primer bila suatu hari dipakai |
| F14 | T2 Topik | Topik: antarmuka (tombol batal abu-abu), nota, harga coret, "Setuju Semua" | sejalan 2 Mesin B3; AG:11 | ADA (sebagai arah, bukan templat) | tidak ada |

## 3. Catatan kerja audit
- Verifikasi dilakukan dengan grep atas AG, CLAUDE.md, SKILL.md, references 1–9, `research/niche/*.md` (+ `topik/RUMUS_PEMILIHAN.md`), `lint_episode.py`, `new_episode.sh`; nomor baris = keadaan repo 23 Nov 2026.
- Tidak ada berkas repo lain diubah; tidak ada commit.
- Cek `LT` tidak mencakup: panjang H1 (≤ 14 kata/≤ 4,0 dtk), kelengkapan skrip AV 2 kolom, imbuhan nominalisasi/pasif per-segmen ABT. Itu celah alat, bukan celah aturan.
