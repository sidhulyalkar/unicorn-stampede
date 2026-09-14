// v1.11 decorative street furniture. Pure rendering, no collision or gameplay authority.
function showcaseBench(x,y,rot=0,wood='#8b6549',metal='#3c4650'){
  X.save();X.translate(x,y);X.rotate(rot);X.fillStyle=metal;X.fillRect(-29,7,5,18);X.fillRect(24,7,5,18);X.fillStyle=wood;rr(-34,-5,68,10,3);rr(-31,-18,62,9,3);X.strokeStyle=metal;X.lineWidth=3;X.beginPath();X.moveTo(-26,-4);X.lineTo(-26,10);X.moveTo(26,-4);X.lineTo(26,10);X.stroke();X.restore();
}
function showcaseLamp(x,y,shade='#ffd979',post='#4a5057'){
  X.fillStyle=post;X.fillRect(x-3,y-39,6,39);X.fillRect(x-8,y-2,16,4);townCircle(x,y-43,8,shade);X.globalAlpha=.16;townCircle(x,y-43,18,shade);X.globalAlpha=1;
}
function showcasePlanter(x,y,w=72,h=26,stone='#b8aa91',soil='#574637',flowers=['#ff8daf','#f3d469','#8bd7c2']){
  X.fillStyle=stone;rr(x-w/2,y-h/2,w,h,6);X.fillStyle=soil;rr(x-w/2+5,y-h/2+4,w-10,h-9,4);for(let i=0;i<6;i++){const px=x-w*.34+i*w*.136,py=y-h*.16-((i&1)?3:0);X.strokeStyle='#52704f';X.lineWidth=2;X.beginPath();X.moveTo(px,py+8);X.lineTo(px,py-2);X.stroke();townCircle(px,py-4,4,flowers[i%flowers.length])}
}
function showcaseBollard(x,y){X.fillStyle='#67513d';X.fillRect(x-4,y-15,8,23);townCircle(x,y-16,5,'#7e654b')}
function showcaseBarrel(x,y){X.fillStyle='#735034';rr(x-10,y-14,20,28,6);X.strokeStyle='#3f332a';X.lineWidth=2;X.beginPath();X.moveTo(x-9,y-5);X.lineTo(x+9,y-5);X.moveTo(x-9,y+6);X.lineTo(x+9,y+6);X.stroke()}
function showcaseHitch(x,y){X.fillStyle='#6b4933';X.fillRect(x-30,y-4,60,7);X.fillRect(x-25,y-4,6,25);X.fillRect(x+19,y-4,6,25)}
const showcaseTownDetailStreetBase=drawTownStreetDecor;
drawTownStreetDecor=function(){
  showcaseTownDetailStreetBase();if(!level)return;X.save();
  if(zone===0){
    // Civic square: paired benches, warm lamps, and layered beds frame the plaza without blocking it.
    for(const b of[[1040,780,0],[1435,780,Math.PI],[1040,1130,0],[1435,1130,Math.PI]])showcaseBench(...b,'#8d674d','#4f5860');
    for(const p of[[1004,744],[1473,744],[1004,1166],[1473,1166]])showcaseLamp(...p,'#ffe28a','#58606a');
    showcasePlanter(1110,748,92,30);showcasePlanter(1368,748,92,30);showcasePlanter(1110,1162,92,30);showcasePlanter(1368,1162,92,30);
  }else if(zone===1){
    // Boardwalk furniture and rope posts make the harbor edge feel used rather than painted on.
    for(const y of[300,720,1140,1540]){showcaseBench(1270,y,Math.PI/2,'#8a6a4e','#365762');showcaseBollard(1300,y-34);showcaseBollard(1300,y+34);X.strokeStyle='#d8c7a2';X.lineWidth=3;X.beginPath();X.moveTo(1300,y-30);X.quadraticCurveTo(1315,y,1300,y+30);X.stroke()}
    for(const y of[500,980,1420])showcasePlanter(1788,y,62,24,'#d6c49f','#5a4937',['#f28c7d','#f0d77a','#75c7c4']);
  }else if(zone===2){
    // Gray public furniture with warm lamps and tiny moss/lavender color islands.
    for(const b of[[720,470,.1],[1180,690,-.15],[1800,1040,.12],[2440,1290,-.1]])showcaseBench(...b,'#73787b','#343b41');
    for(const p of[[675,440],[1230,650],[1750,1000],[2490,1250]])showcaseLamp(...p,'#e9c678','#50575e');
    for(const p of[[760,440],[1140,720],[1850,1010],[2390,1320]])showcasePlanter(...p,66,24,'#7e8589','#454c48',['#9db492','#a995bd','#7ea6ae']);
  }else if(zone===3){
    // Frontier porches gain practical clutter: hitch rails, barrels, troughs, and dry scrub planters.
    for(const p of[[720,520],[1280,900],[2060,1180],[2550,620]])showcaseHitch(...p);
    for(const p of[[750,540],[1310,920],[2090,1200],[2580,640]])showcaseBarrel(...p);
    X.fillStyle='#6b503b';for(const p of[[920,1370],[2230,420]]){rr(p[0]-34,p[1]-10,68,20,5);X.fillStyle='#7fa06a';for(let i=-2;i<=2;i++)townCircle(p[0]+i*11,p[1]-11-Math.abs(i)*2,5,'#789261');X.fillStyle='#6b503b'}
  }
  X.restore();
};
globalThis.showcaseTownDetailVersion='v1.11';
