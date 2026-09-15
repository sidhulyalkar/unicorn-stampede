// Showcase v1.15: make player intent and town consequence persist visibly in the world.
// This layer is presentation-only: no collision, score, conquest, or herd-physics authority lives here.
const SHOWCASE_V115_RUIN_PALETTES=[
  {slab:'#d7b59d',deep:'#704d54',beam:'#7a5844',accent:'#ff79b6'},
  {slab:'#b9b39b',deep:'#365b64',beam:'#71543f',accent:'#69d3d6'},
  {slab:'#737a7f',deep:'#343b40',beam:'#555d61',accent:'#d5ae69'},
  {slab:'#966140',deep:'#4b3025',beam:'#65422f',accent:'#5ab5a8'}
];
let showcaseV115PrevFlow=0,showcaseV115Secured=[0,0,0,0],showcaseV115Bursts=[],showcaseV115DistrictFlips=0;
function showcaseV115Reset(){showcaseV115PrevFlow=0;showcaseV115Secured=[0,0,0,0];showcaseV115Bursts=[];showcaseV115DistrictFlips=0}
function showcaseV115RouteList(){return level?unis.filter(u=>u?.live&&u.id!==caps[0]&&(u.order||0)>.08):[]}
function showcaseV115RuinList(){return level?objs.filter(o=>o&&o.hp<=0&&(o.t==='b'||o.t==='clock'||o.t==='stall')):[]}
function showcaseV115DistrictRatio(i){if(!level||typeof district!=='function'||!(distGoal>0))return 0;return cl(district(i)/distGoal,0,1)}
function showcaseV115DistrictAnchors(){
  const vx=roads.filter(r=>r[3]>r[2]).map(r=>r[0]+r[2]/2).sort((a,b)=>a-b),hy=roads.filter(r=>r[2]>=r[3]).map(r=>r[1]+r[3]/2).sort((a,b)=>a-b);
  if(vx.length>=2&&hy.length>=2)return[[vx[0],hy[0]],[vx[vx.length-1],hy[0]],[vx[0],hy[hy.length-1]],[vx[vx.length-1],hy[hy.length-1]]];
  return[[WW*.24,WH*.28],[WW*.76,WH*.28],[WW*.24,WH*.72],[WW*.76,WH*.72]];
}
function showcaseV115CheerAt(x,y,power=1){
  if(!level||!people?.length)return 0;const max=Math.min(people.length,power>1?14:9),near=people.map(p=>({p,d:Math.hypot(p.x-x,p.y-y)})).sort((a,b)=>a.d-b.d);let n=0;
  for(let i=0;i<near.length&&n<max;i++){const q=near[i];if(q.d>680&&n>=3)break;q.p.showcaseCheer=Math.max(q.p.showcaseCheer||0,1.35+power*.55);q.p.showcaseCheerSeed=(q.p.x*13+q.p.y*7)|0;n++}return n;
}
function showcaseV115DrawRouteOrders(){
  if(!level||state!=='play')return;const reduced=globalThis.showcaseSettings?.reducedMotion;
  for(const u of showcaseV115RouteList()){
    const q=cl((u.order||0)/5.2,0,1),dx=u.ox||Math.cos(u.a||0),dy=u.oy||Math.sin(u.a||0),pulse=reduced?0:Math.sin(clock*5+u.id)*3,len=95+175*q,sx=u.x+dx*42,sy=u.y+dy*42,ex=sx+dx*(len+pulse),ey=sy+dy*(len+pulse),nx=-dy,ny=dx;
    X.save();X.globalAlpha=.14+.34*q;X.strokeStyle=`hsl(${u.h} 92% 72%)`;X.lineWidth=4;X.setLineDash([13,11]);X.beginPath();X.moveTo(sx,sy);X.lineTo(ex,ey);X.stroke();X.setLineDash([]);
    X.globalAlpha=.32+.5*q;X.fillStyle=`hsl(${u.h} 92% 72%)`;X.beginPath();X.moveTo(ex+dx*13,ey+dy*13);X.lineTo(ex-dx*13+nx*11,ey-dy*13+ny*11);X.lineTo(ex-dx*13-nx*11,ey-dy*13-ny*11);X.closePath();X.fill();
    for(let k=1;k<4;k++){const t=.25+k*.16,x=sx+(ex-sx)*t,y=sy+(ey-sy)*t;X.globalAlpha=.13+.2*q;X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.moveTo(x-dx*7+nx*6,y-dy*7+ny*6);X.lineTo(x,y);X.lineTo(x-dx*7-nx*6,y-dy*7-ny*6);X.stroke()}
    if(q>.58){const lx=ex+nx*14,ly=ey+ny*14;X.globalAlpha=.78;X.fillStyle='#07101dcc';rr(lx-35,ly-10,70,20,7);X.fillStyle='#fff';text('ROUTE '+Math.ceil(u.order)+'s',lx,ly+4,8,'center')}
    X.restore();
  }
}
function showcaseV115DrawRuins(){
  if(!level)return;const p=SHOWCASE_V115_RUIN_PALETTES[zone]||SHOWCASE_V115_RUIN_PALETTES[0];
  for(const o of showcaseV115RuinList()){
    const seed=((o.x*17+o.y*11+o.w*7+o.h*3)|0),base=o.y+o.h-9;X.save();
    for(let i=0;i<7;i++){const rw=15+((seed+i*29)%24),rh=7+((seed+i*17)%13),span=Math.max(12,o.w-rw-10),px=o.x+5+Math.abs((seed+i*61)%span),py=base-rh+((seed+i*23)%15)-8;X.fillStyle=i%3===0?p.accent:i&1?p.slab:p.deep;X.globalAlpha=i%3===0?.58:.9;X.save();X.translate(px+rw/2,py+rh/2);X.rotate((((seed>>2)+i*19)%21-10)/35);rr(-rw/2,-rh/2,rw,rh,2);X.restore()}
    X.globalAlpha=.9;X.strokeStyle=p.beam;X.lineWidth=6;X.beginPath();X.moveTo(o.x+10,base-25);X.lineTo(o.x+Math.min(o.w-10,78),base-3);X.moveTo(o.x+o.w-12,base-22);X.lineTo(o.x+Math.max(12,o.w-82),base-1);X.stroke();
    if(zone===0){for(let i=0;i<3;i++)townCircle(o.x+20+i*18,base-9-(i&1)*6,4,`hsl(${330+i*45} 75% 68%)`)}
    else if(zone===1){X.globalAlpha=.32;X.fillStyle='#8be3e6';X.beginPath();X.ellipse(o.x+o.w*.65,base+2,Math.min(46,o.w*.22),8,0,0,T);X.fill()}
    else if(zone===2){X.globalAlpha=.65;X.fillStyle='#e0b86d';X.fillRect(o.x+o.w*.52,base-24,8,12)}
    else{X.strokeStyle='#d4aa70';X.lineWidth=3;X.beginPath();X.moveTo(o.x+o.w*.38,base-33);X.lineTo(o.x+o.w*.7,base-4);X.stroke()}
    X.restore();
  }
}
function showcaseV115DrawDistrictStandards(){
  if(!level)return;const a=showcaseV115DistrictAnchors();
  for(let i=0;i<4;i++){
    const q=showcaseV115DistrictRatio(i);if(q<.07)continue;const[x,y]=a[i],n=Math.max(1,Math.ceil(q*6));X.save();X.globalAlpha=.18+.64*q;X.strokeStyle=showcaseWorldPalette().shadow;X.lineWidth=4;X.beginPath();X.moveTo(x-64,y-58);X.lineTo(x+64,y-58);X.stroke();
    for(let k=0;k<n;k++){const px=x-55+k*22,h=hues[k%hues.length];X.fillStyle=`hsl(${h} 88% ${q>=1?66:60}%)`;X.beginPath();X.moveTo(px,y-57);X.lineTo(px+16,y-57);X.lineTo(px+8,y-39);X.closePath();X.fill()}
    if(q>=1){X.globalAlpha=.88;X.strokeStyle='#fff2ad';X.lineWidth=3;X.beginPath();X.arc(x,y-58,76,0,T);X.stroke();X.fillStyle='#fff2ad';text('★',x,y-75,13,'center')}
    const b=showcaseV115Bursts.find(v=>v.i===i);if(b){const t=1-b.t/2.1,r=82+t*65;X.globalAlpha=Math.max(0,b.t/2.1)*.72;X.strokeStyle='#ffe77d';X.lineWidth=5;X.beginPath();X.arc(x,y-58,r,0,T);X.stroke();X.fillStyle='#07101ddd';rr(x-74,y-111,148,24,8);X.fillStyle='#ffe77d';text('DISTRICT SECURED',x,y-94,9,'center')}
    X.restore();
  }
}
function showcaseV115DrawCheers(){
  if(!level)return;const reduced=globalThis.showcaseSettings?.reducedMotion;
  for(const p of people)if((p.showcaseCheer||0)>.03&&!(p.showcaseAlarm>.05)){const q=Math.min(1,p.showcaseCheer),bob=reduced?0:Math.sin(clock*9+(p.showcaseCheerSeed||0))*.25;X.save();X.globalAlpha=.35+.55*q;X.fillStyle='#fff2a6';text('★',p.x-9,p.y-39-bob*10,8,'center');X.fillStyle='#7be8ff';text('✦',p.x+10,p.y-47+bob*7,7,'center');X.restore()}
}
const showcaseV115StartBase=startLevel;
startLevel=function(n){const r=showcaseV115StartBase(n);showcaseV115Reset();return r};
const showcaseV115UpdateBase=update;
update=function(dt){
  const r=showcaseV115UpdateBase(dt);if(!level)return r;for(const p of people)if(p.showcaseCheer)p.showcaseCheer=Math.max(0,p.showcaseCheer-dt);
  const f=globalThis.showcaseFlowState?.()||{chain:0,lastId:-1};if(f.chain>=5&&showcaseV115PrevFlow<5){const u=unis[f.lastId]||unis[caps[0]];if(u)showcaseV115CheerAt(u.x,u.y,1.35)}else if(f.chain>=3&&showcaseV115PrevFlow<3){const u=unis[f.lastId]||unis[caps[0]];if(u)showcaseV115CheerAt(u.x,u.y,1)}showcaseV115PrevFlow=f.chain;
  for(let i=0;i<4;i++){const secured=showcaseV115DistrictRatio(i)>=1;if(secured&&!showcaseV115Secured[i]){showcaseV115Secured[i]=1;showcaseV115DistrictFlips++;showcaseV115Bursts.push({i,t:2.1});const a=showcaseV115DistrictAnchors()[i];showcaseV115CheerAt(a[0],a[1],1)}else if(!secured)showcaseV115Secured[i]=0}
  for(const b of showcaseV115Bursts)b.t-=dt;showcaseV115Bursts=showcaseV115Bursts.filter(b=>b.t>0);return r;
};
const showcaseV115DecorBase=drawTownStreetDecor;drawTownStreetDecor=function(){showcaseV115DecorBase();showcaseV115DrawDistrictStandards()};
const showcaseV115ObjsBase=drawObjs;drawObjs=function(){showcaseV115ObjsBase();showcaseV115DrawRuins()};
const showcaseV115PeopleBase=drawPeople;drawPeople=function(){showcaseV115PeopleBase();showcaseV115DrawCheers()};
const showcaseV115FliesBase=drawFlies;drawFlies=function(){showcaseV115FliesBase();showcaseV115DrawRouteOrders()};
function showcaseV115Snapshot(){return{routes:showcaseV115RouteList().map(u=>({id:u.id,order:u.order,ox:u.ox,oy:u.oy})),ruins:showcaseV115RuinList().length,districts:[0,1,2,3].map(showcaseV115DistrictRatio),secured:[...showcaseV115Secured],cheers:people?.filter(p=>(p.showcaseCheer||0)>0).length||0,bursts:showcaseV115Bursts.map(b=>({i:b.i,t:b.t})),districtFlips:showcaseV115DistrictFlips}}
globalThis.showcaseLivingConquest={snapshot:showcaseV115Snapshot,cheer:(u,p=1)=>u?showcaseV115CheerAt(u.x,u.y,p):0,districtRatio:showcaseV115DistrictRatio,anchors:showcaseV115DistrictAnchors,version:'v1.15'};
