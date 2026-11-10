# Riset: fondasi produksi animasi full-code

Tanggal: 2026-11-10 · Status: **rekomendasi, belum disetujui**. Belum ada yang diinstal, dirender, atau diubah.

## Metode dan batas bukti

- **Katalog:** [awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills#type-story). Saya membaca kategori Stories & animation, Frameworks, Shorts & social, Motion graphics, dan Explainers.
- **19 repo** di-clone tanpa isi file (*blobless*). Untuk tiap repo saya membaca README, SKILL.md, dokumen teknik, dan daftar source. Gambar contoh dibuka langsung dari repo.
- **Tingkat bukti:**
  - ✅ **Terverifikasi**: saya membaca source atau melihat frame contohnya sendiri.
  - 📄 **Klaim**: hanya disebut di README.
  - ❓ **Belum diuji**: perkiraan saya.
- **Batasan riset:** saya **tidak menjalankan** satu pun repo dan **tidak menonton video**, hanya frame diam. Frame contoh bisa saja hasil pilihan terbaik.

## 1. Shortlist (8)

| # | Repo | Inti | Bukti | Relevansi |
|---|---|---|---|---|
| 1 | [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (★2.7k, MIT) | Shorts cerita 55–70 dtk: **karakter 2D di dunia 3D**, tinta, lens blur, kamera glide, SFX sintetis. Studi kasus: runtuhnya jembatan Broughton 1831. | ✅ Source lengkap (`templates/bridge/`: world, cast, cardshade, ink, lensblur, grade, lights, paint), tool audio, dan **style bible yang diukur dari 20 shorts referensi** (format, ritme narasi, kamera, warna). 📄 Render 2K ~4 fps di mesin ber-GPU. | **Paling cocok:** genre sejarah/bencana, 9:16, durasi sama. Catatan: frame referensinya milik channel lain, hanya untuk studi. |
| 2 | [luispablovillasenor-afk/shorts-animados-claude](https://github.com/luispablovillasenor-afk/shorts-animados-claude) (MIT) | Fork dan perluasan #1. Contoh kedua: Pertempuran Gaugamela, 100 ribu prajurit. | ✅ Source contoh (crowd, troop, toon, lights) dan ✅ frame hasil. | Bukti teknik #1 bisa dipakai ulang oleh orang lain. Cocok untuk adegan kerumunan dan aksi. |
| 3 | [artemnovitckii/claude-animation-skills](https://github.com/artemnovitckii/claude-animation-skills) `/zach-d-films` (MIT) | Kartun **3D penuh** di three.js. `makeHuman()` punya ~18 sendi, `setMouth`, IK lengan, plus props, DOF, bloom, `renderAt(t)`. | ✅ SKILL.md, API, dan frame (knight). 📄 0,2–0,5 dtk/frame di Mac. Mendukung SwiftShader ("much slower"). | Manusia 3D sungguhan. Wajahnya cenderung seperti boneka. |
| 4 | [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) (★14k, MIT + CC BY 4.0) | 66 gaya film full-code dengan `DIRECTOR.md` dan `TECHNIQUE.md`. Pola `render(t)` ditangkap headless Chrome. | ✅ Sudah dibaca: TECHNIQUE (determinisme, rig 2.5D, catatan 3D) dan STYLE silent-film. ✅ 12 frame gaya: cel-anime, scifi-toon, silent-film dengan manusia realistis-proporsi, hd-2d three.js. | **Perpustakaan pengetahuan** penyutradaraan dan gaya. Terlalu besar (2.521 file) untuk dipasang. |
| 5 | [buildwithhanif/claude-animation-skill](https://github.com/buildwithhanif/claude-animation-skill) (MIT) | 2D canvas di Node (`@napi-rs/canvas`), **tanpa browser dan tanpa GPU**. Rig chibi-person, ant, bean. Ada "detail bible", fx (hit-stop, shake, partikel), dan suara sintetis. | ✅ package.json, daftar lib, dan frame (chibi, koloni semut). 📄 Film 32 dtk dirender ~27 dtk. | Jalur 2D tercepat. Cadangan jika 3D terlalu lambat. |
| 6 | [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) (★2.8k, MIT) | p5.js + p5.brush, karakter Clawd, 31 emosi, dan `ANIMATION_GUIDE.md` berisi prinsip animasi karakter. | ✅ Source dan model sheet. | Karakternya maskot kotak, bukan manusia. Yang berguna panduan aktingnya. Watercolor lambat di CPU. |
| 7 | [markldn/shaun-claymation](https://github.com/markldn/shaun-claymation) (MIT) | Short clay 2 menit di three.js: boneka, stop-motion on twos, GTAO, DOF, `apply(t)` deterministik. | ✅ Daftar source dan screenshot. | Bukti narasi karakter 3D panjang dalam kode. **Memakai IP Shaun the Sheep**, jadi hanya tekniknya yang relevan. |
| 8 | [bangtutorial/bang-motion](https://github.com/bangtutorial/bang-motion) (MIT) | Motion graphics dan explainer, satu `index.html`, aturan "anti-PPT", gaya "kartun panggung" dengan karakter bersendi. | ✅ Struktur repo dan README. ⚠️ Galeri memakai potongan gambar **GPT Image**. | Sumber aturan anti-slideshow. Bukan fondasi animasi karakter. |

**Dievaluasi tetapi tidak masuk shortlist:**

| Repo | Alasan |
|---|---|
| [mg-styles-15](https://github.com/Vincentwei1021/mg-styles-15) | 10-dtk motion design. Ada referensi liquid motion dan cel boil, tapi bukan narasi. |
| [doodle-anim](https://github.com/feitangyuan/doodle-anim) | Generator avatar dan loop, bukan adegan. |
| [what-if-animation](https://github.com/kelano86/what-if-animation) | Gaya stick-figure. SFX wajib lewat ElevenLabs. |
| [claude-animation-studio](https://github.com/i-afaqrashid/claude-animation-studio) | Paper-cutout, fokus musik dan lirik. |
| [story-animator](https://github.com/deenukhan/story-animator) | SVG Remotion bergaya anak-anak. |
| [make-short](https://github.com/nocodehack/make-short) | Butuh Blender. Tidak tersedia di sini dan berat. |
| [explainer-studio](https://github.com/reedodev/explainer-studio), anidoodle, riso-windowseat | Gaya ilustrasi atau explainer, bukan aksi naratif. |

## 2. Perbandingan teknis

| Kriteria | 2D canvas (hanif, opuscar-2D) | **2D aktor di dunia 3D** (#1, #2) | 3D penuh (zach-d, shaun) |
|---|---|---|---|
| Karakter dan ekspresi | Sangat baik. Wajah digambar langsung dan mudah ekspresif. | Sangat baik. Karakter 2D menerima cahaya dan bayangan 3D. | Sedang. Wajah prosedural sering terlihat seperti manekin. |
| Lingkungan dan kedalaman | Datar. Parallax hanya berlapis. | Kuat. Kamera dan perspektif nyata. | Paling kuat. |
| Kamera | Terbatas (pan, zoom) | Glide, dolly, crane, dutch | Bebas |
| Cairan, kehancuran | Bagus jika stylized | Mesh dan shader sederhana plus sprite 2D | Sama, ditambah biaya rigging |
| Render di container ini (tanpa GPU) | Cepat ✅ | ❓ Lambat (SwiftShader), perlu benchmark | ❓ Paling lambat |
| Biaya token membangun engine | Rendah | Sedang (sekali, lalu dipakai ulang) | Tinggi |
| Konsistensi antar-episode | Tinggi | Tinggi (rig dan world kit dari kode) | Tinggi |
| Bukti di genre kita | Ada, tapi bukan genre thriller | **Ada: sejarah, bencana, kerumunan** | Explainer "what if" |

## 3. Rekomendasi final

**Fondasi:** **Hyperframes**, yang sudah terpasang, untuk timeline, audio/VO, caption, preview, lint, dan render MP4.

**Satu teknologi pendukung:** **Three.js**, divendor lokal dari npm, untuk dunia 3D, kamera, cahaya, molase, dan kehancuran. Karakter digambar dengan Canvas 2D sebagai tekstur di atas bidang 3D. Ini teknik #1 dan #2, yang source-nya MIT dan akan di-port ke modul JS biasa.

**Alasan:**
- Pola "karakter 2D di dunia 3D" punya bukti paling kuat untuk genre kita: shorts sejarah dan bencana berdurasi 55–70 detik.
- Ekspresi karakter murah dibuat, dan dunianya tetap punya kamera sinematik.
- Hyperframes sudah terbukti di container ini: WebGL tertangkap dengan benar (shot S04, 180 frame 1080×1920 dalam 49 detik), audio di-mix, dan rasio 9:16 didukung. Mesin renderingnya sama dengan Remotion (headless Chrome dan fungsi waktu).

**Ditolak:**
- **Remotion:** referensi #1 memakainya, tetapi:
  - kodenya bisa di-port karena logika three.js-nya tidak bergantung pada Remotion;
  - Remotion menambah React, bundler, `@remotion/three`, dan masalah bundle `public/` sebesar 1,3 GB;
  - dua renderer akan tumpang tindih.

  Kondisi untuk meninjau ulang: kalau benchmark menunjukkan Hyperframes tidak stabil untuk three.js.
- **3D penuh:** biaya rigging dan wajah terlalu tinggi.
- **2D murni:** kurang sinematik untuk skala tangki dan jalan. Tetap disimpan sebagai cadangan kalau render 3D terlalu lambat.

## 4. Signature style (nama kerja: *Dark Toon Diorama*)

**Dunia:**
- Geometri sederhana dengan tekstur yang dilukis lewat Canvas: bata, baja berpaku keling, batu jalan.
- **Garis tinta** pada tepi 3D, kabut atmosferik, dan cahaya yang punya sumber jelas (jendela, lampu jalan, langit).

**Aktor:**
- Kartu 2D dengan outline gelap, proporsi 5–6 kepala (lebih dewasa daripada "bean head" channel referensi), dan wajah sederhana tapi ekspresif (alis, mata, mulut).
- Siluet sesuai periode.
- Menerima cahaya dan bayangan dari adegan.

**Nada thriller (pembeda dari channel referensi yang cerah):**
- Saturasi rendah–sedang dengan **satu warna aksen per cerita**. Untuk Molase: amber.
- Cahaya berubah mengikuti arc cerita: normal → ancaman → sesudah bencana.

**Kamera dan suara:**
- Glide dengan ease-out, posisi rendah, dutch angle saat bencana, slow-motion saat impact, nyaris tanpa hard cut.
- VO ElevenLabs, SFX dan ambience sintetis, typography minim, caption frasa.

## 5. Implementasi Molasses Flood

| Adegan | Teknik |
|---|---|
| 1. Boston 1919 hidup | **World kit:** gedung dari box instanced dengan tekstur bata canvas dan jendela menyala; rangka rel layang dari balok; cobble tertekstur. Gerobak kuda dan warga sebagai kartu dengan siklus jalan. Asap sprite. Kamera dolly rendah. |
| 2. Pekerja dekat tangki | Tangki dari `CylinderGeometry` dengan tekstur pelat dan paku keling (canvas) dan noda rembesan. Pekerja kartu dengan siklus jalan dan menoleh. Kamera tilt-up untuk skala. |
| 3. Sambungan bocor | Close-up dinding beresolusi tinggi. Tetes molase berupa tabung yang memanjang dan bola jatuh (lintasan fungsi `t`), material toon mengilap dengan specular. Slow-motion. |
| 4. Tangki pecah, baja berubah bentuk | Tangki tersusun dari panel pelat terpisah. Saat pecah, panel berotasi di engsel ditambah *vertex bend* lewat shader. Paku keling instanced dengan lintasan balistik deterministik. Debu sprite, camera shake, flash. |
| 5. Gelombang menyusuri jalan | Mesh heightfield: profil depan gelombang maju sepanjang jalan, ditambah noise. Shader toon mengilap dengan fresnel dan highlight amber, sprite cipratan, puing ikut terbawa. **Bukan simulasi fluida.** |
| 6. Warga berlari | Rig 2D: siklus lari, pose panik, menoleh. Saat tersusul, kartu tenggelam dan miring. Tidak grafis. |
| 7. Bangunan dan rel rusak | Gedung kayu dari potongan pre-fracture yang jatuh dengan lintasan tetap. Balok rel melengkung lewat vertex bend, gerbong miring. |
| 8. Insinyur memeriksa | Kartu karakter (mantel, bowler, buku catatan) dengan pose jongkok. Pelat robek berupa mesh bergerigi. Cahaya sore abu-abu, tanah dengan shader molase. Push-in. |

## 6. Workflow

1. **Script dan audio** (sudah ada) → timing dari jeda audio. Whisper hanya bila perlu, dan HuggingFace diblokir di sini.
2. **Beat sheet** → tabel shot (`shots.js`: waktu, kamera, aksi).
3. **Cast dan world** → rig karakter dan kit lingkungan, dipakai ulang antar-episode.
4. **Style frame dan benchmark 5 detik** (gate tunggal sebelum produksi penuh).
5. **Animasi per shot** → snapshot still → perbaikan.
6. **Preview** (draft, setengah resolusi) → review → **final** 1080×1920 → loudness −14 LUFS → MP4.

**Struktur:**
- `engine/` di root repo: `toon.js` (rig), `world.js`, `fx.js`, `camera.js`, `post.js` (tinta, blur, grade), `vendor/three`.
- Satu folder per episode: `stories/<slug>/` berisi `index.html`, `shots.js`, `audio/`, `renders/`.

Tanpa multi-agent dan tanpa otomasi besar.

## 7. Rencana revisi Bible & Skill (belum dieksekusi)

| Bagian | Tindakan |
|---|---|
| Kebenaran dan disclosure, typography terbatas, caption frasa, kamera beralasan, kontinuitas, suara, format 9:16, quality gates, review | **Pertahankan** (kalimat disesuaikan) |
| Realism "approaching live-action" | **Ubah** menjadi "stylized cinematic toon" |
| Asset approach hybrid AI, pembagian tanggung jawab | **Ubah** menjadi full-code: Hyperframes + Three.js, rig, world kit |
| §5 karakter | **Ubah:** reference package menjadi *model sheet* rig dalam kode (tampak depan/samping/belakang, set ekspresi) |
| §7 hybrid asset (hero/layered plate, parallax limits) | **Ganti** dengan komponen: world kit, rig, fx, preset kamera |
| §15 Google Flow toolchain; skill bagian Flow, asset manifest, prompt batch; larangan "procedural drawing people" | **Hapus** (dibalik: semua visual dari kode) |
| Failure condition "crude silhouettes" | **Pertahankan.** Kini berlaku untuk rig kode. |
| `visual_plan.md` v3 dan aset Flow batch 1 | Tandai *deprecated*, tidak dihapus |

## 8. Dependency dan risiko

**Dependency:**
- `three` dari npm (MIT, diakses lewat registry npm, divendor lokal karena CDN diblokir).
- Hyperframes 0.9.30 dan ffmpeg sudah ada.
- Tidak perlu yang lain.

**Risiko:**

| Risiko | Tingkat | Mitigasi |
|---|---|---|
| **Kecepatan render tanpa GPU** (SwiftShader). Referensi #1 render ~4 fps di GPU. Di sini ❓ bisa 0,2–1 fps, artinya 30 menit sampai >1 jam untuk 61 detik. | Tinggi | Benchmark 5 detik dulu. Render 720×1280 lalu upscale. Kurangi post-pass. Pakai 4 worker. |
| Integrasi three.js + Hyperframes: determinisme frame | Sedang | Pola `render(t)` tanpa state. Dasarnya sudah terbukti di S04. |
| Kartu 2D terlihat pipih di sudut tajam | Sedang | Kamera dominan frontal/lateral. Gambar view 3/4 dan samping. |
| Biaya token membangun engine pertama kali | Sedang | Port dari #1, bukan menulis dari nol. Episode berikutnya memakai ulang engine. |
| Terlalu mirip channel referensi | Sedang | Palet thriller gelap, proporsi berbeda, aksen satu warna |
| Lisensi | Rendah | Kode yang di-port MIT, dengan CREDITS. Gaya opuscar CC BY 4.0 bila teksnya dikutip. Jangan menyalin IP (Shaun). Lisensi Hyperframes belum saya verifikasi; telemetrinya aktif dan bisa dimatikan. |
| Laptop ringan | Rendah | Render dilakukan di container cloud ini, bukan di laptop |
