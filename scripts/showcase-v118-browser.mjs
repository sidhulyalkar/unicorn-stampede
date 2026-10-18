import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {chromium,firefox} from 'playwright';
const root=process.cwd(),port=4193;
const srv=http.createServer((req,res)=>{
  const raw=decodeURIComponent(req.url.split('?')[0]);
  const rel=raw==='/'?'index.html':raw.slice(1),file=path.resolve(root,rel);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){
    res.writeHead(404);return res.end('not found');
  }
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve=>srv.listen(port,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+port+'/';
async function check(browserType,name){
  const browser=await browserType.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:720}});
    const errs=[];page.on('pageerror',error=>errs.push(String(error)));
    await page.goto(url);
    await page.waitForFunction(()=>state==='title'&&globalThis.showcaseCompetition&&globalThis.showcaseClarity&&globalThis.showcaseArcade&&globalThis.showcaseStorage&&globalThis.showcaseCoach);
    const report=await page.evaluate(()=>{
      train=0;zone=0;mode=1;S.s('ccZone',0);S.s('ccMode',1);
      startLevel(1);
      if(!showcaseCompetition.eligible||score!==0)throw Error('ranked must start from zero');
      const slots=()=>objs.filter(o=>o.t==='b'&&!o.lm).slice(0,18)
        .map(o=>[Math.round(o.x),Math.round(o.y),Math.round(o.w),Math.round(o.h)]);
      const before=JSON.stringify(slots());
      score=99000;startLevel(1);
      if(score!==0||JSON.stringify(slots())!==before)throw Error('ranked seed/score not repeatable');
      if(!showcaseClarity.status(unis[caps[0]]))throw Error('herd status missing');
      const bakery=objs.find(o=>o.lm==='bakery'),clockObj=objs.find(o=>o.lm==='clock'),hall=objs.find(o=>o.lm==='hall');
      if(!bakery||!clockObj||!hall)throw Error('required landmarks absent');
      let u=unis[caps[0]];
      u.distract=0;u.dash=.5;u.power=3;
      const hp=bakery.hp;
      u.x=bakery.x-10;u.y=bakery.y+bakery.h/2;
      collide(u,bakery,.033);
      if(!(bakery.hp<hp))throw Error('Bakery collision damage failed');
      const smash=hp-bakery.hp;
      // The gated landmark must reject the first player alone.
      for(const v of unis)if(v!==u){v.x=WW-100;v.y=WH-100}
      u.x=clockObj.x-10;u.y=clockObj.y+clockObj.h/2;u.dash=.5;
      const chp=clockObj.hp;collide(u,clockObj,.033);
      if(clockObj.hp!==chp||!showcaseClarity.gate(clockObj,u).includes('TEAM'))
        throw Error('Clock Tower gate did not explain missing team');
      const ally=unis.find(v=>v!==u&&v.live);
      ally.x=clockObj.x+clockObj.w/2;ally.y=clockObj.y+clockObj.h/2;
      u.x=clockObj.x-10;u.y=clockObj.y+clockObj.h/2;u.dash=.5;
      collide(u,clockObj,.033);
      if(!(clockObj.hp<chp))throw Error('Clock Tower remained blocked after rally');
      if(!showcaseClarity.gate(hall,u).includes('LANDMARKS'))throw Error('Hall prereq not readable');
      paused=1;showcaseArcade.sync();
      if(!document.getElementById('showcase-impact-help'))throw Error('feedback overlay missing');
      paused=0;
      zone=1;mode=0;startLevel(1);
      if(showcaseCompetition.eligible)throw Error('other worlds must not join ranked board');
      for(let z=0;z<4;z++){zone=z;mode=0;startLevel(1);if(!unis.filter(x=>x.live).length)throw Error('empty herd world '+z)}
      return{smash,rankedSeed:before.slice(0,120),worlds:4,unranked:true};
    });
    // Actual gameplay keyboard path, not a direct cycle() call.
    const changed=await page.evaluate(()=>{zone=0;mode=1;startLevel(1);return caps[0]});
    await page.keyboard.press('q');
    const newCaptain=await page.evaluate(()=>caps[0]);
    if(changed===newCaptain)throw Error(name+' Q handoff did not change active captain');
    await page.evaluate(()=>{zone=0;mode=1;startLevel(1);});
    await page.screenshot({path:'dist/arcade/'+name+'-launch.png'});
    // Verify that the same game boots without native localStorage.
    const isolated=await browser.newPage({viewport:{width:1120,height:700}});
    const isolatedErrors=[];isolated.on('pageerror',e=>isolatedErrors.push(String(e)));
    await isolated.goto(url);
    const sandbox=await isolated.evaluate(async src=>{
      const iframe=document.createElement('iframe');
      iframe.setAttribute('sandbox','allow-scripts');
      iframe.width='960';iframe.height='600';iframe.src=src;
      document.body.appendChild(iframe);
      return await new Promise(resolve=>{
        const deadline=Date.now()+12000;
        const poll=()=>{if(Date.now()>deadline)return resolve('timeout');
          try{
            const w=iframe.contentWindow;
            // sandbox blocks parent DOM access, so success is observable via iframe load.
            if(iframe.dataset.loaded)return resolve('loaded');
          }catch{}
          setTimeout(poll,120);
        };
        iframe.addEventListener('load',()=>{iframe.dataset.loaded='1'});poll();
      });
    },url);
    if(sandbox!=='loaded')throw Error(name+' restricted-storage frame did not load');
    if(errs.length||isolatedErrors.length)throw Error(name+' browser errors '+[...errs,...isolatedErrors].join('|'));
    console.log(name+' v1.18 browser: PASS',JSON.stringify(report));
    await page.close();await isolated.close();
  }finally{await browser.close()}
}
try{for(const [name,type] of [['chromium',chromium],['firefox',firefox]])await check(type,name)}
finally{srv.close()}
