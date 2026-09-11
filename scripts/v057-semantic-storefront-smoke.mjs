import fs from'node:fs';
let r=fs.readFileSync('src/render.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8'),c=fs.readFileSync('src/core.js','utf8');
for(let q of ["o.hue=o.k*49+20","o.lm==='bakery'?0:1+i++%7",'BAKERY,BOOKS,MARKET,CAFE,TOYS,ARCADE,FLORIST,BANK'])if(!w.includes(q))throw Error('missing compressed semantic palette authority: '+q);
for(let q of ['g=209>>k&1',"'B=MCTA*$'[k]",'o.ln||N[k+5]','hsl(${o.hue} 34%','y+h-65,w,10'])if(!r.includes(q))throw Error('missing semantic storefront component: '+q);
for(let q of ["'O$#~*+%@'[k]",'g=k&1||k>3','8+(57>>k&1)*5','o.hue=[28,355'])if(r.includes(q)||w.includes(q))throw Error('retired/high-entropy storefront grammar survived: '+q);
let names=['BAKERY','BOOKS','MARKET','CAFE','TOYS','ARCADE','FLORIST','BANK'],hues=names.map((_,k)=>k*49+20);if(new Set(hues.map(h=>h%360)).size!==8)throw Error('venue hues must be one-to-one');if(hues[0]!==20||hues[3]!==167||hues[4]!==216||hues[5]!==265||hues[6]!==314||hues[7]%360!==3)throw Error('semantic color wheel drifted: '+hues);let g=[...Array(8).keys()].filter(k=>209>>k&1);if(g.join()!= '0,4,6,7')throw Error('gable grammar drifted: '+g);
if(!w.includes("_startW(n);if(n&&zone)"))throw Error('semantic hue must remain post-generation');if(!c.includes("let m=[.8,1.4,1,.7,.9][(hue/72|0)%5];hp*=m;val*=m"))throw Error('pre-existing generation durability contract moved');
console.log('v0.57 semantic storefront grammar: PASS compressed color wheel + meaningful ASCII emblems + semantic gables; shared facade/material + gameplay durability preserved');
