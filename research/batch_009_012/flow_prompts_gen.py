#!/usr/bin/env python3
"""Generator prompt Google Flow batch #009-#012 (data -> md per episode + JSON untuk halaman salin).
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
 dict(no="009", slug="burger", judul="Burger Lebih Besar dan Lebih Enak Ini Gagal Gara-Gara Angka",
  drive="009 Burger Sepertiga Pound", drive_id="1qkjvKs6hZa_DLL7WcUKwQqWVLy8BRT1M",
  chars={},
  logic=[
   ("H1: Burger ini lebih tebal, harganya sama—tapi justru nggak laku.", "burger_tebal + dua label harga identik + cap GAK LAKU", "AI + kode"),
   ("Tahun 80-an A&W merilis burger sepertiga pound… seperempat pound McDonald's", "burger_dua + strip 1/3 POUND · A&W | 1/4 POUND · McDONALD'S", "AI + kode"),
   ("Harganya dipatok sama.", "dua label harga identik meluncur dari samping", "kode"),
   ("Dalam tes rasa tertutup, mayoritas… lebih enak", "pencicip (mata ditutup kain) + centang", "AI + kode"),
   ("Begitu dijual, angkanya malah ambruk", "kasir_sepi + grafik merah menukik", "AI + kode"),
   ("Perusahaan menyewa peneliti untuk mewawancarai pembeli", "peneliti_80an", "AI"),
   ("Lebih dari separuh orang mengira sepertiga lebih kecil dari seperempat", "pembeli_bingung + slip 1/3 < 1/4 ? (stabilo)", "AI + kode"),
   ("[hening] Bukan karena mereka bodoh. Otak kita malas menghitung pecahan", "tangan_pensil di atas kertas kosong", "AI"),
   ("…angka tiga melawan empat… tiga pasti lebih sedikit", "angka 3 vs 4 besar, sorotan merah", "kode"),
   ("Lain kali, kalo kamu bandingin… label harga", "rak_label + sorotan kuning pada pecahan", "AI + kode"),
  ],
  A=[
   ("burger_tebal", "4:3", "FRAME 0 HERO. A generic thick hamburger seen from the side at eye level: a tall sesame-seed bun, a very thick beef patty, lettuce, tomato and cheese, slightly tilted; the burger fills about 85% of the image width."),
   ("burger_dua", "4:3", "Two generic hamburgers side by side on a plain counter, each half-wrapped in plain paper: the left one has a noticeably thicker patty than the right one; otherwise identical buns; no text on the wrappers."),
   ("pencicip", "3:4", "A man about 30 with short hair and a plain t-shirt, waist-up, a cloth blindfold over his eyes, taking a bite of a hamburger held in both hands, pleased expression (a blind taste test)."),
   ("kasir_sepi", "1:1", "An empty 1980s fast-food restaurant counter seen from the customer side: a cash register, a stack of paper trays and a menu board above that is completely blank; nobody in line."),
   ("peneliti_80an", "3:4", "A man about 45, short side-parted hair, thick-framed 1980s glasses, wide-lapel suit and wide tie, waist-up, holding a pen over a blank notepad as if interviewing someone, attentive face."),
   ("pembeli_bingung", "3:4", "A man about 35 with short curly hair, a mustache and a 1980s windbreaker jacket, waist-up, scratching his head with one hand and holding a small blank card in the other, puzzled face."),
   ("tangan_pensil", "1:1", "Close-up of a right hand holding a pencil just above a blank sheet of paper, as if about to write a calculation; the paper is completely empty."),
   ("rak_label", "4:3", "A supermarket shelf section with rows of plain boxes and jars without labels, each row with a small blank price tag strip on the shelf edge; slight perspective."),
  ],
  B=[],
  code="cap GAK LAKU; dua label harga identik; strip 1/3 POUND · A&W dan 1/4 POUND · McDONALD'S (ketik, tanpa logo); centang tes rasa; grafik penjualan merah menukik; slip 1/3 < 1/4 ? (stabilo); angka 3 vs 4; sorotan kuning pecahan di label rak; strip sumber di akhir (Culinary Lore / A&W, 2021).",
  arsip="",
 ),
 dict(no="010", slug="kantong", judul="Kantong Plastik Ini Mendadak Ditolak Gara-Gara Rp200",
  drive="010 Kantong Plastik Rp200", drive_id="1PtBWmpfQ5ECt69Y4zpjDuJumYIxjPsOV",
  chars={"SHOPPER_US": "American man about 40, short beard, plain flannel shirt, plain baseball cap with no logo"},
  logic=[
   ("H1: Kantong plastik ini cuma dua ratus perak—tapi banyak pembeli menolaknya.", "kantong_hero + label Rp200 + cap DITOLAK", "AI + kode"),
   ("Tahun 2016, di puluhan kota, kantong plastik minimarket nggak lagi gratis", "kasir_kantong + kata GRATIS dicoret merah + strip 2016", "AI + kode"),
   ("Harganya dua ratus rupiah—recehan yang biasanya diganti permen", "koin_permen (nada lucu)", "AI"),
   ("Sejak itu, cuma dalam tiga bulan… turun sampai 30%", "grafik turun + strip SUMBER: KLHK, 2016", "kode"),
   ("Anehnya, 200 perak bukan rugi besar. Lalu kenapa orang menolak?", "tolak_kantong", "AI"),
   ("Petunjuknya datang dari Amerika. Di satu daerah, tiap kantong dibayar 5 sen", "toko_as + strip MARYLAND, AS · Homonoff 2018 + label BAYAR 5 SEN", "AI + kode"),
   ("Di toko lain, yang bawa tas sendiri justru dapat bonus 5 sen", "tas_kain + label BONUS 5 SEN", "AI + kode"),
   ("Yang harus bayar, banyak yang berhenti pakai kantong", "pembeli_peluk (belanjaan dipeluk, lucu)", "AI"),
   ("Yang dapat bonus? Tetap pakai kantong seperti biasa", "pembeli_kantong (Batch B, tokoh sama)", "AI"),
   ("[hening] Nilainya sama-sama lima sen… bonus terasa untung kecil", "timbangan arsip: koin bonus vs koin_jatuh", "arsip + AI"),
   ("…bayar kantong terasa kehilangan barang yang tadinya gratis", "koin_jatuh + cap RUGI", "AI + kode"),
   ("Lain kali, kalo yang biasanya gratis tiba-tiba berbayar…", "kembali ke kantong_hero (loop)", "AI"),
  ],
  A=[
   ("kantong_hero", "3:4", "FRAME 0 HERO. A thin, slightly crumpled plastic shopping bag with two loop handles, standing upright and empty, front view, completely plain; the bag fills about 85% of the image width."),
   ("kasir_kantong", "1:1", "A small Indonesian minimarket checkout counter: a cash register, a roll of thin plastic shopping bags hanging on a hook, a few snacks on the counter; no signs, no text."),
   ("koin_permen", "1:1", "Two small plain coins with no inscriptions lying next to three wrapped hard candies with twisted wrapper ends, on a counter top, close-up."),
   ("tolak_kantong", "4:3", "Two hands only: a hand from the left offering a folded thin plastic shopping bag, and a hand from the right raised palm-forward in a polite 'no thanks' gesture."),
   ("toko_as", "1:1", "A generic American supermarket checkout lane with a conveyor belt, a bagging area and a rack of plastic grocery bags; no signs, no text."),
   ("tas_kain", "3:4", "A hand holding up a sturdy reusable cloth tote bag by its handles, the bag plain with no print."),
   ("pembeli_peluk", "3:4", "SHOPPER_US, waist-up, walking out of a store carrying groceries in both arms without any bag: a loaf of bread, a plain cereal box and a few apples about to slip, slightly comic strained face."),
   ("koin_jatuh", "1:1", "An open hand, palm up, with one plain coin with no inscription falling away from the fingers into empty space, close-up."),
  ],
  B=[
   ("pembeli_kantong", "3:4", "SHOPPER_US", "The SAME SHOPPER_US as in the reference image (same face, same beard, same flannel shirt and cap), full body, walking calmly with several full plastic grocery bags hanging from each hand, relaxed face."),
  ],
  code="label Rp200; cap DITOLAK; kata GRATIS dicoret; strip Uji coba kantong berbayar 2016; grafik turun sampai 30% + SUMBER: KLHK, 2016; strip MARYLAND, AS · Homonoff 2018; label BAYAR 5 SEN / BONUS 5 SEN; cap RUGI.",
  arsip="timbangan dua piring (pakai ulang dari #008 bila ada, atau Openverse → Wikimedia).",
 ),
 dict(no="011", slug="paylater", judul="Belanja Jadi Lebih Banyak Gara-Gara Tombol Paylater",
  drive="011 Paylater", drive_id="1rKbftMKNtSy_hjH7wLI7Pbo6cBjHiC6o",
  chars={"BUYER_ID": "Indonesian man about 30, warm brown skin, short neat hair, plain collared shirt"},
  logic=[
   ("H1: Tombol ini nggak memotong harga—tapi orang malah belanja lebih banyak.", "jempol_hp + tombol PAYLATER di layar (kode) + cap HARGA SAMA", "AI + kode"),
   ("Namanya paylater. Sampai pertengahan tahun ini… 32 juta rekening", "angka 32,8 JUTA REKENING + strip SUMBER: OJK, data Juni 2026", "kode"),
   ("Belanja sekarang, bayarnya belakangan.", "paket_tumpuk", "AI"),
   ("Kedengarannya cuma soal kapan bayar.", "kalender_sobek (tanggal dari kode)", "AI + kode"),
   ("Tapi di Amerika, peneliti membedah data sebuah peritel besar", "peneliti_data + strip Maesen & Ang, J. Marketing", "AI + kode"),
   ("Barangnya sama. Harganya sama.", "keranjang_isi + dua label harga sama", "AI + kode"),
   ("Anehnya, isi belanjaan mereka naik lebih banyak sepuluh persen", "keranjang_luber + label +10%", "AI + kode"),
   ("Kebiasaan itu bertahan sampai setengah tahun", "kalender_sobek berganti 26 minggu", "AI + kode"),
   ("[hening] Bukan karena boros. Paylater bikin dompet terasa lebih longgar", "dompet_longgar", "AI"),
   ("Uang yang belum keluar hari ini, rasanya belum kepake", "dompet_longgar + label BELUM KELUAR", "AI + kode"),
   ("Coba ingat belanjaan terakhir… masih jadi beli?", "pembeli_ragu + layar HP struk (kode)", "AI + kode"),
  ],
  A=[
   ("jempol_hp", "3:4", "FRAME 0 HERO. Close-up of a right hand holding a generic modern smartphone upright, the thumb hovering just above the lower part of the screen as if about to press a button; the screen is completely blank white, no logo; phone and hand fill about 85% of the image width."),
   ("paket_tumpuk", "1:1", "A small pile of online-shopping delivery parcels: plain cardboard boxes and plastic mailer pouches stacked unevenly, sealed with tape, no labels or text."),
   ("kalender_sobek", "3:4", "A wall tear-off day calendar hanging on a nail, the top page half torn off, all pages completely blank with no numbers."),
   ("peneliti_data", "4:3", "A man about 45 with rolled-up shirt sleeves and reading glasses, waist-up, sitting at a desk covered with blank printouts, running a finger down a long blank printout as if checking numbers, a laptop beside him with a blank screen."),
   ("keranjang_isi", "1:1", "A plastic supermarket hand basket, half full with a few plain grocery items: a box, a bottle and some fruit; no labels or text."),
   ("keranjang_luber", "1:1", "The same kind of plastic supermarket hand basket, now overflowing: piled high with plain boxes, bottles, fruit and snacks spilling over the rim; no labels or text."),
   ("dompet_longgar", "4:3", "An open leather wallet lying at an angle, a thick stack of plain banknotes with no numbers or portraits sticking loosely out of it."),
   ("pembeli_ragu", "3:4", "BUYER_ID, waist-up, holding a smartphone with a blank screen in one hand, the other hand rubbing his chin, hesitant thoughtful face, looking at the phone."),
  ],
  B=[],
  code="tombol PAYLATER di layar HP; cap HARGA SAMA; angka 32,8 JUTA REKENING + SUMBER: OJK, data Juni 2026; strip Maesen & Ang, Journal of Marketing; label +10%; 26 MINGGU; label BELUM KELUAR; struk di layar HP.",
  arsip="",
 ),
 dict(no="012", slug="kartumember", judul="Cara Halus Kartu Member Bikin Kamu Balik Lagi",
  drive="012 Kartu Member", drive_id="1Cjp1V1YpcV_6HTbEr1MTGJZ0_Da4lRAo",
  chars={"RUNNER": "Indonesian man about 30, warm brown skin, short hair, plain sleeveless running singlet with a blank race bib, running shorts"},
  logic=[
   ("H1: Dua kartu member ini sama-sama butuh delapan cap—tapi hasilnya beda jauh.", "kartu_tangan + 2 kartu (8 kotak kosong | 10 kotak, 2 dicap) digambar kode", "AI + kode"),
   ("Kartu begini pasti kamu kenal di kedai kopi atau cuci motor", "kedai_kopi → cuci_motor", "AI"),
   ("Dua peneliti mencobanya di sebuah tempat cuci mobil", "cuci_mobil + strip Nunes & Drèze, JCR 2006", "AI + kode"),
   ("…kartu delapan kotak… / …kartu sepuluh kotak, dua sudah dicap", "stempel_tangan + 2 kartu (kode)", "AI + kode"),
   ("Jarak ke hadiahnya sama persis: delapan kali cuci lagi", "dua kartu sejajar, sisa 8 kotak disorot", "kode"),
   ("…hampir dua kali lebih banyak yang dapat cuci gratis", "batang 34% vs 19% (dari samping, y ≤ 1180)", "kode"),
   ("Dan kartunya penuh lebih cepat", "garis waktu pendek vs panjang", "kode"),
   ("[hening] Kartu kosong terasa seperti pekerjaan yang belum dimulai", "pelari_start", "AI"),
   ("Kartu bercap terasa sudah berjalan… nanggung kalo berhenti", "pelari_tengah (Batch B, tokoh sama)", "AI"),
   ("Lain kali, kalo kasir ngasih kartu yang sudah ada dua capnya…", "kasir_kartu + 2 cap (kode) + slip CUMA TERASA LEBIH DEKAT", "AI + kode"),
  ],
  A=[
   ("kartu_tangan", "4:3", "FRAME 0 HERO. Close-up of a hand holding a blank rectangular paper loyalty card flat and facing the viewer, the card completely empty with no boxes, no marks and no text; card and hand fill about 85% of the image width."),
   ("kedai_kopi", "1:1", "A small Indonesian coffee shop counter: a glass of iced coffee and a hot coffee cup, a simple espresso machine behind, a small stack of blank paper cards near the register; no signs, no text."),
   ("cuci_motor", "4:3", "A scooter-style motorcycle covered in soap foam at a simple roadside wash spot, a water hose lying beside it with water spraying; no person, no text."),
   ("cuci_mobil", "4:3", "A generic sedan inside an automatic car wash with large spinning brushes and soap foam, seen from a front three-quarter angle; no signs, no text."),
   ("stempel_tangan", "1:1", "Close-up of a hand pressing a small rubber stamp down onto a blank paper card on a counter, an ink pad beside it."),
   ("pelari_start", "4:3", "RUNNER, full body, crouched at a starting line on a running track in a set position, hands on the ground behind the line, looking ahead, not yet started; the track ahead is empty."),
   ("kasir_kartu", "1:1", "Close-up across a shop counter: a hand holding out a small blank paper loyalty card toward the viewer, as if a cashier is handing it over."),
  ],
  B=[
   ("pelari_tengah", "4:3", "RUNNER", "The SAME RUNNER as in the reference image (same face, same singlet and race bib), full body, running mid-stride well down the track, side view, one foot off the ground, determined face."),
  ],
  code="dua kartu member (8 kotak kosong; 10 kotak dengan 2 cap GRATIS) ditempel di kartu_tangan/stempel_tangan; strip Nunes & Drèze, Journal of Consumer Research 2006; sorotan sisa 8 kotak; batang 34% vs 19% (hanya visual); garis waktu; slip penutup HADIAHNYA NGGAK MAKIN DEKAT — CUMA TERASA LEBIH DEKAT.",
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
    (ROOT / "research" / "batch_009_012" / "flow_prompts.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    return out


if __name__ == "__main__":
    o = build()
    for r in o:
        print(r["no"], len(r["singlesA"]), "A +", len(r["B"]), "B")
