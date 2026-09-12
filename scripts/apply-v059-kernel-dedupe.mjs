import fs from'node:fs';
let c=fs.readFileSync('src/core.js','utf8'),t=fs.readFileSync('src/top10.js','utf8'),r=fs.readFileSync('src/render.js','utf8'),b=fs.readFileSync('scripts/build.mjs','utf8');
if(!c.includes('function paintBits(')){
 let a=c.indexOf('function paintStamp('),z=c.indexOf('function paintPct()',a);if(a<0||z<0)throw Error('paint kernel anchors missing');
 let q=`function paintBits(x,y,r,v){let cx=x/PS,cy=y/PS,rr=Math.max(1,r/PS),x0=Math.max(0,Math.floor(cx-rr)),x1=Math.min(PW-1,Math.ceil(cx+rr)),y0=Math.max(0,Math.floor(cy-rr)),y1=Math.min(PH-1,Math.ceil(cy+rr)),r2=rr*rr,n=0,d=v?1:-1;for(let yy=y0;yy<=y1;yy++)for(let xx=x0;xx<=x1;xx++){let dx=xx+.5-cx,dy=yy+.5-cy;if(dx*dx+dy*dy<=r2){let k=yy*PW+xx;if(PM[k]!=v){PM[k]=v;painted+=d;dpaint[(xx<PW/2?0:1)+(yy<PH/2?0:2)]+=d;n++}}}return n}\nfunction paintStamp(u,x=u.x,y=u.y,r=28){let n=paintBits(x,y,r,1);if(n){let cx=x/PS,cy=y/PS,rr=Math.max(1,r/PS);PX.fillStyle=\`hsla(\${u.h+R(35,-15)} 95% 58%/.75)\`;PX.beginPath();PX.arc(cx,cy,rr,0,T);PX.fill();score+=Math.round(n*PS*PS*.08*(level?1.25:1));u.hot=1.25}}\n`;
 c=c.slice(0,a)+q+c.slice(z);
}
if(!t.includes('paintBits(x,y,r,0)')){
 let a=t.indexOf('function eraseStamp('),z=t.indexOf('function addClean(',a);if(a<0||z<0)throw Error('erase kernel anchors missing');
 let q=`function eraseStamp(x,y,r){let n=paintBits(x,y,r,0);if(n){let cx=x/PS,cy=y/PS,rr=r/PS;PX.save();PX.globalCompositeOperation='destination-out';PX.beginPath();PX.arc(cx,cy,rr,0,T);PX.fill();PX.restore()}return n}\n`;
 t=t.slice(0,a)+q+t.slice(z);
}
if(r.includes("const townName='|BAKERY|MARKET|CAFE|FLORIST|TOYS|ARCADE|BANK'.split('|'),shopHue="))r=r.replace("const townName='|BAKERY|MARKET|CAFE|FLORIST|TOYS|ARCADE|BANK'.split('|'),shopHue=","const shopName=[0,5,10,8,9,11,12,6],shopHue=").replace("o.ln||townName[k]||'SHOP'","o.ln||N[shopName[k]]||'SHOP'");
if(r.includes('function townCircle(x,y,r,c){X.fillStyle=c;'))r=r.replace('function townCircle(x,y,r,c){X.fillStyle=c;','function townCircle(x,y,r,c){c&&(X.fillStyle=c);');
let swaps=[
 ["X.fillStyle='#d3c9b7';X.beginPath();X.arc(o.x+o.w/2,o.y+o.h/2,o.w/2,0,T);X.fill();","townCircle(o.x+o.w/2,o.y+o.h/2,o.w/2,'#d3c9b7');"],
 ["X.fillStyle='#64bddd';X.beginPath();X.arc(o.x+o.w/2,o.y+o.h/2,o.w*.36,0,T);X.fill();","townCircle(o.x+o.w/2,o.y+o.h/2,o.w*.36,'#64bddd');"],
 ["X.fillStyle='#ffe079';X.beginPath();X.arc(o.x+100,o.y+80,9,0,T);X.fill();","townCircle(o.x+100,o.y+80,9,'#ffe079');"],
 ["X.fillStyle='#f4e7b5';X.beginPath();X.arc(o.x+o.w/2,o.y+72,48,0,T);X.fill();","townCircle(o.x+o.w/2,o.y+72,48,'#f4e7b5');"],
 ["X.fillStyle='#3f7647';X.beginPath();X.arc(f.x,f.y,f.r,0,T);X.fill();","townCircle(f.x,f.y,f.r,'#3f7647');"],
 ["X.fillStyle=`hsl(${i*47} 75% 72%)`;X.beginPath();X.arc(f.x+Math.cos(a)*r,f.y+Math.sin(a)*r,10,0,T);X.fill()","townCircle(f.x+Math.cos(a)*r,f.y+Math.sin(a)*r,10,`hsl(${i*47} 75% 72%)`)"],
 ["X.fillStyle=`hsl(${p.h} 45% 70%)`;X.beginPath();X.arc(p.x,p.y,10,0,T);X.fill();","townCircle(p.x,p.y,10,`hsl(${p.h} 45% 70%)`);"],
 ["X.beginPath();X.arc(34,-14,4,0,T);X.fill();","townCircle(34,-14,4);"],
 ["X.beginPath();X.arc(0,0,p.r,0,T);X.fill();","townCircle(0,0,p.r);"],
 ["X.beginPath();X.arc(0,0,72+Math.sin(clock*7)*6,0,T);X.fill();","townCircle(0,0,72+Math.sin(clock*7)*6);"],
 ["X.beginPath();X.arc(0,0,62+Math.sin(clock*10)*8,0,T);X.fill();","townCircle(0,0,62+Math.sin(clock*10)*8);"],
];
for(let[x,y]of swaps)if(r.includes(x))r=r.replaceAll(x,y);
if(!b.includes('|hit|u|n|m|o)$/')){let x='|i|hit)$/';if(!b.includes(x))throw Error('property-mangle anchor missing');b=b.replace(x,'|i|hit|u|n|m|o)$/')}
fs.writeFileSync('src/core.js',c);fs.writeFileSync('src/top10.js',t);fs.writeFileSync('src/render.js',r);fs.writeFileSync('scripts/build.mjs',b);
console.log('v0.59 quality-neutral kernel dedupe applied');
