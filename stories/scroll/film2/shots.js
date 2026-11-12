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
function setD(spot = AMBER, x = 540, y = 900) {
  vgrad(0, 0, W, H, '#1c1a22', '#0f0e13');
  g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createLinearGradient(0, 0, 0, y + 300); gr.addColorStop(0, 'rgba(255,200,120,.0)'); gr.addColorStop(1, 'rgba(255,200,120,.10)');
  poly([[x - 90, 0], [x + 90, 0], [x + 380, y + 300], [x - 380, y + 300]], gr); g.restore();
  ellipse(x, y + 300, 380, 60, 'rgba(255,200,120,.10)');
  for (let i = 0; i < 50; i++) ellipse((i * 211) % W, (i * 397) % 1300, 2, 2, 'rgba(255,230,190,.18)');
}
// physical amber key on a pedestal
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
  txt('DIA MENYESAL', 540, 300, 84, AMBER); vignette(.42); grain(23);
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
export function S05(u) { S.S5(); stamp('2006', 860, 300, .06, '#7a4a1e', 70); rrect(90, 1440, 560, 120, 10, 'rgba(20,16,22,.82)'); txt('AZA RASKIN', 120, 1500, 54, '#f4ead8', 'left'); txt('perancang', 120, 1545, 30, '#cbbfae', 'left', '"Courier Prime"'); }
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
export function S08(u) {
  S.setB({ cam: 1.2 });
  S.monitor06(330, 1000, 1.05, 0);
  const P = seated(ORANG06, { x: 780, y: 1610, s: 1.85, facing: -.8, expr: 'lelah', gaze: [-.8, 0], lean: .05, rh: [-90, 120], lh: [-110, 130], look: -.7 }, 190);
  drawChar(g, ORANG06, P, { rim: { col: '#fff1d0', dir: [-.95, -.25], w: 5 }, ...DAY, noShadow: true });
  S.deskB(1395, 1190); rrect(240, 1186, 300, 36, 10, '#d6c9b1'); rrect(580, 1194, 60, 26, 13, '#d6c9b1');
  vignette(.3); grain(28);
}
export function S09(u, noText = false) {
  vgrad(0, 0, W, H, '#d9ccb3', '#c4b498');
  rrect(60, 300, 960, 1100, 30, '#d9ccb3'); rrect(100, 340, 880, 1000, 10, '#f6f3ea');
  rrect(140, 380, 800, 70, 6, '#8fb0cf'); for (let i = 0; i < 9; i++) rrect(140, 500 + i * 60, 800 - (i % 3) * 160, 22, 6, '#cfd5da');
  const page = Math.min(3, 1 + Math.floor(u * 3)); rrect(560, 1150, 360, 100, 20, AMBER); g.fillStyle = '#3a2a10'; g.font = '600 50px Oswald'; g.textAlign = 'center'; g.fillText(`Hal ${page + 1} ›`, 740, 1216); g.textAlign = 'left';
  poly([[760, 1200], [760, 1300], [786, 1278], [806, 1318], [822, 1310], [802, 1270], [836, 1270]], '#fdfcf7');
  pool(740, 1200, 260, 'rgb(255,180,58)', .2);
  if (!noText) txt(['1', '1 · 2', '1 · 2 · 3'][page - 1], 540, 250, 90, AMBER);
  vignette(.3); grain(29);
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
  S.setB({ cam: .8 });
  const P = headAt(ORANG06, seated(ORANG06, { facing: -.6, expr: 'bingung', gaze: [-.3, -.9], headTilt: -.06, rh: [-60, 100], look: -.5 }), 640, 820, 3.0);
  drawChar(g, ORANG06, P, { rim: { col: '#fff1d0', dir: [-.95, -.25], w: 6 }, ...DAY, noShadow: true });
  // finger above the mouse, frozen; the wall clock is sharp in this shot
  S.deskB(1560, 1400); rrect(300, 1376, 90, 46, 22, '#d6c9b1');
  ellipse(250, 330, 90, 90, '#f3ece0'); line([[250, 330], [250, 270]], 7, '#4a3a2a'); line([[250, 330], [300, 352]], 6, '#4a3a2a'); ellipse(250, 330, 8, 8, '#c0553a');
  vignette(.28); grain(32);
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
  setD(); bigButton(540, 980, 1.05, { cracked: 1, glow: .6 });
  // shards falling
  [[-160, -40, .4], [-40, 30, -.6], [90, -20, .9], [190, 60, -.3], [-90, 120, .2]].forEach(([dx, dy, r], i) => { g.save(); g.translate(540 + dx * (1 + u), 900 + dy + u * 260 * (1 + i * .2)); g.rotate(r + u * r * 3); poly([[-50, -30], [40, -40], [60, 20], [-30, 40]], i % 2 ? AMBER : '#b97416'); g.restore(); });
  txt('HILANG.', 540, 330, 100); vignette(.5); grain(34);
}
export function S15(u) {
  // "kamu" walks on a strip of feed that never ends: cards stream in from the right as fast as he walks
  vgrad(0, 0, W, H, '#1d1b26', '#0e0d12');
  for (let i = 0; i < 6; i++) { const x = ((i * 300 - u * 300) % 1800 + 1800) % 1800 - 300; card(x, 1180, 280, 330, i); }
  vgrad(0, 1500, W, 420, 'rgba(14,13,18,0)', 'rgba(14,13,18,1)');
  const w = walk(1.2 + u * .9, { v: 150, T: 1.0, lift: 18 });
  drawChar(g, KAMU, { x: 470, y: 1180, s: 1.5, facing: 1, look: .9, expr: 'lelah', gaze: [.5, .8], lf: w.lf, rf: w.rf, bob: w.bob, rh: [70, 20], hold: 'hp', phoneRot: .4, lh: [-6 - w.swing * 30, 150] }, { rim: RIM_PHONE, ...NIGHT });
  pool(560, 980, 300, 'rgb(127,227,255)', .26);
  hgrad(0, 0, 220, H, 'rgba(14,13,18,1)', 'rgba(14,13,18,0)'); hgrad(860, 0, 220, H, 'rgba(14,13,18,0)', 'rgba(14,13,18,1)');
  txt('TANPA UJUNG', 540, 330, 84, SCREEN); vignette(.4); grain(35);
}
export function S16(u) {
  // the corridor narrows into a phone; generic app icons line the walls
  vgrad(0, 0, W, H, '#1a1822', '#0e0d12');
  const cx = 540, cy = 900, pw = lerp(560, 300, u) / 2, ph = pw * 2;
  poly([[0, 0], [cx - pw, cy - ph], [cx - pw, cy + ph], [0, H]], '#24212e'); poly([[W, 0], [cx + pw, cy - ph], [cx + pw, cy + ph], [W, H]], '#201d29');
  const icon = (x, y, r, kind) => { rrect(x - r, y - r, r * 2, r * 2, r * .45, ['#4a6e9a', '#c0553a', '#8a6a8e', '#5a7f6a'][kind]); g.fillStyle = '#f4ead8'; g.beginPath(); if (kind === 0) g.ellipse(x, y, r * .5, r * .38, 0, 0, 7); else if (kind === 1) { g.arc(x - r * .2, y - r * .1, r * .22, 0, 7); g.arc(x + r * .2, y - r * .1, r * .22, 0, 7); g.moveTo(x - r * .42, y); g.lineTo(x, y + r * .4); g.lineTo(x + r * .42, y); } else if (kind === 2) { g.roundRect(x - r * .45, y - r * .3, r * .9, r * .65, 6); } else { g.arc(x, y + r * .2, r * .2, 0, 7); g.rect(x + r * .1, y - r * .45, r * .1, r * .62); } g.fill(); };
  [[140, 500, 70, 0], [200, 1200, 80, 1], [120, 1600, 60, 2], [930, 420, 64, 3], [880, 1100, 76, 0], [960, 1520, 70, 1], [330, 760, 44, 2], [760, 1260, 40, 3]].forEach(a => icon(...a));
  rrect(cx - pw, cy - ph, pw * 2, ph * 2, pw * .25, '#0c0d11'); g.save(); g.beginPath(); g.roundRect(cx - pw + 14, cy - ph + 14, pw * 2 - 28, ph * 2 - 28, pw * .2); g.clip(); feedScreen(u * 400)(g, cx - pw + 14, cy - ph + 14, pw * 2 - 28, ph * 2 - 28); g.restore();
  pool(cx, cy, 500, 'rgb(127,227,255)', .25);
  vignette(.45); grain(36);
}
export function S17(u) { S.S17(); txt(u < .5 ? '23.12' : '01.47', 540, 1560, 90, '#ff9f6a'); }
export function S18(u) {
  // top-down: every ad card that passes drops a coin into the piggy bank
  vgrad(0, 0, W, H, '#3a2d28', '#231b17');
  for (let i = 0; i < 8; i++) line([[0, 200 + i * 220], [W, 180 + i * 230]], 3, 'rgba(255,220,190,.05)');
  rrect(260, 160, 560, 940, 50, '#121318'); g.save(); g.beginPath(); g.roundRect(280, 180, 520, 900, 36); g.clip(); feedScreen(u * 440, 2)(g, 280, 180, 520, 900); g.restore();
  // piggy bank
  ellipse(540, 1520, 230, 170, '#e39aa8'); ellipse(760, 1500, 60, 50, '#e8a8b4'); ellipse(780, 1500, 12, 16, '#b86a7a'); rrect(470, 1360, 140, 18, 9, '#9a4f60');
  [[400, 1660], [680, 1660]].forEach(([x, y]) => rrect(x - 30, y, 60, 70, 14, '#d88a9a'));
  for (let i = 0; i < 3; i++) { const y = lerp(1120, 1350, (u * 1.5 + i * .33) % 1); ellipse(540, y, 34, 34, '#e7b84a'); ellipse(540, y, 22, 22, '#f2cd6a'); }
  pool(540, 640, 520, 'rgb(127,227,255)', .18);
  txt('+ IKLAN TERJUAL', 540, 1830, 54, AMBER); vignette(.4); grain(38);
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
  // close-up: Raskin's hand wipes the amber button off the page with an eraser
  vgrad(0, 0, W, H, '#ece6da', '#d8cfbf');
  for (let i = 0; i < 12; i++) rrect(140, 560 + i * 70, 800 - (i % 3) * 140, 20, 6, '#cfd5da');
  const wipe = u; g.save(); g.globalAlpha = 1 - wipe * .85; rrect(330, 1180, 420, 120, 24, AMBER); g.restore();
  for (let i = 0; i < 6; i++) ellipse(330 + i * 70 + (i * 37 % 20), 1340 + (i % 2) * 20, 9, 5, '#d98aa0');   // eraser crumbs
  rrect(lerp(300, 620, u) - 80, 1110, 200, 120, 18, '#e88fa6'); rrect(lerp(300, 620, u) - 80, 1110, 200, 34, 12, '#4a6e9a');
  gripHand(lerp(300, 620, u) + 20, 1040, 1.25);
  rrect(60, 200, 960, 260, 14, 'rgba(20,16,22,.85)'); txt('"Dengan menghapus', 540, 300, 64, '#f4ead8'); txt('tanda berhenti,', 540, 390, 64, AMBER);
  shadowFall(540, 1150, 400, 1400, .25); vignette(.35); grain(40);
}
export function S21(u) {
  // a crowd of everyone (rig presets), heads down to their phones; strings rise from the phones to one hand
  vgrad(0, 0, W, H, '#1c1a24', '#0e0d12');
  const crowd = [['pria', 150, 1640], ['ibu', 330, 1700], ['kakek', 520, 1660], ['adik_pr', 690, 1720], ['kakak', 850, 1650], ['wanita', 980, 1700]];
  const hand = [540, 300];
  crowd.forEach(([k, x, y], i) => {
    const P = { x, y, s: 1.0, facing: i % 2 ? -.15 : .15, expr: 'lelah', gaze: [0, 1], headTilt: .15 * (i % 2 ? -1 : 1), rh: [i % 2 ? -10 : 30, 40], hold: 'hp', phoneRot: 0, look: 0 };
    const J = drawChar(g, PRESETS[k], P, { rim: RIM_PHONE, ...NIGHT });
    const ph = [x + J.wR[0] * P.s, y + J.wR[1] * P.s - 20]; line([ph, [hand[0] + (x - 540) * .25, hand[1] + 120]], 2, 'rgba(244,234,216,.55)');
    pool(ph[0], ph[1], 120, 'rgb(127,227,255)', .2);
  });
  // control bar + hand from the top
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
  vgrad(0, 0, W, H, '#16151c', '#0e0d12'); depth(18, () => { for (let i = 0; i < 4; i++) card(260, 300 + i * 360 - u * 100, 560, 330, i); });
  g.save(); g.fillStyle = 'rgba(14,13,18,.6)'; g.fillRect(0, 0, W, H); g.restore();
  rrect(140, 880, 800, 26, 13, 'rgba(255,255,255,.25)'); rrect(140, 880, 800 * lerp(.9, .98, u), 26, 13, '#f4ead8'); ellipse(140 + 800 * lerp(.9, .98, u), 893, 22, 22, '#ffffff');
  txt('0:38 / 0:44', 540, 990, 40, '#cbbfae', 'center', '"Courier Prime"'); vignette(.4); grain(43);
}
export function S24(u) {
  vgrad(0, 0, W, H, '#16151c', '#0e0d12');
  for (let i = -1; i < 6; i++) card(260, 160 + i * 360 - (u * 360), 560, 330, i + 10);   // the feed, sharp now, never stopping
  rrect(140, 880, 800, 26, 13, 'rgba(255,255,255,.25)'); rrect(140, 880, 800 * .99, 26, 13, '#f4ead8');
  txt('FEED KAMU: ∞', 540, 1080, 70, SCREEN); vignette(.45); grain(44);
}
export function S25(u) {
  S.setC({ cam: -.2 }); depth(10, () => S.bed(1500));
  pool(540, 820, 700, 'rgb(127,227,255)', .2 * (1 - u * .5));
  handPhoneCU(g, 540, 820, 470, 900, { sleeve: '#6b7280', thumbT: .2, skinCol: SKIN.sawo, screen: (c, x, y, w, h) => { feedScreen(660)(c, x, y, w, h); const o = g; g = c; use(c); rrect(x + 30, y + h * .42, w - 60, 110, 24, AMBER); g.fillStyle = '#3a2a10'; g.font = '600 40px Oswald'; g.textAlign = 'center'; g.fillText('UDAHAN ■', x + w / 2, y + h * .42 + 70); g.textAlign = 'left'; g = o; use(o); } });
  txt('KAMU YANG PASANG.', 540, 300, 80, AMBER); vignette(.45); grain(45);
}
export const SHOTS = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25];
