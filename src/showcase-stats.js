// Lightweight run telemetry for the portfolio/showcase edition.
function showcaseFreshStats(){return{time:0,switches:0,whips:0,dashes:0,powerups:0,buildings:0,damage:0,maxCharge:0,switchReasons:{}}}
globalThis.showcaseRunStats=showcaseFreshStats();
const showcaseStatsStartBase=startLevel;
startLevel=function(n){showcaseRunStats=showcaseFreshStats();globalThis.showcaseRunStats=showcaseRunStats;return showcaseStatsStartBase(n)};
const showcaseStatsUpdateBase=update;
update=function(dt){if(state==='play'&&!paused)showcaseRunStats.time+=dt;return showcaseStatsUpdateBase(dt)};
const showcaseStatsCycleBase=cycle;
cycle=function(){const before=caps[0],r=showcaseStatsCycleBase();if(state==='play'&&caps[0]!==before){showcaseRunStats.switches++;const d=globalThis.showcaseSwitching?.lastDecision,reason=d?.to===caps[0]?d.reason:'unknown';showcaseRunStats.switchReasons[reason]=(showcaseRunStats.switchReasons[reason]||0)+1}return r};
const showcaseStatsWhipBase=crackWhip;
crackWhip=function(){const i=whip&&whip.i,u=unis[i],before=u?.power||0;const r=showcaseStatsWhipBase();if(whip?.hit>0){showcaseRunStats.whips++;showcaseRunStats.maxCharge=Math.max(showcaseRunStats.maxCharge,u?.power||before)}return r};
const showcaseStatsDashBase=dashSolo;
dashSolo=function(){const u=unis[caps[0]],ok=state==='play'&&(u?.power||0)>=2;const r=showcaseStatsDashBase();if(ok)showcaseRunStats.dashes++;return r};
const showcaseStatsPowerBase=power;
power=function(u,p){const was=p?.on;const r=showcaseStatsPowerBase(u,p);if(was&&!p.on)showcaseRunStats.powerups++;return r};
const showcaseStatsHitBase=hitObj;
hitObj=function(u,o,d){const before=o?.hp||0,r=showcaseStatsHitBase(u,o,d);if(o&&before>o.hp){showcaseRunStats.damage+=before-o.hp;if(before>0&&o.hp<=0)showcaseRunStats.buildings++}return r};
function showcaseFormatTime(seconds){const s=Math.max(0,seconds|0);return`${s/60|0}:${String(s%60).padStart(2,'0')}`}
function showcaseAttentionSummaryText(s){const a=Object.entries(s.switchReasons).filter(([r])=>r!=='unknown').sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,3);return a.length?a.map(([r,n])=>`${globalThis.showcaseReasonLabel?.(r)||r.toUpperCase()} ${n}`).join('  •  '):'NO SWITCHES'}
const showcaseStatsEndBase=end;
end=function(){
  showcaseStatsEndBase();
  const s=showcaseRunStats;
  X.fillStyle='#07101dcc';rr(W/2-330,350,660,190,18);
  X.fillStyle='#ffe77d';text('RUN TELEMETRY',W/2,380,14,'center');
  X.fillStyle='#fff';
  const cells=[['TIME',showcaseFormatTime(s.time)],['SWITCHES',s.switches],['WHIPS',s.whips],['DASHES',s.dashes],['POWER-UPS',s.powerups],['STRUCTURES',s.buildings],['MAX CHARGE',s.maxCharge+'/5'],['DAMAGE',Math.round(s.damage)]];
  cells.forEach(([label,value],i)=>{const col=i%4,row=i/4|0,x=W/2-245+col*165,y=416+row*48;text(String(value),x,y,18,'center');X.fillStyle='#a9bdd2';text(label,x,y+18,9,'center');X.fillStyle='#fff'});
  X.fillStyle='#a9bdd2';text('ATTENTION DIRECTOR',W/2,508,9,'center');X.fillStyle='#fff';text(showcaseAttentionSummaryText(s),W/2,526,11,'center');
};
globalThis.showcaseAttentionSummary=()=>showcaseAttentionSummaryText(showcaseRunStats);
