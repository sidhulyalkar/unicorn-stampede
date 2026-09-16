import {spawnSync} from 'node:child_process';

const tests=[
  'smoke.mjs','dash-contract-smoke.mjs','competitive-smoke.mjs','interference-smoke.mjs',
  'response-smoke.mjs','difficulty-smoke.mjs','shift-rules-smoke.mjs','progression-smoke.mjs',
  'washwater-smoke.mjs','whip-render-smoke.mjs','whip-cadence-smoke.mjs','rules-v044-smoke.mjs',
  'graphics-v041-smoke.mjs','v045-scenery-skip-smoke.mjs','v046-antistuck-smoke.mjs',
  'v047-waterfront-smoke.mjs','v048-cloudtop-smoke.mjs','v049-world-identity-smoke.mjs',
  'v050-menu-smoke.mjs','v051-launch-config-smoke.mjs','v052-gameplay-liveness-smoke.mjs',
  'v053-conquest-menu-smoke.mjs','v054-semantic-cloudtop-smoke.mjs','v055-structured-storefronts-smoke.mjs',
  'v056-town-difficulty-smoke.mjs','packed-smoke.mjs','size.mjs'
];

for(const file of tests){
  const result=spawnSync(process.execPath,[`scripts/${file}`],{stdio:'inherit'});
  if(result.status!==0)throw new Error(`Frozen regression failed: ${file}`);
}
console.log(`Frozen submitted regression lane PASS: ${tests.length} checks; no source rewrite or rebuild performed.`);
