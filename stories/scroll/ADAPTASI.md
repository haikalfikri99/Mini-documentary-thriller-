# Adaptasi ARSIP 002 ke ARSIP RIG + bahasa visual referensi
Menggantikan bagian **Karakter** dan **Pencahayaan** di `LOOK.md` (aturan "wajah tidak pernah ditampilkan" dan target luma 90–140 dicabut).
VO, script v8, timing kata, caption, dan tipografi **tidak berubah**. Yang berubah: siapa yang tampil dan bagaimana digambar.
Acuan: `rig/README.md`, `research/referensi/ANALISA_VISUAL_2D.md`.

## 1. Pemeran (semua dari satu rig)
| Tokoh | Spec | Dipakai di |
|---|---|---|
| **Raskin 2006** | kulit terang, rambut pendek gelap, kacamata, kemeja biru muda, celana panjang | S5–S7 |
| **Raskin 2019** | sama + jenggot gelap, kaos abu tua, sedikit membungkuk (`stoop .06`) | S1, S3, S19, S22 |
| **Kamu** | sawo matang, rambut pendek, kaos abu, sarung | S2, S15, S17, S25 (tangan CU di S2, S25) |
| **Orang 2006** | sawo, kemeja kerja, ekspresi lelah | S8, S12, S13 |
| **Kerumunan** | campuran preset (pria, ibu, kakek, adik, kakak) memegang HP | S21 |

## 2. Set: 4 tempat, dipakai ulang dengan cahaya berbeda
| Set | Cahaya utama | Rim pada tokoh | Shot |
|---|---|---|---|
| **A. Kamar Raskin 2019** (meja, laptop, rak buku, jendela kota malam) | layar laptop/HP, cyan `#7fe3ff` | cyan | S1, S3, S19, S20, S22 |
| **B. Kantor 2006** (monitor krem, jendela siang, poster) | jendela siang hangat | krem | S5–S9, S12 |
| **C. Kamar "kamu"** (kasur, guling, kipas, jam 01.47, colokan) | lampu kamar redup + layar HP | amber + cyan | S2, S17, S18, S24, S25 |
| **D. Ruang sistem** (abstrak: map arsip, lorong feed, tombol) | satu sorot | amber | S4, S10, S11, S13–S16, S21, S23 |

Setiap set mengikuti aturan referensi:
- bentuk bersih tanpa outline
- gradien per permukaan
- bayangan kontak
- 1–3 detail yang bercerita
- latar blur sesuai jarak
- pool cahaya + vignette + grain

## 3. Perubahan per shot (timing tetap seperti `storyboard.md`)
| # | VO | Gambar baru | Kamera |
|---|---|---|---|
| S1 | Pria ini merancang fitur | MCU Raskin 2019 duduk di meja gelap, wajah diterangi HP, ekspresi datar | push-in pelan |
| S2 | yang lagi kamu pakai… | POV tangan "kamu" memegang HP (`handPhoneCU`), jempol menggeser feed | potong |
| S3 | dan dia menyesal. | CU Raskin menunduk, ekspresi **menyesal**, cahaya HP di kacamata | tarik mundur, hold |
| S4 | (jeda) | freeze → sepia → foto di map ARSIP KASUS #002, slam | signature #001 |
| S5 | Tahun 2006, Aza Raskin | foto hidup: wide kantor 2006 siang, Raskin muda di depan monitor | foto → hidup |
| S6 | bikin scroll tanpa ujung. | insert monitor: halaman memanjang ke bawah keluar layar | tilt turun |
| S7 | Niatnya baik: | over-the-shoulder: Raskin **senang**, kursor menghapus tombol "Halaman berikutnya" | potong |
| S8 | biar kita nggak usah klik | orang 2006 di depan komputer, ekspresi **lelah**, klik mouse | potong |
| S9 | "halaman berikutnya" terus. | insert tombol amber diklik 1·2·3 | potong cepat |
| S10 | Tapi | freeze, warna turun, hanya tombol amber menyala | dip, zoom pelan |
| S11 | tombol kecil itu punya tugas penting. | tombol besar = rem | punch-in |
| S12 | Di situ kamu berhenti, dan mikir… | orang 2006 berhenti, jari di atas tombol, ekspresi **bingung**, mata ke atas, jam dinding | hold |
| S13 | lanjut, atau udahan? | **split screen bergaris retak** (teknik referensi): kiri LANJUT (tetap menatap layar, cahaya cyan), kanan UDAHAN (menutup laptop, berdiri) | potong di tiap kata |
| S14 | Begitu tombolnya hilang, | tombol retak dan pecah | hit + shake |
| S15 | kamu nggak pernah ketemu titik berhenti lagi. | "kamu" kecil **berjalan** di atas feed yang terus memanjang ke depan, tidak pernah sampai ujung (walk cycle kaki menapak) | kamera ikut, horizon tak berujung |
| S16 | Lalu media sosial memakainya. | ikon aplikasi generik menempel di dinding; jalan menyempit menjadi layar HP | morph |
| S17 | Makin lama kamu scroll, | "kamu" **rebahan** di kasur, wajah diterangi HP; jam 23.12 → 01.47; ekspresi senyum → lelah, kedip makin lambat | dorong pelan |
| S18 | makin banyak iklan terjual. | insert **top-down** (teknik referensi): kartu IKLAN lewat → koin ke celengan | match cut jam → koin |
| S19 | Belakangan, Raskin ngaku… | Raskin 2019 di set A, layar-layar di sekeliling, stempel 2019 | sepia → dingin |
| S20 | "Dengan menghapus tanda berhenti, | CU tangan Raskin menghapus tombol amber; kutipan per kata | blur swap |
| S21 | saya bisa membuat kamu melakukan apa yang saya mau." | kerumunan beragam (bukti rig modular) menunduk ke HP; tali dari HP mereka naik ke satu tangan besar | dorong ke atas ke tangan |
| S22 | Dan dia menyesal. | Raskin menutup laptop, cahaya padam di wajah, **menyesal** (satu-satunya momen gelap, ≤1 dtk) | hold 0,6 dtk |
| S23 | Video ini sebentar lagi selesai. | progress bar di tengah hampir penuh | potong |
| S24 | Feed kamu… nggak akan pernah. | di belakangnya feed terus mengalir | parallax |
| S25 | Jadi tanda berhentinya… kamu yang pasang. | POV jempol meletakkan tombol amber "UDAHAN" di ujung feed; feed berhenti; "kamu" menaruh HP dan lampu kamar padam | loop → S1 |

## 4. Kebutuhan tambahan untuk rig (dibuat saat membangun shot)
1. Pose **duduk** di kursi (S1, S3, S5, S7, S8, S12, S19, S22): panggul turun, kaki ke depan, sudah bisa lewat IK.
2. Pose **rebahan** (S17): putar seluruh tokoh di atas kasur.
3. Tangan CU baru: **memegang benda** (S20 penghapus) dan **menjepit** (S25 tombol).
4. Laptop yang bisa dibuka/ditutup (S13, S22).

## 5. Gerbang kerja (hindari coba-coba)
1. **Rencana ini** ✋
2. Bangun 4 set + 3 frame kunci (S1, S5, S17) dengan tokoh di dalamnya, kirim sekali untuk cek nuansa ✋. Kecil dan cepat, tapi menentukan semua shot.
3. Animasi 25 shot → film penuh tanpa audio ✋
4. Audio: musik, SFX, mix −14 LUFS ✋ → thumbnail dan metadata.
