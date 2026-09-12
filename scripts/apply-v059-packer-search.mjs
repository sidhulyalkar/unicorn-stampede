import fs from'node:fs';
let p='scripts/build.mjs',s=fs.readFileSync(p,'utf8');
let a="async function roll(data,effort=1){let p=new Packer([{data,type:'js',action:'eval'}],{});await p.optimize(effort);let d=p.makeDecoder();return d.firstLine+d.secondLine}";
let b="async function roll(data,effort=1,dirty=0){let p=new Packer([{data,type:'js',action:'eval'}],dirty?{allowFreeVars:true}:{});await p.optimize(effort);let d=p.makeDecoder();return d.firstLine+d.secondLine}";
if(s.includes(a))s=s.replace(a,b);else if(!s.includes(b))throw Error('roll helper anchor missing');
let x="for(let e of [4,10]){let hard=await roll(m.code,e),n='road-'+m.n+'-hard'+e;candidates.push({n,h:shell(hard),z:zip(shell(hard)),src:m.n})}";
let y="for(let e of [4,10]){let hard=await roll(m.code,e),n='road-'+m.n+'-hard'+e;candidates.push({n,h:shell(hard),z:zip(shell(hard)),src:m.n});if(e==4){let q=await roll(m.code,e,1),d=n+'-dirty';candidates.push({n:d,h:shell(q),z:zip(shell(q)),src:m.n})}}";
if(s.includes(x))s=s.replace(x,y);else if(!s.includes("-dirty'"))throw Error('hard Roadroller loop anchor missing');
fs.writeFileSync(p,s);console.log('v0.59 Roadroller dirty-candidate search enabled');
