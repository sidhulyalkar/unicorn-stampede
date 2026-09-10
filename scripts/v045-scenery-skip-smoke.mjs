import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),e=fs.readFileSync('src/expansion.js','utf8');if(!r.includes("X.fillRect(o.x-7,o.y,o.w+14,o.h)"))throw Error('Washwater riverbank stone missing');if(e.includes('M • SKIP TO MENU'))throw Error('obsolete forced-training skip returned');console.log('v0.45: PASS stone riverbanks; legacy M training skip retired by menu-first flow');
