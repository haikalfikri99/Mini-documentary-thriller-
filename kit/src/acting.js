// ACTING — time-driven performance for ARSIP RIG characters. Pure functions of t (seek-safe). Use inside world.actor({ pose: t => … }).
//   pose: t => ({ ...base, ...perform(t, [
//     { t: 0,   expr: 'lelah', gaze: [.7, .3], headTilt: .1 },                 // hold
//     { t: 2.0, dur: .5, gaze: [-.2, .1], rh: GESTURE.faceHand },              // move with anticipation + overshoot
//     { t: 3.4, expr: 'kaget', lean: -.08 },
//   ]), ...idle(t) })
// Numbers and arrays glide from the previous key to the next (start t, duration dur) with a small anticipation dip and overshoot;
// strings (expr, mouth) switch at the key time. Fields: anything the rig pose takes (gaze, headTilt, lean, look, rh, lh, expr, mouth, …).
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const ease = x => (x = clamp(x), x * x * (3 - 2 * x));
// 0 before t0, 1 after t0+dur; dips back a little first (anticipation) and overshoots a little at the end
export function move(t, t0, dur = .45, { anticipate = .07, overshoot = .06 } = {}) {
  const u = (t - t0) / dur; if (u <= 0) return 0; if (u >= 1) return 1;
  return ease(u) - anticipate * Math.sin(clamp(u / .28) * Math.PI) * (u < .28 ? 1 : 0) + overshoot * Math.sin(clamp((u - .62) / .38) * Math.PI) * (u > .62 ? 1 : 0);
}
const lerpV = (a, b, p) => Array.isArray(a) ? a.map((x, i) => x + (b[i] - x) * p) : a + (b - a) * p;
export function perform(t, keys) {
  const out = {}, fields = new Set(); keys.forEach(k => Object.keys(k).forEach(f => { if (f !== 't' && f !== 'dur' && f !== 'opts') fields.add(f); }));
  for (const f of fields) {
    const arr = keys.filter(k => f in k).sort((a, b) => a.t - b.t); let prev = arr[0][f], val;
    for (let i = 0; i < arr.length; i++) {
      const k = arr[i], d = k.dur ?? .45; if (t < k.t) break;
      if (typeof k[f] === 'string') { val = k[f]; continue; }
      val = i === 0 ? k[f] : lerpV(prev, k[f], move(t, k.t, d, k.opts)); if (t >= k.t + d) prev = k[f];
    }
    if (val !== undefined) out[f] = val;
  }
  return out;
}
// micro-movement so a held pose is never dead: slow head sway and weight shift (blink + breath already come from the rig's LIFE clock)
export const idle = (t, amp = 1, seed = 0) => ({ headTilt: amp * (.018 * Math.sin(t * 1.1 + seed) + .008 * Math.sin(t * 2.7 + seed * 2)), lean: amp * .012 * Math.sin(t * .7 + seed) });
// eye darts: the gaze jumps to a new nearby point a few times a second (deterministic by seed). Add to a base gaze: gaze: addDarts([.6,.3], t)
export function addDarts(g, t, { rate = 2.4, amp = .07, seed = 1 } = {}) {
  const i = Math.floor(t * rate), h = n => { const r = Math.sin(n * 91.7 + seed * 13.1) * 43758.5453; return r - Math.floor(r); };
  return [g[0] + (h(i) - .5) * 2 * amp, g[1] + (h(i + 77) - .5) * amp];
}
// hand targets relative to the shoulder (rig units). `rest` = no target: the rig's own relaxed arm. Values were checked on the lab sheet
// (kit/lab/acting → kit/renders/10_gestur.png); tune per shot. faceHand = hand over the eyes (facepalm / disbelief), mouth = hand over the mouth.
export const GESTURE = { rest: {}, point: { rh: [130, -15] }, faceHand: { rh: [34, -88] }, mouth: { rh: [30, -70] }, phoneRaise: { rh: [86, 18] }, shrug: { lh: [-62, 78], rh: [62, 78] }, reach: { rh: [100, 70] } };
