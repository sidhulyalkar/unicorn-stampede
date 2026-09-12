import fs from'node:fs';
let s=fs.readFileSync('src/whip.js','utf8');
for(let q of ['HOW TO PLAY','GOAL • MANAGE 6','WIN 1 • BREAK 4 LANDMARKS','WIN 2 • BUILD CHAOS = DAMAGE + PAINT','WIN 3 • TO SMASH HALL → TEAM UP','WIN 4 • PAINT 4 DISTRICTS + REACH COLOR GOAL','CHARGE WHIP','MORE CHARGE = LONGER','MOVE+SHIFT SENDS CURRENT UNICORN','SHIFT ×3 • SWEEP DIFFERENT HERD MEMBERS','TEAM X/Y • BRING Y UNICORNS CLOSE TO TARGET','POWER-UPS • RUN INTO THEM','CLEANERS • ERASE + SNATCH DISTRACTED HERD','RESCUE • HIT TRUCK + BRING 2 UNICORNS','3 CAPTURED = GAME OVER',"paused?'P / ESC • RESUME'"])if(!s.includes(q))throw Error('missing pause-rule contract: '+q);
console.log('pause rules v0.60: PASS complete conquest guide + coordination + live objective');
