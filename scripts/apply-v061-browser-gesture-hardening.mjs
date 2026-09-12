import fs from'node:fs';
const read=p=>fs.readFileSync(p,'utf8'),write=(p,s)=>fs.writeFileSync(p,s),rep=(s,a,b)=>{if(s.includes(b))return s;if(!s.includes(a))throw Error('browser-gesture anchor missing: '+a);return s.replace(a,b)};
let c=read('src/core.js');c=rep(c,"addEventListener('blur',()=>{for(let k in K)K[k]=0});","addEventListener('blur',()=>{for(let k in K)K[k]=0});C.oncontextmenu=C.onselectstart=C.ondragstart=e=>e.preventDefault();");write('src/core.js',c);
let s=read('src/style.css');s=rep(s,'cursor:none}','cursor:none;user-select:none}');write('src/style.css',s);
let p=JSON.parse(read('package.json'));for(let k of['test','test:visual']){let q=p.scripts[k];if(!q.includes('v061-browser-gesture-smoke.mjs')){q=q.replace('node --check scripts/v061-gameplay-polish-smoke.mjs &&','node --check scripts/v061-gameplay-polish-smoke.mjs && node --check scripts/v061-browser-gesture-smoke.mjs &&');q=q.replace('node scripts/v061-gameplay-polish-smoke.mjs &&','node scripts/v061-gameplay-polish-smoke.mjs && node scripts/v061-browser-gesture-smoke.mjs &&');p.scripts[k]=q}}write('package.json',JSON.stringify(p));
console.log('v0.61 browser gesture hardening applied');
