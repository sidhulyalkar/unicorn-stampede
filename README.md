# 🦄 Unicorn Stampede

**A six-unicorn arcade-strategy game for js13kGames 2026.**

You control one unicorn at a time while the rest of the herd keeps moving, follows routes you leave behind, gets distracted, fights the town, and can be captured.

> **Manage the herd. Destroy the town. Recover when the plan goes sideways.**

The challenge is not only steering quickly. It is keeping several chaotic plans useful at once while the town actively fights back.

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

### Steer and paint

Movement paints Rainbow Highway. Paint is both territory and infrastructure. Unattended unicorns behave better on painted routes, so strong play creates paths that remain useful after you switch away.

### Whip and Dash

Click beside the active unicorn's white ring to crack the Rainbow Whip. Charge grows from **1/5 to 5/5**. Space Dashes at 2/5 or more, and higher charge creates a longer, stronger Dash.

Use Whip + Dash to smash structures, reach power-ups, intercept cleaners, repaint endangered districts, chase prison trucks, and rescue captured unicorns. Three rapid Whips can trigger a Prism burst with nearby structural damage.

### Smart Shift

Shift is not a blind next-unit button. Its urgency order is:

**DISTRACTED > STALLED > OFF-ROUTE > POWERUP > NEGLECTED**

A nearby useful power-up matters, but it never outranks a real herd crisis.

Rapid Shift has short-term memory. Recently visited unicorns are temporarily deprioritized, so several quick taps explore different parts of the herd instead of bouncing between the same pair.

A normal Shift asks **who needs me most right now?** Three rapid Shifts mean **show me the rest of the herd.**

## Team gates

Some landmarks require several live unicorns nearby before they can take damage. The game now states this directly instead of introducing a separate “Rally” term.

A message such as:

**TEAM 2/3**

means **two qualifying unicorns are already near the target and three are required**, so bring one more.

The Clock Tower introduces the idea with a smaller Team requirement. Town Hall requires a larger group, and harder difficulties can raise the requirement. Once Chaos is ready, the live Hall objective itself shows the current count, for example:

**TEAM 2/3 • HALL**

This keeps the mechanic concrete and visible while you play.

## Contextual coaching on Easy

Easy mode has a deliberately sparse assistance layer. It does not continuously narrate the game and it never outranks important state messages.

When existing gameplay state suggests the player may have tunnel-visioned onto one unicorn, the HUD can briefly show:

**TIP • SHIFT → CHECK HERD**

This is derived from the same attention-age data Smart Shift already uses. No extra tutorial timer or hidden progression system is needed.

When the herd is safe and useful pickups remain, Normal can occasionally show:

**TIP • AIM FOR POWER-UPS**

Coaching is suppressed when:

- a capture/prisoner needs attention;
- an important gameplay or stage message is active;
- difficulty is Medium, Hard, or Impossible;
- Stampede+ is active.

The intent is a quiet safety net for first runs, not a permanent hint banner.

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

Cleaners target distracted unattended unicorns.

A captured unicorn rides with its prison truck. The truck carries the captive's color and is explicitly labeled **RESCUE**.

To rescue:

1. intercept the prison truck with Dash, Frenzy, or Boost;
2. stun the truck;
3. bring **two live unicorns** close to it.

`RESCUE 1/2` means the truck is stopped but a second unicorn still needs to arrive. Successful rescues award score because recovery is part of mastery.

### REBUILD

Cleaners can rebuild ordinary destroyed structures, reversing some structural progress. Landmarks remain permanent milestones.

## Campaign worlds

### Prismborough

The open civic-grid baseline. It emphasizes readable streets, distributed herd attention, landmarks, distractions, and free routing.

### Washwater Bay

A waterfront world built around a winding river, two bridge corridors, marina space, and aggressive cleanup patrols. Crossing the river concentrates routes and makes rescue/territory decisions more deliberate.

### Cloudtop Heights

Alternating stone cliff passes and a reversing crosswind turn the map into a top/bottom slalom. Route timing and recovery matter more than generic distraction pressure.

## Difficulty

Difficulty is systemic rather than a shrinking death clock. Higher settings combine higher coverage requirements, tougher structures, larger Team requirements, fewer power-ups, faster traffic, stronger cleanup pressure, tighter rescue geometry, and stronger environmental interference.

Modes: **Easy, Medium, Hard, Impossible**.

## The final takeover

Town Hall is the climax trigger, not the entire win condition. After the Hall falls, the HUD explicitly enters **TAKEOVER**. You must secure all four district checkpoints, reach the current global color target, and have no captured unicorns. Once those conditions are true together, victory latches immediately and cannot be stolen during the celebration.

The successful transition has several readable beats:

**TAKEOVER → CONQUEST READY → TOWN HALL FALLS! → RAINBOW TAKEOVER! → TOWN CONQUERED**

The explosion is anchored to the actual Town Hall geometry, the town receives a six-band rainbow wash, celebration bursts appear across the city, and the final score is overlaid on the conquered town itself.

Defeat is similarly staged:

**3 CAPTURED! → HERD COLLAPSE! → HERD COLLAPSED**

Result screens remain latched until a fresh Enter press. Space, clicks, held/repeated Enter, and residual gameplay input cannot accidentally restart the run. Fresh Enter returns to the title/world/difficulty page so the next run is deliberate.

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

The game does not ship sprite sheets. Town art is generated with a compact procedural drawing grammar shared across buildings and landmarks.

Building family, facade rhythm, roof shape, windows, awnings, masonry, flowers, hue, damage color, and landmark treatment are composed from reusable Canvas primitives. The same approach powers district overlays, roads, traffic, water, vegetation, weather, paint, particles, and the six unicorns.

The goal is a tiny hand-authored vector codebook: **more visual variety from shared geometry instead of stored pixels.**

## Score philosophy

There is no remaining-time bonus. Score rewards useful play: painting territory, destroying structures, breaking landmarks, Whip/Prism chains, stunning cleaners, rescuing prisoners, and completing conquest.

A messy run can still be worth finishing. Recovery is a skill, not dead time.

## Canonical source architecture

v0.36 keeps the readable source as the shipped game architecture. The release graph is nine modules:

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

There is no hidden semantic rewrite pass before packing. `release-prune.mjs` acts as a contract/auditor and rejects retired architecture if it reappears.

Retired state includes timer defeat/runtime state, elapsed-time herd unlocks, dual-captain Dash architecture, release-only best-score persistence, movement-release auto-switching, and superseded intermediate HUD layers.

## Qualification

```bash
npm install
npm test
npm run build
```

The qualification suite protects the 13,312-byte js13k ceiling, canonical release-source parity, staged 4 → 5 → 6 progression, no timer state, Shift-only handoff, Smart Shift urgency/rapid scan, Whip/Dash behavior, procedural facades, direct Team gates, Normal contextual coaching, SWEEP/SNATCH/REBUILD, rescue/collapse, difficulty separation, explicit Takeover objectives, immediate conquest latching, clickable title configuration, packed pointer interactions, latched results, menu replay, browser-safe preview parity, and one-root-file submission ZIP integrity.

The project treats the byte limit as a design constraint: bytes should buy clearer decisions, richer feedback, stronger game feel, or reusable visual grammar. Decorative code that does not improve play has to earn its seat on the unicorn bus.
