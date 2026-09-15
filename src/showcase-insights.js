// Showcase v1.16: turn existing run telemetry into a short, factual debrief.
// This is descriptive only: it does not alter score, mastery, AI, difficulty, or progression.
function showcaseV116ReasonName(reason){return globalThis.showcaseReasonLabel?.(reason)||String(reason||'unknown').replaceAll('-',' ').toUpperCase()}
function showcaseV116RunInsight(){
  const s=globalThis.showcaseRunStats||{},sat=globalThis.showcaseSatisfaction?.run||{},switches=s.switches||0,flow=s.peakFlow||0,routes=s.routeOrders||0,actions=s.flowActions||0,captures=sat.maxCaptured||0,won=typeof landWin!=='undefined'&&landWin>0;
  const reasons=Object.entries(s.switchReasons||{}).filter(([r,n])=>r!=='unknown'&&n>0).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])),known=reasons.reduce((a,[,n])=>a+n,0),top=reasons[0]||null,topRatio=top&&known?top[1]/known:0;
  let title='STEADY TAKEOVER';
  if(flow>=5)title='FULL-HERD CONDUCTOR';
  else if(flow>=4&&routes>=4)title='DISTRIBUTED CONDUCTOR';
  else if(routes>=Math.max(4,Math.ceil(switches*.35)))title='ROUTE ARCHITECT';
  else if(captures>=2)title=won?'RECOVERY SPECIALIST':'UNDER CAPTURE PRESSURE';
  else if(top&&['fault-slip','edge-risk','stalled','distracted'].includes(top[0])&&topRatio>=.35)title='CRISIS RESPONDER';
  else if((s.buildings||0)>=8)title='DEMOLITION LEAD';
  const notes=[];
  if(flow>=2||actions)notes.push(`${flow}X peak Flow across ${actions} productive action${actions===1?'':'s'}.`);
  if(routes)notes.push(`${routes} moving-captain route${routes===1?'':'s'} left running after handoffs.`);
  if(top)notes.push(`${showcaseV116ReasonName(top[0])} drove ${top[1]}/${known} explained attention switch${known===1?'':'es'}.`);
  if(captures)notes.push(`Capture pressure peaked at ${captures} simultaneous unicorn${captures===1?'':'s'}.`);
  if(!notes.length)notes.push('This run has too little recorded coordination data for a strong pattern yet.');
  let next;
  if(flow<3)next='Chain productive actions across three different unicorns inside one Flow window.';
  else if(routes<3&&switches>=4)next='Leave more moving captains on useful routes before switching away.';
  else if(captures>=2)next='Intervene earlier so capture pressure does not stack.';
  else if(top&&['fault-slip','edge-risk'].includes(top[0])&&topRatio>=.5)next='Route earlier to reduce emergency perimeter or fault interventions.';
  else if(flow>=4)next='Repeat the coordination while reducing emergency switches.';
  else next='Bring one more distinct unicorn into the next productive Flow sequence.';
  return{version:'v1.16',title,summary:notes.slice(0,3).join(' '),next,signals:{won,switches,knownSwitches:known,topReason:top?.[0]||null,topReasonCount:top?.[1]||0,topReasonRatio:topRatio,peakFlow:flow,routeOrders:routes,flowActions:actions,maxCaptured:captures,structures:s.buildings||0,time:s.time||0}};
}
globalThis.showcaseRunIntelligence={version:'v1.16',analyze:showcaseV116RunInsight};
