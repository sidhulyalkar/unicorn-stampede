import fs from'node:fs';
const rw=(p,rs)=>{let s=fs.readFileSync(p,'utf8'),o=s;for(let[a,b]of rs){if(!s.includes(a))throw Error(p+' bytecut anchor missing: '+a.slice(0,100));s=s.replace(a,b)}if(s===o)throw Error(p+' unchanged');fs.writeFileSync(p,s)};
rw('src/worlds.js',[
["BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP,DOCK CAFE,FISH MARKET,FERRY'.split(','),SN='BAKERY,BANK,BOOKS,CAFE,FLORIST,MARKET,TOYS,ARCADE'.split(','),SI='O$#~*+%@'","BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP'.split(','),N='BAKERY,BANK,BOOKS,CAFE,FLORIST,MARKET,TOYS,ARCADE,BAIT,DOCK,FISH,FERRY,FARMERS,STARTUP,YOGA,CAFE'.split(',')"],
["function shopKinds(){let i=0,j=0;for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7;else if(o.t==='stall')o.k=j++%4}\n",'' ],
["_startW(n);if(n&&zone)zone>1?heights():harbor();shopKinds();wind=1;windT=2;chains=0;","_startW(n);if(n&&zone)zone>1?heights():harbor();let i=0;for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7;wind=1;windT=2;chains=0;"],
["if(zone===1){addClean(2);for(let c of cleaners)c.v*=1.35}","if(zone===1){addClean(mode?2:1);for(let c of cleaners)c.v*=mode?1.35:1.08}"]
]);
rw('src/render.js',[
["text(f?(zone==1?BN[o.k+4]:o.k?o.k==1?'STARTUP':o.k==2?'YOGA':'CAFE':'FARMERS'):o.ln||'MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')","text(level&&zone?N[8+(zone-1)*4+(objs.indexOf(o)&3)]:o.ln||'MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')"],
["text(SI[k],x+w/2,y+h/3,60,'center');text(o.ln||(level&&zone==1?(BN[k]||SN[k]):level&&zone==2?(k==1?'STARTUP':k==2?'YOGA':SN[k]):SN[k]),x+w/2,y+h-68,13,'center')","text('O$#~*+%@'[k],x+w/2,y+h/3,60,'center');text(o.ln||N[k],x+w/2,y+h-68,13,'center')"]
]);
rw('src/expansion.js',[
["chaos=()=>.28+mode*.025-(mode?0:.03+zone*.01)+(plus?Math.min(heat,8)*.01:0)","chaos=()=>(mode?.28+mode*.025:.25-zone*.01)+plus*Math.min(heat,8)*.01"],
["stageGoal=.5+zone*.03+mode*.04-(mode?0:.04+zone*.05)+plus*(.06+Math.min(heat,9)*.018);distGoal=stageGoal*.58;if(n){let q=mode?1+mode*.22:.9-zone*.03;for(let o of objs)if(o.hp<999)o.hp=o.max*=q;if(mode)ups=ups.filter((p,i)=>!(i%(mode+1)));for(let c of cars)c.v*=mode?1+mode*.09:1-zone*.04;if(!mode&&zone==1){cleaners.length=Math.min(cleaners.length,1);for(let c of cleaners)c.v*=.8}","let e=!mode;stageGoal=.5+zone*.03+mode*.04-e*(.04+zone*.05)+plus*(.06+Math.min(heat,9)*.018);distGoal=stageGoal*.58;if(n){let q=1+mode*.22-e*(.1+zone*.03);for(let o of objs)if(o.hp<999)o.hp=o.max*=q;if(mode)ups=ups.filter((p,i)=>!(i%(mode+1)));for(let c of cars)c.v*=1+mode*.09-e*zone*.04;"]
]);
rw('scripts/smoke.mjs',[["!rs.includes('STARTUP')","!fs.readFileSync('src/worlds.js','utf8').includes('STARTUP')"]]);
rw('scripts/washwater-smoke.mjs',[
["eq(e('BN'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP','DOCK CAFE','FISH MARKET','FERRY'],'Washwater shop palette drifted')","eq(e('BN'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP'],'Washwater landmark palette drifted')"],
["!rs.includes('k=o.k')||!rs.includes('BN[o.k+4]')","!rs.includes('k=o.k')||!rs.includes('N[8+(zone-1)*4+(objs.indexOf(o)&3)]')"]
]);
rw('scripts/v047-waterfront-smoke.mjs',[["\"zone==1?BN[o.k+4]\"","\"N[8+(zone-1)*4+(objs.indexOf(o)&3)]\""]]);
rw('scripts/v054-semantic-cloudtop-smoke.mjs',[["\"'STARTUP'\",\"'YOGA'\",\"'FARMERS'\",",'']]);
rw('scripts/v055-structured-storefronts-smoke.mjs',[["\"'STARTUP'\",\"'YOGA'\",\"'FARMERS'\",",'']]);
console.log('v0.56 bytecut staged: compact semantic table + direct regional stalls + inline shop assignment + shared Easy arithmetic');
