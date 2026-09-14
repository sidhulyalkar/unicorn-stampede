// Showcase surface renderer. Loaded immediately after render.js so later gameplay wrappers
// keep their normal composition while each world receives an intentional material palette.
const SHOWCASE_WORLD_PALETTES=[
  {name:'festival-garden',ground:'#738e6b',curb:'#aaa28a',road:'#394550',lane:'#e5c76d',accent:'#ee7898',accent2:'#63bfa8',glow:'#f7da82',shadow:'#26323a'},
  {name:'sea-glass-harbor',ground:'#c9b88c',curb:'#a99f86',road:'#3e5b61',lane:'#dfcd8b',accent:'#df7967',accent2:'#5eb3b5',glow:'#efd37d',shadow:'#293e42'},
  {name:'rain-city',ground:'#70767b',curb:'#9ca3a8',road:'#3c4247',lane:'#b8bec2',accent:'#d1a05a',accent2:'#7c9da7',glow:'#e8c77d',shadow:'#293137'},
  {name:'sunbaked-frontier',ground:'#b77749',curb:'#c78e60',road:'#6b4935',lane:'#d5a55e',accent:'#4fa39c',accent2:'#cf9857',glow:'#edc878',shadow:'#3a281f'}
];
function showcaseSurfaceZone(){return state==='title'?zone:(level?zone:0)}
function showcaseWorldPalette(){return SHOWCASE_WORLD_PALETTES[showcaseSurfaceZone()]||SHOWCASE_WORLD_PALETTES[0]}
let showcaseSurfaceCanvas=null,showcaseSurfaceCtx=null,showcaseSurfaceDirty=1,showcaseSurfaceBuilds=0;
function showcaseInvalidateSurface(){showcaseSurfaceDirty=1}
function showcaseBuildSurface(){
  const p=showcaseWorldPalette(),wz=showcaseSurfaceZone();
  if(!showcaseSurfaceCanvas||showcaseSurfaceCanvas.width!==WW||showcaseSurfaceCanvas.height!==WH){showcaseSurfaceCanvas=document.createElement('canvas');showcaseSurfaceCanvas.width=WW;showcaseSurfaceCanvas.height=WH;showcaseSurfaceCtx=showcaseSurfaceCanvas.getContext('2d')}
  const Q=showcaseSurfaceCtx;Q.setTransform(1,0,0,1,0,0);Q.clearRect(0,0,WW,WH);Q.fillStyle=p.ground;Q.fillRect(0,0,WW,WH);
  for(const r of roads){
    Q.fillStyle=p.curb;Q.fillRect(r[0]-5,r[1]-5,r[2]+10,r[3]+10);Q.fillStyle=p.road;Q.fillRect(...r);
    if(wz===2){Q.globalAlpha=.2;Q.fillStyle='#d6dcdf';if(r[2]>r[3])Q.fillRect(r[0]+8,r[1]+12,r[2]-16,8);else Q.fillRect(r[0]+12,r[1]+8,8,r[3]-16);Q.globalAlpha=1}
    Q.strokeStyle=p.lane;Q.lineWidth=3;Q.setLineDash(wz===2?[]:[28,28]);Q.beginPath();if(r[2]>r[3]){Q.moveTo(r[0],r[1]+r[3]/2);Q.lineTo(r[0]+r[2],r[1]+r[3]/2)}else{Q.moveTo(r[0]+r[2]/2,r[1]);Q.lineTo(r[0]+r[2]/2,r[1]+r[3])}Q.stroke();Q.setLineDash([]);
    if(wz===3){Q.globalAlpha=.26;Q.strokeStyle='#37271f';Q.lineWidth=4;Q.beginPath();if(r[2]>r[3]){let y=r[1]+r[3]/2;Q.moveTo(r[0],y-28);Q.lineTo(r[0]+r[2],y-28);Q.moveTo(r[0],y+28);Q.lineTo(r[0]+r[2],y+28)}else{let x=r[0]+r[2]/2;Q.moveTo(x-28,r[1]);Q.lineTo(x-28,r[1]+r[3]);Q.moveTo(x+28,r[1]);Q.lineTo(x+28,r[1]+r[3])}Q.stroke();Q.globalAlpha=1}
  }
  if(wz===0)for(let x of[760,1540,2320])for(let y of[540,1130]){Q.fillStyle='rgba(245,240,220,.72)';for(let k=0;k<5;k++){Q.fillRect(x+10+k*34,y+8,18,58);Q.fillRect(x+10+k*34,y+124,18,58)}}
  showcaseSurfaceDirty=0;showcaseSurfaceBuilds++;
}
world=function(){
  X.fillStyle='#0c1422';X.fillRect(0,0,W,H);X.save();X.translate(ox,oy);X.scale(z,z);if(showcaseSurfaceDirty)showcaseBuildSurface();X.drawImage(showcaseSurfaceCanvas,0,0);X.globalAlpha=.72;X.drawImage(PC,0,0,PW,PH,0,0,WW,WH);X.globalAlpha=1;drawTownStreetDecor();drawFlowers();drawObjs();drawUps();drawCars();drawPeople();drawFlies();for(const u of unis)if(u.live)trail(u);for(let i=0;i<unis.length;i++)if(unis[i].live)uni(unis[i],capSide(i));drawParts();X.restore();
};
globalThis.showcaseWorldPalettes=SHOWCASE_WORLD_PALETTES;globalThis.showcaseSurfaceStats=()=>({builds:showcaseSurfaceBuilds,dirty:!!showcaseSurfaceDirty,width:showcaseSurfaceCanvas?.width||0,height:showcaseSurfaceCanvas?.height||0});
