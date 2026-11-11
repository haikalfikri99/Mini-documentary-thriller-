// look.js — the finish that every shot gets: depth planes (line weight + atmospheric haze), paper grain, animation on twos, camera shake.
import { g, W, H, S } from './toon.js';
import { mulberry, vnoise, clamp } from '/core/lib.js';

// Draw a depth plane: line weight scales with closeness (far .45 · mid .7 · near 1 · hero 1.15); haze (colour, alpha) is laid over everything drawn so far
export function plane(lw, fn, haze) {
  const old = S.lwScale; S.lwScale = lw; fn(); S.lwScale = old;
  if (haze) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = haze[1]; g.fillStyle = haze[0]; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
}
// Paper grain: three fixed noise plates, cycled with the line boil (12 fps)
let plates = null;
export function grain(a = .07) {
  if (!plates) plates = [0, 1, 2].map(i => {
    const c = document.createElement('canvas'); c.width = 540; c.height = 960; const x = c.getContext('2d'), d = x.createImageData(540, 960), r = mulberry(91 + i * 7);
    for (let k = 0; k < d.data.length; k += 4) { const v = 128 + (r() - .5) * 150; d.data[k] = d.data[k + 1] = d.data[k + 2] = v; d.data[k + 3] = 255; }
    x.putImageData(d, 0, 0); return c;
  });
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'overlay'; g.globalAlpha = a; g.imageSmoothingEnabled = false;
  g.drawImage(plates[S.boil % 3], 0, 0, W, H); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.imageSmoothingEnabled = true;
}
// Vignette: a soft frame darkening (post only; drawings stay flat)
export function vignette(a = .3, col = '0,0,0') {
  g.setTransform(1, 0, 0, 1, 0, 0); const r = g.createRadialGradient(W / 2, H * .48, H * .28, W / 2, H * .5, H * .75);
  r.addColorStop(0, `rgba(${col},0)`); r.addColorStop(1, `rgba(${col},${a})`); g.fillStyle = r; g.fillRect(0, 0, W, H);
}
// Animation on twos: character drawings hold for 2 frames at 24 fps (12 drawings/s); camera and effects stay on ones
export const twos = (t, fps = 12) => Math.floor(t * fps + 1e-6) / fps;
// Camera shake: low-frequency noise (not per-frame jitter) + decaying impact kicks
export function shake(t, amp, { freq = 2.6, seed = 0, hits = [] } = {}) {
  let a = amp; for (const h of hits) { const d = t - h; if (d >= 0) a += 26 * Math.exp(-d * 9) ; }
  return [(vnoise(t * freq + seed) - .5) * 2 * a, (vnoise(t * freq * 1.3 + seed + 40) - .5) * 2 * a, (vnoise(t * freq * .7 + seed + 90) - .5) * a * .0012];
}

// ———————————————— painterly finish (shared by every motion-comic panel)
// Paint texture: low-frequency pigment blotches + paper fibres + directional brush streaks, laid over the frame (soft-light).
let paintTex = null;
export function paint(a = .22, seed = 3) {
  if (!paintTex) {
    const c = document.createElement('canvas'); c.width = 540; c.height = 960; const x = c.getContext('2d'), r = mulberry(seed);
    x.fillStyle = '#808080'; x.fillRect(0, 0, 540, 960);
    for (let i = 0; i < 900; i++) {   // pigment blotches
      const px = r() * 540, py = r() * 960, rad = 6 + r() * 46, v = 128 + (r() - .5) * 70;
      const gr = x.createRadialGradient(px, py, 0, px, py, rad); gr.addColorStop(0, `rgba(${v},${v},${v},.35)`); gr.addColorStop(1, `rgba(${v},${v},${v},0)`); x.fillStyle = gr; x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
    }
    x.lineCap = 'round';
    for (let i = 0; i < 2600; i++) {   // brush streaks, mostly diagonal like a painter's hand
      const px = r() * 540, py = r() * 960, L = 6 + r() * 26, ang = -.6 + (r() - .5) * .5, v = 128 + (r() - .5) * 90;
      x.strokeStyle = `rgba(${v},${v},${v},.22)`; x.lineWidth = .6 + r() * 2.2; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(ang) * L, py + Math.sin(ang) * L); x.stroke();
    }
    const d = x.getImageData(0, 0, 540, 960);   // paper fibres
    for (let k = 0; k < d.data.length; k += 4) { const n = (r() - .5) * 26; d.data[k] += n; d.data[k + 1] += n; d.data[k + 2] += n; }
    x.putImageData(d, 0, 0); paintTex = c;
  }
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'soft-light'; g.globalAlpha = a;
  g.drawImage(paintTex, 0, 0, W, H); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
}
// Two-temperature grade: cool shadows, warm lights (multiply + screen washes)
export function grade2(cool = '#2a3a55', warm = '#ffd9a0', a = .16) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'multiply'; g.globalAlpha = a; g.fillStyle = cool; g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = 'soft-light'; g.globalAlpha = a * 1.2; g.fillStyle = warm; g.fillRect(0, 0, W, H);
  g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
}
// Depth of field for a band of the frame (e.g. the near ground): blurred copy faded in from y0 to y1
let dofC = null;
export function dof(y0, y1, px = 6, top = false) {
  if (!dofC) dofC = document.createElement('canvas'); dofC.width = W; dofC.height = H; const x = dofC.getContext('2d');
  x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, W, H); x.filter = `blur(${px}px)`; x.drawImage(g.canvas, 0, 0); x.filter = 'none';
  x.globalCompositeOperation = 'destination-in'; const gr = x.createLinearGradient(0, y0, 0, y1);
  gr.addColorStop(0, top ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)'); gr.addColorStop(1, top ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,1)'); x.fillStyle = gr; x.fillRect(0, 0, W, H); x.globalCompositeOperation = 'source-over';
  g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(dofC, 0, 0);
}
// Light shafts through haze (additive, soft)
export function shafts(x, y, ang, spread, col = '255,236,200', a = .12, n = 5) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'screen';
  for (let i = 0; i < n; i++) {
    const a0 = ang + (i - (n - 1) / 2) * spread, L = 2400, w = 60 + 50 * Math.sin(i * 2.1);
    const ex = x + Math.cos(a0) * L, ey = y + Math.sin(a0) * L, nx = -Math.sin(a0) * w, ny = Math.cos(a0) * w;
    const gr = g.createLinearGradient(x, y, ex, ey); gr.addColorStop(0, `rgba(${col},${a})`); gr.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = gr; g.beginPath(); g.moveTo(x, y); g.lineTo(ex + nx, ey + ny); g.lineTo(ex - nx, ey - ny); g.closePath(); g.fill();
  }
  g.globalCompositeOperation = 'source-over';
}
