// Lightweight shell around the canvas game. No gameplay rules live here.
const showcaseLoader=document.getElementById('showcase-loader');
if(showcaseLoader)requestAnimationFrame(()=>requestAnimationFrame(()=>{showcaseLoader.classList.add('showcase-loader-ready');setTimeout(()=>showcaseLoader.remove(),450)}));
const showcaseStatus=document.createElement('div');showcaseStatus.id='showcase-status';showcaseStatus.setAttribute('aria-live','polite');
const showcaseFullscreen=document.createElement('button');showcaseFullscreen.id='showcase-fullscreen';showcaseFullscreen.type='button';showcaseFullscreen.textContent='⛶';showcaseFullscreen.setAttribute('aria-label','Enter fullscreen');
showcaseFullscreen.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{}});
document.addEventListener('fullscreenchange',()=>{const on=!!document.fullscreenElement;showcaseFullscreen.textContent=on?'×':'⛶';showcaseFullscreen.setAttribute('aria-label',on?'Exit fullscreen':'Enter fullscreen')});
document.body.append(showcaseStatus,showcaseFullscreen);
const showcaseWorldNames=['PRISMBOROUGH','WASHWATER BAY','CLOUDTOP HEIGHTS','FAULTLINE FRONTIER'];
function showcaseRefreshStatus(){const world=showcaseWorldNames[typeof zone==='number'?zone:0]||showcaseWorldNames[0];const phase=state==='play'?(paused?'PAUSED':''):state==='end'?'COMPLETE':'';showcaseStatus.textContent=phase?`${world} · ${phase}`:world;showcaseStatus.classList.toggle('showcase-status-quiet',state==='title')}
showcaseRefreshStatus();setInterval(showcaseRefreshStatus,500);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='play')paused=1});
