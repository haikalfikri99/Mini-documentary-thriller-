// usage: node run.mjs [frames=59]  → out/2d_###.png, out/3d_###.png, timing + determinism report
import { createRequire } from 'node:module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..'), OUT = path.join(ROOT, 'kit/lab/hybrid-spike/out');
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2', '.png': 'image/png' };
const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(b); } }); }).listen(0);
const port = srv.address().port, N = +process.argv[2] || 59, T0 = 35.64, DUR = 37.60 - 35.64, FPS = 30;
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('console', m => m.type() === 'error' && console.log('console.error', m.text())); p.on('pageerror', e => console.log('pageerror', e.message));
await p.goto(`http://localhost:${port}/kit/lab/hybrid-spike/index.html`); await p.evaluate(() => window.ready);
const shot = async (mode, i) => p.evaluate(([m, u, t]) => window.renderFrame(m, u, t), [mode, Math.min(.999, i / (N - 1)), T0 + i / FPS]);
const save = (u, f) => fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64'));
for (const mode of ['2d', '3d']) {
  const t = Date.now();
  for (let i = 0; i < N; i++) save(await shot(mode, i), path.join(OUT, `${mode}_${String(i).padStart(3, '0')}.png`));
  console.log(mode, 'avg ms/frame', ((Date.now() - t) / N).toFixed(0));
}
const h = async i => crypto.createHash('md5').update(await shot('3d', i)).digest('hex');
const a = await h(29), c = (await h(5), await h(29)); console.log('determinism (frame 29 rendered twice, with another frame in between):', a === c ? 'IDENTICAL' : 'DIFFERENT');
await b.close(); srv.close();
