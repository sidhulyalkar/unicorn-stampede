import fs from'node:fs';
function patch(path,a,b){let s=fs.readFileSync(path,'utf8');if(s.includes(a))fs.writeFileSync(path,s.replace(a,()=>b));else if(b&&!s.includes(b))throw Error('missing v0.57 patch anchor in '+path+': '+a)}
patch('src/worlds.js','BAKERY,BANK,BOOKS,CAFE,FLORIST,MARKET,TOYS,ARCADE','BAKERY,BOOKS,MARKET,CAFE,TOYS,ARCADE,FLORIST,BANK');
patch('src/worlds.js',"for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7;","for(let o of objs)if(o.t==='b')o.k=o.lm==='bakery'?0:1+i++%7,o.hue=o.k*49+20;");
patch('src/render.js','g=k&1||k>3','g=209>>k&1');
patch('src/render.js',"'O$#~*+%@'[k]","'B=MCTA*$'[k]");
patch('scripts/smoke.mjs',"!rs.includes('g=k&1||k>3')","!rs.includes('g=209>>k&1')");
patch('scripts/v056-town-difficulty-smoke.mjs',',"\'O$#~*+%@\'[k]"','');
patch('package.json','"version":"0.56.0"','"version":"0.57.0"');
let p='package.json',s=fs.readFileSync(p,'utf8');if(!s.includes('v057-semantic-storefront-smoke.mjs')){s=s.replace('node --check scripts/v056-town-difficulty-smoke.mjs &&','node --check scripts/v056-town-difficulty-smoke.mjs && node --check scripts/v057-semantic-storefront-smoke.mjs &&').replace('node scripts/v056-town-difficulty-smoke.mjs && node scripts/prune-audit.mjs','node scripts/v056-town-difficulty-smoke.mjs && node scripts/v057-semantic-storefront-smoke.mjs && node scripts/prune-audit.mjs');fs.writeFileSync(p,s)}
console.log('v0.57 semantic storefront grammar applied');
