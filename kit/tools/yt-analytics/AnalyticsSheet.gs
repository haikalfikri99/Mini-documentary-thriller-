// ARSIP KASUS: penarik analytics YouTube ke Google Sheet (hanya MEMBACA).
// Jalan di Google Apps Script, di akun Google pemilik channel.
// Layanan yang harus ditambahkan (Services +): YouTube Analytics API (id: YouTubeAnalytics)
// dan YouTube Data API v3 (id: YouTube). Jangan ubah id-nya.
// Fungsi utama: jalankanSemua(). Opsional: pasangJadwalHarian(), linkSheet().
var NAMA_SHEET = 'ARSIP Analytics - Mini Thriller IDN';
var TZ = 'Asia/Jakarta';
var KANAL_ID = 'UCRV6nTJ6oJqIXmZUXq8t9gA'; // channel Mini Thriller IDN. Kosongkan ('') untuk memakai channel akun yang menjalankan skrip.
var KOLOM = ['views', 'engagedViews', 'estimatedMinutesWatched', 'averageViewDuration', 'averageViewPercentage',
             'likes', 'comments', 'shares', 'subscribersGained', 'subscribersLost'];
var BATAS_VIDEO = 30; // video terbaru yang dianalisis mendalam (retensi, trafik)

function jalankanSemua() {
  var ss = sheet_();
  var log = [];
  var data = null;
  seksi_(log, 'daftar video', function () { data = ambilVideo_(); });
  if (!data) { tulisLog_(ss, log); return; }
  var vids = data.videos.slice(0, BATAS_VIDEO);
  var skrg = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm');

  // 1) Total per video (ditimpa tiap kali) + riwayat (ditambah tiap kali, untuk melihat perubahan 48 jam / 7 hari)
  seksi_(log, 'total per video', function () {
    var head = ['video_id', 'judul', 'terbit', 'durasi_dtk', 'views_publik'].concat(KOLOM);
    var rows = [], hist = [];
    vids.forEach(function (v) {
      var r = q_(tgl_(v.terbit), hariIni_(), [KOLOM.join(','), KOLOM.filter(function (k) { return k !== 'engagedViews'; }).join(',')],
                 { filters: 'video==' + v.id });
      var m = baris1_(r);
      var nilai = KOLOM.map(function (k) { return m[k] === undefined ? '' : m[k]; });
      rows.push([v.id, v.judul, v.terbit, v.durasi, v.viewsPublik].concat(nilai));
      hist.push([skrg, v.id, v.judul, v.viewsPublik].concat(nilai));
    });
    tulis_(ss, 'Video', head, rows);
    tambah_(ss, 'Riwayat', ['waktu_ambil', 'video_id', 'judul', 'views_publik'].concat(KOLOM), hist);
  });

  // 2) Kurva retensi per video (100 titik)
  seksi_(log, 'retensi', function () {
    var rows = [];
    vids.forEach(function (v) {
      try {
        var r = q_(tgl_(v.terbit), hariIni_(), ['audienceWatchRatio,relativeRetentionPerformance', 'audienceWatchRatio'],
                   { dimensions: 'elapsedVideoTimeRatio', filters: 'video==' + v.id, sort: 'elapsedVideoTimeRatio' });
        (r.rows || []).forEach(function (x) { rows.push([v.id, v.judul, x[0], x[1], x.length > 2 ? x[2] : '']); });
      } catch (e) { log.push('retensi ' + v.id + ': ' + e.message); }
    });
    tulis_(ss, 'Retensi', ['video_id', 'judul', 'posisi_video(0-1)', 'audienceWatchRatio', 'relativeRetentionPerformance'], rows);
  });

  // 3) Sumber trafik per video
  seksi_(log, 'trafik', function () {
    var rows = [];
    vids.forEach(function (v) {
      try {
        var r = q_(tgl_(v.terbit), hariIni_(), ['views,estimatedMinutesWatched'],
                   { dimensions: 'insightTrafficSourceType', filters: 'video==' + v.id, sort: '-views' });
        (r.rows || []).forEach(function (x) { rows.push([v.id, v.judul, x[0], x[1], x[2]]); });
      } catch (e) { log.push('trafik ' + v.id + ': ' + e.message); }
    });
    tulis_(ss, 'Trafik', ['video_id', 'judul', 'sumber', 'views', 'menit_ditonton'], rows);
  });

  // 4) Tingkat channel: harian 90 hari, Shorts vs panjang, demografi, negara
  var awal90 = tgl_(new Date(Date.now() - 7776000000).toISOString());
  seksi_(log, 'harian', function () {
    var r = q_(awal90, hariIni_(), ['views,engagedViews,estimatedMinutesWatched,subscribersGained', 'views,estimatedMinutesWatched,subscribersGained'],
              { dimensions: 'day', sort: 'day' });
    tulisQ_(ss, 'Harian', r);
  });
  seksi_(log, 'shorts vs panjang', function () {
    var r = q_(awal90, hariIni_(), ['views,engagedViews,estimatedMinutesWatched', 'views,estimatedMinutesWatched'],
              { dimensions: 'creatorContentType' });
    tulisQ_(ss, 'ShortsVsPanjang', r);
  });
  seksi_(log, 'demografi', function () {
    var r = q_(awal90, hariIni_(), ['viewerPercentage'], { dimensions: 'ageGroup,gender', sort: 'gender,ageGroup' });
    tulisQ_(ss, 'Demografi', r);
  });
  seksi_(log, 'negara', function () {
    var r = q_(awal90, hariIni_(), ['views,estimatedMinutesWatched'], { dimensions: 'country', sort: '-views', maxResults: 15 });
    tulisQ_(ss, 'Negara', r);
  });

  // 5) Lembar isian manual (Studio: Viewed vs swiped away; tidak ada di API)
  if (!ss.getSheetByName('Manual')) {
    var sh = ss.insertSheet('Manual');
    sh.getRange(1, 1, 1, 6).setValues([['video_id_atau_judul', 'tanggal_ukur', 'sejak_tayang', 'viewed_persen', 'swiped_persen', 'catatan']]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  log.unshift('channel: ' + data.channel.title + ' (' + data.channel.id + ') | subs ' + data.channel.subs + ' | video ' + data.videos.length);
  tulisLog_(ss, log);
}

function linkSheet() { Logger.log(sheet_().getUrl()); }

function pasangJadwalHarian() {
  hapusJadwal();
  ScriptApp.newTrigger('jalankanSemua').timeBased().everyDays(1).atHour(7).create();
}
function hapusJadwal() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'jalankanSemua') ScriptApp.deleteTrigger(t);
  });
}

// ---------- pembantu ----------
function ambilVideo_() {
  var ch = YouTube.Channels.list('contentDetails,snippet,statistics', KANAL_ID ? { id: KANAL_ID } : { mine: true });
  if (!ch.items || !ch.items.length) throw new Error('Channel tidak ditemukan (KANAL_ID atau akun salah).');
  var c = ch.items[0];
  var uploads = c.contentDetails.relatedPlaylists.uploads;
  var ids = [], tok = null;
  do {
    var opt = { playlistId: uploads, maxResults: 50 };
    if (tok) opt.pageToken = tok;
    var p = YouTube.PlaylistItems.list('contentDetails', opt);
    (p.items || []).forEach(function (i) { ids.push(i.contentDetails.videoId); });
    tok = p.nextPageToken;
  } while (tok);
  var out = [];
  for (var i = 0; i < ids.length; i += 50) {
    var v = YouTube.Videos.list('snippet,contentDetails,statistics', { id: ids.slice(i, i + 50).join(',') });
    (v.items || []).forEach(function (x) {
      out.push({ id: x.id, judul: x.snippet.title, terbit: x.snippet.publishedAt,
                 durasi: durasi_(x.contentDetails.duration), viewsPublik: Number((x.statistics || {}).viewCount || 0) });
    });
  }
  out.sort(function (a, b) { return a.terbit < b.terbit ? 1 : -1; }); // terbaru dulu
  return { videos: out, channel: { id: c.id, title: c.snippet.title, subs: (c.statistics || {}).subscriberCount, views: (c.statistics || {}).viewCount } };
}

// Coba tiap set metrik berurutan; pakai yang pertama yang diterima API.
function q_(start, end, metricSets, opts) {
  var err = null;
  for (var i = 0; i < metricSets.length; i++) {
    var a = { ids: 'channel==' + (KANAL_ID || 'MINE'), startDate: start, endDate: end, metrics: metricSets[i] };
    for (var k in (opts || {})) a[k] = opts[k];
    try { return YouTubeAnalytics.Reports.query(a); }
    catch (e) { err = e; }
  }
  throw err;
}
function baris1_(r) {
  var o = {};
  if (r.rows && r.rows.length) r.columnHeaders.forEach(function (h, i) { o[h.name] = r.rows[0][i]; });
  return o;
}
function tulisQ_(ss, nama, r) { tulis_(ss, nama, r.columnHeaders.map(function (h) { return h.name; }), r.rows || []); }

function seksi_(log, nama, fn) { try { fn(); } catch (e) { log.push(nama + ': ' + (e.message || e)); } }
function sheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SSID');
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) { id = null; } }
  var ss = SpreadsheetApp.create(NAMA_SHEET);
  props.setProperty('SSID', ss.getId());
  return ss;
}
function tulis_(ss, nama, head, rows) {
  var sh = ss.getSheetByName(nama) || ss.insertSheet(nama);
  sh.clear();
  if (!rows.length) { sh.getRange(1, 1).setValue('(kosong: API tidak mengembalikan data untuk laporan ini)'); return; }
  sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
  sh.getRange(2, 1, rows.length, head.length).setValues(rows);
  sh.setFrozenRows(1);
}
function tambah_(ss, nama, head, rows) {
  var sh = ss.getSheetByName(nama) || ss.insertSheet(nama);
  if (sh.getLastRow() === 0) { sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold'); sh.setFrozenRows(1); }
  if (rows.length) sh.getRange(sh.getLastRow() + 1, 1, rows.length, head.length).setValues(rows);
}
function tulisLog_(ss, log) {
  var sh = ss.getSheetByName('Log') || ss.insertSheet('Log');
  sh.clear();
  var baris = [['waktu', Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm')], ['sheet', ss.getUrl()]];
  (log.length ? log : ['OK, tanpa error']).forEach(function (x) { baris.push(['', x]); });
  sh.getRange(1, 1, baris.length, 2).setValues(baris);
}
function hariIni_() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'); }
function tgl_(iso) { return Utilities.formatDate(new Date(iso), TZ, 'yyyy-MM-dd'); }
function durasi_(iso) {
  var m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || '') || [];
  // dikali lewat pembagian supaya skrip ini tidak memuat karakter bintang
  var jam = Math.round(Number(m[1] || 0) / (1 / 3600));
  var mnt = Math.round(Number(m[2] || 0) / (1 / 60));
  return jam + mnt + Number(m[3] || 0);
}
