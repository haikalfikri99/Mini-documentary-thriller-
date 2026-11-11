// Cast Kit cards for the Blender S07 test: the worker sprinting at the camera, the woman behind. ?who=worker|woman
import { init, frame, g, push, pop, translate, rotate, scale, spline, noodle, ell, stroke, dot, fillOnly } from '/engine/toon.js';
import { form } from '/engine/cast.js';
import { person, SKIN, setLight } from '/engine/cast.js';
import { runFront, blink, sway, flutter, seg } from '/engine/motion.js';
const who = new URLSearchParams(location.search).get('who') || 'worker';
const CAST = {
  worker: { body: 'man', view: 'front', skin: SKIN.light, age: 1, hair: 'short', hairCol: '#3b2c24', hat: 'flatcap', hatCol: '#55575c', top: { type: 'coat', col: '#6b7078', cuff: '#555a61' }, bottom: { type: 'trousers', col: '#4a4b52' }, shoes: { col: '#3a2b22' }, acc: { scarf: '#4b4e55', moustache: true } },
  woman: { body: 'woman', view: 'front', skin: SKIN.fair, hair: 'bun', hairCol: '#4a3326', hat: 'boater', hatCol: '#4d4a55', hatCol2: '#6a5a62', top: { type: 'coat', col: '#5d5966' }, bottom: { type: 'skirt', col: '#3d3a44', legCol: '#2b2830' }, shoes: { col: '#2a2526' }, acc: { scarf: '#9a958c' } },
};
const cv = document.getElementById('c'); init(cv);
window.render = t => {
  frame(t); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 600, 900);
  setLight({ dir: [0, -1], tint: '#20232c', a: .3, rim: '#ffb43a', rimA: .95, rw: 8 });   // amber rim from the wave behind
  if (who === 'horse') { setLight({ dir: [0, -1], tint: '#20232c', a: .3, rim: '#ffb43a', rimA: .95, rw: 8 }); horse(t); return; }
  const ph = who === 'worker' ? t * 1.45 : t * 1.5 + .37, P = runFront(ph);
  const back = who === 'worker' ? seg(t, .8, .95) - seg(t, 1.5, 1.65) : 0;
  person({ ...CAST[who], x: 300, y: 870, s: 1.12, face: -1, headView: back > .5 ? '3/4' : 'front', pose: { ...P, headTilt: P.headTilt - .12 * back },
    expr: back > .5 ? 'shock' : (who === 'worker' ? 'fear' : 'scream'), look: back > .5 ? [-1, -.25] : [0, .05], sway: sway(ph), flutter: flutter(t, 1.4), blink: blink(t, 3) });
};
// a panicked horse, side view, rearing as the wave lifts the wagon (chestnut, dark mane, harness)
function horse(t) {
  const C = '#5e3d2a', D = '#2a1b13', H = '#3a2a22', rear = .35 + .12 * Math.sin(t * 7), kick = Math.sin(t * 11);
  push(); translate(290, 700); rotate(-rear); scale(.6);
  const leg = (hip, a1, a2, len = 120) => { const k = [hip[0] + Math.sin(a1) * len, hip[1] + Math.cos(a1) * len], f = [k[0] + Math.sin(a2) * len * .95, k[1] + Math.cos(a2) * len * .95];
    form(noodle(hip, k, 0, 40, 26), C, { lw: 6 }); form(noodle(k, f, 0, 24, 18), C, { lw: 6 }); form(ell(f[0], f[1] + 6, 15, 10, 12), D, { lw: 5 }); };
  leg([-130, -40], .25, .1); leg([110, -30], -.9 - .3 * kick, .6 + .5 * kick, 105);   // far legs
  form(spline([[-220, -150], [-90, -205], [80, -200], [190, -160], [210, -60], [140, 0], [-60, 10], [-200, -30], [-245, -90]]), C, { lw: 7, sw: 30 });
  form(spline([[-235, -140], [-300, -120], [-330, -30], [-300, 60], [-280, 0], [-270, -80]]), D, { lw: 6 });   // tail
  form(noodle([140, -140], [245, -315], -20, 150, 90), C, { lw: 7 });                                   // neck
  form(spline([[205, -350], [275, -385], [355, -330], [380, -280], [350, -260], [290, -280], [240, -300]]), C, { lw: 7, sw: 14 });   // head
  form(spline([[130, -170], [170, -260], [215, -350], [245, -370], [225, -300], [190, -230], [160, -150]]), D, { lw: 6 });   // mane
  form(ell(262, -372, 12, 22, 12), C, { lw: 5 });   // ear
  form(ell(282, -336, 14, 12, 14), '#fffdf7', { lw: 5, flat: true, shade: () => dot(286, -334, 4) });   // panicked eye
  dot(366, -282, 5, D);
  stroke([[300, -300], [210, -240], [120, -150]], 6, { line: H }); stroke([[250, -230], [40, -110], [-180, -120]], 6, { line: H });   // harness
  leg([-120, -30], .45, .2); leg([120, -20], -1.2 - .35 * kick, .9 + .6 * kick, 110);                // near legs: forelegs thrashing
  pop();
}
window.DUR = 3;
document.fonts.ready.then(() => { window.render(0); window.READY = true; });
