import fs from'node:fs';import{auditRelease,releaseSource}from'./release-prune.mjs';
const F=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],raw=F.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),base=auditRelease(raw),s=releaseSource(raw),delta=Buffer.byteLength(s)-Buffer.byteLength(base);
new Function(s);
for(let a of ['PRISMBOROUGH','WASHWATER BAY','CLOUDTOP HEIGHTS','function harbor','function heights','for(let k of [-14,12])','lineTo(k+kick,37)','for(let s of[-1,1])','lineTo(p.x+s*7,p.y+42)','X.fillRect(x+8,y+39,w-16,11)','for(let i=2;i--;)X.fillRect(x+16+i*(w-68),y+h-47,36,28)',"text(o.ln||N[k+5],x+w/2,y+35,13,'center')"])if(!s.includes(a))throw Error('RC1 town signal marker missing: '+a);
for(let a of ["text('O$#~*+%@'[k]",'for(let i=3;i--;){X.fillStyle=i==1'])if(s.includes(a))throw Error('sloppy RC1 facade marker leaked: '+a);
if(delta>24)throw Error('town signal raw-byte budget exceeded: '+delta);
console.log(`RC1 town signal: PASS all 3 worlds + unicorn legs + human legs + architectural facade; raw delta ${delta} bytes`);
