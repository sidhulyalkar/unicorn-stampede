import fs from'node:fs';
const rw=(p,rs)=>{let s=fs.readFileSync(p,'utf8'),o=s;for(let[a,b]of rs){if(!s.includes(a))throw Error(p+' bytecut3 anchor missing: '+a.slice(0,110));s=s.replace(a,b)}if(s===o)throw Error(p+' unchanged');fs.writeFileSync(p,s)};
rw('src/render.js',[
["X.strokeStyle='#bff0ff';X.lineWidth=5;X.beginPath();X.arc(o.x+o.w/2,o.y+o.h/2,o.w*.18,0,T);X.stroke();",'' ],
["X.fillStyle='#ffe079';for(let i=0;i<3;i++){X.beginPath();X.arc(o.x+75+i*50,o.y+80+(i%2)*18,9,0,T);X.fill()}","X.fillStyle='#ffe079';X.beginPath();X.arc(o.x+100,o.y+80,9,0,T);X.fill();"],
["X.fillStyle='#fff3d0';X.fillRect(o.x,o.y-18,o.w,24);",'' ],
["function drawFlies(){for(let b of flies){X.fillStyle='#ffe56d';X.beginPath();X.ellipse(b.x-7,b.y,9,5,-.5,0,T);X.ellipse(b.x+7,b.y,9,5,.5,0,T);X.fill();X.fillStyle='#3b3a28';X.fillRect(b.x-2,b.y-4,4,9)}}","function drawFlies(){for(let b of flies){X.fillStyle='#ffe56d';X.beginPath();X.ellipse(b.x,b.y,12,5,0,0,T);X.fill();X.fillStyle='#3b3a28';X.fillRect(b.x-2,b.y-4,4,9)}}"]
]);
rw('src/expansion.js',[
["lmText='ACT I • BREAK 4 • '+DR[defense()]+' • HERD 4/6'","lmText='BREAK 4 • '+DR[defense()]+' • HERD 4/6'"],
["lmText='HEAT '+(h+1)+'/10 • ACT I • BREAK 4 • HERD 4/6'","lmText='HEAT '+(h+1)+'/10 • BREAK 4 • HERD 4/6'"],
["lmText=(w===2?'ACT II • COMET JOINS':'ACT III • FULL HERD')+' • '+DR[defense()]","lmText=(w===2?'COMET JOINS':'FULL HERD')+' • '+DR[defense()]"]
]);
rw('scripts/release-prune.mjs',[["'ACT I • BREAK 4'","'BREAK 4'"]]);
console.log('v0.56 bytecut3 staged: compact transient phase copy + lighter non-gameplay ornament rendering');
