import fs from'node:fs';
const core=fs.readFileSync('src/core.js','utf8'),worlds=fs.readFileSync('src/worlds.js','utf8'),whip=fs.readFileSync('src/whip.js','utf8'),exp=fs.readFileSync('src/expansion.js','utf8'),prune=fs.readFileSync('scripts/release-prune.mjs','utf8');
function need(s,x,m){if(!s.includes(x))throw Error(m)}function ban(s,x,m){if(s.includes(x))throw Error(m)}
need(core,"let state='title'",'game no longer boots to menu');
need(worlds,"if(state==='title'&&(e.code==='KeyA'||e.code==='KeyD'))",'A/D world selector missing');ban(worlds,'canZone(', 'world selector still progression-gated');
need(whip,"state==='title'&&e.code==='KeyT'",'tutorial menu action missing');need(whip,'startLevel(0);return}if(state===\'title\'', 'tutorial does not start training level');need(whip,"startLevel(1);return}",'main-game keyboard action missing');need(whip,"if(!guide)audio(),startLevel(1)",'title click does not default to main game');
need(exp,"text('ENTER • MAIN GAME'",'main-game menu label missing');need(exp,"text('T • TUTORIAL • C • RULES'",'tutorial menu label missing');need(exp,"text('A/D • '+ZN[zone]",'world label missing');need(exp,"state='title';objs=[]",'tutorial completion does not return to menu');ban(exp,'ENTER • TRAINING','legacy forced-training label remains');ban(exp,'SKIP TO MENU','legacy training skip remains');
need(exp,"state==='title'&&e.code==='KeyM')e.stopImmediatePropagation(),S.s('ccMode',mode=(mode+1)%4)",'difficulty is still gated by tutorial completion');ban(prune,"\"e.code==='KeyT'\"",'release pruner still retires tutorial key');need(prune,"'T • TUTORIAL'",'release contract does not require tutorial menu');
console.log('v0.50 menu-first: PASS boot→menu; A/D worlds; Enter main; T tutorial; tutorial→menu; M difficulty');
