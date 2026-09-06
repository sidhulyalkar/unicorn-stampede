import fs from'node:fs';import{releaseSource}from'./release-prune.mjs';
const files=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],raw=files.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),src=releaseSource(raw);
console.log(`release source: ${Buffer.byteLength(raw)} canonical bytes`);if(src!==raw)throw Error('release source must be canonical');console.log('release source audit: PASS');
