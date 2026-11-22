# ARSIP KASUS #020: kuota — Ojol Menang di MK, 156 Paket Kuota Belum Rollover
**Formula ARSIP v7.0** · **Status:** SKRIP FINAL v2 (Claude, 22 Nov 2026; Turn diganti sesuai shortlist putaran 18), menunggu persetujuan user sebelum VO · **Mode produksi:** Otomatis (Claude penuh, `AGENTS.md` §3) · **Model:** Sonnet untuk riset/fact sheet, model penalaran tertinggi + effort high untuk skrip final dan `film.js`

**Penanda wajib (dibaca `python3 kit/tools/lint_episode.py --batch …`):**
[HOOK: Bukti Visual Mendahului Konteks] [ENDING: Pemicu Dunia Nyata] [MESIN: A2] [LATAR: layar] [SEGAR: 2026] [MODE: Ringkas] [ARTEFAK: layar HP generik sisa kuota 20 GB dengan hitung mundur masa aktif di angka nol] [LOOP: banner notifikasi kecil "masa aktif tinggal 2 hari" di pojok atas layar Frame 0 → notifikasi itu = bentuk perlindungan yang dilaporkan untuk banyak paket @35] [LABEL: satu asal]

## Ringkasan Turn (v2)
Menang di MK (23 Jul 2026: sisa kuota diakui milik pengguna) → SE Menkomdigi 4/2026 (28 Agu 2026: dilarang biaya tambahan atas sisa kuota, wajib melindungi sisa kuota, wajib lapor) → **The Turn:** laporan tiga operator ke Komdigi per 28 Sep 2026: 156 dari 290 paket belum rollover (Telkomsel 76/95, Indosat 71/94, XLSmart 9/101); bagi banyak paket, perlindungannya baru notifikasi → pejabat Komdigi (3 Okt): "Notifikasi bukan solusi terhadap sisa kuota yang sudah terlanjur tidak terpakai." Hukum sudah memihak pengguna; praktik paketnya belum menyusul. Turn lama v1 (ATSI "harga bisa disesuaikan" / "aturan belum terbit") DIBUANG: SE melarang biaya tambahan dan belum ada bukti kenaikan.

## Kompas & Channel-Fit Gate (v7.0; `AGENTS.md` §2A)
- [x] Garis Merah: tanpa tips (tidak ada "cek paketmu"/"hubungi 159"), tanpa bacaan pasal/nomor perkara, topik 2026, bukan meta-YouTube, tanpa studi psikologi
- [x] Topic Stress-Test: pasokan kreator tipis (hanya media berita, maks 250.897; shortlist putaran 16) · dompet + alat kerja harian · 3 Pilar Konflik · Vox Handle = layar HP + dokumen putusan + tabel laporan operator
- [x] Artefak Frame 0: layar HP generik (tanpa logo) "SISA KUOTA 20 GB", "MASA AKTIF 00:00:00", stempel merah HANGUS ≤ 0,25 dtk
- [x] Antagonis tak kasatmata + taruhan: jarak antara aturan dan isi paket (paket non-rollover yang perlindungannya baru notifikasi) · uang paket data bulanan penonton
- [x] The Turn: setelah menang di MK dan larangan biaya tambahan, laporan operator sendiri menunjukkan 156 dari 290 paket belum rollover; Komdigi menyebut notifikasi bukan solusi
- [x] Penutup Curtain-Pull: Pemicu Dunia Nyata (notifikasi masa aktif yang ditemui penonton di HP = bentuk perlindungan bagi banyak paket), diucapkan sebagai fakta, tanpa nasihat
- [x] Mesin B4: n/a (A2)

## Tangga bukti (micro-rehook tiap 12–15 dtk; Ringkas = 3 pergeseran; estimasi 2,62 kata/dtk)
| Detik | Tingkat | Isi |
|---|---|---|
| ±0–12 | Asumsi Awal | kuota hangus = biasa; 30 GB dibeli, 10 GB terpakai, 20 GB hangus; dibawa ke MK |
| ±12–23 | Jangkar Lokal (dokumen) | putusan MK 23 Jul (milik pengguna) → SE Komdigi 28 Agu (larang biaya tambahan, wajib lindungi, wajib lapor) |
| ±23–35 | Pembalikan (The Turn, `//` sebelumnya) | laporan tiga operator per 28 Sep: 156/290 paket belum rollover; pejabat Komdigi: notifikasi bukan solusi |
| ±35–40 | Curtain-Pull (Conceptual Loop) | banner notifikasi di Frame 0 = "perlindungan" banyak paket |

## Klasifikasi (v7.0)
| Kolom | Isi |
|---|---|
| Mesin cerita | **A2** kebijakan yang belum menyentuh praktik: hak sudah dimenangkan, sebagian besar paket yang dilaporkan dua operator besar belum rollover |
| Mode durasi | **Ringkas** (103 kata, estimasi 39–40 dtk) |
| Arketipe hook / penutup / latar | K3 Bukti Visual Mendahului Konteks / 5 Pemicu Dunia Nyata / layar (batch: Reframing #017, Lingkar #018, Cermin #019 → tidak berulang) |
| Pola judul (kuota 3:1) | Pola 1 (subjek + tindakan + angka konkret) |
| **Status replikasi studi** | n/a: bukti = putusan MK, SE Menkomdigi, laporan operator ke Komdigi, pernyataan pejabat Komdigi |

## Validasi topik (skor ≥ 16/20, tidak ada nilai ≤ 2)
| Kriteria | Skor (1–5) | Alasan |
|---|---|---|
| Kedekatan sehari-hari | 5 | paket data dibeli hampir semua penonton tiap bulan |
| Kontras intuisi / twist | 5 | hukum menang dua kali (MK + SE), laporan operator sendiri menunjukkan paket belum menyusul |
| Ketersediaan bukti visual kolase | 4 | layar HP generik, dokumen putusan, tabel laporan, banner notifikasi |
| Keamanan hukum & monetisasi | 4 | angka dari laporan operator (dua media, angka sama); nama operator hanya di layar; tanpa klaim sanksi/kenaikan harga |
| **Total** | **18/20** | penilaian penulis skrip, bukan hasil alat |
`riset_topik.py` (shortlist putaran 16, `hasil15.json`): 26 video, maks 250.897 (CNN Indonesia), hanya media berita; 23 saran autocomplete.

## Anatomi konflik non-kriminal
1. Antagonis tak kasatmata: masa aktif paket, lalu jarak antara aturan (kuota = hak milik, wajib dilindungi) dan isi paket yang dijual.
2. Taruhan: uang paket data bulanan; bagi ojol, kuota = alat kerja.
3. Pledge (20 GB hangus) → Turn (menang di MK + SE, tetapi 156/290 paket belum rollover) → Prestige (notifikasi yang biasa dilihat penonton adalah "perlindungan" itu).

## Uji POV penonton
1. Siapa melawan siapa? Pengguna paket data melawan aturan masa aktif; sesudah putusan, aturan baru berhadapan dengan paket yang belum berubah. Operator tidak dituduh melanggar (sanksi tidak tertulis di SE; "belum rollover" ≠ "masih hangus").
2. Objek: layar HP dengan sisa kuota 20 GB dan banner notifikasi masa aktif.
3. Taruhan: uang paket data penonton.
4. Alasan ASLI: hak atas sisa kuota sudah diakui, tetapi bagi banyak paket perlindungannya baru berupa pengingat sebelum masa aktif habis.

## Fact sheet (2 lapis sumber)
| # | Klaim (yang diucapkan) | Lapis | Status | Sumber |
|---|---|---|---|---|
| 1 | Driver ojol (Didi Supandi) beli paket 30 GB ±Rp60–70 rb, terpakai 10 GB, 20 GB hangus | lokal | ✔ 2 sumber | detik (×2), Katadata |
| 2 | Digugat ke MK (bersama Wahyu Triana Sari, pedagang kuliner daring) | lokal | ✔ | detik, Katadata, Hukumonline 24 Jul 2026 |
| 3 | 23 Jul 2026: sisa kuota = hak milik tak berwujud bernilai ekonomi; operator wajib menyediakan pilihan; MK tidak mewajibkan semua kuota tak hangus | primer + lokal | primer tidak terbaca (mkri.id 403) → isi sama di 3 media | detik, Katadata, Hukumonline |
| 4 | SE Menkomdigi No. 4/2026 (28 Agu 2026): dilarang biaya tambahan atas sisa kuota; wajib melindungi sisa kuota; lapor ≤ 28 Sep 2026 lalu bulanan | primer | ✔ teks SE dibaca | Setneg (shortlist putaran 18) |
| 5 | Laporan operator per 28 Sep 2026: Telkomsel 76/95, Indosat 71/94, XLSmart 9/101 belum rollover → **156/290** (penjumlahan; juga di RRI) | lokal | ✔ 2 sumber, angka sama | RCTI+, InfoPublik (konpers Komdigi 3 Okt 2026) |
| 6 | Perlindungan non-rollover banyak berupa notifikasi (Telkomsel notifikasi intensif; Indosat bentuk lain termasuk notifikasi H-7/H-2; XLSmart penguatan informasi/notifikasi) | lokal | ✔ | RCTI+, InfoPublik |
| 7 | Pejabat Komdigi, 3 Okt 2026: "Notifikasi bukan solusi terhadap sisa kuota yang sudah terlanjur tidak terpakai." (VO memparafrasekan; nama tidak diucapkan karena sumber menautkan ke dua orang) | lokal | ✔ | RCTI+, InfoPublik |

## Celah & batas hukum
Tidak boleh diucapkan: "masih hangus" untuk paket non-rollover; sanksi bagi operator (tidak tertulis di SE); kenaikan harga (belum ada bukti); nomor pasal/perkara; Rp63 T; nama pejabat Komdigi; "semua paket wajib rollover" (tidak semua wajib).
Bantahan/sisi operator: sebagian peluncuran rollover tergeser ke minggu pertama Oktober karena kendala teknis; ATSI (Jul 2025) menilai kuota hangus membuat internet terjangkau (boleh di deskripsi dengan atribusi).
Nama operator + angka per operator hanya di layar (kartu "LAPORAN OPERATOR KE KOMDIGI · per 28 Sep 2026"); tanpa logo; "tidak disponsori".

## Judul & penguncian 3-titik (0,0–4,0 dtk) — Aturan Kuda Troya
**Judul (final):** `Ojol Menang di MK, 156 Paket Kuota Belum Rollover` · 49 karakter (≤ 55; tanpa kata terlarang). Angka 156 = total dari laporan tiga operator; bingkai itu diucapkan di VO dan tampil di kartu layar.
Frame 0 (hero ≥ 45% lebar ≈ ≥ 486 px di y 150–1150): HP generik di tangan (gravir), layar "SISA KUOTA **20 GB**" + "MASA AKTIF 00:00:00"; stempel merah **HANGUS** ≤ 0,25 dtk; teks layar ≤ 5 kata: **20 GB HANGUS**. Detail loop: banner notifikasi kecil abu-abu di pojok atas layar ("Masa aktif tinggal 2 hari"), tidak disorot.
Kalimat H1 (K3, kata tunjuk "ini"): "Dua puluh giga di layar ini hangus sebelum sempat dipakai." (10 kata, ±3,8 dtk; cek ulang ≤ 4,0 dtk di `vo_words.json`)

## Skrip AV 2 kolom (final v2; `1-cerita…` §M4)
Waktu = estimasi 2,62 kata/dtk + hening 0,6 dtk sebelum The Turn; dikunci ulang dari `vo_words.json` setelah VO. Notasi: `/` jeda ≈ 0,25 dtk · `//` hening ≈ 0,6 dtk · `KAPITAL` penekanan · `(intonasi)`.
| # | Waktu (estimasi) | Visual kolase (arsip / dokumen / gerak) | Audio: VO word-for-word + notasi + SFX |
|---|---|---|---|
| 1 | 0,0–3,8 | FRAME 0 (lihat atas). Hitung mundur berhenti di 00:00:00; stempel HANGUS jatuh; angka 20 GB memudar abu-abu. | (serius, cepat) · SFX: stempel 0,00 + bunyi notifikasi pendek · VO: DUA PULUH giga di layar ini / hangus sebelum sempat dipakai. |
| 2 | 3,8–8,8 | Helm + jaket ojol (gravir, tampak belakang) di samping HP; struk paket 30 GB · ±Rp60–70 rb; bar kuota 10 GB terpakai (biru) vs 20 GB sisa (merah). | (hangat) · SFX: struk disobek · VO: Pemiliknya driver ojol, / beli tiga puluh giga enam puluh ribuan, / baru kepakai sepuluh. |
| 3 | 8,8–11,8 | Bar 20 GB merah dilipat jadi map; map dibawa ke tangga gedung MK (gravir, tanpa lambang resmi); map kedua "PEDAGANG KULINER DARING"; nama "Didi Supandi" kecil di map. | (sedikit jahil di "segitu") · SFX: map ditaruh di meja kayu · VO: Kerugian SEGITU / dia bawa sampai ke Mahkamah Konstitusi. |
| 4 | 11,8–15,3 | **Rehook 1 (dokumen):** dokumen putusan generik bercap `PUTUSAN MK · 23 JULI 2026`; stabilo kuning "MILIK PENGGUNA". | SFX: palu sidang satu kali · VO: Juli lalu, / hakim mengakui sisa kuota sebagai milik pengguna. |
| 5 | 15,3–19,5 | Lembar surat edaran generik `SE MENKOMDIGI · 28 AGU 2026`; label "BIAYA TAMBAHAN" dicoret merah. | SFX: cap kertas · VO: Akhir Agustus, / Komdigi melarang operator narik biaya tambahan / atas sisa kuota. |
| 6 | 19,5–23,3 | Gembok biru menutup kotak 20 GB; kalender sobek menunjuk `28 SEP 2026 · WAJIB LAPOR`; tiga map laporan berdatangan. | (lega) · SFX: gembok klik + tiga map · VO: Operator juga wajib ngelindungin sisa kuota, / lalu lapor akhir September. |
| 7 | 23,3–30,2 | Hening 0,6 dtk. **The Turn / rehook 2:** kartu `LAPORAN OPERATOR KE KOMDIGI · per 28 Sep 2026`; tiga kolom paket (Telkomsel 76/95 · Indosat 71/94 · XLSmart 9/101 belum rollover, tanpa logo); angka besar merah **156 / 290 BELUM ROLLOVER**. | `//` sebelum "Masalahnya" · (merendah) · SFX: kertas tabel dibentangkan + dengung rendah · VO: Masalahnya, / dari laporan tiga operator, / SERATUS LIMA PULUH ENAM dari dua ratus sembilan puluh paket / belum rollover. |
| 8 | 30,2–35,2 | Kutipan cetak ketik bercap `PEJABAT KOMDIGI · 3 OKT 2026`: "Notifikasi bukan solusi…"; ikon lonceng notifikasi dicap merah. | (serius) · SFX: mesin ketik · VO: Pejabat Komdigi sendiri bilang, / notifikasi bukan solusi / buat kuota yang terlanjur nggak kepakai. |
| 9 | 35,2–39,8 | CURTAIN-PULL: kembali ke layar HP Frame 0; kamera mendorong ke banner kecil di pojok atas ("Masa aktif tinggal 2 hari"), dilingkari kuning @35; banner membesar, di bawahnya cap biru `PERLINDUNGAN`. | (pelan, dingin) · SFX: denting notifikasi; ekor ≤ 0,15 dtk · VO: Notifikasi masa aktif yang mampir di HP-mu, / buat banyak paket, / itulah perlindungannya. |

VO bersih (103 kata) → `audio/script_vo.txt`; bertag → `audio/vo_prompt_elevenlabs.md`.
Penutup: 5 Pemicu Dunia Nyata (notifikasi masa aktif yang ditemui penonton = bentuk perlindungan bagi banyak paket), Curtain-Pull pada banner Frame 0 @35; diucapkan sebagai fakta, tanpa nasihat; kalimat terakhir diawali "Notifikasi".

## Scorecard v7.0 (ringkas)
Lulus: H1 benda + klaim ≤ 4 dtk (K3) · tanpa nama/tanggal di VO 10 dtk pertama · ABT "Masalahnya" (tanpa "tapi/padahal") · tanpa transisi daftar · nol sitasi (atribusi pendek "laporan tiga operator", "pejabat Komdigi") · kalimat 8–17 kata, tanpa staccato · penutup tanpa tips · 2 kontras angka (30 vs 10 GB; 156 dari 290) · Turn ±23–30 dtk · `lint_episode.py kuota` dan `--batch migor bankkeliling beras kuota` 0 error, 0 peringatan kalimat. Belum: H1/H3 dari `vo_words.json`; UPLOAD.md selain judul masih kerangka.

## Catatan lanjut
- **22 Nov 2026: skrip final v2** (instruksi koordinator: Turn lama ATSI/harga usang setelah SE 4/2026; Turn baru = laporan operator 28 Sep + pejabat Komdigi 3 Okt). v1 (Turn harga) diganti seluruhnya. Menunggu persetujuan user → VO konektor ElevenLabs (1 take) → `--log`.
- **⚠ Tersisa:** (1) "156 dari 290" = penjumlahan angka per operator (RCTI+ & InfoPublik; juga muncul di RRI), status per 28 Sep 2026; sebagian peluncuran rollover tergeser ke minggu pertama Oktober, jadi angka hari ini bisa sudah berubah (layar wajib "per 28 Sep 2026"); (2) kutipan Komdigi ditautkan ke dua nama berbeda → hanya "pejabat Komdigi"; (3) salinan putusan mkri.id 403; nomor perkara beda antar media (tidak diucapkan); (4) "buat banyak paket, itulah perlindungannya" = parafrase: Indosat menyebut "bentuk perlindungan lain" termasuk notifikasi, jadi tidak semua perlindungan non-rollover = notifikasi saja; (5) kalimat Turn 17 kata (batas atas) — bila take tersengal, jeda `/` setelah "operator" wajib; (6) Bisnis 3 Okt 403.
- **Fakta sengaja tidak dipakai di VO:** Rp63 T (IAW); nomor pasal/perkara; hitungan Rp43 rb (anggaran kata; "Kerugian segitu" merujuk 20 GB); ATSI Jul 2026 "penyesuaian harga" + DPR "bayar lebih mahal" (usang setelah SE, tanpa bukti kenaikan); evaluasi tarif Komdigi (kondisional); sanksi; call center 159 (= tips); Meutya Hafid "banyak aduan"; angka per operator (hanya di layar); rollover 3–5%; gugatan lain ditolak 2 Mar 2026; nama Wahyu Triana Sari, Rega Felix, pejabat Komdigi.

## Fakta terverifikasi (riset batch #017–#020, 22 Nov 2026) — judul draf: Paket Rp60 Ribu, 20 GB Hangus. Ojol Gugat ke MK
- Putusan MK 273/PUU-XXIII/2025, dibacakan 23 Jul 2026 (detik ×2, Katadata; mkri.id 403; Metro TV menulis nomor 219/PUU-XXIV/2026 → pakai 273). Pemohon: Didi Supandi (ojol) & Wahyu Triana Sari (pedagang kuliner daring) [+ advokat Rega Felix per Katadata]. Kasus Didi: paket ±Rp60–70 rb, 30 GB, terpakai 10 GB, 20 GB hangus.
- Amar: pasal bertentangan dgn UUD 1945 secara bersyarat; operator WAJIB MENYEDIAKAN PILIHAN layanan agar sisa kuota tetap aktif/bisa dipakai (rollover, perpanjang masa aktif, pengalihan manfaat, kompensasi/refund). MK TIDAK mewajibkan semua kuota tak hangus. Alasan: sisa kuota punya nilai ekonomi, hak milik tak berwujud.
- Turn: ATSI (Marwan O. Baasir, Kontan 25 Jul 2026): rollover kemungkinan disertai penyesuaian harga; Komdigi akan mengevaluasi kenaikan; rollover sudah ada, pengguna 3–5%; DPR Nurul Arifin: "Jangan sampai... hak menyimpan sisa kuota, tetapi harus membayar lebih mahal." Juknis Komdigi belum terbit.
- ⚠ Rp63 T/th (IAW) = estimasi tak diaudit, basis tidak sinkron → JANGAN dipakai sebagai fakta. Hitungan Rp43 rb hangus = 20/30 × Rp65 rb (tengah kisaran), beri label hitungan.
- **Pembaruan 22 Nov 2026 (shortlist putaran 18):** Turn ATSI/DPR + "juknis belum terbit" di atas USANG: SE Menkomdigi 4/2026 terbit 28 Agu 2026; Turn skrip v2 = laporan operator per 28 Sep 2026 (156/290 paket belum rollover) + pejabat Komdigi 3 Okt 2026.
