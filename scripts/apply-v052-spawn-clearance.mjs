import fs from'node:fs';
let p='src/core.js',s=fs.readFileSync(p,'utf8'),pos="[[270,270],[950,870],[1450,1500],[2000,360],[2570,950],[2920,1580]]";
let a="let bx=[60,420,980,1320,1760,2100,2600,2880],by=[55,320,780,980,1380,1580];",b="let pos="+pos+",bx=[60,420,980,1320,1760,2100,2600,2880],by=[55,320,780,980,1380,1580];";if(!s.includes(a))throw Error('building grammar anchor missing');s=s.replace(a,b);
a="||objs.some(o=>x<o.x+o.w+30&&x+w>o.x-30&&y<o.y+o.h+30&&y+h>o.y-30))continue";b="||objs.some(o=>x<o.x+o.w+30&&x+w>o.x-30&&y<o.y+o.h+30&&y+h>o.y-30)||pos.some(p=>Math.abs(p[0]-x-w/2)<w/2+60&&Math.abs(p[1]-y-h/2)<h/2+60))continue";if(!s.includes(a))throw Error('building exclusion anchor missing');s=s.replace(a,b);
a="let pos="+pos+";for(let i=0;i<6;i++)";b="for(let i=0;i<6;i++)";if(!s.includes(a))throw Error('late pos anchor missing');s=s.replace(a,b);fs.writeFileSync(p,s);
p='package.json';let j=JSON.parse(fs.readFileSync(p));j.version='0.52.0';fs.writeFileSync(p,JSON.stringify(j));console.log('staged v0.52 spawn-reserved building grammar');
