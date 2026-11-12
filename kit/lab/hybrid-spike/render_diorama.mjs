// usage: node render_diorama.mjs stills W t1,t2,…      → out/dio_<t>.png
//        node render_diorama.mjs video  W [from] [to]  → out/dio_frames/f_####.png (30 fps) + timing
import { createRequire } from 'node:module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..'), OUT = path.join(ROOT, 'kit/lab/hybrid-spike/out');
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(b); } }); }).listen(0);
const [mode, W = '540', a, b2] = process.argv.slice(2);
const br = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await br.newPage({ viewport: { width: +W, height: Math.round(+W * 16 / 9) } });
p.on('console', m => m.type() === 'error' && console.log('console.error', m.text())); p.on('pageerror', e => console.log('pageerror', e.message));
await p.goto(`http://localhost:${srv.address().port}/kit/lab/hybrid-spike/diorama.html?w=${W}`); const END = await p.evaluate(() => window.ready);
const save = (r, f) => fs.writeFileSync(f, Buffer.from(r.url.split(',')[1], 'base64'));
if (mode === 'stills') for (const t of a.split(',').map(Number)) { const t0 = Date.now(); const r = await p.evaluate(t => window.renderFrame(t), t); save(r, path.join(OUT, `dio_${t.toFixed(2)}.png`)); console.log('t', t, 'subframes', r.info.n, 'ms', Date.now() - t0); }
else { const f0 = Math.round((+a || 0) * 30), f1 = Math.round((+b2 || END) * 30), dir = path.join(OUT, 'dio_frames'); fs.mkdirSync(dir, { recursive: true }); const T0 = Date.now();
  for (let f = f0; f < f1; f++) { const r = await p.evaluate(t => window.renderFrame(t), f / 30); save(r, path.join(dir, `f_${String(f).padStart(4, '0')}.png`)); if (f % 30 === 0) console.log('frame', f, 'of', f1, ((Date.now() - T0) / (f - f0 + 1)).toFixed(0), 'ms/frame'); }
  console.log('done', f1 - f0, 'frames', ((Date.now() - T0) / 1000).toFixed(0), 's'); }
await br.close(); srv.close();
