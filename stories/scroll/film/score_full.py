# Score for ARSIP 002 (44.83 s), MIDI (mido) → fluidsynth + FluidR3_GM (MIT) → score_full.wav. Key: D minor.
# Acts follow the VO: hook (low pulse, a sad piano on "menyesal") · archive slam · 2006 (innocent celesta over pizzicato clicks) ·
# "Tapi" (everything stops) · the brake (held strings, a clock) · lanjut/udahan (cold synth vs warm horn) · the break (hit) ·
# the endless feed (a music-box loop that never resolves, a bass pulse that speeds up) · money (glockenspiel coins) ·
# 2019 + the quote (drone, dissonant low-brass swell, hit on "mau") · "Dan dia menyesal" (silence, one piano note) ·
# ending (the loop returns quietly and is stopped on "pasang": a warm D major chord, the only resolution in the film).
import mido, subprocess
TPB = 480; sec = lambda t: int(round(t * TPB * 2))   # 120 bpm: 1 s = 2 beats
ev = []
def prog(ch, p): ev.append((0, ch, mido.Message('program_change', channel=ch, program=p)))
def note(ch, n, t, d, v=90): ev.append((t, ch, mido.Message('note_on', channel=ch, note=n, velocity=max(1, min(127, int(v)))))); ev.append((t + d, ch, mido.Message('note_off', channel=ch, note=n, velocity=0)))
def cc(ch, c, t0, t1, v0, v1, n=24):
    for k in range(n + 1): ev.append((t0 + (t1 - t0) * k / n, ch, mido.Message('control_change', channel=ch, control=c, value=int(v0 + (v1 - v0) * k / n))))
# 0 piano, 1 celesta, 2 music box, 3 pizzicato, 4 slow strings, 5 warm pad, 6 synth bass, 7 contrabass, 8 orch hit, 10 taiko, 11 low brass, 12 glockenspiel, 13 french horn, 14 tubular bells
for ch, p in [(0, 0), (1, 8), (2, 10), (3, 45), (4, 49), (5, 89), (6, 38), (7, 43), (8, 55), (10, 116), (11, 58), (12, 9), (13, 60), (14, 14)]: prog(ch, p)
for ch in range(15): ev.append((0, ch, mido.Message('control_change', channel=ch, control=91, value=70)))
D1, D2, A2, D3, F3, A3, C4, D4, E4, F4, G4, A4, Bb4, C5, D5, E5, F5, A5 = 26, 38, 45, 50, 53, 57, 60, 62, 64, 65, 67, 69, 70, 72, 74, 76, 77, 81
LOOP = [(A4, 0), (D5, .25), (F5, .5), (E5, .75), (D5, 1.0), (A4, 1.25), (C5, 1.5), (Bb4, 1.75)]   # the feed: circles, never lands on D

# —— hook 0–4.55: pad + heartbeat pulse; piano on "menyesal"
note(5, D3, 0, 4.5, 60); note(5, A3, 0, 4.5, 52); note(7, D1, 0, 4.5, 60)
for k in range(8): note(6, D2, .1 + k * .55, .14, 80 if k % 2 == 0 else 55)
for n, t in ((A4, 3.94), (F4, 4.2), (D4, 4.42)): note(0, n, t, .9, 70)
# —— archive slam 4.55
note(8, D3, 4.50, .6, 120); note(10, 45, 4.50, 1.0, 120); note(11, D2, 4.50, .7, 100); note(7, D1, 4.6, 1.3, 60); note(10, 45, 5.24, .5, 90)   # slam, then the stamp on "2006"
# —— 2006: 5.0–11.8, innocent and bright (F major colour), pizzicato like clicking
for k in range(24): note(3, [F3, C4, A3, C4][k % 4], 5.84 + k * .25, .18, 58)
for i, (n, t) in enumerate([(F5, 0), (A5, .5), (C5 + 12, 1.0), (A5, 1.5), (G4 + 12, 2.0), (F5, 2.5), (E5, 3.0), (F5, 3.5)]): note(1, n, 5.9 + t * .7, .4, 66)
for i, (n, t) in enumerate([(F5, 0), (A5, .5), (G4 + 12, 1.0), (E5, 1.5)]): note(1, n, 8.3 + t, .45, 60)
note(4, F3, 5.84, 5.9, 40); note(4, A3, 5.84, 5.9, 36); note(4, C4, 8.3, 3.4, 32)
for t in (10.4, 10.66, 11.0): note(12, C5 + 12, t, .2, 70)   # page 1 · 2 · 3
# —— "Tapi" 11.8: everything stops; the brake 12.68–17.3: held low strings, a clock
note(7, D1, 12.68, 4.6, 64); note(4, D3, 12.68, 4.6, 50); note(4, A3, 12.68, 4.6, 44); cc(4, 11, 12.68, 17.2, 60, 90)
for k in range(5): note(3, A4 if k % 2 else E4 + 12, 15.02 + k * .5, .1, 44)   # tick-tock under "berhenti, dan mikir"
# —— lanjut (cold) / udahan (warm) 17.3–19.06
note(5, A5, 17.3, .8, 70); note(5, E5 + 12, 17.3, .8, 60)
note(13, D3, 18.6, .45, 82); note(13, F3 + 1, 18.6, .45, 76); note(13, A3, 18.6, .45, 72)   # warm D major on "udahan"
# —— the break 19.06: hit, then a breath
note(4, A3, 19.06, 1.05, 50); note(4, 51 + 12, 19.74, .4, 46)   # the button holds, then strains
note(8, D3, 20.14, .6, 127); note(10, 45, 20.14, 1.0, 127); note(11, D2, 20.14, .8, 110); [note(14, n, 20.16 + i * .09, 1.2, 70 - i * 8) for i, n in enumerate((A5, F5, D5, A4))]   # the hit + a falling bell cluster
# —— the endless feed 20.8–28.1: music-box loop that never resolves, bass pulse speeding up
t, k = 20.8, 0
while t < 28.0:
    n, o = LOOP[k % len(LOOP)]; note(2, n, t, .3, 60 + min(20, k)); t += .25; k += 1
t, step = 20.8, .5
while t < 28.0: note(6, D2, t, .1, 82); note(6, D2 + 12, t + step / 2, .08, 50); t += step; step = max(.25, step * .97)
note(4, D3, 22.88, 5.2, 46); note(4, Bb4 - 24, 22.88, 5.2, 42); cc(4, 11, 22.88, 28.0, 60, 100)
for i, t in enumerate([26.7, 26.95, 27.2, 27.45, 27.7, 27.9]): note(12, [A5, F5, A5, D5 + 12, A5, F5][i], t, .25, 72)   # coins
# —— 2019 + the quote 28.1–35.64: drone, low-brass swell, hit on "mau"
note(7, D1, 28.15, 7.4, 66); note(5, D3, 28.15, 7.4, 50); note(5, 51, 30.34, 5.2, 46)
note(11, D2, 30.4, 5.0, 70); note(11, 51 - 12, 32.2, 3.2, 70); cc(11, 11, 30.4, 35.2, 40, 127)
note(8, D3, 35.28, .5, 120); note(10, 45, 35.28, .9, 120)
# —— "Dan dia menyesal" 35.64–37.6: near silence, one piano phrase
for n, t in ((D4, 36.3), (F4, 36.94), (A3, 37.3)): note(0, n, t, 1.4, 60)
# —— ending 37.6–44.83: ticking, the loop returns quietly, stopped on "pasang" by the one resolved chord
for k in range(4): note(3, A4, 37.7 + k * .5, .08, 36)
t, k = 39.56, 0
while t < 44.1: n, o = LOOP[k % len(LOOP)]; note(2, n, t, .3, 50); t += .25; k += 1
note(4, D3, 41.54, 2.6, 40); note(4, A3, 41.54, 2.6, 36)
for n in (D3, F3 + 1, A3, D4): note(13, n, 44.18, .65, 78); note(4, n, 44.18, .65, 54)
note(14, D5, 44.18, .65, 60)
mid = mido.MidiFile(ticks_per_beat=TPB); tr = mido.MidiTrack(); mid.tracks.append(tr); tr.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(120)))
last = 0
for tt, ch, m in sorted(ev, key=lambda e: (e[0], e[2].type == 'note_on')): kk = sec(tt); tr.append(m.copy(time=kk - last)); last = kk
mid.save('score_full.mid')
subprocess.run(['fluidsynth', '-ni', '-g', '0.8', '-r', '48000', '-F', 'score_full.wav', '/usr/share/sounds/sf2/FluidR3_GM.sf2', 'score_full.mid'], check=True, capture_output=True)
print('score_full.wav ok')
