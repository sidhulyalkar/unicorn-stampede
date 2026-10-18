// Showcase-only progress storage. Safe in Bounty's opaque-origin game iframe.
// Cloud hydration merges earned progress, never silently rolls a new run backwards.
(function(){
  'use strict';
  const keys=['ccIntro16','ccZone','ccMode','ccRun','ccHeat','ccC0','ccC1','ccC2','ccC3',
    'unicornShowcaseSettingsV1','usMasteryV110'];
  const progressKeys=new Set(['ccIntro16','ccRun','ccHeat','ccC0','ccC1','ccC2','ccC3']);
  const values=new Map();
  let revision=0;
  function nativeGet(k){try{return localStorage.getItem(k)}catch{return null}}
  function nativeSet(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}
  function getItem(k){
    k=String(k);
    const native=nativeGet(k);
    return native===null?(values.has(k)?values.get(k):null):native;
  }
  function setItem(k,v){
    k=String(k);v=String(v);
    if(getItem(k)!==v)revision++;
    values.set(k,v);nativeSet(k,v);
  }
  // Compact game code uses both getItem and localStorage[k].
  S.g=k=>{const v=getItem(k);return Number(v)||0};
  S.s=(k,v)=>setItem(k,v);
  function snapshot(){
    const entries=Object.create(null);
    for(const key of keys){const val=getItem(key);if(val!==null)entries[key]=val}
    return{version:1,entries};
  }
  function parseMastery(value){
    try{
      const obj=JSON.parse(value);
      if(!obj||!Array.isArray(obj.worlds)||obj.worlds.length>4)return null;
      return obj;
    }catch{return null}
  }
  function positiveBest(...times){
    const good=times.map(Number).filter(v=>Number.isFinite(v)&&v>0);
    return good.length?Math.min(...good):0;
  }
  function mergeMastery(remote,local){
    const a=parseMastery(remote),b=parseMastery(local);
    if(!a)return local||null;
    if(!b)return remote;
    return JSON.stringify({version:1,worlds:Array.from({length:4},(_,i)=>{
      const x=a.worlds[i]||{},y=b.worlds[i]||{};
      const finite=n=>Number.isFinite(+n)?+n:0;
      return{
        mask:((finite(x.mask)|0)|(finite(y.mask)|0))&7,
        wins:Math.max(0,Math.trunc(finite(x.wins)),Math.trunc(finite(y.wins))),
        bestFlair:Math.max(0,Math.trunc(finite(x.bestFlair)),Math.trunc(finite(y.bestFlair))),
        bestTime:positiveBest(x.bestTime,y.bestTime)
      };
    })});
  }
  function progressNumber(v){const n=Number(v);return Number.isFinite(n)?Math.max(0,Math.min(1e8,Math.trunc(n))):0}
  // Baseline captures values at cloud-read start, so an in-flight user's setting
  // changes win over stale remote preferences. Earned progress is monotonic.
  function restore(value,baseline){
    if(!value||value.version!==1||!value.entries||typeof value.entries!=='object'||
      Array.isArray(value.entries)||state!=='title')return false;
    const remote=value.entries,initial=baseline?.entries||Object.create(null);
    for(const key of keys){
      if(!Object.prototype.hasOwnProperty.call(remote,key))continue;
      const incoming=remote[key];
      if(typeof incoming!=='string'||incoming.length>30000)continue;
      const local=getItem(key);
      let merged=incoming;
      if(key==='usMasteryV110'){
        merged=mergeMastery(incoming,local);
      }else if(progressKeys.has(key)){
        merged=String(Math.max(progressNumber(incoming),progressNumber(local)));
      }else if(key==='ccMode'||key==='ccZone'){
        if(progressNumber(incoming)>(key==='ccZone'?3:3))continue;
        if(local!==null&&local!==initial[key])merged=local;
      }else if(key==='unicornShowcaseSettingsV1'){
        if(local!==null&&local!==initial[key])merged=local;
        else{try{const settings=JSON.parse(incoming);if(!settings||typeof settings!=='object'||Array.isArray(settings))continue}catch{continue}}
      }
      if(merged!==null)setItem(key,merged);
    }
    if(typeof zone!=='undefined')zone=(S.g('ccZone')%4+4)%4;
    if(typeof mode!=='undefined')mode=(S.g('ccMode')%4+4)%4;
    globalThis.showcaseMastery?.reload?.();
    if(globalThis.showcaseSettingsAPI){
      globalThis.showcaseSettings=showcaseLoadSettings();
      showcaseSaveSettings();
    }
    globalThis.showcaseMenuAPI?.refresh?.();
    return true;
  }
  globalThis.showcaseStorage={getItem,setItem,snapshot,restore,mergeMastery,
    get revision(){return revision},
    get nativeAvailable(){
      try{
        const k='__unicorn_probe';
        localStorage.setItem(k,'1');localStorage.removeItem(k);return true;
      }catch{return false}
    }
  };
})();