import fs from'node:fs';
import{deflateRawSync}from'node:zlib';
import{minify}from'terser';
import{submissionSource}from'./release-submit.mjs';

const files=['core.js','herd.js','render.js','ui.js','top10.js','polish.js','whip.js','worlds.js','expansion.js'];
const raw=files.map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n');
const base=submissionSource(raw);
const css=fs.readFileSync('src/style.css','utf8').replace(/\s+/g,' ').replace(/ ?([{}:;,]) ?/g,'$1').replace('html,body','body').replace('overflow:hidden;','');
const shell=j=>`<canvas id=c width=1280 height=720></canvas><style>${css}</style><script>${j.replaceAll('</script','<\\/script')}</script>`;
const PW=/^(x|y|id|name|vx|vy|tx|ty|hp|max|val|hue|anger|frenzy|boost|distract|spray|paint|order|rescue|live|tap|tapT|trail|cool|stun|power|dash|step|say|line|ai|cap|hot|ox|oy|bus|col|dir|on|sp|a|h|t|r|w|p|s|l|v|k|os|lm|ln|aim|dx|dy|i|hit|u|n|m|o)$/;
const kinds=['fountain','hedge','pond','clock','stall','rage','soda','bomb','bakery','market','green','hall','b','play','title','end'];
const opts={ecma:2020,toplevel:true,compress:{passes:4,drop_console:true},mangle:{toplevel:true,properties:{regex:PW}},format:{comments:false}};

function insertBefore(s,anchor,code){let i=s.indexOf(anchor);if(i<0)throw Error('insert anchor missing '+anchor);return s.slice(0,i)+code+s.slice(i)}
function aliasMath(s,names){let used=[];for(let [name,id]of names){let q='MM.'+name,c=s.split(q).length-1;if(c>1){s=s.replaceAll(q,id);used.push([name,id,c])}}if(!used.length)return s;let defs=used.map(([name,id])=>`${id}=MM.${name}`).join(',');return s.replace('const MM=Math,C=',`const MM=Math,${defs},C=`)}
function splitArgs(t){let a=[],q='',d=0,start=0,esc=0;for(let i=0;i<t.length;i++){let c=t[i];if(q){if(esc){esc=0;continue}if(c==='\\'){esc=1;continue}if(c===q)q='';continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c==='('||c==='['||c==='{')d++;else if(c===')'||c===']'||c==='}')d--;else if(c===','&&!d){a.push(t.slice(start,i));start=i+1}}a.push(t.slice(start));return a.map(x=>x.trim())}
function closeParen(s,o){let d=0,q='',esc=0;for(let i=o;i<s.length;i++){let c=s[i];if(q){if(esc){esc=0;continue}if(c==='\\'){esc=1;continue}if(c===q)q='';continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c==='(')d++;else if(c===')'&&!--d)return i}return-1}
function circles(s){let seek='X.beginPath();X.arc(',at=0,n=0;for(;;){let i=s.indexOf(seek,at);if(i<0)break,o=i+seek.length-1,e=closeParen(s,o),tail=';X.fill();';if(e<0)break;if(s.slice(e+1,e+1+tail.length)!==tail){at=e+1;continue}let args=splitArgs(s.slice(o+1,e));if(args.length===5&&args[3]==='0'&&args[4]==='T'){let r=`townCircle(${args.slice(0,3).join(',')});`;s=s.slice(0,i)+r+s.slice(e+1+tail.length);at=i+r.length;n++}else at=e+1}return s}
function textTables(s){let r=/X\.font='12px Arial';(\[[^\]]+\])\.forEach\(\(s,i\)=>X\.fillText\(s,W\/2,76\+i\*25\)\)/,m=r.exec(s);if(m){let a=Function('return '+m[1])(),q=JSON.stringify(a.join('|'));s=s.replace(m[0],`X.font='12px Arial';${q}.split('|').forEach((s,i)=>X.fillText(s,W/2,76+i*25))`)}let r2=/let m=(\[[^\]]+\]),u=unis\[caps\[0\]\]/,m2=r2.exec(s);if(m2){let a=Function('return '+m2[1])(),q=JSON.stringify(a.join('|'));s=s.replace(m2[0],`let m=${q}.split('|'),u=unis[caps[0]]`)}return s}
function wrapMethod(s,name,id,args=1){let q=`X.${name}(`,c=s.split(q).length-1;if(c<3)return s;s=s.replaceAll(q,`${id}(`);let f=args?`function ${id}(...a){X.${name}(...a)}`:`function ${id}(){X.${name}()}`;return insertBefore(s,'function seeded',f)}
function wrapMethods(s,set){for(let [name,id,args]of set)s=wrapMethod(s,name,id,args);return s}
function setters(s,set){let defs=[];for(let [name,id]of set){let r=new RegExp(`X\\.${name}=([^;]+);`,'g'),n=0;s=s.replace(r,(_,v)=>(n++,`${id}(${v});`));if(n>2)defs.push(`function ${id}(v){X.${name}=v}`)}if(defs.length)s=insertBefore(s,'function seeded',defs.join(''));return s}
function pulse(s){return s.replace("if(!done){X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.arc(sx,sy,r+6+MM.sin(clock*7)*2,0,T);X.stroke()}",'')}
function musicLite(s){return s.replace("if(stamp>2&&n%2)tone(220+55*(n%4),.04,3,.007)",'')}
const Mhot=[['hypot','mh'],['max','mxm'],['min','mnm'],['sin','ms'],['cos','mc']];
const Mall=[...Mhot,['round','mr'],['floor','mf'],['ceil','me'],['atan2','ma'],['sign','mg'],['abs','mb'],['pow','mp']];
const methodHot=[['fillRect','xf',1],['beginPath','xb',0],['fill','xz',0],['stroke','xs',0],['lineTo','xl',1],['moveTo','xm',1],['arc','xa',1]];
const setterHot=[['fillStyle','cf'],['strokeStyle','cs'],['lineWidth','cw']];
const plans={
 base:s=>s,
 mathHot:s=>aliasMath(s,Mhot),
 mathAll:s=>aliasMath(s,Mall),
 circles,
 textTables,
 canvasMethods:s=>wrapMethods(s,methodHot),
 canvasSetters:s=>setters(s,setterHot),
 mathCircle:s=>circles(aliasMath(s,Mall)),
 mathCircleText:s=>textTables(circles(aliasMath(s,Mall))),
 mathCircleTextPulse:s=>pulse(textTables(circles(aliasMath(s,Mall)))),
 mathCircleTextMusic:s=>musicLite(textTables(circles(aliasMath(s,Mall)))),
 fullSymbols:s=>setters(wrapMethods(musicLite(pulse(textTables(circles(aliasMath(s,Mall))))),methodHot),setterHot)
};
async function score(name,fn){let s=fn(base);new Function(s);let en=kinds.reduce((x,k,i)=>x.replaceAll(`'${k}'`,i),s),code=(await minify(en,opts)).code,h=shell(code);return{name,source:Buffer.byteLength(s),terser:Buffer.byteLength(code),deflate:deflateRawSync(Buffer.from(h),{level:9}).length}}
let out=[];for(let [name,fn]of Object.entries(plans))try{out.push(await score(name,fn))}catch(e){out.push({name,error:e.stack||e.message})}let b=out.find(x=>x.name==='base');for(let x of out)if(x.deflate)x.saved=b.deflate-x.deflate;out.sort((a,b)=>(b.saved??-1)-(a.saved??-1));console.table(out.map(x=>({variant:x.name,saved:x.saved,deflate:x.deflate,terser:x.terser,source:x.source,error:x.error?.split('\n')[0]})));fs.mkdirSync('dist',{recursive:true});fs.writeFileSync('dist/v065-symbol-profile.json',JSON.stringify(out,null,2));
