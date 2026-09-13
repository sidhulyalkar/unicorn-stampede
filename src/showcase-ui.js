// Showcase runtime mirror of compact ui.js. The compact file remains frozen for the JS13k build.
// Firefox may service rAF between parser-blocking scripts, so the showcase frame waits for its
// later title/HUD renderers instead of relying on a second script to patch the parser gap.
let cycle,hud,title,introHud,rules,end;
function pause(){X.fillStyle='rgba(3,5,11,.7)';X.fillRect(0,0,W,H);X.fillStyle='#fff';text('PAUSED',W/2,H/2,46,'center')}
function frame(t){if(typeof title!=='function'||typeof hud!=='function'){last=t;requestAnimationFrame(frame);return}let dt=Math.min(.033,(t-last)/1000||0);last=t;if(!paused&&state==='title')clock+=dt;update(dt);draw();requestAnimationFrame(frame)}requestAnimationFrame(frame);
