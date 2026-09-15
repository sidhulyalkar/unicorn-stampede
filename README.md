# 🦄 Unicorn Stampede

**A six-unicorn arcade-strategy game born as a js13kGames 2026 entry and continued as a richer post-competition showcase.**

You control one unicorn at a time while the rest of the herd keeps moving, follows routes you leave behind, gets distracted, fights the town, and can be captured.

> **Manage the herd. Destroy the town. Recover when the plan goes sideways.**

The challenge is not only steering quickly. It is keeping several chaotic plans useful at once while the town actively fights back.

## Two editions

The repository deliberately has two product targets.

- **Competition artifact:** `release/js13k-2026-submitted` is the frozen, byte-qualified js13k lineage. The submitted package was qualified at **13,307 / 13,312 bytes**.
- **Showcase edition:** `main` is the post-js13k version intended for continued development and sidhulyalkar.com. It keeps the competition rules at its core, but uses normal web-game headroom for richer towns, four regional worlds, accessibility/settings, cross-browser hardening, Smart Attention feedback, persistent mastery, Herd Flow, Living Conquest, lifecycle hooks, and run intelligence.

The showcase is not trying to spend every recovered byte on decoration. New systems should make decisions clearer, make expertise easier to see, make the town react more convincingly, or help us measure whether the intended mastery signals actually correspond to better distributed play.

## The game in 20 seconds

### Win

1. **Break the four outer landmarks**: Bakery, Market, Greenhouse, Clock Tower.
2. Build enough combined paint + destruction to reach **Chaos**.
3. **Team up enough unicorns near Town Hall** and smash it.
4. Enter **Takeover**: secure all four districts and reach the global color target.
5. Keep the whole herd free: rescue any captured unicorns.

The instant Hall + districts + color + herd safety are all satisfied, conquest locks. The city erupts into rainbow color and the run resolves to **TOWN CONQUERED**. Ordinary buildings are useful for Chaos and score, but destroying every building is not a hidden win requirement.

### Lose

**Three captured unicorns = game over.**

One capture is recoverable. Two captures are a red-alert state. The HUD changes to **DANGER 2/3** and the current objective becomes **RESCUE NOW 2/3** so survival takes priority over ordinary conquest goals.

There is **no timer defeat** and no gameplay timer state.

## Controls

| Input | Action |
| --- | --- |
| **WASD** | steer the active unicorn and paint Rainbow Highway |
| **Mouse** | aim the Rainbow Whip |
| **Left click beside the white ring** | crack the Whip and build charge |
| **Space** | spend 2/5 to 5/5 Whip charge on Dash |
| **Shift** | smart-switch to the herd member that most needs attention |
| **Shift ×3 quickly** | sweep through different herd members to scan the map |
| **P / Esc** | pause and view Rules |
| **A / D or click world on title** | change world |
| **M or click difficulty on title** | change difficulty |
| **T or click Tutorial on title** | toggle tutorial |
| **C or click Rules on title** | open Rules |
| **Enter / Space or click Start** | launch the selected configuration |

**Releasing WASD never switches unicorns. Shift is the intentional herd-handoff control.**

## The core verbs

### Steer, paint, and leave a plan running

Movement paints Rainbow Highway. Paint is both territory and infrastructure. Unattended unicorns behave better on painted routes, so strong play creates paths that remain useful after you switch away.

When a moving captain is handed off with Shift in the showcase edition, the existing directional order becomes visibly persistent in the world. A fading route ribbon shows where that unicorn is still committed and roughly how long the order remains. This is visualization of existing order state, not a waypoint editor or a second command system.

### Whip and Dash

Click beside the active unicorn's white ring to crack the Rainbow Whip. Charge grows from **1/5 to 5/5**. Space Dashes at 2/5 or more, and higher charge creates a longer, stronger Dash.

Use Whip + Dash to smash structures, reach power-ups, intercept cleaners, repaint endangered districts, chase prison trucks, and rescue captured unicorns. Three rapid Whips can trigger a Prism burst with nearby structural damage.

### Smart Shift

Shift is not a blind next-unit button. Its urgency order is:

**DISTRACTED > STALLED > OFF-ROUTE > POWERUP > NEGLECTED**

The showcase extends that policy with explainable risk signals such as edge danger and Faultline slip. A nearby useful power-up matters, but it never outranks a real herd crisis.

Rapid Shift has short-term memory. Recently visited unicorns are temporarily deprioritized, so several quick taps explore different parts of the herd instead of bouncing between the same pair.

A normal Shift asks **who needs me most right now?** Three rapid Shifts mean **show me the rest of the herd.**

## Herd Flow

The showcase edition makes distributed expertise explicit without adding a new input.

Productive actions by different live unicorns within a short window build **Herd Flow** from 1X to 5X. Intentional moving-captain route handoffs, power-up pickups, structure destruction, and completed rescues can contribute. Repeating actions with the same unicorn refreshes the window but does not inflate the distinct-herd chain.

At 3X the Smart Play feed recognizes **HERD FLOW**. At 5X it recognizes **FULL STAMPEDE**. Flow is currently a feedback and measurement layer, not a score multiplier. Runs record peak Flow, total Flow actions, and player-authored route orders so future balance decisions can be grounded in whether the signal actually predicts better play.

## Team gates

Some landmarks require several live unicorns nearby before they can take damage. The game states this directly instead of introducing a separate “Rally” term.

A message such as **TEAM 2/3** means two qualifying unicorns are already near the target and three are required, so bring one more.

The Clock Tower introduces the idea with a smaller Team requirement. Town Hall requires a larger group, and harder difficulties can raise the requirement. Once Chaos is ready, the live Hall objective itself shows the current count, for example **TEAM 2/3 • HALL**.

## Contextual coaching on Easy

Easy mode has a deliberately sparse assistance layer. It does not continuously narrate the game and it never outranks important state messages.

When existing gameplay state suggests the player may have tunnel-visioned onto one unicorn, the HUD can briefly show **TIP • SHIFT → CHECK HERD**. When the herd is safe and useful pickups remain, Normal can occasionally show **TIP • AIM FOR POWER-UPS**.

Coaching is suppressed when a capture/prisoner needs attention, an important gameplay or stage message is active, difficulty is Medium/Hard/Impossible, or Stampede+ is active. The intent is a quiet safety net for first runs, not a permanent hint banner.

## Staged herd progression

A campaign begins with **four active unicorns**. Herd growth is event-driven, never time-driven:

- **ACT I:** 4/6 unicorns, break outer landmarks.
- Destroy landmark #2: **ACT II**, Comet joins, 5/6.
- Destroy landmark #4: **ACT III**, full herd, 6/6.
- Smash Town Hall: **TAKEOVER** begins.

The HUD briefly shows each stage card, then returns to the live objective so escalation is readable without stopping play.

## Distraction and BICKER

The town contains things unicorns find irresistible: fountains, flowers, ponds, flies, and other herd members. Unattended unicorns can become distracted. If several bunch together too heavily they can enter **BICKER** and stop contributing useful building damage.

Painted routes, Smart Shift, and deliberate spreading help keep the herd productive.

## The town fights back

Each run rotates through defensive doctrines.

### SWEEP

Cleaners erase painted infrastructure faster.

### SNATCH

Cleaners target distracted unattended unicorns. A captured unicorn rides with its prison truck. The truck carries the captive's color and is explicitly labeled **RESCUE**.

To rescue, intercept the prison truck with Dash/Frenzy/Boost, stun it, and bring **two live unicorns** close to it. `RESCUE 1/2` means the truck is stopped but a second unicorn still needs to arrive. Successful rescues award score because recovery is part of mastery.

### REBUILD

Cleaners can rebuild ordinary destroyed structures, reversing some structural progress. Landmarks remain permanent milestones.

## Campaign worlds

### Prismborough

The open civic-grid baseline. It emphasizes readable streets, distributed herd attention, landmarks, distractions, formal gardens, civic parades, and free routing.

### Washwater Bay

A waterfront world built around a winding river, bridge corridors, marina space, ferries, harbor furniture, and aggressive cleanup patrols. Crossing the river concentrates routes and makes rescue/territory decisions more deliberate.

### Cloudtop Heights

Alternating stone cliff passes and a reversing crosswind turn the map into a top/bottom slalom. Cable transit, wind shadows, exposed saddles, rain, and restrained gray architecture make route timing and recovery more important than generic distraction pressure.

### Faultline Frontier

A sunbaked frontier town with stagecoaches, named timber façades, six staged fissures, degrading fences, wranglers, slip pressure, and a capture/rescue loop. It is the showcase's strongest stress test of whether the player can keep several routes useful while the terrain itself becomes unreliable.

## Living Conquest

The post-js13k town is not only a backdrop. It increasingly acts as a record of the run.

- Active player-authored route orders remain visible as fading world-space ribbons.
- Destroyed structures retain deterministic, world-specific rubble instead of collapsing visually into a generic flat rectangle.
- District paint progress grows visible rainbow standards around the town.
- A district is shown as **SECURED** only after Town Hall is down and the core game's authoritative district-completion bit is set.
- Civilians flee nearby structural collapses, while strong Herd Flow and district securing can produce local celebration. Panic always wins over cheering.

These systems are intentionally presentation-only. They read authoritative game state; they do not create a second set of conquest, collision, scoring, or AI rules.

## Run Intelligence

The result screen now goes beyond dumping counters. It turns existing telemetry into a short, deterministic **RUN READ** plus a **NEXT EXPERIMENT**.

The interpreter can describe patterns such as distributed coordination, route-heavy play, crisis-driven attention, or recovery under capture pressure. It uses peak Flow, route orders, Flow actions, explained Smart Attention reasons, capture burden, destruction, and elapsed time. It does not change score, grant rewards, or claim that one strategy is optimal.

The goal is to make each run useful evidence. Before Flow or any mastery signal receives more mechanical weight, we want to know whether it actually tracks cleaner or more effective play.

## Difficulty

Difficulty is systemic rather than a shrinking death clock. Higher settings combine higher coverage requirements, tougher structures, larger Team requirements, fewer power-ups, faster traffic, stronger cleanup pressure, tighter rescue geometry, and stronger environmental interference.

Modes: **Easy, Medium, Hard, Impossible**.

## The final takeover

Town Hall is the climax trigger, not the entire win condition. After the Hall falls, the HUD explicitly enters **TAKEOVER**. You must secure all four district checkpoints, reach the current global color target, and have no captured unicorns. Once those conditions are true together, victory latches immediately and cannot be stolen during the celebration.

The successful transition has several readable beats:

**TAKEOVER → CONQUEST READY → TOWN HALL FALLS! → RAINBOW TAKEOVER! → TOWN CONQUERED**

The explosion is anchored to the actual Town Hall geometry, the town receives a six-band rainbow wash, celebration bursts appear across the city, and the final score is overlaid on the conquered town itself.

Defeat is similarly staged: **3 CAPTURED! → HERD COLLAPSE! → HERD COLLAPSED**.

Result screens remain latched until a fresh Enter press. Space, clicks, held/repeated Enter, and residual gameplay input cannot accidentally restart the run. The showcase debrief surfaces mastery, Smart Play moments, attention reasons, peak Herd Flow, route orders, Flow actions, the run read, and a measurable next experiment.

## Training

Training teaches the permanent control language in a small town:

1. WASD movement;
2. Whip the white ring twice;
3. Dash;
4. Shift to another unicorn;
5. leave a route running;
6. identify a stuck/distracted herd member;
7. Shift back and pull it free;
8. Whip twice again;
9. smash the Bakery;
10. **Shift ×3 to scan the herd, then Whip and Dash freely.**

The controls do not secretly change between Training and campaign play.

## Visual architecture

The game does not depend on sprite sheets. Town art is generated from a procedural drawing grammar shared across buildings and landmarks.

Building family, facade rhythm, roof shape, windows, awnings, masonry, flowers, hue, damage color, landmark treatment, gardens, furniture, regional transit, weather, destruction debris, district standards, paint, particles, civilians, and the six unicorns are composed from reusable Canvas primitives.

The post-js13k renderer also caches invariant world surfaces and can reduce decorative density on slower devices. The goal is still the same tiny-game idea at larger scale: **visual variety from shared geometry and meaningful state, not a pile of stored pixels.**

## Mastery and score philosophy

There is no remaining-time bonus. Score rewards useful play: painting territory, destroying structures, breaking landmarks, Whip/Prism chains, stunning cleaners, rescuing prisoners, and completing conquest. A messy run can still be worth finishing. Recovery is a skill, not dead time.

The showcase adds a separate persistent three-star mastery track per world: **CONQUER**, **CLEAN HERD**, and **SHOWCASE FLAIR**. Stars describe how cleanly the player managed the town; they do not lock the campaign worlds.

## Architecture

The frozen competition build keeps the readable nine-module source graph:

```text
core.js
herd.js
render.js
ui.js
top10.js
polish.js
whip.js
worlds.js
expansion.js
```

There is no hidden semantic rewrite pass before packing. `release-prune.mjs` acts as a contract/auditor for that release lineage.

The **showcase edition** deliberately layers additional readable modules over that stable core: regional surface/art systems, world actors, Faultline simulation, settings/audio/input, performance and boundary guards, Smart Attention, transition safety, feel/telemetry, authored satisfaction, Herd Flow, Living Conquest, Run Intelligence, mastery, and native menu/session UI.

v1.16 establishes `showcase-hooks.js` as the ordered extension seam for newer cross-cutting systems. The mature legacy stack is wrapped once after the v1.10 satisfaction layer; Herd Flow and Living Conquest now register named listeners instead of adding their own `startLevel` / `update` / `world` / render wrappers. Listener priorities are explicit, duplicate IDs are rejected, and qualification can inspect the registration/dispatch graph.

This is intentionally an incremental migration, not a rewrite. New cross-cutting systems should use the hook bridge. Older wrappers should migrate only when that lifecycle surface is actively being changed and the old behavior can be kept under the same browser contract.

## Qualification

```bash
npm install
npm test
npm run build
```

The competition suite protects the 13,312-byte ceiling, canonical release-source parity, staged 4 → 5 → 6 progression, no timer state, Shift-only handoff, Smart Shift urgency/rapid scan, Whip/Dash behavior, procedural facades, Team gates, coaching, defensive doctrines, rescue/collapse, difficulty separation, Takeover objectives, conquest latching, packed pointer interactions, latched results, browser-safe preview parity, and one-root-file submission ZIP integrity.

The post-js13k showcase adds Chromium and Firefox qualification for visual/system composition, pedestrian/building solidity, deterministic long-run stress, capture/rescue transitions, Faultline lifecycle seams, Smart Attention readability, authored satisfaction/mastery, Herd Flow semantics, Living Conquest state authority, lifecycle-hook ordering/removal, deterministic run interpretation, menu UX, and standalone HTML packaging.

The original byte philosophy still applies even without the hard 13 KB ceiling: a new system should buy clearer decisions, stronger game feel, measurable mastery, or a more reactive world. Decorative complexity that does none of those things still has to earn its seat on the unicorn bus.
