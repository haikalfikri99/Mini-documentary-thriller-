// fx.js — effects with physical behaviour: viscous molasses material, drops (swell · pinch · stretch · splash), ballistic debris.
import { clamp, lerp, hash, TAU } from '/core/lib.js';
import { push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, arc, spline, rect, noodle, dot } from './toon.js';
import { form } from './cast.js';

// Molasses: near-black brown body; the threat colour lives in its highlights, rim and glow
export const MOL = { body: '#2f1608', mid: '#4a230a', deep: '#1a0b03', hi: '#ff9f1c', spec: '#ffe2a6', glow: '#ffb43a' };
export const ballistic = (p0, v, gy, t) => [p0[0] + v[0] * t, p0[1] + v[1] * t + .5 * gy * t * t];

// A molasses drop centred at (x, y): r radius, st stretch (1 = round, >1 elongated while falling)
export function drop(x, y, r, st = 1) {
  const h = r * st, P = spline([[x, y - h * 1.5], [x + r * .55, y - h * .3], [x + r, y + h * .35], [x, y + h], [x - r, y + h * .35], [x - r * .55, y - h * .3]]);
  shape(P, { fill: MOL.body, lw: 5, shade: () => { fillOnly(ell(x - r * .35, y + h * .05, r * .22, h * .38, 12), MOL.hi, { boil: .2 }); dot(x - r * .3, y - h * .2, Math.max(2, r * .12), MOL.spec); } });
}
// The drop forming at a seam: k 0..1 swell, neck thins before it lets go
export function hangingDrop(x, y, k, r = 16) {
  const neck = lerp(r * .7, r * .18, clamp((k - .55) / .45)), len = lerp(r * .6, r * 2.4, k);
  shape(spline([[x - r * .9, y], [x + r * .9, y], [x + neck, y + len * .55], [x + r * (.7 + .3 * k), y + len], [x, y + len + r * (1 + .3 * k)], [x - r * (.7 + .3 * k), y + len], [x - neck, y + len * .55]]),
    { fill: MOL.body, lw: 5, shade: () => { fillOnly(ell(x - r * .3, y + len + r * .2, r * .2, r * .42, 10), MOL.hi, { boil: .2 }); dot(x - r * .25, y + len, Math.max(2, r * .1), MOL.spec); } });
}
// A splash crown: k 0..1 after impact
export function splash(x, y, k, r = 30) {
  if (k <= 0 || k >= 1) return;
  for (const a of [-1, -.55, -.15, .2, .6, 1]) { const p = ballistic([x, y], [a * r * 6, -r * 9 * (1 - Math.abs(a) * .3)], r * 40, k * .4); drop(p[0], p[1], r * .2 * (1 - k * .6), 1.2); }
  stroke(arc(x, y, r * (1 + k * 1.5), r * .35 * (1 + k), Math.PI, TAU, 16), 4, { line: MOL.hi, alpha: 1 - k });
}
// Debris
export function plank(x, y, a, w = 180, h = 30, col = '#6f5a44') { push(); translate(x, y); rotate(a); form(rect(-w / 2, -h / 2, w, h), col, { lw: 6, sw: 8, shade: () => { stroke([[-w / 2 + 10, -3], [w / 2 - 10, 2]], 2.5); dot(-w / 2 + 14, 0, 3); dot(w / 2 - 14, 0, 3); } }); pop(); }
export function barrel(x, y, a, s = 1, col = '#7a5b3e') {
  push(); translate(x, y); rotate(a); scale(s);
  form(spline([[-38, -56], [38, -56], [48, 0], [38, 56], [-38, 56], [-48, 0]]), col, { lw: 6, sw: 12, shade: () => { for (const yy of [-34, 34]) fillOnly(rect(-60, yy - 6, 120, 12), '#4a4440', { boil: .3 }); stroke([[-14, -56], [-16, 56]], 2.5); stroke([[16, -56], [18, 56]], 2.5); } });
  pop();
}
export function wheel(x, y, a, r = 52, col = '#5c4a3a') {
  push(); translate(x, y); rotate(a);
  form(ell(0, 0, r, r, 30), col, { lw: 6, sw: 8, shade: () => { fillOnly(ell(0, 0, r * .72, r * .72, 24), '#8a7a66', { boil: .3 }); for (let k = 0; k < 8; k++) stroke([[0, 0], [Math.cos(k * TAU / 8) * r * .72, Math.sin(k * TAU / 8) * r * .72]], 4); dot(0, 0, r * .14); } });
  pop();
}
