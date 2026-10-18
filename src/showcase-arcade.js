// Bounty Board bridge. Arcade features must never be required for standalone play.
// Cloud hydration is serialized before uploads, and identity changes invalidate old loads.
(function(){
  'use strict';
  const SDK_URL='https://www.bountyboard.gg/arcade-sdk/v1.js';
  let api=null,ready=false,loaded=false,run=null,serial=0;
  let lastSubmitted=-1,lastSubmittedAt=0,saveStatus='session-only';
  let hydrated=false,readInFlight=null,saveInFlight=null,pendingSave=false,playerEpoch=0;
  let lastSaveAttempt=0,cloudRetryAt=0;
  const safe=(method,...args)=>{
    try{if(typeof api?.[method]==='function')return api[method](...args)}
    catch(error){console.warn('[arcade] '+method+' unavailable',error)}
  };
  const scoreNow=()=>Math.max(0,Math.trunc(Number(score)||0));
  const eligible=()=>globalThis.showcaseCompetition?.eligible===true;
  function stop(){if(run?.active){run.active=false;safe('gameplayStop')}}
  function gameFinished(){
    if(!run||run.ended)return;
    run.finalScore=run.ranked?scoreNow():0;
    run.ended=true;
    reportFinish();
  }
  function reportFinish(){
    if(!run||!run.ended||run.reported||!ready)return;
    stop();
    safe('submitScore',run.finalScore);
    safe('gameOver',run.finalScore);
    run.reported=true;
    void saveCloud();
  }
  async function restoreCloud(){
    if(!ready||!api?.getPlayer||!api?.load||hydrated||Date.now()<cloudRetryAt)return;
    if(state!=='title'){saveStatus='cloud-later';return}
    if(readInFlight)return readInFlight;
    const token=playerEpoch,baseline=globalThis.showcaseStorage?.snapshot();
    readInFlight=(async()=>{
      try{
        const player=await api.getPlayer();
        if(playerEpoch!==token)return;
        if(!player){hydrated=true;saveStatus='guest-session';return}
        const blob=await api.load();
        if(playerEpoch!==token)return;
        if(state!=='title'){saveStatus='cloud-later';return}
        if(blob){
          let data;
          try{data=JSON.parse(blob)}catch{saveStatus='cloud-invalid';cloudRetryAt=Date.now()+60000;return}
          if(!globalThis.showcaseStorage?.restore(data,baseline)){
            saveStatus='cloud-invalid';cloudRetryAt=Date.now()+60000;return;
          }
          saveStatus='cloud-restored';
        }else saveStatus='cloud-ready';
        hydrated=true;cloudRetryAt=0;
      }catch(error){
        if(playerEpoch!==token)return;
        // A transient failure never licenses overwriting unknown cloud progress.
        saveStatus=error?.code==='unsupported'?'local-only':'cloud-unavailable';
        cloudRetryAt=Date.now()+(error?.code==='unsupported'?60000:5000);
      }
    })().finally(()=>{
      readInFlight=null;
      if(hydrated&&pendingSave&&playerEpoch===token)void saveCloud();
    });
    return readInFlight;
  }
  async function saveCloud(){
    pendingSave=true;
    if(!ready||!api?.getPlayer||!api?.save||!globalThis.showcaseStorage)return;
    if(!hydrated){
      saveStatus='waiting-for-hydration';
      if(state==='title')void restoreCloud();
      return;
    }
    if(saveInFlight)return saveInFlight;
    const token=playerEpoch;
    // Snapshot is taken after hydrating; never upload stale pre-merge progress.
    saveInFlight=(async()=>{
      pendingSave=false;
      try{
        const player=await api.getPlayer();
        if(playerEpoch!==token)return;
        if(!player){saveStatus='guest-session';return}
        const blob=JSON.stringify(showcaseStorage.snapshot());
        if(blob.length>800000){saveStatus='save-too-large';return}
        await api.save(blob);
        if(playerEpoch===token)saveStatus='cloud-saved';
      }catch(error){
        if(playerEpoch!==token)return;
        saveStatus=error?.code==='unsupported'?'local-only':
          error?.code==='unauthenticated'?'guest-session':
          error?.code==='too_large'?'save-too-large':'cloud-save-failed';
      }
    })().finally(()=>{
      saveInFlight=null;
      if(hydrated&&pendingSave&&playerEpoch===token)void saveCloud();
    });
    return saveInFlight;
  }
  function sync(){
    if(ready&&!hydrated&&state==='title')void restoreCloud();
    if(!ready||!run)return;
    if(run.ended){reportFinish();return}
    if(state==='end'){gameFinished();return}
    const playing=state==='play'&&level>0&&!paused&&!document.hidden;
    if(!playing){stop();return}
    if(!run.active){run.active=true;safe('gameplayStart')}
    if(!run.ranked)return; // All other maps/difficulties are explicitly free play.
    const value=scoreNow(),now=Date.now();
    if(value!==lastSubmitted&&(lastSubmitted<0||now-lastSubmittedAt>=1500)){
      safe('submitScore',value);lastSubmitted=value;lastSubmittedAt=now;
    }
  }
  function start(){
    if(run&&!run.ended)stop();
    run=state==='play'&&level>0?{
      id:++serial,ranked:eligible(),active:false,ended:false,reported:false,finalScore:0
    }:null;
    lastSubmitted=-1;lastSubmittedAt=0;sync();
  }
  function onIdentityChange(){
    playerEpoch++;hydrated=false;pendingSave=true;cloudRetryAt=0;
    saveStatus='identity-changed';
    if(state==='title')void restoreCloud();
  }
  function attach(sdk){
    if(loaded||!sdk)return;
    loaded=true;api=sdk;
    try{
      Promise.resolve(api.init()).then(()=>{
        ready=true;
        safe('gameLoadingFinished');
        safe('onPlayerChange',onIdentityChange);
        void restoreCloud();
        sync();
      },()=>{saveStatus='host-unavailable'});
    }catch{saveStatus='host-unavailable'}
  }
  showcaseHooks.on('start:after','arcade.new-run',start,-80);
  showcaseHooks.on('update:after','arcade.lifecycle',sync,-80);
  showcaseHooks.on('end:after','arcade.finish',gameFinished,-80);
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
  globalThis.showcaseArcade={
    attach,sync,finish:gameFinished,saveCloud,restoreCloud,
    snapshot:()=>({ready,loaded,restored:hydrated,saveStatus,playerEpoch,pendingSave,
      runId:run?.id||null,ranked:!!run?.ranked,active:!!run?.active,
      ended:!!run?.ended,reported:!!run?.reported,finalScore:run?.finalScore??null})
  };
})();