// Fast preview of a 3D film without HyperFrames/audio: node kit/tools/preview_3d.mjs <film dir> [width=540] [from=0] [to=end] [out.mp4]
// (the real render is `make_film.sh`; this is for iterating on camera and set — about 10× quicker at 540 px wide)
import { createRequire } from 'node:module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const [dir = '.', Ws = '540', a, b2, outArg] = process.argv.slice(2), FILM = path.resolve(dir), W = +Ws, H = Math.round(W * 16 / 9), FPS = 30;
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(FILM, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(b); } }); }).listen(0);
const br = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await br.newPage({ viewport: { width: W, height: H } }); p.on('pageerror', e => console.log('pageerror', e.message));
await p.goto(`http://localhost:${srv.address().port}/index.html?w=${W}`); await p.waitForFunction(() => window.__world, null, { timeout: 120000 });
const D = await p.evaluate(() => window.__world.duration), f0 = Math.round((+a || 0) * FPS), f1 = Math.round((+b2 || D) * FPS);
const dir2 = path.join(FILM, 'renders', 'preview_frames'); fs.rmSync(dir2, { recursive: true, force: true }); fs.mkdirSync(dir2, { recursive: true }); const T0 = Date.now();
for (let f = f0; f < f1; f++) { const u = await p.evaluate(t => { window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: t, waitUntil() { } } })); return document.getElementById('world').toDataURL('image/jpeg', .92); }, f / FPS); fs.writeFileSync(path.join(dir2, `f_${String(f - f0).padStart(5, '0')}.jpg`), Buffer.from(u.split(',')[1], 'base64')); if ((f - f0) % 60 === 0) console.log('frame', f - f0, '/', f1 - f0); }
const out = path.resolve(outArg || path.join(FILM, 'renders', 'preview.mp4'));
execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir2, 'f_%05d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', out]); fs.rmSync(dir2, { recursive: true, force: true });
console.log('preview →', out, ((Date.now() - T0) / 1000).toFixed(0), 's'); await br.close(); srv.close();
