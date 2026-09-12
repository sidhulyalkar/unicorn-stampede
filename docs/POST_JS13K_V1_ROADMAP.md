# Unicorn Stampede after js13k: v1.0 world expansion roadmap

The js13k build is the proof that the core loop works: manage a semi-autonomous herd, switch deliberately, create chaos, team up for landmarks, survive the town response, and conquer the map. The post-competition version should expand *world identity* rather than merely add more objects.

## Product rule

Every region must differ along five axes:

1. **Navigation topology** — how the herd crosses the map.
2. **Environmental system** — the local force that changes movement and decisions.
3. **Architecture + street life** — buildings, vehicles, pedestrians and businesses should visibly belong there.
4. **Town response** — cleaners/capture/rescue pressure should use the region differently.
5. **Local objective texture** — the same conquest grammar, but landmarks and subgoals should feel regional.

The shared strategic language remains: landmarks → Chaos → Team Hall → district/color takeover. A new region should change *how* the player solves that loop, not make them relearn the entire game.

## Prismborough: civic playground

- distinct downtown, residential, park and civic blocks
- plazas, parks, fountains, crosswalks and traffic signals
- denser pedestrian street life and small neighborhood events
- civic-response vehicles and crowd reactions
- a visually dominant Town Hall district
- more residential and shop facade recipes while retaining instant readability
- dynamic parade/festival events that alter streets temporarily

Gameplay identity: the most open map, best for learning multi-unicorn delegation and long send routes.

## Washwater Bay: working waterfront

- true animated water surface, shoreline foam and beaches
- boardwalks, piers, docks, stilt houses and boathouses
- fishing boats, ferries and harbor traffic
- opening bridge / ferry timing as navigation opportunities
- tide or high-water states that temporarily alter routes
- wet/slippery dock handling and splash feedback
- fish market, surf shops, bait shops and marina architecture
- harbor cleaners that use bridges/boats rather than pretending water is ordinary ground
- pedestrian navmesh that favors boardwalks and crossings

Gameplay identity: route planning under chokepoints. The player should deliberately stage unicorns on opposite sides of water and use Smart Shift to manage both fronts.

## Cloudtop Heights: vertical wind city

- visually stronger ridge edges, switchbacks and cliff passes
- real cable cars following visible tracks
- rooftop/startup district, hill homes and observation plazas
- fog banks, clouds, gust corridors and updraft zones
- wind visibly bends rainbow paint/trails and affects movement
- ridge-specific cleaner routes and vertical traffic
- dangerous exposed shortcuts contrasted with protected switchbacks
- landmarks placed to force movement between elevations

Gameplay identity: momentum and timing. Sending a unicorn with the wind should be strategically different from fighting across it.

## Cross-world systems

### Town simulation
- explicit pedestrian walkability/navmesh instead of spawn correction alone
- crosswalk/sidewalk preference, flee states and attraction to local landmarks
- region-specific pedestrian outfits and behaviors
- local vehicle families and traffic rules

### Architecture
- data-driven procedural building grammar with reusable components
- world palettes + roof families + facade rhythms + prop sets
- residential/commercial/civic/industrial archetypes
- deterministic visual recipes so a seed can reproduce a town exactly

### Herd
- preserve Smart Shift priority model and make its reasoning inspectable in debug mode
- richer autonomous intents: attack, paint, seek power-up, regroup, rescue, continue sent route
- optional tactical overview / quick herd status
- clearer world-space states for DISTRACTED, CAPTURED, SENT and TEAM READY

### Feedback
- restore richer particle/VFX budget without 13 KB constraints
- region-specific impact effects, water splashes, wind streaks and destruction debris
- layered adaptive music and ambient audio per world
- stronger phase-transition presentation for Chaos, Hall breach and Takeover

### Accessibility + input
- complete key rebinding
- controller support
- touch/mobile control pass
- configurable screen shake and high-contrast objective markers
- music/SFX controls

### Runs + replayability
- deterministic run seed
- post-run statistics: paint, destruction, rescues, captures avoided, Team events, near misses, time per phase
- scoring breakdown rather than a single unexplained number
- medals/challenges that reward different styles instead of only speed
- optional replay/ghost telemetry for playtesting and automated balance analysis

## Technical direction

The 13 KB source should remain frozen as a competition artifact. v1.0 can trade source golf for maintainability:

- separate simulation, rendering and UI modules
- data-driven world configuration / world-system interfaces
- explicit spatial index for collision queries
- pedestrian navigation graph/navmesh
- tutorial/objective finite-state machine
- deterministic simulation hooks for automated playtests
- proper asset pipeline for vector/sprite/audio resources where they improve quality
- preserve headless gameplay contracts and liveness tests from the competition build

## Suggested milestones

### v1.0.0 — Expanded Washwater
Use the strongest current region as the vertical slice. Add proper waterfront navigation, ferries/boats, richer water, boardwalk pedestrians, local buildings and harbor-response behavior.

### v1.1.0 — Cloudtop reborn
Make elevation/wind the unmistakable mechanic, add cable cars, fog/gust systems and stronger ridge architecture.

### v1.2.0 — Prismborough living city
Deepen the baseline city with civic/residential neighborhoods, events and denser simulation.

### v1.3.0 — World systems + replay
Shared event system, adaptive music, run analytics, challenge medals and deterministic replay hooks.

## Acceptance test for every region

A player shown ten seconds of gameplay with the UI hidden should be able to identify the region from its terrain, architecture, movement and town behavior alone. If the only difference is ground color or labels, the region is not finished.
