let zone=S.g('ccZone')%3,runN=S.g('ccRun'),seedZone=0,wind=1,windT=0,chains=0;
const _rain=paintStamp;paintStamp=(u,x=u.x,y=u.y,r=28)=>_rain(u,x,y,r+(level?stamp:0));
const ZN=['PRISMBOROUGH','WASHWATER BAY','CLOUDTOP HEIGHTS'],_day=today;today=()=>_day()+seedZone*173+runN*19;
function grade(){let p=paintPct()>stageGoal+.07;return landWin?1+p+(p&&chains>[1,1,2][zone]):0}
function finishZone(){let c=grade(),k='ccC'+zone;if(c>S.g(k))S.s(k,c)}
function canZone(z){return !z||S.g('ccC'+(z-1))}
function harbor(){roads.splice(1,1);objs=objs.filter(o=>o.t!=='hedge');cars=cars.filter(c=>c.dir||c.x<1200||c.x>2e3);ups[2].x=ups[6].x=1630}
addEventListener('keydown',e=>{if(state==='title'&&S.g('ccIntro16')&&(e.code==='KeyA'||e.code==='KeyD')){let n=(zone+(e.code==='KeyD'?1:2))%3;if(canZone(n)){zone=n;S.s('ccZone',zone);tone(280,.05,'triangle',.012,420)}}});
const _startW=startLevel;startLevel=function(n){seedZone=n?zone:0;if(n)S.s('ccRun',++runN);_startW(n);if(n&&zone===1)harbor();wind=1;windT=2;chains=0;if(n){if(zone===1){addClean(2);for(let c of cleaners)c.v*=1.35;msg='HARBOR • OPEN QUAYS';msgT=2}lmText=ZN[zone];lmTextT=2}};
const _crackW=crackWhip;crackWhip=function(){let u=unis[whip.i],n=u&&u.tapT?u.tap+1:1;_crackW();if(whip&&whip.hit>0){u=unis[whip.i];if(n>2)chains++;if(zone===2&&level&&u){u.tapT=Math.min(u.tapT,.5);u.vx*=1.14;u.vy*=1.14}}};
function updateZone(dt){if(!level||zone!==2)return;windT-=dt;if(windT<=0){windT=4;wind*=-1;lmText=wind>0?'CROSSWIND →':'← CROSSWIND';lmTextT=1}for(let u of unis)if(u.live)u.vx+=wind*(90+stamp*8)*dt}
const _updateW=update;update=function(dt){let before=state;_updateW(dt);if(state==='play'&&!paused)updateZone(dt);if(before==='play'&&state==='end')finishZone()};
const _worldW=world;world=function(){_worldW();if(!level||!zone)return;X.save();X.translate(ox,oy);X.scale(z,z);if(zone===1){X.strokeStyle='#9de8ff22';for(let i=6;i--;){let x=(i*379+clock*130)%WW,y=(i*211+clock*260)%WH;X.beginPath();X.moveTo(x,y);X.lineTo(x-18,y+36);X.stroke()}}else{X.fillStyle='rgba(245,250,255,.09)';for(let i=0;i<7;i++){let x=(i*510+clock*wind*45)%3500-120,y=180+(i%3)*560;X.beginPath();X.ellipse(x,y,180,70,0,0,T);X.fill()}}X.restore()};
const _titleW=title;
