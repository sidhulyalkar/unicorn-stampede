import fs from'node:fs';
const index=fs.readFileSync('index.html','utf8'),guard=fs.readFileSync('src/input-guard.js','utf8'),show=fs.readFileSync('src/showcase.js','utf8');
for(const s of ['src/input-guard.js','src/showcase.js'])if(!index.includes(s))throw Error('showcase script missing from index: '+s);
for(const s of ["state!=='title'","e.detail>1","stopImmediatePropagation","touchAction='none'"])if(!guard.includes(s))throw Error('input guard marker missing: '+s);
for(const s of ['u.ai=.28','u.tx=cl(','u.ty=cl(','showcaseStreetBase','showcaseBuildingBase','drawPeople=function','POST-JS13K SHOWCASE EDITION'])if(!show.includes(s))throw Error('showcase marker missing: '+s);
for(const s of ['zone===0','zone===1','zone===2','zone===3'])if(!show.includes(s))throw Error('four-world showcase marker missing: '+s);
console.log('showcase structural smoke: PASS anti-stuck + browser guard + four-world graphics + detailed people');
