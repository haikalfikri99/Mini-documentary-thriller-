# Score #016 (ARSIP Kolase): data-driven small period ensemble (kit/audio/score_auto.py) — cues from vo_words.json + events.json
# (timpani on every on-screen stamp, moved after the spoken word; hit + near-silence in the reveal pause; warm closer from the payoff word).
import sys; sys.path.insert(0, '../../../kit/audio')
from score_auto import auto_score
auto_score(key=-3, payoff_word='Baris', bsn_avoid_words=True)
