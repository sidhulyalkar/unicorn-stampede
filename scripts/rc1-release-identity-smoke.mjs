import fs from'node:fs';import{releaseSource}from'./release-prune.mjs';
const F=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],s=releaseSource(F.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'));
for(const m of ["['#78986d','#c9b98b','#74889a'][zone]","text(done?'✓':l.n[0]","u.ai=.2,u.tx=u.x+u.vx,u.ty=u.y+u.vy","e.preventDefault();e.stopImmediatePropagation();if(e.button||e.detail>1)return;"])if(!s.includes(m))throw Error('release identity/safety marker missing: '+m);
for(const m of ["text('O$#~*+%@'[k]","['B','M','G','C','H'][i]",'u.ai=0;if(can){'])if(s.includes(m))throw Error('stale release behavior leaked: '+m);
console.log('RC1 release identity: PASS palette + semantic labels + anti-stuck + guarded title clicks');
