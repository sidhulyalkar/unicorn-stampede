import fs from'node:fs';function edit(p,a,b){let s=fs.readFileSync(p,'utf8');if(!s.includes(a))throw Error(p+' anchor missing');fs.writeFileSync(p,s.replace(a,b))}
edit('src/core.js',"let pos=[[270,270],[950,870],[1450,1500],[2000,360],[2570,950],[2920,1580]],bx=", "let pos=[[270,270],[950,870],[1450,1500],[2000,360],[2570,950],[2920,1580]],fl=[[520,285],[600,950],[2040,260],[2730,1470],[1610,1450],[2930,650]],bx=");
edit('src/core.js','||pos.some(p=>Math.abs(p[0]-x-w/2)<w/2+60&&Math.abs(p[1]-y-h/2)<h/2+60))continue','||pos.concat(fl).some(p=>Math.abs(p[0]-x-w/2)<w/2+60&&Math.abs(p[1]-y-h/2)<h/2+60))continue');
edit('src/core.js','for(let a of [[520,285],[1100,940],[2040,260],[2730,1470],[1610,1450],[2930,650]])flowers.push','for(let a of fl)flowers.push');
edit('src/expansion.js','Math.hypot(q.x-u.x,q.y-u.y)<260+mode*20))u.distract=2','Math.hypot(q.x-u.x,q.y-u.y)<260+mode*20&&rng()<dt/4))u.distract=2');
console.log('staged reserved distraction sites + intermittent bickering');
