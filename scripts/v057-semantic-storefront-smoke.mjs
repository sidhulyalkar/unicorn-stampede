import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8'),c=fs.readFileSync('src/core.js','utf8');
for(let q of ["o.hue=[28,355,64,158,305,95,205,274][o.k]","o.lm==='bakery'?0:1+i++%7"])if(!w.includes(q))throw Error('missing stable type palette authority: '+q);
for(let q of ['g=83>>k&1','8+(57>>k&1)*5',"'B$=C*MTA'[k]",'o.ln||N[k+5]','hsl(${o.hue} 34%'])if(!r.includes(q))throw Error('missing semantic storefront component: '+q);
for(let q of ["'O$#~*+%@'[k]",'g=k&1||k>3'])if(r.includes(q))throw Error('retired arbitrary storefront grammar survived: '+q);
let hues=[28,355,64,158,305,95,205,274];if(new Set(hues).size!==8)throw Error('venue hues must be one-to-one');let g=[...Array(8).keys()].filter(k=>83>>k&1),a=[...Array(8).keys()].filter(k=>57>>k&1);if(g.join()!= '0,1,4,6')throw Error('gable grammar drifted: '+g);if(a.join()!= '0,3,4,5')throw Error('awning grammar drifted: '+a);
if(!w.includes("_startW(n);if(n&&zone)"))throw Error('semantic hue must remain post-generation');if(!c.includes("let m=[.8,1.4,1,.7,.9][(hue/72|0)%5];hp*=m;val*=m"))throw Error('pre-existing generation durability contract moved');
console.log('v0.57 semantic storefront grammar: PASS 8 stable palettes + meaningful ASCII emblems + reusable gable/awning bitmasks; legacy material saturation + gameplay durability preserved');
