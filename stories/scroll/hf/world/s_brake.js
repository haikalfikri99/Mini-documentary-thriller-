// S10–S13 (11.80–19.06): "Tapi" — everything stops on the amber button; the button is the brake; the hovering finger; the choice.
import { clamp, lerp, hash } from '../lib/toon/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, noodle, dot, arc } from '../lib/toon/toon.js';
import { SKIN, hand } from '../lib/toon/cast.js';
import { keys, ease } from '../lib/toon/motion.js';
import { U, SCREEN, AMBER, AMBER_DEEP, NIGHT, PAPER, ss, eo, back, mix, offscreen, blit, webPage, nextButton, screenLight, nightFall, finishNight, finishCard, setLight, form } from './kit.js';

// the 2006 monitor on a desk at night, its page frozen; `drain` 0..1 drains every colour but the button's
function monitor(drain, { page = 3, btnLit = 0, btnPress = 0, s = 1 } = {}) {
  setLight({ dir: [0, -1], tint: '#0e1218', a: .4 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = mix('#1a2028', '#141414', drain); g.fillRect(0, 0, W, H);
  push(); translate(540, 900); scale(s);
  form(rr(-470, -420, 940, 760, 30), mix('#c9c3b4', '#8f8f8f', drain), { lw: 8, sw: 18 });   // beige 2006 bezel
  const pg = offscreen(860, 640, (ctx, w, h) => { webPage(ctx, w, h, 0, { page }); if (drain) { ctx.fillStyle = `rgba(120,120,120,${.55 * drain})`; ctx.globalCompositeOperation = 'saturation'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'source-over'; } });
  blit(pg, -430, -380, 860, 640);
  fillOnly(rr(-80, 340, 160, 120, 10), mix('#b9b3a4', '#808080', drain), { boil: .1 }); form(rr(-230, 450, 460, 50, 14), mix('#bdb7a8', '#858585', drain), { lw: 7, sw: 8 });
  nextButton(0, 150, .95, { lit: btnLit, press: btnPress });
  pop();
}

// S10 (11.80–12.68) "Tapi": the world freezes and drains; only the amber button keeps its colour
export function S10() {
  const drain = ss(U / .5);
  monitor(drain, { btnLit: ss(U / .6) });
  nightFall(540, 1050, 260, 1000, lerp(.4, .8, drain)); finishNight(.25);
}
// S11 (12.68–15.02) "tombol kecil itu punya tugas penting.": the button alone, huge; on "penting" it presses down and lights like a brake light
export function S11() {
  setLight({ dir: [0, -1], tint: '#0e1218', a: .4 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#1b1f26'; g.fillRect(0, 0, W, H);
  // the page around it, out of focus
  const pg = offscreen(1080, 1920, (ctx, w, h) => { webPage(ctx, w, h, 300, { page: 3 }); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'rgba(128,128,128,.7)'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'source-over'; });
  g.save(); g.filter = 'blur(10px) brightness(.45)'; g.drawImage(pg, 0, 0); g.restore(); g.filter = 'none';
  const pr = keys(U, [[0, 0], [1.55, 0], [1.68, 1, ease.out], [1.9, .6, ease.out]]);
  const lit = keys(U, [[0, .2], [1.6, .3], [1.75, 1, ease.out], [2.3, .85]]);
  // brake-light glow under the button: the button's job is to stop you
  g.save(); g.globalCompositeOperation = 'screen'; const gr = g.createRadialGradient(540, 980, 40, 540, 980, 520); gr.addColorStop(0, `rgba(255,180,58,${.35 * lit})`); gr.addColorStop(1, 'rgba(255,180,58,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore();
  nextButton(540, 960, 1.75, { lit, press: pr });
  // a cursor arrow resting by it (the user's place)
  push(); translate(760 + 6 * Math.sin(U * 2), 1110); rotate(-.15);
  shape([[0, 0], [0, 120], [30, 92], [52, 140], [72, 130], [50, 84], [92, 84]], { fill: '#fdfcf7', lw: 6 }); pop();
  nightFall(540, 960, 380, 1150, .7); finishNight(.25);
}
// S12 (15.02–17.30) "Di situ kamu berhenti, dan mikir…": a finger hovers over the button and hesitates; the clock ticks
export function S12() {
  setLight({ dir: [-.5, -.85], tint: '#101318', a: .38 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#1c2028'; g.fillRect(0, 0, W, H);
  // wall clock (late): the second hand ticks once a second
  push(); translate(820, 360);
  form(ell(0, 0, 150, 150), '#e9e2d0', { lw: 8, sw: 14 });
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; stroke([[Math.cos(a) * 120, Math.sin(a) * 120], [Math.cos(a) * 138, Math.sin(a) * 138]], 6); }
  const hA = -Math.PI / 2 + (11.75 / 12) * Math.PI * 2, mA = -Math.PI / 2 + (45 / 60) * Math.PI * 2, sA = -Math.PI / 2 + (Math.floor(U) + 12) / 60 * Math.PI * 2;
  stroke([[0, 0], [Math.cos(hA) * 70, Math.sin(hA) * 70]], 12); stroke([[0, 0], [Math.cos(mA) * 105, Math.sin(mA) * 105]], 9); stroke([[0, 0], [Math.cos(sA) * 118, Math.sin(sA) * 118]], 4, { line: '#b3261e' }); dot(0, 0, 10);
  pop();
  nextButton(540, 1180, 1.45, { lit: .35 });
  // the hand: index finger pointing down at the button, hovering, drifting in small hesitations
  const hov = keys(U, [[0, -40], [.6, 10, ease.inOut], [1.3, -25, ease.inOut], [2.1, 5, ease.inOut]]);
  push(); translate(520 + 14 * Math.sin(U * 1.7), 860 + hov); rotate(Math.PI / 2 - .12);
  hand(0, 0, 0, 90, SKIN.light[0], 'point'); pop();
  form(noodle([600, 120], [540, 760 + hov], -30, 120, 96), '#3b4250', { lw: 8, sw: 16 });   // sleeve from above
  screenLight(540, 1200, 700, .25);
  nightFall(560, 1000, 380, 1200, .7); finishNight(.28);
}
// S13 (17.30–19.06) "lanjut, atau udahan?": the choice, two buttons; "LANJUT ›" glows like the screen, "UDAHAN" is the amber brake
export function S13() {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#1b1f27'; g.fillRect(0, 0, W, H);
  const a1 = back(clamp(U / .2)), a2 = back(clamp((U - 1.3) / .2));
  const btn = (x, y, w, h, fill, label, k, rot) => { if (k <= 0) return; push(); translate(x, y); rotate(rot); scale(k); fillOnly(rr(-w / 2 + 10, -h / 2 + 16, w, h, 26), '#000', { alpha: .35, boil: .1 }); shape(rr(-w / 2, -h / 2, w, h, 26), { fill, lw: 8 }); pop();
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot); g.scale(k, k); g.font = '600 92px Oswald'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = INK; g.fillText(label, 0, 4); g.restore(); };
  btn(540, 700, 640, 190, SCREEN, 'LANJUT ›', a1, -.03);
  btn(540, 1080, 640, 190, AMBER, 'UDAHAN ■', a2, .025);
  if (a1 > 0) { g.save(); g.globalCompositeOperation = 'screen'; const gr = g.createRadialGradient(540, 700, 60, 540, 700, 600); gr.addColorStop(0, 'rgba(127,227,255,.22)'); gr.addColorStop(1, 'rgba(127,227,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore(); }
  // the cursor sways between the two, pulled toward the glowing one
  const cy = lerp(890, 760, ss((U - 1.4) / .4)) + 30 * Math.sin(U * 3.2);
  push(); translate(840, cy); rotate(-.15); shape([[0, 0], [0, 120], [30, 92], [52, 140], [72, 130], [50, 84], [92, 84]], { fill: '#fdfcf7', lw: 6 }); pop();
  nightFall(540, 900, 420, 1200, .65); finishNight(.25);
}
