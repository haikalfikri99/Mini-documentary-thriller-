// Visual QA gate for an ARSIP Kolase film: runs BEFORE the full render (no audio, no file is written, final renders are never touched).
//   node kit/tools/check_visual.mjs stories/<slug>/kolase [--strict] [--step 0.25]
// Checks (all measured on the real canvas, same renderer as render_2d.mjs):
//   1. START: strictly increasing, last value = episode dur, shot lengths (warn < 0.9 s or > 4.0 s).
//   2. Dead frame: the stage area (y 120–1190, captions excluded) must change at least every 2.5 s (sampled every 0.25 s).
//   3. Caption band (y 1210–1536). Captions are drawn ON TOP of pieces, so big prints (buildings, rooms, people) may overlap the band;
//      what breaks reading is a TEXT piece under a caption. SERIOUS: a text piece (parts s_*, st_*, tag_*, ry*, rq*, lbl_*, m_*) sits ≥ 30 px
//      inside the real caption slip zone (y 1300–1440; the documented band 1210–1536 includes margins) for ≥ 0.5 s, or any non-backdrop piece is cut by the frame edge by ≥ 25% of its own size for ≥ 0.5 s.
//      WARN: a print ≥ 150 px inside the band, or any piece cut ≥ 20 px by an edge. Backdrops (opaque box ≥ 900 px wide or ≥ 1000 px tall)
//      and the transient ARSIP folder overlay are exempt. Pieces are located from the real draw calls (opaque bounding box through the camera
//      transform), so slides/drops that only pass through for < 0.5 s are not flagged.
// Exit code 2 = SERIOUS (dead frame > 2.5 s, or a piece ≥ 60 px into the band / cut off by an edge for ≥ 0.5 s); 0 = pass (warnings printed).
// --strict also fails on warnings.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const args = process.argv.slice(2); const film = path.resolve(args[0]); const strict = args.includes('--strict');
const si = args.indexOf('--step'); const STEP = si >= 0 ? (+args[si + 1] || 0.25) : 0.25;
const DUMP = args.includes('--dump') ? +args[args.indexOf('--dump') + 1] : null;   // --dump <t>: print every piece's opaque box at time t, then exit
if (!fs.existsSync(path.join(film, 'lib'))) spawnSync('bash', [path.join(path.dirname(new URL(import.meta.url).pathname), 'links.sh')]);
const types = { '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
const page = `<!doctype html><html><head><meta charset="UTF-8"></head><body><canvas id="c" width="1080" height="1920"></canvas><script type="module">
import * as E from './lib/engine.js'; import * as F from './film.js';
const c = document.getElementById('c'), ctx = c.getContext('2d', { willReadFrequently: true });
// 1) map every sprite image to its part name; flat fields / paper are backgrounds and are allowed in the caption band
const NAME = new Map();   // filled after F.init (parts are loaded there)
const isBg = n => n === 'paper' || n === '_' || n.startsWith('f_');
const bbox = new Map();   // opaque bounding box (alpha > 160, so paper halos around stamps do not count) in image pixels, computed once per image
const opaque = img => { if (bbox.has(img)) return bbox.get(img);
  const k = Math.max(1, Math.floor(Math.max(img.width, img.height) / 300)), w = Math.ceil(img.width / k), h = Math.ceil(img.height / k);
  const t = document.createElement('canvas'); t.width = w; t.height = h; const x = t.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h).data; let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (d[(j * w + i) * 4 + 3] > 160) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
  const r = x1 < 0 ? null : [x0 * k, y0 * k, (x1 + 1) * k, (y1 + 1) * k]; bbox.set(img, r); return r; };
window.__rec = null; const draw = CanvasRenderingContext2D.prototype.drawImage;
CanvasRenderingContext2D.prototype.drawImage = function (img, ...a) {
  if (window.__rec && this === ctx && NAME.has(img) && a.length === 4 && this.globalAlpha > 0.05) {
    const n = NAME.get(img);
    if (!isBg(n)) { const b = opaque(img), m = this.getTransform();
      if (b) { // destination rect = (a0,a1,a2,a3) for the whole image; opaque box is a sub-rect in image pixels
        const sx = a[2] / img.width, sy = a[3] / img.height;
        const pts = [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]]].map(([px, py]) => { const X = a[0] + px * sx, Y = a[1] + py * sy; return [m.a * X + m.c * Y + m.e, m.b * X + m.d * Y + m.f]; });
        window.__rec.push({ n, w: Math.max(...pts.map(p => p[0])) - Math.min(...pts.map(p => p[0])), h: Math.max(...pts.map(p => p[1])) - Math.min(...pts.map(p => p[1])), x0: Math.min(...pts.map(p => p[0])), x1: Math.max(...pts.map(p => p[0])), y0: Math.min(...pts.map(p => p[1])), y1: Math.max(...pts.map(p => p[1])) }); } } }
  return draw.call(this, img, ...a); };
await F.init(ctx);
for (const [n, S] of Object.entries(E.SP)) { if (S.img) NAME.set(S.img, n); if (S.back) NAME.set(S.back, n); }
const small = document.createElement('canvas'); small.width = 108; small.height = 107; const sx = small.getContext('2d', { willReadFrequently: true });
window.sample = t => { window.__rec = []; F.renderAt(t); const rec = window.__rec; window.__rec = null;
  sx.drawImage(c, 0, 120, 1080, 1070, 0, 0, 108, 107); return { rec, px: Array.from(sx.getImageData(0, 0, 108, 107).data) }; };
window.START = F.START; window.DUR = F.DUR; window.ready = true;</script></body></html>`;
const srv = http.createServer((req, res) => { const u = decodeURIComponent(req.url.split('?')[0]); if (u === '/__cv.html') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(page); }
  const f = path.join(film, u); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }).listen(0);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.error('PAGE ERROR', e.message));
await p.goto(`http://127.0.0.1:${srv.address().port}/__cv.html`); await p.waitForFunction('window.ready === true', null, { timeout: 180000 });
const START = await p.evaluate('window.START'); const DUR = await p.evaluate('window.DUR');
const ep = JSON.parse(fs.readFileSync(path.join(film, 'episode.json'), 'utf8'));
if (DUMP !== null) { const { rec } = await p.evaluate(t => window.sample(t), DUMP); for (const r of rec) console.log(`${r.n.padEnd(16)} x ${Math.round(r.x0)}–${Math.round(r.x1)}  y ${Math.round(r.y0)}–${Math.round(r.y1)}`); await b.close(); srv.close(); process.exit(0); }
const TEXT = /^(s_|st_|tag_|r_|ry|rq|lbl_|m_)/;    // text-bearing parts (labels, stamps, ransom letters, marks)
const serious = [], warn = []; const shotOf = t => { let i = START.length - 2; for (let j = 0; j < START.length - 1; j++) if (t < START[j + 1]) { i = j; break; } return i + 1; };
// 1) START
for (let i = 1; i < START.length; i++) if (!(START[i] > START[i - 1])) serious.push(`START tidak naik di indeks ${i}: ${START[i - 1]} → ${START[i]}`);
if (ep.dur && Math.abs(START[START.length - 1] - ep.dur) > 0.05) warn.push(`START terakhir ${START[START.length - 1]} ≠ episode.json dur ${ep.dur}`);
START.slice(0, -1).forEach((a, i) => { const d = START[i + 1] - a; if (d < 0.9) warn.push(`S${String(i + 1).padStart(2, '0')} terlalu pendek (${d.toFixed(2)} dtk)`); else if (d > 4.0) warn.push(`S${String(i + 1).padStart(2, '0')} panjang (${d.toFixed(2)} dtk)`); });
// 2+3) sample the whole film
const N = Math.floor(DUR / STEP); let prev = null, still = 0, stillFrom = 0; const run = {};   // run[key] = {from, n, depth}
const flush = (key, t) => { const r = run[key]; if (!r) return; const len = t - r.from; if (len >= 0.5 - 1e-6) { const sev = !!r.sev; (sev ? serious : warn).push(`S${String(shotOf(r.from)).padStart(2, '0')} ${r.from.toFixed(2)}–${t.toFixed(2)} dtk: ${r.msg(r)}`); } delete run[key]; };
for (let i = 0; i <= N; i++) {
  const t = Math.min(DUR - 0.001, i * STEP); const { rec, px } = await p.evaluate(t => window.sample(t), t);
  if (prev) { let s = 0; for (let k = 0; k < px.length; k += 4) s += Math.abs(px[k] - prev[k]) + Math.abs(px[k + 1] - prev[k + 1]) + Math.abs(px[k + 2] - prev[k + 2]); const diff = s / (px.length / 4 * 3);
    if (diff < 0.35) { if (!still) stillFrom = t - STEP; still += STEP; } else { if (still > 2.5 + 1e-6) serious.push(`S${String(shotOf(stillFrom)).padStart(2, '0')} dead frame ${stillFrom.toFixed(2)}–${t.toFixed(2)} dtk (${still.toFixed(2)} dtk tanpa perubahan di area panggung)`); still = 0; } }
  prev = px;
  const seen = new Set();
  if (i === 0 && !rec.some(r => r.w >= 486 && !TEXT.test(r.n))) warn.push('Frame 0 (t = 0): tidak ada gambar/objek non-latar selebar ≥ 486 px (45% lebar frame; label, stempel, dan slip tidak dihitung); objek utama harus besar sejak frame pertama');
  for (const r of rec) {
    if (r.w >= 900 || r.h >= 1000 || r.n === 'folder') continue;                       // backdrops + ARSIP folder overlay are exempt
    const text = TEXT.test(r.n), [z0, z1] = text ? [1300, 1440] : [1210, 1536], bandDepth = Math.max(0, Math.min(r.y1, z1) - Math.max(r.y0, z0));
    if (bandDepth >= (text ? 30 : 150)) { const key = `band:${r.n}`; seen.add(key); const cur = run[key] || (run[key] = { from: t, depth: 0, sev: text }); cur.depth = Math.max(cur.depth, bandDepth); cur.msg = x => `${r.n} masuk pita caption sedalam ${Math.round(x.depth)} px (${text ? 'teks di bawah caption' : 'gambar besar, hanya peringatan'})`; }
    const cut = Math.max(0, -r.x0, r.x1 - 1080, -r.y0), frac = cut / Math.max(1, Math.min(r.w, r.h));
    if (cut >= 20) { const key = `edge:${r.n}`; seen.add(key); const cur = run[key] || (run[key] = { from: t, depth: 0, sev: false }); cur.depth = Math.max(cur.depth, cut); cur.sev = cur.sev || frac >= 0.25; cur.msg = x => `${r.n} terpotong tepi frame ${Math.round(x.depth)} px`; }
  }
  for (const k of Object.keys(run)) if (!seen.has(k)) flush(k, t);
}
for (const k of Object.keys(run)) flush(k, DUR);
if (still > 2.5 + 1e-6) serious.push(`S${String(shotOf(stillFrom)).padStart(2, '0')} dead frame ${stillFrom.toFixed(2)}–${DUR.toFixed(2)} dtk (${still.toFixed(2)} dtk tanpa perubahan)`);
await b.close(); srv.close();
console.log(`visual QA: ${START.length - 1} shot, ${DUR.toFixed(2)} dtk, sampel tiap ${STEP} dtk`);
for (const w of warn) console.log('  ⚠ ' + w); for (const s of serious) console.log('  ✗ ' + s);
const fail = serious.length > 0 || (strict && warn.length > 0);
console.log(fail ? `visual QA GAGAL (${serious.length} serius, ${warn.length} peringatan)` : `visual QA ok (${warn.length} peringatan)`);
process.exit(fail ? 2 : 0);
