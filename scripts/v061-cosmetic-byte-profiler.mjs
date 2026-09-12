import fs from'node:fs';import{deflateRawSync}from'node:zlib';import{minify}from'terser';import{releaseSource}from'./release-prune.mjs';import{staticizeWrappers}from'./release-staticize.mjs';
const order=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],base=Object.fromEntries(order.map(f=>[f,fs.readFileSync('src/'+f,'utf8')]));
const css=fs.readFileSync('src/style.css','utf8').replace(/\s+/g,' ').replace(/ ?([{}:;,]) ?/g,'$1').replace('html,body','body').replace('overflow:hidden;',''),shell=j=>`<canvas id=c width=1280 height=720></canvas><style>${css}</style><script>${j.replaceAll('</script','<\\/script')}</script>`;
const kinds=['fountain','hedge','pond','clock','stall','rage','soda','bomb','bakery','market','green','hall','b','play','title','end'],PW=/^(x|y|id|name|vx|vy|tx|ty|hp|max|val|hue|anger|frenzy|boost|distract|spray|paint|order|rescue|live|tap|tapT|trail|cool|stun|power|dash|step|say|line|ai|cap|hot|ox|oy|bus|col|dir|on|sp|a|h|t|r|w|p|s|l|v|k|os|lm|ln|aim|dx|dy|i|hit|u|n|m|o)$/;
const opts={ecma:2020,toplevel:true,compress:{passes:4,drop_console:true},mangle:{toplevel:true,properties:{regex:PW}},format:{comments:false}};
function rep(s,a,b=''){if(!s.includes(a))throw Error('cosmetic profiler anchor missing: '+a.slice(0,100));return s.replace(a,b)}
const people="function drawPeople(){for(let p of people){townCircle(p.x,p.y,10,`hsl(${p.h} 45% 70%)`);X.strokeStyle='#263242';X.lineWidth=4;X.beginPath();X.moveTo(p.x,p.y+10);X.lineTo(p.x,p.y+30);X.moveTo(p.x,p.y+17);X.lineTo(p.x-10,p.y+24);X.moveTo(p.x,p.y+17);X.lineTo(p.x+10,p.y+24);X.stroke();}}";
const flies="function drawFlies(){for(let b of flies){X.fillStyle='#ffe56d';X.beginPath();X.ellipse(b.x-4,b.y,6,3,0,0,T);X.ellipse(b.x+4,b.y,6,3,0,0,T);X.fill();X.fillStyle='#3b3a28';X.fillRect(b.x-2,b.y-4,4,9)}}";
const parts="function drawParts(){for(let p of parts){X.globalAlpha=cl(p.l*2,0,1);X.fillStyle=`hsl(${p.h} 95% 65%)`;X.fillRect(p.x,p.y,8+p.l*7,8+p.l*7)}X.globalAlpha=1}";
const cut={
 simplePeople:f=>(f['render.js']=rep(f['render.js'],people,"function drawPeople(){for(let p of people)townCircle(p.x,p.y,8,`hsl(${p.h} 45% 70%)`)}"),f),
 tinyPeople:f=>(f['render.js']=rep(f['render.js'],people,"function drawPeople(){X.fillStyle='#f3c9aa';for(let p of people)townCircle(p.x,p.y,7)}"),f),
 simpleFlies:f=>(f['render.js']=rep(f['render.js'],flies,"function drawFlies(){X.fillStyle='#ffe56d';for(let b of flies)townCircle(b.x,b.y,5)}"),f),
 simpleParts:f=>(f['render.js']=rep(f['render.js'],parts,"function drawParts(){X.fillStyle='#fff';for(let p of parts)X.fillRect(p.x,p.y,7,7)}"),f),
 noPartsDraw:f=>(f['render.js']=rep(f['render.js'],'drawParts();',''),f),
 noPartsUpdate:f=>(f['herd.js']=rep(f['herd.js'],'updateParts(dt);',''),f),
 noParts:f=>(f['render.js']=rep(f['render.js'],'drawParts();',''),f['herd.js']=rep(f['herd.js'],'updateParts(dt);',''),f),
 noTrail:f=>(f['render.js']=rep(f['render.js'],'for(let u of unis)if(u.live)trail(u);',''),f),
 simpleFlowers:f=>(f['render.js']=rep(f['render.js'],"for(let i=0;i<10;i++){let a=i*T/10,r=f.r*.65;townCircle(f.x+Math.cos(a)*r,f.y+Math.sin(a)*r,10,`hsl(${i*47} 75% 72%)`)}","for(let i=4;i--;){let a=i*T/4,r=f.r*.65;townCircle(f.x+Math.cos(a)*r,f.y+Math.sin(a)*r,10,`hsl(${i*90} 75% 72%)`)}"),f)
};
const plans={base:[],simplePeople:['simplePeople'],tinyPeople:['tinyPeople'],simpleFlies:['simpleFlies'],simpleParts:['simpleParts'],noPartsDraw:['noPartsDraw'],noPartsUpdate:['noPartsUpdate'],noParts:['noParts'],noTrail:['noTrail'],simpleFlowers:['simpleFlowers'],peopleFlies:['simplePeople','simpleFlies'],cosmeticLite:['simplePeople','simpleFlies','simpleParts'],particlesLite:['simplePeople','simpleParts','simpleFlies','simpleFlowers']};
async function score(name,steps){let f={...base};for(let k of steps)f=cut[k](f);let src=staticizeWrappers(releaseSource(order.map(x=>f[x]).join('\n'))),en=kinds.reduce((s,k,i)=>s.replaceAll(`'${k}'`,i),src),code=(await minify(en,opts)).code,h=shell(code);return{name,steps,source:Buffer.byteLength(src),terser:Buffer.byteLength(code),deflate:deflateRawSync(Buffer.from(h),{level:9}).length}}
let out=[];for(let [n,s]of Object.entries(plans))out.push(await score(n,s));let b=out[0];for(let x of out)x.saved=b.deflate-x.deflate;out.sort((a,b)=>b.saved-a.saved);console.table(out.map(x=>({variant:x.name,saved:x.saved,deflate:x.deflate,terser:x.terser,source:x.source,changes:x.steps.join('+')})));fs.mkdirSync('dist',{recursive:true,force:true});fs.writeFileSync('dist/v061-cosmetic-byte-profile.json',JSON.stringify(out,null,2));
