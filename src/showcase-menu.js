// v1.12 native title controls. The town is the menu; visible controls live on the canvas.
const showcaseWorldMeta=[
  ['PRISMBOROUGH','Open civic grid'],['WASHWATER BAY','Waterfront pressure'],['CLOUDTOP HEIGHTS','Cliff pass + crosswind'],['FAULTLINE FRONTIER','Faults + wranglers']
];
const showcaseDifficultyMeta=[['EASY','Relaxed'],['MEDIUM','Recommended'],['HARD','Tactical'],['IMPOSSIBLE','Expert']];

// Keep title rendering inside the game itself. These coordinates intentionally match the
// long-standing guarded canvas click regions in whip.js/input-guard.js.
title=function(){
  if(guide)return _titleW();
  if(!objs.length){startLevel(0);state='title';unis=[];caps=[-1,-1];for(let i=5;i--;)objs[i].hue=i*72;for(let i=6;i--;){let x=330+i*108,u=makeUni(i,x,450);u.a=Math.atan2(-147,600-x);unis.push(u)}}
  // The title is a static town scene, so it does not receive gameplay's updatePeople pass.
  // Enforce the same full-body building clearance before the first visible frame and after
  // any title-world rebuild.
  globalThis.showcaseEnsurePeopleClear?.();
  world();
  X.save();X.textAlign='center';X.shadowColor='#000b';X.shadowBlur=10;
  X.fillStyle='#fff';text('UNICORN STAMPEDE',W/2,72,52,'center');
  X.shadowBlur=5;X.fillStyle='#fff';text('< '+showcaseWorldMeta[zone][0]+' >',W/2,585,13,'center');
  X.fillStyle='#ffe56d';text('< '+showcaseDifficultyMeta[mode][0]+' >',W/2,610,14,'center');
  X.fillStyle='#fff';text('START',W/2,650,20,'center');
  X.fillStyle='#f5f7fb';text('TUTORIAL '+(train?'ON':'OFF')+'   ·   ? RULES',W/2,680,12,'center');
  const mastery=globalThis.showcaseMastery;if(mastery){X.fillStyle='#ffe56d';text(mastery.total+'/12 ★  ·  '+mastery.rank,W/2,706,9,'center')}
  X.restore();
};

function showcaseMenuTone(f=310){try{tone(f,.045,'triangle',.011,f+120)}catch{}}globalThis.showcaseMenuTone=showcaseMenuTone;
function showcaseSetWorld(i){zone=(i+4)%4;S.s('ccZone',zone);showcaseMenuTone(300+zone*35);objs=[];showcaseRefreshMenu()}
function showcaseSetMode(i){mode=(i+4)%4;S.s('ccMode',mode);showcaseMenuTone(330+mode*28);showcaseRefreshMenu()}
function showcaseStart(){audio();showcaseMenuTone(520);startLevel(train?0:1)}

// Semantic controls remain available to keyboard/screen-reader users, but are intentionally
// visually clipped. They never cover the artwork and mirror the native canvas controls.
const showcaseMenu=document.createElement('nav');showcaseMenu.id='showcase-menu';showcaseMenu.className='showcase-native-a11y';showcaseMenu.setAttribute('aria-label','Unicorn Stampede title controls');
showcaseMenu.innerHTML=`<button type="button" data-world-step="-1">Previous world</button><button type="button" data-world-current>World</button><button type="button" data-world-step="1">Next world</button><button type="button" data-mode-step="-1">Previous mode</button><button type="button" data-mode-current>Mode</button><button type="button" data-mode-step="1">Next mode</button><button type="button" data-action="start">Start</button><button type="button" data-action="tutorial">Tutorial</button><button type="button" data-action="rules">How to play</button>`;
const worldCurrent=showcaseMenu.querySelector('[data-world-current]'),modeCurrent=showcaseMenu.querySelector('[data-mode-current]'),startButton=showcaseMenu.querySelector('[data-action="start"]'),tutorialButton=showcaseMenu.querySelector('[data-action="tutorial"]');
function showcaseRefreshMenu(){
  const visible=state==='title'&&!guide;showcaseMenu.dataset.visible=visible?'1':'0';showcaseMenu.setAttribute('aria-hidden',String(!visible));
  const mastery=globalThis.showcaseMastery?.get?.(zone),stars=mastery?'★'.repeat(mastery.stars)+'☆'.repeat(3-mastery.stars):'';
  worldCurrent.textContent=mastery?`${showcaseWorldMeta[zone][0]} ${stars} ${mastery.next}`:showcaseWorldMeta[zone][0];
  worldCurrent.setAttribute('aria-label',mastery?`${showcaseWorldMeta[zone][0]}, ${mastery.stars} of 3 mastery stars, ${mastery.next}`:showcaseWorldMeta[zone][0]);
  modeCurrent.textContent=showcaseDifficultyMeta[mode][0];startButton.textContent=train?'Start tutorial':'Start';tutorialButton.textContent='Tutorial '+(train?'on':'off');tutorialButton.setAttribute('aria-pressed',String(!!train));
}
showcaseMenu.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.worldStep)showcaseSetWorld(zone+(+b.dataset.worldStep));else if(b.hasAttribute('data-world-current'))showcaseSetWorld(zone+1);else if(b.dataset.modeStep)showcaseSetMode(mode+(+b.dataset.modeStep));else if(b.hasAttribute('data-mode-current'))showcaseSetMode(mode+1);else if(b.dataset.action==='start')showcaseStart();else if(b.dataset.action==='tutorial'){train=!train;showcaseMenuTone(360);showcaseRefreshMenu()}else if(b.dataset.action==='rules'){guide=1;showcaseMenuTone(400);showcaseRefreshMenu()}});
document.body.append(showcaseMenu);
function showcaseMenuLoop(){showcaseRefreshMenu();requestAnimationFrame(showcaseMenuLoop)}showcaseMenuLoop();
globalThis.showcaseMenuAPI={refresh:showcaseRefreshMenu,setWorld:showcaseSetWorld,setMode:showcaseSetMode,start:showcaseStart,get visible(){return state==='title'&&!guide},get guideBackVisible(){return state==='title'&&!!guide}};
