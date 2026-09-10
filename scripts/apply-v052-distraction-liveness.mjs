import fs from'node:fs';function edit(p,a,b){let s=fs.readFileSync(p,'utf8');if(!s.includes(a))throw Error(p+' anchor missing');fs.writeFileSync(p,s.replace(a,b))}
edit('src/core.js','[[520,285],[1100,940],[2040,260],[2730,1470],[1610,1450],[2930,650]]','[[850,285],[1100,635],[1630,260],[2730,1225],[1630,1450],[2930,650]]');
edit('src/expansion.js','Math.hypot(q.x-u.x,q.y-u.y)<260+mode*20))u.distract=2','Math.hypot(q.x-u.x,q.y-u.y)<260+mode*20&&rng()<dt/4))u.distract=2');
console.log('staged road-safe flowers + intermittent bickering');
