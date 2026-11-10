/* paint.js — pustaka lukis prosedural untuk rekonstruksi sinematik "Banjir Ini Bukan Air".
   Semua aset digambar dengan kode (Canvas 2D), deterministik (seed tetap), tanpa foto/arsip. */
(function () {
  const W = 1080, H = 1920;

  function rnd(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function Noise(seed) {
    const r = rnd(seed), p = [...Array(256).keys()];
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    const P = new Uint16Array(512); for (let i = 0; i < 512; i++) P[i] = p[i & 255];
    const V = new Float32Array(256); for (let i = 0; i < 256; i++) V[i] = r();
    const n = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      const X = xi & 255, X1 = (xi + 1) & 255, Y = P[yi & 255], Y1 = P[(yi + 1) & 255];
      const a = V[P[X + Y]], b = V[P[X1 + Y]], c = V[P[X + Y1]], d = V[P[X1 + Y1]];
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    n.fbm = (x, y, o = 5) => { let s = 0, a = 0.5, f = 1, t = 0; for (let i = 0; i < o; i++) { s += a * n(x * f, y * f); t += a; a *= 0.5; f *= 2.03; } return s / t; };
    return n;
  }

  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const mix = (a, b, t) => a + (b - a) * t;
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const mixc = (c1, c2, t) => [mix(c1[0], c2[0], t), mix(c1[1], c2[1], t), mix(c1[2], c2[2], t)];
  const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

  function canvas(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  // tekstur per-piksel: fn(x, y, out) mengisi out[0..3]
  function pixels(w, h, fn) {
    const c = canvas(w, h), x = c.getContext("2d"), img = x.createImageData(w, h), d = img.data, o = [0, 0, 0, 255];
    let i = 0;
    for (let y = 0; y < h; y++) for (let X = 0; X < w; X++) { o[3] = 255; fn(X, y, o); d[i++] = o[0]; d[i++] = o[1]; d[i++] = o[2]; d[i++] = o[3]; }
    x.putImageData(img, 0, 0); return c;
  }

  // ---------- langit senja + awan ----------
  function sky(ctx, w, h, o) {
    const g = ctx.createLinearGradient(0, 0, 0, o.horizon);
    g.addColorStop(0, rgba(o.top)); g.addColorStop(0.55, rgba(o.mid)); g.addColorStop(1, rgba(o.low));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const s = ctx.createRadialGradient(o.sunX, o.sunY, 0, o.sunX, o.sunY, o.sunR);
    s.addColorStop(0, "rgba(255,226,170,.95)"); s.addColorStop(0.12, "rgba(246,180,100,.55)"); s.addColorStop(0.45, "rgba(200,110,55,.18)"); s.addColorStop(1, "rgba(200,110,55,0)");
    ctx.fillStyle = s; ctx.fillRect(0, 0, w, h);
    const N = Noise(o.seed || 7), sc = 3;
    const cl = pixels(Math.ceil(w / sc), Math.ceil(o.horizon / sc), (x, y, out) => {
      const X = x * sc, Y = y * sc;
      const d = N.fbm(X / 520 + 3, Y / 150, 6) * 0.75 + N.fbm(X / 140, Y / 60, 4) * 0.25;
      const dens = sstep(o.cover || 0.47, (o.cover || 0.47) + 0.22, d) * (0.55 + 0.45 * (1 - Y / o.horizon));
      const dist = Math.hypot(X - o.sunX, (Y - o.sunY) * 1.6) / 900;
      const lit = clamp(1 - dist) ** 2 * (1 - sstep(0.5, 0.9, d));
      const base = mixc([34, 38, 46], [70, 66, 66], Y / o.horizon);
      const c = mixc(base, [235, 160, 90], lit * 0.9);
      out[0] = c[0]; out[1] = c[1]; out[2] = c[2]; out[3] = dens * 235;
    });
    ctx.imageSmoothingQuality = "high"; ctx.drawImage(cl, 0, 0, w, o.horizon + sc);
  }

  // ---------- asap cerobong ----------
  function smoke(ctx, x, y, len, seed, o = {}) {
    const r = rnd(seed), drift = o.drift || 1.0;
    for (let i = 0; i < 70; i++) {
      const t = i / 70, px = x + t * len * 0.9 * drift + Math.sin(t * 6 + seed) * 20 * t, py = y - t * len * 0.55 - t * t * 80;
      const rad = 14 + t * (o.spread || 150) + r() * 20;
      const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
      const a = (0.22 - t * 0.17) * (o.alpha || 1);
      g.addColorStop(0, `rgba(${o.c || "38,36,38"},${a})`); g.addColorStop(1, `rgba(${o.c || "38,36,38"},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, rad, 0, 7); ctx.fill();
    }
  }

  // ---------- figur manusia 1919 (sinematik, tanpa wajah detail) ----------
  // pose: stand | walk | run ; hat: cap | fedora | bowler | none(woman: shawl) ; facing back/front sama siluetnya
  function personPath(o) {
    const p = new Path2D(), s = o.stride || 0, lean = o.lean || 0, arm = o.arm || 0, wom = o.woman;
    const L = (x, y) => [x + lean * (-y), y];
    const pts = [
      [-0.045, -0.84], [-0.1, -0.835], [-0.138, -0.81],
      [-0.155 - arm * 0.05, -0.66], [-0.16 - arm * 0.12, -0.5 + arm * 0.06], [-0.125 - arm * 0.12, -0.48 + arm * 0.06], [-0.118, -0.62],
      [wom ? -0.19 : -0.15, wom ? -0.03 : -0.29], [-0.07 - s * 0.6, wom ? -0.03 : -0.28],
      [-0.075 - s, -0.02], [-0.11 - s, 0], [-0.02 - s, 0], [-0.02 - s * 0.3, -0.26], [0.02 + s * 0.3, -0.26],
      [0.02 + s, 0], [0.11 + s, 0], [0.075 + s, -0.02], [0.07 + s * 0.6, wom ? -0.03 : -0.28], [wom ? 0.19 : 0.15, wom ? -0.03 : -0.29],
      [0.118, -0.62], [0.125 + arm * 0.12, -0.48 - arm * 0.06], [0.16 + arm * 0.12, -0.5 - arm * 0.06], [0.155 + arm * 0.05, -0.66],
      [0.138, -0.81], [0.1, -0.835], [0.045, -0.84], [0.04, -0.86], [-0.04, -0.86],
    ].map(([x, y]) => L(x, y));
    p.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) p.lineTo(...pts[i]); p.closePath();
    const hx = L(0, -0.915);
    p.ellipse(hx[0], hx[1], 0.06, 0.074, 0, 0, 7);
    if (o.hat === "cap") { p.ellipse(hx[0] + 0.01, hx[1] - 0.05, 0.078, 0.032, 0, 0, 7); p.ellipse(hx[0] + 0.05 * (o.dir || 1), hx[1] - 0.035, 0.05, 0.014, 0, 0, 7); }
    if (o.hat === "fedora") { p.rect(hx[0] - 0.056, hx[1] - 0.12, 0.112, 0.08); p.ellipse(hx[0], hx[1] - 0.045, 0.105, 0.02, 0, 0, 7); }
    if (o.hat === "bowler") { p.ellipse(hx[0], hx[1] - 0.06, 0.06, 0.06, 0, Math.PI, 0); p.ellipse(hx[0], hx[1] - 0.05, 0.085, 0.016, 0, 0, 7); }
    if (wom) { p.ellipse(hx[0], hx[1] - 0.01, 0.075, 0.085, 0, 0, 7); }
    return p;
  }

  function person(ctx, x, y, h, o = {}) {
    const p = personPath(o);
    ctx.save(); ctx.translate(x, y); ctx.scale(h, h);
    if (o.shadow !== false) { ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(0.05, 0, 0.22, 0.025, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = o.rim || "rgba(240,170,95,.9)"; ctx.fill(p);
    ctx.clip(p);
    ctx.save(); ctx.translate((o.rimSide || -1) * -(o.rimW || 0.008), (o.rimTop || 0.004)); ctx.fillStyle = o.color || "#141110"; ctx.fill(p); ctx.restore();
    // volume kain: gradasi + lipatan
    const g = ctx.createLinearGradient(-0.2, -1, 0.2, 0); g.addColorStop(0, "rgba(255,255,255,.05)"); g.addColorStop(1, "rgba(0,0,0,.35)");
    ctx.fillStyle = g; ctx.fillRect(-0.4, -1.2, 0.8, 1.3);
    if (h > 160) {
      ctx.strokeStyle = "rgba(0,0,0,.45)"; ctx.lineWidth = 0.008;
      ctx.beginPath(); ctx.moveTo(-0.005, -0.82); ctx.lineTo(0.0, -0.3); ctx.moveTo(-0.118, -0.62); ctx.lineTo(-0.11, -0.45); ctx.moveTo(0.118, -0.62); ctx.lineTo(0.11, -0.45);
      ctx.moveTo(-0.13, -0.56); ctx.quadraticCurveTo(0, -0.54, 0.13, -0.56); ctx.stroke();
      ctx.strokeStyle = "rgba(255,200,140,.10)"; ctx.beginPath(); ctx.moveTo(-0.06, -0.83); ctx.lineTo(-0.03, -0.72); ctx.lineTo(0, -0.82); ctx.stroke();
    }
    ctx.restore();
  }

  // ---------- molase mengilap ----------
  function molassesFill(ctx, path, box, seed, o = {}) {
    ctx.save(); ctx.clip(path);
    const g = ctx.createLinearGradient(0, box.y, 0, box.y + box.h);
    g.addColorStop(0, o.top || "#7a3a0e"); g.addColorStop(0.12, "#3a1606"); g.addColorStop(0.55, "#1c0903"); g.addColorStop(1, "#090301");
    ctx.fillStyle = g; ctx.fillRect(box.x, box.y, box.w, box.h);
    const r = rnd(seed);
    // aliran: goresan highlight mengikuti arus
    ctx.lineCap = "round";
    for (let i = 0; i < (o.streams || 140); i++) {
      const y0 = box.y + r() * box.h, x0 = box.x + r() * box.w, len = 60 + r() * 260, amp = 6 + r() * 18;
      ctx.strokeStyle = `rgba(${200 + r() * 55 | 0},${110 + r() * 60 | 0},${40 + r() * 30 | 0},${0.05 + r() * 0.16 * (1 - (y0 - box.y) / box.h)})`;
      ctx.lineWidth = 1 + r() * 4;
      ctx.beginPath(); ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(x0 + len * 0.3 * (o.dir || 1), y0 + amp, x0 + len * 0.6 * (o.dir || 1), y0 - amp, x0 + len * (o.dir || 1), y0 + amp * 0.3); ctx.stroke();
    }
    // specular kecil
    for (let i = 0; i < (o.specs || 70); i++) {
      const x = box.x + r() * box.w, y = box.y + r() * box.h * 0.7, rr = 2 + r() * 9;
      const sg = ctx.createRadialGradient(x, y, 0, x, y, rr * 2.5);
      sg.addColorStop(0, "rgba(255,225,170,.75)"); sg.addColorStop(0.3, "rgba(240,160,80,.25)"); sg.addColorStop(1, "rgba(240,160,80,0)");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.ellipse(x, y, rr * 2.5, rr * 1.2, 0, 0, 7); ctx.fill();
    }
    ctx.restore();
  }

  function droplets(ctx, n, area, seed, o = {}) {
    const r = rnd(seed);
    for (let i = 0; i < n; i++) {
      const x = area.x + r() * area.w, y = area.y + r() * area.h, rr = (o.min || 2) + r() * (o.max || 14), ang = (o.ang || 0) + (r() - 0.5) * 0.6;
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      ctx.fillStyle = "#1e0a03"; ctx.beginPath(); ctx.ellipse(0, 0, rr * (2.2 + r() * 2), rr * 0.8, 0, 0, 7); ctx.fill();
      ctx.fillStyle = "rgba(245,175,95,.55)"; ctx.beginPath(); ctx.ellipse(-rr * 0.3, -rr * 0.35, rr * 0.45, rr * 0.22, 0, 0, 7); ctx.fill();
      ctx.restore();
    }
  }

  // ---------- jalan kota 1919 dengan perspektif satu titik ----------
  // C: {vx, vy, camH, f, half, far, seed, light:[x,y]}
  function street(ctx, C) {
    const P = (X, h, z) => [C.vx + (X * C.f) / (z * 1000), C.vy + ((C.camH - h) * C.f) / (z * 1000)];
    const N = Noise(C.seed), r = rnd(C.seed + 1);

    // permukaan jalan: batu bata/cobble basah per piksel
    const top = Math.ceil(C.vy + 2);
    const ground = pixels(W, H - top, (x, yy, out) => {
      const y = yy + top, z = (C.camH * C.f) / ((y - C.vy) * 1000), X = ((x - C.vx) * z * 1000) / C.f, Z = z * 1000;
      const ax = Math.abs(X);
      let c;
      if (ax < C.half - 180) {
        const cu = X / 22, cv = Z / 13 + (Math.floor(X / 22) % 2) * 0.5;
        const fu = cu - Math.floor(cu), fv = cv - Math.floor(cv);
        const edge = Math.min(fu, 1 - fu, fv * 1.6, (1 - fv) * 1.6);
        const stone = 0.55 + 0.45 * N(Math.floor(cu) * 1.7, Math.floor(cv) * 1.3);
        const mortar = sstep(0.0, 0.12 + z * 0.05, edge);
        c = mixc([18, 16, 15], mixc([52, 48, 46], [74, 66, 60], stone), mortar);
        if (C.molasses && Z > C.molasses) c = [26, 10, 4];
      } else {
        const fu = (Z / 120) % 1;
        c = mixc([60, 58, 56], [44, 42, 41], sstep(0, 0.04, Math.min(fu, 1 - fu)));
        if (ax > C.half - 180 && ax < C.half - 160) c = [30, 28, 27];
        const snow = sstep(0.62, 0.7, N.fbm(X / 90, Z / 140, 4)) * (C.snow || 0);
        c = mixc(c, [170, 172, 178], snow);
      }
      // genangan & pantulan cahaya senja
      const wet = sstep(0.5, 0.62, N.fbm(X / 260 + 9, Z / 420, 4));
      const refl = Math.exp(-((x - C.light[0]) ** 2) / (2 * (90 + 220 * (1 - wet)) ** 2)) * (0.25 + 0.75 * wet);
      c = mixc(c, [80, 82, 92], wet * 0.45);
      c = mixc(c, [255, 185, 110], clamp(refl * 0.85));
      const fog = clamp(1 - Math.exp(-z * 0.085));
      c = mixc(c, C.haze, fog);
      out[0] = c[0]; out[1] = c[1]; out[2] = c[2];
    });
    ctx.drawImage(ground, 0, top);

    // daftar objek dari jauh ke dekat
    const items = [];
    // gedung kiri & kanan
    for (const side of [-1, 1]) {
      let z = C.near || 0.35;
      while (z < C.far) {
        const len = 0.9 + r() * 1.3, z1 = Math.min(C.far, z + len), hgt = 1500 + r() * 1300, hue = r();
        const zz0 = z, sd = side; items.push({ z: z1, draw: () => facade(ctx, P, sd, zz0, z1, hgt, hue, C, N, r) });
        z = z1;
      }
    }
    (C.extra || []).forEach((e) => items.push(e));
    items.sort((a, b) => b.z - a.z).forEach((it) => it.draw(P));
    return P;
  }

  function quad(ctx, a, b, c, d) { ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(...c); ctx.lineTo(...d); ctx.closePath(); }

  function facade(ctx, P, side, z0, z1, hgt, hue, C, N, r) {
    const X = side * C.half;
    const brick = mixc([86, 44, 32], [64, 52, 46], hue);
    const fog0 = clamp(1 - Math.exp(-z0 * 0.085)), fog1 = clamp(1 - Math.exp(-z1 * 0.085));
    const a = P(X, 0, z0), b = P(X, hgt, z0), c = P(X, hgt, z1), d = P(X, 0, z1);
    const g = ctx.createLinearGradient(a[0], 0, d[0], 0);
    g.addColorStop(0, rgba(mixc(mixc(brick, [10, 8, 8], 0.45), C.haze, fog0)));
    g.addColorStop(1, rgba(mixc(brick, C.haze, fog1 * 0.9)));
    ctx.fillStyle = g; quad(ctx, a, b, c, d); ctx.fill();
    // tepi gedung (kedalaman dinding samping menuju jalan)
    const e = P(X - side * 40, hgt, z0), f = P(X - side * 40, 0, z0);
    ctx.fillStyle = rgba(mixc([14, 11, 10], C.haze, fog0)); quad(ctx, a, b, e, f); ctx.fill();
    // garis bata (mortar) konvergen
    ctx.save(); quad(ctx, a, b, c, d); ctx.clip();
    ctx.strokeStyle = `rgba(0,0,0,${0.22 * (1 - fog0)})`; ctx.lineWidth = 1;
    for (let h = 8; h < hgt; h += 8) { const p0 = P(X, h, z0), p1 = P(X, h, z1); ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
    // noda cuaca vertikal
    for (let i = 0; i < 18; i++) { const zz = z0 + r() * (z1 - z0), t0 = P(X, hgt, zz), t1 = P(X, hgt * (0.3 + r() * 0.6), zz); ctx.strokeStyle = `rgba(0,0,0,${0.08 + r() * 0.1})`; ctx.lineWidth = 2 + r() * 10 / zz; ctx.beginPath(); ctx.moveTo(...t0); ctx.lineTo(...t1); ctx.stroke(); }
    ctx.restore();
    // jendela per lantai
    const floors = []; for (let h = 470; h < hgt - 200; h += 330) floors.push(h);
    for (let zz = z0 + 0.08; zz < z1 - 0.14; zz += 0.26) {
      for (const h of floors) {
        const w0 = zz, w1 = zz + 0.12, h0 = h, h1 = h + 190;
        const q = [P(X, h0, w0), P(X, h1, w0), P(X, h1, w1), P(X, h0, w1)];
        const lit = r() < (C.litRate || 0.32);
        const fog = clamp(1 - Math.exp(-zz * 0.085));
        ctx.fillStyle = lit ? rgba(mixc([235, 160, 80], C.haze, fog * 0.6)) : rgba(mixc([22, 24, 28], C.haze, fog));
        quad(ctx, ...q); ctx.fill();
        if (lit && zz < 6) { const cx = (q[0][0] + q[2][0]) / 2, cy = (q[0][1] + q[2][1]) / 2, rr = 120 / zz; const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr); gg.addColorStop(0, "rgba(240,160,80,.22)"); gg.addColorStop(1, "rgba(240,160,80,0)"); ctx.fillStyle = gg; ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2); }
        // kusen + ambang batu
        ctx.strokeStyle = rgba(mixc([20, 16, 14], C.haze, fog)); ctx.lineWidth = Math.max(1, 14 / zz / 4); quad(ctx, ...q); ctx.stroke();
        const s0 = P(X, h1 + 10, w0 - 0.02), s1 = P(X, h1 + 40, w0 - 0.02), s2 = P(X, h1 + 40, w1 + 0.02), s3 = P(X, h1 + 10, w1 + 0.02);
        ctx.fillStyle = rgba(mixc([120, 108, 96], C.haze, fog)); quad(ctx, s0, s1, s2, s3); ctx.fill();
        // tirai jendela dua bagian
        const m0 = P(X, (h0 + h1) / 2, w0), m1 = P(X, (h0 + h1) / 2, w1); ctx.beginPath(); ctx.moveTo(...m0); ctx.lineTo(...m1); ctx.stroke();
      }
      // etalase toko + awning di lantai dasar
      if (r() < 0.75) {
        const w0 = zz, w1 = zz + 0.2;
        const q = [P(X, 40, w0), P(X, 330, w0), P(X, 330, w1), P(X, 40, w1)];
        const fog = clamp(1 - Math.exp(-zz * 0.085));
        ctx.fillStyle = rgba(mixc(r() < 0.5 ? [150, 100, 55] : [28, 30, 34], C.haze, fog * 0.8)); quad(ctx, ...q); ctx.fill();
        const aw = [r() < 0.5 ? [60, 70, 58] : [96, 46, 38]][0];
        const A = [P(X, 380, w0), P(X - side * 150, 300, w0), P(X - side * 150, 300, w1), P(X, 380, w1)];
        ctx.fillStyle = rgba(mixc(aw, C.haze, fog)); quad(ctx, ...A); ctx.fill();
        ctx.strokeStyle = `rgba(230,200,160,${0.25 * (1 - fog)})`; ctx.lineWidth = 1;
        for (let k = 1; k < 6; k++) { const t = w0 + (w1 - w0) * k / 6; ctx.beginPath(); ctx.moveTo(...P(X, 380, t)); ctx.lineTo(...P(X - side * 150, 300, t)); ctx.stroke(); }
      }
    }
    // cornice + salju di atap
    const k0 = P(X, hgt, z0), k1 = P(X - side * 60, hgt + 50, z0), k2 = P(X - side * 60, hgt + 50, z1), k3 = P(X, hgt, z1);
    ctx.fillStyle = rgba(mixc([30, 26, 24], C.haze, fog0)); quad(ctx, k0, k1, k2, k3); ctx.fill();
    if (C.snow) { const s0 = P(X - side * 60, hgt + 50, z0), s1 = P(X - side * 60, hgt + 66, z0), s2 = P(X - side * 60, hgt + 66, z1), s3 = P(X - side * 60, hgt + 50, z1); ctx.fillStyle = rgba(mixc([200, 202, 208], C.haze, fog0 * 0.5), 0.85); quad(ctx, s0, s1, s2, s3); ctx.fill(); }
    // cerobong + asap
    if (r() < 0.6 && C.smoke) { const zc = z0 + (z1 - z0) * 0.5, ch0 = P(X + side * 200, hgt, zc), ch1 = P(X + side * 200, hgt + 380, zc), wd = 70 / zc; ctx.fillStyle = rgba(mixc([40, 26, 22], C.haze, fog0)); ctx.fillRect(ch0[0] - wd / 2, ch1[1], wd, ch0[1] - ch1[1]); smoke(ctx, ch1[0], ch1[1], 380 / zc + 120, Math.floor(r() * 999), { spread: 160 / Math.sqrt(zc), alpha: 0.9 }); }
  }

  // ---------- tiang lampu gas ----------
  function lamp(ctx, P, X, z) {
    const b = P(X, 0, z), t = P(X, 400, z), w = Math.max(1.5, 10 / z);
    ctx.fillStyle = "#0d0c0b"; ctx.fillRect(b[0] - w / 2, t[1], w, b[1] - t[1]);
    const hd = 40 / z; ctx.fillRect(t[0] - hd / 2, t[1] - hd * 1.2, hd, hd * 1.2);
    const g = ctx.createRadialGradient(t[0], t[1] - hd * 0.6, 0, t[0], t[1] - hd * 0.6, 320 / z);
    g.addColorStop(0, "rgba(255,214,150,.95)"); g.addColorStop(0.08, "rgba(255,180,100,.5)"); g.addColorStop(1, "rgba(255,160,80,0)");
    ctx.fillStyle = g; ctx.fillRect(t[0] - 320 / z, t[1] - 320 / z, 640 / z, 640 / z);
  }

  // ---------- rel kereta layang (rekonstruksi generik) ----------
  function elevated(ctx, P, z, o = {}) {
    const span = o.span || [-2200, 2200], h0 = o.h0 || 480, h1 = h0 + 90, col = "#121417";
    ctx.save();
    if (o.tilt) { const c = P(0, h0, z); ctx.translate(c[0], c[1]); ctx.rotate(o.tilt); ctx.translate(-c[0], -c[1]); }
    for (let X = span[0]; X <= span[1]; X += 900) {
      const b = P(X, 0, z), t = P(X, h0, z), w = 34 / z;
      ctx.fillStyle = col; ctx.fillRect(b[0] - w / 2, t[1], w, b[1] - t[1]);
      ctx.fillRect(b[0] - w * 1.6, t[1], w * 3.2, 14 / z);
    }
    const l = P(span[0], h1, z), rr = P(span[1], h0, z);
    ctx.fillStyle = col; ctx.fillRect(l[0], l[1], rr[0] - l[0], rr[1] - l[1]);
    // rangka X
    ctx.strokeStyle = "#1b1f23"; ctx.lineWidth = Math.max(1, 6 / z);
    for (let X = span[0]; X < span[1]; X += 150) { const a = P(X, h0, z), b = P(X + 150, h1, z), c = P(X, h1, z), d = P(X + 150, h0, z); ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.moveTo(...c); ctx.lineTo(...d); ctx.stroke(); }
    // kilau tepi atas
    ctx.fillStyle = "rgba(240,170,95,.35)"; ctx.fillRect(l[0], l[1], rr[0] - l[0], Math.max(1, 3 / z));
    ctx.restore();
  }

  function trainCar(ctx, P, X0, len, z, h0, o = {}) {
    const a = P(X0, h0 + 90, z), b = P(X0 + len, h0 + 90 + 330, z);
    const x = a[0], y = b[1], w = b[0] - a[0], h = a[1] - b[1];
    ctx.save();
    if (o.rot) { ctx.translate(x + w / 2, y + h); ctx.rotate(o.rot); ctx.translate(-(x + w / 2), -(y + h)); }
    ctx.translate(o.dx || 0, o.dy || 0);
    const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, "#3a2a1c"); g.addColorStop(0.5, "#5a3a20"); g.addColorStop(1, "#1a120c");
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.12); ctx.fill();
    ctx.fillStyle = "#16100b"; ctx.fillRect(x - w * 0.01, y - h * 0.06, w * 1.02, h * 0.1);
    const n = Math.max(4, Math.round(w / (h * 0.55)));
    for (let i = 0; i < n; i++) { const wx = x + w * 0.05 + (i * w * 0.9) / n, ww = (w * 0.9) / n * 0.7; ctx.fillStyle = o.lit === false ? "#20242a" : "rgba(245,190,110,.85)"; ctx.fillRect(wx, y + h * 0.22, ww, h * 0.32); }
    ctx.fillStyle = "rgba(255,200,130,.25)"; ctx.fillRect(x, y + h * 0.04, w, h * 0.04);
    ctx.restore();
  }

  // ---------- mobil 1910-an ----------
  function car(ctx, x, y, s, flip) {
    ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
    ctx.fillStyle = "#0e0d0c";
    ctx.beginPath(); ctx.moveTo(-1, -0.35); ctx.lineTo(-0.95, -0.62); ctx.lineTo(-0.3, -0.64); ctx.lineTo(-0.25, -1.05); ctx.lineTo(0.55, -1.05); ctx.lineTo(0.6, -0.62); ctx.lineTo(1, -0.58); ctx.lineTo(1.02, -0.35); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(240,170,95,.45)"; ctx.fillRect(-0.25, -1.06, 0.8, 0.025);
    ctx.fillStyle = "rgba(160,170,180,.25)"; ctx.fillRect(-0.18, -0.98, 0.3, 0.3); ctx.fillRect(0.18, -0.98, 0.3, 0.3);
    for (const wx of [-0.62, 0.66]) { ctx.fillStyle = "#070707"; ctx.beginPath(); ctx.arc(wx, -0.24, 0.24, 0, 7); ctx.fill(); ctx.strokeStyle = "rgba(200,190,170,.35)"; ctx.lineWidth = 0.02; for (let k = 0; k < 10; k++) { const a = (k * Math.PI) / 5; ctx.beginPath(); ctx.moveTo(wx, -0.24); ctx.lineTo(wx + Math.cos(a) * 0.2, -0.24 + Math.sin(a) * 0.2); ctx.stroke(); } }
    const g = ctx.createRadialGradient(0.98, -0.5, 0, 0.98, -0.5, 0.5); g.addColorStop(0, "rgba(255,220,160,.8)"); g.addColorStop(1, "rgba(255,200,130,0)"); ctx.fillStyle = g; ctx.fillRect(0.5, -1, 1, 1);
    ctx.restore();
  }

  // ---------- tangki baja silinder (texture-mapped per piksel) ----------
  // o: {cx (screen center x), Z0 (cm), R (cm), Ht (cm), camH, f, vy, seed, light:{az}, stains}
  function tank(ctx, o) {
    const N = Noise(o.seed), N2 = Noise(o.seed + 5);
    const proj = (th, h) => { const X = o.R * Math.sin(th), Z = o.Z0 - o.R * Math.cos(th); return [o.cx + (X * o.f) / Z, o.vy + ((o.camH - h) * o.f) / Z, Z]; };
    // tabel kolom layar -> theta
    const thL = -Math.PI / 2 + 0.04, thR = Math.PI / 2 - 0.04;
    let minX = 1e9, maxX = -1e9; const tab = [];
    for (let i = 0; i <= 2000; i++) { const th = thL + (thR - thL) * (i / 2000), p = proj(th, 0); tab.push([p[0], th]); minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); }
    const x0 = Math.max(0, Math.floor(minX)), x1 = Math.min(W - 1, Math.ceil(maxX));
    const thAt = (x) => { let lo = 0, hi = tab.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (tab[m][0] < x) lo = m; else hi = m; } const t = (x - tab[lo][0]) / (tab[hi][0] - tab[lo][0] || 1); return mix(tab[lo][1], tab[hi][1], t); };
    const yTop = Math.max(0, Math.floor(proj(0, o.Ht)[1] - 2)), yBot = Math.min(H - 1, Math.ceil(proj(0, 0)[1] + 2));
    const lx = Math.sin(o.light.az), lz = -Math.cos(o.light.az);
    const tex = pixels(x1 - x0 + 1, yBot - yTop + 1, (xx, yy, out) => {
      const x = xx + x0, y = yy + yTop, th = thAt(x), Z = o.Z0 - o.R * Math.cos(th), h = o.camH - ((y - o.vy) * Z) / o.f;
      if (h < 0 || h > o.Ht) { out[3] = 0; return; }
      const u = th * o.R; // cm sepanjang keliling
      // pelat: courses tiap 210 cm, sambungan vertikal tiap 360 cm berselang
      const course = Math.floor(h / 210), hv = h - course * 210, uu = u + (course % 2) * 180, vs = uu - Math.floor(uu / 360) * 360;
      const seamH = Math.min(hv, 210 - hv), seamV = Math.min(vs, 360 - vs);
      // material: baja gelap + karat
      const rust = sstep(0.48, 0.72, N.fbm(u / 160, h / 120, 6)), pit = N2(u / 3, h / 3);
      let c = mixc([46, 50, 54], [70, 72, 74], N.fbm(u / 40 + 50, h / 40, 3));
      c = mixc(c, mixc([92, 46, 24], [140, 72, 32], pit), rust * 0.85);
      // noda molase mengalir dari sambungan
      const st = sstep(0.62, 0.8, N2.fbm(u / 22, h / 380 + course, 4)) * sstep(0, 160, 210 - hv) * (o.stains || 1);
      c = mixc(c, [40, 18, 6], st * 0.85);
      // pencahayaan silinder
      const nx = Math.sin(th), nz = -Math.cos(th), diff = clamp(nx * lx + nz * lz), rim = sstep(0.75, 1, Math.abs(nx)) * (nx * lx > 0 ? 1 : 0.15);
      let L = 0.18 + 0.95 * diff;
      // sambungan: bayangan lip pelat + baris paku keling
      if (seamH < 7) L *= 0.45 + seamH * 0.06;
      if (seamV < 5) L *= 0.55;
      const rv = (hv > 8 && hv < 20) || (hv > 190 && hv < 202) ? 1 : 0;
      if (rv) { const ru = (u % 9 + 9) % 9; if (ru < 4.5) L *= 1.45; }
      const sp = Math.pow(clamp(diff), 18) * 0.5 * (1 - rust);
      c = [c[0] * L + 255 * sp + 240 * rim * 0.35, c[1] * L + 200 * sp + 160 * rim * 0.35, c[2] * L + 150 * sp + 100 * rim * 0.35];
      c = mixc(c, o.haze, clamp(1 - Math.exp(-Z / 9000)) * 0.6);
      out[0] = c[0]; out[1] = c[1]; out[2] = c[2]; out[3] = 255;
    });
    ctx.drawImage(tex, x0, yTop);
    // atap kerucut
    ctx.beginPath(); const apex = [o.cx, proj(0, o.Ht + o.R * 0.18)[1] - 6];
    for (let i = 0; i <= 60; i++) { const th = thL + (thR - thL) * (i / 60), p = proj(th, o.Ht); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.lineTo(...apex); ctx.closePath();
    const rg = ctx.createLinearGradient(minX, 0, maxX, 0); rg.addColorStop(0, "#2a2d30"); rg.addColorStop(0.35, "#4c4c4a"); rg.addColorStop(1, "#141516");
    ctx.fillStyle = rg; ctx.fill();
    // pagar catwalk di tepi atas
    ctx.strokeStyle = "rgba(15,15,16,.95)"; ctx.lineWidth = 2;
    ctx.beginPath(); for (let i = 0; i <= 60; i++) { const th = thL + (thR - thL) * (i / 60), p = proj(th, o.Ht + 110); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
    for (let i = 0; i <= 40; i++) { const th = thL + (thR - thL) * (i / 40), p = proj(th, o.Ht), q = proj(th, o.Ht + 110); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
    // tangga
    if (o.ladder) { const th = o.ladder, p0 = proj(th, 0), p1 = proj(th, o.Ht + 110), sp = 18; ctx.strokeStyle = "rgba(12,12,13,.95)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p0[0] - sp, p0[1]); ctx.lineTo(p1[0] - sp * 0.8, p1[1]); ctx.moveTo(p0[0] + sp, p0[1]); ctx.lineTo(p1[0] + sp * 0.8, p1[1]); ctx.stroke(); ctx.lineWidth = 2; for (let k = 0; k < 60; k++) { const t = k / 60; ctx.beginPath(); ctx.moveTo(mix(p0[0] - sp, p1[0] - sp * 0.8, t), mix(p0[1], p1[1], t)); ctx.lineTo(mix(p0[0] + sp, p1[0] + sp * 0.8, t), mix(p0[1], p1[1], t)); ctx.stroke(); } }
    return { proj, minX, maxX };
  }

  window.PAINT = { W, H, rnd, Noise, clamp, mix, sstep, mixc, rgba, canvas, pixels, sky, smoke, person, molassesFill, droplets, street, lamp, elevated, trainCar, car, tank, quad };
})();
