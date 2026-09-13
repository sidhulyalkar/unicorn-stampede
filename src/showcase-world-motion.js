// Post-js13k environmental motion and world identity.
// Loaded after showcase.js so it can layer motion on top of the static showcase grammar.
const showcaseMotionStreetBase=drawTownStreetDecor;
function showcaseSlowTime(scale=1){const reduced=globalThis.showcaseSettings?.reducedMotion;return reduced?0:clock*scale}
function showcasePrismMotion(){
  const t=showcaseSlowTime(1.7);X.save();
  // Civic plaza rings and animated festival standards.
  X.globalAlpha=.34;X.strokeStyle='#fff2b5';X.lineWidth=5;for(const r of[120,175,230]){X.beginPath();X.arc(1240,955,r,0,T);X.stroke()}
  X.globalAlpha=.9;for(let i=0;i<6;i++){const x=950+i*120,y=650+(i&1)*470,wave=Math.sin(t+i)*8;X.strokeStyle='#49576a';X.lineWidth=5;X.beginPath();X.moveTo(x,y);X.lineTo(x,y-92);X.stroke();X.fillStyle=`hsl(${i*55+18} 78% 63%)`;X.beginPath();X.moveTo(x,y-88);X.lineTo(x+34+wave,y-76);X.lineTo(x,y-58);X.closePath();X.fill()}
  // Formal gardens: clipped hedge beds, flower cores and pale gravel paths.
  for(const [x,y,rot] of[[1060,955,0],[1420,955,0],[1240,790,1],[1240,1120,1],[520,330,0],[2730,1450,0]]){
    X.save();X.translate(x,y);if(rot)X.rotate(Math.PI/2);X.fillStyle='#476c47';rr(-64,-25,128,50,20);X.fillStyle='#6d8b59';rr(-53,-17,106,34,16);X.fillStyle='#eee1bc';X.fillRect(-7,-28,14,56);
    for(let i=0;i<8;i++){const a=i*T/8;townCircle(Math.cos(a)*38,Math.sin(a)*12,6,`hsl(${326+i*25} 72% 70%)`)}X.restore();
  }
  // Petals give the gardens motion without adding collision noise.
  X.globalAlpha=.62;for(let i=0;i<20;i++){const x=(i*173+t*26)%WW,y=250+(i*197)%1300+Math.sin(t+i)*14;X.fillStyle=i&1?'#f8b8cc':'#f7df91';X.beginPath();X.ellipse(x,y,5,2,t*.1+i,0,T);X.fill()}
  X.restore();
}
function showcaseWashwaterMotion(){
  const t=showcaseSlowTime(.9);X.save();
  X.globalAlpha=.5;X.strokeStyle='#dff8ff';X.lineWidth=4;for(let y=30;y<WH;y+=85){const drift=Math.sin(t+y*.02)*18;X.beginPath();X.moveTo(1330+drift,y);X.quadraticCurveTo(1515,y+13,1725-drift,y);X.stroke()}
  X.globalAlpha=.95;for(let y=110;y<WH;y+=310){X.fillStyle='#795c42';X.fillRect(1260,y,105,18);X.fillRect(1690,y+120,105,18);for(let x of[1280,1338,1710,1768]){X.fillStyle='#624a36';X.fillRect(x,y+(x>1600?120:0),7,54)}}
  for(let i=0;i<4;i++){const q=(i/4+t*.045)%1,y=80+q*(WH-160),x=1430+(i&1)*165;X.fillStyle=i&1?'#f5d56c':'#f07b73';X.beginPath();X.moveTo(x-34,y);X.lineTo(x+34,y);X.lineTo(x+21,y+18);X.lineTo(x-24,y+18);X.closePath();X.fill();X.fillStyle='#f6f2de';X.beginPath();X.moveTo(x,y-2);X.lineTo(x,y-44);X.lineTo(x+29,y-8);X.closePath();X.fill();X.strokeStyle='#315c67';X.lineWidth=3;X.beginPath();X.moveTo(x,y-2);X.lineTo(x,y-48);X.stroke()}
  for(const x of[1300,1755])for(let y=90;y<WH;y+=240){townCircle(x,y,8,'#ffe69a');X.strokeStyle='#4a5960';X.lineWidth=3;X.beginPath();X.moveTo(x,y+8);X.lineTo(x,y+34);X.stroke()}
  X.restore();
}
function showcaseCloudtopMotion(){
  const t=showcaseSlowTime(.55);X.save();
  // Gloom comes from layered charcoal-blue fog rather than a bright sky wash.
  X.globalAlpha=.10;X.fillStyle='#d9dde0';for(let i=0;i<16;i++){const x=((i*310+t*95)%(WW+500))-250,y=70+(i*137)%1620;X.beginPath();X.ellipse(x,y,185+(i%3)*58,52+(i&1)*22,0,0,T);X.fill()}
  X.globalAlpha=.055;X.fillStyle='#30383f';for(let i=0;i<8;i++){const x=((i*470-t*60)%(WW+700))-250,y=180+(i*229)%1450;X.beginPath();X.ellipse(x,y,260,82,0,0,T);X.fill()}
  // Rain diagonals and reflected street glints sell the damp Seattle-inspired atmosphere.
  X.globalAlpha=.24;X.strokeStyle='#d6dde0';X.lineWidth=2;for(let i=0;i<52;i++){const x=(i*79+t*180)%WW,y=(i*137+t*330)%WH;X.beginPath();X.moveTo(x,y);X.lineTo(x-13,y+28);X.stroke()}
  for(const r of roads){X.globalAlpha=.12;X.fillStyle='#dfe5e7';if(r[2]>r[3])for(let x=r[0]+80;x<r[0]+r[2]-50;x+=320)X.fillRect(x,r[1]+r[3]-26,115,7);else for(let y=r[1]+80;y<r[1]+r[3]-50;y+=320)X.fillRect(r[0]+r[2]-26,y,7,115)}
  // Crosswind streaks reveal the gameplay force, but stay subdued against the gray streets.
  X.globalAlpha=.27;X.strokeStyle='#cbd5d9';X.lineWidth=4;const dir=typeof wind==='number'?wind:1;
  for(let i=0;i<11;i++){const y=150+i*145,x=((i*270+t*220*dir)%(WW+500))-250;X.beginPath();X.moveTo(x,y);X.lineTo(x+dir*120,y-20);X.stroke()}
  // Ridge beacons and moss planters are controlled color punctuation.
  X.globalAlpha=.95;for(const x of[410,870,1330,1790,2250,2710]){X.strokeStyle='#505b63';X.lineWidth=5;X.beginPath();X.moveTo(x,160);X.lineTo(x,94);X.stroke();const pulse=.75+(globalThis.showcaseSettings?.reducedMotion?0:.25*Math.sin(clock*4+x));X.globalAlpha=pulse;townCircle(x,88,8,'#d8a85d');X.globalAlpha=.95}
  for(const [x,y] of[[620,470],[1120,1280],[2050,470],[2840,1280]]){X.fillStyle='#4e6454';rr(x-38,y-12,76,24,8);for(let i=0;i<4;i++)townCircle(x-25+i*17,y-14,5,i===2?'#9d8bb2':'#78917a')}
  X.restore();
}
drawTownStreetDecor=function(){
  showcaseMotionStreetBase();if(!level)return;
  if(zone===0)showcasePrismMotion();else if(zone===1)showcaseWashwaterMotion();else if(zone===2)showcaseCloudtopMotion();
};
