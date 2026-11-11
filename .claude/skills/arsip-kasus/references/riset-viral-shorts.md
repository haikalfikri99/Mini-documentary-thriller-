# Riset: animasi Shorts sejarah/bencana yang viral (November 2026)

**Sumber data:** vidIQ (outlier YouTube Shorts dan Instagram/TikTok, statistik channel) dan pencarian YouTube region Indonesia.
"Breakout" berarti views video dibandingkan dengan rata-rata channel-nya sendiri.

## 1. Format yang terbukti viral untuk cerita nyata dan sejarah

| Format | Bukti (views, breakout) | Bisa dibuat dengan kode? |
|---|---|---|
| **3D semi-realistis ala Zack D. Films** | Zack D. Films 29,6 jt subs dan 82,9 miliar views. His Story 7,6 jt subs. Video anak-anak Titanic 559 rb views (27×). Candy Bomber 2 jt views dalam 4 hari. | **Tidak.** Butuh model manusia realistis dan motion capture. |
| **Avatar 3D kotak (gaya Roblox)** | "Drunk Man Survived the Titanic" 25,6 jt views (7×) | Bisa di Blender, tapi meniru gaya Roblox berisiko IP |
| **Kartun 2D komik dengan outline tebal** | Historically, **"Beer Tsunami destroyed London" 4,3 jt views**. Channel 1,64 jt subs dari hanya 85 video (rata-rata sekitar 6 jt views per video). | **Ya.** Toolkit `toon/` kita, render 0,1 detik/frame. |
| **Diorama 3D low-poly** | Knox Mine (sungai jebol ke tambang) 1,3 jt (9×). PolySoldier: reaktor nuklir 1 jt, danau terkuras 817 rb. | Ya, di Blender (lambat di CPU) |
| **Stickman/doodle 2D** | **TauGakSih (Indonesia) 1,37 jt views dengan hanya 1.360 subs.** Jacob's Well 852 rb (150×). Child soldiers 1,7 jt (99×). | **Ya, paling murah** |
| Kartun vintage rubber-hose | Mass Influence 850 rb (3,3×) | Ya (demo lemo-opuscar `rubber-hose`) |

**Temuan kunci:** topik "banjir cairan aneh" sudah terbukti. Historically meraup 4,3 juta views dengan Beer Flood 1814, kasus yang sangat mirip dengan molase.

## 2. Pola retensi yang sama di hampir semua outlier
1. **Detik 0–3:** narasi langsung dimulai tanpa intro, dengan **visual bencana atau akibatnya**, klaim mengejutkan, atau POV ("Bayangin kamu…").
2. **Caption satu kata per tampil**, besar, di tengah layar, sinkron dengan suara. Ini ada di semua outlier YouTube.
3. **Gambar berganti setiap 1–2 detik** lewat cut, zoom, atau gerak kamera. Tidak ada frame yang diam.
4. **Satu tokoh dengan wajah close-up** yang membawa emosi (Charles di Titanic, gadis di kebakaran, anak-anak di sekoci).
5. **Twist atau pertanyaan di akhir** yang membuat penonton memutar ulang atau berkomentar.
6. **Durasi 45–90 detik**, dengan suara + musik + SFX.

## 3. Penilaian VO molase kita (VO tidak diubah)
| Bagian | Detik | Kekuatan | Risiko | Solusi visual |
|---|---|---|---|---|
| Hook | 0–2,3 "Banjir ini bukan datang dari sungai." | Misteri yang kuat | Belum ada gambar bencana | **Cold open:** detik pertama langsung memperlihatkan ombak molase menghantam jalan |
| Reveal | 2,3–9 | Jawaban dari misteri | – | Tangki raksasa, lalu cairan coklat pekat close-up |
| Tanggal | 9–12,65 | Konteks | **Rawan drop-off** (3,6 detik hanya tanggal) | Kamera terbang melintasi kota yang tenang, dengan cap waktu dan detak jam |
| Bencana | 12,65–27,65 | Eskalasi cepat | – | Potongan 1 detik, gaya aksi |
| Twist | 27,65–38,35 | "tanda bahaya sudah muncul" | – | Anak menadah tetesan (pukulan emosi) |
| Penyebab | 38,35–50,65 | Informatif | **Rawan drop-off** (bagian teknis) | Diagram dan zoom cepat: dinding tipis, retak, suhu, kapal tanker |
| Korban dan penutup | 50,65–60,7 | Pertanyaan moral | – | Close-up wajah, lalu kembali ke tangki, membentuk loop ke awal |

## 4. Format yang direkomendasikan (diskusi)
Lihat ringkasan di chat.

## Pembaruan November 2026: enam wilayah cerita (vidIQ outliers, Shorts ≥ 500 rb views)
| Wilayah | Outlier terkuat (views · kelipatan rata-rata channel) | Pola judul |
|---|---|---|
| Hidden Systems & Psychology | supermarket traps 2,5 jt · 1.336×; "Why Las Vegas is a scam" 14,9 jt · 92×; "carrot on a stick effect" 1,2 jt · 45×; rotisserie chicken murah 1,5 jt · 30×; bioskop membuatmu belanja lebih 871 rb · 10× | "Why X is cheap", "X makes you spend more", nama efek psikologi |
| Catastrophic Decisions | Kodak/Blockbuster/Nokia 3,6 jt · 1.692×; perusahaan merusak produk sendiri 5,3 jt · 175×; "One simple mistake cost them everything" 9,5 jt · 21× | "the cost of ignoring…", "one simple mistake…" |
| Unsolved Mysteries | Dyatlov Pass 2,1 jt · 29×; "The water tasted strange… until they found out why" 624 rb; pulau yang lenyap 827 rb | nama kasus terkenal; "… until they found out why" |
| Dark Experiments | anjing "dihidupkan kembali" 788 rb; monkey lobotomy 871 rb | aksi ekstrem + subjek |
| Forgotten Places | kota terhapus dari peta 559 rb; kota 200 ribu → 50 ribu 1,2 jt; bunker tersembunyi 660 rb | angka penurunan, "never supposed to discover" |
| True Events | "This husband is IMPOSSIBLE to kill" (MrBallen) 1 jt | klaim mustahil tentang orang biasa |

**Indonesia (pencarian region ID, sejak Mei 2026):** "3 Danau Penuh Misteri di Indonesia" 6,7 jt (16,5×, Kamus Unik); "Misteri Terbelahnya Laut Merah…" 3,4 jt (Brayni TV, memakai ulang Zack D. Films); "Misteri hilangnya gadis kecil…" 728 rb dengan 1.803 komentar; "Terjebak 3 hari di kotak donasi" 437 rb dengan 937 komentar.
Pelajaran: (1) sudut lokal Indonesia sangat kuat; (2) pertanyaan penutup mendorong komentar; (3) format "3 …" (listicle) populer — boleh dipakai sesekali; (4) banyak kompetitor memakai ulang konten orang lain → ilustrasi orisinal kita adalah pembeda dan lebih aman untuk YPP.
**Durasi:** outlier berkisar 15 dtk–3 mnt; tidak ada satu durasi pemenang. Mulai dari gagasan, pilih durasi terpendek yang lengkap.
**Catatan:** kelipatan breakout dari channel kecil bisa ekstrem karena rata-rata channelnya rendah; gunakan sebagai sinyal minat topik, bukan janji hasil.
