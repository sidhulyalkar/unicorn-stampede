const chains={
  startLevel:['_startLevel','_soloStart','_startW','_plusStart'],
  update:['_update','_soloUpdate','_updateW','_plusUpdate'],
  world:['_world','_w2','_soloWorldDraw'],
  hitObj:['_hitObj','_soloHit','_plusHit'],
  waveUp:['_waveUp','_plusWave'],
  moveAI:['_soloAI'],
  distractForce:['_soloDistract'],
  updateWorld:['_soloWorld'],
  draw:['_soloDraw'],
  crackWhip:['_crackW'],
  landmarkBoom:['_plusBoom']
};
function closeBrace(s,open){let d=0,q='',esc=0;for(let i=open;i<s.length;i++){let c=s[i],n=s[i+1];if(q){if(esc){esc=0;continue}if(c==='\\'){esc=1;continue}if(q==='`'&&c==='$'&&n==='{'){d++;i++;continue}if(c===q)q='';else if(q==='`'&&c==='}')d--;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c==='{')d++;else if(c==='}'&&!--d)return i}throw Error('unbalanced release wrapper')}
function one(s,name,aliases){let base=`function ${name}(`,p=s.indexOf(base);if(p<0)throw Error('release staticizer missing base '+name);s=s.slice(0,p+9)+name+'0'+s.slice(p+9+name.length);let prev=name+'0';for(let i=0;i<aliases.length;i++){let a=aliases[i],mark=`const ${a}=${name};${name}=function`,at=s.indexOf(mark);if(at<0)throw Error(`release staticizer missing ${name}/${a}`);let args=at+mark.length,open=s.indexOf('{',args),end=closeBrace(s,open);if(s[end+1]!==';')throw Error(`release staticizer tail mismatch ${name}/${a}`);let stage=i===aliases.length-1?name:name+(i+1),body=s.slice(args,end+1).replace(new RegExp(`\\b${a}\\b`,'g'),prev);s=s.slice(0,at)+`function ${stage}`+body+s.slice(end+2);prev=stage}return s}
export function staticizeWrappers(src){for(let [name,aliases] of Object.entries(chains))src=one(src,name,aliases);for(let aliases of Object.values(chains))for(let a of aliases)if(new RegExp(`\\b${a}\\b`).test(src))throw Error('release staticizer leaked '+a);return src}
