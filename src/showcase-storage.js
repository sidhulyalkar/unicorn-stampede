// Showcase-only resilient progress storage. Never touches the frozen js13k release.
// Opaque-origin uploads and signed-out guests retain progress for the active session.
(function(){
  'use strict';
  const values=new Map();
  const names=['ccIntro16','ccZone','ccMode','ccRun','ccHeat','ccC0','ccC1','ccC2','ccC3','unicornShowcaseSettingsV1','usMasteryV110'];
  function nativeGet(k){try{return localStorage.getItem(k)}catch{return null}}
  function nativeSet(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}
  function getItem(k){k=String(k);const n=nativeGet(k);return n===null?(values.has(k)?values.get(k):null):n}
  function setItem(k,v){k=String(k);v=String(v);values.set(k,v);nativeSet(k,v)}
  // The competition code uses localStorage[key] shorthand. Provide a bounded
  // fallback only when native storage throws, without changing its ordinary behavior.
  const sourceGet=S.g,sourceSet=S.s;
  S.g=k=>{try{const v=localStorage[k];return Number(v)||0}catch{return Number(getItem(k))||0}};
  S.s=(k,v)=>{setItem(k,v)};
  function snapshot(){
    const entries={};for(const k of names){const v=getItem(k);if(v!==null)entries[k]=v}
    return{version:1,entries};
  }
  function restore(value){
    if(!value||value.version!==1||!value.entries||Array.isArray(value.entries))return false;
    if(typeof state!=='undefined'&&state!=='title')return false;
    for(const k of names){
      const v=value.entries[k];
      if(typeof v==='string'&&v.length<30000)setItem(k,v);
    }
    if(typeof zone!=='undefined')zone=(S.g('ccZone')%4+4)%4;
    if(typeof mode!=='undefined')mode=(S.g('ccMode')%4+4)%4;
    if(globalThis.showcaseMastery?.reload)showcaseMastery.reload();
    if(globalThis.showcaseSettingsAPI){
      globalThis.showcaseSettings=showcaseLoadSettings();
      showcaseSaveSettings();
    }
    return true;
  }
  globalThis.showcaseStorage={getItem,setItem,snapshot,restore,
    get nativeAvailable(){try{const k='__unicorn_probe';localStorage.setItem(k,'1');localStorage.removeItem(k);return true}catch{return false}}};
})();