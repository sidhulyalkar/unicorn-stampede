// Persistent settings with direct page toggles. No options overlay or modal state.
const SHOWCASE_SETTINGS_KEY='unicornShowcaseSettingsV1';
const showcaseDefaults={reducedMotion:false,screenShake:true,highContrast:false,music:true,sfx:true,touchControls:true};
function showcaseLoadSettings(){try{return{...showcaseDefaults,...JSON.parse(localStorage.getItem(SHOWCASE_SETTINGS_KEY)||'{}')}}catch{return{...showcaseDefaults}}}
globalThis.showcaseSettings=showcaseLoadSettings();
function showcaseSaveSettings(){try{localStorage.setItem(SHOWCASE_SETTINGS_KEY,JSON.stringify(globalThis.showcaseSettings))}catch{}document.body.classList.toggle('showcase-reduced-motion',!!showcaseSettings.reducedMotion);document.body.classList.toggle('showcase-high-contrast',!!showcaseSettings.highContrast);document.dispatchEvent(new CustomEvent('unicorn-settings-changed',{detail:{...showcaseSettings}}));showcaseRenderSettings()}
function showcaseToggleSetting(key,value){showcaseSettings[key]=value??!showcaseSettings[key];showcaseSaveSettings()}
const settingLabels={music:'MUSIC',sfx:'SFX',screenShake:'SHAKE',reducedMotion:'MOTION',highContrast:'CONTRAST',touchControls:'TOUCH'};
const settingsBar=document.createElement('nav');settingsBar.id='showcase-settings-bar';settingsBar.setAttribute('aria-label','Game options');settingsBar.tabIndex=-1;
for(const [key,label]of Object.entries(settingLabels)){const b=document.createElement('button');b.type='button';b.dataset.setting=key;b.dataset.label=label;b.addEventListener('click',()=>showcaseToggleSetting(key));settingsBar.append(b)}
function showcaseRenderSettings(){for(const b of settingsBar.querySelectorAll('[data-setting]')){const key=b.dataset.setting,on=key==='reducedMotion'?!showcaseSettings[key]:!!showcaseSettings[key],label=b.dataset.label;b.classList.toggle('is-on',on);b.classList.toggle('is-off',!on);b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',`${label} ${on?'on':'off'}`);b.textContent=label}}
// Backwards-compatible focus hook for pause-menu OPTIONS without resurrecting a panel.
const settingsButton=document.createElement('button');settingsButton.id='showcase-settings-button';settingsButton.type='button';settingsButton.className='showcase-settings-focus';settingsButton.textContent='OPTIONS';settingsButton.setAttribute('aria-label','Focus game options');settingsButton.addEventListener('click',()=>settingsBar.focus());
document.body.append(settingsBar,settingsButton);showcaseSaveSettings();
addEventListener('keydown',e=>{if(e.code==='KeyO'&&!e.repeat){e.preventDefault();settingsBar.focus()}},true);
const showcaseSettingsDrawBase=draw;draw=function(){if(!showcaseSettings.screenShake)shake=0;showcaseSettingsDrawBase()};
const showcaseContrastWorldBase=world;world=function(){showcaseContrastWorldBase();if(!showcaseSettings.highContrast||state!=='play'||!unis[caps[0]]?.live)return;const u=unis[caps[0]];X.save();X.translate(ox,oy);X.scale(z,z);X.lineWidth=10;X.strokeStyle='#111';X.beginPath();X.arc(u.x,u.y,92,0,T);X.stroke();X.lineWidth=5;X.strokeStyle='#fff36b';X.beginPath();X.arc(u.x,u.y,92,0,T);X.stroke();X.restore()};
globalThis.showcaseSettingsAPI={toggle:showcaseToggleSetting,focus:()=>settingsBar.focus(),bar:settingsBar};
