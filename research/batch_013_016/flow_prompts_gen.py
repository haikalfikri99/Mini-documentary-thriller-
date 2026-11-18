#!/usr/bin/env python3
"""Generator prompt Google Flow batch #013-#016 (data -> md per episode + JSON untuk halaman salin).
Satu sumber data supaya kalimat gaya identik di keempat episode (flow_prompt_template.md §Batch A/B).
Jalankan: python3 research/batch_009_012/flow_prompts_gen.py
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

STYLE = ("vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, "
         "plain pure-white background, a single isolated subject with clean edges so it can be cut out "
         "(no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn "
         "as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, "
         "no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), "
         "anatomically correct hands with five fingers, a grip that looks physically real.")
ANTI_POSE = ("COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference).")

EP = [
 dict(no="013", slug="biayalayanan", judul="Harga Awal Rp50 Ribu, Pas Checkout Jadi Rp58 Ribu",
  drive="013 Biaya Layanan Checkout", drive_id="1gAfRuaS9jBX3XpW5_x4Kzq5taI_g7xP8",
  chars={"BUYER_ID": "Indonesian man about 30, warm brown skin, short neat hair, plain collared shirt"},
  logic=[
   ("H1: Layar checkout aplikasi ini ngasih dua harga buat barang yang sama.", "hp_checkout (FRAME 0) + layar checkout Rp50.000 → Rp58.000 + cap DUA HARGA (kode)", "AI + kode"),
   ("Pas masukin ke keranjang, harganya kelihatan murah.", "tangan_keranjang + label Rp50.000", "AI + kode"),
   ("Eh, pas mau bayar, muncul baris kecil bernama biaya layanan…", "pembeli_kaget + baris BIAYA LAYANAN di layar (kode)", "AI + kode"),
   ("Tahun ini, lembaga konsumen sampai ngingetin…", "juru_bicara + kliping koran (kode) + label DATA INDONESIA · 2026", "AI + kode"),
   ("Masalahnya, efeknya bukan cuma di biaya tambahan itu.", "kaca_pembesar di atas baris biaya layanan", "AI + kode"),
   ("Peneliti di Amerika menguji jutaan pembeli tiket online.", "peneliti_laptop + kerumunan_hp + label EKSPERIMEN AS · 2015", "AI + kode"),
   ("Separuh… sejak awal. / Separuh lagi… pas mau bayar.", "kerumunan_hp dibelah dua + dua layar HP (kode)", "AI + kode"),
   ("Hasilnya jomplang. …seperlima lebih banyak dan beli tiket lebih mahal.", "stadion_kursi (baris depan disorot) + batang +⅕ (kode)", "AI + kode"),
   ("…otak kita udah terlanjur ngerasa cocok—biaya di akhir cuma dianggap selisih kecil.", "pembeli_senyum (Batch B, tokoh sama) + koin kecil tergelincir (kode)", "AI + kode"),
   ("Dua total di layar checkout tadi… ngunci pilihanmu…", "hp_checkout kembali + gembok", "AI + kode"),
  ],
  A=[
   ("hp_checkout", "3:4", "FRAME 0 HERO. Close-up of a right hand holding a generic modern smartphone upright and facing the viewer, the thumb resting at the bottom edge of the screen; the screen is completely blank white, no logo; phone and hand fill about 85% of the image width."),
   ("tangan_keranjang", "1:1", "Close-up of a hand dropping a small plain cardboard product box into a plastic shopping basket that already holds two plain boxes; no labels or text."),
   ("pembeli_kaget", "3:4", "BUYER_ID, waist-up, holding a smartphone with a blank screen close to his face, eyebrows raised and mouth slightly open in surprise, looking at the screen."),
   ("juru_bicara", "3:4", "An Indonesian man about 50, short grey hair, glasses, wearing a long-sleeved batik shirt, waist-up, speaking at a press conference behind a small table with three plain microphones, one hand raised in an open-palm explaining gesture; no logos, no banners, no text."),
   ("kaca_pembesar", "1:1", "A classic round magnifying glass with a wooden handle, lying at a slight angle, the lens empty and clear."),
   ("peneliti_laptop", "4:3", "An American man about 40 with short hair and a short beard, rolled-up shirt sleeves, waist-up, sitting at a desk and studying a laptop with a blank screen, a coffee mug and blank printouts beside him."),
   ("kerumunan_hp", "4:3", "A wide crowd of many small figures of adult men seen from slightly above, each one looking down at a smartphone in his hand, filling the whole width like a sea of people; generic faces."),
   ("stadion_kursi", "4:3", "Rows of empty stadium seats in a concert arena seen from the side, the front rows close to an empty stage at the left, the rows rising toward the back at the right; no people, no text."),
   ("gembok", "1:1", "A heavy old-fashioned closed padlock with its shackle locked, front view, with a small key lying beside it."),
  ],
  B=[
   ("pembeli_senyum", "3:4", "BUYER_ID", "The SAME BUYER_ID man as in the reference image (same face, same shirt), waist-up, smiling with relief and giving a thumbs-up with one hand while holding a smartphone with a blank screen in the other."),
  ],
  code="layar checkout di HP (harga keranjang Rp50.000, baris BIAYA LAYANAN, total Rp58.000; label ILUSTRASI kecil); cap DUA HARGA; kliping koran YLKI dibuat ulang tanpa logo media; label asal DATA INDONESIA · 2026 dan EKSPERIMEN AS · 2015; dua layar HP split (biaya di depan vs di akhir); batang +⅕ belanja; koin kecil 'selisih kecil'; tanpa strip sumber (sumber di deskripsi).",
  arsip="",
 ),
 dict(no="014", slug="ongkir", judul="Voucher Ongkir Rp0 Bikin Paket Retur Ikut Naik",
  drive="014 Voucher Ongkir Rp0", drive_id="1xi5GzgfphRm-N3DneBwzcYuDRz0xlhLM",
  chars={"COURIER_ID": "Indonesian man about 35, warm brown skin, short hair, plain jacket and a plain open-face helmet with no logo"},
  logic=[
   ("H1: Voucher ongkir nol rupiah ini matiin rem belanja di otakmu.", "hp_keranjang (FRAME 0) + stiker ONGKIR Rp0 (kode) + rem_tangan dilepas", "AI + kode"),
   ("Pas checkout, potongan ongkir kerasa kayak untung bersih.", "kurir_motor + label HEMAT (kode)", "AI + kode"),
   ("Paling cuma bikin orang lebih sering belanja.", "paket_tumpuk", "AI"),
   ("Masalahnya, efek aslinya beda. Toko online besar di Eropa… 760 ribu pelanggannya.", "gudang + kerumunan_pelanggan + label EKSPERIMEN EROPA · 2014", "AI + kode"),
   ("Separuh dapat gratis ongkir, separuh lagi bayar normal.", "kerumunan_pelanggan dibelah dua + kode GRATIS ONGKIR vs ONGKIR NORMAL (kode)", "AI + kode"),
   ("Anehnya, yang naik cuma barang berisiko… baju dan kosmetik", "baju_gantung + kosmetik membesar; barang_aman tetap (kode: panah naik/datar)", "AI + kode"),
   ("—dan paket retur ikut naik.", "paket_retur + cap RETUR", "AI + kode"),
   ("Ongkir itu sebenarnya rem alami…", "rem_tangan ditarik kembali", "AI"),
   ("…keranjang belanja berubah jadi ruang coba gratis.", "kamar_pas + stiker Rp0 di tirai (kode)", "AI + kode"),
  ],
  A=[
   ("hp_keranjang", "3:4", "FRAME 0 HERO. Close-up of a hand holding a generic modern smartphone upright and facing the viewer, the index finger about to tap the lower half of the screen; the screen is completely blank white, no logo; phone and hand fill about 85% of the image width."),
   ("rem_tangan", "1:1", "Close-up of a car handbrake lever between two front seats, a hand gripping it and releasing it downward."),
   ("kurir_motor", "4:3", "COURIER_ID riding a scooter-style motorcycle with a plain cardboard parcel box strapped on the back seat, side view, on a simple street; no logos, no text."),
   ("paket_tumpuk", "1:1", "A small pile of online-shopping delivery parcels: plain cardboard boxes and plastic mailer pouches stacked unevenly, sealed with tape, no labels or text."),
   ("gudang", "4:3", "A large warehouse interior with tall shelving racks full of plain cardboard boxes and a long conveyor belt carrying parcels in the foreground; no people, no signs, no text."),
   ("kerumunan_pelanggan", "4:3", "A wide crowd of many small figures of adult men in plain everyday clothes, seen from the front at a slight distance, standing shoulder to shoulder and filling the whole width; generic faces."),
   ("baju_gantung", "3:4", "A plain button-up shirt and a simple dress hanging on two wooden hangers from a clothes rail, fabric gently draped; no labels."),
   ("kosmetik", "1:1", "A small group of cosmetics standing together: a lipstick, a round compact powder case, a small bottle and a jar of cream, all completely plain with no labels."),
   ("barang_aman", "1:1", "A plain plastic storage box with a lid and a small round hand mirror leaning against it; no labels."),
   ("paket_retur", "1:1", "Close-up of two hands folding a plain shirt back into an open cardboard parcel box, a roll of packing tape beside it."),
   ("kamar_pas", "3:4", "A clothing store fitting room seen from the front: a curtain pulled open on its rail, a stool and a few shirts on hangers on a wall hook inside; nobody inside, no text."),
  ],
  B=[],
  code="layar keranjang + stiker ONGKIR Rp0; label HEMAT; label EKSPERIMEN EROPA · 2014 dan 760.395 PELANGGAN; kode GRATIS ONGKIR vs ONGKIR NORMAL; panah naik pada baju/kosmetik, datar pada barang_aman; cap RETUR; label DATA INDONESIA hanya untuk voucher generik; tanpa strip sumber.",
  arsip="",
 ),
 dict(no="015", slug="terlaris", judul="Satu Tanda Best Seller Ini Mengubah Isi Pesananmu",
  drive="015 Best Seller Menu", drive_id="1ddg57rIg8WJaoFldAVv8ICyeNxBVgE5G",
  chars={"DINER_ID": "Indonesian man about 28, warm brown skin, short wavy hair, plain round-neck t-shirt"},
  logic=[
   ("H1: Satu tanda kecil di buku menu ini diam-diam ngarahin pesananmu.", "buku_menu (FRAME 0) + lencana BEST SELLER menyala (kode, diwarnai)", "AI + kode"),
   ("Pas bingung milih makanan di restoran atau kafe…", "pengunjung_bingung", "AI"),
   ("…mata kita otomatis ngelirik label Best Seller. Rasanya kayak jalan pintas…", "buku_menu + panah jalan pintas ke lencana (kode)", "AI + kode"),
   ("…peneliti menguji daftar best seller di jaringan restoran Beijing.", "restoran_beijing + label EKSPERIMEN BEIJING · 2006", "AI + kode"),
   ("Sebagian pengunjung… lima menu best seller… / Pengunjung lain… lima menu contoh", "plakat_meja ×2: kiri 1–5 bernomor, kanan tanpa nomor (kode)", "AI + kode"),
   ("Hasilnya timpang. …naik 13 sampai 20 persen… nyaris nggak ngaruh.", "pelayan_catat + batang +13–20% vs ≈0 (kode)", "AI + kode"),
   ("Anehnya lagi, tamu… ngaku lebih puas.", "tamu_puas", "AI"),
   ("Otak kita memang malas menilai rasa dari nol… nebeng pilihan orang banyak", "tangan_menunjuk + stempel JAMINAN ENAK (kode)", "AI + kode"),
   ("Menu best seller terakhir yang kamu pesan…?", "pengunjung_tunjuk (Batch B, tokoh sama) + buku_menu", "AI + kode"),
  ],
  A=[
   ("buku_menu", "4:3", "FRAME 0 HERO. An open restaurant menu book lying flat and facing the viewer, two facing pages each with neat empty rows for dishes and small empty frames for food pictures, a ribbon bookmark; all pages completely blank with no text; the menu fills about 85% of the image width."),
   ("pengunjung_bingung", "3:4", "DINER_ID sitting at a small cafe table, waist-up, holding an open menu with both hands, frowning slightly and undecided, a glass of iced tea on the table."),
   ("restoran_beijing", "4:3", "A traditional Chinese restaurant dining room: round tables with lazy susans and chopsticks, paper lanterns hanging from the ceiling, a few diners eating in the background; no signs, no text."),
   ("plakat_meja", "1:1", "A small blank tent card standing on a round restaurant table next to a teapot and a pair of chopsticks; the card is completely empty with no text."),
   ("pelayan_catat", "3:4", "A Chinese restaurant waiter, a man about 40 in a plain white shirt and dark vest, waist-up, writing an order on a small blank notepad with a pen."),
   ("tamu_puas", "3:4", "A Chinese man about 45 in a plain shirt sitting at a round restaurant table, waist-up, holding chopsticks over a bowl of noodles and giving a thumbs-up with the other hand, satisfied smile."),
   ("tangan_menunjuk", "4:3", "Many hands from different sides reaching in and pointing at the same single plate of food in the middle of a table; generic hands with five fingers."),
  ],
  B=[
   ("pengunjung_tunjuk", "3:4", "DINER_ID", "The SAME DINER_ID man as in the reference image (same face, same t-shirt), waist-up, at a cafe table, his index finger resting on one item of an open menu, pausing with a thoughtful half-smile as if second-guessing his choice."),
  ],
  code="lencana BEST SELLER (diwarnai merah-emas di kode) + baris menu di buku_menu; panah jalan pintas; label EKSPERIMEN BEIJING · 2006; dua plakat: lima menu bernomor 1–5 vs lima menu contoh tanpa nomor (teks Bahasa Indonesia); batang +13–20% vs ≈0; stempel JAMINAN ENAK; tanpa strip sumber.",
  arsip="",
 ),
 dict(no="016", slug="zonasi", judul="Satu Baris Kosong di Kartu Keluarga Ini Jadi Rebutan",
  drive="016 Kartu Keluarga Zonasi", drive_id="1EugIrWCFmyqqdV2KHTyAOwD9-C3p5AM6",
  chars={},
  logic=[
   ("H1: Baris kosong di Kartu Keluarga ini bisa nentuin kursi sekolah.", "lembar KK generik (kode, FRAME 0 ≥ 486 px) + kursi_sekolah + anak_seragam; teks layar KURSI SEKOLAH ANAK (permintaan user: 'anak' wajib di visual)", "AI + kode"),
   ("Di jalur domisili sekolah negeri, alamat Kartu Keluarga ikut nentuin kursi.", "gedung_sekolah + peta jarak (kode)", "AI + kode"),
   ("Biar nggak pindah dadakan, kartu ini wajib terbit minimal setahun…", "kardus_pindahan + cap ≥ 1 TAHUN (kode)", "AI + kode"),
   ("Masalahnya, syarat setahun itu bikin alamat di kertas jadi barang buruan.", "tangan_berebut (rebutan satu lembar kertas)", "AI"),
   ("Di Yogyakarta, Ombudsman pernah nemuin sebelas anak numpang di dua Kartu Keluarga.", "tugu_jogja + petugas_berkas + dua KK 6+5 baris anak (kode) + label DATA INDONESIA · 2023", "AI + kode"),
   ("Tahun ini, tiga laporan serupa terbukti.", "tiga map bercap TERBUKTI (kode) + label 2026", "kode"),
   ("Aturannya dibaca kaku. Karena sistem cuma ngecek data tertulis…", "petugas_loket + garis jarak dipendekkan di peta (kode)", "AI + kode"),
   ("Baris kosong tadi sekarang diisi nama baru.", "tangan_tulis + nama fiktif di baris KK (kode)", "AI + kode"),
   ("Bisa cucu yang tinggal sama neneknya…", "nenek_cucu", "AI"),
   ("…bisa juga alamat pinjaman. Di atas kertas, keduanya kelihatan sama.", "rumah_kunci + dua KK identik (kode)", "AI + kode"),
  ],
  A=[
   ("kursi_sekolah", "1:1", "A small wooden school desk with a matching wooden chair, a child's backpack hanging on the back of the chair, a pencil case on the desk; empty, nobody sitting."),
   ("anak_seragam", "3:4", "A young schoolboy about 8 years old seen from behind, full body, wearing a short-sleeved school uniform shirt, shorts, white socks and black shoes, a backpack on his back, walking toward a simple school gate; his face is not visible."),
   ("gedung_sekolah", "4:3", "A simple Indonesian public elementary school building: a single-storey row of classrooms with a tiled roof and wooden windows, a flagpole in a small yard in front, a low fence and an open gate; no people, no signs, no text."),
   ("kardus_pindahan", "1:1", "A stack of plain cardboard moving boxes taped shut, a rolled-up mattress tied with rope and a standing fan beside them; no labels or text."),
   ("tangan_berebut", "4:3", "Several adult hands reaching in from different sides and grabbing at the same single blank sheet of paper in the middle, tugging it; generic hands with five fingers."),
   ("tugu_jogja", "3:4", "The Tugu monument of Yogyakarta, Indonesia: a white obelisk-like monument on a stepped base with a pointed top, standing at a crossroads; no people, no text."),
   ("petugas_berkas", "4:3", "An Indonesian man about 50 in a long-sleeved batik shirt, waist-up, sitting at a desk piled with document folders, examining a blank form through a magnifying glass, serious face; no logos, no text."),
   ("petugas_loket", "4:3", "A registration counter seen from the applicant's side: an Indonesian man about 40 in a plain uniform shirt behind the counter, looking at a computer monitor with a blank screen while holding a blank paper form; no signs, no text."),
   ("tangan_tulis", "1:1", "Close-up of a right hand writing with a ballpoint pen on a blank paper form with empty table rows; the form has no text."),
   ("nenek_cucu", "3:4", "An elderly Indonesian grandmother in a simple long-sleeved kebaya-style blouse and batik sarong, seen from behind, walking hand in hand with a young schoolboy about 8 in a school uniform with a backpack, both seen from behind on a quiet village road; faces not visible."),
   ("rumah_kunci", "4:3", "A small empty Indonesian house with a closed front door and closed windows, a single door key hanging from the door lock; nobody around, no text."),
  ],
  B=[],
  code="lembar KK generik (data fiktif, tanpa NIK/nama asli/lambang resmi) dengan baris kosong; teks layar KURSI SEKOLAH ANAK; peta + lingkaran jarak; cap ≥ 1 TAHUN dan label Permendikdasmen 3/2025 (tanpa nomor pasal); dua KK 6 + 5 baris anak disorot; label DATA INDONESIA · 2023 dan 2026; tiga map bercap TERBUKTI; garis jarak dipendekkan; nama fiktif di baris; dua KK identik dipisah garis merah tipis.",
  arsip="",
 ),
]



def chars_block(chars, names):
    sel = [(k, v) for k, v in chars.items() if k in names]
    if not sel:
        return ""
    return "Recurring characters, always drawn exactly like this:\n" + "\n".join(f"- {k}: {v}" for k, v in sel) + "\n"


def batch_a(e):
    names = {k for k in e["chars"] if any(k in p for _, _, p in e["A"])}
    lines = [f"Create {len(e['A'])} separate images, each as its own generation (not one combined image), 1 variation each.",
             f"All images must share exactly the same style: {STYLE}", chars_block(e["chars"], names).rstrip()]
    for i, (lab, ar, p) in enumerate(e["A"], 1):
        if i == 1:
            lines.append("")
        lines.append(f'{i}. "{lab}" — aspect {ar}. {p}')
    lines.append("Name each result with its label above.")
    return "\n".join(l for l in lines if l is not None).replace("\n\n\n", "\n\n")


def batch_b_one(e, item):
    lab, ar, ch, p = item
    return "\n".join([
        "Create 1 image, 1 variation.",
        f"Style: {STYLE}",
        chars_block(e["chars"], {ch}).rstrip(),
        "",
        f'1. "{lab}" — aspect {ar}. {p} {ANTI_POSE}',
        "Name the result with its label above."])


def single(e, lab, ar, p, ch=None):
    extra = ""
    if ch:
        extra = f" {ch} = {e['chars'][ch]}."
    return f'"{lab}" — aspect {ar}. Style: {STYLE}{extra} Subject: {p}'


def build():
    out = []
    for e in EP:
        a_singles = []
        for lab, ar, p in e["A"]:
            ch = next((k for k in e["chars"] if k in p), None)
            a_singles.append(dict(label=lab, aspect=ar, prompt=single(e, lab, ar, p, ch)))
        b = []
        for item in e["B"]:
            lab, ar, ch, p = item
            b.append(dict(label=lab, aspect=ar, ingredient=next(l for l, _, pp in e["A"] if ch in pp),
                          block=batch_b_one(e, item),
                          prompt=single(e, lab, ar, p + " " + ANTI_POSE, ch)))
        rec = dict(no=e["no"], slug=e["slug"], judul=e["judul"], drive=e["drive"], drive_id=e["drive_id"],
                   logic=e["logic"], batchA=batch_a(e), singlesA=a_singles, B=b, code=e["code"], arsip=e["arsip"])
        out.append(rec)
        # md per episode
        md = [f"# Prompt Google Flow — #{e['no']} {e['judul']}", "",
              "Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.",
              f"Folder Drive: `Mini Thriller IDN/{e['drive']}` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.",
              "Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.", "",
              "## Logika visual (kalimat VO → gambar)", "| Kalimat VO | Gambar | Sumber |", "|---|---|---|"]
        md += [f"| {a} | {b_} | {c} |" for a, b_, c in e["logic"]]
        md += ["", "## Batch A", "```", rec["batchA"], "```"]
        for x in b:
            md += ["", f"## Batch B — chat/proyek baru, ingredient: `{x['ingredient']}`", "```", x["block"], "```"]
        md += ["", "## Tidak perlu generate", f"- Dibuat kode: {e['code']}"]
        if e["arsip"]:
            md.append(f"- Arsip: {e['arsip']}")
        md += ["", "## Saat memilih hasil",
               "Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.", ""]
        p = ROOT / "stories" / e["slug"] / "kolase" / "flow_prompts.md"
        p.write_text("\n".join(md), encoding="utf-8")
    (ROOT / "research" / "batch_013_016" / "flow_prompts.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    return out


if __name__ == "__main__":
    o = build()
    for r in o:
        print(r["no"], len(r["singlesA"]), "A +", len(r["B"]), "B")
