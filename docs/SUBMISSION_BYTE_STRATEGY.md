# v0.62 submission byte strategy

Source authority: v0.61 gameplay-polish, including tutorial mastery, complete pedestrians, Washwater-safe pedestrian navigation, live Hall/Clock prerequisite labels, district progress, power-up explanations, and browser gesture hardening.

Current fast packed reference: **14,855 bytes** vs the **13,312-byte** js13k limit, a **1,543-byte gap**.

## Non-negotiable perceptual spine

Protect unless exact measurement proves there is no practical alternative:

- all three worlds
- houses and mixed residential/commercial composition
- differentiated roof silhouettes
- striped awnings and readable shop labels
- Washwater sand/water contrast and river topology
- Cloudtop cliff/wind identity
- rainbow trails
- visible moving townspeople with complete bodies
- tutorial mastery and objective clarity
- Smart Shift, Whip/Dash, capture/rescue and full conquest loop

## First byte donors

These are deliberately chosen because gameplay footage shows their perceptual contribution is lower than their implementation cost.

1. **Generic particle subsystem**. Paint, rainbow trails, screen shake, flash, audio and destruction state remain. Prior profiling measured roughly 282 compressed proxy bytes for complete particle removal.
2. **Release-only browser safety hooks that do not affect in-session play**. Keep the browser-selection suppression that fixes the observed popup. Evaluate unload/error recovery independently and only in the competition artifact.
3. **Release wrapper staticization**. Convert accumulated runtime wrapper chains to a static call graph at build time. Prior qualified work recovered roughly 70 bytes without behavior changes.
4. **Pedestrian simulation encoding**. Keep people moving and complete, but replace expensive nearest-unicorn scanning / random-walk state with a compact equivalent if measurement supports it. Do not revert to static dots.
5. **Text dictionary / phrase composition**. The v0.60/v0.61 tutorial and rules added valuable repeated words such as TEAM, HALL, DISTRICTS, PAINT, SHIFT and COLOR. Encode them once rather than deleting guidance.
6. **Building recipe encoding**. Keep the pixels/semantics while representing palettes, facade recipes and prop selection more compactly.
7. **Music representation**. Preserve audio feedback; only simplify the continuous score layer if still necessary.

## Last-resort microcuts

Only after representation work:

- redundant landmark pulse ornament
- tiny sign ornament
- duplicate semantic window decorations
- one of multiple shrub/fence repeats where visually redundant

Do not begin with benches, fences, bushes, awnings or houses merely because they are easy to delete. Their individual byte savings are modest and the visual footage shows they collectively create the town feeling.

## Qualification rule

Every candidate must pass:

- complete historical gameplay contracts
- v0.60 tutorial mastery
- v0.61 gameplay/pedestrian safety
- browser gesture suppression
- 3 worlds × 3 seeds × hazards on/off liveness
- packed-browser smoke
- exact archive-root check
- exact ZIP byte count

A smaller candidate that fails packed runtime is rejected, regardless of size.
