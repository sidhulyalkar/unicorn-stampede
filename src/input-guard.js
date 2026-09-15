// Website/showcase input guard. Keep duplicate title clicks idempotent without throttling distinct controls or gameplay.
let showcaseMenuClickAt=0,showcaseMenuClickKey='';
function showcaseTitleClickKey(){if(my<565)return'background';if(my<600)return'world';if(my<630)return'mode';if(my<670)return'start';return mx<W/2?'tutorial':'rules'}
C.addEventListener('mousedown',e=>{
  if(state!=='title')return;
  const now=performance.now(),key=showcaseTitleClickKey(),repeat=key===showcaseMenuClickKey&&(e.detail>1||now-showcaseMenuClickAt<120);
  if(e.button||repeat){e.preventDefault();e.stopImmediatePropagation();return}
  showcaseMenuClickAt=now;showcaseMenuClickKey=key;
  // Own the world selector in the showcase layer so the frozen three-world menu handler
  // cannot truncate the fourth world. Other native title regions continue to the compact handler.
  if(key==='world'){
    e.preventDefault();e.stopImmediatePropagation();
    zone=(zone+1)%4;S.s('ccZone',zone);tone(280,.05,'triangle',.012,420);
  }
},true);
addEventListener('keydown',e=>{
  if(state!=='title')return;
  // The visually clipped semantic menu remains keyboard-accessible. Focused buttons own
  // Enter/Space without also triggering the older canvas-wide title shortcut.
  if((e.code==='Enter'||e.code==='Space')&&e.target?.closest?.('#showcase-menu')){e.stopImmediatePropagation();return}
  if(e.code!=='KeyA'&&e.code!=='KeyD')return;
  e.preventDefault();e.stopImmediatePropagation();
  zone=(zone+(e.code==='KeyD'?1:3))%4;S.s('ccZone',zone);tone(280,.05,'triangle',.012,420);
},true);
C.addEventListener('dblclick',e=>e.preventDefault());
C.style.touchAction='none';
