// S19–S22 (28.10–37.60): the older designer admits it; the brake erased; thumbs on strings; the laptop closes.
import { clamp, lerp, hash } from '../lib/toon/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, noodle, dot } from '../lib/toon/toon.js';
import { person, SKIN, EXPR, hand } from '../lib/toon/cast.js';
import { keys, ease, blink } from '../lib/toon/motion.js';
import { U, SCREEN, AMBER, NIGHT, PAPER, ss, eo, back, mix, phone, offscreen, blit, webPage, nextButton, feedCanvas, screenLight, nightFall, finishNight, setLight, form } from './kit.js';
import { noirFinish, silhouette, halftone } from './noir.js';
import { inkForm } from './kit.js';
import { RASKIN } from './s_hook.js';

const OLDER = { ...RASKIN, hairCol: '#3a302b', top: { type: 'jacket', col: '#363b45', cuff: '#2a2e36', collar: '#2a2e36' }, acc: { glasses: true, beard: true } };

// a wall of screens behind him, all showing feeds that keep moving
function screenWall(t, a = 1) {
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const x = 120 + c * 300 + (r % 2) * 40, y = 150 + r * 260, w = 220, h = 200;
    push(); translate(x + w / 2, y + h / 2); rotate((hash(r * 3 + c) - .5) * .08);
    form(rr(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 14), '#1a1d23', { lw: 6, sw: 6, rim: false });
    blit(feedCanvas(220, 200, t * (.6 + hash(r + c * 7) * .8) + hash(r * 5 + c) * 9), -w / 2, -h / 2, w, h, .85 * a);
    pop();
  }
}

// S19 (28.10–30.34) "Belakangan, Raskin ngaku…": older, bearded, a silhouette in front of a wall of feeds that never stop
export function S19() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#0a0c10'; g.fillRect(0, 0, W, H);
  screenWall(U + 30);
  const turn = ss(clamp((U - .7) / .8));
  silhouette(330 + 20 * turn, 1080, { s: 2.05, beard: true, lens: .9, feedOff: U * 2, rim: .9, down: .1 - .1 * turn });
  screenLight(720, 700, 900, .4);
  nightFall(540, 950, 520, 1300, .6); noirFinish();
}
// S20 (30.34–32.18) "Dengan menghapus tanda berhenti,": an eraser rubs the amber button off the page, stroke by stroke
export function S20() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#1b1f26'; g.fillRect(0, 0, W, H);
  push(); translate(540, 1080); rotate(-.02);
  const pg = offscreen(900, 1100, (ctx, w, h) => webPage(ctx, w, h, 0, { page: 3 }));
  form(rect(-470, -570, 940, 1140), '#fbfaf5', { lw: 7, sw: 14 }); blit(pg, -450, -550, 900, 1100);
  pop();
  const er = ss(clamp((U - .25) / 1.3));   // how much of the button is gone
  nextButton(540, 1340, 1.25, { alpha: 1 - er });
  // eraser crumbs and smudge where the button was
  for (let k = 0; k < Math.floor(er * 40); k++) dot(400 + hash(k) * 280, 1300 + hash(k * 3) * 120, 4 + hash(k * 7) * 6, '#e9d7b9');
  const ex = 540 + 170 * Math.sin(U * 9) * (U > .25 && U < 1.6 ? 1 : .2), ey = 1290 + 20 * Math.cos(U * 9);
  push(); translate(ex, ey); rotate(-.5);
  form(rr(-60, -150, 120, 260, 18), '#e9a7a4', { lw: 7, sw: 10 }); form(rr(-60, -150, 120, 90, 14), '#6c87b7', { lw: 7, sw: 8 });
  pop();
  inkForm(noodle([1180, 260], [ex + 110, ey - 190], -40, 120, 96), '#cfe9f0', .45, .15);
  inkForm(ell(ex + 70, ey - 150, 92, 78), '#cfe9f0', .6, .2);
  nightFall(540, 1250, 380, 1200, .6); noirFinish();
}
// S21 (32.18–35.64) "saya bisa membuat kamu melakukan apa yang saya mau.": one hand, one phone; the thumb is tied to a string
// that rises to a puppeteer's control bar; every pull of the string is one swipe. Whoever holds the bar is never shown.
export function S21() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#12161c'; g.fillRect(0, 0, W, H);
  const beat = (U % .62) / .62, pull = eo(clamp(beat / .35)) * (1 - ss(clamp((beat - .55) / .45)));   // the bar jerks up, the thumb flicks, then eases back
  const barY = 700 - 70 * pull, barRot = .06 * Math.sin(U * 1.3) - .05 * pull;
  // phone and hand, big and centred
  phone(560, 1380, 470, 860, .05, Math.floor(U / .62) + eo(clamp(beat / .35)) + 4, { light: .9 });
  const sk = SKIN.light[0];
  for (const [y, l] of [[1060, 46], [1190, 50], [1320, 48], [1450, 40]]) inkForm(rr(272, y, l + 30, 92, 40), SCREEN, .6, .25);
  inkForm(spline([[640, 1920], [700, 1720], [860, 1560], [1010, 1580], [1080, 1720], [1080, 1920]]), SCREEN, .6, .25);
  const tip = [lerp(700, 690, pull), lerp(1500, 1180, pull)];
  inkForm(noodle([880, 1620], tip, -40, 120, 92), SCREEN, .95, .45);
  // the string: from the thumbnail up to the bar, taut when it pulls
  const top = [540 + 260 * Math.cos(barRot + Math.PI) * -.0 + 120, barY + 10];
  stroke(spline([[tip[0] - 6, tip[1] - 60], [lerp(tip[0], top[0], .5) + 30 * (1 - pull), lerp(tip[1], top[1], .5)], top], false, 10), 5, { line: '#e8e0cf', boil: .2 });
  stroke([[tip[0] - 40, tip[1] - 40], [tip[0] + 30, tip[1] - 50]], 6, { line: '#e8e0cf' });   // the knot round the thumb
  // the control bar (a puppeteer's cross), hanging from above the frame
  push(); translate(660, barY); rotate(barRot);
  form(rr(-260, -24, 520, 48, 22), '#7a5534', { lw: 8, sw: 8 }); form(rr(-24, -150, 48, 300, 22), '#6b4a2e', { lw: 8, sw: 8 });
  pop();
  stroke([[660, 0], [660, barY - 150]], 5, { line: '#3a3f48' });
  screenLight(560, 1380, 900, .5);
  nightFall(560, 1200, 420, 1250, .6); noirFinish();
}
// S22 (35.64–37.60) "Dan dia menyesal.": seen from the side, he closes the laptop; the light on his face line goes out
export function S22() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#090b0e'; g.fillRect(0, 0, W, H);
  const close = ss(clamp((U - .45) / .75)), light = 1 - close;
  // the laptop in profile: base on the desk, lid hinged at the back edge, rotating shut
  const hx = 830, hy = 1400, ang = lerp(-1.75, -.02, close), L = 360;
  fillOnly(rect(0, hy + 18, W, 600), '#0d1014', { boil: .1 }); stroke([[0, hy + 18], [W, hy + 18]], 4, { line: '#1c222b' });
  inkForm([[hx - 400, hy - 6], [hx + 14, hy - 6], [hx + 14, hy + 22], [hx - 400, hy + 22]], '#5a6676', .8, 0);
  const tip = [hx + Math.cos(Math.PI + ang) * -L * -1, hy + Math.sin(ang) * L];
  const lid = [[hx, hy], [hx + Math.cos(Math.PI - ang) * L, hy - Math.sin(Math.PI - ang) * L * -1]];
  const ex = hx - Math.cos(ang) * L, ey = hy + Math.sin(ang) * L;
  stroke([[hx, hy], [ex, ey]], 26, { line: '#07080b' }); stroke([[hx, hy], [ex, ey]], 4, { line: '#7fe3ff', alpha: .35 + .5 * light });
  if (light > .02) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'screen'; const gr = g.createRadialGradient(ex, ey, 10, ex, ey, 700 * light + 50); gr.addColorStop(0, `rgba(127,227,255,${.45 * light})`); gr.addColorStop(1, 'rgba(127,227,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore(); }
  silhouette(330, 1000, { s: 1.95, beard: true, lens: light, feedOff: U * 2, rim: light, down: .25 + .55 * ss(clamp((U - .9) / .8)) });
  nightFall(540, 1100, 420, 1250, .55); noirFinish({ vig: .65 });
}
