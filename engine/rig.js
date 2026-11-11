// Dark Toon Diorama — skeletal 2D character rig (forward kinematics) with articulated hands.
// Same character design as actor.js v1 (palette, face, hats, outline, rim light); this adds a real joint hierarchy.
//
// Joint hierarchy (all angles in degrees, screen-clockwise positive):
//   root(pelvis: x, y, rot) ─ spine ─ chest ─ neck ─ head(tilt, turn, nod)
//                            │        └ shoulder L/R (shrug) ─ upperArm ─ forearm ─ wrist ─ hand(palm, thumb, 4 fingers)
//                            └ hip L/R ─ thigh(lift = foreshortening toward camera) ─ shin ─ foot
// Limb angles use "outward-positive" (arms/legs: + swings away from the body midline), elbow/knee "+ = bend inward".
// Units: head heights (hh). Ground is y = 0, up is negative y. Feet are auto-planted unless P.air > 0.
import { clamp, lerp } from './core.js';
import { INK, CAST, capsule, spline, shade, rimLight, headShade, hairAndHat, face } from './actor.js';

const D = Math.PI / 180;
const rotV = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const down = (a) => rotV([0, 1], a), up = (a) => rotV([0, -1], a);

// ---------------------------------------------------------------- hand shapes
export const HANDS = {
  neutral: { curl: .2, spread: .05, thumb: 18, len: 1 },
  open:    { curl: .02, spread: .3, thumb: 58, len: 1 },
  reach:   { curl: .1, spread: .2, thumb: 48, len: 1.08 },
  grip:    { curl: .72, spread: .02, thumb: 74, len: 1, grip: true },
  fist:    { fist: true },
  point:   { curl: .9, spread: .04, thumb: 30, len: 1, point: true },
  cup:     { curl: .62, spread: .04, thumb: 70, len: 1, grip: true },
};
export function handMix(a, b, k) { // blend two hand shapes (fist blends via curl → 1)
  const A = HANDS[a] || a, B = HANDS[b] || b; const f = h => h.fist ? { curl: 1, spread: 0, thumb: 80, len: .95, fist: true } : h;
  const x = f(A), y = f(B); const o = {}; for (const k2 of ['curl', 'spread', 'thumb', 'len']) o[k2] = lerp(x[k2] ?? 0, y[k2] ?? 0, k);
  o.fist = k > .5 ? !!y.fist : !!x.fist; o.grip = k > .5 ? !!y.grip : !!x.grip; o.point = k > .5 ? !!y.point : !!x.point; return o;
}

// ---------------------------------------------------------------- default pose (neutral stand)
export const REST = {
  v: 2, x: 0, y: 0, rot: 0, air: 0,                   // pelvis offset (hh) and tilt
  spine: 0, chest: 0, twist: 0,                       // twist (-1..1) narrows shoulders / turns torso
  neck: 0, tilt: 0, turn: 0, nod: 0,                  // head
  shrugL: 0, shrugR: 0,
  shL: 10, elL: 8, wrL: 0, shR: 10, elR: 8, wrR: 0,   // arms
  hipL: 5, knL: 0, liftL: 0, ftL: 0, hipR: 5, knR: 0, liftR: 0, ftR: 0,
  handL: 'neutral', handR: 'neutral',
  eyes: 'normal', brows: 'neutral', mouth: 'neutral', look: [0, 0], blink: 0,
  sway: 0, flutter: 0, crouch: 0,                              // secondary motion inputs (coat hem, scarf)
  armFront: null,                                     // {L:bool,R:bool} override draw order
  prop: null,                                         // { hand: 'L'|'R'|'both', kind: 'cup'|'hammer'|..., fill }
};

// ---------------------------------------------------------------- skeleton solve
export function solve(ch, P) {
  P = { ...REST, ...P };
  const kid = ch.age < 14, b = ch.build || 1;
  const legH = kid ? 1.75 : 2.25, torsoH = kid ? 1.3 : 1.65;
  const L = { thigh: legH * .5, shin: legH * .47, foot: .12, ua: (kid ? .74 : .92) * b, fa: (kid ? .66 : .8) * b,
    shW: (kid ? .62 : .82) * b, hipW: (kid ? .4 : .48) * b, limb: (kid ? .15 : .18) * b, neck: .22 };
  const twist = clamp(P.twist + P.turn * .35, -1, 1);
  const J = {};
  const root = [P.x, -legH + P.y];
  const pr = P.rot * D;
  J.pelvis = { p: root, a: pr };
  const spA = pr + P.spine * D; J.spineTop = { p: add(root, mul(up(spA), torsoH * .5)), a: spA };
  const chA = spA + P.chest * D; J.chest = { p: add(J.spineTop.p, mul(up(chA), torsoH * .48)), a: chA };
  const nkA = chA + P.neck * D; J.neck = { p: add(J.chest.p, mul(up(nkA), L.neck)), a: nkA };
  const hdA = nkA + P.tilt * D; J.head = { p: add(J.neck.p, mul(up(hdA), .5)), a: hdA };
  // shoulders (on chest frame), narrowed by twist
  const sw = L.shW * (1 - Math.abs(twist) * .28);
  for (const [S, s] of [['L', -1], ['R', 1]]) {
    const off = rotV([s * sw * .78 + twist * .06, .1 - (P['shrug' + S] || 0) * .12], chA);
    const sp = add(J.chest.p, off);
    const a1 = chA - s * P['sh' + S] * D; const e = add(sp, mul(down(a1), L.ua));
    const a2 = a1 + s * P['el' + S] * D; const w = add(e, mul(down(a2), L.fa));
    const a3 = a2 + s * P['wr' + S] * D;
    J['sh' + S] = { p: sp, a: a1 }; J['el' + S] = { p: e, a: a2 }; J['wr' + S] = { p: w, a: a3 };
    // legs
    const hp = add(root, rotV([s * L.hipW * .48, 0], pr));
    const lift = P['lift' + S] || 0;
    const t1 = pr - s * P['hip' + S] * D; const k = add(hp, mul(down(t1), L.thigh * (1 - lift * .62)));
    const t2 = t1 + s * P['kn' + S] * D; const f = add(k, mul(down(t2), L.shin * (1 - lift * .12)));
    J['hp' + S] = { p: hp, a: t1 }; J['kn' + S] = { p: k, a: t2 }; J['ft' + S] = { p: f, a: t2 + s * (P['ft' + S] || 0) * D, lift };
  }
  // plant: lowest foot sole on the ground (unless airborne)
  const sole = Math.max(J.ftL.p[1], J.ftR.p[1]) + L.limb * .6;
  const dy = -sole - (P.air || 0);
  for (const k2 in J) J[k2].p = [J[k2].p[0], J[k2].p[1] + dy];
  J.L = L; J.twist = twist; J.kid = kid; J.legH = legH; J.torsoH = torsoH;
  return J;
}

// ---------------------------------------------------------------- hand drawing (local frame: y along fingers)
export function handPaths(h, s, r) {
  // hand-local coords: +y = wrist → fingertips; ts = thumb side (midline). r = hand scale (whole hand ≈ 1.25 r long).
  const out = [], lines = [], ts = -s;
  const pw = r * .44, pl = r * .5;
  if (h.fist) {
    out.push(spline([[-pw * .95, 0], [pw * .95, 0], [pw * 1.12, pl * .7], [pw * .9, pl * 1.45], [-pw * .9, pl * 1.45], [-pw * 1.12, pl * .7]], .22));
    for (let i = 1; i < 4; i++) { const x = -pw + i * pw * .5; lines.push([[x, pl * 1.05], [x, pl * 1.42]]); }
    out.push(spline([[ts * pw * 1.1, pl * .15], [ts * pw * .6, pl * .05], [-ts * pw * .25, pl * .75], [-ts * pw * .1, pl * 1.0], [ts * pw * .55, pl * .8]], .2)); // thumb wrapped over fingers
    return { out, lines };
  }
  out.push(spline([[-pw * .8, 0], [pw * .8, 0], [pw * 1.0, pl * .55], [pw * .92, pl * 1.05], [-pw * .92, pl * 1.05], [-pw * 1.0, pl * .55]], .2));
  const len = h.len || 1, fr = r * .1;
  const L = [.86, .94, .86, .68];
  for (let i = 0; i < 4; i++) {
    const idx = ts > 0 ? 3 - i : i;                      // 0 index (thumb side) … 3 pinky
    const u = (i - 1.5) / 1.5;
    let curl = h.curl; if (h.point && idx === 0) curl = 0;
    const fl = r * L[idx] * len;
    const base = [u * pw * .74, pl * .95];
    const a1 = -(u * h.spread * 1.1) - ts * curl * .25;
    const p1 = add(base, mul(rotV([0, 1], a1), fl * .52 * (1 - curl * .3)));
    const a2 = a1 - ts * curl * 2.1;
    const p2 = add(p1, mul(rotV([0, 1], a2), fl * .48 * (1 - curl * .25)));
    out.push(capsule(...base, ...p1, fr, fr * .95), capsule(...p1, ...p2, fr * .95, fr * .88));
  }
  const ta = -ts * (h.thumb ?? 30) * D;
  const t0 = [ts * pw * .7, pl * .2], t1 = add(t0, mul(rotV([0, 1], ta), r * .32)), t2 = add(t1, mul(rotV([0, 1], ta * .5), r * .28));
  out.push(capsule(...t0, ...t1, fr * 1.25, fr * 1.08), capsule(...t1, ...t2, fr * 1.08, fr * .95));
  return { out, lines };
}

// ---------------------------------------------------------------- painter
export function drawRig(g, W, H, ch, P, light = {}) {
  P = { ...REST, ...P };
  const Lt = { rim: null, rimSide: -1, rimA: 1, shadowA: .3, ...light };
  const S = H * .93 / (ch.heads + (ch.hat ? .3 : ch.cap ? .12 : 0));
  const lw = clamp(H * .0062, 2.2, 9) / S;
  const J = solve(ch, P), L = J.L;
  g.save(); g.translate(W / 2, H * .985); g.scale(S, S); g.lineJoin = 'round'; g.lineCap = 'round';
  const parts = []; const push = (z, path, fill, o = {}) => parts.push({ z, path, fill, ...o });
  const turn = P.turn || 0;
  const near = turn > .08 ? 'R' : turn < -.08 ? 'L' : null; // body turned toward its right → right side nearer camera
  const armZ = S2 => { if (P.armFront && P.armFront[S2] !== undefined) return P.armFront[S2] ? 3 : -2; return near && S2 !== near ? -2 : 3; };
  const crouching = (P.crouch || 0) > .4;
  const legZ = S2 => crouching ? .4 : near && S2 !== near ? -4 : -3;

  // legs: trousers + boots
  for (const S2 of ['L', 'R']) {
    const s = S2 === 'L' ? -1 : 1, z = legZ(S2), hp = J['hp' + S2].p, k = J['kn' + S2].p, f = J['ft' + S2].p, lift = J['ft' + S2].lift;
    push(z, capsule(...hp, ...k, L.limb * 1.28, L.limb * 1.08), ch.pants);
    push(z + .1, capsule(...k, ...f, L.limb * 1.08, L.limb * .9), ch.pants);
    if (lift > .3) push(z + .05, (() => { const p = new Path2D(); p.ellipse(k[0], k[1], L.limb * 1.15, L.limb * .95, 0, 0, 7); return p; })(), shade(ch.pants, .06)); // knee cap toward camera
    const bw = L.limb * 1.4, bh = L.limb * 1.1, fa = J['ft' + S2].a * .3, toe = s * .04;
    const boot = spline([[-bw, -bh * .7], [bw * .9, -bh * .75], [bw * 1.12 + toe, bh * .3], [0, bh * (.55 - lift * .25)], [-bw * 1.08, bh * .3]].map(p => add(f, rotV(p, fa))), .18);
    push(z + .2, boot, ch.boots);
  }
  // coat (follows pelvis + chest, hem sways)
  const kid = J.kid, cA = J.chest.a, pA = J.pelvis.a, tw = J.twist;
  const C = p => add(J.chest.p, rotV(p, cA)), Pl = p => add(J.pelvis.p, rotV(p, pA));
  const sw = L.shW * (1 - Math.abs(tw) * .28);
  const legSpread = Math.abs(J.knL.p[0] - J.knR.p[0]);
  const hemY = ((ch.coatLen) * (kid ? .8 : 1) * .78 + .05) * (1 - (P.crouch || 0) * .55);
  const flare = (ch.dress ? .42 : .18) + Math.max(0, legSpread - L.hipW) * .45;
  const swayX = (P.sway || 0) * .22, fl = P.flutter || 0;
  const hem = (u) => Pl([u * (L.hipW + flare) + swayX * (1 + Math.abs(u) * .4), hemY + Math.sin(u * 3 + fl * 6) * .04 * fl - Math.abs(u) * swayX * .3 * Math.sign(u * swayX)]);
  const coatPts = [C([-sw, .14]), C([-sw * .55, -.02]), C([0, .05]), C([sw * .55, -.02]), C([sw, .14]), C([sw * .92, J.torsoH * .45]),
    Pl([L.hipW * 1.05, -.15]), hem(1), hem(.35), hem(-.35), hem(-1), Pl([-L.hipW * 1.05, -.15]), C([-sw * .92, J.torsoH * .45])];
  push(0, spline(coatPts, .12), ch.coat, { coat: true });
  // scarf (wraps neck; tail flutters)
  if (ch.scarf) {
    push(1, spline([C([-sw * .62, -.02]), C([0, -.16]), C([sw * .62, -.02]), C([sw * .38, .32]), C([0, .2]), C([-sw * .38, .32])], .2), ch.scarf);
    if (false) { const base = C([sw * .25, .25]), tip = add(base, [Math.sin(fl * 5) * .1 + swayX * 1.4 - fl * .25, .75 - fl * .3]);
      push(1.1, spline([add(base, [-.08, 0]), add(base, [.1, 0]), add(tip, [.1, 0]), add(tip, [-.07, .03])], .15), shade(ch.scarf, -.08)); }
  }
  // arms: sleeve upper + forearm (+ cuff), hand
  for (const S2 of ['L', 'R']) {
    const s = S2 === 'L' ? -1 : 1, z = armZ(S2), sp = J['sh' + S2].p, e = J['el' + S2].p, w = J['wr' + S2].p, wa = J['wr' + S2].a;
    push(z, capsule(...sp, ...e, L.limb * 1.32, L.limb * 1.12), ch.coat, { sleeve: true });
    push(z + .05, capsule(...e, ...add(w, mul(down(J['el' + S2].a), -.04)), L.limb * 1.12, L.limb * 1.05), ch.coat, { sleeve: true });
    const cuff = new Path2D(); const cd = down(J['el' + S2].a); const cn = [-cd[1], cd[0]]; const c0 = add(w, mul(cd, -.1));
    cuff.moveTo(...add(c0, mul(cn, L.limb * 1.08))); cuff.lineTo(...add(c0, mul(cn, -L.limb * 1.08)));
    // hand
    const hs = typeof P['hand' + S2] === 'string' ? HANDS[P['hand' + S2]] : P['hand' + S2];
    const hp = handPaths(hs, s, L.limb * 1.85);
    push(z + .1, null, ch.skin, { hand: hp, at: w, a: wa, cuff });
  }
  // neck + head
  const hc = J.head.p, tilt = J.head.a;
  const hw = kid ? .42 : .38, tx = turn * hw * .5;
  const Hd = p => add(hc, rotV(p, tilt));
  push(1.5, capsule(...J.neck.p, ...add(J.chest.p, mul(up(cA), .05)), .19, .2), ch.skin2);
  push(1.55, capsule(...Hd([0, .32]), ...J.neck.p, .19, .19), ch.skin2);
  const jaw = kid ? .4 : .5;
  const headPts = [Hd([-hw, -.05]), Hd([-hw * .95, -.33]), Hd([-hw * .6, -.5]), Hd([0, -.54]), Hd([hw * .6, -.5]), Hd([hw * .95, -.33]), Hd([hw, -.05]),
    Hd([hw * .9 - tx * .2, .22]), Hd([hw * .55 + tx * .3, jaw - .02]), Hd([tx * .45, jaw + .03]), Hd([-hw * .55 + tx * .3, jaw - .02]), Hd([-hw * .9 - tx * .2, .22])];
  const headPath = spline(headPts, .15);
  const earS = turn >= 0 ? -1 : 1, ec = Hd([earS * hw * .97, .04]);
  const ear = new Path2D(); ear.ellipse(ec[0], ec[1], .12 * (1 - Math.abs(turn) * .2), .17, tilt, 0, Math.PI * 2);
  if (Math.abs(turn) < .85) push(3.9, ear, ch.skin);
  if (Math.abs(turn) < .2) { const e2 = Hd([-earS * hw * .97, .04]); const er = new Path2D(); er.ellipse(e2[0], e2[1], .1, .16, tilt, 0, Math.PI * 2); push(3.9, er, ch.skin); }
  push(4, headPath, ch.skin, { head: true });

  // ---- paint in z order
  parts.sort((a, b2) => a.z - b2.z);
  for (const p of parts) {
    if (p.hand) { drawHand(g, p, Lt, lw); continue; }
    g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(p.path);
    g.save(); g.clip(p.path); g.fillStyle = p.fill; g.fill(p.path);
    const so = .1 + (p.head ? .05 : 0);
    const spp = new Path2D(); spp.addPath(p.path); spp.addPath(p.path, new DOMMatrix().translate(Lt.rimSide * so, -so * .5));
    g.fillStyle = `rgba(18,22,30,${Lt.shadowA})`; g.fill(spp, 'evenodd');
    if (p.coat) coatLines(g, ch, { C, Pl, sw, J, lw, hem, L });
    if (p.head) headShade(g, ch, Hd, hw, tx);
    g.restore();
  }
  // props in hands
  drawProp(g, P, J, lw);
  // head features (nod shifts features vertically)
  const nod = (P.nod || 0) * .07; const Hf = p => Hd([p[0], p[1] + nod]);
  hairAndHat(g, ch, Hd, hw, lw, tx, Lt);
  const FP = { ...P, eyes: P.blink > .55 ? 'closed' : P.eyes };
  face(g, ch, FP, Hf, hw, lw, tx, kid);
  g.restore();
  if (Lt.rim) rimLight(g, W, H, Lt, lw * S);
  J.S = S; J.W = W; J.H = H; return J;
}

function drawHand(g, p, Lt, lw) {
  g.save(); g.translate(...p.at); g.rotate(p.a);
  const { out, lines } = p.hand;
  g.lineWidth = lw * 2; g.strokeStyle = INK; for (const q of out) g.stroke(q);   // outer outline of the union
  g.fillStyle = p.fill; for (const q of out) g.fill(q);
  // inner separations: each finger re-stroked thinly, clipped outside the palm so the palm stays clean
  g.lineWidth = lw * .75; g.strokeStyle = INK;
  for (let i = 1; i < out.length; i++) g.stroke(out[i]);
  for (let i = 1; i < out.length; i++) { g.save(); g.clip(out[i]); g.fillStyle = p.fill; g.fill(out[0]); g.restore(); }
  g.fillStyle = p.fill; g.fill(out[0]);
  for (let i = 1; i < out.length; i += 2) { g.fillStyle = p.fill; }
  for (const l of lines) { g.beginPath(); g.moveTo(...l[0]); g.lineTo(...l[1]); g.stroke(); }
  // soft shade on the palm side away from light
  g.restore();
  g.save(); g.lineWidth = lw * 1.1; g.strokeStyle = INK; g.stroke(p.cuff); g.restore();
}

function coatLines(g, ch, o) {
  const { C, Pl, sw, J, lw, hem, L } = o;
  g.save(); g.strokeStyle = INK; g.lineCap = 'round';
  const v = spline([C([-sw * .28, .06]), C([sw * .28, .06]), C([sw * .04, J.torsoH * .45]), C([-sw * .04, J.torsoH * .45])], .05);
  g.fillStyle = ch.coatIn; g.fill(v);
  if (ch.tie) { const t = spline([C([-.05, .12]), C([.05, .12]), C([.08, J.torsoH * .35]), C([0, J.torsoH * .42]), C([-.08, J.torsoH * .35])], .05); g.fillStyle = ch.tie; g.fill(t); g.lineWidth = lw * .8; g.stroke(t); }
  g.lineWidth = lw * 1.1;
  const tw = J.twist * .12;
  g.beginPath(); g.moveTo(...C([-sw * .3, .02])); g.lineTo(...C([-sw * .02 + tw, J.torsoH * .45])); g.lineTo(...hem(tw * 2)); g.stroke();
  g.beginPath(); g.moveTo(...C([sw * .3, .02])); g.lineTo(...C([sw * .06 + tw, J.torsoH * .45])); g.stroke();
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(...C([s * sw * .3, .02])); g.lineTo(...C([s * sw * .43, J.torsoH * .28])); g.lineTo(...C([s * sw * .14, J.torsoH * .37])); g.stroke(); }
  g.fillStyle = INK; for (let i = 0; i < 3; i++) { const p = C([-sw * .1 + tw, J.torsoH * (.55 + i * .14)]); g.beginPath(); g.arc(p[0], p[1], .035, 0, 7); g.fill(); }
  g.lineWidth = lw * .75; g.globalAlpha = .8;
  const fold = (a, c, e) => { g.beginPath(); g.moveTo(...a); g.quadraticCurveTo(...c, ...e); g.stroke(); };
  fold(C([-sw * .62, J.torsoH * .3]), C([-sw * .5, J.torsoH * .47]), C([-sw * .6, J.torsoH * .62]));
  fold(Pl([L.hipW * .7, -.1]), Pl([L.hipW * .8, .15]), hem(.6));
  fold(Pl([-L.hipW * .6, .1]), Pl([-L.hipW * .45, .3]), hem(-.55));
  g.beginPath(); g.moveTo(...Pl([-L.hipW * 1.0, -.25])); g.lineTo(...Pl([-L.hipW * .45, -.25])); g.stroke();
  if (ch.patches) { const p = Pl([L.hipW * .3, -.3]); g.strokeRect(p[0], p[1], .3, .24); }
  g.globalAlpha = 1;
  if (ch.apron) { const a = spline([C([-sw * .5, J.torsoH * .35]), C([sw * .5, J.torsoH * .35]), hem(.8), hem(-.8)], .05); g.fillStyle = ch.apron; g.fill(a); g.lineWidth = lw * 1.2; g.stroke(a); }
  g.restore();
}

function drawProp(g, P, J, lw) {
  const pr = P.prop; if (!pr) return;
  const hL = J.wrL.p, hR = J.wrR.p;
  const at = pr.hand === 'L' ? add(hL, mul(down(J.wrL.a), .2)) : pr.hand === 'R' ? add(hR, mul(down(J.wrR.a), .2)) : [(hL[0] + hR[0]) / 2, (hL[1] + hR[1]) / 2 + .05];
  const o = add(at, pr.offset || [0, 0]);
  g.save(); g.translate(...o); g.rotate((pr.rot || 0) * D); g.lineJoin = 'round';
  if (pr.kind === 'cup') { // tin cup, opening up; fill = 0..1 molasses level; slosh
    const c = spline([[-.2, -.22], [.2, -.22], [.17, .2], [-.17, .2]], .04);
    const handle = new Path2D(); handle.ellipse(.22, -.02, .09, .12, 0, -Math.PI / 2, Math.PI / 2);
    g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(c); g.stroke(handle); g.fillStyle = '#86837b'; g.fill(c);
    g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(-.14, -.18, .05, .32);
    g.fillStyle = '#4c4943'; g.beginPath(); g.ellipse(0, -.22, .2, .055, 0, 0, 7); g.fill(); g.lineWidth = lw; g.stroke();
    if (pr.fill > 0) { g.fillStyle = '#b8681c'; g.beginPath(); g.ellipse(0, -.21 + (1 - pr.fill) * .02, .17 * Math.min(1, .5 + pr.fill), .04, (pr.slosh || 0) * .3, 0, 7); g.fill(); }
  }
  if (pr.kind === 'hammer') { const hp = capsule(0, .25, 0, -.85, .06, .06); g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(hp); g.fillStyle = '#7a5a3a'; g.fill(hp);
    const hd = new Path2D(); hd.rect(-.25, -1.0, .52, .2); g.stroke(hd); g.fillStyle = '#4a4c4f'; g.fill(hd); }
  if (pr.kind === 'calipers') { g.lineWidth = lw * 1.6; g.strokeStyle = INK; g.beginPath(); g.moveTo(0, 0); g.lineTo(.55, .25); g.moveTo(0, 0); g.lineTo(.45, .45); g.stroke(); }
  if (pr.kind === 'hat') { const c = spline([[-.32, .02], [-.28, -.25], [0, -.32], [.28, -.25], [.32, .02]], .2); g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(c); g.fillStyle = pr.color || '#473d3a'; g.fill(c); }
  g.restore();
}
