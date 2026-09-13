// World-specific facade language for the unconstrained showcase edition.
const showcaseWorldDetailBuildingBase=drawTownBuilding;
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
  if(o.k){X.strokeStyle='#315965';X.lineWidth=3;X.beginPath();X.moveTo(x+w-18,y+58);X.lineTo(x+w+17,y+58);X.stroke();townCircle(x+w+19,y+58,9,'#efcf6b')}
}
function showcaseCloudtopFacade(o,x,y,w,h,d){
  // Seattle-gloom fantasy: concrete mass first, tiny warm/cool accents second.
  const tones=['#646a70','#5c6369','#70757a','#555d64'],tone=tones[(o.v||0)&3];
  X.fillStyle=tone;rr(x+4,y+18,w-8,Math.max(34,h-23),8);
  if(d){X.globalAlpha=Math.min(.36,d*.45);X.fillStyle='#2e3439';rr(x+4,y+18,w-8,Math.max(34,h-23),8);X.globalAlpha=1}
  X.fillStyle='#41494f';X.fillRect(x-2,y+12,w+4,11);
  X.strokeStyle='#858d92';X.lineWidth=2;for(let py=y+46;py<y+h-26;py+=32){X.beginPath();X.moveTo(x+9,py);X.lineTo(x+w-9,py);X.stroke()}
  const warm=((o.v||0)&1)!==0,glass=warm?'#d9b16f':'#86aeb8';
  X.fillStyle='#30373c';X.fillRect(x+15,y+h-67,46,38);X.fillRect(x+w-61,y+h-67,46,38);
  X.fillStyle=glass;X.fillRect(x+20,y+h-62,36,28);X.fillRect(x+w-56,y+h-62,36,28);
  X.fillStyle='#2f353a';X.fillRect(x+w/2-18,y+h-53,36,53);
  X.fillStyle='#c7cdd0';X.fillRect(x+6,y+5,w-12,5);
  X.fillStyle='#8baeb8';X.globalAlpha=.55;X.fillRect(x+w-17,y+28,6,Math.max(22,h-72));X.globalAlpha=1;
  const L=o.ln||N[shopName[o.k||0]]||'';
  if(L){const sw=Math.min(w-24,Math.max(90,L.length*9+22));X.fillStyle='#343b40';rr(x+w/2-sw/2,y+27,sw,25,4);X.fillStyle='#e9e6df';text(L,x+w/2,y+46,Math.max(9,Math.min(12,sw/(L.length*.72))),'center')}
  // Moss and restrained lavender provide small color islands against the gray.
  if((o.v||0)&1){X.fillStyle='#536b58';X.fillRect(x+13,y+h-23,50,7);for(let i=0;i<3;i++)townCircle(x+21+i*15,y+h-26,4,i===1?'#aa94bd':'#78977b')}
  if((o.k||0)>4){X.strokeStyle='#d7dcdf';X.lineWidth=3;X.beginPath();X.moveTo(x+w/2,y);X.lineTo(x+w/2,y-28);X.stroke();townCircle(x+w/2,y-22,5,'#ffd36f')}
}
function showcaseFrontierFacade(o,x,y,w,h,d){
  const boards=['#9a6340','#865638','#a86e45','#754a34'],wood=boards[(o.v||0)&3],L=o.ln||o.frontierName||'FRONTIER SHOP';
  // False-front western architecture intentionally covers the modern storefront grammar beneath it.
  X.fillStyle='#1f1713';X.globalAlpha=.22;rr(x+8,y+9,w-3,h,4);X.globalAlpha=1;
  X.fillStyle=wood;rr(x+3,y+14,w-6,Math.max(34,h-14),4);X.fillRect(x-2,y+7,w+4,28);
  if(d){X.globalAlpha=Math.min(.4,d*.5);X.fillStyle='#3d2820';rr(x+3,y+14,w-6,Math.max(34,h-14),4);X.globalAlpha=1}
  X.strokeStyle='#603d2b';X.lineWidth=2;for(let py=y+37;py<y+h-10;py+=22){X.beginPath();X.moveTo(x+5,py);X.lineTo(x+w-5,py);X.stroke()}
  const sw=Math.min(w-18,Math.max(86,L.length*9+24));X.fillStyle='#4c3022';rr(x+w/2-sw/2,y+20,sw,29,3);X.strokeStyle='#d7ae72';X.lineWidth=2;X.strokeRect(x+w/2-sw/2+3,y+23,sw-6,23);X.fillStyle='#f2d7a1';text(L,x+w/2,y+42,Math.max(9,Math.min(12,sw/(L.length*.72))),'center');
  X.fillStyle='#e6bb70';X.globalAlpha=.82;X.fillRect(x+18,y+h-65,38,30);X.fillRect(x+w-56,y+h-65,38,30);X.globalAlpha=1;
  X.fillStyle='#493024';X.fillRect(x+w/2-19,y+h-54,38,54);
  // Porch, posts and shade line make every building read as a frontier street frontage.
  X.fillStyle='#65432f';X.fillRect(x-8,y+h-8,w+16,10);X.fillRect(x+8,y+53,5,h-58);X.fillRect(x+w-13,y+53,5,h-58);X.fillRect(x-5,y+51,w+10,6);
  if(L.includes('SALOON')){X.fillStyle='#3f2a20';X.fillRect(x+w/2-29,y+h-49,27,42);X.fillRect(x+w/2+2,y+h-49,27,42);X.strokeStyle='#d3a96c';X.beginPath();X.moveTo(x+w/2-29,y+h-30);X.lineTo(x+w/2-2,y+h-36);X.moveTo(x+w/2+2,y+h-36);X.lineTo(x+w/2+29,y+h-30);X.stroke()}
  if(L==='WATER TOWER'){
    X.fillStyle='#574439';X.fillRect(x+w/2-42,y-27,8,47);X.fillRect(x+w/2+34,y-27,8,47);X.fillStyle='#82684e';X.beginPath();X.ellipse(x+w/2,y-38,48,15,0,0,T);X.fill();X.fillRect(x+w/2-48,y-39,96,34);X.fillStyle='#a98a66';X.beginPath();X.ellipse(x+w/2,y-40,48,14,0,0,T);X.fill();X.strokeStyle='#3c3028';X.lineWidth=3;X.beginPath();X.moveTo(x+w/2,y-56);X.lineTo(x+w/2,y-78);X.stroke();
  }
  if(L.includes('SHERIFF')){townCircle(x+22,y+68,10,'#d5aa52');X.fillStyle='#60482d';text('★',x+22,y+72,12,'center')}
}
drawTownBuilding=function(o,tall,d){
  showcaseWorldDetailBuildingBase(o,tall,d);
  if(!level||!o||o.hp<=0)return;
  let x=o.x,y=o.y,w=o.w,h=o.h;if(tall){y-=45;h+=45}
  X.save();
  if(zone===0)showcasePrismFacade(o,x,y,w,h);
  else if(zone===1)showcaseWashwaterFacade(o,x,y,w,h);
  else if(zone===2)showcaseCloudtopFacade(o,x,y,w,h,d);
  else if(zone===3)showcaseFrontierFacade(o,x,y,w,h,d);
  X.restore();
};
