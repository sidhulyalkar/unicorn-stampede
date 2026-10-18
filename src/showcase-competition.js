// The only public high-score lane at launch: Prismborough, Medium, shared seed.
// Every other world/difficulty is free-play and retains ordinary gameplay.
(function(){
  'use strict';
  const SEED_DAY=20480;
  let configured=false,eligible=false,serial=0,lastConfig=null,priorToday=null,priorRead=null;
  function begin(ctx){
    const n=ctx.args?.[0],ranked=n===1&&zone===0&&mode===1;
    configured=ranked;
    lastConfig={world:zone,difficulty:mode,ranked,seed:ranked?SEED_DAY:null};
    if(!ranked)return;
    // Do not mutate saved career progress: temporarily mask encore unlock/heat
    // only while startLevel builds the authoritative scene and difficulty.
    priorToday=today;priorRead=S.g;
    today=()=>SEED_DAY;
    S.g=k=>k==='ccC2'||k==='ccHeat'?0:priorRead(k);
  }
  function restoreSeed(){
    if(priorToday){today=priorToday;priorToday=null}
    if(priorRead){S.g=priorRead;priorRead=null}
  }
  function after(ctx){
    restoreSeed();
    eligible=configured&&ctx.args?.[0]===1&&level===1&&zone===0&&mode===1&&!plus;
    // Core game starts a new session with 30% of the previous score.
    // A competitive attempt must always start from absolute zero.
    if(ctx.args?.[0]===1)score=0;
    if(level===1)serial++;
  }
  showcaseHooks.on('start:before','competition.seed',begin,1000);
  showcaseHooks.on('start:after','competition.qualify',after,1000);
  showcaseHooks.on('start:error','competition.restore-on-error',restoreSeed,1000);
  globalThis.showcaseCompetition={
    get eligible(){return eligible},
    get label(){return eligible?'RANKED · PRISMBOROUGH · MEDIUM':'FREE PLAY · RANKED: PRISMBOROUGH MEDIUM'},
    get attempt(){return serial},
    snapshot:()=>({...lastConfig,eligible,attempt:serial})
  };
})();