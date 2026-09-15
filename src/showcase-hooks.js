// Showcase v1.16: one explicit extension seam for post-competition systems.
// It wraps the already-qualified legacy stack once, then newer modules register ordered listeners.
const showcaseV116Buckets=new Map(),showcaseV116Dispatches={};let showcaseV116HookSeq=0;
function showcaseV116On(event,id,fn,priority=0){
  if(typeof fn!=='function')throw Error('showcase hook '+event+' requires function');
  const list=showcaseV116Buckets.get(event)||[];if(list.some(x=>x.id===id))throw Error('duplicate showcase hook '+event+' / '+id);
  list.push({id,fn,priority,seq:showcaseV116HookSeq++});list.sort((a,b)=>b.priority-a.priority||a.seq-b.seq);showcaseV116Buckets.set(event,list);return()=>showcaseV116Off(event,id);
}
function showcaseV116Off(event,id){const list=showcaseV116Buckets.get(event);if(!list)return false;const n=list.findIndex(x=>x.id===id);if(n<0)return false;list.splice(n,1);return true}
function showcaseV116Emit(event,ctx){showcaseV116Dispatches[event]=(showcaseV116Dispatches[event]||0)+1;for(const h of [...(showcaseV116Buckets.get(event)||[])])h.fn(ctx);return ctx}
function showcaseV116Invoke(name,base,self,args){
  const ctx={name,args:[...args],result:undefined,error:null};showcaseV116Emit(name+':before',ctx);
  try{ctx.result=base.apply(self,ctx.args)}catch(error){ctx.error=error;showcaseV116Emit(name+':error',ctx);throw error}
  showcaseV116Emit(name+':after',ctx);return ctx.result;
}
const showcaseV116StartBase=startLevel;startLevel=function(...a){return showcaseV116Invoke('start',showcaseV116StartBase,this,a)};
const showcaseV116UpdateBase=update;update=function(...a){return showcaseV116Invoke('update',showcaseV116UpdateBase,this,a)};
const showcaseV116CycleBase=cycle;cycle=function(...a){return showcaseV116Invoke('cycle',showcaseV116CycleBase,this,a)};
const showcaseV116PowerBase=power;power=function(...a){return showcaseV116Invoke('power',showcaseV116PowerBase,this,a)};
const showcaseV116HitBase=hitObj;hitObj=function(...a){return showcaseV116Invoke('hit',showcaseV116HitBase,this,a)};
const showcaseV116WorldBase=world;world=function(...a){return showcaseV116Invoke('world',showcaseV116WorldBase,this,a)};
const showcaseV116EndBase=end;end=function(...a){return showcaseV116Invoke('end',showcaseV116EndBase,this,a)};
const showcaseV116DecorBase=drawTownStreetDecor;drawTownStreetDecor=function(...a){return showcaseV116Invoke('decor',showcaseV116DecorBase,this,a)};
const showcaseV116ObjsBase=drawObjs;drawObjs=function(...a){return showcaseV116Invoke('objects',showcaseV116ObjsBase,this,a)};
const showcaseV116PeopleBase=drawPeople;drawPeople=function(...a){return showcaseV116Invoke('people',showcaseV116PeopleBase,this,a)};
const showcaseV116FliesBase=drawFlies;drawFlies=function(...a){return showcaseV116Invoke('flies',showcaseV116FliesBase,this,a)};
function showcaseV116Listeners(event){return(showcaseV116Buckets.get(event)||[]).map(({id,priority})=>({id,priority}))}
function showcaseV116Snapshot(){const events={};for(const[k]of showcaseV116Buckets)events[k]=showcaseV116Listeners(k);return{version:'v1.16',events,dispatches:{...showcaseV116Dispatches}}}
globalThis.showcaseHooks={version:'v1.16',on:showcaseV116On,off:showcaseV116Off,emit:showcaseV116Emit,listeners:showcaseV116Listeners,snapshot:showcaseV116Snapshot};
