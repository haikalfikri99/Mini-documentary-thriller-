# Prompt Google Flow — #016 Satu Baris Kosong di Kartu Keluarga Ini Jadi Rebutan

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/016 Kartu Keluarga Zonasi` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Baris kosong di Kartu Keluarga ini bisa nentuin kursi sekolah. | lembar KK generik (kode, FRAME 0 ≥ 486 px) + kursi_sekolah + anak_seragam; teks layar KURSI SEKOLAH ANAK (permintaan user: 'anak' wajib di visual) | AI + kode |
| Di jalur domisili sekolah negeri, alamat Kartu Keluarga ikut nentuin kursi. | gedung_sekolah + peta jarak (kode) | AI + kode |
| Biar nggak pindah dadakan, kartu ini wajib terbit minimal setahun… | kardus_pindahan + cap ≥ 1 TAHUN (kode) | AI + kode |
| Masalahnya, syarat setahun itu bikin alamat di kertas jadi barang buruan. | tangan_berebut (rebutan satu lembar kertas) | AI |
| Di Yogyakarta, Ombudsman pernah nemuin sebelas anak numpang di dua Kartu Keluarga. | tugu_jogja + petugas_berkas + dua KK 6+5 baris anak (kode) + label DATA INDONESIA · 2023 | AI + kode |
| Tahun ini, tiga laporan serupa terbukti. | tiga map bercap TERBUKTI (kode) + label 2026 | kode |
| Aturannya dibaca kaku. Karena sistem cuma ngecek data tertulis… | petugas_loket + garis jarak dipendekkan di peta (kode) | AI + kode |
| Baris kosong tadi sekarang diisi nama baru. | tangan_tulis + nama fiktif di baris KK (kode) | AI + kode |
| Bisa cucu yang tinggal sama neneknya… | nenek_cucu | AI |
| …bisa juga alamat pinjaman. Di atas kertas, keduanya kelihatan sama. | rumah_kunci + dua KK identik (kode) | AI + kode |

## Batch A
```
Create 11 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.

1. "kursi_sekolah" — aspect 1:1. A small wooden school desk with a matching wooden chair, a child's backpack hanging on the back of the chair, a pencil case on the desk; empty, nobody sitting.
2. "anak_seragam" — aspect 3:4. A young schoolboy about 8 years old seen from behind, full body, wearing a short-sleeved school uniform shirt, shorts, white socks and black shoes, a backpack on his back, walking toward a simple school gate; his face is not visible.
3. "gedung_sekolah" — aspect 4:3. A simple Indonesian public elementary school building: a single-storey row of classrooms with a tiled roof and wooden windows, a flagpole in a small yard in front, a low fence and an open gate; no people, no signs, no text.
4. "kardus_pindahan" — aspect 1:1. A stack of plain cardboard moving boxes taped shut, a rolled-up mattress tied with rope and a standing fan beside them; no labels or text.
5. "tangan_berebut" — aspect 4:3. Several adult hands reaching in from different sides and grabbing at the same single blank sheet of paper in the middle, tugging it; generic hands with five fingers.
6. "tugu_jogja" — aspect 3:4. The Tugu monument of Yogyakarta, Indonesia: a white obelisk-like monument on a stepped base with a pointed top, standing at a crossroads; no people, no text.
7. "petugas_berkas" — aspect 4:3. An Indonesian man about 50 in a long-sleeved batik shirt, waist-up, sitting at a desk piled with document folders, examining a blank form through a magnifying glass, serious face; no logos, no text.
8. "petugas_loket" — aspect 4:3. A registration counter seen from the applicant's side: an Indonesian man about 40 in a plain uniform shirt behind the counter, looking at a computer monitor with a blank screen while holding a blank paper form; no signs, no text.
9. "tangan_tulis" — aspect 1:1. Close-up of a right hand writing with a ballpoint pen on a blank paper form with empty table rows; the form has no text.
10. "nenek_cucu" — aspect 3:4. An elderly Indonesian grandmother in a simple long-sleeved kebaya-style blouse and batik sarong, seen from behind, walking hand in hand with a young schoolboy about 8 in a school uniform with a backpack, both seen from behind on a quiet village road; faces not visible.
11. "rumah_kunci" — aspect 4:3. A small empty Indonesian house with a closed front door and closed windows, a single door key hanging from the door lock; nobody around, no text.
Name each result with its label above.
```

## Tidak perlu generate
- Dibuat kode: lembar KK generik (data fiktif, tanpa NIK/nama asli/lambang resmi) dengan baris kosong; teks layar KURSI SEKOLAH ANAK; peta + lingkaran jarak; cap ≥ 1 TAHUN dan label Permendikdasmen 3/2025 (tanpa nomor pasal); dua KK 6 + 5 baris anak disorot; label DATA INDONESIA · 2023 dan 2026; tiga map bercap TERBUKTI; garis jarak dipendekkan; nama fiktif di baris; dua KK identik dipisah garis merah tipis.

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
