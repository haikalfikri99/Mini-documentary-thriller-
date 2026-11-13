// Render a canvas film (film.js with init/renderAt/DUR, optional EV) frame by frame to video, or dump its sound events.
//   node kit/tools/render_2d.mjs <film dir> video [out.mp4] [fps=30] [from] [to]   → silent H.264 (frames piped to ffmpeg)
//   node kit/tools/render_2d.mjs <film dir> events [events.json] [fps=30]           → on-screen events for the SFX mix
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const film = path.resolve(process.argv[2]), mode = process.argv[3] || 'video';
const out = path.resolve(process.argv[4] || path.join(film, mode === 'video' ? 'renders/visual.mp4' : 'events.json'));
const fps = +(process.argv[5] || 30);
const types = { '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
const page = `<!doctype html><html><head><meta charset="UTF-8"><style>html,body{margin:0;background:#000}</style></head><body><canvas id="c" width="1080" height="1920"></canvas><script type="module">
import * as F from './film.js'; const c=document.getElementById('c'); await F.init(c.getContext('2d'));
window.render=t=>{F.renderAt(t);return true}; window.DUR=F.DUR; window.EVX=F.EV||null;
window.grab=q=>c.toDataURL('image/jpeg',q).slice(23); window.ready=true;</script></body></html>`;
const srv = http.createServer((req, res) => { const u = decodeURIComponent(req.url.split('?')[0]); if (u === '/__r.html') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(page); }
  const f = path.join(film, u); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }).listen(0);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.error('PAGE ERROR', e.message)); p.on('console', m => { if (m.type() === 'error' && !m.text().includes('missing part')) console.error('console:', m.text()); });
await p.goto(`http://127.0.0.1:${srv.address().port}/__r.html`); await p.waitForFunction('window.ready === true', null, { timeout: 180000 });
const DUR = await p.evaluate('window.DUR'); const from = +(process.argv[6] || 0), to = +(process.argv[7] || DUR);
const N = Math.round((to - from) * fps);
if (mode === 'events') {
  await p.evaluate(fps => { EVX.on = true; EVX.dt = 1 / fps; EVX.list.length = 0; }, fps);
  for (let i = 0; i <= N; i++) await p.evaluate(t => window.render(t), from + i / fps);
  const ev = await p.evaluate('window.EVX.list'); fs.writeFileSync(out, JSON.stringify(ev, null, 0).replace(/},{/g, '},\n{'));
  console.log(`${ev.length} events → ${out}`);
} else {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    const b64 = await p.evaluate(t => { window.render(t); return window.grab(0.93); }, from + i / fps);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`frame ${i}/${N} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log(`${N} frames → ${out}`);
}
await b.close(); srv.close();
