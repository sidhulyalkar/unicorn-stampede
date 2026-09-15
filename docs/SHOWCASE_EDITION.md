# Unicorn Stampede editions

## Competition artifact

`release/js13k-2026-submitted` is the frozen source lineage for the submitted JS13k build. It should remain byte-focused and immutable except for documentation that does not change the game artifact.

The submitted package was qualified at 13,307 / 13,312 bytes.

## Showcase edition

`main` is the post-JS13k edition intended for sidhulyalkar.com and continued development. It is no longer constrained by the 13 KB cap.

The showcase edition preserves the competition game's herd-management core while using the recovered engineering and visual headroom deliberately:

- Prismborough, Washwater Bay, Cloudtop Heights, and Faultline Frontier are playable with distinct regional systems and visual grammar.
- Rich procedural facades, windows, awnings, street furniture, scenery, regional actors, weather/motion cues, and detailed civilians remain enabled.
- Faultline Frontier adds six staged fissures, degrading fences, slip pressure, wrangler captures, and a rescue loop without changing the frozen competition build.
- The Smart Attention Director ranks live herd needs such as fault slip, distraction, edge risk, stalls, nearby power-ups, and neglect. Showcase handoffs surface a short reason cue so the player can learn why attention moved.
- Herd Flow makes distributed expertise visible: productive actions by different unicorns build a short 1X–5X chain, with intentional route handoffs counted as player-authored coordination rather than passive AI luck.
- Living Conquest keeps that expertise visible in the world. Active orders leave fading route ribbons, destroyed structures retain world-specific rubble, district paint grows into local rainbow standards, authoritative post-Hall district completion triggers a `DISTRICT SECURED` beat, and civilians can celebrate coordinated play as well as flee destruction.
- Run telemetry records switches, attention reasons, whips, dashes, power-ups, structure destruction, damage, charge, elapsed time, Flow actions, peak Flow, and route orders. The run debrief now exposes the Flow metrics instead of leaving them as hidden instrumentation.
- Capture/rescue lifecycle guards prevent stale velocity, dash, order, or hidden Frontier slip state from leaking across prisoner transitions.
- Boundary recovery, spatial collision projection, cached static surfaces, adaptive decorative density, and perceptual control cues keep large showcase scenes responsive without changing core conquest rules.
- Accessibility/settings work includes reduced motion, audio controls, keyboard support, controller input, touch controls, fullscreen, and automatic pause on visibility loss.
- Chromium and Firefox are exercised in CI through gameplay matrices, deterministic long-run stress, capture/rescue transitions, Frontier lifecycle seams, Smart Director decision/readability checks, Herd Flow/crowd-response qualification, and Living Conquest authority/readability checks.

## Product direction

The website edition should optimize for the strongest playable demonstration, not compressed bytes. After v1.15 the highest-value question is no longer whether more visual detail can be added. It is whether the visible mastery signals correspond to genuinely better play. Measure whether peak Flow and route-order behavior predict faster conquest, stronger paint retention, fewer herd failures, and cleaner recovery, then tune balance from real playtests. In parallel, consolidate the growing stack of showcase wrappers into an explicit lifecycle/hook architecture before adding many more presentation systems.
