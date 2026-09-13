// Showcase-only parser-gap guard. ui.js starts the compact animation loop before the later
// showcase scripts assign title/hud; safe no-op callbacks keep an unusually early rAF harmless.
if(typeof title!=='function')title=()=>{};
if(typeof hud!=='function')hud=()=>{};
globalThis.showcaseBootGuard=1;
