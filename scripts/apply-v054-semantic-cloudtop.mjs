import fs from'node:fs';
let p='src/render.js',s=fs.readFileSync(p,'utf8');
function r(a,b){if(!s.includes(a))throw Error('render anchor missing: '+a.slice(0,80));s=s.replace(a,()=>b)}function ra(a,b){if(!s.includes(a))throw Error('render fragment missing: '+a.slice(0,80));s=s.split(a).join(b)}
r("X.stroke();X.setLineDash([])}if(level&&!zone)","X.stroke();X.setLineDash([]);if(level*zone>1)for(let q of[38,r[2]-42])X.fillStyle='#999',X.fillRect(r[0]+q,r[1],4,r[3])}if(level&&!zone)");
r("function drawObjs(){let shops=zone===1?BN:['BAKERY','BANK','BOOKS','CAFE','FLORIST'];","function drawObjs(){let f=level*zone>1,shops=level&&zone===1?BN:['BAKERY','BANK','BOOKS','CAFE','FLORIST'];");
r("text(o.ln||'MARKET',o.x+o.w/2,o.y+o.h-14,16,'center')","text(o.ln||(f?'FARMERS':'MARKET'),o.x+o.w/2,o.y+o.h-14,16,'center')");
ra("let d=1-o.hp/o.max,k=(o.hue/72|0)%5,x=o.x,y=o.y,w=o.w,h=o.h,n=k+3,g=k&1||k>3;","let d=1-o.hp/o.max,k=(o.hue/72|0)%5,x=o.x,y=o.y,w=o.w,h=o.h,g=k&1||k>3;if(f)y-=45,h+=45;");
ra("for(let i=n;i--;){X.fillStyle=`hsl(${o.hue+i*30} 55% ${i%2?70:58}%)`;X.fillRect(x+10+i*(w-20)/n,y+55+g*14,12+(k&1)*6,h-100-g*14);if(!g)X.fillRect(x+i*w/n,y+35,w/n,18)}","");
ra("if(d){X.fillStyle=`hsla(${o.hue+130} 90% 60%/${.15+d*.48})`;X.fillRect(x,y+h*(1-d),w,h*d)}X.fillStyle='#fff';","if(d){X.fillStyle=`hsla(${o.hue+130} 90% 60%/${.15+d*.48})`;X.fillRect(x,y+h*(1-d),w,h*d)}X.fillStyle='#fff';text(f&&k==1?'<>':f&&k==4?'Y':['()','$','[]','~','*'][k],x+w/2,y+h*.52,30,'center');");
r("text(o.ln||shops[k],x+w/2,y+h-14,13,'center')","text(o.ln||(f&&k==1?'STARTUP':f&&k==4?'YOGA':shops[k]),x+w/2,y+h-14,13,'center')");
r("X.fillStyle=c.bus?'#e99f49':['#e95d63','#5aaee8','#e6c85b'][c.col];","X.fillStyle=c.bus?level*zone>1?'#a43b4f':'#e99f49':['#e95d63','#5aaee8','#e6c85b'][c.col];");
r("X.fillStyle='#172233';if(c.dir)","X.fillStyle=level*zone>1&&!c.bus&&c.col==1?'#7ff':'#172233';if(c.dir)");
fs.writeFileSync(p,s);
p='scripts/smoke.mjs';s=fs.readFileSync(p,'utf8');if(!s.includes("!rs.includes('n=k+3')"))throw Error('legacy facade assertion missing');s=s.replace("!rs.includes('n=k+3')",()=>"!rs.includes('STARTUP')");fs.writeFileSync(p,s);
p='scripts/v047-waterfront-smoke.mjs';s=fs.readFileSync(p,'utf8');if(!s.includes("\"o.ln||'MARKET'\""))throw Error('legacy market render marker missing');s=s.replace("\"o.ln||'MARKET'\"",()=>"\"o.ln||(f?'FARMERS':'MARKET')\"");fs.writeFileSync(p,s);
p='package.json';let j=JSON.parse(fs.readFileSync(p,'utf8'));j.version='0.54.0';let t=j.scripts.test;if(!t.includes('v054-semantic-cloudtop-smoke.mjs'))t=t.replace('&& node --check scripts/v053-conquest-menu-smoke.mjs','&& node --check scripts/v053-conquest-menu-smoke.mjs && node --check scripts/v054-semantic-cloudtop-smoke.mjs').replace('&& node scripts/v053-conquest-menu-smoke.mjs && node scripts/prune-audit.mjs','&& node scripts/v053-conquest-menu-smoke.mjs && node scripts/v054-semantic-cloudtop-smoke.mjs && node scripts/prune-audit.mjs');j.scripts.test=t;fs.writeFileSync(p,JSON.stringify(j));
console.log('staged compact v0.54 semantic buildings + SF Cloudtop visuals; render-only gameplay separation');
