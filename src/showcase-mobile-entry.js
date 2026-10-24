// Portrait handset affordance; landscape remains the recommended play layout.
// It mirrors the native menu instead of introducing another game state.
(function(){
  'use strict';
  const root=document.createElement('div');
  root.id='showcase-mobile-entry';root.hidden=true;
  root.setAttribute('aria-label','Touchscreen start controls');
  root.innerHTML='<p>ROTATE FOR A WIDER VIEW</p><button type="button" data-action="start">START GAME</button><button type="button" data-action="tutorial">TUTORIAL: ON</button>';
  document.body.append(root);
  const start=root.querySelector('[data-action="start"]');
  const tutorial=root.querySelector('[data-action="tutorial"]');
  function refresh(){
    const title=state==='title'&&!guide;
    root.hidden=!title;
    start.textContent=train?'PLAY TUTORIAL':'PLAY NOW';
    tutorial.textContent='TUTORIAL: '+(train?'ON':'OFF');
    tutorial.setAttribute('aria-pressed',String(!!train));
  }
  start.addEventListener('click',()=>{
    if(state!=='title'||guide)return;
    showcaseStart();refresh();
  });
  tutorial.addEventListener('click',()=>{
    if(state!=='title'||guide)return;
    train=!train;
    showcaseMenuTone(360);
    showcaseRefreshMenu();refresh();
  });
  let previous='';
  function tick(){
    const current=state+':'+guide+':'+train;
    if(current!==previous){previous=current;refresh()}
  }
  showcaseHooks.on('start:after','mobile-entry.sync',refresh,-120);
  setInterval(tick,250);
  refresh();
  globalThis.showcaseMobileEntry={refresh,get visible(){return !root.hidden}};
})();