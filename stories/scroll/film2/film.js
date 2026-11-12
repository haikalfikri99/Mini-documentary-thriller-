// ARSIP 002 — the film: 25 shots on the VO timeline (storyboard v2), a camera per shot, transitions on the cut.
// Each shot is drawn into an offscreen canvas, then placed by the camera (push, slam, shake) on the main canvas.
import { SHOTS, setCtx } from './shots.js';
import { LIFE } from './rig/arsip-rig.js';

export const START = [0, 1.40, 2.96, 4.55, 5.00, 6.88, 8.26, 9.56, 10.40, 11.80, 12.68, 15.02, 17.30, 19.06, 20.80, 22.88, 24.94, 26.62, 28.10, 30.34, 32.18, 35.64, 37.60, 39.56, 41.54, 44.83];
export const DUR = 44.83;
const W = 1080, H = 1920;
const ease = x => (x = Math.max(0, Math.min(1, x)), x * x * (3 - 2 * x));
const out = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
// per-shot camera: push = zoom gained over the shot, fx/fy = where the push heads (0..1), plus event moves
const CAM = {
  0: { push: .06, fy: .4 }, 1: { push: .04, fy: .45 }, 2: { push: -.04, fy: .4 }, 3: { slam: 1 }, 4: { push: .05, fy: .5 },
  5: { push: .03, pan: [0, -120] }, 6: { push: .04, fx: .3, fy: .45 }, 7: { push: .03 }, 8: { cuts: [10.40, 10.66, 11.00] }, 9: { push: .06, fx: .68, fy: .62 },
  10: { push: .08, fy: .55 }, 11: { push: .02 }, 12: { push: .02 }, 13: { shake: [19.06, .35, 22] }, 14: { push: .03, pan: [-40, 0] },
  15: { push: .12 }, 16: { push: .05, fy: .3 }, 17: { push: .04, fy: .35, pan: [0, -60] }, 18: { push: .04, fy: .55 }, 19: { push: .04, fy: .6 },
  20: { push: .03, pan: [0, -70] }, 21: { push: .02 }, 22: { push: .02 }, 23: { push: -.1 }, 24: { push: .04, fy: .55 },
};
const off = document.createElement('canvas'); off.width = W; off.height = H; const og = off.getContext('2d');
let main;
export function init(c) { main = c; }
export function renderAt(t) {
  t = Math.max(0, Math.min(DUR - 1e-4, t));
  let i = 0; while (i < 24 && t >= START[i + 1]) i++;
  const a = START[i], b = START[i + 1], u = (t - a) / (b - a), c = CAM[i] || {};
  LIFE.t = t;
  og.setTransform(1, 0, 0, 1, 0, 0); og.filter = 'none'; og.globalAlpha = 1; og.globalCompositeOperation = 'source-over'; og.clearRect(0, 0, W, H);
  setCtx(og); SHOTS[i](Math.min(.999, u));
  // camera
  let z = 1 + (c.push || 0) * ease(u), dx = 0, dy = 0;
  if (c.pan) { dx += c.pan[0] * ease(u); dy += c.pan[1] * ease(u); }
  if (c.slam) { const k = out((t - a) / .18); z *= 1.18 - .18 * k; }
  if (c.cuts) { const n = c.cuts.filter(x => t >= x).length; z *= 1 + .035 * n; }
  if (c.shake) { const [t0, d, amp] = c.shake, k = Math.max(0, 1 - (t - t0) / d); dx += Math.sin(t * 90) * amp * k; dy += Math.cos(t * 77) * amp * k; }
  if (z < 1) z = 1 + Math.abs(z - 1);   // pull-backs are done as a push that starts in and eases out
  if ((c.push || 0) < 0) z = 1 - (c.push) * (1 - ease(u));
  const fx = (c.fx ?? .5) * W, fy = (c.fy ?? .5) * H;
  main.setTransform(1, 0, 0, 1, 0, 0); main.filter = 'none'; main.globalAlpha = 1; main.fillStyle = '#000'; main.fillRect(0, 0, W, H);
  main.setTransform(z, 0, 0, z, fx - fx * z + dx, fy - fy * z + dy); main.drawImage(off, 0, 0);
  main.setTransform(1, 0, 0, 1, 0, 0);
  // transitions on the cut: flash on the archive slam, dip before "Tapi" and into 2019, fade the laptop moment
  const flash = (t0, d, col) => { const k = 1 - (t - t0) / d; if (k > 0 && k <= 1) { main.globalAlpha = k; main.fillStyle = col; main.fillRect(0, 0, W, H); main.globalAlpha = 1; } };
  flash(4.55, .12, '#fff8e8'); flash(11.80, .1, '#000'); flash(28.10, .14, '#000'); flash(19.06, .08, '#ffb43a'); flash(0, .2, '#000');
}
