# Unicorn Stampede showcase v1.14 - Herd Flow

## Goal

Make expert herd management visibly different from novice play without adding another control or changing the frozen competition rules.

The v1.14 pass adds a short-lived **Herd Flow** state. Productive actions performed by different unicorns within a six-second window build a 1X–5X multi-unicorn chain. Repeating actions with the same unicorn refreshes the window but does not inflate the chain, so the signal measures distributed herd management rather than button spam.

## Productive actions

The first v1.14 contract counts only actions that already have clear game value:

- committing a moving unicorn to a route during a Smart Attention handoff;
- collecting a power-up;
- destroying a structure;
- completing a capture/rescue transition.

Route handoffs are the most intentional input in this set. They make Flow achievable through deliberate multi-unicorn planning rather than relying on autonomous destruction to line up by chance.

At 3X, the existing Smart Play feed calls out **HERD FLOW**. At 5X it calls out **FULL STAMPEDE**. These use the current satisfaction/mastery vocabulary instead of introducing another reward system.

## Visual feedback

Recent productive herd members receive temporary world-space rings, with the latest contributor carrying the compact `HERD FLOW nX` label. The indicator expires with the chain and respects reduced-motion settings.

Structure collapse now also produces a crowd response: nearby civilians receive an outward velocity impulse plus a short alarm marker. Their positions still advance through the existing pedestrian update and full-body building collision rules, so the detail layer cannot legally route pedestrians through structures.

## Telemetry

The run stats object now records:

- `flowActions` - productive actions observed by v1.14;
- `peakFlow` - highest distinct-unicorn chain reached during the run.

The public `showcaseFlowState()` snapshot is intentionally read-only and supports playtest instrumentation and deterministic browser qualification.

## Qualification contract

Cross-browser Chromium and Firefox coverage requires:

1. repeated productive actions by one unicorn do not grow the chain;
2. three different live unicorns produce exactly a 3X chain and fire the `herd-flow` Smart Play event;
3. a moving captain handoff creates a route and registers that outgoing unicorn as a Flow contributor;
4. flow telemetry records actions and peak chain;
5. the six-second window expires deterministically;
6. crowd shock moves nearby civilians without leaving them inside solid pedestrian space;
7. no page errors occur during the contract.

## Next measurements

The next balance pass should measure whether stronger players naturally reach 3X/5X more often, whether the six-second window is readable rather than frantic, and whether Herd Flow predicts better conquest time or paint retention. If it does not correlate with better play, the mechanic should be revised rather than made louder.
