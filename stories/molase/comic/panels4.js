// Full film panels, batch C (the warning signs, the causes, the cost, the question): P20–P36.
import { clamp, lerp, hash } from '/core/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, spline, rr, rect, noodle, dot } from '/engine/toon.js';
import { person, setLight, form, SKIN, EXPR } from '/engine/cast.js';
import { keys, ease, blink, walk } from '/engine/motion.js';
import { paint, grade2, grain, vignette, dof, shafts } from '/engine/look.js';
import { MOL, drop, hangingDrop } from '/engine/fx.js';
import { glow } from '/engine/brand.js';
import { U, setCam, scenePaint, P, CAST, boston, street, el, mix, shade, AMBER } from './panels.js';
import { desk, paper, rubber, arrow, bigText, finishCard, lamp, ss, pop1 } from './panels2.js';

const finish = (cool = .14, v = .36) => { paint(.38); grade2('#2a3550', '#ffcf8a', cool); grain(.05); vignette(v); };
const sepia = (a = .45) => { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'color'; g.fillStyle = `rgba(120,80,40,${a})`; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over'; };
const label = (str, x, y, size = 40, col = '#2a1e14', rot = 0) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot); g.font = `600 ${size}px "Oswald"`; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, 0, 0); g.restore(); };
// a riveted steel wall filling the frame (the tank, close)
function wall(col = '#5d5b55', seamX = 540, wet = 0) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = col; g.fillRect(0, 0, W, H);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) form(rect(-40 + c * 400 + (r % 2) * 200, -40 + r * 500, 400, 500), mix(mix(col, '#4c4a45', hash(r * 3 + c) * .5), '#000', 0), { lw: 6, sw: 18 });
  for (const y of [460, 960, 1460]) for (let k = 0; k < 13; k++) { const x = 30 + k * 82; form(ell(x, y, 15, 15, 14), '#6e6b63', { lw: 4, sw: 4, shade: () => dot(x - 5, y - 5, 4, '#9a978e') }); }
  for (let k = 0; k < 22; k++) { const y = 40 + k * 86; form(ell(seamX, y, 14, 14, 12), '#6e6b63', { lw: 4, sw: 4 }); }
  if (wet > 0) for (let k = 0; k < 6; k++) { const y0 = 200 + k * 290, l = (120 + hash(k) * 260) * wet; fillOnly(spline([[seamX - 8, y0], [seamX + 10, y0], [seamX + 14, y0 + l], [seamX + 2, y0 + l + 20], [seamX - 10, y0 + l]]), '#4a2a10', { boil: .3, alpha: .85 }); }
}

// ———————————————— P20 (27.25–29.0) "Tapi tanda bahayanya": the file's pages flip backward to 1915
export function P20() {
  setLight({ dir: [-.4, -.9], tint: '#1a1410', a: .32 }); desk();
  paper(540, 980, 820, 1180, -.03, '#d8bb7e', 0);
  push(); translate(540, 980); rotate(-.03); form(rect(-390, -560, 780, 1120), '#efe9da', { lw: 6, sw: 14 }); pop();
  label('1915', 540, 560, 150, '#2a1e14', -.03);
  // a sketch of the new tank on the 1915 page
  push(); translate(540, 1000); rotate(-.03); form(rect(-220, -200, 440, 380), '#d6cdb8', { lw: 5, sw: 8, shade: () => { for (let k = 1; k < 5; k++) stroke([[-220, -200 + k * 76], [220, -200 + k * 76]], 3, { line: '#8a8378' }); } }); form(ell(0, -200, 220, 34, 30), '#e2dac6', { lw: 5 }); pop();
  label('TANGKI BARU · KAPASITAS 2,3 JUTA GALON', 540, 1300, 38, '#3a2a18', -.03);
  // pages turning over the spine on the left (right → left), two in a row
  for (const [t0, c] of [[.1, '#e6dfcc'], [.55, '#efe9da']]) { const k = clamp((U - t0) / .42); if (k <= 0 || k >= 1) continue;
    const sx = Math.cos(k * Math.PI); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(150, 980); g.rotate(-.03); g.scale(sx, 1 - .04 * Math.sin(k * Math.PI)); g.fillStyle = c; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(0, -560, 780, 1120); g.strokeRect(0, -560, 780, 1120);
    g.fillStyle = 'rgba(0,0,0,' + (.25 * Math.sin(k * Math.PI)) + ')'; g.fillRect(0, -560, 780, 1120); g.restore(); }
  lamp(540, 900, .5); finishCard();
}

// ———————————————— P21 (29.0–31.0) "…sudah muncul jauh sebelumnya.": 1915 — the new tank already leaks; workers paint it brown to hide the streaks
export function P21() {
  setLight({ dir: [.5, -.8], tint: '#2a2c3a', a: .26 });
  wall('#66645d', 700, 1);
  const pa = ss(U / 1.8);   // the brown paint creeping across the wall, over the leak streaks
  fillOnly(rect(0, 0, 220 + pa * 620, 1500), '#5a3a22', { boil: .3, alpha: .92 });
  for (let k = 0; k < 9; k++) stroke([[200 + pa * 620 + 10 * Math.sin(k), k * 170], [220 + pa * 620, k * 170 + 160]], 14, { line: '#5a3a22', boil: .4 });
  // scaffold plank and a worker on it with a long brush (stroke cycle with follow-through)
  form(rect(-20, 1180, 1120, 40), '#7a5b3e', { lw: 6 }); for (const x of [120, 900]) form(rect(x, 1220, 30, 700), '#6a4e36', { lw: 5 });
  const st = Math.sin(U * 5.5), bx = 380 + pa * 420;
  person({ ...CAST.docker, x: bx, y: 1180, s: 1.05, face: -1, pose: { lean: .05, armF: { h: [150, lerp(-140, -40, (st + 1) / 2)], bend: -20, fist: 1 }, armB: { h: [120, lerp(-110, -20, (st + 1) / 2)], bend: -30, fist: 1 } }, expr: 'neutral', look: [.7, -.3], prop: (hp, a) => { stroke([[hp[0], hp[1]], [hp[0] + 80, hp[1] - 160 + 30 * st]], 10, { line: '#6a4e36' }); form(rr(hp[0] + 62, hp[1] - 200 + 30 * st, 50, 50, 8), '#3a2a1a', { lw: 4 }); } });
  // the foreman on the ground glances over his shoulder (nobody should see this)
  const gl = keys(U, [[0, [.6, 0]], [.8, [.6, 0]], [1.0, [-.9, .1], ease.out], [1.6, [-.9, .1]], [1.8, [.6, 0]]]);
  person({ ...CAST.gent, x: 860, y: 1900, s: 1.25, face: -1, pose: { armF: { h: [10, 170], bend: 10 }, armB: { h: [-10, 170], bend: -10 } }, expr: { ...EXPR.neutral, brow: -.2, inner: -.5, lid: .4 }, look: gl, headTilt: .05 });
  label('1915', 900, 160, 90, '#f4efe6');
  sepia(.5); finish(.1, .42);
}

// ———————————————— P22 (31.0–33.5) "Tangki itu sudah bocor sejak awal.": the seam, wet; beads gathering
export function P22() {
  setLight({ dir: [.5, -.8], tint: '#22242c', a: .3 });
  wall('#5d5b55', 540, .6 + U * .15);
  for (let k = 0; k < 4; k++) hangingDrop(548, 300 + k * 430, clamp((U * .6 + k * .23) % 1), 14);
  finish(.12, .45);
}

// ———————————————— P23 (33.5–35.5) "Molase merembes dari sambungannya,": macro — one amber drop swells at the seam, lets go, falls
export function P23() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#3e3d39'; g.fillRect(0, 0, W, H);
  form(rect(-40, -40, 600, 1000), '#55534d', { lw: 8, sw: 30 }); form(rect(520, -40, 600, 1000), '#4e4c47', { lw: 8, sw: 30 });   // two plates meeting at the seam
  for (const x of [470, 610]) for (let k = 0; k < 4; k++) form(ell(x, 140 + k * 220, 34, 34, 20), '#6e6b63', { lw: 6, sw: 8, shade: () => dot(x - 10, 130 + k * 220, 8, '#9a978e') });
  fillOnly(spline([[528, 0], [552, 0], [560, 950], [520, 950]]), '#2a1608', { boil: .3 });   // the wet seam
  glow(540, 940, 120, 80, AMBER, .08, 3);
  const k = clamp(U / 1.3); hangingDrop(540, 950, k, 46);
  if (U > 1.3) { const t = U - 1.3; drop(540, 1060 + 1400 * t * t, 46, 1.3 + t * 2); }
  if (U > 1.7) { g.setTransform(1, 0, 0, 1, 0, 0); }
  paint(.3); grain(.05); vignette(.5);
}

// ———————————————— P24 (35.5–36.7) "—bahkan anak-anak di sekitar": at the foot of the tank, kids with cups and a pail
function kids(close = false) {
  const kid2 = { ...CAST.kid, hairCol: '#2a1e18', hatCol: '#4a4e5a', top: { type: 'jacket', col: '#5a6470' } };
  const kid3 = { ...CAST.kid, body: 'child', hair: 'bun', hairCol: '#6a3a22', hat: 'none', top: { type: 'coat', col: '#7a4a4a' }, bottom: { type: 'skirt', col: '#4a3a44', legCol: '#d8d0c0' } };
  const hop = Math.abs(Math.sin(U * 6)) * 14;
  person({ ...CAST.kid, x: 220, y: 1560 - hop, s: 1.3, face: 1, pose: { armF: { h: [60, -120], bend: -40, hand: 'open' }, armB: { h: [-20, 160], bend: -10 } }, expr: 'delight', look: [.4, -.7] });
  person({ ...kid2, x: 560, y: 1640, s: 1.35, face: 1, pose: { armF: { h: [70, -60], bend: -60, fist: 1 }, armB: { h: [40, -40], bend: -50, fist: 1 } }, expr: 'curious', look: [.3, -.8], prop: (hp) => { form(rr(hp[0] - 30, hp[1] - 70, 60, 64, 8), '#9aa0a6', { lw: 5, shade: () => fillOnly(rect(hp[0] - 26, hp[1] - 64, 52, 16), '#a8571a', { boil: .2 }) }); } });
  person({ ...kid3, x: 880, y: 1600, s: 1.28, face: -1, pose: { armF: { h: [40, 100], bend: 30, hand: 'open' }, armB: { h: [-20, 160], bend: -10 } }, expr: 'calm', look: [.5, -.4], prop: (hp) => { form(spline([[hp[0] - 40, hp[1]], [hp[0] + 40, hp[1]], [hp[0] + 34, hp[1] + 70], [hp[0] - 34, hp[1] + 70]]), '#7a6a5a', { lw: 5 }); } });
}
export function P24() {
  setLight({ dir: [.5, -.8], tint: '#2a2c3a', a: .26 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#aebfcd'; g.fillRect(0, 0, W, H);
  push(); form(spline([[-200, 1400], [-200, 120], [540, 40], [1280, 120], [1280, 1400]], true, 6), '#5d5b55', { lw: 7, sw: 30, shade: () => { for (let k = 1; k < 5; k++) stroke(spline([[-200, 120 + k * 260], [540, 40 + k * 262], [1280, 120 + k * 260]], false, 8), 6, { line: '#4c4a45' }); for (let k = 0; k < 7; k++) { const x = 60 + k * 160; fillOnly(rect(x, 300 + hash(k) * 300, 8, 500 + hash(k * 3) * 400), '#7a4a1a', { boil: .3, alpha: .8 }); } } }); pop();   // the tank's curve, from its foot
  fillOnly(rect(0, 1380, W, 560), '#6a6660', { boil: .1 });
  for (let k = 0; k < 4; k++) hangingDrop(220 + k * 200, 1240 + hash(k) * 40, clamp((U * .9 + k * .3) % 1), 12);
  kids();
  finish(.12, .32);
}

// ———————————————— P25 (36.7–38.3) "mengumpulkan tetesannya.": close — a kid holds up a tin cup; the drop lands; delight
export function P25() {
  setLight({ dir: [.5, -.8], tint: '#2a2c3a', a: .26 });
  wall('#5d5b55', 540, .8);
  const s = 2.2, k = clamp((U - .6) / .1), cx = 730, cy = 1000;
  const expr = keys(U, [[0, { ...EXPR.curious }], [.55, { ...EXPR.curious, eyeS: 1.1, mouth: { o: .3, w: .5, sm: .2 } }], [.75, { ...EXPR.delight }, ease.out], [1.6, { ...EXPR.delight, mouth: { o: .4, w: .9, sm: 1 } }]]);
  const bump = U > .6 ? 8 * Math.exp(-(U - .6) * 9) * Math.sin((U - .6) * 40) : 0;   // the cup dips as the drop lands
  person({ ...CAST.kid, x: 380, y: 1900, s, face: 1, pose: { lean: -.04, armF: { h: [(cx - 380 - 46 * s) / s, (cy + bump - 1900 + 280 * s) / s], bend: -30, fist: 1 }, armB: { h: [60, 60], bend: -40, fist: 1 } }, expr, look: U < .7 ? [.6, -.9] : [.8, -.2], headTilt: U < .7 ? -.18 : -.05 + .06 * Math.sin((U - .7) * 8) * Math.exp(-(U - .7) * 3) });
  push(); translate(cx, cy + bump); form(spline([[-90, -110], [90, -110], [78, 90], [-78, 90]]), '#9aa0a6', { lw: 7, sw: 14, shade: () => { fillOnly(ell(0, -106, 86, 18, 24), '#5a5e62', { boil: .2 }); if (k > 0) fillOnly(ell(0, -102, 74 * k, 14 * k, 20), '#a8571a', { boil: .2 }); } }); pop();
  if (U < .6) { const t = U / .6; drop(cx, -60 + t * t * (cy - 60), 26, 1.6); } else if (U < .9) { const t = (U - .6) / .3; for (const a of [-1, 1]) dot(cx + a * 50 * t, cy - 110 - 70 * t + 140 * t * t, 8 * (1 - t), '#a8571a'); }
  finish(.12, .4);
}

// ———————————————— P26 (38.3–40.4) "Setelah bencana, para insinyur…": dusk among torn plates; engineers inspect
export function P26() {
  setLight({ dir: [-.6, -.7], tint: '#1e2030', a: .34 });
  g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, 1300); gr.addColorStop(0, '#5a6278'); gr.addColorStop(1, '#a89a8a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (const [x, h, a] of [[140, 900, -.08], [430, 1150, .05], [760, 820, -.12], [1000, 1000, .1]]) { push(); translate(x, 1420); rotate(a); form([[-110, 0], [-120, -h * .7], [-60, -h], [20, -h * .82], [70, -h * .95], [120, -h * .6], [110, 0]], '#4c4a45', { lw: 7, sw: 18, shade: () => { for (let k = 1; k < 5; k++) for (let j = 0; j < 3; j++) dot(-70 + j * 70, -k * h * .18, 8, '#6e6b63'); fillOnly(rect(-110, -h * .25, 220, h * .25), '#2f1608', { boil: .3, alpha: .8 }); } }); pop(); }   // torn plates standing
  fillOnly(rect(0, 1400, W, 520), '#2f1608', { boil: .2 }); for (let k = 0; k < 6; k++) stroke(spline([[0, 1440 + k * 70], [500, 1430 + k * 72], [1080, 1446 + k * 70]], false, 8), 5, { line: '#552610', boil: .3 });
  const wr = Math.sin(U * 9) * 6;
  person({ ...CAST.gent, x: 270, y: 1600, s: 1.25, face: 1, pose: { lean: .1, armF: { h: [150, -40], bend: -10, hand: 'point' }, armB: { h: [-20, 160], bend: -10 } }, expr: { ...EXPR.worried, inner: .6 }, look: [.8, -.2] });
  person({ ...CAST.gent, hatCol: '#3a3a40', top: { type: 'coat', col: '#3e4048' }, acc: { glasses: true }, x: 840, y: 1640, s: 1.3, face: -1, pose: { lean: .06, armF: { h: [70, 20 + wr], bend: -50, fist: 1 }, armB: { h: [50, 40], bend: -40, hand: 'open' } }, expr: { ...EXPR.neutral, brow: -.15, inner: .4, lid: .35 }, look: [.4, .5], prop: (hp) => form(rr(hp[0] - 50, hp[1] - 10, 90, 64, 6), '#e8e0cc', { lw: 4 }) });   // writing in a notebook
  finish(.2, .45);
}

// ———————————————— P27 (40.4–42.1) "…menemukan dinding tangki terlalu tipis": the wall in section, struck through
export function P27() {
  desk(); paper(540, 960, 900, 1300, .02, '#e6dcc0', 0);
  label('PENAMPANG DINDING TANGKI', 540, 470, 52);
  const th = lerp(150, 46, ss(U / .6));   // the plate thins before our eyes
  push(); translate(540, 960); form(rect(-300, -260, 600, 520), '#d6cdb8', { lw: 4, sw: 0 }); form(rect(-th / 2, -300, th, 600), '#6e6b63', { lw: 7, sw: 10 }); pop();
  stroke([[300, 700], [300, 1220]], 4, { line: '#3a2a18' }); label('MOLASE', 360, 1340, 40, '#7a4a1a'); label('LUAR', 760, 1340, 40, '#3a2a18');
  arrow([300 + 0, 1100], [540 - th / 2 - 10, 1000], U - .55, { col: '#3a2a18', w: 6, d: .2, bend: 20 });
  if (U > .9) { const k = clamp((U - .9) / .12); stroke([[380, 760], [700, 1160]], 16 * k, { line: '#b3261e' }); stroke([[700, 760], [380, 1160]], 16 * k, { line: '#b3261e' }); }
  rubber('TERLALU TIPIS', 540, 1480, -.06, U - 1.0, { size: 84 });
  lamp(540, 900, .48); finishCard(.3);
}

// ———————————————— P28 (42.1–43.7) "dan bahannya rentan retak.": macro — a crack runs out from a rivet hole, branching
export function P28() {
  setLight({ dir: [.5, -.8], tint: '#22242c', a: .3 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#56544e'; g.fillRect(0, 0, W, H);
  for (let k = 0; k < 400; k++) dot(hash(k) * W, hash(k * 3) * H, 1 + hash(k * 7) * 2, hash(k * 5) > .5 ? '#6a6862' : '#46443f');
  form(ell(200, 560, 70, 70, 30), '#6e6b63', { lw: 8, sw: 12, shade: () => dot(178, 538, 16, '#9a978e') });
  const L = ss(U / 1.3);
  const crack = (pts, w, t0) => { const n = Math.max(0, Math.floor((L - t0) / (1 - t0) * pts.length)); if (n > 1) { stroke(pts.slice(0, n), w, { line: '#120702', boil: .1 }); stroke(pts.slice(0, n).map(([x, y]) => [x + 3, y + 3]), w * .35, { line: '#a8571a', boil: .1, alpha: .8 }); } };
  const main = []; for (let i = 0; i < 22; i++) main.push([260 + i * 34, 600 + Math.sin(i * 1.7) * 34 + i * 44]);
  crack(main, 12, 0); crack(main.slice(5).map(([x, y], i) => [x + i * 8, y - i * 40]), 7, .3); crack(main.slice(9).map(([x, y], i) => [x - i * 10, y + i * 34]), 6, .5);
  finish(.12, .45);
}

// ———————————————— P29 (43.7–44.9) "Konstruksi buruk,": the blueprint, stamped
export function P29() {
  desk(.1);
  push(); translate(540, 960); rotate(-.02); form(rect(-430, -620, 860, 1240), '#2c4a6e', { lw: 6, sw: 10, shade: () => { for (let k = 0; k < 30; k++) stroke([[-430, -620 + k * 42], [430, -620 + k * 42]], 1.5, { line: '#3d5f86', boil: .1 }); } });
  stroke([[-260, -300], [-260, 360], [260, 360], [260, -300]], 5, { line: '#dfe8f2', boil: .1 }); stroke(spline([[-260, -300], [0, -350], [260, -300]], false, 8), 5, { line: '#dfe8f2' });
  for (let k = 1; k < 6; k++) stroke([[-260, -300 + k * 110], [260, -300 + k * 110]], 2, { line: '#dfe8f2', alpha: .7 });
  pop();
  label('TANGKI MOLASE · 1915', 540, 520, 46, '#dfe8f2', -.02);
  rubber('KONSTRUKSI BURUK', 540, 1020, -.1, U - .05, { size: 88 });
  lamp(540, 900, .45); finishCard(.3);
}

// ———————————————— P30 (44.9–45.95) "perubahan suhu,": the thermometer jumps from −17 °C to +4 °C overnight
export function P30() {
  desk(.15); paper(540, 960, 760, 1300, -.02, '#e6dcc0', 0);
  const v = lerp(-17, 4, ss((U - .15) / .5)), y = c => lerp(1350, 560, (c + 25) / 40);
  push(); form(rr(480, 460, 120, 960, 60), '#f4f1ea', { lw: 7, sw: 8 }); form(ell(540, 1440, 90, 90, 30), '#a8571a', { lw: 7 }); fillOnly(rect(520, y(v), 40, 1440 - y(v)), '#a8571a', { boil: .2 }); pop();
  for (let c = -20; c <= 10; c += 5) { stroke([[600, y(c)], [640, y(c)]], 4); label(`${c}°`, 700, y(c), 34); }
  bigText(`${v < 0 ? '−' : '+'}${Math.abs(Math.round(v))}°C`, 300, 900, { size: 110, k: (U - .05) / .14, hot: v > 0 });
  label('13 JAN → 15 JAN 1919', 540, 1600, 40);
  lamp(540, 900, .45); finishCard(.3);
}

// ———————————————— P31 (45.95–49.6) "dan pengiriman molase baru… menjadi bagian dari rangkaian penyebabnya.":
// beat 1: a ship pumps a fresh, warm load into the tank; beat 2: the three causes chained on the desk
export function P31() {
  if (U < 1.25) {
    g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#9fb0bd'); gr.addColorStop(.6, '#c2c8cc'); gr.addColorStop(.62, '#5a6a72'); gr.addColorStop(1, '#3e4a52'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    form([[700, 1180], [1180, 1180], [1180, 660], [700, 660]], '#5d5b55', { lw: 7, sw: 20, shade: () => { for (let k = 1; k < 5; k++) stroke([[700, 660 + k * 104], [1180, 660 + k * 104]], 4, { line: '#4c4a45' }); } }); form(ell(940, 660, 240, 40, 30), '#6e6b63', { lw: 6 });   // the tank on the wharf
    push(); translate(-20, 1200); form([[0, 0], [560, 0], [620, -170], [-40, -170]], '#3a3430', { lw: 7, sw: 14 }); form(rect(120, -320, 120, 150), '#4a4440', { lw: 6 }); form(rect(160, -440, 40, 120), '#2a2622', { lw: 5 }); pop();   // the steamer
    const pipe = [[380, 1030], [520, 960], [640, 760], [720, 690]]; stroke(spline(pipe, false, 8), 24, { line: '#2a2622' });
    for (let k = 0; k < 6; k++) { const t = ((U * 1.2 + k / 6) % 1); const i = Math.min(2, Math.floor(t * 3)), f = t * 3 - i, x = lerp(pipe[i][0], pipe[i + 1][0], f), y = lerp(pipe[i][1], pipe[i + 1][1], f); dot(x, y, 8, AMBER); }   // warm molasses pumped in
    label('KAPAL MENGISI MOLASE BARU', 540, 300, 50, '#2a1e14'); finish(.12, .34); return;
  }
  const u = U - 1.25; desk();
  const cards = [['KONSTRUKSI BURUK', 330, 640, -.06, 0], ['SUHU', 820, 900, .05, .35], ['KIRIMAN BARU', 360, 1150, -.04, .7]];
  for (const [s, x, y, r, t0] of cards) { if (u < t0) continue; paper(x, y, 420, 230, r, '#e6dcc0', 0); rubber(s, x, y, r, u - t0, { size: 56, pad: 20 }); }
  arrow([480, 740], [700, 840], u - .3, { col: '#f4efe6', w: 10 }); arrow([760, 1020], [560, 1060], u - .65, { col: '#f4efe6', w: 10 });
  if (u > 1.1) bigText('= BENCANA', 540, 1560, { size: 110, k: (u - 1.1) / .14, hot: true });
  lamp(540, 900, .5); finishCard(.32);
}

// ———————————————— P32 (49.6–52.0) "Akibatnya, 21 orang meninggal": 21 candles, quiet
export function P32() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#0e0b0a'; g.fillRect(0, 0, W, H);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) { const i = r * 7 + c, x = 170 + c * 123 + (r % 2) * 30, y = 820 + r * 230, lit = U > .1 + i * .045, s = 1 - r * .06;
    form(rr(x - 22 * s, y, 44 * s, 150 * s, 6), '#e8e0cc', { lw: 5, sw: 8 });
    if (lit) { const f = 1 + .12 * Math.sin(U * 13 + i * 2); glow(x, y - 24, 40, 50, '#ffcf8a', .05, 2); shape(spline([[x, y - 60 * f], [x + 14, y - 22], [x, y - 6], [x - 14, y - 22]]), { fill: '#ffcf8a', lw: 3 }); } }
  bigText('21', 540, 460, { size: 260, k: (U - 1.05) / .14, fill: '#f4efe6' });
  grain(.05); vignette(.5);
}

// ———————————————— P33 (52.0–53.8) "dan 150 terluka.": a hospital ward in perspective
export function P33() {
  g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#5a5e64'); gr.addColorStop(1, '#2a2c30'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 7; i >= 0; i--) { const z = 1 + i * .9, s = 1 / z, y = 900 + 700 * s;
    for (const sd of [-1, 1]) { const x = 540 + sd * 420 * s; form(rr(x - 140 * s, y - 70 * s, 280 * s, 120 * s, 10 * s), '#e8e4da', { lw: 5 * s + 1, sw: 8 * s, shade: () => fillOnly(ell(x + sd * 80 * s, y - 70 * s, 50 * s, 26 * s, 14), '#f8f6f0', { boil: .1 }) }); stroke([[x - 130 * s, y + 50 * s], [x - 130 * s, y + 120 * s]], 4 * s + 1); stroke([[x + 130 * s, y + 50 * s], [x + 130 * s, y + 120 * s]], 4 * s + 1); } }
  bigText('150', 540, 460, { size: 240, k: (U - .4) / .14, fill: '#f4efe6' });
  grade2('#2a3550', '#ffcf8a', .12); grain(.05); vignette(.48);
}

// ———————————————— P34 (53.8–56.0) "Jadi, apakah ini bencana yang datang tiba-tiba,": the intact tank on that calm noon (P8's street, empty)
export function P34() {
  setCam(980, 1060, 1.3, '#d9dcdc'); setLight({ dir: [.55, -.8], tint: '#2a2c3a', a: .26 });
  scenePaint('P8', '#aebfcd', () => { boston({ tankAt: [.6, 40] }); street(1.1); });
  dof(1480, 1920, 7); paint(.42); grade2('#2c3b55', '#ffdca8', .14); grain(.045); vignette(.3);
}
export const finishP34 = () => {};
// ———————————————— P35 (56.0–57.38): the same tank; its seams light up amber — the warning was always there
export function P35() {
  P34();
  const [tx, ty] = P(.6, 7, 40), tw = 980 * 27.4 / 40, th = 980 * 15 / 40, k = .6 + .4 * Math.sin(U * 9);
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'screen';
  for (let i = 0; i < 5; i++) { const x = tx - tw * .4 + i * tw * .2; g.strokeStyle = `rgba(255,180,58,${.75 * k})`; g.lineWidth = 8; g.shadowColor = AMBER; g.shadowBlur = 30; g.beginPath(); g.moveTo(x, ty - th * .45); g.lineTo(x + 4, ty + th * .55); g.stroke(); }
  for (let j = 0; j < 4; j++) { const y = ty - th * .4 + j * th * .25; g.beginPath(); g.moveTo(tx - tw * .45, y); g.lineTo(tx + tw * .45, y + 4); g.stroke(); }
  g.shadowBlur = 0; g.globalCompositeOperation = 'source-over';
  g.fillStyle = 'rgba(20,14,30,.25)'; g.fillRect(0, 0, W, H);
}
export const finishP35 = () => {};

// ———————————————— P36 (57.38–60.75) "…atau tanda bahaya yang terlalu lama diabaikan?": the file, the kid's cup, the stamp
export function P36() {
  setLight({ dir: [-.4, -.9], tint: '#1a1410', a: .32 }); desk();
  paper(560, 960, 820, 1160, -.04, '#d8bb7e', 0);
  label('ARSIP KASUS #001', 560, 500, 60, '#2a1e14', -.04); label('BANJIR MOLASE · BOSTON 1919', 560, 580, 36, '#3a2a18', -.04);
  // the tin cup, a dribble of molasses down its side
  push(); translate(320, 1250); rotate(.06); form(spline([[-110, -140], [110, -140], [96, 120], [-96, 120]]), '#9aa0a6', { lw: 7, sw: 16, shade: () => { fillOnly(ell(0, -134, 104, 22, 24), '#a8571a', { boil: .2 }); fillOnly(spline([[30, -130], [44, -130], [46, 20], [36, 34], [28, 20]]), '#a8571a', { boil: .2 }); } }); form(spline([[100, -90], [170, -60], [170, 40], [96, 60]], false), '#9aa0a6', { lw: 7 }); pop();
  glow(320, 1120, 120, 50, AMBER, .06, 2);
  rubber('DIABAIKAN?', 600, 960, -.14, U - 2.55, { size: 120 });
  lamp(500, 1000, .5); finishCard(.34);
}
