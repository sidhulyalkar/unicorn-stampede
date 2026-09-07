# Competitive scoring

Unicorn Stampede v0.21 separates **conquest** from **excellence**.

A conquest proves that the player completed the town. A leaderboard score measures how well they orchestrated the stampede while doing it.

## Conquest gate

Town Hall is no longer unlocked by landmark sniping alone.

To attack Town Hall, a run must satisfy both conditions:

1. destroy Bakery, Market, Greenhouse, and Clock Tower;
2. build at least **28% combined town chaos**.

`chaos = 0.76 × paint coverage + 0.24 × structural destruction`

This keeps the objective legible while ensuring the player actually interacts with the town before ending the run.

## Score model

The final competitive score is deterministic from observable run metrics. No random bonus is added at the results screen.

Base components:

| Component | Maximum / rule | Why it exists |
| --- | ---: | --- |
| Conquest | 20,000 | Finishing matters, but cannot dominate the score |
| Time remaining | `600 × seconds` | Rewards decisive routing and fast landmark execution |
| Paint coverage | up to 90,000 | Rewards broad spatial control instead of building sniping |
| Structural destruction | up to 70,000 | Rewards actually wrecking the town |
| 3X Prism chains | 6,000 each, first 6 | Rewards accurate mouse execution without infinite farming |
| Average ACTIVE herd | up to 45,000 | Rewards orchestrating several unicorns rather than babysitting one |
| Cleanup stuns | 1,800 each, first 10 | Rewards counterplay against the town response |
| Prism Gates | 3,000 each | Rewards optional route optimization in Stampede+ |

After the base score, world difficulty applies a multiplier:

- **Prismborough:** ×1.00
- **Washwater Bay:** ×1.12
- **Cloudtop Heights:** ×1.25
- **Stampede+:** an additional ×1.15

The same core skill is therefore worth more when performed under harder environmental pressure.

## Score classes

These bands are intentionally broad. They give new players readable goals while the actual top-50 leaderboard remains continuous.

| Tier | Score | Interpretation |
| --- | ---: | --- |
| **LOW** | under 120,000 | Conquest or partial competence; likely low town impact / weak orchestration |
| **MEDIUM** | 120,000–189,999 | Solid clear with some speed, territory, or combo quality |
| **HIGH** | 190,000–259,999 | Strong multi-system run |
| **HIGHER** | 260,000–339,999 | Expert routing and sustained herd productivity |
| **HIGHEST** | 340,000+ | Record-hunting territory, expected to favor Cloudtop / Stampede+ mastery |

These are design bands, not promises about population percentiles. Once enough real runs exist, they should be calibrated against the empirical score distribution while preserving monotonicity and the score formula.

## Why a five-landmark speedrun cannot dominate

Speed is valuable but capped by the town timer. A fast run that barely crosses the 28% chaos floor gives up most of the 90k paint, 70k destruction, 45k ACTIVE, Prism, and cleanup-stun pools.

Conversely, maximizing destruction while moving slowly sacrifices the time component and gives cleanup more opportunity to erase territory.

The intended frontier is a **Pareto problem**: go fast without abandoning damage, paint, chains, and orchestration.

## Leaderboard contract

The hosted game submits the following run metrics:

- player name
- final score
- world / Stampede+ flag
- time remaining
- paint coverage
- structural destruction
- Prism chains
- average ACTIVE fraction
- cleanup stuns
- Prism Gates
- run duration
- game version

The server must treat the submitted `score` as advisory only. A global leaderboard implementation should validate metric bounds and recompute the score server-side using the v0.21 formula before accepting a run.

The browser keeps a local top 50 as an offline fallback. The UI must label it **LOCAL TOP 50** unless the shared service actually responds; it must never present per-browser storage as a global leaderboard.

## Anti-cheat direction

For a public casual game, perfect client-side cheat prevention is impossible because the entire game runs in the browser. The objective is therefore to make casual fabrication meaningfully harder and obvious abuse removable:

1. server-side score recomputation;
2. strict metric bounds by world/version;
3. plausible runtime and timer relationships;
4. rate limiting;
5. per-version score formulas;
6. retain full metric tuples for anomaly review;
7. optionally require a short signed run nonce from the hosting layer in a later version.

The leaderboard should optimize for trustworthy friendly competition, not pretend a 13 KB browser game can provide esports-grade attestation.
