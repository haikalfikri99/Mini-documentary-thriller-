#!/usr/bin/env python3
"""Bangun halaman salin prompt Flow #009-#012 dari flow_prompts.json (jalankan flow_prompts_gen.py dulu)."""
import json, html, pathlib
import importlib.util

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("gen", HERE / "flow_prompts_gen.py")
gen = importlib.util.module_from_spec(spec); spec.loader.exec_module(gen)
data = gen.build()
STYLE, ANTI = gen.STYLE, gen.ANTI_POSE
CH = {e["no"]: e["chars"] for e in gen.EP}

ASPECT_NAME = {"3:4": "Portrait 3:4", "4:3": "Landscape 4:3", "1:1": "Square 1:1"}


def local_block():
    L = []
    L.append("""TUGAS: buat gambar Google Flow untuk 4 episode YouTube Shorts (ARSIP KASUS #009-#012), lewat BROWSER BAWAAN aplikasi Claude desktop, lalu unggah hasilnya ke Google Drive. Kerjakan berurutan, laporkan singkat setelah tiap episode.

ATURAN UMUM
- Jangan pernah mengetik kata sandi / kode verifikasi. Login Google dikerjakan user sendiri di panel browser.
- 1 label = 1 kali generate, 1 hasil (output per prompt = 1). Jangan minta variasi tambahan.
- Hemat kredit: bila hasil cacat, regenerate label itu SEKALI. Masih cacat -> catat, lanjut. Lebih dari itu harus izin user.
- Prompt diblokir filter kebijakan -> JANGAN ulang di proyek yang sama. Buat proyek baru, coba sekali. Masih diblokir -> catat, lanjut.
- Jangan ubah isi prompt kecuali untuk menghindari blokir (lapor ke user apa yang diubah).

LANGKAH
0. Pastikan kamu punya alat browser bawaan (nama alat diawali mcp__Claude_Browser__ atau mcp__remote-devices__Claude_Browser__; kalau di daftar alat tertunda, muat semuanya sekaligus lewat ToolSearch dengan awalan namanya). Kalau tidak ada sama sekali: BERHENTI dan bilang ke user "sesi ini tidak punya browser bawaan".
1. Buka https://labs.google/fx/tools/flow di browser bawaan. Minta user login Google di panel browser (Ctrl+Shift+B kalau panel tersembunyi). Tunggu user bilang sudah login.
2. Untuk tiap episode buat proyek baru, nama "ARSIP <no> <slug>" (contoh "ARSIP 009 burger").
3. Setelan pembuatan GAMBAR (bukan video): model Nano Banana Pro (kalau tidak ada: Nano Banana 2), output per prompt = 1, rasio sesuai label: 3:4 = Portrait, 4:3 = Landscape 4:3, 1:1 = Square. Kalau 4:3 tidak tersedia, pakai 16:9 dan catat.
4. Teks prompt tiap label = baris STYLE di bawah + spasi + "Subject: " + deskripsi label (persis). Bila label memuat nama tokoh (SHOPPER_US / BUYER_ID / RUNNER), tambahkan juga definisi tokohnya sebelum "Subject:".
5. Setelah tiap hasil keluar, periksa (screenshot boleh): latar putih polos; TIDAK ada huruf/angka/logo; tangan lima jari wajar; subjek sesuai deskripsi; hero FRAME 0 memenuhi +-85% lebar gambar.
6. BATCH B (hanya #010 dan #012): setelah Batch A episode itu selesai, buat PROYEK BARU, pasang gambar ingredient yang disebut sebagai gambar referensi/ingredient, lalu kirim prompt Batch B.
7. Unduh tiap hasil resolusi tertinggi, beri nama persis <label>.jpg (atau .png sesuai format unduhan). Cari file unduhan di folder Downloads Windows (%USERPROFILE%\\Downloads); kalau tidak ketemu, tanya user di mana browser menyimpannya.
8. Unggah ke folder Drive episode (ID di bawah) dengan konektor Google Drive (create_file, parentId = ID folder, file < 10 MB, disableConversionToGoogleType = true). Kalau konektor Drive tidak ada: kumpulkan file di %USERPROFILE%\\Downloads\\ARSIP_flow\\<no>\\ lalu minta user menyeret file ke link folder Drive.
9. Laporan akhir per episode: tabel label -> OK / regenerate / gagal (alasan) + link folder Drive. Lalu user mengetik di sesi cloud: "gambar #<no> sudah di Drive".
""")
    L.append("STYLE (sama untuk semua gambar):\n" + STYLE + "\n")
    for e in data:
        L.append(f"==================== #{e['no']} {e['slug']} — {e['judul']}")
        L.append(f"Folder Drive: Mini Thriller IDN/{e['drive']}  (ID {e['drive_id']})  https://drive.google.com/drive/folders/{e['drive_id']}")
        chars = CH[e["no"]]
        if chars:
            L.append("Tokoh: " + "; ".join(f"{k} = {v}" for k, v in chars.items()))
        L.append("BATCH A (satu proyek):")
        for x in gen.EP[[d['no'] for d in data].index(e['no'])]["A"]:
            lab, ar, p = x
            L.append(f"- {lab} | {ASPECT_NAME[ar]} | {p}")
        for b in e["B"]:
            src = next(i for i in gen.EP if i["no"] == e["no"])
            item = next(i for i in src["B"] if i[0] == b["label"])
            L.append(f"BATCH B (PROYEK BARU, ingredient: {b['ingredient']}):")
            L.append(f"- {b['label']} | {ASPECT_NAME[b['aspect']]} | {item[3]} {ANTI}")
        L.append("")
    return "\n".join(L)


STYLE_AGENT = ("Vintage 19th-century steel engraving illustration, black ink cross-hatching, no color; one isolated subject on a plain "
               "pure-white background, no shadow, no frame, white margin; absolutely no text, letters, numbers, logos or watermark; "
               "generic faces, natural hands with five fingers.")
AR_CODE = {"3:4": "34", "4:3": "43", "1:1": "11"}


def local_block_mcp():
    L = ["""TUGAS: buat 31 gambar Google Flow untuk ARSIP KASUS #009-#012 memakai MCP flow-mcp, tool flow_agent_images (Agent mode Flow, banyak gambar sekaligus), lalu unggah ke Google Drive. Kerjakan berurutan; lapor singkat tiap episode selesai.

ATURAN
- JANGAN pakai flow_generate satu per satu. Hanya flow_agent_images, persis seperti daftar PANGGILAN di bawah (1 panggilan = 1 episode x 1 rasio).
- JANGAN membuka/melihat gambar hasil (hemat token). Pemeriksaan visual dilakukan sesi cloud setelah file ada di Drive.
- JANGAN regenerate apa pun tanpa izin user. Panggilan gagal/diblokir -> catat, lanjut ke panggilan berikutnya.
- Jangan ubah teks scene.

LANGKAH
0. CEK MCP: cari tool flow_status dan flow_agent_images (biasanya mcp__flow__...; kalau tertunda, muat lewat ToolSearch "flow_agent_images"). Tidak ada -> BERHENTI, lapor "flow-mcp belum terpasang di sesi ini". Ada -> panggil flow_status (detailed=false). Kalau belum login / jendela Chrome Flow tidak terbuka: minta user menjalankan login flow-mcp (npm run login di folder flow-mcp), login Google di jendela Chrome khusus itu, biarkan jendela terbuka dan layar jangan tidur. Tunggu user bilang siap.
1. Jalankan semua PANGGILAN A di bawah, berurutan dari atas (11 panggilan), lalu 2 PANGGILAN B. Tunggu tiap panggilan selesai (pakai flow_wait bila tool mengembalikan job id) sebelum lanjut.
2. Hasil ada di folder output flow-mcp (default %USERPROFILE%\\flow-mcp-out\\<project>\\, nama scene-NN.*; kalau datang sebagai ZIP, ekstrak). Ganti nama ke <label>.<ext asli> sesuai URUTAN scene di panggilan itu (scene-01 = label pertama, dst.). Bila hasil tool menyebut pemetaan file->scene, pakai pemetaan itu. Bila jumlah file tidak sama dengan jumlah scene atau urutan tidak bisa dipastikan: jangan menebak; unggah dengan nama asli ke subfolder Drive "_belum_dinamai" dan catat dari panggilan mana.
3. BATCH B (#010, #012): jalankan SETELAH Batch A episode itu selesai dan diganti nama. references = path absolut file ingredient yang disebut.
4. UNGGAH ke folder Drive episode (ID di bawah) pakai konektor Google Drive: create_file dengan title=<label>.<ext>, parentId=<ID folder>, contentMimeType image/png atau image/jpeg, disableConversionToGoogleType=true, base64Content berupa referensi file sha256:<hash 64 hex huruf kecil>:<path absolut pakai />. Hash dari PowerShell: (Get-FileHash -Algorithm SHA256 <path>).Hash.ToLower(). File harus < 10 MB. Kalau konektor Drive tidak ada/menolak: kumpulkan file di %USERPROFILE%\\Downloads\\ARSIP_flow\\<no>\\ lalu minta user menyeret ke link folder Drive.
5. LAPORAN per episode: tabel label -> file asli -> status (OK / hilang / gagal + alasan) + link folder Drive. Lalu user mengetik di sesi cloud: "gambar #<no> sudah di Drive".
"""]
    for e, src in zip(data, gen.EP):
        L.append(f"==================== #{e['no']} {e['slug']} — Drive: Mini Thriller IDN/{e['drive']} (ID {e['drive_id']}) https://drive.google.com/drive/folders/{e['drive_id']}")
        groups = {}
        for lab, ar, p in src["A"]:
            groups.setdefault(ar, []).append((lab, p))
        for ar, items in groups.items():
            proj = f"ARSIP_{e['no']}_{AR_CODE[ar]}"
            scenes = []
            for lab, p in items:
                ch = "".join(f" {k} = {v}." for k, v in src["chars"].items() if k in p)
                p2 = p.replace("FRAME 0 HERO. ", "")
                scenes.append(f"{p2}{ch} {STYLE_AGENT}")
            L.append(f"PANGGILAN A ({e['no']} · {ar}): flow_agent_images project=\"{proj}\" aspect_ratio=\"{ar}\" download_quality=\"upscaled\"")
            L.append("  urutan label: " + ", ".join(l for l, _ in items))
            L.append("  scenes:")
            L += [f"  {i}. {s}" for i, s in enumerate(scenes, 1)]
        for lab, ar, ch, p in src["B"]:
            ing = next(l for l, _, pp in src["A"] if ch in pp)
            proj = f"ARSIP_{e['no']}_B"
            L.append(f"PANGGILAN B ({e['no']} · {ar}, setelah Batch A): flow_agent_images project=\"{proj}\" aspect_ratio=\"{ar}\" download_quality=\"upscaled\" references=[{{image: <path absolut {ing}.*>, name: \"{ch}\"}}] scene_references=[[\"{ch}\"]]")
            L.append(f"  urutan label: {lab}")
            L.append(f"  scenes:\n  1. {p} {ANTI} {src['chars'][ch]}. {STYLE_AGENT}")
        L.append("")
    return "\n".join(L)


def esc(s):
    return html.escape(s, quote=True)


uid = [0]


def copy_block(text, label, big=False):
    uid[0] += 1
    i = f"c{uid[0]}"
    return (f'<div class="cb{" big" if big else ""}"><div class="cbh"><span>{esc(label)}</span>'
            f'<button type="button" class="btn" data-copy="{i}">Salin</button></div>'
            f'<pre id="{i}">{esc(text)}</pre></div>')


def episode_html(e):
    rows = "".join(f"<tr><td>{esc(a)}</td><td>{esc(b)}</td><td class='src'>{esc(c)}</td></tr>" for a, b, c in e["logic"])
    singles = []
    for s in e["singlesA"]:
        uid[0] += 1
        i = f"c{uid[0]}"
        hero = ' <span class="hero">FRAME 0</span>' if "FRAME 0 HERO" in s["prompt"] else ""
        singles.append(f'<li class="item"><label class="chk"><input type="checkbox" id="done-{e["no"]}-{s["label"]}" data-key="{e["no"]}-{s["label"]}"><span class="lab">{esc(s["label"])}</span></label>'
                       f'<span class="ar">{esc(ASPECT_NAME[s["aspect"]])}</span>{hero}'
                       f'<button type="button" class="btn sm" data-copy="{i}">Salin</button>'
                       f'<pre id="{i}" class="one">{esc(s["prompt"])}</pre></li>')
    bpart = ""
    for b in e["B"]:
        bpart += (f'<h4>Batch B · <span class="lab">{esc(b["label"])}</span> · proyek baru · ingredient <span class="lab">{esc(b["ingredient"])}</span></h4>'
                  + copy_block(b["block"], f'Batch B: {b["label"]} ({ASPECT_NAME[b["aspect"]]})'))
    arsip = f"<li><b>Arsip:</b> {esc(e['arsip'])}</li>" if e["arsip"] else ""
    n = len(e["singlesA"]) + len(e["B"])
    return f'''<section class="ep" id="ep{e["no"]}">
<header class="eph"><div><p class="no">#{e["no"]} · {n} gambar</p><h2>{esc(e["judul"])}</h2></div>
<a class="drive" href="https://drive.google.com/drive/folders/{e["drive_id"]}" target="_blank" rel="noopener">Folder Drive: {esc(e["drive"])} ↗</a></header>
<details><summary>Logika visual: kalimat VO → gambar</summary><div class="tw"><table><thead><tr><th>Kalimat VO</th><th>Gambar</th><th>Sumber</th></tr></thead><tbody>{rows}</tbody></table></div></details>
<h3>Batch A: satu per satu (disarankan)</h3>
<p class="note">Atur rasio di Flow sesuai label, lalu tempel. Centang yang sudah selesai (tersimpan di browser ini).</p>
<ol class="items">{"".join(singles)}</ol>
<details><summary>Batch A sebagai satu blok (untuk agen Flow yang mau banyak gambar sekaligus)</summary>{copy_block(e["batchA"], "Batch A: satu blok")}</details>
{bpart}
<h4>Tidak perlu di-generate</h4><ul class="nogen"><li><b>Dibuat kode:</b> {esc(e["code"])}</li>{arsip}</ul>
</section>'''


tabs = "".join(f'<a href="#ep{e["no"]}" class="tab">#{e["no"]} {esc(e["slug"])}</a>' for e in data)
body = "".join(episode_html(e) for e in data)
local = copy_block(local_block_mcp(), "Instruksi sesi lokal: flow-mcp Agent (hemat token)", big=True)
local_browser = copy_block(local_block(), "Instruksi sesi lokal: browser bawaan (cadangan)", big=True)
total = sum(len(e["singlesA"]) + len(e["B"]) for e in data)

page = f'''<title>Prompt Flow ARSIP 009–012</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* Layout: arsip kerja satu kolom; tiap episode = map berkas dengan strip label; prompt dalam kotak mono siap salin */
:root {{
 --paper:#F3F2EC; --card:#FFFFFF; --ink:#1E2322; --muted:#5D6663; --line:#D6D7CF;
 --archive:#2F4F4A; --stamp:#B3261E; --amber:#D58E2A; --amberbg:rgba(213,142,42,.16); --pre:#F7F7F2;
 --f-display:"Archivo", "Helvetica Neue", Arial, sans-serif; --f-body:"IBM Plex Sans", "Segoe UI", Arial, sans-serif; --f-mono:"IBM Plex Mono", ui-monospace, Consolas, monospace;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
 --paper:#151918; --card:#1D2221; --ink:#E7E9E4; --muted:#9BA4A0; --line:#323937;
 --archive:#7FB3A8; --stamp:#EF6B5F; --amber:#E7A94D; --amberbg:rgba(231,169,77,.16); --pre:#171C1B; color-scheme:dark }} }}
:root[data-theme="dark"] {{
 --paper:#151918; --card:#1D2221; --ink:#E7E9E4; --muted:#9BA4A0; --line:#323937;
 --archive:#7FB3A8; --stamp:#EF6B5F; --amber:#E7A94D; --amberbg:rgba(231,169,77,.16); --pre:#171C1B; color-scheme:dark }}
body {{ background:var(--paper); color:var(--ink); font:15px/1.55 var(--f-body); }}
.wrap {{ max-width:980px; margin:0 auto; padding-block:28px 64px; padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); display:grid; gap:28px; }}
h1,h2,h3,h4 {{ font-family:var(--f-display); text-wrap:balance; margin:0; }}
h1 {{ font-size:clamp(26px,4vw,36px); font-weight:800; letter-spacing:-.01em; }}
h2 {{ font-size:21px; font-weight:700; }}
h3 {{ font-size:16px; font-weight:700; margin-top:6px; }}
h4 {{ font-size:14px; font-weight:700; color:var(--muted); }}
.kicker {{ font:500 12px var(--f-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--archive); margin:0 0 6px; }}
.lede {{ max-width:68ch; margin:8px 0 0; color:var(--muted); }}
.settings {{ display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }}
.chip {{ font:500 12.5px var(--f-mono); border:1px solid var(--line); background:var(--card); padding:4px 10px; border-radius:3px; }}
.chip b {{ color:var(--stamp); font-weight:500; }}
.panel {{ background:var(--card); border:1px solid var(--line); border-top:4px solid var(--archive); padding:18px; display:grid; gap:12px; min-width:0; }}
.steps {{ margin:0; padding-left:20px; display:grid; gap:4px; max-width:72ch; }}
.tabs {{ display:flex; flex-wrap:wrap; gap:8px; position:sticky; top:env(safe-area-inset-top, 0px); background:var(--paper); padding-block:8px; z-index:5; border-bottom:1px solid var(--line); }}
.tab {{ font:500 13px var(--f-mono); color:var(--archive); text-decoration:none; border:1px solid var(--line); background:var(--card); padding:5px 12px; border-radius:3px; }}
.tab:hover, .tab:focus-visible {{ border-color:var(--archive); outline:none; }}
.ep {{ background:var(--card); border:1px solid var(--line); padding:20px 18px; display:grid; gap:14px; min-width:0; scroll-margin-top:64px; }}
.eph {{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:10px; border-bottom:2px solid var(--ink); padding-bottom:10px; }}
.no {{ font:500 12px var(--f-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--stamp); margin:0 0 4px; }}
.drive {{ font:500 13px var(--f-mono); color:var(--archive); }}
details > summary {{ cursor:pointer; font-weight:600; color:var(--archive); }}
details[open] > summary {{ margin-bottom:10px; }}
.tw {{ overflow-x:auto; }}
table {{ border-collapse:collapse; width:100%; font-size:13.5px; min-width:560px; }}
th,td {{ text-align:left; vertical-align:top; padding:7px 8px; border-bottom:1px solid var(--line); }}
th {{ font:500 11.5px var(--f-mono); letter-spacing:.06em; text-transform:uppercase; color:var(--muted); }}
td.src {{ white-space:nowrap; font-family:var(--f-mono); font-size:12.5px; }}
.note {{ margin:0; color:var(--muted); font-size:13.5px; }}
.items {{ list-style:none; margin:0; padding:0; display:grid; gap:8px; }}
.item {{ display:grid; grid-template-columns:1fr auto auto; align-items:center; gap:6px 10px; border:1px solid var(--line); padding:8px 10px; min-width:0; }}
.item .hero {{ grid-column:2; }}
.item pre.one {{ grid-column:1 / -1; }}
.chk {{ display:flex; align-items:center; gap:8px; cursor:pointer; min-width:0; }}
.chk input {{ width:17px; height:17px; accent-color:var(--archive); }}
.item:has(input:checked) {{ opacity:.55; }}
.item:has(input:checked) .lab {{ text-decoration:line-through; }}
.lab {{ font:500 14px var(--f-mono); background:var(--amberbg); padding:0 4px; }}
.ar {{ font:12.5px var(--f-mono); color:var(--muted); white-space:nowrap; }}
.hero {{ font:500 11px var(--f-mono); color:var(--stamp); border:1.5px solid var(--stamp); padding:1px 6px; transform:rotate(-3deg); letter-spacing:.06em; white-space:nowrap; justify-self:start; }}
.item:has(.hero) {{ grid-template-columns:1fr auto auto auto; }}
.item:has(.hero) .hero {{ grid-column:auto; }}
pre {{ margin:0; font:12.5px/1.5 var(--f-mono); background:var(--pre); border:1px solid var(--line); padding:10px 12px; white-space:pre-wrap; word-break:break-word; max-height:220px; overflow:auto; }}
.cb {{ display:grid; gap:6px; min-width:0; }}
.cb.big pre {{ max-height:300px; }}
.cbh {{ display:flex; justify-content:space-between; align-items:center; gap:10px; font-weight:600; font-size:14px; }}
.btn {{ font:600 13px var(--f-body); background:var(--archive); color:var(--card); border:0; padding:7px 16px; border-radius:3px; cursor:pointer; white-space:nowrap; }}
.btn.sm {{ padding:5px 12px; font-size:12.5px; }}
.btn:hover {{ filter:brightness(1.1); }}
.btn:focus-visible {{ outline:2px solid var(--amber); outline-offset:2px; }}
.btn.ok {{ background:var(--amber); color:#1E2322; }}
.nogen {{ margin:0; padding-left:18px; display:grid; gap:4px; color:var(--muted); font-size:13.5px; }}
.nogen b {{ color:var(--ink); }}
@media (max-width:560px) {{ .item, .item:has(.hero) {{ grid-template-columns:1fr auto; }} .item .ar {{ grid-column:1; }} .item .hero {{ grid-column:1; }} }}
@media (prefers-reduced-motion: reduce) {{ * {{ transition:none !important; }} }}
</style>
<div class="wrap">
<header>
<p class="kicker">ARSIP KASUS · batch #009–#012 · fase 3</p>
<h1>Prompt Google Flow #009–#012</h1>
<p class="lede">{total} gambar total. Semua teks, angka, cap, dan strip sumber dibuat kode saat bake, jadi gambar Flow harus bersih tanpa huruf. Hasil diunggah ke folder Drive tiap episode, lalu sesi cloud menarik dan memasangnya.</p>
<div class="settings"><span class="chip">Nano Banana Pro <b>·</b> cadangan Nano Banana 2</span><span class="chip">output per prompt: <b>1</b></span><span class="chip">rasio per label</span><span class="chip">diblokir → <b>proyek baru</b></span></div>
</header>
<section class="panel">
<h2>Jalur 1: sesi lokal + flow-mcp (Agent mode)</h2>
<ol class="steps"><li>Di Claude desktop, buka sesi <b>Local → This computer</b> yang punya MCP flow-mcp.</li><li>Salin blok di bawah, tempel, kirim. Sesi itu mengecek MCP dulu, lalu menjalankan 13 panggilan <code>flow_agent_images</code> (per episode per rasio), mengganti nama file, dan mengunggah ke Drive.</li><li>Kalau diminta login: jalankan login flow-mcp, login Google di jendela Chrome khususnya, biarkan terbuka dan layar menyala.</li><li>Selesai satu episode, ketik di sesi cloud: <code>gambar #009 sudah di Drive</code>.</li></ol>
{local}
<details><summary>Cadangan: lewat browser bawaan (lebih boros token)</summary>{local_browser}</details>
<p class="note">Jalur 2 (manual): pakai tombol Salin per gambar di bawah, tempel di Flow, unduh, seret ke link folder Drive episode.</p>
</section>
<nav class="tabs" aria-label="Episode">{tabs}</nav>
{body}
</div>
<script>
document.addEventListener('click', async (ev) => {{
  const b = ev.target.closest('[data-copy]'); if (!b) return;
  const pre = document.getElementById(b.dataset.copy); const t = pre.textContent;
  const done = () => {{ const o = b.textContent; b.textContent = 'Tersalin'; b.classList.add('ok'); setTimeout(() => {{ b.textContent = o; b.classList.remove('ok'); }}, 1400); }};
  try {{ await navigator.clipboard.writeText(t); done(); }}
  catch (e) {{ const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Tekan Ctrl+C'; }}
}});
const KEY = 'arsip-flow-009-012';
let st = {{}}; try {{ st = JSON.parse(localStorage.getItem(KEY) || '{{}}'); }} catch (e) {{}}
document.querySelectorAll('input[data-key]').forEach(cb => {{
  cb.checked = !!st[cb.dataset.key];
  cb.addEventListener('change', () => {{ st[cb.dataset.key] = cb.checked; try {{ localStorage.setItem(KEY, JSON.stringify(st)); }} catch (e) {{}} }});
}});
</script>
'''
out = HERE / "flow_prompts_page.html"
out.write_text(page, encoding="utf-8")
(HERE / "flow_local_session_instructions.txt").write_text(local_block_mcp(), encoding="utf-8")
(HERE / "flow_local_session_instructions_browser.txt").write_text(local_block(), encoding="utf-8")
print(out, len(page))
