# ARSIP KASUS — Cetak Biru Upgrade Editorial & Teknis Repo (v5.0)

Dokumen ini menyatukan seluruh pembaruan sistem editorial hulu-ke-hilir (riset, mesin ide topik tak terbatas, judul, hook 3-titik, script *Circular Reframe Loop*, protokol anti-halusinasi) dan perbaikan teknis pipeline di folder `kit/`, terkalibrasi penuh dengan kode aktual repo dan pelajaran produksi hingga episode `#004` (`stories/aqua/`).

---

## BAGIAN 1: DOKTRIN EDITORIAL & MESIN IDE HULU-KE-HILIR

### 1. Persona Narator & Sapaan Kanal
* **Sapaan Wajib:** Gunakan **"kamu"** (orang kedua tunggal) dan **"kita"** secara natural, konsisten dengan episode `#001`–`#004`. Penonton harus merasa kasus yang dibahas menyentuh dompet, kebiasaan, atau keputusan mereka hari ini.
* **Karakter Suara:** Investigatif tajam, lincah, sedikit jahil saat mengungkap ironi, namun tetap berwibawa dan berbasis dokumen.
* **Larangan Keras:**
  * Tanpa basa-basi pembuka (*"Halo guys"*, *"Tahukah kamu"*, *"Pernahkah kalian berpikir"*).
  * Tanpa terjemahan kaku jika padanan alami lebih akurat di Whisper ASR (pelajaran `#004`: pakai **"email"** bukan *"surel"*, **"nggak"** bukan *"tidak"* pada narasi kasual).
  * Tanpa kalimat klise khas AI (*"Di dunia yang serba cepat ini..."*, *"Mari kita selami lebih dalam..."*).

### 2. Mesin Ide Topik Tak Terbatas (*Infinite 4-Pillar Topic Engine*)
Pencarian ide dilakukan lewat **Matriks 4 Pilar $\times$ 5 Lensa Pembangkit Seed** yang langsung diumpankan ke `kit/tools/gali_topik.py` dan `kit/tools/riset_topik.py`.

#### A. Rotasi 4 Pilar Konten
1. **Merek, Harga & Bisnis Sehari-hari (50%):** Sengketa usaha (putusan KPPU), trik harga, *shrinkflation*, aturan ritel, perang dagang produk warung/minimarket.
2. **Desain Ruang, Aturan & Sistem Publik (25%):** Tata letak toko/mal, rekayasa lalu lintas/lampu merah, kebijakan publik yang memicu efek kebalikan (*cobra effect*).
3. **Psikologi Perilaku & Bias Kognitif (15%):** Celah otak manusia saat mengambil keputusan uang, waktu, atau risiko (*Pain of Paying*, *Decoy Effect*, *Default Bias*, *Goal-Gradient Effect*, *Bystander Effect*) dalam konteks harian Indonesia.
4. **Misteri Rasional & Sejarah Terlupakan (10%):** Insiden nyata, eksperimen sosial, atau fakta sejarah Indonesia/dunia yang terdengar seperti fiksi tapi memiliki arsip resmi.

#### B. 5 Lensa Pembangkit *Seed* (untuk `seeds.txt`)
Setiap kali bank ide menipis, pasangkan **objek/situasi familiar di Indonesia** dengan 5 lensa ini:
1. **Lensa "Kenapa Dilarang / Didenda?"** $\rightarrow$ Telusuri putusan resmi KPPU, BPKN, BPOM, atau MA yang menyangkut barang/merek sehari-hari.
2. **Lensa "Kenapa Desainnya Begini?"** $\rightarrow$ Amati benda yang dilihat orang tiap hari (struk belanja, kemasan, tombol lift, jalur antrean, rak minimarket, aplikasi ojol).
3. **Lensa "Jebakan Harga & Ukuran"** $\rightarrow$ Bandingkan varian S/M/L, *bundling*, biaya admin, atau perubahan gramasi produk warung.
4. **Lensa "Efek Kebalikan (*Backfire*)"** $\rightarrow$ Fitur/aturan yang dibuat untuk menertibkan orang, tetapi datanya justru memperburuk perilaku.
5. **Lensa "Eksperimen $\rightarrow$ Kebiasaan Lokal"** $\rightarrow$ Ambil 1 bias kognitif dari jurnal psikologi/ekonomi perilaku, lalu cari wujud paling konkretnya di Indonesia.

#### C. Alur Eksekusi Skrip Riset & Rubrik Validasi 20 Poin
* Jalankan `python3 kit/tools/gali_topik.py autocomplete seeds.txt out_ac.json` dan `python3 kit/tools/gali_topik.py outlier queries.txt out_out.json`, lalu saring dengan `python3 kit/tools/riset_topik.py kandidat.json hasil.json`.
* **Prioritas Lolos:** `n_saran` tinggi (permintaan nyata di pencarian YouTube Indonesia) dengan `n_1m == 0` atau kompetitor Shorts yang masih dangkal/tanpa dokumen.
* **Skor Validasi Wajib ($\ge 16/20$, tidak boleh ada nilai $\le 2$):**
  1. *Kedekatan Sehari-hari (1–5)*
  2. *Kontras Intuisi / Twist (1–5)*
  3. *Ketersediaan Bukti Visual Kolase (1–5)*
  4. *Keamanan Hukum & Monetisasi (1–5)*

### 3. Rekayasa Judul, Uji POV Penonton, & Penguncian 3-Titik
* **5 Pola Judul Terbukti ($\le 55$ karakter, ideal $38–48$ karakter):**
  1. `"[Merek/Subjek] [Tindakan/Hukuman] Gara-Gara [Objek Familiar]"`
  2. `"Trik Psikologi di Balik [Benda Familiar] yang Bikin Kamu [Perilaku]"`
  3. `"Kenapa [Fitur/Aturan] Justru Bikin Orang Makin [Kebalikannya]?"`
  4. `"Cara Halus [Sistem/Produk] Bikin Kamu Bayar Lebih Mahal"`
  5. `"Alasan Asli [Kebiasaan/Desain] yang Selama Ini Kamu Anggap Sepele"`
* **Wajib Uji POV Penonton (4 Pertanyaan Sebelum Menulis Script):**
  1. Siapa melawan siapa / siapa pelakunya?
  2. Apa objek fisik konkret yang ditunjuk di layar?
  3. Apa taruhan langsung ke penonton (uang, waktu, keselamatan)?
  4. Apa **"Alasan ASLI"** (*core insight*) yang dibawa pulang penonton?
* **Penguncian 3-Titik (`0,0–4,0 dtk`):**
  * **Judul** menjanjikan satu anomali/konsekuensi spesifik $\leftrightarrow$ **Frame 0 (`film.js` Shot 01, `0,00 dtk`)** langsung menampilkan objek utama ($\ge 45\%$ lebar frame di zona `y 150–1150`) dengan hantaman stempel/label $\le 0,25$ dtk $\leftrightarrow$ **Kalimat H1 (`script_vo.txt` baris 1)** selesai $\le 4,0$ dtk ($\le 14$ kata) memakai kata tunjuk visual (*"kayak gini"*, *"ini"*).

### 4. Anatomi Script 6 Segmen, *Micro-Rehook*, & *Circular Reframe Loop*
* **Lokasi File Script Resmi:** `stories/<slug>/README.md` (bagian Paket Final) dan `stories/<slug>/kolase/audio/script_vo.txt` (bukan `SCRIPT.md`).
* **Parameter Teknis:** **120–145 kata** (VO bersih), durasi **48–55 detik** pada tempo **2,60–2,75 kata/detik**, kalimat pendek-menengah (**6–13 kata**) dengan tanda baca disiplin agar `kit/tools/line_starts.py` otomatis memecah menjadi **18–24 shot** (rata-rata $2,1–2,6$ dtk/shot).
* **Struktur 6 Segmen:**
  1. **Babak 1 — Hook & Anomali (`00–04 dtk`):** Fakta mengejutkan + objek visual, selesai $\le 4,0$ dtk.
  2. **Babak 2A — Bukti Awal / Aturan Main (`04–16 dtk`):** Mekanisme dasar dengan istilah sederhana.
  3. **Micro-Rehook 1 (`16–18 dtk`):** Engsel pematah ekspektasi 3–6 kata (*"Tapi ada satu syarat."*).
  4. **Babak 2B — Bedah Intrik / Mekanisme Otak (`18–36 dtk`):** Bukti konkret (email, klausul, hasil eksperimen) + bantahan/twist pertama.
  5. **Micro-Rehook 2 (`36–39 dtk`):** Pembalikan final 2–3 kata (*"Aqua bebas? Belum."*) lalu buka bukti pamungkas.
  6. **Babak 3 & 4 — Payoff + *Circular Reframe Loop* (`39–54 dtk`):** Kalimat penutup berdiri utuh sebagai kesimpulan tajam atau pertanyaan reflektif (**zero-CTA**), tetapi **memanggil ulang objek/situasi dari kalimat pertama** sehingga saat *auto-replay*, kalimat pembuka terdengar seperti bukti langsung.

### 5. Protokol Anti-Halusinasi & Perbandingan Perilaku
* **Wajib Dua Lapis Sumber (`README.md` Fact Sheet + `kolase/SOURCES.jsonl`):** Minimal **2 sumber fakta lokal** (membuktikan peristiwa/putusan/fenomena di Indonesia) + **1 sumber mekanisme/putusan primer**.
* **Aturan Angka & Perbandingan Perilaku:** Dilarang keras mengarang angka/persentase. Angka hanya ditulis jika eksplisit di sumber dan konsisten antar-sumber. Jika sumber hanya menyebut arah perbandingan (*"lebih murah/mahal"*, *"lebih sering dipilih"*), gunakan **perbandingan perilaku dan kontras konkret** tersebut.
* **Pagar Hukum, Merek, & Visual:** Wajib menyebut status putusan/temuan lembaga (*"menurut KPPU/putusan"*), wajib memuat bantahan pihak terkait, tanpa logo merek asli, tahun kejadian wajib tampil di layar, dan semua stempel memakai `bk.stamp(..., legible=True)`.

---

## BAGIAN 2: PERBAIKAN TEKNIS REPO (`kit/`)

1. **Visual QA Gate Otomatis (`kit/tools/check_visual.mjs` + `kit/tools/make_kolase.sh`):**
   * Tambahkan pemeriksaan otomatis sebelum render video penuh di `make_kolase.sh` (setelah Audio QA gate):
     * **Cek Durasi Shot & Dead-Frame:** Memverifikasi interval `START` pada `film.js` dan membandingkan sampel piksel area panggung (`y 120–1190`) tiap $0,5$ detik agar tidak ada rentang statis $> 2,5$ detik tanpa perubahan visual.
     * **Cek Zona Aman Pita Caption (`y 1210–1536`):** Memastikan tidak ada potongan kolase/stempel/teks non-latar yang masuk ke pita caption (`y 1210–1536`) atau terpotong di tepi atas (`y < 100`).
2. **Tight Audio Tail ($\le 0,15\text{ s}$) di `kit/audio/vo_chain.py`:**
   * Pangkas hening di akhir file audio (*trailing silence* di bawah `-45 dB`) menjadi **$\le 0,15$ detik** tanpa *fade-out* panjang agar transisi *Circular Reframe Loop* menyambar Frame 0 seketika saat *auto-replay*.
3. **Pembaruan Kerangka `README.md` di `kit/tools/new_episode.sh`:**
   * Perbarui perintah pembuatan `README.md` di `new_episode.sh` agar otomatis memuat kerangka v5.0: `Validasi Topik (Skor >= 16/20)`, `Uji POV Penonton`, `Fact Sheet (2 Lapis Sumber)`, `Celah & Batas Hukum`, `Judul & Penguncian 3-Titik`, dan `Paket Final Script`.
4. **Perbaikan Filter Relevansi di `kit/tools/riset_topik.py`:**
   * Perbaiki fungsi `demand()` pada `riset_topik.py` agar pencocokan saran autocomplete tidak hanya bergantung pada kata pertama (`k.split()[0]`), melainkan mencocokkan frasa atau kata bermakna ($\ge 4$ huruf) dari `terms` agar kandidat dua kata (seperti `"lampu merah"`, `"kental manis"`) tidak terbuang.

---

## BAGIAN 3: PETA MIGRASI ANTI-TABRAKAN (SINGLE SOURCE OF TRUTH)

Agar repo tidak memiliki dua aturan yang saling bertentangan, Claude Code wajib melakukan **penggabungan terarah (*surgical merge*)** ke file kanonik yang sudah ada dan **menghapus/mengganti** aturan lama yang usang:

| File Target di Repo | Tindakan Wajib | Aturan Lama yang Diganti / Dihapus |
| :--- | :--- | :--- |
| `research/niche/topik/RUMUS_PEMILIHAN.md` | Tambahkan Mesin Ide 4-Pilar, 5 Lensa Seed, & Rubrik Skor 20 Poin. | Jangan duplikasi rumus hitung views yang sudah ada; sambungkan langsung di atasnya. |
| `.claude/skills/arsip-kasus/references/8-hook-dan-judul.md` | Tambahkan 5 Pola Judul, Uji POV Penonton (4 tanya), & Penguncian 3-Titik (`0–4 dtk`). | Pertahankan seluruh pelajaran uji hook `#001`–`#004`. |
| `.claude/skills/arsip-kasus/references/1-cerita*.md` | Tambahkan sapaan `"kamu"`, target 120–145 kata, 6 segmen + 2 Micro-Rehook, Circular Reframe Loop, & Aturan Perbandingan Perilaku. | **Hapus/ganti** aturan lama *grammatical loop* (kalimat menggantung) dan koreksi path script ke `README.md` + `script_vo.txt`. |
| `.claude/skills/arsip-kasus/references/3-audio.md` | Tambahkan aturan *Tight Audio Tail* ($\le 0,15\text{ s}$ tanpa *fade-out*). | Pertahankan aturan tempo `2,60–2,75` kata/dtk & Audio QA gate. |
| `.claude/skills/arsip-kasus/references/7-selera-dan-cara-kerja.md` | Tambahkan poin bernomor lanjutan (mulai `#43` dst.) untuk keputusan editorial v5.0. | **Jangan menimpa** poin `#1`–`#42` yang sudah ada. |
| `.claude/skills/arsip-kasus/SKILL.md` & `AGENTS.md` | Tambahkan pointer ringkas di tabel "Titik ingat" dan catatan Visual QA gate. | Jangan ubah alur utama workflow yang sudah berjalan. |