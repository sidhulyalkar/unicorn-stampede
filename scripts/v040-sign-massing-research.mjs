import fs from'node:fs';import{execFileSync}from'node:child_process';
const P='src/render.js',base=fs.readFileSync(P,'utf8');
const legacy="X.fillStyle='rgba(20,22,32,.76)';rr(x+12,y+h-34,w-24,24,7);X.fillStyle='#fff';text(shops[k],x+w/2,y+h-16,15,'center')";
if(!base.includes(legacy))throw Error('v0.40 generic sign marker moved');
const specs=[
 ['control',legacy,'legacy plate'],
 ['text-only',"X.fillStyle='#fff';text(shops[k],x+w/2,y+h-14,13,'center')",'architecture carries identity; text is reinforcement'],
 ['thin-fascia',"X.fillStyle='#2228';X.fillRect(x+8,y+h-25,w-16,18);X.fillStyle='#fff';text(shops[k],x+w/2,y+h-12,12,'center')",'smaller integrated storefront fascia'],
 ['full-fascia',"X.fillStyle='#2228';X.fillRect(x,y+h-24,w,18);X.fillStyle='#fff';text(shops[k],x+w/2,y+h-11,12,'center')",'edge-to-edge facade band'],
 ['text+cornice',"X.fillStyle='#fff';X.fillRect(x+8,y+8,w-16,4);text(shops[k],x+w/2,y+h-14,13,'center')",'trade plate bytes for a visible roof/cornice cue'],
 ['text+base',"X.fillStyle='#2228';X.fillRect(x+8,y+h-20,w-16,4);X.fillStyle='#fff';text(shops[k],x+w/2,y+h-7,12,'center')",'low facade grounding instead of a floating card']
],out=[];
try{for(let[n,repl,intent]of specs){let src=base.replace(legacy,repl);fs.writeFileSync(P,src);execFileSync(process.execPath,['--check',P]);let log=execFileSync(process.execPath,['scripts/build.mjs'],{encoding:'utf8'}),best=JSON.parse(fs.readFileSync('dist/compression.json'))[0];out.push({candidate:n,intent,sourceBytes:Buffer.byteLength(src),zipBytes:best.zip,reserve:13312-best.zip,bestVariant:best.variant});console.log(n,best.zip,13312-best.zip,log.match(/selected[^\n]*/)?.[0]||'')}}finally{fs.writeFileSync(P,base)}
let c=out[0];for(let r of out){r.sourceDelta=r.sourceBytes-c.sourceBytes;r.zipDelta=r.zipBytes-c.zipBytes}fs.mkdirSync('research',{recursive:true});fs.writeFileSync('research/v040-sign-massing-results.json',JSON.stringify(out,null,2));console.log('\nV0.40 SIGN / MASSING RESEARCH\n'+JSON.stringify(out,null,2));
