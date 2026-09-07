import fs from'node:fs';
function swap(s,a,b,n){if(!s.includes(a))throw Error('missing '+n);return s.replace(a,b)}
let f='src/worlds.js',s=fs.readFileSync(f,'utf8');
s=swap(s,"let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0;","let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0,BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP,FISH MARKET,LIGHTHOUSE'.split(',');",'bay name palette');
s=swap(s,"function harbor(){roads.splice(1,1);objs=objs.filter(o=>o.t!=='hedge');cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630}","function harbor(){roads.splice(1,1);let a=[0,20,0,25];for(let i=4;i--;)roads[i][4]=a[i];objs=objs.filter(o=>o.t!=='hedge');cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630;for(let i=5;i--;)LM[i].n=BN[[0,5,4,6,1][i]]}",'harbor specialization');
fs.writeFileSync(f,s);

f='src/render.js';s=fs.readFileSync(f,'utf8');
let road="for(let r of roads){X.fillStyle='#969888';X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10);X.fillStyle=level&&zone===1?'#354650':'#39424d';X.fillRect(...r);X.strokeStyle='#c8b76d';X.lineWidth=3;X.setLineDash([28,28]);X.beginPath();if(r[2]>r[3]){X.moveTo(r[0],r[1]+r[3]/2);X.lineTo(r[0]+r[2],r[1]+r[3]/2)}else{X.moveTo(r[0]+r[2]/2,r[1]);X.lineTo(r[0]+r[2]/2,r[1]+r[3])}X.stroke();X.setLineDash([])}";
let road2="for(let r of roads){let e=r[4]||0,h=r[2]>r[3];X.fillStyle=level&&zone===1?'#b9aa82':'#969888';X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10);X.fillStyle=level&&zone===1?'#354650':'#39424d';h?X.fillRect(r[0],r[1]+e,r[2],r[3]-e*2):X.fillRect(r[0]+e,r[1],r[2]-e*2,r[3]);X.strokeStyle='#c8b76d';X.lineWidth=3;X.setLineDash([28,28]);X.beginPath();if(h){X.moveTo(r[0],r[1]+r[3]/2);X.lineTo(r[0]+r[2],r[1]+r[3]/2)}else{X.moveTo(r[0]+r[2]/2,r[1]);X.lineTo(r[0]+r[2]/2,r[1]+r[3])}X.stroke();X.setLineDash([])}";
s=swap(s,road,road2,'road hierarchy renderer');
s=swap(s,"function drawObjs(){let shops=['BAKERY','BANK','BOOKS','CAFE','FLORIST'];","function drawObjs(){let shops=zone===1?BN:['BAKERY','BANK','BOOKS','CAFE','FLORIST'];",'bay shop names');
s=swap(s,"text('CLOCK TOWER',o.x+o.w/2,o.y+o.h-24,22,'center')","text(zone===1?BN[6]:'CLOCK TOWER',o.x+o.w/2,o.y+o.h-24,22,'center')",'lighthouse label');
s=swap(s,"text('MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')","text(zone===1?BN[5]:'MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')",'fish market label');
s=swap(s,"X.strokeStyle=side===1?'#a8f3ff':side===2?'#ffe36e':'rgba(255,255,255,.55)'","X.strokeStyle=side?'#a8f3ff':'rgba(255,255,255,.55)'",'captain arrow color');
s=swap(s,"X.fillStyle=side===1?'rgba(122,236,255,.13)':'rgba(255,226,108,.15)'","X.fillStyle='rgba(122,236,255,.13)'",'captain halo fill');
s=swap(s,"X.strokeStyle=side===1?'#a8f3ff':'#ffe36e'","X.strokeStyle='#a8f3ff'",'captain halo stroke');
s=swap(s,"X.fillStyle=side===2?'#ffe36e':'#fff';text((side===1?'WASD • ':side===2?'MOUSE • ':'')+u.name+(u.frenzy?' • RABID':u.distract?' • DISTRACTED':u.order?' • ORDER':''),u.x,u.y-(side?92:58),side?22/z:20/z,'center')","X.fillStyle='#fff';text(side?'WASD • '+u.name:u.name+(u.frenzy?' • RABID':u.distract?' • DISTRACTED':u.order?' • ORDER':''),u.x,u.y-(side?80:58),side?16/z:20/z,'center')",'compact captain label');
fs.writeFileSync(f,s);

f='scripts/washwater-smoke.mjs';s=fs.readFileSync(f,'utf8');
s=swap(s,"eq(e('roads'),[[760,0,180,1800],[2320,0,180,1800],[0,540,3200,190],[0,1130,3200,190]],'Washwater flooded-quay roads moved');","eq(e('roads'),[[760,0,180,1800,0],[2320,0,180,1800,20],[0,540,3200,190,0],[0,1130,3200,190,25]],'Washwater street hierarchy drifted');",'Washwater road contract');
s=swap(s,"if(e('LM.length')!==5||!e('LM.every(l=>l.os.every(o=>objs.includes(o)))'))throw Error('all five landmarks must survive harbor specialization');","if(e('LM.length')!==5||!e('LM.every(l=>l.os.every(o=>objs.includes(o)))'))throw Error('all five landmarks must survive harbor specialization');eq(e('LM.map(l=>l.n)'),['CANDY STORE','FISH MARKET','BAIT SHOP','LIGHTHOUSE','YACHT CLUB'],'Washwater landmark names drifted');eq(e('BN.slice(0,5)'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP'],'Washwater shop palette drifted');",'bay landmark identity contract');
s=swap(s,"if(!rects.some(r=>r[0]==='#567f8c'&&r[1]===1540&&r[2]===0&&r[3]===180&&r[4]===1800))throw Error('flooded central quay missing');","if(!rects.some(r=>r[0]==='#567f8c'&&r[1]===1540&&r[2]===0&&r[3]===180&&r[4]===1800))throw Error('flooded central quay missing');if(!rects.some(r=>r[0]==='#354650'&&r[1]===2340&&r[2]===0&&r[3]===140&&r[4]===1800)||!rects.some(r=>r[0]==='#354650'&&r[1]===0&&r[2]===1155&&r[3]===3200&&r[4]===140))throw Error('Washwater variable asphalt widths missing');if(!rects.some(r=>r[0]==='#b9aa82'))throw Error('Washwater promenade shoulder missing');",'visible street hierarchy contract');
s=swap(s,"console.log('Washwater Bay harbor: PASS roads=4 floodedQuay=1 openHedges=0 landmarks=5 promenadePowerups=2 centerTraffic=0 crosswalks=40 renderPure=1 baseWorldUnchanged=1');","if(!fs.readFileSync('src/render.js','utf8').includes(\"side?'WASD • '+u.name\"))throw Error('compact captain label missing');console.log('Washwater Bay v0.42: PASS streetWidths=4 themedStores=5 themedLandmarks=5 compactCaptain=1 floodedQuay=1 baseWorldUnchanged=1');",'Washwater final report');
fs.writeFileSync(f,s);

f='package.json';let j=JSON.parse(fs.readFileSync(f,'utf8'));j.version='0.42.0';fs.writeFileSync(f,JSON.stringify(j)+'\n');
