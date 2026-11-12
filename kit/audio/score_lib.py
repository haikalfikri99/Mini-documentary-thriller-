# Score kit: write music as timed MIDI events (seconds), render with fluidsynth + FluidR3_GM (MIT). Key notes + GM palette
# used by the channel. usage: from score_lib import *; prog(0, 49); note(0, D3, 1.0, 2.0, 60); cc(...); render()
import mido, subprocess
TPB = 480; sec = lambda t: int(round(t * TPB * 2))   # 120 bpm: 1 s = 2 beats
ev = []
def prog(ch, p): ev.append((0, ch, mido.Message('program_change', channel=ch, program=p)))
def note(ch, n, t, d, v=90): ev.append((t, ch, mido.Message('note_on', channel=ch, note=n, velocity=max(1, min(127, int(v)))))); ev.append((t + d, ch, mido.Message('note_off', channel=ch, note=n, velocity=0)))
def cc(ch, c, t0, t1, v0, v1, n=24):
    for k in range(n + 1): ev.append((t0 + (t1 - t0) * k / n, ch, mido.Message('control_change', channel=ch, control=c, value=int(v0 + (v1 - v0) * k / n))))
def reverb(chs, v=70):
    for ch in chs: ev.append((0, ch, mido.Message('control_change', channel=ch, control=91, value=v)))
# D minor + neighbours (MIDI numbers)
D1, D2, A2, D3, F3, A3, C4, D4, E4, F4, G4, A4, Bb4, C5, D5, E5, F5, A5 = 26, 38, 45, 50, 53, 57, 60, 62, 64, 65, 67, 69, 70, 72, 74, 76, 77, 81
# GM programs the channel uses
GM = dict(piano=0, celesta=8, glock=9, musicbox=10, bells=14, strings_trem=44, pizz=45, contrabass=43, slow_strings=49, orch_hit=55,
          tuba=58, horn=60, brass=61, synth_bass=38, warm_pad=89, timpani=47, taiko=116)
def render(name='score_full'):
    mid = mido.MidiFile(ticks_per_beat=TPB); tr = mido.MidiTrack(); mid.tracks.append(tr); tr.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(120)))
    last = 0
    for tt, ch, m in sorted(ev, key=lambda e: (e[0], e[2].type == 'note_on')): kk = sec(tt); tr.append(m.copy(time=kk - last)); last = kk
    mid.save(f'{name}.mid')
    subprocess.run(['fluidsynth', '-ni', '-g', '0.8', '-r', '48000', '-F', f'{name}.wav', '/usr/share/sounds/sf2/FluidR3_GM.sf2', f'{name}.mid'], check=True, capture_output=True)
    print(f'{name}.wav ok')
