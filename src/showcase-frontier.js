// Faultline Frontier: a real fourth-world hazard layer built on the stable herd/capture systems.
const frontierFaults=[
  {name:'RATTLER RIFT',width:38,breakAt:14,points:[[500,80],[575,245],[530,430],[675,610],[620,815]]},
  {name:'MESA SPLIT',width:44,breakAt:25,points:[[1390,420],[1530,585],[1460,785],[1635,955],[1570,1135]]},
  {name:'COYOTE CRACK',width:41,breakAt:35,points:[[2390,930],[2525,1090],[2445,1280],[2590,1470],[2490,1730]]},
  {name:'DRYBONE CUT',width:31,breakAt:43,points:[[760,1190],[900,1290],[1000,1450],[1160,1540]]},
];
let frontierClock=0,frontierLastTremor=-1;
const frontierSlip=new Map();
function frontierFenceIntegrity(f){return cl(1-Math.max(0,frontierClock-f.breakAt)/8,0,1)}
function frontierNearestPoint(px,py,a,b){
  const vx=b[0]-a[0],vy=b[1]-a[1],l=vx*vx+vy*vy||1,t=cl(((px-a[0])*vx+(py-a[1])*vy)/l,0,1),x=a[0]+vx*t,y=a[1]+vy*t,dx=px-x,dy=py-y,d=Math.hypot(dx,dy);
  let nx,ny;if(d>.001){nx=dx/d;ny=dy/d}else{const m=Math.hypot(vx,vy)||1;nx=-vy/m;ny=vx/m}
  const m=Math.hypot(vx,vy)||1;return{x,y,d,nx,ny,tx:vx/m,ty:vy/m};
}
function frontierFaultInfo(u){
  let best=null;
  for(const f of frontierFaults)for(let i=1;i<f.points.length;i++){
    const q=frontierNearestPoint(u.x,u.y,f.points[i-1],f.points[i]);
    if(!best||q.d<best.d)best={...q,fault:f,index:frontierFaults.indexOf(f)};
  }
  return best;
}
function frontierCaptureByFault(u,info){
  if(!u.live)return;
  addClean(1);const c=cleaners[cleaners.length-1];c.frontier=1;c.u=u.id;c.x=cl(u.x,100,WW-100);c.y=u.y<WH/2?635:1225;c.v=(u.x<WW/2?1:-1)*Math.max(155,Math.abs(c.v));
  u.live=0;u.frontierSlip=0;frontierSlip.delete(u.id);
  if(caps[0]===u.id){const next=unis.findIndex(q=>q.live);if(next>=0)caps[0]=next}
  msg=u.name+' LOST TO '+info.fault.name+'!';msgT=1.8;lmText='WRANGLERS GOT '+u.name+' • HIT CARRIAGE + BRING 2';lmTextT=2.4;shake=Math.max(shake,14);flash=Math.max(flash,.45);tone(78,.2,'sawtooth',.035,46);
}
function frontierUpdateFaults(dt){
  if(zone!==3||!level||state!=='play'||paused)return;
  frontierClock+=dt;
  const tremor=Math.floor(frontierClock/11);
  if(tremor!==frontierLastTremor){frontierLastTremor=tremor;if(tremor){shake=Math.max(shake,7);lmText='FAULT TREMOR • FENCES WEAKEN';lmTextT=1.1;tone(62,.18,'sawtooth',.018,42)}}
  const active=unis[caps[0]];
  for(const u of unis){
    if(!u.live)continue;const info=frontierFaultInfo(u);if(!info)continue;
    const integrity=frontierFenceIntegrity(info.fault),fenceRadius=info.fault.width+30;
    if(integrity>.08&&info.d<fenceRadius){
      // Intact frontier fences are actual routing barriers, not painted decoration.
      const push=(fenceRadius-info.d)+3;u.x=cl(u.x+info.nx*push,20,WW-20);u.y=cl(u.y+info.ny*push,20,WH-20);u.vx+=info.nx*110;u.vy+=info.ny*110;
      if(u!==active){u.ai=Math.max(u.ai,.34);u.tx=cl(u.x+info.nx*150+info.tx*120,30,WW-30);u.ty=cl(u.y+info.ny*150+info.ty*120,30,WH-30)}
      frontierSlip.delete(u.id);u.frontierSlip=0;continue;
    }
    const core=info.fault.width*.62;
    if(integrity<=.08&&info.d<core){
      const rate=u===active?.42:1,slip=(frontierSlip.get(u.id)||0)+dt*rate;frontierSlip.set(u.id,slip);u.frontierSlip=slip;
      u.vx*=.9;u.vy*=.9;
      if(u===active){msg='FAULT EDGE! MOVE!';msgT=.35}else if(slip>.55){msg=u.name+' IS SLIPPING! • SHIFT';msgT=.45}
      if(slip>(u===active?2.35:1.15))frontierCaptureByFault(u,info);
    }else{
      const slip=Math.max(0,(frontierSlip.get(u.id)||0)-dt*2.7);if(slip)frontierSlip.set(u.id,slip);else frontierSlip.delete(u.id);u.frontierSlip=slip;
    }
  }
}
const frontierStartBase=startLevel;
startLevel=function(n){const r=frontierStartBase(n);frontierClock=0;frontierLastTremor=-1;frontierSlip.clear();return r};
const frontierUpdateBase=update;update=function(dt){frontierUpdateBase(dt);frontierUpdateFaults(dt)};

function frontierTrace(f,points=f.points){X.beginPath();X.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)X.lineTo(points[i][0],points[i][1])}
function frontierOffsetPoints(f,side){
  return f.points.map((p,i)=>{const a=f.points[Math.max(0,i-1)],b=f.points[Math.min(f.points.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],m=Math.hypot(dx,dy)||1,o=(f.width+27)*side;return[p[0]-dy/m*o,p[1]+dx/m*o]});
}
function frontierDrawFence(f,side,integrity){
  if(integrity<=.02)return;const pts=frontierOffsetPoints(f,side);X.save();X.globalAlpha=.45+.55*integrity;X.strokeStyle='#5a3927';X.lineWidth=7;X.lineCap='round';X.lineJoin='round';X.setLineDash(integrity<.72?[30,18+(1-integrity)*55]:[]);frontierTrace(f,pts);X.stroke();X.setLineDash([]);
  X.fillStyle='#6b442c';for(let i=0;i<pts.length;i++){if(integrity<.6&&(i+side+2)%3===0)continue;const [x,y]=pts[i];X.fillRect(x-4,y-14,8,29)}X.restore();
}
function frontierDrawFault(f){
  X.save();X.lineCap='round';X.lineJoin='round';
  X.strokeStyle='#d4975d';X.lineWidth=f.width*2.7;frontierTrace(f);X.stroke();
  X.strokeStyle='#70442e';X.lineWidth=f.width*2.2;frontierTrace(f);X.stroke();
  X.strokeStyle='#2d201c';X.lineWidth=f.width*1.55;frontierTrace(f);X.stroke();
  X.strokeStyle='#050506';X.lineWidth=f.width*.95;frontierTrace(f);X.stroke();
  // Sparse depth glints make the black core read as a canyon rather than a painted stripe.
  X.globalAlpha=.3;X.strokeStyle='#b7623e';X.lineWidth=3;const pts=f.points;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;X.beginPath();X.moveTo(mx-12,my-5);X.lineTo(mx+8,my+12);X.stroke()}X.globalAlpha=1;
  const integrity=frontierFenceIntegrity(f);frontierDrawFence(f,-1,integrity);frontierDrawFence(f,1,integrity);
  if(integrity<.55){X.strokeStyle='#5b3825';X.lineWidth=6;X.globalAlpha=.75;for(let i=1;i<pts.length;i+=2){const p=pts[i];X.beginPath();X.moveTo(p[0]+f.width+34,p[1]-9);X.lineTo(p[0]+f.width+62,p[1]+10);X.stroke()}X.globalAlpha=1}
  X.restore();
}
function frontierDrawCactus(x,y,s=1){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#477047';rr(-8,-39,16,58,8);rr(-24,-13,14,29,7);rr(10,-23,14,31,7);X.fillRect(-18,-12,12,8);X.fillRect(5,-21,12,8);X.fillStyle='#d66f8d';townCircle(1,-40,4);X.restore()}
function frontierDrawMesa(x,y,s=1){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#8d4f32';X.beginPath();X.moveTo(-80,35);X.lineTo(-58,-8);X.lineTo(-33,-18);X.lineTo(-25,-58);X.lineTo(28,-58);X.lineTo(36,-18);X.lineTo(60,-10);X.lineTo(82,35);X.closePath();X.fill();X.fillStyle='#b76c42';X.fillRect(-24,-58,51,13);X.restore()}
function frontierDrawDesert(){
  for(const p of[[160,190,1.25],[3030,180,.95],[2800,1650,1.18],[220,1620,.85]])frontierDrawMesa(...p);
  for(const p of[[310,350,.9],[1110,220,.7],[2130,420,1],[2920,820,.8],[420,1370,1.1],[1830,1420,.8],[2730,1510,.95]])frontierDrawCactus(...p);
  // Tumbleweeds move only visually; they communicate wind without adding another collision family.
  const t=globalThis.showcaseSettings?.reducedMotion?0:clock;X.strokeStyle='#795239';X.lineWidth=3;X.globalAlpha=.75;for(let i=0;i<6;i++){const x=(i*580+t*58)%WW,y=330+(i*247)%1240,r=13+(i%3)*3;X.beginPath();X.arc(x,y,r,0,T);X.moveTo(x-r,y);X.lineTo(x+r,y);X.moveTo(x,y-r);X.lineTo(x,y+r);X.stroke()}X.globalAlpha=1;
}
const frontierStreetBase=drawTownStreetDecor;
drawTownStreetDecor=function(){frontierStreetBase();if(!level||zone!==3)return;frontierDrawDesert();for(const f of frontierFaults)frontierDrawFault(f)};

const frontierCarsBase=drawCars;
drawCars=function(){
  if(zone!==3)return frontierCarsBase();
  for(const c of cars){X.save();X.translate(c.x,c.y);if(!c.dir)X.rotate(Math.PI/2);if(c.v<0)X.scale(-1,1);X.fillStyle='#61412d';rr(-43,-20,74,38,5);X.fillStyle='#b58b5b';X.beginPath();X.moveTo(-34,-20);X.quadraticCurveTo(0,-49,29,-20);X.closePath();X.fill();townCircle(-28,22,11,'#32251f');townCircle(26,22,11,'#32251f');X.strokeStyle='#57402f';X.lineWidth=4;X.beginPath();X.moveTo(31,-1);X.lineTo(61,-1);X.stroke();X.restore()}
};
const frontierPeopleBase=drawPeople;
drawPeople=function(){frontierPeopleBase();if(zone!==3)return;for(const p of people){X.fillStyle='#593922';X.fillRect(p.x-13,p.y-13,26,5);rr(p.x-8,p.y-22,16,10,3)}};
function frontierDrawWranglerWagons(){
  if(zone!==3||!level)return;X.save();X.translate(ox,oy);X.scale(z,z);
  for(const c of cleaners){X.save();X.translate(c.x,c.y);const dir=c.v<0?-1:1;X.scale(dir,1);X.fillStyle='#2b201a';rr(-60,-30,116,57,7);X.fillStyle=c.stun?'#8b7664':'#75492e';rr(-54,-25,103,44,6);X.fillStyle='#c6a777';X.beginPath();X.moveTo(-45,-25);X.quadraticCurveTo(0,-65,42,-25);X.closePath();X.fill();townCircle(-36,28,14,'#251d19');townCircle(35,28,14,'#251d19');X.strokeStyle='#d0b080';X.lineWidth=3;X.beginPath();X.moveTo(49,-2);X.lineTo(77,-2);X.stroke();
    if(c.u>=0&&unis[c.u]){const u=unis[c.u],hx=96;X.strokeStyle='#7a5437';X.beginPath();X.moveTo(74,-2);X.lineTo(hx-17,-1);X.stroke();X.fillStyle=`hsl(${u.h} 70% 72%)`;X.beginPath();X.ellipse(hx,0,22,13,0,0,T);X.fill();townCircle(hx+22,-10,10,`hsl(${u.h} 72% 76%)`);X.fillStyle='#f7df7f';X.beginPath();X.moveTo(hx+27,-20);X.lineTo(hx+35,-35);X.lineTo(hx+22,-22);X.closePath();X.fill();X.strokeStyle='#302721';X.lineWidth=3;X.beginPath();X.moveTo(hx-11,9);X.lineTo(hx-16,27);X.moveTo(hx+8,9);X.lineTo(hx+13,27);X.stroke();X.fillStyle='#fff';text('RESCUE',5,-43,12,'center')}
    X.restore();
  }
  for(const u of unis)if(u.live&&u.frontierSlip>.18){X.fillStyle='#ffcf70';text('⚠ SLIPPING '+Math.min(99,u.frontierSlip*70|0)+'%',u.x,u.y-58,13,'center')}
  X.restore();
}
const frontierWorldBase=world;world=function(){frontierWorldBase();frontierDrawWranglerWagons()};
const frontierScoreBase=comp;comp=function(){if(zone!==3)return frontierScoreBase();const m=1.32*(plus?1.12+Math.min(heat,9)*.04:1);return Math.round(((landWin>0?4e4:0)+paintPct()*9e4+structPct()*7e4+Math.min(chains,6)*6e3)*m)};
globalThis.showcaseFrontier={
  get faults(){return frontierFaults},get time(){return frontierClock},integrity:i=>frontierFenceIntegrity(frontierFaults[i]),nearest:frontierFaultInfo,
  setTime:t=>{frontierClock=Math.max(0,t)},forceBreak:i=>{if(frontierFaults[i])frontierClock=Math.max(frontierClock,frontierFaults[i].breakAt+9)},capture:frontierCaptureByFault,
};
