import fs from'node:fs';
const patch=(p,rs)=>{let s=fs.readFileSync(p,'utf8'),o=s;for(let[a,b]of rs){if(!s.includes(a))throw Error(p+' anchor missing: '+a);s=s.replace(a,b)}if(s===o)throw Error(p+' unchanged');fs.writeFileSync(p,s)};
patch('scripts/smoke.mjs',[
["ev('cleaners.length')!==2)throw Error('two landmarks must release Comet and act2 cleanup')","ev('cleaners.length')!==1)throw Error('two landmarks must release Comet and Easy act2 cleanup')"],
["ev('cleaners.length')!==4||!ev(\"msg.includes('BUMPER')\")","ev('cleaners.length')!==2||!ev(\"msg.includes('BUMPER')\")"],
["ev('zone')!==1||ev('cleaners.length')!==2||Math.abs(ev('cleaners[0].v'))<190","ev('zone')!==1||ev('cleaners.length')!==1||Math.abs(ev('cleaners[0].v'))<150"],
["msg.includes('28% CHAOS')","msg.includes('25% CHAOS')"]
]);
patch('scripts/v049-world-identity-smoke.mjs',[["w.cleaners!==2","w.cleaners!==1"]]);
patch('scripts/washwater-smoke.mjs',[["!rs.includes(\"f*k==1?'STARTUP'\")","!rs.includes('k=o.k')||!rs.includes('BN[o.k+4]')"]]);
console.log('v0.56 historical contracts migrated: Easy cleanup/chaos relief only; Medium+ pressure pinned separately');
