# Riset v2 — Tools umum, katalog gaya animasi, opsi signature style

Status: **riset, belum ada yang di-install / dirender**. Melanjutkan `riset-fondasi-animasi-full-code.md` (v1).
Tanggal: 2026-11-10.

Legenda bukti: ✅ diverifikasi sendiri (baca kode / lihat frame / cek registry) · 📄 klaim README · ❓ belum diuji.

---

## 0. Cakupan riset

| Sumber | Yang dilakukan |
|---|---|
| [zhuyansen/awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) (474 repo) | Baca ulang seluruh daftar Stories (29), Music videos (17), tabel uji 16 skill, "Made with Opus 5.5". README 18 repo baru dibaca; kode `make-short` v3 dibaca. |
| [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (703 prompt) | `data/videos.json` dianalisis penuh: kategori, tech tag, kata kunci gaya; ±25 prompt cerita/film dibaca utuh. Poster video **tidak bisa dilihat** (media.skillry.dev diblokir proxy) → penilaian visual dari prompt + repo saja. |
| [Yuuhann1999/agent-storyboard](https://github.com/Yuuhann1999/agent-storyboard) | README dibaca untuk format storyboard. |
| Registry npm / PyPI | Versi, ukuran, lisensi kandidat dependency dicek (tanpa install). |

---

## 1. Tools yang umum dipakai (temuan)

### 1a. Statistik 703 video Opus 5.5 (tag dari katalog) ✅
| Tool | Video | % |
|---|---:|---:|
| Canvas 2D | 267 | 38% |
| SVG | 183 | 26% |
| three.js | 131 | 19% |
| Shader GLSL | 92 | 13% |
| GSAP | 86 | 12% |
| CSS | 57 | 8% |
Disebut di teks prompt: Remotion 96, rig 83, HyperFrames 24, Blender 15.

### 1b. Pola yang sama di hampir semua repo cerita/MV ✅
1. **Frame = fungsi murni waktu `render(t)`**, seed deterministik → render paralel & bisa dilanjutkan.
2. **Headless Chrome + ffmpeg** sebagai renderer (langsung, atau lewat Remotion/HyperFrames).
3. **Storyboard dulu** → **contact sheet** (lembar thumbnail) untuk review → baru render penuh.
4. Proyek panjang: satu file per adegan/chapter, dikerjakan subagent paralel dengan satu `ANIMATION_GUIDE.md`.
5. Audio: VO eksternal + SFX/musik sintesis kode (numpy / WebAudio), timing dari whisper/beat-grid.

### 1c. Tumpukan teknologi per "keluarga look"
| Look | Stack yang terbukti | Repo bukti |
|---|---|---|
| Lukisan cat air / krayon / tinta | **p5.js + p5.brush** di headless Chrome | [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo), [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase), [paint-mv-skills](https://github.com/lintsinghua/paint-mv-skills), [claude-mv-skill](https://github.com/Joker-chichi/claude-mv-skill), [Win-Hao/music-mv](https://github.com/Win-Hao/music-mv) (**p5.brush di dalam HyperFrames** 📄) |
| Lukisan sapuan kuas GPU | Canvas2D underpainting + WebGL2 60k instanced strokes | [functional-emotions-video](https://github.com/ledbetterljoshua/functional-emotions-video) |
| Cetak/grafis (woodcut, engraving, riso, halftone, stained glass, cut-paper) | Canvas2D + shader post | [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar), [make-short legacy 2D](https://github.com/nocodehack/make-short), [riso-windowseat](https://github.com/sevenevesai/riso-windowseat), [bishpls/animation-pipeline](https://github.com/bishpls/animation-pipeline) |
| Karakter 2D di dunia 3D (web) | three.js + kartu Canvas | [claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) |
| **Toon 3D / miniatur / clay** | **Blender (bpy) EEVEE**, toon material + inverted-hull ink | [make-short v3](https://github.com/nocodehack/make-short) ✅ kode dibaca, [claude-music-videos](https://github.com/IdkwhatImD0ing/claude-music-videos), [vocaloid-style-mv-pipeline](https://github.com/EGSECDA/vocaloid-style-mv-pipeline) |
| Realistis 3D | Blender Cycles + aset Poly Haven | [claude-blender-skills](https://github.com/mromidev/claude-blender-skills) (butuh GPU, aset unduhan) |

**Temuan penting baru:** `make-short` (dulu saya keluarkan dari shortlist) ternyata punya **jalur v3 Blender**: karakter kartun toon di dunia 3D yang dicat, untuk YouTube Shorts sejarah (contoh: hardtack Perang Saudara), plus critic agent. Frame demo ✅ dilihat: karakter "bean" ber-outline tebal, ekspresif, lingkungan 3D bertekstur cat. Render: EEVEE 720×1280 lalu upscale; 📄 "60 s ≈ 21 menit di laptop gaming (GPU)".

### 1d. Kandidat dependency di luar three.js (dicek di registry, belum di-install)
| Paket | Versi | Ukuran | Lisensi | Fungsi bagi kita | Catatan |
|---|---|---|---|---|---|
| `three` (npm) | 0.187.0 | 21 MB | MIT | Dunia 3D di browser | Sudah direkomendasikan v1 |
| `p5` + `p5.brush` (npm) | 2.3.4 + 3.0.0 | 17 MB + 3.6 MB | LGPL-2.1 / MIT | Tekstur lukisan tangan (cat air, krayon, tinta, hatching) | Terbukti jalan di HyperFrames (Win-Hao 📄). LGPL aman dipakai sebagai library. |
| `bpy` (PyPI, Blender 5.3 sebagai modul Python) | 5.3.0 | **428 MB** | GPL | Toon 3D kualitas tertinggi, model karakter 3D, Grease Pencil, Freestyle | Wheel cocok dengan Python 3.13 di container ✅. Bisa di cloud Linux 📄 (prompt oab10don). **EEVEE tanpa GPU ❓** (Mesa ada di container). Cycles CPU pasti jalan tapi lambat. Akan **menggantikan** three.js, bukan menambah. |

Tidak perlu: Remotion (redundan dgn HyperFrames), PixiJS, rough.js, Lottie/Rive (format motion-graphics, bukan film cerita).

---

## 2. Katalog gaya animasi (dikelompokkan, dinilai untuk thriller dokumenter sejarah)

Sumber gaya: lemo-opuscar (66 gaya ✅ 30 frame dilihat), huashu-art-motion (53 kartu gaya, 35 frame dilihat ✅), make-short (10 gaya), opus-video-skills, + prompt katalog Opus.

Skor kecocokan: ●●● cocok · ●● bisa · ● tidak cocok. Kolom "Manusia" = apakah gaya ini bisa menampilkan manusia beranimasi ekspresif tanpa AI image (syarat wajib kita).

| # | Keluarga | Contoh gaya | Mood thriller | Manusia ekspresif | Skala bencana (tangki, gelombang) | Bukti render tanpa GPU |
|---|---|---|---|---|---|---|
| A | Lukisan tangan 2D | cat air p5.brush, krayon, tinta (ink-wash), impasto | ●● (bisa gelap, cenderung puitis) | ●●● | ●● | ✅ (Canvas, ~0,3 s/frame 📄) |
| B | Cetak periode | engraving/etsa, woodcut, halftone dossier, silent-film | ●●● (terasa 1919, koran zaman itu) | ●● (hatching; lebih kaku) | ●● | ✅ Canvas |
| C | Kertas & teater | cut-paper multiplane, paper pop-up, shadow theatre | ●●● (atmosfer kuat) | ● – ●● (cenderung siluet → **bertabrakan dengan larangan siluet**) | ●● | ✅ Canvas |
| D | Kartun 2D | flat cartoon ber-ink "boil", rubber-hose, midcentury toon, cel-anime 80s, chibi | ●● (perlu palet gelap) | ●●● | ● – ●● | ✅ Canvas |
| E | 2D di dunia 3D | Toon diorama (mromidev), HD-2D | ●●● | ●●● | ●●● | ❓ three.js di SwiftShader |
| F | Toon 3D / miniatur | Blender toon (make-short v3), clay/stop-motion, vinyl toy, tilt-shift, low-poly, voxel | ●● – ●●● | ●●● (karakter 3D sederhana) | ●●● | ❓ EEVEE di CPU |
| G | Realistis 3D | Blender Cycles | ●●● | ● (wajah manusia realistis = sulit tanpa aset/mocap) | ●●● | ❌ butuh GPU, aset unduhan |
| H | Dokumenter grafis | visual-investigation, archive-lighttable, blueprint, newsreel | ●●● | ● | ● | ✅ — **tapi cenderung tipografi/arsip** (newsreel lemo memakai footage arsip asli → melanggar aturan) |

Gugur karena aturan Anda: **G** (aset/footage), **H** (tipografi-dominan / footage), **C** sebagai gaya utama (siluet). Gaya **huashu** untuk tokoh manusia memakai frame dari image model 📄 → hanya tekniknya yang relevan.

---

## 3. Opsi signature style (untuk dipilih — bukan keputusan final)

Semua opsi: palet gelap + satu warna aksen per cerita (amber untuk molase), manusia beranimasi ekspresif, kamera bermotif, tanpa label rekonstruksi.

| Opsi | Nama kerja | Wujud | Stack | Kelebihan | Kekurangan |
|---|---|---|---|---|---|
| **1** | **Dark Toon Diorama** (v1) | Dunia 3D low-poly bertekstur cat + outline tinta; aktor = kartu 2D ekspresif yang ikut kena cahaya | HyperFrames + three.js | Genre paling dekat (mromidev: runtuhnya jembatan Broughton 1831); kamera sinematik; tidak perlu install besar | Render CPU belum terukur |
| **2** | **Toon Miniature 3D** | Seperti make-short v3 tapi gelap: karakter 3D toy/bean ber-outline tebal, set miniatur, cahaya sinematik | Blender bpy (EEVEE) + HyperFrames untuk caption & audio | Kualitas 3D tertinggi; karakter 3D penuh bisa diputar kamera; terbukti di Shorts sejarah | Install 428 MB; EEVEE-CPU belum pasti; dua mesin render (Blender + HyperFrames) |
| **3** | **Painted Noir** | Animasi 2D lukisan tangan (tinta + cat air p5.brush), garis "boil", gelap & kontras | HyperFrames + p5.brush | Paling unik & emosional; render cepat; terbukti di HyperFrames | Skala/kedalaman 3D terbatas (kamera = parallax lapisan) |
| **4** | **Engraved Thriller** | Gaya etsa/engraving koran 1919 yang bergerak: hatching, tinta hitam, satu warna aksen | HyperFrames + Canvas (tanpa dependency baru) | Identitas "sejarah" paling kuat & paling murah | Gerak manusia lebih kaku; berisiko terasa ilustrasi buku |

**Saran saya: Opsi 1, dengan tekstur lukisan dari Opsi 3 di lingkungan** (p5.brush dipakai untuk melukis tekstur dinding/langit/tanah sekali di awal, lalu dipasang di dunia three.js). Alasannya:
- genre dan format mromidev paling dekat dengan channel kita;
- kamera 3D penting untuk adegan skala (tangki 15 m, gelombang di jalan);
- tekstur lukisan memberi identitas yang tidak "default three.js";
- tetap satu renderer (HyperFrames), dan install kecil (±42 MB npm).

Opsi 2 baru layak jika style frame Opsi 1 tidak cukup bagus — karena biayanya (428 MB, EEVEE-CPU belum pasti, dua mesin render) jauh lebih besar.

**Cara memutuskan yang saya sarankan:** satu style frame (still, bukan video) adegan yang sama — *gelombang molase menerjang Commercial Street* — untuk 2–3 opsi pilihan Anda, ditampilkan berdampingan di halaman storyboard.

### Implementasi Molasses per opsi (ringkas)
| Adegan | Opsi 1 / 2 (3D) | Opsi 3 / 4 (2D) |
|---|---|---|
| Establishing Boston 1919 | Kamera crane turun di jalan diorama, kereta layang lewat | Lapisan lukisan multiplane, parallax + asap |
| Tangki & pekerja | Tangki silinder 3D, pekerja berjalan/bicara | Pekerja di depan tangki dilukis, rig 2D |
| Bocor di sambungan | Close-up macro, tetesan amber menetes | Insert close-up tinta, tetesan dilukis per frame |
| Anak mengumpulkan molase | Karakter anak berjongkok dengan kaleng | Sama, rig 2D |
| Tangki pecah | Panel pelat berotasi, paku keling terlontar | Pelat pecah sebagai potongan lukisan, speed-lines |
| Gelombang menerjang | Permukaan 3D bergerak di sepanjang jalan, cipratan | Massa amber dilukis per frame, menelan lapisan jalan |
| Rel layang & korban | Rel melengkung, warga lari | Komposisi dramatis 2D, aksi lari |
| Penutup/aftermath | Kamera mundur di jalan yang lengket | Lapisan sunyi, cahaya senja |

---

## 4. Workflow baru: storyboard sebagai titik approval (pengganti benchmark video 5 detik)

Format diadaptasi dari agent-storyboard (satu tabel per shot), **tanpa memasang plugin-nya**, karena:
- server lokal `127.0.0.1` tidak bisa Anda buka dari sesi cloud;
- jalur gambarnya memakai AI image generation (dilarang untuk kita);
- TTS-nya online (VoxCPM), padahal VO kita sudah ada.

Format yang kita pakai: **halaman Artifact** (bisa dibuka di HP), satu baris per shot:

| Kolom | Isi |
|---|---|
| # / waktu | Nomor shot, timecode dari audio VO aktual |
| Narasi | Kalimat VO yang jatuh di shot itu (tidak diubah) |
| **Keyframe** | 1–3 still **hasil render kode asli** (awal / puncak / akhir shot) — bukan sketsa AI |
| Aksi & animasi | Apa yang bergerak, siapa melakukan apa |
| Kamera | Gerak + lensa |
| Suara | SFX/musik |
| Status | Disetujui / revisi (+ catatan Anda) |

Urutan kerja:
1. Pilih gaya (lewat style frame).
2. Storyboard keyframe semua shot. Ini **titik approval**, dan render still hanya butuh detik per gambar.
3. Animasi.
4. Contact sheet.
5. Preview 720p.
6. Render final.

Catatan jujur: still tidak menunjukkan kualitas gerak dan waktu render. Risiko itu ditunda sesuai arahan Anda.

---

## 5. Tambahan rencana revisi Bible/Skill
- **Hapus seluruh label "rekonstruksi sinematik"** (aturan, overlay di frame, quality gate terkait). Prinsip akurasi faktual narasi tetap dipertahankan.
- Ganti approval gate "style frame + benchmark 5 dtk" → "style frame + storyboard keyframe".
- Bagian lain sesuai rencana v1 §7. Dieksekusi setelah gaya dipilih, dalam satu commit.

## 6. Risiko
Ditunda sesuai arahan; dibahas setelah gaya dipilih.
