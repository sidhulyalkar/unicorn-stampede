import fs from'node:fs';import path from'node:path';
const root=process.cwd(),indexPath=path.join(root,'index.html'),outDir=path.join(root,'dist'),outPath=path.join(outDir,'unicorn-stampede-showcase.html');let html=fs.readFileSync(indexPath,'utf8');
html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,src)=>`<style>\n${fs.readFileSync(path.join(root,src),'utf8')}\n</style>`);
html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,src)=>{const js=fs.readFileSync(path.join(root,src),'utf8').replace(/<\/script/gi,'<\\/script');return`<script>\n${js}\n</script>`});
fs.mkdirSync(outDir,{recursive:true});fs.writeFileSync(outPath,html);console.log(`showcase standalone: ${outPath} (${Buffer.byteLength(html).toLocaleString()} bytes)`);
