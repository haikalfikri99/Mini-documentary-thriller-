// ARSIP RIG: one base character for the whole channel (Mini Thriller IDN).
// Fixed ink head + sticker expressions + modular assets (hair, headwear, accessories, wardrobe).
// Pure Canvas2D, no dependencies, deterministic (pose = function of time → safe for HyperFrames seeking).
// Coordinates: character origin = ground point between the feet, y down, 1 unit = 1 px at scale 1.

export const INK = '#141317', FACE = '#f4ead8';
// skin & feature colours are per character (spec.skin / spec.feat); SK/FT hold the ones of the figure being drawn
// Channel decision (studi warna): default skin = sawo matang with dark-brown features; skin is a per-character parameter.
export const SKIN = { sawo: '#b5815a', langsat: '#d6a57c', terang: '#e6c3a0', gelap: '#8a5a3c' };
export const FEAT = '#2a1c16';
let SK = SKIN.sawo, FT = FEAT;
const mixHex = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); };

// —— proportions (adult ≈ 4.8 heads tall; child = same rig, bigger head ratio, shorter limbs) ——
export const BODY = {
  adult: { R: 50, neck: 14, torso: 150, sh: 30, hip: 20, ua: 80, fa: 76, th: 104, sn: 104, lw: 14 },
  child: { R: 46, neck: 9, torso: 94, sh: 22, hip: 15, ua: 54, fa: 50, th: 66, sn: 64, lw: 11 },
};

// —— small helpers ——
const TAU = Math.PI * 2;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const ease = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
export function shade(hex, k) {   // k<1 darker, k>1 lighter
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = c => Math.round(Math.min(255, k <= 1 ? c * k : c + (255 - c) * Math.min(1, k - 1)));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

// 2-bone IK: root a → target t with lengths l1, l2; side ±1 picks which way the joint bends. Bone lengths never stretch.
export function ik(a, t, l1, l2, side) {
  const dx = t[0] - a[0], dy = t[1] - a[1];
  const d = clamp(Math.hypot(dx, dy), Math.abs(l1 - l2) + .01, l1 + l2 - .01);
  const ang = Math.atan2(dy, dx), A = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
  return [[a[0] + Math.cos(ang + side * A) * l1, a[1] + Math.sin(ang + side * A) * l1], [a[0] + Math.cos(ang) * d, a[1] + Math.sin(ang) * d]];
}

// Deterministic damped spring: follows f(t) with lag/overshoot. Integrates from t-span so any frame can be rendered alone.
export function spring(f, t, { k = 120, c = 14, span = 1.2, dt = 1 / 120 } = {}) {
  let tt = t - span, x = f(tt), v = 0;
  for (; tt < t; tt += dt) { const a = k * (f(tt) - x) - c * v; v += a * dt; x += v * dt; }
  return x;
}

// Walk cycle with planted feet (feet never slide): body moves at speed v px/s, period T s (one full stride pair).
export function walk(t, { v = 140, T = 1.0, lift = 16, dir = 1 } = {}) {
  const bodyX = v * t * dir, L = v * T;
  const foot = off => {
    const p = t / T + off, k = Math.floor(p), u = p - k;
    const P0 = (k + .25) * L;   // planted while the body passes over it
    if (u < .5) return [P0 * dir - bodyX + 0, 0];
    const s = ease((u - .5) / .5);
    return [lerp(P0, P0 + L, s) * dir - bodyX, -Math.sin(s * Math.PI) * lift];
  };
  const ph = t / T * TAU;
  return {
    x: bodyX, lf: foot(0), rf: foot(.5),
    bob: -Math.abs(Math.cos(ph)) * 7 + 3,   // pelvis lowest at contact, highest at passing
    swing: Math.sin(ph),                    // arms swing opposite to legs
  };
}

// —— character specs: base + modular assets ——
// spec = { body, height, build, stoop, hair:{type,col}, headwear:{type,col}, acc:[{type,col}], top:{type,col,col2}, bottom:{type,col,col2}, shoes }
export const ASSETS = {
  hair: ['none', 'pendek', 'panjang', 'kuncir', 'sanggul', 'keriting', 'botak'],
  headwear: ['peci', 'kerudung', 'topi'],
  acc: ['kacamata', 'kumis', 'jenggot', 'syal'],
  top: ['kaos', 'kemeja', 'hoodie', 'jas', 'kebaya', 'gamis'],
  bottom: ['panjang', 'pendek', 'rok', 'sarung'],
};

export const PRESETS = {
  pria: { body: 'adult', hair: { type: 'pendek', col: '#2b221d' }, top: { type: 'kemeja', col: '#5d7f9e' }, bottom: { type: 'panjang', col: '#3b3f4a' }, shoes: '#2a2522' },
  wanita: { body: 'adult', build: .9, hair: { type: 'panjang', col: '#2b1f1a' }, top: { type: 'kaos', col: '#c9705a' }, bottom: { type: 'rok', col: '#4e5a6e' }, shoes: '#2a2522' },
  ibu: { body: 'adult', skin: '#d6a57c', build: .95, headwear: { type: 'kerudung', col: '#7f8f6a' }, top: { type: 'gamis', col: '#a77d63' }, shoes: '#3a2c25' },
  kakak: { body: 'adult', height: .97, hair: { type: 'keriting', col: '#241c18' }, top: { type: 'hoodie', col: '#3f6fb6' }, bottom: { type: 'panjang', col: '#2e3442' }, shoes: '#e9e4da' },
  kakek: { body: 'adult', skin: '#9c6a48', height: .94, stoop: .22, hair: { type: 'botak', col: '#cfc9bf' }, headwear: { type: 'peci', col: '#1c1b1f' }, acc: [{ type: 'kacamata' }, { type: 'kumis', col: '#d8d3ca' }], top: { type: 'kemeja', col: '#b89a6a' }, bottom: { type: 'sarung', col: '#5a4a6e', col2: '#8a77a0' }, shoes: '#3a2c25' },
  nenek: { body: 'adult', height: .9, build: .95, stoop: .26, hair: { type: 'sanggul', col: '#d6d1c8' }, acc: [{ type: 'kacamata' }], top: { type: 'kebaya', col: '#8a6a8e' }, bottom: { type: 'sarung', col: '#6b4a32', col2: '#a4784f' }, shoes: '#3a2c25' },
  adik_lk: { body: 'child', hair: { type: 'pendek', col: '#2b221d' }, top: { type: 'kemeja', col: '#f1efe8' }, bottom: { type: 'pendek', col: '#a8323a' }, shoes: '#1f1d22' },
  adik_pr: { body: 'child', skin: '#d6a57c', hair: { type: 'kuncir', col: '#2b1f1a', tie: '#ffb43a' }, top: { type: 'kaos', col: '#e3b54a' }, bottom: { type: 'rok', col: '#4a7f78' }, shoes: '#c94f4f' },
};

// —— pose → joints ——
// pose = { x, y, s, facing(-1..1), lean, crouch, hipX, headTilt, look, gaze:[gx,gy], lh:[x,y], rh:[x,y] (hand targets relative to shoulder), lf, rf (feet relative to origin), expr, blink, mouth, hold:'hp'|null, holdHand:'r'|'l', sway (secondary 0..), t }
export function solve(spec, P) {
  const B0 = BODY[spec.body || 'adult'], h = spec.height || 1, bw = spec.build || 1;
  const B = { ...B0, torso: B0.torso * h, ua: B0.ua * h, fa: B0.fa * h, th: B0.th * h, sn: B0.sn * h };
  const f = P.facing ?? 0, af = Math.abs(f), fd = f < 0 ? -1 : 1, side = af > .35;
  const legLen = B.th + B.sn;
  const pel = [P.hipX || 0, -legLen * .995 + (P.crouch || 0) + (P.bob || 0)];
  const stoop = spec.stoop || 0, lean = (P.lean || 0) + stoop;
  const tilt = lean * fd * af + (P.sideLean || 0);   // in front view the lean reads as a small sideways tilt only
  const N = add(pel, rot([0, -B.torso], tilt));
  const shw = B.sh * bw * (1 - .6 * af), hpw = B.hip * bw * (1 - .55 * af);
  const sL = add(N, rot([-shw, 10], tilt)), sR = add(N, rot([shw, 10], tilt));
  const hL = add(pel, [-hpw, 0]), hR = add(pel, [hpw, 0]);
  const dfx = B.hip * 1.0 * (1 - af * .8);
  const fL = P.lf || [-dfx, 0], fR = P.rf || [dfx, 0];
  const kneeSide = s => side ? -fd : s;    // knees forward in profile, slightly outward in front
  const [kL, aL] = ik(hL, fL, B.th, B.sn, kneeSide(1)), [kR, aR] = ik(hR, fR, B.th, B.sn, kneeSide(-1));
  const elbSide = s => side ? fd : s;      // elbows backward in profile
  const dh = (B.ua + B.fa) * .96;
  const tL = add(sL, P.lh || [-6, dh]), tR = add(sR, P.rh || [6, dh]);
  const [eL, wL] = ik(sL, tL, B.ua, B.fa, elbSide(1)), [eR, wR] = ik(sR, tR, B.ua, B.fa, elbSide(-1));
  const headA = tilt * .6 + (P.headTilt || 0) + stoop * .4 * fd * af;
  const neckTop = add(N, rot([stoop * 26 * fd * (af > .2 ? 1 : 0), -B.neck], tilt));
  const C = add(neckTop, rot([0, -B.R * .92], headA));
  return { B, f, af, fd, side, pel, N, sL, sR, hL, hR, kL, kR, aL, aR, eL, eR, wL, wR, C, headA, neckTop };
}

// —— drawing primitives ——
function limb(g, pts, w, col) { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.stroke(); }
function blob(g, pts, col, r = 10) { g.fillStyle = col; g.strokeStyle = col; g.lineWidth = r * 2; g.lineJoin = 'round'; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.closePath(); g.fill(); g.stroke(); }
function circle(g, c, r, col) { g.fillStyle = col; g.beginPath(); g.arc(c[0], c[1], r, 0, TAU); g.fill(); }
const mid = (a, b, t = .5) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

// —— expressions: stickers drawn in head space (R=50) ——
const EYE = {
  dot: (g, x, b) => { g.beginPath(); g.ellipse(x, 0, 5.5, 7.5 * b, 0, 0, TAU); g.fill(); },
  happy: (g, x) => { g.beginPath(); g.arc(x, 4, 7, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); },
  wide: (g, x, b, gz) => { g.beginPath(); g.ellipse(x, 0, 9, 10 * b, 0, 0, TAU); g.fill(); g.fillStyle = SK; g.beginPath(); g.arc(x + gz[0] * 3, gz[1] * 3, 3.6 * Math.min(1, b * 2), 0, TAU); g.fill(); g.fillStyle = FT; },
  half: (g, x, b) => { g.save(); g.beginPath(); g.rect(x - 9, -1, 18, 12); g.clip(); g.beginPath(); g.ellipse(x, 0, 5.5, 7.5 * b, 0, 0, TAU); g.fill(); g.restore(); g.beginPath(); g.moveTo(x - 8, -1); g.lineTo(x + 8, -1); g.stroke(); },
  closed: (g, x) => { g.beginPath(); g.moveTo(x - 7, 2); g.quadraticCurveTo(x, 5, x + 7, 2); g.stroke(); },
  down: (g, x) => { g.beginPath(); g.moveTo(x - 7, 3); g.quadraticCurveTo(x, -1, x + 7, 3); g.stroke(); },
  squint: (g, x, b, gz, i) => { const d = i ? -1 : 1; g.beginPath(); g.moveTo(x - 6 * d, -5); g.lineTo(x + 5 * d, 0); g.lineTo(x - 6 * d, 5); g.stroke(); },
};
const BROW = {
  none: () => { },
  angry: (g, x, i) => { const d = i ? 1 : -1; g.beginPath(); g.moveTo(x - 8 * d, -16); g.lineTo(x + 8 * d, -10); g.stroke(); },
  worried: (g, x, i) => { const d = i ? 1 : -1; g.beginPath(); g.moveTo(x - 8 * d, -12); g.lineTo(x + 8 * d, -18); g.stroke(); },
  raised: (g, x) => { g.beginPath(); g.arc(x, -10, 9, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); },
  flat: (g, x) => { g.beginPath(); g.moveTo(x - 8, -13); g.lineTo(x + 8, -13); g.stroke(); },
  one: (g, x, i) => i ? BROW.raised(g, x) : BROW.flat(g, x),
};
const MOUTH = {
  flat: g => { g.beginPath(); g.moveTo(-8, 20); g.lineTo(8, 20); g.stroke(); },
  smile: g => { g.beginPath(); g.arc(0, 11, 11, Math.PI * .2, Math.PI * .8); g.stroke(); },
  grin: g => { g.beginPath(); g.moveTo(-13, 15); g.quadraticCurveTo(0, 15, 13, 15); g.quadraticCurveTo(12, 30, 0, 30); g.quadraticCurveTo(-12, 30, -13, 15); g.fill(); },
  frown: g => { g.beginPath(); g.arc(0, 30, 10, Math.PI * 1.22, Math.PI * 1.78); g.stroke(); },
  o: g => { g.beginPath(); g.ellipse(0, 22, 6, 8, 0, 0, TAU); g.stroke(); },
  open: g => { g.beginPath(); g.ellipse(0, 21, 9, 7, 0, 0, TAU); g.fill(); },
  wavy: g => { g.beginPath(); g.moveTo(-11, 21); for (let i = 1; i <= 4; i++) g.lineTo(-11 + i * 5.5, 21 + (i % 2 ? -3 : 3)); g.stroke(); },
  smirk: g => { g.beginPath(); g.moveTo(-9, 21); g.quadraticCurveTo(3, 22, 10, 15); g.stroke(); },
  A: g => { g.beginPath(); g.ellipse(0, 21, 7, 8, 0, 0, TAU); g.fill(); },
  E: g => { g.beginPath(); g.ellipse(0, 20, 10, 4, 0, 0, TAU); g.fill(); },
  O: g => MOUTH.o(g),
  M: g => MOUTH.flat(g),
};
export const EXPR = {
  netral: { e: 'dot', b: 'none', m: 'flat' },
  senyum: { e: 'dot', b: 'none', m: 'smile' },
  senang: { e: 'happy', b: 'none', m: 'grin' },
  kaget: { e: 'wide', b: 'raised', m: 'o' },
  takut: { e: 'wide', b: 'worried', m: 'wavy' },
  marah: { e: 'dot', b: 'angry', m: 'frown' },
  sedih: { e: 'dot', b: 'worried', m: 'frown' },
  curiga: { e: 'half', b: 'one', m: 'smirk' },
  lelah: { e: 'half', b: 'flat', m: 'flat' },
  menyesal: { e: 'down', b: 'worried', m: 'frown' },
  bingung: { e: 'dot', b: 'one', m: 'wavy' },
  kesakitan: { e: 'squint', b: 'worried', m: 'wavy' },
};

function drawFace(g, J, P, spec) {
  const R = J.B.R, look = P.look ?? J.f * .9, sx = 1 - .3 * Math.abs(look);
  const ex = EXPR[P.expr || 'netral'] || EXPR.netral, b = 1 - clamp(P.blink || 0);
  g.save(); g.translate(...J.C); g.rotate(J.headA); g.scale(R / 50, R / 50);
  g.beginPath(); g.arc(0, 0, 50, 0, TAU); g.clip();
  g.translate(look * 21, 2); g.scale(sx, 1);
  g.fillStyle = FT; g.strokeStyle = FT; g.lineWidth = 4; g.lineCap = 'round'; g.lineJoin = 'round';
  const gz = P.gaze || [look * .6, 0];
  [-15, 15].forEach((x, i) => { g.save(); g.translate(gz[0] * 2, gz[1] * 2); (b < .25 && ex.e !== 'happy' ? EYE.closed : EYE[ex.e])(g, x, Math.max(b, .12), gz, i); BROW[ex.b](g, x, i); g.restore(); });
  (MOUTH[P.mouth || ex.m] || MOUTH.flat)(g);
  for (const a of spec.acc || []) {
    if (a.type === 'kacamata') { g.strokeStyle = a.col || FT; g.lineWidth = 3; g.beginPath(); g.arc(-15, 0, 11, 0, TAU); g.moveTo(26, 0); g.arc(15, 0, 11, 0, TAU); g.moveTo(-4, -1); g.quadraticCurveTo(0, -4, 4, -1); g.stroke(); }
    if (a.type === 'kumis') { g.fillStyle = a.col || '#3b3430'; g.beginPath(); g.moveTo(-14, 15); g.quadraticCurveTo(0, 6, 14, 15); g.quadraticCurveTo(0, 12, -14, 15); g.fill(); }
    if (a.type === 'jenggot') { g.save(); g.globalAlpha = .55; g.fillStyle = a.col || '#3b3430'; g.beginPath(); g.moveTo(-44, 6); g.quadraticCurveTo(-40, 50, 0, 54); g.quadraticCurveTo(40, 50, 44, 6); g.quadraticCurveTo(30, 30, 0, 32); g.quadraticCurveTo(-30, 30, -44, 6); g.fill(); g.restore(); g.strokeStyle = FT; g.fillStyle = FT; g.lineWidth = 4; (MOUTH[P.mouth || ex.m] || MOUTH.flat)(g); }
  }
  g.restore();
}

// hair & headwear: 'back' layer goes behind the head, 'front' on top of it
function drawHair(g, J, P, spec, layer, col0) {
  const R = J.B.R, hr = spec.hair, hw = spec.headwear;
  const look = P.look ?? J.f * .9;
  g.save(); g.translate(...J.C); g.rotate(J.headA); g.scale(R / 50, R / 50);
  const C = c => col0 || c;
  if (hr && hr.type !== 'none') {
    const col = C(hr.col || '#2b221d');
    if (layer === 'back') {
      if (hr.type === 'panjang') { const sw = P.hairSway || 0; blob(g, [[-48, -10], [48, -10], [50 + sw * 6, 70], [38 + sw * 10, 96], [-38 + sw * 10, 96], [-50 + sw * 6, 70]], col, 8); }
      if (hr.type === 'kuncir') { const sw = P.hairSway || 0, bx = -look * 30 - 46, by = -24; g.save(); g.translate(bx, by); g.rotate(.35 + sw * .5); blob(g, [[-10, 0], [10, 0], [14, 42], [0, 58], [-14, 42]], col, 6); g.restore(); if (hr.tie) circle(g, [bx, by], 8, col0 || hr.tie); }
      if (hr.type === 'sanggul') circle(g, [-look * 30, -50], 22, col);
    } else {
      // cap of hair over the top of the head, fringe follows the look a little
      const o = look * 8;
      if (hr.type === 'botak') { g.fillStyle = col; [-1, 1].forEach(s => { g.beginPath(); g.ellipse(s * 44 + o * .3, 4, 9, 20, s * .2, 0, TAU); g.fill(); }); }
      else {
        // a cap that hugs the skull, with a side-swept fringe edge across the forehead
        g.fillStyle = col; g.beginPath(); g.arc(0, 0, 54, Math.PI * 1.06, Math.PI * 1.94);
        g.quadraticCurveTo(44, -22, 30 + o, -26); g.quadraticCurveTo(4 + o, -40, -18 + o, -24); g.quadraticCurveTo(-38, -14, -52, -10); g.closePath(); g.fill();
        if (hr.type === 'keriting') { for (let i = 0; i <= 8; i++) { const a = Math.PI * (1.06 + .88 * i / 8); circle(g, [Math.cos(a) * 52, Math.sin(a) * 52], 10, col); } g.strokeStyle = col0 || shade(hr.col || '#2b221d', 2.2); g.lineWidth = 2.4; for (let i = 0; i < 6; i++) { const a = Math.PI * (1.18 + .64 * i / 5); g.beginPath(); g.arc(Math.cos(a) * 38, Math.sin(a) * 38, 5, 0, Math.PI * 1.4); g.stroke(); } }
        else if (!col0) { g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 46, Math.PI * 1.3, Math.PI * 1.5); g.stroke(); }
      }
    }
  }
  if (hw) {
    const col = C(hw.col || '#1c1b1f');
    if (hw.type === 'kerudung' && layer === 'back') blob(g, [[-56, -20], [56, -20], [64, 70], [44, 112], [-44, 112], [-64, 70]], col, 10);
    if (hw.type === 'kerudung' && layer === 'front') { g.fillStyle = col; g.beginPath(); g.arc(0, 0, 58, 0, TAU); g.arc(look * 18, 6, 41, 0, TAU, true); g.fill('evenodd'); g.strokeStyle = col0 || shade(hw.col, .8); g.lineWidth = 3; g.beginPath(); g.arc(look * 18, 6, 43, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
    if (hw.type === 'peci' && layer === 'front') { blob(g, [[-46, -28], [46, -28], [42, -58], [-42, -58]], col, 5); if (!col0) { g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(-44, -38, 88, 4); } }
    if (hw.type === 'topi' && layer === 'front') { blob(g, [[-50, -18], [-46, -48], [-16, -64], [18, -64], [46, -48], [50, -18]], col, 4); const d = Math.abs(look) > .3 ? Math.sign(look) : 0; blob(g, d ? [[d * 30, -24], [d * 82, -18], [d * 82, -12], [d * 30, -14]] : [[-46, -16], [46, -16], [40, -4], [-40, -4]], col0 || shade(hw.col, .8), 3); }
  }
  g.restore();
}

// —— full character ——
// opts = { rim:{col, dir:[dx,dy], w}, dark: far-limb darkening }
export function drawChar(g, spec, P, opts = {}) {
  const J = solve(spec, P);
  const s = P.s || 1;
  // scene light: skin takes a little of the ambient colour (opts.amb, opts.ambK) so faces sit inside the scene
  SK = opts.amb ? mixHex(spec.skin || SKIN.sawo, opts.amb, opts.ambK ?? .18) : (spec.skin || SKIN.sawo); FT = spec.feat || FEAT;
  if (opts.lightHead === undefined) opts = { ...opts, lightHead: .26 };
  g.save(); g.translate(P.x || 0, P.y || 0); g.scale(s * (P.flip ? -1 : 1), s);
  const rim = opts.rim, lw = J.B.lw;
  const part = fn => { if (rim) { g.save(); g.translate(rim.dir[0] * (rim.w || 4) / s, rim.dir[1] * (rim.w || 4) / s); fn(rim.col); g.restore(); } fn(null); };
  const top = spec.top || { type: 'kaos', col: '#888' }, bot = spec.bottom, shoes = spec.shoes || '#222';
  const far = J.side ? (J.fd > 0 ? 'L' : 'R') : null;   // in profile, the limb on the far side is drawn first and darker
  const kd = .78;

  // contact shadow
  if (!opts.noShadow) { g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(0, 2, 46 * (J.B.R / 50) * 1.2, 7, 0, 0, TAU); g.fill(); }

  const leg = (k, a, h, dk) => c => {
    const col = c || SK; limb(g, [h, k, a], lw, col);
    const full = bot && ['panjang'].includes(bot.type), half = bot && bot.type === 'pendek';
    if (full || half) limb(g, full ? [h, k, mid(k, a, .86)] : [h, mid(h, k, .92)], lw + 10, c || (dk ? shade(bot.col, kd) : bot.col));
    const sh = c || (dk ? shade(shoes, kd) : shoes);
    if (J.side) blob(g, [[a[0] - 6 * J.fd, a[1] - 2], [a[0] + 20 * J.fd, a[1] - 2], [a[0] + 20 * J.fd, a[1] + 4], [a[0] - 6 * J.fd, a[1] + 4]], sh, 5);
    else { g.fillStyle = sh; g.beginPath(); g.ellipse(a[0], a[1], 12, 7, 0, 0, TAU); g.fill(); }
  };
  const sleeveLen = { kaos: .45, kemeja: 1, hoodie: 1, jas: 1, kebaya: 1, gamis: 1 }[top.type] ?? .45;
  const arm = (sh, e, w, dk, isR) => c => {
    const col = c || SK; limb(g, [sh, e, w], lw - 1, col);
    const tc = c || (dk ? shade(top.col, kd) : top.col);
    if (sleeveLen >= 1) limb(g, [sh, e, mid(e, w, .82)], lw + (top.type === 'hoodie' ? 12 : 9), tc); else limb(g, [sh, mid(sh, e, sleeveLen * 1.6)], lw + 11, tc);
    circle(g, w, lw * .78, col);
    if (P.hold === 'hp' && (P.holdHand || 'r') === (isR ? 'r' : 'l') && !c) { g.save(); g.translate(...w); g.rotate(P.phoneRot ?? -.25); g.fillStyle = '#1d1f26'; g.beginPath(); g.roundRect(-9, -26, 18, 34, 4); g.fill(); if (P.phoneBack) { g.fillStyle = '#2c2f38'; g.beginPath(); g.roundRect(-7, -23, 14, 27, 3); g.fill(); g.fillStyle = '#0d0e12'; g.beginPath(); g.arc(-3, -18, 2.4, 0, TAU); g.fill(); } else { g.fillStyle = P.phoneGlow || '#7fe3ff'; g.globalAlpha = .9; g.beginPath(); g.roundRect(-7, -23, 14, 27, 2); g.fill(); g.globalAlpha = 1; } g.restore(); circle(g, add(w, [2, 2]), lw * .7, SK); }
  };
  const legs = { L: leg(J.kL, J.aL, J.hL, far === 'L'), R: leg(J.kR, J.aR, J.hR, far === 'R') };
  const arms = { L: arm(J.sL, J.eL, J.wL, far === 'L', false), R: arm(J.sR, J.eR, J.wR, far === 'R', true) };

  if (far) { part(arms[far]); part(legs[far]); }
  part(c => drawHair(g, J, P, spec, 'back', c));
  // skirts / sarung / gamis: a trapezoid from hips to knees or ankles that widens with the stride
  const skirt = c => {
    const type = top.type === 'gamis' ? 'gamis' : bot && bot.type;
    if (!['rok', 'sarung', 'gamis'].includes(type)) return;
    const col = c || (type === 'gamis' ? top.col : bot.col);
    const yb = type === 'rok' ? Math.max(J.kL[1], J.kR[1]) + 22 : Math.max(J.aL[1], J.aR[1]) - 12;
    const xs = type === 'rok' ? [J.kL[0], J.kR[0]] : [mid(J.kL, J.aL, .8)[0], mid(J.kR, J.aR, .8)[0]];
    const x0 = Math.min(...xs) - 16, x1 = Math.max(...xs) + 16, hw = J.B.hip * (spec.build || 1) + 8;
    blob(g, [[J.pel[0] - hw, J.pel[1] - 6], [J.pel[0] + hw, J.pel[1] - 6], [x1, yb], [x0, yb]], col, 6);
    if (!c && type === 'sarung' && bot.col2) { g.save(); g.beginPath(); g.moveTo(J.pel[0] - hw - 6, J.pel[1] - 12); g.lineTo(J.pel[0] + hw + 6, J.pel[1] - 12); g.lineTo(x1 + 6, yb + 6); g.lineTo(x0 - 6, yb + 6); g.closePath(); g.clip(); g.strokeStyle = bot.col2; g.lineWidth = 3; g.globalAlpha = .7; for (let i = -6; i < 12; i++) { g.beginPath(); g.moveTo(x0 - 40 + i * 16, J.pel[1] - 20); g.lineTo(x0 - 40 + i * 16, yb + 20); g.stroke(); } for (let y = J.pel[1]; y < yb + 10; y += 22) { g.beginPath(); g.moveTo(x0 - 40, y); g.lineTo(x1 + 40, y); g.stroke(); } g.restore(); }
  };
  if (!far) { part(legs.L); part(legs.R); } else part(legs[far === 'L' ? 'R' : 'L']);
  part(skirt);
  // torso: rounded quad from shoulders to hips (kebaya runs past the hips)
  part(c => {
    const ext = top.type === 'kebaya' ? 34 : top.type === 'jas' ? 16 : 6;
    const hw = J.B.hip * (spec.build || 1) + 4;
    const dn = rot([0, ext], 0);
    blob(g, [add(J.sL, [-4, -6]), add(J.sR, [4, -6]), add(J.pel, [hw + (J.side ? 0 : 2), dn[1]]), add(J.pel, [-hw, dn[1]])], c || top.col, 9);
    if (c) return;
    // light falloff on the shirt (subtle gradient: lit side brighter)
    const gr = g.createLinearGradient(J.sL[0] - 20, 0, J.sR[0] + 20, 0); gr.addColorStop(0, 'rgba(255,255,255,.07)'); gr.addColorStop(1, 'rgba(0,0,0,.18)');
    g.save(); g.globalCompositeOperation = 'source-atop'; g.restore();
    const lc = shade(top.col, .72); g.strokeStyle = lc; g.lineWidth = 2.5; g.lineCap = 'round';
    const cx = mid(J.N, J.pel, 0)[0];
    if (top.type === 'kemeja' || top.type === 'jas') { g.beginPath(); g.moveTo(J.N[0], J.N[1] + 12); g.lineTo(J.pel[0], J.pel[1]); g.stroke(); g.fillStyle = shade(top.col, top.type === 'jas' ? 1.6 : 1.25); g.beginPath(); g.moveTo(J.N[0] - 14, J.N[1] + 2); g.lineTo(J.N[0], J.N[1] + (top.type === 'jas' ? 40 : 18)); g.lineTo(J.N[0] + 14, J.N[1] + 2); g.closePath(); g.fill(); }
    if (top.type === 'hoodie') { const sw = P.stringSway || 0; g.strokeStyle = '#efe9df'; g.lineWidth = 2.5; [-7, 7].forEach(d => { g.beginPath(); g.moveTo(J.N[0] + d, J.N[1] + 12); g.quadraticCurveTo(J.N[0] + d + sw * 4, J.N[1] + 28, J.N[0] + d + sw * 9, J.N[1] + 42); g.stroke(); }); g.strokeStyle = lc; g.beginPath(); g.moveTo(J.pel[0] - 16, J.pel[1] - 26); g.lineTo(J.pel[0] + 16, J.pel[1] - 26); g.stroke(); }
    if (top.type === 'kebaya') { g.strokeStyle = shade(top.col, 1.4); g.beginPath(); g.moveTo(J.N[0] - 10, J.N[1] + 6); g.lineTo(J.pel[0] + 4, J.pel[1] + 30); g.stroke(); }
    void cx; void gr;
  });
  if (top.type === 'hoodie') part(c => { blob(g, [add(J.N, [-20, -6]), add(J.N, [20, -6]), add(J.N, [16, 10]), add(J.N, [-16, 10])], c || shade(top.col, .85), 8); });
  for (const a of spec.acc || []) if (a.type === 'syal') part(c => { limb(g, [add(J.N, [-16, 2]), add(J.N, [16, 2])], 14, c || a.col || '#e8dcc0'); limb(g, [add(J.N, [8, 4]), add(J.N, [12 + (P.stringSway || 0) * 6, 50])], 12, c || a.col || '#e8dcc0'); });
  part(c => limb(g, [J.N, J.neckTop], lw - 2, c || SK));
  part(c => circle(g, J.C, J.B.R, c || SK));
  // light on the head: a soft key-side highlight and a core shadow on the far side, so a light head never glows flat
  if (opts.lightHead) { const d = rim ? rim.dir : [.7, -.7], R = J.B.R, gr = g.createLinearGradient(J.C[0] + d[0] * R, J.C[1] + d[1] * R, J.C[0] - d[0] * R, J.C[1] - d[1] * R);
    gr.addColorStop(0, 'rgba(255,255,255,.10)'); gr.addColorStop(.5, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${opts.lightHead})`); circle(g, J.C, R, gr); }
  part(c => drawHair(g, J, P, spec, 'front', c));
  drawFace(g, J, P, spec);
  if (!far) { part(arms.L); part(arms.R); } else part(arms[far === 'L' ? 'R' : 'L']);
  g.restore();
  return J;
}

// —— close-up hand (LOD 2): POV right hand holding a phone ——
// Phone centred at (cx,cy), size w×h on screen. Built in "phone units" (phone = 300 wide). screen(g,x,y,w,h) paints the display.
// Anatomy: palm + heel cup the lower-right corner, four fingertips wrap the left edge, the thumb lies over the lower screen.
export function handPhoneCU(g, cx, cy, w, h, { sleeve = '#3f6fb6', screen, rim = '#7fe3ff', thumbT = 0, skinCol = SKIN.sawo, amb = '#3d3650', ambK = .25 } = {}) {
  const sc = mixHex(skinCol, amb, ambK), LO = shade(sc, .62), HI = shade(sc, 1.12);
  const u = w / 300, W2 = 150, H2 = 150 * h / w;
  g.save(); g.translate(cx, cy); g.scale(u, u);
  const skin = (x0, y0, x1, y1, lo = LO, hi = HI) => { const gr = g.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, hi); gr.addColorStop(1, lo); return gr; };
  // tapered capsule from a (width wa) to b (width wb), round ends
  const capsule = (a, b, wa, wb, fill) => { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), n = [-Math.sin(ang), Math.cos(ang)];
    g.fillStyle = fill; g.beginPath(); g.moveTo(a[0] + n[0] * wa / 2, a[1] + n[1] * wa / 2); g.lineTo(b[0] + n[0] * wb / 2, b[1] + n[1] * wb / 2);
    g.arc(b[0], b[1], wb / 2, ang + Math.PI / 2, ang - Math.PI / 2, true); g.lineTo(a[0] - n[0] * wa / 2, a[1] - n[1] * wa / 2); g.arc(a[0], a[1], wa / 2, ang - Math.PI / 2, ang + Math.PI / 2, true); g.fill(); };
  // sleeve cuff and forearm entering from the bottom-right
  capsule([150, H2 + 330], [110, H2 + 40], 210, 180, skin(0, H2, 300, H2 + 200));
  capsule([200, H2 + 420], [165, H2 + 190], 260, 240, sleeve);
  // palm behind the phone, heel of the hand showing below and right of it
  blob(g, [[-W2 + 30, H2 * .4], [W2 - 10, H2 * .3], [W2 + 34, H2 * .75], [W2 + 4, H2 + 66], [-30, H2 + 76], [-W2 + 4, H2 * .86]], skin(-W2, H2 * .3, W2, H2 + 100), 32);
  // fingers behind the phone (the part that shows past the left edge), drawn before the phone
  const fing = [[H2 * .02, 62], [H2 * .26, 64], [H2 * .5, 60], [H2 * .72, 52]];
  fing.forEach(([y, th], i) => { capsule([-W2 + 40, y + 30], [-W2 - 34 + i * 4, y], th, th * .92, skin(-W2 - 40, y - th / 2, -W2 - 40, y + th / 2)); });
  // phone body + display
  g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.roundRect(-W2 + 10, -H2 + 16, W2 * 2, H2 * 2, 42); g.fill();
  g.fillStyle = '#121318'; g.beginPath(); g.roundRect(-W2, -H2, W2 * 2, H2 * 2, 42); g.fill();
  g.save(); g.beginPath(); g.roundRect(-W2 + 12, -H2 + 12, W2 * 2 - 24, H2 * 2 - 24, 32); g.clip();
  if (screen) screen(g, -W2 + 12, -H2 + 12, W2 * 2 - 24, H2 * 2 - 24); else { g.fillStyle = '#dfe8ee'; g.fillRect(-W2, -H2, W2 * 2, H2 * 2); }
  g.restore();
  g.fillStyle = '#0a0b0e'; g.beginPath(); g.roundRect(-30, -H2 + 24, 60, 18, 9); g.fill();
  g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 3; g.beginPath(); g.roundRect(-W2 + 2, -H2 + 2, W2 * 2 - 4, H2 * 2 - 4, 40); g.stroke();
  // fingertips curling over the left bezel onto the glass (in front of the phone edge)
  fing.forEach(([y, th], i) => {
    const tip = [-W2 + 16 - i * 2, y + 2];
    capsule([-W2 - 30 + i * 4, y], tip, th * .92, th * .8, skin(tip[0], y - th / 2, tip[0], y + th / 2));
    g.fillStyle = 'rgba(255,255,255,.14)'; g.beginPath(); g.ellipse(-W2 - 12, y - th * .22, 20, 6, 0, 0, TAU); g.fill();       // knuckle sheen
    if (rim) { g.strokeStyle = rim; g.globalAlpha = .5; g.lineWidth = 3; g.beginPath(); g.arc(tip[0], tip[1], th * .4 - 1, -1.2, 1.2); g.stroke(); g.globalAlpha = 1; }
  });
  // thenar (thumb base) mound + thumb in two tapered segments, nail at the tip
  const base = [W2 + 12, H2 * .74], kn = [W2 - 40 + thumbT * 6, lerp(H2 * .5, H2 * .36, thumbT)], tip = [W2 - 120 + thumbT * 10, lerp(H2 * .34, H2 * .16, thumbT)];
  blob(g, [[W2 - 4, H2 * .62], [W2 + 36, H2 * .58], [W2 + 40, H2 + 16], [W2 - 10, H2 + 8]], skin(W2 - 30, H2 * .5, W2 + 60, H2), 22);
  capsule(base, kn, 92, 80, skin(base[0], base[1] - 50, base[0] - 40, base[1] + 50));
  capsule(kn, tip, 80, 66, skin(kn[0], kn[1] - 40, kn[0], kn[1] + 40));
  const na = Math.atan2(tip[1] - kn[1], tip[0] - kn[0]);
  g.save(); g.translate(tip[0] - Math.cos(na) * 8, tip[1] - Math.sin(na) * 8); g.rotate(na); g.fillStyle = 'rgba(255,236,220,.45)'; g.beginPath(); g.ellipse(-4, -2, 22, 17, 0, 0, TAU); g.fill(); g.restore();
  g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 3; g.beginPath(); const jm = [kn[0] - Math.sin(na) * 28, kn[1] + Math.cos(na) * 28]; g.moveTo(kn[0] + Math.sin(na) * 30, kn[1] - Math.cos(na) * 30); g.quadraticCurveTo(kn[0] + 6, kn[1], ...jm); g.stroke();
  if (rim) { g.strokeStyle = rim; g.globalAlpha = .45; g.lineWidth = 4; g.beginPath(); g.moveTo(kn[0] + Math.sin(na) * 38, kn[1] - Math.cos(na) * 38); g.lineTo(tip[0] + Math.sin(na) * 30, tip[1] - Math.cos(na) * 30); g.stroke(); g.globalAlpha = 1; }
  g.restore();
}
