import fs from'node:fs';import{submissionSource,particleCuts}from'./release-submit.mjs';
const files=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],raw=files.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),s=submissionSource(raw);
new Function(s);
for(let a of particleCuts)if(s.includes(a))throw Error('particle cut leaked: '+a);
for(let a of ['function drawPeople','function updatePeople','trail(u)','drawTownBuilding','WASHWATER BAY','C.oncontextmenu=C.onselectstart=C.ondragstart','SHIFT ×3','TO SMASH HALL → TEAM UP'])if(!s.includes(a))throw Error('quality spine missing: '+a);
for(let a of ['_startLevel','_soloStart','_startW','_plusStart','_soloUpdate','_plusUpdate','_soloWorldDraw','_plusHit','const _day=today','const _rain=paintStamp','const _titleW=title'])if(s.includes(a))throw Error('wrapper/direct alias leaked: '+a);
for(let a of ["document.getElementById('c')",'const MM=Math,C=',"function drawTownRoof(x,y,w,k,H,house)","X.textAlign=['left','center','right'][a]","o.type=['sine','square','sawtooth','triangle'][t]","C.addEventListener('mousemove',point);","e.code[0]=='K'?e.code[3]:e.code","e.code==='Space'"])if(!s.includes(a))throw Error('representation contract missing: '+a);
for(let a of ["document.getElementById('game')||",'K.KeyD','K.KeyA','K.KeyS','K.KeyW','K[e.code]=','with('])if(s.includes(a))throw Error('old/unsafe representation leaked: '+a);
console.log('v0.63 release representation: PASS quality spine retained, Space/Enter/control identities preserved, safe compact forms active');
