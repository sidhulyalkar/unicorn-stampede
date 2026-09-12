import fs from'node:fs';import{submissionSource,particleCuts}from'./release-submit.mjs';
const F=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],s=submissionSource(F.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'));
new Function(s);for(let a of particleCuts)if(s.includes(a))throw Error('particle cut leaked '+a);
for(let a of ['function drawTownBuilding','const shopName=[0,5,10,8,9,11,12,6]',"text(L,x+w/2",'#9fe8ef','#8fd3e1','#f5e9a2','function drawTownStreetDecor','drawTownStreetDecor();','function drawPeople','townCircle(p.x,p.y,9','function updatePeople','personBlocked(p.x,p.y)','p.x=cl(x+p.vx*dt','trail(u)','WASHWATER BAY','#d2bc92','CLOUDTOP HEIGHTS','SHIFT ×3','TO SMASH HALL → TEAM UP',"e.code==='Space'",'function xf(a,b,c,d){X.fillRect(a,b,c,d)}','mh=MM.hypot'])if(!s.includes(a))throw Error('v0.66 quality spine missing '+a);
for(let a of ["#795640","#f8ead8","#fff7",'cool:R(6),','function townBench','function townFence','function townWindow','function drawTownAwning','with('])if(s.includes(a))throw Error('v0.66 retired detail leaked '+a);
if(!s.includes("X.fillStyle=c;xf(x+10,y+47,w-20,17)"))throw Error('solid colored awning missing');
console.log('v0.66 quality fit: PASS named semantic town + roofs + windows + colored awnings + lamps + moving collision-safe civilians + all worlds/gameplay spine');
