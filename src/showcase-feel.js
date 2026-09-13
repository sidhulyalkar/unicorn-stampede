// Perceptual responsiveness for the showcase edition. These cues do not alter herd physics.
let showcaseSwitchPulse=0,showcaseDashPulse=0,showcaseFocusId=-1;
const showcaseFeelCycleBase=cycle;
cycle=function(){const before=caps[0],r=showcaseFeelCycleBase();if(state==='play'&&caps[0]!==before){showcaseFocusId=caps[0];showcaseSwitchPulse=1;tone(480,.035,'triangle',.012,720)}return r};
const showcaseFeelDashBase=dashSolo;
dashSolo=function(){const u=unis[caps[0]],before=u?.dash||0,r=showcaseFeelDashBase();if(u?.dash>before)showcaseDashPulse=1;return r};
const showcaseFeelUpdateBase=update;
update=function(dt){showcaseSwitchPulse=Math.max(0,showcaseSwitchPulse-dt*3.8);showcaseDashPulse=Math.max(0,showcaseDashPulse-dt*5.5);return showcaseFeelUpdateBase(dt)};
function showcaseDrawControlFeel(){
  if(state!=='play')return;const u=unis[caps[0]];if(!u?.live)return;const reduced=globalThis.showcaseSettings?.reducedMotion,v=Math.hypot(u.vx,u.vy),p=showcaseWorldPalette();
  X.save();X.translate(ox,oy);X.scale(z,z);
  if(!reduced&&v>130){const a=Math.atan2(u.vy,u.vx),nx=-Math.sin(a),ny=Math.cos(a),dx=Math.cos(a),dy=Math.sin(a),q=cl((v-130)/420,0,1),len=34+q*72;X.globalAlpha=.12+q*.18;X.strokeStyle=`hsl(${u.h} 92% 72%)`;X.lineWidth=5;X.beginPath();for(let i=-1;i<=1;i++){const sx=u.x-dx*38+nx*i*18,sy=u.y-dy*38+ny*i*18;X.moveTo(sx,sy);X.lineTo(sx-dx*len,sy-dy*len)}X.stroke()}
  if(showcaseSwitchPulse>0&&showcaseFocusId===u.id){const q=1-showcaseSwitchPulse,r=86+q*82;X.globalAlpha=showcaseSwitchPulse*.72;X.strokeStyle=`hsl(${u.h} 90% 72%)`;X.lineWidth=8-4*q;X.beginPath();X.arc(u.x,u.y,r,0,T);X.stroke();X.globalAlpha=Math.min(1,showcaseSwitchPulse*1.7);X.fillStyle=p.glow;text(u.name.toUpperCase(),u.x,u.y-118-q*20,15,'center')}
  if(showcaseDashPulse>0){const r=72+(1-showcaseDashPulse)*105;X.globalAlpha=showcaseDashPulse*.45;X.strokeStyle=p.accent2;X.lineWidth=7;X.beginPath();X.arc(u.x,u.y,r,0,T);X.stroke()}
  X.restore();
}
const showcaseFeelWorldBase=world;world=function(){showcaseFeelWorldBase();showcaseDrawControlFeel()};
globalThis.showcaseFeelState=()=>({switchPulse:showcaseSwitchPulse,dashPulse:showcaseDashPulse,focusId:showcaseFocusId});
