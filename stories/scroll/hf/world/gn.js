// gn.js — the "graphic-novel, mid-key" look (LOOK.md, direction E): a graphic-novel head for the Cast Kit body
// (almond eyes with heavy lids, nose as a shadow shape, firm jaw), the cast of #002, and the three worlds' sets.
import { clamp, lerp, hash } from '../lib/toon/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, dot, zoom } from '../lib/toon/toon.js';
import { form, setLight, person, SKIN, LIGHT } from '../lib/toon/cast.js';
import { paint, grade2, grain, vignette } from '../lib/toon/look.js';

export const SCREEN = '#7fe3ff', AMBER = '#ffb43a';
const N = (pts, rx, ry) => pts.map(([x, y]) => [x * rx, y * ry]);

// —— the head: 3/4 view facing +x (the body's face = -1 mirrors it). P.gn = { lid, brow, inner, look, sm, open, glasses, glint, beard, stubble, closed }
export function gnHead(P, b) {
  const o = P.gn || {}, k = o.headScale ?? .8, rx = b.hr[0] * 1.02 * k, ry = b.hr[1] * k, sk = (P.skin || SKIN.light), hairC = P.hairCol || '#2a211d';
  push(); translate(0, b.hr[1] * (1 - k) * 1.25);   // adult proportions: a smaller head that still meets the neck
  // hair behind the head (volume at the back)
  form(N([[-1.0, .25], [-1.12, -.45], [-.82, -1.04], [-.1, -1.22], [.5, -1.12], [.2, -.6], [-.6, -.1]], rx, ry), hairC, { lw: 6, sw: 10, rim: false });
  form(N([[-.6, .02], [-.5, -.1], [-.42, .05], [-.48, .32], [-.62, .3]], rx, ry), sk[0], { lw: 5, sw: 6 });   // ear
  const face = N([[-.82, -.2], [-.7, -.72], [-.25, -1.0], [.36, -.96], [.8, -.62], [.96, -.18], [.94, .1], [1.0, .28], [.86, .6], [.56, .9], [.2, 1.02], [-.18, .96], [-.56, .72], [-.74, .36]], rx, ry);
  form(spline(face, true, 10), sk[0], { lw: 7, sw: 30 });
  // nose: a shadow shape on the far side of the ridge + the nostril line (no outlined triangle)
  fillOnly(spline(N([[.66, -.12], [.82, .24], [.74, .33], [.62, .3]], rx, ry), true, 6), sk[1], { alpha: .85, boil: .4 });
  stroke(spline(N([[.62, .33], [.72, .36], [.82, .3]], rx, ry), false, 6), 5);
  // cheek shadow under the cheekbone (adds bone structure)
  fillOnly(spline(N([[.2, .3], [.5, .42], [.4, .62], [.12, .55]], rx, ry), true, 6), sk[1], { alpha: .35, boil: .4 });
  // eyes: almond whites, dark iris, heavy upper lid
  const lid = o.lid ?? .32, look = o.look || [.25, .1];
  for (const [ex, ey, w, h] of [[.48, -.12, .2, .09], [-.02, -.12, .16, .08]]) {
    const X = ex * rx, Y = ey * ry, Wd = w * rx, Hd = h * ry;
    if (o.closed) { stroke(spline([[X - Wd, Y], [X, Y + Hd * .7], [X + Wd, Y - Hd * .1]], false, 8), 6); continue; }
    const almond = spline([[X - Wd, Y + Hd * .2], [X - Wd * .1, Y - Hd], [X + Wd, Y - Hd * .1], [X + Wd * .2, Y + Hd * .95]], true, 8);
    shape(almond, { fill: '#f1ebe0', lw: 4, shade: () => {
      dot(X + look[0] * Wd * .5, Y + look[1] * Hd * .5 + Hd * .1, Hd * .95, '#2b1f19');
      if (o.glint) dot(X + look[0] * Wd * .5 + Hd * .35, Y + look[1] * Hd * .5 - Hd * .25, Hd * .28, o.glint);
      fillOnly([[X - Wd * 1.4, Y - Hd * 2.2], [X + Wd * 1.4, Y - Hd * 2.2], [X + Wd * 1.4, Y - Hd + lid * 2 * Hd], [X - Wd * 1.4, Y - Hd + lid * 2 * Hd]], sk[0], { boil: .3 });
    } });
    stroke(spline([[X - Wd * 1.08, Y + Hd * .2], [X - Wd * .1, Y - Hd + lid * 2 * Hd - 2], [X + Wd * 1.05, Y - Hd * .2]], false, 8), 7);
  }
  // brows (inner end lifts when sad)
  const br = o.brow ?? 0, inn = o.inner ?? 0;
  stroke(spline(N([[.3, -.32 - inn * .08], [.48, -.36 - br * .06], [.7, -.31]], rx, ry), false, 8), 10);
  stroke(spline(N([[-.17, -.3], [-.02, -.34 - br * .06], [.12, -.31 - inn * .08]], rx, ry), false, 8), 9);
  // mouth
  const sm = o.sm ?? 0;
  if (o.open) shape(ell(.54 * rx, .62 * ry, .1 * rx, o.open * .1 * ry), { fill: '#3d1622', lw: 5 });
  else stroke(spline(N([[.36, .6 - sm * .04], [.53, .62 + sm * .03], [.7, .58 - sm * .04]], rx, ry), false, 6), 6);
  if (o.stubble) for (let i = 0; i < 46; i++) dot((-.4 + hash(i * 3.1) * 1.25) * rx, (.45 + hash(i * 7.7) * .5) * ry, 1.7, sk[1]);
  if (o.beard) form(spline(N([[-.72, .32], [-.55, .82], [.1, 1.12], [.62, .96], [.92, .58], [.74, .68], [.56, .74], [.4, .7], [.2, .78], [-.25, .62]], rx, ry), true, 8), hairC, { lw: 6, sw: 8 });
  // hair on top: wavy mass with a fringe edge
  form(spline(N([[-.88, .02], [-.98, -.56], [-.66, -1.04], [-.05, -1.2], [.52, -1.08], [.92, -.7], [1.0, -.4], [.82, -.5], [.66, -.38], [.48, -.54], [.26, -.42], [.04, -.58], [-.2, -.44], [-.42, -.52], [-.58, -.22], [-.66, .1]], rx, ry), true, 10), hairC, { lw: 7, sw: 14, rim: false });
  // glasses: thin frames, the screen reflected in the lenses
  if (o.glasses) {
    for (const [x0, x1] of [[.28, .74], [-.2, .14]]) { const L = rr(x0 * rx, -.26 * ry, (x1 - x0) * rx, .3 * ry, 9);
      shape(L, { fill: null, lw: 5 }); if (o.lens) fillOnly([[x0 * rx + 6, -.22 * ry], [(x0 + (x1 - x0) * .55) * rx, -.22 * ry], [(x0 + (x1 - x0) * .35) * rx, .0 * ry], [x0 * rx + 6, .0 * ry]], o.lens, { alpha: .45, boil: .2 }); }
    stroke(N([[.14, -.14], [.28, -.14]], rx, ry), 5); stroke(N([[-.2, -.16], [-.5, -.1]], rx, ry), 5);
  }
  pop();
}

// —— cast ——
export const RASKIN06 = { body: 'man', skin: SKIN.light, hairCol: '#2b221d', top: { type: 'shirt', col: '#6f8597', collar: '#5f7486' }, bottom: { type: 'trousers', col: '#3b3f48' }, shoes: { col: '#2a2626' }, headFn: gnHead };
export const RASKIN19 = { ...RASKIN06, hairCol: '#3a2f29', top: { type: 'sweater', col: '#4a5260' } };
export const KAMU = { body: 'man', skin: SKIN.tan, hairCol: '#15110f', top: { type: 'kaos', col: '#8a4f48' }, bottom: { type: 'trousers', col: '#3e3a40' }, shoes: { col: '#2a2626' }, headFn: gnHead };

// —— finishing: the #001 paint look, mid-key (light vignette, no crushing) ——
// photographic depth: draw a layer offscreen, then lay it down blurred (background softness or a soft foreground)
import { init, setM, getM } from '../lib/toon/toon.js';
// where a Cast Kit hand lands (3/4 or side view): shoulder + pose.h, in screen px — props are placed in the hand, not guessed
import { BASE } from '../lib/toon/cast.js';
export function handAt(P, which = 'F') {
  const b = BASE[P.body || 'man'], s = P.s ?? 1, f = P.face ?? 1, a = P.pose[which === 'F' ? 'armF' : 'armB'], sh = which === 'F' ? [b.shX, b.sh + 14] : [-b.shX, b.sh + 16];
  return [P.x + (sh[0] + a.h[0]) * s * f, P.y + (sh[1] + a.h[1]) * s];
}
export function layer(fn, blur = 0, a = 1) {
  const main = g.canvas, c = document.createElement('canvas'); c.width = W; c.height = H; const m = getM();
  init(c); setM([1, 0, 0, 1, 0, 0]); fn(); init(main); setM(m);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); if (blur) g.filter = `blur(${blur}px)`; g.globalAlpha = a; g.drawImage(c, 0, 0); g.restore(); g.filter = 'none';
}
export function finishGN({ cool = '#2f3c55', warm = '#ffd9a0', a = .1, vig = .22, p = .3 } = {}) { paint(p); grade2(cool, warm, a); grain(.045); vignette(vig); }
// soft pool of light (additive, for lamps and screens)
export function pool(x, y, r, col, a = .35, op = 'screen') { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = op; const gr = g.createRadialGradient(x, y, 6, x, y, r); gr.addColorStop(0, col.replace(')', `,${a})`).replace('rgb', 'rgba')); gr.addColorStop(1, col.replace(')', ',0)').replace('rgb', 'rgba')); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore(); }
