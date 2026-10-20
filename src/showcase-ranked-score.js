// Bounded leaderboard score, separate from the original campaign score.
// Repainting, rebuilt buildings, or waiting cannot farm unlimited leaderboard points.
// Client-side checks do not establish cheat resistance for cash competitions.
(function(){
  'use strict';
  const MAX_SCORE=99500;
  let attempt=null;
  const clamp=(value,max)=>Math.max(0,Math.min(max,Number.isFinite(+value)?+value:0));
  const countBits=n=>{let c=0;for(let i=0;i<4;i++)if(n&(1<<i))c++;return c};
  function milestones(){
    if(typeof LM==='undefined'||typeof lmDone!=='function')return 0;
    return Math.min(5,LM.slice(0,5).filter(lmDone).length);
  }
  function blank(){
    return{ranked:false,score:0,maxScore:MAX_SCORE,paint:0,landmarks:0,districts:0,
      flow:0,conquest:0,speed:0,winTime:null};
  }
  function current(){
    if(!attempt)return blank();
    if(attempt.final)return {...attempt.final};
    const coverage=typeof paintPct==='function'?clamp(paintPct(),1):0;
    attempt.peakPaint=Math.max(attempt.peakPaint,coverage);
    attempt.landmarks=Math.max(attempt.landmarks,milestones());
    // Districts count only after the authoritative Town Hall victory gate.
    if(typeof hallDone==='function'&&hallDone())
      attempt.districts=Math.max(attempt.districts,countBits(typeof dmask==='undefined'?0:dmask&15));
    attempt.peakFlow=Math.max(attempt.peakFlow,clamp(globalThis.showcaseRunStats?.peakFlow||0,5));
    if(attempt.winTime===null&&typeof landWin!=='undefined'&&landWin>0)
      attempt.winTime=clamp(globalThis.showcaseRunStats?.time||0,1e8);
    const paint=Math.round(attempt.peakPaint*20000);
    const landmarks=attempt.landmarks*4000;
    const districts=attempt.districts*2500;
    const flow=Math.round(attempt.peakFlow)*1500;
    const conquest=attempt.winTime===null?0:30000;
    const speed=attempt.winTime===null?0:
      Math.round(12000*Math.max(0,1-attempt.winTime/720));
    return{ranked:true,score:paint+landmarks+districts+flow+conquest+speed,
      maxScore:MAX_SCORE,paint,landmarks,districts,flow,conquest,speed,
      winTime:attempt.winTime};
  }
  function begin(ranked){
    attempt=ranked?{peakPaint:0,landmarks:0,districts:0,peakFlow:0,
      winTime:null,final:null}:null;
    return current();
  }
  function finish(){
    const result=current();
    if(attempt&&!attempt.final)attempt.final={...result};
    return result;
  }
  globalThis.showcaseRankedScore={begin,current,finish,snapshot:current,MAX_SCORE};
})();
