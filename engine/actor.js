// Dark Toon Diorama — 2D cartoon actors drawn on Canvas, shown as cards in the 3D world.
// Look: clean vector cartoon, thick ink outline, flat colour + one shadow band, soft coloured rim light.
// All drawing is in "head units" (hh): the canvas is scaled so 1 unit = one head height.
import { THREE, clamp, lerp } from './core.js';
import { drawRig } from './rig.js';

export const INK = '#16120e';
const D = Math.PI / 180;

// ---------------------------------------------------------------- cast (palette + build). Story files may add more.
export const CAST = {
  worker:   { heads: 5.0, skin: '#d8bfa6', skin2: '#b99c84', hair: '#3a2c22', coat: '#6c6f71', coatIn: '#4b3f36', pants: '#4f4b47', boots: '#3b2e25',
              cap: '#505254', scarf: '#5d6365', moustache: 'big', age: 40, coatLen: 1.05, build: 1 },
  boy:      { heads: 4.1, skin: '#e2c9ae', skin2: '#c7a98f', hair: '#5a3f2a', coat: '#545349', coatIn: '#47463d', pants: '#5a4c3d', boots: '#5b4231',
              cap: '#5f5748', scarf: '#6d6b5f', age: 10, coatLen: .9, build: .82, patches: true },
  girl:     { heads: 4.0, skin: '#e6cdb4', skin2: '#c9ad95', hair: '#6b4a32', coat: '#6e5b53', coatIn: '#5d4c45', pants: '#4b433d', boots: '#4a3a2e',
              scarf: '#7d6d63', age: 9, coatLen: 1.25, build: .78, braid: true },
  engineer: { heads: 5.2, skin: '#dbc3ab', skin2: '#bba18a', hair: '#2f2a26', coat: '#41464a', coatIn: '#33373a', pants: '#383838', boots: '#2a2622',
              hat: 'bowler', hatCol: '#27292b', tie: '#6a2c24', moustache: 'thin', age: 50, coatLen: 1.15, build: 1, glasses: true },
  woman:    { heads: 5.0, skin: '#dfc6ad', skin2: '#c2a58d', hair: '#4a3324', coat: '#5d504c', coatIn: '#4d4240', pants: '#3d3533', boots: '#2e2622',
              hat: 'cloche', hatCol: '#473d3a', scarf: '#6c5f5a', age: 30, coatLen: 1.6, build: .9, dress: true },
  fireman:  { heads: 5.0, skin: '#d8c0a8', skin2: '#b89f88', hair: '#33291f', coat: '#2e3238', coatIn: '#24282d', pants: '#2b2d31', boots: '#1d1b1a',
              hat: 'fire', hatCol: '#2b2c2f', age: 35, coatLen: 1.2, build: 1.05 },
  sailor:   { heads: 5.0, skin: '#d6bea6', skin2: '#b69d86', hair: '#2c2620', coat: '#2f3a4d', coatIn: '#27303f', pants: '#2c3443', boots: '#1f1c1a',
              hat: 'sailor', hatCol: '#e4e2dc', age: 25, coatLen: .7, build: .95 },
  riveter:  { heads: 5.0, skin: '#d2b69c', skin2: '#b0957d', hair: '#3a2c22', coat: '#5b5249', coatIn: '#4c443c', pants: '#4a4036', boots: '#33281f',
              cap: '#48433d', age: 30, coatLen: .55, build: 1, apron: '#6a5440' },
};

// ---------------------------------------------------------------- poses (angles in degrees; arm/leg angles are screen-space, outward-positive)
const BASE = { turn: 0, tilt: 0, lean: 0, bob: 0, crouch: 0,
  shL: 10, elL: 6, shR: 10, elR: 6, hipL: 4, knL: -2, liftL: 0, hipR: 4, knR: -2, liftR: 0,
  eyes: 'normal', brows: 'neutral', mouth: 'neutral', look: [0, 0], handL: 'open', handR: 'open', prop: null };
export const POSES = {
  stand: {},
  run:  { lean: 0, shL: 40, elL: -115, shR: 42, elR: -35, hipL: 6, knL: -6, liftL: .85, hipR: 8, knR: 6, liftR: 0, handL: 'fist', handR: 'fist', bob: -.06,
          eyes: 'wide', brows: 'fear', mouth: 'shock', look: [0, 0] },
  run2: { lean: 0, shL: 42, elL: -35, shR: 40, elR: -115, hipL: 8, knL: 6, liftL: 0, hipR: 6, knR: -6, liftR: .85, handL: 'fist', handR: 'fist', bob: .0,
          eyes: 'wide', brows: 'fear', mouth: 'shock', look: [0, 0] },
  look_up:    { tilt: -10, shL: 8, elL: 4, shR: 8, elR: 4, eyes: 'wide', brows: 'worried', mouth: 'small_o', look: [0, -1] },
  shock_turn: { turn: .5, tilt: -3, shL: 14, elL: -20, shR: 16, elR: -35, handR: 'fist', eyes: 'wide', brows: 'fear', mouth: 'shock', look: [.7, 0] },
  crouch_cup: { crouch: 1, turn: .4, tilt: 8, shL: -20, elL: -95, shR: -15, elR: -100, handL: 'cup', handR: 'cup', prop: 'cup',
                eyes: 'happy', brows: 'neutral', mouth: 'smile', look: [.8, -.2] },
  wade:   { shL: 70, elL: -40, shR: 120, elR: -20, eyes: 'wide', brows: 'fear', mouth: 'shout', look: [.6, -.2], turn: .3 },
  reach:  { turn: -.35, shL: 18, elL: -10, shR: 105, elR: 12, eyes: 'wide', brows: 'fear', mouth: 'shout', look: [.9, -.2] },
  inspect: { crouch: .9, turn: .55, tilt: 12, shL: -5, elL: -90, shR: 30, elR: -60, handR: 'fist', prop: 'calipers', eyes: 'squint', brows: 'angry', mouth: 'grim', look: [.7, .7] },
  walk:   { turn: .25, shL: 14, elL: -10, shR: 4, elR: -14, hipL: 2, knL: -4, liftL: .35, hipR: 8, knR: 2, eyes: 'normal', brows: 'worried', mouth: 'grim', look: [.4, .2] },
  walk2:  { turn: .25, shL: 4, elL: -14, shR: 14, elR: -10, hipL: 8, knL: 2, hipR: 2, knR: -4, liftR: .35, eyes: 'normal', brows: 'worried', mouth: 'grim', look: [.4, .2] },
  carry:  { shL: -10, elL: -70, shR: -10, elR: -70, handL: 'fist', handR: 'fist', eyes: 'sad', brows: 'worried', mouth: 'grim', tilt: 8, look: [0, .8], liftL: .3 },
  hammer: { turn: .6, shL: 150, elL: 20, shR: 40, elR: -80, handL: 'fist', handR: 'fist', prop: 'hammer', eyes: 'squint', brows: 'angry', mouth: 'grim', look: [1, -.4] },
  sad:    { tilt: 10, eyes: 'sad', brows: 'worried', mouth: 'grim', look: [0, .7] },
  point:  { turn: .3, shR: 95, elR: -5, handR: 'point', eyes: 'normal', brows: 'worried', mouth: 'talk', look: [.9, -.1] },
};
export function pose(...names) { const p = { ...BASE }; for (const n of names) Object.assign(p, typeof n === 'string' ? POSES[n] : n); return p; }
export function mixPose(a, b, k) {
  const o = { ...(k < .5 ? a : b) };
  for (const key in a) if (typeof a[key] === 'number' && typeof b[key] === 'number') o[key] = lerp(a[key], b[key], k);
  o.look = [lerp(a.look[0], b.look[0], k), lerp(a.look[1], b.look[1], k)]; return o;
}

// ---------------------------------------------------------------- geometry helpers
export function capsule(x1, y1, x2, y2, r1, r2) {
  const a = Math.atan2(y2 - y1, x2 - x1), p = new Path2D();
  p.arc(x1, y1, r1, a + Math.PI / 2, a - Math.PI / 2); p.arc(x2, y2, r2, a - Math.PI / 2, a + Math.PI / 2); p.closePath(); return p;
}
export function spline(pts, k = .2, closed = true) {
  const p = new Path2D(), n = pts.length, P = i => closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)];
  p.moveTo(...P(0));
  for (let i = 0; i < (closed ? n : n - 1); i++) { const a = P(i - 1), b = P(i), c = P(i + 1), d = P(i + 2);
    p.bezierCurveTo(b[0] + (c[0] - a[0]) * k, b[1] + (c[1] - a[1]) * k, c[0] - (d[0] - b[0]) * k, c[1] - (d[1] - b[1]) * k, c[0], c[1]); }
  if (closed) p.closePath(); return p;
}
const rot = ([x, y], a, [ox, oy] = [0, 0]) => [ox + (x - ox) * Math.cos(a) - (y - oy) * Math.sin(a), oy + (x - ox) * Math.sin(a) + (y - oy) * Math.cos(a)];
const add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];
const dir = (s, a) => [s * Math.sin(a * D), Math.cos(a * D)]; // s = -1 left side, +1 right side; 0deg = down
export function shade(hex, k) { const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = n >> 8 & 255, b = n & 255;
  const f = v => clamp(Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k), 0, 255); return `rgb(${f(r)},${f(g)},${f(b)})`; }

// ---------------------------------------------------------------- painter
// light: { rim: css colour | null, rimSide: -1 (left) | 1 (right), rimA: 0..1, shadowA }
export function drawActor(g, W, H, ch, P, light = {}) {
  const L = { rim: null, rimSide: -1, rimA: 1, shadowA: .32, ...light };
  const S = H * .93 / (ch.heads + (ch.hat ? .3 : ch.cap ? .12 : 0));             // px per head unit
  const lw = clamp(H * .0062, 2.2, 9) / S;    // outline width in units
  g.save(); g.translate(W / 2, H * .985); g.scale(S, S); g.lineJoin = 'round'; g.lineCap = 'round';
  const b = ch.build || 1, kid = ch.age < 14;
  const legH = kid ? 1.75 : 2.25, torsoH = kid ? 1.3 : 1.65;
  const thigh = legH * .52, shin = legH * .5;
  const crouch = P.crouch || 0;
  const hip = [0, -legH * (1 - crouch * .52) + (P.bob || 0)];
  const lean = (P.lean || 0) * D;
  const T = p => rot(add2(hip, p), lean, hip);                    // torso space → canvas units
  const shW = (kid ? .62 : .82) * b, hipW = (kid ? .44 : .5) * b;
  const shoulderY = -torsoH * .93;
  const shL = T([-shW * .78, shoulderY + .08]), shR = T([shW * .78, shoulderY + .08]);
  const neck = T([0, -torsoH]);
  const limb = (kid ? .16 : .19) * b;
  const parts = []; const push = (z, path, fill, o = {}) => parts.push({ z, path, fill, ...o });
  const turn = P.turn || 0, far = turn >= 0 ? -1 : 1; // far side of the body

  // legs
  const leg = (s, hipA, knA, lift) => {
    const hp = [hip[0] + s * hipW * .45, hip[1]];
    let a1 = hipA, a2 = hipA + knA, th = thigh * (1 - lift * .55), sn = shin;
    if (crouch) { a1 = lerp(a1, 112, crouch); a2 = lerp(a2, -4, crouch); th = lerp(th, thigh * .6, crouch); sn = lerp(sn, shin * 1.0, crouch); }
    const k = add2(hp, [dir(s, a1)[0] * th, dir(s, a1)[1] * th]);
    const f = add2(k, [dir(s, a2)[0] * sn, dir(s, a2)[1] * sn * (1 - lift * .25)]);
    return { hp, k, f, lift };
  };
  const LG = { [-1]: leg(-1, P.hipL, P.knL, P.liftL || 0), [1]: leg(1, P.hipR, P.knR, P.liftR || 0) };
  for (const s of [-1, 1]) {
    const l = LG[s], z = s === far ? -3 : -2;
    push(z, capsule(...l.hp, ...l.k, limb * 1.25, limb * 1.05), ch.pants);
    push(z + .1, capsule(...l.k, ...l.f, limb * 1.05, limb * .85), ch.pants);
    // boot (front view, slightly toward outside)
    const [fx, fy] = l.f, bw = limb * (1.45 - l.lift * .2), bh = limb * 1.15;
    push(z + .2, spline([[fx - bw, fy - bh * .6], [fx + bw * .9, fy - bh * .7], [fx + bw * 1.15 + s * .04, fy + bh * .35], [fx, fy + bh * .55], [fx - bw * 1.1, fy + bh * .35]], .18), ch.boots);
  }
  // torso / coat
  const hemY = hip[1] + (ch.coatLen) * (1 - crouch * .75) * (kid ? .8 : 1) - .25;
  const flare = (ch.dress ? .45 : .2) + crouch * .35;
  const coatPts = [T([-shW, shoulderY + .15]), T([-shW * .55, shoulderY - .02]), T([0, shoulderY + .05]), T([shW * .55, shoulderY - .02]), T([shW, shoulderY + .15]),
    T([shW * .9, -torsoH * .45]), [T([0, 0])[0] + hipW + flare, hemY], [T([0, 0])[0] - hipW - flare, hemY], T([-shW * .9, -torsoH * .45])];
  const coatPath = spline(coatPts, .12);
  push(0, coatPath, ch.coat, { coat: true });
  // arms
  const arm = (s, a1, a2) => { const sp = s < 0 ? shL : shR, ua = (kid ? .78 : .98) * b, fa = (kid ? .7 : .88) * b;
    const A1 = a1 + (P.lean || 0) * -s, A2 = A1 + a2;
    const e = add2(sp, [dir(s, A1)[0] * ua, dir(s, A1)[1] * ua]); const w = add2(e, [dir(s, A2)[0] * fa, dir(s, A2)[1] * fa]); return { sp, e, w, A2 }; };
  const AR = { [-1]: arm(-1, P.shL, P.elL), [1]: arm(1, P.shR, P.elR) };
  // hands
  const handPath = (w, A2, s, kind) => {
    const r = limb * 1.05, c = add2(w, [dir(s, A2)[0] * r * .7, dir(s, A2)[1] * r * .7]);
    if (kind === 'fist') return { path: spline([[c[0] - r, c[1] - r * .7], [c[0] + r, c[1] - r * .8], [c[0] + r * 1.05, c[1] + r * .6], [c[0], c[1] + r * .95], [c[0] - r * 1.05, c[1] + r * .6]], .2), c, r };
    if (kind === 'cup') return { path: spline([[c[0] - r * 1.1, c[1] - r * .4], [c[0] + r * 1.1, c[1] - r * .5], [c[0] + r * .9, c[1] + r * .7], [c[0] - r * .9, c[1] + r * .7]], .25), c, r };
    // open / point: mitten + thumb along forearm direction
    const d = dir(s, A2), n = [-d[1], d[0]]; const tip = add2(c, [d[0] * r * (kind === 'point' ? 1.7 : 1.1), d[1] * r * (kind === 'point' ? 1.7 : 1.1)]);
    const p = spline([add2(c, [n[0] * r * .85 - d[0] * r * .6, n[1] * r * .85 - d[1] * r * .6]), add2(tip, [n[0] * r * .55, n[1] * r * .55]), add2(tip, [-n[0] * r * .45, -n[1] * r * .45]),
      add2(c, [-n[0] * r * 1.1, -n[1] * r * 1.1]), add2(c, [-n[0] * r * .85 - d[0] * r * .6, -n[1] * r * .85 - d[1] * r * .6])], .2);
    return { path: p, c, r };
  };
  for (const s of [-1, 1]) {
    const a = AR[s], z = s === far ? -1 : 2; const kind = s < 0 ? P.handL : P.handR;
    push(z, capsule(...a.sp, ...a.e, limb * 1.3, limb * 1.12), ch.coat, { sleeve: true });
    push(z + .05, capsule(...a.e, ...a.w, limb * 1.12, limb * 1.0), ch.coat, { sleeve: true });
    const h = handPath(a.w, a.A2, s, kind); push(z + .1, h.path, ch.skin, { hand: kind, hc: h.c, hr: h.r });
    a.hand = h;
  }
  // scarf over shoulders
  if (ch.scarf) push(1, spline([T([-shW * .62, shoulderY - .02]), T([0, shoulderY - .16]), T([shW * .62, shoulderY - .02]), T([shW * .38, shoulderY + .32]), T([0, shoulderY + .2]), T([-shW * .38, shoulderY + .32])], .2), ch.scarf, { scarf: true });
  if (false) push(1.1, spline([T([shW * .12, shoulderY + .18]), T([shW * .38, shoulderY + .2]), T([shW * .34, shoulderY + .95]), T([shW * .1, shoulderY + .9])], .15), shade(ch.scarf, -.08));
  // neck + head
  const tilt = (P.tilt || 0) * D + lean * .5;
  const hc = add2(neck, [Math.sin(lean) * .1, -.5]);
  const hw = (kid ? .42 : .38);
  const Hd = p => rot(add2(hc, p), tilt, hc);
  const tx = turn * hw * .5;
  push(1.5, capsule(...neck, ...Hd([0, .3]), .2, .19), ch.skin2);
  const jaw = kid ? .4 : .5;
  const headPts = [Hd([-hw, -.05]), Hd([-hw * .95, -.33]), Hd([-hw * .6, -.5]), Hd([0, -.54]), Hd([hw * .6, -.5]), Hd([hw * .95, -.33]), Hd([hw, -.05]),
    Hd([hw * .9 - tx * .2, .22]), Hd([hw * .55 + tx * .3, jaw - .02]), Hd([tx * .45, jaw + .03]), Hd([-hw * .55 + tx * .3, jaw - .02]), Hd([-hw * .9 - tx * .2, .22])];
  const headPath = spline(headPts, .15);
  const earS = turn >= 0 ? -1 : 1; const ec = Hd([earS * hw * .97, .04]);
  const ear = new Path2D(); ear.ellipse(ec[0], ec[1], .12 * (1 - Math.abs(turn) * .2), .17, tilt, 0, Math.PI * 2);
  if (Math.abs(turn) < .85) push(3, ear, ch.skin);
  if (turn < 0.2 && turn > -0.2) { const e2 = Hd([-earS * hw * .97, .04]); const er = new Path2D(); er.ellipse(e2[0], e2[1], .1, .16, tilt, 0, Math.PI * 2); push(3, er, ch.skin); }
  push(4, headPath, ch.skin, { head: true });

  // --- paint parts
  parts.sort((a, b2) => a.z - b2.z);
  for (const p of parts) {
    g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(p.path);
    g.save(); g.clip(p.path); g.fillStyle = p.fill; g.fill(p.path);
    // shadow band on the side away from the light
    const so = .1 + (p.head ? .05 : 0);
    const sp = new Path2D(); sp.addPath(p.path); sp.addPath(p.path, new DOMMatrix().translate(L.rimSide * so, -so * .5));
    g.fillStyle = `rgba(18,22,30,${L.shadowA})`; g.fill(sp, 'evenodd');
    if (p.coat) coatDetails(g, ch, { T, shW, torsoH, shoulderY, hemY, lw, hip, flare, hipW, kid });
    if (p.head) headShade(g, ch, Hd, hw, tx);
    g.restore();
    if (p.hand === 'fist') { g.lineWidth = lw * .7; g.strokeStyle = INK; for (let i = 0; i < 3; i++) { const x = p.hc[0] - p.hr * .5 + i * p.hr * .5; g.beginPath(); g.moveTo(x, p.hc[1] - p.hr * .55); g.lineTo(x, p.hc[1] - p.hr * .1); g.stroke(); } }
    if (p.sleeve) { /* cuff line */ }
  }
  // props held
  if (P.prop === 'cup') { const c = add2(AR[-1].hand.c, [(AR[1].hand.c[0] - AR[-1].hand.c[0]) * .5, (AR[1].hand.c[1] - AR[-1].hand.c[1]) * .5 - .18]);
    const cup = spline([[c[0] - .2, c[1] - .2], [c[0] + .2, c[1] - .2], [c[0] + .17, c[1] + .2], [c[0] - .17, c[1] + .2]], .05);
    g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(cup); g.fillStyle = '#7d7a72'; g.fill(cup);
    g.fillStyle = '#c47a22'; g.beginPath(); g.ellipse(c[0], c[1] - .18, .18, .05, 0, 0, Math.PI * 2); g.fill(); }
  if (P.prop === 'hammer') { const h = AR[-1].hand.c; g.lineWidth = lw * 2; g.strokeStyle = INK; const hp = capsule(h[0], h[1] + .2, h[0] + .1, h[1] - .9, .07, .07); g.stroke(hp); g.fillStyle = '#7a5a3a'; g.fill(hp);
    const hd = new Path2D(); hd.rect(h[0] - .25, h[1] - 1.05, .55, .22); g.stroke(hd); g.fillStyle = '#4a4c4f'; g.fill(hd); }
  if (P.prop === 'calipers') { const h = AR[1].hand.c; g.lineWidth = lw * 1.6; g.strokeStyle = INK; g.beginPath(); g.moveTo(h[0], h[1]); g.lineTo(h[0] + .55, h[1] + .25); g.moveTo(h[0], h[1]); g.lineTo(h[0] + .45, h[1] + .45); g.stroke(); }
  hairAndHat(g, ch, Hd, hw, lw, tx, L);
  face(g, ch, P, Hd, hw, lw, tx, kid);
  g.restore();
  if (L.rim) rimLight(g, W, H, L, lw * S);
}

// rim light only on the outer silhouette, inside the ink line, softened
export function rimLight(g, W, H, L, inkPx) {
  const c = g.canvas, m = document.createElement('canvas'); m.width = W; m.height = H; const k = m.getContext('2d');
  const d1 = inkPx * 1.15, w = (L.rimW ?? .011) * H, sx = -L.rimSide;
  k.drawImage(c, sx * d1, -d1 * .3);                                    // inset by ink width
  k.globalCompositeOperation = 'destination-out'; k.drawImage(c, sx * (d1 + w), -(d1 + w) * .3);
  k.globalCompositeOperation = 'destination-in'; k.drawImage(c, 0, 0);
  k.globalCompositeOperation = 'source-in'; k.fillStyle = L.rim; k.fillRect(0, 0, W, H);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-atop';
  g.globalAlpha = .45 * L.rimA; g.filter = `blur(${w * 1.2}px)`; g.drawImage(m, 0, 0);
  g.filter = `blur(${w * .25}px)`; g.globalAlpha = .8 * L.rimA; g.drawImage(m, 0, 0); g.restore();
}

function coatDetails(g, ch, o) {
  const { T, shW, torsoH, shoulderY, hemY, lw, hip, flare, hipW, kid } = o;
  g.save(); g.strokeStyle = INK;
  // inner garment at the collar opening
  const v = spline([T([-shW * .28, shoulderY + .05]), T([shW * .28, shoulderY + .05]), T([shW * .04, -torsoH * .48]), T([-shW * .04, -torsoH * .48])], .05);
  g.fillStyle = ch.coatIn; g.fill(v);
  if (ch.tie) { const t = spline([T([-.05, shoulderY + .12]), T([.05, shoulderY + .12]), T([.08, -torsoH * .6]), T([0, -torsoH * .52]), T([-.08, -torsoH * .6])], .05); g.fillStyle = ch.tie; g.fill(t); g.lineWidth = lw * .8; g.stroke(t); }
  g.lineWidth = lw * 1.1;
  // lapels + front edge
  g.beginPath(); g.moveTo(...T([-shW * .3, shoulderY + .02])); g.lineTo(...T([-shW * .02, -torsoH * .46])); g.lineTo(T([0, 0])[0] + .02, hemY - .02); g.stroke();
  g.beginPath(); g.moveTo(...T([shW * .3, shoulderY + .02])); g.lineTo(...T([shW * .06, -torsoH * .46])); g.stroke();
  g.beginPath(); g.moveTo(...T([-shW * .3, shoulderY + .02])); g.lineTo(...T([-shW * .42, -torsoH * .7])); g.lineTo(...T([-shW * .12, -torsoH * .6])); g.stroke();
  g.beginPath(); g.moveTo(...T([shW * .3, shoulderY + .02])); g.lineTo(...T([shW * .44, -torsoH * .7])); g.lineTo(...T([shW * .16, -torsoH * .6])); g.stroke();
  // buttons
  g.fillStyle = INK; for (let i = 0; i < 3; i++) { const p = T([-shW * .1, -torsoH * (.38 - i * .14)]); g.beginPath(); g.arc(p[0], p[1], .035, 0, 7); g.fill(); }
  // folds, pocket, patches
  g.lineWidth = lw * .75; g.globalAlpha = .8;
  const fold = (a, c, e) => { g.beginPath(); g.moveTo(...a); g.quadraticCurveTo(...c, ...e); g.stroke(); };
  fold(T([-shW * .62, -torsoH * .62]), T([-shW * .5, -torsoH * .45]), T([-shW * .6, -torsoH * .3]));
  fold(T([shW * .55, -torsoH * .2]), T([shW * .62, -torsoH * .05]), T([shW * .5, .05]));
  fold([T([0, 0])[0] - hipW * .7, hemY - .5], [T([0, 0])[0] - hipW * .5, hemY - .25], [T([0, 0])[0] - hipW * .75, hemY - .05]);
  g.beginPath(); g.moveTo(...T([-shW * .7, -torsoH * .12])); g.lineTo(...T([-shW * .35, -torsoH * .12])); g.stroke();
  g.beginPath(); g.moveTo(...T([shW * .35, -torsoH * .1])); g.lineTo(...T([shW * .7, -torsoH * .1])); g.stroke();
  if (ch.patches) { const p = T([shW * .25, -torsoH * .02]); g.strokeRect(p[0], p[1], .3, .24); g.setLineDash([.05, .05]); g.strokeRect(p[0] + .04, p[1] + .04, .22, .16); g.setLineDash([]); }
  g.globalAlpha = 1;
  if (ch.apron) { const a = spline([T([-shW * .5, -torsoH * .55]), T([shW * .5, -torsoH * .55]), [T([0, 0])[0] + hipW + .1, hemY + .5], [T([0, 0])[0] - hipW - .1, hemY + .5]], .05); g.fillStyle = ch.apron; g.fill(a); g.lineWidth = lw * 1.2; g.stroke(a); }
  g.restore();
}

export function headShade(g, ch, Hd, hw, tx) {
  // soft cheek / jaw shading and shadow under hat brim
  g.save(); g.fillStyle = ch.skin2; g.globalAlpha = .3;
  const c = Hd([tx * .4, .3]); const gr = g.createRadialGradient(c[0], c[1] + .1, .05, c[0], c[1] + .1, .5); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, ch.skin2);
  g.fillStyle = gr; g.fillRect(c[0] - 1, c[1] - 1, 2, 2);
  if (ch.cap || ch.hat) { g.globalAlpha = .45; g.fillStyle = 'rgb(40,30,28)'; const b = Hd([0, -.27]); g.beginPath(); g.ellipse(b[0] + tx * .4, b[1], hw * 1.1, .1, 0, 0, Math.PI * 2); g.fill(); }
  g.restore();
}

export function hairAndHat(g, ch, Hd, hw, lw, tx, L) {
  const fs = (p, col, rim = true) => { g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(p); g.fillStyle = col; g.fill(p);
    g.save(); g.clip(p); const sp = new Path2D(); sp.addPath(p); sp.addPath(p, new DOMMatrix().translate(L.rimSide * .09, -.04)); g.fillStyle = 'rgba(15,18,24,.3)'; g.fill(sp, 'evenodd');
    g.restore(); };
  // hair at temples / back
  fs(spline([Hd([-hw * 1.02, .06]), Hd([-hw * 1.0, -.3]), Hd([-hw * .55, -.52]), Hd([hw * .55, -.52]), Hd([hw * 1.0, -.3]), Hd([hw * 1.02, .06]), Hd([hw * .86, -.12]), Hd([0, -.3]), Hd([-hw * .86, -.12])], .18), ch.hair);
  if (ch.braid) fs(spline([Hd([-hw * .95, .0]), Hd([-hw * 1.3, .45]), Hd([-hw * 1.15, .85]), Hd([-hw * .85, .4])], .25), ch.hair);
  if (ch.cap) {
    fs(spline([Hd([-hw * 1.12, -.18]), Hd([-hw * 1.05, -.42]), Hd([-hw * .45, -.64]), Hd([hw * .55, -.66]), Hd([hw * 1.2, -.46]), Hd([hw * 1.25, -.25]), Hd([hw * .3 + tx, -.2])], .2), ch.cap);
    fs(spline([Hd([-hw * .7 + tx, -.22]), Hd([hw * .8 + tx, -.27]), Hd([hw * 1.25 + tx * .6, -.17]), Hd([hw * .85 + tx, -.08]), Hd([-hw * .5 + tx, -.1])], .2), shade(ch.cap, -.28));
    g.save(); g.strokeStyle = INK; g.lineWidth = lw * .7; g.globalAlpha = .55; g.beginPath(); g.moveTo(...Hd([-hw * .7, -.52])); g.quadraticCurveTo(...Hd([0, -.42]), ...Hd([hw * .8, -.5])); g.stroke(); g.restore();
  }
  if (ch.hat === 'bowler') { fs(spline([Hd([-hw * .82, -.28]), Hd([-hw * .78, -.66]), Hd([0, -.82]), Hd([hw * .78, -.66]), Hd([hw * .82, -.28])], .2), ch.hatCol);
    fs(spline([Hd([-hw * 1.35, -.27]), Hd([hw * 1.35, -.27]), Hd([hw * 1.25, -.17]), Hd([-hw * 1.25, -.17])], .3), ch.hatCol); }
  if (ch.hat === 'cloche') fs(spline([Hd([-hw * 1.15, -.02]), Hd([-hw * 1.02, -.5]), Hd([0, -.66]), Hd([hw * 1.02, -.5]), Hd([hw * 1.15, -.02]), Hd([0, -.18])], .2), ch.hatCol);
  if (ch.hat === 'fire') { fs(spline([Hd([-hw * .88, -.25]), Hd([-hw * .72, -.76]), Hd([0, -.86]), Hd([hw * .72, -.76]), Hd([hw * .88, -.25])], .2), ch.hatCol);
    fs(spline([Hd([-hw * 1.25, -.28]), Hd([hw * 1.6, -.32]), Hd([hw * 1.7, -.12]), Hd([-hw * 1.15, -.15])], .25), ch.hatCol); }
  if (ch.hat === 'sailor') fs(spline([Hd([-hw * 1.0, -.28]), Hd([-hw * .9, -.56]), Hd([hw * .9, -.56]), Hd([hw * 1.0, -.28])], .15), ch.hatCol);
}

export function face(g, ch, P, Hd, hw, lw, tx, kid) {
  g.save(); g.strokeStyle = INK;
  const ex = hw * .4, ey = -.04, er = kid ? .115 : .1, lk = P.look || [0, 0];
  const E = P.eyes, wide = E === 'wide';
  for (const s of [-1, 1]) {
    const persp = 1 - s * (P.turn || 0) * .3; const c = Hd([s * ex * persp + tx, ey]);
    const rx = er * (wide ? 1.12 : .95) * persp, ry = er * (wide ? 1.3 : 1.05);
    if (E === 'happy') { g.lineWidth = lw * 1.3; g.beginPath(); g.ellipse(c[0], c[1] + ry * .45, rx, ry * .9, 0, Math.PI * 1.08, Math.PI * 1.92); g.stroke(); }
    else if (E === 'closed') { g.lineWidth = lw * 1.2; g.beginPath(); g.ellipse(c[0], c[1] - ry * .3, rx, ry * .7, 0, Math.PI * .1, Math.PI * .9); g.stroke(); }
    else {
      g.beginPath(); g.ellipse(c[0], c[1], rx, ry, 0, 0, Math.PI * 2); g.fillStyle = '#f3eee5'; g.fill(); g.lineWidth = lw * 1.05; g.stroke();
      const pr = er * (wide ? .3 : .45); const px = c[0] + lk[0] * rx * .45, py = c[1] + lk[1] * ry * .42;
      g.beginPath(); g.arc(px, py, pr * persp, 0, Math.PI * 2); g.fillStyle = INK; g.fill();
      g.beginPath(); g.arc(px - pr * .35, py - pr * .35, pr * .28, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
      if (E === 'squint' || E === 'sad') { // upper lid
        g.save(); g.beginPath(); g.ellipse(c[0], c[1], rx, ry, 0, 0, Math.PI * 2); g.clip(); g.fillStyle = ch.skin; g.fillRect(c[0] - rx, c[1] - ry, rx * 2, ry * (E === 'squint' ? .95 : .8)); g.restore();
        g.lineWidth = lw * 1.2; g.beginPath(); g.moveTo(c[0] - rx, c[1] - ry * (E === 'squint' ? .05 : .2) + (E === 'sad' ? s * -.02 : 0)); g.lineTo(c[0] + rx, c[1] - ry * (E === 'squint' ? .05 : .2) - (E === 'sad' ? s * -.02 : 0)); g.stroke(); }
      if (!kid) { g.lineWidth = lw * .55; g.globalAlpha = .5; g.beginPath(); g.ellipse(c[0], c[1] + ry * .2, rx * .85, ry * 1.05, 0, Math.PI * .25, Math.PI * .75); g.stroke(); g.globalAlpha = 1; }
    }
    // brow (thick tapered)
    const B = P.brows; let inner = 0, outer = 0;
    if (B === 'fear') { inner = -er * 1.0; outer = er * .25; } else if (B === 'worried') { inner = -er * .6; outer = er * .15; } else if (B === 'angry') { inner = er * .55; outer = -er * .3; }
    const by = c[1] - ry - er * .55;
    const bi = [c[0] - s * rx * .1 - s * er * .15, by + inner], bo = [c[0] + s * rx * 1.2, by + outer], bm = [(bi[0] + bo[0]) / 2, Math.min(bi[1], bo[1]) - er * .35];
    g.lineWidth = lw * (kid ? 1.4 : 2.3); g.beginPath(); g.moveTo(...bi); g.quadraticCurveTo(...bm, ...bo); g.stroke();
    if (ch.glasses) { g.lineWidth = lw * .75; g.beginPath(); g.arc(c[0], c[1], er * 1.5, 0, Math.PI * 2); g.stroke(); }
  }
  if (ch.glasses) { g.lineWidth = lw * .75; g.beginPath(); g.moveTo(...Hd([-ex + tx + er * 1.5, ey])); g.lineTo(...Hd([ex + tx - er * 1.5, ey])); g.stroke(); }
  if (!kid && (P.brows === 'fear' || P.brows === 'worried')) { g.lineWidth = lw * .55; g.globalAlpha = .5; for (const y of [-.28, -.33]) { g.beginPath(); g.moveTo(...Hd([-.1 + tx, y])); g.quadraticCurveTo(...Hd([tx, y - .02]), ...Hd([.1 + tx, y])); g.stroke(); } g.globalAlpha = 1; }
  // nose (filled bulb)
  const n = Hd([tx * 1.2, .14]); const nw = kid ? .07 : .095;
  const np = spline([[n[0] - nw * .3, n[1] - .15], [n[0] + nw * .6 + tx * .1, n[1] - .02], [n[0] + nw, n[1] + .05], [n[0], n[1] + .08], [n[0] - nw, n[1] + .05]], .25);
  g.fillStyle = ch.skin2; g.fill(np); g.lineWidth = lw * .9; g.beginPath(); g.moveTo(n[0] + nw * .5, n[1] - .06); g.quadraticCurveTo(n[0] + nw * 1.1, n[1] + .06, n[0], n[1] + .08); g.quadraticCurveTo(n[0] - nw * .9, n[1] + .07, n[0] - nw * .8, n[1] + .02); g.stroke();
  if (!kid) { g.lineWidth = lw * .6; g.globalAlpha = .55; for (const s of [-1, 1]) { const a = Hd([s * .14 + tx, .16]); g.beginPath(); g.moveTo(...a); g.quadraticCurveTo(a[0] + s * .07, a[1] + .12, a[0] + s * .04, a[1] + .22); g.stroke(); } g.globalAlpha = 1; }
  // mouth
  const m = Hd([tx * 1.05, .33]), mw = kid ? .1 : .13, M = P.mouth;
  g.lineWidth = lw;
  if (M === 'shock' || M === 'shout' || M === 'talk') {
    const mh = M === 'shock' ? .17 : M === 'shout' ? .13 : .07, w2 = mw * (M === 'shout' ? 1.15 : M === 'talk' ? .8 : 1);
    const p = spline([[m[0] - w2, m[1] - mh * .3], [m[0], m[1] - mh * .45], [m[0] + w2, m[1] - mh * .3], [m[0] + w2 * .7, m[1] + mh * .9], [m[0], m[1] + mh], [m[0] - w2 * .7, m[1] + mh * .9]], .2);
    g.fillStyle = '#2b1411'; g.fill(p); g.save(); g.clip(p); g.fillStyle = '#a9483f'; g.beginPath(); g.ellipse(m[0], m[1] + mh, w2 * .7, mh * .5, 0, 0, 7); g.fill();
    g.fillStyle = '#ece4d6'; g.fillRect(m[0] - w2, m[1] - mh * .6, w2 * 2, mh * .32); g.restore(); g.lineWidth = lw * 1.1; g.stroke(p);
  } else if (M === 'small_o') { g.beginPath(); g.ellipse(m[0], m[1], mw * .35, .06, 0, 0, 7); g.fillStyle = '#2b1411'; g.fill(); g.stroke(); }
  else if (M === 'smile') { g.lineWidth = lw * 1.1; g.beginPath(); g.moveTo(m[0] - mw, m[1] - .03); g.quadraticCurveTo(m[0], m[1] + .1, m[0] + mw, m[1] - .03); g.stroke(); }
  else if (M === 'grim') { g.lineWidth = lw * 1.1; g.beginPath(); g.moveTo(m[0] - mw * .9, m[1] + .025); g.quadraticCurveTo(m[0], m[1] - .02, m[0] + mw * .9, m[1] + .03); g.stroke(); }
  else { g.beginPath(); g.moveTo(m[0] - mw * .6, m[1]); g.lineTo(m[0] + mw * .6, m[1]); g.stroke(); }
  if (ch.moustache) { const mo = Hd([tx * 1.12, .235]), big = ch.moustache === 'big', w = big ? .2 : .14, h = big ? .07 : .04;
    const p = spline([[mo[0] - w * 1.05, mo[1] + h * 1.1], [mo[0] - w * .45, mo[1] - h * .7], [mo[0], mo[1] - h * .35], [mo[0] + w * .45, mo[1] - h * .7], [mo[0] + w * 1.05, mo[1] + h * 1.1], [mo[0] + w * .4, mo[1] + h * .6], [mo[0], mo[1] + h * .8], [mo[0] - w * .4, mo[1] + h * .6]], .14);
    g.fillStyle = ch.hair; g.fill(p); g.lineWidth = lw * .9; g.stroke(p); }
  g.restore();
}

// ---------------------------------------------------------------- Actor card in the 3D world
export class Actor {
  constructor(ch, { height = 1.75, res = 1000 } = {}) {
    this.ch = typeof ch === 'string' ? CAST[ch] : ch;
    const aspect = .7; this.W = Math.round(res * aspect); this.H = res;
    this.canvas = document.createElement('canvas'); this.canvas.width = this.W; this.canvas.height = this.H;
    this.g = this.canvas.getContext('2d');
    this.tex = new THREE.CanvasTexture(this.canvas); this.tex.colorSpace = THREE.SRGBColorSpace; this.tex.anisotropy = 4;
    this.mat = new THREE.MeshBasicMaterial({ map: this.tex, transparent: true, alphaTest: .05, fog: true });
    const h = height / .965, w = h * aspect;
    const geo = new THREE.PlaneGeometry(w, h); geo.translate(0, h / 2 - h * .015, 0);
    this.mesh = new THREE.Mesh(geo, this.mat); this.mesh.renderOrder = 2;
    this.group = new THREE.Group(); this.group.add(this.mesh);
    const sh = new THREE.Mesh(new THREE.CircleGeometry(w * .3, 24), new THREE.MeshBasicMaterial({ color: 0x0a0a0c, transparent: true, opacity: .45, depthWrite: false, fog: true }));
    sh.rotation.x = -Math.PI / 2; sh.position.y = .015; sh.scale.y = .4; this.shadow = sh; this.group.add(sh);
    this.light = {}; this.mirror = false;
  }
  draw(P, light = this.light) {
    const g = this.g; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, this.W, this.H);
    if (this.mirror) { g.translate(this.W, 0); g.scale(-1, 1); light = { ...light, rimSide: -(light.rimSide ?? -1) }; }
    if (P && P.v === 2) this.J = drawRig(g, this.W, this.H, this.ch, P, light); else drawActor(g, this.W, this.H, this.ch, P, light);
    this.tex.needsUpdate = true; return this;
  }
  face(camera) { const p = new THREE.Vector3(); this.group.getWorldPosition(p);
    this.mesh.rotation.y = Math.atan2(camera.position.x - p.x, camera.position.z - p.z) - this.group.rotation.y; }
  tint(c = 0xffffff) { this.mat.color.set(c); }
  // world position of a rig point (head units, e.g. J.wrR.p) after draw(); card faces the camera (rotation.y of mesh)
  worldOf(pt) {
    const J = this.J; if (!J) return null; const px = this.W / 2 + J.S * pt[0], py = this.H * .985 + J.S * pt[1];
    const h = this.mesh.geometry.parameters.height, w = this.mesh.geometry.parameters.width;
    const v = new THREE.Vector3((px / this.W - .5) * w * (this.mirror ? -1 : 1), (1 - py / this.H) * h - h * .015, .01);
    this.mesh.updateMatrixWorld(true); return v.applyMatrix4(this.mesh.matrixWorld);
  }
}
