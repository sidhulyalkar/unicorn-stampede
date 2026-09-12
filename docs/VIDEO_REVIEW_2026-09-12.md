# Gameplay video review — Washwater Bay — 2026-09-12

Source: 43.6 s player capture, 1312×738, 30 fps.

## What is working

- Washwater's sand/water palette reads immediately. The cool canal is visually distinct from the warm playable ground even after heavy paint coverage.
- The bridge/chokepoint topology stays legible while the screen becomes highly saturated.
- Landmark markers and the objective bar remain readable enough to guide the run under heavy action.
- Rainbow trails, paint and large destruction/color events carry most of the moment-to-moment spectacle.
- Storefronts, houses, vehicles and street furniture matter most before and between dense paint bursts; they establish the sense of a real town and should remain protected in the competition cut.
- The conquest transition is clear and satisfying because the final map-scale color state is dramatically different from normal play.

## Browser popup observed

Around 4 s, a browser-native contextual AI/selection menu appears over gameplay with actions including Summarize, Explain this, Quiz me and Proofread. This is outside the canvas UI. The likely trigger is browser text/selection gesture handling while the player is clicking/dragging for the whip.

The game now suppresses selection, context-menu and drag-start behavior on the canvas and disables CSS text selection. This is pinned by a browser-gesture regression contract.

## Byte-value observations

### Protect
- rainbow trails
- paint stamps / takeover color
- houses + storefront silhouettes
- roofs and striped awnings
- world-specific terrain and topology
- landmark/objective labels
- moving townspeople as a layer of life
- capture/rescue and Team state clarity

### Best first donors
- generic square particle subsystem: visually difficult to distinguish from paint/trails/flash/shake during dense action
- release-only unload/error recovery hooks: invisible during normal gameplay
- wrapper/static-call representation
- compact pedestrian simulation while keeping pedestrians visibly moving and complete
- repeated tutorial/rules/objective strings via phrase composition/dictionary
- procedural building recipe representation, not building-feature deletion

### Avoid early cuts
- benches, fences, bushes, attic windows, awnings and storefront labels. They are small individually and collectively account for much of the town's authored appearance.
- rainbow trail. It is one of the clearest signatures in the footage.
- Washwater geometry or any whole world.

## Submission target

Current v0.61 browser-hardened fast packed reference: 14,855 bytes. Gap to 13,312: 1,543 bytes.

Current deflate-proxy measurements from the exact v0.61 source:
- complete generic particle removal: ~293 B
- compact moving pedestrian simulation: ~109 B
- unload hook: ~27 B
- reduced continuous music layer: ~27 B
- error recovery hook: ~15 B
- outer marker pulse: ~16 B
- combined quality-first A (particles + compact moving pedestrians + unload): ~425 B
- combined quality-first B (+ error hook + lighter music): ~465 B
- combined quality-first C (+ marker pulse): ~483 B

These measurements show that cosmetic/system cuts alone cannot close the full 1,543-byte gap. The remaining ~1 KB must come primarily from representation-level compression: wrapper staticization, string phrase encoding, procedural visual recipe encoding, release-only data/enum packing and compressor-aware source structure.
