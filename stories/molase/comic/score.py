# Orchestral score for the key-scene preview, written as MIDI (mido) and rendered with fluidsynth + FluidR3_GM (MIT). → score.wav
# D minor. P1 (0–2.3): tremolo strings + timpani roll crescendo, brass and taiko hit on frame 1. 2.3: orchestra hit on the slam.
# 4.52 "raksasa": low brass swell. P8 (5.4–9.05): innocent celesta motif over pizzicato "clock" and a contrabass pedal — calm with a wrong note.
import mido, subprocess
BPM = 120; TPB = 480; sec = lambda t: int(round(t * TPB * BPM / 60))
mid = mido.MidiFile(ticks_per_beat=TPB); ev = []   # (time_s, ch, msg)
def prog(ch, p, t=0): ev.append((t, ch, mido.Message('program_change', channel=ch, program=p)))
def note(ch, n, t, d, v=90): ev.append((t, ch, mido.Message('note_on', channel=ch, note=n, velocity=v))); ev.append((t + d, ch, mido.Message('note_off', channel=ch, note=n, velocity=0)))
def cc(ch, c, t0, t1, v0, v1, steps=24):
    for k in range(steps + 1): ev.append((t0 + (t1 - t0) * k / steps, ch, mido.Message('control_change', channel=ch, control=c, value=int(v0 + (v1 - v0) * k / steps))))
D2, A2, D3, F3, A3, D4, F4, A4, D5, E5, F5, A5, C5, Bb4 = 38, 45, 50, 53, 57, 62, 65, 69, 74, 76, 77, 81, 72, 70
# channels: 0 tremolo strings, 1 brass, 2 timpani, 3 taiko, 4 orchestra hit, 5 slow strings, 6 celesta, 7 pizzicato, 8 contrabass, 10 low brass
for ch, p in [(0, 44), (1, 61), (2, 47), (3, 116), (4, 55), (5, 49), (6, 8), (7, 45), (8, 43), (10, 58)]: prog(ch, p)
for ch in range(11): ev.append((0, ch, mido.Message('control_change', channel=ch, control=91, value=70)))   # reverb send
# P1 — the wave
for n in (D2, A2, D3, F3): note(0, n, 0, 2.3, 100)
cc(0, 11, 0, 2.25, 70, 127)
note(1, D3, 0.0, .5, 120); note(1, A3, 0.0, .5, 110); note(3, 45, 0.0, .8, 127); note(2, D2, 0.0, .4, 120)
note(1, F3, 1.32, .35, 112); note(1, D4, 1.32, .35, 105); note(3, 45, 1.32, .6, 110)   # "datang"
for k in range(22): t = .5 + k * .08; note(2, A2 if k % 2 else D2, t, .07, int(60 + 60 * k / 21))   # timpani roll into the slam
# 2.3 — the slam
note(4, D3, 2.3, .6, 127); note(3, 45, 2.3, 1.0, 127); note(2, D2, 2.3, .8, 127)
for n in (D3, 51, A3): note(5, n, 2.4, 2.9, 62)   # D–Eb cluster: unease under the file
cc(5, 11, 2.4, 5.3, 90, 50)
note(10, D2, 4.45, 1.0, 100); note(10, A2, 4.45, 1.0, 95); cc(10, 11, 4.45, 5.3, 60, 120)   # "raksasa" swell
# P8 — 15 January 1919: calm, slightly wrong
note(8, 26, 5.4, 3.65, 70)
for k in range(15): note(7, A3 if k % 2 == 0 else 52, 5.5 + k * .25, .2, 58)   # pizzicato clock in eighths
mel = [(D5, 0), (F5, .5), (A5, 1.0), (E5, 1.5), (D5, 2.0), (C5, 2.5), (Bb4, 2.75)]   # the Bb is the wrong note as the worker looks up
for n, t in mel: note(6, n, 5.6 + t, .45, 70)
note(5, A4, 6.3, 2.7, 40); note(5, Bb4, 7.1, 1.9, 34); cc(5, 11, 6.3, 9.0, 40, 90)
# write the track
tr = mido.MidiTrack(); mid.tracks.append(tr); tr.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(BPM)))
last = 0
for t, ch, m in sorted(ev, key=lambda e: (e[0], e[2].type == 'note_on')):
    tk = sec(t); tr.append(m.copy(time=tk - last)); last = tk
mid.save('score.mid')
subprocess.run(['fluidsynth', '-ni', '-g', '0.8', '-r', '48000', '-F', 'score.wav', '/usr/share/sounds/sf2/FluidR3_GM.sf2', 'score.mid'], check=True, capture_output=True)
print('score.wav ok')
