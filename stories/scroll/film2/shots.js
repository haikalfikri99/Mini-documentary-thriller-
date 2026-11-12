// ARSIP 002 — all 25 shots on the ARSIP RIG. Each shot is a function of u (0..1 through the shot) so the same code
// gives the storyboard keyframe (u = .5) and, later, the animation. Text drawn here stands in for the HyperFrames type layer.
import { drawChar, solve, SKIN, PRESETS, handPhoneCU, walk } from './rig/arsip-rig.js';
import { use, W, H, vgrad, hgrad, rrect, poly, ellipse, line, pool, contact, vignette, grain, depth, shadowFall } from './rig/scene-kit.js';
import * as S from './sets.js';
const { RASKIN06, RASKIN19, KAMU, ORANG06, SCREEN, AMBER, seated, headAt } = S;

let g, MAIN;
const setLocal = c => { g = c; S.setCtx(c); };
export const setCtx = c => { MAIN = c; setLocal(c); };
const lerp = (a, b, t) => a + (b - a) * t;
const NIGHT = { amb: '#3d3650', ambK: .18 }, DAY = { amb: '#f3e6cc', ambK: .05 };
const RIM_PHONE = { col: SCREEN, dir: [.75, .4], w: 6 };

// —— shared bits ——
function txt(t, x, y, size = 64, col = '#f4ead8', al = 'center', font = 'Oswald') {
  g.save(); g.font = `600 ${size}px ${font}`; g.textAlign = al; g.lineJoin = 'round';
  g.strokeStyle = 'rgba(20,16,22,.9)'; g.lineWidth = size * .16; g.strokeText(t, x, y); g.fillStyle = col; g.fillText(t, x, y); g.restore();
}
function stamp(t, x, y, rot = -.08, col = '#d9483b', size = 58) {
  g.save(); g.translate(x, y); g.rotate(rot); g.font = `700 ${size}px "Courier Prime"`; g.textAlign = 'center';
  const w = g.measureText(t).width + 40; g.strokeStyle = col; g.lineWidth = 6; g.globalAlpha = .9; g.strokeRect(-w / 2, -size * .9, w, size * 1.25); g.fillStyle = col; g.fillText(t, 0, 0); g.restore();
}
// a feed card (generic social post: image block + two text lines), palette kept calm
const FEED = ['#7fa8c9', '#d9a77a', '#8fc0b0', '#c49ab8', '#a9b87a', '#d7c18a'];
function card(x, y, w, h, i, ad = false) {
  rrect(x, y, w, h, 18, '#f2f4f6'); rrect(x + 16, y + 16, w - 32, h * .62, 12, ad ? AMBER : FEED[i % FEED.length]);
  rrect(x + 16, y + h * .62 + 30, w * .6, 14, 5, '#c3ccd4'); rrect(x + 16, y + h * .62 + 54, w * .38, 14, 5, '#d6dce1');
  if (ad) { g.save(); g.fillStyle = '#3a2a10'; g.font = `600 ${Math.round(h * .16)}px Oswald`; g.textAlign = 'center'; g.fillText('IKLAN', x + w / 2, y + h * .4); g.restore(); }
}
function feedScreen(scroll = 0, ad = -1) {
  return (c, x, y, w, h) => { const o = g; g = c; use(c); rrect(x, y, w, h, 0, '#e9eef2');
    for (let i = -1; i < 6; i++) { const yy = y + 90 + i * 220 - (scroll % 220); card(x + 20, yy, w - 40, 200, i + Math.floor(scroll / 220), i + Math.floor(scroll / 220) === ad); }
    rrect(x, y, w, 70, 0, '#ffffff'); g.fillStyle = '#20242c'; g.font = '600 30px Oswald'; g.fillText('Beranda', x + 24, y + 48); g = o; use(o); };
}
// render a shot into an offscreen canvas (for photo / freeze transitions)
function offShot(fn, u) { const c = document.createElement('canvas'); c.width = W; c.height = H; const k = c.getContext('2d'); setLocal(k); fn(u); setLocal(MAIN); return c; }
// "ruang sistem": dark space, one hard spotlight from above (amber)
function setD(spot = AMBER, x = 540, y = 900, floor = 1140) {
  vgrad(0, 0, W, H, '#1c1a22', '#0f0e13');
  // the archive hall: tall shelves of case folders on both sides, receding into the dark
  depth(9, () => {
    [-1, 1].forEach(side => { for (let r = 3; r >= 0; r--) { const sc = 1 - r * .2, w = 170 * sc, x0 = side < 0 ? 20 + r * 92 : W - 20 - r * 92 - w, top = 300 + r * 110, bot = floor - r * 30, rows = 7, rh = (bot - top) / rows;
      rrect(x0, top, w, bot - top, 6, ['#2b2732', '#26232d', '#211e28', '#1c1a22'][r]);
      for (let k = 0; k < rows; k++) { rrect(x0 + 6, top + (k + 1) * rh - 10, w - 12, 8, 2, 'rgba(0,0,0,.4)'); for (let f = 0; f < 5; f++) rrect(x0 + 10 + f * (w - 20) / 5, top + k * rh + 10, (w - 20) / 5 - 5, rh - 24, 3, ['#7a5a3a', '#5a4a3a', '#8a6a44', '#6a5040', '#4a3a30'][(f + k + r) % 5]); }
      g.save(); g.fillStyle = `rgba(15,14,19,${.25 + r * .15})`; g.fillRect(x0, top, w, bot - top); g.restore(); } });
  });
  // polished floor with perspective joints, catching the spot
  vgrad(0, floor, W, H - floor, '#1d1a22', '#0b0a0e');
  for (let i = -9; i <= 9; i++) line([[x + i * 50, floor], [x + i * 230, H]], 2, 'rgba(255,220,170,.06)');
  for (let j = 1; j < 9; j++) { const yy = floor + Math.pow(j / 9, 1.7) * (H - floor); line([[0, yy], [W, yy]], 2, 'rgba(255,220,170,.05)'); }
  g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createLinearGradient(0, 0, 0, floor); gr.addColorStop(0, 'rgba(255,200,120,0)'); gr.addColorStop(1, 'rgba(255,200,120,.12)');
  poly([[x - 70, 0], [x + 70, 0], [x + 400, floor + 40], [x - 400, floor + 40]], gr); g.restore();
  ellipse(x, floor + 40, 430, 70, 'rgba(255,200,120,.12)'); pool(x, floor + 60, 500, 'rgb(255,190,110)', .1);
  for (let i = 0; i < 70; i++) { const px = x - 300 + (i * 211) % 600, py = (i * 397) % floor; ellipse(px + (py / floor) * ((i % 2) ? 60 : -60), py, 2, 2, `rgba(255,230,190,${.12 + (i % 3) * .06})`); }
}
function bigButton(x, y, s = 1, { cracked = 0, glow = 1, label = 'HALAMAN BERIKUTNYA ›' } = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  ellipse(0, 150, 300, 46, 'rgba(0,0,0,.45)');
  rrect(-280, 40, 560, 110, 30, '#2b2830'); rrect(-280, 40, 560, 26, 14, '#3a3640');
  if (cracked < 1) {
    rrect(-240, -60, 480, 130, 36, '#b97416'); rrect(-240, -90, 480, 130, 36, AMBER); vgrad(-240, -90, 480, 50, 'rgba(255,255,255,.28)', 'rgba(255,255,255,0)');
    g.fillStyle = '#3a2a10'; g.font = '600 46px Oswald'; g.textAlign = 'center'; g.fillText(label, 0, -8);
    if (cracked > 0) { g.strokeStyle = '#2a1c0a'; g.lineWidth = 6; g.beginPath(); g.moveTo(-60, -90); g.lineTo(-20, -40); g.lineTo(-50, 0); g.lineTo(10, 40); g.moveTo(-20, -40); g.lineTo(60, -50); g.stroke(); }
  }
  g.restore();
  if (glow) pool(x, y - 20 * s, 420 * s, 'rgb(255,180,58)', .22 * glow);
}
// close-up hand gripping an object (generic grip, LOD 2), wrist from the top-right
function gripHand(x, y, s, skin = SKIN.terang, sleeve = '#4a4e58') {
  g.save(); g.translate(x, y); g.scale(s, s);
  const sh = c => c;
  line([[160, -260], [40, -40]], 120, sleeve);
  ellipse(10, 0, 92, 78, sh(skin));
  for (let i = 0; i < 4; i++) { const yy = -36 + i * 28; rrect(-110, yy, 140, 34, 17, i % 2 ? '#d6b08c' : skin); line([[-40, yy + 6], [-40, yy + 28]], 3, 'rgba(0,0,0,.18)'); }
  rrect(-20, -78, 120, 44, 22, '#dcb592');   // thumb over the top
  g.restore();
}

// —— the shots ——
export function S01(u) { S.S1(); txt('PEMBUAT FITUR INI', 540, 250, 76); txt('MENYESAL…', 540, 340, 96, AMBER); }
export function S02(u) {
  S.setC({ cam: .3 }); depth(10, () => S.bed(1500));
  pool(540, 820, 700, 'rgb(127,227,255)', .22);
  handPhoneCU(g, 540, 820, 470, 900, { sleeve: '#6b7280', thumbT: u, skinCol: SKIN.sawo, screen: feedScreen(u * 220) });
  vignette(.45); grain(22);
}
export function S03(u) {
  S.setA({ cam: .4 });
  const P = headAt(RASKIN19, seated(RASKIN19, { facing: .55, expr: 'menyesal', gaze: [.3, .9], headTilt: .32, rh: [80, 60], hold: 'hp', phoneRot: .6, look: .45 }), 500, 860, 4.6);
  drawChar(g, RASKIN19, P, { rim: { col: SCREEN, dir: [.6, .7], w: 8 }, amb: '#2c3550', ambK: .26, noShadow: true });
  ellipse(588, 845, 40, 26, 'rgba(127,227,255,.22)'); ellipse(668, 845, 40, 26, 'rgba(127,227,255,.22)');   // phone light in the lenses
  S.deskA(1560);
  pool(700, 1250, 520, 'rgb(127,227,255)', .24); shadowFall(620, 1000, 300, 1300, .55);
  vignette(.42); grain(23);
}
export function S04(u) {
  const ph = offShot(S03, .9);
  vgrad(0, 0, W, H, '#2a2622', '#17140f');
  g.save(); g.translate(540, 980); g.rotate(-.03);
  rrect(-470, -620, 940, 1260, 14, '#c9a86a'); rrect(-470, -680, 330, 90, 14, '#c9a86a'); vgrad(-470, -620, 940, 1260, 'rgba(255,255,255,.08)', 'rgba(0,0,0,.18)');
  g.save(); g.rotate(.05); rrect(-330, -470, 620, 900, 6, '#f4efe4'); g.filter = 'grayscale(1) sepia(.7) contrast(1.05)'; g.drawImage(ph, 120, 300, 840, 1220, -310, -450, 580, 840); g.restore();
  rrect(-90, -500, 180, 50, 4, 'rgba(240,230,200,.8)');   // tape
  g.restore();
  stamp('ARSIP KASUS #002', 560, 1560, -.1, '#d9483b', 60);
  vignette(.5); grain(24);
}
export function S05(u) { S.S5(); stamp('2006', 860, 300, .06, '#7a4a1e', 70); rrect(90, 1060, 560, 120, 10, 'rgba(20,16,22,.82)'); txt('AZA RASKIN', 120, 1120, 54, '#f4ead8', 'left'); txt('perancang', 120, 1165, 30, '#cbbfae', 'left', '"Courier Prime"'); }
export function S06(u) {
  S.setB({ cam: .5 });
  // the page pours out of the monitor and keeps going, past the desk and out of frame: "tanpa ujung"
  S.monitor06(540, 520, 1.25, 0);
  const top = 700, k = g; k.save(); k.beginPath(); k.moveTo(330, top); k.lineTo(750, top); k.lineTo(860, H + 40); k.lineTo(220, H + 40); k.closePath(); k.fillStyle = '#f6f3ea'; k.fill(); k.clip();
  for (let i = 0; i < 14; i++) { const yy = top + 40 + i * 92 - u * 92; const sp = 1 + (yy - top) / 1600; rrect(540 - 190 * sp, yy, 330 * sp - (i % 3) * 40, 14 * sp, 5, '#cfd5da'); if (i % 4 === 1) rrect(540 - 190 * sp, yy - 50 * sp, 380 * sp, 40 * sp, 8, '#8fb0cf'); }
  k.restore(); vgrad(220, top, 640, 120, 'rgba(0,0,0,.12)', 'rgba(0,0,0,0)');
  shadowFall(540, 700, 400, 1500, .3); vignette(.3); grain(26);
}
export function S07(u) {
  S.setB({ cam: .2 });
  S.monitor06(860, 1000, 1.5, 0);
  // the cursor drags the amber button away: niatnya baik
  const bx = lerp(0, -40, u), by = lerp(0, -20, u);
  g.save(); g.globalAlpha = 1 - u * .8; rrect(860 + 40 * 1.5 + bx, 1000 + 104 * 1.5 + by, 140 * 1.5, 34 * 1.5, 12, AMBER); g.restore();
  poly([[1040 + bx, 1160 + by], [1040 + bx, 1230 + by], [1058 + bx, 1214 + by], [1072 + bx, 1244 + by], [1084 + bx, 1238 + by], [1070 + bx, 1208 + by], [1094 + bx, 1208 + by]], '#fdfcf7');
  const P = headAt(RASKIN06, seated(RASKIN06, { facing: .75, expr: 'senang', gaze: [.8, .1], lean: .12, rh: [110, 40], look: .65 }), 330, 820, 2.9);
  drawChar(g, RASKIN06, P, { rim: { col: '#fff1d0', dir: [-.95, -.25], w: 6 }, ...DAY, noShadow: true });
  S.deskB(1560, 1420);
  vignette(.25); grain(27);
}
// the ordinary 2006 person at home in the evening: his own room (not Raskin's office)
function setE({ cam = 0 } = {}) {
  vgrad(0, 0, W, H, '#a8b79c', '#869882'); hgrad(0, 0, W, H, 'rgba(0,0,0,.12)', 'rgba(255,200,140,.06)');
  depth(6, k => { const o = -cam * 28;
    rrect(600 + o, 230, 400, 500, 8, '#5b4a3a'); vgrad(620 + o, 250, 360, 460, '#f0a070', '#6c5c8c');
    poly([[620 + o, 610], [700 + o, 560], [760 + o, 600], [840 + o, 540], [980 + o, 590], [980 + o, 710], [620 + o, 710]], '#3a3448');
    for (let i = 0; i < 8; i++) rrect(650 + o + i * 40, 630 + (i % 3) * 20, 10, 12, 2, '#ffd58a');
    poly([[590 + o, 220], [720 + o, 220], [690 + o, 760], [580 + o, 760]], '#b55a48'); poly([[880 + o, 220], [1010 + o, 220], [1020 + o, 760], [910 + o, 760]], '#b55a48');
    for (let i = 0; i < 4; i++) { line([[610 + o + i * 28, 230], [600 + o + i * 26, 750]], 4, 'rgba(0,0,0,.15)'); line([[900 + o + i * 28, 230], [920 + o + i * 26, 750]], 4, 'rgba(0,0,0,.15)'); }
    rrect(110 + o, 280, 210, 290, 4, '#f3efe6'); rrect(110 + o, 280, 210, 74, 4, '#c0553a'); k.fillStyle = '#fff'; k.font = '600 46px Oswald'; k.textAlign = 'center'; k.fillText('2006', 215 + o, 334); k.textAlign = 'left';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) rrect(124 + o + c * 38, 372 + r * 46, 30, 36, 2, r === 2 && c === 3 ? '#e3b54a' : '#e1dbcf');
    rrect(370 + o, 300, 180, 140, 6, '#6a4a34'); rrect(382 + o, 312, 156, 116, 3, '#cdb88e'); ellipse(430 + o, 380, 20, 22, '#7a5a42'); ellipse(490 + o, 376, 22, 24, '#5a4a3a');
    rrect(0, 1040, W, 18, 0, 'rgba(0,0,0,.14)');
  });
  pool(980, 1140, 520, 'rgb(255,190,110)', .3);
}
function crt(x, y, s = 1, screen) {
  g.save(); g.translate(x, y); g.scale(s, s);
  poly([[-200, -170], [200, -170], [150, -230], [-150, -230]], '#cfc3ab'); rrect(-60, 170, 120, 40, 6, '#bdb09a'); rrect(-140, 200, 280, 26, 10, '#c9bca6');
  rrect(-230, -190, 460, 380, 26, '#e0d5bf'); vgrad(-230, -190, 460, 60, 'rgba(255,255,255,.18)', 'rgba(255,255,255,0)');
  rrect(-196, -160, 392, 300, 22, '#20262c'); g.save(); g.beginPath(); g.roundRect(-188, -152, 376, 284, 26); g.clip(); screen(-188, -152, 376, 284);
  const gr = g.createRadialGradient(-60, -80, 20, 0, 0, 260); gr.addColorStop(0, 'rgba(255,255,255,.18)'); gr.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = gr; g.fillRect(-188, -152, 376, 284);
  for (let i = 0; i < 70; i++) g.fillRect(-188, -152 + i * 4.1, 376, 1), g.fillStyle = 'rgba(0,0,0,.05)';
  g.restore(); ellipse(170, 168, 5, 5, '#6ad06a');
  g.restore();
}
function page06(ctxX, ctxY, w, h, { page = 1, button = 1, big = false } = {}) {
  rrect(ctxX, ctxY, w, h, 0, '#f4f2ec'); rrect(ctxX, ctxY, w, h * .09, 0, '#2f5aa8'); rrect(ctxX, ctxY + h * .09, w, h * .07, 0, '#dcd8cf'); rrect(ctxX + w * .04, ctxY + h * .105, w * .7, h * .045, 4, '#ffffff');
  [0, 1, 2].forEach(i => rrect(ctxX + w * (.82 + i * .055), ctxY + h * .025, w * .04, h * .04, 3, ['#e8b84a', '#7fbf6a', '#d9483b'][i]));
  rrect(ctxX + w * .05, ctxY + h * .2, w * .4, h * .06, 4, '#c0553a');
  for (let i = 0; i < 3; i++) { rrect(ctxX + w * .05, ctxY + h * (.3 + i * .17), w * .26, h * .13, 4, FEED[i + 1]); rrect(ctxX + w * .35, ctxY + h * (.31 + i * .17), w * .55, h * .025, 3, '#5a6878'); rrect(ctxX + w * .35, ctxY + h * (.36 + i * .17), w * .45, h * .02, 3, '#b7c0c8'); rrect(ctxX + w * .35, ctxY + h * (.395 + i * .17), w * .5, h * .02, 3, '#b7c0c8'); }
  if (button) { g.save(); g.globalAlpha = button; rrect(ctxX + w * .58, ctxY + h * .84, w * .36, h * .1, 8, AMBER); g.fillStyle = '#3a2a10'; g.font = `600 ${Math.round(h * (big ? .055 : .05))}px Oswald`; g.textAlign = 'center'; g.fillText(`Hal ${page + 1} ›`, ctxX + w * .76, ctxY + h * .91); g.textAlign = 'left'; g.restore(); }
  for (let i = 0; i < 4; i++) { g.fillStyle = i + 1 === page ? '#2f5aa8' : '#8a96a3'; g.font = `600 ${Math.round(h * .04)}px Oswald`; g.fillText(String(i + 1), ctxX + w * (.07 + i * .08), ctxY + h * .91); }
}
function handsOver(J, P, skin) { [[J.eL, J.wL], [J.eR, J.wR]].forEach(([e, w]) => { const sx = p => [P.x + p[0] * P.s, P.y + p[1] * P.s], W0 = sx(w), E0 = sx(e), m = [W0[0] + (E0[0] - W0[0]) * .3, W0[1] + (E0[1] - W0[1]) * .3]; line([m, W0], 13 * P.s, skin); ellipse(W0[0], W0[1], 11 * P.s, 10 * P.s, skin); }); }
export function S08(u) {
  setE();
  crt(330, 960, 1.05, (x, y, w, h) => page06(x, y, w, h, { page: 1 }));
  rrect(560, 1010, 70, 160, 8, '#d6cbb5'); ellipse(595, 1040, 18, 18, '#a89c86');   // speaker
  const P = seated(ORANG06, { x: 790, y: 1560, s: 1.85, facing: -.8, expr: 'lelah', gaze: [-.8, .1], lean: .14, lh: [-118, 134], rh: [-62, 142], look: -.7 }, 190);
  const J = drawChar(g, ORANG06, P, { rim: { col: '#ffcf96', dir: [.9, -.3], w: 6 }, amb: '#e8c8a0', ambK: .1, noShadow: true });
  S.deskB(1395, 1190);
  rrect(250, 1186, 300, 36, 10, '#d6c9b1'); for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) rrect(262 + c * 23.5, 1191 + r * 10, 19, 7, 2, '#c4b69c');
  rrect(610, 1196, 66, 30, 15, '#d6c9b1'); line([[640, 1196], [620, 1150], [560, 1130]], 3, '#9e9178'); rrect(590, 1214, 120, 10, 4, 'rgba(0,0,0,.2)');   // mouse on a pad
  handsOver(J, P, '#b98a64');
  // desk lamp (key light, right) and a glass of tea
  line([[960, 1200], [990, 1020], [930, 960]], 10, '#3a3a40'); poly([[880, 930], [980, 930], [960, 990], [900, 990]], '#3a3a40'); ellipse(930, 992, 34, 8, '#ffe2a8');
  rrect(110, 1110, 64, 90, 10, 'rgba(240,200,140,.8)'); vgrad(110, 1110, 64, 30, 'rgba(255,255,255,.4)', 'rgba(255,255,255,0)');
  depth(16, () => { ellipse(-30, 1760, 170, 260, '#4f6a44'); rrect(820, 1660, 320, 300, 18, '#5a6e8a'); });
  shadowFall(900, 1000, 500, 1600, .3); vignette(.3); grain(28);
}
export function S09(u, noText = false) {
  setE({ cam: .6 });
  const page = Math.min(3, 1 + Math.floor(u * 3));
  crt(540, 960, 2.15, (x, y, w, h) => page06(x, y, w, h, { page, big: true }));
  // the pointing-hand cursor on the button
  const cx = 540 + .76 * 376 * 2.15 - 188 * 2.15 + 10, cy = 960 + (-152 + .9 * 284) * 2.15 + 20;
  g.save(); g.translate(cx, cy); g.scale(1.6, 1.6); rrect(-6, -28, 12, 30, 6, '#fdfcf7'); rrect(-14, -4, 30, 26, 8, '#fdfcf7'); g.strokeStyle = '#20262c'; g.lineWidth = 2.5; g.strokeRect(-6, -28, 12, 28); g.restore();
  pool(cx, cy - 40, 220, 'rgb(255,180,58)', .22 * (1 + Math.sin(u * 30)) / 2 + .1);
  S.deskB(1640, 1500);
  if (!noText) txt(['1', '1 · 2', '1 · 2 · 3'][page - 1], 540, 250, 96, AMBER);
  vignette(.35); grain(29);
}
export function S10(u) {
  const fr = offShot(u2 => S09(u2, true), .99);
  g.save(); g.filter = 'grayscale(1) brightness(.55)'; g.drawImage(fr, 0, 0); g.restore();
  rrect(560, 1150, 360, 100, 20, AMBER); g.fillStyle = '#3a2a10'; g.font = '600 50px Oswald'; g.textAlign = 'center'; g.fillText('Hal 4 ›', 740, 1216); g.textAlign = 'left';
  pool(740, 1200, 420, 'rgb(255,180,58)', .35);
  txt('TAPI…', 540, 300, 110); vignette(.5); grain(30);
}
export function S11(u) { setD(); bigButton(540, 980, 1.05); txt('TOMBOL KECIL', 540, 330, 84); txt('= REM', 540, 430, 96, AMBER); vignette(.45); grain(31); }
export function S12(u) {
  // the pause at the end of the page: the "Hal 2" button on his monitor, the cursor hovering over it but not clicking,
  // his hand still on the mouse, eyes up, deciding; the wall clock ticks (same home set as S08/S09)
  setE({ cam: .3 });
  { const cx = 470, cy = 215, r = 82; ellipse(cx, cy, r, r, '#f3ece0'); g.save(); g.strokeStyle = '#4a3a2a'; g.lineWidth = 6; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore();
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; line([[cx + Math.cos(a) * 66, cy + Math.sin(a) * 66], [cx + Math.cos(a) * 74, cy + Math.sin(a) * 74]], 4, '#4a3a2a'); }
    line([[cx, cy], [cx, cy - 48]], 7, '#4a3a2a'); line([[cx, cy], [cx + 40, cy + 18]], 6, '#4a3a2a'); const sa = -1.57 + u * 1.2; line([[cx, cy], [cx + Math.cos(sa) * 60, cy + Math.sin(sa) * 60]], 3, '#c0553a'); }
  crt(300, 1012, 1.2, (x, y, w, h) => page06(x, y, w, h, { page: 1 }));
  // cursor parked on the button, a soft amber pulse = the decision point
  const bx = 300 + (-188 + .76 * 376) * 1.2, by = 1012 + (-152 + .89 * 284) * 1.2;
  pool(bx, by, 150, 'rgb(255,180,58)', .22 + .1 * Math.sin(u * 12));
  poly([[bx + 4, by - 4], [bx + 4, by + 46], [bx + 16, by + 35], [bx + 26, by + 56], [bx + 34, by + 52], [bx + 24, by + 31], [bx + 40, by + 31]], '#fdfcf7'); g.save(); g.strokeStyle = '#20262c'; g.lineWidth = 2; g.beginPath(); g.moveTo(bx + 4, by - 4); g.lineTo(bx + 4, by + 46); g.lineTo(bx + 16, by + 35); g.lineTo(bx + 26, by + 56); g.lineTo(bx + 34, by + 52); g.lineTo(bx + 24, by + 31); g.lineTo(bx + 40, by + 31); g.closePath(); g.stroke(); g.restore();
  const P = seated(ORANG06, { x: 860, y: 1780, s: 2.3, facing: -.8, expr: 'bingung', gaze: [-.3, -.95], headTilt: -.08, lean: .1, lh: [-120, 150], rh: [-70, 158], look: -.6 }, 190);
  const J = drawChar(g, ORANG06, P, { rim: { col: '#ffcf96', dir: [.9, -.3], w: 6 }, amb: '#e8c8a0', ambK: .1, noShadow: true });
  S.deskB(1520, 1290);
  // keyboard under the left hand, mouse under the right, placed from his actual wrist positions
  const sx = q => [P.x + q[0] * P.s, P.y + q[1] * P.s], wl = sx(J.wL), wr = sx(J.wR);
  rrect(wl[0] - 300, wl[1] + 6, 330, 40, 10, '#d6c9b1'); for (let r = 0; r < 3; r++) for (let c = 0; c < 13; c++) rrect(wl[0] - 290 + c * 24.5, wl[1] + 12 + r * 11, 20, 7, 2, '#c4b69c');
  rrect(wr[0] - 50, wr[1] + 24, 160, 14, 5, 'rgba(0,0,0,.2)'); rrect(wr[0] - 36, wr[1] - 4, 74, 36, 18, '#d6c9b1'); line([[wr[0] - 10, wr[1] - 4], [wr[0] - 40, wr[1] - 50], [wr[0] - 110, wr[1] - 60]], 3, '#9e9178');
  handsOver(J, P, '#b98a64');
  rrect(960, 1214, 56, 80, 10, 'rgba(240,200,140,.8)'); contact(988, 1294, 40, .2);   // the same glass of tea as S08
  pool(1000, 1100, 420, 'rgb(255,190,110)', .22); shadowFall(900, 900, 500, 1600, .25); vignette(.3); grain(32);
}
export function S13(u) {
  // split screen with a crack: LANJUT (left, night, cyan) | UDAHAN (right, day, amber)
  const half = (fn, x0) => { g.save(); g.beginPath(); g.rect(x0, 0, W / 2, H); g.clip(); fn(); g.restore(); };
  half(() => { vgrad(0, 0, W, H, '#232838', '#151821');
    const P = seated(ORANG06, { x: 300, y: 1500, s: 1.6, facing: .7, expr: 'lelah', gaze: [.7, .4], rh: [90, 10], hold: 'hp', phoneRot: .4, look: .6 }, 190);
    rrect(170, 1040, 34, 290, 10, '#2c2f3a'); rrect(160, 1300, 230, 30, 12, '#363a46'); line([[270, 1330], [270, 1480]], 14, '#2c2f3a'); line([[190, 1495], [350, 1495]], 12, '#2c2f3a');
    drawChar(g, ORANG06, P, { rim: RIM_PHONE, ...NIGHT, noShadow: true }); pool(420, 1000, 300, 'rgb(127,227,255)', .3); }, 0);
  half(() => { vgrad(0, 0, W, H, '#ecdcbf', '#d6c19c'); pool(900, 500, 600, 'rgb(255,230,180)', .3);
    drawChar(g, ORANG06, { x: 800, y: 1500, s: 1.6, facing: -.2, expr: 'senyum', lh: [-40, -150], rh: [40, -150], look: -.1 }, { rim: { col: '#fff1d0', dir: [.7, -.7], w: 5 }, ...DAY }); }, W / 2);
  line([[540, 0], [520, 300], [560, 620], [515, 980], [565, 1340], [530, 1920]], 10, '#0f0e13');
  txt('LANJUT ›', 270, 300, 80, SCREEN); txt('UDAHAN', 810, 300, 80, AMBER);
  vignette(.35); grain(33);
}
export function S14(u) {
  setD();
  bigButton(540, 980, 1.05, { cracked: 1, glow: .5 });
  pool(540, 930, 260, 'rgb(255,180,58)', .35 * (1 - u * .6));   // light leaking from the break
  [[-160, -40, .4], [-40, 30, -.6], [90, -20, .9], [190, 60, -.3], [-90, 120, .2], [40, -80, .7], [-220, 40, -.9]].forEach(([dx, dy, r], i) => {
    const px = 540 + dx * (1 + u * .6), py = 900 + dy + u * 300 * (1 + i * .15);
    line([[px, py - 60 - i * 6], [px, py]], 10, 'rgba(255,180,58,.18)');   // motion streak
    g.save(); g.translate(px, py); g.rotate(r + u * r * 3); poly([[-46, -28], [38, -38], [56, 18], [-28, 38]], i % 2 ? AMBER : '#b97416'); poly([[-46, -28], [38, -38], [30, -26], [-38, -18]], 'rgba(255,255,255,.35)'); g.restore();
  });
  txt('HILANG.', 540, 330, 100); vignette(.5); grain(34);
}
export function S15(u) {
  vgrad(0, 0, W, H, '#1d1b2a', '#0e0d12');
  // far: a skyline of giant screens, each a column of glowing feed; mid: loose cards drifting in the dark
  depth(12, () => { for (let i = 0; i < 8; i++) { const x = -40 + i * 150, h = 420 + (i * 137 % 360), y = 1120 - h; rrect(x, y, 120, h, 18, '#141320'); for (let r = 0; r < h / 70 - 1; r++) rrect(x + 12, y + 14 + r * 70 - (u * 70 * (i % 2 ? 1 : -1) % 70), 96, 56, 8, FEED[(i + r) % FEED.length]); } });
  g.save(); g.fillStyle = 'rgba(14,13,20,.45)'; g.fillRect(0, 0, W, 1180); g.restore();
  pool(540, 1120, 700, 'rgb(127,227,255)', .14);
  depth(4, () => { [[140, 560, .3], [880, 420, -.2], [760, 760, .15], [260, 860, -.25]].forEach(([x, y, r], i) => { g.save(); g.translate(x, y - u * 40); g.rotate(r); card(-80, -100, 160, 190, i + 2); g.restore(); }); });
  for (let i = 0; i < 6; i++) { const x = ((i * 300 - u * 300) % 1800 + 1800) % 1800 - 300; card(x, 1180, 280, 330, i); }
  vgrad(0, 1500, W, 420, 'rgba(14,13,18,0)', 'rgba(14,13,18,1)');
  for (let i = 0; i < 6; i++) { const x = ((i * 300 - u * 300) % 1800 + 1800) % 1800 - 300; g.save(); g.globalAlpha = .18; g.scale(1, -1); card(x, -1180 - 330 - 340, 280, 330, i); g.restore(); }   // reflection
  const w = walk(1.2 + u * .9, { v: 150, T: 1.0, lift: 18 });
  drawChar(g, KAMU, { x: 470, y: 1180, s: 1.5, facing: 1, look: .9, expr: 'lelah', gaze: [.5, .8], lf: w.lf, rf: w.rf, bob: w.bob, rh: [70, 20], hold: 'hp', phoneRot: .4, lh: [-6 - w.swing * 30, 150] }, { rim: RIM_PHONE, ...NIGHT });
  pool(560, 980, 300, 'rgb(127,227,255)', .26);
  hgrad(0, 0, 160, H, 'rgba(14,13,18,.9)', 'rgba(14,13,18,0)'); hgrad(920, 0, 160, H, 'rgba(14,13,18,0)', 'rgba(14,13,18,.9)');
  txt('TANPA UJUNG', 540, 330, 84, SCREEN); vignette(.4); grain(35);
}
// a tunnel whose four walls are tiled with feed cards, streaming toward the viewer; inner rect = the far opening
function tunnel(u, cx, cy, pw, ph, alpha = .55) {
  const inner = [[cx - pw, cy - ph], [cx + pw, cy - ph], [cx + pw, cy + ph], [cx - pw, cy + ph]], outer = [[-60, -60], [W + 60, -60], [W + 60, H + 60], [-60, H + 60]];
  const L = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const shade = ['#1f1c28', '#24212e', '#16141c', '#211e2b'];
  [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b], wi) => {
    poly([outer[a], outer[b], inner[b], inner[a]], shade[wi]);
    const cols = wi % 2 ? 4 : 3, rows = 9;
    for (let k = 0; k < rows; k++) for (let c = 0; c < cols; c++) {
      const tt = ((k + u * 2) % rows) / rows, t0 = 1 - Math.pow(1 - tt, 2.2), t1 = 1 - Math.pow(1 - Math.min(1, tt + .85 / rows), 2.2);
      const Q = (s, t) => L(L(outer[a], outer[b], s), L(inner[a], inner[b], s), t), s0 = (c + .08) / cols, s1 = (c + .92) / cols;
      g.save(); g.globalAlpha = (alpha * (1 - t0) + .05) * .55; poly([Q(s0, t0), Q(s1, t0), Q(s1, t1), Q(s0, t1)], FEED[(k + c + wi) % FEED.length]); g.restore();
    }
  });
  pool(cx, cy, Math.max(pw, ph) * 2.2, 'rgb(127,227,255)', .3);
}
export function S16(u) {
  vgrad(0, 0, W, H, '#1a1822', '#0e0d12');
  const pw = lerp(300, 170, u), ph = pw * 1.95;
  tunnel(u, 540, 900, pw, ph);
  const icon = (x, y, r, kind) => { pool(x, y, r * 2.2, 'rgb(255,255,255)', .06); rrect(x - r, y - r, r * 2, r * 2, r * .45, ['#4a6e9a', '#c0553a', '#8a6a8e', '#5a7f6a'][kind]); vgrad(x - r, y - r, r * 2, r * .7, 'rgba(255,255,255,.22)', 'rgba(255,255,255,0)'); g.fillStyle = '#f4ead8'; g.beginPath(); if (kind === 0) g.ellipse(x, y, r * .5, r * .38, 0, 0, 7); else if (kind === 1) { g.arc(x - r * .2, y - r * .1, r * .22, 0, 7); g.arc(x + r * .2, y - r * .1, r * .22, 0, 7); g.moveTo(x - r * .42, y); g.lineTo(x, y + r * .4); g.lineTo(x + r * .42, y); } else if (kind === 2) { g.roundRect(x - r * .45, y - r * .3, r * .9, r * .65, 6); } else { g.arc(x, y + r * .2, r * .2, 0, 7); g.rect(x + r * .1, y - r * .45, r * .1, r * .62); } g.fill(); };
  [[120, 420, 74, 0], [170, 1260, 84, 1], [110, 1680, 64, 2], [960, 360, 68, 3], [920, 1160, 80, 0], [980, 1600, 72, 1], [300, 720, 46, 2], [790, 1300, 42, 3], [540, 180, 56, 1], [540, 1740, 60, 0]].forEach(a => icon(...a));
  rrect(540 - pw, 900 - ph, pw * 2, ph * 2, pw * .25, '#0c0d11'); g.save(); g.beginPath(); g.roundRect(540 - pw + 12, 900 - ph + 12, pw * 2 - 24, ph * 2 - 24, pw * .2); g.clip(); feedScreen(u * 400)(g, 540 - pw + 12, 900 - ph + 12, pw * 2 - 24, ph * 2 - 24); g.restore();
  vignette(.45); grain(36);
}
export function S17(u) { S.S17(); txt(u < .45 ? '23.12' : '01.47', 540, 1150, 90, '#ff9f6a'); }
export function S18(u) {
  // where the money goes: each ad that passes on YOUR screen sends coins up to the platform's tower in the city
  vgrad(0, 0, W, H, '#1b1f33', '#0f1018');
  depth(10, () => { for (let i = 0; i < 12; i++) { const x = -30 + i * 96, h = 260 + (i * 173 % 420); rrect(x, 1000 - h, 84, h, 6, '#22263a'); for (let r = 0; r < h / 40; r++) for (let c = 0; c < 3; c++) if ((i + r + c) % 3) rrect(x + 10 + c * 24, 1000 - h + 14 + r * 40, 14, 18, 2, (r + c) % 4 ? '#3a4060' : '#ffd58a'); } });
  // the platform tower: glass floors light up as the money arrives
  const tx = 540, ty = 180, tw = 300, th = 820, lit = .35 + u * .5;
  rrect(tx - tw / 2, ty, tw, th, 16, '#1e2a40'); hgrad(tx - tw / 2, ty, tw, th, 'rgba(127,227,255,.08)', 'rgba(0,0,0,.25)');
  for (let r = 0; r < 18; r++) { const on = r / 18 > 1 - lit; rrect(tx - tw / 2 + 18, ty + 30 + r * 43, tw - 36, 28, 4, on ? 'rgba(127,227,255,.75)' : 'rgba(127,227,255,.12)'); }
  rrect(tx - 60, ty - 110, 120, 120, 30, '#2a3550'); rrect(tx - 34, ty - 84, 68, 14, 5, SCREEN); rrect(tx - 34, ty - 60, 68, 14, 5, SCREEN); rrect(tx - 34, ty - 36, 40, 14, 5, SCREEN);
  pool(tx, ty + 200, 520, 'rgb(127,227,255)', .2);
  // the phone (POV, small) with the ad card glowing amber
  handPhoneCU(g, 540, 1460, 300, 560, { sleeve: '#6b7280', skinCol: SKIN.sawo, thumbT: .5, screen: feedScreen(u * 440 + 120, 2) });
  // coins rising along a curve from the phone to the tower
  for (let i = 0; i < 9; i++) { const t = (u * 1.6 + i / 9) % 1, x = 540 + Math.sin(t * 3.14) * 160 * (i % 2 ? 1 : -1), y = lerp(1250, ty + th, t); ellipse(x, y, 22, 22, '#e7b84a'); ellipse(x, y, 14, 14, '#f2cd6a'); pool(x, y, 50, 'rgb(255,200,90)', .2); }
  txt('IKLAN TERJUAL', 540, 1100, 56, AMBER); txt('→ uangnya ke platform', 540, 1150, 32, '#cbbfae', 'center', '"Courier Prime"');
  vignette(.42); grain(38);
}
export function S19(u) {
  S.setA({ cam: -.4 });
  // surrounded by screens: three monitors on the desk throw cyan light
  [[220, 940, 300, 210], [540, 880, 340, 240], [860, 940, 300, 210]].forEach(([x, y, w, h]) => { rrect(x - w / 2, y - h / 2, w, h, 12, '#15171d'); rrect(x - w / 2 + 12, y - h / 2 + 12, w - 24, h - 24, 6, '#7fd6ee'); for (let i = 0; i < 4; i++) rrect(x - w / 2 + 30, y - h / 2 + 30 + i * 40, w - 90, 18, 5, 'rgba(255,255,255,.5)'); pool(x, y, 300, 'rgb(127,227,255)', .14); });
  const P = headAt(RASKIN19, seated(RASKIN19, { facing: 0, expr: 'lelah', gaze: [0, 0], headTilt: 0, rh: [10, 120], lh: [-10, 120], look: 0 }), 540, 1220, 2.2);
  drawChar(g, RASKIN19, P, { rim: { col: SCREEN, dir: [0, -1], w: 6 }, amb: '#2c3550', ambK: .3, noShadow: true });
  S.deskA(1560);
  stamp('2019', 540, 330, -.05, '#8fd8ee', 76); vignette(.45); grain(39);
}
export function S20(u) {
  // the deletion as Raskin actually did it: select the line of code that draws the button, delete it; on the page the button breaks into pixels and the page simply keeps going
  S.setB({ cam: .3 }); g.save(); g.fillStyle = 'rgba(30,24,20,.35)'; g.fillRect(0, 0, W, H); g.restore();
  rrect(40, 520, 1000, 1240, 30, '#d9ccb3'); rrect(70, 550, 940, 1180, 12, '#1e2128');
  // editor (top half)
  const code = [['<div class="hasil">', '#8fc0b0'], ['  <ul class="daftar">…</ul>', '#cfd5da'], ['  <a class="berikut"', '#e7b84a'], ['     href="/hal/2">', '#e7b84a'], ['    Halaman berikutnya ›</a>', '#e7b84a'], ['</div>', '#8fc0b0']];
  const sel = Math.min(1, u * 2), gone = Math.max(0, u * 2 - 1);
  g.font = '700 30px "Courier Prime"';
  code.forEach(([l, c], i) => { const y = 640 + i * 54 - (i > 4 ? gone * 162 : 0); if (i >= 2 && i <= 4) { if (gone >= 1) return; rrect(90, y - 34, 860 * sel, 46, 4, 'rgba(70,120,220,.55)'); g.globalAlpha = 1 - gone; } g.fillStyle = '#6a7380'; g.fillText(String(i + 41), 92, y); g.fillStyle = c; g.fillText(l, 160, y); g.globalAlpha = 1; });
  rrect(70, 980, 940, 6, 0, '#2c3038');
  // live page (bottom half): the button dissolves into pixels and drifts off; the list continues below
  page06(90, 1000, 900, 700, { page: 1, button: 1 - gone });
  if (gone > 0) for (let i = 0; i < 60; i++) { const bx = 90 + 900 * .58 + (i % 12) * 27, by = 1000 + 700 * .84 + Math.floor(i / 12) * 14; rrect(bx + gone * (i * 7 % 60 - 20), by - gone * (40 + i * 5 % 120), 12, 12, 2, `rgba(255,180,58,${1 - gone * .8})`); }
  rrect(60, 200, 960, 260, 14, 'rgba(20,16,22,.85)'); txt('"Dengan menghapus', 540, 300, 64, '#f4ead8'); txt('tanda berhenti,', 540, 390, 64, AMBER);
  vignette(.35); grain(40);
}
export function S21(u) {
  // a night plaza in the city: everyone, heads down; the strings run from their phones up to one hand
  vgrad(0, 0, W, H, '#1a1c2c', '#0e0d12');
  depth(10, () => { for (let i = 0; i < 9; i++) { const x = -40 + i * 130, h = 520 + (i * 151 % 400); rrect(x, 1460 - h, 118, h, 6, '#22253a'); for (let r = 0; r < h / 46; r++) for (let c = 0; c < 3; c++) if ((i * 3 + r + c) % 4) rrect(x + 12 + c * 34, 1460 - h + 16 + r * 46, 22, 24, 2, (r + c + i) % 5 ? '#33385a' : '#ffd58a'); }
    rrect(330, 760, 420, 240, 10, '#141520'); rrect(344, 774, 392, 212, 6, '#7fd6ee'); for (let i = 0; i < 4; i++) rrect(370, 800 + i * 44, 300, 22, 6, 'rgba(255,255,255,.55)'); });   // a big screen on a building
  pool(540, 880, 500, 'rgb(127,227,255)', .14);
  vgrad(0, 1460, W, H - 1460, '#1b1a24', '#0b0a0e'); for (let j = 1; j < 6; j++) line([[0, 1460 + j * 80], [W, 1460 + j * 80]], 2, 'rgba(255,255,255,.04)');
  [[90, 1280], [990, 1300]].forEach(([x, y]) => { line([[x, y], [x, 1720]], 10, '#2a2a36'); ellipse(x, y, 30, 18, '#ffcf8a'); pool(x, y, 260, 'rgb(255,190,110)', .22); ellipse(x, 1730, 120, 18, 'rgba(255,190,110,.12)'); });
  const crowd = [['pria', 150, 1680], ['ibu', 330, 1730], ['kakek', 520, 1690], ['adik_pr', 690, 1750], ['kakak', 850, 1680], ['wanita', 980, 1730]];
  const hand = [540, 300];
  crowd.forEach(([k, x, y], i) => {
    const P = { x, y, s: 1.0, facing: i % 2 ? -.15 : .15, expr: 'lelah', gaze: [0, 1], headTilt: .15 * (i % 2 ? -1 : 1), rh: [i % 2 ? -10 : 30, 40], hold: 'hp', phoneRot: 0, look: 0 };
    const J = drawChar(g, PRESETS[k], P, { rim: RIM_PHONE, ...NIGHT });
    const ph = [x + J.wR[0] * P.s, y + J.wR[1] * P.s - 20]; line([ph, [hand[0] + (x - 540) * .25, hand[1] + 120]], 2.5, 'rgba(160,230,255,.55)');
    pool(ph[0], ph[1], 120, 'rgb(127,227,255)', .2);
  });
  rrect(380, 400, 320, 26, 12, '#8a6a4a'); rrect(527, 330, 26, 200, 12, '#8a6a4a');
  gripHand(560, 360, 1.3);
  rrect(60, 520, 960, 330, 14, 'rgba(20,16,22,.85)'); txt('saya bisa membuat kamu', 540, 620, 60); txt('melakukan apa yang', 540, 700, 60); txt('SAYA MAU."', 540, 800, 76, SCREEN);
  vignette(.4); grain(41);
}
export function S22(u) {
  S.setA({ cam: .2 });
  const light = 1 - u;
  const P = headAt(RASKIN19, seated(RASKIN19, { facing: .55, expr: 'menyesal', gaze: [.4, .8], headTilt: .25, rh: [100, 70], lh: [90, 80], look: .5 }), 430, 820, 3.0);
  drawChar(g, RASKIN19, P, { rim: { col: SCREEN, dir: [.75, .4], w: 6 * light + 1 }, amb: '#1a1f30', ambK: .3 + .3 * u, noShadow: true });
  // laptop closing: lid angle from open to shut
  const ang = lerp(0, 1.25, u); g.save(); g.translate(820, 1318); rrect(-230, -10, 400, 20, 6, '#5a5e6b'); g.rotate(-ang); poly([[-230, 0], [-230 + 260 * Math.cos(0.1), -250], [-210 + 260 * Math.cos(0.1), -256], [-210, 0]], '#7a7f8e'); g.restore();
  pool(560, 1080, 320, 'rgb(127,227,255)', .35 * light);
  pool(700, 1100, 500, 'rgb(127,227,255)', .3 * light);
  S.deskA(1330); g.save(); g.fillStyle = `rgba(0,0,0,${.45 * u})`; g.fillRect(0, 0, W, H); g.restore();
  vignette(.5); grain(42);
}
export function S23(u) {
  // back in YOUR room: the phone in your hand, out of focus; this video's own progress bar sharp across it
  const bgc = offShot(S02, .6); g.save(); g.filter = 'blur(14px) brightness(.55)'; g.drawImage(bgc, 0, 0); g.restore();
  rrect(80, 820, 920, 200, 26, 'rgba(14,13,18,.7)');
  const p = lerp(.86, .9, u);
  rrect(140, 900, 800, 30, 15, 'rgba(255,255,255,.22)'); rrect(140, 900, 800 * p, 30, 15, '#f4ead8'); pool(140 + 800 * p, 915, 90, 'rgb(255,255,255)', .3); ellipse(140 + 800 * p, 915, 24, 24, '#ffffff');
  txt('VIDEO INI', 140, 870, 34, '#cbbfae', 'left', '"Courier Prime"'); txt(`0:${String(Math.round(38 + u * 2)).padStart(2, '0')} / 0:44`, 940, 980, 34, '#cbbfae', 'right', '"Courier Prime"');
  vignette(.4); grain(43);
}
export function S24(u) {
  // the camera pulls back: behind the finished bar, the feed is a tunnel of cards that never ends
  vgrad(0, 0, W, H, '#16151c', '#0e0d12');
  tunnel(u, 540, 720, 120, 230, .75);
  rrect(420, 490, 240, 460, 30, '#0c0d11'); g.save(); g.beginPath(); g.roundRect(432, 502, 216, 436, 24); g.clip(); feedScreen(u * 600)(g, 432, 502, 216, 436); g.restore();
  rrect(80, 1010, 920, 200, 26, 'rgba(14,13,18,.78)'); rrect(140, 1070, 800, 30, 15, '#f4ead8'); ellipse(940, 1085, 24, 24, '#ffffff'); txt('VIDEO: SELESAI', 140, 1050, 34, '#cbbfae', 'left', '"Courier Prime"'); txt('FEED KAMU: ∞', 940, 1170, 48, SCREEN, 'right');
  vignette(.45); grain(44);
}
export function S25(u) {
  S.setC({ cam: -.2 }); depth(10, () => S.bed(1500));
  pool(540, 820, 700, 'rgb(127,227,255)', .2 * (1 - u * .5));
  handPhoneCU(g, 540, 820, 470, 900, { sleeve: '#6b7280', thumbT: .2, skinCol: SKIN.sawo, screen: (c, x, y, w, h) => { feedScreen(660)(c, x, y, w, h); const o = g; g = c; use(c); rrect(x + 30, y + h * .42, w - 60, 110, 24, AMBER); g.fillStyle = '#3a2a10'; g.font = '600 40px Oswald'; g.textAlign = 'center'; g.fillText('UDAHAN ■', x + w / 2, y + h * .42 + 70); g.textAlign = 'left'; g = o; use(o); } });
  vignette(.45); grain(45);
}
export const SHOTS = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25];
