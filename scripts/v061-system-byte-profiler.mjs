import fs from'node:fs';import{deflateRawSync}from'node:zlib';import{minify}from'terser';import{releaseSource}from'./release-prune.mjs';import{staticizeWrappers}from'./release-staticize.mjs';
const order=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'],base=Object.fromEntries(order.map(f=>[f,fs.readFileSync('src/'+f,'utf8')]));
const css=fs.readFileSync('src/style.css','utf8').replace(/\s+/g,' ').replace(/ ?([{}:;,]) ?/g,'$1').replace('html,body','body').replace('overflow:hidden;',''),shell=j=>`<canvas id=c width=1280 height=720></canvas><style>${css}</style><script>${j.replaceAll('</script','<\\/script')}</script>`;
const kinds=['fountain','hedge','pond','clock','stall','rage','soda','bomb','bakery','market','green','hall','b','play','title','end'],PW=/^(x|y|id|name|vx|vy|tx|ty|hp|max|val|hue|anger|frenzy|boost|distract|spray|paint|order|rescue|live|tap|tapT|trail|cool|stun|power|dash|step|say|line|ai|cap|hot|ox|oy|bus|col|dir|on|sp|a|h|t|r|w|p|s|l|v|k|os|lm|ln|aim|dx|dy|i|hit|u|n|m|o)$/;
const opts={ecma:2020,toplevel:true,compress:{passes:4,drop_console:true},mangle:{toplevel:true,properties:{regex:PW}},format:{comments:false}};
function rep(s,a,b=''){if(!s.includes(a))throw Error('system profiler anchor missing: '+a.slice(0,90));return s.replace(a,b)}
const cut={
 staticPeople:f=>(f['herd.js']=rep(f['herd.js'],'updatePeople(dt);',''),f),
 noPeople:f=>(f['herd.js']=rep(f['herd.js'],'updatePeople(dt);',''),f['render.js']=rep(f['render.js'],'drawPeople();',''),f['core.js']=rep(f['core.js'],'for(let i=0;i<18;i++)people.push(makePerson(R(1120,80),R(575,90)));',''),f['core.js']=rep(f['core.js'],'for(let i=0;i<76;i++)people.push(makePerson(R(3130,70),R(1700,90)));',''),f),
 musicLite:f=>(f['top10.js']=rep(f['top10.js'],"if(stamp>2&&n%2)tone(220+55*(n%4),.04,'triangle',.007)",''),f),
 noMusic:f=>(f['top10.js']=rep(f['top10.js'],'music(dt);',''),f),
 noUnload:f=>(f['core.js']=rep(f['core.js'],"globalThis.onbeforeunload=e=>state==='play'&&(e.preventDefault(),e.returnValue='');",''),f),
 noErrorRecovery:f=>(f['core.js']=rep(f['core.js'],"globalThis.onerror=()=>{state='title';paused=0;requestAnimationFrame(frame)};",''),f),
 simpleMarkers:f=>(f['polish.js']=rep(f['polish.js'],"if(!done){X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.arc(sx,sy,r+6+Math.sin(clock*7)*2,0,T);X.stroke()}",''),f),
 noMarkerNames:f=>(f['polish.js']=rep(f['polish.js'],"X.fillStyle='#fff';text(l.n,sx,sy-20,10,'center')",''),f)
};
const plans={base:[],staticPeople:['staticPeople'],noPeople:['noPeople'],musicLite:['musicLite'],noMusic:['noMusic'],noUnload:['noUnload'],noErrorRecovery:['noErrorRecovery'],simpleMarkers:['simpleMarkers'],noMarkerNames:['noMarkerNames'],safeLite:['staticPeople','musicLite','noUnload'],runtimeLean:['staticPeople','noMusic','noUnload'],markerLite:['simpleMarkers','noMarkerNames'],systemLean:['staticPeople','musicLite','noUnload','simpleMarkers']};
async function score(name,steps){let f={...base};for(let k of steps)f=cut[k](f);let raw=order.map(x=>f[x]).join('\n'),src=staticizeWrappers(releaseSource(raw)),en=kinds.reduce((s,k,i)=>s.replaceAll(`'${k}'`,i),src),code=(await minify(en,opts)).code,h=shell(code);return{name,steps,source:Buffer.byteLength(src),terser:Buffer.byteLength(code),deflate:deflateRawSync(Buffer.from(h),{level:9}).length}}
let out=[];for(let [n,s]of Object.entries(plans))out.push(await score(n,s));let b=out[0];for(let x of out)x.saved=b.deflate-x.deflate;out.sort((a,b)=>b.saved-a.saved);console.table(out.map(x=>({variant:x.name,saved:x.saved,deflate:x.deflate,terser:x.terser,source:x.source,changes:x.steps.join('+')})));fs.mkdirSync('dist',{recursive:true,force:true});fs.writeFileSync('dist/v061-system-byte-profile.json',JSON.stringify(out,null,2));
