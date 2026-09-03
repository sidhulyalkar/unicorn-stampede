# 🦄 Unicorn Stampede

**A six-unicorn arcade-strategy game built for js13kGames 2026.** You directly control one unicorn at a time while the rest of the herd keeps moving, gets distracted, follows your painted Rainbow Highways, wrecks landmarks, and occasionally makes extremely poor life choices.

The core rhythm is:

**steer → whip → charge → dash → Shift → trust the old route → rescue the next disaster**

The goal is not to micromanage six units. The goal is to keep several useful plans alive at once while the town keeps inventing reasons for unicorns to stop paying attention.

## 🎮 Play it

The draft release candidate lives on PR #12. Qualified builds contain:

- `dist/local.html` — browser-safe standalone build.
- `dist/unicorn-stampede.zip` — exact js13k submission archive.
- `dist/index.html` — aggressively packed competition HTML.
- `dist/preview.html` — browser-safe self-contained preview.
- `dist/compression.json` — compression provenance and exact size.

The v0.26 release is qualified below the **13,312-byte** js13k ceiling. `dist/compression.json` is the authoritative exact-size record for each qualified artifact.

## ⚡ The 20-second mental model

- The **big white ring** marks the unicorn you currently control.
- **WASD** steers that unicorn and paints the road behind it.
- **Click beside the white ring** to crack the Rainbow Whip.
- Each successful whip adds one charge, from **1/5 → 5/5**.
- **Two Whips unlock Dash. Space at 2/5 through 5/5 always spends the stored charge on a directional dash.** More charge means a longer, stronger dash; 5/5 is MAX.
- **Shift** switches to the next live unicorn at any time. Charge belongs to each unicorn and survives switching away and back.
- A moving unicorn keeps following its last useful direction after you switch away.
- Painted ground becomes a **Rainbow Highway**, helping unattended unicorns resist distractions and maintain useful routes.
- **NEXT** is only a recommendation. It points toward a unicorn that may need attention. It never switches for you.

You can play carefully and orchestrate the herd, or Shift like a caffeinated conductor and manufacture your own emergency.

## 🕹️ Controls

| Input | Action |
| --- | --- |
| **WASD** | steer the active unicorn + paint |
| **Mouse** | aim the coiled Rainbow Whip cursor |
| **Left click beside active ring** | crack Whip and add charge |
| **Space** | dash whenever the active unicorn has **2+ Whips**; consumes its charge |
| **Shift** | switch to the next live unicorn |
| **A / D on title** | select unlocked world |
| **C on title** | controls |
| **P / Esc** | pause |
| **M** | mute |

The Whip is intentionally positional. Clicking from different sides changes the launch direction, so a good crack should do more than raise the meter. It should line the unicorn up with a landmark, empty street, cleaner, powerup, Prism Gate, or escape path.

## 🦄 The herd

All six unicorns are available in real runs:

- **Bolt** — fast and direct.
- **Daisy** — steadier movement.
- **Bumper** — heavier impact.
- **Mallow** — controlled and strong.
- **Comet** — quick and reactive.
- **Pickles** — wonderfully questionable momentum.

Each now has its own hue-driven mane/forelock treatment in the procedural renderer, so the characters remain visually distinct without shipping image assets.

## 🌈 Distraction is the game

Unicorns are not disciplined RTS units. They are attracted to things.

Existing distraction and pressure systems include:

- fountains;
- duck ponds;
- flower patches;
- moving butterflies;
- traffic collisions;
- cleanup crews that erase Rainbow Highways;
- world-specific wind pressure;
- temporary powerups that can change priorities;
- the herd's own tendency to become idle or wander when you stop maintaining useful routes.

The strategy comes from deciding which problem actually deserves control. A distracted unicorn near a fountain may be harmless. A distracted unicorn beside the final unpainted district while cleaners erase your best highway is not.

## 🛣️ Rainbow Highways

Paint is infrastructure, not just decoration.

An unattended unicorn on painted ground:

- gets a movement advantage;
- is less strongly pulled by environmental distractions;
- keeps a switched-away route alive longer.

Cleanup crews erase that infrastructure, creating a recurring tactical loop:

**build route → hand off → exploit route → notice cleanup → defend or repaint**

This is one of the main systems that makes controlling six agents manageable instead of random.

## 💥 Landmarks and the strategic time bank

A run asks you to break four outer landmarks before Town Hall becomes structurally available:

1. Bakery
2. Market
3. Greenhouse
4. Clock Tower
5. Town Hall

Town Hall also requires enough overall town chaos, combining painted territory and destruction. Sniping only the objectives is not enough.

v0.26 also makes progression buy time rather than simply consume it:

- real runs receive a larger opening time window;
- every outer landmark smash adds **+6 seconds**;
- the four outer landmarks can therefore return up to **24 seconds** to a strong run.

This makes successful routing extend the session. Better play gives you more time to create bigger, stranger stampedes instead of simply ending faster.

## 🌍 Campaign worlds

The campaign deliberately reuses the same systemic town rather than spending precious bytes on three unrelated maps.

### Prisborough

Baseline orchestration. Learn switching, highways, distractions, traffic, landmarks and cleanup pressure.

### Washwater Bay

Cleanup pressure is stronger. The central question becomes whether you can preserve the infrastructure you already created while still advancing objectives.

### Cloudtop Heights

Crosswinds destabilize routes and tighten execution. Prediction becomes more important than pure reaction.

The procedural town varies its building placement and geometry between runs, so tactical layouts change without requiring separate authored maps.

## 🔥 Stampede+ Heat 1/10 → Heat 10/10

Clearing the tour unlocks **Stampede+**, a ten-step mastery ladder.

Higher Heat progressively combines:

- less starting time;
- faster traffic;
- stronger cleanup pressure;
- greater environmental interference;
- higher Town Hall chaos requirements;
- optional Prism Gate routing opportunities;
- a larger score multiplier.

Heat stops escalating at **10/10**. Heat 10 remains available for mastery and score chasing rather than turning into an infinite numerical treadmill.

## 🏁 Score without a leaderboard

The external/local top-50 leaderboard has been removed. It added product surface without improving the minute-to-minute game.

The **score itself remains** because it is useful feedback. It rewards multiple dimensions of skill:

- time remaining;
- paint coverage;
- structural destruction;
- Prism/Whip chains;
- keeping several unicorns productively active;
- stunning cleanup crews;
- Prism Gate routing in Stampede+.

The score is best understood as a personal optimization target: finish the same town with cleaner routes, more simultaneous herd activity, better Whips and fewer rescue emergencies.

## 🧪 Training

Training starts with two unicorns and teaches the permanent verbs in a small town:

1. move the active unicorn;
2. Whip twice to unlock Dash;
3. press Space to Dash, or keep charging toward 5/5 MAX;
4. Shift control;
5. leave an old route running;
6. rescue a distracted unicorn;
7. Whip twice again;
8. dash into the Bakery;
9. unleash all six unicorns in the miniature town;
10. spend a short free-play burst using **Shift + Whip + Dash** before entering the real city.

The Dash rule never changes during Training: **if the active unicorn has 2/5 or more charge, Space works.** The tutorial does not silently lock Dash at intermediate lesson steps.

That final six-herd moment is fully interactive. Whipping and 2+ Dash remain enabled after all six appear, specifically so the tutorial ends with experimentation rather than a locked cinematic.

## 🎨 Visual philosophy

The game intentionally avoids external sprites and bitmaps. Buildings, roads, people, cars, flowers, butterflies, fountain, unicorns, manes, trails, Whip and UI are all procedural Canvas shapes.

The title screen reuses the actual tutorial town renderer. Six real unicorns stare inward at the fountain and butterflies while the existing townspeople continue wandering in the background. The title therefore previews the actual game instead of advertising artwork the cartridge cannot reproduce.

## 📦 Compression philosophy

The 13 KB limit is treated as a design constraint, not an excuse to remove feel.

The release build tournaments several combinations of:

- Terser transforms;
- property mangling;
- enum/string substitution;
- Roadroller;
- Zopfli;
- AdvZIP.

Behavioral tests run against both readable source and the packed artifact. Size optimizations are rejected if they silently break controls, Whip animation, title rendering, tutorial switching, campaign progression or Heat behavior.

The most important rule is **experience bytes beat novelty bytes**. A few bytes that make the Whip readable or the unicorns expressive are more valuable than a bespoke world object that appears once.

## 🛠️ Development

```bash
npm install
npm run build:fast
npm test
npm run build
```

`npm test` covers source syntax, tutorial progression, the **2+ Whip Dash contract across tutorial steps 0–9**, free six-herd switching, Whip charging/dash scaling, refocus-safe Whipping, campaign progression, competitive score invariants, compression, packed browser behavior, archive integrity and the 13,312-byte ceiling.
