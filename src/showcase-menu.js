// Showcase v1.9: accessible, structured title menu layered over the canvas presentation.
// Gameplay remains canvas-first. This DOM shell only organizes existing title actions.
const showcaseWorldMeta=[
  ['PRISMBOROUGH','OPEN CIVIC GRID','Classic streets, readable landmarks, room to orchestrate the herd.'],
  ['WASHWATER BAY','WATERFRONT PRESSURE','Harbor routes, cleanup pressure, and rotating territory defense.'],
  ['CLOUDTOP HEIGHTS','CLIFF PASS + CROSSWIND','Tighter routes reward prediction, timing, and confident switching.'],
  ['FAULTLINE FRONTIER','FAULTS + WRANGLERS','A fractured frontier with slip danger, captures, and rescue pressure.']
];
const showcaseDifficultyMeta=[
  ['EASY','RELAXED','Learn the herd and enjoy the destruction.'],
  ['MEDIUM','RECOMMENDED','The intended balance of pressure and freedom.'],
  ['HARD','TACTICAL','Fewer freebies, stronger defense, tighter decisions.'],
  ['IMPOSSIBLE','EXPERT','Maximum pressure for players who know the whole system.']
];
const showcaseMenu=document.createElement('section');
showcaseMenu.id='showcase-menu';showcaseMenu.setAttribute('aria-label','Unicorn Stampede main menu');
showcaseMenu.innerHTML=`<div class="showcase-menu-card">
  <div class="showcase-menu-kicker">POST-JS13K SHOWCASE EDITION</div>
  <div class="showcase-menu-head"><div><h1>BUILD YOUR STAMPEDE</h1><p>Choose a town, set the pressure, then keep six semi-autonomous unicorns useful while everything around them starts falling apart.</p></div><div class="showcase-menu-badge">4 WORLDS<br><span>ONE HERD</span></div></div>
  <div class="showcase-menu-section"><div class="showcase-menu-label"><span>1</span><div><strong>CHOOSE A WORLD</strong><small>A / D also cycles worlds</small></div></div><div class="showcase-world-grid"></div></div>
  <div class="showcase-menu-section showcase-menu-difficulty"><div class="showcase-menu-label"><span>2</span><div><strong>SET THE PRESSURE</strong><small>M also cycles difficulty</small></div></div><div class="showcase-difficulty-grid"></div><p id="showcase-difficulty-copy"></p></div>
  <div class="showcase-menu-actions"><button class="showcase-primary-action" type="button" data-action="start"><span>START STAMPEDE</span><small>ENTER</small></button><button type="button" data-action="tutorial">TUTORIAL <span>ON</span></button><button type="button" data-action="rules">HOW TO PLAY</button><button type="button" data-action="settings">OPTIONS</button></div>
  <div class="showcase-menu-foot"><span>WASD MOVE + PAINT</span><span>SHIFT SWITCH</span><span>CLICK RING WHIP</span><span>SPACE DASH</span><span>3 CAPTURED = GAME OVER</span></div>
</div>`;
const worldGrid=showcaseMenu.querySelector('.showcase-world-grid'),difficultyGrid=showcaseMenu.querySelector('.showcase-difficulty-grid'),difficultyCopy=showcaseMenu.querySelector('#showcase-difficulty-copy'),startButton=showcaseMenu.querySelector('[data-action="start"]'),tutorialButton=showcaseMenu.querySelector('[data-action="tutorial"]');
const showcaseGuideBack=document.createElement('button');showcaseGuideBack.id='showcase-guide-back';showcaseGuideBack.type='button';showcaseGuideBack.innerHTML='<strong>← BACK TO MENU</strong><small>C / ESC</small>';showcaseGuideBack.setAttribute('aria-label','Close How to Play and return to the main menu');
showcaseWorldMeta.forEach(([name,tag,description],i)=>{const b=document.createElement('button');b.type='button';b.className='showcase-world-card';b.dataset.world=i;b.innerHTML=`<span class="showcase-world-index">0${i+1}</span><strong>${name}</strong><em>${tag}</em><small>${description}</small><span class="showcase-world-mastery" aria-label="Mastery"></span>`;worldGrid.append(b)});
showcaseDifficultyMeta.forEach(([name,tag],i)=>{const b=document.createElement('button');b.type='button';b.className='showcase-difficulty-button';b.dataset.mode=i;b.innerHTML=`<strong>${name}</strong><small>${tag}</small>`;difficultyGrid.append(b)});
function showcaseMenuTone(f=310){try{tone(f,.045,'triangle',.011,f+120)}catch{}}
globalThis.showcaseMenuTone=showcaseMenuTone;
function showcaseSetWorld(i){zone=i;S.s('ccZone',zone);showcaseMenuTone(300+i*35);showcaseRefreshMenu()}
function showcaseSetMode(i){mode=i;S.s('ccMode',mode);showcaseMenuTone(330+i*28);showcaseRefreshMenu()}
function showcaseStart(){audio();showcaseMenuTone(520);startLevel(train?0:1)}
function showcaseRefreshMenu(){
  const visible=state==='title'&&!guide,showGuideBack=state==='title'&&!!guide;showcaseMenu.classList.toggle('showcase-menu-hidden',!visible);showcaseMenu.setAttribute('aria-hidden',String(!visible));showcaseGuideBack.classList.toggle('showcase-guide-back-visible',showGuideBack);showcaseGuideBack.setAttribute('aria-hidden',String(!showGuideBack));
  worldGrid.querySelectorAll('[data-world]').forEach((b,i)=>{const on=i===zone;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on));const crowns=Math.max(0,Math.min(3,S.g('ccC'+i)|0)),m=b.querySelector('.showcase-world-mastery');m.textContent=crowns?'★'.repeat(crowns)+'☆'.repeat(3-crowns):'NEW';m.setAttribute('aria-label',crowns?crowns+' of 3 mastery stars':'Not yet cleared')});
  difficultyGrid.querySelectorAll('[data-mode]').forEach((b,i)=>{const on=i===mode;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on))});
  const d=showcaseDifficultyMeta[mode]||showcaseDifficultyMeta[0];difficultyCopy.textContent=d[2];
  tutorialButton.querySelector('span').textContent=train?'ON':'OFF';tutorialButton.classList.toggle('is-active',!!train);startButton.querySelector('span').textContent=train?'START TUTORIAL':'START STAMPEDE';
}
worldGrid.addEventListener('click',e=>{const b=e.target.closest('[data-world]');if(b)showcaseSetWorld(+b.dataset.world)});
difficultyGrid.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b)showcaseSetMode(+b.dataset.mode)});
showcaseMenu.addEventListener('click',e=>{const a=e.target.closest('[data-action]');if(!a)return;if(a.dataset.action==='start')showcaseStart();else if(a.dataset.action==='tutorial'){train=!train;showcaseMenuTone(360);showcaseRefreshMenu()}else if(a.dataset.action==='rules'){guide=1;showcaseMenuTone(400);showcaseRefreshMenu()}else if(a.dataset.action==='settings'){document.getElementById('showcase-settings-button')?.click()}});
showcaseGuideBack.addEventListener('click',()=>{guide=0;showcaseMenuTone(300);showcaseRefreshMenu();startButton.focus()});
document.body.append(showcaseMenu,showcaseGuideBack);
function showcaseMenuLoop(){showcaseRefreshMenu();requestAnimationFrame(showcaseMenuLoop)}showcaseMenuLoop();
globalThis.showcaseMenuAPI={refresh:showcaseRefreshMenu,setWorld:showcaseSetWorld,setMode:showcaseSetMode,start:showcaseStart,get visible(){return !showcaseMenu.classList.contains('showcase-menu-hidden')},get guideBackVisible(){return showcaseGuideBack.classList.contains('showcase-guide-back-visible')}};
