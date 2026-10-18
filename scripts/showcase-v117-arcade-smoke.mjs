// v1.17 contract checks against optional host lifecycle and contextual coach, no browser packages needed.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function harness(file){
  const listeners=new Map(),hooks=new Map(),t={now:100};
  let appended=null,coachPanel=null,cycles=0;
  const doc={
    hidden:false,
    head:{append(node){appended=node}},
    body:{append(node){coachPanel=node}},
    createElement(tag){
      if(tag==='script')return{async:false,src:'',onload:null,onerror:null};
      if(tag==='aside'){
        const head={textContent:''},copy={textContent:''};
        return{hidden:true,innerHTML:'',setAttribute(){},
          querySelector(s){return s==='strong'?head:copy}};
      }
      throw Error('unexpected element '+tag);
    }
  };
  const ctx=vm.createContext({
    console,document:doc,Date:{now:()=>t.now},
    state:'title',level:0,paused:0,score:0,clock:0,goal:'LANDMARKS 0/4',
    objective:()=>ctx.goal,
    cycle:()=>{cycles++},
    showcaseHooks:{on(name,id,fn){const arr=hooks.get(name)||[];arr.push(fn);hooks.set(name,arr)}},
    addEventListener(name,fn){const arr=listeners.get(name)||[];arr.push(fn);listeners.set(name,arr)},
  });
  vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
  return{ctx,t,doc,hooks,events:listeners,get appended(){return appended},
    get panel(){return coachPanel},get cycles(){return cycles},
    emit(name,arg){for(const fn of hooks.get(name)||[])fn(arg)},
    key(arg){const event={code:'KeyQ',repeat:false,ctrlKey:false,metaKey:false,altKey:false,
      target:null,preventDefault(){this.prevented=true},stopImmediatePropagation(){this.stopped=true},...arg};
      for(const fn of listeners.get('keydown')||[])fn(event);return event}
  };
}
const a=harness('src/showcase-arcade.js'),calls=[];
const api={
  init(){calls.push('init');return Promise.resolve()},
  gameLoadingFinished(){calls.push('ready')},
  gameplayStart(){calls.push('start')},
  gameplayStop(){calls.push('stop')},
  submitScore(n){calls.push('score:'+n)},
  gameOver(n){calls.push('over:'+n)}
};
assert.match(a.appended.src,/bountyboard\.gg\/arcade-sdk/);
a.ctx.state='play';a.ctx.level=1;a.emit('start:after');
assert.equal(a.ctx.showcaseArcade.snapshot().ready,false,'unavailable SDK cannot block play');
a.ctx.BBArcade=api;a.appended.onload();
await Promise.resolve();await Promise.resolve();
assert.deepEqual(calls.slice(0,4),['init','ready','start','score:0']);
a.ctx.score=57;a.t.now=2500;a.emit('update:after');
assert.ok(calls.includes('score:57'));
a.ctx.paused=1;a.emit('update:after');
assert.equal(calls.filter(x=>x==='stop').length,1);
a.emit('update:after');assert.equal(calls.filter(x=>x==='stop').length,1,'paused polling must not double-stop');
a.ctx.paused=0;a.emit('update:after');
assert.equal(calls.filter(x=>x==='start').length,2,'resuming must track active time');
a.ctx.state='end';a.emit('update:after');a.emit('end:after');a.emit('end:after');
assert.equal(calls.filter(x=>x==='over:57').length,1,'end screen renders repeatedly');
assert.equal(a.ctx.showcaseArcade.snapshot().reported,true);
a.ctx.state='play';a.ctx.score=8;a.emit('start:after');a.t.now=5000;a.emit('update:after');
assert.equal(calls.filter(x=>x==='start').length,3,'replay must be a fresh attempt');
a.ctx.state='title';a.ctx.level=0;a.emit('start:after');a.emit('update:after');
assert.equal(a.ctx.showcaseArcade.snapshot().runId,null,'title town is not a competitive run');
const b=harness('src/showcase-arcade.js');b.ctx.state='play';b.ctx.level=1;b.emit('start:after');b.ctx.score=120;b.emit('update:after');b.ctx.state='end';b.emit('end:after');
assert.equal(b.ctx.showcaseArcade.snapshot().ended,true,'offline finish remains safe');
const c=harness('src/showcase-coach.js');
c.ctx.state='play';c.ctx.level=1;c.emit('start:after');
assert.equal(c.panel.hidden,false,'first goal should be visible');
assert.match(c.panel.querySelector('span').textContent,/Bakery/);
c.ctx.clock=9;c.emit('update:after');assert.equal(c.panel.hidden,true,'coach should clear after its window');
c.ctx.goal='TO SMASH HALL → TEAM UP 2/3';c.emit('update:after');
assert.match(c.panel.querySelector('strong').textContent,/TOWN HALL/);
assert.equal(c.panel.hidden,false);
const ok=c.key();assert.equal(c.cycles,1);assert.ok(ok.prevented&&ok.stopped);
c.key({repeat:true});c.key({ctrlKey:true});assert.equal(c.cycles,1,'repeat/modifier keys must not double-switch');
c.ctx.paused=1;c.key();assert.equal(c.cycles,1);
c.ctx.paused=0;c.ctx.level=0;c.emit('start:after');assert.equal(c.panel.hidden,true,'training owns its prompts');
console.log('v1.17 arcade + coach smoke: PASS optional SDK, active time, score, once-only result, replay, Q input, phase coaching');