import{releaseSource}from'./release-prune.mjs';import{staticizeWrappers}from'./release-staticize.mjs';import{compactRepresentation}from'./release-represent.mjs';
const cuts=['drawParts();','updateParts(dt);','fx(o.x+o.w/2,o.y+o.h/2,18,180);','fx(u.x,u.y,28,220)','fx(unis[i].x,unis[i].y,18,150)','if(rng()<dt*10)fx(u.x,u.y,2,90)','fx(x,y,2,55)','fx(u.x,u.y,6+n*2,120);','fx(u.x,u.y,4+n,85);',"fx(x,y,l.k==='hall'?46:26,240);",'fx(c.x,c.y,8,120);','fx(h.x+h.w/2,h.y+h.h/2,60,420);','if(landWin===2&&rng()<dt*5)fx(R(WW),R(WH),8,220);'];
function remove(s,a){if(!s.includes(a))throw Error('submission particle anchor missing: '+a);return s.replace(a,'')}
export function submissionSource(raw){let s=releaseSource(raw);for(let a of cuts)s=remove(s,a);return compactRepresentation(staticizeWrappers(s))}
export const particleCuts=cuts;
