# ARSIP KASUS #018: bankkeliling — Pinjam Rp200 Ribu, Terima Rp180 Ribu, Bayar Rp240 Ribu
**Formula ARSIP v7.0** · **Status:** SKRIP FINAL v1 (22 Nov 2026, Claude/Opus, effort high) — menunggu persetujuan user sebelum VO (konektor ElevenLabs, 1 take) · **Mode produksi:** Otomatis (Claude penuh; riset per batch: 6 kandidat → 4 terkunci, `AGENTS.md` §3) · **Model:** Sonnet untuk riset/fact sheet, model penalaran tertinggi + effort high untuk skrip final dan `film.js`

**Penanda wajib (dibaca `python3 kit/tools/lint_episode.py --batch …`; isi semuanya sebelum VO):**
[HOOK: Bom di Bawah Meja] [ENDING: Lingkar Naratif Mulus] [MESIN: B3] [LATAR: benda] [SEGAR: 2024] [MODE: Ringkas] [ARTEFAK: amplop pinjaman berisi uang Rp180 ribu dan kartu cicilan 24 kotak] [LOOP: kartu cicilan 24 kotak yang masih kosong di samping amplop → kotak ke-24 dicoret lunas, amplop tetap setipis Frame 0 @38] [LABEL: satu asal]

## Kompas & Channel-Fit Gate (v7.0; `AGENTS.md` §2A; semua ✓ sebelum fact sheet)
- [x] Garis Merah v7.0: bukan self-help/tips/nasihat (tidak ada "jangan pinjam", "pilih yang legal", "lain kali"); bukan bantahan mitos datar atau bacaan pasal (tidak ada nomor pasal/UU di VO); bukan topik basi (bank keliling: 19 video, max 308.870 = ceramah riba, tak ada dokumenter skema); bukan meta-YouTube; bukan studi Daftar Hitam (bukti = hitungan skema dari 2 studi lokal + batas OJK)
- [x] Topic Stress-Test v7.0: sudut "hitung isi amplop" belum diperah kreator besar · dekat dompet warga 20–45 (pinjaman harian tanpa bank) · 3 Pilar Konflik (antagonis = skema potongan di awal; stakes = uang harian; Turn = bunga "Rp40 ribu" dihitung dari uang yang tidak pernah dipegang utuh) · Vox Handle (amplop + uang + kartu cicilan 24 kotak)
- [x] Artefak fisik Frame 0 (≥ 486 px, stempel merah ≤ 0,25 dtk; bukan otak/kartun berpikir): amplop cokelat terbuka, tulisan pensil "Rp200.000" di tutup amplop, isi uang kertas generik Rp180 ribu dikipas; stempel merah **Rp180.000** ≤ 0,25 dtk
- [x] Antagonis tak kasatmata + taruhan nyata: skema "potongan di awal + cicilan harian kecil" yang membuat biaya asli tak terlihat · taruhan: uang harian peminjam (Rp240 ribu dibayar untuk Rp180 ribu yang diterima)
- [x] The Turn (pembalikan babak): bunga yang tampak "cuma Rp40 ribu" dihitung dari Rp200 ribu, padahal yang sampai ke tangan Rp180 ribu; dihitung per hari > 5× batas bunga pinjol berizin (@±21–33 dtk)
- [x] Penutup Curtain-Pull Reveal (tanpa menggurui; Lingkar Naratif Mulus, khusus Ringkas): kartu 24 kotak lunas, amplop Frame 0 kembali "setipis ini" → replay mulus ke H1 "Amplop pinjaman dua ratus ribu ini…"
- [x] Mesin B4: tidak berlaku (episode = **B3** jebakan harga/kontrak); jangkar Indonesia tetap di 0–12 dtk (amplop rupiah, Klaten & Lebak)

## Tangga bukti (micro-rehook tiap 12–15 dtk; `1-cerita…` §M8.2; Ringkas = 3 pergeseran)
| Detik (estimasi) | Tingkat | Isi |
|---|---|---|
| ±0–9 | Asumsi Awal | amplop Rp200 ribu isinya Rp180 ribu; potongan Rp20 ribu "kedengarannya wajar", cicilan Rp10 ribu/hari "ringan" |
| ±9–21 | Jangkar Lokal | skema yang sama diteliti di Klaten (2012) dan Lebak (2024): 24 hari × Rp10 ribu = Rp240 ribu; "di atas kertas bunganya cuma Rp40 ribu" |
| ±21–33 | Dokumen Kontrol (The Turn) | `//` "Masalahnya": Rp40 ribu dihitung dari Rp200 ribu yang tidak pernah dipegang utuh; potongan di awal menyembunyikan bunga asli; per hari > 5× batas bunga pinjol berizin (OJK SP 76/2025: 0,3%/hari) |
| ±33–41 | Pembalikan (+ Conceptual Loop terungkap) | kotak ke-24 dicoret lunas; amplop Frame 0 tetap setipis ini → replay ke H1 |

## Klasifikasi (v7.0)
| Kolom | Isi |
|---|---|
| Mesin cerita (v7.0: A ~60% · B ~40%) | **B3** jebakan harga/kontrak: biaya dipotong di depan + cicilan harian kecil = bunga asli tak terlihat |
| Mode durasi | **Ringkas** (35–42 dtk, 85–105 kata): skrip 102 kata, estimasi ±40–41 dtk mentah (2,6 kata/dtk + 1 hening 0,6 + jeda `/`); atempo ≤ 1,10 bila perlu |
| Arketipe hook (K1–K5) / penutup (1–5) / latar visual utama | K1 Bom di Bawah Meja (ancaman tersembunyi di dalam amplop yang dipegang penonton) / 4 Lingkar Naratif Mulus / `benda` (amplop + uang + kartu cicilan) |
| Pola judul (kuota 3:1) | Pola 1 (benda/harga konkret: tiga angka rupiah berurutan) |
| **Status replikasi studi** | **Bukan studi psikologi.** Bukti = dokumentasi skema di 2 studi lokal (Jurnal Orasi Bisnis Ed. VIII, Nov 2012, Klaten; Jurnal Socius vol.1 no.12, Jul 2024, Lebak) + hitungan bunga efektif sendiri (python) + siaran pers OJK SP 76/OJK/GKPB/V/2025 (primer, dibaca penuh). Bukan Daftar Hitam. **Tidak ada survei nasional** → atribusi lokal wajib |

## Validasi topik (skor ≥ 16/20, tidak ada nilai ≤ 2)
Penilaian topik dilakukan di fase riset (`research/batch_017_020/shortlist.md` putaran 11–12, 17; peringkat keyakinan **sedang**: basis 2 studi lokal). Tidak dinilai ulang di fase skrip.
Hasil `riset_topik.py` (putaran 17): saran = 25, video = 19, max = 308.870 (ceramah riba, bukan dokumenter skema); pembanding permintaan: RaymondChins "Bank Keliling (BangKe)" 1,6 jt (9,8× median kanal).

## Anatomi konflik non-kriminal (lembar kerja F2, v6.0)
1. Antagonis tak kasatmata: **skema potongan di awal** (Rp20 ribu diambil sebelum uang diterima) + cicilan harian kecil yang membuat total dan bunga asli tak terasa.
2. Taruhan nyata: uang harian peminjam: Rp240 ribu dibayar dalam 24 hari untuk Rp180 ribu yang sampai ke tangan.
3. Tiga babak: The Pledge (amplop Rp200 ribu, potongan wajar, cicilan ringan) → The Turn (bunga "Rp40 ribu" dihitung dari angka yang tak pernah dipegang utuh; > 5× batas pinjol berizin) → The Prestige (kartu lunas, amplop tetap setipis ini).

## Uji POV penonton (4 pertanyaan, jawab sebelum menulis script)
1. Siapa melawan siapa / siapa pelakunya? Peminjam ("kamu", POV hipotetis) melawan skema potongan di awal; tidak ada orang/lembaga yang dituduh dan tidak ada klaim status hukum di VO.
2. Objek fisik konkret apa yang ditunjuk di layar? Amplop pinjaman berisi Rp180 ribu + kartu cicilan 24 kotak.
3. Taruhan langsung ke penonton (uang, waktu, keselamatan)? Uang harian: Rp10 ribu/hari selama 24 hari.
4. "Alasan ASLI" yang dibawa pulang penonton (satu kalimat): bunga bank keliling kelihatan kecil karena dihitung dari Rp200 ribu, padahal biaya sudah dipotong sebelum uangnya sampai ke tangan.

## Fact sheet (2 lapis sumber)
| # | Klaim | Lapis | Status | Sumber |
|---|---|---|---|---|
| 1 | Klaten: pinjam Rp200.000, diterima Rp180.000 (Rp10.000 administrasi "hangus" + Rp10.000 tabungan), angsuran Rp10.000/hari × 24 hari = Rp240.000 (alt. 30 × Rp8.000); penulis: 25%/bulan | lokal | PDF diekstrak (pdftotext), dibaca | Jurnal Orasi Bisnis Ed. VIII, Nov 2012 (Polsri), studi Koperasi PBT, Kec. Bayat, Klaten |
| 2 | Lebak: pinjam Rp200.000, diterima Rp180.000 (Rp10.000 tabungan + Rp10.000 untuk bank keliling), Rp10.000/hari × 24 hari, "total bunga Rp40.000" | lokal | PDF diekstrak, dibaca | Jurnal Socius vol.1 no.12, Jul 2024, Kp. Cikeyeup, Desa Gunung Anten, Lebak |
| 3 | Bunga efektif (anuitas harian, hitungan sendiri): dari Rp200 rb ≈ 1,51%/hari; dari Rp180 rb ≈ 2,44%/hari (≈ 891%/th tanpa majemuk) | hitungan | python, dicek | shortlist putaran 12 |
| 4 | Batas manfaat ekonomi pinjol (pindar) berizin konsumtif tenor ≤ 6 bln: 0,3%/hari | primer | dibaca penuh | OJK SP 76/OJK/GKPB/V/2025 (20 Mei 2025) |
| 5 | Rasio: 1,51/0,3 ≈ 5,0× (dari nominal) · 2,44/0,3 ≈ 8,1× (dari uang diterima) → **"lebih dari lima kali lipat"** benar di kedua basis | hitungan | dicek | (3) + (4) |
Angka hanya bila eksplisit di sumber; VO hanya memakai angka rupiah skema (1–2) + "lebih dari lima kali lipat" (5).

## Celah & batas hukum
Tidak diketahui (tidak boleh diucapkan): apakah tabungan Rp10 ribu dikembalikan di akhir (bila ya, biaya riil < hitungan dari Rp180 rb; klaim "> 5×" tetap aman karena berlaku juga dari nominal Rp200 rb); seberapa luas skema ini di luar 2 lokasi studi; status hukum resmi bank keliling (hanya OCBC/artikel: informal, "tidak diawasi OJK"; pasal UU Perbankan TIDAK terverifikasi) → **status hukum tidak diucapkan di VO**; nama/lembaga pemberi pinjaman di lokasi studi.
Bantahan pihak terkait: tidak ada pihak bernama yang dituduh; tidak ada bantahan yang perlu disebut.
Atribusi pendek: "diteliti di Klaten dan Lebak" (kalimat ke-4, sekali; menggantikan generalisasi nasional) · tahun di layar (STUDI KLATEN 2012 · STUDI LEBAK 2024 sebagai cap, tanpa pita sumber, Aturan #82) · uang & amplop generik, tanpa logo · deskripsi "tidak disponsori". Jangan pakai angka bank emok Sukabumi (skema lain). Pembanding OJK disebut "batas bunga pinjol berizin" (konsumtif ≤ 6 bln), tanpa nomor SP di VO.

## Judul & penguncian 3-titik (0,0–4,0 dtk) — Aturan Kuda Troya (tanpa psikologi/bias/kenapa/padahal/tapi/ternyata/? di judul dan frame 0, kecuali slot uji)
**Judul (final):** `Pinjam Rp200 Ribu, Terima Rp180 Ribu, Bayar Rp240 Ribu` · 54 karakter (≤ 55; di atas ideal 38–48, dipertahankan demi tiga angka paralel yang langsung terbaca)
Frame 0 (hero ≥ 45% lebar ≈ ≥ 486 px di y 150–1150 + hantaman stempel/label ≤ 0,25 dtk; barang bukti fisik): amplop cokelat terbuka ≥ 520 px, tulisan pensil "Rp200.000" di tutupnya; uang kertas generik (tanpa gambar uang asli yang bisa dikira scan) dikipas keluar; stempel merah **Rp180.000** jatuh ≤ 0,25 dtk; teks layar ≤ 5 kata: **PINJAM 200, DAPAT 180**. Detail loop (tidak disorot): kartu cicilan kecil 24 kotak kosong di samping amplop.
Kalimat H1 (selesai ≤ 4,0 dtk, ≤ 14 kata): "Amplop pinjaman dua ratus ribu ini isinya cuma seratus delapan puluh." (11 kata; estimasi ±4,2 dtk pada 2,6 kata/dtk → cek ulang ≤ 4,0 dtk di `vo_words.json`; bila lewat, atempo atau rapatkan)

## Skrip AV 2 kolom (final; `1-cerita…` §M4)
Tempo VO 2,50–2,66 kata/dtk, atempo ≤ 1,10. Notasi: `/` jeda ≈ 0,25 dtk · `//` hening ≈ 0,6 dtk · `KAPITAL` penekanan · `(intonasi)`. Waktu = estimasi 2,6 kata/dtk + jeda; dikunci ulang dari `vo_words.json` setelah VO. Kolom audio = VO word-for-word (sama persis dengan `audio/script_vo.txt`, 102 kata) + notasi studio.
| # | Waktu (estimasi) | Visual kolase (arsip / dokumen / gerak) | Audio: VO word-for-word + notasi + SFX |
|---|---|---|---|
| 1 | 0,0–4,2 | FRAME 0 (lihat atas). Uang dikipas keluar dari amplop; dua lembar sepuluh ribu "hilang" dari kipas (bayangan kosong); cap merah Rp180.000. Kartu cicilan 24 kotak kosong di sudut, tidak disorot. | (serius, pelan-tajam) · SFX: amplop disobek + stempel 0,00 · VO: Amplop pinjaman DUA RATUS RIBU ini / isinya cuma seratus delapan puluh. |
| 2 | 4,2–9,5 | Dua lembar Rp10 ribu ditarik penjepit kertas ke tepi meja, label kecil "potongan di awal"; lalu satu koin/lembar Rp10 ribu jatuh ke kotak 1 kartu cicilan, label "Rp10.000 / hari". | (ringan, seolah wajar) · SFX: kertas digeser, koin jatuh pelan · VO: Potongan dua puluh ribu kedengarannya wajar. / Cicilannya juga ringan, cuma sepuluh ribu sehari. |
| 3 | 9,5–17,6 | Peta Jawa kolase, dua pin merah: cap **STUDI KLATEN · 2012** dan **STUDI LEBAK · 2024**, kertas skema identik di kedua pin (200 → 180 → 10 rb × 24). Lalu kartu cicilan terisi cepat 24 kotak, kalkulator kertas mencetak **Rp240.000** (stabilo kuning). | (merendah, investigatif) · SFX: pin ditancap ×2, 24 ketukan cepat, struk kalkulator · VO: Skema persis kayak gini diteliti di KLATEN dan LEBAK. / Dua puluh empat hari nyicil, / totalnya dua ratus empat puluh ribu. |
| 4 | 17,6–20,7 | Lembar hitungan rapi: 240 − 200 = **40 rb**, dicap biru "BUNGA"; tampak kecil dan wajar. | (datar, seperti membaca brosur) · SFX: stempel biru · VO: Di atas kertas, / bunganya cuma empat puluh ribu. |
| 5 | 20,7–26,7 | Hening 0,6 dtk: kamera menukik ke angka 200 di lembar hitungan; angka 200 terkelupas, di bawahnya amplop Frame 0 berisi 180. Garis ukur merah dari 180 ke 240 (selisih **Rp60 rb**, label kecil "dari uang yang dipegang"). | `//` sebelum "Masalahnya" · (merendah) · SFX: kertas dikelupas · VO: // Masalahnya, angka itu dihitung dari DUA RATUS RIBU / yang nggak pernah kamu pegang utuh. |
| 6 | 26,7–35,0 | Penjepit potongan di awal dibuka: di baliknya tertulis "bunga asli". Grafik batang meja: **0,3%/hari** (cap biru "BATAS PINJOL BERIZIN · OJK 2025") vs batang merah **≥ 1,5%/hari** (dari Rp200 rb) memanjang hingga **2,44%/hari** (dari Rp180 rb); cap merah **> 5×**. | (serius, perlambat di "lebih dari lima kali lipat") · SFX: penjepit dibuka, batang grafik ditarik, stempel merah · VO: Potongan di awal itu yang nyembunyiin bunga aslinya. / Dihitung per hari, / bunganya LEBIH DARI LIMA KALI LIPAT batas bunga pinjol berizin. |
| 7 | 35,0–40,8 | CURTAIN-PULL: kembali ke meja Frame 0; pena mencoret kotak 24 (cap LUNAS); kamera mundur ke amplop yang sama, terbuka, tetap tipis dengan isi 180 (komposisi identik Frame 0 agar replay menyambung). | (pelan, hangat-dingin) · SFX: pena mencoret, cap lunas; ekor ≤ 0,15 dtk · VO: Kartu cicilannya lunas di kotak kedua puluh empat. / Amplop yang kamu terima / tetap setipis ini. |

VO bersih (tanpa notasi) → `audio/script_vo.txt`; bertag → `audio/vo_prompt_elevenlabs.md`.
Penutup: 4 Lingkar Naratif Mulus (Ringkas) + Curtain-Pull Reveal: kartu cicilan 24 kotak (detail Frame 0) dicoret lunas @±37, amplop Frame 0 "setipis ini" @±39 → replay mulus ke "Amplop pinjaman dua ratus ribu ini…". Kalimat terakhir pernyataan, bukan nasihat; tanpa kata pembuka terlarang. Ekor audio ≤ 0,15 dtk.

## Ringkasan The Turn
Pledge: potongan Rp20 ribu dan Rp10 ribu/hari terdengar wajar → di atas kertas "bunganya cuma Rp40 ribu". **Turn (@±21 dtk, setelah hening 0,6):** Rp40 ribu itu dihitung dari Rp200 ribu yang tak pernah dipegang utuh; biaya sudah diambil sebelum uang disentuh. **Bukti puncak (@±29–34):** dihitung per hari > 5× batas bunga pinjol berizin. Prestige: kartu lunas, amplop tetap setipis ini.

## Scorecard v7.0 (16 cek §F6 + cek 17–22 `1-cerita…` §M6 + #23 §M9)
| # | Cek | Hasil |
|---|---|---|
| 1 | Konfirmasi judul | ✓ H1 = angka 200/180 judul, ±4 dtk (cek ≤ 4,0 setelah VO) |
| 2 | Celah | ✓ "isinya cuma 180" → ke mana 20 ribu, berapa yang dibayar |
| 3 | Jawaban | ✓ Rp240 ribu, bunga asli tersembunyi di potongan awal, > 5× batas pinjol |
| 4 | Mekanisme | ✓ 3 langkah: potong di awal → cicil harian kecil → bunga dihitung dari angka utuh |
| 5 | Tapi/maka | ✓ |
| 6 | Uji hapus | ✓ tiap ketukan memikul satu anak tangga |
| 7 | Satu tokoh/objek | ✓ amplop (+ kartu 24 kotak) |
| 8 | Twist | ✓ @±21–33 dtk (≈ 52–80% durasi) |
| 9 | Akhir | ✓ Lingkar Naratif Mulus, tanpa CTA |
| 10 | Faktual | ✓ hanya angka skema 2 studi + "lebih dari lima kali lipat" (benar dari nominal maupun uang diterima); tanpa angka nasional, tanpa status hukum |
| 11 | Bahasa | ✓ lisan (nggak, kayak gini, nyicil, nyembunyiin), dibaca keras |
| 12 | Durasi | ✓ 102 kata (Ringkas 85–105), ±40–41 dtk mentah |
| 13 | Bisu | ✓ angka di layar: 200 · 180 · 10 rb × 24 · 240 · 40 rb · 0,3% vs ≥ 1,5–2,44% · > 5× |
| 14 | Visual | ✓ tiap kalimat punya benda (amplop, uang, kartu, peta, grafik) |
| 15 | POV | ✓ "pinjol berizin" dikenal umum; "kamu" = peminjam hipotetis |
| 16 | Kemasan aman | ✓ atribusi lokal sekali, tahun di layar, tanpa logo/merek, tanpa tuduhan ke pihak bernama |
| 17 | Filter replikasi | ✓ bukan studi psikologi; bukan Daftar Hitam |
| 18 | Kuda Troya | ✓ judul/Frame 0/H1 tanpa kata terlarang |
| 19 | ABT | ✓ "Masalahnya" sebagai engsel Turn; tanpa transisi daftar |
| 20 | Zero-Citation | ✓ tanpa "menurut studi/penelitian"; hanya atribusi lokal "diteliti di Klaten dan Lebak" |
| 21 | Anti-Exit | ✓ kalimat akhir "Amplop yang kamu terima…"; 2 kontras angka (Rp180 vs Rp200/240; > 5× batas) |
| 22 | AV 2 kolom | ✓ 7 ketukan; dipecah ±2–2,5 dtk/shot di storyboard |
| 23 | Napas | ✓ 6–14 kata per kalimat (rata-rata 9,3), tanpa staccato beruntun, tanpa kata kaku |

## Catatan lanjut
- **22 Nov 2026: skrip final v1 ditulis (Claude/Opus).** Menunggu persetujuan user → VO via konektor ElevenLabs (1 take) → `vo_tighten.py` (hold 0,6 dtk sebelum "Masalahnya") → `vo_words.json`. Cek H1 ≤ 4,0 dtk.
- **⚠ tersisa:** (1) nasib tabungan Rp10 ribu (dikembalikan atau tidak) tidak diketahui; VO sengaja tidak mengklaim "Rp60 ribu bunga" (Rp60 rb hanya label layar "dari uang yang dipegang") dan memakai "> 5×" yang benar di kedua basis; (2) basis hanya 2 studi lokal (Klaten 2012 sudah 14 tahun) → jangan digeneralisasi; deskripsi upload wajib menyebut kedua lokasi + tahun; (3) batas OJK 2026 bisa lebih rendah (berita 0,1%/hari tak sinkron) → acuan tabel primer Mei 2025; layar menulis "OJK 2025"; (4) status hukum bank keliling tidak diverifikasi primer → tidak diucapkan; (5) H1 11 kata (estimasi ±4,2 dtk) perlu dicek ≤ 4,0 dtk setelah VO.
- Fakta yang sengaja tidak dipakai di VO: 891%/tahun (hitungan disetahunkan tanpa majemuk, bergantung basis Rp180 rb), 25%/bulan & 300%/tahun versi penulis Klaten, bunga Koperasi PBT 2%/bulan, alternatif 30 hari × Rp8.000, program "Melawan Rentenir" Rp64,8 T, status "tidak diawasi OJK" (OCBC, bukan primer), bank emok Sukabumi, nomor SP OJK.

## Fakta terverifikasi (riset batch #017–#020, 22 Nov 2026) — judul draf: Pinjam Rp200 Ribu, Terima Rp180 Ribu, Bayar Rp240 Ribu
- Skema (2 studi lokal): Koperasi PBT Kec. Bayat, Klaten (Jurnal Orasi Bisnis Ed. VIII Nov 2012): pinjam Rp200.000, terima Rp180.000, cicil Rp10.000 × 24 hari = Rp240.000; Kp. Cikeyeup, Lebak (Socius vol.1 no.12 Jul 2024): skema sama, "total bunga Rp40.000". **Wajib atribusi lokal ("studi di Klaten/Lebak"); tidak ada survei nasional.**
- Bunga efektif (hitungan python): nominal Rp200rb ≈1,51%/hari (≈552%/th); uang diterima Rp190rb ≈1,96%/hari; **Rp180rb ≈2,44%/hari (≈891%/th)**.
- Pembanding: OJK SP 76/OJK/GKPB/V/2025 (20 Mei 2025) batas bunga pinjol konsumtif ≤6 bln 0,3%/hari → klaim aman "lebih dari 5 kali lipat batas bunga pinjol berizin".
- Status hukum: ucapkan "tidak diawasi OJK menurut studi/artikel"; pasal UU Perbankan dari Gemini TIDAK terverifikasi. Jangan pakai angka bank emok Sukabumi (skema lain).
