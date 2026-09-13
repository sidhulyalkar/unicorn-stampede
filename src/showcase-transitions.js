// Showcase v1.7 lifecycle safety. The compact JS13k runtime stays frozen.
// Prisoners are inert while carried, rescues restart from the wagon instead of stale momentum,
// and any hazard that removes the controlled unicorn hands authority to a live herd member.
let showcaseTransitionHandoffs=0,showcasePrisonerResets=0,showcaseRescueResets=0,showcaseSlipClears=0;
function showcaseQuiesceUnicorn(u){
  if(!u)return;
  if(typeof frontierSlip!=='undefined'&&frontierSlip.has(u.id)){frontierSlip.delete(u.id);showcaseSlipClears++}
  u.vx=u.vy=0;u.order=u.dash=u.stun=0;u.ox=u.oy=0;u.ai=0;u.tx=u.x;u.ty=u.y;u.rescue=0;u.frontierSlip=0;u.cap=0;u.cool=0;
}
const showcaseTransitionUpdateBase=update;
update=function(dt){
  const beforeHeld=level&&state==='play'?new Set(cleaners.filter(c=>c.u>=0).map(c=>c.u)):null,r=showcaseTransitionUpdateBase(dt);
  if(!level||state!=='play')return r;
  const held=new Set(cleaners.filter(c=>c.u>=0).map(c=>c.u));
  for(const id of held){const u=unis[id];if(!u)continue;if(u.vx||u.vy||u.order||u.dash||u.stun||u.frontierSlip||u.cap)showcasePrisonerResets++;showcaseQuiesceUnicorn(u)}
  if(beforeHeld)for(const id of beforeHeld)if(!held.has(id)){const u=unis[id];if(u?.live){showcaseQuiesceUnicorn(u);u.distract=Math.min(u.distract||0,.35);showcaseRescueResets++}}
  if(!unis[caps[0]]?.live){let next=globalThis.showcaseSwitching?.choose?.(false);if(!(next>=0&&unis[next]?.live))next=unis.findIndex(u=>u.live);if(next>=0){caps[0]=next;const u=unis[next];u.order=u.cool=0;u.distract=Math.max(0,(u.distract||0)-.2);showcaseTransitionHandoffs++}}
  return r;
};
globalThis.showcaseTransitions={quiesce:showcaseQuiesceUnicorn,get stats(){return{handoffs:showcaseTransitionHandoffs,prisonerResets:showcasePrisonerResets,rescueResets:showcaseRescueResets,slipClears:showcaseSlipClears}}};
