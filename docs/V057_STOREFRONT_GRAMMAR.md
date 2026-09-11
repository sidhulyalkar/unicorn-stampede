# v0.57 semantic storefront grammar

## Problem

The v0.56 storefronts share a useful structural language, but their identity is still too dependent on arbitrary hue and a large single-character emblem. At gameplay zoom several emblems are misleading (`O` for Bakery, `%` for Toys, `@` for Arcade), while neighboring shops can share nearly identical silhouette/color treatment.

## Design rule

Treat storefronts as a tiny data-oriented component grammar rather than eight hand-authored drawings or JavaScript classes. Each building already owns a stable semantic `k` in `0..7`; v0.57 makes that one value drive reusable visual components:

- palette: one stable hue per venue type;
- roof: compact bitmask selects gabled vs flat silhouette;
- awning: compact bitmask selects striped retail/food awnings;
- facade: shared window / centered-door / window grammar;
- emblem: one conservative ASCII cue, with the full venue name remaining authoritative.

## Semantic families

| k | Venue | Cue | Palette / silhouette intent |
|---:|---|---|---|
| 0 | Bakery | `B` + striped awning | warm orange, gabled |
| 1 | Bank | `$` | muted red, civic gable |
| 2 | Books | `=` | olive / stacked-book cue, flat |
| 3 | Cafe | `C` + striped awning | teal, flat |
| 4 | Florist | `*` + striped awning | magenta, gabled |
| 5 | Market | `M` + striped awning | ochre, flat |
| 6 | Toys | `T` | bright blue, gabled |
| 7 | Arcade | `A` | purple, flat / marquee-like |

The emblem alphabet intentionally stays ASCII. Fancy Unicode pictograms vary by browser/font and cost extra UTF-8 bytes; at js13k scale the full label + color + silhouette is the more robust semantic channel.

## Gameplay boundary

HP/value multipliers remain determined during object creation exactly as before. Stable semantic hue is assigned after generation, so it cannot alter building HP/value, collision, scoring, placement, destruction timing, landmarks, AI, or conquest.

## Promotion gate

A candidate only replaces RC1 if it is obviously clearer in a normal-zoom screenshot, all historical/liveness tests stay green, and the exact ZIP remains within 13,312 bytes with useful safety margin.
