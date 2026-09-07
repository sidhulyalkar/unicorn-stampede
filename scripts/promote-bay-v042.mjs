import fs from'node:fs';
function swap(s,a,b,n){if(!s.includes(a))throw Error('missing '+n);return s.replace(a,b)}
let f='src/worlds.js',s=fs.readFileSync(f,'utf8');
s=swap(s,"let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0;","let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0,BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP'.split(',');",'bay name palette');
s=swap(s,"function harbor(){roads.splice(1,1);objs=objs.filter(o=>o.t!=='hedge');cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630}","function harbor(){roads.splice(1,1);roads[0][2]=140;roads[1][2]=160;objs=objs.filter(o=>o.t!=='hedge');cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630}",'harbor street hierarchy');
fs.writeFileSync(f,s);

f='src/render.js';s=fs.readFileSync(f,'utf8');
s=swap(s,"function drawObjs(){let shops=['BAKERY','BANK','BOOKS','CAFE','FLORIST'];","function drawObjs(){let shops=zone===1?BN:['BAKERY','BANK','BOOKS','CAFE','FLORIST'];",'bay shop names');
s=swap(s,"text(shops[k],x+w/2,y+h-14,13,'center')","text(o.ln||shops[k],x+w/2,y+h-14,13,'center')",'landmark-safe shop labels');
s=swap(s,"for(let k=0;k<5;k++){X.fillRect(x+10+k*34,y+8,18,58);X.fillRect(x+10+k*34,y+124,18,58)}","for(let k=0;k<(zone===1?4:5);k++){X.fillRect(x+10+k*34,y+8,18,58);X.fillRect(x+10+k*34,y+124,18,58)}",'harbor crosswalk scale');
s=swap(s,"X.strokeStyle=side===1?'#a8f3ff':side===2?'#ffe36e':'rgba(255,255,255,.55)'","X.strokeStyle=side?'#a8f3ff':'rgba(255,255,255,.55)'",'captain arrow color');
s=swap(s,"X.fillStyle=side===1?'rgba(122,236,255,.13)':'rgba(255,226,108,.15)'","X.fillStyle='rgba(122,236,255,.13)'",'captain halo fill');
s=swap(s,"X.strokeStyle=side===1?'#a8f3ff':'#ffe36e'","X.strokeStyle='#a8f3ff'",'captain halo stroke');
s=swap(s,"X.fillStyle=side===2?'#ffe36e':'#fff';text((side===1?'WASD • ':side===2?'MOUSE • ':'')+u.name+(u.frenzy?' • RABID':u.distract?' • DISTRACTED':u.order?' • ORDER':''),u.x,u.y-(side?92:58),side?22/z:20/z,'center')","X.fillStyle='#fff';text(side?'WASD • '+u.name:u.name+(u.frenzy?' • RABID':u.distract?' • DISTRACTED':u.order?' • ORDER':''),u.x,u.y-(side?80:58),side?16/z:20/z,'center')",'compact captain label');
fs.writeFileSync(f,s);

f='scripts/washwater-smoke.mjs';s=fs.readFileSync(f,'utf8');
s=swap(s,"eq(e('roads'),[[760,0,180,1800],[2320,0,180,1800],[0,540,3200,190],[0,1130,3200,190]],'Washwater flooded-quay roads moved');","eq(e('roads'),[[760,0,140,1800],[2320,0,160,1800],[0,540,3200,190],[0,1130,3200,190]],'Washwater street hierarchy drifted');",'Washwater road contract');
s=swap(s,"if(e('LM.length')!==5||!e('LM.every(l=>l.os.every(o=>objs.includes(o)))'))throw Error('all five landmarks must survive harbor specialization');","if(e('LM.length')!==5||!e('LM.every(l=>l.os.every(o=>objs.includes(o)))'))throw Error('all five landmarks must survive harbor specialization');eq(e('BN'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP'],'Washwater shop palette drifted');",'bay identity contract');
s=swap(s,"if(rects.filter(r=>r[0]==='rgba(245,240,220,.72)'&&r[3]===18&&r[4]===58).length!==40)throw Error('Washwater bridge crosswalk count must be 40');","if(rects.filter(r=>r[0]==='rgba(245,240,220,.72)'&&r[3]===18&&r[4]===58).length!==32)throw Error('Washwater bridge crosswalk count must be 32');if(!rects.some(r=>r[0]==='#354650'&&r[1]===760&&r[3]===140)||!rects.some(r=>r[0]==='#354650'&&r[1]===2320&&r[3]===160))throw Error('Washwater variable street widths missing');",'visible street hierarchy contract');
s=swap(s,"console.log('Washwater Bay harbor: PASS roads=4 floodedQuay=1 openHedges=0 landmarks=5 promenadePowerups=2 centerTraffic=0 crosswalks=40 renderPure=1 baseWorldUnchanged=1');","let rs=fs.readFileSync('src/render.js','utf8');if(!rs.includes(\"side?'WASD • '+u.name\")||!rs.includes('o.ln||shops[k]'))throw Error('compact label contract missing');console.log('Washwater Bay v0.42: PASS streetWidths=140/160/190 themedStores=5 compactCaptain=1 crosswalks=32 floodedQuay=1 baseWorldUnchanged=1');",'Washwater final report');
fs.writeFileSync(f,s);

f='package.json';let j=JSON.parse(fs.readFileSync(f,'utf8'));j.version='0.42.0';fs.writeFileSync(f,JSON.stringify(j)+'\n');
