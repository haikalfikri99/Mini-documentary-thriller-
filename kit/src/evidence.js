// EVIDENCE LAYER — the ARSIP motif as 3D props: documents with typed lines, redaction bars that wipe in, a stamp that slams, and a corkboard
// with photos and red string. All animated from t (their textures repaint only when the state changes).
//   const doc = paper(world, { parent: office.group, at: [x, y, z], title: 'LAPORAN INTERNAL', lines: [...], redact: [{ line: 2, t0: 11.4, dur: .5 }], stamp: { text: 'DITUTUP', t0: 12.2 } });
import { THREE, canvas, paint, rr, tex } from './diorama-kit.js';
const E = x => (x = Math.max(0, Math.min(1, x)), 1 - Math.pow(1 - x, 3));
export function paper(world, { parent = world.scene, at = [0, 0, 0], rot = [-Math.PI / 2, 0, 0], scale = 3, w = 21, h = 29.7, title = '', lines = [], redact = [], stamp = null, res = 512, ink = '#2a2723', paperCol = ['#efe9d8', '#e2dac5'] } = {}) {
  const PW = res, PH = Math.round(res * h / w), c = canvas(PW, PH), g = c.getContext('2d'), t0 = tex(c);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w * scale, h * scale), new THREE.MeshBasicMaterial({ map: t0, toneMapped: false })); mesh.rotation.set(...rot); mesh.position.set(...at); parent.add(mesh);
  let sig = '';
  const draw = t => {
    const R = redact.map(r => E((t - r.t0) / (r.dur ?? .5))), S = stamp ? (t - stamp.t0) : -1, key = R.map(x => x.toFixed(3)).join() + '|' + (S < 0 ? 0 : Math.min(1, S / .5).toFixed(3)); if (key === sig) return; sig = key;
    g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, PW, PH); gr.addColorStop(0, paperCol[0]); gr.addColorStop(1, paperCol[1]); g.fillStyle = gr; g.fillRect(0, 0, PW, PH);
    g.fillStyle = ink; g.textBaseline = 'alphabetic'; g.font = `700 ${PW * .06}px "Courier Prime", monospace`; g.fillText(title, PW * .08, PH * .09); rr(g, PW * .08, PH * .105, PW * .84, 3, 1, ink);
    g.font = `400 ${PW * .044}px "Courier Prime", monospace`; const lh = PW * .075;
    lines.forEach((s, i) => { const y = PH * .16 + i * lh; g.fillStyle = ink; g.fillText(s, PW * .08, y); });
    redact.forEach((r, k) => { const y = PH * .16 + r.line * lh, p = R[k]; if (p > 0) { const x0 = PW * .08 + (r.from ?? 0) * PW * .84, ww = (r.w ?? 1) * PW * .84 * p; rr(g, x0, y - lh * .62, ww, lh * .82, 2, '#0e0d10'); } });
    if (stamp && S >= 0) { const k = Math.min(1, S / .18), sc = 1.7 - .7 * E(k), a = Math.min(1, S / .09); g.save(); g.globalAlpha = a * .92; g.translate(PW * .5, PH * .62); g.rotate(-.2); g.scale(sc, sc); g.strokeStyle = stamp.col || '#c0392b'; g.fillStyle = g.strokeStyle; g.lineWidth = PW * .014; const tw = PW * .62, th = PW * .2; g.strokeRect(-tw / 2, -th / 2, tw, th); g.font = `700 ${PW * .105}px Oswald, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(stamp.text, 0, 2); g.restore(); }
    t0.needsUpdate = true;
  };
  world.ticks.push(t => draw(t)); draw(0);
  return mesh;
}
// corkboard: items [{ x, y (0..1), label, col, t0 }], strings [[i, j, t0, dur]]. Returns the mesh (a plane facing +z; rotate/position it on a wall).
export function board(world, { parent = world.scene, at = [0, 0, 0], rot = [0, 0, 0], w = 200, h = 130, items = [], strings = [], res = 1024 } = {}) {
  const PW = res, PH = Math.round(res * h / w), c = canvas(PW, PH), g = c.getContext('2d'), tx = tex(c);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, toneMapped: false })); mesh.rotation.set(...rot); mesh.position.set(...at); parent.add(mesh);
  const cork = paint(PW, PH, (k) => { const gr = k.createLinearGradient(0, 0, PW, PH); gr.addColorStop(0, '#a07c56'); gr.addColorStop(1, '#8a6846'); k.fillStyle = gr; k.fillRect(0, 0, PW, PH); for (let i = 0; i < 1400; i++) { const r = Math.sin(i * 12.99) * 43758.5, q = Math.sin(i * 7.77) * 9e3; k.fillStyle = i % 2 ? 'rgba(60,40,20,.18)' : 'rgba(255,230,190,.10)'; k.fillRect((r - Math.floor(r)) * PW, (q - Math.floor(q)) * PH, 3, 3); } rr(k, 0, 0, PW, 14, 0, '#5a4430'); rr(k, 0, PH - 14, PW, 14, 0, '#5a4430'); });
  const pos = it => [it.x * PW, it.y * PH]; let sig = '';
  const draw = t => {
    const key = items.map(i => t >= i.t0 ? 1 : 0).join('') + strings.map(s => E((t - s[2]) / (s[3] ?? .5)).toFixed(2)).join(); if (key === sig) return; sig = key;
    g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(cork, 0, 0);
    items.forEach(it => { if (t < it.t0) return; const [x, y] = pos(it), cw = PW * .15, ch = cw * 1.2, p = E((t - it.t0) / .25); g.save(); g.translate(x, y); g.rotate((it.rot ?? 0) + (1 - p) * .12); g.scale(p, p); g.shadowColor = 'rgba(0,0,0,.4)'; g.shadowBlur = 14; rr(g, -cw / 2, -ch / 2, cw, ch, 4, '#f3efe4'); g.shadowBlur = 0; rr(g, -cw / 2 + 10, -ch / 2 + 10, cw - 20, ch * .68, 3, it.col || '#7fa8c9'); g.fillStyle = 'rgba(30,28,40,.55)'; g.beginPath(); g.arc(0, -ch * .12, cw * .14, 0, 7); g.fill(); g.beginPath(); g.ellipse(0, ch * .1, cw * .26, cw * .17, 0, Math.PI, 0); g.fill(); g.fillStyle = '#2a2723'; g.font = `700 ${cw * .13}px "Courier Prime", monospace`; g.textAlign = 'center'; g.fillText(it.label || '', 0, ch * .44); g.fillStyle = '#c0392b'; g.beginPath(); g.arc(0, -ch / 2 + 6, 7, 0, 7); g.fill(); g.restore(); });
    strings.forEach(([i, j, s0, d]) => { const p = E((t - s0) / (d ?? .5)); if (p <= 0 || t < items[i].t0 || t < items[j].t0) return; const [ax, ay] = pos(items[i]), [bx, by] = pos(items[j]); g.strokeStyle = '#b3261e'; g.lineWidth = 4; g.beginPath(); g.moveTo(ax, ay - PW * .08); g.lineTo(ax + (bx - ax) * p, ay - PW * .08 + (by - ay) * p); g.stroke(); });
    tx.needsUpdate = true;
  };
  world.ticks.push(t => draw(t)); draw(0);
  return mesh;
}
