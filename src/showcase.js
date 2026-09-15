// Expanded game layer. This file intentionally favors clarity and visual identity over byte golf.
const showcaseBaseCollide=collide;
collide=function(u,o,dt){
  const bx=u.x,by=u.y;
  showcaseBaseCollide(u,o,dt);
  if(state!=='play'||!u.live||u===unis[caps[0]]||u.order||o.hp<=0||u.ai>0)return;
  if(u.x===bx&&u.y===by)return;
  let vx=u.vx,vy=u.vy,m=Math.hypot(vx,vy);
  if(m<20){
    const dx=u.x-(o.x+o.w/2),dy=u.y-(o.y+o.h/2);
    if(Math.abs(dx/(o.w||1))>Math.abs(dy/(o.h||1)))vy=dy<0?-1:1,vx=0;
    else vx=dx<0?-1:1,vy=0;
    m=1;
  }
  u.ai=.28;
  u.tx=cl(u.x+vx/m*150,30,WW-30);
  u.ty=cl(u.y+vy/m*150,30,WH-30);
};

const showcaseStreetBase=drawTownStreetDecor;
drawTownStreetDecor=function(){
  showcaseStreetBase();
  if(!level)return;
  X.save();
  if(zone===0){
    X.globalAlpha=.17;X.fillStyle='#f6e6bd';rr(980,720,520,470,42);
    X.strokeStyle='#fff7';X.lineWidth=4;
    for(let x=1010;x<1480;x+=70){X.beginPath();X.moveTo(x,730);X.lineTo(x-90,1180);X.stroke()}
    X.globalAlpha=.85;X.strokeStyle='#f6d76f';X.lineWidth=3;
    for(let y of[510,1095]){X.beginPath();X.moveTo(40,y);X.lineTo(720,y);X.stroke();for(let x=80;x<700;x+=80){X.fillStyle=`hsl(${x/2} 80% 66%)`;X.beginPath();X.moveTo(x,y);X.lineTo(x+10,y+18);X.lineTo(x+20,y);X.fill()}}
  }else if(zone===1){
    X.globalAlpha=.3;X.fillStyle='#63b6cf';X.fillRect(1315,0,425,WH);
    X.globalAlpha=.6;X.fillStyle='#d9b77d';X.fillRect(1290,0,28,WH);X.fillRect(1740,0,28,WH);
    X.strokeStyle='#6f573c';X.lineWidth=2;
    for(let y=0;y<WH;y+=34){X.beginPath();X.moveTo(1290,y);X.lineTo(1318,y);X.moveTo(1740,y);X.lineTo(1768,y);X.stroke()}
    X.globalAlpha=.45;X.strokeStyle='#d9f7ff';X.lineWidth=4;
    for(let y=55;y<WH;y+=120){X.beginPath();X.moveTo(1330,y);X.quadraticCurveTo(1520,y+22,1725,y);X.stroke()}
  }else if(zone===2){
    X.globalAlpha=.12;X.fillStyle='#eef2f4';
    for(let i=0;i<9;i++){let x=120+i*370,y=110+(i&1)*1320;X.beginPath();X.ellipse(x,y,190,75,0,0,T);X.fill()}
    X.globalAlpha=.56;X.strokeStyle='#c4cacf';X.lineWidth=6;X.beginPath();X.moveTo(430,260);X.lineTo(2740,1370);X.stroke();
    X.strokeStyle='#69737c';X.lineWidth=2;X.beginPath();X.moveTo(430,275);X.lineTo(2740,1385);X.stroke();
    for(let i=0;i<3;i++){let q=(clock*.035+i/3)%1,x=430+(2740-430)*q,y=260+(1370-260)*q;X.fillStyle=i&1?'#b39bc8':'#91b8c2';rr(x-22,y-13,44,26,8);X.strokeStyle='#3f474d';X.lineWidth=2;X.beginPath();X.moveTo(x,y-13);X.lineTo(x,y-48);X.stroke()}
  }
  X.restore();
};

const showcaseBuildingBase=drawTownBuilding;
drawTownBuilding=function(o,tall,d){
  showcaseBuildingBase(o,tall,d);
  if(!level||o.hp<=0)return;
  let x=o.x,y=o.y,w=o.w,h=o.h;if(tall)y-=45,h+=45;
  X.save();
  if(zone===0){
    if((o.v||0)&1){X.fillStyle='#6d9f58';X.fillRect(x+16,y+h-20,36,7);for(let i=0;i<3;i++)townCircle(x+22+i*11,y+h-23,4,['#ff8ea1','#ffd45f','#8ce0ff'][i])}
  }else if(zone===1){
    X.fillStyle='#2d7f93';X.globalAlpha=.72;X.fillRect(x+8,y+h-13,w-16,5);X.globalAlpha=.9;townCircle(x+22,y+34,8,'#b9edf7');X.strokeStyle='#356979';X.lineWidth=3;X.beginPath();X.arc(x+22,y+34,8,0,T);X.stroke();
  }else if(zone===2){
    X.globalAlpha=.72;X.fillStyle='#c7cdd0';X.fillRect(x+6,y+5,w-12,5);X.fillStyle='#8baeb8';X.fillRect(x+w-17,y+28,6,Math.max(22,h-72));
    if((o.k||0)>4){X.strokeStyle='#d7dcdf';X.lineWidth=3;X.beginPath();X.moveTo(x+w/2,y);X.lineTo(x+w/2,y-28);X.stroke();townCircle(x+w/2,y-31,4,'#e6b86f')}
  }
  X.restore();
};

function showcasePersonPose(p){
  const phase=clock*5+p.h,stride=Math.sin(phase)*4,swing=Math.cos(phase)*3,x=p.x,y=p.y;
  return{head:[x,y,10],torso:[x-7,y+10,14,20],leftArm:[[x-5,y+16],[x-14-swing*.28,y+26+stride*.18]],rightArm:[[x+5,y+16],[x+14+swing*.28,y+26-stride*.18]],leftLeg:[[x-3,y+29],[x-8-stride,y+43]],rightLeg:[[x+3,y+29],[x+8+stride,y+43]]};
}
function showcaseDrawPersonSkeleton(p){
  const q=showcasePersonPose(p),skin=`hsl(${p.h} 42% 72%)`,cloth=zone===1?'#2f6f7d':zone===2?'#596269':zone===3?'#79543b':`hsl(${(p.h+140)%360} 45% 42%)`;
  X.save();X.lineCap='round';X.strokeStyle='#263242';X.lineWidth=4.4;
  // Legs first, then torso, then arms so neither arm can disappear behind the body fill.
  X.beginPath();for(const limb of[q.leftLeg,q.rightLeg]){X.moveTo(limb[0][0],limb[0][1]);X.lineTo(limb[1][0],limb[1][1])}X.stroke();
  X.fillStyle=cloth;rr(...q.torso,4);
  X.strokeStyle='#263242';X.lineWidth=4.4;X.beginPath();for(const limb of[q.leftArm,q.rightArm]){X.moveTo(limb[0][0],limb[0][1]);X.lineTo(limb[1][0],limb[1][1])}X.stroke();
  for(const limb of[q.leftArm,q.rightArm])townCircle(limb[1][0],limb[1][1],2.7,skin);
  townCircle(q.head[0],q.head[1],q.head[2],skin);
  // Shoes anchor both legs visually even when their stride overlaps at the center line.
  X.strokeStyle='#202832';X.lineWidth=3;for(const limb of[q.leftLeg,q.rightLeg]){const [fx,fy]=limb[1];X.beginPath();X.moveTo(fx-2,fy);X.lineTo(fx+4,fy);X.stroke()}
  if(zone===1){X.fillStyle='#f0c35b';X.fillRect(p.x-11,p.y-12,22,4)}
  if(zone===2){X.fillStyle='#cfd5d8';X.fillRect(p.x-8,p.y+11,16,4)}
  X.restore();
}
drawPeople=function(){for(const p of people)showcaseDrawPersonSkeleton(p)};
globalThis.showcasePersonRenderer={requiredParts:['head','torso','leftArm','rightArm','leftLeg','rightLeg'],pose:showcasePersonPose,draw:showcaseDrawPersonSkeleton};
