import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
if(s.includes('const _soloWorldDraw=world;'))throw Error('whip still renders below zone overlays');
for(let q of ["const _soloHud=hud;","p=1/z","X.lineWidth=(7+n)*p","X.lineWidth=15*p","X.lineWidth=7*p","quadraticCurveTo","l:.2"])if(!s.includes(q))throw Error('missing whip render contract: '+q);
console.log('whip render: PASS post-world/pre-HUD layer + zoom-stable elastic lash + 0.2s visibility');
