// v1.23: actual input + authoritative destruction move the first-run skills.
// Serves the *extracted Arcade ZIP*, not editable development-only resources.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {chromium,firefox} from 'playwright';
const root=path.resolve(process.env.ARCADE_TEST_ROOT||process.cwd()),port=4199;
const srv=http.createServer((req,res)=>{
  const name=decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/,'')||'index.html';
  const file=path.resolve(root,name);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){
    res.writeHead(404);return res.end('missing')
  }
  res.setHeader('content-type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(ok=>srv.listen(port,'127.0.0.1',ok));
const results=[];
async function qualify(name,engine){
  const browser=await engine.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:720}});
    const errors=[];page.on('pageerror',e=>errors.push(String(e)));
    await page.route('https://www.bountyboard.gg/arcade-sdk/v1.js',r=>r.abort());
    await page.goto('http://127.0.0.1:'+port+'/');
    await page.waitForFunction(()=>state==='title'&&globalThis.showcaseMission&&globalThis.showcaseArcade);
    if(await page.evaluate(()=>!!train))await page.keyboard.press('t');
    if(await page.evaluate(()=>mode!==1))await page.keyboard.press('m');
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>state==='play'&&level>0&&globalThis.showcaseMission.progress().active);
    const initial=await page.evaluate(()=>{
      const target=showcaseMission.target();
      return{steps:showcaseMission.progress().steps,kind:target?.kind,id:target?.id,
        visible:showcaseMission.progress().barVisible};
    });
    if(!initial.visible||initial.kind!=='landmark')
      throw Error(name+' missing initial landmark direction '+JSON.stringify(initial));
    // Canvas HUD is drawn at stable logical coordinates. Chrome must not
    // overlap any of the three HUD regions during active desktop play.
    await page.waitForFunction(()=>document.body.classList.contains('showcase-playing'));
    const clearance=await page.evaluate(()=>{
      const r=C.getBoundingClientRect(),sx=r.width/W,sy=r.height/H;
      const hud=[[16,14,356,48],[W-150,14,W-16,48],[W/2-190,18,W/2+190,54]]
        .map(([x1,y1,x2,y2])=>({
          left:r.left+x1*sx,top:r.top+y1*sy,right:r.left+x2*sx,bottom:r.top+y2*sy
        }));
      const named=['showcase-fullscreen','showcase-settings-bar','showcase-status'];
      const intersections=[];
      for(const id of named){
        const el=document.getElementById(id),box=el.getBoundingClientRect();
        for(let i=0;i<hud.length;i++){
          const h=hud[i],ox=Math.max(0,Math.min(box.right,h.right)-Math.max(box.left,h.left));
          const oy=Math.max(0,Math.min(box.bottom,h.bottom)-Math.max(box.top,h.top));
          if(ox*oy>1)intersections.push({chrome:id,hud:i,area:Math.round(ox*oy)});
        }
      }
      return{intersections};
    });
    if(clearance.intersections.length)
      throw Error(name+' active HUD control overlap '+JSON.stringify(clearance));
    await page.screenshot({path:'dist/arcade/'+name+'-first-run.png'});

    // Use actual keyboard movement; the entire world must keep processing input.
    await page.keyboard.down('d');await page.waitForTimeout(900);await page.keyboard.up('d');
    await page.waitForFunction(()=>showcaseMission.progress().steps[0]);
    await page.keyboard.press('q');
    await page.waitForFunction(()=>showcaseMission.progress().steps[3]);
    async function whip(){
      const point=await page.evaluate(()=>{
        const u=unis[caps[0]],r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);
        return{x:r.left+(r.width-W*s)/2+(ox+z*(u.x-110))*s,
          y:r.top+(r.height-H*s)/2+(oy+z*u.y)*s};
      });
      await page.mouse.move(point.x,point.y);await page.mouse.click(point.x,point.y);
      await page.waitForTimeout(80);
    }
    await whip();await whip();
    await page.waitForFunction(()=>showcaseMission.progress().steps[1]);
    const before=await page.evaluate(()=>showcaseMission.target());
    const smash=await page.evaluate(()=>{
      // Fast-forward position, not HP or completion. Call real hitObj, which
      // still enforces landmark requirements and emits the actual hit hooks.
      const target=showcaseMission.target();
      const u=unis[caps[0]];
      const o=objs.find(o=>o.hp>0&&o.val>0&&!o.lm);
      if(!o||!u)throw Error('missing target or unicorn');
      u.x=o.x-15;u.y=o.y+o.h/2;u.dash=.6;
      hitObj(u,o,o.hp+o.max);
      return{before:target?.id,after:showcaseMission.target()?.id,objectHp:o.hp,
        steps:showcaseMission.progress().steps,complete:S.g('usIntroProgressV123')};
    });
    if(!smash.steps.every(Boolean)||smash.objectHp>0||smash.complete!==1)
      throw Error(name+' skills not completed after real hit '+JSON.stringify(smash));
    await page.waitForFunction(()=>!showcaseMission.progress().barVisible);
    // H explicitly disables/re-enables the direction arrow for experienced players.
    await page.keyboard.press('h');
    if(await page.evaluate(()=>showcaseMission.progress().shown))throw Error(name+' H did not hide compass');
    await page.keyboard.press('h');
    if(!await page.evaluate(()=>showcaseMission.progress().shown))throw Error(name+' H did not restore compass');
    await page.evaluate(()=>{startLevel(1);});
    if(await page.evaluate(()=>showcaseMission.progress().active))throw Error(name+' onboarding repeated after completion');
    const next=await page.evaluate(()=>showcaseMission.target());
    if(!next||next.kind!=='landmark')throw Error(name+' compass vanished after onboarding');
    const guideRect=await page.locator('#showcase-mission-progress').evaluate(el=>({
      hidden:el.hidden,width:el.getBoundingClientRect().width
    }));
    await page.screenshot({path:'dist/arcade/'+name+'-mission.png'});
    if(errors.length)throw Error(name+' runtime errors '+errors.join('|'));
    const report={browser:name,initial,smash,guideRect,next:next.id};
    results.push(report);
    console.log(name+' v1.23 mission + real actions: PASS '+JSON.stringify(report));
    await page.close();

    // Check no overlay obstructs an actual touch control or becomes an invisible
    // click-capturing surface in narrow viewports.
    const mobile=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
    const mobileErrors=[];mobile.on('pageerror',e=>mobileErrors.push(String(e)));
    await mobile.route('https://www.bountyboard.gg/arcade-sdk/v1.js',r=>r.abort());
    await mobile.goto('http://127.0.0.1:'+port+'/?touch');
    await mobile.waitForFunction(()=>state==='title'&&globalThis.showcaseMission);
    await mobile.evaluate(()=>{train=0;zone=0;mode=1;S.s('ccZone',0);S.s('ccMode',1);startLevel(1);});
    const touch=await mobile.evaluate(()=>{
      const bar=document.getElementById('showcase-mission-progress');
      const controls=document.querySelector('.showcase-touch');
      return{hidden:getComputedStyle(bar).display==='none',hasTouch:document.body.classList.contains('showcase-touch-enabled'),
        controlVisible:getComputedStyle(controls).display!=='none'};
    });
    if(!touch.hidden||!touch.hasTouch||!touch.controlVisible||mobileErrors.length)
      throw Error(name+' touch regression '+JSON.stringify({touch,mobileErrors}));
    await mobile.close();
  }finally{await browser.close()}
}
try{
  for(const [name,engine] of [['chromium',chromium],['firefox',firefox]])await qualify(name,engine);
  fs.mkdirSync('dist/arcade',{recursive:true});
  fs.writeFileSync('dist/arcade/qualification-v123.json',JSON.stringify({version:'v1.23',results},null,2)+'\n');
}finally{srv.close()}
