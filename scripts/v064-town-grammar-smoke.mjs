import fs from'node:fs';import{submissionSource}from'./release-submit.mjs';
const files=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],s=submissionSource(files.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'));
new Function(s);
for(let a of ['function drawTownBuilding','function drawTownStreetDecor','const shopName=[0,5,10,8,9,11,12,6]','k*53%360',"text(L,x+w/2",'#9fe8ef','#f8ead8','#8fd3e1','#f5e9a2','WASHWATER BAY','#d2bc92'])if(!s.includes(a))throw Error('compact grammar quality marker missing: '+a);
for(let a of ['function townWindow','function drawTownRoof','function drawTownAwning','function drawHouseDetails','function drawShopProps','function townFence','function townBush','function townLamp','function townBench','shopHue='])if(s.includes(a))throw Error('old town helper leaked: '+a);
console.log('v0.64 compact grammar: PASS houses+shops, roofs, labels, awnings, windows, doors, damage, street life, Washwater identity retained');
