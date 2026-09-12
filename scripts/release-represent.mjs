function rep(s,a,b=''){if(!s.includes(a))throw Error('representation anchor missing: '+a);return s.replace(a,b)}
function direct(s){
 s=rep(s,'function today(){return Date.now()/864e5|0}','function today(){return(Date.now()/864e5|0)+seedZone*173+runN*19}');
 s=rep(s,'const _day=today;today=()=>_day()+seedZone*173+runN*19;');
 s=rep(s,'function paintStamp(u,x=u.x,y=u.y,r=28){let n=paintBits','function paintStamp(u,x=u.x,y=u.y,r=28){r+=level?stamp:0;let n=paintBits');
 s=rep(s,'const _rain=paintStamp;paintStamp=(u,x=u.x,y=u.y,r=28)=>_rain(u,x,y,r+(level?stamp:0));');
 s=rep(s,'title=rules;');s=rep(s,'const _titleW=title;');s=rep(s,'_titleW()','rules()');
 return s
}
function canvas(s){return rep(s,"document.getElementById('game')||document.getElementById('c')","document.getElementById('c')")}
function roof(s){
 s=rep(s,"function drawTownRoof(x,y,w,k,v,house){let h=house?25+v*85:shopHue[k],g=house||k&1&&k!=3;X.fillStyle=`hsl(${h} 34% 39%)`;","function drawTownRoof(x,y,w,k,H,house){let g=house||k&1&&k!=3;X.fillStyle=`hsl(${H} 34% 39%)`;");
 return rep(s,'let g=drawTownRoof(x,y,w,k,v,house),b=','let g=drawTownRoof(x,y,w,k,H,house),b=')
}
function textAlign(s){
 s=rep(s,"function rr(x,y,w,h,r){X.beginPath();X.roundRect(x,y,w,h,r);X.fill()}function text(t,x,y,s=20,a='left',al=1){X.globalAlpha=al;X.font=`800 ${s}px system-ui`;X.textAlign=a;","function rr(x,y,w,h,r){X.beginPath();X.roundRect(x,y,w,h,r);X.fill()}function text(t,x,y,s=20,a=0,al=1){X.globalAlpha=al;X.font=`800 ${s}px system-ui`;X.textAlign=['left','center','right'][a];");
 return s.replaceAll(",'center'",',1').replaceAll(",'right'",',2')
}
function toneCode(s){
 for(let[a,b]of[['sine','0'],['square','1'],['sawtooth','2'],['triangle','3']])s=s.replaceAll(`'${a}'`,b);
 return rep(s,"function tone(f=220,d=.08,t=0,v=.03,f2=0){if(!AC)return;let o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;","function tone(f=220,d=.08,t=0,v=.03,f2=0){if(!AC)return;let o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=['sine','square','sawtooth','triangle'][t];")
}
function pointer(s){
 let a="C.addEventListener('mousemove',e=>{let r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);mx=cl((e.clientX-r.left-(r.width-W*s)/2)/s,0,W);my=cl((e.clientY-r.top-(r.height-H*s)/2)/s,0,H)});",b="C.addEventListener('mousemove',point);",p="C.onpointerdown=e=>{let r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);mx=cl((e.clientX-r.left-r.width/2)/s+W/2,0,W);my=cl((e.clientY-r.top-r.height/2)/s+H/2,0,H);AC?.resume?.()};",q="C.onpointerdown=e=>{point(e);AC?.resume?.()};";
 s=rep(s,a,b);s=rep(s,p,q);
 return rep(s,'function audio(){',"function point(e){let r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);mx=cl((e.clientX-r.left-r.width/2)/s+W/2,0,W);my=cl((e.clientY-r.top-r.height/2)/s+H/2,0,H)}function audio(){")
}
function keys(s){let k="e.code[0]=='K'?e.code[3]:e.code";return s.replaceAll('K[e.code]=1',`K[${k}]=1`).replaceAll('K[e.code]=0',`K[${k}]=0`).replaceAll('K.KeyD','K.D').replaceAll('K.KeyA','K.A').replaceAll('K.KeyS','K.S').replaceAll('K.KeyW','K.W')}
function math(s){s=s.replaceAll('Math.','MM.');return rep(s,'const C=','const MM=Math,C=')}
export function compactRepresentation(s){for(let f of[direct,canvas,roof,textAlign,toneCode,pointer,keys,math])s=f(s);return s}
