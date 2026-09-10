import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8');
for(let q of ["function sign(","BAKERY,STARTUP,BOOKS,COFFEE,YOGA","'FARMERS'","'#a43b4f'","'#7ff'","[38,r[2]-42]"])if(!r.includes(q))throw Error('missing v0.54 semantic/SF visual contract: '+q);
for(let q of ["n=k+3,g=k&1||k>3","h-100-g*14"])if(r.includes(q))throw Error('generic facade clutter survived v0.54: '+q);
for(let q of ["cars=cars.filter(c=>!c.dir)","[400,860,1320,1780,2240,2700]","wind*(90+stamp*8)*dt"])if(!w.includes(q))throw Error('Cloudtop gameplay identity changed: '+q);
console.log('v0.54 semantic Cloudtop: PASS semantic signs + farmers market + tall facades + rails + cable cars + robotaxis; gameplay topology unchanged');
