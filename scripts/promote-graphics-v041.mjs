import fs from'node:fs';
let f='src/render.js',s=fs.readFileSync(f,'utf8');
let district="if(level){let dn=zone===1?['WHARF','MARKET','MARINA','EAST DOCKS']:['OLD TOWN','MARKET','GARDENS','RIVERSIDE'];for(let i=0;i<4;i++){let x=i%2*WW/2,y=(i>1)*WH/2;X.fillStyle=`hsla(${70+i*55} 35% 65%/.07)`;X.fillRect(x,y,WW/2,WH/2);X.fillStyle='#173027';text(dn[i],x+WW/4,y+95,46,'center',.18)}X.strokeStyle='rgba(255,255,255,.12)';X.lineWidth=5;X.setLineDash([30,30]);X.beginPath();X.moveTo(WW/2,0);X.lineTo(WW/2,WH);X.stroke();X.setLineDash([])}";
let district2="if(level)for(let i=0;i<4;i++){let x=i%2*WW/2,y=(i>1)*WH/2;X.fillStyle=`hsla(${70+i*55} 35% 65%/.05)`;X.fillRect(x,y,WW/2,WH/2)}";
let road="for(let r of roads){X.fillStyle=level&&zone===1?'#394853':'#3e4651';X.fillRect(...r);";
let road2="for(let r of roads){X.fillStyle='#969888';X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10);X.fillStyle=level&&zone===1?'#354650':'#39424d';X.fillRect(...r);";
let wall="X.fillStyle=`hsl(${o.hue} 40% 52%)`;rr(x,y,w,h,9);";
let wall2="X.fillStyle='#0003';rr(x+6,y+6,w,h,9);X.fillStyle=`hsl(${o.hue} 34% 50%)`;rr(x,y,w,h,9);";
for(let [a,b,n]of[[district,district2,'district hierarchy'],[road,road2,'curb grammar'],[wall,wall2,'building depth']]){if(!s.includes(a))throw Error('missing '+n+' marker');s=s.replace(a,b)}
fs.writeFileSync(f,s);
let w='src/worlds.js',v=fs.readFileSync(w,'utf8');
if(!v.includes("msg='HARBOR DISTRICT • OPEN QUAYS'"))throw Error('missing Washwater framing marker');
v=v.replace("msg='HARBOR DISTRICT • OPEN QUAYS'","msg='HARBOR • OPEN QUAYS'");
fs.writeFileSync(w,v);
let q='scripts/washwater-smoke.mjs',a=fs.readFileSync(q,'utf8');a=a.replace('HARBOR DISTRICT • OPEN QUAYS','HARBOR • OPEN QUAYS');fs.writeFileSync(q,a);
fs.writeFileSync('scripts/graphics-v041-smoke.mjs',`import fs from'node:fs';\nlet s=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8');\nfor(let q of ["X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10)","rr(x+6,y+6,w,h,9)","34% 50%","35% 65%/.05"])if(!s.includes(q))throw Error('missing v0.41 graphics contract: '+q);\nfor(let q of ["X.moveTo(WW/2,0)","OLD TOWN","EAST DOCKS"])if(s.includes(q))throw Error('retired visual clutter returned: '+q);\nif(!w.includes("msg='HARBOR • OPEN QUAYS'"))throw Error('compact harbor framing missing');\nconsole.log('graphics v0.41: PASS quiet districts + curb shoulders + grounded building shadows + calmer facade material');\n`);
let p='package.json',j=JSON.parse(fs.readFileSync(p,'utf8'));j.version='0.41.0';let t=j.scripts.test;if(!t.includes('scripts/graphics-v041-smoke.mjs')){t=t.replace('node --check scripts/whip-render-smoke.mjs','node --check scripts/whip-render-smoke.mjs && node --check scripts/graphics-v041-smoke.mjs').replace('node scripts/whip-render-smoke.mjs','node scripts/whip-render-smoke.mjs && node scripts/graphics-v041-smoke.mjs')}j.scripts.test=t;fs.writeFileSync(p,JSON.stringify(j)+'\n');
