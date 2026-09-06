# 🦄 Unicorn Stampede

**A six-unicorn arcade-strategy game for js13kGames 2026.**

You control one unicorn at a time while the rest of the herd keeps moving, follows routes you leave behind, gets distracted, fights the town, and occasionally gets captured.

> **Manage the herd. Destroy the town. Recover when the plan goes sideways.**

The challenge is not just steering quickly. It is keeping several chaotic plans useful at once while the town actively fights back.

## The game in 20 seconds

### Win

1. **Break the four outer landmarks**: Bakery, Market, Greenhouse, Clock Tower.
2. Build enough combined paint + destruction to reach **Chaos**.
3. Bring enough unicorns together for **Rally** and smash **Town Hall**.
4. Survive **Final Cleanup**.
5. Secure all four districts.
6. Reach the global color target.
7. Rescue any prisoners.
8. Hold the conquered town briefly.

Then the Town Hall falls, the city erupts into rainbow color, and the run ends with **TOWN CONQUERED**.

### Lose

**Three captured unicorns = game over.**

One capture is recoverable. Two captures are a red-alert state. The HUD changes to **DANGER 2/3** and the current objective becomes **RESCUE NOW 2/3** so survival takes priority over ordinary conquest goals.

There is **no timer defeat**. Canonical v0.35 has no gameplay timer state at all.

## Controls

| Input | Action |
| --- | --- |
| **WASD** | steer the active unicorn and paint Rainbow Highway |
| **Mouse** | aim the Rainbow Whip |
| **Left click beside the white ring** | crack the Whip and build charge |
| **Space** | spend 2/5 to 5/5 Whip charge on Dash |
| **Shift** | smart-switch to the herd member that most needs attention |
| **Shift x3 quickly** | sweep through different herd members to scan the map |
| **P / Esc** | pause and view the Rules page |
| **A / D on title** | change unlocked world |
| **M on title** | change difficulty |
| **C on title** | open Rules |

**Releasing WASD never switches unicorns. Shift is the intentional herd-handoff control.**

## The core verbs

### Steer and paint

Movement paints Rainbow Highway. Paint is both territory and infrastructure.

Unattended unicorns behave better on painted routes, so strong play creates paths that remain useful after you switch away.

### Whip and Dash

Click beside the active unicorn's white ring to crack the Rainbow Whip.

Whip charge grows from **1/5 to 5/5**. Space Dashes at 2/5 or more, and higher charge creates a longer, stronger Dash.

Use Whip + Dash to:

- smash structures;
- line up a landmark attack;
- reach power-ups;
- intercept cleaners;
- repaint endangered districts;
- chase a prison truck;
- rescue a captured unicorn.

Three rapid Whips can trigger a Prism burst and nearby structural damage.

### Smart Shift

Shift is not a blind next-unit button. Its urgency order is:

**DISTRACTED > STALLED > OFF-ROUTE > POWERUP > NEGLECTED**

A nearby useful power-up matters, but it never outranks a real herd crisis.

Rapid Shift has short-term memory. Recently visited unicorns are temporarily deprioritized, so several quick taps explore different areas of the herd instead of bouncing between the same pair.

Think of a normal Shift as:

> **Who needs me most right now?**

Think of three rapid Shifts as:

> **Show me the rest of the herd.**

## Staged herd progression

A campaign begins with **four active unicorns**. Herd growth is event-driven, never time-driven:

- **ACT I**: 4/6 unicorns, break outer landmarks.
- Destroy landmark #2: **ACT II**, Comet joins, 5/6.
- Destroy landmark #4: **ACT III**, full herd, 6/6.
- Smash Town Hall: **FINAL CLEANUP**.

The HUD briefly shows each stage card, then hands back to the live objective. This makes escalation readable without stopping play.

## Rally

Some landmarks require several live unicorns nearby before they can take damage.

Clock Tower introduces Rally. Town Hall requires a larger Rally, and harder difficulties increase the requirement.

If an attack is blocked, the game tells you exactly what is missing with messages such as **RALLY 2/3**.

Rally prevents the game from collapsing into one permanently dominant unicorn. Good routes matter because you eventually need the herd in useful relative positions.

## Distraction and BICKER

The town contains things unicorns find irresistible: fountains, flowers, ponds, flies, and other herd members.

Unattended unicorns can become distracted. If several bunch together too heavily they can enter **BICKER** and stop contributing useful building damage.

Painted routes and deliberate spreading help keep the herd productive.

## The town fights back

Each run rotates through defensive doctrines.

### SWEEP

Cleaners erase painted infrastructure faster.

### SNATCH

Cleaners target distracted unattended unicorns.

A captured unicorn rides with its prison truck. The truck now carries the captive's color and is explicitly labeled **RESCUE**.

To rescue:

1. intercept the prison truck with Dash, Frenzy, or Boost;
2. stun the truck;
3. bring **two live unicorns** close to it.

`RESCUE 1/2` means the truck is stopped but a second unicorn still needs to arrive.

Successful rescues award score because recovery is part of mastery.

### REBUILD

Cleaners can rebuild ordinary destroyed structures, reversing some structural progress. Landmarks remain permanent milestones.

## Campaign worlds

### Prisborough

The baseline city. It emphasizes readable streets, landmarks, district structure, and the core herd-management loop.

### Washwater Bay

Faster cleanup pressure plus animated rain. The environmental motion is generated from the shared game clock, so it adds atmosphere without textures or extra runtime state.

### Cloudtop Heights

Moving cloud banks and crosswinds alter movement and Whip timing. The environment becomes part of route planning.

## Difficulty

Difficulty is systemic rather than a shrinking death clock.

Higher settings combine:

- higher coverage requirements;
- tougher structures;
- larger Rally requirements;
- fewer power-ups;
- faster traffic;
- stronger cleanup pressure;
- tighter rescue geometry;
- stronger environmental interference.

Modes: **Normal, Medium, Hard, Impossible**.

## The final takeover

Town Hall is a phase transition, not an instant victory button.

After the Hall falls, Final Cleanup continues attacking your infrastructure. You must still secure districts, reach the color requirement, clear all prisoners, and hold the town.

The successful transition now has multiple readable beats:

**HOLD THE TOWN → TOWN HALL FALLS! → RAINBOW TAKEOVER! → TOWN CONQUERED**

The explosion is anchored to the actual Town Hall geometry, the town receives a six-band rainbow wash, extra celebration bursts appear across the city, and the final score is overlaid on the conquered town itself.

Defeat is similarly staged:

**3 CAPTURED! → HERD COLLAPSE! → HERD COLLAPSED**

Result screens remain latched until a fresh Enter press. Space, clicks, held/repeated Enter, and residual gameplay input cannot accidentally restart the run.

Fresh Enter returns to the title/difficulty page so the player can deliberately choose the next run.

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
10. **Shift x3 to scan the herd, then Whip and Dash freely.**

The controls do not secretly change between Training and campaign play.

## Visual architecture

The game does not ship sprite sheets. Town art is generated with a small procedural drawing grammar shared across buildings and landmarks.

Building family, facade rhythm, roof shape, windows, awnings, masonry, flowers, hue, damage color, and landmark treatment are composed from reusable Canvas primitives. The same idea powers district overlays, roads, traffic, water, vegetation, weather, paint, particles, and the six unicorns.

This is intentionally similar to a tiny hand-authored vector codebook: **more visual variety from shared geometry instead of storing more pixels.**

## Score philosophy

There is no remaining-time bonus.

Score rewards useful play:

- painting territory;
- destroying structures;
- breaking landmarks;
- Whip and Prism chains;
- stunning cleaners;
- rescuing prisoners;
- completing the conquest.

A messy run can still be worth finishing. Recovery is a skill, not dead time.

## Canonical source architecture

v0.35 removed the old release-only archaeology layer. The readable source is now the shipped architecture.

The release graph is nine modules:

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

There is no hidden regex rewrite pass that changes game semantics before packing. `release-prune.mjs` now acts as a contract/auditor and rejects retired architecture if it reappears.

Notable retired state includes:

- timer defeat and timer runtime state;
- elapsed-time herd unlocks;
- dual-captain Dash architecture;
- release-only best-score persistence;
- movement-release auto-switching;
- superseded intermediate HUD layers.

## Qualification

```bash
npm install
npm test
npm run build
```

The qualification suite protects:

- the 13,312-byte js13k ceiling;
- source syntax and canonical release-source parity;
- staged 4 → 5 → 6 landmark progression;
- no timer state;
- Shift-only handoff;
- Smart Shift urgency and rapid herd scan;
- Whip/Dash charge behavior;
- procedural facade contracts;
- Rally gates;
- SWEEP, SNATCH, and REBUILD;
- multi-prisoner rescue and 3-capture collapse;
- difficulty separation;
- Final Cleanup and breakable hold;
- multi-frame conquest transition;
- latched victory/defeat screens;
- result → menu → difficulty → replay;
- browser-safe preview parity;
- one-root-file submission ZIP integrity.

Current qualified v0.35 gameplay cartridge before this documentation-only commit: **13,031 / 13,312 bytes**, leaving **281 bytes free**.

The project treats the byte limit as a design constraint: bytes should buy clearer decisions, richer feedback, stronger game feel, or reusable visual grammar. Decorative code that does not improve play has to earn its seat on the unicorn bus.
