import json,cv2,numpy as np,csv
S=json.load(open('sample.json'))
fc=[cv2.CascadeClassifier(cv2.data.haarcascades+n) for n in ('haarcascade_frontalface_default.xml','haarcascade_frontalface_alt2.xml')]
def sal(g):
    g=cv2.resize(g,(64,64)).astype(np.float32)
    F=np.fft.fft2(g);A=np.log(np.abs(F)+1e-8);P=np.angle(F)
    R=A-cv2.blur(A,(3,3))
    s=np.abs(np.fft.ifft2(np.exp(R+1j*P)))**2
    s=cv2.GaussianBlur(s.astype(np.float32),(0,0),3);s=(s-s.min())/(s.max()-s.min()+1e-9)
    return s
rows=[]
for r in S:
    im=cv2.imread(f"thumbs/{r['id']}.jpg")
    if im is None: continue
    h,w=im.shape[:2]; src='oar'
    if w/h>0.7:   # hqdefault 4:3 with pillarbox
        src='hq'; cw=int(h*9/16); x0=(w-cw)//2; im=im[:,x0:x0+cw]
    im=cv2.resize(im,(270,480),interpolation=cv2.INTER_AREA)
    g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
    luma=g.mean(); cstd=g.std(); sat=hsv[...,1].mean()/255
    b,gg,rr=[im[...,i].astype(float) for i in range(3)]
    rg=rr-gg; yb=.5*(rr+gg)-b
    colorf=np.hypot(rg.std(),yb.std())+.3*np.hypot(rg.mean(),yb.mean())
    ed=cv2.Canny(g,80,160); edge=(ed>0).mean()
    s=sal(g); sm=cv2.resize(s,(270,480)); sal_area=(sm>0.5).mean()
    cy,cx=np.mgrid[:480,:270]; cen=((abs(cx-135)<70)&(abs(cy-240)<120))
    centre_edge=abs(g[cen].mean()-g[~cen].mean())
    faces=0;fa=0
    for c in fc:
        f=c.detectMultiScale(g,1.1,5,minSize=(30,30))
        if len(f)>faces: faces=len(f); fa=max(a*b for (_,_,a,b) in f)/(270*480)
    # text proxy
    gx=cv2.Sobel(g,cv2.CV_16S,1,0);gx=cv2.convertScaleAbs(gx)
    _,bw=cv2.threshold(gx,100,255,cv2.THRESH_BINARY)
    cl=cv2.morphologyEx(bw,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_RECT,(17,3)))
    n,_,st,_=cv2.connectedComponentsWithStats(cl)
    tb=[(x,y,a,b) for x,y,a,b,ar in st[1:] if a>40 and 10<b<70 and a/b>2.5 and ar/(a*b)>0.4]
    text_area=sum(a*b for *_,a,b in tb)/(270*480)
    rows.append(dict(channel=r['h'],id=r['id'],grp=r['grp'],views=r['v'],ratio=round(r['ratio'],3),src=src,
      luma=round(luma,1),contrast=round(cstd,1),sat=round(sat,3),colorful=round(colorf,1),edge=round(edge,4),
      sal_area=round(sal_area,3),centre_edge=round(centre_edge,1),face=int(faces>0),face_area=round(fa,3),text_boxes=len(tb),text_area=round(text_area,3),title=r['t'].replace('\n',' ')))
json.dump(rows,open('metrics.json','w'))
print(len(rows),sum(x['src']=='hq' for x in rows))
