import fs from'node:fs';import{releaseSource}from'./release-prune.mjs';
const F=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],raw=F.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),s=releaseSource(raw),a=s.indexOf('function collide('),b=s.indexOf('\nfunction autoSpray',a);
if(a<0||b<0)throw Error('collide function missing');
const collide=new Function('WW','WH','hitObj','rng','fx','return '+s.slice(a,b))(3200,1800,()=>{},()=>1,()=>{}),o={x:100,y:100,w:100,h:100,hp:100,val:0,t:'b'};
let u={x:205,y:150,vx:-100,vy:0,cap:0,distract:0,ai:0,tx:150,ty:150};collide(u,o,.016);if(u.ai<=0||u.tx!==u.x||u.ty===u.y)throw Error('side collision did not produce tangent escape target');
u={x:150,y:85,vx:0,vy:100,cap:0,distract:0,ai:0,tx:150,ty:150};collide(u,o,.016);if(u.ai<=0||u.ty!==u.y||u.tx===u.x)throw Error('top collision did not produce tangent escape target');
console.log('Cloudtop anti-stuck collision geometry: PASS');
