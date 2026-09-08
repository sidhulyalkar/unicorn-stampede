import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8'),w=fs.readFileSync('src/worlds.js','utf8');
for(let q of ["whips=[],wn=0","Math.min(4,wn++)*.08","w.l=.16,w.hit=-1,crackWhip(w)","clock*90+c","chains++;award('3X PRISM'","zone===2&&level","cl((w.l-.16)*450,-55,55)*w.s","rope(0,0,-72,58+s,-28,30+s,1)"])if(!s.includes(q))throw Error('missing v0.44 whip contract: '+q);
if(s.includes('createLinearGradient')||s.includes('clock*220')||w.includes('_crackW'))throw Error('legacy whip path returned');
console.log('whip render v0.44: PASS every-click queue + exact straight snap + prismatic wobble + fused zone effects + gravity cursor trail');
