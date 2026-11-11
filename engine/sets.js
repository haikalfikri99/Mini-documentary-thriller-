// Dark Toon Diorama — reusable set pieces: painted textures on simple geometry, toon molasses, props.
import { THREE, rng, canvasTex, noiseBlots, streaks, ink, toonMat, clamp, lerp } from './core.js';

const lam = (map, o = {}) => new THREE.MeshLambertMaterial({ map, ...o });

// ---------------------------------------------------------------- textures
export function brickTex(wm, hm, seed = 1, o = {}) {
  const R = rng(seed), px = 48; // px per metre
  const W = Math.min(2048, Math.round(wm * px)), H = Math.min(2048, Math.round(hm * px));
  const base = o.base || [112, 74, 60];
  return canvasTex(W, H, (g) => {
    g.fillStyle = `rgb(${base.map(v => v * .8)})`; g.fillRect(0, 0, W, H);
    const bw = px * .23, bh = px * .075;
    for (let y = 0, r = 0; y < H; y += bh, r++) for (let x = (r % 2) * -bw / 2; x < W; x += bw) {
      const k = .82 + R() * .3, tint = R() < .08 ? .7 : 1; g.fillStyle = `rgb(${base.map(v => v * k * tint | 0)})`; g.fillRect(x + 1, y + 1, bw - 2, bh - 2); }
    noiseBlots(g, W, H, R, 70, 'rgba(30,24,22,A)', .05, .2, 20, 120);
    noiseBlots(g, W, H, R, 40, 'rgba(160,150,140,A)', .03, .1, 30, 140);
    streaks(g, W, H, R, 60, 'rgba(20,16,14,A)', [30, H * .4]);
    // windows grid
    const floors = o.floors ?? Math.max(1, Math.floor(hm / 3.4)), fh = H / floors;
    const cols = o.cols ?? Math.max(1, Math.round(wm / 3.2)), cw = W / cols;
    for (let f = 0; f < floors; f++) for (let c = 0; c < cols; c++) {
      const ground = f === floors - 1;
      const ww = cw * (ground ? .62 : .42), wh = fh * (ground ? .62 : .52), x = c * cw + (cw - ww) / 2, y = f * fh + fh * (ground ? .3 : .22);
      if (o.blank && !ground) continue;
      g.fillStyle = '#8b8378'; g.fillRect(x - 4, y - 10, ww + 8, 10); g.fillRect(x - 3, y + wh, ww + 6, 7);  // lintel + sill
      const gr = g.createLinearGradient(0, y, 0, y + wh); gr.addColorStop(0, '#3c4247'); gr.addColorStop(1, '#22262a'); g.fillStyle = gr; g.fillRect(x, y, ww, wh);
      g.fillStyle = 'rgba(190,200,210,.18)'; g.fillRect(x + ww * .08, y + wh * .06, ww * .25, wh * .5);
      g.strokeStyle = '#4b4741'; g.lineWidth = 3; g.strokeRect(x, y, ww, wh); g.beginPath(); g.moveTo(x + ww / 2, y); g.lineTo(x + ww / 2, y + wh); g.moveTo(x, y + wh * .5); g.lineTo(x + ww, y + wh * .5); g.stroke();
      if (ground && R() < .5) { g.fillStyle = '#3f3a33'; g.fillRect(x + ww * .3, y + wh * .1, ww * .4, wh * .9); }
    }
    // cornice + ground grime
    g.fillStyle = 'rgba(40,36,34,.8)'; g.fillRect(0, 0, W, 12);
    const gg = g.createLinearGradient(0, H * .75, 0, H); gg.addColorStop(0, 'rgba(15,12,10,0)'); gg.addColorStop(1, 'rgba(15,12,10,.5)'); g.fillStyle = gg; g.fillRect(0, 0, W, H);
  });
}
export function cobbleTex(seed = 2, wet = .25) {
  const R = rng(seed);
  return canvasTex(512, 512, (g, W, H) => {
    g.fillStyle = '#2b2d30'; g.fillRect(0, 0, W, H);
    const s = 32;
    for (let y = 0, r = 0; y < H; y += s * .62, r++) for (let x = (r % 2) * s / 2 - s; x < W + s; x += s) {
      const k = 70 + R() * 35 | 0, w = s * .86, h = s * .52;
      g.fillStyle = `rgb(${k},${k + 2},${k + 6})`; g.beginPath(); g.roundRect(x + 2, y + 2, w, h, 7); g.fill();
      g.fillStyle = `rgba(200,210,220,${.06 + R() * wet * .4})`; g.beginPath(); g.roundRect(x + 4, y + 3, w * .7, h * .35, 5); g.fill();
    }
    noiseBlots(g, W, H, R, 30, 'rgba(10,10,12,A)', .05, .25, 20, 80);
  }, { repeat: [1, 1] });
}
export function steelTex(wm, hm, seed = 3, o = {}) {
  const R = rng(seed), px = 40, W = Math.min(2048, wm * px | 0), H = Math.min(2048, hm * px | 0);
  return canvasTex(W, H, (g) => {
    g.fillStyle = o.base || '#4c4a47'; g.fillRect(0, 0, W, H);
    noiseBlots(g, W, H, R, 80, 'rgba(20,18,16,A)', .05, .2, 20, 160);
    noiseBlots(g, W, H, R, 50, 'rgba(120,112,100,A)', .04, .12, 20, 120);
    streaks(g, W, H, R, 120, 'rgba(15,12,10,A)', [40, 300]);
    const rowH = (o.rows ? H / o.rows : px * 2.2), colW = px * 3.2;
    g.lineWidth = 4; g.strokeStyle = 'rgba(25,22,20,.9)';
    for (let y = 0; y < H; y += rowH) { g.fillStyle = 'rgba(70,66,60,.9)'; g.fillRect(0, y - 9, W, 18); g.beginPath(); g.moveTo(0, y + 9); g.lineTo(W, y + 9); g.stroke();
      for (let x = 8; x < W; x += 16) { g.fillStyle = '#2a2826'; g.beginPath(); g.arc(x, y - 3, 3.6, 0, 7); g.fill(); g.fillStyle = 'rgba(160,150,140,.5)'; g.beginPath(); g.arc(x - 1, y - 4.5, 1.3, 0, 7); g.fill(); }
      for (let x = (Math.floor(y / rowH) % 2) * colW / 2; x < W; x += colW) { g.beginPath(); g.moveTo(x, y + 9); g.lineTo(x, y + rowH - 9); g.stroke();
        for (let yy = y + 16; yy < y + rowH - 10; yy += 15) { g.fillStyle = '#2a2826'; g.beginPath(); g.arc(x + 6, yy, 3.2, 0, 7); g.fill(); } } }
    if (o.leaks) for (let i = 0; i < o.leaks; i++) { const x = R() * W, y = (Math.floor(R() * (H / rowH)) * rowH) + 6, l = 60 + R() * 260;
      const gr = g.createLinearGradient(x, y, x, y + l); gr.addColorStop(0, 'rgba(90,48,14,.95)'); gr.addColorStop(1, 'rgba(90,48,14,0)'); g.fillStyle = gr; g.fillRect(x, y, 5 + R() * 10, l); }
  });
}
export function woodTex(seed = 4, base = [110, 82, 58]) {
  const R = rng(seed);
  return canvasTex(256, 64, (g, W, H) => { g.fillStyle = `rgb(${base})`; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 40; i++) { g.strokeStyle = `rgba(40,26,16,${.1 + R() * .25})`; g.lineWidth = 1 + R() * 2; g.beginPath(); const y = R() * H; g.moveTo(0, y); g.bezierCurveTo(W * .3, y + R() * 6 - 3, W * .6, y + R() * 6 - 3, W, y); g.stroke(); } });
}

// ---------------------------------------------------------------- set pieces
export function building({ w = 12, h = 10, d = 10, seed = 1, base, floors, cols, roof = 'flat', side = 1 } = {}) {
  const grp = new THREE.Group();
  const front = brickTex(w, h, seed, { base, floors, cols }), sideT = brickTex(d, h, seed + 7, { base, floors, cols: Math.max(1, Math.round(d / 4)) });
  const mats = [lam(sideT), lam(sideT), lam(null, { color: 0x2a2726 }), lam(null, { color: 0x222 }), lam(front), lam(front)];
  const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats); box.position.y = h / 2; grp.add(box);
  const cor = new THREE.Mesh(new THREE.BoxGeometry(w + .5, .45, d + .5), lam(null, { color: 0x3a3532 })); cor.position.y = h + .1; grp.add(cor);
  if (roof === 'gable') { const r = new THREE.Mesh(new THREE.CylinderGeometry(.01, d * .62, w + .3, 4, 1), lam(null, { color: 0x3b3f44 })); r.rotation.z = Math.PI / 2; r.rotation.x = Math.PI / 4; r.scale.set(1, 1, .45); r.position.y = h + 1.2; grp.add(r); }
  if (seed % 3 === 0) { const ch = new THREE.Mesh(new THREE.BoxGeometry(.9, 2.2, .9), lam(brickTex(1, 2, seed + 3, { blank: true, floors: 0 }))); ch.position.set(w * .3, h + 1.1, -d * .2); grp.add(ch); }
  return grp;
}
// a row of buildings along z (street side x>0 faces -x when side=1)
export function buildingRow({ x = 9, z0 = 10, z1 = -120, side = 1, seed = 10, hMin = 8, hMax = 14 } = {}) {
  const R = rng(seed), grp = new THREE.Group(); let z = z0;
  const bases = [[112, 74, 60], [96, 70, 62], [120, 92, 74], [88, 80, 74], [104, 66, 54]];
  while (z > z1) { const w = 9 + R() * 8, h = hMin + R() * (hMax - hMin), d = 12;
    const b = building({ w, h, d, seed: (seed * 31 + (z | 0)) & 1023, base: bases[(R() * bases.length) | 0] });
    b.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2; b.position.set(x + side * d / 2, 0, z - w / 2); grp.add(b); z -= w + .05; }
  return grp;
}
export function street({ w = 16, len = 160, z0 = 20, seed = 2 } = {}) {
  const grp = new THREE.Group();
  const t = cobbleTex(seed); t.repeat.set(w / 1.6, len / 1.6);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(w, len), lam(t)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0, z0 - len / 2); grp.add(road);
  const swT = canvasTex(256, 256, (g, W, H) => { g.fillStyle = '#5b5955'; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(30,28,26,.6)'; g.lineWidth = 3; for (let y = 0; y < H; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); } const R = rng(5); noiseBlots(g, W, H, R, 25, 'rgba(20,20,20,A)', .05, .2, 10, 60); }, { repeat: [1, len / 3] });
  for (const s of [-1, 1]) { const sw = new THREE.Mesh(new THREE.BoxGeometry(3, .18, len), lam(swT)); sw.position.set(s * (w / 2 + 1.5), .09, z0 - len / 2); grp.add(sw); }
  // far ground
  const far = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), lam(null, { color: 0x3a3c3e })); far.rotation.x = -Math.PI / 2; far.position.y = -.02; grp.add(far);
  return grp;
}
// elevated railway along z at x, deck height h
export function elRail({ x = 2.5, h = 6.2, z0 = 15, z1 = -140, span = 10, seed = 6, bend = null } = {}) {
  const grp = new THREE.Group(), steel = lam(steelTex(8, 2, seed, { base: '#2f3133' })), dark = new THREE.MeshLambertMaterial({ color: 0x24272a });
  const deckW = 5.2, len = z0 - z1;
  const g1 = new THREE.Mesh(new THREE.BoxGeometry(.5, 1.3, len), steel); const g2 = g1.clone();
  g1.position.set(x - deckW / 2, h + .65, z0 - len / 2); g2.position.set(x + deckW / 2, h + .65, z0 - len / 2); grp.add(g1, g2);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(deckW, .3, len), dark); deck.position.set(x, h + .15, z0 - len / 2); grp.add(deck);
  // ties underside
  for (let z = z0; z > z1; z -= .9) { const t = new THREE.Mesh(new THREE.BoxGeometry(deckW + .6, .16, .25), dark); t.position.set(x, h + 1.38, z); grp.add(t); }
  const cols = [];
  for (let z = z0 - 2; z > z1; z -= span) for (const s of [-1, 1]) {
    const c = new THREE.Group(); const cx = x + s * deckW / 2;
    for (const o of [-.28, .28]) { const v = new THREE.Mesh(new THREE.BoxGeometry(.12, h, .5), dark); v.position.set(o, h / 2, 0); c.add(v); }
    for (let y = .4; y < h - .6; y += .9) { const b = new THREE.Mesh(new THREE.BoxGeometry(.08, 1.15, .1), dark); b.position.set(0, y + .45, 0); b.rotation.z = ((y * 10 | 0) % 2 ? 1 : -1) * .55; c.add(b); }
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, .5, 1.0), lam(null, { color: 0x56524d })); base.position.y = .25; c.add(base);
    // knee bracket under girder
    const kn = new THREE.Mesh(new THREE.TorusGeometry(1.0, .08, 6, 12, Math.PI / 2), dark); kn.position.set(-s * 1.0, h - 1.0, 0); kn.rotation.z = s > 0 ? Math.PI / 2 : 0; kn.rotation.y = 0; c.add(kn);
    c.position.set(cx, 0, z); grp.add(c); cols.push(c);
  }
  grp.userData.cols = cols;
  return grp;
}
export function tank({ r = 13.5, h = 15, seed = 7, leaks = 0, paint = '#4e4640' } = {}) {
  const grp = new THREE.Group();
  const t = steelTex(2 * Math.PI * r, h, seed, { base: paint, rows: 7, leaks }); t.wrapS = THREE.RepeatWrapping;
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 72, 1, true), lam(t, { side: THREE.DoubleSide })); body.position.y = h / 2; grp.add(body);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(r + .3, 2.2, 72), lam(null, { color: 0x3f3a36 })); roof.position.y = h + 1.1; grp.add(roof);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r + .05, .14, 6, 72), lam(null, { color: 0x2b2826 })); ring.rotation.x = Math.PI / 2; ring.position.y = h; grp.add(ring);
  return grp;
}
// horse-drawn wagon (3D toon box wagon + painted horse card)
export function wagon({ seed = 8 } = {}) {
  const grp = new THREE.Group(), wood = toonMat(0x6b4f38), dark = toonMat(0x2b2420);
  const bed = new THREE.Mesh(new THREE.BoxGeometry(1.9, .55, 3.4), wood); bed.position.y = 1.15; ink(bed, .03); grp.add(bed);
  const cover = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.5, 2.4), toonMat(0x3b3631)); cover.position.set(0, 2.15, -.4); ink(cover, .03); grp.add(cover);
  for (const [x, z] of [[-1, 1.2], [1, 1.2], [-1, -1.2], [1, -1.2]]) { const wh = new THREE.Mesh(new THREE.TorusGeometry(.55, .06, 6, 20), dark); wh.position.set(x, .6, z); wh.rotation.y = Math.PI / 2; grp.add(wh);
    for (let i = 0; i < 6; i++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(.03, 1.05, .03), dark); sp.position.copy(wh.position); sp.rotation.set(0, 0, 0); sp.rotateX(i * Math.PI / 6); grp.add(sp); } }
  const horse = horseCard(); horse.position.set(0, 0, 3.2); grp.add(horse);
  return grp;
}
export function horseCard({ height = 1.9, side = false } = {}) {
  const W = 700, H = 600;
  const tex = canvasTex(W, H, (g) => drawHorse(g, W, H, side));
  const m = new THREE.Mesh(new THREE.PlaneGeometry(height * W / H, height), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: .05, fog: true }));
  m.geometry.translate(0, height / 2, 0); m.rotation.y = side ? 0 : Math.PI / 2;
  return m;
}
function drawHorse(g, W, H) { // side view cartoon horse, ink outline
  g.save(); g.translate(W * .5, H * .98); g.scale(W / 7, W / 7); g.lineJoin = 'round'; g.lineCap = 'round';
  const INK = '#16120e', body = '#5a463a', dark = '#3a2c24';
  const fs = (p, c) => { g.lineWidth = .12; g.strokeStyle = INK; g.stroke(p); g.fillStyle = c; g.fill(p); };
  const leg = (x, a) => { const p = new Path2D(); p.moveTo(x - .18, -3.0); p.lineTo(x + .18, -3.0); p.lineTo(x + .12 + a, -.25); p.lineTo(x - .12 + a, -.25); p.closePath(); fs(p, dark); const h = new Path2D(); h.rect(x - .2 + a, -.32, .4, .32); fs(h, '#221a16'); };
  leg(-1.9, .1); leg(1.4, -.1);
  const b = new Path2D(); b.ellipse(0, -3.3, 2.5, 1.05, 0, 0, 7); fs(b, body);
  leg(-1.5, -.15); leg(1.8, .15);
  const n = new Path2D(); n.moveTo(1.7, -3.9); n.lineTo(2.6, -5.4); n.lineTo(3.3, -5.3); n.lineTo(2.7, -3.4); n.closePath(); fs(n, body);
  const hd = new Path2D(); hd.ellipse(3.2, -5.2, .75, .38, .55, 0, 7); fs(hd, body);
  const mane = new Path2D(); mane.moveTo(1.6, -4.1); mane.lineTo(2.55, -5.7); mane.lineTo(2.35, -5.0); mane.lineTo(1.5, -3.8); mane.closePath(); fs(mane, '#2a1f19');
  const tail = new Path2D(); tail.moveTo(-2.4, -3.6); tail.quadraticCurveTo(-3.2, -2.8, -2.8, -1.6); tail.lineTo(-2.5, -2.6); tail.closePath(); fs(tail, '#2a1f19');
  g.fillStyle = INK; g.beginPath(); g.arc(3.3, -5.4, .07, 0, 7); g.fill();
  // harness
  g.strokeStyle = '#1e1714'; g.lineWidth = .14; g.beginPath(); g.moveTo(1.4, -4.0); g.lineTo(-1.2, -3.0); g.stroke();
  g.restore();
}

// ---------------------------------------------------------------- molasses (toon glossy)
export function molassesMat({ dark = '#2a1104', mid = '#7a3a0f', light = '#cc7a24', hi = '#ffe9c8', emissive = .05, inkEdge = .2 } = {}) {
  const u = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    cD: { value: new THREE.Color(dark) }, cM: { value: new THREE.Color(mid) }, cL: { value: new THREE.Color(light) }, cH: { value: new THREE.Color(hi) },
    lDir: { value: new THREE.Vector3(-.4, .8, .45).normalize() }, em: { value: emissive }, edge: { value: inkEdge }, time: { value: 0 } }]);
  return new THREE.ShaderMaterial({ uniforms: u, fog: true, side: THREE.DoubleSide,
    vertexShader: `varying vec3 vN; varying vec3 vW; varying vec2 vUv;
      #include <fog_pars_vertex>
      void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz;
        vec4 mvPosition=viewMatrix*w; gl_Position=projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `uniform vec3 cD,cM,cL,cH,lDir; uniform float em,time,edge; varying vec3 vN; varying vec3 vW; varying vec2 vUv;
      #include <fog_pars_fragment>
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      void main(){ vec3 N=normalize(vN); if(!gl_FrontFacing) N=-N; vec3 V=normalize(cameraPosition-vW);
        float d=dot(N,lDir)*.5+.5; d+=(n(vUv*vec2(9.,4.)+time*.2)-.5)*.08;
        vec3 c = d<.42 ? cD : d<.66 ? cM : cL;
        float fr=pow(1.-max(dot(N,V),0.),3.); c=mix(c,cL,fr*.35);
        // flow lines: follow the profile direction (v), wobble across (u)
        float fx=vUv.x*46.+n(vec2(vUv.x*6.,vUv.y*3.+time*.4))*5.;
        float line=smoothstep(.0,.06,abs(fract(fx)-.5)-.40);
        float hiZone=smoothstep(.55,.75,d);
        float streak=step(.62,n(vec2(vUv.x*55.,vUv.y*1.5+time*.6)));
        c=mix(c,cH,line*hiZone*streak*.95);
        float darkl=smoothstep(.0,.05,abs(fract(fx*.5+.25)-.5)-.44)*step(.6,n(vec2(vUv.x*30.,vUv.y*2.)));
        c=mix(c,cD*.8,darkl*(1.-hiZone)*.7);
        vec3 R=reflect(-lDir,N); float sp=max(dot(R,V),0.); if(sp>.995) c=mix(c,cH,.6);
        c+=cL*em;
        float ndv=abs(dot(N,V)); if(ndv<edge) c=vec3(.07,.045,.03);
        gl_FragColor=vec4(c,1.);
        #include <fog_fragment>
      }` });
}
// curling wave wall: width along x, front faces +z. params: height, curl, seed
// barrel wave: strip A = back slope → crest → curling lip ; strip B = concave front face. Front faces +z. Units scaled by height.
export function molassesWave({ width = 22, height = 5, depth = 10, seed = 11, segX = 120, segV = 48, mat, taper = 1 } = {}) {
  const R = rng(seed), ph = [R() * 6, R() * 6, R() * 6, R() * 6];
  const A = (lip) => [[-depth / height, 0], [-depth / height * .55, .5], [-.25, .92], [.25 * lip, 1.02], [.62 * lip, .96], [.88 * lip, .76], [.84 * lip, .5], [.66 * lip, .44]];
  const B = (lip) => [[.55, 0], [.26, .05], [.12, .25], [.07, .55], [.12, .84], [.25 * lip, 1.0]];
  const sample = (pr) => { const out = []; for (let i = 0; i < segV; i++) { const t = i / (segV - 1) * (pr.length - 1), k = Math.floor(Math.min(t, pr.length - 2)), f = t - k;
    const P = j => pr[clamp(j, 0, pr.length - 1)]; const p0 = P(k - 1), p1 = P(k), p2 = P(k + 1), p3 = P(k + 2);
    const cr = (a, b, c, d) => .5 * ((2 * b) + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * f * f + (-a + 3 * b - 3 * c + d) * f * f * f);
    out.push([cr(p0[0], p1[0], p2[0], p3[0]), cr(p0[1], p1[1], p2[1], p3[1])]); } return out; };
  const grp = new THREE.Group(); mat = mat || molassesMat();
  for (const prof of [A, B]) {
    const geo = new THREE.BufferGeometry(), pos = [], uv = [], idx = [];
    for (let i = 0; i <= segX; i++) { const u = i / segX, x = (u - .5) * width;
      const env = Math.pow(Math.sin(Math.PI * clamp(u)), .35);
      const amp = (lerp(1.08, 1 - .55 * taper, u) + .1 * Math.sin(u * 11 + ph[0]) + .05 * Math.sin(u * 23 + ph[1])) * env;
      const lip = (.8 + .35 * Math.sin(u * 4.3 + ph[2])) * (1.2 - .45 * u);
      const hh = height * Math.max(.05, amp), pts = sample(prof(lip));
      for (let j = 0; j < segV; j++) { const [z, y] = pts[j]; pos.push(x, y * hh, z * hh + Math.sin(u * 6 + ph[3]) * .5 * y); uv.push(u, j / (segV - 1)); } }
    for (let i = 0; i < segX; i++) for (let j = 0; j < segV - 1; j++) { const a = i * segV + j, b = a + segV; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
    grp.add(new THREE.Mesh(geo, mat));
  }
  return grp;
}
// flat flood sheet with lobed front edge (spilling ahead of the wave)
export function molassesSheet({ width = 22, length = 8, seed = 12, lobes = 9, mat } = {}) {
  const R = rng(seed), s = new THREE.Shape();
  s.moveTo(-width / 2, 0);
  const ph = R() * 6;
  for (let i = 0; i <= lobes * 10; i++) { const u = i / (lobes * 10), x = (u - .5) * width;
    const l = length * (.5 + .32 * Math.pow(.5 + .5 * Math.cos(u * Math.PI * 2 * lobes + ph), 1.5) + .18 * Math.sin(u * 17 + ph)) * Math.pow(Math.sin(Math.PI * u), .3);
    s.lineTo(x, l); }
  s.lineTo(width / 2, 0); s.lineTo(-width / 2, 0);
  const geo = new THREE.ShapeGeometry(s, 24); geo.rotateX(-Math.PI / 2); geo.scale(1, 1, -1);
  const pos = geo.attributes.position; for (let i = 0; i < pos.count; i++) pos.setY(i, .06 + .2 * Math.max(0, 1 - Math.abs(pos.getZ(i)) / length) * (1 - pos.getZ(i) / length * 0));
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, mat || molassesMat());
}
export function droplets({ n = 20, seed = 13, box = [10, 6, 4], size = [.12, .35], mat } = {}) {
  const R = rng(seed), grp = new THREE.Group(); const g = new THREE.SphereGeometry(1, 14, 10);
  { const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const y = p.getY(i); if (y > 0) { p.setY(i, y * 1.45); p.setX(i, p.getX(i) * (1 - y * y * .55)); p.setZ(i, p.getZ(i) * (1 - y * y * .55)); } } g.computeVertexNormals(); }
  for (let i = 0; i < n; i++) { const d = new THREE.Mesh(g, mat || molassesMat()); const s = size[0] + R() * (size[1] - size[0]); d.scale.setScalar(s);
    d.position.set((R() - .5) * box[0], R() * box[1], (R() - .5) * box[2]); d.rotation.z = (R() - .5) * 2; d.userData.v = [(R() - .5) * 2, 2 + R() * 3, R() * 2]; ink(d, .12); grp.add(d); }
  return grp;
}
export function plank({ l = 2.4, seed = 1 } = {}) { const m = new THREE.Mesh(new THREE.BoxGeometry(l, .08, .28), new THREE.MeshToonMaterial({ map: woodTex(seed), gradientMap: null })); ink(m, .02); return m; }
export function steelPlate({ w = 2.5, h = 1.6, seed = 1, curve = .4 } = {}) {
  const geo = new THREE.PlaneGeometry(w, h, 12, 4); const p = geo.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.pow(p.getX(i) / w * 2, 2) * curve);
  geo.computeVertexNormals(); const m = new THREE.Mesh(geo, lam(steelTex(w, h, seed, { base: '#5a5550' }), { side: THREE.DoubleSide })); return m;
}
export function lamp() { const grp = new THREE.Group(), d = toonMat(0x1f2124);
  const p = new THREE.Mesh(new THREE.CylinderGeometry(.07, .1, 4, 8), d); p.position.y = 2; grp.add(p);
  const l = new THREE.Mesh(new THREE.CylinderGeometry(.25, .12, .5, 6), d); l.position.y = 4.2; grp.add(l); ink(p, .02); return grp; }

// ---------------------------------------------------------------- more props
export function elCar({ len = 13, color = '#4a3b33', seed = 21 } = {}) {
  const grp = new THREE.Group(), R = rng(seed);
  const side = canvasTex(512, 128, (g, W, H) => { g.fillStyle = color; g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, H * .82, W, H * .18);
    for (let i = 0; i < 9; i++) { const x = 18 + i * 54; g.fillStyle = '#2a2f33'; g.fillRect(x, 26, 34, 40); g.fillStyle = 'rgba(200,210,215,.25)'; g.fillRect(x + 3, 29, 12, 18);
      g.strokeStyle = '#1d1a18'; g.lineWidth = 3; g.strokeRect(x, 26, 34, 40); }
    g.fillStyle = '#c9b48a'; g.fillRect(0, 74, W, 3); });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.7, 2.7, len), [lam(side), lam(side), lam(null, { color: 0x2b2524 }), lam(null, { color: 0x1d1b1a }), lam(null, { color: 0x3e322b }), lam(null, { color: 0x3e322b })]);
  body.position.y = 1.65; ink(body, .04); grp.add(body);
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, len, 16, 1, false, -Math.PI / 2, Math.PI), toonMat(0x2f2a28)); roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2; roof.scale.set(1, 1, .3); roof.position.y = 3.0; grp.add(roof);
  for (const z of [-len / 2 + 2, len / 2 - 2]) { const tr = new THREE.Mesh(new THREE.BoxGeometry(2.2, .5, 2.2), toonMat(0x1a1a1a)); tr.position.set(0, .25, z); grp.add(tr); }
  return grp;
}
export function barrel({ r = .45, h = 1.1, seed = 1 } = {}) {
  const t = canvasTex(256, 128, (g, W, H) => { g.fillStyle = '#6e5038'; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(30,20,12,.6)'; g.lineWidth = 2; for (let x = 0; x < W; x += 21) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.fillStyle = '#2b2b2b'; g.fillRect(0, H * .12, W, 8); g.fillRect(0, H * .82, W, 8); });
  const geo = new THREE.CylinderGeometry(r, r, h, 20, 6); const p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const y = p.getY(i) / h * 2, k = 1 + .12 * (1 - y * y); p.setX(i, p.getX(i) * k); p.setZ(i, p.getZ(i) * k); }
  geo.computeVertexNormals(); const m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ map: t, gradientMap: null })); m.position.y = h / 2; ink(m, .025);
  const g2 = new THREE.Group(); g2.add(m); return g2;
}
export function scaffold({ w = 8, h = 9, levels = 3 } = {}) {
  const grp = new THREE.Group(), wood = toonMat(0x7a5a3c);
  for (const x of [-w / 2, 0, w / 2]) for (const z of [0, 1.4]) { const p = new THREE.Mesh(new THREE.BoxGeometry(.14, h, .14), wood); p.position.set(x, h / 2, z); ink(p, .02); grp.add(p); }
  for (let l = 1; l <= levels; l++) { const y = l * h / (levels + .3); const pl = new THREE.Mesh(new THREE.BoxGeometry(w + .6, .1, 1.6), wood); pl.position.set(0, y, .7); ink(pl, .02); grp.add(pl);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(w + .4, .08, .08), wood); rail.position.set(0, y + 1.0, 1.4); grp.add(rail); }
  return grp;
}
export function ship({ len = 40 } = {}) {
  const grp = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(len, 5, 8), [lam(null, { color: 0x2b2d30 }), lam(null, { color: 0x2b2d30 }), lam(null, { color: 0x4a3a30 }), lam(null, { color: 0x111 }), lam(steelTex(len, 5, 31, { base: '#33302d', rows: 2 })), lam(steelTex(len, 5, 32, { base: '#33302d', rows: 2 }))]);
  hull.position.y = 1.5; grp.add(hull);
  const bow = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 5, 3, 1, false, 0, Math.PI), lam(null, { color: 0x2b2d30 })); bow.position.set(len / 2, 1.5, 0); bow.rotation.y = Math.PI / 2; bow.scale.set(1, 1, .9); grp.add(bow);
  const house = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 6), lam(brickTex(6, 4, 33, { base: [180, 172, 160], floors: 2, cols: 3 }))); house.position.set(-len * .3, 6, 0); grp.add(house);
  const funnel = new THREE.Mesh(new THREE.CylinderGeometry(.9, 1.0, 6, 14), toonMat(0x1f1f20)); funnel.position.set(-len * .3, 11, 0); ink(funnel, .05); grp.add(funnel);
  for (const x of [-len * .45, len * .3]) { const m = new THREE.Mesh(new THREE.CylinderGeometry(.15, .2, 16, 6), toonMat(0x2a2522)); m.position.set(x, 12, 0); grp.add(m); }
  return grp;
}
export function woodBuilding({ w = 7, h = 7, d = 7, seed = 41 } = {}) {
  const t = canvasTex(512, 512, (g, W, H) => { g.fillStyle = '#6b5a48'; g.fillRect(0, 0, W, H); const R = rng(seed);
    for (let y = 0; y < H; y += 22) { g.fillStyle = `rgba(0,0,0,${.1 + R() * .15})`; g.fillRect(0, y, W, 3); }
    for (const [x, y] of [[80, 120], [300, 120], [80, 330], [300, 330]]) { g.fillStyle = '#25292c'; g.fillRect(x, y, 110, 120); g.strokeStyle = '#3b3128'; g.lineWidth = 8; g.strokeRect(x, y, 110, 120); }
    streaks(g, W, H, R, 40, 'rgba(20,16,12,A)', [40, 200]); });
  const grp = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam(t)); b.position.y = h / 2; ink(b, .05); grp.add(b);
  const r = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * .75, 3, 4), lam(null, { color: 0x3a3330 })); r.rotation.y = Math.PI / 4; r.position.y = h + 1.5; grp.add(r);
  return grp;
}
// tank with a torn opening + peeled plates (aftermath / rupture)
export function tornTank({ r = 13.5, h = 15, open = 1.2, seed = 9 } = {}) {
  const grp = new THREE.Group(); const t = steelTex(2 * Math.PI * r, h, seed, { base: '#4a4440', rows: 7, leaks: 4 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h * .35, 72, 1, true, open / 2, Math.PI * 2 - open), lam(t, { side: THREE.DoubleSide })); body.position.y = h * .175; grp.add(body);
  // jagged stumps
  for (let i = 0; i < 18; i++) { const a = open / 2 + i / 18 * (Math.PI * 2 - open), hh = h * (.35 + .2 * Math.abs(Math.sin(i * 2.7)));
    const p = steelPlate({ w: 2 * Math.PI * r / 18 + .05, h: hh, seed: seed + i, curve: 0 }); p.position.set(Math.sin(a) * r, hh / 2, Math.cos(a) * r); p.rotation.y = a; grp.add(p); }
  return grp;
}
export function wallClose({ w = 6, h = 8, seed = 3, crack = 0, leaks = 2, paint = '#4e4640' } = {}) {
  // a close-up section of riveted tank wall with 3D rivets (for macro shots)
  const grp = new THREE.Group(), R = rng(seed);
  const t = steelTex(w, h, seed, { base: paint, rows: 3, leaks });
  const mk = (x0, x1) => { const pl = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, h), lam(t.clone ? t : t)); pl.position.set((x0 + x1) / 2, h / 2, 0); return pl; };
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lam(t)); plate.position.y = h / 2; grp.add(plate);
  const rivGeo = new THREE.SphereGeometry(.06, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); rivGeo.rotateX(Math.PI / 2);
  const rmat = toonMat(0x3b3734); const rivets = [];
  for (const y of [h / 3, h * 2 / 3]) for (let x = -w / 2 + .1; x < w / 2; x += .4) { const rv = new THREE.Mesh(rivGeo, rmat); rv.position.set(x, y + .06, .01); grp.add(rv); rivets.push(rv); }
  for (let y = .2; y < h; y += .38) { const rv = new THREE.Mesh(rivGeo, rmat); rv.position.set(.15, y, .01); grp.add(rv); rivets.push(rv); }
  grp.userData.rivets = rivets; return grp;
}

// ---------------------------------------------------------------- animated molasses wave (rebuilds vertices each frame)
// update({ t, height, lip, curl, surge }) : lip = overhang (0..1.4), curl = how far the crest has rolled over (0..1), surge = forward bulge of the face
export function makeWave({ width = 22, depth = 10, segX = 110, segV = 44, seed = 11, mat, taper = .6 } = {}) {
  const R = rng(seed), ph = [R() * 6, R() * 6, R() * 6, R() * 6];
  mat = mat || molassesMat();
  const strips = [0, 1].map(() => { const g = new THREE.BufferGeometry(); const n = (segX + 1) * segV;
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); const uv = new Float32Array(n * 2);
    for (let i = 0; i <= segX; i++) for (let j = 0; j < segV; j++) { const k = i * segV + j; uv[k * 2] = i / segX; uv[k * 2 + 1] = j / (segV - 1); }
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); const idx = [];
    for (let i = 0; i < segX; i++) for (let j = 0; j < segV - 1; j++) { const a = i * segV + j, b = a + segV; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    g.setIndex(idx); const m = new THREE.Mesh(g, mat); m.frustumCulled = false; return m; });
  const group = new THREE.Group(); strips.forEach(s => group.add(s));
  const cr = (pr, f, k) => { const P = j => pr[clamp(j, 0, pr.length - 1)]; const p0 = P(k - 1), p1 = P(k), p2 = P(k + 1), p3 = P(k + 2);
    const c = (a, b, c2, d) => .5 * ((2 * b) + (-a + c2) * f + (2 * a - 5 * b + 4 * c2 - d) * f * f + (-a + 3 * b - 3 * c2 + d) * f * f * f);
    return [c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]; };
  const sample = (pr, out) => { for (let i = 0; i < segV; i++) { const t = i / (segV - 1) * (pr.length - 1), k = Math.floor(Math.min(t, pr.length - 2)); out[i] = cr(pr, t - k, k); } return out; };
  const bufA = [], bufB = [];
  function update({ t = 0, height = 5, lip = 1, curl = 0, surge = 0 } = {}) {
    for (let i = 0; i <= segX; i++) {
      const u = i / segX, x = (u - .5) * width;
      const env = Math.pow(Math.sin(Math.PI * clamp(u)), .35);
      const amp = (lerp(1.08, 1 - .55 * taper, u) + .1 * Math.sin(u * 11 + ph[0] - t * 1.3) + .05 * Math.sin(u * 23 + ph[1] + t * 2.1)) * env;
      const lp = lip * (.8 + .35 * Math.sin(u * 4.3 + ph[2] + t * .7)) * (1.2 - .45 * u);
      const cu = curl * (.85 + .3 * Math.sin(u * 5 + ph[3]));
      // crest point and lip rotated by curl around the crest
      const crest = [.25 * lp + surge * .1, 1.02];
      const lipPts = [[.62 * lp, .96], [.88 * lp, .76], [.84 * lp, .5], [.66 * lp, .44]].map(([z, y]) => {
        const dz = z - crest[0], dy = y - crest[1], a = -cu * 1.1; return [crest[0] + dz * Math.cos(a) - dy * Math.sin(a) + cu * .25, crest[1] + dz * Math.sin(a) + dy * Math.cos(a) - cu * .12]; });
      const A = [[-depth / height, 0], [-depth / height * .55, .5], [-.25, .92], crest, ...lipPts];
      const B = [[.55 + surge * .3, 0], [.26 + surge * .3, .05], [.12 + surge * .25, .25], [.07 + surge * .15, .55], [.12, .84], crest];
      sample(A, bufA); sample(B, bufB);
      const hh = height * Math.max(.05, amp), wob = Math.sin(u * 6 + ph[3] + t) * .5;
      [bufA, bufB].forEach((buf, si) => { const pos = strips[si].geometry.attributes.position.array;
        for (let j = 0; j < segV; j++) { const k = (i * segV + j) * 3, [z, y] = buf[j]; pos[k] = x; pos[k + 1] = y * hh; pos[k + 2] = z * hh + wob * y; } });
    }
    strips.forEach(s => { s.geometry.attributes.position.needsUpdate = true; s.geometry.computeVertexNormals(); });
    if (mat.uniforms) mat.uniforms.time.value = t;
  }
  update({});
  return { group, update, mat };
}

// ---------------------------------------------------------------- tank made of hinged panels (for the rupture)
// update(k): 0 intact … .25 bulge + rivets … 1 front panels peeled / torn away. Returns the panel list for extra control.
export function burstTank({ r = 13.5, h = 15, n = 36, seed = 7, front = .95, paint = '#4e4640', inner: innerCol = '#2a1a10' } = {}) {
  const grp = new THREE.Group(), R = rng(seed), panels = [];
  const dth = Math.PI * 2 / n;
  const tex = steelTex(2 * Math.PI * r / n * 1.02, h, seed, { base: paint, rows: 7, leaks: 1 });
  const inner = new THREE.MeshBasicMaterial({ color: innerCol, side: THREE.BackSide, fog: true });
  for (let i = 0; i < n; i++) {
    const th = (i + .5) * dth - Math.PI; // centre angle, 0 faces +z
    const geo = new THREE.CylinderGeometry(r, r, h, 4, 6, true, th - dth / 2, dth * 1.01); geo.translate(0, h / 2, 0);
    const pivot = new THREE.Group(); pivot.position.set(Math.sin(th) * r, 0, Math.cos(th) * r); pivot.rotation.y = th;
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, color: 0xa8a29a, fog: true })); const mi = new THREE.Mesh(geo, inner);
    const inv = new THREE.Group(); inv.add(m, mi); inv.applyMatrix4(new THREE.Matrix4().makeRotationY(-th)); inv.position.set(0, 0, -r);
    const local = new THREE.Group(); local.add(inv);
    const container = new THREE.Group(); container.add(local);
    pivot.add(container); grp.add(pivot);
    const inFront = Math.abs(th) < front; const w = inFront ? 1 - Math.abs(th) / front : 0;
    panels.push({ pivot, container, th, w, delay: R() * .15 + (1 - w) * .2, fly: inFront && R() < .55, spin: (R() - .5) * 2, up: R() });
  }
  const cone = new THREE.Mesh(new THREE.ConeGeometry(r + .3, 2.2, 72), lam(null, { color: 0x3f3a36 })); cone.position.y = h + 1.1; grp.add(cone);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r + .05, .14, 6, 72), lam(null, { color: 0x2b2826 })); ring.rotation.x = Math.PI / 2; ring.position.y = h; grp.add(ring);
  function update(k) {
    for (const p of panels) {
      p.container.position.set(0, 0, 0); p.container.rotation.set(0, 0, 0); p.pivot.scale.set(1, 1, 1);
      if (!p.w) continue;
      const bulge = clamp(k / .25) * (1 - clamp((k - .25) / .1));
      const open = clamp((k - .25 - p.delay) / .55);
      const e = 1 - Math.pow(1 - open, 3);
      p.container.position.z = bulge * .6 * p.w;              // bulging outward before failure
      p.container.rotation.x = e * (1.25 + p.up * .6) * p.w;   // hinge at the base, falls outward
      if (p.fly && open > 0) { p.container.position.z += e * 9 * p.w; p.container.position.y += Math.sin(Math.PI * e) * 5 * p.up; p.container.rotation.z = e * p.spin * 2; }
    }
    cone.position.y = h + 1.1 - clamp((k - .5) / .5) * 3; cone.rotation.x = clamp((k - .5) / .5) * .25;
  }
  update(0);
  return { group: grp, update, panels, cone };
}
