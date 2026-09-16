import {cpSync,copyFileSync,mkdirSync,readFileSync,rmSync,statSync,writeFileSync} from 'node:fs';

const OUT='wavedash-dist';
const BASE='ddfc0ec6fa516f3af3dc519355863c8051614fdb';
const ZIP_BYTES=13203;

rmSync(OUT,{recursive:true,force:true});
mkdirSync(`${OUT}/src`,{recursive:true});
cpSync('src',`${OUT}/src`,{recursive:true});
copyFileSync('wavedash/sdk.js',`${OUT}/wavedash.js`);

const source=readFileSync('index.html','utf8');
if(!source.includes('</body>'))throw new Error('index.html has no </body> insertion point');
const html=source.replace('</body>','  <script src="wavedash.js"></script>\n</body>');
writeFileSync(`${OUT}/index.html`,html);
writeFileSync(`${OUT}/provenance.json`,JSON.stringify({
  game:'Unicorn Stampede',edition:'js13k 2026 Competition Build',
  competitionBase:BASE,competitionZipBytes:ZIP_BYTES,
  integration:'Wavedash SDK adapter only; frozen competition source copied unchanged'
},null,2));

const copied=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js','style.css'];
for(const name of copied){
  const a=readFileSync(`src/${name}`),b=readFileSync(`${OUT}/src/${name}`);
  if(!a.equals(b))throw new Error(`Wavedash build changed src/${name}`);
}
if(statSync('dist/unicorn-stampede.zip').size!==ZIP_BYTES)throw new Error('Frozen competition ZIP size changed');
console.log(`Wavedash js13k build ready: ${OUT}/index.html (${copied.length} frozen source files + SDK adapter)`);
