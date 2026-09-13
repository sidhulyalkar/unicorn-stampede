import fs from'node:fs';
const sourcePath='scripts/showcase-browser-smoke.mjs',generatedPath='scripts/.showcase-browser-smoke-v19-generated.mjs',source=fs.readFileSync(sourcePath,'utf8'),needle="await page.locator('canvas').dblclick({position:{x:640,y:585},delay:20})",replacement="await page.locator('canvas').dblclick({position:{x:640,y:585},delay:20,force:true})";
if(!source.includes(needle))throw Error('legacy showcase browser smoke title gesture anchor changed');
// v1.9 intentionally places a real DOM menu above the title canvas. Force only this legacy title gesture
// through that overlay so the old guarded canvas handler remains tested without weakening normal UI ownership.
fs.writeFileSync(generatedPath,source.replace(needle,replacement));
try{await import('./.showcase-browser-smoke-v19-generated.mjs')}finally{fs.rmSync(generatedPath,{force:true})}
