// Showcase v1.10: authored satisfaction without changing herd physics or core scoring.
const showcaseV110Traits=[
  {tag:'BOLD',dash:'FASTER!',power:'LET’S GO!',smash:'AGAIN!'},
  {tag:'CURIOUS',dash:'WHEE!',power:'SPARKLY!',smash:'FLOWERS NEXT!'},
  {tag:'BRUISER',dash:'MY TURN!',power:'BIG HIT!',smash:'CRUNCH!'},
  {tag:'DREAMER',dash:'WOO!',power:'MAGIC!',smash:'DID I DO THAT?'},
  {tag:'SPEEDSTER',dash:'ZOOM!',power:'MORE SPEED!',smash:'TOO SLOW!'},
  {tag:'WILDCARD',dash:'SEND IT!',power:'MORE!',smash:'PERFECT!'}
];
const showcaseV110ImpactPalettes=[
  {dust:'#f0d6bd',accent:'#ff7eb6',deep:'#713f66'},
  {dust:'#d7d1b3',accent:'#65d7d1',deep:'#315b61'},
  {dust:'#b8c1cb',accent:'#8fd8e6',deep:'#303844'},
  {dust:'#d3a06e',accent:'#64c7b5',deep:'#4a2e2b'}
];
let showcaseV110Run,showcaseV110Impacts=[],showcaseV110Feed=[],showcaseV110Moods=[],showcaseV110Captured=new Set(),showcaseV110CaptureAt={},showcaseV110PendingSave=null,showcaseV110LastCue=-1;
function showcaseV110FreshRun(){return{flair:0,skillKinds:{},maxCaptured:0,lastDestroy:-99,lastPower:-99,lastSkillAt:{},startedAt:clock}}
function showcaseV110Reset(){showcaseV110Run=showcaseV110FreshRun();showcaseV110Impacts=[];showcaseV110Feed=[];showcaseV110Moods=Array.from({length:6},()=>({text:'',t:0}));showcaseV110Captured=new Set();showcaseV110CaptureAt={};showcaseV110PendingSave=null;globalThis.showcaseSatisfactionRun=showcaseV110Run}
showcaseV110Reset();
function showcaseV110Mood(u,text,t=1.7){if(!u||!showcaseV110Moods[u.id])return;showcaseV110Moods[u.id]={text,t}}
function showcaseV110WorldStinger(type='collapse'){
  showcaseV110LastCue=zone;
  if(type==='skill'){const r=[392,330,294,247][zone]||330;tone(r,.055,'triangle',.012,r*1.5);tone(r*1.5,.075,'sine',.008,r*2);return}
  if(zone===0){tone(330,.09,'triangle',.018,660);tone(495,.12,'sine',.013,792)}
  else if(zone===1){tone(220,.11,'sine',.018,165);tone(330,.15,'triangle',.011,440)}
  else if(zone===2){tone(74,.18,'sine',.018,55);tone(277,.16,'triangle',.014,185)}
  else{tone(147,.1,'square',.015,110);tone(220,.17,'triangle',.013,294)}
}
function showcaseV110Skill(kind,title,copy){
  if(state!=='play'||!level)return;
  const last=showcaseV110Run.lastSkillAt[kind]??-99;if(clock-last<.65)return;showcaseV110Run.lastSkillAt[kind]=clock;
  showcaseV110Run.flair++;showcaseV110Run.skillKinds[kind]=(showcaseV110Run.skillKinds[kind]||0)+1;
  showcaseV110Feed.unshift({kind,title,copy,t:2.6});showcaseV110Feed.length=Math.min(showcaseV110Feed.length,3);showcaseV110WorldStinger('skill');
}
function showcaseV110Collapse(u,o){
  const cx=o.x+o.w/2,cy=o.y+o.h/2,p=showcaseV110ImpactPalettes[zone]||showcaseV110ImpactPalettes[0];
  showcaseV110Impacts.push({x:cx,y:cy,w:o.w,h:o.h,hue:o.hue||0,age:0,life:.9,seed:((o.x*13+o.y*7+o.w*3)|0),zone,p});if(showcaseV110Impacts.length>18)showcaseV110Impacts.shift();
  showcaseV110WorldStinger('collapse');showcaseV110Mood(u,showcaseV110Traits[u.id]?.smash||'SMASH!',1.8);
  const nearby=unis.filter(q=>q.live&&Math.hypot(q.x-cx,q.y-cy)<300).length;if(nearby>=3)showcaseV110Skill('herd-crush','HERD CRUSH',nearby+' unicorns at the impact');
  if(clock-showcaseV110Run.lastDestroy<1.5)showcaseV110Skill('domino','DOMINO','Two structures in one breath');showcaseV110Run.lastDestroy=clock;
  if(u&&u.showcaseV110RamUntil>clock)showcaseV110Skill('rainbow-ram','RAINBOW RAM','High-charge dash broke the target');
}
const showcaseV110StartBase=startLevel;
startLevel=function(n){showcaseV110Reset();return showcaseV110StartBase(n)};
const showcaseV110DashBase=dashSolo;
dashSolo=function(){const u=unis[caps[0]],charge=u?.power|0,r=showcaseV110DashBase();if(u&&u.dash){u.showcaseV110RamUntil=clock+.85;showcaseV110Mood(u,showcaseV110Traits[u.id]?.dash||'GO!',1.25);if(charge>=5)showcaseV110Skill('full-send','FULL SEND','Launched a 5/5 charge dash')}return r};
const showcaseV110PowerBase=power;
power=function(u,p){const on=p?.on,r=showcaseV110PowerBase(u,p);if(on&&!p.on){showcaseV110Mood(u,showcaseV110Traits[u.id]?.power||'POWER!',1.45);if(clock-showcaseV110Run.lastPower<4)showcaseV110Skill('power-chain','POWER CHAIN','Collected power-ups back to back');showcaseV110Run.lastPower=clock}return r};
const showcaseV110HitBase=hitObj;
hitObj=function(u,o,d){const before=o?.hp||0,max=o?.max||1,r=showcaseV110HitBase(u,o,d),after=o?.hp||0;if(o&&before>after&&after>0){const a=before/max,b=after/max;if((a>.72&&b<=.72)||(a>.42&&b<=.42)||(a>.18&&b<=.18))showcaseV110Impacts.push({x:o.x+o.w/2,y:o.y+o.h/2,w:o.w,h:o.h,hue:o.hue||0,age:0,life:.38,seed:((o.x+o.y)|0),zone,p:showcaseV110ImpactPalettes[zone]||showcaseV110ImpactPalettes[0],chip:1})}if(o&&before>0&&after<=0)showcaseV110Collapse(u,o);return r};
const showcaseV110CycleBase=cycle;
cycle=function(){const before=caps[0],r=showcaseV110CycleBase();if(state==='play'&&caps[0]!==before){const d=globalThis.showcaseSwitching?.lastDecision;if(d?.to===caps[0]&&(d.reason==='fault-slip'||d.reason==='edge-risk'))showcaseV110PendingSave={id:caps[0],reason:d.reason,t:clock,safe:0}}return r};
function showcaseV110SafeFromRisk(u,reason){if(!u?.live)return false;if(reason==='fault-slip')return(u.frontierSlip||0)<.08;return u.x>95&&u.x<WW-95&&u.y>95&&u.y<WH-95}
const showcaseV110UpdateBase=update;
update=function(dt){
  const beforeDistract=unis.map(u=>u.distract>.7),r=showcaseV110UpdateBase(dt);
  for(let i=0;i<showcaseV110Impacts.length;i++)showcaseV110Impacts[i].age+=dt;showcaseV110Impacts=showcaseV110Impacts.filter(e=>e.age<e.life);
  for(const f of showcaseV110Feed)f.t-=dt;showcaseV110Feed=showcaseV110Feed.filter(f=>f.t>0);for(const m of showcaseV110Moods)m.t=Math.max(0,m.t-dt);
  for(let i=0;i<unis.length;i++)if(unis[i]?.live&&!beforeDistract[i]&&unis[i].distract>.7)showcaseV110Mood(unis[i],i===1?'FLOWERS!':i===3?'DAYDREAMING':i===5?'WHAT’S THAT?':'DISTRACTED',1.7);
  const now=new Set();if(typeof cleaners!=='undefined')for(const c of cleaners)if(c.u>=0)now.add(c.u);showcaseV110Run.maxCaptured=Math.max(showcaseV110Run.maxCaptured,now.size);
  for(const id of now)if(!showcaseV110Captured.has(id))showcaseV110CaptureAt[id]=clock;
  for(const id of showcaseV110Captured)if(!now.has(id)&&unis[id]?.live){if(clock-(showcaseV110CaptureAt[id]??-99)<7)showcaseV110Skill('quick-rescue','QUICK RESCUE','Freed '+unis[id].name+' before the town escaped');showcaseV110Mood(unis[id],'BACK!',1.8)}showcaseV110Captured=now;
  if(showcaseV110PendingSave){const u=unis[showcaseV110PendingSave.id];if(!u?.live||clock-showcaseV110PendingSave.t>5)showcaseV110PendingSave=null;else{if(showcaseV110SafeFromRisk(u,showcaseV110PendingSave.reason))showcaseV110PendingSave.safe+=dt;else showcaseV110PendingSave.safe=0;if(showcaseV110PendingSave.safe>.45){showcaseV110Skill('clutch-save','CLUTCH SAVE',showcaseV110PendingSave.reason==='fault-slip'?'Pulled the herd clear of the fault':'Recovered a unicorn from the perimeter');showcaseV110Mood(u,'SAFE!',1.6);showcaseV110PendingSave=null}}}
  return r;
};
function showcaseV110DrawDamage(){
  if(state!=='play'||!level)return;X.save();X.translate(ox,oy);X.scale(z,z);for(const o of objs){if(!(o.hp>0&&o.max>0&&(o.t==='b'||o.t==='clock'||o.t==='stall')))continue;const d=1-o.hp/o.max;if(d<.28)continue;const cx=o.x+o.w*.52,cy=o.y+o.h*.48,seed=((o.x*7+o.y*11)|0);X.globalAlpha=.16+.46*d;X.strokeStyle=showcaseV110ImpactPalettes[zone]?.deep||'#382e39';X.lineWidth=2+3*d;X.beginPath();for(let k=0;k<(d>.58?4:2);k++){const sx=cx+((seed+k*37)%51-25),sy=cy+((seed+k*23)%39-19);X.moveTo(sx,sy);for(let j=1;j<4;j++)X.lineTo(sx+((k&1)?1:-1)*j*9+((seed+j*13)%9-4),sy+j*10)}X.stroke()}
  for(const e of showcaseV110Impacts){const q=e.age/e.life,a=Math.max(0,1-q),p=e.p||showcaseV110ImpactPalettes[e.zone]||showcaseV110ImpactPalettes[0];X.globalAlpha=a*(e.chip?.42:.72);X.strokeStyle=p.accent;X.lineWidth=e.chip?4:7;X.beginPath();X.arc(e.x,e.y,24+q*(e.chip?55:130),0,T);X.stroke();if(!e.chip){for(let i=0;i<10;i++){const ang=((e.seed+i*67)%628)/100,sp=55+((e.seed+i*31)%95),x=e.x+Math.cos(ang)*sp*q,y=e.y+Math.sin(ang)*sp*q+150*q*q;X.save();X.translate(x,y);X.rotate(ang+q*3);X.fillStyle=i&1?p.deep:`hsl(${e.hue} 45% 50%)`;X.fillRect(-6,-4,12,8);X.restore()}X.fillStyle=p.dust;for(let i=0;i<6;i++){const ang=i*T/6+e.seed%11/10,rad=15+q*(35+i*6);X.globalAlpha=a*.24;X.beginPath();X.arc(e.x+Math.cos(ang)*rad,e.y+Math.sin(ang)*rad,18+q*24,0,T);X.fill()}}}X.restore();
}
function showcaseV110DrawPersonalities(){
  if(state!=='play')return;X.save();X.translate(ox,oy);X.scale(z,z);for(const u of unis){if(!u.live)continue;const m=showcaseV110Moods[u.id];if(!m?.t)continue;const bob=Math.sin(clock*8+u.id)*4,alpha=Math.min(1,m.t*1.6);X.globalAlpha=alpha;X.fillStyle='#07101ddd';rr(u.x-62,u.y-142+bob,124,28,10);X.fillStyle=`hsl(${u.h} 90% 76%)`;text(m.text,u.x,u.y-123+bob,10,'center')}X.restore();
}
function showcaseV110DrawSkillFeed(){if(state!=='play'||!level||!showcaseV110Feed.length)return;X.setTransform(1,0,0,1,0,0);for(let i=0;i<showcaseV110Feed.length;i++){const f=showcaseV110Feed[i],a=Math.min(1,f.t*2),y=H-112-i*58;X.globalAlpha=a;X.fillStyle='#07101de8';rr(W-346,y,318,48,12);X.fillStyle='#ffe77d';text('SMART PLAY • '+f.title,W-330,y+18,11);X.fillStyle='#b9c9d8';text(f.copy,W-330,y+37,9)}X.globalAlpha=1}
const showcaseV110WorldBase=world;world=function(){showcaseV110WorldBase();showcaseV110DrawDamage();showcaseV110DrawPersonalities()};
const showcaseV110HudBase=hud;hud=function(){showcaseV110HudBase();showcaseV110DrawSkillFeed()};
globalThis.showcaseSatisfaction={get run(){return showcaseV110Run},skill:showcaseV110Skill,snapshot:()=>({flair:showcaseV110Run.flair,skillKinds:{...showcaseV110Run.skillKinds},maxCaptured:showcaseV110Run.maxCaptured,impacts:showcaseV110Impacts.length,feed:showcaseV110Feed.map(x=>x.kind),moods:showcaseV110Moods.map(x=>x.text),lastCue:showcaseV110LastCue})};
