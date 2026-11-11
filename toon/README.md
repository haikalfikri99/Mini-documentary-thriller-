# toon/ — the channel's animation toolkit

2D cartoon engine for every film on the channel. Built on [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) (MIT, © LemoLab; see `LICENSE-lemo-opuscar`):
`engine/toon.js` (boiling ink line, flat fill) comes from its `scifi-toon` style, and `core/` holds its render tools.

| Path | What it is |
|---|---|
| `engine/toon.js` | Vector drawing with a constant line width, line boil and flat fills; light crescents |
| `engine/cast.js` | **Cast Kit**: man/woman/child bodies, wardrobe, hair, hats, accessories; front, 3/4 and side views; expressions; poses (`armF/armB/legF/legB`, `lean`, `bob`), `lookBack`, `headView`, props |
| `engine/motion.js` | `run`, `runFront`, `sprintAt`, `walk`, `blink`, `breathe`, `flutter`, `mixPose`, and `keys()` for keyframed acting (pose + expression blends with easing) |
| `engine/brand.js` | **Signature**: time-and-place stamp, captions (`timedCaption`: word-synced pop-in), threat-colour glow and wash |
| `engine/look.js` | Finishing: paint texture, two-temperature grade, depth of field, light shafts, grain, vignette |
| `engine/fx.js` | Liquid and debris: molasses palette, drops, hanging drops, splashes, barrels, planks, wheels |
| `core/render/` | Headless render tools (`still.mjs`, `video.mjs` parallel frames → mp4) |
| `proof/` | Signature proof: the same kit across 3 stories |
| `fonts/` | Oswald, Courier Prime (OFL) |

p5.js 2 + p5.brush 3 (MIT, `npm install`) give the watercolour paintover used by the street sets.
How films use the toolkit: `.claude/skills/arsip-kasus/references/2-visual-dan-animasi.md`.

## Signature rules (the same in every film)
1. **One drawing language.** Boiling ink line, flat colour, the Cast Kit.
2. **Threat Colour.** The world palette follows the story. The cause of the disaster is the only saturated, glowing colour. It rim-lights the characters and colours the keyword in the caption.
3. **Packaging.** The time-and-place stamp in the first second, captions in the same style, the same transitions and end card.

## Render
Run these from `toon/` after `npm install`:

```
node core/render/still.mjs proof 2.5 --size 1080x1920 --out out/proof
node core/render/video.mjs ../stories/<slug>/film --q film --size 1080x1920 --fps 24 --workers 4
```

In this container, set `PLAYWRIGHT_CHROME` to the chrome-headless-shell path. A frame takes about 0.1 s.
