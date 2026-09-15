// Showcase v1.14: reward deliberate multi-unicorn momentum without adding another control.
// Productive actions by different herd members build a short Herd Flow chain; destruction also
// ripples through nearby civilians using the existing collision-safe pedestrian motion.
const SHOWCASE_FLOW_WINDOW=6,SHOWCASE_FLOW_MAX=5;
let showcaseV114Flow,showcaseV114Captured=new Set(),showcaseV114Pulse=0;
function showcaseV114Fresh(){return{chain:0,peak:0,until:0,ids:[],actions:0,lastKind:'',lastId:-1,stamp:0}}
function showcaseV114Reset(){showcaseV114Flow=showcaseV114Fresh();showcaseV114Captured=new Set();showcaseV114Pulse=0;globalThis.showcaseFlowRun=showcaseV114Flow}
showcaseV114Reset();
function showcaseV114Note(u,kind='play'){
  if(state!=='play'||!u?.live)return showcaseV114Flow.chain;
  if(clock>showcaseV114Flow.until){showcaseV114Flow.chain=0;showcaseV114Flow.ids=[];showcaseV114Flow.stamp=0}
  const fresh=!showcaseV114Flow.ids.includes(u.id);
  if(fresh){showcaseV114Flow.ids.push(u.id);showcaseV114Flow.chain=Math.min(SHOWCASE_FLOW_MAX,showcaseV114Flow.chain+1)}
  else if(!showcaseV114Flow.chain)showcaseV114Flow.chain=1;
  showcaseV114Flow.until=clock+SHOWCASE_FLOW_WINDOW;showcaseV114Flow.actions++;showcaseV114Flow.lastKind=kind;showcaseV114Flow.lastId=u.id;showcaseV114Flow.peak=Math.max(showcaseV114Flow.peak,showcaseV114Flow.chain);showcaseV114Pulse=1;
  if(globalThis.showcaseRunStats){showcaseRunStats.flowActions=(showcaseRunStats.flowActions||0)+1;showcaseRunStats.peakFlow=Math.max(showcaseRunStats.peakFlow||0,showcaseV114Flow.chain)}
  if(showcaseV114Flow.chain>=3&&!(showcaseV114Flow.stamp&1)){showcaseV114Flow.stamp|=1;globalThis.showcaseSatisfaction?.skill('herd-flow','HERD FLOW','Three unicorns productive in one sequence')}
  if(showcaseV114Flow.chain>=SHOWCASE_FLOW_MAX&&!(showcaseV114Flow.stamp&2)){showcaseV114Flow.stamp|=2;globalThis.showcaseSatisfaction?.skill('full-stampede','FULL STAMPEDE','Five herd members working in one flow')}
  return showcaseV114Flow.chain;
}
function showcaseV114CrowdShock(x,y,strength=1){
  if(typeof people==='undefined')return 0;let moved=0;
  for(const p of people){let dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy)||1;if(d>=330)continue;const q=(1-d/330)*strength,k=180+420*q;p.vx+=dx/d*k;p.vy+=dy/d*k;p.t=0;p.cool=Math.max(p.cool||0,.7);p.showcaseAlarm=Math.max(p.showcaseAlarm||0,.8+q*.8);moved++}
  return moved;
}
const showcaseV114StartBase=startLevel;
startLevel=function(n){const r=showcaseV114StartBase(n);showcaseV114Reset();if(globalThis.showcaseRunStats){showcaseRunStats.peakFlow=0;showcaseRunStats.flowActions=0}return r};
const showcaseV114PowerBase=power;
power=function(u,p){const on=p?.on,r=showcaseV114PowerBase(u,p);if(on&&!p.on)showcaseV114Note(u,'power');return r};
const showcaseV114HitBase=hitObj;
hitObj=function(u,o,d){const before=o?.hp||0,r=showcaseV114HitBase(u,o,d),after=o?.hp||0;if(o&&before>0&&after<=0){showcaseV114Note(u,'smash');showcaseV114CrowdShock(o.x+o.w/2,o.y+o.h/2,1)}return r};
const showcaseV114UpdateBase=update;
update=function(dt){
  const was=showcaseV114Captured,r=showcaseV114UpdateBase(dt),now=new Set();if(typeof cleaners!=='undefined')for(const c of cleaners)if(c.u>=0)now.add(c.u);
  for(const id of was)if(!now.has(id)&&unis[id]?.live)showcaseV114Note(unis[caps[0]]||unis[id],'rescue');showcaseV114Captured=now;
  if(showcaseV114Flow.chain&&clock>showcaseV114Flow.until){showcaseV114Flow.chain=0;showcaseV114Flow.ids=[];showcaseV114Flow.stamp=0}
  showcaseV114Pulse=Math.max(0,showcaseV114Pulse-dt*3.2);if(typeof people!=='undefined')for(const p of people)if(p.showcaseAlarm)p.showcaseAlarm=Math.max(0,p.showcaseAlarm-dt);
  return r;
};
function showcaseV114DrawWorld(){
  if(state!=='play'||!level)return;const reduced=globalThis.showcaseSettings?.reducedMotion,pal=showcaseWorldPalette();X.save();X.translate(ox,oy);X.scale(z,z);
  if(showcaseV114Flow.chain>1){for(const id of showcaseV114Flow.ids){const u=unis[id];if(!u?.live)continue;const recent=id===showcaseV114Flow.lastId,a=recent?.72:.22,r=48+(recent&&!reduced?Math.sin(clock*8)*4:0);X.globalAlpha=a;X.strokeStyle=`hsl(${u.h} 92% 72%)`;X.lineWidth=recent?5:3;X.beginPath();X.arc(u.x,u.y,r,0,T);X.stroke()}const u=unis[showcaseV114Flow.lastId];if(u?.live&&showcaseV114Pulse>.08){X.globalAlpha=Math.min(1,showcaseV114Pulse*1.5);X.fillStyle='#07101ddd';rr(u.x-62,u.y+61,124,25,8);X.fillStyle=pal.glow;text('HERD FLOW '+showcaseV114Flow.chain+'X',u.x,u.y+78,10,'center')}}
  if(typeof people!=='undefined')for(const p of people)if(p.showcaseAlarm>.05){const a=Math.min(.9,p.showcaseAlarm),bob=reduced?0:Math.sin(clock*10+p.x*.01)*3;X.globalAlpha=a;X.fillStyle='#fff4bd';text('!',p.x,p.y-37+bob,11,'center')}
  X.restore();
}
const showcaseV114WorldBase=world;world=function(){showcaseV114WorldBase();showcaseV114DrawWorld()};
function showcaseV114State(){return{chain:showcaseV114Flow.chain,peak:showcaseV114Flow.peak,until:showcaseV114Flow.until,ids:[...showcaseV114Flow.ids],actions:showcaseV114Flow.actions,lastKind:showcaseV114Flow.lastKind,lastId:showcaseV114Flow.lastId,pulse:showcaseV114Pulse}}
globalThis.showcaseFlowState=showcaseV114State;
globalThis.showcaseFlow={note:showcaseV114Note,shock:showcaseV114CrowdShock,reset:showcaseV114Reset,state:showcaseV114State};
