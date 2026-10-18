// v1.17: contextual first-run coaching. No gameplay, AI, collision, or scoring mutations.
(function(){
  'use strict';
  const panel=document.createElement('aside');
  panel.id='showcase-coach';
  panel.hidden=true;
  panel.setAttribute('aria-live','polite');
  panel.setAttribute('aria-label','Current objective help');
  panel.innerHTML='<strong></strong><span></span>';
  document.body.append(panel);
  const title=panel.querySelector('strong'),body=panel.querySelector('span');
  let key='',until=0,seen=0;
  function advice(){
    const goal=typeof objective==='function'?String(objective()):'';
    if(/^RESCUE/.test(goal))return ['rescue','RESCUE THE HERD','Intercept the prison truck with a Dash. Bring TWO free unicorns close to release the captive.'];
    if(/^LANDMARKS/.test(goal))return ['landmarks','BREAK FOUR LANDMARKS','Find Bakery, Market, Greenhouse and Clock Tower. Whip beside your unicorn to charge, then Space to smash.'];
    if(/^CHAOS/.test(goal))return ['chaos','BUILD CHAOS','Smash ordinary buildings and paint rainbow roads until the Chaos target is reached.'];
    if(/HALL/.test(goal))return ['hall','ASSEMBLE AT TOWN HALL','A strong landmark needs a team. Bring more free unicorns near the Hall, then hit it with a charged Dash.'];
    if(/^DISTRICTS/.test(goal))return ['districts','SECURE THE FOUR DISTRICTS','Cover every district with rainbow trails. The Hall is down, but takeover is not complete yet.'];
    if(/^COLOR/.test(goal))return ['color','FINISH PAINTING','Keep moving to reach the global color target. Spread the herd across unpainted streets.'];
    return null;
  }
  function refresh(){
    if(state!=='play'||!level||paused){panel.hidden=true;return}
    const next=advice();
    if(!next){panel.hidden=true;return}
    // Show help for new phases and a single initial window; never repeat it every frame.
    const changed=next[0]!==key;
    if(changed){key=next[0];until=clock+(next[0]==='rescue'?11:8);seen++}
    if(changed){
      title.textContent=next[1];
      body.textContent=next[2]+'  Q / Shift switches herd members; movement orders keep running.';
    }
    panel.hidden=clock>until;
  }
  function start(){key='';until=0;seen=0;panel.hidden=true;refresh()}
  showcaseHooks.on('start:after','coach.reset',start,-90);
  showcaseHooks.on('update:after','coach.refresh',refresh,-90);
  // Optional non-modifier alternative to Shift, preventing OS Sticky Keys prompts.
  // One keydown produces exactly one Smart Attention handoff.
  addEventListener('keydown',e=>{
    if(e.code!=='KeyQ'||e.repeat||e.ctrlKey||e.metaKey||e.altKey||
       state!=='play'||paused||e.target?.closest?.('input, textarea, select, [contenteditable]'))return;
    e.preventDefault();
    e.stopImmediatePropagation();
    cycle();
  },true);
  globalThis.showcaseCoach={refresh,snapshot:()=>({key,seen,visible:!panel.hidden,text:body.textContent})};
})();