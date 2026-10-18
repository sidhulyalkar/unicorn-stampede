# Unicorn Stampede → Bounty Board Arcade: showcase launch plan
Updated: 2026-10-18. Target: post-js13k **main** edition only. Competition branch `release/js13k-2026-submitted` is frozen.

## Product position
**Fantasy:** Six semi-autonomous unicorns invade a reactive town. Your skill is not fastest tapping; it is leaving useful routes in motion, deciding where attention goes, rallying teammates to smash landmarks, recovering captured herd members, and turning districts rainbow.

**Public pitch:** "Direct one unicorn. Orchestrate six. Demolish a town that fights back."

The game must be enjoyable in the first minute before players know the entire simulation. Avoid adding systems until the existing causal loop is readable and dependable.

## Evidence and prioritization
Player reports on the js13k release and earlier project playtests highlighted:
- **Keep:** creative concept, town graphics, sound design when working, density of ideas, animated herd, rainbow trails, smashing the town.
- **Critical:** some players cannot infer how to win, how team-gated landmarks work, why a unit is not contributing, or why a building will not break.
- **Input:** repeated Shift can trigger OS Sticky Keys, especially when surveying the herd.
- **Presentation:** layered HUD labels can occlude the game, and some players found audio unavailable.
- **Gameplay:** the Bakery was reported as unexpectedly indestructible in at least one playthrough. Reproduce before changing authoritative damage rules.
- **Cross-game learning:** Stretchicorn players also praised novel controls but found the first run hard to understand, so prioritize in-world cause/effect, a guided initial success, and player-readable failure feedback over longer instruction panels.

These are reports, not independently reproduced bugs. Each issue needs a precise minimal repro, browser/device, expected and observed state, regression test, and one-change-at-a-time fix.

## v1.17 first tranche (implemented on a feature branch)
- Optional `src/showcase-arcade.js`: game load, actual active play/pause boundaries, integer score updates, once-only run-end submission. Standalone game never blocks on SDK.
- `Q` as a non-modifier alternative to Shift, while preserving all existing Smart Attention behavior and the tutorial's unrestricted whip.
- `src/showcase-coach.js`: brief phase-change instructions for the four landmarks, Chaos, Town Hall team-up, district takeover, global color target and rescue. No per-frame flood, no gameplay-authority changes.
- `npm run test:arcade`: source-level lifecycle, repeat-end, pause/resume, offline and input behavior smoke.
- **Not yet verified in the actual Bounty-hosted player.** SDK events require real host-preview qualification and competition-scoring policy.

## P0: make destruction understandable and reliable
1. Demonstrate first building smash in under ~45 seconds for a new Easy player; hint should appear only when a legitimate next action is available.
2. For a team-gated landmark, show **TEAM 2/3**, identify the missing teammate count, indicate a rally radius and distinguish "not enough teammates" from "not enough charge".
3. Confirm Bakery, Clock Tower and Hall hitboxes with actual Dash trajectories in every world, with repeatable seeds. Add a deterministic test for each ordinary-landmark / gate state.
4. Add staged visual damage response: contact flash → cracked roof or windows → small debris → collapse and persistent rubble. Derive all effects from one authoritative HP model; do not introduce cosmetic fake wins.
5. Add an auditable cause-of-failure message for missed hits, collision, interruption and capture. Give audio a visible user-gesture unlock and verify mute/unmute, browser resume and accessibility fallback.

## P1: make herd strategy visible
1. Each herd member shows whether it is **WORKING**, **TRAVELLING**, **DISTRACTED**, **STALLED**, **CAPTURED**, or **RALLY NEEDED**; derive status from existing state with stable thresholds and minimal overlap.
2. Preserve persistent route ribbons and improve color/arrow legibility at whole-town zoom.
3. Make Smart Shift's reason briefly visible after a handoff; tapping Q rapidly should still cycle through distinct nearby crises.
4. Visualize multi-herd destruction through one satisfying synchronized smash that emerges from proximity and correctly timed dashes; do not invent new movement buttons.
5. Test gameplay liveness over all four worlds and multiple seeds with/without hazard pressure: no off-map routing, irrecoverable stuck units, unwinnable Hall or dead input.

## P2: visual identity and replayability
- **Prismborough:** confident civic grid, named shops, staged gardens, readable rainbow-painted district takeover.
- **Washwater Bay:** river/bridge strategy, dynamic harbor life, legible water/traffic hazards.
- **Cloudtop Heights:** dramatic cable cars, terraced streets and visible crosswind lanes.
- **Faultline Frontier:** timber storefronts, destructible fences, cracks telegraphed before movement is affected.
- Keep presentation readable at desktop and mobile viewports; prioritize geometric silhouettes and distinct material language over repetitive particle effects.

## Bounty Board integration/release gates
- Submit **showcase** source as a reproducible, self-contained hosted ZIP with root `index.html`, or a tested embeddable HTTPS URL. Bounty's current upload limits: 64 MB/file, 250 MB total, 160 files.
- SDK lives outside the compressed competition artifact. Confirm SDK load, score snapshots, `gameplayStart` and `gameplayStop`, and exactly one `gameOver` per run; SDK failure must not affect gameplay.
- **Leaderboard policy unresolved:** score varies by world, difficulty, and seeded map. Before release decide whether only a standardized Medium/Prismborough configuration is ranked, or whether platform-supported modes/boards can separate configurations. Do not advertise fair cross-world competition before this is settled.
- Client-side scores cannot be trusted against determined manipulation; use platform scoring ceilings and plan server-authoritative validation before money/prizes.
- Hosted uploads have no native localStorage. Verify cloud persistence or explicit session-only fallback for settings, mastery and best runs. Test signed-out / signed-in and save failure.
- Preview checks: Chrome/Firefox/Safari where feasible, iframe focus, touch/gamepad input, browser reload, pause/resume, alt-tab, low-FPS, fullscreen and responsive widths; inspect console errors and network failures.
- Artwork: original 16:9 cover, 100+ word description, concise control legend, gameplay footage showing six-unicorn coordination and a staged landmark collapse.
- Do not submit until a complete solo run and failure/restart sequence have been demonstrated in the actual Arcade preview.

## Fresh-player study (minimum 5, ideally 10 participants)
Collect a 30-second uncoached attempt, then a normal play session. Record:
- Can player state the goal in ~10 seconds? Target ≥80%.
- First successful whip and smash latency. Target median <=45 s.
- Fraction that understands **TEAM 2/3** without external coaching. Target ≥80%.
- Median time before first meaningful Shift/Q to recover an ineffective teammate.
- First-run crash/softlock incidence: **zero** in the qualification set.
- Capture/rescue comprehension and actual success rate.
- First Easy conquest completion and voluntary replay, compared across runs 1, 2 and 3.
- After each attempt, ask "What are you trying next?" Compare answer to current objective. Wrong/inconsistent answers flag a UX issue, not player failure.

## Release sequence
1. Merge v1.17 only after smoke and hosted-browser verification.
2. Fix reproduced destruction and team-gate clarity issues first.
3. Measure five real onboarding sessions; remove repeated friction before expanding maps.
4. Establish Arcade-scored mode, score ceilings and save fallback; qualify host preview.
5. Publish only after cover, content, reproducible build, full-run video and score test; launch a friendly high-score campaign before monetary stakes.

Links: https://github.com/sidhulyalkar/unicorn-stampede · https://js13kgames.com/games/unicorn-stampede · https://www.bountyboard.gg/arcade/sdk · https://www.bountyboard.gg/arcade/submit
