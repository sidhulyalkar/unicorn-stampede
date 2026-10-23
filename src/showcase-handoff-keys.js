// Showcase-only keyboard migration. The frozen js13k input module remains unchanged.
// This prelude MUST load before src/whip.js installs its legacy Shift listener.
(function(){
  'use strict';
  const before=(event)=>{
    if(state!=='play'||!event.code.startsWith('Shift'))return;
    // Prevent the legacy switch. Do not preventDefault: Shift remains an OS
    // modifier rather than a stolen gameplay button.
    event.stopImmediatePropagation();
  };
  addEventListener('keydown',before,true);
  // The old tutorial and rules paint their legends straight onto the Canvas.
  // Translate only the inherited text when rendering the expanded edition.
  const translateLabel=value=>typeof value==='string'
    ?value.replace(/\bSHIFT\b/gi,'F'):value;
  const fill=X.fillText;
  X.fillText=function(label,...args){
    return fill.call(this,translateLabel(label),...args);
  };
  globalThis.showcaseHandoffKeys=Object.freeze({
    primary:'KeyF',alternate:'KeyQ',disabled:['ShiftLeft','ShiftRight'],
    label:'F',translateLabel
  });
})();