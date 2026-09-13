// Showcase v1.5: deterministic, explainable herd handoff policy.
// The compact JS13k selector stays frozen; this wrapper only changes full-town showcase runs.
let showcaseSwitchLast=-99,showcaseSwitchBurst=0,showcaseSwitchRecent=[];
function showcaseEdgeSignal(u){
  const d=Math.min(u.x-20,WW-20-u.x,u.y-20,WH-20-u.y),near=cl(1-d/90,0,1),out=(u.x<72&&u.vx<0)||(u.x>WW-72&&u.vx>0)||(u.y<72&&u.vy<0)||(u.y>WH-72&&u.vy>0);
  return{distance:d,near,out};
}
function showcasePowerupDistance(u){let best=1e9;for(const p of ups)if(p.on)best=Math.min(best,Math.hypot(p.x-u.x,p.y-u.y));return best}
function showcaseSwitchSignal(q,active,rapid=false){
  const speed=Math.hypot(q.vx,q.vy),edge=showcaseEdgeSignal(q),slip=q.frontierSlip||0,power=showcasePowerupDistance(q),neglect=Math.max(0,q.cool||0),offRoute=!roadAt(q),stalled=speed<55&&!q.order;
  let priority=1,detail=Math.min(30,neglect/2.5),reason='neglect';
  if(power<300){priority=2;detail=(300-power)/10+Math.min(8,neglect/6);reason='powerup'}
  if(offRoute||stalled){priority=3;detail=(offRoute?18:0)+(stalled?(55-speed)*.55:0)+Math.min(10,neglect/5);reason=stalled?'stalled':'off-route'}
  if(q.distract>.04||edge.near>.32){priority=4;detail=q.distract*65+edge.near*34+(edge.out?18:0)+Math.min(8,neglect/6);reason=q.distract>.04?'distracted':'edge-risk'}
  if(slip>.03){priority=5;detail=slip*90+Math.min(10,neglect/5);reason='fault-slip'}
  const distance=active?Math.hypot(q.x-active.x,q.y-active.y):0;
  detail+=cl(distance/420,0,rapid?18:5);
  const recent=showcaseSwitchRecent.includes(q.id);
  if(recent&&priority<4)detail-=rapid?90:32;
  if((q.cool||0)<0&&priority<4)detail-=90;
  return{priority,detail,reason,speed,edge,power,neglect,distance,recent,slip};
}
function showcaseChooseSwitchTarget(){
  const current=caps[0],active=unis[current];if(!active)return current;
  const rapid=clock-showcaseSwitchLast<.72;let best=current,bestSignal=null;
  for(let i=0;i<unis.length;i++){
    const q=unis[i];if(!q?.live||i===current)continue;const s=showcaseSwitchSignal(q,active,rapid);
    if(!bestSignal||s.priority>bestSignal.priority||s.priority===bestSignal.priority&&(s.detail>bestSignal.detail+.001||Math.abs(s.detail-bestSignal.detail)<=.001&&i<best)){best=i;bestSignal=s}
  }
  return best;
}
const showcaseSwitchCycleBase=cycle;
cycle=function(){
  if(state!=='play'||!level)return showcaseSwitchCycleBase();
  const old=caps[0],from=unis[old];if(!from?.live)return showcaseSwitchCycleBase();
  const rapid=clock-showcaseSwitchLast<.72;showcaseSwitchBurst=rapid?showcaseSwitchBurst+1:1;showcaseSwitchLast=clock;
  if(Math.hypot(from.vx,from.vy)>35){from.order=roadAt(from)?5.2:4;from.ox=Math.cos(from.a);from.oy=Math.sin(from.a)}
  from.cool=-1;const next=showcaseChooseSwitchTarget();
  if(next!==old){caps[0]=next;const to=unis[next];to.order=to.cool=0;to.distract=Math.max(0,to.distract-.2);showcaseSwitchRecent.push(next);if(showcaseSwitchRecent.length>3)showcaseSwitchRecent.shift()}
};
const showcaseSwitchStartBase=startLevel;
startLevel=function(n){const r=showcaseSwitchStartBase(n);showcaseSwitchLast=-99;showcaseSwitchBurst=0;showcaseSwitchRecent=[];return r};
globalThis.showcaseSwitching={choose:showcaseChooseSwitchTarget,signal:(i)=>showcaseSwitchSignal(unis[i],unis[caps[0]],clock-showcaseSwitchLast<.72),get recent(){return[...showcaseSwitchRecent]},get burst(){return showcaseSwitchBurst}};
