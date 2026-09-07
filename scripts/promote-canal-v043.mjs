import fs from'node:fs';
function swap(s,a,b,n){if(!s.includes(a))throw Error('missing '+n);return s.replace(a,b)}
let f='src/worlds.js',s=fs.readFileSync(f,'utf8');
s=swap(s,"function harbor(){roads.splice(1,1);roads[0][2]=140;roads[1][2]=160;objs=objs.filter(o=>o.t!=='hedge');cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630}","function harbor(){roads.splice(1,1);roads[0][2]=140;roads[1][2]=160;let h=objs.filter(o=>o.t==='hedge'),a=[0,270,730,930,1320,1560];for(let i=6;i--;)h[i].x=1540,h[i].y=a[i],h[i].w=180,h[i].h=i<2?270:i<4?200:240;cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630;ups[2].y=630;ups[6].y=1225}",'canal blockers');
s=swap(s,"if(zone===1){addClean(2);for(let c of cleaners)c.v*=1.35;msg='HARBOR • OPEN QUAYS';msgT=2}","if(zone===1){addClean(2);for(let c of cleaners)c.v*=1.35}",'retire redundant harbor toast');
let old="const _worldW=world;world=function(){_worldW();if(!level||!zone)return;X.save();X.translate(ox,oy);X.scale(z,z);if(zone===1){X.strokeStyle='#9de8ff22';for(let i=6;i--;){let x=(i*379+clock*130)%WW,y=(i*211+clock*260)%WH;X.beginPath();X.moveTo(x,y);X.lineTo(x-18,y+36);X.stroke()}}else{X.fillStyle='rgba(245,250,255,.09)';for(let i=0;i<7;i++){let x=(i*510+clock*wind*45)%3500-120,y=180+(i%3)*560;X.beginPath();X.ellipse(x,y,180,70,0,0,T);X.fill()}}X.restore()};";
let neo="const _worldW=world;world=function(){_worldW();if(!level||zone!==2)return;X.save();X.translate(ox,oy);X.scale(z,z);X.fillStyle='rgba(245,250,255,.09)';for(let i=0;i<7;i++){let x=(i*510+clock*wind*45)%3500-120,y=180+(i%3)*560;X.beginPath();X.ellipse(x,y,180,70,0,0,T);X.fill()}X.restore()};";
s=swap(s,old,neo,'retire harbor shimmer');fs.writeFileSync(f,s);

f='src/render.js';s=fs.readFileSync(f,'utf8');
s=swap(s,"if(level&&zone===1){X.fillStyle='#567f8c';X.fillRect(1540,0,180,WH)}",'', 'retire fake quay');
old="if(level)for(let x of zone===1?[760,2320]:[760,1540,2320])for(let y of [540,1130]){X.fillStyle='rgba(245,240,220,.72)';for(let k=0;k<(zone===1?4:5);k++){X.fillRect(x+10+k*34,y+8,18,58);X.fillRect(x+10+k*34,y+124,18,58)}}";
neo="if(level&&zone!==1)for(let x of [760,1540,2320])for(let y of [540,1130]){X.fillStyle='rgba(245,240,220,.72)';for(let k=0;k<5;k++){X.fillRect(x+10+k*34,y+8,18,58);X.fillRect(x+10+k*34,y+124,18,58)}}";
s=swap(s,old,neo,'retire harbor crosswalk clutter');
old="if(o.t==='hedge'){X.fillStyle='#315b3b';rr(o.x,o.y,o.w,o.h,18);X.fillStyle='#527e50';for(let x=o.x+15;x<o.x+o.w;x+=34){X.beginPath();X.arc(x,o.y+o.h/2,16,0,T);X.fill()}continue}";
neo="if(o.t==='hedge'){if(zone===1){X.fillStyle='#567f8c';X.fillRect(o.x,o.y,o.w,o.h)}else{X.fillStyle='#315b3b';rr(o.x,o.y,o.w,o.h,18);X.fillStyle='#527e50';for(let x=o.x+15;x<o.x+o.w;x+=34){X.beginPath();X.arc(x,o.y+o.h/2,16,0,T);X.fill()}}continue}";
s=swap(s,old,neo,'canal water renderer');fs.writeFileSync(f,s);

f='src/top10.js';s=fs.readFileSync(f,'utf8');
s=swap(s,"y:[630,1225,920,1500][cleaners.length%4]","y:[630,1225,920,1500][cleaners.length%(zone===1?2:4)]",'bridge cleaner lanes');fs.writeFileSync(f,s);

f='scripts/washwater-smoke.mjs';s=fs.readFileSync(f,'utf8');
s=swap(s,"if(e(\"objs.some(o=>o.t==='hedge')\"))throw Error('Washwater must open hedge lanes');","eq(e(\"objs.filter(o=>o.t==='hedge').map(o=>[o.x,o.y,o.w,o.h])\"),[[1540,0,180,270],[1540,270,180,270],[1540,730,180,200],[1540,930,180,200],[1540,1320,180,240],[1540,1560,180,240]],'canal blocker geometry drifted');",'canal geometry contract');
s=swap(s,"if(!e('ups[2].x===1630&&ups[6].x===1630'))throw Error('harbor promenade powerups moved');","if(!e('ups[2].x===1630&&ups[2].y===630&&ups[6].x===1630&&ups[6].y===1225'))throw Error('bridge powerups moved');if(!e('cleaners.every(c=>c.y===630||c.y===1225)'))throw Error('cleaners must use bridge lanes');",'bridge traffic contract');
s=swap(s,"if(e('msg')!=='HARBOR • OPEN QUAYS')throw Error('Washwater launch framing missing');","let vx=e(\"(()=>{let u=unis[0],o=objs.find(o=>o.t==='hedge');u.x=1600;u.y=100;u.vx=u.vy=0;collide(u,o,.1);return u.vx})()\");if(vx>=0)throw Error('canal must block unicorn crossing away from bridges');",'canal collision contract');
s=swap(s,"if(!rects.some(r=>r[0]==='#567f8c'&&r[1]===1540&&r[2]===0&&r[3]===180&&r[4]===1800))throw Error('flooded central quay missing');","if(rects.filter(r=>r[0]==='#567f8c'&&r[1]===1540&&r[3]===180).length!==6)throw Error('segmented canal water missing');if(rects.some(r=>r[0]==='#567f8c'&&r[4]===1800))throw Error('canal must leave bridge openings');",'segmented canal render contract');
s=swap(s,"if(rects.filter(r=>r[0]==='rgba(245,240,220,.72)'&&r[3]===18&&r[4]===58).length!==32)throw Error('Washwater bridge crosswalk count must be 32');","if(rects.some(r=>r[0]==='rgba(245,240,220,.72)'&&r[3]===18&&r[4]===58))throw Error('Washwater crosswalk clutter returned');",'harbor crosswalk retirement');
s=swap(s,"console.log('Washwater Bay v0.42: PASS streetWidths=140/160/190 themedStores=5 compactCaptain=1 crosswalks=32 floodedQuay=1 baseWorldUnchanged=1');","console.log('Washwater Bay v0.43: PASS canalSegments=6 bridges=2 blockedWater=1 bridgeCleaners=1 bridgePowerups=2 crosswalks=0 streetWidths=140/160/190 themedStores=5 baseWorldUnchanged=1');",'v043 report');fs.writeFileSync(f,s);

f='scripts/graphics-v041-smoke.mjs';s=fs.readFileSync(f,'utf8');s=swap(s,"if(!w.includes(\"msg='HARBOR • OPEN QUAYS'\"))throw Error('compact harbor framing missing');","if(!w.includes('h[i].x=1540'))throw Error('canal quarter geometry missing');",'graphics canal contract');fs.writeFileSync(f,s);

f='package.json';let j=JSON.parse(fs.readFileSync(f,'utf8'));j.version='0.43.0';fs.writeFileSync(f,JSON.stringify(j)+'\n');
