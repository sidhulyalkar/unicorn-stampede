// High-detail civic landmarks for the expanded edition. Drawn after base objects so
// fountains and gardens have depth without changing collision geometry.
const showcaseCivicObjectsBase=drawObjs;
function showcaseDrawPrismFountain(o){
  const cx=o.x+o.w/2,cy=o.y+o.h/2,r=o.w/2,t=globalThis.showcaseSettings?.reducedMotion?0:clock;
  X.save();
  X.strokeStyle='#eee4cf';X.lineWidth=7;X.beginPath();X.arc(cx,cy,r*.88,0,T);X.stroke();
  X.strokeStyle='#b8dfe8';X.lineWidth=4;X.globalAlpha=.8;
  for(let i=0;i<4;i++){
    const a=i*T/4,ex=cx+Math.cos(a)*r*.48,ey=cy+Math.sin(a)*r*.48,lift=34+Math.sin(t*3+i)*6;
    X.beginPath();X.moveTo(cx,cy-6);X.quadraticCurveTo((cx+ex)/2,(cy+ey)/2-lift,ex,ey);X.stroke();
  }
  X.globalAlpha=.5;X.fillStyle='#e8fbff';for(let i=0;i<8;i++){const a=i*T/8+t*.35;townCircle(cx+Math.cos(a)*r*.34,cy+Math.sin(a)*r*.34,3,'#e8fbff')}
  X.globalAlpha=1;townCircle(cx,cy,15,'#ded4bd');townCircle(cx,cy-4,8,'#f2ead8');
  // A planted ring turns the fountain into a proper civic garden instead of an isolated prop.
  for(let i=0;i<14;i++){const a=i*T/14,px=cx+Math.cos(a)*r*1.15,py=cy+Math.sin(a)*r*1.15;townCircle(px,py,7,i%3===0?'#f2afc7':i%3===1?'#f1d472':'#91c991')}
  X.restore();
}
drawObjs=function(){
  showcaseCivicObjectsBase();
  if(!level||zone!==0)return;
  for(const o of objs)if(o.t==='fountain')showcaseDrawPrismFountain(o);
};
