// Dark Toon Diorama — reusable, deterministic motion library for the 2D rig (rig.js).
// Every function is a pure function of time t (seconds) → no state, so any frame can be rendered in any order.
//
// Principles built in:
//  - anticipation / overshoot : ease.backIn / ease.backOut, keyframes with per-segment easing
//  - follow-through & drag    : spring(fn, t) = damped second-order response to fn's past values
//  - overlapping action       : overlap(fn, t) evaluates joint groups with small time offsets (hips lead, head & hands trail)
//  - weight shift / balance   : cycles move pelvis (bob, tilt) and counter-rotate chest; feet are auto-planted by the rig
//  - secondary motion         : sway / flutter channels drive coat hem & scarf; props get their own springs
import { clamp, lerp } from './core.js';
import { REST, handMix } from './rig.js';

const TAU = Math.PI * 2;
export const ease = {
  linear: k => k,
  in: k => k * k * k, out: k => 1 - Math.pow(1 - k, 3), inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  sine: k => .5 - .5 * Math.cos(Math.PI * k),
  backIn: k => { const c = 1.9; return k * k * ((c + 1) * k - c); },       // anticipation: dips back first
  backOut: k => { const c = 1.9; k -= 1; return k * k * ((c + 1) * k + c) + 1; }, // overshoot then settle
  backInOut: k => { const c = 1.9 * 1.525; return k < .5 ? (Math.pow(2 * k, 2) * ((c + 1) * 2 * k - c)) / 2 : (Math.pow(2 * k - 2, 2) * ((c + 1) * (k * 2 - 2) + c) + 2) / 2; },
  hold: k => k < 1 ? 0 : 1,
};
export const range = (t, a, b) => clamp((t - a) / (b - a));

// ---------------------------------------------------------------- pose arithmetic
const NUM = Object.keys(REST).filter(k => typeof REST[k] === 'number');
export function blend(a, b, k) {                  // numeric lerp, discrete fields switch at k=.5, hands blend shapes
  const o = { ...(k < .5 ? a : b) };
  for (const n of NUM) if (n in a || n in b) o[n] = lerp(a[n] ?? REST[n], b[n] ?? REST[n], k);
  o.look = [lerp((a.look || REST.look)[0], (b.look || REST.look)[0], k), lerp((a.look || REST.look)[1], (b.look || REST.look)[1], k)];
  for (const h of ['handL', 'handR']) if ((a[h] ?? 'neutral') !== (b[h] ?? 'neutral')) o[h] = handMix(a[h] ?? 'neutral', b[h] ?? 'neutral', k);
  return o;
}
export function layer(base, ...adds) {           // additive: numeric channels of adds are offsets on base
  const o = { ...base };
  for (const a of adds) for (const n in a) {
    if (typeof a[n] === 'number' && NUM.includes(n)) o[n] = (o[n] ?? REST[n]) + a[n];
    else if (n === 'look') o.look = [(o.look || [0, 0])[0] + a.look[0], (o.look || [0, 0])[1] + a.look[1]];
    else o[n] = a[n];
  }
  return o;
}
export const over = (base, o) => ({ ...base, ...o }); // override

// keyframed pose: frames = [[time, pose, easeIntoThisKey?], ...]
export function keys(t, frames) {
  if (t <= frames[0][0]) return { ...REST, ...frames[0][1] };
  for (let i = 1; i < frames.length; i++) {
    const [t1, p1, e] = frames[i];
    if (t <= t1) { const [t0, p0] = frames[i - 1]; const k = (e || ease.inOut)((t - t0) / (t1 - t0)); return blend({ ...REST, ...p0 }, { ...REST, ...p1 }, k); }
  }
  return { ...REST, ...frames[frames.length - 1][1] };
}
// scalar keyframes
export function kv(t, frames) {
  if (t <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) { const [t1, v1, e] = frames[i]; if (t <= t1) { const [t0, v0] = frames[i - 1]; return lerp(v0, v1, (e || ease.inOut)((t - t0) / (t1 - t0))); } }
  return frames[frames.length - 1][1];
}

// ---------------------------------------------------------------- follow-through: damped spring response to the past of a signal
const _w = new Map();
function weights(freq, damp, win, dt) {
  const key = freq + '|' + damp + '|' + win + '|' + dt; if (_w.has(key)) return _w.get(key);
  const w = [], om = TAU * freq, wd = om * Math.sqrt(Math.max(1e-4, 1 - damp * damp)); let s = 0;
  for (let tau = 0; tau < win; tau += dt) { const v = Math.exp(-damp * om * tau) * Math.sin(wd * tau + .0001) ; w.push(v); s += v; }
  const n = w.map(v => v / s); _w.set(key, n); return n;
}
// spring a scalar function
export function spring(fn, t, { freq = 2.2, damp = .35, win = .9, dt = 1 / 45 } = {}) {
  const w = weights(freq, damp, win, dt); let y = 0; for (let i = 0; i < w.length; i++) y += w[i] * fn(t - i * dt); return y;
}
// spring a whole pose function on selected channels (others evaluated at t)
export function springPose(poseFn, t, channels, opts) {
  const w = weights(opts?.freq ?? 2.2, opts?.damp ?? .35, opts?.win ?? .9, opts?.dt ?? 1 / 45), dt = opts?.dt ?? 1 / 45;
  const now = poseFn(t), acc = {}; channels.forEach(c => acc[c] = 0);
  for (let i = 0; i < w.length; i++) { const p = i === 0 ? now : poseFn(t - i * dt); for (const c of channels) acc[c] += w[i] * (p[c] ?? REST[c]); }
  return { ...now, ...acc };
}

// ---------------------------------------------------------------- overlapping action: joint groups trail the body
const GROUPS = {
  hips:  [['x', 'y', 'rot', 'air', 'hipL', 'knL', 'liftL', 'ftL', 'hipR', 'knR', 'liftR', 'ftR'], 0],
  spine: [['spine', 'twist'], .025],
  chest: [['chest', 'shrugL', 'shrugR'], .05],
  upper: [['shL', 'shR'], .06],
  fore:  [['elL', 'elR'], .1],
  wrist: [['wrL', 'wrR'], .14],
  head:  [['neck', 'tilt', 'turn', 'nod'], .09],
  cloth: [['sway', 'flutter'], .16],
};
export function overlap(poseFn, t, scale = 1) {
  const out = { ...poseFn(t) };
  for (const g in GROUPS) { const [ch, d] = GROUPS[g]; if (!d) continue; const p = poseFn(t - d * scale); for (const c of ch) if (c in p) out[c] = p[c]; }
  return out;
}

// ---------------------------------------------------------------- small life signals
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
export function blink(t, seed = 1) {               // ~every 2.5–4.5 s, 0.13 s long, deterministic
  let at = hash(seed) * 2;
  for (let i = 0; i < 40 && at < t + 1; i++) { if (t >= at && t < at + .13) return Math.sin(Math.PI * (t - at) / .13); at += 2.5 + hash(seed * 7 + i) * 2; }
  return 0;
}
export function breathe(t, { rate = .27, depth = 1 } = {}) { // chest rise, shoulders, subtle head
  const b = Math.sin(TAU * rate * t);
  return { shrugL: b * .08 * depth, shrugR: b * .08 * depth, chest: b * .8 * depth, tilt: Math.sin(TAU * rate * t - .6) * .6 * depth, y: -b * .006 * depth };
}
export function saccade(t, seed = 2, amp = .25) { // tiny eye darts while idle
  const i = Math.floor(t * 1.3 + hash(seed)); return [ (hash(i * 3 + seed) - .5) * amp, (hash(i * 5 + seed) - .5) * amp * .5 ];
}

// ---------------------------------------------------------------- motion library
export const M = {
  idle(t, { seed = 1, depth = 1 } = {}) {
    return layer({ ...REST, shL: 8, elL: 10, shR: 8, elR: 12, hipL: 6, hipR: 5, rot: Math.sin(t * .6 + seed) * 1.2, x: Math.sin(t * .6 + seed) * .02 },
      breathe(t, { depth }), { look: saccade(t, seed) }, { blink: blink(t, seed) });
  },
  // walk cycle, front/3-4 view. phase advances with cadence (steps per second)
  walk(t, { cadence = 1.9, energy = 1, seed = 1 } = {}) {
    const ph = t * cadence / 2, a = TAU * ph, s = Math.sin(a), c = Math.cos(a);
    return { ...REST,
      liftL: Math.max(0, s) * .45 * energy, liftR: Math.max(0, -s) * .45 * energy, knL: Math.max(0, s) * 8, knR: Math.max(0, -s) * 8,
      hipL: 5 + s * 2, hipR: 5 - s * 2,
      y: -Math.abs(Math.sin(a)) * .05 * energy + .02, rot: -s * 2.5 * energy, chest: s * 2 * energy, spine: s * 1,
      shL: 9 + s * 6 * energy, elL: 12 + Math.max(0, -s) * 25 * energy, shR: 9 - s * 6 * energy, elR: 12 + Math.max(0, s) * 25 * energy,
      shrugL: Math.max(0, -s) * .1, shrugR: Math.max(0, s) * .1, tilt: -s * 1.5, nod: Math.abs(c) * .1,
      sway: -s * .35 * energy, flutter: .15, blink: blink(t, seed) };
  },
  // run cycle toward camera (front/3-4 view): high knees, pumping bent arms, flight phase, hunched torso
  run(t, { cadence = 3.2, energy = 1, seed = 1 } = {}) {
    const ph = t * cadence / 2 + hash(seed) * .5, a = TAU * ph, s = Math.sin(a);
    const up = Math.pow(Math.abs(s), 1.3);
    return { ...REST,
      liftL: Math.max(0, s) * .95 * energy, liftR: Math.max(0, -s) * .95 * energy,
      knL: 4 + Math.max(0, s) * 14, knR: 4 + Math.max(0, -s) * 14, hipL: 7 - s * 3, hipR: 7 + s * 3, ftL: Math.max(0, s) * 25, ftR: Math.max(0, -s) * 25,
      air: up * .1 * energy, y: up * -.04, rot: -s * 4 * energy, chest: s * 5 * energy, spine: s * 1.5,
      // arms pump opposite to legs: forward arm → hand up near chest (elbow tightly bent), back arm → hand low and out
      shL: 22 + Math.max(0, -s) * 18 * energy, elL: 70 + Math.max(0, -s) * 55 * energy - Math.max(0, s) * 20, wrL: 10,
      shR: 22 + Math.max(0, s) * 18 * energy, elR: 70 + Math.max(0, s) * 55 * energy - Math.max(0, -s) * 20, wrR: 10,
      shrugL: .25 + Math.max(0, -s) * .2, shrugR: .25 + Math.max(0, s) * .2,
      handL: 'fist', handR: 'fist', nod: .25, tilt: -s * 3, sway: -s * .6 * energy, flutter: .9 * energy,
      eyes: 'wide', brows: 'fear', mouth: 'shout', blink: 0 };
  },
  lookUp(k) { return { tilt: -14 * k, nod: -.6 * k, look: [0, -1 * k], chest: -3 * k, shL: 6, shR: 6 }; },
  lookAt(dir, k = 1) { return { turn: dir[0] * .6 * k, tilt: dir[1] * 8 * k, look: [dir[0] * k, dir[1] * k], twist: dir[0] * .25 * k }; },
  // reach toward a side (S: 'L'|'R'), k: 0..1 progress (use keys/ease for anticipation)
  reach(S, k, { height = 0 } = {}) {
    const s = S === 'L' ? 'L' : 'R'; const o = {};
    o['sh' + s] = lerp(10, 100 + height * 35, k); o['el' + s] = lerp(10, -5, k); o['wr' + s] = lerp(0, -10, k); o['shrug' + s] = .25 * k;
    o['hand' + s] = k < .7 ? handMix('neutral', 'reach', k / .7) : 'reach'; o.twist = (S === 'L' ? -1 : 1) * .2 * k; o.chest = (S === 'L' ? -1 : 1) * 4 * k;
    return o;
  },
  grab(S, k) { const o = {}; o['hand' + S] = handMix('reach', 'grip', k); return o; },
  // hold a small object in front of the chest with both hands (cup, box)
  holdFront(k = 1, { height = 0 } = {}) {
    return { shL: lerp(8, -8, k), elL: lerp(10, 115 + height * 20, k), wrL: lerp(0, -25, k), shR: lerp(8, -8, k), elR: lerp(10, 115 + height * 20, k), wrR: lerp(0, -25, k),
      handL: handMix('neutral', 'cup', k), handR: handMix('neutral', 'cup', k), armFront: { L: true, R: true } };
  },
  carry(k = 1) { return { shL: lerp(8, 18, k), elL: lerp(10, 40, k), shR: lerp(8, 18, k), elR: lerp(10, 40, k), handL: 'grip', handR: 'grip', chest: -4 * k, nod: .3 * k, shrugL: .2 * k, shrugR: .2 * k }; },
  crouch(k) { // knees out & bent, thighs foreshortened, torso leans in
    return { liftL: .55 * k, liftR: .55 * k, hipL: 5 + 112 * k, hipR: 5 + 112 * k, knL: 125 * k, knR: 125 * k, ftL: 0, ftR: 0, nod: .3 * k, crouch: k };
  },
  recoil(k) { // react: snap back, arms up defensively, eyes wide (k peaks ~1 then settles)
    return { spine: -6 * k, chest: -6 * k, tilt: -6 * k, shL: 10 + 35 * k, elL: 10 + 80 * k, shR: 10 + 35 * k, elR: 10 + 80 * k, handL: k > .3 ? 'open' : 'neutral', handR: k > .3 ? 'open' : 'neutral',
      shrugL: .35 * k, shrugR: .35 * k, eyes: k > .2 ? 'wide' : 'normal', brows: k > .2 ? 'fear' : 'neutral', mouth: k > .3 ? 'shock' : 'neutral' };
  },
  brace(k) { return { hipL: 5 + 12 * k, hipR: 5 + 12 * k, knL: -8 * k, knR: -8 * k, shL: 10 + 50 * k, elL: 10 + 60 * k, shR: 10 + 50 * k, elR: 10 + 60 * k, handL: 'open', handR: 'open', nod: .5 * k, eyes: 'squint', brows: 'fear', mouth: 'grim' }; },
  fall(k) { return { rot: 25 * k, spine: 20 * k, chest: 15 * k, shL: 10 + 120 * k, elL: 10, shR: 10 + 80 * k, elR: 30, liftL: .6 * k, air: .2 * Math.sin(Math.PI * k), handL: 'open', handR: 'open', eyes: 'wide', mouth: 'shock' }; },
};
