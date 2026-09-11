import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8'),c=fs.readFileSync('src/core.js','utf8');
for(let q of ["y+h-65,w,10","for(let i=3;i--;)","i==1?'#432':'#bff'","y+h-48,36,i==1?48:28","y+h/3,60,'center'","y+h-68,13,'center'","'#a34'","'#7ff'"])if(!r.includes(q))throw Error('missing v0.55 structured storefront contract: '+q);
for(let q of ["n=k+3,g=k&1||k>3","h-100-g*14","y+h-12,36,12"])if(r.includes(q))throw Error('retired facade clutter returned: '+q);
for(let q of ["h[i].x=400+i*460","cars=cars.filter(c=>!c.dir)","(mode?90:58)+stamp*8"])if(!w.includes(q))throw Error('Cloudtop gameplay identity changed: '+q);
if(!c.includes('zone==2&&[400,860,1320,1780,2240,2700]'))throw Error('Cloudtop topology reservation changed');
console.log('v0.55 structured storefronts: PASS large semantic emblem + awning + paired windows + centered door; gameplay topology unchanged');
