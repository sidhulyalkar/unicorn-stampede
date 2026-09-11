# v0.57 semantic storefront grammar

## Problem

The v0.56 storefronts share a useful structural language, but their identity is still too dependent on arbitrary hue and a large single-character emblem. At gameplay zoom several emblems are misleading (`O` for Bakery, `%` for Toys, `@` for Arcade), while neighboring shops can share nearly identical color/silhouette treatment.

## Design rule

Treat storefronts as a tiny data-oriented component grammar rather than eight hand-authored drawings or JavaScript classes. Each building already owns a semantic `k` in `0..7`; v0.57 makes that one token select reusable visual components:

- stable venue color;
- compact roof/gable bitmask;
- shared awning + window / centered-door / window facade;
- conservative ASCII emblem;
- full venue name as the final authoritative cue.

This is object-oriented composition without class syntax overhead: one object type token, one shared renderer, and tiny encoded component selectors.

## Compression-aware semantic ordering

Instead of storing eight arbitrary hue numbers, the internal venue slots are ordered around a useful color wheel and rendered with:

`hue = k * 49 + 20`

| k | Venue | Cue | Hue | Read |
|---:|---|---|---:|---|
| 0 | Bakery | `B` | 20 | warm orange/red, gabled |
| 1 | Books | `=` | 69 | olive/yellow-green, flat |
| 2 | Market | `M` | 118 | green, flat |
| 3 | Cafe | `C` | 167 | teal, flat |
| 4 | Toys | `T` | 216 | blue, gabled |
| 5 | Arcade | `A` | 265 | purple, flat |
| 6 | Florist | `*` | 314 | magenta, gabled |
| 7 | Bank | `$` | 363 (=3) | red, civic gable |

The player never sees the internal ordering. Bakery remains semantic slot 0 for tutorial authority. The same eight public venue names remain available; only their internal order changes so the palette becomes arithmetic instead of a literal table.

Fancy Unicode pictograms are intentionally avoided because browser/font rendering is less deterministic and UTF-8 encoding costs more. The emblem is a fast glance cue; color + silhouette + the full label provide redundant identification.

## Gameplay boundary

HP/value multipliers remain determined during object creation exactly as before. Semantic hue is assigned only after world generation, so it cannot alter building HP/value, collision, scoring, placement, destruction timing, landmarks, AI, or conquest.

## Promotion gate

This candidate only replaces RC1 if:

1. Bakery / Bank / Books / Cafe / Florist / Market / Toys / Arcade are clearer at normal gameplay zoom;
2. type color remains stable across seeds/worlds;
3. all historical + liveness contracts stay green;
4. exact ZIP remains <= 13,312 bytes with useful safety margin;
5. side-by-side playtest shows an obvious comprehension win.
