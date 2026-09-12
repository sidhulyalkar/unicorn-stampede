import fs from'node:fs';import{deflateRawSync}from'node:zlib';import{minify}from'terser';import{releaseSource}from'./release-prune.mjs';import{staticizeWrappers}from'./release-staticize.mjs';
const order=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],base=Object.fromEntries(order.map(f=>[f,fs.readFileSync('src/'+f,'utf8')]));
const css=fs.readFileSync('src/style.css','utf8').replace(/\s+/g,' ').replace(/ ?([{}:;,]) ?/g,'$1').replace('html,body','body').replace('overflow:hidden;',''),shell=j=>`<canvas id=c width=1280 height=720></canvas><style>${css}</style><script>${j.replaceAll('</script','<\\/script')}</script>`;
const kinds=['fountain','hedge','pond','clock','stall','rage','soda','bomb','bakery','market','green','hall','b','play','title','end'],PW=/^(x|y|id|name|vx|vy|tx|ty|hp|max|val|hue|anger|frenzy|boost|distract|spray|paint|order|rescue|live|tap|tapT|trail|cool|stun|power|dash|step|say|line|ai|cap|hot|ox|oy|bus|col|dir|on|sp|a|h|t|r|w|p|s|l|v|k|os|lm|ln|aim|dx|dy|i|hit|u|n|m|o)$/;
const opts={ecma:2020,toplevel:true,compress:{passes:4,drop_console:true},mangle:{toplevel:true,properties:{regex:PW}},format:{comments:false}};
function rep(s,a,b=''){if(!s.includes(a))throw Error('particle profiler anchor missing: '+a.slice(0,120));return s.replace(a,b)}
function all(s,a,b=''){if(!s.includes(a))throw Error('particle profiler anchor missing: '+a);return s.replaceAll(a,b)}
function noFx(f){
 f={...f};
 f['render.js']=rep(f['render.js'],'drawParts();','');
 f['herd.js']=rep(f['herd.js'],'updateParts(dt);','');
 f['core.js']=rep(f['core.js'],'fx(o.x+o.w/2,o.y+o.h/2,18,180);','');
 f['core.js']=rep(f['core.js'],'fx(u.x,u.y,28,220)','');
 f['core.js']=rep(f['core.js'],'fx(unis[i].x,unis[i].y,18,150)','');
 f['herd.js']=rep(f['herd.js'],'if(rng()<dt*10)fx(u.x,u.y,2,90)','');
 f['herd.js']=rep(f['herd.js'],'fx(x,y,2,55)','');
 f['whip.js']=rep(f['whip.js'],'fx(u.x,u.y,6+n*2,120);','');
 f['whip.js']=rep(f['whip.js'],'fx(u.x,u.y,4+n,85);','');
 f['top10.js']=rep(f['top10.js'],"fx(x,y,l.k==='hall'?46:26,240);",'');
 f['top10.js']=rep(f['top10.js'],'fx(c.x,c.y,8,120);','');
 f['expansion.js']=rep(f['expansion.js'],'fx(h.x+h.w/2,h.y+h.h/2,60,420);','');
 f['expansion.js']=rep(f['expansion.js'],'if(landWin===2&&rng()<dt*5)fx(R(WW),R(WH),8,220);','');
 return f
}
const people="function drawPeople(){for(let p of people){townCircle(p.x,p.y,10,`hsl(${p.h} 45% 70%)`);X.strokeStyle='#263242';X.lineWidth=4;X.beginPath();X.moveTo(p.x,p.y+10);X.lineTo(p.x,p.y+30);X.moveTo(p.x,p.y+17);X.lineTo(p.x-10,p.y+24);X.moveTo(p.x,p.y+17);X.lineTo(p.x+10,p.y+24);X.stroke();}}";
const flies="function drawFlies(){for(let b of flies){X.fillStyle='#ffe56d';X.beginPath();X.ellipse(b.x-4,b.y,6,3,0,0,T);X.ellipse(b.x+4,b.y,6,3,0,0,T);X.fill();X.fillStyle='#3b3a28';X.fillRect(b.x-2,b.y-4,4,9)}}";
function simplePeople(f){f={...f};f['render.js']=rep(f['render.js'],people,"function drawPeople(){for(let p of people)townCircle(p.x,p.y,8,`hsl(${p.h} 45% 70%)`)}");return f}
function simpleFlies(f){f={...f};f['render.js']=rep(f['render.js'],flies,"function drawFlies(){X.fillStyle='#ffe56d';for(let b of flies)townCircle(b.x,b.y,5)}");return f}
function noTrail(f){f={...f};f['render.js']=rep(f['render.js'],'for(let u of unis)if(u.live)trail(u);','');return f}
const plans={base:f=>f,noFx,noFxPeople:f=>simplePeople(noFx(f)),noFxFlies:f=>simpleFlies(noFx(f)),noFxPeopleFlies:f=>simpleFlies(simplePeople(noFx(f))),noFxTrail:f=>noTrail(noFx(f))};
async function score(name,fn){let f=fn({...base}),src=staticizeWrappers(releaseSource(order.map(x=>f[x]).join('\n'))),en=kinds.reduce((s,k,i)=>s.replaceAll(`'${k}'`,i),src),code=(await minify(en,opts)).code,h=shell(code);return{name,source:Buffer.byteLength(src),terser:Buffer.byteLength(code),deflate:deflateRawSync(Buffer.from(h),{level:9}).length}}
let out=[];for(let [n,fn]of Object.entries(plans))out.push(await score(n,fn));let b=out[0];for(let x of out)x.saved=b.deflate-x.deflate;out.sort((a,b)=>b.saved-a.saved);console.table(out.map(x=>({variant:x.name,saved:x.saved,deflate:x.deflate,terser:x.terser,source:x.source})));fs.mkdirSync('dist',{recursive:true,force:true});fs.writeFileSync('dist/v061-particle-byte-profile.json',JSON.stringify(out,null,2));
