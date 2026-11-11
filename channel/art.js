// Channel art for "Mini Thriller IDN": t = 0 → profile picture (render at 800×800), t = 1 → banner (render at 2560×1440).
// Same drawing language as the films (toon ink line, ARSIP KASUS folder, red rubber stamp, amber threat colour).
import { hash } from '/core/lib.js';
import { init, frame, g, setSize, INK, push, pop, translate, rotate, scale, fillOnly, stroke, spline, rect, rr, ell, dot } from '/engine/toon.js';
import { form } from '/engine/cast.js';
const AMBER = '#ffb43a', PAPER = '#f4efe6', RED = '#b3261e', MANILA = '#d8bb7e';
const cv = document.getElementById('c');
const img = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = src; });
let PH = [];
function grain(a = .06) { const w = cv.width, h = cv.height; g.setTransform(1, 0, 0, 1, 0, 0); for (let k = 0; k < w * h / 900; k++) { g.fillStyle = `rgba(${hash(k) > .5 ? 255 : 0},${hash(k) > .5 ? 240 : 0},${hash(k) > .5 ? 220 : 0},${a * hash(k * 3)})`; g.fillRect(hash(k * 7) * w, hash(k * 11) * h, 2, 2); } }
function stampBox(str, x, y, rot, size, col = RED) {   // drawn on its own canvas so the worn-ink holes never punch through the art below
  const c = document.createElement('canvas'), o = c.getContext('2d'); o.font = `600 ${size}px "Oswald"`;
  const w = o.measureText(str).width + size * .7, h = size * 1.5; c.width = Math.ceil(w + size); c.height = Math.ceil(h + size);
  o.translate(c.width / 2, c.height / 2); o.font = `600 ${size}px "Oswald"`; o.strokeStyle = col; o.lineWidth = size * .11; o.strokeRect(-w / 2, -h / 2, w, h); o.lineWidth = size * .035; o.strokeRect(-w / 2 + size * .16, -h / 2 + size * .16, w - size * .32, h - size * .32);
  o.fillStyle = col; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(str, 0, size * .06);
  o.globalCompositeOperation = 'destination-out'; for (let k = 0; k < 260; k++) { o.beginPath(); o.arc(-w / 2 + hash(k + size) * w, -h / 2 + hash(k * 7) * h, .6 + hash(k * 3) * size * .018, 0, 6.3); o.fill(); }
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot); g.globalAlpha = .92; g.drawImage(c, -c.width / 2, -c.height / 2); g.restore();
}
function outlined(str, x, y, size, fill, { align = 'center', font = 'Oswald', weight = 600, lw = .14 } = {}) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = `${weight} ${size}px "${font}"`; g.textAlign = align; g.textBaseline = 'middle'; g.lineJoin = 'round';
  g.lineWidth = size * lw; g.strokeStyle = INK; g.strokeText(str, x, y); g.fillStyle = fill; g.fillText(str, x, y); g.restore();
}
function folder(w) {   // the ARSIP KASUS folder, centred on the origin
  const h = w * .74;
  form([[-w / 2, -h / 2], [-w * .2, -h / 2], [-w * .16, -h / 2 - w * .08], [w * .12, -h / 2 - w * .08], [w * .16, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], '#c9a86a', { lw: 10, sw: 24 });
  form(rect(-w / 2 + w * .03, -h / 2 + w * .04, w * .94, h - w * .06), MANILA, { lw: 8, sw: 16 });
}
function profile() {
  const S = cv.width; g.setTransform(1, 0, 0, 1, 0, 0);
  const r = g.createRadialGradient(S / 2, S * .45, S * .05, S / 2, S / 2, S * .72); r.addColorStop(0, '#3a2a22'); r.addColorStop(1, '#0e0b10'); g.fillStyle = r; g.fillRect(0, 0, S, S);
  push(); translate(S / 2, S * .52); rotate(-.06); scale(S / 800); folder(470);
  // a molasses drip running off the folder's lower edge (the threat)
  form(spline([[120, 168], [150, 168], [148, 250], [135, 282], [122, 250]]), '#a8571a', { lw: 7, sw: 6, shade: () => dot(128, 230, 7, '#ffd08a') });
  pop();
  stampBox('MT', S / 2, S * .55, -.12, S * .2);
  grain(.05);
}
function photo(im, x, y, w, rot, tape = 0) {
  const h = w * 16 / 9 * .78;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(-w / 2 + 18, -h / 2 + 24, w + 36, h + 90);
  g.fillStyle = '#efe9da'; g.fillRect(-w / 2 - 18, -h / 2 - 18, w + 36, h + 90);
  g.filter = 'sepia(.55) contrast(1.08)'; g.drawImage(im, 0, im.height * .12, im.width, im.height * .78, -w / 2, -h / 2, w, h); g.filter = 'none';
  g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(-w / 2 - 18, -h / 2 - 18, w + 36, h + 90);
  if (tape) { g.fillStyle = 'rgba(220,205,170,.85)'; g.rotate(.2 * tape); g.fillRect(-70, -h / 2 - 50, 140, 50); }
  g.restore();
}
function banner() {
  const W = cv.width, H = cv.height; g.setTransform(1, 0, 0, 1, 0, 0);
  g.fillStyle = '#2a1d16'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) { const y = i * 82; g.fillStyle = hash(i) > .5 ? '#3a281c' : '#2c1e15'; g.fillRect(0, y, W, 78); g.strokeStyle = '#24180f'; g.lineWidth = 2; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(0, y + 14 + k * 15); g.bezierCurveTo(W * .3, y + 8 + k * 15, W * .7, y + 20 + k * 15, W, y + 12 + k * 15); g.stroke(); } }
  // archive photos from film #001 scattered across the desk (mostly outside the text-safe area)
  const P = [[330, 520, 420, -.12, 1], [760, 1180, 360, .08, 0], [2230, 470, 420, .1, -1], [1830, 1210, 360, -.07, 0], [120, 1230, 300, .14, 0]];
  P.forEach(([x, y, w, r, t], i) => photo(PH[i % PH.length], x, y, w, r, t));
  // lamp pool on the centre, dark edges
  const r = g.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W * .62); r.addColorStop(0, 'rgba(255,220,160,0.10)'); r.addColorStop(.55, 'rgba(0,0,0,0.15)'); r.addColorStop(1, 'rgba(0,0,0,0.7)'); g.fillStyle = r; g.fillRect(0, 0, W, H);
  // the safe area (1546×423, centred): title, tagline, series stamp
  g.fillStyle = 'rgba(14,11,16,.55)'; g.fillRect(W / 2 - 800, H / 2 - 230, 1600, 460);
  stampBox('ARSIP KASUS', W / 2 - 520, H / 2 - 150, -.08, 58);
  g.font = '600 200px "Oswald"'; const w1 = g.measureText('MINI THRILLER').width, w2 = g.measureText('IDN').width, gap = 52, x0 = W / 2 - (w1 + gap + w2) / 2;
  outlined('MINI THRILLER', x0, H / 2 + 5, 200, PAPER, { align: 'left' }); outlined('IDN', x0 + w1 + gap, H / 2 + 5, 200, AMBER, { align: 'left' });
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = '700 46px "Courier Prime"'; g.fillStyle = PAPER; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('KISAH NYATA · BENCANA PALING ANEH · DALAM 60 DETIK', W / 2, H / 2 + 165); g.restore();
  grain(.04);
}
window.DUR = 2;
window.render = t => { frame(t); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cv.width, cv.height); (t < 1 ? profile : banner)(); };
init(cv); setSize(cv.width, cv.height);
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"'), ...['ph_1.0', 'ph_12.2', 'ph_14.4', 'ph_37.7', 'ph_51.8'].map(n => img(`assets/${n}.jpg`))]).then(([, , ...ims]) => {
  PH = ims; const q = new URLSearchParams(location.search); if (q.has('w')) { cv.width = +q.get('w'); cv.height = +q.get('h'); setSize(cv.width, cv.height); }
  window.render(0); window.READY = true;
});
