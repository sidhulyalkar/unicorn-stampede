import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
for(let q of ['HOW TO PLAY','GOAL • MANAGE 6','WIN 1 • BREAK 4 LANDMARKS','WIN 2 • CHAOS = COLOR + DESTRUCTION','WIN 3 • TEAM UP + SMASH TOWN HALL','WIN 4 • PAINT 4 DISTRICTS + COLOR GOAL','CHARGE WHIP','MORE CHARGE = LONGER','MOVE+SHIFT = SEND','POWER-UPS • RUN INTO THEM','CLEANERS • ERASE + SNATCH DISTRACTED HERD','RESCUE • HIT TRUCK + BRING 2 UNICORNS','3 CAPTURED = GAME OVER',"paused?'P / ESC • RESUME'"])if(!s.includes(q))throw Error('missing pause-rule contract: '+q);
console.log('pause rules v0.60: PASS complete conquest guide + coordination + live objective');
