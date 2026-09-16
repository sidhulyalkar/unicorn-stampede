import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const calls={init:0,progress:[],presence:[],leaderboards:[],scores:[],achievements:new Set(),stats:new Map(),cloud:[],ugc:[]};
const localFiles=new Map();
const Wavedash={
  LeaderboardSortOrder:{ASC:0,DESC:1},LeaderboardDisplayType:{NUMERIC:0,TIME_MILLISECONDS:2},
  UGCType:{GAME_MANAGED:3},UGCVisibility:{PUBLIC:0},
  updateLoadProgressZeroToOne:v=>calls.progress.push(v),
  init:()=>{calls.init++;return true},
  getUser:()=>({id:'u-test',username:'TestPlayer'}),getUserId:()=>'u-test',getUsername:()=> 'TestPlayer',
  updateUserPresence:async p=>{calls.presence.push(p);return{success:true}},
  requestStats:async()=>({success:true}),getStat:id=>calls.stats.get(id)||0,
  setStat:(id,v)=>{calls.stats.set(id,v)},setAchievement:id=>calls.achievements.add(id),
  storeStats:async()=>({success:true}),
  getOrCreateLeaderboard:async(name,sort,display)=>{calls.leaderboards.push({name,sort,display});return{success:true,data:{id:`lb-${name}`,name}}},
  uploadLeaderboardScore:async(id,score,keepBest,ugcId,metadata)=>{calls.scores.push({id,score,keepBest,ugcId,metadata});return{success:true,data:{globalRank:1,submittedRank:1}}},
  downloadRemoteFile:async path=>{calls.cloud.push(['download',path]);return{success:false}},
  readLocalFile:async path=>localFiles.get(path)||null,
  writeLocalFile:async(path,data)=>{localFiles.set(path,data);calls.cloud.push(['write',path]);return true},
  uploadRemoteFile:async path=>{calls.cloud.push(['upload',path]);return{success:true,data:path}},
  createUGCItem:async(type,title,description,visibility,path)=>{const id=`ugc-${calls.ugc.length+1}`;calls.ugc.push({id,type,title,description,visibility,path});return{success:true,data:id}}
};

const context={console,Promise,Date,TextEncoder,TextDecoder,Wavedash};
vm.createContext(context);
vm.runInContext(`
let state='title',paused=0,level=0,score=0,landWin=0,zone=0,mode=0,chains=0,cleaners=[];
let p=.2,s=.1,nextFinish=0,nextWin=1,baseStarts=0,baseUpdates=0;
function paintPct(){return p}function structPct(){return s}function grade(){return landWin?3:0}
function startLevel(n){baseStarts++;level=n;state=n?'play':'title';score=0;landWin=0;chains=0;p=.2;s=.1;cleaners=[];return n}
function update(dt){baseUpdates++;if(nextFinish&&state==='play'){score=123456;p=.66;s=.75;chains=4;landWin=nextWin?2:-1;state='end';nextFinish=0}return dt}
`,context);

const adapter=fs.readFileSync('wavedash/sdk.js','utf8');
vm.runInContext(adapter,context,{filename:'wavedash/sdk.js'});
await vm.runInContext('UnicornStampedeWavedash.flush()',context);
assert.equal(calls.init,1,'init exactly once');
assert.deepEqual(calls.progress,[1]);
assert.equal(calls.leaderboards.length,5,'five competition boards provisioned');
assert.ok(calls.presence.some(p=>p.status==='Ready to stampede'));

vm.runInContext(`startLevel(1);cleaners=[{u:0}];update(.25);cleaners=[];nextWin=1;nextFinish=1;update(.5)`,context);
await vm.runInContext('UnicornStampedeWavedash.flush()',context);
assert.equal(vm.runInContext('baseStarts',context),1,'adapter calls frozen start exactly once');
assert.equal(vm.runInContext('baseUpdates',context),2,'adapter calls frozen update exactly once per tick');
assert.equal(calls.stats.get('RUNS'),1);
assert.equal(calls.stats.get('WINS'),1);
assert.equal(calls.stats.get('BEST_SCORE'),123456);
assert.equal(calls.stats.get('PRISM_WINS'),1);
assert.equal(calls.stats.get('MAX_WHIP_CHAINS'),4);
assert.ok(calls.achievements.has('TOWN_CONQUERED'));
assert.ok(calls.achievements.has('PRISMATIC_TAKEOVER'));
assert.ok(calls.achievements.has('SIX_FIGURES'));
assert.ok(calls.achievements.has('RAINBOW_SURGE'));
assert.ok(calls.achievements.has('DEMOLITION_DERBY'));
assert.ok(calls.achievements.has('CHAIN_REACTION'));
assert.ok(calls.achievements.has('MASTER_TAKEOVER'));
assert.ok(!calls.achievements.has('CLEAN_HERD'),'capture history remains observable');
assert.equal(calls.ugc.length,1,'victory gets one GAME_MANAGED run card');
assert.ok(calls.scores.some(x=>x.id==='lb-stampede-high-score'&&x.score===123456));
assert.ok(calls.scores.some(x=>x.id==='lb-prismborough-high-score'));
assert.ok(calls.scores.some(x=>x.id==='lb-fastest-conquest'&&x.score===750));
assert.ok(calls.scores.every(x=>x.metadata.world==='Prismborough'));
assert.ok(calls.cloud.some(x=>x[0]==='upload'&&x[1]==='meta/run-history.json'));

const fastBefore=calls.scores.filter(x=>x.id==='lb-fastest-conquest').length,ugcBefore=calls.ugc.length;
vm.runInContext(`startLevel(1);nextWin=0;nextFinish=1;update(.4)`,context);
await vm.runInContext('UnicornStampedeWavedash.flush()',context);
assert.equal(calls.stats.get('RUNS'),2);
assert.equal(calls.stats.get('WINS'),1,'defeat does not inflate wins');
assert.equal(calls.scores.filter(x=>x.id==='lb-fastest-conquest').length,fastBefore,'defeat never posts speedrun time');
assert.equal(calls.ugc.length,ugcBefore,'defeat does not create leaderboard run-card UGC');
assert.ok(calls.scores.some(x=>x.id==='lb-stampede-high-score'),'defeat may still compete on raw score');

const snap=await vm.runInContext('UnicornStampedeWavedash.snapshot()',context);
assert.equal(snap.available,true);
assert.equal(snap.history.length,2);
assert.equal(snap.lastResult.win,false);
console.log('Wavedash SDK smoke PASS: init, identity/presence, stats, achievements, 5 leaderboards, cloud history, UGC, victory/defeat boundaries.');
