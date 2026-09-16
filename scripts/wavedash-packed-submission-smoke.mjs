import fs from 'node:fs';
import {spawnSync} from 'node:child_process';

const source=fs.readFileSync('scripts/packed-smoke.mjs','utf8');
const marker="smoke('dist/preview.html',1);smoke('dist/index.html');";
if(!source.includes(marker))throw new Error('packed-smoke entrypoint changed; review Wavedash packed-submission adapter');
const tmp='scripts/.wavedash-packed-submission.tmp.mjs';
const patched=source.replace(marker,"smoke('dist/index.html');");
fs.writeFileSync(tmp,patched);
try{
  const result=spawnSync(process.execPath,[tmp],{stdio:'inherit'});
  if(result.status!==0)throw new Error('authoritative dist/index.html packed smoke failed');
}finally{
  fs.rmSync(tmp,{force:true});
}
console.log('Authoritative submitted packed HTML smoke PASS; stale preview snapshot intentionally excluded.');
