import fs from'node:fs';
const rw=(p,f)=>{let s=fs.readFileSync(p,'utf8'),n=f(s);if(n!==s)fs.writeFileSync(p,n)},r=(s,a,b)=>{if(s.includes(b))return s;if(!s.includes(a))throw Error('anchor missing: '+a.slice(0,90));return s.replace(a,()=>b)};
rw('src/worlds.js',s=>{
 s=r(s,"let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0,BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP'.split(',');","let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0,BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP'.split(','),SN='BAKERY,BANK,BOOKS,CAFE,FLORIST,MARKET,TOYS,ARCADE'.split(','),SI='O$#~*+%@';");
 s=r(s,"addEventListener('keydown',e=>{if(state==='title'&&(e.code==='KeyA'||e.code==='KeyD'))","function shopKinds(){let i=0;for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7}\naddEventListener('keydown',e=>{if(state==='title'&&(e.code==='KeyA'||e.code==='KeyD'))");
 s=r(s,"_startW(n);if(n&&zone)zone>1?heights():harbor();wind=1;windT=2;chains=0;","_startW(n);if(n&&zone)zone>1?heights():harbor();shopKinds();wind=1;windT=2;chains=0;");
 s=r(s,"u.vx+=wind*(90+stamp*8)*dt","u.vx+=wind*((mode?90:58)+stamp*8)*dt");
 return s;
});
rw('src/render.js',s=>{
 s=r(s,"let d=1-o.hp/o.max,k=(o.hue/72|0)%5,x=o.x,y=o.y,w=o.w,h=o.h,g=k&1||k>3;","let d=1-o.hp/o.max,k=o.k,x=o.x,y=o.y,w=o.w,h=o.h,g=k&1||k>3;");
 s=r(s,"text(f*k==4?'Y':'O$#~*'[k],x+w/2,y+h/3,44,'center');text(o.ln||(f*k==1?'STARTUP':f*k==4?'YOGA':k?k==4?'FLORIST':'':'BAKERY'),x+w/2,y+h-68,13,'center')","text(SI[k],x+w/2,y+h/3,60,'center');text(o.ln||(level&&zone==1?(BN[k]||SN[k]):level&&zone==2?(k==1?'STARTUP':k==2?'YOGA':SN[k]):SN[k]),x+w/2,y+h-68,13,'center')");
 return s;
});
rw('src/expansion.js',s=>{
 s=r(s,"chaos=()=>.28+mode*.025+(plus?Math.min(heat,8)*.01:0)","chaos=()=>.28+mode*.025-(mode?0:.03+zone*.01)+(plus?Math.min(heat,8)*.01:0)");
 s=r(s,"stageGoal=.5+zone*.03+mode*.04+plus*(.06+Math.min(heat,9)*.018);distGoal=stageGoal*.58;if(n){let q=1+mode*.22;for(let o of objs)if(o.hp<999)o.hp=o.max*=q;if(mode)ups=ups.filter((p,i)=>!(i%(mode+1)));for(let c of cars)c.v*=1+mode*.09;","stageGoal=.5+zone*.03+mode*.04-(mode?0:.04+zone*.05)+plus*(.06+Math.min(heat,9)*.018);distGoal=stageGoal*.58;if(n){let q=mode?1+mode*.22:.9-zone*.03;for(let o of objs)if(o.hp<999)o.hp=o.max*=q;if(mode)ups=ups.filter((p,i)=>!(i%(mode+1)));for(let c of cars)c.v*=mode?1+mode*.09:1-zone*.04;if(!mode&&zone==1){cleaners.length=Math.min(cleaners.length,1);for(let c of cleaners)c.v*=.8}");
 s=r(s,"if(cleaners.length<9+mode)addClean(1+(mode>1))","if(cleaners.length<9+mode&&(mode||n&1))addClean(1+(mode>1))");
 s=r(s,"addClean(2+(heat>5)+(mode>0)+(mode>2));lmText='TAKEOVER", "addClean(1+2*(mode>0)+(heat>5)+(mode>2));lmText='TAKEOVER");
 return s;
});
rw('src/top10.js',s=>r(s,"if(level){addClean(2);if(w===3)","if(level){addClean(mode?2:1);if(w===3)"));
rw('scripts/difficulty-smoke.mjs',s=>{
 s=r(s,"if(Math.abs(n.goal-.5)>.001)throw Error('NORMAL must preserve 50% Prisborough target')","if(Math.abs(n.goal-.46)>.001)throw Error('EASY must use the forgiving 46% Prismborough target')");
 s=s.replace('difficulty v0.36: PASS normal=${n.goal.toFixed(2)}','difficulty v0.56: PASS easy=${n.goal.toFixed(2)}');return s;
});
rw('scripts/v054-semantic-cloudtop-smoke.mjs',s=>{
 s=s.replace("\"'O$#~*'\",",'');
 s=s.replace('"wind*(90+stamp*8)*dt"','"(mode?90:58)+stamp*8"');return s;
});
rw('scripts/v055-structured-storefronts-smoke.mjs',s=>{
 s=s.replace("\"'O$#~*'\",",'').replace("\"y+h/3,44,'center'\"","\"y+h/3,60,'center'\"");return s;
});
const v56=`import fs from'node:fs';import vm from'node:vm';
const H={},on=(n,f,c)=>(H[n]??=[]).push({f,c:!!c}),ctx=new Proxy({createLinearGradient:()=>({addColorStop(){}}),measureText:()=>({width:10})},{get:(o,k)=>k in o?o[k]:(()=>{})}),C={getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:1280,height:720}),addEventListener:(n,f,c)=>on('c:'+n,f,c)},node=()=>({gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}},frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},start(){},stop(){}});class AudioContext{constructor(){this.currentTime=0;this.destination={}}createGain(){return node()}createOscillator(){return node()}}
const box={console,Math,Date,Uint8Array,AudioContext,localStorage:{},document:{getElementById:()=>C,createElement:()=>({width:0,height:0,getContext:()=>ctx})},addEventListener:(n,f,c)=>on(n,f,c),requestAnimationFrame:()=>{}};vm.createContext(box);vm.runInContext(['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'].map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),box);const e=s=>vm.runInContext(s,box),start=(z,m,n=1)=>{e(\`S.s('ccC2',0);S.s('ccMode',\${m});zone=\${z};state='title';startLevel(\${n})\`);return{goal:e('stageGoal'),k:e("objs.filter(o=>o.t==='b').map(o=>o.k)"),clean:e('cleaners.length')}};
let t=start(2,0,0);if(new Set(t.k).size!==8||t.k.length!==8)throw Error('tutorial must expose exactly eight stable storefront identities');if(e("objs.find(o=>o.lm==='bakery').k")!==0)throw Error('tutorial bakery must own semantic slot 0');e("objs.find(o=>o.lm==='bakery').hue=72");if(e("objs.find(o=>o.lm==='bakery').k")!==0)throw Error('bakery semantics must not depend on hue');
let easy=[0,1,2].map(z=>start(z,0));for(let z=0;z<3;z++){if(new Set(easy[z].k).size!==8)throw Error('world '+z+' must contain all eight storefront identities');for(let i=1;i<easy[z].k.length;i++)if(easy[z].k[i]===easy[z].k[i-1])throw Error('adjacent generated shops repeated in world '+z)}let eg=easy.map(x=>+x.goal.toFixed(2));if(eg.join()!= '0.46,0.44,0.42')throw Error('Easy world targets wrong: '+eg);if(easy[1].clean!==1)throw Error('Washwater Easy must start with one cleanup vehicle');
let med=[0,1,2].map(z=>start(z,1).goal.toFixed(2));if(med.join()!= '0.54,0.57,0.60')throw Error('Medium targets must remain unchanged: '+med);
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8'),x=fs.readFileSync('src/expansion.js','utf8');for(let q of ['k=o.k','SI[k]',"y+h/3,60,'center'","SN[k]"])if(!r.includes(q))throw Error('stable/larger storefront rendering missing: '+q);if(r.includes('(o.hue/72|0)%5'))throw Error('render still derives storefront semantics from hue');for(let q of ['function shopKinds()','1+i++%7','(mode?90:58)+stamp*8'])if(!w.includes(q))throw Error('world identity/Easy wind contract missing: '+q);for(let q of [".04+zone*.05",".9-zone*.03","1-zone*.04","cleaners.length=Math.min(cleaners.length,1)"])if(!x.includes(q))throw Error('map-aware Easy contract missing: '+q);console.log('v0.56 town identity + map-aware Easy: PASS 8 stable types/world; tutorial bakery stable; Easy goals 46/44/42; Medium unchanged');
`;
fs.writeFileSync('scripts/v056-town-difficulty-smoke.mjs',v56);
let j=JSON.parse(fs.readFileSync('package.json','utf8'));j.version='0.56.0';if(!j.scripts.test.includes('v056-town-difficulty-smoke.mjs'))j.scripts.test=j.scripts.test.replace('&& node --check scripts/v055-structured-storefronts-smoke.mjs','&& node --check scripts/v055-structured-storefronts-smoke.mjs && node --check scripts/v056-town-difficulty-smoke.mjs').replace('&& node scripts/v055-structured-storefronts-smoke.mjs && node scripts/prune-audit.mjs','&& node scripts/v055-structured-storefronts-smoke.mjs && node scripts/v056-town-difficulty-smoke.mjs && node scripts/prune-audit.mjs');fs.writeFileSync('package.json',JSON.stringify(j));
console.log('staged v0.56 stable 8-type towns + larger logos + map-aware Easy tuning');