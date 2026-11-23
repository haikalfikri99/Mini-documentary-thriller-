# Arketipe hook & penutup: pemahamanku, pemakaian, dan masalahnya (23 Nov 2026)
Sumber di repo: hook = `references/8-hook-dan-judul.md` §H (K1–K5), §I, §J; penutup = `references/1-cerita-dan-script.md` §M5/§M7. Pemeriksa = `kit/tools/lint_episode.py`.

## A. Lima arketipe HOOK (kalimat pembuka 0–4 dtk)
Arketipe = JENIS INFORMASI yang dibuka lebih dulu. Bukan cetakan kalimat. Contoh di bawah memakai topik batch ini, tanpa kata "ini", supaya terlihat bentuk kalimatnya bisa berbeda.
| Kode | Nama | Artinya (bahasa biasa) | Contoh pembuka (bentuk berbeda-beda) |
|---|---|---|---|
| K1 | Bom di Bawah Meja | Penonton diberi tahu ancaman yang belum disadari tokoh/benda | "Tiap bulan, sebagian kuota Didi hilang tanpa dia sadari." |
| K2 | Ketidaknyamanan Kontra-Intuitif | Yang dikira bagus dibenturkan dengan hasil sebenarnya, diucapkan lugas | "Cicilan sepuluh ribu sehari kedengarannya paling ringan. Hitungannya paling mahal." |
| K3 | Bukti Visual Mendahului Konteks | Benda/dokumen janggal tampil dulu, penjelasan ditahan | "Di amplop tertulis dua ratus ribu. Di dalamnya, seratus delapan puluh." |
| K4 | Celah Ujung Lidah | Dua kondisi nyaris identik, hasil berbeda | "Dua paket sama-sama tiga puluh giga. Satunya bisa dibawa ke bulan depan." |
| K5 | Titik Balik Hasil Ekstrem | Mulai dari hasil paling mustahil (berangka), lalu tarik mundur | "Wilmar, Musim Mas, dan Permata Hijau wajib mengganti tujuh belas koma tujuh triliun." |
Larangan di pembuka & judul (v7.0): psikologi, bias, kenapa, padahal, tapi, ternyata, "?". H1 ≤ 14 kata, ≤ 4,0 dtk.

## B. Lima arketipe PENUTUP (6 detik terakhir)
| # | Nama | Artinya | Contoh dari batch ini |
|---|---|---|---|
| 1 | Reframing Sistemik | Benda Frame 0 kembali dengan makna baru | #017: label harga di rak kosong kini terisi di berkas perkara |
| 2 | Cermin Personal | Pertanyaan refleksi, tanpa menghakimi | #019: "kamu bayar berasnya, atau tulisannya?" |
| 3 | Dilema Abu-Abu | Dua sisi sama-sama masuk akal, memancing debat | (belum dipakai di batch ini) |
| 4 | Lingkar Naratif Mulus | Khusus Ringkas; kalimat akhir menyambung ke kalimat pertama saat diputar ulang | #018: amplop setipis itu → "Amplop pinjaman…" |
| 5 | Pemicu Dunia Nyata | Menunjuk benda yang pasti ditemui penonton hari itu | #020: banner "masa aktif tinggal 2 hari" |
Daftar hitam pembuka kalimat terakhir: Jadi, Kesimpulannya, Pada akhirnya, Nah itulah, Lain kali, Kalau/Kalo kamu, Ingat ya.

## C. Pemakaian nyata (data repo)
- Log `stories/episode_log.json` (#009–#016): hook K1×2, K2×2, K3×2, K4×1, K5×1; penutup Reframing×3, Pemicu×2, Cermin×2, Dilema×1, Lingkar×0. Jadi semua arketipe SUDAH terpakai; Lingkar baru muncul di #018.
- Batch #017–#020: hook K5, K1, K2, K3; penutup Reframing, Lingkar, Cermin, Pemicu. Label berotasi sesuai aturan.

## D. Masalahnya: label berotasi, bentuk kalimat tidak
Kalimat pertama 15 dari 17 episode memakai "[benda] ini / kayak gini" (hanya #017 dan three-in-one yang tidak). Di #018–#020 semuanya berbentuk "[benda] ini [klaim]", padahal labelnya K1, K2, K3 berbeda.
Penyebab di repo:
1. Linter hanya memeriksa LABEL `[HOOK: …]` ada dan tidak sama dua episode berurutan; tidak memeriksa bentuk kalimat.
2. `8-hook` §G (Penguncian 3-titik): H1 "memakai kata tunjuk visual ('kayak gini', 'ini') bila merujuk objek di layar", dan `1-cerita` baris Hook & Anomali: "kata tunjuk yang terhubung ke visual".
3. Contoh resmi K3 dan K4 di §I.4 sendiri memakai "ini" ("Struk ini mencetak…", "Dua kartu member ini…").
4. Aku menyuruh agen membaca episode contoh jadi yang semuanya berbentuk itu, tanpa menyuruh bervariasi.
5. Label dipilih agen sesudah menulis kalimat (pembenaran), bukan sebelum.

## E. Usulan perbaikan (menunggu keputusan user)
1. Bentuk hook dipilih LEBIH DULU dari menu bentuk (angka-hasil, kontras angka, tokoh+angka, peristiwa, artefak-tanpa-penjelasan, dua-kondisi-kembar), bukan dari label.
2. Hapus "kata tunjuk wajib"; benda Frame 0 ditunjuk lewat visual.
3. Linter: tambahkan cek "maks 1 dari 4 episode batch yang pembukanya berpola [benda] ini/kayak gini".
4. Satu rulebook ringkas; riwayat SUPERSEDED dipindah ke arsip.
