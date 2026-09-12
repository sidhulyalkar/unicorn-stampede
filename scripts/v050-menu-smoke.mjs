import fs from'node:fs';
const core=fs.readFileSync('src/core.js','utf8'),worlds=fs.readFileSync('src/worlds.js','utf8'),whip=fs.readFileSync('src/whip.js','utf8'),exp=fs.readFileSync('src/expansion.js','utf8'),prune=fs.readFileSync('scripts/release-prune.mjs','utf8');
function need(s,x,m){if(!s.includes(x))throw Error(m)}function ban(s,x,m){if(s.includes(x))throw Error(m)}
need(core,"let state='title'",'game no longer boots to menu');
need(worlds,"if(state==='title'&&(e.code==='KeyA'||e.code==='KeyD'))",'A/D world selector missing');ban(worlds,'canZone(', 'world selector still progression-gated');
need(whip,"state==='title'&&e.code==='KeyT'",'tutorial control missing');need(whip,'startLevel(train?0:1)','configured start missing');
need(exp,"text('START'",'start menu label missing');need(exp,"text('TUTORIAL '+",'tutorial toggle label missing');need(exp,"text('< '+N[21+zone]+' >'",'world label missing');need(exp,"state='title';objs=[]",'tutorial completion does not return to menu');ban(exp,'ENTER • TRAINING','legacy forced-training label remains');ban(exp,'SKIP TO MENU','legacy training skip remains');
need(exp,"state==='title'&&e.code==='KeyM')e.stopImmediatePropagation(),S.s('ccMode',mode=(mode+1)%4)",'difficulty is still gated by tutorial completion');ban(prune,"\"e.code==='KeyT'\"",'release pruner still retires tutorial key');need(prune,"'TUTORIAL '",'release contract does not require tutorial menu');
console.log('v0.50 menu-first base: PASS boot→menu; free worlds; configured start; tutorial→menu; M difficulty');
