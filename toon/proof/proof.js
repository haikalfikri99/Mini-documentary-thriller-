// Signature proof: the same Cast Kit in three different stories, each with its own world palette and its own Threat Colour.
// t ∈ [0,1) cast line-up · [1,2) expressions · [2,3) Boston 1919 · [3,4) New York 1911 · [4,5) Sunda Strait 1883
import { hash } from '/core/lib.js';
import { init, frame, g, W, H, INK, push, pop, translate, scale, rotate, fillOnly, stroke, shape, ell, arc, spline, rr, rect, noodle, bands, text, dot } from '../engine/toon.js';
import { person, drawHead, setLight, form, SKIN } from '../engine/cast.js';
import { glow, wash, stamp, caption, PAPER } from '../engine/brand.js';
import { run, walk } from '../engine/motion.js';

// —— casts, declared per story the way every future film will declare them ——
const BOSTON = {
  man: { body: 'man', skin: SKIN.light, hair: 'short', hairCol: '#3b2c24', hat: 'flatcap', hatCol: '#5d5a57', top: { type: 'coat', col: '#5b6470', cuff: '#4a525d' }, bottom: { type: 'trousers', col: '#3e3f47' }, shoes: { col: '#2a2526' }, acc: { scarf: '#8a4c42', moustache: true } },
  woman: { body: 'woman', skin: SKIN.fair, hair: 'bun', hairCol: '#5a3b2a', hat: 'boater', hatCol: '#4d4a5c', hatCol2: '#7a5a6a', top: { type: 'coat', col: '#6f6a7e' }, bottom: { type: 'skirt', col: '#3d3a48', legCol: '#2b2830' }, shoes: { col: '#2a2526' }, acc: { scarf: '#b9b2a6' } },
  child: { body: 'child', skin: SKIN.light, hair: 'tuft', hairCol: '#7a4a2a', hat: 'flatcap', hatCol: '#6e665e', top: { type: 'jacket', col: '#7a6f62' }, bottom: { type: 'knickers', col: '#4a4a52', sock: '#cfc8bb' }, shoes: { col: '#2b2626' } },
};
const NEWYORK = {
  man: { body: 'man', skin: SKIN.fair, hair: 'short', hairCol: '#2b2522', top: { type: 'vest', col: '#4a4454', col2: '#ddd6c8', sleeve: 'rolled' }, bottom: { type: 'trousers', col: '#3a3a44' }, shoes: { col: '#221f24' }, acc: { moustache: true } },
  woman: { body: 'woman', skin: SKIN.light, hair: 'bun', hairCol: '#2f2420', top: { type: 'blouse', col: '#e9e4da' }, bottom: { type: 'skirt', col: '#2f3142', legCol: '#25232c' }, shoes: { col: '#221f24' } },
  child: { body: 'child', skin: SKIN.fair, hair: 'braid', hairCol: '#3a2a22', top: { type: 'pinafore', col: '#6a6080', col2: '#e8e0cc' }, bottom: { type: 'skirt', col: '#6a6080', legCol: '#2c2a32' }, shoes: { col: '#221f24' } },
};
const SUNDA = {
  man: { body: 'man', skin: SKIN.brown, hair: 'short', hairCol: '#1f1a18', hat: 'iket', hatCol: '#6b4a2f', hatCol2: '#d9b77a', top: { type: 'baju', col: '#d8cdb5', sleeve: 'rolled' }, bottom: { type: 'sarong', col: '#6f5236', pattern: '#c9a46a' }, shoes: { type: 'bare' }, acc: { moustache: true } },
  woman: { body: 'woman', skin: SKIN.tan, hair: 'konde', hairCol: '#1d1816', top: { type: 'kebaya', col: '#a9b9a4', inner: '#8a5a3a', pin: '#d8c48a' }, bottom: { type: 'sarong', col: '#5a4632', pattern: '#c7a36b', band: '#3b2c20' }, shoes: { type: 'bare' } },
  child: { body: 'child', skin: SKIN.brown, hair: 'tuft', hairCol: '#1d1816', top: { type: 'baju', col: '#cfb98f', sleeve: 'none' }, bottom: { type: 'shorts', col: '#7a5a3a' }, shoes: { type: 'bare' } },
};

// —— small set pieces ——
function building(x, y, w, h, col, win, { cols = 3, rows = 7 } = {}) {
  form(rect(x, y, w, h), col, {
    lw: 6, sw: 30, shade: () => {
      fillOnly(rect(x - 10, y, w + 20, 26), win, { boil: .3, alpha: .5 });
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) fillOnly(rr(x + 30 + c * (w - 60) / cols + 8, y + 70 + r * 120, (w - 60) / cols - 34, 70, 6), win, { boil: .4 });
    }
  });
}
function wood(x, y, w, h, a, col = '#7d6650') { push(); translate(x, y); rotate(a); form(rect(-w / 2, -h / 2, w, h), col, { lw: 6, sw: 8, shade: () => stroke([[-w / 2 + 10, 0], [w / 2 - 10, -2]], 3) }); pop(); }
function label(str, x, y, size = 34, col = INK) { text(str, x, y, { font: `700 ${size}px "Courier Prime"`, fill: col }); }

// —— 0: cast line-up ——
function lineup() {
  setLight({ dir: [-.6, -.8], tint: '#2a2340', a: .26 });
  fillOnly(rect(0, 0, W, H), '#ece4d3', { boil: 0 });
  for (let x = 0; x < W; x += 60) stroke([[x, 0], [x, H]], 1.5, { line: '#d8cfbc', boil: 0 });
  for (let y = 0; y < H; y += 60) stroke([[0, y], [W, y]], 1.5, { line: '#d8cfbc', boil: 0 });
  text('CAST KIT', W / 2, 120, { font: '600 96px "Oswald"', fill: INK });
  label('3 TUBUH DASAR · KOSTUM BISA DITUKAR', W / 2, 196, 32);
  const rows = [[BOSTON, 'BOSTON 1919', 760], [NEWYORK, 'NEW YORK 1911', 1300], [SUNDA, 'SELAT SUNDA 1883', 1840]];
  for (const [C, name, base] of rows) {
    label(name, W / 2, base - 452, 28, '#6b5d52');
    stroke([[60, base + 4], [W - 60, base + 4]], 4);
    person({ ...C.man, x: 210, y: base, s: .66, expr: 'neutral' });
    person({ ...C.woman, x: 540, y: base, s: .66, expr: 'calm' });
    person({ ...C.child, x: 860, y: base, s: .66, expr: 'calm' });
  }
  for (const [s, x] of [['PRIA', 210], ['WANITA', 540], ['ANAK', 860]]) label(s, x, 1880, 30);
}

// —— 1: expressions ——
function expressions() {
  setLight({ dir: [-.6, -.8], tint: '#2a2340', a: .26 });
  fillOnly(rect(0, 0, W, H), '#ece4d3', { boil: 0 });
  text('AKTING WAJAH', W / 2, 120, { font: '600 96px "Oswald"', fill: INK });
  label('SATU SISTEM WAJAH UNTUK SEMUA KARAKTER', W / 2, 196, 30);
  const cells = [[BOSTON.man, 'neutral', 'NETRAL'], [BOSTON.man, 'fear', 'TAKUT'], [NEWYORK.woman, 'worried', 'CEMAS'], [NEWYORK.woman, 'scream', 'MENJERIT'], [SUNDA.child, 'shock', 'KAGET'], [SUNDA.child, 'sad', 'SEDIH']];
  cells.forEach(([C, e, name], i) => {
    const cx = i % 2 ? 790 : 290, cy = 560 + Math.floor(i / 2) * 520;
    push(); translate(cx - 20, cy); scale(1.5); drawHead({ ...C, expr: e }); pop();
    label(name, cx, cy + 210, 34);
  });
}

// —— 2: Boston, 15 Jan 1919 · threat = molasses amber ——
const AMBER = '#ffb43a';
function boston(t) {
  setLight({ dir: [-.15, -1], tint: '#24304a', a: .3, rim: AMBER, rimA: .95, rw: 9 });
  bands(['#d4d9df', '#c8ced6', '#bcc4cd', '#b0b9c4'], 0, 1000);
  for (let i = 0; i < 8; i++) { const x = -40 + i * 150, h = 200 + hash(i * 3.3) * 220; form(rect(x, 860 - h, 140, h + 200), '#a7afb9', { lw: 5, sw: 10, rim: false }); }
  building(-80, 240, 330, 1150, '#8e7c74', '#5d5560');
  building(830, 320, 330, 1080, '#857470', '#59525c');
  form(rect(-60, 660, 1200, 74), '#4f545e', { lw: 7, shade: () => { for (let x = -60; x < 1140; x += 60) stroke([[x, 664], [x + 60, 730]], 3); } });
  for (const x of [300, 770]) form(rect(x, 734, 36, 640), '#4f545e', { lw: 6 });
  form(rect(-60, 1290, 1200, 700), '#e3e6ea', { lw: 0, line: null, sw: 0, flat: true });
  for (let i = 0; i < 9; i++) stroke([[i * 140 - 60, 1330 + (i % 3) * 30], [i * 140 + 20, 1336 + (i % 3) * 30]], 3, { line: '#b9bfc8' });
  // the wave
  glow(540, 900, 600, 380, AMBER, .09, 3);
  const body = spline([[-80, 1470], [-80, 1080], [60, 940], [260, 820], [520, 700], [760, 560], [960, 470], [1120, 470], [1170, 600], [1170, 1470]]);
  shape(body, {
    fill: '#de830f', lw: 8, shade: () => {
      for (let k = 0; k < 8; k++) stroke(spline([[-100, 1060 + k * 60 - k * k * 4], [300, 900 + k * 70], [640, 760 + k * 80], [1000, 640 + k * 90], [1200, 620 + k * 100]], false), 7, { line: '#a9570a' });
      for (let k = 0; k < 6; k++) { const x = 120 + k * 170; stroke(spline([[x, 1000 - k * 90], [x - 30, 1120 - k * 60], [x - 10, 1260]], false), 9, { line: '#ffc85a' }); }
    }
  });
  // the curling lip: thrown forward and down over the street, a tube underneath
  shape(spline([[500, 720], [700, 560], [900, 440], [1080, 400], [1180, 440], [1150, 520], [1040, 520], [920, 560], [800, 660], [720, 780], [690, 900], [640, 960], [600, 880], [560, 800]]), { fill: '#f39a1c', lw: 8, shade: () => { stroke(spline([[600, 760], [760, 600], [940, 480], [1120, 440]], false), 10, { line: '#ffd27a' }); stroke(spline([[700, 640], [860, 520]], false), 6, { line: '#fff0b8' }); } });
  shape(spline([[760, 700], [880, 600], [1000, 560], [1100, 580], [1000, 660], [900, 760], [820, 860], [780, 800]]), { fill: '#7a3a06', lw: 6 });
  for (const [x, y, l] of [[620, 930, 110], [700, 860, 80], [540, 820, 70]]) shape(spline([[x - 18, y], [x + 18, y], [x + 6, y + l], [x, y + 12 + l], [x - 6, y + l]]), { fill: '#f39a1c', lw: 6 });
  for (let i = 0; i < 9; i++) shape(ell(380 + hash(i * 5.1) * 700, 300 + hash(i * 2.3) * 300, 10 + hash(i) * 14, 12 + hash(i) * 16, 14), { fill: '#f39a1c', lw: 5 });
  wood(300, 760, 170, 34, -.5); wood(560, 380, 130, 30, .7);
  push(); translate(380, 520); rotate(.4); form(ell(0, 0, 54, 54, 30), '#6a5a4a', { lw: 7, sw: 10, shade: () => { fillOnly(ell(0, 0, 36, 36, 24), '#8a7a66', { boil: .3 }); for (let a = 0; a < 6; a++) stroke([[0, 0], [Math.cos(a) * 36, Math.sin(a) * 36]], 4); } }); pop();
  form(spline([[-70, 1400], [220, 1366], [520, 1392], [820, 1360], [1170, 1396], [1170, 1500], [-70, 1500]]), '#de830f', { lw: 7, sw: 14, rim: false, shade: () => stroke(spline([[-60, 1420], [300, 1400], [700, 1416], [1160, 1410]], false), 6, { line: '#ffc85a' }) });
  // the people
  person({ ...BOSTON.child, x: 170, y: 1600, s: .95, face: 1, pose: 'run', expr: 'fear', look: [-.4, -.1] });
  person({ ...BOSTON.woman, x: 880, y: 1560, s: 1.0, face: -1, pose: 'run', expr: 'scream' });
  person({ ...BOSTON.man, x: 500, y: 1930, s: 1.3, face: 1, pose: 'run', expr: 'fear', look: [-.9, -.2], headTilt: -.06 });
  wash('#ff9a1f', .05);
  stamp('BOSTON', '15 JAN 1919', '12:30', AMBER);
  caption('Gelombang setinggi <8 meter>', AMBER);
}

// —— 3: New York, 25 Mar 1911 · threat = fire orange ——
const FIRE = '#ff7a1c';
function newyork(t) {
  setLight({ dir: [-1, -.25], tint: '#12142a', a: .38, rim: '#ff8a2a', rimA: .95, rw: 10 });
  bands(['#30345a', '#2c3055', '#282b4e', '#252848'], 0, 1220);
  for (const x of [130, 460, 790]) form(rect(x, 330, 220, 540), '#1b2040', { lw: 7, rim: false, shade: () => { stroke([[x + 110, 330], [x + 110, 870]], 6); stroke([[x, 600], [x + 220, 600]], 6); for (let i = 0; i < 6; i++) dot(x + 30 + hash(i + x) * 160, 640 + hash(i * 2 + x) * 200, 4, '#6a6f9a'); } });
  form(rect(-60, 1200, 1200, 800), '#3a3756', { lw: 0, line: null, flat: true });
  for (let i = 0; i < 10; i++) stroke([[-60, 1240 + i * 70], [1140, 1250 + i * 76]], 3, { line: '#2e2b48' });
  // sewing tables
  form(rect(-60, 1060, 760, 60), '#4a4565', { lw: 7, shade: () => { } });
  for (let i = 0; i < 5; i++) { const x = -20 + i * 150; form(rr(x, 990, 90, 70, 12), '#24223a', { lw: 6 }); form(ell(x + 70, 1010, 16, 16, 12), '#24223a', { lw: 5 }); form(spline([[x + 100, 1060], [x + 130, 1040], [x + 140, 1060]]), '#8d88a8', { lw: 5, rim: false }); }
  for (const x of [40, 520]) form(rect(x, 1120, 26, 200), '#4a4565', { lw: 6 });
  // smoke
  for (let i = 0; i < 9; i++) form(ell(60 + i * 120, 120 + (i % 3) * 60, 150, 110, 30), '#47425e', { lw: 6, rim: false, sw: 18 });
  // fire
  glow(160, 900, 300, 520, FIRE, .12, 3);
  const flame = (x0, x1, base, top, col, n, ph) => { const P = [[x0, base]]; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, up = i % 2 === 0; P.push([x + (hash(i + ph) - .5) * 30, up ? top + hash(i * 3 + ph + Math.floor(t * 12)) * 120 : top + 260 + hash(i * 5 + ph) * 80]); } P.push([x1, base]); return spline(P); };
  shape(flame(-80, 420, 1300, 180, 0, 10, 1), { fill: '#ff5a14', lw: 8 });
  shape(flame(-60, 360, 1300, 360, 0, 8, 7), { fill: '#ff9a26', lw: 6 });
  shape(flame(-40, 280, 1300, 600, 0, 6, 13), { fill: '#ffd86a', lw: 5 });
  for (let i = 0; i < 26; i++) dot(80 + hash(i * 7.1) * 900, 200 + hash(i * 3.7) * 1100, 4 + hash(i) * 4, i % 3 ? '#ffb23a' : '#ff6a1a');
  // the locked door
  form(rect(780, 560, 290, 860), '#5b4a52', { lw: 8, sw: 40, shade: () => { form(rr(820, 620, 210, 300, 8), '#5b4a52', { lw: 5, sw: 10 }); form(rr(820, 980, 210, 380, 8), '#5b4a52', { lw: 5, sw: 10 }); } });
  form(ell(1000, 1110, 22, 22, 18), '#b9a77a', { lw: 6, sw: 6 });
  // the people
  person({ ...NEWYORK.man, x: 330, y: 1700, s: 1.2, face: -1, pose: 'shield', expr: 'shock' });
  person({ ...NEWYORK.woman, x: 690, y: 1640, s: 1.35, face: 1, pose: 'pull', expr: 'fear', look: [-1, 0], headTilt: -.08 });
  wash(FIRE, .05);
  stamp('NEW YORK', '25 MAR 1911', '16:40', FIRE);
  caption('Pintu keluar <terkunci>', FIRE);
}

// —— 4: Sunda Strait, 27 Aug 1883 · threat = sea cyan ——
const SEA = '#22c8ff';
function sunda(t) {
  setLight({ dir: [.1, -1], tint: '#5a3a2a', a: .22, rim: '#5fe2ff', rimA: .95, rw: 9 });
  bands(['#f3e3bd', '#efd6a6', '#e9c991', '#e2bc80'], 0, 960);
  // ash column over the volcano
  for (let i = 0; i < 34; i++) { const k = i / 34, y = 880 - k * 720 - hash(i * 4.4) * 40, sp = 40 + k * k * 260, x = 820 + (hash(i * 2.7) - .5) * 2 * sp; form(ell(x, y, 50 + k * 70 + hash(i) * 30, 44 + k * 50 + hash(i * 9) * 20, 24), i % 3 ? '#5d5768' : '#4e4859', { lw: 6, rim: false, sw: 16 }); }
  form(spline([[700, 960], [760, 900], [800, 880], [860, 896], [920, 960]]), '#556060', { lw: 6, rim: false });
  // the wave on the horizon
  glow(540, 820, 640, 260, SEA, .1, 3);
  shape(spline([[-80, 1060], [-60, 760], [160, 640], [460, 600], [760, 620], [1000, 680], [1170, 800], [1170, 1060]]), {
    fill: '#12b4ee', lw: 8, shade: () => {
      for (let k = 0; k < 5; k++) stroke(spline([[-80, 760 + k * 64], [300, 740 + k * 66], [700, 752 + k * 62], [1180, 770 + k * 60]], false), 6, { line: '#0a6fc8' });
      for (let k = 0; k < 7; k++) { const x = 40 + k * 160; stroke(spline([[x, 700], [x - 14, 820], [x + 6, 940]], false), 7, { line: '#7fe6ff' }); }
    }
  });
  shape(spline([[-70, 770], [120, 640], [460, 584], [780, 600], [1040, 670], [1170, 760], [1100, 790], [880, 690], [560, 640], [260, 670], [40, 790]]), { fill: '#effcff', lw: 7 });
  form(rect(-60, 1040, 1200, 70), '#7fa39a', { lw: 6, rim: false, flat: true });
  form(rect(-60, 1100, 1200, 900), '#e5cd9c', { lw: 6, flat: true, rim: false, shade: () => fillOnly(rect(-60, 1100, 1200, 60), '#d2b783', { boil: .3 }) });
  // village: house on stilts, palms, a boat
  for (const x of [80, 170, 270, 340]) form(rect(x, 980, 16, 180), '#8f7352', { lw: 5 });
  form(rect(50, 760, 330, 230), '#c69e63', { lw: 7, shade: () => { for (let x = 70; x < 380; x += 26) stroke([[x, 760], [x, 990]], 3, { line: '#a98552' }); fillOnly(rr(180, 830, 80, 110, 6), '#5a4632', { boil: .3 }); } });
  form([[20, 780], [215, 610], [410, 780]], '#a1814f', { lw: 7, shade: () => { for (let k = 0; k < 6; k++) stroke([[60 + k * 60, 780], [215, 630]], 3, { line: '#7f6438' }); } });
  const palm = (x, y, h, lean) => {
    form(noodle([x, y], [x + lean, y - h], lean * .3, 40, 26), '#8f7352', { lw: 6, shade: () => { for (let k = 1; k < 8; k++) stroke([[x - 40 + lean * k / 8, y - h * k / 8], [x + 40 + lean * k / 8, y - h * k / 8 + 8]], 3); } });
    for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .55; form(spline([[x + lean, y - h], [x + lean + Math.cos(a) * 120, y - h + Math.sin(a) * 60 - 20], [x + lean + Math.cos(a) * 230, y - h + Math.sin(a) * 30 + 70], [x + lean + Math.cos(a) * 120, y - h + Math.sin(a) * 60 + 20]]), k % 2 ? '#5d955f' : '#4b8452', { lw: 6 }); }
  };
  palm(1000, 1260, 640, -90);
  push(); translate(760, 1220); form(spline([[-200, 0], [200, -6], [170, 50], [-170, 54]]), '#8b6845', { lw: 7 }); stroke([[-120, 10], [-150, 80]], 6); stroke([[120, 6], [150, 80]], 6); form(rect(-220, 76, 440, 16), '#8b6845', { lw: 5 }); pop();
  // the people
  person({ ...SUNDA.child, x: 200, y: 1620, s: 1.1, face: 1, pose: 'point', expr: 'shock', look: [.6, -.9] });
  person({ ...SUNDA.woman, x: 900, y: 1700, s: 1.15, face: -1, pose: 'mouth', expr: 'fear', look: [-.5, -.8] });
  person({ ...SUNDA.man, x: 560, y: 1940, s: 1.38, face: -1, pose: 'run', expr: 'fear', look: [-.9, -.4], headTilt: .06 });
  wash(SEA, .04);
  stamp('SELAT SUNDA', '27 AGU 1883', '10:02', SEA);
  caption('Ombak setinggi <30 meter>', SEA);
}

// —— 5: motion sheet: run cycle (3/4 and side view) and the crouch ——
function motion() {
  setLight({ dir: [-.6, -.8], tint: '#2a2340', a: .26 });
  fillOnly(rect(0, 0, W, H), '#ece4d3', { boil: 0 });
  text('GERAK', W / 2, 110, { font: '600 96px "Oswald"', fill: INK });
  label('SIKLUS LARI · TAMPAK 3/4', W / 2, 200, 28);
  for (let i = 0; i < 4; i++) person({ ...BOSTON.man, x: 150 + i * 260, y: 760, s: .72, pose: run(i / 4), expr: 'fear' });
  label('SIKLUS LARI · TAMPAK SAMPING', W / 2, 860, 28);
  for (let i = 0; i < 4; i++) person({ ...NEWYORK.woman, view: 'side', x: 150 + i * 260, y: 1400, s: .72, pose: run(i / 4 + .1), expr: 'scream' });
  label('JONGKOK · JALAN', W / 2, 1500, 28);
  person({ ...BOSTON.child, x: 240, y: 1860, s: .8, pose: { crouch: .9, armF: { h: [90, -60], bend: -30 } }, expr: 'curious' });
  for (let i = 0; i < 3; i++) person({ ...SUNDA.man, view: i === 2 ? 'side' : undefined, x: 520 + i * 230, y: 1860, s: .58, pose: walk(i / 3), expr: 'neutral' });
  stroke([[60, 1864], [W - 60, 1864]], 4);
}

const SCENES = [lineup, expressions, boston, newyork, sunda, motion];
const canvas = document.getElementById('c'); init(canvas);
window.DUR = SCENES.length;
window.render = t => {
  frame(t); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
  SCENES[Math.min(SCENES.length - 1, Math.floor(t))](t);
};
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"')]).then(() => { window.render(0); window.READY = true; });
