// Showcase v1.5 geometry safety net. Runs after world hazards so no system may leave a live unicorn
// embedded in a solid or continuously pushing outward against the map perimeter.
const showcaseEdgeAge=new Map();
let showcaseBoundaryCorrections=0,showcaseSolidCorrections=0,showcaseInvalidRecoveries=0,showcaseRoadEscapes=0;
function showcasePerimeterInfo(u){
  const left=u.x-20,right=WW-20-u.x,top=u.y-20,bottom=WH-20-u.y,min=Math.min(left,right,top,bottom);
  let nx=0,ny=0;if(left<58)nx+=1;if(right<58)nx-=1;if(top<58)ny+=1;if(bottom<58)ny-=1;const m=Math.hypot(nx,ny)||1;
  return{left,right,top,bottom,min,nx:nx/m,ny:ny/m,near:min<58,out:(left<58&&u.vx<0)||(right<58&&u.vx>0)||(top<58&&u.vy<0)||(bottom<58&&u.vy>0)};
}
function showcaseSolidCandidateAt(u,x=u.x,y=u.y){
  const a=showcaseObjectGrid.get(showcaseGridKey(Math.floor(x/SHOWCASE_GRID),Math.floor(y/SHOWCASE_GRID)))||[],ex=u.cap?32:20;
  for(const o of a)if(o.hp>0&&x>o.x-ex&&x<o.x+o.w+ex&&y>o.y-ex&&y<o.y+o.h+ex)return{o,ex};
  return null;
}
function showcaseSolidCandidate(u){return showcaseSolidCandidateAt(u)}
function showcaseRoadEscape(u){
  let best=null,bd=1e18,ex=(u.cap?32:20)+6;
  for(const r of roads){if(r[2]<=ex*2||r[3]<=ex*2)continue;const x=cl(u.x,r[0]+ex,r[0]+r[2]-ex),y=cl(u.y,r[1]+ex,r[1]+r[3]-ex);if(showcaseSolidCandidateAt(u,x,y))continue;const d=(x-u.x)**2+(y-u.y)**2;if(d<bd){bd=d;best={x,y}}}
  if(best){u.x=best.x;u.y=best.y;u.vx=u.vy=0;u.ai=0;showcaseRoadEscapes++;return true}return false;
}
function showcaseProjectSolid(u){
  let corrected=0;
  for(let pass=0;pass<8;pass++){
    const hit=showcaseSolidCandidate(u);if(!hit)break;const{o,ex}=hit,l=u.x-(o.x-ex),r=o.x+o.w+ex-u.x,t=u.y-(o.y-ex),b=o.y+o.h+ex-u.y,m=Math.min(l,r,t,b);
    if(m===l){u.x=o.x-ex-.25;if(u.vx>0)u.vx=0}
    else if(m===r){u.x=o.x+o.w+ex+.25;if(u.vx<0)u.vx=0}
    else if(m===t){u.y=o.y-ex-.25;if(u.vy>0)u.vy=0}
    else{u.y=o.y+o.h+ex+.25;if(u.vy<0)u.vy=0}
    u.x=cl(u.x,20,WW-20);u.y=cl(u.y,20,WH-20);u.ai=0;corrected++;
  }
  if(showcaseSolidCandidate(u))showcaseRoadEscape(u);
  if(corrected)showcaseSolidCorrections+=corrected;return corrected;
}
function showcaseBoundaryStep(dt){
  if(!level||state!=='play'||paused)return;const active=unis[caps[0]];
  for(const u of unis){
    if(!u?.live){if(u)showcaseEdgeAge.delete(u.id);continue}
    if(!Number.isFinite(u.x)||!Number.isFinite(u.y)||!Number.isFinite(u.vx)||!Number.isFinite(u.vy)){
      u.x=cl(Number.isFinite(u.x)?u.x:WW/2,20,WW-20);u.y=cl(Number.isFinite(u.y)?u.y:WH/2,20,WH-20);u.vx=Number.isFinite(u.vx)?u.vx:0;u.vy=Number.isFinite(u.vy)?u.vy:0;u.ai=0;showcaseInvalidRecoveries++;
    }
    const bx=u.x,by=u.y;u.x=cl(u.x,20,WW-20);u.y=cl(u.y,20,WH-20);if(u.x!==bx||u.y!==by)showcaseBoundaryCorrections++;
    let p=showcasePerimeterInfo(u);
    if(p.left<=.01&&u.vx<0)u.vx=0;if(p.right<=.01&&u.vx>0)u.vx=0;if(p.top<=.01&&u.vy<0)u.vy=0;if(p.bottom<=.01&&u.vy>0)u.vy=0;
    showcaseProjectSolid(u);p=showcasePerimeterInfo(u);
    if(u===active){showcaseEdgeAge.set(u.id,0);continue}
    const speed=Math.hypot(u.vx,u.vy),risk=p.near&&(p.out||speed<52),age=risk?(showcaseEdgeAge.get(u.id)||0)+dt:Math.max(0,(showcaseEdgeAge.get(u.id)||0)-dt*2.5);showcaseEdgeAge.set(u.id,age);
    if(age>.18){const kick=90+Math.min(120,age*110);u.vx+=p.nx*kick;u.vy+=p.ny*kick;if(!u.order){u.tx=cl(u.x+p.nx*260,42,WW-42);u.ty=cl(u.y+p.ny*260,42,WH-42);u.ai=.5}}
  }
}
const showcaseBoundaryUpdateBase=update;
update=function(dt){const r=showcaseBoundaryUpdateBase(dt);showcaseBoundaryStep(dt);return r};
const showcaseBoundaryStartBase=startLevel;
startLevel=function(n){const r=showcaseBoundaryStartBase(n);showcaseEdgeAge.clear();return r};
globalThis.showcaseBoundaries={step:showcaseBoundaryStep,perimeter:showcasePerimeterInfo,overlap:showcaseSolidCandidate,get stats(){return{boundaryCorrections:showcaseBoundaryCorrections,solidCorrections:showcaseSolidCorrections,invalidRecoveries:showcaseInvalidRecoveries,roadEscapes:showcaseRoadEscapes,edgeAges:Object.fromEntries(showcaseEdgeAge)}}};
