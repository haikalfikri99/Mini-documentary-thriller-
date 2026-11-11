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
