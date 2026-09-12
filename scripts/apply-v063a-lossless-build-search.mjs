import fs from'node:fs';
let p='scripts/build.mjs',s=fs.readFileSync(p,'utf8');
function rep(a,b){if(!s.includes(a))throw Error('v0.63a build anchor missing: '+a.slice(0,90));s=s.replace(a,b)}
rep("import{staticizeWrappers}from'./release-staticize.mjs';","import{staticizeWrappers}from'./release-staticize.mjs';import{runtimeAlias}from'./release-aliases.mjs';");
rep(",enumSrc=kinds.reduce((s,k,i)=>s.replaceAll(`'${k}'`,i),src);let specs=",",enumize=s=>kinds.reduce((s,k,i)=>s.replaceAll(`'${k}'`,i),s),enumSrc=enumize(src),a1=runtimeAlias(src,1),a2=runtimeAlias(src,2);let specs=");
rep("['ultra-enum',enumSrc,1,1,1,1,1]],mins=[]","['ultra-enum',enumSrc,1,1,1,1,1],['alias-wide',a1,0,1,1],['alias-enum',enumize(a1),0,1,1],['alias2-wide',a2,0,1,1],['alias2-enum',enumize(a2),0,1,1]],mins=[]");
fs.writeFileSync(p,s);console.log('v0.63a build search applied: baseline + lossless Math/Canvas alias candidates');
