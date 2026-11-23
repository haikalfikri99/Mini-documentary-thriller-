# Riset Sumber Primer: Dana Float Uang Elektronik (BI) & Bunga Efektif Bank Keliling / Bank Emok

---

## 1. Regulasi Dana Float & Saldo Kartu Hilang/Rusak/Tidak Aktif (PBI 20/6/PBI/2018 & Aturan Penggantinya)

### Rantai Dasar Hukum Primer
* **PBI No. 20/6/PBI/2018 tentang Uang Elektronik** (ditetapkan 4 Mei 2018):
  * Dokumen BI: `https://www.bi.go.id/elicensing/helps/PBI-200618%20UE.pdf`
  * Ringkasan resmi BI: `https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI-200618.aspx`
  * Salinan BPK: `https://peraturan.bpk.go.id/Download/126737/Peraturan%20BI%20No.%2020-6-PBI%202018.pdf`
* **Aturan Pengganti I — PBI No. 23/6/PBI/2021 tentang Penyedia Jasa Pembayaran (PJP)** (berlaku 1 Juli 2021, mencabut PBI 20/6/PBI/2018):
  * Dokumen BI: `https://www.bi.go.id/id/publikasi/peraturan/Documents/PBI_230621.pdf`
  * Salinan BPK: `https://peraturan.bpk.go.id/Download/213755/23.6.PBI.2021_penyedia%20jasa%20pembayaran.pdf`
* **Aturan Pengganti Terbaru — PBI No. 10 Tahun 2025 tentang Pengaturan Industri Sistem Pembayaran** (efektif 31 Maret 2026; ketentuan teknis penyelenggaraan uang elektronik dalam PBI 23/6/PBI/2021 tetap berlaku sepanjang tidak bertentangan):
  * Dokumen BI: `https://www.bi.go.id/id/publikasi/peraturan/Documents/PBI-102025.pdf`
  * Petunjuk Teknis BI 2026: `https://www.bi.go.id/id/publikasi/peraturan/Documents/Petunjuk-Teknis-Tentang-Implementasi-Ketentuan-Industri-Sistem-Pembayaran.pdf`

---

### A. Siapa yang Menikmati Imbal/Bunga Penempatan Dana Float?
Regulasi Bank Indonesia tidak menulis kalimat *"bunga dana float adalah milik penerbit"*, melainkan menciptakan **asimetri hukum dua lapis** yang membuat seluruh imbal hasil masuk ke pembukuan penerbit:

1. **Pengguna dilarang menerima bunga:** Baik **PBI 20/6/PBI/2018** maupun **Pasal 156 ayat (3) PBI 23/6/PBI/2021** menegaskan:
   > *"Nilai Uang Elektronik bukan merupakan simpanan sebagaimana dimaksud dalam Undang-Undang mengenai perbankan."*
   
   Karena bukan simpanan perbankan, saldo pengguna **tidak memperoleh bunga/imbal hasil** dan **tidak dijamin Lembaga Penjamin Simpanan (LPS)**.

2. **Penerbit hanya dibatasi pada penggunaan pokok Dana Float:** **Pasal 49 ayat (1) PBI 20/6/PBI/2018** jo. **Pasal 166 ayat (1) PBI 23/6/PBI/2021** mengatur bahwa *"Dana Float hanya dapat digunakan untuk memenuhi kewajiban Penerbit kepada Pengguna dan Penyedia Barang dan/atau Jasa"* (dilarang dipakai membiayai operasional/ekspansi penerbit). Namun, BI **tidak mewajibkan** kupon SBN atau jasa giro hasil penempatan Dana Float dibagikan ke pengguna. Akibatnya, imbal hasil dari penempatan wajib di giro/SBN diakui langsung sebagai **pendapatan bunga (*interest/finance income*) milik penerbit**.

---

### B. Komposisi & Tempat Penempatan Dana Float ($30\%$ vs $70\%$)
Berdasarkan **Pasal 48 ayat (1)–(2) PBI 20/6/PBI/2018** yang diteruskan secara substansial dalam **Pasal 165 ayat (1)–(2) PBI 23/6/PBI/2021**:

* **Pencatatan Akuntansi:** Penerbit wajib mencatat Dana Float pada pos **kewajiban segera atau rupa-rupa pasiva** di rekening terpisah dari rekening operasional perusahaan (sehingga bukan harta/*boedel* pailit apabila penerbit dilikuidasi).
* **Paling sedikit $30\%$ dari Dana Float** wajib ditempatkan pada:
  1. **Kas**, bagi penerbit berupa Bank kategori BUKU 4 (kini KBMI 4); atau
  2. **Rekening giro di Bank kategori BUKU 4** (atas nama perusahaan penerbit), bagi penerbit Bank non-BUKU 4 maupun Lembaga Selain Bank (LSB seperti dompet digital).
* **Paling banyak $70\%$ dari Dana Float** wajib ditempatkan pada:
  1. **Surat berharga atau instrumen keuangan likuid yang diterbitkan oleh Pemerintah RI (SBN) atau Bank Indonesia (SBI/SRBI)**; atau
  2. **Rekening di Bank Indonesia**.

---

### C. Nasib Saldo Kartu Uang Elektronik yang Hilang, Rusak, atau Tidak Aktif

| Kondisi Media/Kartu | Status Saldo Menurut Aturan BI | Dasar Pasal & Kutipan / Mekanisme Praktik |
| :--- | :--- | :--- |
| **Masa berlaku habis / tidak aktif / pengakhiran penggunaan (*redemption*)** | **TIDAK HANGUS.** Penerbit dilarang menghapus saldo karena kedaluwarsa dan dilarang memungut biaya penebusan (*redemption fee*). | **Pasal 161 ayat (3) PBI 23/6/PBI/2021:** *"Berakhirnya masa berlaku media uang elektronik tidak menghapus dan/atau menghilangkan nilai uang elektronik yang belum digunakan."* (PBI 20/6/PBI/2018 juga melarang penerbit menghapus, mengubah, atau mengurangi nilai UE karena masa berlaku berakhir). |
| **Kartu fisik *chip-based unregistered* HILANG** (Mandiri e-money, Flazz, Brizzi, TapCash) | **Praktis hilang / tidak bisa diklaim kembali.** | Pada UE *unregistered* berbasis *chip*, nilai uang tersimpan *offline* di dalam *chip* kartu tanpa daftar nominatif pemilik (berbeda dengan UE *registered* di **Pasal 167 PBI 23/6/PBI/2021**). Penerbit tidak dapat melacak kepemilikan kartu yang hilang. |
| **Kartu fisik *chip-based* RUSAK** | **Bisa dipindahkan jika *chip* masih terbaca sistem penerbit;** jika *chip* hancur total pada kartu *unregistered*, saldo tidak dapat dipulihkan. | Sesuai syarat produk penerbit dan kajian hukum perlindungan pengguna *e-toll* (`https://koloni.or.id/index.php/koloni/article/view/641/595`), penggantian saldo mensyaratkan pembacaan sisa nilai pada sistem/cip penerbit. |
| **Biaya penggantian kartu fisik** | **Boleh dipungut penerbit.** | **PBI 20/6/PBI/2018** & **PBI 23/6/PBI/2021** mengizinkan pemungutan *"biaya pembelian media instrumen uang elektronik untuk penggunaan pertama kali atau penggantian media instrumen uang elektronik yang rusak atau hilang"* (umumnya $\text{Rp}20.000\text{--Rp}40.000$ per kartu). |

---

## 2. Data Dana Float Terbaru BI & Perkiraan Pendapatan Bunga Penerbit

### A. Data Primer Dana Float Uang Elektronik dari Bank Indonesia (2026)
* **Sumber Primer:**
  * Statistik Sistem Pembayaran dan Infrastruktur Pasar Keuangan (SPIP) Bank Indonesia — **Tabel 5e. Uang Elektronik**: `https://www.bi.go.id/id/statistik/ekonomi-keuangan/spip/Documents/TABEL_5e.pdf`
  * Laman SPIP Agustus 2026: `https://www.bi.go.id/id/statistik/ekonomi-keuangan/spip/Pages/SPIP-Agustus-2026.aspx`
* **Posisi Dana Float Nasional Terbaru:**
  * **Juli 2026:** Total Dana Float uang elektronik Indonesia menembus **$\text{Rp}18,78\text{ triliun}$** (dilaporkan dari data SPIP BI, dikutip Kontan TV 28 September 2026: `https://tv.kontan.co.id/video/9iKrNPgQlT4`).
  * **Agustus 2026 (rincian per kelompok penyelenggara di SPIP BI Agustus 2026):** Total Dana Float tercatat **$\text{Rp}17.164\text{ miliar}$ ($\text{Rp}17,16\text{ triliun}$)**, dengan porsi dominan di dompet digital non-bank:
    * **71 Lembaga Selain Bank (LSB — GoPay, OVO, DANA, ShopeePay, dll.):** **$\text{Rp}12.247\text{ miliar}$ ($\text{Rp}12,25\text{ triliun}$)** atau **$71,35\%$**.
    * **21 Bank Umum (Mandiri, BCA, BRI, BNI, dll.):** **$\text{Rp}4.917\text{ miliar}$ ($\text{Rp}4,92\text{ triliun}$)** atau **$28,65\%$**.
  * *(Pembanding akhir tahun 2025: posisi Dana Float tercatat sebesar **$\text{Rp}15,86\text{ triliun}$**).*

### B. Keterbukaan Laporan Keuangan Penerbit & Estimasi Pendapatan Bunga
* **Batas Keterbukaan Laporan Keuangan:**
  * **OVO (PT Visionet Internasional)** dan **DANA (PT Espay Debit Indonesia Koe):** Berstatus perusahaan tertutup (non-Tbk) sehingga **tidak memublikasikan laporan keuangan terperinci** untuk pos dana float maupun pendapatan bunganya.
  * **GoPay (PT Dompet Anak Bangsa) — Laporan Keuangan Konsolidasian PT GoTo Gojek Tokopedia Tbk (GOTO):**
    * Laporan IDX: `https://www.idx.co.id/StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/From_EREP/202607/78713f9612_2306f3cc30.pdf`
    * Laporan Q4 2025: `https://indopremier.com/xdir/news/LAPORAN%20KEUANGAN/2025/q4//GOTO_Q4_2025.pdf`
    * Dalam LK GoTo, pendapatan bunga (*interest income*) digabung secara konsolidasi dari penyaluran kredit (*lending*/GoPay Pinjam & PayLater) dan penempatan kas/dana; **tidak ada pemecahan khusus** berapa rupiah pendapatan bunga yang murni berasal dari Dana Float GoPay.
  * **Bank Penerbit E-Money (Bank Mandiri, BCA, BRI, BNI):** Berdasarkan aturan BI, saldo *e-money* masuk dalam pos gabungan **"Kewajiban Segera" (*Immediate Liabilities*)**, sedangkan imbal hasil dari penempatan SBN/SRBI masuk dalam **Pendapatan Bunga (*Interest Income*)** konsolidasi bank tanpa pemisahan per produk kartu.
* **Simulasi / Estimasi Matematis Pendapatan Bunga Industri (Estimasi Analitis):**
  Dengan basis Dana Float industri **$\text{Rp}17,16\text{ triliun} \text{--} \text{Rp}18,78\text{ triliun}$** dan aturan penempatan BI (minimal $30\%$ giro bank KBMI 4 + maksimal $70\%$ SBN/SRBI):
  * **Skenario Konservatif (imbal hasil gabungan $4,0\%$ per tahun** — memadukan bunga giro korporasi $\approx 1,5\%\text{--}2\%$ pada porsi $30\%$ dan imbal hasil SBN/SRBI $\approx 5\%\text{--}5,5\%$ pada porsi $70\%$):
    * Basis $\text{Rp}17,16\text{ triliun} \rightarrow$ **$\approx \text{Rp}686,4\text{ miliar/tahun}$** (**$\approx \text{Rp}57,2\text{ miliar/bulan}$**).
    * Basis $\text{Rp}18,78\text{ triliun} \rightarrow$ **$\approx \text{Rp}751,2\text{ miliar/tahun}$** (**$\approx \text{Rp}62,6\text{ miliar/bulan}$**).
  * **Skenario Optimal (imbal hasil gabungan $5,0\%$ per tahun** jika $70\%$ ditempatkan penuh di SBN/SRBI):
    * Basis $\text{Rp}18,78\text{ triliun} \rightarrow$ **$\approx \text{Rp}939,0\text{ miliar/tahun}$** (**$\approx \text{Rp}78,25\text{ miliar/bulan}$**).

---

## 3. Skema Pinjaman Riil Bank Keliling / Bank Emok & Perhitungan Bunga Efektif Tahunan

### Konteks Pengawasan OJK & Satgas PASTI
* **Status Hukum:** Menurut **OJK** dan **Satgas Pemberantasan Aktivitas Keuangan Ilegal (Satgas PASTI)**, praktik **bank emok** (pinjaman kelompok perempuan duduk bersila/*emok* dengan sistem tanggung renteng) dan **bank keliling / bank titil** adalah aktivitas penyaluran kredit informal tanpa izin OJK (melanggar Pasal 16 ayat (1) jo. Pasal 46 ayat (1) UU Perbankan):
  * Siaran Pers OJK: `https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/Gencarkan-Literasi-Keuangan,-OJK-Edukasi-Ibu-Rumah-Tangga-dan-Pelaku-UMKM-di-Cikarang.aspx`
  * Laporan Kompas & Satgas PASTI: `https://money.kompas.com/read/2023/12/12/143000326/asa-lembaga-jasa-keuangan-melawan-jerat-pinjaman-rentenir`
* **Pembanding Batas Legal OJK (SEOJK No. 19/SEOJK.06/2023):** Batas maksimum bunga/manfaat ekonomi pinjaman konsumtif jangka pendek ($< 1\text{ tahun}$) pada *fintech* berizin OJK ditetapkan maksimal **$0,1\%$ per hari** mulai 1 Januari 2026 (setara $\approx 3\%$ per bulan atau $\approx 36,5\%$ APR nominal).

---

### Contoh Skema Riil 1: Bank Keliling / Bank Harian (Tenor 24 Hari)
* **Sumber Penelitian Lapangan:**
  * *Dampak Bank Keliling di Kampung Cikeyeup Desa Gunung Anten*, Jurnal *Socius*: `https://ojs.daarulhuda.or.id/index.php/Socius/article/download/626/649`
  * *Jurnal Orasi Bisnis* Polsri: `https://jurnal.polsri.ac.id/index.php/admniaga/article/view/162/99`
* **Data Riil Buku Angsuran:**
  * Pinjaman pokok diterima: **$\text{Rp}200.000$** (kelipatan skala pedagang warung: **$\text{Rp}1.000.000$**).
  * Cicilan harian: **$\text{Rp}10.000/\text{hari}$ selama $24\text{ hari}$** (untuk pokok $\text{Rp}1.000.000 = \text{Rp}50.000/\text{hari}$ selama $24\text{ hari}$).
  * Total pengembalian: **$\text{Rp}240.000$** (atau **$\text{Rp}1.200.000$** untuk pokok $\text{Rp}1\text{ juta}$) $\rightarrow$ bunga flat terlihat hanya **$20\%$ dalam $24\text{ hari}$**.
* **Perhitungan Bunga Efektif (karena pokok menyusut setiap hari sejak hari ke-1):**
  1. **Persamaan Nilai Sekarang Anuitas Harian ($PV = C \times \frac{1 - (1 + r_d)^{-n}}{r_d}$):**
     $$\frac{1 - (1 + r_d)^{-24}}{r_d} = \frac{200.000}{10.000} = 20$$
  2. **Suku Bunga Efektif Harian ($r_d$):** **$1,513\%$ per hari** *(lebih dari $15\times$ lipat batas maksimal OJK 2026 sebesar $0,1\%/\text{hari}$)*.
  3. **APR Efektif (tanpa pemajemukan, $1,513\% \times 365\text{ hari}$):** **$552,25\%$ per tahun**.
  4. **Bunga Efektif Tahunan / EAR ($(1 + 0,01513)^{365} - 1$):** **$23.907\%$ per tahun**.

---

### Contoh Skema Riil 2: Bank Emok Mingguan (Tenor 10 Minggu)
* **Sumber Penelitian Lapangan:** *Analisis Peran Praktik Bank Emok Terhadap Kondisi Ekonomi Masyarakat*, Universitas Nusa Putra (`https://repository.nusaputra.ac.id/id/eprint/1655/1/SALMA%20HATIAH%20%28REPO%29.pdf`), mengutip **buku angsuran riil nasabah bank emok**.
* **Data Riil Buku Angsuran:**
  * Plafon tercatat di buku: **$\text{Rp}1.000.000$** | Bunga tercantum: **$25\%$ per periode** | Total dana kembali: **$\text{Rp}1.250.000$**.
  * Cicilan mingguan (tenor standar $10\text{ minggu}$): **$\text{Rp}125.000/\text{minggu}$ selama $10\text{ minggu}$**.
  * *(Variasi lapangan umum bank emok Jawa Barat: pencairan awal dipotong **$10\% = \text{Rp}100.000$** sebagai biaya administrasi/simpanan wajib sehingga nasabah hanya menerima uang tunai **$\text{Rp}900.000$** di tangan).*
* **Perhitungan Bunga Efektif:**
  * **Skenario 2A — Tanpa potongan awal (Terima $\text{Rp}1.000.000$, cicil $\text{Rp}125.000/\text{minggu} \times 10\text{ minggu}$):**
    1. Persamaan anuitas mingguan:
       $$\frac{1 - (1 + r_w)^{-10}}{r_w} = \frac{1.000.000}{125.000} = 8,0$$
    2. **Suku Bunga Efektif Mingguan ($r_w$):** **$4,273\%$ per minggu**.
    3. **APR Efektif ($4,273\% \times 52\text{ minggu}$):** **$222,2\%$ per tahun**.
    4. **Bunga Efektif Tahunan / EAR ($(1 + 0,04273)^{52} - 1$):** **$780,9\%$ per tahun**.
  * **Skenario 2B — Dengan potongan awal $10\%$ (Terima bersih $\text{Rp}900.000$, cicil $\text{Rp}125.000/\text{minggu} \times 10\text{ minggu} = \text{Rp}1.250.000$):**
    1. Persamaan anuitas mingguan:
       $$\frac{1 - (1 + r_w)^{-10}}{r_w} = \frac{900.000}{125.000} = 7,2$$
    2. **Suku Bunga Efektif Mingguan ($r_w$):** **$6,468\%$ per minggu**.
    3. **APR Efektif ($6,468\% \times 52\text{ minggu}$):** **$336,3\%$ per tahun**.
    4. **Bunga Efektif Tahunan / EAR ($(1 + 0,06468)^{52} - 1$):** **$2.503\%$ per tahun**.