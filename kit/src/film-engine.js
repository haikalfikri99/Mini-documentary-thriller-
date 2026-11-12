// Film engine (channel standard): shots on the VO timeline, one camera per shot, transitions on the cut.
// Each shot is a function of u (0..1 through the shot) drawn into an offscreen canvas; the camera places it on the main canvas.
//
// createFilm({ shots, start, dur, cam, flashes, setCtx }) → { init(ctx), renderAt(t) }
//   start   : shot start times (s), length = shots.length + 1 (last = film end)
//   cam[i]  : { push (zoom gained over the shot; negative = pull back), fx, fy (0..1 push target), pan:[dx,dy],
//               slam: 1 (1.18 → 1 in 0.18 s, the ARSIP card), cuts:[t…] (+3.5 % per click), shake:[t0, dur, px] }
//   flashes : [[t0, dur, colour]] full-frame flashes/dips on the cut
//   setCtx  : the shots module's context setter
import { LIFE } from './arsip-rig.js';
const W = 1080, H = 1920;
const ease = x => (x = Math.max(0, Math.min(1, x)), x * x * (3 - 2 * x));
const out = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
export function createFilm({ shots, start, dur, cam = {}, flashes = [], setCtx }) {
  const off = document.createElement('canvas'); off.width = W; off.height = H; const og = off.getContext('2d');
  let main;
  const n = shots.length;
  function renderAt(t) {
    t = Math.max(0, Math.min(dur - 1e-4, t));
    let i = 0; while (i < n - 1 && t >= start[i + 1]) i++;
    const a = start[i], b = start[i + 1], u = (t - a) / (b - a), c = cam[i] || {};
    LIFE.t = t;   // idle blink + breath for every figure
    og.setTransform(1, 0, 0, 1, 0, 0); og.filter = 'none'; og.globalAlpha = 1; og.globalCompositeOperation = 'source-over'; og.clearRect(0, 0, W, H);
    setCtx(og); shots[i](Math.min(.999, u));
    let z = 1 + Math.max(0, c.push || 0) * ease(u), dx = 0, dy = 0;
    if ((c.push || 0) < 0) z = 1 - c.push * (1 - ease(u));   // pull back: starts in, eases out
    if (c.pan) { dx += c.pan[0] * ease(u); dy += c.pan[1] * ease(u); }
    if (c.slam) { const k = out((t - a) / .18); z *= 1.18 - .18 * k; }
    if (c.cuts) { z *= 1 + .035 * c.cuts.filter(x => t >= x).length; }
    if (c.shake) { const [t0, d, amp] = c.shake, k = t >= t0 ? Math.max(0, 1 - (t - t0) / d) : 0; dx += Math.sin(t * 90) * amp * k; dy += Math.cos(t * 77) * amp * k; }
    const fx = (c.fx ?? .5) * W, fy = (c.fy ?? .5) * H;
    main.setTransform(1, 0, 0, 1, 0, 0); main.filter = 'none'; main.globalAlpha = 1; main.fillStyle = '#000'; main.fillRect(0, 0, W, H);
    main.setTransform(z, 0, 0, z, fx - fx * z + dx, fy - fy * z + dy); main.drawImage(off, 0, 0);
    main.setTransform(1, 0, 0, 1, 0, 0);
    for (const [t0, d, col] of flashes) { const k = 1 - (t - t0) / d; if (k > 0 && k <= 1) { main.globalAlpha = k; main.fillStyle = col; main.fillRect(0, 0, W, H); main.globalAlpha = 1; } }
  }
  return { init: c => { main = c; }, renderAt };
}
