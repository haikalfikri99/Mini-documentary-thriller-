# BANJIR INI BUKAN AIR — Visual Plan v3.1 (workflow ringkas)

Mengikuti `VISUAL_STYLE_BIBLE.md` dan skill `cinematic-documentary-visuals`. Pembagian alat:
- **Google Flow** membuat gambar (dijalankan user).
- **Hyperframes** mengerjakan animasi dan render.

Naskah dan VO (`audio/vo_molase.mp3`, 61,0 detik) dipakai utuh. Timing diambil dari jeda audio.

Status: **siap dieksekusi.** Batch 1 siap dijalankan di Google Flow Agent. Belum ada gambar yang dibuat dan belum ada render.

## Prinsip produksi (keputusan final user)
1. **Satu prompt = satu gambar final.** Tidak ada varian dan tidak ada proses memilih.
2. Prompt dioptimalkan sejak awal agar hasilnya langsung usable untuk animasi: komposisi 9:16, ruang tepi untuk gerak kamera, area bawah tidak terlalu ramai untuk caption.
3. **Semua reference yang relevan dilampirkan** di setiap prompt (karakter, lingkungan, objek).
4. **Toleransi:** ketidakakuratan historis atau visual kecil diterima selama inti cerita tersampaikan dan fakta utama tidak berubah.
5. **Regenerate hanya jika gambar gagal total**, yaitu:
   - wajah atau anatomi rusak parah;
   - subjek utama salah atau hilang;
   - ada tulisan atau huruf yang mencolok;
   - jelas modern;
   - tidak bisa dipakai untuk shot-nya.

   Detail kecil tidak menjadi alasan regenerate.
6. **Gerak sinematik dimaksimalkan di Hyperframes:** parallax berlapis, kamera, efek molase, partikel, cahaya, dan shake. Gambar tidak dipaksa menanggung semua gerak.
7. Tidak ada gate approval per batch. Saya hanya melakukan cek "gagal total" saat gambar diunggah, lalu lanjut.

---

## 0. Keputusan visual dan fakta pendukung

| Hal | Keputusan | Dasar |
|---|---|---|
| Waktu dan cuaca | **Tengah hari (~12.30)**, hari musim dingin yang hangat tak biasa (>40°F), langit mendung pucat, sisa salju kotor, kabut asap batu bara | Sumber menyebut tangki runtuh sekitar 12.30 pada hari yang hangat. **Senja di reference sheet tidak akurat**, jadi tidak dipakai untuk adegan kejadian. |
| Lokasi | Commercial Street, North End, dekat Keany Square, tepi pelabuhan. Tangki di sisi pelabuhan. | 529 Commercial St |
| Tangki | Baja berpaku keling, tinggi ±15 m, diameter ±27 m, atap kerucut rendah, **dicat cokelat** dengan noda rembesan di sambungan | Laporan bahwa tangki dicat cokelat untuk menutupi kebocoran |
| Rel layang | Rangka baja Boston Elevated di tengah Commercial Street | Laporan AP: dinding tangki menghantam struktur rel layang dan merusak tiga bentang |
| "Kereta layang terlempar dari rel" | Visual: **bentang rel layang patah dan miring, satu gerbong anjlok miring di tepi bentang rusak**. Gerbong tidak digambarkan melayang jatuh. | Sumber hanya menguatkan kerusakan struktur. Narasi tetap utuh, visualnya dipilih yang paling bisa dipertanggungjawabkan. |
| Anak-anak dan tetesan | Anak-anak menadah molase dengan cangkir dan kaleng | Dikonfirmasi beberapa sumber |
| Orang nyata | **Semua karakter anonim dan fiktif-generik**, tanpa nama dan tanpa meniru wajah korban atau penyelidik nyata | Bible §5 dan §10 |
| Label | "Rekonstruksi sinematik" kecil, konsisten | Bible §10 |
| Teks di dalam gambar | Tidak ada papan nama atau tulisan apa pun di gambar Flow. Nama perusahaan tidak ditampilkan. | Mencegah huruf rusak (gibberish) dan klaim merek yang belum diverifikasi |

---

## A. Visual beat sheet

Total **22 shot dalam 11 beat** ditambah kartu penutup. Timing mengikuti segmen VO. Satu beat bisa berisi beberapa kalimat, dan sebagian kalimat digabung ke dalam satu shot.

| Beat | Waktu (s) | Fungsi naratif | Shot | Visual: subjek & aksi | Lingkungan | Sudut & ukuran | Gerak kamera | Aset | Teks layar | Suara |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 HOOK | 0,00–2,30 | Kontradiksi: "banjir" yang bukan air | S01 | Lidah molase hitam-cokelat mengilap merayap di atas cobblestone dan rel trem menuju kamera. Topi pet (CH01) terseret, ujung papan kayu tertelan. | Commercial St, tengah hari mendung | Low angle, ground-level, close | Push-in pelan rendah, efek kilau molase dibuat dengan kode | P01 | Judul kecil "BANJIR INI BUKAN AIR" (frame 0 = thumbnail) | Dengung rendah, gemericik kental |
| | 2,30–5,40 | Sumbernya: tangki raksasa | S02 | CH01 berdiri kecil di kaki tangki, mendongak. Tangki memenuhi frame. | Halaman tangki di tepi pelabuhan | Ultra-low angle, wide, manusia kecil di depan | **Tilt-up** dari CH01 ke puncak tangki (skala) | P02 | – | Angin pelabuhan, logam berderit samar |
| | 5,40–9,00 | Apa itu molase | S03 | Tangan CH01 memegang ember. Pita molase pekat mengalir lambat dari keran ke tong kayu. | Halaman tangki | Medium close-up / insert | Pelan mengikuti aliran turun | P03 | – | Tuangan kental |
| 2 SETTING | 9,00–12,65 | Tempat & waktu | S04 | Commercial St hidup: rel layang dengan kereta lewat, gerobak kuda, pekerja makan siang, tangki di belakang deretan gedung | Commercial St, tengah hari | Establishing wide, sedikit tinggi | **Tracking lateral** dengan parallax 2–3 lapis | ENV01 (dipakai langsung sebagai plate) | "Boston · 15 Januari 1919" | Ambience kota: kuku kuda, kereta layang, camar |
| 3 RUPTURE | 12,65–13,90 | Detik kegagalan | S05 | Sambungan pelat di dinding bawah tangki robek, paku keling terlontar, molase menyembur | Dinding tangki | Close-up | Shake meningkat dan snap zoom kecil, ditambah serpihan dan semburan dari kode | P05 | – | Derit logam, letupan paku keling (tembakan beruntun) |
| | 13,90–14,95 | Skala keruntuhan | S06 | Dinding tangki membuka seperti kelopak, gelombang molase meledak keluar, rel layang di tepi frame | Halaman tangki dan jalan | Wide, sedikit tinggi | Impact shake, push cepat | P06 | – | Dentum besar |
| 4 GELOMBANG | 14,95–18,45 | Volume menerjang kota | S07 | Dinding molase setinggi ±2 lantai menerjang di bawah rel layang ke arah kamera. CH01 dan warga berlari, CH04 menoleh ketakutan. | Commercial St | Street level, wide, gelombang di latar | Mundur cepat (pull-back), parallax manusia vs gelombang | P07 (+ L07 opsional) | "2,3 juta galon" kecil | Gemuruh dan teriakan jauh |
| | 18,45–21,55 | Kecepatan | S08 | Puncak gelombang menghantam gerobak kuda dari samping. Gerobak terangkat, cipratan tebal. | Commercial St | Side view, medium-wide | **Tracking samping** cepat dan motion blur | P08 | "≈56 km/jam" kecil | Whoosh, kayu pecah |
| 5 KEHANCURAN | 21,55–23,35 | Infrastruktur kalah | S09 | Bentang rel layang patah dan melengkung, satu gerbong anjlok miring di tepi bentang rusak | Rel layang di atas jalan | Low angle, wide | Tilt-up lambat dan getaran | P09 | – | Baja berderit, kaca pecah |
| | 23,35–24,55 | Bangunan hancur | S10 | Gudang/bangunan kayu ambruk ke samping, didorong molase | Tepi jalan | Medium-wide | Shake singkat | P10 | – | Kayu runtuh |
| | 24,55–27,65 | Taruhan manusia | S11 | CH04 dan CH01 terjebak setinggi pinggang di molase lengket, meraih satu sama lain. Tidak sadis, tidak ada luka. | Jalan tergenang | Medium, eye level | Push-in pelan, partikel cipratan | P11 | – | Napas, molase berat, hening sesaat |
| 6 TURN | 27,65–31,00 | Mundur waktu: bahaya sudah ada | S12 | Tangki utuh, hari tenang biasa, cat cokelat, noda gelap di sambungan | Halaman tangki, hari biasa | Wide frontal | Pull-back pelan, grade lebih dingin dan sepi | OBJ01 (dipakai langsung) | – | Semua efek berhenti, tik jam |
| 7 BOCOR | 31,00–35,55 | Bukti kebocoran | S13 | Close-up sambungan berpaku keling: molase merembes dan menetes, cat cokelat mengelupas | Dinding tangki | Extreme close-up | Macro drift, tetesan jatuh dibuat dengan kode | P13 | – | Tetesan |
| | 35,55–38,35 | Normalisasi bahaya | S14 | CH02 dan satu anak lain menadah tetesan dengan cangkir kaleng di kaki tangki, tersenyum | Kaki tangki | Medium, eye level anak | Parallax ringan | P14 | – | Tawa anak samar, tetesan |
| 8 INVESTIGASI | 38,35–41,50 | Sesudah bencana | S15 | CH03 dan dua petugas berjalan di antara pelat baja robek, tanah dilapisi molase, puing | Lokasi runtuh, sore | Wide | Tracking lambat mengikuti CH03 | P15 | – | Ambience sunyi, langkah lengket |
| | 41,50–44,85 | Temuan: tipis & retak | S16 | CH03 berjongkok mengukur tebal tepi pelat robek dengan jangka sorong. Permukaan patahan terlihat. | Lokasi runtuh | Close-up | Push-in ke tepi patahan, diagram garis tipis dibuat dengan kode | P16 | Label kecil "dinding terlalu tipis" | Klik logam |
| 9 PENYEBAB | 44,85–46,90 | Konstruksi buruk | S17 | Pekerja memaku keling pelat tangki di perancah saat tangki dibangun | Halaman tangki, masa konstruksi | Medium-wide | Tilt pelan | P17 | – | Palu keling |
| | 46,90–48,60 | Perubahan suhu | S18 | Termometer tua di dinding bata, salju mencair menetes di sebelahnya | Dinding gedung | Insert close-up | Push kecil | P18 | – | Tetes es |
| | 48,60–50,65 | Pengiriman molase baru | S19 | Kapal tanker di dermaga, selang/pipa besar dari kapal ke tangki | Dermaga pelabuhan | Wide | Pan lambat dari kapal ke tangki | P19 | – | Mesin kapal, pompa |
| 10 KORBAN | 50,65–54,25 | Harga yang dibayar | S20 | Penyelamat (pemadam, pelaut) membawa tandu bertutup kain melewati molase. Tanpa gore. | Jalan pascabencana | Medium-wide | Diam, nyaris statis | P20 | "21 meninggal · 150 terluka" kecil | Musik turun, hening |
| 11 PERTANYAAN | 54,25–57,55 | Refleksi | S21 | Sisa dasar tangki yang robek dan kolam molase gelap. Lampu jalan mulai menyala menjelang petang. | Lokasi tangki, sore akhir | Wide | Push-in lambat | P21 | – | Ambience tipis |
| | 57,55–60,70 | Echo: tanda yang diabaikan | S22 | Kembali ke sambungan bocor (P13), tetesan terakhir jatuh, potong hitam | Dinding tangki | ECU | Push sangat lambat | P13 (pakai ulang) | Kata "diabaikan?" opsional | Satu tetes, lalu hening |
| END | 60,70–63,00 | Penutup | – | Kartu hitam: judul, "rekonstruksi sinematik" | – | – | – | – | Judul | Ekor |

Caption frasa dipakai di versi captioned. Master bersih tanpa caption sesuai Bible §12.

---

## B. Asset manifest — **25 gambar inti** (+2 opsional)

Format kolom: `ID | jenis | dipakai di shot | referensi yang dilampirkan | rasio | nama file`.

### Referensi (6)
| ID | Jenis | Shot | Lampirkan | Rasio | File |
|---|---|---|---|---|---|
| CH01 | character-ref | S01 (topi), S02, S03, S07, S11 | – | 16:9 (turnaround) | `assets/flow/CH01_worker_ref.png` |
| CH02 | character-ref | S14 | – | 16:9 | `assets/flow/CH02_boy_ref.png` |
| CH03 | character-ref | S15, S16 | – | 16:9 | `assets/flow/CH03_engineer_ref.png` |
| CH04 | character-ref | S07, S11 | – | 16:9 | `assets/flow/CH04_woman_ref.png` |
| ENV01 | environment-ref **+ plate S04** | S04 dan referensi untuk semua shot jalan | – | 9:16 | `assets/flow/ENV01_commercial_st.png` |
| OBJ01 | object-ref **+ plate S12** | S12 dan referensi untuk semua shot tangki | ENV01 | 9:16 | `assets/flow/OBJ01_tank.png` |

### Plate shot (19)
| ID | Shot | Lampirkan | Rasio | File |
|---|---|---|---|---|
| P01 | S01 | ENV01, CH01 | 9:16 | `assets/flow/P01_hook_flow_cobbles.png` |
| P02 | S02 | OBJ01, CH01 | 9:16 | `assets/flow/P02_worker_tank_tiltup.png` |
| P03 | S03 | CH01, OBJ01 | 9:16 | `assets/flow/P03_molasses_pour.png` |
| P05 | S05 | OBJ01, P13 | 9:16 | `assets/flow/P05_seam_burst.png` |
| P06 | S06 | OBJ01, ENV01 | 9:16 | `assets/flow/P06_tank_collapse_wide.png` |
| P07 | S07 | ENV01, CH01, CH04 | 9:16 | `assets/flow/P07_wave_street.png` |
| P08 | S08 | ENV01 | 9:16 | `assets/flow/P08_wave_wagon.png` |
| P09 | S09 | ENV01 | 9:16 | `assets/flow/P09_elevated_broken.png` |
| P10 | S10 | ENV01 | 9:16 | `assets/flow/P10_building_collapse.png` |
| P11 | S11 | CH01, CH04, P07 | 9:16 | `assets/flow/P11_trapped_people.png` |
| P13 | S13, S22 | OBJ01 | 9:16 | `assets/flow/P13_seam_leak_ecu.png` |
| P14 | S14 | CH02, OBJ01, P13 | 9:16 | `assets/flow/P14_children_cups.png` |
| P15 | S15 | CH03, OBJ01, P06 | 9:16 | `assets/flow/P15_aftermath_inspectors.png` |
| P16 | S16 | CH03, P15 | 9:16 | `assets/flow/P16_measuring_plate.png` |
| P17 | S17 | OBJ01 | 9:16 | `assets/flow/P17_construction_rivets.png` |
| P18 | S18 | ENV01 | 9:16 | `assets/flow/P18_thermometer.png` |
| P19 | S19 | OBJ01, ENV01 | 9:16 | `assets/flow/P19_tanker_ship.png` |
| P20 | S20 | ENV01, P15 | 9:16 | `assets/flow/P20_rescuers_stretcher.png` |
| P21 | S21 | OBJ01, P15 | 9:16 | `assets/flow/P21_ruins_dusk.png` |

### Opsional (hanya jika parallax ternyata kurang; default tidak dibuat)
| ID | Kegunaan | File |
|---|---|---|
| L07 | Versi P07 tanpa orang (background bersih) untuk parallax manusia vs gelombang | `assets/flow/L07_wave_street_clean.png` |
| L02 | Versi P02 tanpa CH01 untuk tilt-up dengan oklusi | `assets/flow/L02_tank_clean.png` |

**Kenapa 25 dan tidak lebih sedikit:** setiap plate memuat aksi atau informasi baru, sesuai Bible §7.3. Penghematan sudah dilakukan dengan memakai ulang:
- ENV01 sebagai S04;
- OBJ01 sebagai S12;
- P13 sebagai S22;
- satu plate untuk beberapa crop.

Kandidat dipangkas jika perlu: **P18** (termometer, bisa diganti insert sederhana) dan **P03** (tuangan molase).

Hasil Flow disimpan di `stories/molase/assets/flow/`. Ini satu subfolder di dalam folder aset yang sudah ada, bukan struktur baru.

---

## C. Rencana reference karakter & lingkungan

### Karakter (semua anonim, fiktif-generik)
| ID | Peran | Deskripsi tetap (dipakai identik di setiap prompt) |
|---|---|---|
| **CH01** | Buruh pelabuhan North End, tokoh "mata" penonton | Pria Italia-Amerika usia ~35, badan sedang, rambut hitam pendek, kumis tebal gelap, cambang tipis, wajah lapuk cuaca. Topi pet wol cokelat-arang, mantel kerja wol cokelat tua di atas sweter wol abu-abu, syal rajut merah-bata, celana gelap, sepatu bot kulit usang. |
| **CH02** | Anak penadah tetesan | Anak laki-laki ~10 tahun, Italia-Amerika, rambut hitam ikal di bawah topi newsboy wol abu-abu, jaket tweed kebesaran bertambal, celana knickerbocker, kaus kaki wol, sepatu bot lecet, memegang cangkir kaleng penyok |
| **CH03** | Insinyur/penyelidik (generik, bukan tokoh nyata) | Pria ~55, kumis abu-abu rapi, kacamata kawat bulat, topi bowler hitam, mantel wol arang panjang, kerah putih dan dasi gelap. Membawa buku catatan dan jangka sorong kuningan. |
| **CH04** | Warga perempuan | Perempuan ~30, rambut gelap disanggul, selendang wol gelap, rok panjang gelap, celemek pudar, wajah tegas |

**Aturan reference karakter:**
1. Satu sheet per karakter, dibuat sekali: tampak depan, samping, belakang, dan close-up wajah, dengan latar abu-abu netral dan cahaya merata.
2. Hasil pertama langsung menjadi referensi tetap (tanpa pemilihan), kecuali gagal total.
3. Lampirkan sheet itu di setiap prompt plate yang memuat karakter tersebut.
4. Jangan memakai gambar kerumunan sebagai sumber identitas.

Figur latar (warga lain, pemadam, pelaut, anak kedua) tidak perlu reference sheet.

### Lingkungan & objek
| ID | Isi yang dikunci |
|---|---|
| **ENV01** | Commercial Street 1919: rangka baja rel layang di tengah jalan, deretan gedung bata 4–5 lantai, cobblestone dan rel trem, gerobak kuda, sisa salju kotor, mendung tengah hari, tangki cokelat terlihat di belakang di sisi pelabuhan. Menjadi patokan palet dan cahaya semua shot kejadian. |
| **OBJ01** | Tangki: silinder baja berpaku keling ±15 m × ±27 m, atap kerucut rendah, cat cokelat kusam, noda rembesan gelap mengalir dari sambungan horizontal, tanpa tulisan. Menjadi patokan semua shot tangki. |
| **P13** (turunan) | Sambungan bocor close-up. Dipakai juga sebagai reference untuk P05 dan P14 supaya material sambungan konsisten. |

**Kontinuitas cahaya:**
- Kejadian (S01–S11): mendung tengah hari.
- Masa lalu (S12–S14, S17–S19): sedikit lebih hangat dan tenang.
- Sesudah bencana (S15, S16, S20): sore mendung.
- Penutup (S21): menjelang petang.

---

## D. Prompt Google Flow Agent

### Cara pakai
1. Jalankan berurutan **Batch 1 → Batch 2 → Batch 3**, prompt demi prompt sesuai urutan nomor. Urutan ini penting karena gambar sebelumnya menjadi reference gambar berikutnya.
2. Di Flow, lampirkan **semua** gambar yang disebut di baris **Lampirkan** sebagai reference image.
3. Setel rasio sesuai baris **Rasio** dan **jumlah output = 1**. Simpan hasilnya dengan nama file di manifest.
4. **Style block** sudah tertanam di setiap prompt. Tempel prompt apa adanya.
5. Kirim hasil Batch 1 ke sini. Saya cek "gagal total" saja, lalu Anda lanjut Batch 2.

**Style block** (sudah tertanam di setiap prompt):
> Cinematic realistic historical reconstruction, 35mm film look, natural muted color, soft overcast daylight, deep but detailed shadows, brick and navy-grey tones, molasses is the only rich warm dark-amber element. Realistic skin texture and faces, period-accurate 1919 wool clothing. No text, no lettering, no signage, no logos, no watermark, no modern objects.

### Batch 1 — Referensi (6 gambar)

Urutan 1 → 6. CH01–CH04 tidak saling bergantung. ENV01 harus jadi sebelum OBJ01.

**1 · CH01 — buruh pelabuhan** · Rasio 16:9 · Output 1 · Lampirkan: – · Simpan: `CH01_worker_ref.png`
> Generate exactly one image: a clean character reference sheet of ONE man, shown four times side by side in a single row, evenly spaced: (1) front view full body, (2) left side view full body, (3) back view full body, (4) head-and-shoulders close-up facing camera. He is an Italian-American dockyard laborer in Boston, 1919, about 35 years old, medium build, short black hair, thick dark mustache, light stubble, weathered working face. Wardrobe, identical in all four views: brown-charcoal wool flat cap, dark brown heavy wool work coat buttoned over a grey wool sweater, brick-red knitted scarf, dark wool trousers, worn brown leather work boots. Plain seamless mid-grey studio background, soft even front lighting, no shadows on the background, full figures not cropped. Photorealistic cinematic look, natural skin texture, realistic fabric. No text, no labels, no numbers, no logos, no watermark, no props.

**2 · CH02 — anak laki-laki** · Rasio 16:9 · Output 1 · Lampirkan: – · Simpan: `CH02_boy_ref.png`
> Generate exactly one image: a clean character reference sheet of ONE boy, shown four times side by side in a single row, evenly spaced: (1) front view full body, (2) left side view full body, (3) back view full body, (4) face close-up with a curious half-smile. He is an Italian-American boy in Boston, 1919, about 10 years old, slim, curly black hair under a grey wool newsboy cap. Wardrobe, identical in all four views: oversized patched brown tweed jacket, knickerbocker trousers, dark wool stockings, scuffed leather boots; he holds a small dented tin cup in his right hand. Plain seamless mid-grey studio background, soft even front lighting, full figures not cropped. Photorealistic cinematic look, natural skin texture, realistic fabric. No text, no labels, no numbers, no logos, no watermark.

**3 · CH03 — insinyur/penyelidik** · Rasio 16:9 · Output 1 · Lampirkan: – · Simpan: `CH03_engineer_ref.png`
> Generate exactly one image: a clean character reference sheet of ONE man, shown four times side by side in a single row, evenly spaced: (1) front view full body, (2) left side view full body, (3) back view full body, (4) face close-up with a serious, attentive expression. He is a generic 1919 American structural engineer and investigator (not a real person), about 55 years old, average build, neat grey mustache, round wire-rim spectacles. Wardrobe, identical in all four views: black bowler hat, long charcoal wool overcoat, white high collar and dark tie, dark trousers, black leather shoes; he holds a small black notebook in one hand and brass calipers in the other. Plain seamless mid-grey studio background, soft even front lighting, full figures not cropped. Photorealistic cinematic look, natural skin texture. No text, no labels, no numbers, no logos, no watermark.

**4 · CH04 — warga perempuan** · Rasio 16:9 · Output 1 · Lampirkan: – · Simpan: `CH04_woman_ref.png`
> Generate exactly one image: a clean character reference sheet of ONE woman, shown four times side by side in a single row, evenly spaced: (1) front view full body, (2) left side view full body, (3) back view full body, (4) face close-up with a strong, determined expression. She is a working-class Italian-American resident of Boston's North End, 1919, about 30 years old, dark hair in a low bun, olive skin. Wardrobe, identical in all four views: dark brown wool shawl over her shoulders, dark long-sleeved blouse, long dark wool skirt to the ankles, faded grey work apron, black lace-up boots. Plain seamless mid-grey studio background, soft even front lighting, full figures not cropped. Photorealistic cinematic look, natural skin texture, realistic fabric. No text, no labels, no numbers, no logos, no watermark.

**5 · ENV01 — Commercial Street (juga plate S04)** · Rasio 9:16 · Output 1 · Lampirkan: – · Simpan: `ENV01_commercial_st.png`
> Generate exactly one vertical 9:16 image: establishing shot of Commercial Street on the North End waterfront, Boston, January 15, 1919, around midday. Camera at second-floor height looking down the length of the street, one-point perspective. A dark riveted steel elevated railway trestle runs along the middle of the street on steel columns, with one wooden-and-steel elevated train car on it. Four-to-five-storey red-brown brick buildings with sash windows line both sides; cobblestone pavement with streetcar rails; two horse-drawn wooden wagons; one 1910s motor truck; laborers in wool coats and flat caps walking and eating lunch on the sidewalks. Beyond the low harbor sheds at the far end, a huge dull-brown riveted steel storage tank with a low conical roof clearly rises above the rooftops. Unusually mild winter day: pale overcast sky, patches of dirty melting snow along the curbs, wet cobbles, light coal-smoke haze. Strong depth layering: foreground street and people, midground trestle and wagons, background tank and sky. Keep the main subjects away from the frame edges and keep the lower quarter of the frame calm (pavement), so the image can be panned and captioned. Cinematic realistic historical reconstruction, 35mm film look, natural muted color, soft overcast daylight, deep but detailed shadows, brick and navy-grey tones. No text, no lettering, no signage, no shop names, no logos, no watermark, no modern objects.

**6 · OBJ01 — tangki molase (juga plate S12)** · Rasio 9:16 · Output 1 · Lampirkan: ENV01 · Simpan: `OBJ01_tank.png`
> Generate exactly one vertical 9:16 image, using the attached street image as the reference for location, light and color. A frontal wide view of the same giant molasses storage tank seen in the attached image, standing on the Boston harbor side in 1919 on an ordinary quiet day, before any disaster. The tank is a cylinder of riveted steel plates, about 50 feet tall and 90 feet in diameter, with a low conical roof and a thin railing around the top edge; it is painted a dull, uneven brown. Its horizontal riveted seams leak: dark glossy molasses streaks run down from several seams, with older dried stains below them. At the base, one small laborer in a wool coat and flat cap walks past for scale; a wooden fence, a rail siding and low brick harbor sheds surround it; pale overcast sky above. The tank fills the middle 70% of the frame, fully visible from base to roof, with some sky above and ground below for camera movement. Calm, uneasy stillness. Cinematic realistic, 35mm film look, natural muted color, soft overcast daylight, tactile rusted steel and paint texture. No text, no lettering, no logos or company names on the tank, no watermark, no modern objects.

### Batch 2 — Shot inti (3 gambar)

Dijalankan langsung setelah Batch 1, dengan urutan P13 → P14 → P07. Ketiganya ditambah ENV01 mewakili empat jenis shot: establishing, detail, manusia, dan aksi. Saya bisa mulai menganimasikannya di Hyperframes sambil Anda mengerjakan Batch 3, tanpa perlu menunggu approval.

**P13** · Rasio 9:16 · Lampirkan: OBJ01
> Extreme close-up of a horizontal riveted seam on the attached brown molasses tank. Thick dark molasses slowly seeps out between overlapping steel plates and around rivet heads, forming glossy amber-black drips that hang and fall. Dull brown paint cracked and flaking, rust bloom, old dried streaks below the seam. Soft overcast daylight raking from the left, shallow depth of field, rivets and the leak in sharp focus, top and bottom softly blurred. Tactile realistic materials. No text, no watermark.

**P14** · Rasio 9:16 · Lampirkan: CH02, OBJ01, P13
> At the base of the attached brown riveted molasses tank, Boston 1919, the boy from the attached character sheet (same face, cap, patched tweed jacket, knickerbockers) holds his dented tin cup under a slow drip of molasses leaking from a low seam, smiling with quiet mischief. A second, different girl of about 8 in a dark wool coat and knit hat holds a small tin can beside him. Camera at child eye level, medium shot, tank wall filling the background with the leaking seam visible, muddy ground with dirty snow. Soft overcast daylight. Cinematic realistic, natural skin texture, period-accurate clothing. No text, no logos, no watermark.

**P07** · Rasio 9:16 · Lampirkan: ENV01, CH01, CH04
> Street-level view on the attached Commercial Street under the steel elevated railway, Boston 1919, midday. A towering wall of thick dark-brown molasses, about two storeys high, glossy with amber highlights and carrying broken timber, surges down the street toward camera. In the foreground the laborer from the attached character sheet (same face, flat cap, brown coat, red scarf) runs toward camera in panic, and the woman from the attached sheet (shawl, long dark skirt) looks back over her shoulder. Other laborers flee behind them. Overcast daylight, motion and urgency, flying droplets. Strong separation between foreground people and the wave. Cinematic realistic, 35mm film look. No gore, no text, no signage, no watermark, no modern objects.

### Batch 3 — Sisa plate (16 gambar)

Dikerjakan setelah prototipe disetujui. Urutan di bawah mengikuti ketergantungan: P06 dan P15 dibuat sebelum gambar yang memakainya sebagai referensi.

**P01** · 9:16 · Lampirkan: ENV01, CH01
> Ground-level extreme low angle on the wet cobblestones and streetcar rails of the attached Commercial Street, 1919. A slow glossy tongue of thick dark molasses creeps toward the lens, swallowing a broken wooden plank; the brown wool flat cap from the attached laborer sheet lies half-submerged in the foreground. Blurred elevated railway columns and brick buildings in the background, overcast midday light, amber highlights on the molasses surface. Ominous, quiet. Cinematic realistic, shallow depth of field. No text, no watermark.

**P02** · 9:16 · Lampirkan: OBJ01, CH01
> Ultra-low wide angle at the foot of the attached giant brown riveted molasses tank, 1919. The laborer from the attached sheet (same face, cap, brown coat, red scarf) stands small in the lower third, seen three-quarter from behind, looking up. The tank wall dominates the frame and rises toward the top edge with its conical roof just visible against a pale overcast sky; dark molasses streaks run from the seams. Composition taller than needed so the camera can tilt up. Cinematic realistic. No text, no logos, no watermark.

**P03** · 9:16 · Lampirkan: CH01, OBJ01
> Medium close-up insert in the tank yard, 1919. The weathered hands and brown wool sleeves of the attached laborer hold a wooden bucket while a thick slow ribbon of dark molasses pours from a brass tap at the base of the attached brown tank into an oak barrel, folding and stacking as it falls. Glossy amber highlights, sticky drips on the barrel rim, overcast daylight. Tactile realistic. No text, no watermark.

**P05** · 9:16 · Lampirkan: OBJ01, P13
> Close-up of the lower riveted seam of the attached brown molasses tank, the same seam as the attached close-up, at the instant of failure. The steel plates tear apart along the seam, rivet heads shear off and fly toward the camera, a violent jet of dark molasses bursts out, flakes of brown paint and rust explode. Overcast daylight, high shutter speed, frozen debris. Cinematic realistic. No text, no watermark.

**P06** · 9:16 · Lampirkan: OBJ01, ENV01
> Wide, slightly elevated view of the attached brown riveted tank collapsing on the Boston waterfront, 1919, midday. The steel walls split open and peel outward like petals, a massive wave of dark molasses bursts out, steel plates flying, nearby wooden sheds being hit, the steel elevated railway visible at the edge of frame. Overcast sky, spray, dust. Cinematic realistic disaster reconstruction. No gore, no text, no logos, no watermark.

**P08** · 9:16 · Lampirkan: ENV01
> Side view on the attached Commercial Street, 1919. The crest of a thick dark molasses wave slams into a horse-drawn wooden delivery wagon, lifting and tipping it; heavy glossy splashes and timber fragments in the air. The horse is shown from a distance, partly obscured by spray, not graphic. Elevated railway columns in the background, overcast midday light, motion blur on spray. Cinematic realistic. No gore, no text, no watermark.

**P09** · 9:16 · Lampirkan: ENV01
> Low angle beneath the steel elevated railway on the attached Commercial Street, 1919, moments after the flood. One span of the riveted trestle is broken and bent downward, girders twisted; a wooden-and-steel elevated train car has derailed and hangs tilted at the edge of the damaged span. Dark molasses covers the street below, debris everywhere, overcast sky. Cinematic realistic. No gore, no text, no watermark.

**P10** · 9:16 · Lampirkan: ENV01
> Medium-wide on the attached Commercial Street, 1919. A two-storey wooden warehouse is being pushed off its foundation and collapsing sideways into a surge of thick dark molasses, boards splintering, glass breaking. Overcast midday light, spray and debris. Cinematic realistic. No people in danger visible, no text, no watermark.

**P11** · 9:16 · Lampirkan: CH01, CH04, P07
> Medium shot at eye level in the same flooded street as the attached wave image, 1919. The laborer and the woman from the attached character sheets (same faces and clothing, now coated with sticky dark molasses) are trapped waist-deep in thick molasses, straining to move; the man reaches out to grab her wrist. Strands of molasses stretch from their arms, debris floats around them. Overcast light, desperate but not graphic. Cinematic realistic, natural skin texture. No gore, no text, no watermark.

**P15** · 9:16 · Lampirkan: CH03, OBJ01, P06
> Wide shot of the disaster site on the Boston waterfront, afternoon of the same day, 1919. The engineer from the attached character sheet (same face, bowler hat, spectacles, charcoal overcoat) walks with two other officials among huge torn curved steel plates from the attached collapsed tank, the ground coated in dark molasses, broken timber and rubble. Grey overcast afternoon light, quiet aftermath. Cinematic realistic. No gore, no text, no logos, no watermark.

**P16** · 9:16 · Lampirkan: CH03, P15
> Close-up of the engineer from the attached sheet (same face, spectacles, bowler hat) crouching at the jagged torn edge of a thick steel tank plate from the attached aftermath scene, measuring its thickness with brass calipers, notebook in the other hand. The fractured steel edge shows a crystalline brittle break with rivet holes. Grey overcast light, shallow depth of field. Cinematic realistic. No text, no watermark.

**P17** · 9:16 · Lampirkan: OBJ01
> The attached brown riveted tank under construction a few years earlier, about 1915. Workers in caps and work clothes on timber scaffolding hammer hot rivets into the curved steel plates; a riveter's forge glows on a platform. Medium-wide, slightly low angle. Overcast daylight, sparks. Cinematic realistic. No text, no logos, no watermark.

**P18** · 9:16 · Lampirkan: ENV01
> Insert close-up of an old 1910s glass outdoor thermometer mounted on a weathered brick wall of the attached street; beside it melting snow and icicles drip, wet bricks. Soft overcast daylight, shallow depth of field. The thermometer scale is blurred and unreadable. Cinematic realistic. No text, no watermark.

**P19** · 9:16 · Lampirkan: OBJ01, ENV01
> Wide view of the Boston harbor pier, 1919: a steam tanker ship moored beside the attached brown riveted molasses tank; a thick hose or pipeline runs from the ship to the tank. Dockworkers in caps, grey harbor water, overcast sky, coal smoke from the ship's funnel. Cinematic realistic. No visible ship name, no text, no logos, no watermark.

**P20** · 9:16 · Lampirkan: ENV01, P15
> Medium-wide on the molasses-covered street of the attached scenes, afternoon after the disaster, 1919. Firemen in period helmets and sailors in navy wool uniforms carry a stretcher with a figure fully covered by a blanket, wading through knee-deep dark molasses. Others search the debris in the background. Grey overcast light, solemn, respectful, no gore, no visible faces of victims. Cinematic realistic. No text, no watermark.

**P21** · 9:16 · Lampirkan: OBJ01, P15
> Wide view of what remains of the attached tank at the end of the day, 1919: the torn circular base and a few bent wall plates surrounded by a dark, still pool of molasses reflecting the first gas street lamps and a fading grey-blue dusk sky. No people, eerie silence. Cinematic realistic, natural color. No text, no watermark.

### Tips Flow
- Wajah sedikit berbeda dari sheet masih diterima. Regenerate (dengan sheet tetap terlampir) hanya jika karakter jelas menjadi orang lain.
- Regenerate hanya jika **gagal total**:
  - wajah atau tangan rusak parah;
  - subjek utama salah atau hilang;
  - tulisan atau huruf mencolok di area penting;
  - objek modern yang jelas.
- Yang masih **diterima**: paku keling kurang rapi, detail kostum sedikit berbeda, arsitektur kurang tepat, cahaya sedikit lain. Hyperframes bisa menutupi sebagian lewat crop, grading, dan gerak kamera.
- Simpan resolusi tertinggi yang tersedia.

---

## Catatan fakta (toleransi: tidak menghentikan produksi)
- P19: bentuk pengiriman molase baru (kapal tanker dan pipa ke tangki). Naskah menyebut "pengiriman molase baru", tapi detail visual kapal belum saya cek ke sumber.
- P20: keterlibatan pelaut dalam penyelamatan. Sering disebut di sumber populer, belum saya cek ke sumber primer.
- P17: penampilan konstruksi tangki tahun 1915 (generik: perancah dan paku keling panas).

## Sumber verifikasi fakta visual
- [Great Molasses Flood — Wikipedia](https://wikipedia.com/wiki/Great_Molasses_Flood)
- [Mass Moments: January 15, 1919](https://www.massmoments.org/moment-details.html?mid=19)
- [History.com — The Great Molasses Flood of 1919](https://www.history.com/news/the-great-molasses-flood-of-1919)
- [Smithsonian — Without Warning, Molasses Surged Over Boston](https://www.smithsonianmag.com/history/without-warning-molasses-january-surged-over-boston-180971251/)
- [American Ancestors — The Great Molasses Flood](https://vitabrevis.americanancestors.org/2019/01/the-great-molasses-flood)
- [usdeadlyevents.com — 1919 Molasses Tank Collapse](https://usdeadlyevents.com/?p=2256)
