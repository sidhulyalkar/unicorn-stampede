import fs from'node:fs';import{submissionSource}from'./release-submit.mjs';
const F=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'];
const raw=F.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),s=submissionSource(raw),submit=fs.readFileSync('scripts/release-submit.mjs','utf8');
new Function(s);
if(submit.includes('qualityFit')||submit.includes('release-quality-fit'))throw Error('v0.66 graphical quality-fit transform must not enter rich release path');
for(const a of ['PRISMBOROUGH','WASHWATER BAY','CLOUDTOP HEIGHTS','function harbor','function heights','function drawTownBuilding','function drawTownStreetDecor','function drawPeople','function updatePeople','trail(u)',"#f8ead8",'#9fe8ef','#fff7','#8fd3e1','#f5e9a2','#795640','#efc3a2'])if(!s.includes(a))throw Error('rich three-world marker missing: '+a);
for(const a of [
"if((x/560|0)&1){X.fillStyle='#795640';X.fillRect(x+30,r[1]-22,38,6);X.fillRect(x+34,r[1]-14,30,5)}",
"for(let i=2;i--;){let a=x+14+i*(w-66);X.fillStyle='#f7ead8';X.fillRect(a-3,z-3,40,36);X.fillStyle='#9fe8ef';X.fillRect(a,z,34,30);X.fillStyle='#fff7';X.fillRect(a+16,z,2,30)}",
"for(let i=5,s=(w-20)/5;i--;){X.fillStyle=i&1?'#f8ead8':c;X.fillRect(x+10+i*s,y+47,s+1,17)}",
"townCircle(x+20,y+h-8,12,'#47794b');townCircle(x+w-20,y+h-8,12,'#527d50');",
"X.fillStyle=`hsl(${H} 65% 48%)`;k&1?townCircle(x+18,y+h-13,7):X.fillRect(x+10,y+h-18,18,10)"
])if(!s.includes(a))throw Error('rich facade/street detail missing: '+a.slice(0,70));
if(s.includes("townCircle(p.x,p.y,9,`hsl(${p.h} 45% 70%)`);X.fillStyle='#263242';X.fillRect(p.x-2,p.y+8,4,25)"))throw Error('simplified v0.66 civilian renderer leaked into rich branch');
console.log('v0.67 rich three worlds: PASS Prismborough + Washwater + Cloudtop + striped awnings + framed windows + two-bush houses + shop accents + benches/lamps + detailed civilians + trails');
