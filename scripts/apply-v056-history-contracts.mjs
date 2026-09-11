import fs from'node:fs';
const patch=(p,rs)=>{let s=fs.readFileSync(p,'utf8'),o=s;for(let[a,b]of rs){if(!s.includes(a))throw Error(p+' anchor missing: '+a);s=s.replace(a,b)}if(s===o)throw Error(p+' unchanged');fs.writeFileSync(p,s)};
patch('scripts/smoke.mjs',[
["ev('cleaners.length')!==2)throw Error('two landmarks must release Comet and act2 cleanup')","ev('cleaners.length')!==1)throw Error('two landmarks must release Comet and Easy act2 cleanup')"],
["ev('cleaners.length')!==4||!ev(\"msg.includes('BUMPER')\")","ev('cleaners.length')!==2||!ev(\"msg.includes('BUMPER')\")"],
["ev('zone')!==1||ev('cleaners.length')!==2||Math.abs(ev('cleaners[0].v'))<190","ev('zone')!==1||ev('cleaners.length')!==1||Math.abs(ev('cleaners[0].v'))<150"],
["msg.includes('28% CHAOS')","msg.includes('25% CHAOS')"],
["Math.abs(ev('chaos()')-.28)>1e-6","Math.abs(ev('chaos()')-.25)>1e-6"],
["Math.abs(ev('chaos()')-.33)>1e-6","Math.abs(ev('chaos()')-.30)>1e-6"]
]);
patch('scripts/competitive-smoke.mjs',[
["msg.includes('28% CHAOS')","msg.includes('25% CHAOS')"],
["e('cleaners.length')!==6","e('cleaners.length')!==3"],
["Math.abs(e('stageGoal')-.5)>.001||Math.abs(e('distGoal')-.29)>.001","Math.abs(e('stageGoal')-.46)>.001||Math.abs(e('distGoal')-.2668)>.001"],
["e('cleaners.length')!==2||Math.abs(e('stageGoal')-.53)>.001","e('cleaners.length')!==1||Math.abs(e('stageGoal')-.44)>.001"],
["Math.abs(e('stageGoal')-.56)>.001","Math.abs(e('stageGoal')-.42)>.001"],
["Math.abs(e('stageGoal')-.56)>.001)throw Error('Stampede+ Heat progression')","Math.abs(e('stageGoal')-.52)>.001)throw Error('Stampede+ Heat progression')"],
["Math.abs(e('stageGoal')-.782)>.001||e('distGoal')<.45","Math.abs(e('stageGoal')-.642)>.001||e('distGoal')<.37"]
]);
patch('scripts/v049-world-identity-smoke.mjs',[["w.cleaners!==2","w.cleaners!==1"]]);
patch('scripts/washwater-smoke.mjs',[
["eq(e('BN'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP'],'Washwater shop palette drifted')","eq(e('BN'),['CANDY STORE','YACHT CLUB','SURF SHOP','BOATHOUSE','BAIT SHOP','DOCK CAFE','FISH MARKET','FERRY'],'Washwater shop palette drifted')"],
["!rs.includes(\"f*k==1?'STARTUP'\")","!rs.includes('k=o.k')||!rs.includes('BN[o.k+4]')"]
]);
patch('scripts/v047-waterfront-smoke.mjs',[["\"f?'FARMERS':o.ln||'MARKET'\"","\"zone==1?BN[o.k+4]\""]]);
console.log('v0.56 historical contracts migrated: full Easy pressure + eight-name Washwater/region venue rendering; Medium+ pressure pinned separately');
