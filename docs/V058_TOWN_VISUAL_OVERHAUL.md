# v0.58 town visual overhaul

## Goal

Make Unicorn Stampede read as a real whimsical town at ordinary gameplay zoom before returning to byte optimization.

The target is the generated town mockup from the design review: mixed residential/commercial blocks, small readable signs, striped awnings, pitched roofs, display windows, fences, shrubs, lamps, benches, and shop-specific props. The art stays procedural Canvas 2D; no raster artwork is embedded in the cartridge.

## Visual hierarchy

A building should be recognized in this order:

1. silhouette / roofline;
2. residential vs commercial facade;
3. palette and awning;
4. storefront prop or small icon;
5. compact sign text.

Giant single-letter facade emblems are retired.

## Mixed-use composition

The tutorial/title town deliberately mirrors the concept composition:

1. residence
2. market
3. cafe
4. bakery
5. toys
6. arcade
7. florist
8. residence

Main towns use a repeating mixed-use grammar with residences interspersed between commercial lots. Residences receive several palette/roof variants so they do not look cloned.

## Reusable building grammar

The renderer is built from shared primitives rather than bespoke per-shop renderers:

- `drawTownRoof`
- `drawTownAwning`
- `townWindow`
- `drawTownIcon`
- `drawHouseDetails`
- `drawShopProps`
- `townLamp`
- `townBench`
- `townBush`
- `townFence`
- `drawTownBuilding`

The shop token selects a recipe while all drawing control flow is shared.

## Shop language

- Bakery: cool blue facade, pitched roof, striped awning, bread display/icon.
- Market: green facade, striped awning, produce crate and basket/produce cue.
- Cafe: mint facade, striped awning, cup cue, sidewalk board.
- Florist: pink facade, striped awning, flower cue and flower pots.
- Toys: purple facade, playful display-window blocks/ball.
- Arcade: dark indigo facade, compact gamepad cue and neon marquee accents.
- Bank: brick/red civic facade and small column/pediment cue; used more sparingly than the everyday shops.
- Residence: unlabeled cream/pastel house, pitched roof, attic window, fence and shrubs.

## Gameplay boundary

This tranche is visual-only. Building hitboxes, HP/value authority, scoring, conquest, AI, roads, power-ups, capture/rescue, difficulty, landmark logic, and world topology are intentionally unchanged.

`k` and `v` are visual recipe tokens assigned only after level generation, so the generation-time building durability/value calculation remains authoritative.

## Byte policy

v0.58 intentionally permits an oversized cartridge. Visual quality is being established first. Once the target look survives hands-on playtesting, a separate optimization tranche will measure byte value per visual component and compress/cut from the locked design rather than designing under premature byte pressure.

## Promotion criteria

- title/tutorial immediately reads as a town, not a symbol grid;
- at least two visible residences in the tutorial scene;
- no giant single-letter storefront emblems;
- shops remain distinguishable at gameplay zoom;
- full historical gameplay/liveness suite remains green apart from the intentionally suspended hard 13 KB gate;
- no new collision or liveness regressions.
