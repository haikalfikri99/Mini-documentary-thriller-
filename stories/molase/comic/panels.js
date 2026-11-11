// Motion-comic panels (storyboard v5), still proofs: t=0 → P1 (cold open), t=1 → P3 (ARSIP KASUS), t=2 → P8 (calm street, 15 Jan 1919).
// The street is real one-point perspective (3D points projected), drawn with the toon engine (ink line, flat fill, light crescents).
import { clamp, lerp, hash } from '/core/lib.js';
import { init, frame, g, W, H, INK, S, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, arc, spline, rr, rect, noodle, dot } from '/engine/toon.js';
import { person, setLight, form, SKIN } from '/engine/cast.js';
import { runFront, walk } from '/engine/motion.js';
import { glow, wash, stamp, wordCaption, PAPER } from '/engine/brand.js';
import { grain, vignette } from '/engine/look.js';

const AMBER = '#ffb43a';
// ———————————————— colour helpers
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const toHex = a => '#' + a.map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
const mix = (a, b, k) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => lerp(v, B[i], k))); };
const shade = (c, k) => mix(c, k < 0 ? '#14101a' : '#ffffff', Math.abs(k));
let HAZE = '#d6dbe0';
const fog = (c, z, k = .011) => mix(c, HAZE, 1 - Math.exp(-z * k));

// ———————————————— camera
let F = 1000, CX = 540, HY = 1000, CAMH = 1.6;
const P = (x, y, z) => [CX + F * x / z, HY - F * (y - CAMH) / z];
const poly = pts => pts.map(p => P(...p));
const lwAt = z => clamp(1.25 - z / 45, .32, 1.15);
function at(z, fn) { const o = S.lwScale; S.lwScale = lwAt(z); fn(); S.lwScale = o; }
// direct canvas ellipse/poly for dense texture (no boil)
const fillPoly = (pts, col, a = 1) => { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath(); g.fill(); g.globalAlpha = 1; };
const line = (a, b, col, w, al = 1) => { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = al; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); g.globalAlpha = 1; };

// ———————————————— sky
function sky(top = '#b9c7d3', mid = '#d5dde2', low = '#ebe6da') {
  g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, HY + 80);
  gr.addColorStop(0, top); gr.addColorStop(.6, mid); gr.addColorStop(1, low); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  // painted clouds: lit tops, shaded bellies
  const C = [[160, 260, 1.2], [520, 180, 1.5], [880, 300, 1.1], [330, 520, .9], [760, 560, .8]];
  for (const [x, y, s] of C) {
    for (let k = 0; k < 6; k++) { const cx = x + (k - 2.5) * 70 * s, cy = y - Math.sin(k * 1.3) * 26 * s; fillOnly(ell(cx, cy + 22 * s, 95 * s, 46 * s, 30), '#c6ced6', { boil: .3 }); }
    for (let k = 0; k < 6; k++) { const cx = x + (k - 2.5) * 70 * s, cy = y - Math.sin(k * 1.3) * 26 * s; fillOnly(ell(cx, cy, 90 * s, 50 * s, 30), '#f3f2ec', { boil: .3 }); }
  }
}
// ———————————————— the molasses tank (background landmark)
function tank(cx, cz, r, h, wet = .3) {
  const z = cz - r, L = P(cx - r, 0, cz), R = P(cx + r, 0, cz), T = P(cx, h, cz), B = P(cx, 0, cz);
  const ry = Math.max(6, (R[0] - L[0]) * .08), top = T[1], bot = B[1];
  const body = [[L[0], top], ...arc((L[0] + R[0]) / 2, top, (R[0] - L[0]) / 2, ry, Math.PI, 0, 20), [R[0], bot], ...arc((L[0] + R[0]) / 2, bot, (R[0] - L[0]) / 2, ry, 0, Math.PI, 20)];
  at(cz, () => form(body, fog('#6c6a62', cz), {
    lw: 6, sw: 40, shade: () => {
      const w = R[0] - L[0];
      for (let k = 1; k < 6; k++) fillOnly(rect(L[0], lerp(top, bot, k / 6) - 2, w, 3), fog('#55544e', cz), { boil: .2 });
      for (let k = 0; k < 9; k++) { const x = L[0] + w * (.12 + k * .095), l = (bot - top) * (.2 + hash(k) * .5 * (1 + wet)); fillOnly(rect(x, top + (bot - top) * .18, 4 + hash(k * 3) * 6, l), fog('#5a3a1a', cz), { boil: .3, alpha: .7 }); }
    }
  }));
  at(cz, () => form(ell((L[0] + R[0]) / 2, top, (R[0] - L[0]) / 2, ry, 30), fog('#7b7970', cz), { lw: 5 }));
}
// ———————————————— a building facade on the left side (plane x = xf, facing +x)
const PAL = ['#8a5a48', '#7a6a62', '#9a7a5e', '#6e5a52', '#8c6e64'];
function facade(xf, z0, z1, h, seed, lit = 1) {
  const col = fog(shade(PAL[seed % PAL.length], lit > 0 ? .06 : -.25), (z0 + z1) / 2);
  const Q = poly([[xf, 0, z0], [xf, 0, z1], [xf, h, z1], [xf, h, z0]]), zm = (z0 + z1) / 2, pt = (u, v) => P(xf, v, lerp(z0, z1, u));
  at(zm, () => form(Q, col, { lw: 6, sw: 18 }));
  // brick courses (only where they read)
  const step = .45; if (F * step / z1 > 3.2) for (let y = 4.4; y < h - .7; y += step) line(pt(0, y), pt(1, y), shade(col, -.22), Math.max(.6, 1.6 * lwAt(zm)), .55);
  // ground floor: plaster band, shop window, door, sign
  const gf = poly([[xf, 0, z0], [xf, 0, z1], [xf, 4.1, z1], [xf, 4.1, z0]]);
  at(zm, () => form(gf, fog(shade('#b9a88c', lit > 0 ? 0 : -.3), zm), { lw: 5, sw: 10 }));
  const span = z1 - z0;
  at(zm, () => form(poly([[xf, .5, z0 + span * .1], [xf, .5, z0 + span * .6], [xf, 2.9, z0 + span * .6], [xf, 2.9, z0 + span * .1]]), fog('#2a3138', zm), {
    lw: 5, sw: 0, flat: true, shade: () => { const a = pt(.15, 2.6), b = pt(.35, .7); line(a, b, fog('#8fa3b0', zm), 6 * lwAt(zm), .5); }
  }));
  at(zm, () => form(poly([[xf, 0, z0 + span * .7], [xf, 0, z0 + span * .85], [xf, 2.6, z0 + span * .85], [xf, 2.6, z0 + span * .7]]), fog('#3a2a22', zm), { lw: 5, flat: true }));
  const signCol = fog(['#2e4a3e', '#5a2a26', '#2c3550'][seed % 3], zm);
  at(zm, () => form(poly([[xf + .05, 3.15, z0 + span * .08], [xf + .05, 3.15, z0 + span * .92], [xf + .05, 3.95, z0 + span * .92], [xf + .05, 3.95, z0 + span * .08]]), signCol, { lw: 5, sw: 6 }));
  // sign letters as an affine-mapped canvas text (close signs only)
  if (zm < 30) {
    const a = pt(.12, 3.78), b = pt(.88, 3.78), c = pt(.12, 3.3);
    g.save(); g.setTransform((b[0] - a[0]) / 100, (b[1] - a[1]) / 100, (c[0] - a[0]) / 20, (c[1] - a[1]) / 20, a[0], a[1]);
    g.fillStyle = '#e9dcb8'; g.font = '600 15px "Oswald"'; g.textBaseline = 'top'; g.fillText(['GROCER & SONS', 'NORTH END SALOON', 'HARDWARE CO.', 'TAILOR', 'COFFEE ROASTERS'][seed % 5], 2, 1); g.restore();
  }
  // upper floors: windows with stone lintels and sills
  const floors = Math.floor((h - 5) / 3.1), cols = Math.max(2, Math.round(span / 2.6));
  for (let f = 0; f < floors; f++) for (let c = 0; c < cols; c++) {
    const za = z0 + span * (c + .25) / cols, zb = z0 + span * (c + .75) / cols, y0 = 5.0 + f * 3.1, y1 = y0 + 1.8;
    if (F * (zb - za) / zb < 5) continue;
    at(za, () => {
      form(poly([[xf, y0, za], [xf, y0, zb], [xf, y1, zb], [xf, y1, za]]), fog(hash(seed * 7 + f * 3 + c) > .93 ? '#e8c27a' : '#2b333b', za), { lw: 4.5, sw: 0, flat: true, shade: () => { const m = P(xf, (y0 + y1) / 2, (za + zb) / 2); line(P(xf, y0, (za + zb) / 2), P(xf, y1, (za + zb) / 2), fog('#d8cdb6', za), 3 * lwAt(za)); line(P(xf, (y0 + y1) / 2, za), P(xf, (y0 + y1) / 2, zb), fog('#d8cdb6', za), 3 * lwAt(za)); } });
      form(poly([[xf, y1 + .05, za - .15], [xf, y1 + .05, zb + .15], [xf, y1 + .35, zb + .15], [xf, y1 + .35, za - .15]]), fog('#cfc3aa', za), { lw: 3.5, sw: 3 });
      form(poly([[xf, y0 - .25, za - .1], [xf, y0 - .25, zb + .1], [xf, y0 - .05, zb + .1], [xf, y0 - .05, za - .1]]), fog('#cfc3aa', za), { lw: 3.5, sw: 3 });
    });
  }
  // cornice and roof edge
  at(zm, () => form(poly([[xf, h - .7, z0], [xf, h - .7, z1], [xf + .5, h, z1], [xf + .5, h, z0]]), fog('#c9bba0', zm), { lw: 5, sw: 6 }));
  if (seed % 2) at(zm, () => form(poly([[xf - 1.5, h, z0 + span * .3], [xf - 1.5, h, z0 + span * .3 + .9], [xf - 1.5, h + 2, z0 + span * .3 + .9], [xf - 1.5, h + 2, z0 + span * .3]]), fog('#6a4a3e', zm), { lw: 4 }));
}
// ———————————————— the elevated railway on the right
function el(zFrom = 1.2, zTo = 200, behindZ = 1e9, front = false) {
  const keep = z => front ? z < behindZ : z >= behindZ;
  const steel = z => fog('#3f434a', z), dark = z => fog('#2a2d33', z);
  if (!front) {
    // deck underside with floor beams
    fillPoly(poly([[2.0, 6.4, zFrom], [7.8, 6.4, zFrom], [7.8, 6.4, zTo], [2.0, 6.4, zTo]]), fog('#33363c', 30));
    for (let z = zFrom; z < 80; z += 1.4) line(P(2, 6.4, z), P(7.8, 6.4, z), '#22252a', clamp(F * .12 / z, .5, 14), .9);
    // street-side girder face with lattice and rivets
    const G = poly([[2.0, 5.5, zFrom], [2.0, 5.5, zTo], [2.0, 6.9, zTo], [2.0, 6.9, zFrom]]);
    form(G, '#4a4e56', { lw: 7, sw: 0, flat: true });
    for (let z = zFrom; z < 90; z += 1.1) { line(P(2, 5.6, z), P(2, 6.8, z + 1.1), '#2c2f35', clamp(F * .05 / z, .5, 7)); line(P(2, 6.8, z), P(2, 5.6, z + 1.1), '#2c2f35', clamp(F * .05 / z, .5, 7)); }
    for (let z = zFrom; z < 40; z += .5) { const p = P(2, 6.75, z), q = P(2, 5.65, z), r = clamp(F * .03 / z, .6, 6); dot(...p, r, '#6a6e76'); dot(...q, r, '#6a6e76'); }
  }
  // columns with X bracing every 9 m
  for (let z = 4; z < 120; z += 9) {
    if (!keep(z)) continue;
    at(z, () => {
      for (const x of [7.2, 2.3]) form(poly([[x - .22, 0, z], [x + .22, 0, z], [x + .22, 5.5, z], [x - .22, 5.5, z]]), x < 3 ? steel(z) : dark(z), { lw: 6, sw: 8, shade: () => { for (let y = .4; y < 5.4; y += .45) { const p = P(x, y, z); dot(p[0] - F * .14 / z, p[1], clamp(F * .025 / z, .5, 5), '#22252a'); } } });
      stroke([P(2.3, .6, z), P(7.2, 4.8, z)], 5 * lwAt(z), { line: dark(z) }); stroke([P(7.2, .6, z), P(2.3, 4.8, z)], 5 * lwAt(z), { line: dark(z) });
      form(poly([[2.0, 5.0, z - .3], [7.5, 5.0, z - .3], [7.5, 5.5, z - .3], [2.0, 5.5, z - .3]]), steel(z), { lw: 5, sw: 4 });
    });
  }
}
// ———————————————— street: cobbles in perspective, curbs, sidewalks
function street(zNear = 1.1, wetAmber = 0) {
  fillPoly(poly([[-7, 0, zNear], [7, 0, zNear], [7, 0, 300], [-7, 0, 300]]), '#3f3d3b');
  g.setTransform(1, 0, 0, 1, 0, 0);
  for (let z = zNear; z < 60; z += .26) {
    const yy = P(0, 0, z)[1], ry = clamp(F * CAMH * .11 / (z * z) * .9, .4, 30), rx = F * .12 / z;
    if (ry < .7) { line(P(-7, 0, z), P(7, 0, z), '#5d5b58', .7, .6); continue; }
    const off = (Math.round(z / .26) % 2) * .13;
    for (let x = -7 + off; x < 7; x += .26) {
      const [px] = P(x, 0, z), k = hash(x * 13.1 + z * 7.7);
      const sw = rx * (1.55 + .25 * hash(k * 9)), sh = ry * 1.7;
      g.fillStyle = mix('#77746f', '#57554f', k); g.beginPath(); g.roundRect(px - sw / 2, yy - sh / 2, sw, sh, Math.min(sw, sh) * .42); g.fill();
      g.fillStyle = 'rgba(255,255,255,.07)'; g.beginPath(); g.roundRect(px - sw / 2 + sw * .1, yy - sh / 2 + sh * .08, sw * .8, sh * .35, Math.min(sw, sh) * .3); g.fill();
      if (k > .9) { g.fillStyle = '#a9a69f'; g.beginPath(); g.ellipse(px - rx * .25, yy - ry * .35, rx * .3, ry * .25, 0, 0, Math.PI * 2); g.fill(); }   // wet glint
      if (wetAmber && z < 9 && k > .55) { g.fillStyle = `rgba(255,170,60,${wetAmber * (1 - z / 9) * .55})`; g.beginPath(); g.ellipse(px, yy - ry * .3, rx * .45, ry * .3, 0, 0, Math.PI * 2); g.fill(); }
    }
  }
  for (const s of [-1, 1]) {
    fillPoly(poly([[s * 7, .16, zNear], [s * 9.2, .16, zNear], [s * 9.2, .16, 300], [s * 7, .16, 300]]), s < 0 ? '#9a958c' : '#6f6c66');
    line(P(s * 7, .16, zNear), P(s * 7, .16, 300), '#2a2826', 4); line(P(s * 7, 0, zNear), P(s * 7, 0, 300), '#3a3836', 2);
  }
}
function lamp(x, z) { at(z, () => { stroke([P(x, 0, z), P(x, 4.2, z)], 7 * lwAt(z), { line: fog('#25272b', z) }); form(rr(P(x, 4.5, z)[0] - F * .22 / z, P(x, 4.9, z)[1], F * .44 / z, F * .6 / z, F * .08 / z), fog('#2b2d31', z), { lw: 5, sw: 4, shade: () => fillOnly(rr(P(x, 4.5, z)[0] - F * .14 / z, P(x, 4.82, z)[1], F * .28 / z, F * .38 / z, 2), fog('#e8d9a8', z), { boil: .2 }) }); }); }
function telegraph(x, zs) {
  const tops = zs.map(z => [P(x, 9, z), P(x - 1, 8.6, z), P(x + 1, 8.6, z)]);
  zs.forEach((z, i) => at(z, () => { stroke([P(x, 0, z), P(x, 9.2, z)], 9 * lwAt(z), { line: fog('#3c2f26', z) }); stroke([P(x - 1.2, 8.6, z), P(x + 1.2, 8.6, z)], 6 * lwAt(z), { line: fog('#3c2f26', z) }); }));
  for (let w = 0; w < 3; w++) for (let i = 0; i < zs.length - 1; i++) { const a = tops[i][w], b = tops[i + 1][w], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 12]; stroke(spline([a, m, b], false, 8), 2, { line: '#2a2522', boil: .2 }); }
}
// people at world positions
function who(C, x, z, extra) { const [px, py] = P(x, 0, z), s = F * 1.75 / (z * 660); at(z, () => person({ ...C, x: px, y: py, s, ...extra })); }
const CAST = {
  worker: { body: 'man', skin: SKIN.light, age: 1, hair: 'short', hairCol: '#3b2c24', hat: 'flatcap', hatCol: '#55575c', top: { type: 'coat', col: '#6b7078', cuff: '#555a61' }, bottom: { type: 'trousers', col: '#4a4b52' }, shoes: { col: '#3a2b22' }, acc: { scarf: '#55585f', moustache: true } },
  lady: { body: 'woman', skin: SKIN.fair, hair: 'bun', hairCol: '#4a3326', hat: 'boater', hatCol: '#5d4a55', hatCol2: '#8a3a3a', top: { type: 'coat', col: '#4f5a6a' }, bottom: { type: 'skirt', col: '#3d3a44', legCol: '#2b2830' }, shoes: { col: '#2a2526' } },
  kid: { body: 'child', skin: SKIN.light, hair: 'tuft', hairCol: '#7a4a2a', hat: 'flatcap', hatCol: '#6e665e', top: { type: 'jacket', col: '#7a6f62' }, bottom: { type: 'knickers', col: '#4a4a52', sock: '#cfc8bb' }, shoes: { col: '#2b2626' } },
  gent: { body: 'man', skin: SKIN.fair, hair: 'short', hairCol: '#222', hat: 'bowler', hatCol: '#26262b', top: { type: 'coat', col: '#2f3036' }, bottom: { type: 'trousers', col: '#2a2a30' }, acc: { moustache: true } },
  docker: { body: 'man', skin: SKIN.tan, hair: 'short', hairCol: '#1f1a18', hat: 'flatcap', hatCol: '#3a3632', top: { type: 'vest', col: '#4a3e34', col2: '#cfc6b4', sleeve: 'rolled' }, bottom: { type: 'trousers', col: '#3a3a40' }, acc: { braces: '#2a2a2a' } },
};

// ———————————————— the street set (shared by P1 and P8)
function boston({ waveZ = null } = {}) {
  sky();
  tank(-4, 72, 14, 15, waveZ ? 1 : .35);
  // right side buildings behind the el (in its shadow)
  for (let i = 0, z = 6; i < 12; i++) { const w = 9 + hash(i * 5) * 5, h = 10 + hash(i * 9) * 6; const Q = poly([[9.4, 0, z], [9.4, 0, z + w], [9.4, h, z + w], [9.4, h, z]]); at(z, () => form(Q, fog(shade(PAL[(i + 2) % 5], -.35), z + w / 2), { lw: 5, sw: 10 })); z += w; }
  el(1.2, 220);
  // left side buildings, far to near (painter's order)
  const L = []; for (let i = 0, z = 1.5; i < 13; i++) { const w = 8 + hash(i * 3.3) * 6, h = 11 + hash(i * 7.1) * 7; L.push([z, z + w, h, i]); z += w; }
  for (const [z0, z1, h, i] of L.reverse()) facade(-9.2, z0, z1, h, i, 1);
  telegraph(-7.6, [4, 16, 28, 40, 52, 64, 76]);
  for (const z of [7, 19, 31, 43]) lamp(-7.3, z);
}

// ———————————————— P8: 15 January 1919, 12:30, a calm mild noon
function P8() {
  F = 980; HY = 1060; CAMH = 1.3; HAZE = '#d9dcdc';
  setLight({ dir: [.55, -.8], tint: '#2a2c3a', a: .26 });
  boston();
  street(1.1);
  fillPoly(poly([[1.2, .01, 1.2], [7, .01, 1.2], [7, .01, 300], [2.6, .01, 300]]), '#141820', .32);   // the el's shadow
  el(1.2, 220, 0, true);
  // people going about their day
  who(CAST.gent, -5.6, 21, { pose: walk(.2), expr: 'neutral', face: 1 });
  who(CAST.lady, -5.0, 11, { pose: walk(.55), expr: 'calm', face: 1 });
  who(CAST.kid, -4.2, 10.6, { pose: walk(.1), expr: 'calm', face: 1 });
  who(CAST.docker, 3.4, 8, { pose: walk(.7), expr: 'neutral', face: -1 });
  who(CAST.worker, -1.6, 3.1, { pose: walk(.35), expr: 'neutral', face: 1, look: [.5, -.35] });
  // a delivery wagon with molasses barrels in the street (foreshadowing)
  const wz = 15, [wx, wy] = P(1.2, 0, wz), s = F / wz / 100;
  at(wz, () => { push(); translate(wx, wy); scale(s);
    form(rect(-110, -150, 220, 70), '#6a4a34', { lw: 6 }); for (const bx of [-70, 0, 70]) form(spline([[bx - 30, -150], [bx + 30, -150], [bx + 34, -190], [bx + 30, -232], [bx - 30, -232], [bx - 34, -190]]), '#7a5a3e', { lw: 5, shade: () => fillOnly(rect(bx - 40, -212, 80, 8), '#3a3a3a', { boil: .2 }) });
    for (const bx of [-80, 80]) form(ell(bx, -60, 58, 58, 24), '#4a3a2c', { lw: 6, shade: () => dot(bx, -60, 8) }); pop(); });
  glow(...P(-4, 3, 72), 70, 40, AMBER, .07, 1);
  grain(.06); vignette(.28);
  stamp('BOSTON', '15 JAN 1919', '12:30', AMBER, { x: 60, y: 210 });
  wordCaption('15 Januari 1919.', AMBER, { y: 1340 });
}

// ———————————————— P1: cold open, the wall of molasses
function P1() {
  F = 1000; HY = 1180; CAMH = .75; HAZE = '#cfd2d2';
  setLight({ dir: [0, -1], tint: '#24232c', a: .3, rim: AMBER, rimA: .95, rw: 8 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.save(); g.translate(W / 2, H / 2); g.rotate(-.05); g.translate(-W / 2, -H / 2);
  const ZF = 11.5;
  boston({ waveZ: ZF });
  street(1.1, 1);
  // the wave: base on the street at ZF, crest leaning back, lip curling toward camera
  const xs = []; for (let i = 0; i <= 40; i++) xs.push(-13 + 26 * i / 40);
  const Hx = x => 9.6 + 1.4 * Math.sin(x * .45 + .6) + .6 * Math.sin(x * 1.3);
  const base = xs.map(x => P(x, 0, ZF + .4 * Math.sin(x * .7))), crest = xs.map(x => P(x, Hx(x), ZF + 2.2)).reverse();
  glow(620, 520, 620, 520, AMBER, .08, 3);
  // the hero wave: an illustrated curl sweeping from back-left to front-right, the tube by the el
  const CREST = [[-120, 980], [60, 860], [240, 700], [420, 520], [600, 330], [760, 230], [900, 250], [1010, 360], [1040, 500], [990, 600]];
  const TUBE = [[990, 600], [930, 640], [860, 610], [830, 540], [870, 480], [920, 500]];
  const FACE = [[920, 500], [860, 470], [790, 520], [740, 640], [720, 820], [760, 1000], [860, 1150], [1200, 1180]];
  const BODY = spline([...CREST, ...TUBE.slice(1), ...FACE.slice(1), [1200, 1300], [-120, 1300]], true, 10);
  shape(BODY, { fill: '#4a2208', lw: 10, shade: () => {
    // flow streaks running along the curl (offset copies of the crest), amber and cream
    for (let k = 1; k < 9; k++) { const d = k * 46, pts = CREST.slice(0, 8).map(([x, y], i) => [x + d * .55 + i * k * 2, y + d]); stroke(spline(pts, false, 10), 10 - k * .6, { line: k % 3 === 0 ? '#e8952e' : '#8a4512', boil: .3 }); }
    for (let k = 0; k < 7; k++) { const x0 = 120 + k * 120, y0 = 860 - k * 70; stroke(spline([[x0, y0], [x0 + 60, y0 + 140], [x0 + 70, y0 + 330]], false, 8), 6, { line: '#ffd08a', boil: .3 }); }
    fillOnly(spline([[760, 560], [830, 520], [880, 600], [820, 700], [760, 900], [700, 760]]), '#2a1104', { boil: .3 });   // the tube's shadow
  } });
  // bright lip along the crest
  const LIP = [...CREST.slice(2), [960, 560], [900, 470], [800, 370], [660, 400], [500, 560], [330, 720], [200, 820]];
  shape(spline(LIP, true, 10), { fill: '#b8641a', lw: 8, shade: () => { stroke(spline(CREST.slice(3, 9).map(([x, y]) => [x - 10, y + 22]), false, 10), 9, { line: '#ffd08a' }); stroke(spline([[560, 420], [700, 320], [830, 300]], false, 8), 5, { line: '#fff3d6' }); } });
  // drips from the lip and the tube's edge
  for (const [x, y, L, w] of [[1000, 560, 190, 15], [960, 610, 120, 11], [900, 640, 240, 14], [850, 600, 90, 9], [560, 560, 70, 8], [430, 690, 110, 10]])
    shape(spline([[x - w, y], [x + w, y], [x + w * .45, y + L * .7], [x, y + L], [x - w * .45, y + L * .7]]), { fill: '#a8571a', lw: 5, shade: () => fillOnly(ell(x - w * .3, y + L * .55, w * .25, L * .18, 10), '#ffd08a', { boil: .2 }) });
  // splash crown on top of the crest
  for (let k = 0; k < 9; k++) { const t = k / 8, x = lerp(420, 900, t), y = lerp(500, 220, Math.sin(t * Math.PI * .8)) - 30 - hash(k) * 60, r = 12 + hash(k * 4) * 22;
    shape(spline([[x, y - r * 2], [x + r, y], [x, y + r], [x - r, y]]), { fill: '#8a4512', lw: 5, shade: () => dot(x - r * .3, y - r * .3, r * .28, '#ffd08a') }); }
  // spray above the crest
  for (let k = 0; k < 26; k++) { const x = -12 + hash(k * 3.1) * 24, y = Hx(x) + 1 + hash(k * 1.7) * 3.5, p = P(x, y, ZF + 1 - hash(k) * 3), r = 6 + hash(k * 9) * 16;
    shape(spline([[p[0], p[1] - r * 1.6], [p[0] + r, p[1]], [p[0], p[1] + r], [p[0] - r, p[1]]]), { fill: '#a8571a', lw: 4, shade: () => dot(p[0] - r * .3, p[1] - r * .2, r * .25, '#ffd08a') }); }
  // front of the flood sliding over the cobbles
  const fz = ZF - 2.2;
  shape([...xs.map(x => P(x, 0, fz - .8 * Math.sin(x * 1.1) - .5)), ...xs.map(x => P(x, 0, ZF)).reverse()], { fill: '#6a3410', lw: 6, shade: () => { for (let k = 0; k < 10; k++) { const x = -10 + k * 2.2; stroke([P(x, 0, fz + .4), P(x + 1.2, 0, fz + .2)], 4, { line: '#e8952e' }); } } });
  el(1.2, 220, ZF, true);
  // debris thrown ahead of the wave: barrels, planks, a wagon wheel
  const deb = (x, y, z, fn) => { const [px, py] = P(x, y, z), s = F / z / 100; at(z, () => { push(); translate(px, py); scale(s); fn(); pop(); }); };
  deb(-3.5, 9.5, 13, () => { rotate(.7); form(spline([[-38, -56], [38, -56], [48, 0], [38, 56], [-38, 56], [-48, 0]]), '#7a5a3e', { lw: 6, shade: () => { fillOnly(rect(-60, -40, 120, 12), '#3a3a3a', { boil: .2 }); fillOnly(rect(-60, 28, 120, 12), '#3a3a3a', { boil: .2 }); } }); });
  deb(4.5, 8.2, 12, () => { rotate(-.9); form(rect(-110, -14, 220, 28), '#6f5a44', { lw: 6 }); });
  deb(-6.5, 6.8, 11, () => { rotate(.3); form(ell(0, 0, 60, 60, 30), '#4a3a2c', { lw: 6, shade: () => { fillOnly(ell(0, 0, 44, 44, 24), '#8a7a66', { boil: .2 }); for (let a = 0; a < 8; a++) stroke([[0, 0], [Math.cos(a * .785) * 44, Math.sin(a * .785) * 44]], 4); } }); });
  // people fleeing, the worker sprinting at the camera
  who(CAST.lady, 3.2, 9.5, { view: 'front', pose: runFront(.3), expr: 'scream' });
  who(CAST.gent, -4.4, 11.5, { view: 'front', pose: runFront(.7), expr: 'fear' });
  who(CAST.kid, -2.3, 8.2, { view: 'front', pose: runFront(.1), expr: 'scream' });
  who(CAST.worker, .2, 2.4, { view: 'front', pose: runFront(.6), expr: 'scream', look: [0, .15], age: 1 });
  g.restore();
  wash('#ff9a1f', .04); grain(.06); vignette(.34);
  if (!P1.noCap) wordCaption('Banjir ini <bukan>', AMBER, { y: 1330 });
}

// ———————————————— P3: ARSIP KASUS slammed on the desk
let photo = null;
function P3() {
  // the photo inside the file: P1 rendered small, in sepia
  if (!photo) { photo = document.createElement('canvas'); photo.width = 1080; photo.height = 1920; const main = g.canvas; init(photo); frame(0); P1.noCap = true; P1(); P1.noCap = false; init(main); frame(1); }
  setLight({ dir: [-.4, -.9], tint: '#1a1410', a: .32 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#2a1d16'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const y = i * 80; fillOnly(rect(-20, y, W + 40, 76), mix('#3a281c', '#2c1e15', hash(i)), { boil: .1 }); for (let k = 0; k < 5; k++) stroke(spline([[-20, y + 15 + k * 12], [300, y + 10 + k * 13 + 6 * Math.sin(i + k)], [700, y + 18 + k * 12], [1100, y + 12 + k * 12]], false, 10), 1.5, { line: '#24180f', boil: .1 }); }
  // papers underneath
  for (const [x, y, a, c] of [[90, 330, -.22, '#d9d1bf'], [560, 1240, .16, '#e2dccb'], [150, 1350, .05, '#cfc6b0']]) { push(); translate(x, y); rotate(a); form(rect(0, 0, 520, 680), c, { lw: 5, sw: 14, shade: () => { for (let k = 0; k < 18; k++) fillOnly(rect(40, 60 + k * 30, 300 + hash(k + x) * 140, 7), '#8a8378', { boil: .1, alpha: .6 }); } }); pop(); }
  // the folder
  push(); translate(540, 990); rotate(-.06);
  form([[-430, -560], [-150, -560], [-120, -615], [150, -615], [180, -560], [430, -560], [430, 600], [-430, 600]], '#c9a86a', { lw: 8, sw: 30, shade: () => { for (let k = 0; k < 40; k++) dot(-420 + hash(k) * 840, -540 + hash(k * 3) * 1120, 2 + hash(k * 5) * 3, '#b8955a'); } });
  form(rect(-410, -530, 820, 1110), '#d8bb7e', { lw: 6, sw: 18 });
  g.setTransform(1, 0, 0, 1, 0, 0);
  // tab text
  push(); g.save();
  const T = (s, x, y, font, col, rot = 0) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(540, 990); g.rotate(-.06 + rot); g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); g.restore(); };
  T('ARSIP KASUS', 15, -580, '700 36px "Courier Prime"', '#3a2a18');
  T('BANJIR MOLASE', 0, -440, '600 84px "Oswald"', '#2a1e14');
  T('BOSTON · 15 JANUARI 1919', 0, -370, '700 34px "Courier Prime"', '#3a2a18');
  g.restore(); pop();
  // the photo, paper-clipped
  push(); rotate(.05);
  form(rect(-300, -300, 600, 760), '#efe9da', { lw: 6, sw: 16 });
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(540, 990); g.rotate(-.01); g.filter = 'sepia(.85) contrast(1.15) brightness(.95)';
  g.drawImage(photo, 0, 160, 1080, 1520, -270, -270, 540, 760 - 60); g.filter = 'none'; g.restore();
  pop();
  stroke(spline([[-190, -330], [-190, -250], [-160, -230], [-130, -250], [-130, -350], [-160, -370], [-180, -350], [-180, -270]], false, 8), 9, { line: '#8a8f96' });
  pop();
  // red stamp, slammed at an angle
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(760, 1500); g.rotate(-.2); g.globalAlpha = .88;
  g.strokeStyle = '#b3261e'; g.lineWidth = 12; g.strokeRect(-230, -80, 460, 160); g.lineWidth = 4; g.strokeRect(-212, -62, 424, 124);
  g.fillStyle = '#b3261e'; g.font = '600 96px "Oswald"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('KASUS #001', 0, 6);
  g.globalCompositeOperation = 'destination-out'; for (let k = 0; k < 160; k++) { g.beginPath(); g.arc(-230 + hash(k) * 460, -80 + hash(k * 7) * 160, 1 + hash(k * 3) * 4, 0, 6.3); g.fill(); }
  g.restore(); g.globalCompositeOperation = 'source-over';
  // lamp light pool + dust thrown up by the slam
  g.setTransform(1, 0, 0, 1, 0, 0); const r = g.createRadialGradient(540, 900, 200, 540, 900, 1250); r.addColorStop(0, 'rgba(255,220,160,0.10)'); r.addColorStop(1, 'rgba(0,0,0,0.55)'); g.fillStyle = r; g.fillRect(0, 0, W, H);
  for (let k = 0; k < 40; k++) { const a = hash(k) * 6.28, d = 520 + hash(k * 3) * 300; dot(540 + Math.cos(a) * d * .85, 990 + Math.sin(a) * d, 2 + hash(k * 9) * 4, '#e8dcc0'); }
  grain(.07);
  wordCaption('Ia keluar dari', AMBER, { y: 1690 });
}

const cv = document.getElementById('c'); init(cv);
window.DUR = 3;
window.render = t => { frame(t); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); [P1, P3, P8][Math.min(2, Math.floor(t))](); };
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"')]).then(() => { window.READY = true; });
