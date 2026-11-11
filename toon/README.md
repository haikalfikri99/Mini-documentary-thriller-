# toon/ — the channel's animation toolkit

2D cartoon engine for every film on the channel. Built on [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) (MIT, © LemoLab; see `LICENSE-lemo-opuscar`):
`engine/toon.js` (boiling ink line, flat fill) comes from its `scifi-toon` style, and `core/` holds its render tools.

| Path | What it is |
|---|---|
| `engine/toon.js` | Vector drawing with a constant line width, line boil and flat fills. Adapted for any frame size, with light crescents. |
| `engine/cast.js` | **Cast Kit**: man, woman and child base bodies; wardrobe, hair, hats and accessories; 8 expressions; poses; light and rim |
| `engine/brand.js` | **Signature**: time-and-place stamp, caption with a threat-coloured keyword, glow and wash |
| `proof/` | Signature proof: the same kit across 3 stories |

## Signature rules (the same in every film)
1. **One drawing language.** Boiling ink line, flat colour, the Cast Kit.
2. **Threat Colour.** The world palette follows the story. The cause of the disaster is the only saturated, glowing colour. It rim-lights the characters and colours the keyword in the caption.
3. **Packaging.** The time-and-place stamp in the first second, captions in the same style, the same transitions and end card.

## Render
Run these from `toon/` after `npm install`:

```
node core/render/still.mjs proof 2.5 --size 1080x1920 --out out/proof
node core/render/video.mjs <film> --size 1080x1920 --fps 30 --workers 3
```

In this container, set `PLAYWRIGHT_CHROME` to the chrome-headless-shell path. A frame takes about 0.1 s.
