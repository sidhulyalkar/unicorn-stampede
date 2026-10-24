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

// Bounty Arcade touch/pen title input. A tap does not fire mousemove, so relying
// on the frozen mouse-only title regions made Start/selection unreliable.
// Keep the original competition input code immutable.
let showcaseTouchTitleAt=-10000;
C.addEventListener('pointerdown',e=>{
  if(state!=='title'||!['touch','pen'].includes(e.pointerType))return;
  const rect=C.getBoundingClientRect(),scale=Math.min(rect.width/W,rect.height/H);
  const left=rect.left+(rect.width-W*scale)/2,top=rect.top+(rect.height-H*scale)/2;
  const x=(e.clientX-left)/scale,y=(e.clientY-top)/scale;
  if(x<0||x>W||y<0||y>H)return; // true canvas content, not letterbox
  e.preventDefault();e.stopImmediatePropagation();
  showcaseTouchTitleAt=performance.now();
  mx=x;my=y;
  if(guide){guide=0;showcaseRefreshMenu();return}
  if(y<565)return;
  if(y<600){showcaseSetWorld(zone+1);return}
  if(y<630){showcaseSetMode(mode+1);return}
  if(y<670){showcaseStart();return}
  if(x<W/2){train=!train;showcaseMenuTone(360);showcaseRefreshMenu()}
  else{guide=1;showcaseMenuTone(400);showcaseRefreshMenu()}
},true);
// Some browsers synthesize mousedown after touch pointerdown. Stop it at the
// capture phase, including when the touch just changed title -> active play.
C.addEventListener('mousedown',e=>{
  if(performance.now()-showcaseTouchTitleAt>850)return;
  e.preventDefault();e.stopImmediatePropagation();
},true);
