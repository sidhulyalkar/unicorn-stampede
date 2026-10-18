// v1.19 acceptance: four-world conquest, defeat/restart, and cloud-save races.
// Real Chromium + Firefox canvas/runtime, not a mocked physics interpreter.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {chromium,firefox} from 'playwright';
const root=process.cwd(),port=4195,results=[];
const srv=http.createServer((req,res)=>{
  const name=decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/,'')||'index.html';
  const file=path.resolve(root,name);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);return res.end('missing')}
  res.setHeader('content-type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve=>srv.listen(port,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+port+'/';
async function qualify(kind,engine){
  const browser=await engine.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    await page.route('https://www.bountyboard.gg/arcade-sdk/v1.js',route=>route.abort());
    await page.goto(url);
    await page.waitForFunction(()=>state==='title'&&globalThis.showcaseCompetition&&globalThis.showcaseMastery);
    const runs=await page.evaluate(()=>{
      const reports=[];
      // Actions use the authoritative hitObj/paintBits functions. They shorten
      // the physical travel but do not set victory, landmark HP or final score.
      for(let area=0;area<4;area++){
        zone=area;mode=1;S.s('ccZone',area);S.s('ccMode',1);
        train=0;paused=0;startLevel(1);
        const u=unis[caps[0]];
        let stages=0,landmarks=0;
        for(const l of [...LM]){
          if(l.k==='hall'){
            // Painting still flows through the same paint bitset used by movement.
            paintBits(WW/2,WH/2,2200,1);
            for(let i=0;i<4;i++)dmask|=1<<i;
            if(!outerDone()||takeover()<chaos())throw Error('hall prerequisites missing '+area);
          }
          for(const o of l.os){
            if(o.hp<=0)continue;
            const x=o.x+o.w/2,y=o.y+o.h/2;
            for(const q of unis.filter(q=>q.live)){q.x=x;q.y=y;q.distract=0}
            u.dash=.5;
            hitObj(u,o,o.hp+o.max);
            if(o.hp>0)throw Error('landmark impossible to smash '+area+' '+l.k);
          }
          if(!lmDone(l))throw Error('landmark not done '+area+' '+l.k);
          landmarks++;
          stages++;
        }
        if(!hallDone()||landmarks!==5)throw Error('hall transition failed '+area);
        for(let frame=0;frame<105&&state==='play';frame++)update(1/30);
        if(state!=='end'||landWin<=0)throw Error('conquest did not end '+area+' '+state+' '+landWin);
        const mastery=showcaseMastery.latest;
        if(!mastery?.won||mastery.world!==area)throw Error('mastery not finalized '+area);
        const endingScore=score;
        if(!Number.isFinite(endingScore)||endingScore<=0)throw Error('bad final score '+area);
        reports.push({area,landmarks,state,won:mastery.won,stars:mastery.stars,score:Math.trunc(endingScore)});
        // Returning to menu and replay must clear stale end-state/captures.
        showcaseSessionMenuAPI.menu();
        if(state!=='title')throw Error('menu did not recover '+area);
        startLevel(1);if(state!=='play'||landWin!==0)throw Error('restart still terminal '+area);
        paused=0;
      }
      // The failure transition goes through the real gameplay update.
      zone=0;mode=1;S.s('ccZone',0);S.s('ccMode',1);startLevel(1);
      landWin=-1;victoryT=.01;update(.033);
      if(state!=='end'||landWin>=0)throw Error('defeat transition failed');
      showcaseSessionMenuAPI.restart();
      if(state!=='play'||landWin!==0||!unis[caps[0]]?.live)
        throw Error('defeat restart failed');
      return reports;
    });
    if(runs.length!==4||errors.length)throw Error(kind+' acceptance errors '+JSON.stringify({runs,errors}));
    console.log(kind+' four-world conquest/defeat: PASS '+JSON.stringify(runs));
    await page.close();

    const hosted=await browser.newPage({viewport:{width:1200,height:740}}),hostErrors=[];
    hosted.on('pageerror',e=>hostErrors.push(String(e)));
    await hosted.route('https://www.bountyboard.gg/arcade-sdk/v1.js',route=>
      route.fulfill({status:200,contentType:'text/javascript',body:
        "window.__bb={loads:[],saves:[],over:[],players:{name:'Tester'},identity:null};"+
        "window.BBArcade={init:()=>Promise.resolve(),gameLoadingFinished(){},gameplayStart(){},gameplayStop(){},"+
        "submitScore(){},gameOver(n){__bb.over.push(n)},getPlayer:async()=>__bb.players,"+
        "load:()=>new Promise(resolve=>__bb.loads.push(resolve)),"+
        "save:async b=>{__bb.saves.push(JSON.parse(b))},"+
        "onPlayerChange(f){__bb.identity=f;return()=>{}}};"
      }));
    await hosted.goto(url);
    await hosted.waitForFunction(()=>state==='title'&&showcaseArcade.snapshot().ready&&__bb.loads.length===1);
    const remote=JSON.stringify({version:1,entries:{
      usMasteryV110:JSON.stringify({version:1,worlds:[
        {mask:1,wins:3,bestTime:80,bestFlair:2},{mask:0,wins:0,bestTime:0,bestFlair:0},
        {mask:0,wins:0,bestTime:0,bestFlair:0},{mask:0,wins:0,bestTime:0,bestFlair:0}]}),
      ccMode:'1',ccZone:'0',ccIntro16:'1'
    }});
    // A player can start before remote load finishes. Their current attempt
    // cannot be overwritten or uploaded until that cloud read is safely merged.
    await hosted.evaluate(()=>{
      train=0;zone=0;mode=1;S.s('ccZone',0);S.s('ccMode',1);
      startLevel(1);
      showcaseStorage.setItem('usMasteryV110',JSON.stringify({version:1,worlds:[
        {mask:2,wins:1,bestTime:95,bestFlair:5},{mask:0,wins:0,bestTime:0,bestFlair:0},
        {mask:0,wins:0,bestTime:0,bestFlair:0},{mask:0,wins:0,bestTime:0,bestFlair:0}
      ]}));
      showcaseMastery.reload(); // The UI and persistence must observe the same in-memory mastery.
      state='end';landWin=1;end();
      if(__bb.saves.length)throw Error('saved before initial hydration');
      __bb.loads[0](null);
    });
    // When read completes while the run is terminal, it must not mark progress hydrated.
    await hosted.waitForFunction(()=>showcaseArcade.snapshot().saveStatus==='cloud-later');
    await hosted.evaluate(()=>{showcaseSessionMenuAPI.menu();showcaseArcade.sync();S.s('ccMode',2);mode=2});
    await hosted.waitForFunction(()=>__bb.loads.length>=2);
    await hosted.evaluate(blob=>{__bb.loads[1](blob)},remote);
    await hosted.waitForFunction(()=>showcaseArcade.snapshot().restored&&__bb.saves.length>=1);
    const cloud=await hosted.evaluate(()=>{
      const current=showcaseMastery.get(0);
      const saved=__bb.saves.at(-1).entries;
      const mastery=JSON.parse(saved.usMasteryV110).worlds[0];
      if(current.mask!==3||mastery.mask!==3)throw Error('cloud merge dropped earned stars');
      if(mastery.wins!==3||mastery.bestTime!==80||mastery.bestFlair!==5)
        throw Error('cloud merge damaged historical bests '+JSON.stringify({mastery,current,savedMask:saved.usMasteryV110}));
      if(!showcaseArcade.snapshot().restored)throw Error('hydration never finished');
      if(S.g('ccMode')!==2||saved.ccMode!=='2')throw Error('late cloud read overwrote user-selected mode');
      return{mask:mastery.mask,wins:mastery.wins,bestTime:mastery.bestTime,bestFlair:mastery.bestFlair};
    });
    // A stale signed-in load must never install its data after account switches.
    await hosted.evaluate(()=>{
      __bb.players={name:'Different user'};
      __bb.identity(__bb.players);
    });
    await hosted.waitForFunction(()=>__bb.loads.length>=3);
    await hosted.evaluate(()=>{__bb.players=null;__bb.identity(null);__bb.loads[2]('{"version":1,"entries":{"ccMode":"3"}}')});
    await hosted.waitForFunction(()=>showcaseArcade.snapshot().restored);
    const switched=await hosted.evaluate(()=>({
      mode:S.g('ccMode'),status:showcaseArcade.snapshot().saveStatus
    }));
    if(switched.mode===3)throw Error(kind+' stale identity overwrote local selection');
    if(hostErrors.length)throw Error(kind+' hosted errors '+hostErrors.join('|'));
    console.log(kind+' cloud conflict/identity: PASS '+JSON.stringify({cloud,switched}));
    results.push({browser:kind,conquest:runs,cloud,identity:switched});
    await hosted.close();
  }finally{await browser.close()}
}
try{
  for(const [kind,engine] of [['chromium',chromium],['firefox',firefox]])await qualify(kind,engine);
  fs.mkdirSync('dist/arcade',{recursive:true});
  fs.writeFileSync('dist/arcade/qualification-v119.json',JSON.stringify({version:'v1.19',results},null,2)+'\n');
}finally{srv.close()}
