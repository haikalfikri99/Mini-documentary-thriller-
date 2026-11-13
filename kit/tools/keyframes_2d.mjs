// Quick 2D keyframes without HyperFrames/audio: renders film.js at given times (or every shot's midpoint) to PNGs + a contact sheet.
//   node kit/tools/keyframes_2d.mjs stories/<slug>/film [t1,t2,...|mid|first] [outdir]
// "mid" = middle of every shot (storyboard), "first" = frame 0 of every shot. Default: mid. Output: film/board/kf_XX.png + sheet.jpg
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const film = path.resolve(process.argv[2]); const mode = process.argv[3] || 'mid'; const outDir = path.resolve(process.argv[4] || path.join(film, 'board'));
fs.mkdirSync(outDir, { recursive: true });
const types = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2', '.json': 'application/json' };
const page = `<!doctype html><html><head><meta charset="UTF-8"><style>@font-face{font-family:"Oswald";src:url("assets/fonts/Oswald.woff2");font-weight:600}@font-face{font-family:"Courier Prime";src:url("assets/fonts/CourierPrime.woff2");font-weight:700}html,body{margin:0;background:#000}</style></head><body><canvas id="c" width="1080" height="1920"></canvas><script type="module">
import * as F from './film.js'; const c=document.getElementById('c'); F.init(c.getContext('2d'));
await document.fonts.load('600 40px Oswald'); await document.fonts.load('700 30px "Courier Prime"');
window.render=t=>{F.renderAt(t);return true}; window.START=F.START; window.ready=true;</script></body></html>`;
const srv = http.createServer((req, res) => { const u = decodeURIComponent(req.url.split('?')[0]); if (u === '/__kf.html') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(page); }
  const f = path.join(film, u); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }).listen(0);
const port = srv.address().port; const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.error('PAGE ERROR', e.message)); p.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
await p.goto(`http://127.0.0.1:${port}/__kf.html`); await p.waitForFunction('window.ready === true', null, { timeout: 30000 });
const START = await p.evaluate('window.START');
let T = mode === 'mid' ? START.slice(0, -1).map((a, i) => (a + START[i + 1]) / 2) : mode === 'first' ? START.slice(0, -1).map(a => a + .01) : mode.split(',').map(Number);
const files = [];
for (const [i, t] of T.entries()) { await p.evaluate(t => window.render(t), t); const f = path.join(outDir, `kf_${String(i + 1).padStart(2, '0')}.png`); await (await p.$('#c')).screenshot({ path: f }); files.push(f); }
await b.close(); srv.close();
const cols = Math.min(5, files.length), sheet = path.join(outDir, 'sheet.jpg');
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', path.join(outDir, 'kf_%02d.png'), '-vf', `scale=216:384,tile=${cols}x${Math.ceil(files.length / cols)}:padding=6:color=black`, '-frames:v', '1', sheet]);
console.log(`${files.length} keyframes at t=${T.map(t => t.toFixed(2)).join(', ')} → ${outDir}/sheet.jpg`);
