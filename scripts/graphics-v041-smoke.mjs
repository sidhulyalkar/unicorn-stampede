import fs from'node:fs';
let s=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8');
for(let q of ["X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10)","rr(x+7,y+7,w,h,10)","X.globalAlpha=d*.35","drawTownBuilding"])if(!s.includes(q))throw Error('missing v0.41/v0.58 graphics contract: '+q);
for(let q of ["X.moveTo(WW/2,0)","OLD TOWN","EAST DOCKS","35% 65%/.05"])if(s.includes(q))throw Error('retired visual clutter returned: '+q);
if(!w.includes('x=[1380,1450,1510,1470,1400,1340]'))throw Error('waterfront river geometry missing');
console.log('graphics v0.41/v0.58: PASS curb shoulders + grounded town shadows + damage-readable facades + quiet districts');
