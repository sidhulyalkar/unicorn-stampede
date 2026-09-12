import fs from'node:fs';
function edit(path,fn){let s=fs.readFileSync(path,'utf8'),n=fn(s);if(n===s)throw Error('v0.63c no-op: '+path);fs.writeFileSync(path,n)}
function rep(s,a,b=''){if(!s.includes(a))throw Error('v0.63c anchor missing: '+a.slice(0,120));return s.replace(a,b)}

// Preserve the visible town grammar. Only compact small shop micro-props/sign implementation.
edit('src/render.js',s=>{
  s=rep(s,"if(k==1){X.fillStyle='#d99749';for(let i=3;i--;)X.beginPath(),X.ellipse(x+8+i*10,y+h-6,6,4,0,0,T),X.fill()}if(k==5)townCircle(x+w-9,y+h-8,5,'#ff7396')","if(k==1||k==5)townCircle(x+w-9,y+h-8,5,k==1?'#d99749':'#ff7396')");
  s=rep(s,"function drawShopProps(k,x,y,w,h){if(k==2||k==4){X.fillStyle='#8a5c36';X.fillRect(x+12,y+h-22,35,16);for(let i=3;i--;)townCircle(x+19+i*10,y+h-25,5,i&1?'#f0c34e':'#6eb765')}else if(k==3){X.fillStyle='#5a4436';X.fillRect(x+w-34,y+h-31,23,27)}else if(k==6){X.fillStyle='#5ce8ff';X.fillRect(x+9,y+h-16,w-18,3);X.fillStyle='#ff71c9';X.fillRect(x+16,y+h-9,w-32,3)}}","function drawShopProps(k,x,y,w,h){if(k==2||k==4){X.fillStyle='#8a5c36';X.fillRect(x+12,y+h-18,30,12)}else if(k==6){X.fillStyle='#ff71c9';X.fillRect(x+12,y+h-8,w-24,3)}}");
  s=rep(s,"let L=o.ln||N[shopName[k]]||'SHOP',S=Math.min(w-24,Math.max(76,L.length*10+24)),Y=y+(g?15:7);X.fillStyle='#f4e7d3';rr(x+w/2-S/2,Y,S,28,5);townCircle(x+w/2,Y+8,4,`hsl(${H} 60% 45%)`);X.fillStyle='#27313b';text(L,x+w/2,Y+24,Math.max(10,Math.min(14,S/(L.length*.7))),'center');","let L=o.ln||N[shopName[k]]||'SHOP',Y=y+(g?15:7);X.fillStyle='#f4e7d3';X.fillRect(x+10,Y,w-20,24);X.fillStyle='#27313b';text(L,x+w/2,Y+19,12,'center');");
  s=rep(s,'drawParts();','');
  return s
});

// Generic square particle machinery is expensive. Keep paint, shake, flash, audio cues and rainbow trails.
edit('src/core.js',s=>{
  s=rep(s,"function makePerson(x,y){return{x,y,vx:0,vy:0,t:R(2),cool:R(6),h:R(360)}}","function makePerson(x,y){return{x,y,vx:R(30,-30),vy:R(30,-30),t:R(2),h:R(360)}}");
  s=rep(s,'fx(o.x+o.w/2,o.y+o.h/2,18,180);','');
  s=rep(s,'fx(u.x,u.y,28,220)','');
  s=rep(s,'fx(unis[i].x,unis[i].y,18,150)','');
  s=rep(s,"globalThis.onbeforeunload=e=>state==='play'&&(e.preventDefault(),e.returnValue='');",'');
  s=rep(s,"globalThis.onerror=()=>{state='title';paused=0;requestAnimationFrame(frame)};",'');
  return s
});
edit('src/herd.js',s=>{
  s=rep(s,'if(rng()<dt*10)fx(u.x,u.y,2,90)','');
  s=rep(s,'fx(x,y,2,55)','');
  s=rep(s,'updateCars(dt);updatePeople(dt);updateParts(dt);updateIntro(dt);','updateCars(dt);updatePeople(dt);updateIntro(dt);');
  s=rep(s,"function updatePeople(dt){for(let p of people){p.t-=dt;p.cool-=dt;let u,bd=999;for(let q of unis)if(q.live){let d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;u=q}}if(bd<(u&&u.cap?105:80)){let a=Math.atan2(p.y-u.y,p.x-u.x);p.vx+=Math.cos(a)*dt*520;p.vy+=Math.sin(a)*dt*520;if(p.cool<0){p.cool=2}}if(p.t<0){p.t=R(3,.9);p.vx+=R(45,-45);p.vy+=R(35,-35)}p.x=cl(p.x+p.vx*dt,18,WW-18);p.y=cl(p.y+p.vy*dt,18,WH-18);p.vx*=Math.pow(.12,dt);p.vy*=Math.pow(.12,dt)}}","function updatePeople(dt){for(let p of people){if((p.t-=dt)<0)p.t=R(3,.9),p.vx=R(45,-45),p.vy=R(35,-35);p.x=cl(p.x+p.vx*dt,18,WW-18);p.y=cl(p.y+p.vy*dt,18,WH-18)}}");
  return s
});
edit('src/whip.js',s=>rep(rep(s,'fx(u.x,u.y,6+n*2,120);',''),'fx(u.x,u.y,4+n,85);',''));
edit('src/top10.js',s=>{
  s=rep(s,'music(dt);','');
  s=rep(s,"fx(x,y,l.k==='hall'?46:26,240);",'');
  s=rep(s,'fx(c.x,c.y,8,120);','');
  return s
});
edit('src/expansion.js',s=>rep(rep(s,'fx(h.x+h.w/2,h.y+h.h/2,60,420);',''),'if(landWin===2&&rng()<dt*5)fx(R(WW),R(WH),8,220);',''));
edit('src/polish.js',s=>rep(s,"if(!done){X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.arc(sx,sy,r+6+Math.sin(clock*7)*2,0,T);X.stroke()}",''));
let p=JSON.parse(fs.readFileSync('package.json','utf8'));p.version='0.63.0';fs.writeFileSync('package.json',JSON.stringify(p));
console.log('v0.63c quality-balanced source applied: houses/street furniture/awnings/windows/full people/rainbow trails retained; people use cheap wandering motion');
