// BANJIR INI BUKAN AIR — shot list (Dark Toon Diorama).
// Each shot: { id, t0, t1, key, vo, desc, camText, sfx, text, build(stage) -> update(t) } ; t = seconds on the VO timeline.
import { THREE, rng, clamp, lerp, range, ease, fg, ink, cloudsTex, THEMES } from '../../engine/core.js';
import { Actor, pose } from '../../engine/actor.js';
import * as S from '../../engine/sets.js';

const AMBER = '#ec9a3a';
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
function cam(st, p, look, fov, roll = 0) { st.camera.position.copy(p); st.camera.lookAt(look); if (fov) { st.camera.fov = fov; st.camera.updateProjectionMatrix(); } if (roll) st.camera.rotateZ(roll); }
function actor(st, kind, { h = 1.78, res = 1100, at = [0, 0, 0], layer = true } = {}) {
  const a = new Actor(kind, { height: h, res }); a.group.position.set(...at); if (layer) fg(a.group); st.scene.add(a.group); return a;
}
const shake = (t, amp, f = 23) => amp * (Math.sin(t * f) * .6 + Math.sin(t * f * 1.7 + 1) * .4);

// ---------------------------------------------------------------- worlds
function commercialStreet(st, { seed = 1, rail = true, len = 170 } = {}) {
  const sc = st.scene;
  sc.add(S.street({ w: 11, len, z0: 30 }));
  sc.add(S.buildingRow({ x: 8.5, z0: 30, z1: -len, side: 1, seed: 21 + seed }));
  sc.add(S.buildingRow({ x: -8.5, z0: 30, z1: -len, side: -1, seed: 41 + seed }));
  const el = rail ? S.elRail({ x: 5.2, h: 6.4, z0: 30, z1: -len }) : null; if (el) sc.add(el);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(600, 200), new THREE.MeshBasicMaterial({ map: cloudsTex(seed), fog: false })); sky.position.set(0, 70, -230); sc.add(sky);
  for (const z of [10, -14, -38, -62]) { const l = S.lamp(); l.position.set(-6.2, 0, z); sc.add(l); }
  return { el };
}
// tank yard: tank centred at (0,0,-16) r 13.5 ; harbour to the right (+x), city to the left
function tankYard(st, { leaks = 3, paint = '#4e4640', seed = 2, torn = false, tank = true } = {}) {
  const sc = st.scene;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshLambertMaterial({ map: S.cobbleTex(9, .35) }));
  ground.material.map.repeat.set(90, 90); ground.rotation.x = -Math.PI / 2; sc.add(ground);
  let tk = null;
  if (tank) { tk = torn ? S.tornTank({}) : S.tank({ r: 13.5, h: 15, leaks, paint }); tk.position.set(0, 0, -16); sc.add(tk); }
  sc.add(S.buildingRow({ x: -24, z0: 50, z1: -110, side: -1, seed: 61 + seed, hMin: 8, hMax: 13 }));
  sc.add(S.buildingRow({ x: 30, z0: -40, z1: -140, side: 1, seed: 71 + seed, hMin: 6, hMax: 9 }));
  const el = S.elRail({ x: -17, h: 6.4, z0: 70, z1: -140 }); sc.add(el);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(300, 200), new THREE.MeshLambertMaterial({ color: 0x3d4650 })); water.rotation.x = -Math.PI / 2; water.position.set(160, -.3, -60); sc.add(water);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(700, 240), new THREE.MeshBasicMaterial({ map: cloudsTex(seed + 4), fog: false })); sky.position.set(0, 80, -260); sc.add(sky);
  for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.CylinderGeometry(.14, .18, 16, 6), new THREE.MeshLambertMaterial({ color: 0x34373a })); m.position.set(45 + i * 6, 8, -70 - i * 4); sc.add(m); }
  return { tk, el };
}
// point on tank wall: angle th (0 = facing +z/camera side), height y, offset out, offset along the tangent
function onTank(th, y, out = 0, along = 0) { const R = 13.5, n = v3(Math.sin(th), 0, Math.cos(th)), tg = v3(Math.cos(th), 0, -Math.sin(th));
  return { p: v3(0, 0, -16).add(n.clone().multiplyScalar(R + out)).add(tg.clone().multiplyScalar(along)).setY(y), n, tg }; }

// ---------------------------------------------------------------- shots
export const SHOTS = [];
const shot = (o) => SHOTS.push(o);

// 1 HOOK -------------------------------------------------------------------------------------------------
shot({ id: 'S01', t0: 0, t1: 2.3, key: 1.2, vo: 'Banjir ini bukan datang dari sungai.', text: 'Judul kecil: BANJIR INI BUKAN AIR (frame 0 = thumbnail)',
  desc: 'Lidah molase mengilap merayap di atas cobblestone ke arah kamera, menelan topi pet yang tergeletak.', camText: 'Ground level, push-in pelan', sfx: 'Dengung rendah, gemericik kental',
  build(st) {
    commercialStreet(st);
    const mat = S.molassesMat();
    const sheet = S.molassesSheet({ width: 9, length: 5, lobes: 5, seed: 3, mat }); st.scene.add(sheet);
    const wave = S.molassesWave({ width: 22, height: 2.2, depth: 8, mat, taper: .3 }); st.scene.add(wave);
    const crown = new THREE.Mesh(new THREE.SphereGeometry(.16, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshToonMaterial({ color: 0x4d4f50 })); ink(crown, .012);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .02, 16, 1, false, -1, 2), new THREE.MeshToonMaterial({ color: 0x3a3b3c }));
    const cap = new THREE.Group(); cap.add(crown, brim); brim.position.set(0, .01, .05); fg(cap); st.scene.add(cap);
    return (t) => {
      const k = range(t, 0, 2.3);
      sheet.position.set(0, 0, -6 + k * 1.6); wave.position.set(0, 0, -16 + k * 2);
      cap.position.set(.25, .05, -1.2 + k * .3); cap.rotation.set(.15, .6 + k * .4, .08);
      cam(st, v3(.3, .35, lerp(1.4, .9, ease.inOut(k))), v3(-.1, .55, -8), 46, -.04);
      st.setBlur(0);
    };
  } });

shot({ id: 'S02', t0: 2.3, t1: 5.4, key: 3.2, vo: 'Ia keluar dari sebuah tangki raksasa—',
  desc: 'Pekerja berdiri kecil di kaki tangki baja raksasa, mendongak. Tangki memenuhi frame.', camText: 'Ultra-low angle, tilt-up dari pekerja ke puncak tangki', sfx: 'Angin pelabuhan, logam berderit samar',
  build(st) {
    tankYard(st, { leaks: 5 });
    const man = actor(st, 'worker', { at: [1.2, 0, 4.5], res: 1000 });
    return (t) => {
      const k = ease.inOut(range(t, 2.3, 5.4));
      man.draw(pose('look_up', { turn: -.15 }), { rim: null });
      cam(st, v3(2.2, .5, 11), v3(.6, lerp(3.5, 14, k), -12), 60);
      man.face(st.camera); st.setBlur(0);
    };
  } });

shot({ id: 'S03', t0: 5.4, t1: 9.0, key: 7.2, vo: '—dan yang mengalir adalah molase, cairan gula pekat.',
  desc: 'Pekerja mengisi tong kayu dari keran di kaki tangki; pita molase pekat mengalir lambat.', camText: 'Medium, kamera turun mengikuti aliran', sfx: 'Tuangan kental',
  build(st) {
    tankYard(st, { leaks: 3 });
    const o = onTank(-.12, 1.6, .05);
    const mat = S.molassesMat({ emissive: .1, inkEdge: .3 });
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .6, 12), new THREE.MeshToonMaterial({ color: 0x2f2b28 }));
    pipe.position.copy(o.p).add(o.n.clone().multiplyScalar(.3)); pipe.lookAt(o.p.clone().add(o.n)); pipe.rotateX(Math.PI / 2); ink(pipe, .02); st.scene.add(pipe);
    const tap = o.p.clone().add(o.n.clone().multiplyScalar(.6));
    const stream = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([tap.clone(), tap.clone().add(v3(0, -.3, .03)), tap.clone().add(v3(0, -.58, .02))]), 20, .045, 8), mat); fg(stream); st.scene.add(stream);
    const br = S.barrel({}); br.position.copy(tap).setY(0); st.scene.add(br);
    const top = new THREE.Mesh(new THREE.CircleGeometry(.44, 24), mat); top.rotation.x = -Math.PI / 2; top.position.copy(br.position).setY(1.03); st.scene.add(top);
    const man = actor(st, 'worker', { res: 1200 }); man.group.position.copy(tap).add(o.tg.clone().multiplyScalar(-1.0)).add(o.n.clone().multiplyScalar(.2)).setY(0);
    return (t) => {
      const k = ease.inOut(range(t, 5.4, 9));
      man.draw(pose('stand', { turn: .55, shL: 40, elL: -60, shR: 30, elR: -50, look: [.8, .6], tilt: 10 }), {});
      const tgt = tap.clone().add(v3(0, lerp(.1, -.5, k), 0));
      cam(st, tgt.clone().add(o.n.clone().multiplyScalar(4.6)).add(o.tg.clone().multiplyScalar(-1.4)).setY(lerp(1.8, 1.3, k)), tgt.clone().add(o.tg.clone().multiplyScalar(-.5)).setY(1.0), 46);
      man.face(st.camera); st.setBlur(2.0);
    };
  } });

// 2 SETTING ---------------------------------------------------------------------------------------------
shot({ id: 'S04', t0: 9.0, t1: 12.65, key: 10.8, vo: 'Boston, 15 Januari 1919.', text: 'Boston · 15 Januari 1919',
  desc: 'Commercial Street hidup: kereta layang lewat, gerobak kuda, pekerja di trotoar; tangki terlihat di ujung jalan.', camText: 'Establishing agak tinggi, tracking lateral', sfx: 'Kota: kuku kuda, kereta layang, camar',
  build(st) {
    commercialStreet(st);
    const tk = S.tank({ r: 13.5, h: 15, leaks: 2 }); tk.position.set(-2, 0, -82); st.scene.add(tk); st.scene.fog.far = 150;
    const car = S.elCar({}); st.scene.add(car);
    const wg = S.wagon(); st.scene.add(wg);
    const ppl = [actor(st, 'worker', { at: [-5.4, .18, -6], res: 700, layer: false }), actor(st, 'riveter', { at: [-6.2, .18, -7.2], res: 700, layer: false }),
      actor(st, 'woman', { at: [5.4, .18, -12], res: 700, layer: false }), actor(st, 'boy', { h: 1.35, at: [4.6, .18, -10], res: 600, layer: false })];
    return (t) => {
      const k = ease.inOut(range(t, 9, 12.65));
      car.position.set(5.2, 6.7, lerp(-30, -6, k)); wg.position.set(-1.6, 0, lerp(-24, -20, k));
      ppl[0].draw(pose('stand', { turn: .3, shR: 60, elR: -110, handR: 'fist', mouth: 'talk', look: [.8, 0] }));
      ppl[1].draw(pose('stand', { turn: -.3, mouth: 'smile', eyes: 'happy', look: [-.8, 0] }));
      ppl[2].draw(pose('walk', { turn: -.2 })); ppl[3].draw(pose('stand', { shR: 100, elR: -10, handR: 'point', mouth: 'smile', look: [.4, -.6] }));
      cam(st, v3(lerp(-3.4, -1.6, k), 3.4, 10), v3(lerp(-1.2, .4, k), 4.2, -40), 52);
      ppl.forEach(p => p.face(st.camera)); st.setBlur(0);
    };
  } });

// 3 RUPTURE ---------------------------------------------------------------------------------------------
shot({ id: 'S05', t0: 12.65, t1: 13.9, key: 13.6, vo: 'Tangki baja setinggi 15 meter pecah.', text: '15 M (kecil)',
  desc: 'Close-up sambungan pelat: retakan bergerigi menjalar, paku keling terlontar, semburan molase pertama.', camText: 'Close-up, shake meningkat, snap zoom', sfx: 'Derit logam, letupan paku keling',
  build(st) {
    st.setTheme({ ...st.theme, fog: 0x2b2a29, fogNear: 6, fogFar: 40 }); st.scene.background = null;
    const wall = S.wallClose({ w: 7, h: 9, seed: 5, leaks: 3 }); st.scene.add(wall);
    const mat = S.molassesMat({ emissive: .25, inkEdge: .25 });
    const crackPts = [[0, 1.6], [.12, 1.1], [-.08, .6], [.15, .1], [-.05, -.4], [.1, -.9], [-.06, -1.5]];
    const mkCrack = (w, col, z) => { const sh = new THREE.Shape(); sh.moveTo(crackPts[0][0] - w * .3, crackPts[0][1]);
      crackPts.forEach(([x, y], i) => sh.lineTo(x - w * (i % 2 ? 1 : .6), y)); for (let i = crackPts.length - 1; i >= 0; i--) { const [x, y] = crackPts[i]; sh.lineTo(x + w * (i % 2 ? .6 : 1), y); }
      const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({ color: col, fog: false })); m.position.set(.15, 3.6, z); st.scene.add(m); return m; };
    const glow = mkCrack(.16, 0xff7a10, .01), dark = mkCrack(.08, 0x1a0802, .02);
    const flying = new THREE.Group(); fg(flying); st.scene.add(flying);
    const rv = new THREE.SphereGeometry(.07, 10, 8), rm = new THREE.MeshToonMaterial({ color: 0x3b3734 });
    for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(rv, rm); ink(m, .02); flying.add(m); }
    const spurts = [0, 1, 2].map(i => { const y = 3.6 + (i - 1) * .9; const c = new THREE.CatmullRomCurve3([v3(.15, y, 0), v3(.15 + (i - 1) * .1, y + .05, .5), v3(.15 + (i - 1) * .25, y - .25, 1.0)]);
      const j = new THREE.Mesh(new THREE.TubeGeometry(c, 20, .05, 8), mat); fg(j); st.scene.add(j); return j; });
    const drops = S.droplets({ n: 16, box: [1.2, 2.4, .6], size: [.03, .07], mat }); fg(drops); st.scene.add(drops);
    return (t) => {
      const k = ease.in(range(t, 12.65, 13.9));
      glow.scale.set(1 + k * 2.5, .3 + k * .8, 1); dark.scale.set(1 + k * 2, .3 + k * .8, 1);
      flying.children.forEach((m, i) => { const a = clamp(k * 1.4 - i * .06, 0, .6); m.visible = a > 0; m.position.set(.15 + (i - 4) * .7 * a, 3.6 + ((i % 3) - 1) * .9 + a * .8, .1 + a * 3); });
      spurts.forEach((j, i) => j.scale.set(1, 1, clamp(k * 1.5 - i * .15, .01, 1)));
      drops.position.set(.15, 3.6, .3 + k * .8); drops.visible = k > .4;
      st.warm.intensity = 20 * k; st.warm.position.set(.15, 3.6, 1);
      cam(st, v3(.5 + shake(t, .05 * k), 3.3 + shake(t + 3, .05 * k), lerp(4.4, 3.4, k)), v3(.1, 3.5, 0), 46, -.06);
      st.setBlur(0);
    };
  } });

shot({ id: 'S06', t0: 13.9, t1: 14.95, key: 14.5, vo: '(lanjutan) …pecah.',
  desc: 'Wide: dinding tangki membuka seperti kelopak, gelombang molase meledak keluar ke arah jalan.', camText: 'Wide agak tinggi, impact shake, push cepat', sfx: 'Dentum besar',
  build(st) {
    tankYard(st, { torn: true });
    const mat = S.molassesMat();
    const wave = S.molassesWave({ width: 34, height: 9, depth: 18, mat, taper: .6, seed: 7 }); st.scene.add(wave);
    const plates = []; for (let i = 0; i < 6; i++) { const p = S.steelPlate({ w: 4, h: 5, seed: 20 + i, curve: .8 }); st.scene.add(p); plates.push(p); }
    const drops = S.droplets({ n: 30, box: [30, 10, 4], size: [.15, .45], mat }); st.scene.add(drops);
    return (t) => {
      const k = ease.out(range(t, 13.9, 14.95));
      wave.position.set(0, 0, -6 + k * 6); wave.scale.set(1, .4 + k * .6, 1);
      plates.forEach((p, i) => { const a = -.6 + i * .25; p.position.set(Math.sin(a) * (14 + k * 8), 4 + k * (6 + i), -16 + Math.cos(a) * (14 + k * 8)); p.rotation.set(k * (2 + i), a + k * i, k * 3); });
      drops.position.set(0, 2, k * 4);
      cam(st, v3(16 + shake(t, .4), 9 + shake(t + 2, .4), lerp(42, 36, k)), v3(0, 5, -10), 50);
      st.setBlur(0);
    };
  } });

// 4 GELOMBANG --------------------------------------------------------------------------------------------
shot({ id: 'S07', t0: 14.95, t1: 18.45, key: 16.6, vo: 'Sebanyak 2,3 juta galon molase tumpah ke jalanan.', text: '2,3 juta galon (kecil)',
  desc: 'Dinding molase menerjang di bawah rel layang ke arah kamera. Pekerja berlari, gerobak kuda tertelan.', camText: 'Street level, dutch angle, mundur cepat', sfx: 'Gemuruh, teriakan jauh',
  build(st) {
    commercialStreet(st);
    const mat = S.molassesMat();
    const wave = S.molassesWave({ width: 24, height: 7.2, depth: 10, mat, taper: .7 }); wave.rotation.y = .55; st.scene.add(wave);
    const sheet = S.molassesSheet({ width: 26, length: 6, lobes: 6, mat }); st.scene.add(sheet);
    const drops = S.droplets({ n: 40, box: [20, 7, 3], size: [.05, .14], mat }); st.scene.add(drops);
    const wg = S.wagon(); wg.rotation.y = .6; st.scene.add(wg);
    const planks = []; for (let i = 0; i < 5; i++) { const p = S.plank({ seed: i }); st.scene.add(p); planks.push(p); }
    const man = actor(st, 'worker', { res: 1300 });
    const others = [actor(st, 'woman', { res: 700, layer: false }), actor(st, 'riveter', { res: 700, layer: false })];
    return (t) => {
      const k = range(t, 14.95, 18.45);
      const zw = -34 + k * 6;
      wave.position.set(-2, 0, zw); sheet.position.set(0, 0, zw + 2.6);
      drops.position.set(0, 0, zw);
      drops.children.forEach((d, i) => { const [vx, vy] = d.userData.v, a = ((t * .8 + i * .17) % 1.1), u = i / 40;
        d.position.set((u - .5) * 22 * .9 + vx * a - 2, 7.2 * (1.05 - .5 * u) + vy * a - 4.9 * a * a, 3.5 * (1.2 - .45 * u) + a * 2); });
      wg.position.set(-4.2, .3 + k * .6, zw + 3.0); wg.rotation.z = -.15 - .25 * k;
      planks.forEach((p, i) => { p.position.set(-7 + i * 3.3, 4.5 + (i % 3) * 1.2, zw + 1.6); p.rotation.set(t * .8 + i, i * 1.3, t * .6 + i * 2); });
      const zc = zw + 16 + k * 1.2;
      const run = Math.floor(t * 7) % 2 ? 'run' : 'run2', run2 = run === 'run' ? 'run2' : 'run';
      man.group.position.set(-1.2, 0, zc - 3.6);
      man.draw(pose(run, { look: [.9, -.05], turn: .35, tilt: -3 }), { rim: AMBER, rimSide: 1 });
      others[0].group.position.set(2.2, 0, zc - 9); others[0].draw(pose(run2, { turn: -.4, look: [-.9, 0] }), { rim: AMBER, rimSide: -1 });
      others[1].group.position.set(-4.5, .18, zc - 11); others[1].draw(pose(run, { turn: .5, look: [.9, 0] }), { rim: AMBER, rimSide: 1 });
      cam(st, v3(-1.3, 1.0, zc), v3(-1.8, 4.2, zc - 20), 60, -.08);
      [man, ...others].forEach(a => a.face(st.camera)); st.setBlur(1.2);
    };
  } });

shot({ id: 'S08', t0: 18.45, t1: 21.55, key: 19.6, vo: 'Gelombangnya melaju sekitar 56 kilometer per jam.', text: '≈56 km/jam (kecil)',
  desc: 'Tampak samping: puncak gelombang yang menggulung menghantam gerobak kuda; gerobak terangkat, cipratan tebal.', camText: 'Tracking samping cepat dari trotoar', sfx: 'Whoosh, kayu pecah',
  build(st) {
    commercialStreet(st);
    const mat = S.molassesMat();
    const wave = S.molassesWave({ width: 16, height: 6, depth: 10, mat, taper: .3, seed: 15 }); st.scene.add(wave);
    const wg = S.wagon(); st.scene.add(wg);
    const drops = S.droplets({ n: 30, box: [8, 5, 3], size: [.06, .18], mat }); st.scene.add(drops);
    return (t) => {
      const k = range(t, 18.45, 21.55);
      const zw = lerp(-40, -20, k);
      wave.position.set(-1, 0, zw); wg.position.set(-1.5, .6 + k * .8, zw + 4.2); wg.rotation.set(-.35 - k * .3, .3, .1);
      drops.position.set(-1, 5.5, zw + 3.5);
      cam(st, v3(7.4, 1.8, zw + 11), v3(-2, 3.2, zw + 1), 54, .05);
      st.setBlur(0);
    };
  } });

// 5 KEHANCURAN -------------------------------------------------------------------------------------------
shot({ id: 'S09', t0: 21.55, t1: 23.35, key: 22.6, vo: 'Kereta layang terlempar dari rel.',
  desc: 'Bentang rel layang patah dan melengkung; gerbong miring di tepi bentang rusak, molase di bawahnya.', camText: 'Low angle, tilt-up lambat, getaran', sfx: 'Baja berderit, kaca pecah',
  build(st) {
    commercialStreet(st, { rail: false });
    const a = S.elRail({ x: 5.2, h: 6.4, z0: 30, z1: -14 }); st.scene.add(a);
    const b = S.elRail({ x: 5.2, h: 6.4, z0: -14, z1: -60 }); st.scene.add(b);
    const car = S.elCar({}); st.scene.add(car);
    const mat = S.molassesMat(); const flood = S.molassesSheet({ width: 12, length: 30, lobes: 4, mat }); flood.position.set(0, .1, -2); st.scene.add(flood);
    return (t) => {
      const k = range(t, 21.55, 23.35);
      b.rotation.set(-.14, 0, .2); b.position.set(-.6, -2.0, -2);
      car.position.set(4.2, 4.2, -11); car.rotation.set(-.12, .15, .5 + k * .05);
      cam(st, v3(-2.5 + shake(t, .06), .9, 6), v3(3, lerp(3.5, 5.5, ease.inOut(k)), -12), 58);
      st.setBlur(0);
    };
  } });

shot({ id: 'S10', t0: 23.35, t1: 24.55, key: 24.0, vo: 'Bangunan hancur.',
  desc: 'Bangunan kayu di tepi jalan ambruk ke samping didorong molase.', camText: 'Medium-wide, shake singkat', sfx: 'Kayu runtuh',
  build(st) {
    commercialStreet(st);
    const wb = S.woodBuilding({}); st.scene.add(wb);
    const mat = S.molassesMat(); const wave = S.molassesWave({ width: 20, height: 3.5, depth: 8, mat, taper: .3, seed: 21 }); st.scene.add(wave);
    const planks = []; for (let i = 0; i < 8; i++) { const p = S.plank({ seed: i + 3 }); st.scene.add(p); planks.push(p); }
    return (t) => {
      const k = ease.in(range(t, 23.35, 24.55));
      wb.position.set(-3.5, 0, -16); wb.rotation.set(0, .3, -k * .6);
      wave.position.set(-1, 0, -19 + k * 2); wave.rotation.y = .5;
      planks.forEach((p, i) => { p.position.set(-3 + (i - 4) * .8, 3 + i * .5 + k * 1.5, -12 + (i % 3)); p.rotation.set(i + k * 2, i * .7, k * 3 + i); });
      cam(st, v3(3 + shake(t, .08), 2.0, 4), v3(-3.5, 3.6, -16), 54);
      st.setBlur(0);
    };
  } });

shot({ id: 'S11', t0: 24.55, t1: 27.65, key: 26.2, vo: 'Warga tersapu gelombang lengket yang sulit mereka hindari.',
  desc: 'Seorang perempuan dan pekerja terjebak setinggi pinggang di molase, saling meraih. Tidak sadis.', camText: 'Medium eye level, push-in pelan', sfx: 'Napas, molase berat, hening sesaat',
  build(st) {
    commercialStreet(st);
    const mat = S.molassesMat({ dark: '#2a1104', mid: '#5e2c0b', light: '#9a5418', hi: '#d9a060', inkEdge: 0 });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 60, 60), mat); pool.rotation.x = -Math.PI / 2; pool.position.y = .95;
    { const p = pool.geometry.attributes.position; const R = rng(4); for (let i = 0; i < p.count; i++) p.setZ(i, (Math.sin(p.getX(i) * .9) + Math.cos(p.getY(i) * 1.3)) * .07 + R() * .02); pool.geometry.computeVertexNormals(); }
    fg(pool); st.scene.add(pool);
    const wo = actor(st, 'woman', { res: 1200, at: [-.9, 0, -3] }); const man = actor(st, 'worker', { res: 1200, at: [1.0, 0, -3.6] });
    return (t) => {
      const k = ease.inOut(range(t, 24.55, 27.65));
      wo.draw(pose('reach', { turn: .4, shR: 70, elR: 10, look: [.9, -.1] }), { rim: AMBER, rimSide: -1, rimA: .6 });
      man.draw(pose('wade', { turn: -.35, shL: 75, elL: -5, shR: 20, elR: -30, look: [-.9, -.1] }), { rim: AMBER, rimSide: 1, rimA: .6 });
      cam(st, v3(0, 1.5, lerp(2.6, 1.6, k)), v3(0, 1.4, -4), 46);
      wo.face(st.camera); man.face(st.camera); st.setBlur(1.6);
    };
  } });

// 6 TURN / 7 BOCOR ---------------------------------------------------------------------------------------
shot({ id: 'S12', t0: 27.65, t1: 31.0, key: 29.3, vo: 'Tapi tanda bahayanya sudah muncul jauh sebelumnya.',
  desc: 'Mundur waktu: tangki utuh di hari tenang biasa; noda gelap di sambungan bawah. Warna lebih dingin dan sepi.', camText: 'Wide frontal, pull-back pelan', sfx: 'Efek berhenti, tik jam',
  build(st) {
    tankYard(st, { leaks: 7, paint: '#5a4a3e' });
    st.grade({ sat: .45, bright: .92, contrast: 1.04 });
    const man = actor(st, 'worker', { at: [-6, 0, 2], res: 600, layer: false });
    return (t) => {
      const k = ease.inOut(range(t, 27.65, 31));
      man.draw(pose('walk', { turn: .5 }));
      cam(st, v3(2, 5, lerp(30, 36, k)), v3(0, 7, -16), 50);
      man.face(st.camera); st.setBlur(0);
    };
  } });

function seamMacro(st, { drops = 3 } = {}) {
  st.scene.background = null; st.setTheme({ ...st.theme, fog: 0x1e1d1c, fogNear: 3, fogFar: 14 });
  const wall = S.wallClose({ w: 4, h: 4, seed: 8, leaks: 4, paint: '#57493d' }); wall.position.set(0, -2, 0); st.scene.add(wall);
  const mat = S.molassesMat({ emissive: .2, inkEdge: .3 });
  const seep = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([v3(.15, .7, .03), v3(.17, .3, .05), v3(.13, -.1, .06), v3(.16, -.45, .08)]), 30, .035, 8), mat); st.scene.add(seep);
  const blob = new THREE.Mesh(new THREE.SphereGeometry(.06, 14, 10), mat); blob.scale.set(1, 1.3, .8); blob.position.set(.16, -.5, .09); st.scene.add(blob);
  const dg = S.droplets({ n: drops, box: [0, 0, 0], size: [.04, .05], mat }); fg(dg); st.scene.add(dg);
  return (t) => dg.children.forEach((d, i) => { const a = (t * .7 + i / drops) % 1; d.position.set(.16, -.6 - a * a * 2.2, .12); });
}
shot({ id: 'S13', t0: 31.0, t1: 35.55, key: 33.0, vo: 'Tangki itu sudah bocor sejak awal. Molase merembes dari sambungannya—',
  desc: 'Extreme close-up sambungan berpaku keling: molase merembes, menggantung, lalu menetes.', camText: 'Macro drift pelan', sfx: 'Tetesan',
  build(st) {
    const drip = seamMacro(st); st.warm.intensity = 4; st.warm.position.set(1, 0, 1.5);
    return (t) => { const k = ease.inOut(range(t, 31, 35.55)); drip(t);
      cam(st, v3(lerp(.7, .5, k), lerp(.1, -.1, k), 1.5), v3(.16, -.2, 0), 40); st.setBlur(0); };
  } });

shot({ id: 'S14', t0: 35.55, t1: 38.35, key: 36.6, vo: '—bahkan anak-anak di sekitar mengumpulkan tetesannya.',
  desc: 'Anak laki-laki berjongkok di kaki tangki, menadah tetesan molase dengan cangkir kaleng, tersenyum polos.', camText: 'Low angle, push-in pelan', sfx: 'Tetesan, tawa anak samar',
  build(st) {
    tankYard(st, { leaks: 8 });
    const mat = S.molassesMat({ emissive: .12, inkEdge: .25 });
    const th = -.42, P = (along, y, out) => onTank(th, y, out, along).p, { n, tg } = onTank(th, 0);
    const pts = [P(0, 7.5, .02), P(.08, 5.8, .05), P(-.05, 4.2, .06), P(.06, 2.6, .07), P(0, 1.4, .1), P(0, 1.05, .32)];
    const stream = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, .06, 8), mat); st.scene.add(stream);
    const pool = S.molassesSheet({ width: 1.4, length: .8, lobes: 3, mat }); pool.position.copy(P(.3, 0, .05)); pool.rotation.y = th; st.scene.add(pool);
    const drops = S.droplets({ n: 4, box: [0, 0, 0], size: [.04, .05], mat }); fg(drops); st.scene.add(drops);
    const boy = actor(st, 'boy', { h: 1.35, res: 1300 });
    const girl = actor(st, 'girl', { h: 1.3, res: 800, layer: false });
    return (t) => {
      const k = range(t, 35.55, 38.35);
      drops.children.forEach((d, i) => { const a = (t * .9 + i * .25) % 1; d.position.copy(P(0, 1.0 - a * a * .35, .34)); });
      boy.group.position.copy(P(-.62, 0, .55));
      boy.draw(pose('crouch_cup', { look: [.9, -.45], tilt: 4 }), { rim: '#f2a548', rimSide: 1, rimA: .65 });
      girl.group.position.copy(P(-3.2, 0, 2.4)); girl.draw(pose('stand', { turn: .4, eyes: 'happy', mouth: 'smile', shR: 60, elR: -90, handR: 'cup' }));
      const target = P(-.25, .95, .4);
      const cp = target.clone().add(n.clone().multiplyScalar(lerp(2.7, 2.4, ease.inOut(k)))).add(tg.clone().multiplyScalar(lerp(-2.3, -2.0, ease.inOut(k)))).setY(.5);
      cam(st, cp, target.clone().add(tg.clone().multiplyScalar(-.15)).setY(1.4), 50);
      boy.face(st.camera); girl.face(st.camera); st.setBlur(1.8);
    };
  } });

// 8 INVESTIGASI ------------------------------------------------------------------------------------------
function aftermath(st) {
  tankYard(st, { torn: true });
  const mat = S.molassesMat({ dark: '#160903', mid: '#3a1c07', light: '#6e3a12', hi: '#c98a4a', inkEdge: 0 });
  const flood = new THREE.Mesh(new THREE.PlaneGeometry(200, 200, 60, 60), mat); flood.rotation.x = -Math.PI / 2; flood.position.y = .06;
  { const p = flood.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * .4) * Math.cos(p.getY(i) * .3) * .08); flood.geometry.computeVertexNormals(); }
  st.scene.add(flood);
  [[-9, -2, .4, .3], [9, 0, -.6, .5], [-15, 6, .9, .8], [14, 6, 1.4, .6], [-4, -6, .2, 1]].forEach(([x, z, ry, c], i) => {
    const p = S.steelPlate({ w: 5, h: 3.5, seed: 40 + i, curve: c }); p.position.set(x, .9, z); p.rotation.set(-1.45 + (i % 3) * .25, ry, .15); st.scene.add(p); });
  st.grade({ sat: .55, bright: .9 });
}
shot({ id: 'S15', t0: 38.35, t1: 41.5, key: 40.0, vo: 'Setelah bencana, para insinyur…',
  desc: 'Insinyur dan dua petugas berjalan di antara pelat baja robek; tanah dilapisi molase, sore yang muram.', camText: 'Wide, tracking lambat mengikuti insinyur', sfx: 'Sunyi, langkah lengket',
  build(st) {
    aftermath(st);
    const en = actor(st, 'engineer', { res: 1000, at: [0, 0, 8] }), f1 = actor(st, 'fireman', { res: 800, at: [-2, 0, 6], layer: false }), f2 = actor(st, 'sailor', { res: 800, at: [2.2, 0, 5.5], layer: false });
    return (t) => {
      const k = ease.inOut(range(t, 38.35, 41.5)); const w = Math.floor(t * 3) % 2 ? 'walk' : 'walk2';
      en.group.position.set(lerp(-1, 1, k), 0, 9); en.draw(pose(w, { turn: .1, look: [.3, .3] }));
      f1.draw(pose(w === 'walk' ? 'walk2' : 'walk', { turn: .3 })); f2.draw(pose(w, { turn: -.2, look: [-.5, .2] }));
      cam(st, v3(lerp(-3, 2, k), 2.2, 17), v3(lerp(-1, 1.5, k), 2, 0), 48);
      [en, f1, f2].forEach(a => a.face(st.camera)); st.setBlur(0);
    };
  } });

shot({ id: 'S16', t0: 41.5, t1: 44.85, key: 43.2, vo: '…menemukan dinding tangki terlalu tipis dan bahannya rentan retak.', text: 'Label kecil: dinding terlalu tipis',
  desc: 'Insinyur berjongkok mengukur tebal tepi pelat robek dengan jangka sorong. Permukaan patahan terlihat.', camText: 'Close-up, push-in ke tepi patahan', sfx: 'Klik logam',
  build(st) {
    aftermath(st);
    const p = S.steelPlate({ w: 2.4, h: 1.2, seed: 77, curve: .3 }); p.position.set(.7, .25, 3.3); p.rotation.set(-1.5, -.4, 0); st.scene.add(p);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(2.0, .4, .05), new THREE.MeshToonMaterial({ color: 0x6d6863 })); edge.position.set(.6, .2, 3.4); edge.rotation.y = -.4; ink(edge, .015); st.scene.add(edge);
    const en = actor(st, 'engineer', { res: 1300, at: [-.6, 0, 3.6] });
    return (t) => {
      const k = ease.inOut(range(t, 41.5, 44.85));
      en.draw(pose('inspect'), {});
      cam(st, v3(lerp(-1.2, -.9, k), 1.2, lerp(7.4, 6.4, k)), v3(0, .9, 3.2), 44);
      en.face(st.camera); st.setBlur(1.5);
    };
  } });

// 9 PENYEBAB ---------------------------------------------------------------------------------------------
shot({ id: 'S17', t0: 44.85, t1: 46.9, key: 45.9, vo: 'Konstruksi buruk,', text: 'Konstruksi buruk (kecil)',
  desc: 'Masa pembangunan: pekerja memaku keling pelat tangki di atas perancah kayu.', camText: 'Medium-wide, tilt pelan', sfx: 'Palu keling',
  build(st) {
    tankYard(st, { leaks: 0, paint: '#5f5853' });
    const o = onTank(-.05, 0, .1); const sc = S.scaffold({ w: 10, h: 9 }); sc.position.copy(o.p); sc.rotation.y = -.05; st.scene.add(sc);
    const r1 = actor(st, 'riveter', { res: 1000 }), r2 = actor(st, 'riveter', { res: 900, layer: false });
    r1.group.position.copy(o.p).add(v3(-1.5, 2.6, .9)); r2.group.position.copy(o.p).add(v3(2.5, 5.2, .9));
    return (t) => {
      const k = ease.inOut(range(t, 44.85, 46.9)); const hit = Math.floor(t * 4) % 2;
      r1.draw(pose('hammer', { shL: hit ? 150 : 100, elL: hit ? 20 : -40 })); r2.draw(pose('hammer', { turn: -.5, shL: hit ? 100 : 150, elL: hit ? -40 : 20 }));
      cam(st, o.p.clone().add(v3(-2, lerp(2.5, 4, k), 13)), o.p.clone().add(v3(0, lerp(3.5, 5.0, k), 0)), 52);
      r1.face(st.camera); r2.face(st.camera); st.setBlur(0);
    };
  } });

function thermoTex() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 480; const g = c.getContext('2d');
  g.fillStyle = '#d9d2c2'; g.beginPath(); g.roundRect(14, 4, 100, 470, 30); g.fill(); g.lineWidth = 6; g.strokeStyle = '#1a1612'; g.stroke();
  g.fillStyle = '#efe9dc'; g.fillRect(56, 40, 16, 360); g.fillStyle = '#b8322a'; g.fillRect(56, 210, 16, 190); g.beginPath(); g.arc(64, 412, 26, 0, 7); g.fill(); g.stroke();
  g.strokeStyle = '#1a1612'; g.lineWidth = 3; for (let y = 50; y < 400; y += 22) { g.beginPath(); g.moveTo(34, y); g.lineTo(y % 44 ? 46 : 52, y); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
shot({ id: 'S18', t0: 46.9, t1: 48.6, key: 47.8, vo: 'perubahan suhu,', text: 'Perubahan suhu (kecil)',
  desc: 'Termometer tua di dinding bata; salju di kusen mencair dan menetes. Hari yang tiba-tiba hangat.', camText: 'Insert close-up, push kecil', sfx: 'Tetes es',
  build(st) {
    st.scene.background = null;
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(4, 5), new THREE.MeshLambertMaterial({ map: S.brickTex(4, 5, 5, { floors: 1, cols: 1, blank: true }) })); wall.position.y = 2.5; st.scene.add(wall);
    const th = new THREE.Mesh(new THREE.PlaneGeometry(.35, 1.3), new THREE.MeshBasicMaterial({ map: thermoTex(), transparent: true })); th.position.set(0, 2.6, .03); st.scene.add(th);
    const snow = new THREE.Mesh(new THREE.BoxGeometry(2.2, .12, .3), new THREE.MeshToonMaterial({ color: 0xe8ecef })); snow.position.set(.2, 3.45, .15); ink(snow, .01); st.scene.add(snow);
    const ice = S.droplets({ n: 3, box: [0, 0, 0], size: [.03, .04], mat: new THREE.MeshToonMaterial({ color: 0xcfe2ee }) }); st.scene.add(ice);
    return (t) => { const k = ease.inOut(range(t, 46.9, 48.6));
      ice.children.forEach((d, i) => { const a = (t * .8 + i / 3) % 1; d.position.set(-.5 + i * .5, 3.35 - a * a * 2.5, .2); });
      cam(st, v3(.3, 2.8, lerp(2.4, 2.0, k)), v3(0, 2.75, 0), 40); st.setBlur(0); };
  } });

shot({ id: 'S19', t0: 48.6, t1: 50.65, key: 48.9, vo: 'dan pengiriman molase baru menjadi bagian dari rangkaian penyebabnya.', text: 'Pengiriman baru (kecil)',
  desc: 'Kapal tanker merapat di dermaga; selang besar dari kapal ke tangki, molase dipompa masuk.', camText: 'Wide, pan lambat dari kapal ke tangki', sfx: 'Mesin kapal, pompa',
  build(st) {
    tankYard(st, { leaks: 4 });
    const sh = S.ship({}); sh.position.set(26, 0, 2); sh.rotation.y = Math.PI / 2; st.scene.add(sh);
    const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([v3(22, 4, 2), v3(19, 1, 0), v3(15, .5, -4), v3(12.2, 2, -10)]), 40, .25, 10), new THREE.MeshToonMaterial({ color: 0x24201d })); st.scene.add(hose);
    return (t) => { const k = ease.inOut(range(t, 48.6, 50.65));
      cam(st, v3(lerp(-2, 0, k), 8, 30), v3(lerp(26, 6, k), 4.5, lerp(4, -10, k)), 56); st.setBlur(0); };
  } });

// 10 KORBAN / 11 PERTANYAAN ------------------------------------------------------------------------------
shot({ id: 'S20', t0: 50.65, t1: 54.25, key: 52.4, vo: 'Akibatnya, 21 orang meninggal dan 150 terluka.', text: '21 meninggal · 150 terluka (kecil)',
  desc: 'Pemadam dan pelaut membawa tandu bertutup kain melewati molase. Tanpa gore, hening.', camText: 'Medium-wide, nyaris statis', sfx: 'Musik turun, hening',
  build(st) {
    commercialStreet(st);
    const mat = S.molassesMat({ dark: '#160903', mid: '#3a1c07', light: '#6e3a12', hi: '#c98a4a', inkEdge: 0 }); const flood = new THREE.Mesh(new THREE.PlaneGeometry(40, 120), mat); flood.rotation.x = -Math.PI / 2; flood.position.set(0, .08, -30); st.scene.add(flood);
    st.grade({ sat: .45, bright: .88 });
    const a = actor(st, 'fireman', { res: 1000, at: [-1.25, 0, -6.2] }), b = actor(st, 'sailor', { res: 1000, at: [1.25, 0, -6.8] });
    const str = new THREE.Mesh(new THREE.BoxGeometry(2.2, .22, .6), new THREE.MeshToonMaterial({ color: 0xcfc8bb })); str.position.set(0, .95, -6.5); str.rotation.y = -.2; ink(str, .02); fg(str); st.scene.add(str);
    return (t) => { const k = ease.inOut(range(t, 50.65, 54.25));
      a.draw(pose('carry', { turn: .3 })); b.draw(pose('carry', { turn: -.3 }));
      cam(st, v3(lerp(-.8, -.4, k), 1.7, -1.0), v3(0, 1.3, -7), 52); a.face(st.camera); b.face(st.camera); st.setBlur(1.4); };
  } });

shot({ id: 'S21', t0: 54.25, t1: 57.55, key: 55.9, vo: 'Jadi, apakah ini bencana yang datang tiba-tiba…',
  desc: 'Sisa dasar tangki yang robek dan kolam molase gelap. Lampu jalan mulai menyala menjelang petang.', camText: 'Wide, push-in lambat', sfx: 'Ambience tipis',
  build(st) {
    st.setTheme({ ...THEMES.noir, sky: ['#5b5f6b', '#2c2f38'], fog: 0x3a3c44, ambientI: .8, sunI: .6 });
    aftermath(st); st.grade({ sat: .6, bright: .85 });
    for (const [x, z] of [[-20, 10], [-20, -10], [-20, -30]]) { const l = S.lamp(); l.position.set(x, 0, z); st.scene.add(l);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(.25, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffc070, fog: false })); glow.position.set(x, 4.2, z); st.scene.add(glow);
      const pl = new THREE.PointLight(0xffb060, 25, 18, 1.5); pl.position.set(x, 4, z); st.scene.add(pl); }
    return (t) => { const k = ease.inOut(range(t, 54.25, 57.55));
      cam(st, v3(6, 5, lerp(40, 32, k)), v3(0, 3, -16), 50); st.setBlur(0); };
  } });

shot({ id: 'S22', t0: 57.55, t1: 60.7, key: 59.5, vo: '…atau tanda bahaya yang terlalu lama diabaikan?',
  desc: 'Kembali ke sambungan bocor: satu tetes terakhir jatuh, lalu potong ke hitam.', camText: 'ECU, push sangat lambat', sfx: 'Satu tetes, lalu hening',
  build(st) {
    const drip = seamMacro(st, { drops: 1 }); st.warm.intensity = 3; st.warm.position.set(1, 0, 1.5);
    return (t) => { const k = ease.inOut(range(t, 57.55, 60.7)); drip(t);
      st.grade({ sat: .5, bright: lerp(1, .55, k) });
      cam(st, v3(.35, -.2, lerp(1.3, 1.0, k)), v3(.16, -.35, 0), 36); st.setBlur(0); };
  } });
