# Analisa kamera dan 3D — satu Short Ricks Clips ("The Job Nobody Wants in Japan", 60,5 dtk)
Tujuan: belajar bahasa 3D, sinematografi, dan kamera untuk diadaptasi ke channel kita. **Bukan untuk ditiru**: gaya karakter kita tetap (tanpa outline); tidak ada aset atau komposisi yang disalin. Dasar: ekstraksi frame + pengukuran selisih antar-frame (video yang dikirim pemilik channel). Satu video saja: bukan seluruh gaya channel. Audio tidak dianalisis.

## Terukur / terlihat
- 1080×1920, 30 fps, 1815 frame. **0 cut**: selisih antar-frame median 7,4/255, tidak pernah melewati ambang cut; lima lonjakan terbesar (1,0–1,3 s, 2,1–2,3 s, 25,2 s, 29,5 s) diperiksa frame demi frame = gerakan cepat yang menyambung (swoop dari wajah ke tombol, dorong masuk ke layar HP, pan menyusuri tembok ke pintu yang terbuka).
- Komposisi baru ±tiap 2 dtk, satu take, teks 1–2 kata per frame sinkron kata.
- Kamera **di dalam** dunia: ruangan tertutup (tembok, lantai, plafon berpetak). Lensa sangat lebar, close-up ekstrem, miring (Dutch), tampak lurus ke bawah.
- Rack focus nyata (objek dekat tajam, wajah di belakang kabur, fokus berpindah).
- Dunia di luar ruangan ada: kamera mundur lewat jendela ke fasad gedung malam dengan jendela menyala dan siluet kota.
- Transisi = objek/gerak: layar HP yang membesar, halaman kalender, pintu terbuka, jendela ke gedung. Cahaya: sorot jendela kuning, kontras hangat-dingin, palet jenuh terang.
- Outline tebal pada semua objek (karakter dan lingkungan) — **tidak kita adopsi**.

## Yang kita adaptasi (sudah ada di kit)
ruangan tertutup + bukaan jendela (`world.room({enclosed, openings})`), lensa lebar (fov 66–78 di key kamera), rack focus nyata (`world.rackFocus`), langit/kota/fasad (`world.sky`, `skyline`, `facade`), menembus jendela lalu menoleh dan menarik keluar (contoh: `kit/template/film3d/example_inside_tower.js`).
## Belum (ide berikutnya)
pintu yang berayun dan pan menyusuri tembok, transisi halaman kalender/objek, close-up ekstrem pada properti, jajaran tokoh dalam satu pandangan lorong, tampak lurus ke bawah pada tokoh, teks 1–2 kata.
