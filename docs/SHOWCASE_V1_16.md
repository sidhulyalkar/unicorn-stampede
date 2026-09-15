# Unicorn Stampede showcase v1.16 — Hooks + Run Intelligence

## Why this pass exists

v1.15 made the town remember player intent and consequence. The next bottleneck is architectural rather than visual: the showcase has grown by wrapping global lifecycle functions in load order. That pattern was useful while the post-js13k edition was small, but adding more systems that each replace `startLevel`, `update`, `world`, `cycle`, `power`, or `hitObj` would make behavior increasingly dependent on script order.

v1.16 introduces a controlled migration path and uses it for the two newest cross-cutting systems before adding another large feature.

## Design rule

**One extension seam. Explicit order. Evidence before mechanics.**

The frozen competition modules are unchanged. The mature showcase stack through v1.10 remains intact. A single hook bridge wraps the already-qualified stack once, and newer systems register named listeners with explicit priorities.

## Hook bridge

`src/showcase-hooks.js` exposes ordered `before`, `after`, and error phases for the lifecycle surfaces currently needed by the showcase:

- start;
- update;
- cycle;
- power pickup;
- object hit/destruction;
- world render;
- end render;
- town decor render;
- object render;
- civilian render;
- fly/ambient render.

Listeners have stable IDs and priorities. Duplicate IDs on the same event are rejected. Registration returns an unsubscribe function, and the public snapshot exposes listeners and dispatch counts for qualification/debugging.

The hook bridge does not own gameplay state. It only provides an explicit extension seam around the existing functions.

## First migration

Herd Flow and Living Conquest are the first migrated systems.

### Herd Flow

The old v1.14 wrappers around `startLevel`, `cycle`, `power`, `hitObj`, `update`, and `world` are removed. Equivalent listeners now run at priority 20.

The existing contracts remain unchanged:

- moving-captain handoffs can create route Flow;
- power-up use, destruction, and rescue can contribute;
- distinct unicorns build the chain;
- crowd shock and Flow rendering remain presentation/feedback layers;
- Flow still does not multiply score.

### Living Conquest

The old v1.15 wrappers around `startLevel`, `update`, `drawTownStreetDecor`, `drawObjs`, `drawPeople`, and `drawFlies` are removed. Equivalent listeners run at priority 10.

Flow therefore updates before Living Conquest reads it, preserving the established crowd-celebration semantics. Render-stage hooks preserve the previous layer placement for district standards, ruins, civilian celebration, and route ribbons.

## Run Intelligence

The project already records useful evidence about a run. v1.16 makes that evidence interpretable without inventing a rating or changing mechanics.

The debrief derives a short descriptive run profile from existing telemetry:

- peak Herd Flow;
- Flow action count;
- moving-captain route orders;
- explained Smart Attention switch reasons;
- maximum simultaneous capture burden;
- structures destroyed;
- elapsed run time.

Example profiles include `DISTRIBUTED CONDUCTOR`, `ROUTE ARCHITECT`, `CRISIS RESPONDER`, and `RECOVERY SPECIALIST`. These are deterministic descriptions of the recorded run, not ranks, rewards, or hidden scoring categories.

The debrief also emits one `NEXT EXPERIMENT` suggestion based on the strongest observed constraint. Examples include trying to reach 3X Flow, leaving more captains on routes before switching, or reducing emergency edge/fault interventions.

## Why the interpreter is deliberately modest

v1.16 does not claim that high Flow causes better play. It does not tell the player that a particular strategy is optimal. It summarizes what was recorded and proposes a measurable next experiment.

That boundary matters because the next product question is empirical: do the mastery signals actually correlate with cleaner/faster conquest?

## Qualification

v1.16 adds a Chromium + Firefox contract that verifies:

1. Herd Flow and Living Conquest no longer contain their historical wrapper symbols;
2. Flow and Living Conquest are registered on the lifecycle bridge with explicit ordering;
3. higher-priority listeners dispatch before lower-priority listeners and can be removed cleanly;
4. the run interpreter produces deterministic output for a controlled telemetry fixture;
5. the native debrief renders both `RUN READ` and `NEXT EXPERIMENT` while preserving the existing nine telemetry cells;
6. migrated Flow behavior still triggers Living Conquest crowd reaction;
7. existing v1.14 Flow and v1.15 Living Conquest browser contracts remain in the same cross-browser lane;
8. all existing core, stress, transition, Frontier, attention, menu, and standalone gates remain unchanged.

## Migration policy from here

Do not convert every historical showcase module at once.

Instead:

1. all new cross-cutting systems use `showcaseHooks`;
2. migrate an older wrapper only when that lifecycle surface is being actively changed;
3. preserve the old module's browser contract during migration;
4. compare behavior before and after;
5. remove the legacy wrapper only after parity is qualified.

This keeps architectural improvement monotonic without turning a stable game into a rewrite project.

## Next evidence frontier

Once v1.16 is stable, the highest-value development is real-run analysis rather than another decorative subsystem:

- record compact per-run summaries across human playtests;
- compare peak Flow, route frequency, attention reasons, capture burden, paint retention, and conquest outcome/time;
- identify which signals separate clean distributed play from frantic switching;
- only then decide whether Flow or world-specific mastery deserves any additional mechanical weight.
