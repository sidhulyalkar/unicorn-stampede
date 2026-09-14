// Website/showcase input guard. Keep menu clicks idempotent without throttling gameplay.
let showcaseMenuClickAt=0;
C.addEventListener('mousedown',e=>{
  if(state!=='title')return;
  const now=performance.now();
  if(e.button||e.detail>1||now-showcaseMenuClickAt<120){
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  showcaseMenuClickAt=now;
  // Own the world selector in the showcase layer so the frozen three-world menu handler
  // cannot truncate the new fourth world. This remains title-only and never throttles whip input.
  if(my>=565&&my<600){
    e.preventDefault();e.stopImmediatePropagation();
    zone=(zone+1)%4;S.s('ccZone',zone);tone(280,.05,'triangle',.012,420);
  }
},true);
addEventListener('keydown',e=>{
  if(state!=='title')return;
  // Once the showcase DOM menu exists, focused buttons own Enter/Space. Stop the older
  // canvas-wide title shortcut from also starting a run, but leave the browser default
  // intact so keyboard activation still produces the button's normal click.
  if((e.code==='Enter'||e.code==='Space')&&e.target?.closest?.('#showcase-menu')){e.stopImmediatePropagation();return}
  if(e.code!=='KeyA'&&e.code!=='KeyD')return;
  e.preventDefault();e.stopImmediatePropagation();
  zone=(zone+(e.code==='KeyD'?1:3))%4;S.s('ccZone',zone);tone(280,.05,'triangle',.012,420);
},true);
C.addEventListener('dblclick',e=>e.preventDefault());
C.style.touchAction='none';
