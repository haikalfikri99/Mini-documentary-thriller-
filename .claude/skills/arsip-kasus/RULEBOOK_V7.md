# RULEBOOK V7 — peta hulu-ke-hilir + aturan keras (dibuat 23 Nov 2026)
**Cara pakai:** baca ini, lalu buka HANYA dokumen tahap yang sedang kamu kerjakan. Sumber kebenaran aturan: `AGENTS.md` §2/§2A + `references/1-cerita…` §M9 + `references/8-hook…` §J/§K. Rulebook ini = ringkasan + peta; bila beda dengan sumber, sumber menang dan laporkan bedanya. Dasar riset tiap aturan: `research/deep_research/MATRIKS_JEJAK.md` (dokumen asli di folder yang sama). Teks lama yang dikalahkan: `arsip-riwayat/INDEKS.md`.

## 0. Prinsip user (tidak diperdebatkan ulang)
1. Hanya topik yang kuat; bila ragu jangan jadi video. 2. Fakta akurat TAPI penyampaian dramatis ala thriller investigatif (taruhan, ketegangan, pembongkaran bertahap, The Turn); drama = teknik, bukan karangan fakta. 3. Jelaskan topik dengan CERITA sekilas + alasan ditonton; jangan hanya judul dan sumber. 4. Jangan bertanya berulang; bertanya hanya untuk keputusan milik user (kunci batch, buang topik, kredit berbayar, hal tak jelas). 5. User tidak mengganti model/effort: Claude memilih `model` + `effort` tiap subagen (Haiku/low mekanis · Sonnet/medium riset · Opus/high skrip final, review, keputusan kreatif). 6. Dasar riset tidak boleh hilang; teks usang dipindah ke arsip, bukan dihapus.

## 1. Identitas & Garis Merah (`AGENTS.md` §2/§2A)
Mini Thriller IDN / ARSIP KASUS: investigasi forensik atas sistem, uang, desain harga, kebijakan, anomali perilaku di keseharian warga Indonesia 20–45 tahun (hidup/waktu/kesehatan/rumah/kerja, bukan dompet saja). **Garis Merah:** tanpa self-help/tips/nasihat menggurui; tanpa bantahan mitos datar atau bacaan pasal tanpa konflik + The Turn; tanpa trivia basi; tanpa meta-YouTube. **2 Mesin:** A ≈ 60% (A1 skandal/kartel/celah aturan · A2 produk/kebijakan bumerang), B ≈ 40% (B3 jebakan harga/kontrak/arsitektur pilihan · B4 anomali perilaku teruji); batch 4 = A 2–3 + B 1–2.

## 2. Riset topik → `references/9-playbook-riset-batch.md`, `research/niche/*`
Keras: 6 kandidat → verifikasi → 4 terkunci; Topic Stress-Test 4 uji (anti-stale per SUDUT, dekat hidup 20–45, 3 Pilar Konflik, Vox Handle); rubrik 20 poin ≥ 16 tanpa nilai ≤ 2 + gerbang Lokal ≥ 4 / Cerita ≥ 3 / Celah ≥ 3; monetisasi = pembeda, BUKAN gerbang; kesegaran = catatan `[SEGAR]`, BUKAN gerbang; Fact Sheet 2 Lapis (≥ 2 sumber lokal + 1 primer, atau "primer tidak terbaca → ucapkan 'menurut …'"). Uji kejenuhan: `kit/tools/riset_topik.py` (pelengkap). Presentasi topik: judul draf, cerita, kenapa ditonton, mesin+artinya, kelemahan ⚠, tingkat keyakinan.

## 3. Judul & hook → `8-hook…` §G, §J, §K; riset: `RISET_JUDUL.md`, SOP Tahap 5
Judul ≤ 55 karakter (ideal 38–48) dengan benda/merek/angka uang/kontradiksi. **Dilarang di judul DAN kalimat pembuka (0–4 dtk):** psikologi, bias, kenapa, padahal, tapi, ternyata, "?" (pengecualian: 1 `[SLOT-UJI]` per batch). H1 ≤ 14 kata dan selesai ≤ 4,0 dtk (praktis ±9–11 kata). **Bentuk dipilih LEBIH DULU dari menu §K** (hasil angka, kontras angka, tokoh+angka, peristiwa, artefak tanpa penjelasan, dua kondisi kembar, ancaman tak disadari, intuisi dibantah, sapaan "kamu", kalimat bersyarat): tulis ≥ 10 varian, nilai (rasa ingin tahu, cocok cerita, tersambung ke Frame 0 lewat visual, akurasi, tarikan ke kalimat 2), pilih satu, BARU pasang label arketipe. Arketipe = jenis informasi: K1 Bom di Bawah Meja · K2 Ketidaknyamanan Kontra-Intuitif · K3 Bukti Visual Mendahului Konteks · K4 Celah Ujung Lidah · K5 Titik Balik Hasil Ekstrem. Kata tunjuk "ini/kayak gini" TIDAK wajib; maks 1 dari 4 episode batch dibuka "[benda] ini …" (linter ERROR). Arketipe tidak sama pada 2 episode berurutan.

## 4. Dramaturgi thriller → `1-cerita…` §F3, §M2, §M8; riset: `RISET_STRUKTUR_SCRIPT.md`, SOP T1/T3
Antagonis tak kasatmata (sistem) + taruhan nyata + The Turn. Tangga bukti naik tiap 12–15 dtk (Asumsi → Jangkar Lokal → Dokumen/Eksperimen Kontrol → Pembalikan). Turn: Investigasi ≤ detik ~34, Ringkas ≈ detik 22–28; Prestige di 75–90%. Segmen 2B membongkar mekanisme (Penn & Teller). Conceptual Loop: satu detail Frame 0 yang maknanya terungkap di ±6 dtk terakhir.

## 5. Narasi lisan Indonesia → `1-cerita…` §F5, §M3, §M9; riset: `RISET_VO_TEMPO.md`, SOP T3/T4
Lisan alami (nggak, bikin, aja, kalo), bukan baku kaku. Kalimat ideal 8–13 kata (WARN > 17); satu tarikan napas; hindari 3+ kalimat staccato. ABT: perekat tetapi/anehnya/masalahnya/akibatnya/karena itu; "tapi/padahal" SAH di body (jangan monoton, maks wajar 3); "bukan X, tapi Y" maks 1 per skrip. Zero-citation: tanpa sitasi akademik; atribusi LEMBAGA sekali untuk klaim sensitif dianjurkan. Penekanan 2-3-1 (kata tajam di ujung kalimat); tanpa "kala kini palsu" untuk peristiwa arsip; sapu nominalisasi/pasif (scorecard #23b). Dua mode: **Ringkas** 35–42 dtk/85–105 kata · **Investigasi** 48–55 dtk/115–135 kata, selang-seling dalam batch; anggaran per segmen di §M9.8 (⚠ hipotesis).

## 6. Penutup → `1-cerita…` §M5, §M7
6 dtk terakhir, zero-CTA, ekor audio ≤ 0,15 dtk. 5 arketipe (Reframing Sistemik · Cermin Personal · Dilema Abu-Abu · Lingkar Naratif Mulus [khusus Ringkas] · Pemicu Dunia Nyata), tanpa default, tidak sama pada 2 episode berurutan. Kalimat penutup tidak diawali: Jadi, Kesimpulannya, Pada akhirnya, Nah itulah, Intinya, Lain kali, Kalau/Kalo kamu, Ingat ya.

## 7. Deliverable & penanda → `1-cerita…` §M4; `kit/tools/new_episode.sh`
Metadata + Fact Sheet 2 Lapis + Skrip AV 2 kolom (visual | VO + notasi `/` ≈ 0,25 dtk, `//` 0,5–0,8 dtk, KAPITAL = penekanan). README memuat `[HOOK] [ENDING] [MESIN] [LATAR] [MODE] [ARTEFAK] [LOOP] [LABEL]` (`[SEGAR]` opsional). `script_vo.txt` = VO bersih; `vo_prompt_elevenlabs.md` = VO bertag. Latar `[LATAR]` tidak sama 3 episode berturut.

## 8. Visual → `references/2-visual…` §A, §H–§J, §M–§O; riset: `RISET_VISUAL_THUMBNAIL.md`
Gaya ARSIP Kolase (gaya lama dihapus). Frame 0 = benda hero ≥ 45% lebar, stempel ≤ 0,25 dtk, ditunjuk lewat VISUAL. Potongan ≤ 1 dtk, shot 1,5–3 dtk, tahan hero 3–4 dtk di klimaks. Gambar: arsip asli dulu (Openverse → Wikimedia), AI boleh bila perlu; tanpa video AI/stock; lisensi di `SOURCES.jsonl`. Google Flow: 1 variasi/gambar. QA: `kit/tools/check_visual.mjs`.

## 9. Audio/VO → `references/3-audio…` §K (standar tunggal), §I, §J; riset: `RISET_VO_TEMPO.md`
VO via konektor ElevenLabs, **1 take**, ulang hanya setelah user setuju; tanya sebelum memakai kredit. Tempo 2,50–2,66 kata/dtk, atempo ≤ 1,10. QA: `kit/audio/check_audio.py` + gerbang Whisper.

## 10. Upload → `references/5-upload…` §A–§G; riset: `RISET_AUDIO_CAPTION_META.md`, `RISET_META_UPLOAD.csv`
Judul, deskripsi, hashtag, label konten sintetis, komentar pin (pengalaman pribadi), `UPLOAD.md`; rencana Test & Compare/takarir Inggris (long-form) di §G ⚠.

## 11. Monetisasi → `research/niche/KEPUTUSAN_RISET.md` v6.0-D/E, `ANALISIS_PASAR_2026-11.md`, Strategi Kanal bab 6
Shorts = pemanen subscriber; uang di long-form 8–15 mnt + afiliasi. SEMUA angka (RPM ±US$0,012 AIR vs ±0,14 Dynamoi; YPP s.d. 31 Jan 2027 vs mulai 1 Feb 2027; Shopping Affiliate 500 sub) berlabel ⚠ sampai diverifikasi ke YouTube Help; jangan jadi dasar uang. Frekuensi unggah: ⚠ KEPUTUSAN USER TERTUNDA.

## 12. Gerbang otomatis (jalankan sebelum VO)
`python3 kit/tools/lint_episode.py <slug>` dan `--batch <s1> <s2> <s3> <s4>` (urutan tayang) = 0 error; `python3 kit/tools/test_lint_episode.py` (unittest) hijau; `--log <slug…>` setelah skrip terkunci. Linter mengecek: judul/pembuka terlarang, penanda, ABT, jumlah kata vs mode, penutup, rotasi hook/penutup/mode/latar, porsi Mesin A, bentuk pembuka "ini" per batch, upload.

## 13. Peta riset → aturan (dokumen asli: `research/deep_research/`)
SOP Naskah → §3–§6 · Strategi Kanal bab 1–4 → §3–§5 dan algoritma (`1-cerita` §E), bab 6 → §11 (bab 5 bank topik psikologi DIGANTIKAN 2 Mesin) · Spesifikasi v5.0/Prompt v6.0 → §7–§10 · Konteks v7.0 → §1–§3 · Analisis Pasar → §2, §11.

## 14. Changelog resolusi bentrok (23 Nov 2026; v7.0 menang)
Kata tunjuk tidak wajib · "tapi/padahal" boleh di body · standar VO tunggal (1 take, 2,50–2,66, atempo ≤ 1,10, `//` 0,5–0,8) · kesegaran = catatan · monetisasi = pembeda · selang-seling Ringkas/Investigasi · model/effort dipilih Claude · Kompas v6.1/3 Mesin → SUPERSEDED · scorecard 23 cek (F6 + §M6 + #23/#23b) · angka RPM/YPP seragam ⚠. Belum diputuskan user: lihat bagian terakhir `MATRIKS_JEJAK.md`.
