// ARSIP #016 Satu Baris Kosong di Kartu Keluarga Ini Jadi Rebutan · ARSIP Kolase. 17 shots on the VO line starts (vo_words.json);
// shot 11 starts in the 0.6 s reveal pause (23.30) so the address scan is already running before "Aturannya". Caption band
// y 1210–1536 stays clear: every text piece lives in y 150–1180 on screen.
// Hero = a generic, fictional Kartu Keluarga (code): alamat line highlighted, row 5 EMPTY (Conceptual Loop detail, frame 0, not
// pointed at). "Anak" is on screen from frame 0 (user, 18 Nov 2026): the schoolboy from behind + the school desk with a child's
// backpack + slip KURSI SEKOLAH ANAK on "kursi sekolah". Evidence: Ombudsman DIY 2023 (11 anak, 2 KK of 10, 6 + 5 rows) shown as a
// finding (TEMUAN), 2026: 3 reports TERBUKTI. Layouts rotate (2-visual §M): standar, grafik/peta layar lebar, close-up makro,
// kartu dokumen penuh, split-screen. Loop: row 5 is filled ("Raka · CUCU") at 31.4 and the film ends pushing into row 5 of two
// identical KK side by side.
import { W, H, SP, PAL, setCtx, getCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake, hash } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 3.44, 5.28, 7.54, 8.76, 12.04, 13.04, 16.36, 17.42, 20.88, 23.3, 25.84, 27.82, 31.42, 33.84, 35.6, 37.16, 39.39];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_green', 230, 300, -8], ['f_amber', 900, 1080, 0], ['f_cream', 540, 1570, -3]],
  map: [['f_green_s', 990, 190, 0], ['f_cream', 540, 1570, -2]],
  move: [['f_red', 540, 300, -5], ['f_amber_s', 150, 1060, 0], ['f_cream', 540, 1565, 2]],
  macro: [['f_cream', 540, 1570, -2]],
  hunt: [['f_red', 540, 1040, -8], ['f_manila', 760, 420, 4], ['f_cream', 540, 1565, 2]],
  jogja: [['f_green', 640, 420, 4], ['f_amber_s', 150, 1060, 0], ['f_cream', 540, 1565, -2]],
  docs: [['f_news', 540, 760, -1], ['f_cream', 540, 1570, 2]],
  system: [['f_green', 540, 470, -3], ['f_manila', 420, 1150, 2], ['f_cream', 540, 1565, -2]],
};
const D2R = Math.PI / 180;
// world point of a baked offset (manifest key) on a piece placed at (x, y), scale s, rotation r (deg)
const pt = (n, key, x, y, s = 1, r = 0) => { const o = SP[n].m[key], c = Math.cos(r * D2R), sn = Math.sin(r * D2R); return [x + (o[0] * c - o[1] * sn) * s, y + (o[0] * sn + o[1] * c) * s]; };
const ring = (c, rx, ry = rx, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + i / n * 2 * Math.PI; return [c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a)]; });
// hands tugging the sheet: a small on-twos back-and-forth after the slide-in
const tug = (n, x, y, s, u, id) => { if (u < 0.2) return putK(n, slide(0, 0.2, x, y, 0, 0, 900, 0, 0.5), u, id, { s }); const p = stepT(u); put(n, x + 7 * Math.sin(p * 22), y + 3 * Math.sin(p * 17 + 1), 0.6 * Math.sin(p * 22), 0, 1, s); };
// a translucent band drawn in world space (scanner light, dimming of unread rows)
const band = (x0, y0, x1, y1, col, a) => { const g = getCtx(); g.save(); g.globalAlpha = a; g.fillStyle = col; g.fillRect(x0, y0, x1 - x0, y1 - y0); g.restore(); };
// the KK with row 5 filled (two ink entries scaled with it)
function kkFilled(x, y, s, r = 0, a = 1) {   // (unused since the legibility pass: S17 uses kk_frag)
  put('kk', x, y, r, 0, 1, s, a);
  const [nx, ny] = pt('kk', 'row5', x, y, s, r), [cx, cy] = pt('kk', 'row5_rel', x, y, s, r);
  put('nm_baru', nx + 40 * s, ny, r, 0, 1, s * 1.05, a); put('nm_cucu', cx + 34 * s, cy, r, 0, 1, s * 1.1, a);
}
// the distance map at (MX, MY, MS) with its ring around the school (drawn in over [t0, t1])
const MX = 540, MY = 720, MS = 1.12;
const school = () => pt('peta', 'school', MX, MY, MS), nearH = () => pt('peta', 'near', MX, MY, MS), farH = () => pt('peta', 'far', MX, MY, MS);
const schoolRing = (u, t0, t1) => route(u, t0, t1, ring(school(), 215, 200), { seed: 31, col: PAL.green, w: 6 });

const SHOTS = [
  // 01 · Baris kosong di Kartu Keluarga ini bisa nentuin kursi sekolah.   KK on the table at 0.00 (alamat highlighted, row 5 empty);
  //      DOMISILI at 0.12; SATU BARIS KOSONG at 0.25; the schoolboy (from behind) at the gate from 0.00; school desk with a child's
  //      backpack at 0.22; KURSI SEKOLAH ANAK on "kursi"
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.03, cy: 960, shake: [[0.12, 10]] }); bg(SET.hook);
    putK('kk', [[0, 540, 525, -2, 1.2, 1, null, 0, 1.0], [0.1, 540, 535, -2, 0, 1, 'in', 1.0, 0.96]], u, 1);
    putK('anak_seragam', [[0, 195, 995, 0, 0.8, 1, null, 0, 0.8], [0.12, 205, 1005, 0, 0, 1, 'in', 0.6, 0.8]], u, 2);
    stampAt('st_domisili', u, 0.12, 425, 600, -8, 0.5);   // on the blurred name bars: every readable word stays clear
    putK('s_baris', slap(0.25, 540, 182, -2), u, 3, { s: 0.7 });
    putK('kursi_sekolah', slap(0.22, 810, 1000, 3), u, 4, { s: 0.86 });
    putK('s_kursi', slap(at(0, 'kursi'), 560, 1128, -2), u, 5, { s: 0.64 });
  },
  // 02 · Di jalur domisili sekolah negeri,   ARSIP file opens over the distance map; the ring around the school; the school building
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 960 }); bg(SET.map, u, true);
    putK('peta', slide(0, 0.22, MX, MY, 0, 0, 900, 0, 0.5), u, 20, { s: MS });
    putK('s_zona', slap(at(1, 'domisili'), 300, 1110, -3), u, 21, { s: 0.8 });
    schoolRing(u, 0.8, 1.25);
    putK('gedung_sekolah', slap(at(1, 'sekolah'), 400, 255, -2), u, 22, { s: 0.56 });
    putK('s_sdn', slap(at(1, 'negeri'), 800, 300, 3), u, 23, { s: 0.9 });
    fileOverlay(u, 0.02, 0.55);
  },
  // 03 · alamat Kartu Keluarga ikut nentuin kursi.   the KK slides in; arrow from its alamat to a house inside the ring; pin; the desk at the school
  (u, T, d) => {
    stage(u, d, { z0: 1.04, z1: 1.07, cy: 960 }); bg(SET.map);
    put('peta', MX, MY, 0, 0, 1, MS); schoolRing(u, -2, -1);
    if (u < 0.3) putK('gedung_sekolah', [[0, 400, 255, -2, 0, 1, null, 0, 0.56], [0.25, 360, -260, -8, 2, 1, 'in', 0, 0.56]], u, 30);
    const KX = 240, KY = 1010, KS = 0.72, a = pt('kk_ikon', 'alamat', KX, KY, KS, -4), n = nearH();
    putK('kk_ikon', slide(0, 0.2, KX, KY, -4, -700, 0, 0, 0.5), u, 31, { s: KS });
    arrow(u, 0.25, 0.6, bow([a[0] + 110, a[1] - 20], [n[0] - 6, n[1] - 30], -0.25), { seed: 32, head: true, w: 6 });
    putK('pin', drop(0.45, 0.62, n[0] - 6, n[1] - 24, 0, 160, 0.5), u, 33, { s: 0.9 });   // tip on the house icon, clear of the SEKOLAH label
    const sc = school();
    putK('kursi_sekolah', slap(at(2, 'kursi'), 860, 300, 4), u, 34, { s: 0.68 });
    route(u, at(2, 'kursi') + 0.05, at(2, 'kursi') + 0.4, bow([sc[0] + 40, sc[1] - 60], [800, 420], 0.2), { seed: 35, col: PAL.ink, w: 4 });
  },
  // 04 · Biar nggak pindah dadakan,   moving boxes, mattress, fan; "pindah dadakan"; crossed; the KK waits in the corner
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960, shake: [[at(3, 'dadakan'), 10]] }); bg(SET.move, u, true);
    putK('kardus_pindahan', slide(0, 0.18, 580, 640, 0, 900, 0, 0, -0.4), u, 40, { s: 1.0 });
    putK('kk_ikon', slap(0.08, 200, 255, -10), u, 41, { s: 0.58 });
    putK('anak_seragam', slide(0.05, 0.25, 200, 850, 0, -700, 0, 0, 0.4), u, 43, { s: 1.0 });   // the child who has to move (review user 19 Nov)
    putK('s_kemarin', slap(at(3, 'pindah'), 560, 1040, -3), u, 42, { s: 0.85 });
    stampAt('m_cross', u, at(3, 'dadakan') + 0.05, 580, 640, 0, 1.15);
  },
  // 05 · kartu ini wajib terbit minimal setahun sebelum pendaftaran.   CLOSE-UP: the whole KK large (no word cut by the edge);
  //      the issue date is circled; the timeline card TERBIT KK → PENDAFTARAN; red arrow over 12 months; MIN. 1 TAHUN
  (u, T, d) => {
    const KS = 1.28, KX = 540, KY = 560, tg = pt('kk', 'tanggal', KX, KY, KS);
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960 }); bg(SET.macro, u, true);
    putK('kk', slide(0, 0.2, KX, KY, 0, 0, -800, 0, 0.4), u, 50, { s: KS });
    stampAt('m_circle', u, at(4, 'terbit'), tg[0] + 20, tg[1] - 2, 0, 0.68);
    const GX = 540, GY = 1005, GS = 0.95, A = pt('garis', 'a', GX, GY, GS), B = pt('garis', 'b', GX, GY, GS);
    putK('garis', slide(at(4, 'minimal') - 0.25, at(4, 'minimal'), GX, GY, 0, 900, 0, 0, -0.4), u, 51, { s: GS });
    arrow(u, at(4, 'setahun'), at(4, 'pendaftaran'), bow([A[0], A[1] - 34], [B[0], B[1] - 34], -0.12), { seed: 52, head: true, w: 8 });
    stampAt('st_1tahun', u, at(4, 'setahun') + 0.35, 372, 740, -4, 0.5);   // inside the Nama Lengkap column (bars only)
  },
  // 06 · Masalahnya,   hands from every side grab one sheet (red field); the KK small in the corner
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 960 }); bg(SET.hunt, u, true);
    tug('tangan_berebut', 540, 650, 1.0, u, 60);
    putK('kk_ikon', slap(0.1, 860, 235, 8), u, 61, { s: 0.55 });
    putK('kursi_sekolah', slide(0.12, 0.32, 175, 1050, -4, -600, 0, 0, 0.5), u, 62, { s: 0.55 });   // the prize: a school seat
  },
  // 07 · syarat setahun itu bikin alamat di kertas jadi barang buruan.   the alamat line is pasted onto the contested sheet; BARANG BURUAN
  (u, T, d) => {
    stage(u, d, { z0: 1.04, z1: 1.12, cy: 960, shake: [[at(6, 'buruan'), 10]] }); bg(SET.hunt);
    tug('tangan_berebut', 540, 650, 1.0, 9, 70);
    put('kk_ikon', 860, 235, 8, 0, 1, 0.55); put('kursi_sekolah', 175, 1050, -4, 0, 1, 0.55);
    stampAt('st_1tahun', u, at(6, 'syarat'), 300, 230, -6, 0.5);
    putK('s_alamat', slap(at(6, 'alamat'), 545, 625, -3), u, 72, { s: 0.98 });
    stampAt('st_direbut', u, at(6, 'buruan'), 620, 1040, -6, 0.62);
  },
  // 08 · Di Yogyakarta,   the Tugu; YOGYAKARTA; 2023; the Ombudsman officer (from behind) arrives with his folders
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960 }); bg(SET.jogja, u, true);
    putK('tugu_jogja', slide(0, 0.18, 300, 650, -2, -800, 0, 0, 0.5), u, 80, { s: 1.0 });
    putK('s_jogja', slap(at(7, 'Yogyakarta'), 720, 290, 3), u, 81, { s: 0.68 });
    ransomRow('ry23', u, 0.32, 760, 470, 0.06, 0.62);
    putK('petugas_berkas', slide(0.4, 0.6, 790, 880, 0, 700, 0, 0, -0.4), u, 82, { s: 0.6 });
  },
  // 09 · Ombudsman pernah nemuin sebelas anak numpang di dua Kartu Keluarga.   FULL DOCUMENTS: two KK of 10 people; TEMUAN;
  //      on "anak" 6 rows (left) and 5 rows (right) light up; 11 ANAK
  (u, T, d) => {
    const ta = at(8, 'anak');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 960 }); bg(SET.docs, u, true);
    putK(u >= ta ? 'kk10a_hl' : 'kk10a', slide(0, 0.2, 285, 735, -2, -800, 0, 0, 0.5), u, 90, { s: 1.0 });
    putK(u >= ta + 0.15 ? 'kk10b_hl' : 'kk10b', slide(0.06, 0.26, 800, 745, 2, 800, 0, 0, -0.5), u, 91, { s: 1.0 });
    putK('s_ombud', slap(0.05, 300, 215, -2), u, 92, { s: 0.8 });
    stampAt('st_temuan', u, at(8, 'nemuin'), 800, 220, -6, 0.62);
    ransomRow('r11', u, at(8, 'sebelas'), 540, 345, 0.05, 0.62);
    putK('s_6', slap(ta + 0.1, 285, 1100, -3), u, 93, { s: 0.78 });
    putK('s_5', slap(ta + 0.28, 800, 1105, 3), u, 94, { s: 0.78 });
  },
  // 10 · Tahun ini, tiga laporan serupa terbukti.   2026; three report folders slapped one by one; each stamped TERBUKTI
  (u, T, d) => {
    const t3 = at(9, 'tiga'), tb = at(9, 'terbukti');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960, shake: [[tb, 9]] }); bg('file', u, true);
    ransomRow('ry26', u, at(9, 'Tahun'), 540, 260, 0.07, 0.85);
    const F = [[260, 650, -6], [560, 710, 3], [840, 640, -3]];
    F.forEach(([x, y, r], i) => { putK('lap' + (i + 1), slap(t3 + i * 0.12, x, y, r), u, 100 + i, { s: 1.0 }); stampAt('st_terbukti', u, tb + i * 0.1, x, y + 50, r - 5, 0.56); });
    putK('s_laporan', slap(at(9, 'laporan'), 540, 1010, -2), u, 104, { s: 0.85 });
  },
  // 11 · (pause) Aturannya dibaca kaku.   CLOSE-UP: the KK under a scanner light; the light stops on the alamat line; the
  //      member rows dim (not read); tick on "kaku"; "yang dicek: kolom alamat"
  (u, T, d) => {
    const KS = 1.28, KX = 540, KY = 600, al = pt('kk', 'alamat', KX, KY, KS), w2 = 763 * KS / 2, h2 = 633 * KS / 2;
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960 }); bg(SET.macro, u, true);
    putK('kk', slide(0, 0.2, KX, KY, 0, -900, 0, 0, 0.4), u, 110, { s: KS });
    const p = EASE.io(seg(stepT(u), 0.2, 0.95)), sy = lerp(KY - h2 + 30, al[1], p);
    if (u > 0.2) band(KX - w2 + 10, sy - 30, KX + w2 - 10, sy + 30, '#4F8F7E', 0.34);
    if (u > 0.2) band(KX - w2 + 10, sy - 3, KX + w2 - 10, sy + 3, '#2F4F4A', 0.7);
    const dim = seg(u, at(10, 'dibaca'), at(10, 'dibaca') + 0.4);
    if (dim > 0) band(KX - w2 + 6, al[1] + 34, KX + w2 - 6, KY + h2 - 6, '#E6D8BC', 0.62 * dim);
    stampAt('m_tick_s', u, at(10, 'kaku'), 930, al[1] - 6, 0, 0.9);
    putK('s_kolom', slap(at(10, 'Aturannya'), 540, 1100, -2), u, 111, { s: 0.85 });
  },
  // 12 · Karena sistem cuma ngecek data tertulis,   the registration counter; the KK is put on the counter; SESUAI (green = system);
  //      the real house, faded: "rumah asli: tidak dicek"
  (u, T, d) => {
    const td = at(11, 'data');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960 }); bg(SET.system, u, true);
    putK('petugas_loket', slide(0, 0.2, 520, 560, 0, 900, 0, 0, -0.4), u, 120, { s: 0.95 });
    putK('kk_ikon', slide(td - 0.25, td, 380, 965, -3, -700, 0, 0, 0.5), u, 121, { s: 0.7 });
    stampAt('st_sesuai', u, at(11, 'tertulis'), 395, 1040, -8, 0.5);
    putK('ic_rumah', slap(0.3, 860, 925, 0), u, 122, { s: 1.6, a: 0.55 });
    putK('s_rumah', slap(0.45, 800, 1080, 3), u, 123, { s: 0.68 });
  },
  // 13 · dokumen keluarga pun diatur biar jarak ke sekolah kelihatan dekat.   WIDE MAP: the far house is outside the ring (JAUH);
  //      on "diatur" the pin jumps to a house next to the school, the far house fades; short route; DEKAT
  (u, T, d) => {
    const tdi = at(12, 'diatur'), tj = at(12, 'jarak'), tk = at(12, 'dekat'), sc = school(), n = nearH(), f = farH();
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 960, shake: [[tk, 8]] }); bg(SET.map, u, true);
    putK('peta', slide(0, 0.2, MX, MY, 0, 900, 0, 0, -0.4), u, 130, { s: MS }); schoolRing(u, 0.15, 0.5);
    const fade = seg(u, tdi, tdi + 0.5);
    put('ic_rumah', f[0], f[1] - 20, 0, 0, 1, 1.4, 1 - 0.7 * fade);
    route(u, 0.25, 0.7, [[sc[0] - 20, sc[1] + 40], [f[0] + 30, f[1] - 30]], { seed: 131, col: PAL.red, w: 6 });
    putK('s_asli', slap(0.5, 300, 830, -4), u, 132, { s: 0.72, a: 1 - 0.5 * fade });
    const pe = EASE.io(seg(stepT(u), tdi, tdi + 0.45)), px = lerp(f[0], n[0] - 6, pe), py = lerp(f[1] - 46, n[1] - 24, pe) - 60 * Math.sin(Math.PI * pe);
    if (u < tdi) putK('pin', drop(0.1, 0.3, f[0], f[1] - 46, 0, 160, 0.5), u, 133, { s: 0.9 }); else put('pin', px, py, 0, 1.5 * Math.sin(Math.PI * pe), 1, 0.9);
    putK('kk_ikon', slap(0.2, 215, 255, -6), u, 134, { s: 0.58 });
    route(u, tj, tj + 0.4, [[n[0] + 10, n[1] - 30], [sc[0] - 30, sc[1] + 20]], { seed: 135, col: PAL.ink, w: 7 });
    putK('s_dikk', slap(tk - 0.3, 800, 1010, 4), u, 136, { s: 0.75 });
  },
  // 14 · Baris kosong tadi sekarang diisi nama baru.   FULL DOCUMENT: back to the frame-0 KK, large; push toward row 5 (whole row stays
  //      in frame); the empty row is circled; a hand writes "Raka" into it, then lifts away; CUCU appears on "baru" (loop callback)
  (u, T, d) => {
    const KS = 1.2, KX = 540, KY = 560, td = at(13, 'diisi'), tb = at(13, 'baru');
    const [nx, ny] = pt('kk', 'row5', KX, KY, KS), [cx, cy] = pt('kk', 'row5_rel', KX, KY, KS);
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 790, cy1: 890 }); bg(SET.macro, u, true);
    putK('kk', slide(0, 0.18, KX, KY, 0, 0, -900, 0, 0.4), u, 140, { s: KS });
    const NW = SP.nm_baru.img.width / SP.nm_baru.k, CW = SP.nm_cucu.img.width / SP.nm_cucu.k;
    stampAt('m_circle', u, 0.2, nx + NW / 2 + 4, ny, 0, 0.7);
    typed('nm_baru', u, td, 9, nx + NW / 2 + 4, ny, 0);
    typed('nm_cucu', u, tb - 0.15, 16, cx + CW / 2, cy, 0);   // complete well before the 85% keyframe
    // mirrored cut (a left hand): tip offset -159, +145 from the hand centre, so the hand never covers the new name; then it lifts away
    const w1 = seg(stepT(u), td, td + 4 / 9), tip = [nx + 8 + NW * w1, ny + 14], hx = tip[0] + 159, hy = tip[1] - 145;
    if (u < td) putK('tangan_tulis_m', slide(td - 0.3, td, hx, hy, 0, 600, 300, 0, -0.3), u, 141, { s: 1.0 });
    else if (u < td + 0.75) { const q = EASE.in(seg(stepT(u), td + 0.5, td + 0.75)); put('tangan_tulis_m', hx + 700 * q, hy + 260 * q, 4 * q, 2 * q, 1, 1.0); }
  },
  // 15 · Bisa cucu yang tinggal sama neneknya,   SPLIT-SCREEN: left (green) grandmother and grandson walking; right still empty "?"
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.03, cy: 960 }); bg([]);
    putK('p_kiri', slide(0, 0.2, 260, 960, 0, -700, 0, 0, 0.4), u, 150);
    putK('p_kanan', slide(0, 0.2, 820, 960, 0, 700, 0, 0, -0.4), u, 151);
    route(u, 0.15, 0.5, [[540, 170], [536, 700], [542, 1180]], { seed: 152, col: PAL.red, w: 4 });
    putK('nenek_cucu', slide(0.05, 0.25, 270, 600, 0, -700, 0, 0, 0.5), u, 153, { s: 1.0 });
    putK('s_nenek', slap(at(14, 'tinggal'), 272, 960, -3), u, 154, { s: 0.75 });
    if (u < d - 0.1) ransomRow('rq', u, 0.35, 810, 600, 0.1, 0.8);
  },
  // 16 · bisa juga alamat pinjaman.   SPLIT-SCREEN: right (manila) the empty house with a borrowed key; "kunci pinjaman"
  (u, T, d) => {
    stage(u, d, { z0: 1.03, z1: 1.05, cy: 960 }); bg([]);
    put('p_kiri', 260, 960); put('p_kanan', 820, 960);
    route(u, -2, -1, [[540, 170], [536, 700], [542, 1180]], { seed: 152, col: PAL.red, w: 4 });
    put('nenek_cucu', 270, 600, 0, 0, 1, 1.0); put('s_nenek', 272, 960, -3, 0, 1, 0.75);
    const ta = at(15, 'alamat');
    putK('rumah_kunci', slide(ta - 0.25, ta, 815, 600, 2, 700, 0, 0, -0.4), u, 160, { s: 0.9 });
    putK('s_kunci', slap(at(15, 'pinjaman'), 812, 960, 3), u, 161, { s: 0.78 });
  },
  // 17 · Di atas kertas, keduanya kelihatan sama.   both pictures rise; under each a torn strip of its KK drops: same title, same
  //      alamat, same row 5 "Raka · CUCU"; a bold "=" between on "keduanya"; row 5 circled on both on "sama" (loop: the once-empty row)
  (u, T, d) => {
    const tk = at(16, 'kertas'), te = at(16, 'keduanya'), ts = at(16, 'sama');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 940, cy1: 960, ease: 'io' }); bg([]);
    put('p_kiri', 260, 960); put('p_kanan', 820, 960);
    route(u, -2, -1, [[540, 170], [536, 700], [542, 1180]], { seed: 152, col: PAL.red, w: 4 });
    const up = EASE.out(seg(stepT(u), 0, 0.3));
    put('nenek_cucu', 270, 600 - 190 * up, 0, 0, 1, 1.0 - 0.25 * up); put('rumah_kunci', 815, 600 - 170 * up, 2, 0, 1, 0.9 - 0.2 * up);
    const L = [[270, 860, -2, tk], [810, 860, 2, tk + 0.12]];
    L.forEach(([x, y, r, t0], i) => putK('kk_frag', drop(t0 - 0.2, t0, x, y, r, 600, 0.8), u, 171 + i, { s: 0.85 }));
    stampAt('m_eq_b', u, te, 540, 875, 0, 0.5);
    for (const [x, y, r] of L) { const [rx, ry] = pt('kk_frag', 'nama', x, y, 0.85, r); stampAt('m_circle', u, ts, rx + 10, ry, 0, 0.6); }
  },
];
function lerp(a, b, t) { return a + (b - a) * t; }

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(kosong|kartu|keluarga|kursi|sekolah|domisili|alamat|setahun|buruan|yogyakarta|ombudsman|sebelas|anak|tiga|terbukti|kaku|tertulis|jarak|dekat|baru|cucu|nenek|pinjaman|sama)/i } });
}
export const renderAt = t => film.renderAt(t);
