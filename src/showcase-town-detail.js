// v1.12 decorative street furniture and gardens. Pure rendering, no collision authority.
function showcaseBench(x,y,rot=0,wood='#8b6549',metal='#3c4650'){
  X.save();X.translate(x,y);X.rotate(rot);X.fillStyle=metal;X.fillRect(-29,7,5,18);X.fillRect(24,7,5,18);X.fillStyle=wood;rr(-34,-5,68,10,3);rr(-31,-18,62,9,3);X.strokeStyle=metal;X.lineWidth=3;X.beginPath();X.moveTo(-26,-4);X.lineTo(-26,10);X.moveTo(26,-4);X.lineTo(26,10);X.stroke();X.restore();
}
function showcaseLamp(x,y,shade='#ffd979',post='#4a5057'){
  X.fillStyle=post;X.fillRect(x-3,y-39,6,39);X.fillRect(x-8,y-2,16,4);townCircle(x,y-43,8,shade);X.globalAlpha=.16;townCircle(x,y-43,18,shade);X.globalAlpha=1;
}
function showcasePlanter(x,y,w=72,h=26,stone='#b8aa91',soil='#574637',flowers=showcaseGardenPalettes.prism,seed=1){
  showcaseGardenBed(x,y,w,h,{palette:flowers,seed,stone,soil,density:Math.max(6,w/9|0),rounded:6});
}
function showcaseBollard(x,y){X.fillStyle='#67513d';X.fillRect(x-4,y-15,8,23);townCircle(x,y-16,5,'#7e654b')}
function showcaseBarrel(x,y){X.fillStyle='#735034';rr(x-10,y-14,20,28,6);X.strokeStyle='#3f332a';X.lineWidth=2;X.beginPath();X.moveTo(x-9,y-5);X.lineTo(x+9,y-5);X.moveTo(x-9,y+6);X.lineTo(x+9,y+6);X.stroke()}
function showcaseHitch(x,y){X.fillStyle='#6b4933';X.fillRect(x-30,y-4,60,7);X.fillRect(x-25,y-4,6,25);X.fillRect(x+19,y-4,6,25)}
const showcaseTownDetailStreetBase=drawTownStreetDecor;
drawTownStreetDecor=function(){
  showcaseTownDetailStreetBase();if(!level)return;X.save();
  if(zone===0){
    // Civic square: benches, lamps, layered planters, and four proper flower gardens.
    for(const b of[[1040,780,0],[1435,780,Math.PI],[1040,1130,0],[1435,1130,Math.PI]])showcaseBench(...b,'#8d674d','#4f5860');
    for(const p of[[1004,744],[1473,744],[1004,1166],[1473,1166]])showcaseLamp(...p,'#ffe28a','#58606a');
    showcasePlanter(1110,748,96,32,'#c3b49d','#594a3b',showcaseGardenPalettes.prism,3);showcasePlanter(1368,748,96,32,'#c3b49d','#594a3b',showcaseGardenPalettes.prism,9);showcasePlanter(1110,1162,96,32,'#c3b49d','#594a3b',showcaseGardenPalettes.prism,15);showcasePlanter(1368,1162,96,32,'#c3b49d','#594a3b',showcaseGardenPalettes.prism,21);
    showcaseGardenBed(930,700,118,48,{palette:showcaseGardenPalettes.prism,seed:31,density:18});showcaseGardenBed(1555,700,118,48,{palette:showcaseGardenPalettes.prism,seed:37,density:18});showcaseGardenBed(930,1210,118,48,{palette:showcaseGardenPalettes.prism,seed:41,density:18});showcaseGardenBed(1555,1210,118,48,{palette:showcaseGardenPalettes.prism,seed:47,density:18});
  }else if(zone===1){
    // Boardwalk furniture, rope posts, dune-like flower planters, and weathered harbor detail.
    for(const y of[300,720,1140,1540]){showcaseBench(1270,y,Math.PI/2,'#8a6a4e','#365762');showcaseBollard(1300,y-34);showcaseBollard(1300,y+34);X.strokeStyle='#d8c7a2';X.lineWidth=3;X.beginPath();X.moveTo(1300,y-30);X.quadraticCurveTo(1315,y,1300,y+30);X.stroke()}
    for(const [i,y]of[500,980,1420].entries())showcasePlanter(1788,y,70,28,'#d6c49f','#5a4937',showcaseGardenPalettes.wash,61+i*7);
    showcaseGardenBed(1185,250,86,34,{palette:showcaseGardenPalettes.wash,seed:68,stone:'#c8b58d',soil:'#62513d',density:11});showcaseGardenBed(1185,1480,86,34,{palette:showcaseGardenPalettes.wash,seed:72,stone:'#c8b58d',soil:'#62513d',density:11});
  }else if(zone===2){
    // Gray public furniture with warm lamps and deliberate moss/lavender color islands.
    for(const b of[[720,470,.1],[1180,690,-.15],[1800,1040,.12],[2440,1290,-.1]])showcaseBench(...b,'#73787b','#343b41');
    for(const p of[[675,440],[1230,650],[1750,1000],[2490,1250]])showcaseLamp(...p,'#e9c678','#50575e');
    let i=0;for(const p of[[760,440],[1140,720],[1850,1010],[2390,1320]])showcasePlanter(...p,72,27,'#7e8589','#454c48',showcaseGardenPalettes.cloud,81+i++*5);
    showcaseGardenBed(1600,815,106,38,{palette:showcaseGardenPalettes.cloud,seed:104,stone:'#737b80',soil:'#414945',density:13});
  }else if(zone===3){
    // Frontier porches gain practical clutter plus sparse hardy desert blooms.
    for(const p of[[720,520],[1280,900],[2060,1180],[2550,620]])showcaseHitch(...p);
    for(const p of[[750,540],[1310,920],[2090,1200],[2580,640]])showcaseBarrel(...p);
    showcaseGardenBed(920,1370,76,30,{palette:showcaseGardenPalettes.frontier,seed:121,stone:'#765742',soil:'#5c4030',density:7});showcaseGardenBed(2230,420,76,30,{palette:showcaseGardenPalettes.frontier,seed:127,stone:'#765742',soil:'#5c4030',density:7});
  }
  X.restore();
};
globalThis.showcaseTownDetailVersion='v1.12';
