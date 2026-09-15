// Showcase-only performance layer. Keeps the rich art while moving invariant work off the hot path.
const SHOWCASE_GRID=320,SHOWCASE_GRID_PAD=128,showcaseObjectGrid=new Map();
let showcaseFrameMs=16.7,showcaseQuality=1,showcaseSlowFrames=0,showcaseFastFrames=0,showcaseObjectGridSource=null;
const showcaseGridKey=(x,y)=>y*64+x;
const showcasePersonBounds={halfW:18,top:12,bottom:46,pad:6};
function showcasePersonObstacleBounds(o){
  let top=o.y,bottom=o.y+o.h;
  if(o.t==='b')top-=20+(level&&zone>1?45:0);
  else if(o.t==='clock')top-=54;
  return{left:o.x-showcasePersonBounds.pad,right:o.x+o.w+showcasePersonBounds.pad,top:top-showcasePersonBounds.pad,bottom:bottom+showcasePersonBounds.pad};
}
function showcasePersonHitsObject(x,y,o){
  const b=showcasePersonObstacleBounds(o),p=showcasePersonBounds;
  return x+p.halfW>b.left&&x-p.halfW<b.right&&y+p.bottom>b.top&&y-p.top<b.bottom;
}
function showcaseBuildObjectGrid(){
  showcaseObjectGrid.clear();showcaseObjectGridSource=objs;
  for(const o of objs){
    const x0=Math.max(0,Math.floor((o.x-SHOWCASE_GRID_PAD)/SHOWCASE_GRID)),x1=Math.floor((o.x+o.w+SHOWCASE_GRID_PAD)/SHOWCASE_GRID),y0=Math.max(0,Math.floor((o.y-SHOWCASE_GRID_PAD)/SHOWCASE_GRID)),y1=Math.floor((o.y+o.h+SHOWCASE_GRID_PAD)/SHOWCASE_GRID);
    for(let gy=y0;gy<=y1;gy++)for(let gx=x0;gx<=x1;gx++){const k=showcaseGridKey(gx,gy),a=showcaseObjectGrid.get(k);a?a.push(o):showcaseObjectGrid.set(k,[o])}
  }
}
const showcasePersonBlockedBase=personBlocked;
personBlocked=function(x,y){
  // startLevel rebuilds objs before the spatial grid can be refreshed. During that short
  // lifecycle seam, use the authoritative object list so title/game pedestrians are settled
  // against the new town rather than a stale previous grid.
  if(showcaseObjectGridSource!==objs)return objs.some(o=>o.hp>0&&showcasePersonHitsObject(x,y,o));
  const a=showcaseObjectGrid.get(showcaseGridKey(Math.floor(x/SHOWCASE_GRID),Math.floor(y/SHOWCASE_GRID)));
  if(!a)return false;
  for(const o of a)if(o.hp>0&&showcasePersonHitsObject(x,y,o))return true;
  return false;
};
// Cloudtop and Frontier custom facades are complete buildings, so do not render the generic facade underneath them.
const showcaseDetailedBuilding=drawTownBuilding;
function showcaseDrawDetailedBuildingClean(o,tall,d){
  if(!o||o.hp<=0)return showcaseDetailedBuilding(o,tall,d);
  const k=o.k||0,house=!k&&!o.ln;
  if(house)return showcaseDetailedBuilding(o,tall,d);
  let x=o.x,y=o.y;if(tall)y-=45;
  const g=(k&1)&&k!==3,dotX=x+o.w/2,dotY=y+(g?23:15),circleBase=townCircle;
  townCircle=function(cx,cy,r,c){if(r===4&&Math.abs(cx-dotX)<.01&&Math.abs(cy-dotY)<.01)return;return circleBase(cx,cy,r,c)};
  try{return showcaseDetailedBuilding(o,tall,d)}finally{townCircle=circleBase}
}
drawTownBuilding=function(o,tall,d){
  if(!level||!o||o.hp<=0||zone<2)return showcaseDrawDetailedBuildingClean(o,tall,d);
  let x=o.x,y=o.y,w=o.w,h=o.h;if(tall){y-=45;h+=45}X.save();if(zone===2)showcaseCloudtopFacade(o,x,y,w,h,d);else showcaseFrontierFacade(o,x,y,w,h,d);X.restore();
};
function showcaseMotionDensity(n){return Math.max(1,Math.round(n*showcaseQuality))}
const showcasePerformanceStartBase=startLevel;
startLevel=function(n){const r=showcasePerformanceStartBase(n);showcaseBuildObjectGrid();showcaseInvalidateSurface();return r};
const showcasePerformanceUpdateBase=update;
update=function(dt){
  const ms=Math.max(1,dt*1000);showcaseFrameMs=showcaseFrameMs*.94+ms*.06;
  if(showcaseFrameMs>22){showcaseSlowFrames++;showcaseFastFrames=0}else if(showcaseFrameMs<18){showcaseFastFrames++;showcaseSlowFrames=0}else showcaseSlowFrames=showcaseFastFrames=0;
  if(showcaseSlowFrames>24){showcaseQuality=.72;showcaseSlowFrames=0}else if(showcaseFastFrames>90){showcaseQuality=1;showcaseFastFrames=0}
  return showcasePerformanceUpdateBase(dt);
};
globalThis.showcaseMotionDensity=showcaseMotionDensity;
globalThis.showcasePersonCollision={bounds:showcasePersonBounds,obstacle:showcasePersonObstacleBounds,intersects:showcasePersonHitsObject};
globalThis.showcasePerformance=()=>({frameMs:+showcaseFrameMs.toFixed(2),quality:showcaseQuality,gridBuckets:showcaseObjectGrid.size,surface:showcaseSurfaceStats(),facadeFastPath:level&&zone>=2});
