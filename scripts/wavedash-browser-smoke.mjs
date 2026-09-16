import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {chromium} from 'playwright';

const root=path.resolve('wavedash-dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
const server=http.createServer((req,res)=>{
  const rel=decodeURIComponent((req.url||'/').split('?')[0]);
  const file=path.join(root,rel==='/'?'index.html':rel.replace(/^\//,''));
  if(!file.startsWith(root)||!fs.existsSync(file)){res.writeHead(404);res.end('not found');return}
  res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(4177,'127.0.0.1',resolve));

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:720}});
const errors=[];
page.on('pageerror',e=>errors.push(String(e)));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.addInitScript(()=>{
  const calls=globalThis.__wdCalls={init:0,progress:[],presence:[],boards:[],scores:[]};
  const files=new Map(),stats=new Map();
  globalThis.Wavedash={
    LeaderboardSortOrder:{ASC:0,DESC:1},LeaderboardDisplayType:{NUMERIC:0,TIME_MILLISECONDS:2},
    UGCType:{GAME_MANAGED:3},UGCVisibility:{PUBLIC:0},
    updateLoadProgressZeroToOne:v=>calls.progress.push(v),init:()=>{calls.init++;return true},
    getUser:()=>({id:'browser-user',username:'BrowserTester'}),getUserId:()=> 'browser-user',getUsername:()=> 'BrowserTester',
    updateUserPresence:async p=>{calls.presence.push(p);return{success:true}},requestStats:async()=>({success:true}),
    getStat:id=>stats.get(id)||0,setStat:(id,v)=>stats.set(id,v),setAchievement:()=>{},storeStats:async()=>({success:true}),
    getOrCreateLeaderboard:async(name)=>{calls.boards.push(name);return{success:true,data:{id:`lb-${name}`}}},
    uploadLeaderboardScore:async(id,score)=>{calls.scores.push({id,score});return{success:true,data:{globalRank:1,submittedRank:1}}},
    downloadRemoteFile:async()=>({success:false}),readLocalFile:async p=>files.get(p)||null,
    writeLocalFile:async(p,b)=>{files.set(p,b);return true},uploadRemoteFile:async()=>({success:true}),
    createUGCItem:async()=>({success:true,data:'ugc-browser'})
  };
});

try{
  await page.goto('http://127.0.0.1:4177/',{waitUntil:'load'});
  await page.waitForFunction(()=>globalThis.UnicornStampedeWavedash&&globalThis.state==='title');
  await page.evaluate(()=>UnicornStampedeWavedash.flush());
  const boot=await page.evaluate(()=>({
    init:__wdCalls.init,progress:[...__wdCalls.progress],boards:[...__wdCalls.boards],presence:[...__wdCalls.presence],
    api:UnicornStampedeWavedash.snapshot(),state,canvas:(()=>{const r=document.getElementById('game').getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}})(),
    body:{w:document.documentElement.clientWidth,h:document.documentElement.clientHeight,scrollW:document.documentElement.scrollWidth,scrollH:document.documentElement.scrollHeight}
  }));
  if(boot.init!==1)throw Error(`expected one Wavedash.init, got ${boot.init}`);
  if(!boot.progress.includes(1))throw Error('load progress never reached 1');
  if(new Set(boot.boards).size!==5)throw Error(`expected five leaderboard provisions, got ${boot.boards.join(',')}`);
  if(!boot.presence.some(p=>p.status==='Ready to stampede'))throw Error('title presence missing');
  if(boot.canvas.x!==0||boot.canvas.y!==0||boot.canvas.w!==1280||boot.canvas.h!==720)throw Error(`canvas does not fill 1280x720 viewport: ${JSON.stringify(boot.canvas)}`);
  if(boot.body.scrollW!==1280||boot.body.scrollH!==720)throw Error(`unexpected host scroll/gutter geometry: ${JSON.stringify(boot.body)}`);

  const run=await page.evaluate(()=>{startLevel(1);return{state,world:UnicornStampedeWavedash.snapshot().run?.world,difficulty:UnicornStampedeWavedash.snapshot().run?.difficulty}});
  if(run.state!=='play'||run.world!=='Prismborough'||run.difficulty!=='Easy')throw Error(`run observation mismatch: ${JSON.stringify(run)}`);
  await page.evaluate(()=>UnicornStampedeWavedash.flush());
  if(errors.length)throw Error(`browser errors: ${errors.join(' | ')}`);
  console.log('Wavedash Chromium smoke PASS: generated upload boots, SDK initializes once, five boards provision, title/run presence works, and 1280x720 canvas fills host viewport without gutters.');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
