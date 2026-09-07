import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
if(s.includes('const _soloWorldDraw=world;'))throw Error('whip still renders below zone overlays');
for(let q of ["if(state==='play')","p=1/z","X.lineWidth=(7+n)*p","X.lineWidth=14*p","X.lineWidth=6*p","quadraticCurveTo","l:.2"])if(!s.includes(q))throw Error('missing whip render contract: '+q);
console.log('whip render: PASS top-layer + zoom-stable widths + extended lash life');
