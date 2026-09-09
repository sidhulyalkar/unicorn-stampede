import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),q="if(k===2){X.strokeStyle='#65382f';for(let yy=y+65;yy<y+h-45;yy+=30){X.beginPath();X.moveTo(x,yy);X.lineTo(x+w,yy);X.stroke()}}";if(!r.includes(q))throw Error('brick detail already missing');fs.writeFileSync('src/render.js',r.replace(q,''));
let s=fs.readFileSync('scripts/v047-waterfront-smoke.mjs','utf8');s=s.replace("if(r.includes('35% 65%/.05')||r.includes('if(k===4)for(let i=6'))throw Error('retired generic scenery returned');","if(r.includes('35% 65%/.05')||r.includes('if(k===4)for(let i=6')||r.includes(\"if(k===2){X.strokeStyle='#65382f'\"))throw Error('retired generic scenery returned');");fs.writeFileSync('scripts/v047-waterfront-smoke.mjs',s);
console.log('staged v0.47 brick-detail byte experiment');
