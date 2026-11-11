// Cast Kit cards for the Blender S07 test: the worker sprinting at the camera, the woman behind. ?who=worker|woman
import { init, frame, g } from '/engine/toon.js';
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
  const ph = who === 'worker' ? t * 1.45 : t * 1.5 + .37, P = runFront(ph);
  const back = who === 'worker' ? seg(t, .8, .95) - seg(t, 1.5, 1.65) : 0;
  person({ ...CAST[who], x: 300, y: 870, s: 1.12, face: -1, headView: back > .5 ? '3/4' : 'front', pose: { ...P, headTilt: P.headTilt - .12 * back },
    expr: back > .5 ? 'shock' : (who === 'worker' ? 'fear' : 'scream'), look: back > .5 ? [-1, -.25] : [0, .05], sway: sway(ph), flutter: flutter(t, 1.4), blink: blink(t, 3) });
};
window.DUR = 3;
document.fonts.ready.then(() => { window.render(0); window.READY = true; });
