// World-specific facade language for the unconstrained showcase edition.
const showcaseBuildingBase=drawTownBuilding;
function showcasePrismFacade(o,x,y,w,h){
  // Flower boxes and civic pennants make the baseline city warm and inhabited.
  if(o.k){
    X.fillStyle='#71513d';X.fillRect(x+14,y+h-34,52,8);
    for(let i=0;i<4;i++)townCircle(x+20+i*13,y+h-37,5,`hsl(${330+i*34} 76% 68%)`);
  }
  if(w>235){
    X.strokeStyle='#f5e4bd';X.lineWidth=3;X.beginPath();X.moveTo(x+18,y+32);X.lineTo(x+w-18,y+32);X.stroke();
    for(let i=0;i<5;i++){X.fillStyle=`hsl(${25+i*55} 70% 62%)`;X.beginPath();X.moveTo(x+30+i*(w-60)/4,y+33);X.lineTo(x+40+i*(w-60)/4,y+48);X.lineTo(x+50+i*(w-60)/4,y+33);X.closePath();X.fill()}
  }
}
function showcaseWashwaterFacade(o,x,y,w,h){
  // Weathered coastal trim, portholes and dock-house pilings.
  X.fillStyle='#e9f6f3';X.globalAlpha=.7;X.fillRect(x+7,y+20,w-14,5);X.globalAlpha=1;
  if(w>150){townCircle(x+26,y+42,8,'#2f6574');townCircle(x+w-26,y+42,8,'#2f6574');townCircle(x+26,y+42,4,'#9fe4ee');townCircle(x+w-26,y+42,4,'#9fe4ee')}
  X.fillStyle='#70543b';for(const px of[x+18,x+w-24])X.fillRect(px,y+h-5,6,20);
  if(o.k){
    X.strokeStyle='#315965';X.lineWidth=3;X.beginPath();X.moveTo(x+w-18,y+58);X.lineTo(x+w+17,y+58);X.stroke();
    townCircle(x+w+19,y+58,9,'#efcf6b');
  }
}
function showcaseCloudtopFacade(o,x,y,w,h){
  // Stone roof caps, vertical cyan glass and tiny ridge beacons.
  X.fillStyle='#c9d4d9';X.fillRect(x-3,y+12,w+6,8);
  X.fillStyle='#86d8e8';X.globalAlpha=.58;X.fillRect(x+w*.22,y+38,7,Math.max(24,h-86));X.fillRect(x+w*.76,y+38,7,Math.max(24,h-86));X.globalAlpha=1;
  X.strokeStyle='#556b79';X.lineWidth=4;X.beginPath();X.moveTo(x+w/2,y+12);X.lineTo(x+w/2,y-18);X.stroke();townCircle(x+w/2,y-22,5,'#ffd36f');
  if(w>220){X.strokeStyle='#7d929e';X.lineWidth=3;X.beginPath();X.moveTo(x+20,y+30);X.lineTo(x+w-20,y+30);X.stroke()}
}
drawTownBuilding=function(o,tall,d){
  showcaseBuildingBase(o,tall,d);
  if(!level||!o||o.hp<=0)return;
  let x=o.x,y=o.y,w=o.w,h=o.h;if(tall){y-=45;h+=45}
  X.save();
  if(zone===0)showcasePrismFacade(o,x,y,w,h);
  else if(zone===1)showcaseWashwaterFacade(o,x,y,w,h);
  else showcaseCloudtopFacade(o,x,y,w,h);
  X.restore();
};
