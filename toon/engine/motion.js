// motion.js — deterministic motion for the Cast Kit: every value is a pure function of time (frames render in any order, in parallel).
import { clamp, lerp, hash, TAU } from '/core/lib.js';

export const ease = {
  in: t => clamp(t) ** 3, out: t => 1 - (1 - clamp(t)) ** 3,
  inOut: t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; },
  back: (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); },   // overshoot
  antic: (t, s = 1.4) => { t = clamp(t); return t * t * ((s + 1) * t - s); },          // anticipation (dips back first)
};
export const seg = (t, a, b) => clamp((t - a) / (b - a));

// numeric blend of two poses (numbers, arrays and nested objects); non-numbers switch at k = .5
export function mixPose(a, b, k) {
  if (typeof a === 'number' && typeof b === 'number') return lerp(a, b, k);
  if (Array.isArray(a) && Array.isArray(b)) return a.map((v, i) => mixPose(v, b[i] ?? v, k));
  if (a && b && typeof a === 'object' && typeof b === 'object') { const o = { ...a, ...b }; for (const key of Object.keys(o)) if (key in a && key in b) o[key] = mixPose(a[key], b[key], k); return o; }
  return k < .5 ? (a ?? b) : (b ?? a);
}

// blink: a 0.13 s blink every 2.4–4 s, offset by seed
export function blink(t, seed = 0) {
  const per = 2.4 + hash(seed) * 1.6, ph = (t + hash(seed * 3.1) * per) % per; return ph < .13;
}
// breathing: small vertical bob and a shoulder lift
export const breathe = (t, seed = 0, amp = 1) => Math.sin((t + seed) * TAU * .28) * 3 * amp;

// run cycle (3/4 view, toward or across camera). ph in cycles; rate ≈ 2.6 steps/s for a sprint
export function run(ph, k = 1) {
  const s = Math.sin(ph * TAU), c = Math.cos(ph * TAU), lift = v => -96 * Math.max(0, v) ** 1.3;
  const armSwing = s;   // front arm forward when the back leg is forward
  return {
    lean: .12 * k, bob: -16 * (1 - Math.abs(s)) * k - 4, headTilt: -.04 + .03 * c,
    legF: [60 * s * k, lift(c) * k, -30 * s - 14 * Math.max(0, c)], legB: [-60 * s * k, lift(-c) * k, 30 * s - 14 * Math.max(0, -c)],
    armF: { h: [lerp(-70, 82, (1 - armSwing) / 2), lerp(118, 70, (1 - armSwing) / 2)], bend: lerp(42, -64, (1 - armSwing) / 2), fist: 1 },
    armB: { h: [lerp(78, -84, (1 - armSwing) / 2), lerp(74, 116, (1 - armSwing) / 2)], bend: lerp(-60, 46, (1 - armSwing) / 2), fist: 1 },
  };
}
// run cycle in the front view (running at the camera): feet lift alternately, arms pump across the chest
export function runFront(ph, k = 1) {
  const s = Math.sin(ph * TAU), c = Math.cos(ph * TAU), lift = v => -92 * Math.max(0, v) ** 1.3, a = (1 + s) / 2;
  return {
    lean: .05 * s, bob: -18 * (1 - Math.abs(s)) * k - 4, headTilt: -.04 * s,
    legF: [6 * s, lift(c) * k, 8], legB: [-6 * s, lift(-c) * k, -8],
    armF: mixPose({ h: [-30, 34], bend: -70, fist: 1 }, { h: [40, 150], bend: -20, fist: 1 }, a),
    armB: mixPose({ h: [30, 34], bend: 70, fist: 1 }, { h: [-40, 150], bend: 20, fist: 1 }, 1 - a),
  };
}
// walk cycle: smaller strides, no flight phase
export function walk(ph, k = 1) {
  const s = Math.sin(ph * TAU), c = Math.cos(ph * TAU);
  return {
    lean: .03 * k, bob: -6 * (1 - Math.abs(s)), legF: [30 * s, -30 * Math.max(0, c) ** 2, -8 * s], legB: [-30 * s, -30 * Math.max(0, -c) ** 2, 8 * s],
    armF: { h: [-26 * s, 172], bend: 14 }, armB: { h: [26 * s, 174], bend: -14 },
  };
}
// cloth follow-through: hem sway and scarf flutter lag the body by ~0.12 s
export const sway = (ph, k = 1) => Math.sin((ph - .12) * TAU) * .35 * k;
export const flutter = (t, speed = 1) => Math.sin(t * TAU * 1.7 * speed) * .5 + Math.sin(t * TAU * 3.1 * speed + 1) * .25 + .4 * speed;
// sprint straight at the camera (front view), for someone fleeing what is behind them:
// high knees (the lifted leg foreshortens: the foot rises and the knee pushes out), fists pump from hip to chin in opposition
// to the legs, shoulders counter-rotate, the body bobs highest in the flight phase and the head is thrust forward.
export function sprintAt(ph, k = 1) {
  const s = Math.sin(ph * TAU), c = Math.cos(ph * TAU), up = v => Math.max(0, v) ** 1.2;
  const a = (1 + s) / 2;   // a = 1: right (front) arm up, left leg up
  return {
    lean: .07 * s * k, bob: (-30 * Math.abs(c) + 6) * k, headTilt: .1 + .03 * s,
    legF: [10 * s, -150 * up(-s) * k, 40 * up(-s)], legB: [-10 * s, -150 * up(s) * k, -40 * up(s)],
    armF: mixPose({ h: [44, 170], bend: 40, fist: 1 }, { h: [-40, -10], bend: -110, fist: 1 }, a),
    armB: mixPose({ h: [-44, 170], bend: -40, fist: 1 }, { h: [40, -10], bend: 110, fist: 1 }, 1 - a),
  };
}
