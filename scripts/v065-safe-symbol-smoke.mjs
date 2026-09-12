import fs from'node:fs';import{submissionSource,particleCuts}from'./release-submit.mjs';
const files=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],s=submissionSource(files.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'));
new Function(s);for(let a of particleCuts)if(s.includes(a))throw Error('particle cut leaked '+a);
for(let a of ['function xf(a,b,c,d){X.fillRect(a,b,c,d)}','function xb(){X.beginPath()}','function xl(a,b){X.lineTo(a,b)}','function xa(a,b,c,d,e){X.arc(a,b,c,d,e)}','function cf(v){X.fillStyle=v}','function cs(v){X.strokeStyle=v}','function cw(v){X.lineWidth=v}','mh=MM.hypot','ms=MM.sin','drawTownStreetDecor();','function drawPeople','function updatePeople','trail(u)','WASHWATER BAY','#d2bc92','SHIFT ×3','TO SMASH HALL → TEAM UP',"e.code==='Space'"])if(!s.includes(a))throw Error('v0.65 symbol/quality marker missing '+a);
for(let a of ['...a){X.fillRect','.bind(X)','with('])if(s.includes(a))throw Error('unsafe/allocating symbol form leaked '+a);
if(s.split('X.fillRect(').length-1!==1)throw Error('fillRect not fully routed through fixed helper');
if(s.split('X.beginPath()').length-1!==1)throw Error('beginPath not fully routed through fixed helper');
console.log('v0.65 safe symbols: PASS fixed-arity canvas kernel + Math aliases + full visual/gameplay spine + street life');
