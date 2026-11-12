# Analisa referensi: "What If Your Reaction Time Was 10x Faster" (A Stickman What If)
Sumber: file unggahan user (720p, 24 fps, 7:13). Semua angka di bawah **diukur** dari file dengan ffmpeg/whisper, bukan perkiraan.
Gambar acuan: `ifverse_detail_tangan.jpg`, `ifverse_detail_wajah.jpg`, `ifverse_detail_badan.jpg`; transkrip: `ifverse_transkrip.txt`.

## 1. Angka terukur
| Aspek | Nilai | Bandingkan dengan kita |
|---|---|---|
| Durasi / format | 7:13, 16:9, letterbox sinematik di banyak shot | kita: Shorts 9:16, 45 dtk |
| Potongan shot | 134 cut terdeteksi; median panjang shot **1,7 dtk** (rentang 0,04–39 dtk; shot panjang = kamera bergerak terus) | storyboard kita 25 shot / 45 dtk ≈ 1,8 dtk → setara |
| Frame rate gerak | 24 fps; hanya 7–20% frame identik → **dianimasikan on ones** + kamera selalu bergerak | rencana kita: karakter on twos. Mereka lebih halus |
| Kecerahan (luma rata-rata) | **58/255** (p10 37, median 55, p90 78) | noir v2 kita 44 = "terlalu gelap"; ini 58 tapi **tidak terasa gelap** (lihat §4) |
| Saturasi rata-rata | rendah (9,7) | dunia kalem, warna jenuh hanya di baju & aksen |
| Loudness | −15,1 LUFS integrated, LRA 5,1 LU | kita target −14 LUFS, cocok |
| Narasi | 701 kata; 129 kata/menit saat bicara; VO hanya mengisi **75%** durasi | jeda 25% diisi aksi, SFX, musik → film bernapas |

## 2. Karakter: anatomi dan konstruksi
Kesimpulan terpenting: **kualitas premiumnya tidak berasal dari detail karakter.** Karakternya sangat sederhana; yang mahal adalah cahaya, latar, dan kamera.

- **Kepala:** lingkaran hitam penuh. Tanpa hidung, telinga, atau rambut. Wajah = 2 mata + 1 mulut berwarna putih/krem, ditempel sebagai stiker. Ekspresi dari bentuk mata (titik, lengkung senyum `^ ^`, alis miring marah, lingkaran besar kaget) dan mulut (garis, lengkung, "o"). Close-up wajah tetap terlihat bagus karena wajahnya memang tidak punya detail yang bisa terlihat "salah".
- **Leher:** batang hitam pendek, kadang tertutup kerah atau hoodie.
- **Badan:** satu bentuk baju (hoodie merah, jas lab putih, mantel hitam) dengan **sudut membulat**. Detail baju hanya 1–2 garis (tali hoodie, resleting).
- **Lengan dan kaki:** tabung tebal ujung bulat, **dua segmen** (atas–bawah) dengan sendi siku dan lutut. Lengan baju menutup sebagian, sisanya hitam.
- **Tangan:**
  - di shot lebar: ujung bulat/kepalan sederhana
  - di close-up: diganti tangan khusus berjari 4–5, jari tebal meruncing, jempol terpisah, tanpa kuku
  - jadi **dua tingkat detail (LOD)**, ditukar sesuai ukuran shot
- **Garis tepi:** tidak ada outline hitam. Yang ada **rim cahaya berwarna** (krem/oranye) di sisi yang menghadap sumber cahaya. Inilah yang membuat sosok hitam terbaca di latar gelap.
- **Pembeda tokoh:** **warna baju + satu aksesori** (topi kuning, topi hijau, bando biru, kacamata dan jas putih, fedora dan kacamata hitam). Rig badannya sama. Ini persis yang kamu minta: satu base, ganti wardrobe.
- **Proporsi:** kepala besar (±1/4 tinggi badan), tubuh ramping, kaki panjang.

## 3. Animasi
- **On ones, gerak tween halus** dengan ease. Bukan "boil" atau garis bergetar.
- **Acting lewat pose kuat dan siluet:** tangan di kepala (frustrasi), tangan di belakang (malu), jongkok menangkap. Setiap pose terbaca dari siluet saja.
- **Gerak sekunder:** hoodie dan tali ikut bergerak, kepala sedikit telat dari badan.
- **Slow motion sebagai alat cerita:** dunia melambat (motion trail, garis kecepatan, gema bola) sesuai konsep "reaksi cepat".
- **Animasi informasi:** lingkaran fokus, angka "0.45 s", "11 m", grafik batang, papan skor. Muncul **di dalam dunia**, bukan sebagai slide.

## 4. Visual, cahaya, warna
- **Dunia senja/malam ungu–biru** dengan **sumber cahaya hangat yang jelas** (jendela oranye, lampu jalan, lampu gantung, matahari terbenam). Rata-rata gelap (luma 58) tapi selalu ada **titik terang yang menjadi fokus**, dan subjek selalu dipisah dari latar oleh rim cahaya.
- **Pelajaran untuk kita:** masalah noir v2 kita bukan sekadar luma rata-rata 44. Masalahnya, tidak ada titik terang yang memandu mata. Aturan LOOK.md (luma 90–140) perlu diganti menjadi **"latar boleh gelap, tapi subjek wajib dipisah dengan rim dan selalu ada satu sumber cahaya terang di frame"**.
- **Kedalaman:** 3 lapis (latar depan blur, subjek tajam, latar belakang blur kuat), seperti depth-of-field lensa. Ada lens flare, bloom di lampu, vignette, grain halus, dan letterbox.
- **Latar:** flat vector dengan gradasi lembut, perspektif 2,5D (jalan, gedung, stadion dengan kamera berputar), dan detail tekstur minimal. Rumah dan kota digambar rapi, lalu diblur supaya tidak bersaing dengan tokoh.
- **Palet:** latar tidak jenuh (ungu, biru, coklat). Warna jenuh hanya pada **baju tokoh utama (merah)** dan aksen informasi (oranye/kuning). Mata selalu tahu harus melihat siapa.

## 5. Kamera dan sinematografi
- Kamera **hampir tidak pernah diam**: dolly pelan, push-in, orbit 2,5D, rack focus (latar depan ke subjek).
- Variasi ukuran shot sangat kaya:
  - wide establishing → medium → close-up tangan/benda → extreme close-up mata
  - top-down (meja kafe)
  - low angle (tiang lampu stadion)
  - POV melalui jaring gawang
  - over-the-shoulder
- **Insert benda** untuk aksi kunci: tangan menangkap HP, cangkir jatuh, kabel kamera putus.
- Transisi: kebanyakan potongan langsung di ketukan VO, sebagian whip/blur dan dissolve.

## 6. Cerita dan naskah (formula yang terbukti)
1. **Cold open berupa aksi** (lalat ditangkap, cangkir jatuh) sebelum judul. Penonton melihat kekuatannya dulu, baru diberi pertanyaan "What if…".
2. **"Here's how it works"**: penjelasan mekanisme singkat (mata → otak → otot) memakai diagram dalam dunia.
3. **Eskalasi bertingkat:** hidup sehari-hari → game → olahraga 1 → 2 → 3 → panggung terbesar.
4. **Ada biaya** ("and there's a cost": sakit kepala, bosan, dunia terasa lambat). Ini membuat cerita terasa jujur.
5. **Dilema moral di puncak** (bola atau anak?) → memilih manusia → kalah final, menang hal yang lebih besar.
6. **Kalimat sangat pendek** ("Caught." "Save. Save." "No drugs. No tricks."), orang kedua ("you"), angka konkret.
7. **Ending:** pertanyaan ke penonton + CTA, plus pancingan lanjutan (mobil hitam).

## 7. Audio
- Mix −15 LUFS, dinamika sempit (LRA 5) → nyaman di HP.
- 25% durasi tanpa VO diisi SFX aksi dan musik. Ruang hening dipakai untuk punchline ("Huh?", jeda sebelum memilih).
- VO tenang dan jelas, tidak berteriak. Energi datang dari editing dan SFX.

## 8. Apa yang bisa dan tidak bisa kita tiru
| Bisa diadaptasi (teknik umum) | Tidak boleh (identitas mereka) |
|---|---|
| konstruksi rig sederhana: kepala bentuk dasar + wajah stiker + tabung 2 segmen + baju bentuk | menyalin persis desain "stickman kepala bulat hitam, hoodie merah" mereka |
| pembeda tokoh = wardrobe + 1 aksesori | nama, judul format "What If", tokoh, adegan mereka |
| rim cahaya, DOF 3 lapis, dunia gelap dengan sumber terang | |
| eskalasi, biaya, dilema, kalimat pendek | |
Jadi kita bangun **rig dengan prinsip yang sama tapi desain sendiri**, agar Mini Thriller IDN punya identitas yang bisa dikenali.

## 9. Spesifikasi base rig ARSIP (usulan)
**Prinsip:** satu kerangka, semua tokoh. Karakter lebih sederhana daripada Cast Kit lama. Kita kalah di detail wajah dan anatomi, jadi kita tidak bersaing di situ. Kualitas dibawa cahaya, kamera, latar.

**Kerangka (dalam satuan "kepala" H):**
| Bagian | Konstruksi | Parameter |
|---|---|---|
| Kepala | bentuk dasar warna tinta gelap (bukan hitam murni: biru-tinta `#14161d`), sedikit oval | `headW`, `headH`, `jaw` (bulat/kotak), `tilt` |
| Wajah | stiker krem: mata + alis + mulut dari pustaka ekspresi | `expr`: netral, senyum, kaget, takut, marah, sedih, ragu, lelah, menyesal |
| Rambut/aksesori | bentuk opsional di atas kepala | `hair`: none/pendek/panjang/sanggul/uban; `acc`: kacamata, peci, kerudung, topi, jenggot |
| Leher | batang pendek | `neck` |
| Badan | bentuk baju sudut bulat | `build`: kurus/sedang/gemuk; `bend` (bungkuk untuk lansia) |
| Lengan/kaki | 2 segmen, ujung bulat, IK sederhana (bahu → siku → pergelangan dari target tangan) | `armLen`, `legLen`, `thick` |
| Tangan | **LOD 2 tingkat**: bulat (wide) / tangan berjari (close-up) dengan pose: terbuka, kepal, menunjuk, pegang HP, pegang benda | `handPose` |
| Wardrobe | lapisan warna: kaos, kemeja, hoodie, jas, daster, sarung, seragam | `top`, `bottom`, `col1`, `col2` |
| Cahaya | rim warna sesuai sumber di scene | `rim`, `rimDir` |

**Preset varian (bukti satu rig = semua orang):** pria dewasa, wanita (kerudung/rambut panjang), anak (kepala relatif lebih besar, kaki pendek), kakek (bungkuk, uban, kacamata), nenek (sanggul/kerudung, bungkuk), kakak/adik (skala tinggi berbeda).

**Animasi:** pose library + tween on ones (24/30 fps), antisipasi → aksi → follow-through, gerak sekunder (kepala telat, baju ikut), kedip mata, napas.

**Acceptance (sebelum dipakai di cerita mana pun):**
1. Model sheet 7 varian berdiri berjajar, bisa dibedakan dari siluet.
2. 9 ekspresi terbaca tanpa suara.
3. Tangan close-up memegang HP terlihat normal.
4. Klip uji 5 dtk: berjalan, menoleh, mengangkat HP, kaget.
