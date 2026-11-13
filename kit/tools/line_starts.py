"""START array for film.js and dur/report for episode.json from the aligned VO words: one shot per spoken line
(a line ends at . ? ! … , : or a pause ≥ 0.35 s; lines shorter than 1.0 s merge into the next, longer than 3.2 s split at a pause).
    python3 kit/tools/line_starts.py stories/<slug>      (prints START and writes dur + report into kolase/episode.json)"""
import json, os, sys, subprocess
S = sys.argv[1]; ep_p = os.path.join(S, 'kolase', 'episode.json'); ep = json.load(open(ep_p))
W = json.load(open(os.path.join(S, 'audio', 'vo_words.json')))
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(S, ep['vo'])], capture_output=True, text=True).stdout)
starts = [0.0]
for i in range(1, len(W)):
    prev, cur = W[i - 1], W[i]
    end_line = prev[2][-1:] in '.?!…,:' or cur[0] - prev[1] >= 0.35
    if end_line and cur[0] - starts[-1] >= 1.0: starts.append(round(cur[0], 2))
    elif cur[0] - starts[-1] > 3.2 and cur[0] - prev[1] >= 0.12: starts.append(round(cur[0], 2))
starts.append(round(dur, 2))
ep['dur'] = round(dur, 2); ep['report'] = [[0, round(dur, 2)]]; json.dump(ep, open(ep_p, 'w'), indent=1)
print(f'{len(starts) - 1} shots, avg {dur / (len(starts) - 1):.2f} s')
print('export const START = ' + json.dumps(starts) + ';')
