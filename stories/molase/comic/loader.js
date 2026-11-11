// one page, two modes: stills (default) or the key-scene video (?video)
if (new URLSearchParams(location.search).has('video')) { window.__video = true; await import('./video.js'); } else await import('./panels.js');
