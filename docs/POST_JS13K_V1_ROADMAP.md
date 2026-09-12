# Unicorn Stampede after js13k: v1.0 world expansion roadmap

The js13k build proves the core loop: manage a semi-autonomous herd, switch deliberately, create chaos, team up for landmarks, survive the town response, and conquer the map. The post-competition version should expand **world identity** rather than merely add more objects.

## Product rule

Every region must differ along five axes:

1. **Navigation topology** — how the herd crosses the map.
2. **Environmental system** — the local force that changes movement and decisions.
3. **Architecture + street life** — buildings, vehicles, pedestrians and businesses visibly belong there.
4. **Town response** — cleaners/capture/rescue pressure uses the region differently.
5. **Local objective texture** — the shared conquest grammar feels regional in practice.

The strategic language remains landmarks → Chaos → Team Hall → district/color takeover. A new region should change *how* the player solves that loop without making them relearn the whole game.

## Prismborough: civic playground

- downtown, residential, park and civic neighborhoods
- plazas, fountains, crosswalks and traffic signals
- denser street life and neighborhood events
- civic-response vehicles and crowd reactions
- visually dominant Town Hall district
- expanded residential/shop facade grammar
- parade/festival events that temporarily alter streets

Gameplay identity: the most open map, emphasizing multi-unicorn delegation and long send routes.

## Washwater Bay: working waterfront

- animated water, shoreline foam and beach/sand zones
- boardwalks, piers, docks, stilt houses and boathouses
- fishing boats, ferries and harbor traffic
- opening bridge / ferry timing
- tide or high-water route changes
- wet/slippery dock handling and splash feedback
- fish market, surf, bait and marina architecture
- harbor cleaners using bridges/boats instead of treating water as ground
- pedestrian navmesh favoring boardwalks/crossings

Gameplay identity: staging the herd around chokepoints. Smart Shift should make managing two sides of the water feel deliberate.

## Cloudtop Heights: vertical wind city

- stronger ridge edges, switchbacks and cliff passes
- real moving cable cars on visible tracks
- rooftop/startup district, hill homes and observation plazas
- fog banks, gust corridors and updrafts
- wind visibly bending rainbow trails and paint
- ridge-specific cleaner routes and vertical traffic
- exposed shortcuts versus protected switchbacks
- landmark placement that forces elevation changes

Gameplay identity: momentum and timing. Sending a unicorn with the wind should be strategically different from fighting across it.

## Cross-world systems

### Town simulation
- explicit pedestrian walkability graph/navmesh
- sidewalk/crosswalk preference, flee states and attraction states
- region-specific pedestrian outfits and behaviors
- local vehicle families and traffic rules

### Architecture
- data-driven procedural building grammar
- world palettes + roof families + facade rhythms + prop sets
- residential/commercial/civic/industrial archetypes
- deterministic visual recipes from seeds

### Herd
- preserve Smart Shift priority model and expose its reasoning in debug mode
- richer autonomous intents: attack, paint, power-up, regroup, rescue, continue route
- optional tactical herd status
- clearer world-space DISTRACTED, CAPTURED, SENT and TEAM READY states

### Feedback
- restore rich particle/VFX budget without 13 KB pressure
- water splashes, wind streaks, debris and world-specific effects
- layered adaptive music and ambient audio
- stronger Chaos, Hall-breach and Takeover phase transitions

### Accessibility + input
- full key rebinding
- controller support
- touch/mobile pass
- configurable screen shake / high-contrast markers
- separate music/SFX controls

### Runs + replayability
- deterministic run seed
- post-run stats for paint, destruction, rescues, captures avoided, Team events, near misses and phase times
- transparent scoring breakdown
- medals/challenges for multiple play styles
- optional replay/ghost telemetry for automated balance work

## Technical direction

Keep the 13 KB build frozen as a competition artifact. v1.0 can trade source golf for maintainability:

- separate simulation, rendering and UI
- data-driven world-system interfaces
- spatial index for collision queries
- pedestrian navigation graph/navmesh
- tutorial/objective finite-state machine
- deterministic simulation hooks for automated playtests
- proper vector/sprite/audio asset pipeline where useful
- preserve the headless gameplay contracts and liveness tests from the competition build

## Suggested milestones

### v1.0.0 — Expanded Washwater
Use the strongest current region as the vertical slice: waterfront navigation, ferries/boats, richer water, boardwalk pedestrians, local buildings and harbor-response behavior.

### v1.1.0 — Cloudtop reborn
Make elevation/wind unmistakable with cable cars, fog/gust systems and stronger ridge architecture.

### v1.2.0 — Prismborough living city
Deepen the baseline city with civic/residential neighborhoods, events and denser simulation.

### v1.3.0 — World systems + replay
Shared events, adaptive music, run analytics, challenge medals and deterministic replay hooks.

## Acceptance test for every region

A player shown ten seconds of gameplay with the UI hidden should be able to identify the region from terrain, architecture, movement and town behavior alone. If the only difference is ground color or labels, the region is not finished.
