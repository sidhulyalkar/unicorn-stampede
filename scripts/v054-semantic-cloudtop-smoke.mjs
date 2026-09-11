import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8'),c=fs.readFileSync('src/core.js','utf8');
for(let q of ["['()','$','[]','~','*']","'STARTUP'","'YOGA'","'FARMERS'","'#a43b4f'","'#7ff'","[38,r[2]-42]"])if(!r.includes(q))throw Error('missing compact v0.54 semantic/SF visual contract: '+q);
for(let q of ["n=k+3,g=k&1||k>3","h-100-g*14","function sign("])if(r.includes(q))throw Error('retired facade/render overhead survived v0.54: '+q);
for(let q of ["h[i].x=400+i*460","cars=cars.filter(c=>!c.dir)","wind*(90+stamp*8)*dt"])if(!w.includes(q))throw Error('Cloudtop runtime identity changed: '+q);
if(!c.includes('zone==2&&[400,860,1320,1780,2240,2700]'))throw Error('Cloudtop future barrier reservation changed');
console.log('v0.54 semantic Cloudtop: PASS compact semantic signs + farmers market + tall facades + rails + cable cars + robotaxis; gameplay topology unchanged');
