# Changelog

## 0.21.0 - Competitive conquest / top-50 foundation

- separated **conquest** from **score excellence**: Town Hall now requires all four outer landmarks **and 28% combined town chaos**, so minimal landmark sniping no longer produces a valid fast finish
- added a deterministic competitive score combining time remaining, paint coverage, structural destruction, capped 3X Prism chains, average ACTIVE herd, cleanup stuns, and Stampede+ Prism Gates
- added world difficulty multipliers so Washwater Bay, Cloudtop Heights, and Stampede+ reward carrying the same core skills into harder pressure
- added player-facing `LOW`, `MEDIUM`, `HIGH`, `HIGHER`, and `HIGHEST` score bands plus a live projected score in the readable/local HUD
- made the results screen expose the major run metrics and explicitly identify the next campaign world or Stampede+ unlock
- added explicit progression regressions for Prismborough → Washwater Bay → Cloudtop Heights → Stampede+
- added a hosted leaderboard client with name entry, top-50 display, run-metric payloads, and an honest local top-50 fallback when no shared service is reachable
- kept leaderboard networking/UI outside the 13 KB competition payload while retaining the authoritative competitive score formula inside the packed game
- redesigned `docs/how-to-play.svg` at 1400×860 with dedicated non-overlapping layout zones and the new conquest/score progression explained visually
- documented the score economy, leaderboard contract, and server-side recomputation requirements in `docs/COMPETITIVE_SCORING.md`
- qualified the first exact v0.21 competitive head at **13,092 / 13,312 bytes**, leaving **220 bytes free**; a second unchanged-source compression pass is used as the variance gate before merge

## 0.20.0 - Whip reticle / Stampede+ encore

- replaced the tiny native crosshair with a large animated three-band rainbow whip cursor and a crisp white precision center at the exact click origin
- hid the browser cursor over the game canvas so aiming feedback has one authoritative visual target
- added a post-campaign **Stampede+** encore that unlocks from the existing Cloudtop mastery crown instead of introducing another persistent progression structure
- made encore towns tighter and more chaotic with six fewer seconds, an extra cleaner, faster traffic, and roaming lateral gusts outside Cloudtop
- added four optional **Prism Gates** per encore town; crossing one grants score and a temporary speed boost
- built Prism Gates entirely from stacked canvas arcs and reused high bits in the existing district mask for collection state, adding no sprite assets or dedicated gate-state array
- added v0.20 headless regressions for the custom cursor contract, Stampede+ unlock/escalation, roaming gusts, and Prism Gate rewards
- extended the build to include the expansion module and widened safe internal-property mangling
- made the competition-only title/intermission/victory presentation more compact while leaving `dist/local.html` and the readable source presentation unchanged
- after detecting compression-search variance near the limit, increased release headroom instead of accepting a lucky near-boundary build
- two independent buffered qualification passes produced **13,182** and **13,190** bytes; the worst observed package is **13,190 / 13,312 bytes**, leaving **122 bytes free**

## 0.19.0 - Teach when actionable / faster fun

- shortened Little Cross from seven mandatory lessons to four core beats: Blue steer/release, Yellow Whip, 3X Prism, then smash the Bakery
- removed mandatory powerup, distraction and rescue chores from the tutorial; those mechanics remain discoverable in normal play
- lowered tutorial Bakery durability so the control lesson ends with a quick destructive payoff instead of a grind
- stopped advertising Smart Next before another Blue or Yellow unicorn is actually live
- made the four-unicorn arrival explicitly announce that switching is now available
- made early switch callouts explain both sides of the handoff, e.g. `BLUE → DAISY • BOLT RUNS`
- changed the HUD's opaque `STAMP` label to the clearer `ACTIVE` count
- changed landmark celebrations to concrete progress such as `BAKERY SMASHED • 1/4`
- reinforced the six-unicorn escalation with `ALL 6 • KEEP 4 RUNNING!`
- added regressions for the shorter tutorial, switch-arrival teaching and Blue/Yellow handoff explanations

## 0.18.0 - Six-unicorn control clarity / smaller competition shell

- made the title state the actual mental model: **6 unicorns, control 2, 4 keep running**
- split the roster clearly into Blue direct steering and Yellow Rainbow Whip control
- made Blue handoff explicit: `WASD → release → route → next Blue`
- made Yellow handoff explicit: `3X Prism → next Yellow`, with chain timeout also rotating Yellow automatically
- added short `BLUE → name` / `YELLOW → name` handoff callouts and opening HUD reminders so switching is learned during play rather than only from a manual
- corrected documentation to match the current instant-on-click Rainbow Whip instead of the older delayed-travel description
- retained the v0.17 deterministic low-speed WASD release, rounded anti-stuck town boundary and HUD avoidance behavior
- stripped nonessential title metadata and preview-only CSS behavior from the competition shell while keeping the browser-safe preview unchanged
- extended packed-runtime qualification to require the six-unicorn / next-Blue / next-Yellow briefing contract
- qualified the exact v0.18 gameplay head at **13,292 / 13,312 bytes**, leaving **20 bytes free**

## 0.14.0 - Unicorn Stampede recovery / browser-safe preview

- renamed the game from **Corni Cross** to **Unicorn Stampede**
- replaced the text-only title with a procedural cover/title scene that visibly shows a six-unicorn rainbow stampede through a town
- fixed the repository root so `index.html` loads the complete current module stack instead of only the original four modules
- split release artifacts into a browser-safe self-contained `dist/preview.html` and the aggressively Roadroller-packed competition `dist/index.html`
- added preview qualification that rejects `document.write` / dynamic `eval` in the browser-safe artifact
- renamed the competition archive to `unicorn-stampede.zip`
- cleaned `dist/` before every build so stale artifacts cannot masquerade as current output
- kept the js13k compression tournament and exact packed-runtime campaign smoke as separate qualification gates

## 0.11.0 - Landmark campaign / Top-10 pass

- replaced the abstract percentage-only victory with a five-landmark campaign: Bakery, Market, Greenhouse, Clock Tower, then shielded Town Hall
- made paint percentage a quality/rank layer while Town Hall destruction is the concrete win condition
- turned the existing 2 → 4 → 6 progression into three acts: The Escape, Town Fights Back, Full Unicorn Emergency
- added cleanup vans that erase the exact scored 4px rainbow raster and can be stunned by high-energy unicorns
- added landmark-specific aftermath: market powerups, greenhouse butterfly release, clock anger escalation and final Town Hall herd frenzy
- added screen-space landmark beacons, objective health/state, locked Town Hall presentation and a direct title-screen explanation of the campaign
- added Smart Attention Director reason cues: DISTRACTED, WEAK AREA, POWERUP, STALLED and NEXT
- added lightweight adaptive procedural music that layers as more unicorns stay productive
- added first-glance tutorial/intermission copy focused on the actual objective rather than percentages
- expanded the headless suite to cover landmark gating, Town Hall shielding, cleanup erasure, act escalation and director explanations
- replaced the raw-DEFLATE-only build with a measured raw vs Terser vs Terser→Roadroller compression tournament
- Roadroller now creates several kilobytes of usable design budget while preserving readable source

## 0.10.0 - Prism Chase

- removed continuous mouse dragging and the associated cursor-corner failure mode
- made the right-side captain a moving target: click → dash → reacquire → 2X → reacquire → 3X
- added automatic reassignment when a Prism chain completes or times out
- improved Smart Attention routing with distraction, stall, district need, order/rage and powerup signals
- improved autonomous powerup and weak-area routing

## 0.9.0 - Smart Attention Director

- removed most manual character cycling from the primary loop
- releasing a productive WASD route now creates an order and automatically selects the next useful left-side intervention
- introduced auto-selection based on problem urgency instead of fixed roster order
- added strong temporary selection glow for visual reacquisition

## 0.8.0 - Mouse captain and browser hardening

- introduced mouse control for the right-side captain with arrow-key fallback
- added unload/runtime recovery guards and stronger focus-loss handling
- retained modifier-key shortcut containment

## 0.7.0 - Learn two, command six

- removed Shift/modifier keys from gameplay
- made Little Cross objective-gated so core lessons must be demonstrated before graduation
- changed the main town into a 2 → 4 → 6 unicorn progression instead of immediate six-agent overload
- added early skill-based wave releases plus safety timers
- extended directional orders and increased direct-control authority

## 0.6.0 - Agency and mastery

- made captain facing follow player input directly so shared dashes are predictable
- added directional orders, captain wake and direct-control rescue
- added mastery callouts and distinct Bakery, Bank, Books, Cafe and Florist facade grammars

## 0.5.0 - Dual Captains

- added simultaneous left/right captains, synchronized dash and richer town landmarks

## 0.4.0 - The Great Rainbow Invasion

- added autonomous splatter, precise 4px paint accounting, powerups, distractions and the full-town tactical view

## 0.3.0 - Rainbow Rampage

- pivoted from escort herding into destructible rainbow-town strategy