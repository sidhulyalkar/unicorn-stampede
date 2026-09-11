import fs from'node:fs';
let s=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8');
for(let q of ["X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10)","rr(x+6,y+6,w,h,9)","34% ${50+d*20}%"])if(!s.includes(q))throw Error('missing v0.41 graphics contract: '+q);
for(let q of ["X.moveTo(WW/2,0)","OLD TOWN","EAST DOCKS","35% 65%/.05"])if(s.includes(q))throw Error('retired visual clutter returned: '+q);
if(!w.includes('x=[1380,1450,1510,1470,1400,1340]'))throw Error('waterfront river geometry missing');
console.log('graphics v0.41: PASS quiet districts + curb shoulders + grounded building shadows + damage-readable facade material');
