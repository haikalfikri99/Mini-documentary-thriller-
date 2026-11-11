# Orchestral score for the full film (61 s), MIDI (mido) → fluidsynth + FluidR3_GM (MIT) → score_full.wav.
# Acts follow the story: hook (frantic) · intro (mystery) · Boston (innocent, one wrong note) · rupture (build, hit) ·
# disaster (driving ostinato, stabs on the key words) · warnings (music box, tender but wrong) · causes (pulse, a hit per stamp) ·
# victims (near silence, bells) · the question (the innocent motif returns over dissonance; a last hit on "diabaikan").
import mido, subprocess
TPB = 480; sec = lambda t: int(round(t * TPB * 2))   # 120 bpm: 1 s = 2 beats
ev = []
def prog(ch, p): ev.append((0, ch, mido.Message('program_change', channel=ch, program=p)))
def note(ch, n, t, d, v=90): ev.append((t, ch, mido.Message('note_on', channel=ch, note=n, velocity=min(127, v)))); ev.append((t + d, ch, mido.Message('note_off', channel=ch, note=n, velocity=0)))
def cc(ch, c, t0, t1, v0, v1, n=24):
    for k in range(n + 1): ev.append((t0 + (t1 - t0) * k / n, ch, mido.Message('control_change', channel=ch, control=c, value=int(v0 + (v1 - v0) * k / n))))
# 0 tremolo str, 1 brass, 2 timpani, 3 taiko, 4 orch hit, 5 slow strings, 6 celesta, 7 pizzicato, 8 contrabass, 10 low brass, 11 tubular bells, 12 music box
for ch, p in [(0, 44), (1, 61), (2, 47), (3, 116), (4, 55), (5, 49), (6, 8), (7, 45), (8, 43), (10, 58), (11, 14), (12, 10)]: prog(ch, p)
for ch in range(13): ev.append((0, ch, mido.Message('control_change', channel=ch, control=91, value=72)))
D1, D2, A2, D3, F3, A3, D4, F4, A4, Bb4, C5, D5, E5, F5, A5 = 26, 38, 45, 50, 53, 57, 62, 65, 69, 70, 72, 74, 76, 77, 81
MOTIF = [(D5, 0), (F5, .5), (A5, 1.0), (E5, 1.5), (D5, 2.0), (C5, 2.5), (Bb4, 2.75)]
# —— hook 0–2.9
for n in (D2, A2, D3, F3): note(0, n, 0, 2.85, 100)
cc(0, 11, 0, 2.8, 70, 127)
note(1, D3, 0, .5, 120); note(1, A3, 0, .5, 110); note(3, 45, 0, .8, 127); note(2, D2, 0, .4, 120)
note(1, F3, 1.32, .4, 112); note(1, D4, 1.32, .4, 105); note(3, 45, 1.32, .6, 110)
for k in range(28): note(2, A2 if k % 2 else D2, .6 + k * .08, .07, 60 + 60 * k // 27)
# —— intro 2.9–9.7: the slam, then mystery
note(4, D3, 2.9, .6, 127); note(3, 45, 2.9, 1, 127); note(2, D2, 2.9, .8, 127)
note(8, D1, 3.0, 6.6, 70); for_ = [note(5, n, 3.0, 6.5, 52) for n in (D3, 51, A3)]; cc(5, 11, 3.0, 9.6, 70, 50)
note(10, D2, 4.15, 1.2, 105); note(10, A2, 4.15, 1.2, 100); cc(10, 11, 4.15, 5.4, 60, 120)   # "tangki raksasa"
for k, n in enumerate([A4, F4, D4, E5, D5]): note(6, n, 5.6 + k * .45, .4, 60)   # molasses: slow, glinting
note(1, D3, 7.62, .3, 70)   # "gula pekat" stamp
# —— Boston 9.7–12.6: innocent celesta over pizzicato clock, one wrong note as he looks up
for k in range(11): note(7, A3 if k % 2 == 0 else 52, 9.75 + k * .25, .2, 58)
for n, t in MOTIF: note(6, n, 9.8 + t, .45, 72)
note(5, A4, 10.6, 2.0, 40); note(5, Bb4, 11.2, 1.4, 36)
# —— rupture 12.6–15.0: tremolo build, a pop per rivet, the hit and a breath of silence
for n in (D3, 51): note(0, n, 12.6, 1.45, 90)
cc(0, 11, 12.6, 14.0, 50, 127)
for t in (.22, .42, .6, .76, .9, 1.02, 1.12): note(7, 86, 12.6 + t, .1, 90)
note(4, D3, 14.05, .8, 127); note(3, 45, 14.05, 1.2, 127); note(2, D2, 14.05, 1, 127); note(10, D2, 14.05, .9, 127); note(1, D3, 14.05, .6, 127)
# —— disaster 15.0–27.25: driving ostinato, stabs on the key words
t = 15.0
while t < 27.1:
    for n in ([D2, D2, F3, D2] if int((t - 15) * 4) % 8 < 4 else [D2, D2, Bb4 - 24, D2]): note(8, n, t, .12, 92); note(0, n + 12, t, .12, 70); t += .125
for k in range(48): note(2, D2, 15.0 + k * .25, .1, 70 + (k % 4 == 0) * 30)
for tt in (15.64, 16.6, 19.7, 21.58, 22.12, 23.74, 24.88): note(1, D3, tt, .35, 118); note(1, F3, tt, .35, 112); note(3, 45, tt, .6, 115)
note(5, D4, 24.55, 2.6, 70); note(5, F4, 24.55, 2.6, 66); note(5, A4, 25.8, 1.4, 60)   # the swept: a held lament over the drive
# —— warnings 27.25–38.3: music box and soft strings, tender but wrong
note(4, D3, 27.25, .4, 90)
for k, (n, tt) in enumerate(MOTIF * 2): note(12, n, 27.6 + tt + (k // 7) * 3.2, .5, 62)
note(5, D3, 27.6, 10.6, 44); note(5, A3, 27.6, 10.6, 40); note(5, 51, 31.0, 7.2, 34)
for tt in (34.8, 37.3): note(11, A5, tt, 1.2, 60)   # the drop; the drop in the cup
# —— causes 38.3–49.6: pulse, a hit per stamp, crescendo to "penyebabnya"
for k in range(45): note(7, D3 if k % 2 == 0 else A3 - 12, 38.4 + k * .25, .18, 56 + k)
note(8, D1, 38.3, 11.3, 66)
for tt in (41.4, 43.75, 45.22, 47.2, 47.55, 47.9): note(10, D2, tt, .5, 115); note(3, 45, tt, .5, 100)
note(4, D3, 48.35, .8, 127); note(1, D3, 48.76, .6, 120); note(1, A3, 48.76, .6, 115)
# —— victims 49.6–53.8: near silence, bells
note(5, D3, 49.7, 4.0, 40); note(5, F3, 49.7, 4.0, 36); note(11, D5, 50.68, 2.5, 70); note(11, A4, 52.4, 2.5, 64)
# —— the question 53.8–60.75: the motif returns over dissonance; amber swell; the last hit
for n, tt in MOTIF: note(6, n, 54.0 + tt, .5, 66)
note(5, A4, 54.0, 6.5, 44); note(5, Bb4, 55.0, 5.5, 40); cc(5, 11, 54.0, 59.9, 50, 120)
note(0, D3, 56.0, 1.4, 90); note(0, 51, 56.0, 1.4, 86); cc(0, 11, 56.0, 57.3, 60, 127)
note(4, D3, 59.93, .8, 127); note(3, 45, 59.93, 1.2, 127); note(2, D2, 59.93, 1, 127); note(10, D2, 59.93, .8, 120)
mid = mido.MidiFile(ticks_per_beat=TPB); tr = mido.MidiTrack(); mid.tracks.append(tr); tr.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(120)))
last = 0
for tt, ch, m in sorted(ev, key=lambda e: (e[0], e[2].type == 'note_on')): k = sec(tt); tr.append(m.copy(time=k - last)); last = k
mid.save('score_full.mid')
subprocess.run(['fluidsynth', '-ni', '-g', '0.8', '-r', '48000', '-F', 'score_full.wav', '/usr/share/sounds/sf2/FluidR3_GM.sf2', 'score_full.mid'], check=True, capture_output=True)
print('score_full.wav ok')
