// S1–S4 (0–5.0 s): the man lit by his phone → the same feed in the viewer's hand → his regret → archive slam.
import { clamp, lerp, hash, vnoise } from '../lib/toon/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, noodle, dot } from '../lib/toon/toon.js';
import { person, SKIN, EXPR, hand } from '../lib/toon/cast.js';
import { keys, ease, blink } from '../lib/toon/motion.js';
import { portrait, silhouette, halftone, noirFinish, NOIR } from './noir.js';
import { inkForm } from './kit.js';
import { U, SCREEN, AMBER, NIGHT, NIGHT2, PAPER, RED, ss, eo, back, mix, phone, screenLight, nightFall, finishNight, finishCard, desk, rubber, setLight, form } from './kit.js';

// the designer, as a comic character (not a likeness): dark wavy hair, glasses, stubble, dark hoodie
export const RASKIN = { body: 'man', skin: SKIN.light, hair: 'short', hairCol: '#2a211d', top: { type: 'jacket', col: '#2c313a', cuff: '#23272e', collar: '#23272e' }, bottom: { type: 'trousers', col: '#24262c' }, shoes: { col: '#1d1d22' }, acc: { glasses: true, stubble: true } };

function room(tone = 0) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = mix(NIGHT, '#0b0e13', tone); g.fillRect(0, 0, W, H);
  // window blinds behind him: cold night slats, so the dark is a room, not a void
  for (let i = 0; i < 9; i++) fillOnly(rect(620, 180 + i * 58, 420, 30), mix('#2a3646', NIGHT, tone), { boil: .2, alpha: .9 });
  stroke([[600, 160], [600, 720]], 10, { line: '#0f1319' }); stroke([[1060, 160], [1060, 720]], 10, { line: '#0f1319' });
  fillOnly(rect(0, 1500, W, 420), '#10141a', { boil: .1 });   // desk edge / bed in the dark
}

// the man holding the phone low at chest height; `down` lowers his head (regret), `feedOff` scrolls his screen
function manWithPhone({ feedOff, down = 0, eyesShut = 0, s = 2.35, x = 540, hy = 690 }) {
  setLight({ dir: [0, 1], tint: '#0c1016', a: .55, sw: 26 });   // no rim: a cyan rim on hair reads as a hat band
  const expr = { ...EXPR.neutral, lid: lerp(.38, .62, down), brow: lerp(.05, .25, down), inner: lerp(.1, .85, down), look: [0, .75], mouth: { o: 0, w: .7, sm: lerp(-.15, -.6, down) } };
  if (eyesShut > .5) expr.closed = true;
  const pose = { lean: 0, armB: { h: [64, 128], bend: -52, hand: 'open' }, armF: { h: [-64, 128], bend: 52, hand: 'open' } };
  person({ ...RASKIN, view: 'front', x, y: hy + 566 * s, s, pose, expr, headTilt: .02 + .05 * down, blink: blink(U + .3, 7) });
  // the phone in both hands, its light on his face
  const py = hy + 430 + 40 * down;
  phone(x, py, 250, 450, -.04, feedOff, { light: 1 });
  hand(x - 150, py + 90, -.2, 34, SKIN.light[0], 'open'); hand(x + 150, py + 90, Math.PI + .2, 34, SKIN.light[0], 'open');
  screenLight(x, py - 60, 760, .75);
}

// noir room: near-black, the window blinds catching a little street light, halftone falloff from the phone
function noirRoom(lx, ly) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = NOIR.ink; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 10; i++) fillOnly(rect(660, 120 + i * 52, 380, 24), '#1d2533', { boil: .2 });
  halftone(null, lx, ly, 900, '#1e3440', { cell: 16, max: .5, a: .9 });
}
// the designer as a noir silhouette in profile, facing the phone he holds; the feed lights his face line and fills his lens
function noirMan({ off, down = 0, lens = 1 }) {
  const L = { x: 760, y: 1250 };
  noirRoom(L.x, L.y);
  silhouette(430, 780 + 30 * down, { s: 2.0, down, lens, feedOff: off, rim: 1 - .35 * down });
  phone(790, 1260 + 40 * down, 250, 450, -.32, off, { light: 1 });
  // his hand round the phone, in silhouette with a lit edge
  push(); translate(790, 1260 + 40 * down); rotate(-.32);
  pop();
  inkForm(spline([[600, 1920], [640, 1600], [720, 1470], [820, 1500], [860, 1640], [820, 1920]]), SCREEN, .5, .2);   // palm and wrist
  screenLight(760, 1250, 900, .6);
}
// S1 (0–1.40) "Pria ini merancang fitur": his face lit by the feed he keeps scrolling
export function S1() { noirMan({ off: U * 1.35 }); noirFinish(); }
// S2 (1.40–2.96) "yang lagi kamu pakai…": POV, the viewer's own hand and thumb, the same feed
export function S2() {
  noirRoom(540, 980);
  // swipe rhythm: a quick flick every ~0.55 s, the feed jumps one card per flick
  const ph = U / .55, n = Math.floor(ph), f = ph - n, flick = eo(clamp((f - .15) / .35));
  const off = n + flick;
  const thumbY = lerp(1360, 1040, clamp((f - .1) / .45)) + (f > .55 ? lerp(0, 320, ss((f - .55) / .45)) : 0);
  push(); translate(540, 980); rotate(.03);
  form(rr(-330, -650, 660, 1300, 70), '#1c2027', { lw: 8, sw: 12, rim: false });
  pop();
  phone(540, 980, 600, 1180, .03, off, { light: 1 });
  // right hand in silhouette, rim-lit by the screen: fingertips round the left edge, palm bottom-right, thumb over the glass
  for (const [y, l] of [[820, 46], [960, 50], [1100, 48], [1230, 40]]) inkForm(rr(222, y, l + 30, 92, 40), SCREEN, .6, .25);
  inkForm(spline([[640, 1920], [700, 1640], [860, 1480], [1010, 1500], [1080, 1640], [1080, 1920]]), SCREEN, .6, .25);
  const tx0 = 860, ty0 = 1530, tip = [lerp(700, 640, clamp((f - .1) / .45)), thumbY];
  inkForm(noodle([tx0, ty0], tip, -40, 120, 92), SCREEN, .9, .45);
  screenLight(540, 980, 900, .5);
  noirFinish();
}
// S3 (2.96–4.55) "dan dia menyesal.": the head sinks; eyes close on "menyesal"
export function S3() { const down = keys(U, [[0, 0], [.35, .2, ease.out], [1.0, 1, ease.inOut]]); noirMan({ off: 3 + U * 1.1, down, lens: 1 - .6 * ss((U - 1.0) / .4) }); noirFinish({ vig: .62 }); }

// S4 (4.55–5.0) the archive: the frozen frame becomes the photo in the ARSIP KASUS file, slammed on the desk
let photo = null;
export function setPhoto(c) { photo = c; }
export function S4() {
  setLight({ dir: [-.4, -.9], tint: '#1a1410', a: .32 });
  desk();
  for (const [x, y, a, c] of [[90, 330, -.22, '#d9d1bf'], [560, 1240, .16, '#e2dccb']]) { push(); translate(x, y); rotate(a); form(rect(0, 0, 520, 680), c, { lw: 5, sw: 14 }); pop(); }
  push(); translate(540, 990); rotate(-.05);
  form([[-430, -560], [-150, -560], [-120, -615], [150, -615], [180, -560], [430, -560], [430, 600], [-430, 600]], '#c9a86a', { lw: 8, sw: 30 });
  form(rect(-410, -530, 820, 1110), '#d8bb7e', { lw: 6, sw: 18 });
  pop();
  const T = (s, x, y, font, col) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(540, 990); g.rotate(-.05); g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); g.restore(); };
  T('ARSIP KASUS', 15, -580, '700 36px "Courier Prime"', '#3a2a18');
  T('SCROLL TANPA UJUNG', 0, -445, '600 78px Oswald', '#2a1e14');
  T('2006 → SEKARANG', 0, -375, '700 34px "Courier Prime"', '#3a2a18');
  push(); translate(540, 990); rotate(.04); form(rect(-300, -300, 600, 760), '#efe9da', { lw: 6, sw: 16 }); pop();
  if (photo) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(540, 990); g.rotate(.04); g.filter = 'sepia(.85) contrast(1.12) brightness(.95)'; g.drawImage(photo, 0, 260, 1080, 1520, -270, -270, 540, 700); g.filter = 'none'; g.restore(); }
  stroke(spline([[-190, -330], [-190, -250], [-160, -230], [-130, -250], [-130, -350], [-160, -370], [-180, -350], [-180, -270]].map(([x, y]) => [x + 540, y + 990]), false, 8), 9, { line: '#8a8f96' });
  rubber('KASUS #002', 760, 1520, -.2, U - .12, { size: 92 });
  g.setTransform(1, 0, 0, 1, 0, 0); const r = g.createRadialGradient(540, 900, 200, 540, 900, 1250); r.addColorStop(0, 'rgba(255,220,160,0.10)'); r.addColorStop(1, 'rgba(0,0,0,0.55)'); g.fillStyle = r; g.fillRect(0, 0, W, H);
  if (U < 1) for (let k = 0; k < 36; k++) { const a = hash(k) * 6.28, d = (380 + hash(k * 3) * 300) * (1 + U * .9); dot(540 + Math.cos(a) * d * .85, 990 + Math.sin(a) * d + U * U * 120, (2 + hash(k * 9) * 4) * (1 - U), '#e8dcc0'); }
  finishCard(.34);
}
