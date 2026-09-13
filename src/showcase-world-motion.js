// Post-js13k environmental motion and world identity.
// Loaded after showcase.js so it can layer motion on top of the static showcase grammar.
const showcaseMotionStreetBase=drawTownStreetDecor;
function showcaseSlowTime(scale=1){
  const reduced=globalThis.showcaseSettings?.reducedMotion;
  return reduced?0:clock*scale;
}
function showcasePrismMotion(){
  const t=showcaseSlowTime(1.7);
  X.save();
  // Civic plaza rings and animated festival standards.
  X.globalAlpha=.34;
  X.strokeStyle='#fff2b5';X.lineWidth=5;
  for(const r of[120,175,230]){X.beginPath();X.arc(1240,955,r,0,T);X.stroke()}
  X.globalAlpha=.9;
  for(let i=0;i<6;i++){
    const x=950+i*120,y=650+(i&1)*470,wave=Math.sin(t+i)*8;
    X.strokeStyle='#49576a';X.lineWidth=5;X.beginPath();X.moveTo(x,y);X.lineTo(x,y-92);X.stroke();
    X.fillStyle=`hsl(${i*55+18} 78% 63%)`;X.beginPath();X.moveTo(x,y-88);X.lineTo(x+34+wave,y-76);X.lineTo(x,y-58);X.closePath();X.fill();
  }
  // Flower medians make the open civic grid feel inhabited.
  for(const [x,y] of[[1060,955],[1420,955],[1240,790],[1240,1120]]){
    townCircle(x,y,16,'#406f43');
    for(let i=0;i<5;i++){const a=i*T/5;townCircle(x+Math.cos(a)*12,y+Math.sin(a)*12,5,`hsl(${330+i*35} 80% 70%)`)}
  }
  X.restore();
}
function showcaseWashwaterMotion(){
  const t=showcaseSlowTime(.9);
  X.save();
  // Working waterfront: piers, tide stripes, boats and dock lamps.
  X.globalAlpha=.5;X.strokeStyle='#dff8ff';X.lineWidth=4;
  for(let y=30;y<WH;y+=85){const drift=Math.sin(t+y*.02)*18;X.beginPath();X.moveTo(1330+drift,y);X.quadraticCurveTo(1515,y+13,1725-drift,y);X.stroke()}
  X.globalAlpha=.95;
  for(let y=110;y<WH;y+=310){
    X.fillStyle='#795c42';X.fillRect(1260,y,105,18);X.fillRect(1690,y+120,105,18);
    for(let x of[1280,1338,1710,1768]){X.fillStyle='#624a36';X.fillRect(x,y+(x>1600?120:0),7,54)}
  }
  for(let i=0;i<4;i++){
    const q=(i/4+t*.045)%1,y=80+q*(WH-160),x=1430+(i&1)*165;
    X.fillStyle=i&1?'#f5d56c':'#f07b73';
    X.beginPath();X.moveTo(x-34,y);X.lineTo(x+34,y);X.lineTo(x+21,y+18);X.lineTo(x-24,y+18);X.closePath();X.fill();
    X.fillStyle='#f6f2de';X.beginPath();X.moveTo(x,y-2);X.lineTo(x,y-44);X.lineTo(x+29,y-8);X.closePath();X.fill();
    X.strokeStyle='#315c67';X.lineWidth=3;X.beginPath();X.moveTo(x,y-2);X.lineTo(x,y-48);X.stroke();
  }
  for(const x of[1300,1755])for(let y=90;y<WH;y+=240){townCircle(x,y,8,'#ffe69a');X.strokeStyle='#4a5960';X.lineWidth=3;X.beginPath();X.moveTo(x,y+8);X.lineTo(x,y+34);X.stroke()}
  X.restore();
}
function showcaseCloudtopMotion(){
  const t=showcaseSlowTime(.55);
  X.save();
  // Layered fog banks create depth without changing collision geometry.
  X.globalAlpha=.13;X.fillStyle='#f4fbff';
  for(let i=0;i<14;i++){
    const x=((i*310+t*115)%(WW+500))-250,y=80+(i*137)%1600;
    X.beginPath();X.ellipse(x,y,170+(i%3)*55,45+(i&1)*20,0,0,T);X.fill();
  }
  // Crosswind streaks visually reveal the same wind force used by gameplay.
  X.globalAlpha=.32;X.strokeStyle='#d9f3ff';X.lineWidth=5;
  const dir=typeof wind==='number'?wind:1;
  for(let i=0;i<11;i++){
    const y=150+i*145,x=((i*270+t*220*dir)%(WW+500))-250;
    X.beginPath();X.moveTo(x,y);X.lineTo(x+dir*120,y-20);X.stroke();
  }
  // Ridge beacons make the vertical city read as infrastructure rather than gray barriers.
  X.globalAlpha=.95;
  for(const x of[410,870,1330,1790,2250,2710]){
    X.strokeStyle='#526c7d';X.lineWidth=5;X.beginPath();X.moveTo(x,160);X.lineTo(x,94);X.stroke();
    const pulse=.75+(globalThis.showcaseSettings?.reducedMotion?0:.25*Math.sin(clock*4+x));
    X.globalAlpha=pulse;townCircle(x,88,8,'#ffd36f');X.globalAlpha=.95;
  }
  X.restore();
}
drawTownStreetDecor=function(){
  showcaseMotionStreetBase();
  if(!level)return;
  if(zone===0)showcasePrismMotion();
  else if(zone===1)showcaseWashwaterMotion();
  else showcaseCloudtopMotion();
};
