import fs from'node:fs';
const sourcePath='scripts/showcase-browser-smoke.mjs',generatedPath='scripts/.showcase-browser-smoke-v19-generated.mjs',source=fs.readFileSync(sourcePath,'utf8'),needle="let z=await page.evaluate(()=>zone);await page.locator('canvas').dblclick({position:{x:640,y:585},delay:20})",replacement="let z=await page.evaluate(()=>zone);await page.evaluate(()=>document.querySelector('#showcase-menu')?.remove());await page.locator('canvas').dblclick({position:{x:640,y:585},delay:20})";
if(!source.includes(needle))throw Error('legacy showcase browser smoke title gesture anchor changed');
// v1.9 gives normal title input to the accessible DOM menu. The historical browser smoke still matters,
// so its isolated page removes that new shell before exercising the underlying guarded canvas title path.
fs.writeFileSync(generatedPath,source.replace(needle,replacement));
try{await import('./.showcase-browser-smoke-v19-generated.mjs')}finally{fs.rmSync(generatedPath,{force:true})}
