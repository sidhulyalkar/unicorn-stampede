import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8'),c=fs.readFileSync('src/core.js','utf8');
for(let q of ['drawTownBuilding','drawTownRoof','drawTownAwning','townWindow','drawHouseDetails','drawShopProps','drawTownStreetDecor'])if(!r.includes(q))throw Error('missing v0.59 town visual grammar: '+q);
for(let q of ["'O$#~*+%@'[k]","y+h/3,60,'center'",'drawTownIcon'])if(r.includes(q))throw Error('retired facade overhead returned: '+q);
for(let q of ["h[i].x=400+i*460","cars=cars.filter(c=>!c.dir)","(mode?90:58)+stamp*8"])if(!w.includes(q))throw Error('Cloudtop gameplay identity changed: '+q);
if(!c.includes('zone==2&&[400,860,1320,1780,2240,2700]'))throw Error('Cloudtop topology reservation changed');
console.log('v0.55/v0.59 storefront lineage: PASS modular roofs + awnings + windows + signs + residential/prop grammar; gameplay topology unchanged');
