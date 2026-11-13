# ARSIP KASUS #003 — Micin
**Status:** fact sheet v1 ✓ · script menunggu hasil sprint riset (RISET_JUDUL, RISET_STRUKTUR_SCRIPT, RISET_AUDIO_CAPTION_META).
**Pilar v4:** benda dikenal (sachet micin) + anggapan dibalik ("micin bikin bodoh") + tokoh (dokter penulis surat 1968, ilmuwan 1969) + jawaban tak tertebak (ketakutan global berawal dari satu surat; glutamat paling melimpah justru di ASI).
**Shortlist:** 5/4/4/5/5 = 23. Satu kalimat cerita: *Satu surat pembaca dokter di jurnal kedokteran 1968 menebak micin sebagai penyebab gejala setelah makan di restoran Cina, tapi koran dan satu eksperimen suntik tikus mengubahnya jadi ketakutan dunia, maka "micin bikin bodoh" dipercaya sampai sekarang — padahal uji buta pada manusia tidak konsisten dan glutamat yang sama melimpah di ASI.*

## Fact sheet
| # | Klaim | Status | Sumber |
|---|---|---|---|
| 1 | 4 Apr 1968, surat pembaca "Chinese-Restaurant Syndrome" di *New England Journal of Medicine* oleh Dr. Robert Ho Man Kwok: setelah makan di restoran Cina, kebas di tengkuk menjalar ke lengan, lemas, jantung berdebar | terverifikasi | Science History Institute, *Distillations* "The Rotten Science Behind the MSG Scare"; teks surat (roblog.co.uk); Colgate Magazine 2019 |
| 2 | Ia menebak beberapa penyebab: arak masak, garam tinggi, atau MSG; yang melekat adalah MSG | terverifikasi | teks surat; *Distillations* |
| 3 | Sebulan kemudian dokter-dokter lain membalas dengan pengalaman serupa (sebagian satir); koran mengutip, istilah menyebar | terverifikasi | *Distillations*; Chowhound/iflscience (sekunder) |
| 4 | 2018 Dr. Howard Steel mengaku surat itu ditulis sebagai taruhan dengan nama samaran; anak-anak Dr. Kwok membantah dan anak Steel pun tidak percaya | **diperdebatkan** — hanya boleh disebut sebagai "mengaku" + "dibantah" | Colgate Magazine (Feb 2019); This American Life #668 via Skeptoid #733 |
| 5 | 1969, John Olney (*Science* 164:719): MSG **disuntikkan di bawah kulit** bayi tikus → kerusakan sel saraf di otak (hipotalamus), kelak gemuk & pertumbuhan terhambat | terverifikasi | abstrak *Science* 1969 (ADS); *Distillations*. Dosis "hingga 4 mg/g berat badan" = sekunder → **tidak disebut angka** |
| 6 | Uji buta ganda 130 orang yang mengaku sensitif MSG (Geha dkk. 2000): dosis besar tanpa makanan memicu gejala sedikit lebih sering dari plasebo, tetapi **tidak konsisten saat diulang**; tanpa efek serius/menetap | terverifikasi | *J Nutr* 130(4S):1058S; *J Allergy Clin Immunol* 2000 (abstrak) |
| 7 | FDA: MSG "generally recognized as safe" (sejak 1959); FAO/WHO JECFA: ADI "tidak ditetapkan" (1987/88); EFSA 2017: ADI 30 mg/kg sebagai asam glutamat | terverifikasi | FDA Q&A MSG; JECFA; PMC9227671 |
| 8 | BPOM menyatakan MSG aman (rujukan FAO/WHO); penggunaannya diatur Permenkes 033/2012 & Perka BPOM 23/2013 | terverifikasi | JPNN (2009); UNAIR; SWA |
| 9 | ASI kaya glutamat bebas (asam amino bebas paling melimpah; ±10× susu sapi; bayi ASI menerima ±36 mg/kg/hari vs ±0,7 dari formula susu sapi) | terverifikasi | Koletzko 2018 review (22 studi, 4.747 ibu); Mouritsen & Styrbæk 2014 |
| 10 | Glutamat dalam MSG secara kimia sama dengan glutamat dalam protein makanan; tubuh memprosesnya dengan cara yang sama | terverifikasi | FDA "Questions and Answers on MSG" (2012): "chemically indistinguishable… metabolize both sources… in the same way"; Mayo Clinic |
| 11 | "Micin bikin bodoh" berasal langsung dari eksperimen Olney | **inferensi — tidak dipakai sebagai klaim sebab-akibat**; VO hanya menyebut urutan peristiwa | — |

## Judul (aturan v4.1: benda, 6–8 kata, angka)
**Micin Dituduh Bikin Bodoh Gara-gara Satu Surat 1968** (8 kata, 50 karakter). Cadangan: "Ketakutan Micin Berawal dari Satu Surat 1968".

## Script v1 — Formula ARSIP v4.1 (122 kata ≈ 47 dtk @2,6 kata/dtk) ✋
| Beat | ±Waktu | VO (prompt ElevenLabs bertag) | Teks layar | Gambar (2D ARSIP RIG + pustaka adegan) |
|---|---|---|---|---|
| 1 HOOK | 0–4 | [curious] Micin dituduh bikin bodoh. Padahal semuanya berawal dari satu surat. | MICIN = BODOH? | **Frame 0:** sachet micin polos (tanpa merek) raksasa di tengah, robek sejak 0,0 dtk, kristal berhamburan; stempel merah "BODOH?" membanting (SFX 0,00) → kristal jatuh di atas amplop surat |
| 2 SETUP | 4–11 | [warmly] Seorang dokter menulis ke jurnal kedokteran Amerika: tiap habis makan di restoran Tionghoa, tengkuknya kebas dan jantungnya berdebar. | stempel 1968 · NEJM · overlay ARSIP KASUS #003 | dokumen arsip: surat diketik, kalimat kunci disorot; sisipan tokoh dokter memegang tengkuk |
| 3 TAPI | 11–17 | [mysteriously] Dia sendiri nggak yakin. Mungkin arak masak, mungkin garam, mungkin micin. Koran cuma ingat satu. | ARAK? GARAM? MICIN? | tiga benda berjajar; dua memudar, micin disorot lampu; halaman koran berputar masuk |
| 4 MAKA | 17–20 | Istilah sindrom restoran Tionghoa menyebar ke mana-mana. | — | peta dunia, titik-titik koran menyala |
| 5 MAKA | 20–26 | [serious] Setahun kemudian, ilmuwan menyuntikkan micin ke bayi tikus. Otaknya rusak. Sejak itu, micin jadi musuh. | 1969 | lab: jarum suntik besar → otak tikus (diagram), cap merah "MUSUH" |
| 6 TWIST | 26–34 | [slowly] Tapi tikus itu nggak makan micin. Mereka disuntik. Saat manusia diuji buta, reaksinya nggak konsisten. BPOM dan FDA bilang aman. | DISUNTIK ≠ DIMAKAN · uji buta ganda · AMAN (BPOM, FDA) | jarum dicoret; dua gelas tanpa label (uji buta); stempel merah **TERUNGKAP** |
| 7 PUNCHLINE | 34–41 | [warmly] Zat gurihnya, glutamat, justru asam amino bebas paling banyak di ASI. Lidahmu kenal gurih micin… sejak menyusu. | GLUTAMAT: TERBANYAK DI ASI | molekul glutamat sama persis di sachet dan botol susu bayi (sebelum-sesudah) |
| 8 STINGER + LOOP | 41–47 | [curious] Oh, lima puluh tahun kemudian, seorang pria ngaku surat itu cuma taruhan. Keluarga si dokter membantah. Tapi gara-gara satu surat itu… | 2018: "CUMA TARUHAN"? · DIBANTAH | surat dibalik: dua tanda tangan saling tindih → kembali ke sachet (frame 0) |

**VO bersih:**
> Micin dituduh bikin bodoh. Padahal semuanya berawal dari satu surat. Seorang dokter menulis ke jurnal kedokteran Amerika: tiap habis makan di restoran Tionghoa, tengkuknya kebas dan jantungnya berdebar. Dia sendiri nggak yakin. Mungkin arak masak, mungkin garam, mungkin micin. Koran cuma ingat satu. Istilah sindrom restoran Tionghoa menyebar ke mana-mana. Setahun kemudian, ilmuwan menyuntikkan micin ke bayi tikus. Otaknya rusak. Sejak itu, micin jadi musuh. Tapi tikus itu nggak makan micin. Mereka disuntik. Saat manusia diuji buta, reaksinya nggak konsisten. BPOM dan FDA bilang aman. Zat gurihnya, glutamat, justru asam amino bebas paling banyak di ASI. Lidahmu kenal gurih micin… sejak menyusu. Oh, lima puluh tahun kemudian, seorang pria ngaku surat itu cuma taruhan. Keluarga si dokter membantah. Tapi gara-gara satu surat itu…
(loop → "Micin dituduh bikin bodoh.")

**Catatan kata:** "restoran Tionghoa" dipakai (bukan "Cina", sesuai Keppres 12/2014); istilah asli 1968 kini dianggap rasis — tidak diulang dalam bahasa Inggris.

## Scorecard v4.1
| Cek | Hasil | Catatan |
|---|---|---|
| 1 Konfirmasi judul | LULUS | kalimat 1 = judul |
| 2 Celah | LULUS | "surat apa?" muncul di dtk 2 |
| 3 Jawaban | LULUS | jawaban mulai beat 3 (23% durasi) |
| 4 Mekanisme | LULUS | sumber ketakutan (surat → koran → tikus disuntik) + bukti tandingan |
| 5 Tapi/maka | LULUS | hook → setup → TAPI → MAKA → MAKA → TAPI → punchline → stinger |
| 6 Uji hapus | LULUS | tiap beat menopang berikutnya |
| 7 Satu pusat | LULUS | micin + satu surat |
| 8 Twist | LULUS | mulai kata ke-65/122 = 53% (rentang v4.1 50–90%) |
| 9 Akhir | LULUS | stinger + loop bersambung ke kalimat 1; tanpa CTA |
| 10 Faktual | LULUS | fact sheet #1–3, 5–10; #4 disajikan sebagai "ngaku" + "membantah" |
| 11 Bahasa | LULUS* | lisan, jahil ringan; *baca keras saat VO |
| 12 Durasi | LULUS | 47 dtk × 2,6 = 122 kata |
| 13 Bisu | LULUS | teks layar membawa alur |
| 14 Visual | LULUS | semua adegan = tipe pustaka (benda, dokumen, peta, lab-diagram, sebelum-sesudah, stempel) |
| V1 benda kata 1 | LULUS | "Micin" |
| V2 tak tertebak | LULUS | ketakutan dari satu surat; tikus disuntik; glutamat di ASI |
| V3 tokoh | LULUS | dokter penulis surat, ilmuwan, pria yang mengaku |
| V4 penutup | LULUS | stinger perdebatan (bahan komentar), bukan nasihat |
| V5 tanpa promo | LULUS | tanpa merek micin |
| H1 kalimat 1 benda+klaim ≤ 4 dtk | LULUS (rencana) | 10 kata ≈ 3,8 dtk |
| H3 tanpa jeda < 3 dtk | LULUS (rencana) | diverifikasi dari VO |
| H5/H6 teks & SFX frame 0 | LULUS (rencana) | "MICIN = BODOH?" + stempel |
| R1 loop terbuka berantai | LULUS | "satu surat" → "koran ingat satu" → "jadi musuh" → twist → stinger |

## Script v2 — revisi bahasa dari review user (13 Nov 2026) ✋
Perubahan: "koran cuma ingat **micin**" ditulis eksplisit; "uji buta" → "dites tanpa tahu mana yang micin"; bentuk jamak "bayi-bayi tikus / tikus-tikus itu" (eksperimen Olney memakai banyak anak tikus); pass kenaturalan (nulis, deg-degan, nyebar, lucunya); ASI diberi angka konkret (±10× susu sapi — Mouritsen & Styrbæk 2014; Koletzko 2018 asupan 35,7 vs 0,7 mg/kg/hari). Visual per beat tetap seperti tabel v1.
> [curious] Micin dituduh bikin bodoh. Padahal semuanya berawal dari satu surat.
> [warmly] Ada dokter nulis surat ke jurnal kedokteran Amerika: tiap habis makan di restoran Tionghoa, tengkuknya kebas, jantungnya deg-degan.
> [mysteriously] Dia sendiri nggak yakin penyebabnya. Bisa arak masak, bisa garam, bisa micin. Tapi koran cuma ingat micin.
> Lahirlah istilah sindrom restoran Tionghoa, dan beritanya nyebar ke mana-mana.
> [serious] Setahun kemudian, ilmuwan menyuntikkan micin ke bayi-bayi tikus. Otak mereka rusak. Sejak itu, micin jadi musuh.
> [slowly] Tapi tikus-tikus itu nggak makan micin. Mereka disuntik. Waktu orang dites tanpa tahu mana yang micin, hasilnya nggak konsisten. BPOM dan FDA bilang aman.
> [warmly] Lucunya, zat yang bikin micin gurih, glutamat, juga ada di ASI. Banyak banget, kira-kira sepuluh kali susu sapi.
> [curious] Oh iya, lima puluh tahun kemudian, ada pria ngaku surat itu cuma taruhan. Keluarga si dokter membantah. Tapi gara-gara satu surat itu…

136 kata ≈ 49–52 dtk (2,6–2,8 kata/dtk). Twist mulai kata ke-75/136 = 55%. Scorecard v1 tetap lulus; #12 durasi: target 50 dtk × 2,7.

## Pengingat untuk akhir sesi (permintaan user)
Gabungkan semua riset & keputusan sampai titik ini ke **main**, lalu rapikan dokumen yang bertentangan (mis. referensi 3D sebagai standar, Formula v3 di tempat lain, alur VO lama) agar sesuai keputusan terbaru. **Ingatkan user di akhir.**

## Script v3 — FINAL disetujui user (13 Nov 2026)
Perubahan dari v2: "Ada dokter **yang** nulis" (paling natural untuk lisan); "Waktu **manusia** dites" (kontras langsung dengan tikus); punchline "Jadi lidahmu kenal gurih micin… sejak menyusu" dikembalikan (penutup punchline = pola pemenang).
> [curious] Micin dituduh bikin bodoh. Padahal semuanya berawal dari satu surat.
> [warmly] Ada dokter yang nulis surat ke jurnal kedokteran Amerika: tiap habis makan di restoran Tionghoa, tengkuknya kebas, jantungnya deg-degan.
> [mysteriously] Dia sendiri nggak yakin penyebabnya. Bisa arak masak, bisa garam, bisa micin. Tapi koran cuma ingat micin.
> Lahirlah istilah sindrom restoran Tionghoa, dan beritanya nyebar ke mana-mana.
> [serious] Setahun kemudian, ilmuwan menyuntikkan micin ke bayi-bayi tikus. Otak mereka rusak. Sejak itu, micin jadi musuh.
> [slowly] Tapi tikus-tikus itu nggak makan micin. Mereka disuntik. Waktu manusia dites tanpa tahu mana yang micin, hasilnya nggak konsisten. BPOM dan FDA bilang aman.
> [warmly] Lucunya, zat yang bikin micin gurih, glutamat, juga ada di ASI. Banyak banget, kira-kira sepuluh kali susu sapi. Jadi lidahmu kenal gurih micin… sejak menyusu.
> [curious] Oh iya, lima puluh tahun kemudian, ada pria ngaku surat itu cuma taruhan. Keluarga si dokter membantah. Tapi gara-gara satu surat itu…
143 kata ≈ 51–55 dtk (2,6–2,8 kata/dtk).
