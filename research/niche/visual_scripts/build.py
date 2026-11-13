import json,glob,os,random,statistics as st
random.seed(1)
R='/home/user/Mini-documentary-thriller-/research/niche/data_shorts_per_channel.jsonl'
rows=[json.loads(l) for l in open(R)]
new=['SimpleHistory','Kurzgesagt','ExtraHistory','FactsVerse','TheParanormalScholar','DailyDoseOfInternet','HistofactsGeo','historichan','a2animasi','infaktamedia','AnimasiFaktaseru','nadifacts','duniafaktacilik','tanyaalamid']
have={r['h'] for r in rows}
for h in new:
    if h in have: continue
    for l in open(f'lists/{h}.jsonl'):
        d=json.loads(l)
        if d.get('view_count') is None: continue
        rows.append(dict(h=h,id=d['id'],t=d['title'],v=d['view_count']))
rows=[r for r in rows if r['v'] is not None]
by={}
for r in rows: by.setdefault(r['h'],[]).append(r)
out=[]
for h,l in by.items():
    if len(l)<40: continue
    m=st.median([r['v'] for r in l]) or 1
    for r in l: r['ratio']=r['v']/m
    l.sort(key=lambda r:-r['ratio'])
    top,bot=l[:15],l[-15:]
    rest=[r for r in l[15:-15]]
    rnd=random.sample(rest,min(15,len(rest)))
    for g,s in (('top',top),('bottom',bot),('rand',rnd)):
        for r in s: out.append(dict(r,grp=g,median=m,n=len(l)))
json.dump(out,open('sample.json','w'))
print(len(out),len({r['h'] for r in out}))
for h in by: print(h,len(by[h]),end='; ')
