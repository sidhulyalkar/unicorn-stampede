import fs from'node:fs';import{submissionSource,particleCuts}from'./release-submit.mjs';
const files=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],raw=files.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),s=submissionSource(raw);
new Function(s);
for(let a of particleCuts)if(s.includes(a))throw Error('particle cut leaked: '+a);
for(let a of ['function drawPeople','function updatePeople','trail(u)','drawTownBuilding','WASHWATER BAY','C.oncontextmenu=C.onselectstart=C.ondragstart','SHIFT ×3','TO SMASH HALL → TEAM UP'])if(!s.includes(a))throw Error('quality spine missing: '+a);
for(let a of ['_startLevel','_soloStart','_startW','_plusStart','_soloUpdate','_plusUpdate','_soloWorldDraw','_plusHit'])if(s.includes(a))throw Error('wrapper alias leaked: '+a);
console.log('v0.62 release submit: PASS particles removed, complete moving people + town/world/tutorial/browser quality spine retained, wrappers staticized');
