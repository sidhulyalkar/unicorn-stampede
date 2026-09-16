/*
 * Unicorn Stampede — Wavedash js13k competition adapter.
 *
 * This file is intentionally outside src/. It observes the frozen submitted
 * game and sends platform data to Wavedash. It must never write values back
 * into gameplay state, tuning, progression, AI, collision, score, or input.
 */
(()=>{
  const wd=globalThis.Wavedash;
  const api={version:'js13k-wavedash-v1',available:!!wd,run:null,lastResult:null};
  globalThis.UnicornStampedeWavedash=api;
  if(!wd)return;

  const WORLDS=['Prismborough','Washwater Bay','Cloudtop Heights'];
  const WORLD_KEYS=['prismborough','washwater','cloudtop'];
  const DIFFICULTIES=['Easy','Medium','Hard','Impossible'];
  const HISTORY_PATH='meta/run-history.json';
  const MAX_HISTORY=20;
  const pending=new Set();
  const leaderboardIds={};
  let history=[];

  const track=p=>{
    const q=Promise.resolve(p).catch(err=>{console.warn('[Wavedash]',err);return null}).finally(()=>pending.delete(q));
    pending.add(q);return q;
  };
  const call=fn=>track(Promise.resolve().then(fn));
  const n=v=>Number.isFinite(+v)?+v:0;
  const pct=v=>Math.max(0,Math.min(100,Math.round(n(v)*100)));
  const getStat=id=>n(wd.getStat?.(id));
  const setStat=(id,value)=>wd.setStat?.(id,value,false);
  const unlock=id=>wd.setAchievement?.(id,true);
  const presence=(status,details)=>call(()=>wd.updateUserPresence?.({status,details}));
  const captured=()=>cleaners.filter(c=>c.u>=0).length;

  try{wd.updateLoadProgressZeroToOne?.(1);wd.init({debug:false})}catch(err){console.warn('[Wavedash init]',err)}

  async function loadHistory(){
    const dl=await call(()=>wd.downloadRemoteFile?.(HISTORY_PATH));
    if(!dl?.success)return;
    const bytes=await call(()=>wd.readLocalFile?.(HISTORY_PATH));
    if(!bytes)return;
    try{
      const parsed=JSON.parse(new TextDecoder().decode(bytes));
      if(Array.isArray(parsed?.runs))history=parsed.runs.slice(-MAX_HISTORY);
    }catch(err){console.warn('[Wavedash history]',err)}
  }

  async function saveHistory(result){
    history.push({
      at:result.at,world:result.world,difficulty:result.difficulty,win:result.win,
      score:result.score,timeMs:result.timeMs,paint:result.paint,structure:result.structure,
      chains:result.chains,maxCaptured:result.maxCaptured,grade:result.grade
    });
    history=history.slice(-MAX_HISTORY);
    const bytes=new TextEncoder().encode(JSON.stringify({version:1,runs:history}));
    const wrote=await call(()=>wd.writeLocalFile?.(HISTORY_PATH,bytes));
    if(wrote)await call(()=>wd.uploadRemoteFile?.(HISTORY_PATH));
  }

  async function setupLeaderboards(){
    const defs=[
      ['stampede-high-score',wd.LeaderboardSortOrder?.DESC,wd.LeaderboardDisplayType?.NUMERIC],
      ['fastest-conquest',wd.LeaderboardSortOrder?.ASC,wd.LeaderboardDisplayType?.TIME_MILLISECONDS],
      ['prismborough-high-score',wd.LeaderboardSortOrder?.DESC,wd.LeaderboardDisplayType?.NUMERIC],
      ['washwater-high-score',wd.LeaderboardSortOrder?.DESC,wd.LeaderboardDisplayType?.NUMERIC],
      ['cloudtop-high-score',wd.LeaderboardSortOrder?.DESC,wd.LeaderboardDisplayType?.NUMERIC]
    ];
    for(const [name,sort,display] of defs){
      const r=await call(()=>wd.getOrCreateLeaderboard?.(name,sort,display));
      if(r?.success)leaderboardIds[name]=r.data.id;
    }
  }

  const ready=track((async()=>{
    await call(()=>wd.requestStats?.());
    await Promise.all([loadHistory(),setupLeaderboards()]);
    const username=wd.getUsername?.()||'Player';
    api.user={id:wd.getUserId?.()||'',username};
    await presence('Ready to stampede','js13k 2026 Competition Build');
  })());

  function beginRun(){
    api.run={
      at:Date.now(),timeMs:0,maxCaptured:0,zone,mode,
      world:WORLDS[zone]||`World ${zone+1}`,
      worldKey:WORLD_KEYS[zone]||`world-${zone+1}`,
      difficulty:DIFFICULTIES[mode]||`Mode ${mode+1}`
    };
    presence('Herding the stampede',`${api.run.world} • ${api.run.difficulty}`);
  }

  function snapshotRun(run){
    const win=landWin>0;
    return Object.freeze({
      ...run,win,score:score|0,timeMs:Math.max(1,Math.round(run.timeMs)),
      paint:pct(paintPct()),structure:pct(structPct()),chains:chains|0,
      maxCaptured:run.maxCaptured|0,grade:win?grade()|0:0
    });
  }

  function updateStats(r){
    setStat('RUNS',getStat('RUNS')+1);
    setStat('TOTAL_SCORE',getStat('TOTAL_SCORE')+r.score);
    setStat('BEST_SCORE',Math.max(getStat('BEST_SCORE'),r.score));
    setStat('BEST_PAINT_PERCENT',Math.max(getStat('BEST_PAINT_PERCENT'),r.paint));
    setStat('BEST_STRUCTURE_PERCENT',Math.max(getStat('BEST_STRUCTURE_PERCENT'),r.structure));
    setStat('MAX_WHIP_CHAINS',Math.max(getStat('MAX_WHIP_CHAINS'),r.chains));
    unlock('FIRST_STAMPEDE');

    if(r.score>=100000)unlock('SIX_FIGURES');
    if(r.paint>=60)unlock('RAINBOW_SURGE');
    if(r.structure>=70)unlock('DEMOLITION_DERBY');
    if(r.chains>=3)unlock('CHAIN_REACTION');

    if(r.win){
      setStat('WINS',getStat('WINS')+1);
      const zoneStat=['PRISM_WINS','WASHWATER_WINS','CLOUDTOP_WINS'][r.zone];
      if(zoneStat)setStat(zoneStat,getStat(zoneStat)+1);
      if(r.mode===3)setStat('IMPOSSIBLE_WINS',getStat('IMPOSSIBLE_WINS')+1);
      if(!r.maxCaptured)setStat('CLEAN_WINS',getStat('CLEAN_WINS')+1);
      const prevFast=getStat('FASTEST_CONQUEST_MS');
      setStat('FASTEST_CONQUEST_MS',prevFast?Math.min(prevFast,r.timeMs):r.timeMs);

      unlock('TOWN_CONQUERED');
      unlock(['PRISMATIC_TAKEOVER','HARBOR_TAKEOVER','CLOUDTOP_TAKEOVER'][r.zone]);
      if(r.mode===3)unlock('IMPOSSIBLE_CONQUEST');
      if(!r.maxCaptured)unlock('CLEAN_HERD');
      if(r.grade>=3)unlock('MASTER_TAKEOVER');
    }
  }

  async function makeRunCard(r){
    if(!r.win||!wd.createUGCItem||!wd.writeLocalFile)return undefined;
    const username=(wd.getUsername?.()||'Player').slice(0,48);
    const path=`ugc/run-${r.at}-${r.worldKey}.json`;
    const payload={
      version:1,game:'Unicorn Stampede',edition:'js13k 2026',player:username,
      world:r.world,difficulty:r.difficulty,score:r.score,timeMs:r.timeMs,
      paint:r.paint,structure:r.structure,chains:r.chains,maxCaptured:r.maxCaptured,grade:r.grade
    };
    const wrote=await call(()=>wd.writeLocalFile(path,new TextEncoder().encode(JSON.stringify(payload))));
    if(!wrote)return undefined;
    const ugc=await call(()=>wd.createUGCItem(
      wd.UGCType?.GAME_MANAGED,
      `${r.world} Conquest • ${r.score}`.slice(0,96),
      `${r.difficulty} js13k competition run`.slice(0,180),
      wd.UGCVisibility?.PUBLIC,
      path
    ));
    return ugc?.success?ugc.data:undefined;
  }

  async function submitBoard(name,value,r,ugcId){
    const id=leaderboardIds[name];
    if(!id)return;
    const metadata={
      world:r.world,difficulty:r.difficulty,paint:r.paint,structure:r.structure,
      chains:r.chains,captured:r.maxCaptured,grade:r.grade,win:r.win?1:0
    };
    await call(()=>wd.uploadLeaderboardScore?.(id,value,true,ugcId,metadata));
  }

  async function finalize(r){
    await ready;
    updateStats(r);
    await call(()=>wd.storeStats?.());
    await saveHistory(r);
    const ugcId=await makeRunCard(r);
    await submitBoard('stampede-high-score',r.score,r,ugcId);
    const worldBoard=`${r.worldKey}-high-score`;
    await submitBoard(worldBoard,r.score,r,ugcId);
    if(r.win)await submitBoard('fastest-conquest',r.timeMs,r,ugcId);
    api.lastResult=r;
    await presence(r.win?'Town conquered':'Herd collapsed',`${r.world} • ${r.score.toLocaleString()} pts`);
  }

  const baseStartLevel=startLevel;
  startLevel=function(n){
    const out=baseStartLevel(n);
    if(n&&state==='play')beginRun();
    else if(!n)presence('Ready to stampede','js13k 2026 Competition Build');
    return out;
  };

  const baseUpdate=update;
  update=function(dt){
    const before=state,active=api.run&&before==='play';
    if(active&&!paused)api.run.timeMs+=Math.max(0,n(dt))*1000;
    const out=baseUpdate(dt);
    if(api.run){
      api.run.maxCaptured=Math.max(api.run.maxCaptured,captured());
      if(before==='play'&&state==='end'){
        const done=snapshotRun(api.run);api.run=null;
        track(finalize(done));
      }
    }
    return out;
  };

  api.flush=async()=>{await ready;while(pending.size)await Promise.allSettled([...pending]);};
  api.snapshot=()=>({available:true,user:api.user||null,leaderboards:{...leaderboardIds},history:[...history],run:api.run&&{...api.run},lastResult:api.lastResult});
})();
