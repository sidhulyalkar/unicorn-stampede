import fs from'node:fs';
let p='scripts/build.mjs',s=fs.readFileSync(p,'utf8');
function rep(a,b){if(!s.includes(a))throw Error('v0.63a3 build anchor missing: '+a.slice(0,100));s=s.replace(a,b)}
rep('function opts(unsafe,props,wide,aggr,pure){','function opts(unsafe,props,wide,aggr,pure,mod){');
rep('return{ecma:2020,toplevel:true,compress,mangle:props?{toplevel:true,properties:{regex:wide?PW:PR}}:{toplevel:true},format:{comments:false}}','return{ecma:mod?2024:2020,module:!!mod,toplevel:true,compress,mangle:props?{toplevel:true,properties:{regex:wide?PW:PR}}:{toplevel:true},format:{comments:false}}');
rep("['ultra-enum',enumSrc,1,1,1,1,1]],mins=[]","['ultra-enum',enumSrc,1,1,1,1,1],['module-enum',enumSrc,0,1,1,0,0,1],['module-aggr-enum',enumSrc,0,1,1,1,0,1],['module-ultra-enum',enumSrc,1,1,1,1,1,1]],mins=[]");
rep('for(let[n,s,u,p,w,a,g]of specs){let code=(await minify(s,opts(u,p,w,a,g))).code;','for(let[n,s,u,p,w,a,g,mod]of specs){let code=(await minify(s,opts(u,p,w,a,g,mod))).code;');
fs.writeFileSync(p,s);console.log('v0.63a3: baseline + strict module-mode Terser candidates');
