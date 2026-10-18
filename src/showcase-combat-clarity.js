// v1.18: teach the exact reason an attempted smash did not advance.
// All visuals observe authoritative HP, Team/Chaos and captured-herd state.
(function(){
  'use strict';
  const event=document.createElement('div');
  event.id='showcase-impact-help';event.hidden=true;
  event.setAttribute('role','status');event.setAttribute('aria-live','polite');
  document.body.append(event);
  let lastReason='',until=0,lastAt=-99,lastHit=null,lastSwitchAt=-99;
  function notice(text){
    if(!text||state!=='play')return;
    if(text===lastReason&&clock-lastAt<1.4)return;
    lastReason=text;lastAt=clock;until=clock+2.7;event.textContent=text;event.hidden=false;
  }
  function gate(o,u){
    if(!o||!u)return '';
    if(!level&&o.lm==='bakery'&&intro.step<8)
      return 'TUTORIAL · LEARN CHARGE, DASH AND HERD SWITCH BEFORE BAKERY';
    if(o.lm==='hall'){
      if(!outerDone())return 'TOWN HALL LOCKED · BREAK FOUR LANDMARKS';
      if(takeover()<chaos())return 'HALL LOCKED · BUILD MORE CHAOS';
    }
    if(o.lm==='clock'||o.lm==='hall'){
      const required=o.lm==='clock'?2+(mode>1):3+(mode>0)+(mode>2);
      const nearby=team(o);
      if(nearby<required)return 'TEAM '+nearby+'/'+required+' · BRING '+(required-nearby)+' MORE UNICORN'+(required-nearby===1?'':'S');
    }
    if(u.distract>1.1)return 'BICKERING · SWITCH AND SEPARATE THE HERD';
    if(!u.dash&&!u.frenzy&&!u.boost&&u.anger<=.72)return 'CHARGE WHIP 2/5 → SPACE TO SMASH';
    return '';
  }
  const collideBase=collide;
  collide=function(u,o,dt){
    const active=state==='play'&&u===unis[caps[0]]&&(level>0||o?.lm==='bakery');
    const overlap=active&&o?.hp>0&&o.val>0&&
      u.x>o.x-32&&u.x<o.x+o.w+32&&u.y>o.y-32&&u.y<o.y+o.h+32;
    const before=o?.hp||0,charge=u?.power||0;
    const result=collideBase(u,o,dt);
    if(overlap&&before>0&&o.hp===before){
      const reason=gate(o,u);
      if(reason)notice(reason);
      lastHit={name:o.lm||o.ln||o.t,reason:reason||'NO DAMAGE',charge,time:clock};
    }else if(overlap&&before>o.hp){
      lastHit={name:o.lm||o.ln||o.t,reason:'DAMAGE',charge,time:clock,
        dealt:before-o.hp,remaining:o.hp};
    }
    return result;
  };
  function status(u){
    if(!u)return 'UNKNOWN';
    if(!u.live||cleaners?.some(c=>c.u===u.id))return 'CAPTURED';
    if((u.frontierSlip||0)>.04)return 'SLIPPING';
    if((u.distract||0)>.5)return 'DISTRACTED';
    if(u.x<55||u.y<55||u.x>WW-55||u.y>WH-55)return 'EDGE RISK';
    if((u.order||0)>.25)return 'ON ROUTE';
    if(Math.hypot(u.vx||0,u.vy||0)<35&&u.id!==caps[0])return 'STALLED';
    return 'WORKING';
  }
  const COLORS={'CAPTURED':'#ff627f','DISTRACTED':'#ffcb60','STALLED':'#ffe09b',
    'SLIPPING':'#ff756c','EDGE RISK':'#ff9d8f','ON ROUTE':'#94edff','WORKING':'#9df1b5'};
  function plaque(x,y,label,color){
    const w=Math.max(82,Math.min(154,label.length*7+18));
    X.fillStyle='#091022e8';rr(x-w/2,y-16,w,23,7);
    X.fillStyle=color;X.font='bold 11px system-ui';
    X.textAlign='center';X.fillText(label,x,y);X.textAlign='left';
  }
  function draw(){
    if(state!=='play'||!level||paused)return;
    X.save();X.translate(ox,oy);X.scale(z,z);
    // The active player is always named. Only three other urgent labels appear,
    // with no unreadable six-agent wall of duplicate status text.
    const active=unis[caps[0]];
    const risk=unis.filter(u=>u?.live&&u!==active)
      .map(u=>({u,s:status(u)}))
      .filter(v=>['DISTRACTED','STALLED','SLIPPING','EDGE RISK'].includes(v.s))
      .sort((a,b)=>['SLIPPING','EDGE RISK','DISTRACTED','STALLED'].indexOf(a.s)-
                     ['SLIPPING','EDGE RISK','DISTRACTED','STALLED'].indexOf(b.s)).slice(0,3);
    for(const v of [...(active?[{u:active,s:status(active)}]:[]),...risk]){
      plaque(v.u.x,v.u.y-57,v.u.name.toUpperCase()+' · '+v.s,COLORS[v.s]||'#fff');
    }
    // Prerequisites and damage derive directly from the actual building HP.
    for(const o of objs){
      if(!o||o.hp<=0||!o.val)continue;
      const watch=o.lm==='clock'||o.lm==='hall';
      if(!watch&&o.hp===o.max)continue;
      if(!watch&&Math.hypot((o.x+o.w/2)-active.x,(o.y+o.h/2)-active.y)>480)continue;
      const cx=o.x+o.w/2,top=o.y-18;
      if(watch&&Math.hypot(cx-active.x,o.y-active.y)<800){
        const req=o.lm==='clock'?2+(mode>1):3+(mode>0)+(mode>2);
        const count=team(o),ready=count>=req&&(! (o.lm==='hall')||outerDone()&&takeover()>=chaos());
        plaque(cx,top-22,'TEAM '+count+'/'+req,ready?'#94ffb9':'#ffcf72');
        X.strokeStyle=ready?'#87ffcc80':'#ffca6770';
        X.lineWidth=3;X.beginPath();X.arc(cx,o.y+o.h/2,320+mode*20,0,Math.PI*2);X.stroke();
      }
      if(o.hp<o.max){
        const width=Math.min(o.w,160);
        X.fillStyle='#0a1126cc';X.fillRect(cx-width/2,top,width,7);
        X.fillStyle='#ffbd74';X.fillRect(cx-width/2,top,width*Math.max(0,o.hp/o.max),7);
      }
    }
    X.restore();
  }
  showcaseHooks.on('world:after','clarity.world',draw,-35);
  showcaseHooks.on('update:after','clarity.tick',()=>{
    if(state!=='play'||paused||clock>until)event.hidden=true;
    const d=globalThis.showcaseSwitching?.lastDecision;
    if(d&&d.time>lastSwitchAt&&d.from!==d.to){
      lastSwitchAt=d.time;
      // Existing Smart Attention remains the sole selector.
      const why=globalThis.showcaseReasonLabel?.(d.reason)||d.reason.toUpperCase().replaceAll('-',' ');
      notice('SMART SWITCH · '+unis[d.to].name.toUpperCase()+' · '+why);
    }
  },-35);
  showcaseHooks.on('start:after','clarity.reset',()=>{
    lastReason='';until=0;lastAt=-99;lastSwitchAt=-99;lastHit=null;event.hidden=true;
  },-35);
  globalThis.showcaseClarity={status,gate,notice,snapshot:()=>({reason:lastReason,until,lastHit,visible:!event.hidden})};
})();