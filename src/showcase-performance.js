// Showcase-only performance layer. Keeps the rich art while moving invariant work off the hot path.
const SHOWCASE_GRID=320,showcaseObjectGrid=new Map();
let showcaseFrameMs=16.7,showcaseQuality=1,showcaseSlowFrames=0,showcaseFastFrames=0;
const showcaseGridKey=(x,y)=>y*64+x;
function showcaseBuildObjectGrid(){
  showcaseObjectGrid.clear();
  for(const o of objs){
    const x0=Math.max(0,Math.floor((o.x-48)/SHOWCASE_GRID)),x1=Math.floor((o.x+o.w+48)/SHOWCASE_GRID),y0=Math.max(0,Math.floor((o.y-48)/SHOWCASE_GRID)),y1=Math.floor((o.y+o.h+48)/SHOWCASE_GRID);
    for(let gy=y0;gy<=y1;gy++)for(let gx=x0;gx<=x1;gx++){const k=showcaseGridKey(gx,gy),a=showcaseObjectGrid.get(k);a?a.push(o):showcaseObjectGrid.set(k,[o])}
  }
}
const showcasePersonBlockedBase=personBlocked;
personBlocked=function(x,y){
  const a=showcaseObjectGrid.get(showcaseGridKey(Math.floor(x/SHOWCASE_GRID),Math.floor(y/SHOWCASE_GRID)));
  if(!a)return false;
  for(const o of a)if(o.hp>0&&x>o.x-16&&x<o.x+o.w+16&&y>o.y-16&&y<o.y+o.h+42)return true;
  return false;
};
// Cloudtop and Frontier custom facades are complete buildings, so do not render the generic facade underneath them.
const showcaseDetailedBuilding=drawTownBuilding;
drawTownBuilding=function(o,tall,d){
  if(!level||!o||o.hp<=0||zone<2)return showcaseDetailedBuilding(o,tall,d);
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
globalThis.showcasePerformance=()=>({frameMs:+showcaseFrameMs.toFixed(2),quality:showcaseQuality,gridBuckets:showcaseObjectGrid.size,surface:showcaseSurfaceStats(),facadeFastPath:level&&zone>=2});
