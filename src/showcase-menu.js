// v1.11 art-first title controls. The animated town remains the hero; UI only marks what is clickable.
const showcaseWorldMeta=[
  ['PRISMBOROUGH','Open civic grid','Classic streets, gardens, fountains, and room to orchestrate the herd.'],
  ['WASHWATER BAY','Waterfront pressure','Harbor routes, cleanup pressure, and rotating territory defense.'],
  ['CLOUDTOP HEIGHTS','Cliff pass + crosswind','Rain-gray streets, tight routes, and crosswind timing.'],
  ['FAULTLINE FRONTIER','Faults + wranglers','Fractured western streets, slip danger, captures, and rescues.']
];
const showcaseDifficultyMeta=[
  ['EASY','Relaxed'],['MEDIUM','Recommended'],['HARD','Tactical'],['IMPOSSIBLE','Expert']
];
const showcaseMenu=document.createElement('section');
showcaseMenu.id='showcase-menu';showcaseMenu.setAttribute('aria-label','Unicorn Stampede main menu');
showcaseMenu.innerHTML=`<div class="showcase-menu-card">
  <div class="showcase-menu-strip showcase-world-strip"><span class="showcase-menu-label">WORLD</span><div class="showcase-world-grid"></div></div>
  <div class="showcase-menu-actions"><button class="showcase-primary-action" type="button" data-action="start"><span>START</span><small>ENTER</small></button><button type="button" data-action="tutorial">TUTORIAL <span>ON</span></button><button type="button" data-action="rules">?</button><button type="button" data-action="settings">⚙</button></div>
  <div class="showcase-menu-strip showcase-mode-strip"><span class="showcase-menu-label">MODE</span><div class="showcase-difficulty-grid"></div></div>
  <div class="showcase-menu-meta"><span class="showcase-menu-badge">0 / 12 STARS</span><span class="showcase-menu-foot">WASD MOVE · SHIFT SWITCH · CLICK WHIP · SPACE DASH</span></div>
</div>`;
const worldGrid=showcaseMenu.querySelector('.showcase-world-grid'),difficultyGrid=showcaseMenu.querySelector('.showcase-difficulty-grid'),startButton=showcaseMenu.querySelector('[data-action="start"]'),tutorialButton=showcaseMenu.querySelector('[data-action="tutorial"]'),masteryBadge=showcaseMenu.querySelector('.showcase-menu-badge');
const showcaseGuideBack=document.createElement('button');showcaseGuideBack.id='showcase-guide-back';showcaseGuideBack.type='button';showcaseGuideBack.innerHTML='<strong>← BACK</strong><small>ESC</small>';showcaseGuideBack.setAttribute('aria-label','Close How to Play and return to the main menu');
showcaseWorldMeta.forEach(([name,tag,description],i)=>{const b=document.createElement('button');b.type='button';b.className='showcase-world-card';b.dataset.world=i;b.title=`${name} — ${tag}. ${description}`;b.setAttribute('aria-label',`${name}. ${tag}. ${description}`);b.innerHTML=`<strong>${name}</strong><span class="showcase-world-mastery" aria-label="Mastery"></span><span class="showcase-world-goal"></span>`;worldGrid.append(b)});
showcaseDifficultyMeta.forEach(([name,tag],i)=>{const b=document.createElement('button');b.type='button';b.className='showcase-difficulty-button';b.dataset.mode=i;b.title=tag;b.setAttribute('aria-label',`${name}. ${tag}`);b.innerHTML=`<strong>${name}</strong>`;difficultyGrid.append(b)});
function showcaseMenuTone(f=310){try{tone(f,.045,'triangle',.011,f+120)}catch{}}
globalThis.showcaseMenuTone=showcaseMenuTone;
function showcaseSetWorld(i){zone=i;S.s('ccZone',zone);showcaseMenuTone(300+i*35);showcaseRefreshMenu()}
function showcaseSetMode(i){mode=i;S.s('ccMode',mode);showcaseMenuTone(330+i*28);showcaseRefreshMenu()}
function showcaseStart(){audio();showcaseMenuTone(520);startLevel(train?0:1)}
function showcaseRefreshMenu(){
  const visible=state==='title'&&!guide,showGuideBack=state==='title'&&!!guide;showcaseMenu.classList.toggle('showcase-menu-hidden',!visible);showcaseMenu.setAttribute('aria-hidden',String(!visible));showcaseGuideBack.classList.toggle('showcase-guide-back-visible',showGuideBack);showcaseGuideBack.setAttribute('aria-hidden',String(!showGuideBack));
  const mastery=globalThis.showcaseMastery;if(mastery)masteryBadge.textContent=`${mastery.total} / 12 STARS · ${mastery.rank}`;
  worldGrid.querySelectorAll('[data-world]').forEach((b,i)=>{const on=i===zone;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on));const m=b.querySelector('.showcase-world-mastery'),g=b.querySelector('.showcase-world-goal'),q=mastery?.get(i),stars=q?.stars??Math.max(0,Math.min(3,S.g('ccC'+i)|0));m.textContent='★'.repeat(stars)+'☆'.repeat(3-stars);m.setAttribute('aria-label',stars+' of 3 mastery stars');g.textContent=q?.next==='MASTERED'?'MASTERED':q?.next||'CONQUER'});
  difficultyGrid.querySelectorAll('[data-mode]').forEach((b,i)=>{const on=i===mode;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on))});
  tutorialButton.querySelector('span').textContent=train?'ON':'OFF';tutorialButton.classList.toggle('is-active',!!train);startButton.querySelector('span').textContent=train?'TUTORIAL':'START';
}
worldGrid.addEventListener('click',e=>{const b=e.target.closest('[data-world]');if(b)showcaseSetWorld(+b.dataset.world)});
difficultyGrid.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b)showcaseSetMode(+b.dataset.mode)});
showcaseMenu.addEventListener('click',e=>{const a=e.target.closest('[data-action]');if(!a)return;if(a.dataset.action==='start')showcaseStart();else if(a.dataset.action==='tutorial'){train=!train;showcaseMenuTone(360);showcaseRefreshMenu()}else if(a.dataset.action==='rules'){guide=1;showcaseMenuTone(400);showcaseRefreshMenu()}else if(a.dataset.action==='settings'){document.getElementById('showcase-settings-button')?.click()}});
showcaseGuideBack.addEventListener('click',()=>{guide=0;showcaseMenuTone(300);showcaseRefreshMenu();startButton.focus()});
document.body.append(showcaseMenu,showcaseGuideBack);
function showcaseMenuLoop(){showcaseRefreshMenu();requestAnimationFrame(showcaseMenuLoop)}showcaseMenuLoop();
globalThis.showcaseMenuAPI={refresh:showcaseRefreshMenu,setWorld:showcaseSetWorld,setMode:showcaseSetMode,start:showcaseStart,get visible(){return !showcaseMenu.classList.contains('showcase-menu-hidden')},get guideBackVisible(){return showcaseGuideBack.classList.contains('showcase-guide-back-visible')}};
