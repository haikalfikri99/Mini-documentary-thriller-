# VO #009 — paket generate (BELUM DIGENERATE; menunggu keputusan user soal 5 koreksi fakta di README)
**Suara:** Saos Cocol `R86jddkroI9bJwXFfjsr` · **Model:** `eleven_v4` · **1 take** (generations_count 1) · memakai kredit user.
**Teks yang dikirim ke ElevenLabs:** `script_vo.txt` (versi terkunci user) ATAU `script_vo_usulan_patch.txt` (versi dengan 5 koreksi fakta). Tag di bawah ditambahkan hanya di titik perubahan emosi; kata-kata tidak diubah.
## Pelafalan
- "A&W" → dibaca "A en Dabel-yu" (Indonesia: ei en dabel-yu). Di VO tulis: `A and W` agar terbaca jelas; ejaan caption tetap "A&W" (alignment memakai script_vo.txt).
- "McDonald's" → "Mekdonal"; tulis `McDonald's` bila model membacanya benar, bila tidak pakai `Mekdonal`. "pound" → "paun".
- Angka diucap penuh (sudah dalam kata). Tanda "—" = jeda napas pendek, bukan hening.
## Teks bertag (versi terkunci)
[curious] Burger ini lebih tebal dan lebih murah—tapi justru gagal total.
[warmly] Tahun delapan puluhan, A and W merilis burger sepertiga paun untuk menantang seperempat paun Mekdonal. Harganya lebih miring. Dalam tes rasa tertutup, mayoritas orang juga memilih burger ini lebih enak.
[mysteriously] Anehnya, begitu dijual, angkanya malah ambruk. Perusahaan pun menyewa peneliti untuk mewawancarai pembeli. Jawabannya bikin geleng kepala. [serious] Lebih dari separuh orang mengira sepertiga lebih kecil dari seperempat.
[pause][slowly] Bukan karena mereka bodoh. Otak kita memang malas menghitung pecahan. Begitu melihat angka tiga melawan empat, otak langsung menganggap tiga pasti lebih sedikit.
[warmly] Lain kali kamu membandingkan ukuran atau promo pecahan di label harga, cek ulang angkanya—otakmu bisa terkecoh sebelum sempat menghitung.
Catatan: `[pause]` hening ≈ 0,5–0,6 dtk sebelum "Bukan karena mereka bodoh" (tahan di post-proses `vo_tighten.py`; jeda dramatis jangan dirapatkan). Ekor audio akhir ≤ 0,15 dtk (`vo_tail.py`).
