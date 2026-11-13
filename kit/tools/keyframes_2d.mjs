// Storyboard / keyframes of a canvas film (film.js: init, renderAt, START): PNGs + a contact sheet, no audio, seconds.
//   node kit/tools/keyframes_2d.mjs stories/<slug>/kolase [board|mid|first|t1,t2,...] [outdir]
// board (default) = 85% into every shot (the shot's composition is complete) + a numbered grid board/storyboard.jpg for review;
// mid = middle of every shot; first = frame 0 of every shot. Output: <film>/board/kf_XX.png + sheet.jpg
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const film = path.resolve(process.argv[2]); const mode = process.argv[3] || 'board'; const outDir = path.resolve(process.argv[4] || path.join(film, 'board'));
fs.mkdirSync(outDir, { recursive: true });
const types = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2', '.json': 'application/json' };
const page = `<!doctype html><html><head><meta charset="UTF-8"><style>html,body{margin:0;background:#000}</style></head><body><canvas id="c" width="1080" height="1920"></canvas><script type="module">
import * as F from './film.js'; const c=document.getElementById('c'); await F.init(c.getContext('2d'));
window.render=t=>{F.renderAt(t);return true}; window.START=F.START; window.ready=true;</script></body></html>`;
const srv = http.createServer((req, res) => { const u = decodeURIComponent(req.url.split('?')[0]); if (u === '/__kf.html') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(page); }
  const f = path.join(film, u); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }).listen(0);
const port = srv.address().port; const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.error('PAGE ERROR', e.message)); p.on('console', m => { if (m.type() === 'error' && !m.text().includes('missing part')) console.error('console:', m.text()); });
await p.goto(`http://127.0.0.1:${port}/__kf.html`); await p.waitForFunction('window.ready === true', null, { timeout: 180000 });
const START = await p.evaluate('window.START');
let T = mode === 'board' ? START.slice(0, -1).map((a, i) => a + 0.85 * (START[i + 1] - a)) : mode === 'mid' ? START.slice(0, -1).map((a, i) => (a + START[i + 1]) / 2) : mode === 'first' ? START.slice(0, -1).map(a => a + .01) : mode.split(',').map(Number);
const files = [];
for (const [i, t] of T.entries()) { await p.evaluate(t => window.render(t), t); const f = path.join(outDir, `kf_${String(i + 1).padStart(2, '0')}.png`); await (await p.$('#c')).screenshot({ path: f }); files.push(f); }
await b.close(); srv.close();
const cols = Math.min(5, files.length), sheet = path.join(outDir, 'sheet.jpg');
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', path.join(outDir, 'kf_%02d.png'), '-vf', `scale=216:384,tile=${cols}x${Math.ceil(files.length / cols)}:padding=6:color=black`, '-frames:v', '1', sheet]);
if (mode === 'board') execFileSync('python3', ['-c', `
import sys, glob
from PIL import Image, ImageDraw, ImageFont
fs = sorted(glob.glob(sys.argv[1] + '/kf_*.png')); T = (324, 576); C = 5; R = (len(fs) + C - 1) // C
g = Image.new('RGB', (C * T[0] + (C + 1) * 8, R * T[1] + (R + 1) * 8), (20, 18, 16)); d = ImageDraw.Draw(g)
f = ImageFont.truetype(sys.argv[2], 26)
for i, p in enumerate(fs):
    x = 8 + (i % C) * (T[0] + 8); y = 8 + (i // C) * (T[1] + 8)
    g.paste(Image.open(p).convert('RGB').resize(T, Image.LANCZOS), (x, y)); d.rectangle([x, y, x + 46, y + 34], fill=(30, 25, 21)); d.text((x + 6, y + 3), '%02d' % (i + 1), font=f, fill=(243, 234, 214))
g.save(sys.argv[1] + '/storyboard.jpg', quality=88)`, outDir, path.resolve(path.dirname(new URL(import.meta.url).pathname), '../collage/fonts/CourierPrime-Bold.ttf')]);
console.log(`${files.length} keyframes at t=${T.map(t => t.toFixed(2)).join(', ')} → ${outDir}/sheet.jpg`);
