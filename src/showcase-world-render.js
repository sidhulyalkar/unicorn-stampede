// Showcase surface renderer. Loaded immediately after render.js so later gameplay wrappers
// keep their normal composition while each world receives an intentional material palette.
function showcaseWorldPalette(){
  if(!level)return{ground:'#78986d',curb:'#969888',road:'#39424d',lane:'#c8b76d'};
  if(zone===0)return{ground:'#78986d',curb:'#969888',road:'#39424d',lane:'#c8b76d'};
  if(zone===1)return{ground:'#d2bc92',curb:'#aa9c80',road:'#3f565e',lane:'#d4bd78'};
  if(zone===2)return{ground:'#767b80',curb:'#a9adb0',road:'#454a4f',lane:'#c5c8ca'};
  return{ground:'#b9814f',curb:'#cb9867',road:'#79543a',lane:'#dcb06a'};
}
world=function(){
  X.fillStyle='#0c1422';X.fillRect(0,0,W,H);X.save();X.translate(ox,oy);X.scale(z,z);
  const p=showcaseWorldPalette();X.fillStyle=p.ground;X.fillRect(0,0,WW,WH);
  for(const r of roads){
    X.fillStyle=p.curb;X.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10);X.fillStyle=p.road;X.fillRect(...r);
    if(level&&zone===2){
      // Damp Seattle-like street sheen: cool edge reflections instead of saturated pavement.
      X.globalAlpha=.22;X.fillStyle='#cbd1d4';
      if(r[2]>r[3])X.fillRect(r[0]+8,r[1]+12,r[2]-16,8);else X.fillRect(r[0]+12,r[1]+8,8,r[3]-16);
      X.globalAlpha=1;
    }
    X.strokeStyle=p.lane;X.lineWidth=3;X.setLineDash(level&&zone===2?[]:[28,28]);X.beginPath();
    if(r[2]>r[3]){X.moveTo(r[0],r[1]+r[3]/2);X.lineTo(r[0]+r[2],r[1]+r[3]/2)}
    else{X.moveTo(r[0]+r[2]/2,r[1]);X.lineTo(r[0]+r[2]/2,r[1]+r[3])}
    X.stroke();X.setLineDash([]);
    if(level&&zone===3){
      // Twin wagon ruts make Frontier roads read as packed dirt instead of asphalt.
      X.globalAlpha=.28;X.strokeStyle='#38281f';X.lineWidth=4;X.beginPath();
      if(r[2]>r[3]){let y=r[1]+r[3]/2;X.moveTo(r[0],y-28);X.lineTo(r[0]+r[2],y-28);X.moveTo(r[0],y+28);X.lineTo(r[0]+r[2],y+28)}
      else{let x=r[0]+r[2]/2;X.moveTo(x-28,r[1]);X.lineTo(x-28,r[1]+r[3]);X.moveTo(x+28,r[1]);X.lineTo(x+28,r[1]+r[3])}
      X.stroke();X.globalAlpha=1;
    }
  }
  if(level&&!zone)for(let x of[760,1540,2320])for(let y of[540,1130]){X.fillStyle='rgba(245,240,220,.72)';for(let k=0;k<5;k++){X.fillRect(x+10+k*34,y+8,18,58);X.fillRect(x+10+k*34,y+124,18,58)}}
  X.globalAlpha=.72;X.drawImage(PC,0,0,PW,PH,0,0,WW,WH);X.globalAlpha=1;
  drawTownStreetDecor();drawFlowers();drawObjs();drawUps();drawCars();drawPeople();drawFlies();
  for(const u of unis)if(u.live)trail(u);for(let i=0;i<unis.length;i++)if(unis[i].live)uni(unis[i],capSide(i));drawParts();X.restore();
};
