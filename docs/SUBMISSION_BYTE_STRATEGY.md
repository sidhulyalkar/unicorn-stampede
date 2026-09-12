# v0.62 submission byte strategy

Source authority: v0.61 gameplay-polish, including tutorial mastery, complete pedestrians, Washwater-safe pedestrian navigation, live Hall/Clock prerequisite labels, district progress, power-up explanations, and browser gesture hardening.

Current fast packed browser-hardened reference: **14,855 bytes** vs the **13,312-byte** js13k limit, a **1,543-byte gap**.

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

## Current measured donors

Measured on the exact v0.61 quality source with the current release minification proxy:

- generic particle subsystem: **~293 B**
- compact but still moving pedestrian simulation: **~109 B**
- unload hook: **~27 B**
- lighter continuous music layer: **~27 B**
- browser error-recovery hook: **~15 B**
- landmark outer pulse: **~16 B**
- quality-first bundle A (particles + moving pedestrian simplification + unload): **~425 B**
- bundle B (+ error hook + lighter music): **~465 B**
- bundle C (+ marker pulse): **~483 B**

This is the central result: cosmetic/system cuts alone cannot close the full 1,543-byte gap. About another kilobyte must come from **representation-level compression**, not visible-town deletion.

## High-leverage representation work

1. **Release wrapper staticization.** Convert accumulated runtime wrapper chains to a static call graph at build time. Earlier qualified experiments recovered roughly 70 bytes without behavior changes.
2. **Phrase/string encoding.** v0.60/v0.61 intentionally added repeated strategic language: TEAM, HALL, DISTRICTS, PAINT, SHIFT, COLOR, CAPTURED, etc. Store/combine these phrases rather than deleting guidance.
3. **Procedural building recipe encoding.** Preserve the same roofs, awnings, windows, props and labels while compacting palette/recipe selection and repeated Canvas command structure.
4. **Enum/data packing.** Repack world/archetype/state constants in the release artifact while leaving readable source intact.
5. **Compressor-aware source layout.** Search equivalent function/data orderings and property-mangle layouts, with packed-browser smoke as the authority.
6. **Pedestrian algorithm representation.** Keep people moving and complete, but remove expensive nearest-unicorn/random-walk state if a simpler behavior reads the same at gameplay zoom.
7. **Music representation.** Preserve feedback and simplify only the continuous score layer if needed.

## Last-resort microcuts

Only after representation work:

- redundant landmark pulse ornament
- tiny sign ornament
- duplicate semantic window decorations
- one of multiple shrub/fence repeats where visually redundant

Do not begin with benches, fences, bushes, awnings or houses merely because they are easy to delete. Their individual byte savings are modest and gameplay footage shows they collectively create the town feeling.

## Browser popup rule

The canvas selection/context/drag suppression that fixes the observed browser AI popup is **protected**. Do not trade it away for bytes. Release-only unload/error recovery are separate candidates and may be profiled independently.

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
