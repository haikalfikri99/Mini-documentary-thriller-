# Mini-Documentary Thriller

Channel YouTube Shorts berbahasa Indonesia: cerita nyata berbasis bukti, dikemas sebagai mini-dokumenter thriller.
Prinsip: **dramatisasi penyajian, jangan pernah mengarang bukti.**

## Struktur repo

```
VISUAL_STYLE_BIBLE.md                            # standar visual channel (wajib dibaca sebelum kerja visual)
.claude/skills/cinematic-documentary-visuals/    # skill Claude Code: visual director & asset planner
docs/
  mini-documentary-thriller-scripting-skill.md   # panduan editorial & standar kebenaran
stories/
  <slug-cerita>/
    audio/        # voice-over (mp3)
    ...           # naskah, fact sheet, storyboard, komposisi video, hasil render
```

## Workflow produksi visual

Google Flow (image generator, dijalankan user) → aset gambar → Hyperframes (animasi, parallax, compositing, kamera, efek, render).
Claude menyiapkan asset manifest + prompt batch untuk Google Flow Agent. Detail: `VISUAL_STYLE_BIBLE.md` §15.

## Cerita

| Slug | Status |
|---|---|
| `molase` | Voice-over tersedia (`stories/molase/audio/vo_molase.mp3`, ±61 dtk). Naskah, fact sheet, dan visual belum ada di repo. |
