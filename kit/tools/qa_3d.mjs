// 3D QA gate: node kit/tools/qa_3d.mjs <film dir> [samples=12 | t1,t2,t3,…]   (a comma list renders exactly those times, for iterating on a shot)
//   loads the film's index.html in headless Chromium (software GL, like the HyperFrames renderer), then
//   1) renders the frame at 3 times twice with another frame in between → hashes must be identical (determinism)
//   2) renders `samples` frames across the world's camera path → saves them + a contact sheet (renders/qa3d/)
//   3) reports ms/frame and the projected full-render time; fails (exit 2) on a page error, a console error, or a non-deterministic frame.
import { createRequire } from 'node:module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import { execFileSync } from 'node:child_process';
const AT = (process.argv[3] || '').includes(',') ? process.argv[3].split(',').map(Number) : null, FILM = path.resolve(process.argv[2] || '.'), N = AT ? AT.length : (+process.argv[3] || 12), OUT = path.join(FILM, 'renders', 'qa3d'); fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(FILM, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(b); } }); }).listen(0);
const br = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await br.newPage({ viewport: { width: 1080, height: 1920 } }); const errors = [];
p.on('pageerror', e => errors.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/gsap|jsdelivr|ERR_(NAME|INTERNET|CONNECTION)|Failed to load resource/.test(m.text())) errors.push('console.error: ' + m.text()); });
await p.goto(`http://localhost:${srv.address().port}/index.html`); await p.waitForFunction(() => window.__world, null, { timeout: 120000 });
const D = await p.evaluate(() => window.__world.duration);
const keys = await p.evaluate(() => window.__world.keys || []), noWhy = keys.filter(k => !k.why);   // motivated camera: every move needs a story reason
const grab = t => p.evaluate(t => { window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: t, waitUntil() { } } })); return document.getElementById('world').toDataURL('image/png'); }, t);
const md5 = u => crypto.createHash('md5').update(u).digest('hex'); let bad = 0;
for (const t of [D * .2, D * .55, D * .9]) { const a = md5(await grab(t)); await grab(D * .05); const b = md5(await grab(t)); if (a !== b) { bad++; console.log(`✗ frame at ${t.toFixed(2)} s differs between two renders`); } }
const t0 = Date.now(), files = [];
for (let i = 0; i < N; i++) { const t = AT ? AT[i] : D * i / (N - 1) * .999, f = path.join(OUT, `q_${String(i).padStart(2, '0')}.png`); fs.writeFileSync(f, Buffer.from((await grab(t)).split(',')[1], 'base64')); files.push(f); }
const ms = (Date.now() - t0) / N;
try { execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', '1', '-i', path.join(OUT, 'q_%02d.png'), '-vf', 'scale=270:-1,tile=6x' + Math.ceil(N / 6), '-frames:v', '1', path.join(OUT, 'sheet.png')]); } catch { }
console.log(`3D QA: camera path ${D.toFixed(1)} s · determinism ${bad ? 'FAIL' : 'ok'} · ${ms.toFixed(0)} ms/frame in this probe (HyperFrames render ≈ ${(D * 28 / 60).toFixed(0)} min for this path, measured ~28 s render per film second) · errors ${errors.length}`);
if (keys.length && noWhy.length) console.log(`  ⚠ ${noWhy.length}/${keys.length} camera keys have no \`why\` (story reason): t = ${noWhy.map(k => k.t).join(', ')}`);
errors.slice(0, 8).forEach(e => console.log('  ' + e)); console.log('  contact sheet: ' + path.join(OUT, 'sheet.png'));
await br.close(); srv.close(); process.exit(bad || errors.length ? 2 : 0);
