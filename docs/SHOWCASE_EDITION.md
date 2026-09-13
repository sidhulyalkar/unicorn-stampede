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
- The Smart Attention Director ranks live herd needs such as fault slip, distraction, edge risk, stalls, nearby power-ups, and neglect. Showcase handoffs now surface a short reason cue so the player can learn why attention moved.
- Run telemetry records switches, attention reasons, whips, dashes, power-ups, structure destruction, damage, charge, and elapsed time, then summarizes the run at the result screen.
- Capture/rescue lifecycle guards prevent stale velocity, dash, order, or hidden Frontier slip state from leaking across prisoner transitions.
- Boundary recovery, spatial collision projection, cached static surfaces, adaptive decorative density, and perceptual control cues keep large showcase scenes responsive without changing core conquest rules.
- Accessibility/settings work includes reduced motion, audio controls, keyboard support, controller input, touch controls, fullscreen, and automatic pause on visibility loss.
- Chromium and Firefox are exercised in CI through gameplay matrices, deterministic long-run stress, capture/rescue transitions, Frontier lifecycle seams, and Smart Director decision/readability checks.

## Product direction

The website edition should optimize for the strongest playable demonstration, not compressed bytes. The next useful frontier is measurable player learning: richer replay/decision telemetry, mastery progression, human playtest instrumentation, and evidence-driven balance changes that improve the run without adding unnecessary control vocabulary.
