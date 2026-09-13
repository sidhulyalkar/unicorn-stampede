// Persistent website/showcase settings. Kept outside the 13 KB competition code.
const SHOWCASE_SETTINGS_KEY='unicornShowcaseSettingsV1';
const showcaseDefaults={reducedMotion:false,screenShake:true,highContrast:false,music:true,sfx:true,touchControls:true};
function showcaseLoadSettings(){
  try{return{...showcaseDefaults,...JSON.parse(localStorage.getItem(SHOWCASE_SETTINGS_KEY)||'{}')}}catch{return{...showcaseDefaults}}
}
globalThis.showcaseSettings=showcaseLoadSettings();
function showcaseSaveSettings(){
  try{localStorage.setItem(SHOWCASE_SETTINGS_KEY,JSON.stringify(globalThis.showcaseSettings))}catch{}
  document.body.classList.toggle('showcase-reduced-motion',!!showcaseSettings.reducedMotion);
  document.body.classList.toggle('showcase-high-contrast',!!showcaseSettings.highContrast);
  document.dispatchEvent(new CustomEvent('unicorn-settings-changed',{detail:{...showcaseSettings}}));
}
function showcaseToggleSetting(key,value){
  showcaseSettings[key]=value??!showcaseSettings[key];
  showcaseSaveSettings();
}
const settingsButton=document.createElement('button');
settingsButton.id='showcase-settings-button';settingsButton.type='button';settingsButton.textContent='⚙ OPTIONS';settingsButton.setAttribute('aria-expanded','false');
const settingsPanel=document.createElement('section');
settingsPanel.id='showcase-settings-panel';settingsPanel.hidden=true;settingsPanel.setAttribute('aria-label','Game options');
settingsPanel.innerHTML=`<div class="showcase-panel-head"><strong>UNICORN OPTIONS</strong><button type="button" data-close aria-label="Close options">×</button></div><p>Showcase edition controls</p><div class="showcase-setting-list"></div><small>M still toggles the legacy master mute during play.</small>`;
const settingLabels={
  reducedMotion:'Reduced environmental motion',screenShake:'Screen shake',highContrast:'High-contrast active unicorn',music:'Adaptive music',sfx:'Sound effects',touchControls:'Touch controls'
};
const list=settingsPanel.querySelector('.showcase-setting-list');
function showcaseRenderSettings(){
  list.replaceChildren();
  for(const [key,label] of Object.entries(settingLabels)){
    const row=document.createElement('label');row.className='showcase-setting-row';
    const span=document.createElement('span');span.textContent=label;
    const input=document.createElement('input');input.type='checkbox';input.checked=!!showcaseSettings[key];input.dataset.setting=key;
    input.addEventListener('change',()=>showcaseToggleSetting(key,input.checked));
    row.append(span,input);list.append(row);
  }
}
function showcaseOpenSettings(open=!settingsPanel.hidden){
  settingsPanel.hidden=!open;settingsButton.setAttribute('aria-expanded',String(open));
  if(open)showcaseRenderSettings();
}
settingsButton.addEventListener('click',e=>{e.stopPropagation();showcaseOpenSettings(settingsPanel.hidden)});
settingsPanel.querySelector('[data-close]').addEventListener('click',()=>showcaseOpenSettings(false));
addEventListener('keydown',e=>{
  if(e.code==='KeyO'&&!e.repeat){e.preventDefault();showcaseOpenSettings(settingsPanel.hidden)}
  else if(e.code==='Escape'&&!settingsPanel.hidden){e.preventDefault();e.stopImmediatePropagation();showcaseOpenSettings(false)}
},true);
document.body.append(settingsButton,settingsPanel);
showcaseSaveSettings();

// Accessibility rendering hooks.
const showcaseSettingsDrawBase=draw;
draw=function(){
  if(!showcaseSettings.screenShake)shake=0;
  showcaseSettingsDrawBase();
};
const showcaseContrastWorldBase=world;
world=function(){
  showcaseContrastWorldBase();
  if(!showcaseSettings.highContrast||state!=='play'||!unis[caps[0]]?.live)return;
  const u=unis[caps[0]];
  X.save();X.translate(ox,oy);X.scale(z,z);
  X.lineWidth=10;X.strokeStyle='#111';X.beginPath();X.arc(u.x,u.y,92,0,T);X.stroke();
  X.lineWidth=5;X.strokeStyle='#fff36b';X.beginPath();X.arc(u.x,u.y,92,0,T);X.stroke();
  X.restore();
};
