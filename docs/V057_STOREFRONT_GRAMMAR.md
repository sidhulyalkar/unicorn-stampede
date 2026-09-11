# v0.57 semantic storefront grammar

## Problem

The v0.56 storefronts share a useful structural language, but their identity is still too dependent on arbitrary hue and a large single-character emblem. At gameplay zoom several emblems are misleading (`O` for Bakery, `%` for Toys, `@` for Arcade), while neighboring shops can share nearly identical silhouette/color treatment.

## Design rule

Treat storefronts as a tiny data-oriented component grammar rather than eight hand-authored drawings or JavaScript classes. Each building already owns a stable semantic `k` in `0..7`; v0.57 makes that one value drive reusable visual components:

- **palette**: one stable hue per venue type;
- **roof**: compact bitmask selects gabled vs flat silhouette;
- **awning**: compact bitmask selects striped retail/food awnings;
- **facade**: shared window / centered-door / window grammar;
- **emblem**: one conservative ASCII cue, with the full venue name remaining authoritative.

This gives every generated Bakery the same visual family, every Bank another, etc., independent of procedural building position or old random hue. It also means future regional variants can reuse the same component grammar without adding bespoke renderer functions.

## Semantic families

| k | Venue | Primary read | Palette / silhouette intent |
|---:|---|---|---|
| 0 | Bakery | `B` + striped awning | warm orange, gabled |
| 1 | Bank | `$` | muted red, civic gable |
| 2 | Books | `=` | olive / book-stack cue, flat |
| 3 | Cafe | `C` + striped awning | teal, flat |
| 4 | Florist | `*` + striped awning | magenta, gabled |
| 5 | Market | `M` + striped awning | ochre, flat |
| 6 | Toys | `T` | bright blue, gabled |
| 7 | Arcade | `A` | purple, flat / marquee-like |

The emblem alphabet intentionally stays ASCII. Fancy Unicode pictograms vary by browser/font and cost additional UTF-8 bytes; at js13k scale the full label + color + silhouette is a more robust semantic channel.

## Gameplay boundary

This is render semantics only. HP/value multipliers remain determined during object creation exactly as before. Stable semantic hue is assigned **after** generation and therefore cannot alter building HP/value, collision, scoring, placement, destruction timing, landmarks, AI, or conquest.

## Promotion gate

A candidate only replaces RC1 if:

1. Bakery / Bank / Books / Cafe / Florist / Market / Toys / Arcade are distinguishable at normal gameplay zoom;
2. type color remains stable across seeds and worlds;
3. adjacent shops still avoid repeated semantic types;
4. full historical + liveness qualification remains green;
5. final ZIP remains <= 13,312 bytes with a useful safety margin;
6. visual improvement is obvious in a side-by-side screenshot.
