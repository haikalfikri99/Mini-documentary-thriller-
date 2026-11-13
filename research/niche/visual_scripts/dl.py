import json,os,subprocess
from concurrent.futures import ThreadPoolExecutor
S=json.load(open('sample.json'))
def f(r):
    p=f"thumbs/{r['id']}.jpg"
    if os.path.exists(p) and os.path.getsize(p)>1000: return 1
    for u in ('oardefault','hqdefault'):
        subprocess.run(['curl','-s','-m','20','-o',p,f"https://i.ytimg.com/vi/{r['id']}/{u}.jpg"])
        if os.path.exists(p) and os.path.getsize(p)>1500: return 1
    if os.path.exists(p): os.remove(p)
    return 0
with ThreadPoolExecutor(8) as ex: res=list(ex.map(f,S))
print(sum(res),len(res))
