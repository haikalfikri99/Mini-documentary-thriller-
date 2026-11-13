import json,csv,numpy as np,collections,statistics as st
from scipy import stats
M=json.load(open('metrics.json'))
FAM={'ZackDFilms':('3D realistis','tinggi'),
'ExtraHistory':('2D kartun/ilustrasi','tinggi'),'Mashed':('2D kartun/ilustrasi','tinggi'),'TheInfographicsShow':('2D kartun/ilustrasi','tinggi'),'Kurzgesagt':('2D kartun/ilustrasi','sedang (flat motion graphic)'),'SimpleHistory':('2D kartun/ilustrasi','sedang'),'Psych2go':('2D kartun/ilustrasi','sedang (campur presenter)'),
'HistofactsGeo':('motion graphic/infografik','tinggi'),'LogicallyAnswered':('motion graphic/infografik','sedang (campur footage)'),'infaktamedia':('motion graphic/infografik','sedang (campur footage)'),'FoodTheory':('motion graphic/infografik','rendah (campur)'),
'PantesanLaku':('doodle/pictogram minimal','sedang'),
'SmartNonsense':('presenter + B-roll/skit','tinggi'),'CNBC':('presenter + B-roll/skit','tinggi'),'CNBCMakeIt':('presenter + B-roll/skit','tinggi'),'JohnnyHarris':('presenter + B-roll/skit','tinggi'),'JerryRigEverything':('presenter + B-roll/skit','tinggi'),'Mrwhosetheboss':('presenter + B-roll/skit','tinggi'),'SteveMould':('presenter + B-roll/skit','tinggi'),'TodayIFoundOut':('presenter + B-roll/skit','tinggi'),'Vox':('presenter + B-roll/skit','tinggi'),'WSJ':('presenter + B-roll/skit','tinggi'),'veritasium':('presenter + B-roll/skit','tinggi'),'RaymondChins':('presenter + B-roll/skit','tinggi'),'NgomonginUang':('presenter + B-roll/skit','sedang (campur kartu/teks)'),'NihongoMantappu':('presenter + B-roll/skit','tinggi'),'TheParanormalScholar':('presenter + B-roll/skit','tinggi'),'FactTechz':('presenter + B-roll/skit','sedang (komposit)'),'KokBisa':('presenter + B-roll/skit','rendah (campur presenter + insert 2D)'),'EconomicsExplained':('presenter + B-roll/skit','rendah (campur presenter + gambar AI/stok)'),
'DailyDoseOfInternet':('footage nyata/berita/stok','tinggi'),'FactsVerse':('footage nyata/berita/stok','tinggi'),'tirtoid':('footage nyata/berita/stok','tinggi'),'businessinsider':('footage nyata/berita/stok','sedang'),'HowRidiculous':('footage nyata/berita/stok','tinggi'),'KamusUnik':('footage nyata/berita/stok','tinggi (stok + teks besar)'),'TauGakSih.Official':('footage nyata/berita/stok','tinggi (foto stok + teks)'),'NarasiNewsroom':('footage nyata/berita/stok','sedang'),'kompascom':('footage nyata/berita/stok','sedang (klip podcast)'),'a2animasi':('footage nyata/berita/stok','rendah (campur stok + animasi)'),'historichan':('footage nyata/berita/stok','sedang (arsip foto + teks)'),
'AnimasiFaktaseru':('gambar AI','tinggi')}
for m in M: m['fam'],m['conf']=FAM[m['channel']]
# csv
keys=['channel','fam','conf','id','grp','views','ratio','src','luma','contrast','sat','colorful','edge','sal_area','centre_edge','face','face_area','text_boxes','text_area','title']
with open('/home/user/Mini-documentary-thriller-/research/niche/data_visual_thumbs.csv','w',newline='') as f:
    w=csv.writer(f);w.writerow(['channel','style_family','style_confidence','video_id','group','views','ratio_to_channel_median','thumb_source','luma_mean','luma_std_contrast','saturation','colorfulness_HS','edge_density','saliency_area','centre_edge_luma_diff','face_detected','face_area','text_boxes','text_area','title'])
    for m in M: w.writerow([m[k] for k in keys])
# cross-channel (all listed shorts)
R=[json.loads(l) for l in open('/home/user/Mini-documentary-thriller-/research/niche/data_shorts_per_channel.jsonl')]
import glob
have={r['h'] for r in R}
for h in FAM:
    if h in have: continue
    for l in open(f'lists/{h}.jsonl'):
        d=json.loads(l)
        if d.get('view_count') is not None: R.append(dict(h=h,id=d['id'],t=d['title'],v=d['view_count']))
byc=collections.defaultdict(list)
for r in R:
    if r['v'] is not None and r['h'] in FAM: byc[r['h']].append(r['v'])
chinfo={}
for h,v in byc.items():
    med=st.median(v); chinfo[h]=dict(n=len(v),med=med,mx=max(v),b10=sum(x>=10*med for x in v)/len(v),hit=max(v)>=10*med,b3=sum(x>=3*med for x in v)/len(v))
print('FAMILY TABLE')
fams=collections.defaultdict(list)
for h,i in chinfo.items(): fams[FAM[h][0]].append(h)
tab=[]
for f,hs in fams.items():
    meds=[chinfo[h]['med'] for h in hs]
    tab.append((f,len(hs),sum(chinfo[h]['n'] for h in hs),st.median(meds),min(meds),max(meds),sum(chinfo[h]['hit'] for h in hs),np.mean([chinfo[h]['b10'] for h in hs]),np.mean([chinfo[h]['b3'] for h in hs]),', '.join(hs)))
for t in sorted(tab,key=lambda t:-t[3]): print(f"{t[0]} | ch={t[1]} | shorts={t[2]} | medOfMed={t[3]:,.0f} | range {t[4]:,.0f}-{t[5]:,.0f} | hitCh={t[6]}/{t[1]} | b10={t[7]*100:.1f}% | b3={t[8]*100:.1f}% | {t[9]}")
json.dump({h:chinfo[h] for h in chinfo},open('chinfo.json','w'))
# within channel
mets=['luma','contrast','sat','colorful','edge','sal_area','centre_edge','face','face_area','text_boxes','text_area']
def within(sub,label):
    chs=sorted({m['channel'] for m in sub})
    print('\nWITHIN',label)
    res={}
    for k in mets:
        d=[]
        for c in chs:
            t=[m[k] for m in sub if m['channel']==c and m['grp']=='top'];b=[m[k] for m in sub if m['channel']==c and m['grp']=='bottom']
            if len(t)>=8 and len(b)>=8: d.append(np.mean(t)-np.mean(b))
        d=np.array(d); pos=(d>0).sum();neg=(d<0).sum()
        p=stats.wilcoxon(d).pvalue if len(d)>5 and np.any(d!=0) else float('nan')
        sd=np.std([m[k] for m in sub])
        res[k]=(len(d),np.median(d),pos,neg,p,np.median(d)/sd)
        print(f"{k:12s} n={len(d)} medDiff={np.median(d):+.3f} (std-units {np.median(d)/sd:+.2f}) top>bottom {pos}/{len(d)} bottom>top {neg} p={p:.3f}")
    return res
within(M,'all')
within([m for m in M if m['src']=='oar'],'oar only')
for f in fams:
    sub=[m for m in M if m['fam']==f]
    if len(fams[f])>=4: within(sub,f)
# pooled rank corr
print('\nPOOLED spearman (ratio vs metric, all sampled, top+bottom+rand)')
for k in mets:
    # within-channel rank corr averaged
    rs=[]
    for c in {m['channel'] for m in M}:
        s=[m for m in M if m['channel']==c]
        x=[m[k] for m in s];y=[m['ratio'] for m in s]
        if np.std(x)>0: rs.append(stats.spearmanr(x,y)[0])
    print(k,f"median rho {np.median(rs):+.3f}, pos {sum(r>0 for r in rs)}/{len(rs)}")
# absolute levels top vs overall
print('\nLEVELS top-vs-bottom group medians')
for g in ('top','bottom','rand'):
    s=[m for m in M if m['grp']==g]
    print(g,{k:round(float(np.median([m[k] for m in s])),3) for k in mets})
# face share by family & group
print('\nface share by family/group')
for f in fams:
    s=[m for m in M if m['fam']==f]
    print(f,{g:round(np.mean([m['face'] for m in s if m['grp']==g]),2) for g in ('top','bottom')}, 'luma',{g:round(np.median([m['luma'] for m in s if m['grp']==g]),0) for g in ('top','bottom')},'lumaIQR',np.percentile([m['luma'] for m in s],[10,90]).round(0))
# top decile ratio absolute: breakouts (ratio>=5) vs rest
big=[m for m in M if m['ratio']>=5];oth=[m for m in M if m['ratio']<1]
print('\nratio>=5 n',len(big),{k:round(float(np.median([m[k] for m in big])),2) for k in mets},'\nratio<1',len(oth),{k:round(float(np.median([m[k] for m in oth])),2) for k in mets})
