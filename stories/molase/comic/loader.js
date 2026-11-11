// one page, three modes: stills (default), the key-scene preview (?video), the full film (?film)
const q = new URLSearchParams(location.search);
if (q.has('film')) { window.__video = true; await import('./film.js'); }
else if (q.has('video')) { window.__video = true; await import('./video.js'); } else await import('./panels.js');
