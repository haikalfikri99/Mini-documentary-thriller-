import json,numpy as np
M=json.load(open('metrics.json'))
rng=np.random.default_rng(0)
chs=sorted({m['channel'] for m in M})
def diffs(k,sel=lambda m:True):
    d=[];
    for c in chs:
        t=[m[k] for m in M if m['channel']==c and m['grp']=='top' and sel(m)];b=[m[k] for m in M if m['channel']==c and m['grp']=='bottom' and sel(m)]
        if len(t)>=8 and len(b)>=8:d.append(np.mean(t)-np.mean(b))
    return np.array(d)
for k in ['luma','contrast','sat','colorful','centre_edge','face','text_area']:
    d=diffs(k); sd=np.std([m[k] for m in M])
    bs=[np.median(rng.choice(d,len(d))) for _ in range(3000)]
    lo,hi=np.percentile(bs,[2.5,97.5])
    print(k,f"med {np.median(d):+.3f} CI [{lo:+.3f},{hi:+.3f}] std-units CI [{lo/sd:+.2f},{hi/sd:+.2f}]")
# extremes
for name,f in [('dark<50',lambda m:m['luma']<50),('bright>180',lambda m:m['luma']>180),('face',lambda m:m['face']==1),('text_area>0.03',lambda m:m['text_area']>0.03),('sat>0.5',lambda m:m['sat']>0.5),('sal>0.15',lambda m:m['sal_area']>0.15)]:
    out={}
    for g in ('top','bottom','rand'):
        s=[m for m in M if m['grp']==g]; out[g]=round(np.mean([f(m) for m in s])*100,1)
    # paired over channels
    d=[]
    for c in chs:
        t=[f(m) for m in M if m['channel']==c and m['grp']=='top'];b=[f(m) for m in M if m['channel']==c and m['grp']=='bottom']
        d.append(np.mean(t)-np.mean(b))
    d=np.array(d)
    print(name,out,'paired mean diff pp',round(d.mean()*100,1),'top>bottom',(d>0).sum(),'bottom>top',(d<0).sum())
# breakout >=10x vs others, pooled with channel mean-centered
big=[m for m in M if m['ratio']>=10]
print('n>=10x',len(big))
for k in ['luma','contrast','sat','colorful','centre_edge','face','text_area']:
    cm={c:np.mean([m[k] for m in M if m['channel']==c]) for c in chs}
    print(k,'centered mean of >=10x:',round(np.mean([m[k]-cm[m['channel']] for m in big]),3))
# per-channel luma std etc: variability across top vs bottom
print('top luma std',np.std([m['luma'] for m in M if m['grp']=='top']),'bottom',np.std([m['luma'] for m in M if m['grp']=='bottom']))
