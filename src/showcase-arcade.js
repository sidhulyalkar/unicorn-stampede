// Post-js13k showcase only. Bounty Board is optional: offline and standalone play never depend on it.
(function(){
  'use strict';
  const SDK_URL='https://www.bountyboard.gg/arcade-sdk/v1.js';
  let api=null,ready=false,loaded=false,run=null,serial=0,lastSubmitted=-1,lastSubmittedAt=0;
  const safe=(method,...args)=>{try{if(typeof api?.[method]==='function')return api[method](...args)}catch(error){console.warn('[arcade] '+method+' unavailable',error)}};
  const scoreNow=()=>Math.max(0,Math.trunc(Number(score)||0));
  function stop(){if(run?.active){safe('gameplayStop');run.active=false}}
  function reportFinish(){
    if(!run||!run.ended||run.reported||!ready)return;
    stop();
    safe('submitScore',run.finalScore);
    safe('gameOver',run.finalScore); // Exactly once for this campaign attempt.
    run.reported=true;
  }
  function finish(){
    if(!run||run.ended)return;
    run.finalScore=scoreNow();
    run.ended=true;
    reportFinish();
  }
  function sync(){
    if(!ready||!run)return;
    if(run.ended){reportFinish();return}
    if(state==='end'){finish();return}
    const playing=state==='play'&&level>0&&!paused&&!document.hidden;
    if(!playing){stop();return}
    if(!run.active){safe('gameplayStart');run.active=true}
    const value=scoreNow(),now=Date.now();
    if(value!==lastSubmitted&&(lastSubmitted<0||now-lastSubmittedAt>=1500)){
      safe('submitScore',value);
      lastSubmitted=value;
      lastSubmittedAt=now;
    }
  }
  function start(){
    // Tutorial and menu attract-mode towns are not leaderboard attempts.
    if(run&&!run.ended)stop();
    run=level>0&&state==='play'?{id:++serial,active:false,ended:false,reported:false,finalScore:0}:null;
    lastSubmitted=-1;lastSubmittedAt=0;
    sync();
  }
  function attach(sdk){
    if(loaded||!sdk)return;
    loaded=true;api=sdk;
    try{
      Promise.resolve(api.init()).then(()=>{
        ready=true;
        safe('gameLoadingFinished');
        sync();
      },()=>{ready=false});
    }catch{ready=false}
  }
  showcaseHooks.on('start:after','arcade.new-run',start,-80);
  showcaseHooks.on('update:after','arcade.lifecycle',sync,-80);
  showcaseHooks.on('end:after','arcade.finish',finish,-80);
  addEventListener('pagehide',stop);
  addEventListener('visibilitychange',sync);
  // Load asynchronously so a blocked CDN, offline browser or SDK outage cannot block gameplay.
  const script=document.createElement('script');script.async=true;script.src=SDK_URL;
  script.onload=()=>attach(globalThis.BBArcade);
  script.onerror=()=>{};document.head.append(script);
  globalThis.showcaseArcade={
    attach, sync, finish,
    snapshot:()=>({ready,loaded,runId:run?.id||null,active:!!run?.active,
      ended:!!run?.ended,reported:!!run?.reported,finalScore:run?.finalScore??null})
  };
})();