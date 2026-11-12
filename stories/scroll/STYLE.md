# STYLE — art direction #002 (dan acuan channel ke depan): "Noir Graphic Novel"
Disusun dengan skill `motion-art-direction`, `illustration-style`, `hyperframes` (spec & motion), plus riset gaya: noir comic (bayangan tinta, satu warna aksen), *Spider-Man: Into the Spider-Verse* (halftone sebagai bahasa cahaya, animasi on twos), *Flee* / dokumenter animasi (animasi untuk kisah nyata, menahan diri).

## Kenapa berubah dari #001
Kepala kartun Cast Kit (mata bulat besar, hidung segitiga) terbaca **lucu**, bertentangan dengan nada thriller. Percobaan potret wajah detail dengan kode juga gagal (kaku, halftone menempel seperti pola kain). Yang premium dan bisa dicapai dengan kode: **siluet**. Poster noir dan film dokumenter animasi menyampaikan emosi lewat cahaya, bentuk, dan postur, bukan detail wajah.

## Medium (lima aturan, tidak ada yang lain)
1. **Tinta:** manusia dan benda dekat = siluet hitam-biru `#07080b`, tanpa detail wajah.
2. **Cahaya layar:** satu-satunya warna ancaman `#7fe3ff`, hanya sebagai **garis cahaya (rim)** di tepi siluet yang menghadap layar, pantulan di kacamata, dan cahaya yang jatuh.
3. **Amber `#ffb43a`:** rem/tanda berhenti (tombol, pilihan UDAHAN, palang dalang). Satu fokus per frame.
4. **Halftone:** gradasi cahaya di latar dibuat titik-titik (cetak), bukan gradasi halus.
5. **Kertas & arsip:** dunia masa lalu (2006, map ARSIP) = sepia hangat; masa kini = malam dingin. Kontras suhu = kontras waktu.
Finishing tiap frame: `noirFinish()` = multiply biru tinta, vignette berat, tekstur cetak overlay.

## Karakter
- **Raskin:** profil siluet menghadap layar, kacamata dengan feed terpantul di lensa. Versi 2019: berjanggut. Emosi lewat postur (kepala menunduk), redupnya rim, dan cahaya lensa yang padam.
- **"Kamu":** tangan siluet POV, rim cahaya layar; jempol adalah tokoh utama.
- Tidak ada wajah kartun, mata bulat, atau kulit beige datar di masa kini.

## Bahasa gerak (motion language spec)
| Properti | Pilihan |
|---|---|
| Personality | **Premium-calm**: 350–600 ms, tanpa overshoot pada benda serius |
| Easing | masuk: `expo.out` / ease-out kubik; keluar: `power2.in`; kamera: `power2.inOut` |
| Unit waktu | 0,4 dtk (masuk 0,4, gerak besar 0,8, mikro 0,13) |
| Transisi | potong di kata VO; freeze→arsip (signature); dip 3 frame sebelum "Tapi" & 2019; tidak ada wipe/spin |
| Stagger | kata kutipan 60–120 ms (sesuai VO) |
| Intensitas | dorong kamera ≤ 12%; guncangan hanya pada benturan (slam, tombol pecah) |
| Diam | ≥ 0,3 dtk tahan sebelum payoff ("Tapi", "Dan dia menyesal") |
Hirarki per shot: **hero** (jempol/tombol/siluet) bergerak paling bermakna; **support** (feed, layar) bergerak terus tapi tidak bersaing; **tekstur** (halftone, grain) hampir tidak terlihat.

## Pantangan tambahan (BANNED)
Wajah kartun di adegan masa kini; warna feed permen (merah muda/kuning cerah) di luar palet; rim cahaya di rambut (terbaca seperti pita topi); lebih dari satu warna jenuh per frame; glow sebagai hiasan (glow hanya di tempat ada sumber cahaya).
