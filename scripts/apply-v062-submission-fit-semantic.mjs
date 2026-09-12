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
  return s
});
edit('src/herd.js',s=>rep(s,'updateCars(dt);updatePeople(dt);updateParts(dt);updateIntro(dt);','updateCars(dt);updateParts(dt);updateIntro(dt);'));
edit('src/top10.js',s=>rep(s,"if(stamp>2&&n%2)tone(220+55*(n%4),.04,'triangle',.007)",''));
edit('src/core.js',s=>rep(s,"globalThis.onbeforeunload=e=>state==='play'&&(e.preventDefault(),e.returnValue='');",''));
let p=JSON.parse(fs.readFileSync('package.json','utf8'));p.version='0.62.0';fs.writeFileSync('package.json',JSON.stringify(p));
console.log('v0.62 semantic-fit source applied: labels/colors/roofs/semantic accents retained; low-information decoration and pedestrian simulation trimmed');
