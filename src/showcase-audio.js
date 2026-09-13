// Adaptive showcase audio. The competition build keeps its tiny tone synth unchanged;
// this layer adds a separate music bus and honors independent music/SFX settings.
let showcaseMusicBus,showcaseDroneA,showcaseDroneB,showcaseMusicPulse=-1;
const showcaseAudioBase=audio;
audio=function(){showcaseAudioBase();showcaseEnsureMusic()};
const showcaseToneBase=tone;
tone=function(...args){if(globalThis.showcaseSettings?.sfx===false)return;return showcaseToneBase(...args)};
function showcaseEnsureMusic(){
  if(!AC||showcaseMusicBus)return;
  showcaseMusicBus=AC.createGain();showcaseMusicBus.gain.value=0;showcaseMusicBus.connect(master);
  const filter=AC.createBiquadFilter();filter.type='lowpass';filter.frequency.value=780;filter.Q.value=.7;filter.connect(showcaseMusicBus);
  showcaseDroneA=AC.createOscillator();showcaseDroneB=AC.createOscillator();showcaseDroneA.type='sine';showcaseDroneB.type='triangle';
  const ga=AC.createGain(),gb=AC.createGain();ga.gain.value=.016;gb.gain.value=.008;showcaseDroneA.connect(ga);showcaseDroneB.connect(gb);ga.connect(filter);gb.connect(filter);showcaseDroneA.start();showcaseDroneB.start();showcaseApplyAudioSettings();
}
function showcaseApplyAudioSettings(){if(!showcaseMusicBus||!AC)return;const on=globalThis.showcaseSettings?.music!==false&&!muted;showcaseMusicBus.gain.setTargetAtTime(on?.7:0,AC.currentTime,.12)}
function showcasePluck(freq,volume=.012,duration=.16){
  if(!AC||!showcaseMusicBus||showcaseSettings?.music===false||muted)return;
  const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=zone===1?'sine':zone===2?'triangle':zone===3?'triangle':'sine';o.frequency.setValueAtTime(freq,n);g.gain.setValueAtTime(volume,n);g.gain.exponentialRampToValueAtTime(.0001,n+duration);o.connect(g);g.connect(showcaseMusicBus);o.start(n);o.stop(n+duration+.03);
}
function showcaseUpdateMusic(){
  if(!AC)return;showcaseEnsureMusic();if(!showcaseMusicBus)return;
  const roots=[110,98,92,82],root=roots[zone]||110,captures=typeof cleaners==='undefined'?0:cleaners.filter(c=>c.u>=0).length,chaosNow=typeof takeover==='function'&&level?takeover():0,intensity=state==='play'&&!paused?1+Math.min(1.2,chaosNow*1.4+captures*.28):.55,n=AC.currentTime;
  showcaseDroneA.frequency.setTargetAtTime(root*intensity,n,.18);showcaseDroneB.frequency.setTargetAtTime(root*(zone===2?1.5:zone===3?1.25:1.25)*intensity,n,.18);showcaseApplyAudioSettings();
  if(state!=='play'||paused||showcaseSettings?.music===false)return;
  const beat=Math.floor(clock*(captures?3.2:zone===3?1.85:2.1));if(beat===showcaseMusicPulse)return;showcaseMusicPulse=beat;
  const scales=[[1,1.25,1.5,2],[1,1.2,1.5,1.8],[1,1.125,1.5,1.6875],[1,1.125,1.5,1.75]],scale=scales[zone]||scales[0],note=scale[(beat+zone*2)%scale.length];
  showcasePluck(root*2*note,.009+chaosNow*.008,captures?.11:zone===3?.2:.17);if(captures>1&&beat%2===0)showcasePluck(root*3,.009,.08);
}
const showcaseMusicUpdateBase=update;update=function(dt){showcaseMusicUpdateBase(dt);showcaseUpdateMusic()};
document.addEventListener('unicorn-settings-changed',showcaseApplyAudioSettings);
