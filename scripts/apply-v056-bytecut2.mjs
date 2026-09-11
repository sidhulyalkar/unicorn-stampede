import fs from'node:fs';
const rw=(p,rs)=>{let s=fs.readFileSync(p,'utf8'),o=s;for(let[a,b]of rs){if(!s.includes(a))throw Error(p+' bytecut2 anchor missing: '+a.slice(0,110));s=s.replace(a,b)}if(s===o)throw Error(p+' unchanged');fs.writeFileSync(p,s)};
rw('src/worlds.js',[
["BN='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP'.split(','),N='BAKERY,BANK,BOOKS,CAFE,FLORIST,MARKET,TOYS,ARCADE,BAIT,DOCK,FISH,FERRY,FARMERS,STARTUP,YOGA,CAFE'.split(',');","N='CANDY STORE,YACHT CLUB,SURF SHOP,BOATHOUSE,BAIT SHOP,BAKERY,BANK,BOOKS,CAFE,FLORIST,MARKET,TOYS,ARCADE,BAIT,DOCK,FISH,FERRY,FARMERS,STARTUP,YOGA,CAFE,PRISMBOROUGH,WASHWATER BAY,CLOUDTOP HEIGHTS'.split(',');"],
["const ZN=['PRISMBOROUGH','WASHWATER BAY','CLOUDTOP HEIGHTS'],_day=today;","const _day=today;"],
["a=[BN[0],BN[4],BN[2],'HARBOR CLOCK',BN[1]]","a=[N[0],N[4],N[2],'HARBOR CLOCK',N[1]]"],
["lmText=ZN[zone]","lmText=N[21+zone]"]
]);
rw('src/render.js',[
["for(let i=0;i<5;i++)X.fillRect(o.x+i*o.w/5,o.y+o.h-18-(i%2)*10,o.w/6,18+(i%2)*10)","X.fillRect(o.x,o.y+o.h-18,o.w,18)"],
["for(let i=0;i<8;i++){X.fillStyle=i%2?'#fff3d0':`hsl(${o.hue+60} 80% 58%)`;X.fillRect(o.x+i*o.w/8,o.y-18,o.w/8,24)}","X.fillStyle='#fff3d0';X.fillRect(o.x,o.y-18,o.w,24);"],
["N[8+(zone-1)*4+(objs.indexOf(o)&3)]","N[13+(zone-1)*4+(objs.indexOf(o)&3)]"],
["o.ln||N[k]","o.ln||N[k+5]"]
]);
rw('src/expansion.js',[["'< '+ZN[zone]+' >'","'< '+N[21+zone]+' >'"]]);
rw('scripts/washwater-smoke.mjs',[
["eq(e('BN'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP'],'Washwater landmark palette drifted')","eq(e('N').slice(0,5),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP'],'Washwater landmark palette drifted')"],
["N[8+(zone-1)*4+(objs.indexOf(o)&3)]","N[13+(zone-1)*4+(objs.indexOf(o)&3)]"]
]);
rw('scripts/v047-waterfront-smoke.mjs',[["N[8+(zone-1)*4+(objs.indexOf(o)&3)]","N[13+(zone-1)*4+(objs.indexOf(o)&3)]"]]);
rw('scripts/v050-menu-smoke.mjs',[["text('< '+ZN[zone]+' >'","text('< '+N[21+zone]+' >'"]]);
rw('scripts/v056-town-difficulty-smoke-template.mjs',[
["N[8+(zone-1)*4+(objs.indexOf(o)&3)]","N[13+(zone-1)*4+(objs.indexOf(o)&3)]"],
["o.ln||(o.t==='clock'?'CLOCK TOWER':N[o.k])","o.ln||(o.t==='clock'?'CLOCK TOWER':N[o.k+5])"],
["\"o.ln||N[k]\"","\"o.ln||N[k+5]\""],
["\"N[8+(zone-1)*4+(objs.indexOf(o)&3)]\"","\"N[13+(zone-1)*4+(objs.indexOf(o)&3)]\""],
["\"BAIT,DOCK,FISH,FERRY,FARMERS,STARTUP,YOGA,CAFE\"","\"BAIT,DOCK,FISH,FERRY,FARMERS,STARTUP,YOGA,CAFE,PRISMBOROUGH,WASHWATER BAY,CLOUDTOP HEIGHTS\""]
]);
console.log('v0.56 bytecut2 staged: unified semantic vocabulary + compact canopy/rubble rendering');
