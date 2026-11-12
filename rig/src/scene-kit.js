// Scene kit: the reference look as small reusable helpers (see research/referensi/ANALISA_VISUAL_2D.md).
// Clean shapes without outlines, a gradient on every big surface, contact shadows, light pools, depth blur, vignette, grain.
export const W = 1080, H = 1920;
let g;
export const use = c => { g = c; };
export const ctx = () => g;

export function vgrad(x, y, w, h, c0, c1) { const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(x, y, w, h); }
export function hgrad(x, y, w, h, c0, c1) { const gr = g.createLinearGradient(x, 0, x + w, 0); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(x, y, w, h); }
export function rrect(x, y, w, h, r, fill) { g.fillStyle = fill; g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); }
export function poly(pts, fill) { g.fillStyle = fill; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.closePath(); g.fill(); }
export function ellipse(x, y, rx, ry, fill) { g.fillStyle = fill; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); g.fill(); }
export function line(pts, w, col) { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.stroke(); }
const rgba = (rgb, a) => rgb.replace('rgb(', 'rgba(').replace(')', `,${a})`);

// additive light pool around a source
export function pool(x, y, r, rgb, a) { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, rgba(rgb, a)); gr.addColorStop(1, rgba(rgb, 0)); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); }
// darkness that falls away from a light (multiply), keeps the frame's value structure
export function shadowFall(x, y, r0, r1, a) { g.save(); const gr = g.createRadialGradient(x, y, r0, x, y, r1); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${a})`); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore(); }
// a beam of window light: translucent quad
export function shaft(pts, rgb, a) { g.save(); g.globalCompositeOperation = 'lighter'; const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); const gr = g.createLinearGradient(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)); gr.addColorStop(0, rgba(rgb, a)); gr.addColorStop(1, rgba(rgb, 0)); poly(pts, gr); g.restore(); }
export function contact(x, y, rx, a = .3) { ellipse(x, y, rx, rx * .14, `rgba(0,0,0,${a})`); }
export function vignette(a = .4) { const gr = g.createRadialGradient(W / 2, H * .46, H * .22, W / 2, H * .5, H * .78); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${a})`); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
export function grain(seed, a = .045) { g.save(); g.globalAlpha = a; for (let i = 0; i < 2600; i++) { const r = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, r2 = Math.sin(i * 4.1 + seed) * 9e3; g.fillStyle = i % 2 ? '#fff' : '#000'; g.fillRect((r - Math.floor(r)) * W, (r2 - Math.floor(r2)) * H, 2, 2); } g.restore(); }
// depth of field: draw fn on its own canvas and composite it blurred
export function depth(px, fn) {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const o = g; g = c.getContext('2d'); fn(g); g = o;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = px ? `blur(${px}px)` : 'none'; g.drawImage(c, 0, 0); g.restore();
}
// whole-frame grade: tint multiply + warm/cool lift
export function grade(tint, a) { g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = a; g.fillStyle = tint; g.fillRect(0, 0, W, H); g.restore(); }
