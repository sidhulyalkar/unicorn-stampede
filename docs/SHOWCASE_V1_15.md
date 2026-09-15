# Unicorn Stampede showcase v1.15 — Living Conquest

## Why this pass exists

The showcase already has strong procedural town art, world-specific traffic and weather, authored impact feedback, Smart Attention handoffs, persistent mastery, and Herd Flow. The weakest link is no longer content density. It is **consequence readability**.

A player can make a good multi-unicorn plan, smash half a block, or finish a district, yet too much of that work disappears into HUD numbers or short-lived particles. v1.15 makes the world retain and explain those actions without changing the competition rules or adding controls.

## Design rule

**Show the plan. Keep the scar. Celebrate the takeover.**

The new layer is presentation-only. It cannot decide collisions, scoring, district completion, conquest, AI targeting, or herd physics. It reads existing authoritative state and turns it into persistent visual evidence.

## Route intent

Unattended unicorns with an active player-authored route now carry a fading world-space route ribbon:

- the ribbon follows the existing `ox` / `oy` order vector;
- remaining order duration controls its visual strength and length;
- a short `ROUTE Ns` label appears early in the order;
- reduced-motion mode removes route pulsing while preserving information;
- no new waypoint, pathfinding, or control state is introduced.

This makes the central six-agent idea legible: a skilled player should be able to glance at the town and see several plans running at once.

## Persistent destruction

Destroyed structures no longer read only as flat colored foundations in the showcase. v1.15 overlays deterministic rubble and beams using each world's material language:

- Prismborough keeps bright civic/festival fragments;
- Washwater carries weathered harbor material and water accents;
- Cloudtop leaves gray masonry with sparse warm remnants;
- Faultline Frontier leaves timber, rope/beam fragments, and sunbaked debris.

The rubble is deterministic from object geometry, so rendering does not consume simulation RNG or mutate gameplay state.

## District takeover

District standards turn paint progress into world-space feedback. Paint ratio controls gradual pennant buildup, but **district completion is never inferred by the showcase layer**.

A district becomes `SECURED` only when:

1. Town Hall is already down; and
2. the core game has set that district's authoritative `dmask` bit.

That transition produces a short ring/callout and nearby civilian celebration. The showcase therefore cannot visually claim a district before the actual game does.

## Town reaction

v1.14 made civilians flee nearby collapses. v1.15 adds the positive half of the town's emotional grammar:

- 3X and 5X Herd Flow can trigger nearby crowd celebration;
- district securing can trigger a local celebration;
- panic always visually overrides cheering;
- celebration does not move pedestrians or alter collision authority.

The town now reacts differently to danger and coordinated mastery instead of functioning as decorative population density.

## Debrief and telemetry

Herd Flow is promoted from hidden instrumentation into the run debrief. The showcase now surfaces:

- peak Flow;
- player-authored route orders;
- total Flow actions;
- Herd Flow and Full Stampede in the named Smart Play summary.

Flow still does **not** multiply score. The purpose of this pass is to make the signal measurable and understandable before deciding whether it deserves mechanical weight.

## Qualification boundary

Chromium and Firefox qualification covers:

1. a moving-captain handoff creates an active route visualization and increments route-order telemetry;
2. three distinct Flow contributors produce celebration and preserve Flow telemetry;
3. destroying an ordinary structure adds one persistent ruin representation;
4. a district cannot visually secure before Town Hall falls even if its bit/progress is prepared;
5. after Town Hall falls, the authoritative district bit triggers exactly the Living Conquest transition;
6. the new layer renders without page errors;
7. all existing core, stress, capture/rescue, Frontier, Smart Director, menu, and mastery suites remain unchanged and green.

## What v1.15 deliberately does not do

It does not add another resource meter, score multiplier, command mode, unit-selection system, minimap, waypoint editor, or progression currency. The game already has enough verbs. This pass spends complexity on **making existing verbs visible**.

## Next frontier

The next high-value work is less visual and more architectural/evidentiary:

- correlate `peakFlow`, `routeOrders`, capture burden, conquest time, paint retention, and player skill across real runs;
- determine whether Herd Flow is actually predictive of better play;
- replace the growing stack of global showcase function wrappers with a small ordered lifecycle/hook system so future presentation layers are easier to reason about and test;
- add replay-level decision inspection only if it helps tune the game rather than merely producing more telemetry.
