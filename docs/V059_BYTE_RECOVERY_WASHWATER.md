# v0.59 — Quality-preserving byte recovery + sandy Washwater

## Goal

Recover the byte cost of the v0.58 mixed-use town without removing Prismborough, Washwater Bay, Cloudtop Heights, the herd-management game, or the town's core visual language.

## Protected visual features

- mixed residential + commercial lots
- pitched/flat roof silhouette variation
- striped shop awnings
- windows and centered doors
- small readable storefront signboards
- shop-specific color identity
- residential attic windows, fences and shrubs
- useful street furniture
- damage readability

## Washwater palette

Washwater uses warm sandy ground `#d2bc92` against the existing cool river/shore material `#567f8c`. Cloudtop retains slate `#74889a`; Prismborough and the tutorial retain green `#78986d`.

The intent is visual hierarchy rather than decoration: warm land makes the winding cool-water corridor, bridge crossings and marina immediately legible.

## Compression strategy

The v0.58 facade system stored several explicit body/roof palettes and a bespoke per-shop icon renderer. v0.59 moves the same identity into a smaller grammar:

- compact shop hue authority
- HSL-derived bodies and roof materials
- shared roof/awning/window geometry
- shared signboard marker plus full label
- shared prop grammar for market/florist, cafe and arcade
- shared residential grammar
- shared street furniture

This deliberately attacks representation before content. World topology, AI, scoring, conquest, capture/rescue, power-ups, difficulty, Smart Shift and progression remain outside the visual optimization boundary.

## Qualification gate

The candidate is not releasable until it passes the complete historical gameplay suite, three-world liveness matrix, world-specific topology contracts, packed-browser smoke and exact compression report.

If visual review finds the compressed grammar materially worse than v0.58, the visual reference wins and optimization continues elsewhere rather than accepting a quality regression.
