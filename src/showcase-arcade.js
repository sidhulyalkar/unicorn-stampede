// Showcase-only Bounty Board bridge. Standalone, offline, and guest play do not depend on it.
(function(){
  'use strict';
  const SDK_URL='https://www.bountyboard.gg/arcade-sdk/v1.js';
  let api=null,ready=false,loaded=false,run=null,serial=0,lastSubmitted=-1,lastSubmittedAt=0;
  let saveStatus='session-only',restored=false,lastSaveAttempt=0;
  const safe=(name,...args)=>{try{
    if(typeof api?.[name]==='function')return api[name](...args);
  }catch(error){console.warn('[arcade] '+name+' unavailable',error)}};
  const scoreNow=()=>Math.max(0,Math.trunc(Number(score)||0));
  const eligible=()=>globalThis.showcaseCompetition?.eligible!==false;
  function stop(){if(run?.active){safe('gameplayStop');run.active=false}}
  async function restoreCloud(){
    if(!ready||!api?.getPlayer||!api?.load||restored)return;
    if(state!=='title'){saveStatus='cloud-later';return}
    restored=true;
    try{
      const player=await api.getPlayer();
      if(!player){saveStatus='guest-session';return}
      const blob=await api.load();
      if(!blob){saveStatus='cloud-ready';return}
      if(state==='title'&&globalThis.showcaseStorage?.restore(JSON.parse(blob))){
        saveStatus='cloud-restored';
      }else{saveStatus='cloud-later';restored=false}
    }catch(error){
      saveStatus=error?.code==='unsupported'?'local-only':'cloud-unavailable';
    }
  }
  async function saveCloud(){
    if(!ready||!api?.getPlayer||!api?.save||!globalThis.showcaseStorage)return;
    try{
      const player=await api.getPlayer();
      if(!player){saveStatus='guest-session';return}
      const data=JSON.stringify(showcaseStorage.snapshot());
      if(data.length>800000){saveStatus='save-too-large';return}
      await api.save(data);
      saveStatus='cloud-saved';
    }catch(error){
      saveStatus=error?.code==='unsupported'?'local-only':error?.code==='unauthenticated'?'guest-session':'cloud-save-failed';
    }
  }
  function reportFinish(){
    if(!run||!run.ended||run.reported||!ready)return;
    stop();
    safe('submitScore',run.finalScore);
    safe('gameOver',run.finalScore);
    run.reported=true;
    void saveCloud();
  }
  function finish(){
    if(!run||run.ended)return;
    run.finalScore=run.ranked?scoreNow():0;
    run.ended=true;
    reportFinish();
  }
  function sync(){
    if(ready&&!restored&&state==='title')void restoreCloud();
    if(!ready||!run)return;
    if(run.ended){reportFinish();return}
    if(state==='end'){finish();return}
    const playing=state==='play'&&level>0&&!paused&&!document.hidden;
    if(!playing){stop();return}
    if(!run.active){safe('gameplayStart');run.active=true}
    // Non-ranked gameplay still tracks active playtime but contributes no
    // positive score to the shared global board.
    if(!run.ranked)return;
    const value=scoreNow(),now=Date.now();
    if(value!==lastSubmitted&&(lastSubmitted<0||now-lastSubmittedAt>=1500)){
      safe('submitScore',value);lastSubmitted=value;lastSubmittedAt=now;
    }
  }
  function start(){
    if(run&&!run.ended)stop();
    run=level>0&&state==='play'?{
      id:++serial,ranked:eligible(),active:false,ended:false,reported:false,finalScore:0
    }:null;
    lastSubmitted=-1;lastSubmittedAt=0;sync();
  }
  function attach(sdk){
    if(loaded||!sdk)return;
    loaded=true;api=sdk;
    try{
      Promise.resolve(api.init()).then(()=>{
        ready=true;
        safe('gameLoadingFinished');
        safe('onPlayerChange',()=>{restored=false;if(state==='title')void restoreCloud()});
        void restoreCloud();
        sync();
      },()=>{saveStatus='host-unavailable'});
    }catch{saveStatus='host-unavailable'}
  }
  showcaseHooks.on('start:after','arcade.new-run',start,-80);
  showcaseHooks.on('update:after','arcade.lifecycle',sync,-80);
  showcaseHooks.on('end:after','arcade.finish',finish,-80);
  addEventListener('pagehide',stop);
  addEventListener('visibilitychange',sync);
  document.addEventListener('unicorn-settings-changed',()=>{
    if(!ready||state!=='title')return;
    const now=Date.now();
    if(now-lastSaveAttempt<3000)return;
    lastSaveAttempt=now;void saveCloud();
  });
  const script=document.createElement('script');script.async=true;script.src=SDK_URL;
  script.onload=()=>attach(globalThis.BBArcade);
  script.onerror=()=>{saveStatus='offline'};
  document.head.append(script);
  globalThis.showcaseArcade={attach,sync,finish,saveCloud,restoreCloud,
    snapshot:()=>({ready,loaded,saveStatus,restored,runId:run?.id||null,
      ranked:!!run?.ranked,active:!!run?.active,ended:!!run?.ended,
      reported:!!run?.reported,finalScore:run?.finalScore??null})};
})();