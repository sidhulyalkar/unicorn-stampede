# Unicorn Stampede on Wavedash

This branch is the Wavedash publishing lane for the **js13kGames 2026 submitted build** of Unicorn Stampede.

The competition game is frozen. Wavedash work may observe the game and call the Wavedash SDK, but it must not alter gameplay, balance, controls, collision, AI, score, progression, world generation, art rules, or the original submission artifact.

## Provenance boundary

- Frozen source branch: `release/js13k-2026-submitted`
- Frozen base commit: `ddfc0ec6fa516f3af3dc519355863c8051614fdb`
- Submitted artifact: `dist/unicorn-stampede.zip`
- Submitted artifact size on this lineage: **13,203 bytes**
- Submitted ZIP Git blob: `c4bb95f3790bb7757c045e93ca6d6e194a551f9b`

`scripts/wavedash-js13k-integrity.mjs` fails if the gameplay source, original entrypoint, packed submitted HTML, or submitted ZIP differs from that frozen base.

The Wavedash upload is generated separately in `wavedash-dist/`. `scripts/build-wavedash-js13k.mjs` copies the original readable source byte-for-byte and injects only `wavedash/sdk.js` into the generated Wavedash entrypoint.

## Why use the readable build on Wavedash?

The 13,203-byte ZIP remains the actual js13k submission and proof of the constraint. The SDK integration lane has no reason to rewrite the frozen game just to expose stable runtime values to the host. Using the readable submitted source lets the SDK adapter observe authoritative run state without changing or reverse-engineering Roadroller/Terser-mangled gameplay internals.

The actual game rules are still the submitted rules. Only platform calls are added.

## What counts as authoritative for qualification?

The competition source under `src/`, the original `index.html`, `dist/index.html`, and `dist/unicorn-stampede.zip` are byte-locked to the submitted commit.

Historical helper snapshots such as `dist/preview.html` are not part of the submitted ZIP and are not allowed to redefine the frozen artifact after submission. Likewise, the historical `prune-audit` asks source to match a current rewrite transform; it is useful during active byte optimization but is not an eligibility test for an already-submitted immutable build.

The Wavedash lane therefore runs the complete frozen readable-source gameplay/runtime matrix and separately verifies the submitted ZIP by exact Git blob and byte size before and after those tests. It does not rebuild or rewrite the competition artifact. The generated Wavedash upload is then tested independently with a fake SDK contract.

## Wavedash SDK surface

### 1. Required load handshake

`wavedash/sdk.js` reports load completion and calls `Wavedash.init({debug:false})` once. If `window.Wavedash` is absent, the adapter becomes a no-op and the frozen game runs normally.

### 2. Player identity and presence

The adapter reads the signed-in Wavedash player identity and publishes presence only:

- title: `Ready to stampede` / `js13k 2026 Competition Build`
- active run: `Herding the stampede` / `<World> • <Difficulty>`
- result: `Town conquered` or `Herd collapsed` / `<World> • <Score> pts`

Identity is never written into gameplay state.

### 3. Achievements and stats

Import `wavedash/achievements-and-stats.json` in Developer Portal → Achievements → Import JSON before the judged build is published.

The integration defines **12 achievements** and **13 numeric stats**. They are observational. No stat or achievement value is read back into the game.

Achievements cover first completion, conquest, each of the three submitted worlds, Impossible conquest, capture-free conquest, six-figure score, Whip-chain mastery, color coverage, structural destruction, and the submitted game's existing highest world grade.

Stats track runs, wins, lifetime/best score, world wins, Impossible wins, capture-free wins, best paint/destruction percentages, best chain count, and fastest conquest time.

### 4. Competitive leaderboards

The adapter provisions five boards using Wavedash's normal leaderboard API:

| Identifier | Sort | Display | Submitted on |
| --- | --- | --- | --- |
| `stampede-high-score` | DESC | Numeric | every completed run |
| `fastest-conquest` | ASC | Milliseconds | victories only |
| `prismborough-high-score` | DESC | Numeric | Prismborough runs |
| `washwater-high-score` | DESC | Numeric | Washwater Bay runs |
| `cloudtop-high-score` | DESC | Numeric | Cloudtop Heights runs |

Every score carries flattened Wavedash metadata for world, difficulty, paint coverage, structural destruction, Whip chains, maximum simultaneous captures observed, grade, and victory state.

Before judging, launch the game once as a member of the Wavedash project team or create the boards in the Developer Portal, then verify all five boards are **Visible** on the game page. Player-created boards default to Hidden, so this step matters.

### 5. Cloud-backed run history

The adapter stores the latest 20 result summaries in `meta/run-history.json` through Wavedash Remote Storage.

This is deliberately a **platform history file**, not a gameplay save. It never restores `ccHeat`, world unlocks, difficulty, random seeds, score, or any other submitted game state. Cross-device data therefore cannot change a judged run.

### 6. GAME_MANAGED result UGC

Victories create a compact JSON run card through the Wavedash UGC API. The item records the result metrics already observed by the adapter and is attached to the corresponding leaderboard submission through `ugcId`.

It is not a new level, replay mechanic, power-up, or game mode. It exists only as Wavedash-native provenance for a competitive result.

## Explicitly out of scope for the js13k competition listing

Do **not** add any of these to this branch before judging:

- multiplayer or lobbies;
- Wavedash-driven gameplay modifiers;
- cloud-loaded progression or unlock state;
- new levels, worlds, difficulty rules, scoring, AI, or physics;
- new gameplay UI or controls;
- paid content;
- SDK rewards that confer an in-game advantage;
- showcase-only Herd Flow, Living Conquest, Smart Attention additions, or post-js13k systems.

Those belong to the later Wavedash **Showcase Edition** listing based on `main`.

## Build and test

```bash
npm install
node scripts/wavedash-js13k-integrity.mjs
node scripts/wavedash-frozen-regressions.mjs
node scripts/wavedash-js13k-integrity.mjs
node scripts/build-wavedash-js13k.mjs
node scripts/wavedash-sdk-smoke.mjs
```

The generated upload is:

```text
wavedash-dist/
  index.html
  wavedash.js
  provenance.json
  src/
    <exact frozen submitted readable source>
```

## Configure Wavedash

The real Wavedash game ID is intentionally not committed here until the project is selected.

Either run:

```bash
wavedash auth login
wavedash init
```

and make sure the resulting config uses `./wavedash-dist`, or copy the supplied template:

```bash
cp wavedash.example.toml wavedash.toml
```

Then set the real `game_id`.

Expected config:

```toml
game_id = "YOUR_WAVEDASH_GAME_ID"
upload_dir = "./wavedash-dist"
entrypoint = "index.html"
```

## Sandbox and upload

After building:

```bash
node scripts/build-wavedash-js13k.mjs
wavedash dev
```

In the sandbox verify:

1. there are no gutters or host-background slivers at common desktop sizes;
2. title → game → victory/defeat works unchanged;
3. pausing does not count toward the fastest-conquest timer;
4. presence changes on title, run start, and result;
5. a completed run updates stats and the correct world board;
6. a victory submits `fastest-conquest` and creates one GAME_MANAGED result card;
7. a defeat never submits a speedrun time;
8. SDK/network failures do not interrupt the game.

Upload the immutable build:

```bash
wavedash build push -m "Unicorn Stampede — js13k 2026 Wavedash competition integration"
```

The CLI prints a build ID and playtest URL. Smoke-test that uploaded build before publishing.

Publish only the qualified build:

```bash
wavedash publish <BUILD_ID> \
  --title "js13k 2026 Competition Build" \
  --summary "The frozen 13,203-byte Unicorn Stampede submission with Wavedash-native competitive integration." \
  --added "Leaderboards, achievements, player presence, cloud run history, and result run cards via the Wavedash SDK"
```

## Store positioning

### Title

**Unicorn Stampede — js13k 2026 Competition Build**

### Short description

Manage six semi-autonomous unicorns, paint a city with rainbow highways, smash its landmarks, rescue captured herd members, and complete a full takeover. The original js13kGames 2026 game fits in a **13,203-byte ZIP**; this Wavedash edition keeps those mechanics frozen and adds only Wavedash-native competition features.

### Description

Unicorn Stampede is a tiny arcade-strategy game about managing several chaotic plans at once. You directly control one unicorn while the rest of the herd keeps moving, gets distracted, follows routes, fights the town, and can be captured.

Break four outer landmarks, create enough color and structural chaos to bring down Town Hall, then secure all four districts while keeping the herd free. Three submitted campaign worlds — Prismborough, Washwater Bay, and Cloudtop Heights — change the routing pressure without changing the core control language.

The entire original js13kGames 2026 submission is preserved as a **13,203-byte ZIP**. For the Wavedash competition integration, the gameplay is frozen. Wavedash adds the competitive shell around it: five leaderboards, achievements and lifetime stats, player presence, cross-device run history, and attached result cards for successful conquests.

**Controls:** WASD to steer, mouse to aim the Rainbow Whip, click to Whip, Space to Dash, Shift to hand attention to another herd member, P/Esc to pause.

## Two Wavedash listings, not one blurred product

### Listing A — now

**Unicorn Stampede — js13k 2026 Competition Build**

Purpose: Wavedash/js13k judging. Frozen submitted gameplay. SDK-only integration. The 13 KB constraint is the hero story.

### Listing B — after the competition lane is locked

**Unicorn Stampede — Showcase Edition**

Base: current `main`.

Purpose: the best full product on Wavedash after the byte ceiling came off. It can use the same platform identity, achievement, leaderboard, cloud, and UGC concepts, but with showcase-specific telemetry such as Herd Flow, Smart Attention reasons, persistent mastery, Living Conquest, run intelligence, and future Run Lab history.

Keep separate game IDs/listings so players and judges can always tell which experience is the authentic 13 KB competition build.
