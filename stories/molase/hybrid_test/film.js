// Hybrid test: the 3D toon world (engine3d) + Cast Kit characters as 2D cards. S07 (VO 14.95–18.45).
import { THREE, Stage, fg, range, lerp, clamp, cloudsTex, THEMES } from '/engine3d/core.js';
import * as S from '/engine3d/sets.js';
import { Card } from '/engine/card.js';
import { SKIN, setLight } from '/engine/cast.js';
import { runFront, blink, sway, flutter, ease, seg } from '/engine/motion.js';
import { twos } from '/engine/look.js';
import { vnoise } from '/core/lib.js';

const AMBER = '#ffb43a';
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
const noise = (t, f, s = 0) => (vnoise(t * f + s) - .5) * 2;
const CAST = {
  worker: { body: 'man', view: 'front', skin: SKIN.light, hair: 'short', hairCol: '#3b2c24', hat: 'flatcap', hatCol: '#5d5a57', top: { type: 'coat', col: '#5b6470', cuff: '#4a525d' }, bottom: { type: 'trousers', col: '#3e3f47' }, shoes: { col: '#2a2526' }, acc: { scarf: '#8a4c42', moustache: true } },
  woman: { body: 'woman', view: 'front', skin: SKIN.fair, hair: 'bun', hairCol: '#5a3b2a', hat: 'boater', hatCol: '#4d4a5c', hatCol2: '#7a5a6a', top: { type: 'coat', col: '#6f6a7e' }, bottom: { type: 'skirt', col: '#3d3a48', legCol: '#2b2830' }, shoes: { col: '#2a2526' }, acc: { scarf: '#b9b2a6' } },
  far1: { body: 'man', view: 'front', skin: SKIN.tan, hair: 'short', hairCol: '#222', hat: 'bowler', hatCol: '#2e2e33', top: { type: 'jacket', col: '#4b4440' }, bottom: { type: 'trousers', col: '#34312f' } },
  far2: { body: 'child', view: 'front', skin: SKIN.light, hair: 'tuft', hairCol: '#7a4a2a', hat: 'flatcap', hatCol: '#6e665e', top: { type: 'jacket', col: '#7a6f62' }, bottom: { type: 'knickers', col: '#4a4a52' } },
};

const root = document.getElementById('root');
const theme = { ...THEMES.warm, sky: ['#9fb4c8', '#c9d3d8', '#e6dccb'], fog: 0xcfd2d0, fogNear: 30, fogFar: 170, sat: 1.0, contrast: 1.04, bright: 1.02, vignette: .35, grain: .07 };
const st = new Stage(root, { w: 1080, h: 1920, theme });
st.sun.position.set(-40, 50, 30); st.sun.intensity = 1.5;

// world: Commercial Street under the elevated railway, bare wet cobbles (no snow that day)
const sc = st.scene;
sc.add(S.street({ w: 11, len: 170, z0: 30 }));
sc.add(S.buildingRow({ x: 8.5, z0: 30, z1: -170, side: 1, seed: 22 }));
sc.add(S.buildingRow({ x: -8.5, z0: 30, z1: -170, side: -1, seed: 42 }));
sc.add(S.elRail({ x: 5.2, h: 6.4, z0: 30, z1: -170 }));
for (const z of [10, -14, -38, -62]) { const l = S.lamp(); l.position.set(-6.2, 0, z); sc.add(l); }
const wave = S.makeWave({ width: 24, depth: 10, seed: 11, taper: .7 }); wave.group.rotation.y = .5; sc.add(wave.group);
const sheet = S.molassesSheet({ width: 26, length: 6, lobes: 6, mat: wave.mat }); sc.add(sheet);
const drops = S.droplets({ n: 46, box: [0, 0, 0], size: [.05, .16], mat: wave.mat }); sc.add(drops);
const wg = S.wagon(); wg.rotation.y = .6; sc.add(wg);
const horse = S.horseCard({ height: 1.9, side: true }); sc.add(horse);
const planks = []; for (let i = 0; i < 6; i++) { const p = S.plank({ seed: i }); sc.add(p); planks.push(p); }

const man = new Card(1.78, { res: 1300 }), wo = new Card(1.66, { res: 1100 });
const far = [new Card(1.75, { res: 600, front: false }), new Card(1.3, { res: 500, front: false, body: 'child' })];
for (const c of [man, wo, ...far]) sc.add(c.group);

window.DUR = 3.5;
window.render = T => {
  const t = 14.95 + T, k = range(t, 14.95, 18.45), q = twos(T);
  const zw = -34 + k * 7.5;
  wave.update({ t, height: 8.6 + k * 1.2, lip: 1.1 + k * .35, curl: .1 + k * .55, surge: .3 });
  wave.group.position.set(-2, 0, zw); sheet.position.set(0, 0, zw + 2.4);
  drops.children.forEach((d, i) => { const per = 1.1, a = ((t - 14 + i * .137) % per) / per, u = (i * .618) % 1;
    d.position.set((u - .5) * 18 - 2 + (u - .5) * a * 3, 7.2 * (1.05 - .45 * u) + 3.5 * a - 9 * a * a, zw + 3.4 * (1.2 - .45 * u) + a * 3); d.scale.setScalar(.05 + (i % 4) * .03); });
  wg.position.set(-4.2, .3 + k * 1.2, zw + 3.2); wg.rotation.set(-.2 * k, .6 + k * .3, -.15 - .45 * k);
  horse.position.set(-6.3, .2 + k * .8, zw + 3.6); horse.rotation.set(0, .3, -.25 * k);
  planks.forEach((p, i) => { const a = ((t * .5 + i * .17) % 1); p.position.set(-7 + i * 2.6, 3 + (i % 3) * 1.2 + Math.sin(a * Math.PI) * 2, zw + 2 + a * 3); p.rotation.set(t * 2.1 + i, i * 1.3 + t, t * 1.6 + i * 2); });
  const zc = zw + 17.5 - k * 3.2;
  // the rim light comes from the wave behind them
  setLight({ dir: [0, -1], tint: '#2a2c3a', a: .28, rim: AMBER, rimA: .9 + .1 * k, rw: 8 });
  // worker: sprint at the camera; glances back 0.75–1.5 s (head turns to 3/4, shock), then screams forward
  const back = seg(T, .75, .9) - seg(T, 1.45, 1.6), mP = runFront(q * 1.45);
  man.group.position.set(-1.0 + Math.sin(t * 1.7) * .15, 0, zc - 3.9);
  man.draw({ ...CAST.worker, headView: back > .5 ? '3/4' : 'front', face: -1, pose: { ...mP, headTilt: mP.headTilt - .12 * back }, expr: back > .5 ? 'shock' : 'scream', look: back > .5 ? [-1, -.25] : [0, .1], sway: sway(q * 1.45), flutter: flutter(q, 1.4), blink: blink(q, 3) }, q);
  const wP = runFront(q * 1.5 + .37);
  wo.group.position.set(.7 + Math.sin(t * 1.3 + 1) * .2, 0, zc - 6.6);
  wo.draw({ ...CAST.woman, pose: wP, expr: 'scream', mouth: { o: .8 + .2 * Math.sin(q * 9) }, sway: sway(q * 1.5 + .37), flutter: flutter(q, 1.3) }, q);
  far[0].group.position.set(-4.6, .18, zc - 11.5); far[0].draw({ ...CAST.far1, pose: runFront(q * 1.35 + .2), expr: 'fear' }, q);
  far[1].group.position.set(1.6, .18, zc - 12.5); far[1].draw({ ...CAST.far2, pose: runFront(q * 1.7 + .6), expr: 'scream' }, q);
  const sh = .05 + k * .05;
  st.camera.position.set(-1.2 + noise(t, 1.3) * sh * 2, 1.05 + noise(t, 2.1, 4) * sh, zc);
  st.camera.fov = 60; st.camera.updateProjectionMatrix();
  st.camera.lookAt(v3(-1.6 + noise(t, .8, 2) * .3, 3.8, zc - 20)); st.camera.rotateZ(-.07 + noise(t, .9, 6) * .02);
  [man, wo, ...far].forEach(c => c.face(st.camera)); st.setBlur(1.2);
  st.render(t);
};
Promise.all([document.fonts.load('600 40px "Oswald"')]).then(() => { window.render(0); window.READY = true; });
