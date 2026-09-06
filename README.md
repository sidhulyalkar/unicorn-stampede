# 🦄 Unicorn Stampede

**A six-unicorn arcade-strategy game built for js13kGames 2026.** You control one unicorn at a time while the rest of the herd keeps moving, follows the routes you leave behind, gets distracted, fights the town, gets captured, and occasionally creates a crisis you have to rescue.

The central question is not **how fast can you click?** It is:

> **Can you keep a chaotic six-unicorn stampede useful long enough to conquer a town that is actively fighting back?**

The game is designed around recovery. A bad route, a distracted unicorn, or even two captures do **not** mean the run is dead. Save the herd, rebuild the plan, and keep going.

## The complete game in 30 seconds

### You win by conquering and holding the town

A real run has one authoritative victory path:

1. **Break the four outer landmarks**: Bakery, Market, Greenhouse, Clock Tower.
2. Build enough combined **paint + destruction** to reach the required **Chaos** threshold.
3. Bring enough unicorns together for the required **Rally** and smash **Town Hall**.
4. Survive **Final Cleanup**.
5. Secure all **four districts**.
6. Reach the mode's town-wide **paint target**.
7. **Rescue any captured unicorns**.
8. Hold the town briefly.

Then the run ends with **TOWN CONQUERED**.

There is no hidden timer defeat. You are allowed to recover from mistakes.

### You lose when the herd collapses

Cleanup trucks using the **SNATCH** doctrine can capture distracted unattended unicorns.

- **1 captured:** emergency, but fully recoverable.
- **2 captured:** critical. You should usually stop expanding and organize a rescue.
- **3 captured:** **HERD COLLAPSE**. Half the herd is gone, the remaining unicorns panic, cleanup accelerates, and the town overwhelms the stampede.

This is the game's only normal defeat condition.

The point is to make losing understandable. You should be able to look at a failed run and say, “I let the herd cluster near the cleaners,” or “I ignored the second prisoner too long,” rather than, “the screen suddenly reset.”

## Controls

| Input | Action |
| --- | --- |
| **WASD** | steer the active unicorn and paint |
| **Left click beside the active white ring** | crack the Rainbow Whip |
| **Space** | spend 2/5–5/5 Whip charge on Dash |
| **Shift** | smart-switch to the herd mate that most needs attention |
| **P / Esc** | pause and read the Rules page |
| **A / D on title** | change unlocked world |
| **M on title** | change difficulty |

## The three verbs that matter most

### 1. Steer and paint

Moving paints Rainbow Highway behind the active unicorn. Paint is both **territory** and **infrastructure**.

Unattended unicorns behave better on painted routes, so a strong player does not merely color the map. They build routes that remain useful after switching away.

### 2. Whip and Dash

Click beside the active unicorn's white ring to crack the Rainbow Whip.

Each successful Whip adds charge:

**1/5 → 2/5 → 3/5 → 4/5 → 5/5**

At **2/5 or more**, Space always Dashes. More charge produces a longer, stronger Dash.

Whip direction matters. Use it to line up a unicorn with:

- a landmark;
- an empty road;
- a cleaner truck;
- a powerup;
- a rescue interception;
- a district that still needs paint.

Repeated Whips can also trigger Prism effects and area damage.

### 3. Smart Shift

Shift is not a blind next-unit button.

It prioritizes the herd in this order:

**DISTRACTED > STALLED > OFF-ROUTE > NEGLECTED**

Equal-urgency situations cycle predictably through the live herd.

A useful habit is to think of Shift as asking:

> **Who needs me most right now?**

## Why leaving a unicorn can be good

When you switch away from a moving unicorn, it keeps following its last useful direction for a while.

That means good play has a rhythm:

**set route → switch → solve another problem → return before the old plan decays**

You are conducting parallel plans rather than micromanaging six bodies every second.

## Herd interference and BICKER

Unattended unicorns that bunch together become socially distracted. If they are too distracted, they can stop contributing useful structural damage and may trigger **BICKER!**

Loose formations are therefore valuable.

Painted roads help because they let different herd members continue useful trajectories without collapsing into one glittery traffic jam.

## Town response: SWEEP, SNATCH, REBUILD

The town rotates through three defensive doctrines during a run.

### SWEEP

Cleanup trucks erase painted infrastructure faster.

This punishes a single fragile highway. Good players build redundant routes and repaint strategically instead of assuming old territory is permanent.

### SNATCH

Cleanup trucks hunt socially distracted unattended unicorns.

A captured unicorn rides with the truck and is removed from the controllable herd.

To rescue it:

1. intercept the prison truck with Dash, Frenzy, or Boost;
2. stun it;
3. bring **two live unicorns** within the rescue radius.

`RESCUE 1/2` means you stopped the truck but still need a second unicorn.

Successful rescues now earn score because recovering a broken plan is skill, not wasted time.

### REBUILD

Cleanup trucks can rebuild ordinary destroyed buildings.

That reverses part of your structural progress and forces you to revisit territory you thought was solved.

Landmarks themselves remain authoritative and are never rebuilt.

## Landmarks and Rally

The outer landmarks are:

1. **Bakery**
2. **Market**
3. **Greenhouse**
4. **Clock Tower**

Town Hall is the fifth and final landmark.

Clock Tower and Town Hall require **Rally**, meaning several live unicorns must be close enough to participate. Harder modes increase Rally requirements.

This stops the optimal strategy from becoming “solo one super-unicorn through every objective.”

## The final takeover

Smashing Town Hall is not the end.

It starts **Final Cleanup**.

To actually win you must still:

- secure all four districts;
- meet the global paint requirement;
- free any prisoners;
- hold the town briefly while cleaners continue attacking your infrastructure.

The final seconds should feel like maintaining a living network under pressure, not watching a victory cutscene after one last building breaks.

## Difficulty

Difficulty changes the strategic burden rather than merely shrinking a clock.

Higher modes combine:

- higher coverage requirements;
- tougher structures;
- higher Rally requirements;
- fewer powerups;
- faster traffic;
- stronger cleanup pressure;
- tighter rescue geometry;
- more environmental interference.

The game remains winnable by conquest. Harder modes ask you to maintain more simultaneous structure with fewer recovery tools.

## Score philosophy

There is no leaderboard requirement and there is no time-remaining bonus.

Score rewards doing useful things inside the run:

- painting territory;
- destroying structures;
- breaking landmarks;
- Whip / Prism chains;
- stunning cleaners;
- rescuing captured unicorns;
- completing the conquest.

A messy run is therefore still worth finishing. Recovering from two captures and eventually winning should feel better, and score better, than restarting because the opening was imperfect.

## Strategy: how to think about a run

### Opening

Do not immediately stack the herd on the same objective.

Establish two or three useful directions and paint corridors that future unattended unicorns can exploit.

### Midgame

Ask three questions repeatedly:

1. **Which landmark or district advances the win condition?**
2. **Which herd member is becoming dangerous to ignore?**
3. **Which route will still be useful after I Shift away?**

### First capture

Do not panic, but identify the prison truck and decide whether the rescue fits naturally into your current route.

### Second capture

This is the strategic red alert.

Stop treating territory as the highest priority. Preserve the herd. One more capture ends the run.

### Final Cleanup

Spread enough to maintain district paint, but not so far that you cannot assemble a rescue or Rally. Your goal is a resilient loose network, not maximum separation.

## Training

Training teaches the permanent verbs in a small town:

1. steer;
2. Whip twice;
3. Dash;
4. Shift;
5. leave a route running;
6. rescue a distracted unicorn;
7. Whip again;
8. smash the Bakery;
9. unleash all six unicorns;
10. free-play with Shift + Whip + Dash before entering the real city.

The controls do not secretly change between Training and campaign play.

## Development and qualification

```bash
npm install
npm run build:fast
npm test
npm run build
```

The test suite protects source behavior, packed browser behavior, the 13,312-byte js13k ceiling, smart Shift, Dash availability, herd interference, town-response doctrines, rescue behavior, difficulty separation, Prism geometry, explicit victory/defeat semantics, and the rule that **the timer must never end a v0.32 run**.

The project treats the 13 KB limit as a design constraint: mechanics that improve understanding, recovery, strategy, and feel are worth bytes; hidden failure states are not.
