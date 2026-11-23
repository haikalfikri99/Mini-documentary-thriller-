# Arsip riwayat: 3-audio.md baris 62-73
Asal: `.claude/skills/arsip-kasus/references/3-audio.md` (rentang di bawah memakai nomor baris SEBELUM edit W3). Tanggal pemindahan: 23 Nov 2026. Alasan: log mentah pelajaran #004 + butir "2 take" (superseded v7.0 brief #4); aturan aktif dipertahankan ringkas di tempat asal
Teks asli dipindah apa adanya (tanpa perubahan); aturan aktif yang tersisa ada di berkas asal.

---
## Asal baris 62-73

## H. Pelajaran #004 (gerbang Whisper)
- Gerbang `mix ≥ VO` bisa gagal 1–2 kata tanpa ada kata yang tertutup: #004 tetap 119/142 saat musik −70 dB dan foley ×0,001, sedangkan `vo_level.wav` 121/142. Penyebabnya normalisasi level VO di `Mixer`, bukan masking. **Diagnosis wajib sebelum mengubah mix:** ulang mix dengan musik dibisukan, lalu dengan foley dibisukan. Bila keduanya tetap gagal dan margin per kata lulus (tidak ada < 8 dB), render boleh lanjut dan angka apa adanya ditulis di UPLOAD.md.
- Pukulan musik pada stempel yang jatuh di awal kata ("didenda"): timpani boleh di stempel, tuba/glock ditaruh **sesudah** kata. `fullmix.py`: pukulan yang mendarat ≤ 0,2 dtk sebelum kata juga dianggap "di dalam kata" (hanya badan < 200 Hz).

## I. Tempo & pengucapan VO: pelajaran #004 (14 Nov)
- Take ElevenLabs asli Saos Cocol ±2,25 kata/dtk (setara #002 yang gagal) → proses ringan: rapatkan jeda (hook 0,35→0,18 dtk; jeda dramatis boleh dipertahankan ≤ 0,28 dtk), atempo ±1,12, nada tetap. 2,8 kata/dtk **terasa ngebut** bagi user: rata-rata 2,80 bercampur talking head (Ngomongin Uang 3,10); pembanding narasi = Kok Bisa 2,66 dan Kamus Unik 2,63 → **pakai 2,66**.
- Suara yang aslinya pelan lalu dipercepat terdengar lebih terburu-buru daripada suara yang cepat sejak awal. Untuk episode berikutnya minta di ElevenLabs sejak awal: **speed ±1,1 (bila ada) atau gaya lebih bertenaga**, lalu proses tipis.
- Uji di kanal sendiri: bandingkan stayed-to-watch antar episode dengan tempo berbeda (hook sejenis), riset luar hanya titik awal.
- Cek pengucapan saat user mendengarkan: "KPPU" per huruf (ka-pe-pe-u), "tiga belas koma delapan miliar" (bukan "tiga belas delapan"), nama merek asing ("Le Minerale"), istilah Inggris di layar boleh asing. Kalimat pertama selesai ≤ 2,2 dtk, tanpa jeda di 3 dtk pertama, suara mulai di detik 0.
- **Generate lewat konektor ElevenLabs (sejak 15 Nov 2026, paket Starter user):** kredit ±1 per karakter prompt per versi; `generations_count` = n versi = n× kredit (sama di aplikasi: satu klik 2 versi = 2× kredit). Default hemat: **1 versi per episode**, cek Whisper (small; kata yang dicurigai dicek ulang dengan medium pada potongan audio), generate ulang hanya episode yang gagal, setelah melapor. Selalu `estimate_only` dulu bila belum tahu biayanya. eleven_v4 tidak punya parameter speed (hanya stability/similarity; biarkan default), jadi tempo dirapatkan di `vo_chain.py`. Batch #005–#008: 4.089 kredit, mentah 2,23–2,50 kata/dtk.
- Pengaturan ElevenLabs yang diberikan ke user: suara Saos Cocol, `eleven_v4`, 2 take, MP3, stability Natural bila ada (saran, belum teruji); tag kurung siku di titik perubahan emosi; user menaruh `raw_take1/2.mp3` di Drive atau mengunggah ke chat.

