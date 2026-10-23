// v1.23 Mission Compass: point to *real* objectives and teach the first herd loop.
// Read-only on gameplay authority: never mutates buildings, paint, AI, scoring or objectives.
(function(){
  'use strict';
  const DONE_KEY='usIntroProgressV123',STEP_NAMES=['MOVE','WHIP ×2','SMASH','SWITCH'];
  let steps=[false,false,false,false],beganAt=0,origin=null,firstId=-1,shown=true;
  let active=false,targetCache=null,attempt=0;
  const bar=document.createElement('div');
  bar.id='showcase-mission-progress';
  bar.setAttribute('aria-label','First-run herd skills');
  bar.innerHTML='<strong>MASTER THE STAMPEDE</strong><span></span><small>H · TOGGLE WAYFINDER</small>';
  document.body.append(bar);
  const bits=bar.querySelector('span');
  const distance=(x,y,a,b)=>Math.hypot(x-a,y-b);
  function candidates(){
    const u=unis?.[caps[0]];
    if(!u?.live)return [];
    const taken=typeof cleaners!=='undefined'?cleaners.filter(c=>c.u>=0):[];
    if(taken.length>=2||(taken.length&&typeof hallDone==='function'&&hallDone())){
      return taken.map(c=>({kind:'rescue',id:'rescue-'+c.u,label:'RESCUE '+(unis[c.u]?.name||'UNICORN'),
        x:c.x,y:c.y,priority:0}));
    }
    if(typeof LM==='undefined'||!LM.length)return [];
    const outstanding=LM.slice(0,-1).filter(l=>l?.os?.length&&!lmDone(l));
    if(outstanding.length){
      return outstanding.flatMap(l=>l.os.filter(o=>o?.hp>0).map(o=>({
        kind:'landmark',id:'landmark-'+l.k,label:l.n||'SMASH LANDMARK',
        x:o.x+o.w/2,y:o.y+o.h/2,
        priority:l.k==='clock'&&typeof team==='function'&&team(o)<2+(mode>1)?1:0
      })));
    }
    if(typeof hallDone==='function'&&!hallDone()){
      if(typeof takeover==='function'&&typeof chaos==='function'&&takeover()<chaos()){
        return objs.filter(o=>o?.hp>0&&o.val>0&&!o.lm).map(o=>({
          kind:'chaos',id:'chaos-'+o.x+'-'+o.y,label:'SMASH FOR CHAOS',
          x:o.x+o.w/2,y:o.y+o.h/2,priority:0
        }));
      }
      const hall=LM[LM.length-1];
      return hall?.os?.filter(o=>o?.hp>0).map(o=>({
        kind:'hall',id:'hall',label:'RALLY AT TOWN HALL',
        x:o.x+o.w/2,y:o.y+o.h/2,priority:0
      }))||[];
    }
    if(typeof dmask!=='undefined'&&(dmask&15)!==15){
      const list=[];
      for(let i=0;i<4;i++)if(!(dmask&(1<<i)))list.push({
        kind:'district',id:'district-'+i,
        label:'PAINT '+['NW','NE','SW','SE'][i]+' DISTRICT',
        x:(i&1?.75:.25)*WW,y:(i&2?.75:.25)*WH,priority:0
      });
      return list;
    }
    if(typeof paintPct==='function'&&typeof stageGoal!=='undefined'&&paintPct()<stageGoal){
      let i=0;
      if(typeof dpaint!=='undefined')for(let j=1;j<4;j++)if(dpaint[j]<dpaint[i])i=j;
      return[{kind:'color',id:'paint-'+i,label:'SPREAD MORE RAINBOW',
        x:(i&1?.75:.25)*WW,y:(i&2?.75:.25)*WH,priority:0}];
    }
    return[];
  }
  function target(){
    if(state!=='play'||!level||paused)return null;
    const u=unis?.[caps[0]];if(!u?.live)return null;
    const opts=candidates();
    opts.sort((a,b)=>a.priority-b.priority||
      distance(u.x,u.y,a.x,a.y)-distance(u.x,u.y,b.x,b.y)||
      a.id.localeCompare(b.id));
    return opts[0]||null;
  }
  function updateBar(){
    const first=active&&shown&&state==='play'&&level>0&&!paused&&
      !steps.every(Boolean)&&clock-beganAt<95;
    bar.hidden=!first;
    if(!first)return;
    bits.textContent=STEP_NAMES.map((label,i)=>(steps[i]?'✓ ':'○ ')+label).join('   ·   ');
  }
  function mark(i){
    if(!active||steps[i])return;
    steps[i]=true;
    if(steps.every(Boolean)){
      // Completing the first four skills silences the onboarding ribbon,
      // but the navigational arrow remains opt-in via H in subsequent runs.
      globalThis.showcaseStorage?.setItem(DONE_KEY,'1');
    }
    updateBar();
  }
  function reset(ctx){
    const n=ctx?.args?.[0];
    attempt++;
    active=n>0&&state==='play'&&globalThis.showcaseStorage?.getItem(DONE_KEY)!=='1';
    steps=[false,false,false,false];
    const u=unis?.[caps[0]];
    origin=u?{x:u.x,y:u.y}:null;firstId=u?.id??-1;
    beganAt=clock;targetCache=null;
    updateBar();
  }
  function tick(){
    if(active&&state==='play'&&!paused&&level>0){
      const u=unis?.[caps[0]];
      if(u&&u.id===firstId&&origin&&distance(u.x,u.y,origin.x,origin.y)>32)mark(0);
      if(globalThis.showcaseRunStats?.whips>=2||u?.power>=2)mark(1);
      if(globalThis.showcaseRunStats?.buildings>=1)mark(2);
      if(globalThis.showcaseRunStats?.switches>=1)mark(3);
    }
    updateBar();
  }
  function render(){
    if(state!=='play'||!level||paused||!shown)return;
    const u=unis?.[caps[0]],t=target();
    targetCache=t;
    if(!u||!t)return;
    const dx=t.x-u.x,dy=t.y-u.y,d=Math.hypot(dx,dy);
    if(d<1)return;
    const a=Math.atan2(dy,dx),sx=ox+u.x*z,sy=oy+u.y*z;
    X.save();
    // World-space target only: a small lighthouse ring, not a fake hitbox.
    X.translate(ox,oy);X.scale(z,z);
    if(d<1150){
      X.strokeStyle=t.kind==='rescue'?'#ff8cac':'#fff29e';
      X.lineWidth=4;X.globalAlpha=.72;
      X.beginPath();X.arc(t.x,t.y,Math.max(44,Math.min(110,d*.14)),0,Math.PI*2);X.stroke();
    }
    X.restore();
    const ax=Math.max(120,Math.min(W-120,sx+Math.cos(a)*112));
    const ay=Math.max(116,Math.min(H-105,sy+Math.sin(a)*100));
    X.save();X.translate(ax,ay);X.rotate(a);
    X.fillStyle=t.kind==='rescue'?'#ff89a5':'#ffeb82';X.strokeStyle='#15203b';X.lineWidth=2.5;
    X.beginPath();X.moveTo(19,0);X.lineTo(-13,-12);X.lineTo(-7,0);X.lineTo(-13,12);X.closePath();
    X.fill();X.stroke();X.restore();
    X.save();
    X.font='700 11px system-ui';X.textAlign='center';
    const label=t.label.slice(0,27),w=Math.min(226,Math.max(98,X.measureText(label).width+18));
    X.fillStyle='#071224e8';X.fillRect(ax-w/2,ay-36,w,21);
    X.fillStyle='#eefaff';X.fillText(label,ax,ay-22);
    X.restore();
  }
  function toggle(){
    shown=!shown;
    targetCache=null;
    updateBar();
    return shown;
  }
  addEventListener('keydown',e=>{
    if(e.code!=='KeyH'||e.repeat||e.altKey||e.ctrlKey||e.metaKey||
      e.target?.closest?.('input,textarea,select,[contenteditable]'))return;
    if(state!=='play'||!level)return;
    e.preventDefault();e.stopImmediatePropagation();toggle();
  },true);
  showcaseHooks.on('start:after','mission.reset',reset,-110);
  showcaseHooks.on('update:after','mission.tick',tick,-110);
  showcaseHooks.on('world:after','mission.render',render,-110);
  showcaseHooks.on('hit:before','mission.hit-before',ctx=>{ctx.missionHP=ctx.args?.[1]?.hp||0},-110);
  showcaseHooks.on('hit:after','mission.hit-after',ctx=>{
    const o=ctx.args?.[1];
    if(ctx.missionHP>0&&o?.hp<=0)mark(2);
  },-110);
  showcaseHooks.on('cycle:before','mission.cycle-before',ctx=>{ctx.missionCaptain=caps[0]},-110);
  showcaseHooks.on('cycle:after','mission.cycle-after',ctx=>{
    if(caps[0]!==ctx.missionCaptain)mark(3);
  },-110);
  globalThis.showcaseMission={
    target,toggle,progress:()=>({
      attempt,active,shown,steps:[...steps],target:target()?.id||null,
      complete:steps.every(Boolean),barVisible:!bar.hidden
    })
  };
  updateBar();
})();