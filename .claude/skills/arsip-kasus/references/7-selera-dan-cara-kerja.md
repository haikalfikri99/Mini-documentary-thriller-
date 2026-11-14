# 7. Selera & cara kerja pemilik channel (dari semua revisi #001–#003)
Dibaca **sebelum** mengirim apa pun ke user (shortlist, script, storyboard, film). Tujuannya agar user tidak perlu mengulang instruksi yang sama. Sumber: review #001 (Molase), #002 (Scroll), #003 (Micin), riwayat commit, dan percakapan 11–13 Nov 2026. Tambahkan baris baru setiap kali user mengoreksi sesuatu yang bersifat selera atau cara kerja.

## A. Selera visual
1. **Kaya dan artistik, bukan "meh".** Bentuk vektor sederhana buatan kode ditolak berkali-kali ("terlalu simpel"). Di #001 yang disukai: tekstur cat, DOF, cahaya, multiplane, wajah ekspresif. Di #003: kolase cetakan arsip asli. Detail harus datang dari bahan nyata, bukan bentuk dasar.
2. **Visual storytelling kuat.** Apa yang diucapkan VO harus terlihat (grafik ASI vs susu sapi → harus ada sapinya). Gambar membawa cerita, bukan dekorasi.
3. **Tapi tidak melelahkan mata.** Layar tidak boleh penuh teks/aset: satu subjek, ±5–6 potongan, teks hanya stempel/label/angka.
4. **Logis dan realistis secara fisik:** tangan memegang HP seperti tangan sungguhan; perangkat lengkap (monitor + keyboard + mouse); arah cahaya masuk akal; jarum suntik mengarah ke tikus; dot botol susu bulat; eksperimen manusia menampilkan manusia.
5. **Tidak ada gambar yang tidak nyambung** hanya karena satu kata cocok (gravir keluarga religius untuk "keluarga Kwok" ditolak).
6. **Kalimat mirip = visual berbeda** (disuntik di shot 11 ≠ shot 15).
7. **Simbol harus jelas maknanya** ("?" milik siapa? taruh di samping orang yang ragu; benda yang disebut harus kelihatan).
8. Latar tidak kosong, ruang berbeda untuk orang berbeda; akhir video harus berupa **aksi yang menutup cerita**, bukan sekadar zoom.
9. Kejadian tidak boleh terlalu cepat untuk dicerna; SFX harus nyambung dengan gerak.
10. **Signature sendiri:** kalau memakai gaya dari luar, ubah palet dan elemen identitas (map ARSIP, stempel) agar jadi milik channel. **Tidak ada watermark/kartu kredit di dalam video.**
11. Representasi Indonesia penting (studi warna kulit sawo matang di gaya lama); untuk benda bermerek pakai kemasan generik tanpa logo.

## B. Selera bahasa & script
1. **Bahasa lisan natural**, bukan bahasa berita/tulis. Contoh koreksi: "uji buta" → "waktu manusia dites tanpa tahu mana yang micin"; "seorang dokter" → "ada dokter"; "kontrol orang tua" ditolak.
2. **Presisi kata:** manusia vs orang, jamak yang benar ("bayi-bayi tikus", "tikus-tikus itu"), istilah resmi ("restoran Tionghoa").
3. **Eksplisit, jangan biarkan penonton menebak** ("koran cuma ingat micin", bukan "koran cuma ingat satu").
4. **Pertahankan punchline lucu yang kuat** ("Jadi lidahmu kenal gurih micin… sejak menyusu"). Jangan dihapus demi memangkas durasi.
5. Taruhan/stakes harus terasa; ironi intelektual saja dianggap dangkal. Jawab "kenapa" dengan mekanisme.
6. Durasi boleh lebih dari 1 menit bila cerita butuh; yang penting cerita tersampaikan.

## C. Cara kerja yang disukai
1. **Riset dulu, berbasis bukti, mendalam** sampai yakin ("100% yakin"); bedakan fakta terverifikasi, inferensi, dan klaim yang diperdebatkan.
2. **Shortlist → user memilih → baru riset** judul terpilih.
3. **Rencana dulu bila arah besar berubah**; untuk hal kecil langsung kerjakan.
4. **Storyboard sebelum render** (hemat token); satu paket review; revisi per nomor shot.
5. **Efisien, tidak sia-sia:** jangan cari/buat aset yang tidak muncul di video; hentikan proses yang macet dan cari jalan lain.
6. **Hemat token tapi kualitas maksimal:** sesi utama effort high; subagen dipilih sesuai kesulitan.
7. **Jangan membuat user mengulang:** cek sendiri daftar A–B dan `2-visual…` §E sebelum mengirim; user lelah memberi instruksi artistik berulang.
8. **Proaktif memperbaiki** ("yang bisa diimprove, improve") dan laporkan apa yang diperbaiki.
9. **Jawab pertanyaan bernomor dengan nomor yang sama**, beri pendapat jujur ("gimana menurutmu?"), boleh membantah dengan alasan.
10. **Fleksibel pada aturan bila masuk akal** (gambar AI boleh bila perlu; video AI tidak), tetapi keputusan yang sudah diambil dihormati.
11. **Pengingat di akhir** bila diminta; merge ke `main` hanya atas izin.
12. **Minim CLI untuk user:** user bekerja dari HP/aplikasi; media di Google Drive per episode (`NNN Judul`); upload YouTube dan ElevenLabs (saat kuota konektor habis) dikerjakan user secara manual. File > 10 MB tidak bisa diunggah Claude ke Drive → kirim lewat chat (preview < 30 MB bila perlu) dan minta user menaruhnya.
13. User yakin persetujuan bisa cepat bila kualitas sudah benar: targetnya **1 video/hari** tanpa putaran revisi panjang.

14. **Shortlist wajib berbasis riset segar, bukan hanya bank ide** (koreksi 14 Nov, #004): tiap kandidat dicek permintaan (autocomplete) dan celah (video Indonesia yang sudah ada) dengan `kit/tools/riset_topik.py`, gratis tanpa API key. vidIQ bisa habis kredit; jangan bergantung padanya.
15. **Sudut Indonesia syarat lulus, bukan nilai tambah:** user menolak cerita yang "gak relate orang Indo" (bohlam/kartel Phoebus ditolak walau fakta kuat). Kandidat tanpa benda/merek/peristiwa yang dikenal penonton Indonesia gugur sebelum shortlist.
16. **Cerita benar, kemasan semaksimal mungkin** (koreksi user 14 Nov, dua kali): bukan "hook jujur yang datar". Fakta tidak boleh salah, tetapi hook, judul, urutan, dan ritme harus mengejar retensi, views, dan potensi viral. Tulis banyak varian hook, pilih yang terkuat, lalu cek kebenarannya. Jangan menolak topik hanya karena kalimat paling aman terdengar datar; kemas ulang dulu.
17. **Janji pilar harus dibayar** (14 Nov, #004): penonton datang untuk "alasan ASLI di balik hal yang kamu kenal"; script wajib punya satu kalimat yang menjawab itu terhadap sesuatu yang penonton alami sendiri (rak warung, harga, tempat), bukan sekadar menceritakan kasus. Tanyakan: penonton nonton untuk apa, dan pulang membawa apa? Kalau tidak terjawab, penonton tidak kembali dan tidak subscribe.
18. **Tanpa jargon yang tidak dijelaskan** (14 Nov): user sendiri tidak tahu KPPU. Setiap lembaga/istilah (KPPU, kasasi, star outlet, wholesaler) dijelaskan dalam ≤ 4 kata yang lucu/lisan ("wasitnya persaingan bisnis") atau dihapus; kepanjangan resmi cukup di layar.
19. **Proaktif mencari celah yang tidak terpikir user** (14 Nov): sebelum mengirim script, cek: jargon, janji pilar, kesan iklan/dibayar merek, kesan kejadian sekarang padahal lama (tahun di layar), keseimbangan (bantahan pihak yang dikritik), pemicu komentar, alasan kembali/subscribe.
20. **Uji POV penonton yang baru lihat** (14 Nov): baca tiap kalimat sebagai orang yang tidak tahu apa-apa dan menonton cepat: siapa melakukan apa ke siapa, akibatnya apa? Kata kerja tanpa objek jelas ("menghukum itu", "naik ke MA", "menang") diganti kalimat lengkap ("Aqua didenda", "membawa kasus ini ke Mahkamah Agung", "denda Aqua berlaku lagi"). Istilah asing diterjemahkan lucu ("alias turunin status warung bintang").

## D. Cek wajib sebelum mengirim storyboard/film (ringkas)
- [ ] Setiap kalimat VO punya gambar yang **menunjukkan** isinya, logis secara fisik dan fakta.
- [ ] Benda yang disebut terlihat; simbol jelas pemiliknya; tidak ada gambar tak berhubungan.
- [ ] Kalimat mirip punya visual berbeda; tidak ada momen layar kosong.
- [ ] ≤ 6 potongan per frame; pita caption bersih; benda kecil tetap terbaca di HP.
- [ ] Bahasa VO/teks natural, presisi, eksplisit; punchline lucu dipertahankan.
- [ ] Tidak ada watermark; kredit gambar tercatat.
- [ ] Janji pilar dibayar (satu kalimat alasan asli yang menyentuh pengalaman penonton); jargon dijelaskan; tahun di layar untuk kasus lama; tidak terkesan iklan merek mana pun.
21. **Merek = perusahaan, bukan cuma produknya** (review storyboard #004): kalau VO bilang "Aqua didenda/membantah/bebas", yang tampil harus perusahaannya (pabrik berlabel tag ketik + orang berjas "pihak X", wajah generik), bukan botol. Lembaga tampil sebagai metafora orang (KPPU = wasit), konsisten satu tokoh dengan baju sama di semua shot.
22. **Cap/stempel harus terbaca di HP tapi tetap tinta transparan** (bukan kartu): tinta pekat digambar opak (`over=1`, tanpa multiply) + pendar kertas tipis di sekeliling huruf (`bake.py` stamps → card()). Kartu krem ditolak user ("harusnya tetap transparan").
23. **Adegan lucu butuh kontras visual yang jelas** (botol air sendirian di kursi terdakwa ruang sidang megah, zoom dari dekat ke lebar), bukan sekadar benda kecil di depan gedung.
24. **Review storyboard lewat halaman artifact yang bisa dikomentari** (bukan gambar grid): user menaruh komentar per shot tanpa "Send to Claude", lalu bilang "cek komentar" di chat; Claude membaca semua dengan `ArtifactComments read`, menjawab di chat, dan menulis jawaban per shot sebagai kotak "Revisi vN" di halaman.
25. **Cap menempel pada pihak yang dikenai, jauh dari label pihak lain** (review S10 #004): label KPPU di sebelah cap DIDENDA terbaca "KPPU didenda". Cap hukuman ditempel langsung di benda/tokoh yang dihukum, di bawah labelnya sendiri.
