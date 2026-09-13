import fs from'node:fs';import http from'node:http';import path from'node:path';import{chromium,firefox}from'playwright';
const root=process.cwd(),server=http.createServer((q,r)=>{let p=q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0].slice(1);p=path.normalize(p).replace(/^\.\.(\/|\\)/,'');const f=path.join(root,p);if(!f.startsWith(root)||!fs.existsSync(f)){r.statusCode=404;return r.end('no')}r.setHeader('content-type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');r.end(fs.readFileSync(f))});await new Promise(ok=>server.listen(4177,'127.0.0.1',ok));
const engines=[['chromium',chromium],['firefox',firefox]];
try{for(const[name,engine]of engines){const browser=await engine.launch({headless:true}),page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];page.on('pageerror',e=>errors.push(e.stack||String(e)));await page.goto('http://127.0.0.1:4177/');await page.waitForFunction(()=>state==='title'&&typeof showcaseSwitching==='object'&&typeof showcaseBoundaries==='object'&&typeof showcaseFrontier==='object');
const report=await page.evaluate(()=>{const scenarios=[],failures=[],dirs=[[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],dt=.016;let totalTicks=0,totalSwitches=0,totalWhips=0,totalDashes=0,totalEnds=0,maxPinned=0;
const rng0=seed=>{let s=seed>>>0;return()=>((s=Math.imul(s,1664525)+1013904223>>>0)/4294967296)};
const setKeys=(x,y)=>{K.KeyA=x<0?1:0;K.KeyD=x>0?1:0;K.KeyW=y<0?1:0;K.KeyS=y>0?1:0};
const clearKeys=()=>setKeys(0,0);
for(let z0=0;z0<4;z0++)for(let m=0;m<4;m++)for(let seed=1;seed<=3;seed++){
  S.s('ccZone',z0);S.s('ccMode',m);zone=z0;mode=m;paused=0;startLevel(1);if(zone!==z0||mode!==m)failures.push({kind:'scenario-fixture',z:z0,m,seed,actualZone:zone,actualMode:mode});const rnd=rng0((z0+1)*0x9e3779b1^(m+7)*0x85ebca6b^seed*0xc2b2ae35),pin=new Map(),seenActive=new Set([caps[0]]);let ended=0,switches=0,whips=0,dashes=0,localMaxPin=0;
  for(let tick=0;tick<720;tick++){
    if(state!=='play'){ended=1;totalEnds++;break}
    if(tick%13===0){const d=dirs[(rnd()*dirs.length)|0];setKeys(d[0],d[1])}
    if(tick%47===11){cycle();switches++;totalSwitches++;seenActive.add(caps[0])}
    if(tick%211===73){for(let j=0;j<3;j++){cycle();switches++;totalSwitches++;seenActive.add(caps[0])}}
    if(tick%61===19){const u=unis[caps[0]];if(u?.live){const a=rnd()*T,r=82+rnd()*74;whip={x:u.x-Math.cos(a)*r,y:u.y-Math.sin(a)*r,i:caps[0],l:.13,hit:0};crackWhip();whips++;totalWhips++}}
    if(tick%122===58){const u=unis[caps[0]];if(u?.live&&u.power>=2){dashSolo();dashes++;totalDashes++}}
    if(z0===3&&tick===330)for(let i=0;i<showcaseFrontier.faults.length;i++)showcaseFrontier.forceBreak(i);
    update(dt);totalTicks++;
    if(state!=='play')continue;
    const active=unis[caps[0]];if(!active?.live)failures.push({kind:'dead-active',z:z0,m,seed,tick,active:caps[0]});
    const captured=cleaners.filter(c=>c.u>=0).length;if(captured>3)failures.push({kind:'capture-overflow',z:z0,m,seed,tick,captured});
    for(const u of unis){if(!u.live){pin.delete(u.id);continue}const vals=[u.x,u.y,u.vx,u.vy];if(!vals.every(Number.isFinite)){failures.push({kind:'non-finite',z:z0,m,seed,tick,id:u.id,vals});continue}if(u.x<19.99||u.x>WW-19.99||u.y<19.99||u.y>WH-19.99)failures.push({kind:'out-of-bounds',z:z0,m,seed,tick,id:u.id,x:u.x,y:u.y});if(showcaseBoundaries.overlap(u))failures.push({kind:'solid-overlap',z:z0,m,seed,tick,id:u.id,x:u.x,y:u.y});const p=showcaseBoundaries.perimeter(u),speed=Math.hypot(u.vx,u.vy),stuck=u!==active&&p.near&&speed<18;if(stuck){const n=(pin.get(u.id)||0)+1;pin.set(u.id,n);localMaxPin=Math.max(localMaxPin,n);maxPinned=Math.max(maxPinned,n);if(n>120)failures.push({kind:'persistent-edge-pin',z:z0,m,seed,tick,id:u.id,frames:n,x:u.x,y:u.y,order:u.order})}else pin.set(u.id,0)}
    if(failures.length>20)break;
  }
  clearKeys();paused=1;scenarios.push({z:z0,m,actualMode:mode,seed,ended,switches,whips,dashes,activeCoverage:seenActive.size,maxPinned:localMaxPin,captured:cleaners.filter(c=>c.u>=0).length,boundary:{...showcaseBoundaries.stats}});if(failures.length>20)break;
}
return{scenarios,failures,totalTicks,totalSwitches,totalWhips,totalDashes,totalEnds,maxPinned};});
if(report.failures.length)throw Error(name+' v1.6 stress failures '+JSON.stringify(report.failures.slice(0,20)));if(report.scenarios.length!==48)throw Error(name+' stress scenario count '+report.scenarios.length);if(new Set(report.scenarios.map(s=>s.actualMode)).size!==4)throw Error(name+' stress did not execute all four actual difficulty modes');if(report.totalTicks<25000)throw Error(name+' stress run ended too early '+report.totalTicks);if(report.totalSwitches<700||report.totalWhips<400)throw Error(name+' stress action coverage too low '+JSON.stringify({switches:report.totalSwitches,whips:report.totalWhips}));if(errors.length)throw Error(name+' page errors '+errors.join(' | '));console.log(name+' showcase v1.6 deterministic stress: PASS '+JSON.stringify({scenarios:report.scenarios.length,modes:[...new Set(report.scenarios.map(s=>s.actualMode))],ticks:report.totalTicks,switches:report.totalSwitches,whips:report.totalWhips,dashes:report.totalDashes,ends:report.totalEnds,maxPinnedFrames:report.maxPinned}));await browser.close()}}finally{server.close()}
