// High-detail civic landmarks. Pure rendering, no collision geometry changes.
const showcaseCivicObjectsBase=drawObjs;
function showcaseDrawPrismFountain(o){
  const cx=o.x+o.w/2,cy=o.y+o.h/2,r=o.w/2,t=globalThis.showcaseSettings?.reducedMotion?0:clock;X.save();
  // Paved apron and segmented stone basin.
  X.globalAlpha=.22;X.fillStyle='#f5edd9';X.beginPath();X.arc(cx,cy,r*1.22,0,T);X.fill();X.globalAlpha=1;
  X.strokeStyle='#d9ccb3';X.lineWidth=10;X.beginPath();X.arc(cx,cy,r*.93,0,T);X.stroke();X.strokeStyle='#f4ead5';X.lineWidth=3;X.beginPath();X.arc(cx,cy,r*.83,0,T);X.stroke();
  for(let i=0;i<12;i++){const a=i*T/12;X.strokeStyle='#bda98e';X.lineWidth=2;X.beginPath();X.moveTo(cx+Math.cos(a)*r*.89,cy+Math.sin(a)*r*.89);X.lineTo(cx+Math.cos(a)*r*.99,cy+Math.sin(a)*r*.99);X.stroke()}
  X.globalAlpha=.32;X.fillStyle='#76cfe1';X.beginPath();X.arc(cx,cy,r*.77,0,T);X.fill();X.globalAlpha=1;
  // Four arcing jets, center plume, and moving sparkle points.
  X.strokeStyle='#c4edf4';X.lineWidth=4;X.globalAlpha=.9;for(let i=0;i<4;i++){const a=i*T/4,ex=cx+Math.cos(a)*r*.48,ey=cy+Math.sin(a)*r*.48,lift=34+Math.sin(t*3+i)*6;X.beginPath();X.moveTo(cx,cy-7);X.quadraticCurveTo((cx+ex)/2,(cy+ey)/2-lift,ex,ey);X.stroke()}X.globalAlpha=1;
  townCircle(cx,cy,17,'#d7ccb4');townCircle(cx,cy-5,10,'#efe5d1');X.strokeStyle='#d8f7ff';X.lineWidth=3;X.beginPath();X.moveTo(cx,cy-10);X.quadraticCurveTo(cx-8,cy-42,cx,cy-54);X.quadraticCurveTo(cx+8,cy-42,cx,cy-10);X.stroke();
  for(let i=0;i<10;i++){const a=i*T/10+t*.32;townCircle(cx+Math.cos(a)*r*.36,cy+Math.sin(a)*r*.36,2.8,'#effdff')}
  // Dense flower ring with leafy undergrowth and small stone gaps.
  for(let i=0;i<18;i++){const a=i*T/18,px=cx+Math.cos(a)*r*1.16,py=cy+Math.sin(a)*r*1.16;townCircle(px,py+3,7,'#5f8a60');townCircle(px,py-2,4,i%4===0?'#ef91b5':i%4===1?'#efcf62':i%4===2?'#8dcf9e':'#91cce1')}
  X.restore();
}
drawObjs=function(){showcaseCivicObjectsBase();if(!level||zone!==0)return;for(const o of objs)if(o.t==='fountain')showcaseDrawPrismFountain(o)};
