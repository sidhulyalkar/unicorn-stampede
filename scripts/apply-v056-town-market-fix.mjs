import fs from'node:fs';
const rw=(p,a,b)=>{let s=fs.readFileSync(p,'utf8');if(s.includes(b))return;if(!s.includes(a))throw Error('v0.56 venue anchor missing: '+a.slice(0,80));fs.writeFileSync(p,s.replace(a,()=>b))};
rw('src/worlds.js',"BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP'.split(','),SN=","BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP,DOCK CAFE,FISH MARKET,FERRY'.split(','),SN=");
rw('src/worlds.js',"function shopKinds(){let i=0;for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7}","function shopKinds(){let i=0,j=0;for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7;else if(o.t==='stall')o.k=j++%4}");
rw('src/render.js',"text(f?'FARMERS':o.ln||'MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')","text(f?(zone==1?BN[o.k+4]:o.k?o.k==1?'STARTUP':o.k==2?'YOGA':'CAFE':'FARMERS'):o.ln||'MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')");
console.log('v0.56 venue fix: existing market stalls provide unique harbor/hill-city venue identities; no collision geometry added');
