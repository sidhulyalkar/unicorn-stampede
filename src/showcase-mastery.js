// Showcase v1.10: persistent mastery. No world is locked; stars describe how cleanly the herd was managed.
const showcaseV110MasteryKey='usMasteryV110';
const showcaseV110MasteryGoals=[
  ['CONQUER','Finish the town.'],
  ['CLEAN HERD','Win without ever having 2+ unicorns captured at once.'],
  ['SHOWCASE FLAIR','Win after earning 3 different Smart Play moments.']
];
function showcaseV110BlankMastery(){return{worlds:Array.from({length:4},()=>({mask:0,wins:0,bestTime:0,bestFlair:0})),version:1}}
function showcaseV110LoadMastery(){let d;try{d=JSON.parse(localStorage.getItem(showcaseV110MasteryKey)||'null')}catch{}if(!d||!Array.isArray(d.worlds))d=showcaseV110BlankMastery();while(d.worlds.length<4)d.worlds.push({mask:0,wins:0,bestTime:0,bestFlair:0});d.worlds=d.worlds.slice(0,4).map((w,i)=>({mask:(w?.mask|0)|(S.g('ccC'+i)>0?1:0),wins:w?.wins|0,bestTime:+w?.bestTime||0,bestFlair:w?.bestFlair|0}));return d}
function showcaseV110SaveMastery(){try{localStorage.setItem(showcaseV110MasteryKey,JSON.stringify(showcaseV110MasteryData))}catch{}}
function showcaseV110Stars(mask){return(mask&1?1:0)+(mask&2?1:0)+(mask&4?1:0)}
function showcaseV110TotalStars(){return showcaseV110MasteryData.worlds.reduce((n,w)=>n+showcaseV110Stars(w.mask),0)}
function showcaseV110Rank(){const n=showcaseV110TotalStars();return n>=12?'TOWN LEGEND':n>=9?'MASTER STAMPEDE':n>=6?'RAINBOW RIOT':n>=3?'STREET RUMBLE':'STARTING HERD'}
let showcaseV110MasteryData=showcaseV110LoadMastery(),showcaseV110MasteryLatest=null,showcaseV110MasteryRunToken=0,showcaseV110MasteryFinalized=-1;
function showcaseV110NextGoal(world){const mask=showcaseV110MasteryData.worlds[world]?.mask||0;for(let i=0;i<3;i++)if(!(mask&(1<<i)))return showcaseV110MasteryGoals[i];return['MASTERED','All three mastery stars earned.']}
function showcaseV110FinalizeMastery(){
  if(!level||showcaseV110MasteryFinalized===showcaseV110MasteryRunToken)return showcaseV110MasteryLatest;showcaseV110MasteryFinalized=showcaseV110MasteryRunToken;
  const s=globalThis.showcaseSatisfaction?.run||{flair:0,skillKinds:{},maxCaptured:0},stats=globalThis.showcaseRunStats||{},won=landWin>0,w=showcaseV110MasteryData.worlds[zone]||showcaseV110MasteryData.worlds[0],old=w.mask;let earned=0;
  if(won){earned|=1;if((s.maxCaptured||0)<=1)earned|=2;if(Object.keys(s.skillKinds||{}).length>=3)earned|=4;w.mask|=earned;w.wins++;const t=+stats.time||0;if(t>0&&(!w.bestTime||t<w.bestTime))w.bestTime=t;w.bestFlair=Math.max(w.bestFlair,s.flair||0);showcaseV110SaveMastery()}
  showcaseV110MasteryLatest={world:zone,won,mask:w.mask,oldMask:old,newBits:w.mask&~old,stars:showcaseV110Stars(w.mask),flair:s.flair||0,skillKinds:Object.keys(s.skillKinds||{}),maxCaptured:s.maxCaptured||0,bestTime:w.bestTime,bestFlair:w.bestFlair,total:showcaseV110TotalStars(),rank:showcaseV110Rank()};
  return showcaseV110MasteryLatest;
}
const showcaseV110MasteryStartBase=startLevel;
startLevel=function(n){showcaseV110MasteryRunToken++;showcaseV110MasteryLatest=null;return showcaseV110MasteryStartBase(n)};
const showcaseV110MasteryUpdateBase=update;
update=function(dt){const before=state,r=showcaseV110MasteryUpdateBase(dt);if(before==='play'&&state==='end')showcaseV110FinalizeMastery();return r};
function showcaseV110MasterySummary(world){const w=showcaseV110MasteryData.worlds[world]||showcaseV110MasteryData.worlds[0],n=showcaseV110Stars(w.mask),goal=showcaseV110NextGoal(world);return{mask:w.mask,stars:n,wins:w.wins,bestTime:w.bestTime,bestFlair:w.bestFlair,next:goal[0],nextCopy:goal[1]}}
globalThis.showcaseMastery={get:showcaseV110MasterySummary,get latest(){return showcaseV110MasteryLatest},get total(){return showcaseV110TotalStars()},get rank(){return showcaseV110Rank()},goals:showcaseV110MasteryGoals,finalize:showcaseV110FinalizeMastery,reload(){showcaseV110MasteryData=showcaseV110LoadMastery();return showcaseV110MasteryData},resetForTesting(){showcaseV110MasteryData=showcaseV110BlankMastery();showcaseV110MasteryLatest=null;showcaseV110SaveMastery()}};
