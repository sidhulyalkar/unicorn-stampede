import fs from 'node:fs';
import vm from'node:vm';
function game(){
 const H={};const on=(n,f,c)=>(H[n]??=[]).push({f,c:!!c});
 const ctx=new Proxy({createLinearGradient:()=>({addColorStop(){}}),measureText:()=>({width:10})},{get:(o,k)=>k in o?o[k]:(()=>{})});
 const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:1280,height:720}),addEventListener:(n,f,c)=>on('c:'+n,f,c)};
 const node=()=>({gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}},frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},start(){},stop(){}});class AudioContext{constructor(){this.currentTime=0;this.destination={}}createGain(){return node()}createOscillator(){return node()}}
 const box={console,Math,Date,Uint8Array,AudioContext,localStorage:{},document:{getElementById:()=>canvas,createElement:()=>({width:0,height:0,getContext:()=>ctx})},addEventListener:(n,f,c)=>on(n,f,c),requestAnimationFrame:()=>{}};vm.createContext(box);vm.runInContext(['core.js','herd.js','render.js','ui.js','top10.js','polish.js','hud12.js','whip.js','worlds.js','expansion.js'].map(f=>fs.readFileSync('src/'+f,'utf8')).join('\n'),box);
 const ev=s=>vm.runInContext(s,box),fire=(n,e={})=>{let E={code:'',repeat:false,button:0,clientX:0,clientY:0,preventDefault(){},stopImmediatePropagation(){this.stop=1},...e};for(const h of [...(H[n]||[])].sort((a,b)=>b.c-a.c)){h.f(E);if(E.stop)break}};
 const press=()=>{fire('c:mousemove',{clientX:ev('(unis[caps[0]].x+100)*z+ox'),clientY:ev('unis[caps[0]].y*z+oy')});fire('c:mousedown')},click=()=>{press();ev('update(.12)')};return{ev,fire,press,click,box};
}
{
 const {ev,fire,box}=game();ev("state='play'");fire('keydown',{code:'KeyS',ctrlKey:true});if(ev('K.KeyS'))throw Error('ctrl leak');let p=0;box.onbeforeunload({preventDefault(){p++}});if(!p||typeof box.onerror!=='function')throw Error('safety');
}
{
 const {ev,fire}=game();ev("state='title'");fire('keydown',{code:'KeyC'});if(!ev('guide')||ev('state')!=='title')throw Error('C must open controls without starting');fire('keydown',{code:'Enter'});if(ev('state')!=='title'||!ev('guide'))throw Error('controls page must swallow play keys');fire('keydown',{code:'KeyC'});if(ev('guide'))throw Error('C must close controls');
}
{
 const {ev,fire}=game();ev("S.s('ccIntro10',1);state='title'");fire('keydown',{code:'Enter'});if(ev('level')!==0||ev('state')!=='play')throw Error('fresh solo tutorial not forced');if(ev('caps[0]')!==0||ev('caps[1]')!==-1||ev('unis.filter(u=>u.live).length')!==2)throw Error('tutorial must begin with two unicorns and one captain');
}
{
 const {ev,fire,press}=game();ev('startLevel(0)');let bak=ev('LM[0].os[0].hp');ev('hitObj(unis[0],LM[0].os[0],999)');if(ev('LM[0].os[0].hp')!==bak)throw Error('bakery must wait for final tutorial beat');fire('keydown',{code:'ShiftLeft'});if(ev('caps[0]')!==1||ev('intro.step')!==0)throw Error('Shift must be free before the tutorial asks for it');fire('keydown',{code:'KeyD'});ev('updateWorld(.1)');if(ev('intro.step')!==1)throw Error('WASD lesson must follow whichever unicorn is active');fire('keyup',{code:'KeyD'});press();fire('keydown',{code:'Space'});if(ev('unis[1].power')!==1||ev('unis[1].dash')>0||ev('intro.step')!==1||!ev("msg.includes('2X')"))throw Error('one whip must not dash');press();if(ev('unis[1].power')!==2||ev('intro.step')!==2||ev('intro.o')!==1)throw Error('two whips must arm tutorial dash');fire('keydown',{code:'Space'});if(ev('unis[1].power')!==0||ev('intro.step')!==3||ev('unis[1].dash')<=0)throw Error('two-whip tutorial dash must launch');fire('keydown',{code:'ShiftLeft'});if(ev('caps[0]')!==0||ev('intro.step')!==4||ev('unis[1].order')<=0)throw Error('Shift must hand off and leave the previous unicorn running');fire('keydown',{code:'KeyD'});ev('updateWorld(.12)');fire('keyup',{code:'KeyD'});if(ev('intro.step')!==5||ev('suggested')!==1||ev('unis[1].distract')<.5)throw Error('mini-town must distract the handed-off unicorn');fire('keydown',{code:'ShiftLeft'});if(ev('caps[0]')!==1||ev('intro.step')!==6)throw Error('Shift must answer the attention recommendation');fire('keydown',{code:'KeyD'});ev('updateWorld(.1)');fire('keyup',{code:'KeyD'});if(ev('intro.step')!==7||!ev('intro.rescue'))throw Error('taking control must teach distraction rescue');for(let i=0;i<2;i++)press();if(ev('unis[1].power')!==2||ev('intro.step')!==8)throw Error('final two-whip bakery dash charge');fire('keydown',{code:'Space'});if(ev('unis[1].dash')<=0||ev('intro.step')!==8)throw Error('final bakery dash must launch at two whips');ev('hitObj(unis[1],LM[0].os[0],999);update(.016)');if(ev('state')!=='play'||ev('intro.step')!==9||ev('unis.filter(u=>u.live).length')!==6)throw Error('bakery smash must unleash all six in the mini-town');for(let i=0;i<2;i++)press();if(ev('unis[caps[0]].power')<2)throw Error('whip must remain live during six-herd intro burst');fire('keydown',{code:'Space'});if(ev('unis[caps[0]].dash')<=0||ev('unis[caps[0]].power')!==0)throw Error('two-whip dash must remain live during six-herd intro burst');ev('update(5.1)');if(ev('level')!==1||ev('state')!=='play'||ev('unis.filter(u=>u.live).length')!==4||!ev("S.g('ccIntro16')"))throw Error('big town must open with a readable four-unicorn herd');
}
{
 const {ev,fire}=game();ev('startLevel(1)');if(ev('unis.filter(u=>u.live).length')!==4||!ev("lmText.includes('HERD 4/6')"))throw Error('real runs must start with four and advertise staged herd growth');let seen=new Set([ev('caps[0]')]);for(let i=0;i<3;i++){fire('keydown',{code:'ShiftLeft'});seen.add(ev('caps[0]'))}if(seen.size!==4)throw Error('Shift must freely visit the opening four');fire('keydown',{code:'ShiftLeft'});if(ev('caps[0]')!==0)throw Error('four-herd Shift cycle must wrap');
}
{
 const {ev}=game();ev('startLevel(1);unis[1].x=20;unis[1].y=20;unis[1].order=4;unis[1].ox=-1;unis[1].oy=-1;updateWorld(.05)');if(ev('unis[1].order')>1.6||ev('unis[1].ox')<=0||ev('unis[1].oy')<=0)throw Error('unattended corner unicorn must recover inward');
}
{
 const {ev,fire}=game();ev('startLevel(1);waveUp(2)');if(ev('wave')!==1||ev('unis.filter(u=>u.live).length')!==4)throw Error('fifth unicorn must not arrive before two landmarks');ev('LM[0].os.forEach(o=>o.hp=0);LM[1].os.forEach(o=>o.hp=0);waveUp(2)');if(ev('wave')!==2||ev('unis.filter(u=>u.live).length')!==5||!ev("msg.includes('COMET')")||ev('cleaners.length')!==2)throw Error('two landmarks must release Comet and act2 cleanup');if(ev('unis.filter(u=>u.live&&capSide(u.id)).length')!==1)throw Error('more than one captain');ev('paintStamp(unis[0],unis[0].x,unis[0].y,45);unis[0].vx=140;unis[0].vy=0;unis[0].a=0;unis[4].cool=12;suggested=bestIdle()');if(ev('suggested')!==4||!ev('roadAt(unis[0])'))throw Error('AI suggestion/highway state');fire('keydown',{code:'ShiftLeft'});if(ev('caps[0]')!==1||ev('suggested')!==4||ev('unis[0].order')<5||!(ev('dmask')&16))throw Error('manual cycle should ignore but preserve AI suggestion');ev('unis[4].cool=15;suggested=bestIdle()');fire('keydown',{code:'ShiftRight'});if((ev('dmask')&48)!==48)throw Error('second manual switch not registered');ev('waveUp(3)');if(ev('wave')!==2||ev('unis.filter(u=>u.live).length')!==5)throw Error('manual switching alone must not unleash sixth unicorn');ev('LM.slice(0,-1).forEach(l=>l.os.forEach(o=>o.hp=0));waveUp(3)');if(ev('wave')!==3||ev('unis.filter(u=>u.live).length')!==6||ev('cleaners.length')!==4||!ev("msg.includes('BUMPER')"))throw Error('four landmarks must unleash final sixth unicorn and full emergency');
}
{
 const {ev,click,fire}=game();ev('startLevel(1)');for(let i=0;i<5;i++)click();if(ev('unis[caps[0]].power')!==5||ev('chains')<1)throw Error('five whips should fill max dash and preserve mastery chain');let c=ev('caps[0]'),last=0;for(let n=1;n<6;n++){ev(`unis[${c}].power=${n};unis[${c}].dash=0`);fire('keydown',{code:'Space'});let d=ev(`unis[${c}].dash`);if(n===1){if(d||ev(`unis[${c}].power`)!==1)throw Error('one-whip dash must stay locked')}else{if(d<=last||ev(`unis[${c}].power`)!==0||ev('caps[0]')!==c)throw Error(n+'-whip dash must fire, scale, consume charge, and never auto-switch');last=d}}if(last>.56)throw Error('five-whip dash duration regression');
}
{
 const {ev}=game();ev('startLevel(1);for(let q of unis){q.x=q.y=0}');let ch=ev("LM.find(l=>l.k==='clock').os[0]"),hp=ch.hp;ev("var o=LM.find(l=>l.k==='clock').os[0];unis[0].x=o.x+o.w/2;unis[0].y=o.y+o.h/2;hitObj(unis[0],o,30)");if(ch.hp!==hp||!ev("msg.includes('RALLY 1/2')"))throw Error('Clock Tower must teach two-unicorn rally');ev("var o=LM.find(l=>l.k==='clock').os[0];unis[1].x=o.x+o.w/2+20;unis[1].y=o.y+o.h/2;hitObj(unis[0],o,30)");if(ch.hp>=hp)throw Error('two nearby unicorns must unlock Clock Tower damage');
}
{
 const {ev}=game();ev('startLevel(1)');let t=ev('timeLeft');ev('hitObj(unis[0],LM[0].os[0],999)');if(ev('timeLeft')<t+5.9||!ev("lmText.includes('+6s')"))throw Error('outer landmarks must earn time-bank bonus');ev('LM.slice(0,-1).forEach(l=>l.os.forEach(o=>o.hp=0));waveUp(3)');let hp=ev('LM[4].os[0].hp');ev('hitObj(unis[0],LM[4].os[0],999)');if(ev('LM[4].os[0].hp')!==hp||!ev("msg.includes('28% CHAOS')"))throw Error('town hall chaos gate');ev("painted=PW*PH*.4;var o=LM[4].os[0];for(let q of unis){q.x=q.y=0}unis[0].x=o.x+o.w/2;unis[0].y=o.y+o.h/2;unis[1].x=o.x+o.w/2+20;unis[1].y=o.y+o.h/2;hitObj(unis[0],o,10)");if(ev('LM[4].os[0].hp')!==hp||!ev("msg.includes('RALLY 2/3')"))throw Error('Town Hall must require a three-unicorn rally');ev("var o=LM[4].os[0];unis[3].x=o.x+o.w/2-20;unis[3].y=o.y+o.h/2;hitObj(unis[0],o,10)");if(ev('LM[4].os[0].hp')>=hp)throw Error('three nearby unicorns must unlock Town Hall damage');ev('stamp=6;cleaners[0].spray=0;updateCleaners(.01)');if(ev('cleaners[0].spray')>.17)throw Error('adaptive cleanup');
}
{
 const {ev}=game();ev('startLevel(1);paintStamp(unis[0],400,400,80)');let p=ev('painted');ev('eraseStamp(400,400,50)');if(ev('painted')>=p)throw Error('cleanup erasure');
}
{
 const {ev,fire}=game();ev("S.s('ccIntro16',1);S.s('ccC0',1);state='title';zone=0");fire('keydown',{code:'KeyD'});if(ev('zone')!==1||ev("S.g('ccZone')")!==1)throw Error('campaign world select');
}
{
 const {ev}=game();ev("startLevel(1);landWin=1;state='end';startLevel(1)");if(ev('zone')!==1||ev('timeLeft')!==112||ev('cleaners.length')!==2||Math.abs(ev('cleaners[0].v'))<190)throw Error('washwater must remix cleanup pressure');ev("landWin=1;chains=2;painted=PW*PH*.65");if(ev('grade()')!==3)throw Error('washwater crowns');
}
{
 const {ev,click}=game();ev("startLevel(1);landWin=1;state='end';startLevel(1);landWin=1;state='end';startLevel(1)");if(ev('zone')!==2||ev('timeLeft')!==108)throw Error('cloudtop unlock');click();if(ev('unis[caps[0]].tapT')>.39)throw Error('cloudtop tighter whip window');
}
{
 const {ev}=game();ev("S.s('ccC2',1);S.s('ccHeat',0);startLevel(1)");if(!ev('plus')||ev('heat')!==0||ev('timeLeft')!==114||ev('cleaners.length')!==1||!ev("lmText.includes('HEAT 1')"))throw Error('Stampede+ Heat 1 unlock');if(Math.abs(ev('chaos()')-.28)>1e-6)throw Error('Heat 1 chaos target');ev('victoryT=.01;landWin=1;update(.02)');if(ev("S.g('ccHeat')")!==1)throw Error('winning must advance Heat');
}
{
 const {ev}=game();ev("S.s('ccC2',1);S.s('ccHeat',5);startLevel(1)");if(ev('heat')!==5||ev('timeLeft')!==109||ev('cleaners.length')!==2||Math.abs(ev('chaos()')-.33)>1e-6)throw Error('Heat ladder must compound time, cleanup and chaos pressure');
}
let ws=fs.readFileSync('src/whip.js','utf8'),es=fs.readFileSync('src/expansion.js','utf8'),rs=fs.readFileSync('src/render.js','utf8'),hs=fs.readFileSync('src/herd.js','utf8');if(!ws.includes('X.arc(-7,7,14+i*7,.2,5.6)')||!ws.includes('quadraticCurveTo')||ws.includes('*700-56')||!ws.includes('whip.l*520'))throw Error('snap whip regression');if(!ws.includes("if(n<2){msg='WHIP 2X → DASH'")||ws.includes("msg='FOLLOW LESSON'"))throw Error('two-whip dash contract regression');if(!rs.includes('u.h+120')||!hs.includes('f.r+155')||!es.includes("lmText+=' • +6s'")||!es.includes('FINAL CLEANUP')||!es.includes('paintPct()>=stageGoal&&(dmask&15)===15')||!es.includes("msg='RALLY '+n+'/'+k")||!es.includes("msg=w===2?'COMET JOINS"))throw Error('mane/distraction/takeover/staged-herd regression');
if(!fs.readFileSync('src/style.css','utf8').includes('cursor:none'))throw Error('native cursor not hidden');
console.log('headless v0.28 staged herd + rally mastery + reliable 2+ dash: PASS');
