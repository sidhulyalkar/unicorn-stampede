// v1.12 procedural garden grammar. Rendering only, deterministic, and collision-free.
const showcaseGardenPalettes={
  prism:['#f08fb4','#f1cf62','#8fd0a2','#8ecde3','#b69ad0'],
  wash:['#ef927f','#efd47a','#7cc5bf','#d9a9c0'],
  cloud:['#a896bc','#8da9b0','#a9bd99','#d4ba7d'],
  frontier:['#ce8061','#d9b25f','#a78270','#8ba274']
};
const showcaseGardenFrac=n=>n-Math.floor(n),showcaseGardenHash=(seed,i)=>showcaseGardenFrac(Math.sin(seed*91.73+i*47.11)*43758.5453);
function showcaseFlower(x,y,s,palette,seed=1){
  const c=palette[(seed*7|0)%palette.length],leaf='#557a56',stemH=7+s*3;X.strokeStyle='#4f744f';X.lineWidth=Math.max(1.2,s*.55);X.beginPath();X.moveTo(x,y+stemH);X.lineTo(x,y);X.stroke();
  X.fillStyle=leaf;X.beginPath();X.ellipse(x-s*1.5,y+stemH*.55,s*1.8,s*.75,-.5,0,T);X.fill();X.beginPath();X.ellipse(x+s*1.45,y+stemH*.35,s*1.7,s*.7,.5,0,T);X.fill();
  for(let k=0;k<5;k++){const a=k*T/5,px=x+Math.cos(a)*s*1.8,py=y+Math.sin(a)*s*1.8;townCircle(px,py,s*1.25,c)}townCircle(x,y,s*.85,'#f5d66f');
}
function showcaseGardenBed(x,y,w,h,{palette=showcaseGardenPalettes.prism,seed=1,stone='#c7b79d',soil='#584739',density=14,rounded=9}={}){
  X.save();X.fillStyle='#0002';rr(x-w/2+3,y-h/2+4,w,h,rounded);X.fillStyle=stone;rr(x-w/2,y-h/2,w,h,rounded);X.fillStyle=soil;rr(x-w/2+6,y-h/2+5,w-12,h-10,Math.max(4,rounded-3));
  // Pebble edging makes beds read as designed civic spaces rather than colored rectangles.
  X.fillStyle='#e3d8c4';for(let i=0;i<Math.max(4,w/18|0);i++){const px=x-w*.42+i*(w*.84/Math.max(1,(w/18|0)-1));townCircle(px,y+h*.33,2.2+(i&1), '#dfd2bc')}
  for(let i=0;i<density;i++){const rx=showcaseGardenHash(seed,i*2),ry=showcaseGardenHash(seed,i*2+1),px=x-w*.39+rx*w*.78,py=y-h*.24+ry*h*.38,s=1.7+showcaseGardenHash(seed+3,i)*1.6;townCircle(px,py+5,s*2.1,i%3?'#668864':'#59765d');showcaseFlower(px,py,s,palette,seed+i*.37)}
  X.restore();
}
function showcaseGardenRing(cx,cy,r,count=24,palette=showcaseGardenPalettes.prism,seed=1){
  X.save();for(let i=0;i<count;i++){const a=i*T/count,wiggle=(showcaseGardenHash(seed,i)-.5)*8,rrr=r+wiggle,px=cx+Math.cos(a)*rrr,py=cy+Math.sin(a)*rrr,s=1.8+(i%3)*.35;townCircle(px,py+5,5.5,i&1?'#648765':'#58785c');showcaseFlower(px,py,s,palette,seed+i*.41)}X.restore();
}
globalThis.showcaseGardens={palettes:showcaseGardenPalettes,flower:showcaseFlower,bed:showcaseGardenBed,ring:showcaseGardenRing,hash:showcaseGardenHash};
