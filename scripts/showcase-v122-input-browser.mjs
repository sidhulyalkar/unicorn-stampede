// Browser qualification through actual title, keyboard and pointer input.
// This deliberately avoids calling startLevel/cycle/crackWhip/dashSolo directly.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {chromium,firefox} from 'playwright';
const root=path.resolve(process.env.ARCADE_TEST_ROOT||process.cwd()),port=4197,results=[];
const server=http.createServer((req,res)=>{
  const name=decodeURIComponent(req.url.split('?')[0]).slice(1)||'index.html';
  const file=path.resolve(root,name);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){
    res.writeHead(404);res.end('missing');return;
  }
  res.setHeader('content-type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+port+'/';
async function check(label,engine){
  const browser=await engine.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:720}});
    const errors=[];page.on('pageerror',e=>errors.push(String(e)));
    await page.route('https://www.bountyboard.gg/arcade-sdk/v1.js',r=>r.abort());
    await page.goto(url);
    await page.waitForFunction(()=>state==='title'&&globalThis.showcaseArcade&&globalThis.showcaseMenuAPI);
    if(await page.evaluate(()=>!!train))await page.keyboard.press('t');
    if(await page.evaluate(()=>mode!==1))await page.keyboard.press('m');
    const setup=await page.evaluate(()=>({train,zone,mode,state}));
    if(setup.train||setup.zone!==0||setup.mode!==1)throw Error(label+' title selection wrong '+JSON.stringify(setup));
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>state==='play'&&level===1&&globalThis.showcaseCompetition?.eligible);
    const start=await page.evaluate(()=>({x:unis[caps[0]].x,y:unis[caps[0]].y,paint:paintPct(),active:caps[0]}));
    await page.keyboard.down('d');await page.waitForTimeout(450);await page.keyboard.up('d');
    await page.waitForTimeout(100);
    const moved=await page.evaluate(()=>({
      x:unis[caps[0]].x,y:unis[caps[0]].y,paint:paintPct(),
      time:showcaseRunStats.time
    }));
    if(Math.hypot(moved.x-start.x,moved.y-start.y)<12||moved.paint<=start.paint)
      throw Error(label+' real WASD movement/painting absent '+JSON.stringify({start,moved}));
    await page.keyboard.press('q');
    const captain=await page.evaluate(()=>caps[0]);
    if(captain===start.active)throw Error(label+' actual Q did not change captain');
    // Pointer coordinates follow the real canvas screen transform at every Whip.
    async function whip(){
      const point=await page.evaluate(()=>{
        const u=unis[caps[0]],r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);
        return{x:r.left+(r.width-W*s)/2+(ox+z*(u.x-110))*s,
          y:r.top+(r.height-H*s)/2+(oy+z*u.y)*s};
      });
      await page.mouse.move(point.x,point.y);
      await page.mouse.click(point.x,point.y);
      await page.waitForTimeout(65);
    }
    await whip();await whip();
    const beforeDash=await page.evaluate(()=>({charge:unis[caps[0]].power,whips:showcaseRunStats.whips}));
    if(beforeDash.charge<2||beforeDash.whips<2)
      throw Error(label+' real pointer Whip failed '+JSON.stringify(beforeDash));
    await page.keyboard.press('Space');
    const afterDash=await page.evaluate(()=>({charge:unis[caps[0]].power,dashes:showcaseRunStats.dashes}));
    if(afterDash.charge!==0||afterDash.dashes<1)
      throw Error(label+' real Space dash failed '+JSON.stringify(afterDash));
    await page.keyboard.press('p');
    if(!await page.evaluate(()=>!!paused))throw Error(label+' pause key not active');
    await page.keyboard.press('p');
    if(await page.evaluate(()=>!!paused))throw Error(label+' resume key not active');
    await page.screenshot({path:'dist/arcade/'+label+'-input.png'});
    if(errors.length)throw Error(label+' browser errors '+errors.join('|'));
    const report={browser:label,setup,start,moved,captain,beforeDash,afterDash};
    results.push(report);
    console.log(label+' real title/WASD/Q/mouse Whip/Space/P: PASS '+JSON.stringify(report));
    await page.close();
  }finally{await browser.close()}
}
try{
  for(const [label,engine] of [['chromium',chromium],['firefox',firefox]])await check(label,engine);
  fs.mkdirSync('dist/arcade',{recursive:true});
  fs.writeFileSync('dist/arcade/qualification-v122.json',JSON.stringify({version:'v1.22',results},null,2)+'\n');
}finally{server.close()}
