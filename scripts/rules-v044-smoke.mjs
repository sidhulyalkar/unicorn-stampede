import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
for(let q of ['HOW TO PLAY','GOAL • HERD','WIN • 4 → CHAOS','WHIP = +1/5','MORE = LONGER','TEAM 2/3 → BRING 2','POWER-UPS • SMASH','CLEANERS • ERASE + SNATCH','RESCUE • HIT TRUCK','3 CAPTURED = GAME OVER',"paused?'P / ESC • RESUME'"])if(!s.includes(q))throw Error('missing pause-rule contract: '+q);
console.log('pause rules v0.44: PASS complete compact guide + live objective');
