import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
for(let q of ["let whip=0","l:.13,hit:0","b=whip.l*520","clock*180+i*120","X.arc(-7,7,14+i*7,.2,5.6)","const _soloWorldDraw=world"])if(!s.includes(q))throw Error('missing main whip contract: '+q);
if(s.includes('whips=[]')||s.includes('wn=0')||s.includes('gravity cursor'))throw Error('queued/gravity whip survived main revert');
if(!s.includes('X.lineWidth=4+i*3;X.beginPath();X.moveTo(whip.x,whip.y)'))throw Error('thicker lash profile missing');
console.log('whip render: PASS main snap + thicker 3-pass rainbow lash + coiled cursor');
