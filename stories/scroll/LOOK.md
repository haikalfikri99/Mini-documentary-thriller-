# LOOK BIBLE #002 — keputusan arah visual (sebelum eksekusi)
Disusun dari kacamata: sinematografi (`filmmaker`, `cinematography-180-degree-rule`), fotografi & komposisi (`photo-composition-critic`), warna (`color-grading-finishing`), animasi & karakter (`animation-principles`, `2d-character-rig-animation`, `character-animation-qa`), art & motion direction (`motion-art-direction`, `illustration-style`), platform (`short-form-video`, `youtube-shorts`, `hyperframes` vertical/review), dan identitas channel (#001, `references/2-visual-dan-animasi.md`).
Menggantikan eksperimen v1 (kartun) dan v2 (noir gelap). STYLE.md lama tetap sebagai catatan, tapi yang berlaku adalah dokumen ini.

## 1. Fakta yang mengikat keputusan
| Faktor | Fakta | Akibat untuk visual |
|---|---|---|
| Identitas channel | #001 = motion comic tinta "boil" + tekstur cat air, siang hangat, satu Warna Ancaman, map ARSIP KASUS, caption per kata | #002 harus terasa **satu keluarga** dengan #001. Penonton mengenali seri dari gayanya |
| Cerita #002 | sistem tersembunyi dalam kebiasaan sehari-hari; emosi: penasaran → "ternyata" → sedikit ngeri → berdaya | nadanya **cerdas & dekat**, bukan horor. Visual harus terasa akrab (kamar, kasur, HP), bukan dunia gelap asing |
| Platform | ditonton di HP, sering di siang hari, kecerahan layar rendah, feed Shorts terang | frame gelap tenggelam dan di-swipe. **Terukur:** preview v2 rata-rata luma 44/255, 68% frame < 50 → terlalu gelap; v1 = 67/255 |
| Kemampuan produksi | semua digambar dengan kode; wajah close-up detail dari kode terbukti kaku (percobaan potret) | strategi kamera harus **menghindari close-up wajah penuh**; emosi lewat postur, tangan, mata yang dipotong, cahaya |
| Retensi | perubahan visual tiap 1–2 dtk, satu fokus per frame, terbaca tanpa suara | bentuk besar & jelas, kontras nilai subjek vs latar kuat |

## 2. Opsi yang ditimbang
| Opsi | Kelebihan | Kekurangan fatal | Putusan |
|---|---|---|---|
| A. Noir gelap siluet (v2) | sinematik, premium | terlalu gelap untuk HP (terukur), lepas dari identitas #001, nadanya terlalu muram untuk cerita sehari-hari | ditolak (dipakai hanya untuk 1–2 momen: laptop ditutup) |
| B. Flat vector cerah ala explainer | sangat terbaca | generik, lucu, lepas dari tinta komik | ditolak |
| C. Kolase foto / mixed media | dokumenter | butuh foto/footage → melanggar aturan "tanpa stock" | ditolak |
| D. 3D | populer | tidak layak dikerjakan dengan alat kita | ditolak |
| **E. Graphic-novel motion comic, mid-key** (evolusi #001) | satu keluarga dengan #001, terbaca di HP, bisa dibuat dengan kode, cocok untuk nada "cerdas & dekat" | butuh desain ulang wajah Cast Kit dan disiplin pencahayaan | **dipilih** |

## 3. Keputusan per aspek
### Pencahayaan & eksposur (sinematografi)
- **Mid-key, bukan low-key.** Setiap shot punya sumber cahaya yang masuk akal (lampu kamar hangat, jendela, layar) dengan **rasio key:fill ±4:1** (noir v2 ±16:1).
- **Target terukur:** rata-rata luma per shot 90–140/255; tidak ada frame < 60 kecuali momen yang disengaja (laptop ditutup, maks 1 dtk). Dicek otomatis tiap render.
- Rim cahaya layar tetap sebagai **tanda tangan** #002 (bagian yang berhasil dari v2), tapi sebagai aksen di atas subjek yang sudah terang.

### Warna (grading)
- **Dua dunia:** 2006/arsip = siang kertas hangat (krem, oker, biru langit pucat); masa kini = **senja/malam dalam rumah** dengan lampu hangat + cahaya layar dingin. Kontras suhu = kontras waktu.
- **Warna Ancaman = cahaya layar** `#7fe3ff` (satu-satunya yang jenuh-dingin). **Amber `#ffb43a` = rem/tanda berhenti** (sudah terbukti jelas di preview).
- Feed di layar memakai palet yang menyatu (teal, kertas, satu aksen amber).
- Finishing #001 dipertahankan: tekstur cat air (`paint`), grade dua suhu, grain halus, vignette ringan (0,25–0,35, bukan 0,55).

### Karakter
- **Desain ulang kepala Cast Kit** ke proporsi graphic novel: mata kecil berbentuk almond dengan kelopak tebal (bukan bola putih besar), hidung berupa bentuk bayangan tanpa garis segitiga, alis tegas, rahang lebih tegas. Badan tetap Cast Kit.
- **Raskin:** dewasa, rambut gelap bergelombang, kacamata (digambar di semua sudut), versi 2019 berjanggut tipis. Selalu 3/4 atau profil, ukuran medium shot.
- **"Kamu" (penonton):** anak muda Indonesia di kamar (kaos, sarung/selimut, kipas angin, colokan HP). Membuat penonton merasa itu dirinya. Sering ditampilkan lewat tangan & jempol (POV).
- **Model sheet** dibuat dulu (depan, 3/4, profil, 3 ekspresi) sebelum shot apa pun.

### Kamera & komposisi (fotografi + sinematografi)
- Komposisi vertikal: subjek di sepertiga atas–tengah (900×1400 tengah), garis pengarah ke subjek, latar depan/tengah/belakang untuk kedalaman.
- **Tidak ada close-up wajah penuh.** Close-up diganti: mata yang dipotong dengan feed terpantul, tangan/jempol, benda (tombol, jam, HP).
- Gerak kamera bermotif (dorong ke detail, reveal, ikut jempol); parallax multiplane pada shot establishing; aturan 180° untuk shot Raskin–layar.

### Animasi
- Karakter **on twos** (12 fps) dengan garis boil = rasa komik; kamera & UI **on ones** (30 fps) agar halus.
- Setiap aksi karakter: antisipasi → aksi → follow-through; mata bergerak sebelum kepala; napas halus saat diam.
- Gerak UI/tipografi mengikuti motion language: premium-calm (350–600 ms, tanpa overshoot pada hal serius), transisi bermotif (freeze→arsip, match cut jempol↔tuas, benda menjadi dunia).

### Tipografi & caption
Tetap (sudah berhasil): Oswald kapital bergaris tinta, caption per kata y≈1290, kata kunci biru layar/amber, kutipan sebagai tipografi besar.

## 4. Cara eksekusi tanpa coba-coba
Urutan standar studio: **direction (dokumen ini) → model sheet + 3 style frame (gambar diam) ✋ → animasi semua shot → film penuh visual ✋ → audio ✋**.
Style frame = 3 gambar diam yang mewakili tiga dunia: (1) Raskin di kamar malam dengan HP (hook), (2) meja kerja 2006 siang, (3) "kamu" rebahan di kasur dengan HP. Disetujui sekali, lalu semua shot mengikuti tanpa ganti arah.
