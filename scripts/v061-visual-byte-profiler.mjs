import fs from'node:fs';import{deflateRawSync}from'node:zlib';import{minify}from'terser';import{releaseSource}from'./release-prune.mjs';import{staticizeWrappers}from'./release-staticize.mjs';
const order=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],files=Object.fromEntries(order.map(f=>[f,fs.readFileSync('src/'+f,'utf8')]));
const css=fs.readFileSync('src/style.css','utf8').replace(/\s+/g,' ').replace(/ ?([{}:;,]) ?/g,'$1').replace('html,body','body').replace('overflow:hidden;',''),shell=j=>`<canvas id=c width=1280 height=720></canvas><style>${css}</style><script>${j.replaceAll('</script','<\\/script')}</script>`;
const kinds=['fountain','hedge','pond','clock','stall','rage','soda','bomb','bakery','market','green','hall','b','play','title','end'],PW=/^(x|y|id|name|vx|vy|tx|ty|hp|max|val|hue|anger|frenzy|boost|distract|spray|paint|order|rescue|live|tap|tapT|trail|cool|stun|power|dash|step|say|line|ai|cap|hot|ox|oy|bus|col|dir|on|sp|a|h|t|r|w|p|s|l|v|k|os|lm|ln|aim|dx|dy|i|hit|u|n|m|o)$/;
const opts={ecma:2020,toplevel:true,compress:{passes:4,drop_console:true},mangle:{toplevel:true,properties:{regex:PW}},format:{comments:false}};
function rep(s,a,b=''){if(!s.includes(a))throw Error('profiler anchor missing: '+a.slice(0,80));return s.replace(a,b)}
const cut={
 bench:s=>rep(s,";(x/560|0)&1&&townBench(x+30,r[1]-22)",''),
 street:s=>rep(s,'drawTownStreetDecor();',''),
 fence:s=>rep(s,"w>150&&(townFence(x+4,y+h-28,50),townFence(x+w-54,y+h-28,50));",''),
 bush:s=>rep(s,'townBush(x+19,y+h-10);townBush(x+w-23,y+h-10)',''),
 micro:s=>rep(s,"if(k==1){X.fillStyle='#d99749';for(let i=3;i--;)X.beginPath(),X.ellipse(x+8+i*10,y+h-6,6,4,0,0,T),X.fill()}if(k==5)townCircle(x+w-9,y+h-8,5,'#ff7396')",''),
 props:s=>rep(s,'drawShopProps(k,x,y,w,h)',''),
 gem:s=>rep(s,'townCircle(x+w/2,Y+8,4,`hsl(${H} 60% 45%)`);',''),
 attic:s=>rep(s,"townCircle(x+w/2,y+26,14,'#8fd3e1');",''),
 awning:s=>rep(s,'drawTownAwning(x,y+48,w,k);',''),
 hueFormula:s=>rep(s,",shopHue=[0,215,78,150,318,265,245,3]",'').replaceAll('shopHue[k]','k*43')
};
const plans={
 base:[],hueFormula:['hueFormula'],noBench:['bench'],noFence:['fence'],noBush:['bush'],noMicro:['micro'],noProps:['props'],noGem:['gem'],noAttic:['attic'],noStreet:['street'],noAwning:['awning'],
 lite:['hueFormula','bench','fence','micro','props','gem'],
 liteGarden:['hueFormula','bench','micro','props','gem'],
 coreGrammar:['hueFormula','street','fence','bush','micro','props','gem','attic']
};
async function score(name,steps){let r=files['render.js'];for(let k of steps)r=cut[k](r);let raw=order.map(f=>f==='render.js'?r:files[f]).join('\n'),src=staticizeWrappers(releaseSource(raw)),en=kinds.reduce((s,k,i)=>s.replaceAll(`'${k}'`,i),src),code=(await minify(en,opts)).code,h=shell(code);return{name,steps,source:Buffer.byteLength(src),terser:Buffer.byteLength(code),deflate:deflateRawSync(Buffer.from(h),{level:9}).length}}
let out=[];for(let [name,steps] of Object.entries(plans))out.push(await score(name,steps));let base=out[0];for(let x of out)x.saved=base.deflate-x.deflate;out.sort((a,b)=>b.saved-a.saved);console.table(out.map(x=>({variant:x.name,saved:x.saved,deflate:x.deflate,terser:x.terser,source:x.source,changes:x.steps.join('+')})));fs.mkdirSync('dist',{recursive:true,force:true});fs.writeFileSync('dist/v061-visual-byte-profile.json',JSON.stringify(out,null,2));
