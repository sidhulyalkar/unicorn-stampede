function rep(s,a,b=''){if(!s.includes(a))throw Error('quality-fit anchor missing: '+a.slice(0,70));return s.replace(a,b)}
function peopleDraw(s){let a=s.indexOf('function drawPeople(){'),b=s.indexOf('function trail(',a);if(a<0||b<0)throw Error('quality-fit people draw anchors missing');let f="function drawPeople(){for(let p of people){townCircle(p.x,p.y,9,`hsl(${p.h} 45% 70%)`);X.fillStyle='#263242';X.fillRect(p.x-2,p.y+8,4,25)}}\n";return s.slice(0,a)+f+s.slice(b)}
function peopleMove(s){let a=s.indexOf('function updatePeople(dt){'),b=s.indexOf('function updateParts',a);if(a<0||b<0)throw Error('quality-fit people move anchors missing');let f="function updatePeople(dt){for(let p of people){p.t-=dt;if(p.t<0)p.t=R(3,.9),p.vx+=R(45,-45),p.vy+=R(35,-35);let x=p.x,y=p.y;p.x=cl(x+p.vx*dt,18,WW-18);p.y=cl(y+p.vy*dt,18,WH-18);if(personBlocked(p.x,p.y))p.x=x,p.y=y,p.vx=-p.vx/2,p.vy=-p.vy/2,p.t=0;p.vx*=Math.pow(.12,dt);p.vy*=Math.pow(.12,dt)}}\n";s=s.slice(0,a)+f+s.slice(b);return rep(s,'cool:R(6),','')}
export function qualityFit(s){
 s=rep(s,"if((x/560|0)&1){X.fillStyle='#795640';X.fillRect(x+30,r[1]-22,38,6);X.fillRect(x+34,r[1]-14,30,5)}",'');
 s=rep(s,"for(let i=2;i--;){let a=x+14+i*(w-66);X.fillStyle='#f7ead8';X.fillRect(a-3,z-3,40,36);X.fillStyle='#9fe8ef';X.fillRect(a,z,34,30);X.fillStyle='#fff7';X.fillRect(a+16,z,2,30)}","X.fillStyle='#9fe8ef';for(let i=2;i--;)X.fillRect(x+14+i*(w-66),z,34,30);");
 s=rep(s,"for(let i=5,s=(w-20)/5;i--;){X.fillStyle=i&1?'#f8ead8':c;X.fillRect(x+10+i*s,y+47,s+1,17)}","X.fillStyle=c;X.fillRect(x+10,y+47,w-20,17);");
 s=rep(s,"townCircle(x+20,y+h-8,12,'#47794b');townCircle(x+w-20,y+h-8,12,'#527d50');","townCircle(x+20,y+h-8,12,'#47794b');");
 s=rep(s,"X.fillStyle=`hsl(${H} 65% 48%)`;k&1?townCircle(x+18,y+h-13,7):X.fillRect(x+10,y+h-18,18,10)",'');
 return peopleMove(peopleDraw(s))
}
