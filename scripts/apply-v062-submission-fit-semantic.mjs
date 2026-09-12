import fs from'node:fs';
function edit(path,fn){let s=fs.readFileSync(path,'utf8'),n=fn(s);if(n===s)throw Error('v0.62 no-op: '+path);fs.writeFileSync(path,n)}
function rep(s,a,b=''){if(!s.includes(a))throw Error('v0.62 anchor missing: '+a.slice(0,100));return s.replace(a,b)}
edit('src/render.js',s=>{
  s=rep(s,'drawTownStreetDecor();','');
  s=rep(s,"X.fillStyle='#f7ead8';X.fillRect(x-4,y-4,w+8,h+8);X.fillStyle='#9fe8ef';X.fillRect(x,y,w,h);X.fillStyle='#fff7';X.fillRect(x+w/2-1,y,2,h);","X.fillStyle='#9fe8ef';X.fillRect(x,y,w,h);");
  s=rep(s,"if(k==1){X.fillStyle='#d99749';for(let i=3;i--;)X.beginPath(),X.ellipse(x+8+i*10,y+h-6,6,4,0,0,T),X.fill()}if(k==5)townCircle(x+w-9,y+h-8,5,'#ff7396')","if(k==1||k==5)townCircle(x+w-9,y+h-8,5,k==1?'#d99749':'#ff7396')");
  s=rep(s,"function drawTownAwning(x,y,w,k){let n=6,s=(w-20)/n,c=`hsl(${shopHue[k]} 38% 39%)`;for(let i=0;i<n;i++){X.fillStyle=i&1?'#f8ead8':c;X.fillRect(x+10+i*s,y,s+1,18)}}","function drawTownAwning(x,y,w,k){X.fillStyle=`hsl(${shopHue[k]} 38% 39%)`;X.fillRect(x+10,y,w-20,16);X.fillStyle='#f8ead8';X.fillRect(x+w/2-4,y,8,16)}");
  s=rep(s,"townCircle(x+w/2,y+26,14,'#8fd3e1');w>150&&(townFence(x+4,y+h-28,50),townFence(x+w-54,y+h-28,50));townBush(x+19,y+h-10);townBush(x+w-23,y+h-10)",'');
  s=rep(s,"function drawShopProps(k,x,y,w,h){if(k==2||k==4){X.fillStyle='#8a5c36';X.fillRect(x+12,y+h-22,35,16);for(let i=3;i--;)townCircle(x+19+i*10,y+h-25,5,i&1?'#f0c34e':'#6eb765')}else if(k==3){X.fillStyle='#5a4436';X.fillRect(x+w-34,y+h-31,23,27)}else if(k==6){X.fillStyle='#5ce8ff';X.fillRect(x+9,y+h-16,w-18,3);X.fillStyle='#ff71c9';X.fillRect(x+16,y+h-9,w-32,3)}}","function drawShopProps(k,x,y,w,h){if(k==2||k==4){X.fillStyle='#8a5c36';X.fillRect(x+12,y+h-18,30,12)}else if(k==6){X.fillStyle='#ff71c9';X.fillRect(x+12,y+h-8,w-24,3)}}");
  s=rep(s,"let L=o.ln||N[shopName[k]]||'SHOP',S=Math.min(w-24,Math.max(76,L.length*10+24)),Y=y+(g?15:7);X.fillStyle='#f4e7d3';rr(x+w/2-S/2,Y,S,28,5);townCircle(x+w/2,Y+8,4,`hsl(${H} 60% 45%)`);X.fillStyle='#27313b';text(L,x+w/2,Y+24,Math.max(10,Math.min(14,S/(L.length*.7))),'center');","let L=o.ln||N[shopName[k]]||'SHOP',Y=y+(g?15:7);X.fillStyle='#f4e7d3';X.fillRect(x+10,Y,w-20,24);X.fillStyle='#27313b';text(L,x+w/2,Y+19,12,'center');");
  s=rep(s,"function drawPeople(){for(let p of people){townCircle(p.x,p.y,10,`hsl(${p.h} 45% 70%)`);X.strokeStyle='#263242';X.lineWidth=4;X.beginPath();X.moveTo(p.x,p.y+10);X.lineTo(p.x,p.y+30);X.moveTo(p.x,p.y+17);X.lineTo(p.x-10,p.y+24);X.moveTo(p.x,p.y+17);X.lineTo(p.x+10,p.y+24);X.stroke();}}","function drawPeople(){for(let p of people)townCircle(p.x,p.y,8,`hsl(${p.h} 45% 70%)`)}");
  s=rep(s,'drawParts();','');
  return s
});
edit('src/core.js',s=>{
  s=rep(s,'fx(o.x+o.w/2,o.y+o.h/2,18,180);','');
  s=rep(s,'fx(u.x,u.y,28,220)','');
  s=rep(s,'fx(unis[i].x,unis[i].y,18,150)','');
  return s
});
edit('src/herd.js',s=>{
  s=rep(s,'if(rng()<dt*10)fx(u.x,u.y,2,90)','');
  s=rep(s,'fx(x,y,2,55)','');
  s=rep(s,'updateCars(dt);updatePeople(dt);updateParts(dt);updateIntro(dt);','updateCars(dt);updateIntro(dt);');
  return s
});
edit('src/whip.js',s=>{
  s=rep(s,'fx(u.x,u.y,6+n*2,120);','');
  s=rep(s,'fx(u.x,u.y,4+n,85);','');
  return s
});
edit('src/top10.js',s=>{
  s=rep(s,"if(stamp>2&&n%2)tone(220+55*(n%4),.04,'triangle',.007)",'');
  s=rep(s,"fx(x,y,l.k==='hall'?46:26,240);",'');
  s=rep(s,'fx(c.x,c.y,8,120);','');
  return s
});
edit('src/expansion.js',s=>{
  s=rep(s,'fx(h.x+h.w/2,h.y+h.h/2,60,420);','');
  s=rep(s,'if(landWin===2&&rng()<dt*5)fx(R(WW),R(WH),8,220);','');
  return s
});
edit('src/polish.js',s=>rep(s,"if(!done){X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.arc(sx,sy,r+6+Math.sin(clock*7)*2,0,T);X.stroke()}",''));
let p=JSON.parse(fs.readFileSync('package.json','utf8'));p.version='0.62.0';fs.writeFileSync('package.json',JSON.stringify(p));
console.log('v0.62 semantic-fit source applied: storefront identity + trails + gameplay feedback retained; low-information decoration, particles, marker pulse, civilian simulation trimmed');
