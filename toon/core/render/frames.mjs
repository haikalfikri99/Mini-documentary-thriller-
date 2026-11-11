// Render a page to transparent PNG frames: node core/render/frames.mjs <demo> --fps 12 --dur 2 --size 600x900 --q 'who=worker' --out dir
import fs from 'fs'; import path from 'path';
import { openDemo, closeServer, takeSize } from './page.mjs';
const args = process.argv.slice(2), take = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
const { w, h } = takeSize(args), fps = +take('--fps', 12), dur = +take('--dur', 2), q = take('--q', ''), out = take('--out', 'frames');
fs.mkdirSync(out, { recursive: true });
const { browser, page } = await openDemo(args[0], { w, h, q, gl: false });
const n = Math.round(fps * dur);
for (let i = 0; i < n; i++) { await page.evaluate(t => window.render(t), i / fps); await page.screenshot({ path: path.join(out, `f_${String(i).padStart(4, '0')}.png`), omitBackground: true }); }
console.log(`${n} frames → ${out}`); await browser.close(); closeServer();
