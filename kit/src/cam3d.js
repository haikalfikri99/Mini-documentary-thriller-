// CAM3D — one continuous virtual camera for the hybrid 2.5D/3D shots (no three.js import: pure math + pose application).
// A take is a list of keys on an ORBIT rig: { t, tx,ty,tz (target), az, el (deg), dist, fov (deg), roll (deg), hold? }.
//   az 0 = camera on the +z side of the target, 90 = on the +x side. el 90 = straight down.
// Channels are interpolated with cubic Hermite and Catmull-Rom tangents, so the camera never stops at a key
// (that "stop at every key" feel is what makes cheap camera moves read as slideshows). key.hold in 0..1 scales the
// tangent: 0 = ease to a dead stop on that key (a deliberate beat), 1 = fly through it.
export const CH = ['tx', 'ty', 'tz', 'az', 'el', 'dist', 'fov', 'roll'];
// dist is interpolated in log space: a zoom from 3600 to 190 must be a constant-rate zoom, not a lurch at the end
const LOG = { dist: true }, val = (k, c) => LOG[c] ? Math.log(k[c]) : k[c];
export function makePath(keys) {
  const n = keys.length;
  const tan = (i, c) => {
    const k = keys[i], h = k.hold ?? 1;
    const a = keys[Math.max(0, i - 1)], b = keys[Math.min(n - 1, i + 1)];
    const dt = b.t - a.t; return dt > 0 ? h * (val(b, c) - val(a, c)) / dt : 0;
  };
  return t => {
    t = Math.max(keys[0].t, Math.min(keys[n - 1].t, t));
    let i = 0; while (i < n - 2 && t >= keys[i + 1].t) i++;
    const k0 = keys[i], k1 = keys[i + 1], dt = k1.t - k0.t, s = dt > 0 ? (t - k0.t) / dt : 0;
    const h00 = 2 * s ** 3 - 3 * s ** 2 + 1, h10 = s ** 3 - 2 * s ** 2 + s, h01 = -2 * s ** 3 + 3 * s ** 2, h11 = s ** 3 - s ** 2;
    const P = {}; for (const c of CH) { const v = h00 * val(k0, c) + h10 * dt * tan(i, c) + h01 * val(k1, c) + h11 * dt * tan(i + 1, c); P[c] = LOG[c] ? Math.exp(v) : v; }
    return P;
  };
}
// hand-held float: small, slow, decaying drift on target/angles (amount in 0..1), deterministic in t
export function handheld(P, t, amount = 1) {
  const a = amount, w = (f, p) => Math.sin(t * f + p);
  return { ...P, tx: P.tx + a * (w(1.3, 0) * .9 + w(2.9, 1) * .35), ty: P.ty + a * (w(1.7, 2) * .7 + w(3.3, 4) * .25), az: P.az + a * w(.9, 3) * .35, el: P.el + a * w(1.1, 5) * .25, roll: P.roll + a * w(.7, 6) * .25 };
}
export function applyPose(camera, P) {
  const az = P.az * Math.PI / 180, el = P.el * Math.PI / 180, ce = Math.cos(el);
  camera.position.set(P.tx + P.dist * Math.sin(az) * ce, P.ty + P.dist * Math.sin(el), P.tz + P.dist * Math.cos(az) * ce);
  camera.up.set(0, 1, 0); camera.lookAt(P.tx, P.ty, P.tz); camera.rotateZ(P.roll * Math.PI / 180);
  if (camera.fov !== P.fov) { camera.fov = P.fov; camera.updateProjectionMatrix(); }
}
// how fast the view is changing between two poses (deg-equivalents per frame): drives the motion-blur sample count
export function camSpeed(A, B) {
  const d = Math.hypot(B.tx - A.tx, B.ty - A.ty, B.tz - A.tz) / Math.max(1, (A.dist + B.dist) / 2) * 57;
  return Math.hypot(B.az - A.az, B.el - A.el, B.roll - A.roll) + d + Math.abs(Math.log(B.dist / A.dist)) * 57 + Math.abs(B.fov - A.fov) * .5;
}
