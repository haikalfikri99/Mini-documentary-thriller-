# 2. Visual dan Animasi — ARSIP Kolase (sejak #003, keputusan user 13 Nov 2026)
Aturan gaya lengkap: **`kit/styles/arsip-kolase/STYLE.md`** (dasar: lemo-opuscar *Vintage Engraving Collage*, MIT/CC BY-NC dengan izin membuat film komersial; kredit LemoLab ada di file gaya). Contoh lengkap: `stories/micin/kolase/`.
**Kenapa gaya ini:** data kita menunjukkan gaya animasi tidak membedakan performa (`research/niche/KEPUTUSAN_RISET.md`: 1.886 thumbnail, selisih ≈ 0); yang menentukan adalah isi frame 0 dan kecepatan produksi. User menolak tampilan 2D vektor buatan kode (terlalu sederhana); kolase cetakan arsip memberi detail kaya tanpa menggambar dari nol, cocok dengan merek ARSIP (kertas, stempel, slip ketik), dan cocok untuk "alasan asli di balik benda" (bukti visual). Gaya lama (2D ARSIP RIG, 3D) dihapus.

## A. Frame & tempo (Formula v4.1, terukur dari 11 rekaman pemenang) **[sebagian SUPERSEDED by v6.0/v6.1: Frame 0 = barang bukti fisik + Conceptual Loop §N, guardrail §J–§M; poin 6 "Loop: shot terakhir kembali ke komposisi frame 0" kini = Conceptual Loop, bukan pengulangan komposisi]**
1. **Frame 0 = benda pahlawan besar di tengah, sudah bergerak**; stempel/kata hook mendarat ≤ 0,25 dtk (v7.0, §N; v4.1 menulis 0,2).
2. Satu kalimat VO = satu shot ±1,5–3 dtk; potongan baru atau gerak baru setiap ≤ 1 dtk. **Tidak ada momen layar kosong**: subjek shot ada sejak awal shot (slide ≤ 0,2 dtk), benda yang disebut belakangan boleh menyusul.
3. Benda pahlawan ≥ 45% lebar frame; teks layar ≥ 40 px dunia; satu subjek per frame; **±5–6 potongan maksimum**.
4. Zona: atas 0–150 kosong (UI), subjek y 150–1150, **pita caption y 1210–1536 bersih**, bawah = latar.
5. Teks layar = stempel, label, angka, slip ketik pendek. Kalimat yang sama dengan VO tidak ditulis ulang (caption sudah ada).
6. Loop: shot terakhir kembali ke komposisi frame 0.
7. **Tahan hero 3–4 dtk di klimaks sambil menggerakkan sorotan** (SOP T3, 30–42 dtk): saat bukti utama/mekanisme dijatuhkan, benda pahlawan boleh bertahan 3–4 dtk asal ada gerak baru di dalamnya (stabilo/garis penghubung/zoom pelan), jadi tetap memenuhi "gerak baru ≤ 1 dtk" dan tidak dihitung dead frame; perlambatan VO + hening `//` 0,5–0,8 dtk (`3-audio.md` §K) menyertainya.

## B. Bahasa visual (native moves)
Slap (ditepuk), slide (geser + overshoot), drop (jatuh memantul), pendulum (`putA`), **stempel** (`stampAt`: BODOH?, MUSUH, AMAN, TERUNGKAP, DIBANTAH), **ransom letters** untuk tahun/kata kunci, **slip mesin ketik** (`typed`), **data engraving** (batang gravir tumbuh, garis ukur), **map ARSIP** (`fileOverlay`, ≤ 1,3 dtk di awal setup), belah/potong (clip), coret/centang (`m_cross`, `m_tick_s`). Vektor minimal (`arrow`, `route`, `bow`): hanya untuk arah/aliran/ukuran yang sulit dipahami tanpa panah (berita menyebar, zat masuk ke ASI, ×10). Tinta gelap di atas latar terang; garis terang (`comp:'source-over'`) di atas latar gelap.

## C. Sumber gambar (urutan kerja)
1. Daftar benda per shot dulu (dari script); **cari hanya yang punya tempat di shot**, satu gambar terbaik per benda.
2. **Openverse** (`api.openverse.org/v1/images/?q=…&license=cc0,pdm,by`) — gratis, tanpa kunci, mengumpulkan Wikimedia/Met/NGA/rawpixel/Flickr Commons.
3. **Wikimedia Commons** (Pearson Scott Foresman "(PSF)" = garis bersih domain publik; Gray's Anatomy; Wellcome Collection = CC BY wajib kredit). API dibatasi kecepatan (HTTP 429): satu permintaan per detik, User-Agent generik; URL langsung `upload.wikimedia.org/wikipedia/commons/<a>/<ab>/<File>` (a/ab = md5 nama file) lebih ringan.
4. Tolak: clip-art modern, foto produk bermerek, foto orang modern yang bisa dikenali, lisensi BY-SA/tidak jelas, gambar dengan banyak teks di dalamnya.
5. Tidak ada arsipnya → gambar bergaya gravir (`kit/collage/engr_objects.py`, tambah fungsi baru ke pustaka) atau cetakan kita sendiri di `bake.py` (contoh: sachet MICIN, surat, koran). Gambar AI boleh bila tetap tidak ada, lalu diperlakukan sebagai cetakan (dipotong, diberi tinta). **Alur #004:** Claude menulis prompt (gaya gravir hitam-putih, latar polos/terang, tanpa logo/teks, tokoh konsisten per peran: pabrik = perusahaan, orang berjas generik = "pihak X", wasit berpolo gelap = KPPU) → user membuat di Google Flow → file ke `kolase/ai/` → `bake.py ai_to_raw()` → `prints.json` (`cut` dengan `tint_poly` bila sebagian gambar perlu diwarnai: bintang emas, kartu merah) → catat di `SOURCES.jsonl`. Gambar yang kurang pas: kirim prompt revisi, jangan memaksakan. Peluit/benda kecil digambar sendiri tidak cukup jelas di HP → lebih kuat tokoh yang meniup peluit dengan latar gedung.
6. Catat setiap file di `SOURCES.jsonl` (url, page, license, credit) → kredit CC BY masuk deskripsi YouTube.

## D. Storyboard (gerbang wajib sebelum animasi penuh)
`node kit/tools/keyframes_2d.mjs stories/<slug>/kolase` → `board/storyboard.jpg` (frame di 85% tiap shot, bernomor). Kirim bersama tabel: shot, detik, isi, native move. Catat jujur yang masih kurang. User berkomentar per nomor → revisi → setuju → baru skor/foley/render.

## E. Pelajaran review #003 (wajib dicek di setiap storyboard)
- **Gambar harus logis terhadap kalimat:** eksperimen pada manusia → ada manusianya; jarum suntik **mengarah ke** tikus; dot botol susu bulat, bukan lancip.
- **Kalimat yang mirip butuh visual berbeda** (shot 11 vs 15: barisan tikus + jarum → close-up satu tikus ditusuk).
- **Jangan pakai gambar yang tidak berhubungan** hanya karena "keluarga" di kalimat (gravir religius ditolak); lebih kuat menampilkan klaim yang dicap DIBANTAH.
- Simbol harus jelas maknanya: "?" diletakkan di samping orang yang ragu.
- Cek fakta visual juga (uji MSG Geha 2000 = tanpa makanan → sampel identik A/B, bukan piring makanan).
- Ukuran: benda kecil (tikus) di HP harus ≥ 300 px; jangan ada stempel berwarna sama dengan latarnya.

## F. Teknis
- Dunia = layar 1080×1920; part di-bake pada B = 1,5×. Gerak potongan on twos (12/dtk), kamera tiap frame; jitter tangan saat bergerak.
- Caption: slip hitam robek, Courier Prime Bold 84 px kapital, 1–3 kata, kata kunci amber (`caption.hot`), pusat y 1360.
- Render: `kit/tools/render_2d.mjs` (Playwright → JPEG → ffmpeg), ±5 menit/56 dtk; grain ditambahkan saat mux.

## §G. Pelajaran visual #004 (14 Nov 2026)
- **Penonton memahami lewat tokoh, bukan benda:** perusahaan = pabrik + orang berjas (bukan botol); lembaga = satu tokoh konsisten (wasit KPPU) di semua shot; distributor = truk berlabel.
- **Cap hukuman menempel pada pihak yang dikenai** dan jauh dari label pihak lain; tetap tinta transparan (`bk.stamp(legible=True)`).
- **Proporsi:** ukur tinggi kepala di render; dua orang dalam satu frame = kepala sama besar + ada jarak; gestur menunjuk berakhir tepat di bendanya; benda mengarah ke yang dimaksud (cermin lewat `bk.mirror`, bukan sx negatif).
- **Kecil-besar untuk lucu:** zoom dari botol sendirian di kursi terdakwa ke ruang sidang megah (shot punchline).
- **Frame 0** sudah memuat perusahaan + angka + stempel di 0,0 dtk (hook visual).
- Cek keyframe 85% shot sebelum mengirim; label tidak boleh masuk pita caption (y > 1190) dan tidak boleh menutupi wajah.
- Alat review: `kit/tools/storyboard_page/make_page.py` (halaman Artifact bisa dikomentari; kotak "Revisi vN").

## §H. Visual QA gate otomatis (v5.0)
`node kit/tools/check_visual.mjs stories/<slug>/kolase` (dipasang di `make_kolase.sh` setelah gerbang audio, sebelum render penuh; `SKIP_VISUAL_QA=1` hanya bila sudah dinilai manual; `--dump <t>` mencetak kotak tiap potongan pada waktu t; ±70 dtk). Memeriksa dari frame nyata (kotak buram potongan melalui transformasi kamera, nama bagian dari `SP`):
- **START** naik terus dan = `episode.json` dur; peringatan shot < 0,9 atau > 4,0 dtk.
- **Dead frame:** area panggung (y 120–1190, tanpa caption) harus berubah tiap ≤ 2,5 dtk (sampel 0,25 dtk). Gagal = serius.
- **Teks di bawah caption:** bagian bertulisan (`s_*`, `st_*`, `tag_*`, `ry*`, `rq*`, `lbl_*`, `m_*`) tidak boleh masuk ≥ 30 px ke zona slip caption nyata (y 1300–1440; pita dokumentasi 1210–1536 mencakup margin) selama ≥ 0,5 dtk. Gambar besar boleh menimpa pita karena caption digambar di atasnya (peringatan bila ≥ 150 px). Latar penuh (≥ 900 px lebar atau ≥ 1000 px tinggi) dan map ARSIP dikecualikan.
- **Terpotong tepi:** potongan keluar frame ≥ 25% ukurannya sendiri selama ≥ 0,5 dtk = serius; ≥ 20 px = peringatan.
Kalibrasi: lulus pada film #004 yang sudah disetujui (3 peringatan, 0 serius) dan menolak film uji dengan label di zona caption, objek terpotong tepi, dan shot statis 4,25 dtk. **Tidak diperiksa otomatis:** ukuran objek frame 0 ≥ 45% dan waktu stempel ≤ 0,25 dtk, proporsi dan arah gestur, logika gambar; semua itu tetap dicek manual di keyframe (`7-selera…` #26).
**Celah alat (catatan 23 Nov 2026):** Spesifikasi v5.0 §2.1 (S5) meminta pemeriksaan tepi atas caption-safe `y < 100` (potongan/stempel/teks non-latar terpotong di tepi atas) di samping pita caption; `check_visual.mjs` belum memuat ambang `y < 100` (hanya pita caption dan potongan tepi ≥ 25%). Menambahkannya (peringatan, bukan serius) = tugas agen kit (W5) bila user memutuskan; sampai itu, cek manual keyframe t = 0,3 dtk dan 85% shot. Zona atas 0–150 tetap dikosongkan (§A.4).

## §I. Google Flow: aturan wajib sejak batch #005–#008 (15 Nov 2026, keputusan user)
Rincian + rekap kasus gagal: `kit/collage/template/flow_prompt_template.md` § "Aturan wajib Google Flow".
- **1 variasi per label** (`1 variation each`), tidak pernah 2: kredit hemat 50%, Drive bersih, user tidak memilih; gambar cacat → *regenerate* gambar itu saja.
- **Filter Flow sering *false positive*:** gagal di #006 `ekonom`, #007 `pembeli_hp` (perempuan muda + hijab/blouse/waist-up), #008 `petugas_tw_tolak` (perempuan + clipboard against her chest), #008 `petugas_id_aman` (gestur OK jari melingkar). Maka: tokoh = pria dewasa atau close-up tangan kecuali fakta menuntut lain; tanpa gestur OK (pakai thumbs-up / open palm stop / pointing); tanpa kata toksik/medis (toxic, poison, carcinogen, cancer, pesticide, contaminated, hazardous chemical), tulis benda fisiknya netral; prompt kena blokir → user buka **chat baru (+)**.
- **Batch B:** 1 tokoh = 1 chat + 1 ingredient (adegan dua tokoh dirakit di kode dari dua potongan); wajib `COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference)`; tokoh Batch A yang direvisi → deskripsi + kata ganti di Batch B ikut diperbarui.

## §J. Guardrail layar sejak review #005–#008 (15 Nov 2026, keputusan user)
1. **Kutipan di layar wajib Bahasa Indonesia.** Strip/label/slip ketik tidak boleh memuat kutipan bahasa Inggris mentah; terjemahkan (contoh #007: "We are primarily an internet company." → "Kami sebenarnya perusahaan internet."). Sumber aslinya cukup disebut di slip kecil (mis. "prospektus Xiaomi, 2018") dan di deskripsi.
2. **Batas bawah grafik & kartu data `y ≤ 1180` di layar** (setelah zoom kamera), supaya tidak tersentuh baris atas caption 2 baris. Grafik batang/kartu data masuk dari samping, **bukan dari bawah** (slide dari bawah melintas pita caption). Contoh: batang denda #005 dan batang 2,8 → 5,3 mnt #006 dinaikkan 70 px.
3. **Tanpa kotak persegi putih polos pada aset buatan kode.** Benda yang digambar kode (timbangan, bendera, alat) dipotong mengikuti siluetnya sendiri (`bk.doc(..., shape=...)`, margin ±12 px, tepi sobek `rough ≥ 0,3`); dokumen/kartu data memakai tepi sobek kertas. Contoh: timbangan #008 dan bendera golf #005.
- Pelajaran pendamping: label tempel pada gambar AI mengikuti miring bendanya (papan "3 IN 1" yang dicabut petugas #006, −20°); figur berulang dalam satu shot dibedakan skala/posisi/ketukan masuk (tiga joki #006: jauh-kecil, tengah-cermin, dekat-besar); penegas kesimpulan boleh ditempel di layar benda kunci (layar HP #007: "LABA HP ≤ 5%" / "CUAN DARI IKLAN"); slip penutup berbentuk pernyataan bila VO pernyataan (tanpa "?").


## §K. Standar visual psikologi perilaku (v6.0, 17 Nov 2026; menambah §A–§J, tidak mencabut guardrail #004–#008) **[judul historis: isi (semiotika artefak, kode warna, guardrail) tetap berlaku di v7.0, ditegaskan §O.3; frasa "psikologi perilaku" tidak lagi membatasi topik, `AGENTS.md` §2]**
1. **Semiotika artefak (Visual Evidence First):** **dilarang** kartun "orang berpikir" atau gambar otak generik di frame 0. Gunakan barang bukti fisik (struk harga, tombol UI abu-abu, denah ruangan, grafik turun, timbangan miring) yang muncul bersamaan atau sepersekian detik **sebelum** VO menyebut konsepnya.
2. **Kode warna kolase editorial:** **biru/hijau arsip `#2F4F4A`** = sistem, institusi, desain antarmuka · **merah stempel `#B3261E`** = ancaman, jebakan, kerugian, vonis · **kuning stabilo** (palet AMBER `#D58E2A`, pita transparan di atas cetakan) = sorotan angka/kutipan dokumen bukti. Palet lain tetap mengikuti `STYLE.md`.
3. **Guardrail #004–#008 tetap:** ≤ 2–3 elemen fokus per shot (≤ 5–6 layer total) · grafik/label `y ≤ 1180`, masuk dari samping · 100% kutipan layar Bahasa Indonesia · frame 0 hero ≥ 486 px lebar + stempel ≤ 0,25 dtk · caption berdiri sendiri untuk penonton tanpa suara · tanpa kotak putih polos pada aset kode (`bk.doc(..., shape=...)`) · Flow: 1 variasi, tokoh = pria dewasa/tangan, tanpa OK-sign (§I).
4. **Paket thumbnail** mengikuti §D `5-upload-dan-thumbnail.md` (`make_cover.py`); judul/hook thumbnail tunduk pada Aturan Kuda Troya (tanpa kata terlarang kecuali slot uji).

## §L. Pewarnaan tangan (hand-tint) objek hero (17 Nov 2026, batch #009+)
- Dasar tetap tinta di kertas krem (identitas ARSIP Kolase; warna utama = kode makna §K). Pengecualian: **objek hero yang rasanya/warnanya bagian dari cerita** (makanan #009 burger) boleh diwarnai tangan gaya cetakan berwarna abad 19.
- Alat: `kit/collage/handtint.py ai/<label>.jpg tint/<label>.json` → `ai/<label>.tint.png`; `bk.cut(..., tint_map='ai_<label>.tint.png')` (salin png ke raw/ bersama jpg). Zona = poligon kasar 0..1; warna mengikuti garis gravir sendiri (wilayah tertutup), wilayah yang mayoritas di luar zona tetap polos.
- Palet redup (cat air): roti #D8A35A · selada #8DAA5B · tomat #C9583F · keju #E9C24E · daging #7B4A2C. Jangan pakai merah stempel `#B3261E` / biru arsip untuk tint.
- Gambar AI tetap diminta hitam-putih di Flow (konsisten, tanpa warna acak); warna ditambahkan di kode bila perlu.

## §M. v6.1 Anti-monoton visual (18 Nov 2026, keputusan user; wajib #013+)
1. **Rotasi tata letak panggung.** Pola dasar batch #009–#012 hampir selalu sama: blok warna di atas + dua lingkaran (amber/hijau) di sudut + subjek di tengah. Mulai #013, tiap episode wajib menyelingi pola itu dengan **minimal 3 dari 4 tata letak lain**, dan tidak boleh lebih dari **3 shot berurutan** dengan tata letak yang sama:
   - **Kartu dokumen penuh** (lembar/struk/surat mengisi ±80% lebar, kamera menyusuri barisnya; latar warna hampir tak terlihat),
   - **Grafik layar lebar** (satu grafik/tabel melebar penuh dengan anotasi, tanpa lingkaran sudut),
   - **Split-screen** (dua panel berwarna kontras kiri-kanan atau atas-bawah untuk perbandingan, garis pemisah sobek),
   - **Close-up makro** (satu detail benda memenuhi frame: angka di label, kotak di kartu, tombol).
   Catat tata letak per shot di kolom "Kamera" `storyboard.json` (contoh "split-screen", "kartu penuh").
2. **Label sumber pembeda negara.** Bila satu episode menggabungkan bukti lokal dan studi luar negeri, setiap bukti diberi strip kecil pembeda asal yang konsisten, misal **`DATA INDONESIA`** (biru arsip) vs **`EKSPERIMEN AS`** / **`STUDI INGGRIS`** (kertas netral), supaya penonton tidak mengira angka luar negeri adalah data Indonesia. Strip ini bukan strip sumber (nama penerbit tetap di deskripsi, `7-selera…` #82); cukup asal data + tahun bila perlu.
3. Kepadatan tetap mengikuti `7-selera…` #82 (1 subjek + 2–4 elemen pendukung, frame tidak sepi) dan guardrail §J–§K.

## §N. v6.1+ Conceptual Loop visual, artefak Frame 0, stempel asal data (18 Nov 2026, keputusan user; wajib #013+)
1. **Artefak fisik di Frame 0.** Hero = benda bukti nyata (struk, tombol, label, kartu, dokumen), ≥ 486 px (≥ 45% lebar) di zona y 150–1150, stempel merah ≤ 0,25 dtk; **dilarang** ilustrasi otak/kartun berpikir (`§K`). Cek manual keyframe t = 0,3 dtk (`check_visual.mjs` tidak memeriksa ini).
2. **Conceptual Loop = satu detail kecil di Frame 0 yang bermakna tersembunyi.** Tanam satu detail (angka kecil di sudut struk, satu kotak yang sudah terisi, tombol yang tak tersambung, satu menu bertanda) di Frame 0 (0–4 dtk) tanpa disebut VO; maknanya diungkap di 6 dtk terakhir (≈ detik 42–52 Investigasi; ≈ 30–40 Ringkas) lewat zoom/sorotan/stempel pada detail yang sama. Tujuannya replay sadar (APV > 100%), tanpa memotong tata bahasa kalimat terakhir (`1-cerita…` §M8.1). Catat detail + detik di README `[LOOP: …]` dan di kolom "Kamera" `storyboard.json` ("loop: detail X").
3. **Stempel asal data wajib bila Indonesia + luar negeri digabung** (menegaskan §M.2): strip kecil konsisten **`DATA INDONESIA`** (biru arsip) vs **`EKSPERIMEN AS`** / **`EKSPERIMEN BEIJING`** / **`STUDI INGGRIS`** (kertas netral) menempel pada bukti masing-masing, dan beralih tepat saat VO beralih konteks; angka luar negeri tidak boleh tampil tanpa stempel. Catat `[LABEL: …]` di README.
4. **Tangga bukti terlihat:** tiap pergeseran (Asumsi Awal → Jangkar Lokal → Eksperimen Kontrol → Pembalikan Otak) memakai tata letak panggung berbeda (`§M.1`); jangan pergeseran bukti di tata letak yang sama.

## §O. v7.0 Rotasi latar visual per batch + aturan Flow (20 Nov 2026, keputusan user; berlaku #017+)
1. **Rotasi latar/artefak utama dalam 1 batch 4 episode** (`[LATAR: layar|dokumen|kemasan|benda|peta|grafik|tempat]` di README; `lint_episode.py --batch` memeriksa, juga terhadap `stories/episode_log.json`): jangan 3 episode berturut berlatar layar aplikasi belanja (pelajaran #013–#014; dokumen Konteks v7.0 menyebut #013–#015, ⚠ selisih kecil belum dikonfirmasi); selang-seling dengan buku menu fisik, struk cetak, kemasan, dokumen regulasi/putusan, peta, grafik. Rotasi tata letak panggung §M tetap.
2. **Google Flow:** 1 variasi per gambar; 2D vintage steel engraving / paper-cutout collage di atas putih murni `#FFFFFF` tanpa bayangan jatuh atau bingkai; filter-safe (tokoh pria dewasa/close-up tangan, tanpa gestur lingkaran OK, tanpa kata medis/toksik); 1 tokoh = 1 chat baru + 1 Ingredient + `COMPLETELY CHANGE HIS POSE AND BODY ANGLE` di Batch B (§I).
3. **Kode warna:** merah `#B3261E` = jebakan/ancaman/kerugian · biru-hijau arsip = sistem/institusi/desain · kuning stabilo = sorotan bukti/angka (§K.2). Frame 0 hero ≥ 486 px + stempel ≤ 0,25 dtk; grafik/label `y ≤ 1180`; 100% teks layar Indonesia; tanpa kotak putih polos pada aset kode.
4. Wajah realistis mirip pejabat/tokoh publik pada gambar AI = risiko salah tafsir: pakai tampak belakang/potong bahu ke bawah atau generate ulang (kasus #016 `petugas_berkas`; #013 `juru_bicara` dipertahankan utuh atas keputusan user).
