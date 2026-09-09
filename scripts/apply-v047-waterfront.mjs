import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),q="X.fillStyle='#fff';X.fillRect(x+8,y+8,w-16,4);";if(!r.includes(q))throw Error('generic roof glare already missing');fs.writeFileSync('src/render.js',r.replace(q,''));
let s=fs.readFileSync('scripts/v047-waterfront-smoke.mjs','utf8');s=s.replace("if(r.includes('35% 65%/.05')||r.includes('if(k===4)for(let i=6'))throw Error('retired generic scenery returned');","if(r.includes('35% 65%/.05')||r.includes('if(k===4)for(let i=6')||r.includes(\"X.fillRect(x+8,y+8,w-16,4)\"))throw Error('retired generic scenery returned');");fs.writeFileSync('scripts/v047-waterfront-smoke.mjs',s);
console.log('staged final v0.47 byte reserve');
