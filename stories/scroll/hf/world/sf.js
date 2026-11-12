// Style frames for LOOK.md (direction E): SF1 Raskin at night with his phone (present), SF2 the 2006 desk (past),
// SF3 "kamu" in bed at 01:47 (present, relatable), SHEET the model sheet. Stills only: they lock the look before animation.
import { clamp, lerp, hash } from '../lib/toon/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, noodle, dot } from '../lib/toon/toon.js';
import { form, setLight, person, SKIN, EXPR, hand } from '../lib/toon/cast.js';
import { phone, offscreen, blit, webPage, nextButton, mix, inkForm } from './kit.js';
import { silhouette } from './noir.js';
import { gnHead, RASKIN06, RASKIN19, KAMU, finishGN, pool, layer, handAt, povHand, silHand, SCREEN, AMBER } from './gn.js';

const bg = c => { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = c; g.fillRect(0, 0, W, H); };
const grad = (y0, y1, c0, c1) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(0, y0, W, y1 - y0); g.restore(); };

// SF1 — present, dusk, mid-key: Raskin in profile silhouette against a bright dusk window, the phone in his hand lighting his face line.
// The figure reads instantly (shape against light); the frame stays bright; no drawn face to look puppet-like.
export function SF1() {
  layer(() => {
    grad(0, H, '#8a8290', '#5e5866');
    push(); translate(600, 760); form(rect(-430, -560, 860, 900), '#4a5368', { lw: 9, sw: 10, rim: false, shade: () => { grad(200, 1100, '#7fa4cf', '#f3b98a'); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); for (let i = 0; i < 26; i++) { const x = 170 + hash(i) * 860, h = 120 + hash(i * 5) * 240; g.fillStyle = '#3a4258'; g.fillRect(x, 1100 - h, 40 + hash(i * 3) * 40, h); } for (let i = 0; i < 46; i++) { g.fillStyle = '#ffd98a'; g.fillRect(180 + hash(i * 7) * 840, 880 + hash(i * 9) * 200, 6, 8); } g.restore(); } }); stroke([[0, -560], [0, 340]], 10); stroke([[-430, -80], [430, -80]], 10); pop();
    pool(950, 1400, 700, 'rgb(255,206,140)', .45);
  }, 4);
  silhouette(330, 960, { s: 1.95, lens: 1, feedOff: 2.3, rim: 1, down: .05 });
  phone(790, 1240, 200, 360, -.42, 2.3, { light: 1 });
  silHand(790, 1240, 200, 360, -.42, SCREEN, [520, 1960]);
  pool(790, 1200, 560, 'rgb(127,227,255)', .3);
  layer(() => { form(rect(-20, 1640, W + 40, 340), '#4a3a30', { lw: 8, sw: 8, rim: false }); form([[860, 1700], [1100, 1700], [1060, 1520], [900, 1520]], '#e9c98d', { lw: 8, sw: 8 }); }, 12);   // desk and lamp, soft foreground
  finishGN({ vig: .22 });
}

// SF2 — 2006, daylight. Over the shoulder: the beige monitor and its amber button sharp; the back of young Raskin's head soft in the foreground
export function SF2() {
  layer(() => {
    grad(0, H, '#eadfc8', '#d8c7a8');
    for (let i = 0; i < 2; i++) fillOnly([[60 + i * 240, 100], [270 + i * 240, 100], [360 + i * 240, 900], [150 + i * 240, 900]], '#f7eed9', { alpha: .75, boil: .2 });
    form(rect(780, 160, 230, 300), '#c96f4a', { lw: 6, sw: 8, shade: () => { fillOnly(ell(895, 280, 62, 62), '#f2c26b', { boil: .2 }); } });
  }, 4);
  setLight({ dir: [-.9, -.45], tint: '#7a6250', a: .22, sw: 22 });
  push(); translate(620, 900);
  form(rr(-400, -330, 800, 600, 30), '#d6cbb5', { lw: 9, sw: 16 });
  blit(offscreen(720, 500, (ctx, w, h) => webPage(ctx, w, h, 0, { page: 1 })), -360, -290, 720, 500);
  nextButton(40, 120, .78, { lit: .3 });
  shape([[180, 150], [180, 250], [206, 226], [224, 268], [242, 260], [224, 220], [260, 220]], { fill: '#fdfcf7', lw: 5 });   // the cursor about to click
  form(rr(-90, 270, 180, 140, 12), '#c7bca6', { lw: 7, sw: 8 });
  pop();
  form(rect(-20, 1420, W + 40, 540), '#a8805c', { lw: 8, sw: 14 });
  form(rr(380, 1470, 520, 100, 16), '#ddd2bd', { lw: 7, sw: 8 });
  // the back of his head and his shoulder, out of focus in the foreground (left)
  layer(() => { form(spline([[-200, 1960], [-120, 1500], [120, 1380], [330, 1470], [380, 1960]], true, 10), '#6f8597', { lw: 9, sw: 14 }); form(ell(130, 1150, 200, 240), '#2b221d', { lw: 9, sw: 16 }); form(ell(300, 1210, 34, 60), '#e0b08e', { lw: 7, sw: 6 }); }, 16);
  finishGN({ cool: '#5a4a3a', warm: '#ffd9a0', a: .14, vig: .18 });
}

// SF3 — present, 01:47, POV: your own hands holding the phone over the blanket; the room soft behind (fan, clock, street light, cable)
export function SF3() {
  layer(() => {
    grad(0, H, '#6a7284', '#4a5162');
    form(rect(40, 160, 400, 560), '#2b3446', { lw: 8, sw: 8, rim: false, shade: () => { pool(240, 340, 420, 'rgb(255,214,150)', .6); } });
    push(); translate(830, 300); form(ell(0, 0, 100, 100), '#e8e1d0', { lw: 7, sw: 8 }); const hA = -Math.PI / 2 + (1.78 / 12) * 6.283, mA = -Math.PI / 2 + (47 / 60) * 6.283; stroke([[0, 0], [Math.cos(hA) * 50, Math.sin(hA) * 50]], 10); stroke([[0, 0], [Math.cos(mA) * 76, Math.sin(mA) * 76]], 7); pop();
    push(); translate(940, 760); stroke([[0, 120], [0, 700]], 12); form(ell(0, 40, 160, 160), '#cfd6dd', { lw: 7, sw: 10 }); pop();
    form(spline([[-40, 1300], [300, 1230], [760, 1280], [1120, 1220], [1120, 1960], [-40, 1960]], true, 10), '#6a5a7a', { lw: 8, sw: 16, shade: () => { for (let i = 0; i < 12; i++) { fillOnly(rect(i * 100 - 40, 1230, 30, 760), '#7d6b8c', { alpha: .7, boil: .2 }); fillOnly(rect(-40, 1300 + i * 50, W + 80, 12), '#5b4b6a', { alpha: .6, boil: .2 }); } } });
    form(spline([[600, 1150], [1000, 1120], [1080, 1220], [640, 1260]], true, 10), '#e4ddcf', { lw: 7, sw: 10 });   // guling
  }, 6);
  setLight({ dir: [0, -1], tint: '#5a4436', a: .26, sw: 20, rim: SCREEN, rimA: .7, rw: 9 });
  phone(540, 1020, 480, 860, 0, 1.4, { light: 1 });
  povHand(540, 1020, 480, 860, SKIN.tan, .3);
  stroke(spline([[540, 1460], [520, 1700], [300, 1820], [100, 1960]], false, 12), 7, { line: '#e9e6df' });   // charger cable
  pool(540, 1000, 760, 'rgb(127,227,255)', .3);
  finishGN({ vig: .22 });
}

// SHEET — cast & palette as the film shows them: Raskin 2006 / 2019 in profile silhouette, "kamu" as hands; the colour rules
export function SHEET() {
  bg('#ece4d4');
  const lab = (t, x, y, sz = 30) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = `700 ${sz}px "Courier Prime"`; g.fillStyle = '#3a2f26'; g.textAlign = 'center'; g.fillText(t, x, y); g.restore(); };
  const card = (x, y, w, h, col, fn) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.fillStyle = col; g.fillRect(x, y, w, h); fn(); g.restore(); stroke(rect(x, y, w, h).concat([[x, y]]), 6); };
  card(70, 150, 440, 600, '#e9c98d', () => silhouette(250, 520, { s: .95, lens: 0, rim: .8, col: '#fff3d6' })); lab('RASKIN 2006 · siang, rim hangat', 290, 800, 24);
  card(570, 150, 440, 600, '#5f7fa8', () => silhouette(750, 520, { s: .95, beard: true, lens: 1, rim: 1 })); lab('RASKIN 2019 · rim layar', 790, 800, 24);
  card(70, 880, 440, 640, '#6a7284', () => { push(); translate(18, 820); scale(.5); phone(540, 1020, 480, 860, 0, 1.4, { light: 1 }); povHand(540, 1020, 480, 860, SKIN.tan, .3); pop(); }); lab('KAMU · tangan POV', 290, 1570, 24);
  const sw = [['#7fe3ff', 'LAYAR · ancaman'], ['#ffb43a', 'AMBER · rem'], ['#eadfc8', '2006 · kertas'], ['#6a7284', 'KINI · malam']];
  sw.forEach(([c, t], i) => { fillOnly(rect(600, 900 + i * 150, 110, 110), c, { boil: .2 }); stroke(rect(600, 900 + i * 150, 110, 110).concat([[600, 900 + i * 150]]), 5); lab(t, 850, 965 + i * 150, 26); });
  lab('ARSIP KASUS #002 · CAST & PALET', 540, 1700);
  finishGN({ cool: '#5a4a3a', a: .08, vig: .15, p: .2 });
}
