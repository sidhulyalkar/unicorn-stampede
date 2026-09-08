import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
for(let q of ['HOW TO PLAY','GOAL • MANAGE THE HERD','EACH LANDED HIT ADDS 1/5 CHARGE','MORE WHIPS = LONGER BOOST','TEAM 2/3 • NEED 2 NEAR TARGET','POWER-UPS • GRAB THEM','CLEANERS ERASE PAINT + SNATCH UNICORNS','3 CAPTURED = GAME OVER',"paused?'P / ESC • RESUME'"])if(!s.includes(q))throw Error('missing pause-rule contract: '+q);
if(s.includes('WASD STEER/PAINT • WHIP 2–5× • SPACE DASH'))throw Error('compressed old rules returned');
console.log('pause rules v0.44: PASS goal + conquest order + controls + landed-whip scaling + team + powerups + resistance + rescue + loss');
