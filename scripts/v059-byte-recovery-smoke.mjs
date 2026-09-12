import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8');
for(let q of ["zone<2?'#d2bc92':'#74889a'",'shopHue','drawTownBuilding','drawTownAwning','drawShopProps','drawTownStreetDecor'])if(!r.includes(q))throw Error('missing v0.59 visual authority: '+q);
for(let q of ['townBody=','townRoof=','houseBody=','houseRoof=','drawTownIcon'])if(r.includes(q))throw Error('uncompressed v0.58 art table survived: '+q);
if(!r.includes("'#567f8c'"))throw Error('Washwater cool riverbank contrast missing');
console.log('v0.59: PASS sandy Washwater + compact mixed-use visual grammar + preserved cool-water contrast');
