// Fail submission packaging when the Arcade ZIP, cover, listing or tests disagree.
// User-facing studio review remains an external, explicitly unverified gate.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const dir='dist/arcade',file=path.join(dir,'unicorn-stampede-arcade.zip');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const data=fs.readFileSync(file),sha=createHash('sha256').update(data).digest('hex');
if(manifest.sha256!==sha||manifest.archiveBytes!==data.length)throw Error('Archive hash or size mismatch');
if(manifest.files.length>160||manifest.uncompressedBytes>250*1024*1024)throw Error('Bounty file caps exceeded');
if(!manifest.files.includes('index.html')||manifest.files.some(s=>s.includes('..')||s.startsWith('/')))
  throw Error('Unsafe or missing ZIP entry point');
if(!manifest.files.includes('src/showcase-mobile-entry.js')||
   !manifest.files.includes('src/showcase-handoff-keys.js'))
  throw Error('Mobile startup or F control shim omitted from ZIP');
const cover=fs.readFileSync(path.join(dir,'unicorn-stampede-cover.png'));
if(cover.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Cover is not PNG');
const width=cover.readUInt32BE(16),height=cover.readUInt32BE(20);
if(width!==1280||height!==720)throw Error('Bounty requires a clean 16:9 cover');
const docs=fs.readFileSync('docs/BOUNTYBOARD_SUBMISSION.md','utf8');
const section=docs.match(/## Description[^\n]*\n\n([\s\S]*?)\n\n## Keyboard and mouse controls/);
if(!section)throw Error('Missing standalone 100+ word submission description');
const description=section[1].trim();
const wordCount=description.split(/\s+/).length;
if(wordCount<100)throw Error('Description must contain 100 words');
const controlSection=docs.match(/## Keyboard and mouse controls\n\n([\s\S]*?)\n\n## Leaderboard policy/);
if(!controlSection)throw Error('Missing controls');
if(!/\*\*F \(or Q\)\*\*/.test(controlSection[1])||/\*\*Q or Shift\*\*/.test(controlSection[1]))
  throw Error('Submission controls do not reflect F key');
for(const name of ['qualification-v119.json','qualification-v122.json',
  'qualification-v123.json','qualification-v124.json']){
  const r=JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
  const proofs=r.reports||r.results;
  if(!Array.isArray(proofs)||proofs.length!==2||
     !['chromium','firefox'].every(engine=>proofs.some(p=>p.browser===engine)))
    throw Error(name+' not qualified in both browser engines');
}
const listing=[
'UNICORN STAMPEDE','',
'Tagline: Direct one unicorn. Orchestrate six. Demolish a town that fights back.','',
'Description ('+wordCount+' words):',description,'',
'CONTROLS',controlSection[1].trim(), '',
'UPLOAD PACKAGE: unicorn-stampede-arcade.zip',
'COVER: unicorn-stampede-cover.png',
'LEADERBOARD: Prismborough, Medium, fixed map, max 99,500',
'SDK FEATURES TO ENABLE: Leaderboards, Cloud saves, Player identity',
'DO NOT ENABLE: Rewarded ads, Multiplayer, A/B experiments (not implemented)',
'AFTER SUBMISSION: Studio > Test your build, signed-in then Guest; verify actual score/cloud events.',
'EXTERNAL GATES: human playtesting, real studio preview, approval and publishing.'
].join('\n');
fs.writeFileSync(path.join(dir,'submission-listing.txt'),listing+'\n');
const result={
  status:'LOCAL_CI_QUALIFIED_NOT_HOST_APPROVED',format:'Bounty Board Arcade HTML5 ZIP',
  sha256:sha,archiveBytes:data.length,extractedBytes:manifest.uncompressedBytes,
  fileCount:manifest.files.length,cover:{width,height},
  descriptionWords:wordCount,browsers:['chromium','firefox'],
  input:['keyboard F/Q','mouse','touch portrait','touch landscape','gamepad pre-existing'],
  externalGates:['real Bounty Studio preview','first-play usability','Bounty review approval'],
  security:{clientLeaderboardNotAuthoritative:true,rewardedAds:false,multiplayer:false}
};
fs.writeFileSync(path.join(dir,'submission-v124.json'),JSON.stringify(result,null,2)+'\n');
console.log('Arcade preflight: PASS',JSON.stringify(result));
