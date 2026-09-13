// Multi-input showcase controls: keyboard + gamepad + touch can coexist.
const showcaseKeyboard={KeyW:0,KeyA:0,KeyS:0,KeyD:0},showcasePadKeys={KeyW:0,KeyA:0,KeyS:0,KeyD:0};
let showcaseTouchVec={x:0,y:0},showcasePadButtons=[];
addEventListener('keydown',e=>{if(e.code in showcaseKeyboard)showcaseKeyboard[e.code]=1},true);
addEventListener('keyup',e=>{if(e.code in showcaseKeyboard)showcaseKeyboard[e.code]=0},true);
addEventListener('blur',()=>{for(const k in showcaseKeyboard)showcaseKeyboard[k]=0;showcaseTouchVec={x:0,y:0}},true);
function showcaseMergeMoveKeys(){
  const touch={KeyW:showcaseTouchVec.y<-.28,KeyS:showcaseTouchVec.y>.28,KeyA:showcaseTouchVec.x<-.28,KeyD:showcaseTouchVec.x>.28};
  for(const k of Object.keys(showcaseKeyboard))K[k]=!!(showcaseKeyboard[k]||showcasePadKeys[k]||touch[k]);
}
function showcaseDoWhip(){
  if(state!=='play'||paused)return;
  const u=unis[caps[0]];if(!u?.live)return;
  audio();
  const a=u.a||0,d=110;
  whip={x:u.x-Math.cos(a)*d,y:u.y-Math.sin(a)*d,i:caps[0],l:.13,hit:0};
  crackWhip();
}
function showcaseEdge(buttons,index){
  const down=!!buttons[index]?.pressed,old=!!showcasePadButtons[index];showcasePadButtons[index]=down;return down&&!old;
}
function showcasePollGamepad(){
  const pad=navigator.getGamepads?.()?.find(Boolean);
  for(const k in showcasePadKeys)showcasePadKeys[k]=0;
  if(!pad){showcasePadButtons=[];showcaseMergeMoveKeys();return}
  const x=Math.abs(pad.axes?.[0]||0)>.18?pad.axes[0]:0,y=Math.abs(pad.axes?.[1]||0)>.18?pad.axes[1]:0,b=pad.buttons||[];
  showcasePadKeys.KeyA=x<-.2||!!b[14]?.pressed;showcasePadKeys.KeyD=x>.2||!!b[15]?.pressed;
  showcasePadKeys.KeyW=y<-.2||!!b[12]?.pressed;showcasePadKeys.KeyS=y>.2||!!b[13]?.pressed;
  if(showcaseEdge(b,0))showcaseDoWhip();
  if(showcaseEdge(b,1)&&state==='play')dashSolo();
  if((showcaseEdge(b,4)||showcaseEdge(b,5))&&state==='play')cycle();
  if(showcaseEdge(b,9)&&state==='play')paused=!paused;
  showcaseMergeMoveKeys();
}
const showcaseInputUpdateBase=update;
update=function(dt){showcasePollGamepad();showcaseInputUpdateBase(dt)};

// Touch UI is DOM-based so it remains maintainable and accessible outside the canvas renderer.
const touchRoot=document.createElement('div');touchRoot.className='showcase-touch';touchRoot.setAttribute('aria-label','Touch game controls');
touchRoot.innerHTML=`<div class="showcase-touch-pad" aria-label="Steering pad"><div class="showcase-touch-knob"></div></div><div class="showcase-touch-actions"><button class="showcase-touch-btn" data-action="whip">WHIP</button><button class="showcase-touch-btn" data-action="switch">SWITCH</button><button class="showcase-touch-btn" data-action="dash">DASH</button><button class="showcase-touch-btn" data-action="pause">PAUSE</button></div><div class="showcase-touch-hint">TOUCH CONTROLS</div>`;
document.body.append(touchRoot);
const touchPad=touchRoot.querySelector('.showcase-touch-pad'),touchKnob=touchRoot.querySelector('.showcase-touch-knob');
let touchPointer=-1;
function showcaseSetTouchPad(e){
  const r=touchPad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=e.clientX-cx,dy=e.clientY-cy,m=Math.hypot(dx,dy),lim=r.width*.34,q=m>lim?lim/m:1;
  dx*=q;dy*=q;showcaseTouchVec={x:dx/lim,y:dy/lim};touchKnob.style.transform=`translate(${dx}px,${dy}px)`;showcaseMergeMoveKeys();
}
touchPad.addEventListener('pointerdown',e=>{touchPointer=e.pointerId;touchPad.setPointerCapture(e.pointerId);showcaseSetTouchPad(e)});
touchPad.addEventListener('pointermove',e=>{if(e.pointerId===touchPointer)showcaseSetTouchPad(e)});
function showcaseReleaseTouch(e){if(touchPointer!==-1&&(!e||e.pointerId===touchPointer)){touchPointer=-1;showcaseTouchVec={x:0,y:0};touchKnob.style.transform='';showcaseMergeMoveKeys()}}
touchPad.addEventListener('pointerup',showcaseReleaseTouch);touchPad.addEventListener('pointercancel',showcaseReleaseTouch);
for(const button of touchRoot.querySelectorAll('.showcase-touch-btn'))button.addEventListener('pointerdown',e=>{
  e.preventDefault();audio();
  const action=button.dataset.action;
  if(action==='whip')showcaseDoWhip();
  else if(action==='switch'&&state==='play')cycle();
  else if(action==='dash'&&state==='play')dashSolo();
  else if(action==='pause'&&state==='play')paused=!paused;
});
function showcaseTouchVisibility(){
  const capable=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0||new URLSearchParams(location.search).has('touch');
  document.body.classList.toggle('showcase-touch-enabled',!!(capable&&showcaseSettings?.touchControls));
}
showcaseTouchVisibility();document.addEventListener('unicorn-settings-changed',showcaseTouchVisibility);
