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

## D. Cek wajib sebelum mengirim storyboard/film (ringkas)
- [ ] Setiap kalimat VO punya gambar yang **menunjukkan** isinya, logis secara fisik dan fakta.
- [ ] Benda yang disebut terlihat; simbol jelas pemiliknya; tidak ada gambar tak berhubungan.
- [ ] Kalimat mirip punya visual berbeda; tidak ada momen layar kosong.
- [ ] ≤ 6 potongan per frame; pita caption bersih; benda kecil tetap terbaca di HP.
- [ ] Bahasa VO/teks natural, presisi, eksplisit; punchline lucu dipertahankan.
- [ ] Tidak ada watermark; kredit gambar tercatat.
