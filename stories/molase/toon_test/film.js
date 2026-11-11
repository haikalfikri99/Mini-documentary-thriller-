// Molasses test clip in the channel toolkit (toon/): S07 (run from the wave) + S14 (boy catches drops). Same VO timing as the storyboard.
// Local time T: [0, 3.5) = S07 (VO 14.95–18.45) · [3.5, 6.3) = S14 (VO 35.55–38.35)
import { clamp, lerp, hash, TAU } from '/core/lib.js';
import { init, frame, g, W, H, INK, push, pop, translate, scale, rotate, fillOnly, stroke, shape, ell, arc, spline, rr, rect, noodle, bands, dot } from '/engine/toon.js';
import { person, setLight, form, SKIN, BASE } from '/engine/cast.js';
import { run, blink, breathe, sway, flutter, ease, seg, mixPose } from '/engine/motion.js';
import { glow, wash, caption } from '/engine/brand.js';

export const SEGS = [[0, 3.5, 14.95], [3.5, 6.3, 35.55]];   // [start, end, VO start]
const AMBER = '#ffb43a', MOL = '#de830f', MOL_D = '#a9570a', MOL_L = '#ffc85a', MOL_LIP = '#f39a1c';

const CAST = {
  worker: { body: 'man', skin: SKIN.light, hair: 'short', hairCol: '#3b2c24', hat: 'flatcap', hatCol: '#5d5a57', top: { type: 'coat', col: '#5b6470', cuff: '#4a525d' }, bottom: { type: 'trousers', col: '#3e3f47' }, shoes: { col: '#2a2526' }, acc: { scarf: '#8a4c42', moustache: true } },
  woman: { body: 'woman', skin: SKIN.fair, hair: 'bun', hairCol: '#5a3b2a', hat: 'boater', hatCol: '#4d4a5c', hatCol2: '#7a5a6a', top: { type: 'coat', col: '#6f6a7e' }, bottom: { type: 'skirt', col: '#3d3a48', legCol: '#2b2830' }, shoes: { col: '#2a2526' }, acc: { scarf: '#b9b2a6' } },
  boy: { body: 'child', skin: SKIN.light, hair: 'tuft', hairCol: '#7a4a2a', hat: 'flatcap', hatCol: '#6e665e', top: { type: 'jacket', col: '#7a6f62' }, bottom: { type: 'knickers', col: '#4a4a52', sock: '#cfc8bb' }, shoes: { col: '#2b2626' } },
};

function building(x, y, w, h, col, win) {
  form(rect(x, y, w, h), col, { lw: 6, sw: 30, shade: () => { fillOnly(rect(x - 10, y, w + 20, 26), win, { boil: .3, alpha: .5 }); for (let r = 0; r < 9; r++) for (let c = 0; c < 3; c++) fillOnly(rr(x + 38 + c * (w - 60) / 3, y + 70 + r * 120, (w - 60) / 3 - 34, 70, 6), win, { boil: .4 }); } });
}
function wood(x, y, w, h, a, col = '#7d6650') { push(); translate(x, y); rotate(a); form(rect(-w / 2, -h / 2, w, h), col, { lw: 6, sw: 8, shade: () => stroke([[-w / 2 + 10, 0], [w / 2 - 10, -2]], 3) }); pop(); }

// ———————————————— S07 ————————————————
function s07(u) {
  const D = 3.5, k = u / D;
  setLight({ dir: [-.15, -1], tint: '#24304a', a: .3, rim: AMBER, rimA: .95, rw: 9 });
  // camera: dutch angle, pulling back fast, shake growing with the wave
  const shake = 6 + k * 14, sx = (hash(Math.floor(u * 24) * 1.3) - .5) * shake, sy = (hash(Math.floor(u * 24) * 2.9) - .5) * shake;
  push(); translate(W / 2 + sx, H * .55 + sy); rotate(-.07 - .02 * k); scale(1.1 - .08 * k); translate(-W / 2, -H * .55);
  bands(['#d4d9df', '#c8ced6', '#bcc4cd', '#b0b9c4'], -200, 1000, -300, 1400);
  for (let i = 0; i < 9; i++) { const x = -160 + i * 150, h = 200 + hash(i * 3.3) * 220; form(rect(x, 860 - h, 140, h + 200), '#a7afb9', { lw: 5, sw: 10, rim: false }); }
  building(-200, 200, 400, 1200, '#8e7c74', '#5d5560');
  building(880, 260, 420, 1140, '#857470', '#59525c');
  form(rect(-300, 1290, 1700, 900), '#e3e6ea', { lw: 0, line: null, flat: true });
  for (let i = 0; i < 12; i++) stroke([[i * 140 - 260, 1330 + (i % 3) * 30], [i * 140 - 180, 1336 + (i % 3) * 30]], 3, { line: '#b9bfc8' });

  // the wave: grows toward camera (anchored on the street), its face rolls downward, the lip curls and drips
  const wk = lerp(.8, 1.12, ease.inOut(k)), roll = (u * 170) % 90;
  glow(560, 900, 600 * wk, 380 * wk, AMBER, .09, 3);
  push(); translate(540, 1460); scale(wk); translate(-540, -1460);
  // the wagon going under (behind the lip)
  const wg = seg(u, 1.2, 3.2);
  if (wg < 1) { push(); translate(120 + wg * 60, 1180 - ease.in(wg) * 260); rotate(-.2 - wg * 1.4); form(rect(-110, -50, 220, 80), '#7d6650', { lw: 6 }); for (const wx of [-70, 70]) form(ell(wx, 40, 40, 40, 20), '#5c4a3a', { lw: 6, shade: () => dot(wx, 40, 6) }); pop(); }
  shape(spline([[-200, 1470], [-200, 1080], [60, 940], [260, 820], [520, 700], [760, 560], [960, 470], [1120, 470], [1260, 600], [1260, 1470]]), {
    fill: MOL, lw: 8, shade: () => {
      for (let j = -1; j < 9; j++) { const o = j * 90 + roll; stroke(spline([[-200, 980 + o - j * j * 2], [300, 880 + o], [640, 760 + o], [1000, 650 + o], [1260, 630 + o]], false), 7, { line: MOL_D }); }
      for (let j = 0; j < 7; j++) { const x = 100 + j * 170, y0 = 1010 - j * 90; stroke(spline([[x, y0 + (roll * 1.4) % 60], [x - 30, y0 + 120], [x - 10, y0 + 260]], false), 9, { line: MOL_L }); }
    }
  });
  const lw = Math.sin(u * 5) * 14;
  shape(spline([[500, 720], [700, 560 + lw * .3], [900, 440], [1080, 400], [1180, 440], [1150, 520], [1040, 520], [920, 560], [800, 660], [720, 780 + lw], [690, 900 + lw], [640, 960 + lw * 1.3], [600, 880], [560, 800]]), { fill: MOL_LIP, lw: 8, shade: () => { stroke(spline([[600, 760], [760, 600], [940, 480], [1120, 440]], false), 10, { line: '#ffd27a' }); stroke(spline([[700 + roll, 640 - roll * .7], [860 + roll * .5, 520]], false), 6, { line: '#fff0b8' }); } });
  shape(spline([[760, 700], [880, 600], [1000, 560], [1100, 580], [1000, 660], [900, 760], [820, 860], [780, 800]]), { fill: '#7a3a06', lw: 6 });
  for (const [x, y, l, ph] of [[620, 930, 110, 0], [700, 860, 80, 1.3], [540, 820, 70, 2.1]]) { const sw = Math.sin(u * 7 + ph) * 10, ll = l * (1 + .25 * Math.sin(u * 4 + ph)); shape(spline([[x - 18, y], [x + 18, y], [x + 6 + sw, y + ll], [x + sw, y + 12 + ll], [x - 6 + sw, y + ll]]), { fill: MOL_LIP, lw: 6 }); }
  pop();
  // the elevated railway in front: the wave runs under it
  form(rect(-300, 640, 1700, 74), '#4f545e', { lw: 7, shade: () => { for (let x = -300; x < 1400; x += 60) stroke([[x, 644], [x + 60, 710]], 3); } });
  for (const x of [250, 800]) { form(rect(x, 714, 38, 700), '#4f545e', { lw: 6 }); const fy = lerp(1330, 1420, k); shape(spline([[x - 50, fy + 10], [x - 10, fy - 50 - 30 * Math.sin(u * 6 + x)], [x + 20, fy - 70], [x + 60, fy + 10]]), { fill: MOL_LIP, lw: 6 }); }
  // spray and debris thrown ahead of the wave
  for (let i = 0; i < 12; i++) { const ph = (u * .8 + hash(i * 1.7)) % 1, x = 100 + hash(i * 5.1) * 880 + (hash(i) - .5) * 300 * ph, y = 700 + hash(i * 2.3) * 300 - 520 * ph + 900 * ph * ph; if (y < 1500) shape(ell(x, y, 9 + hash(i) * 12, 11 + hash(i) * 14, 14), { fill: MOL_LIP, lw: 5 }); }
  wood(lerp(260, 120, k), lerp(760, 380, k) + 300 * k * k, 170, 34, -.5 - u * 1.6);
  push(); translate(lerp(380, 560, k), lerp(520, 300, k) + 200 * k * k); rotate(u * 3); form(ell(0, 0, 54, 54, 30), '#6a5a4a', { lw: 7, sw: 10, shade: () => { fillOnly(ell(0, 0, 36, 36, 24), '#8a7a66', { boil: .3 }); for (let a = 0; a < 6; a++) stroke([[0, 0], [Math.cos(a) * 36, Math.sin(a) * 36]], 4); } }); pop();
  // the molasses front, sliding over the snow toward camera
  const fy = lerp(1400, 1560, ease.inOut(k));
  form(spline([[-300, fy], [0, fy - 30 + 10 * Math.sin(u * 3)], [300, fy - 4], [620, fy - 34], [900, fy - 10], [1400, fy], [1400, fy + 160], [-300, fy + 160]]), MOL, { lw: 7, sw: 14, rim: false, shade: () => stroke(spline([[-260, fy + 30], [300, fy + 14], [800, fy + 24], [1360, fy + 20]], false), 6, { line: MOL_L }) });

  // the people: the woman behind, the worker coming at the camera
  const wPh = u * 1.35 + .37, mPh = u * 1.4;
  const wP = run(wPh, 1);
  person({ ...CAST.woman, x: lerp(900, 870, k), y: lerp(1480, 1600, k), s: lerp(.8, .98, k), face: -1, pose: wP, expr: 'scream', mouth: { o: .75 + .25 * Math.sin(u * 9) }, sway: sway(wPh), flutter: flutter(u, 1.3), blink: false });
  const mP = run(mPh, 1), back = seg(u, 1.1, 1.4) - seg(u, 2.2, 2.5);   // glances back at the wave
  person({ ...CAST.worker, x: lerp(560, 500, k), y: lerp(1720, 2000, ease.in(k)), s: lerp(1.08, 1.55, ease.in(k)), face: 1, pose: { ...mP, headTilt: mP.headTilt - .12 * back }, expr: back > .5 ? 'shock' : 'fear', look: [lerp(.3, -1, back), lerp(0, -.25, back)], sway: sway(mPh), flutter: flutter(u, 1.4), blink: blink(u, 3) });
  pop();
  wash('#ff9a1f', .05 + .03 * k);
  caption('<2,3 juta galon> molase', AMBER, { k: seg(u, .55, .95) });
}

// ———————————————— S14 ————————————————
const DROPS = [35.6, 36.17, 37.25, 38.05];
function s14(v) {
  const vo = 35.55 + v, D = 2.8;
  setLight({ dir: [-.6, -.8], tint: '#2a2c3a', a: .3 });
  // push-in, low angle
  push(); translate(W / 2, 1100); scale(1 + .07 * ease.inOut(v / D)); translate(-W / 2, -1100);
  // sky and the harbour beyond the tank's edge
  bands(['#cfd5dc', '#c4cad2', '#b9c0c9'], -100, 1300, -200, 400);
  for (const x of [40, 120]) stroke([[x, 560], [x - 6, 1300]], 5);
  form(rect(-100, 1100, 420, 260), '#8e959e', { lw: 6, rim: false });
  // the tank wall: muted steel, horizontal seam with rivets, vertical plate seams, curvature bands
  const wall = [[190, -200], [1300, -200], [1300, 1400], [150, 1400], [170, 600]];
  form(wall, '#7f857d', {
    lw: 8, sw: 0, flat: true, shade: () => {
      fillOnly(rect(150, -200, 140, 1700), '#6c7169', { boil: .3 });
      fillOnly(rect(290, -200, 90, 1700), '#767c74', { boil: .3 });
      for (const y of [260, 650, 1040]) { stroke([[150, y], [1300, y]], 6); for (let x = 200; x < 1300; x += 46) dot(x, y - 16, 5, '#555a52'), dot(x + 23, y + 16, 5, '#555a52'); }
      for (const x of [420, 860]) { stroke([[x, -200], [x, 1400]], 6); for (let y = -180; y < 1400; y += 46) dot(x - 16, y, 5, '#555a52'); }
      // old molasses stains under the seam
      for (const [x, l] of [[520, 260], [575, 180], [640, 320], [980, 220]]) fillOnly(spline([[x - 14, 656], [x + 14, 656], [x + 8, 656 + l], [x, 670 + l], [x - 8, 656 + l]]), '#8a5a2a', { boil: .4, alpha: .55 });
    }
  });
  // ground
  form(rect(-200, 1330, 1600, 800), '#8b8073', { lw: 6, flat: true, rim: false, shade: () => { for (let i = 0; i < 26; i++) form(ell(hash(i * 3.3) * 1200 - 60, 1380 + hash(i * 7.1) * 500, 40 + hash(i) * 30, 14, 16), '#7d7266', { lw: 4, rim: false, flat: true }); } });

  // the boy: crouched, lifts the tin cup (anticipation dip, then up), the cup dips on each catch
  const lift = ease.back(seg(v, .05, .55)) - .15 * Math.sin(seg(v, 0, .12) * Math.PI);
  let catchK = 0, landed = 0;
  for (const d of DROPS) { const dt = vo - d; if (dt >= 0) { landed++; if (dt < .4) catchK = Math.max(catchK, Math.sin(Math.min(1, dt / .4) * Math.PI) * (1 - dt / .4 * .5)); } }
  const happy = DROPS.some(d => vo - d >= 0 && vo - d < .55);
  const BX = 700, BY = 1700, BS = 1.9, F = -1;
  const armF = { h: [lerp(60, 112, lift), lerp(10, -168, lift) + catchK * 24], bend: -30, fist: 1 };
  const b = BASE.child, ck = .9, dy = ck * -b.hip * .55;
  const hand = [BX + F * BS * (b.shX + armF.h[0]), BY + BS * (b.sh + 14 + dy + armF.h[1]) + breathe(v, 1) * BS];
  const cupY = hand[1] - 40 * BS, cupX = hand[0];
  let cup = null;
  person({ ...CAST.boy, x: BX, y: BY + breathe(v, 1), s: BS, face: F, pose: { crouch: ck, lean: 0, armF, armB: { h: [90, lerp(20, -60, lift)], bend: -40, fist: 1 }, legB: [-10, 0], legF: [14, 0] },
    expr: happy ? 'delight' : 'curious', look: [-.15, -1], headTilt: -.18, blink: !happy && blink(v, 7),
    prop: (hp) => { cup = hp; } });
  // tin cup, drawn in front of the hand
  push(); translate(cupX, cupY + 30 * BS); scale(BS);
  form(spline([[-40, -40], [40, -40], [34, 38], [-34, 38]]), '#a6a9a6', { lw: 6, sw: 10, shade: () => { fillOnly(rect(-60, -30, 120, 6), '#8c908c', { boil: .3 }); } });
  form(ell(0, -40, 40, 11, 24), '#5d605d', { lw: 6, flat: true, shade: () => { if (landed) fillOnly(ell(0, -40 + 2, 34 * Math.min(1, .5 + landed * .15), 8, 20), MOL, { boil: .3 }); } });
  form(noodle([40, -26], [40, 20], -26, 10, 10), '#a6a9a6', { lw: 5, sw: 3 });
  pop();
  // the drops: swell at the seam, fall, splash in the cup
  const SX = cupX, SY = 662;
  for (const d of DROPS) {
    const t0 = d - .62, t1 = d - .28, dt = vo - d;
    if (vo >= t0 && vo < t1) { const gk = seg(vo, t0, t1); glow(SX, SY + 20 * gk, 22, 28, AMBER, .12, 2); shape(spline([[SX - 12, SY], [SX + 12, SY], [SX + 9 * gk + 4, SY + 26 * gk + 8], [SX, SY + 34 * gk + 14], [SX - 9 * gk - 4, SY + 26 * gk + 8]]), { fill: MOL_LIP, lw: 5 }); }
    if (vo >= t1 && vo < d) { const fk = ease.in(seg(vo, t1, d)), y = lerp(SY + 40, cupY + 30 * BS - 40 * BS, fk); glow(SX, y, 18, 26, AMBER, .14, 2); shape(spline([[SX, y - 30], [SX + 13, y + 6], [SX, y + 18], [SX - 13, y + 6]]), { fill: MOL_LIP, lw: 5 }); }
    if (dt >= 0 && dt < .25) { const r = 20 + dt * 260; stroke(arc(SX, cupY - 10 * BS, r, r * .3, Math.PI, Math.PI * 2, 18), 4, { line: MOL_L, alpha: 1 - dt / .25 }); for (const a of [-.9, -.5, .5, .9]) dot(SX + Math.sin(a) * r * 1.2, cupY - 10 * BS - 40 * Math.sin(dt / .25 * Math.PI) - 10, 5, MOL_LIP); }
  }
  // a hanging drip always at the seam
  shape(spline([[SX - 10, SY], [SX + 10, SY], [SX + 6, SY + 18], [SX, SY + 24], [SX - 6, SY + 18]]), { fill: MOL_LIP, lw: 5 });
  pop();
}

const canvas = document.getElementById('c'); init(canvas);
window.DUR = 6.3;
window.render = T => {
  frame(T); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
  if (T < 3.5) s07(T); else s14(T - 3.5);
};
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"')]).then(() => { window.render(0); window.READY = true; });
