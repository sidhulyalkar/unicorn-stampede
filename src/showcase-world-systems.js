// Showcase v1.2: world-specific simulation systems layered on the stable compact core.
// These actors intentionally live outside objs/cars so the competition simulation remains untouched.
let showcaseWorldActors=[],showcaseWorldClock=0,showcaseWorldEvent='';
function showcaseResetWorldSystems(){
  showcaseWorldActors=[];showcaseWorldClock=0;showcaseWorldEvent='';
  if(!level)return;
  if(zone===0){
    showcaseWorldActors=[
      {type:'parade',x:120,y:620,v:82,phase:0},
      {type:'parade',x:2920,y:1210,v:-74,phase:2},
    ];
  }else if(zone===1){
    showcaseWorldActors=[
      {type:'ferry',x:1455,y:80,v:74,phase:0},
      {type:'ferry',x:1615,y:1680,v:-62,phase:2.4},
    ];
  }else{
    showcaseWorldActors=[
      {type:'cable',x:260,y:420,v:96,phase:0},
      {type:'cable',x:2940,y:1380,v:-88,phase:2.1},
    ];
  }
}
const showcaseWorldSystemsStartBase=startLevel;
startLevel=function(n){const r=showcaseWorldSystemsStartBase(n);showcaseResetWorldSystems();return r};

function showcaseActorPush(u,a,r=82,strength=250){
  const dx=u.x-a.x,dy=u.y-a.y,d=Math.hypot(dx,dy)||1;if(d>=r)return;
  const q=1-d/r;u.vx+=dx/d*strength*q;u.vy+=dy/d*strength*q;u.anger=cl(u.anger+.04*q,0,1);
}
function showcaseUpdatePrism(dt){
  const active=showcaseWorldClock%24<9;showcaseWorldEvent=active?'CIVIC PARADE':'';
  for(const a of showcaseWorldActors){
    a.x+=a.v*dt;if(a.v>0&&a.x>WW+160)a.x=-160;if(a.v<0&&a.x<-160)a.x=WW+160;
    if(!active)continue;
    for(const u of unis)if(u.live&&u!==unis[caps[0]]){
      const dx=a.x-u.x,dy=a.y-u.y,d=Math.hypot(dx,dy)||1;
      if(d<190){u.vx+=dx/d*28*dt;u.vy+=dy/d*28*dt}
    }
  }
}
function showcaseUpdateWashwater(dt){
  showcaseWorldEvent='HARBOR TRAFFIC';
  for(const a of showcaseWorldActors){
    a.y+=a.v*dt;if(a.v>0&&a.y>WH+100)a.y=-100;if(a.v<0&&a.y<-100)a.y=WH+100;
    for(const u of unis)if(u.live){
      const dx=u.x-a.x,dy=u.y-a.y,d=Math.hypot(dx,dy)||1;
      if(d<150){
        // Ferry wake: readable lateral shove, stronger for unattended herd members.
        const side=Math.sign(dx)||1,q=1-d/150;
        u.vx+=side*(u===unis[caps[0]]?75:125)*q*dt;
        u.vy+=a.v*.16*q*dt;
      }
      if(d<72)showcaseActorPush(u,a,72,320);
    }
  }
}
function showcaseCloudBarrierAt(u){
  for(let i=0;i<6;i++){
    const x=400+i*460,y=(i&1)*800,h=1000;
    if(u.y>y-40&&u.y<y+h+40&&Math.abs(u.x-x)<155)return{x,y,h};
  }
}
function showcaseUpdateCloudtop(dt){
  showcaseWorldEvent='WIND + CABLE TRANSIT';
  const force=(mode?90:58)+(typeof stamp==='number'?stamp:0)*8;
  for(const u of unis)if(u.live){
    const barrier=showcaseCloudBarrierAt(u);
    if(barrier){
      // Stone ridges act as wind shadows. Counter most of the global crosswind
      // already applied by updateZone, creating deliberately protected routes.
      u.vx-=wind*force*.76*dt;
    }else if(u.y>690&&u.y<1110){
      // Exposed saddle: the center corridor is the faster but riskier route.
      u.vx+=wind*force*.34*dt;
    }
  }
  for(const a of showcaseWorldActors){
    a.x+=a.v*dt;if(a.v>0&&a.x>WW+120)a.x=-120;if(a.v<0&&a.x<-120)a.x=WW+120;
    for(const u of unis)if(u.live&&Math.abs(u.y-a.y)<60&&Math.abs(u.x-a.x)<95)showcaseActorPush(u,a,105,230);
  }
}
function showcaseUpdateWorldSystems(dt){
  if(!level||state!=='play'||paused)return;
  showcaseWorldClock+=dt;
  if(zone===0)showcaseUpdatePrism(dt);else if(zone===1)showcaseUpdateWashwater(dt);else showcaseUpdateCloudtop(dt);
}
const showcaseWorldSystemsUpdateBase=update;
update=function(dt){showcaseWorldSystemsUpdateBase(dt);showcaseUpdateWorldSystems(dt)};

function showcaseDrawParade(a){
  X.save();X.translate(a.x,a.y);
  X.fillStyle='#273449';rr(-58,-30,116,60,14);
  X.fillStyle='#ffe46f';rr(-48,-25,96,42,10);
  X.fillStyle='#ec6fb8';townCircle(-22,-3,15);X.fillStyle='#63d8e9';townCircle(17,-3,15);
  X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.moveTo(0,-26);X.lineTo(0,-72);X.stroke();
  X.fillStyle='#ff77bd';X.beginPath();X.moveTo(0,-70);X.lineTo(42,-55);X.lineTo(0,-42);X.closePath();X.fill();
  townCircle(-38,32,11,'#1d2635');townCircle(38,32,11,'#1d2635');X.restore();
}
function showcaseDrawFerry(a){
  X.save();X.translate(a.x,a.y);X.fillStyle='#233b4b';X.beginPath();X.moveTo(-68,20);X.lineTo(68,20);X.lineTo(47,45);X.lineTo(-50,45);X.closePath();X.fill();
  X.fillStyle='#f4efe1';rr(-42,-15,84,36,8);X.fillStyle='#78cde0';X.fillRect(-28,-8,18,13);X.fillRect(10,-8,18,13);
  X.strokeStyle='#e9faff';X.lineWidth=4;X.globalAlpha=.5;for(let i=1;i<4;i++){X.beginPath();X.moveTo(-58-i*16,38+i*5);X.lineTo(58+i*16,38+i*5);X.stroke()}X.restore();
}
function showcaseDrawCable(a){
  X.save();X.translate(a.x,a.y);X.strokeStyle='#c9d9e4';X.lineWidth=4;X.beginPath();X.moveTo(0,-75);X.lineTo(0,-26);X.stroke();
  X.fillStyle='#2c4052';rr(-38,-28,76,58,12);X.fillStyle='#9be6f4';X.fillRect(-28,-17,24,22);X.fillRect(5,-17,24,22);X.fillStyle='#ffd36f';townCircle(0,25,5);X.restore();
}
function showcaseDrawWorldSystems(){
  if(!level)return;
  X.save();X.translate(ox,oy);X.scale(z,z);
  if(zone===2){X.strokeStyle='#9bb0bf';X.lineWidth=5;X.globalAlpha=.7;for(const y of[420,1380]){X.beginPath();X.moveTo(80,y-75);X.lineTo(WW-80,y-75);X.stroke()}X.globalAlpha=1}
  for(const a of showcaseWorldActors)zone===0?showcaseDrawParade(a):zone===1?showcaseDrawFerry(a):showcaseDrawCable(a);
  if(showcaseWorldEvent&&state==='play'){
    X.fillStyle='#07101dcc';rr(WW/2-160,22,320,34,11);X.fillStyle='#dff6ff';text(showcaseWorldEvent,WW/2,45,12,'center');
  }
  X.restore();
}
const showcaseWorldSystemsDrawBase=world;
world=function(){showcaseWorldSystemsDrawBase();showcaseDrawWorldSystems()};

globalThis.showcaseWorldSystems={
  get actors(){return showcaseWorldActors},
  get event(){return showcaseWorldEvent},
  cloudBarrierAt:showcaseCloudBarrierAt,
  reset:showcaseResetWorldSystems,
};
