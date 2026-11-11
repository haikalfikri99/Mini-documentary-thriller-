// cast.js — Cast Kit: 3 base bodies (man, woman, child) + swappable wardrobe, hair, hats, face and expressions.
// Built on toon.js (boiling ink line, flat fill). Coordinates: origin at the feet, y down, units ≈ px at s = 1.
// face = 1 → 3/4 view facing right, -1 mirrors. A story only declares presets: { body, skin, hair, hat, top, bottom, shoes, acc }.
import { clamp, lerp, hash } from '/core/lib.js';
import { INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, arc, spline, rr, rect, noodle, dot, crescent, zoom, S } from './toon.js';

export const WHITE = '#fffdf7', MOUTH = '#3d1622', TONGUE = '#d9606f';
// eye proportions for the channel: a little smaller than the source style, larger pupils (reads serious, not goofy)
export const EYE = { scale: .84, pupil: 1.3 };

// —— light: one key direction per scene (screen space, pointing TO the light) + optional threat-coloured rim ——
export const LIGHT = { dir: [-.55, -.83], tint: '#1d1830', a: .30, sw: 22, rim: null, rimA: .9, rw: 8 };
export function setLight(o) { Object.assign(LIGHT, { rim: null }, o); const [x, y] = LIGHT.dir, l = Math.hypot(x, y) || 1; LIGHT.dir = [x / l, y / l]; }
// form: a filled, outlined shape with a hard shadow crescent away from the light and a rim crescent toward it
export function form(pts, fill, o = {}) {
  return shape(pts, {
    fill, lw: o.lw ?? 7, boil: o.boil, line: o.line, shade: () => {
      const z = zoom(), [lx, ly] = LIGHT.dir;
      if (!o.flat) crescent(pts, lx * (o.sw ?? LIGHT.sw) * z, ly * (o.sw ?? LIGHT.sw) * z, LIGHT.tint, LIGHT.a);
      o.shade?.();
      if (LIGHT.rim && o.rim !== false) crescent(pts, -lx * LIGHT.rw * z, -ly * LIGHT.rw * z, LIGHT.rim, LIGHT.rimA);
    }
  });
}

// —— skin tones ——
export const SKIN = {
  fair: ['#f3cfac', '#d9a985'], light: ['#eebf97', '#cf9a72'], tan: ['#d39b6c', '#b07a4f'],
  brown: ['#b07a50', '#8c5b38'], deep: ['#7d5236', '#5f3c26'],
};

// —— base bodies ——
const BASE = {
  man: { hip: -262, sh: -452, shX: 74, hipX: 28, chest: 92, waist: 80, hipW: 82, head: [16, -566], hr: [86, 100], leg: [46, 38], arm: [40, 32], hand: 22, eye: 1, foot: 1 },
  woman: { hip: -262, sh: -446, shX: 60, hipX: 24, chest: 74, waist: 58, hipW: 80, head: [12, -556], hr: [80, 96], leg: [36, 28], arm: [32, 26], hand: 19, eye: 1.06, foot: .85 },
  child: { hip: -150, sh: -280, shX: 46, hipX: 18, chest: 56, waist: 54, hipW: 58, head: [8, -380], hr: [84, 90], leg: [32, 27], arm: [27, 22], hand: 17, eye: 1.18, foot: .75 },
};

// —— expressions ——
export const EXPR = {
  neutral: { lid: .28, brow: 0, inner: 0, mouth: { o: 0, sm: 0 } },
  calm: { lid: .32, brow: .1, inner: 0, mouth: { o: 0, sm: .55 } },
  worried: { lid: .08, brow: .35, inner: .9, pupil: 4, mouth: { o: .12, w: .7, sm: -.6 } },
  fear: { lid: 0, brow: .8, inner: 1, eyeS: 1.12, pupil: 3, mouth: { o: .5, w: .7, sm: -.8 } },
  shock: { lid: 0, brow: 1.1, inner: .3, eyeS: 1.22, pupil: 2.6, mouth: { o: .95, w: .55, sm: -.1 } },
  scream: { lid: 0, brow: .7, inner: 1, eyeS: 1.08, pupil: 2.8, mouth: { o: 1, w: 1.05, sm: -.7 } },
  determined: { lid: .38, brow: -.25, inner: -.9, mouth: { o: 0, w: .8, sm: -.35 } },
  sad: { lid: .5, brow: .2, inner: 1, look: [0, .45], mouth: { o: 0, w: .7, sm: -.85 } },
  delight: { closed: true, brow: .35, inner: .2, mouth: { o: .3, w: .8, sm: .9 } },
  curious: { lid: .1, brow: .45, inner: -.2, look: [.3, -.6], mouth: { o: .08, w: .5, sm: .2 } },
};

// —— poses (armB = back arm, armF = front arm; h = hand offset from shoulder) ——
export const POSE = {
  stand: { lean: 0, armB: { h: [-16, 178], bend: -14 }, armF: { h: [16, 176], bend: 14 }, legB: [0, 0], legF: [0, 0] },
  run: { lean: .1, bob: -12, armB: { h: [-82, 112], bend: 46 }, armF: { h: [74, 88], bend: -58, fist: 1 }, legB: [-46, -34, 10], legF: [44, -70, -16] },
  point: { lean: .02, armB: { h: [-12, 176], bend: -14 }, armF: { h: [150, -96], bend: -8, hand: 'point' }, legB: [-10, 0], legF: [12, 0] },
  shield: { lean: -.1, armB: { h: [40, -96], bend: -48, hand: 'open' }, armF: { h: [58, -112], bend: -56, hand: 'open' }, legB: [-22, 0], legF: [26, 0] },
  pull: { lean: -.16, armB: { h: [150, 20], bend: -6, fist: 1 }, armF: { h: [160, 34], bend: -8, fist: 1 }, legB: [-44, 0], legF: [40, 0] },
  mouth: { lean: -.04, armB: { h: [-14, 176], bend: -14 }, armF: { h: [70, -150], bend: -70, hand: 'open' }, legB: [-8, 0], legF: [10, 0] },
};
const mix = (a, b) => ({ ...a, ...b });

// —— hands ——
export function hand(x, y, ang, r, col, kind = 'open') {
  push(); translate(x, y); rotate(ang);
  if (kind === 'fist' || kind === 'point') {
    form(spline([[-r * .6, -r * .8], [r * .7, -r * .9], [r * 1.1, -r * .1], [r * .8, r * .8], [-r * .5, r * .9], [-r * .9, 0]]), col, { lw: 6, sw: 6 });
    if (kind === 'point') form(noodle([r * .6, -r * .45], [r * 2.1, -r * .55], 0, r * .5, r * .42), col, { lw: 6, sw: 4 });
    stroke([[r * .1, r * .1], [r * .7, r * .15]], 4);
  } else {
    form(spline([[-r * .5, -r * .85], [r * .5, -r * 1.05], [r * 1.35, -r * .75], [r * 1.05, -r * .3], [r * 1.5, -r * .1], [r * 1.1, r * .3], [r * 1.35, r * .7], [r * .6, r * .95], [-r * .6, r * .8], [-r * .95, 0]]), col, { lw: 6, sw: 6 });
    stroke([[r * .2, -r * .15], [r * .75, -r * .45]], 4);
  }
  pop();
}

// —— face parts ——
function eye(cx, cy, rx, ry, { lid = 0, look = [0, 0], pupil = 4.5, skin, closed = false, lash = 0 }) {
  if (closed) { stroke(arc(cx, cy + ry * .15, rx * .8, ry * .45, Math.PI * .1, Math.PI * .9, 14), 6); return; }
  shape(ell(cx, cy, rx, ry, 36), {
    fill: WHITE, lw: 6, shade: () => {
      dot(cx + look[0] * rx * .5, cy + look[1] * ry * .45, pupil);
      if (lid > 0) { const yl = cy - ry + lid * 2 * ry; fillOnly([[cx - rx * 1.3, cy - ry * 1.4], [cx + rx * 1.3, cy - ry * 1.4], [cx + rx * 1.3, yl], [cx - rx * 1.3, yl + ry * .08]], skin, { boil: .5 }); stroke([[cx - rx * 1.2, yl + ry * .06], [cx + rx * 1.2, yl]], 6); }
    }
  });
  if (lash) for (let k = 0; k < 3; k++) { const a = -Math.PI * (.62 - k * .14); const px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry; stroke([[px, py], [px + Math.cos(a) * 12, py + Math.sin(a) * 12 - 3]], 4.5); }
}
function mouth(cx, cy, mw, { o = 0, w = 1, sm = 0 }) {
  const hw = mw * w / 2, k = mw * .22, lc = [cx - hw, cy - sm * k], rc = [cx + hw, cy - sm * k];
  if (o < .07) { stroke(spline([lc, [cx, cy + sm * k * 1.1], rc], false, 8), 6); return; }
  const h = o * mw * .62;
  const up = spline([lc, [cx, cy - h * .22 + sm * k * .4], rc], false, 8), dn = spline([rc, [cx, cy + h + sm * k * .5], lc], false, 8);
  shape([...up, ...dn], {
    fill: MOUTH, lw: 6, shade: () => {
      if (o > .25) fillOnly(rect(cx - hw * 1.2, cy - h * .4 - 6, hw * 2.4, h * .3 + 6), WHITE, { boil: .3 });
      fillOnly(ell(cx + hw * .1, cy + h * .95, hw * .62, h * .45, 20), TONGUE, { boil: .3 });
    }
  });
}

// —— hair & hats (drawn in head space; hr = [rx, ry]) ——
function hairBack(H, rx, ry, col) {
  if (H === 'bun') form(ell(-rx * .78, -ry * .78, rx * .38, ry * .32, 24), col, { lw: 6 });
  if (H === 'konde') form(ell(-rx * .98, -ry * .12, rx * .42, ry * .36, 24), col, { lw: 6, shade: () => stroke(arc(-rx * .98, -ry * .12, rx * .25, ry * .2, 0, Math.PI * 1.6, 12), 3.5) });
  if (H === 'braid') for (let k = 0; k < 4; k++) form(ell(-rx * .92 - k * 3, ry * .25 + k * 34, 20 - k * 2, 22, 14), col, { lw: 5 });
  if (H === 'long') form(spline([[-rx * .9, -ry * .5], [-rx * 1.1, ry * .4], [-rx * .9, ry * 1.2], [-rx * .2, ry * .9], [-rx * .2, 0]]), col, { lw: 6 });
}
function hairFront(H, rx, ry, col) {
  if (!H || H === 'bald' || H === 'none') return;
  const cap = [[-rx * 1.02, ry * .05], [-rx * .98, -ry * .6], [-rx * .35, -ry * 1.06], [rx * .45, -ry * 1.04], [rx * .96, -ry * .5], [rx * .86, -ry * .36], [rx * .5, -ry * .6], [-rx * .05, -ry * .62], [-rx * .4, -ry * .32], [-rx * .55, ry * .1]];
  if (H === 'short' || H === 'tuft') {
    form(spline(cap), col, { lw: 6 });
    if (H === 'tuft') for (const [a, b] of [[-.1, -.7], [.15, -.85], [.35, -.75]]) stroke(spline([[rx * a, -ry * .98], [rx * (a + .05), -ry * 1.18], [rx * (a + .18), -ry * 1.12]], false), 5);
  } else {   // bun / konde / braid / long / bob: centre parting, hair swept back
    const P = [[-rx * 1.04, ry * .3], [-rx * 1.02, -ry * .6], [-rx * .3, -ry * 1.08], [rx * .5, -ry * 1.02], [rx * .98, -ry * .45], [rx * .9, -ry * .2], [rx * .62, -ry * .5], [rx * .2, -ry * .68], [-rx * .3, -ry * .46], [-rx * .58, ry * .2]];
    if (H === 'bob') P.splice(0, 1, [-rx * 1.08, ry * .62], [-rx * .7, ry * .7]);
    form(spline(P), col, { lw: 6, shade: () => stroke(spline([[rx * .2, -ry * .94], [-rx * .25, -ry * .7], [-rx * .7, -ry * .2]], false), 3.5) });
  }
}
function hat(T, rx, ry, col, col2) {
  if (!T || T === 'none') return;
  if (T === 'flatcap') {
    form(spline([[-rx * 1.06, -ry * .3], [-rx * .9, -ry * .9], [-rx * .1, -ry * 1.16], [rx * .7, -ry * 1.02], [rx * 1.04, -ry * .66], [rx * .9, -ry * .44], [-rx * .5, -ry * .38]]), col, { lw: 7 });
    form(spline([[rx * .55, -ry * .52], [rx * 1.0, -ry * .66], [rx * 1.42, -ry * .5], [rx * 1.3, -ry * .38], [rx * .7, -ry * .38]]), col, { lw: 6, sw: 6 });
    stroke(spline([[-rx * .4, -ry * 1.02], [rx * .3, -ry * .98], [rx * .82, -ry * .78]], false), 3.5);
  } else if (T === 'bowler') {
    form(spline([[-rx * 1.3, -ry * .5], [rx * 1.3, -ry * .52], [rx * 1.34, -ry * .4], [-rx * 1.34, -ry * .38]]), col, { lw: 6, sw: 5 });
    form([...arc(0, -ry * .5, rx * .9, ry * .72, Math.PI, Math.PI * 2, 24)], col, { lw: 7 });
    fillOnly(rect(-rx * .9, -ry * .64, rx * 1.8, ry * .12), col2 || INK, { boil: .3 });
  } else if (T === 'boater') {
    form(ell(0, -ry * .62, rx * 1.4, ry * .2, 30), col, { lw: 6, sw: 5 });
    form(rr(-rx * .78, -ry * 1.1, rx * 1.56, ry * .5, 10), col, { lw: 6 });
    fillOnly(rect(-rx * .78, -ry * .8, rx * 1.56, ry * .14), col2 || '#7a2a2a', { boil: .3 });
    form(spline([[rx * .3, -ry * .8], [rx * .6, -ry * 1.3], [rx * .8, -ry * 1.18], [rx * .52, -ry * .76]]), col2 || '#7a2a2a', { lw: 5, sw: 4 });
  } else if (T === 'iket') {   // Javanese head cloth: wrapped band + knot at the back
    form(spline([[-rx * 1.06, -ry * .2], [-rx * .95, -ry * .86], [-rx * .1, -ry * 1.12], [rx * .7, -ry * .98], [rx * 1.02, -ry * .55], [rx * .92, -ry * .36], [rx * .2, -ry * .52], [-rx * .6, -ry * .28]]), col, {
      lw: 7, shade: () => { for (let k = 0; k < 5; k++) dot(-rx * .6 + k * rx * .32, -ry * .75 + (k % 2) * 14, 5, col2); stroke(spline([[-rx * .9, -ry * .5], [0, -ry * .78], [rx * .9, -ry * .55]], false), 3.5); }
    });
    form(spline([[-rx * .98, -ry * .45], [-rx * 1.4, -ry * .7], [-rx * 1.5, -ry * .4], [-rx * 1.2, -ry * .2]]), col, { lw: 6, sw: 5 });
  } else if (T === 'kerchief') {
    form(spline([[-rx * 1.1, ry * .1], [-rx * 1.0, -ry * .8], [-rx * .1, -ry * 1.14], [rx * .8, -ry * .9], [rx * 1.02, -ry * .4], [rx * .7, -ry * .55], [-rx * .3, -ry * .4], [-rx * .7, ry * .2]]), col, { lw: 7 });
  }
}

// —— head ——
export function drawHead(P, b = BASE[P.body || 'man']) {
  if ((P.headView ?? P.view) === 'front') return drawHeadFront(P, b);
  const [rx, ry] = b.hr, [sk, sk2] = P.skin || SKIN.light, hairC = P.hairCol || '#3a2a22';
  const E = { ...EXPR.neutral, ...(typeof P.expr === 'string' ? EXPR[P.expr] : P.expr || {}) };
  const look = P.look || E.look || [0, 0], m = { ...E.mouth, ...(P.mouth || {}) };
  hairBack(P.hair, rx, ry, hairC);
  form(ell(P.view === 'side' ? -rx * .12 : -rx * .8, 8, 16, 24, 18), sk, { lw: 6, sw: 6, shade: () => fillOnly(ell(-rx * .76, 10, 7, 13, 12), sk2, { boil: .3 }) });   // ear
  const jaw = P.body === 'child' ? .02 : P.body === 'woman' ? .08 : .14;
  const HD = spline([[-rx * .1, -ry * 1.1], [rx * .65, -ry * 1.02], [rx * 1.0, -ry * .58], [rx * 1.06, ry * .1], [rx * (.96 + jaw), ry * .68], [rx * .6, ry * 1.04], [0, ry * 1.06], [-rx * .55, ry * .88], [-rx * .92, ry * .4], [-rx * .98, -ry * .32], [-rx * .66, -ry * .92]]);
  form(HD, sk, {
    lw: 7, sw: 26, shade: () => {
      if (P.acc?.stubble) for (let i = 0; i < 24; i++) dot(-rx * .3 + hash(i * 3.1) * rx * 1.3, ry * .55 + hash(i * 7.7) * ry * .4, 1.8, sk2);
      if (P.body !== 'man' || P.acc?.blush) { fillOnly(ell(rx * .2, ry * .45, rx * .16, ry * .08, 12), '#e8907a', { boil: .3, alpha: .45 }); }
    }
  });
  if (P.acc?.beard) form(spline([[-rx * .6, ry * .3], [-rx * .3, ry * .55], [rx * .3, ry * .6], [rx * .98, ry * .5], [rx * .7, ry * 1.06], [0, ry * 1.2], [-rx * .55, ry * .9]]), hairC, { lw: 6 });
  hairFront(P.hair, rx, ry, hairC);
  // eyes
  const side = P.view === 'side', es = b.eye * (E.eyeS ?? 1) * EYE.scale, lid = P.blink ? 1 : clamp(E.lid ?? .3, 0, 1), pupil = (E.pupil ?? 4.5) * EYE.pupil * (P.body === 'child' ? 1.1 : 1), closed = !!E.closed;
  const ex1 = side ? rx * .5 : rx * .04, ex2 = rx * .64, ey = -ry * .1;
  if (!side) eye(ex1, ey, rx * .34 * es, ry * .36 * es, { lid, look, pupil, skin: sk, lash: P.body === 'woman', closed });
  eye(ex2, ey - 2, rx * (side ? .3 : .27) * es, ry * .3 * es, { lid, look, pupil: pupil * .92, skin: sk, lash: P.body === 'woman', closed });
  if ((P.age || 0) > 0) { stroke(arc(ex1, ey + ry * .44, rx * .26, 8, .5, 2.6, 8), 3.5); for (let k = 0; k < P.age; k++) stroke(spline([[-rx * .2, -ry * (.62 + k * .1)], [rx * .2, -ry * (.66 + k * .1)], [rx * .55, -ry * (.62 + k * .1)]], false), 3); }
  if (P.acc?.glasses) { for (const [x, r] of [[ex1, rx * .4], [ex2, rx * .32]]) shape(ell(x, ey, r, r * .9, 30), { lw: 6, stroke: true, fill: null }); stroke([[ex1 + rx * .4, ey], [ex2 - rx * .32, ey]], 5); }
  // brows: brow raises both, inner lifts (+) / lowers (−) the inner ends
  const br = E.brow ?? 0, inn = E.inner ?? 0, by = ey - ry * .44 * es - br * 14, bw = P.body === 'man' ? 9 : 7;
  stroke([[ex1 - rx * .3, by + 4 + inn * 4], [ex1 + rx * .26, by - inn * 12 + Math.max(0, -inn) * 0]], bw, { line: INK });
  stroke([[ex2 - rx * .2, by - 2 - inn * 12], [ex2 + rx * .3, by + 2 + inn * 4]], bw, { line: INK });
  // nose
  const nz = P.body === 'man' ? 1 : .7, nx = P.view === 'side' ? rx * .42 : 0;
  form(spline([[nx + rx * .36, -ry * .02], [nx + rx * (.52 + .1 * nz), ry * .22], [nx + rx * (.72 + .1 * nz), ry * .38], [nx + rx * .62, ry * .5], [nx + rx * .38, ry * .44]]), sk, { lw: 6, sw: 8 });
  if (P.acc?.moustache) form(spline([[rx * .1, ry * .58], [rx * .4, ry * .5], [rx * .78, ry * .54], [rx * .92, ry * .7], [rx * .55, ry * .66], [rx * .2, ry * .72]]), hairC, { lw: 6, sw: 6 });
  mouth(rx * (P.view === 'side' ? .7 : .44), ry * .72, rx * (P.body === 'child' ? .62 : .7) * (P.view === 'side' ? .7 : 1), m);
  hat(P.hat, rx, ry, P.hatCol || '#4a4744', P.hatCol2);
}

// front view head: symmetric face looking at the camera
function drawHeadFront(P, b) {
  const [rx, ry] = b.hr, [sk, sk2] = P.skin || SKIN.light, hairC = P.hairCol || '#3a2a22', H = P.hair;
  const E = { ...EXPR.neutral, ...(typeof P.expr === 'string' ? EXPR[P.expr] : P.expr || {}) };
  const look = P.look || E.look || [0, 0], m = { ...E.mouth, ...(P.mouth || {}) };
  if (H === 'bun') form(ell(0, -ry * 1.02, rx * .36, ry * .26, 24), hairC, { lw: 6 });
  if (H === 'konde' || H === 'braid' || H === 'long') form(spline([[-rx * 1.1, -ry * .3], [-rx * 1.06, ry * .7], [rx * 1.06, ry * .7], [rx * 1.1, -ry * .3]]), hairC, { lw: 6 });
  for (const sx of [-1, 1]) form(ell(sx * rx * .98, 10, 15, 24, 18), sk, { lw: 6, sw: 6 });
  const jaw = P.body === 'child' ? .9 : P.body === 'woman' ? .82 : .9;
  form(spline([[0, -ry * 1.1], [rx * .78, -ry * .92], [rx * 1.0, -ry * .3], [rx * jaw, ry * .52], [rx * .5, ry * 1.0], [0, ry * 1.08], [-rx * .5, ry * 1.0], [-rx * jaw, ry * .52], [-rx * 1.0, -ry * .3], [-rx * .78, -ry * .92]]), sk, {
    lw: 7, sw: 26, shade: () => { if (P.body !== 'man' || P.acc?.blush) for (const sx of [-1, 1]) fillOnly(ell(sx * rx * .55, ry * .4, rx * .15, ry * .07, 12), '#e8907a', { boil: .3, alpha: .45 }); }
  });
  if (P.acc?.beard) form(spline([[-rx * .9, ry * .3], [-rx * .5, ry * .62], [rx * .5, ry * .62], [rx * .9, ry * .3], [rx * .6, ry * 1.06], [0, ry * 1.22], [-rx * .6, ry * 1.06]]), hairC, { lw: 6 });
  if (H && H !== 'bald' && H !== 'none') {
    const part = !(H === 'short' || H === 'tuft');
    form(spline([[-rx * 1.06, ry * .1], [-rx * 1.0, -ry * .62], [-rx * .45, -ry * 1.08], [rx * .45, -ry * 1.08], [rx * 1.0, -ry * .62], [rx * 1.06, ry * .1], [rx * .84, -ry * .32], [rx * .4, -ry * .58], [part ? 0 : rx * .1, part ? -ry * .74 : -ry * .64], [-rx * .4, -ry * .58], [-rx * .84, -ry * .32]]), hairC, { lw: 6, shade: () => { if (part) stroke([[0, -ry * 1.05], [0, -ry * .74]], 3.5); } });
  }
  const es = b.eye * (E.eyeS ?? 1) * EYE.scale, lid = P.blink ? 1 : clamp(E.lid ?? .3, 0, 1), pupil = (E.pupil ?? 4.5) * EYE.pupil * (P.body === 'child' ? 1.1 : 1), closed = !!E.closed, ey = -ry * .08;
  for (const sx of [-1, 1]) eye(sx * rx * .38, ey, rx * .3 * es, ry * .33 * es, { lid, look, pupil, skin: sk, lash: P.body === 'woman', closed });
  const br = E.brow ?? 0, inn = E.inner ?? 0, by = ey - ry * .42 * es - br * 14, bw = P.body === 'man' ? 9 : 7;
  for (const sx of [-1, 1]) stroke([[sx * rx * .66, by + 4 + inn * 4], [sx * rx * .14, by - inn * 12]], bw);
  form(spline([[-rx * .12, ry * .34], [-rx * .02, ry * .02], [rx * .14, ry * .34], [0, ry * .44]]), sk, { lw: 6, sw: 6 });
  if (P.acc?.moustache) form(spline([[-rx * .5, ry * .62], [-rx * .2, ry * .5], [0, ry * .54], [rx * .2, ry * .5], [rx * .5, ry * .62], [rx * .2, ry * .64], [0, ry * .6], [-rx * .2, ry * .64]]), hairC, { lw: 6, sw: 6 });
  mouth(0, ry * .74, rx * (P.body === 'child' ? .56 : .62) * (1 + .45 * Math.max(0, (m.o || 0) - .4)), m);   // a scream opens the whole face
  const T = P.hat, col = P.hatCol || '#4a4744';
  if (T === 'flatcap') {
    form(spline([[-rx * 1.1, -ry * .34], [-rx * 1.0, -ry * .9], [0, -ry * 1.18], [rx * 1.0, -ry * .9], [rx * 1.1, -ry * .34], [0, -ry * .46]]), col, { lw: 7 });
    form(spline([[-rx * .8, -ry * .4], [0, -ry * .5], [rx * .8, -ry * .4], [rx * .7, -ry * .26], [0, -ry * .3], [-rx * .7, -ry * .26]]), col, { lw: 6, sw: 4 });
  } else if (T && T !== 'none') hat(T, rx, ry, col, P.hatCol2);
}

// —— garments ——
function torsoPts(b, top, sway = 0) {
  const { sh, hip, shX, chest, waist, hipW } = b, long = top === 'coat' ? 70 : top === 'kebaya' ? 46 : top === 'baju' ? 40 : top === 'jacket' ? 26 : 6;
  const flare = top === 'coat' ? 18 : top === 'baju' ? 10 : 0;
  return spline([[-shX * .5, sh - 10], [-shX - 6, sh + 12], [-chest, sh + 74], [-waist, (sh + hip) / 2 + 30], [-hipW - flare + sway * long * .5, hip + long], [sway * long * .6, hip + long + 8], [hipW + flare + sway * long * .5, hip + long], [waist, (sh + hip) / 2 + 30], [chest, sh + 74], [shX + 6, sh + 12], [shX * .5, sh - 10]]);
}
function legs(P, b, pose) {
  const bot = P.bottom || {}, sh = P.shoes || {}, [sk] = P.skin || SKIN.light;
  for (const [sx, lg] of [[-1, pose.legB || [0, 0]], [1, pose.legF || [0, 0]]]) {
    const hip = [sx * b.hipX, b.hip], ank = [sx * (b.hipX + 4) + lg[0], -26 + lg[1]], bend = lg[2] ?? sx * -4;
    const legCol = ['trousers', 'knickers'].includes(bot.type) ? bot.col : bot.type === 'shorts' ? sk : (bot.legCol || sk);
    form(noodle(hip, ank, bend, b.leg[0], b.leg[1]), legCol, {
      lw: 7, shade: () => {
        if (bot.type === 'shorts') fillOnly(rect(-300, b.hip - 20, 600, (-26 - b.hip) * .42 + 20), bot.col, { boil: .3 });
        if (bot.type === 'knickers') fillOnly(rect(-300, b.hip + (-26 - b.hip) * .55, 600, 400), bot.sock || '#d8d2c4', { boil: .3 });
      }
    });
    const fl = 44 * b.foot, x = ank[0], y = ank[1];
    const shoeCol = sh.type === 'bare' ? sk : (sh.col || '#2e2a2c');
    if (P.view === 'front') { form(ell(x + sx * 6, y + 14, fl * .62, 20 - Math.min(0, lg[1]) * .05, 20), shoeCol, { lw: 6, sw: 6 }); continue; }
    form(spline([[x - fl * .6, y + 24], [x - fl * .55, y], [x + fl * .25, y - 4], [x + fl * 1.05, y + 10], [x + fl, y + 26]]), shoeCol, { lw: 6, sw: 6 });
  }
  if (bot.type === 'skirt' || bot.type === 'sarong') {   // a long skirt / kain over the legs; its hem follows the stride
    const lb = pose.legB || [0, 0], lf = pose.legF || [0, 0], hem = bot.type === 'sarong' ? -34 : -44, sp = Math.abs(lf[0] - lb[0]) * .5;
    const w0 = b.hipW + 4, w1 = b.hipW + 22 + sp, sw = (P.sway || 0) * 30;
    const sk = spline([[-w0, b.hip - 16], [w0, b.hip - 16], [w1 * .85 + lf[0] * .4, (b.hip + hem) / 2], [w1 + lf[0] * .5 + sw, hem + Math.min(0, lf[1]) * .5], [sw, hem + 8], [-w1 + lb[0] * .5 + sw, hem + Math.min(0, lb[1]) * .5], [-w1 * .85 + lb[0] * .4, (b.hip + hem) / 2]]);
    form(sk, bot.col, {
      lw: 7, shade: () => {
        if (bot.pattern) for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) dot(-w1 + c * w1 / 4 + (r % 2) * w1 / 8, b.hip + r * ((hem - b.hip) / 8), 5, bot.pattern);
        if (bot.band) fillOnly(rect(-400, hem - 34, 800, 18), bot.band, { boil: .3 });
        stroke([[w0 * .2, b.hip], [w0 * .35 + lf[0] * .2, hem]], 3.5);
      }
    });
  }
}
function arm(P, b, sh, a, front) {
  const top = P.top || {}, [sk] = P.skin || SKIN.light;
  const hp = [sh[0] + a.h[0], sh[1] + a.h[1]], ang = Math.atan2(hp[1] - sh[1], hp[0] - sh[0]);
  const sleeve = top.sleeve === 'none' ? sk : (top.col2 && top.type === 'vest' ? top.col2 : top.col);
  if (top.sleeve === 'rolled') {
    form(noodle(sh, hp, a.bend ?? 0, b.arm[0] * .85, b.arm[1] * .85), sk, { lw: 7 });
    const t = .48, el = [lerp(sh[0], hp[0], t) + Math.cos(ang + Math.PI / 2) * (a.bend ?? 0) * .6, lerp(sh[1], hp[1], t) + Math.sin(ang + Math.PI / 2) * (a.bend ?? 0) * .6];
    form(noodle(sh, el, (a.bend ?? 0) * .3, b.arm[0], b.arm[0] * 1.08), sleeve, { lw: 7 });
  } else {
    form(noodle(sh, hp, a.bend ?? 0, b.arm[0], b.arm[1]), sleeve, { lw: 7 });
    if (top.sleeve !== 'none') form(ell(hp[0] - Math.cos(ang) * 6, hp[1] - Math.sin(ang) * 6, b.arm[1] * .55, b.arm[1] * .55, 18), top.cuff || sleeve, { lw: 6, sw: 5 });
  }
  hand(hp[0], hp[1], ang, b.hand, sk, a.hand || (a.fist ? 'fist' : 'open'));
  if (front && P.prop) P.prop(hp, ang);
}
function torso(P, b) {
  const top = P.top || {}, t = top.type || 'shirt', T = torsoPts(b, t, P.sway || 0);
  form(T, top.col, {
    lw: 7, shade: () => {
      if (t === 'vest') { fillOnly(T, top.col2 || '#d9d2c2', { boil: 0 }); fillOnly(spline([[-b.chest * .9, b.sh + 40], [-6, b.sh + 80], [b.chest * .9, b.sh + 40], [b.hipW, b.hip + 10], [-b.hipW, b.hip + 10]]), top.col, { boil: .4 }); }
      if (t === 'kebaya') fillOnly([[-4, b.sh - 8], [30, b.sh - 8], [16, b.hip + 10], [6, b.hip + 10]], top.inner || '#a8463a', { boil: .3 });
      if (t === 'blouse') fillOnly(rect(-300, b.hip - 30, 600, 30), P.bottom?.col || INK, { boil: .3 });
      if (t === 'pinafore') fillOnly(spline([[-b.chest * .6, b.sh + 30], [b.chest * .6, b.sh + 30], [b.hipW, b.hip + 10], [-b.hipW, b.hip + 10]]), top.col2 || '#e8e0cc', { boil: .4 });
      if (P.acc?.braces) for (const x of [-22, 34]) fillOnly(rect(x, b.sh, 12, b.hip - b.sh), P.acc.braces, { boil: .3 });
    }
  });
  const fx = P.view === 'front' ? 0 : 14;   // front edge, toward the facing side (centre in the front view)
  if (t === 'coat' || t === 'jacket') {
    stroke([[fx - 6, b.sh - 4], [fx, b.hip + (t === 'coat' ? 76 : 30)]], 6);
    for (let k = 0; k < 4; k++) dot(fx + 16, b.sh + 60 + k * 44, 5);
    form([[fx - 30, b.sh - 8], [fx + 2, b.sh + 70], [fx - 6, b.sh - 8]], top.col, { lw: 5, sw: 4 });
    form([[fx + 26, b.sh - 8], [fx + 6, b.sh + 66], [fx + 4, b.sh - 8]], top.col, { lw: 5, sw: 4 });
    stroke([[-b.waist * .8, b.hip - 10], [-b.waist * .3, b.hip - 4]], 4);
  } else if (t === 'shirt' || t === 'blouse' || t === 'baju') {
    stroke([[fx, b.sh], [fx + 2, b.hip + (t === 'baju' ? 36 : 0)]], 4.5);
    for (let k = 0; k < 3; k++) dot(fx + 9, b.sh + 40 + k * 46, 4);
    form([[-16, b.sh - 14], [fx, b.sh + 10], [-10, b.sh + 20], [-34, b.sh - 4]], top.collar || top.col, { lw: 5, sw: 4 });
    form([[fx + 26, b.sh - 14], [fx, b.sh + 10], [fx + 20, b.sh + 20], [fx + 40, b.sh - 4]], top.collar || top.col, { lw: 5, sw: 4 });
  } else if (t === 'kebaya') {
    stroke([[-4, b.sh - 6], [8, b.hip + 44]], 5); stroke([[30, b.sh - 6], [12, b.hip + 44]], 5);
    for (let k = 0; k < 3; k++) form(ell(14, b.sh + 70 + k * 40, 8, 8, 10), top.pin || '#d8c48a', { lw: 4, sw: 3 });
  }
  if (P.acc?.apron) form(spline([[-b.waist * .9, b.hip - 20], [b.waist * .9 + 10, b.hip - 20], [b.hipW + 10, -70], [-b.hipW + 6, -70]]), P.acc.apron, { lw: 6, sw: 10 });
}
function scarf(P, b) {
  const c = P.acc?.scarf; if (!c) return;
  form(spline([[-b.shX * .7, b.sh - 26], [b.shX * .8, b.sh - 30], [b.shX * .8, b.sh + 8], [-b.shX * .7, b.sh + 10]]), c, { lw: 6, sw: 8 });
  const fl = P.flutter || 0;
  form(noodle([b.shX * .45, b.sh], [b.shX * .6 - fl * 70, b.sh + 120 - Math.abs(fl) * 40], 10 + fl * 30, 30, 26), c, { lw: 6, sw: 6, shade: () => stroke([[b.shX * .2, b.sh + 110], [b.shX * 1, b.sh + 110]], 3) });
}

// crouched legs (in the dropped frame): thighs forward, shins down to the feet on the ground; back leg first, front leg over the torso
function crouchLegs(P, b, ck, dy, front = false) {
  const bot = P.bottom || {}, [sk] = P.skin || SKIN.light, sh = P.shoes || {};
  const col = ['trousers', 'knickers'].includes(bot.type) ? bot.col : bot.type === 'shorts' ? sk : (bot.legCol || sk);
  for (const sx of front ? [1] : [-1]) {
    const L = -b.hip, hip = [sx * b.hipX * .6, b.hip + 10], knee = [sx * b.hipX * .4 + L * .48 * ck, b.hip - L * .02], ank = [sx * b.hipX * .5 + L * .22, -26 - dy];
    form(noodle(hip, knee, 0, b.leg[0] * 1.08, b.leg[0]), bot.type === 'knickers' ? bot.col : col, { lw: 7 });
    form(noodle(knee, ank, 0, b.leg[0], b.leg[1]), bot.type === 'knickers' ? (bot.sock || '#d8d2c4') : col, { lw: 7 });
    if (bot.type === 'knickers') form(ell(knee[0], knee[1], b.leg[0] * .62, b.leg[0] * .6, 18), bot.col, { lw: 6, sw: 6 });
    const fl = 44 * b.foot, x = ank[0], y = ank[1];
    form(spline([[x - fl * .6, y + 24], [x - fl * .55, y], [x + fl * .25, y - 4], [x + fl * 1.05, y + 10], [x + fl, y + 26]]), sh.type === 'bare' ? sk : (sh.col || '#2e2a2c'), { lw: 6, sw: 6 });
  }
}

// —— the whole person ——
// P: { body, x, y, s, face, skin, hair, hairCol, hat, hatCol, top:{type,col,col2,sleeve,cuff,collar,inner,pin}, bottom:{type,col,pattern,band,sock,legCol},
//      shoes:{type,col}, acc:{scarf,apron,braces,glasses,moustache,beard,stubble}, age, expr, look, mouth, pose (name or object, merged), lean, headTilt, prop(hp, ang) }
export function person(P) {
  let b = BASE[P.body || 'man']; const f = P.face ?? 1;
  const pose = mix(typeof P.pose === 'string' ? POSE[P.pose] : mix(POSE.stand, P.pose || {}), P.poseMod || {});
  if (P.view === 'side') b = { ...b, shX: b.shX * .3, hipX: b.hipX * .25, chest: b.chest * .72, waist: b.waist * .78, hipW: b.hipW * .76 };
  const sq = P.sq ?? pose.sq ?? 1;   // squash & stretch, volume kept
  push(); translate(P.x, P.y + (pose.bob || 0) * (P.s ?? 1)); scale((P.s ?? 1) * f / Math.sqrt(sq), (P.s ?? 1) * sq);
  const ck = pose.crouch || 0;
  const dyC = ck * -b.hip * .55;
  if (ck) translate(0, dyC); else legs(P, b, pose);   // crouch: the upper body drops; the folded legs are drawn in front of the torso
  push(); rotate(pose.lean || 0);
  const shB = [-b.shX, b.sh + 16], shF = [b.shX, b.sh + 14];
  if (P.view !== 'front') arm(P, b, shB, pose.armB, false);
  if (ck) { push(); rotate(-(pose.lean || 0)); crouchLegs(P, b, ck, dyC); pop(); }
  torso(P, b);
  if (ck) { push(); rotate(-(pose.lean || 0)); crouchLegs(P, b, ck, dyC, true); pop(); }
  form(noodle([8, b.sh - 4], [b.head[0] * .6, b.head[1] + b.hr[1] * .8], 3, b.hr[0] * .36, b.hr[0] * .36), (P.skin || SKIN.light)[0], { lw: 6, sw: 10 });
  if (P.acc?.scarf) scarf(P, b);
  push(); translate(b.head[0] * (P.lookBack ? .55 : 1), b.head[1]); rotate((P.headTilt ?? pose.headTilt ?? 0)); if (P.lookBack) scale(-1, 1); drawHead(P, b); pop();   // lookBack: the head turns to look behind (over the shoulder)
  if (P.view === 'front') arm(P, b, shB, pose.armB, false);
  arm(P, b, shF, pose.armF, true);
  pop(); pop();
}
export { BASE };
