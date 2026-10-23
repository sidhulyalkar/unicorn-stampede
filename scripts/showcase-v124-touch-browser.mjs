// Touch-first browser acceptance against the exact ZIP intended for Bounty Arcade.
// A real touch (without prior mouse movement) must start the game, steer, and act.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {chromium,firefox} from 'playwright';
const root=path.resolve(process.env.ARCADE_TEST_ROOT||process.cwd()),port=4201,reports=[];
const srv=http.createServer((req,res)=>{
  const relative=decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/,'')||'index.html';
  const file=path.resolve(root,relative);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){
    res.writeHead(404);return res.end('not found');
  }
  res.setHeader('content-type',relative.endsWith('.js')?'text/javascript':relative.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve=>srv.listen(port,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+port+'/';
async function boot(browser,label,viewport){
  const page=await browser.newPage({viewport,hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.route('https://www.bountyboard.gg/arcade-sdk/v1.js',r=>r.abort());
  await page.goto(url+'?touch');
  await page.waitForFunction(()=>state==='title'&&globalThis.showcaseMobileEntry&&globalThis.showcaseMenuAPI);
  await page.locator('#showcase-loader').waitFor({state:'hidden'});
  return{page,errors};
}
async function check(engine,label){
  const browser=await engine.launch({headless:true});
  try{
    const {page,errors}=await boot(browser,label,{width:390,height:844});
    // The compact runtime intentionally recovers from uncaught errors by going
    // back to title. Retain that diagnostic rather than silently timing out.
    await page.evaluate(()=>{
      globalThis.__touchDiagnostics={errors:[],states:[]};
      addEventListener('error',event=>{
        __touchDiagnostics.errors.push(String(event.error?.stack||event.message));
      });
      const source=globalThis.onerror;
      globalThis.onerror=function(...args){
        __touchDiagnostics.errors.push('onerror: '+args.slice(0,3).map(String).join(' / '));
        return source?.apply(this,args);
      };
    });
    // Uncoached mobile start: no mousemove or JS startLevel call.
    await page.locator('#showcase-mobile-entry [data-action=tutorial]').tap();
    if(await page.evaluate(()=>train))throw Error(label+' portrait tutorial toggle did not work');
    await page.locator('#showcase-mobile-entry [data-action=start]').tap();
    await page.waitForFunction(()=>state==='play'&&level===1&&globalThis.showcaseCompetition);
    if(await page.locator('#showcase-mobile-entry').isVisible())
      throw Error(label+' portrait CTA remains over gameplay');
    const start=await page.evaluate(()=>({
      position:{x:unis[caps[0]].x,y:unis[caps[0]].y},
      active:caps[0],touchEnabled:document.body.classList.contains('showcase-touch-enabled'),
      buttons:[...document.querySelectorAll('.showcase-touch-btn')].map(b=>b.dataset.action)
    }));
    if(!start.touchEnabled||start.buttons.length!==4)
      throw Error(label+' no mobile touch controls '+JSON.stringify(start));
    // Touch button actions run via actual pointerdown, not synthetic key codes.
    const switchButton=page.locator('.showcase-touch-btn[data-action=switch]');
    await switchButton.tap();
    const switched=await page.evaluate(()=>caps[0]);
    if(switched===start.active)throw Error(label+' touch herd handoff failed');
    const whip=page.locator('.showcase-touch-btn[data-action=whip]');
    await whip.tap();await whip.tap();
    const charge=await page.evaluate(()=>unis[caps[0]].power);
    if(charge<2)throw Error(label+' touch whip charge failed '+charge);
    await page.locator('.showcase-touch-btn[data-action=dash]').tap();
    const power=await page.evaluate(()=>unis[caps[0]].power);
    if(power!==0)throw Error(label+' touch dash did not spend charge');
    const pausedBefore=await page.evaluate(()=>!!paused);
    await page.locator('.showcase-touch-btn[data-action=pause]').tap();
    const pausedNow=await page.evaluate(()=>!!paused);
    if(pausedNow===pausedBefore)throw Error(label+' touch pause toggle missing');
    // Pausing correctly opens the modal run menu. Touchscreen users resume via
    // its visible RESUME RUN button, not the obscured joystick controls.
    const resume=page.locator('#showcase-session-menu [data-session-action=primary]');
    await resume.waitFor({state:'visible'});
    if(!(await resume.textContent()).includes('RESUME'))
      throw Error(label+' paused run does not offer a touchscreen resume button');
    await resume.tap();
    if(await page.evaluate(()=>!!paused))throw Error(label+' touchscreen resume did not work');
    if(await page.evaluate(()=>state)!=='play')
      throw Error(label+' returned to title on resume '+JSON.stringify(await page.evaluate(()=>({
        state,errors:__touchDiagnostics.errors.slice(-4)
      }))));
    // The run menu has a short visibility transition. Let it stop intercepting
    // pointers before testing the gameplay joystick underneath.
    await page.locator('#showcase-session-menu').waitFor({state:'hidden'});
    const afterResume=await page.evaluate(()=>({
      state,level,errors:__touchDiagnostics.errors.slice(-4),
      sessionText:document.querySelector('#showcase-session-menu h2').textContent
    }));
    if(afterResume.state!=='play')
      throw Error(label+' left gameplay after resume '+JSON.stringify(afterResume));
    // Place the selected unicorn on the known-clear spawn road to isolate
    // joystick steering from a random building collision after smart switching.
    await page.evaluate(()=>{
      const u=unis[caps[0]];
      u.x=270;u.y=270;u.vx=u.vy=0;u.dash=u.stun=0;
    });
    // Actual pointer drag across the DOM steering pad, no direct movement calls.
    const pad=page.locator('.showcase-touch-pad'),bounds=await pad.boundingBox();
    if(!bounds)throw Error(label+' no virtual joystick box');
    const x=bounds.x+bounds.width/2,y=bounds.y+bounds.height/2;
    const before=await page.evaluate(()=>({x:unis[caps[0]].x,y:unis[caps[0]].y}));
    await page.mouse.move(x,y);await page.mouse.down();
    await page.mouse.move(x+bounds.width*.32,y,{steps:4});
    const during=await page.evaluate(()=>({
      touchVector:{...showcaseTouchVec},moveKey:!!K.KeyD,pointerId:touchPointer,
      paused:!!paused,state,world:zone,errors:__touchDiagnostics.errors.slice(-5),
      control:getComputedStyle(document.querySelector('.showcase-touch-pad')).display
    }));
    await page.waitForTimeout(450);await page.mouse.up();
    const after=await page.evaluate(()=>({x:unis[caps[0]].x,y:unis[caps[0]].y}));
    if(after.x-before.x<12)
      throw Error(label+' joystick failed to move player '+JSON.stringify({before,during,after}));
    await page.screenshot({path:'dist/arcade/'+label+'-portrait-touch.png'});
    if(errors.length)throw Error(label+' portrait errors '+errors.join('|'));
    await page.close();

    const landscape=await boot(browser,label,{width:844,height:390});
    const lp=landscape.page;
    if(await lp.locator('#showcase-mobile-entry').isVisible())
      throw Error(label+' portrait-only button visible in landscape');
    const tapCanvas=async (x,y)=>{
      const loc=await lp.evaluate(({x,y})=>{
        const r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);
        return{sx:r.left+(r.width-W*s)/2+x*s,sy:r.top+(r.height-H*s)/2+y*s};
      },{x,y});
      await lp.touchscreen.tap(loc.sx,loc.sy);
    };
    const first=await lp.evaluate(()=>({zone,mode,train}));
    await tapCanvas(640,585);
    const nextZone=await lp.evaluate(()=>zone);
    if(nextZone!==(first.zone+1)%4)throw Error(label+' actual landscape world tap missed');
    await tapCanvas(640,610);
    const nextMode=await lp.evaluate(()=>mode);
    if(nextMode!==(first.mode+1)%4)throw Error(label+' actual landscape difficulty tap missed');
    await tapCanvas(460,685);
    if(await lp.evaluate(()=>train)===first.train)throw Error(label+' tutorial touch toggle missed');
    await tapCanvas(640,645);
    await lp.waitForFunction(()=>state==='play');
    const launched=await lp.evaluate(()=>({zone,mode,level,active:caps[0]}));
    if(launched.zone!==nextZone||launched.mode!==nextMode||launched.level!==1)
      throw Error(label+' landscape tap launch wrong '+JSON.stringify(launched));
    await lp.screenshot({path:'dist/arcade/'+label+'-landscape-touch.png'});
    if(landscape.errors.length)throw Error(label+' landscape errors '+landscape.errors.join('|'));
    await lp.close();
    const report={browser:label,portrait:{start,switched,charge,power,movedPx:Math.round(after.x-before.x)},landscape:launched};
    reports.push(report);
    console.log(label+' real touch/portrait/landscape: PASS '+JSON.stringify(report));
  }finally{await browser.close()}
}
try{
  for(const [label,engine] of [['chromium',chromium],['firefox',firefox]])await check(engine,label);
  fs.mkdirSync('dist/arcade',{recursive:true});
  fs.writeFileSync('dist/arcade/qualification-v124.json',JSON.stringify({version:'v1.24',reports},null,2)+'\n');
}finally{srv.close()}
