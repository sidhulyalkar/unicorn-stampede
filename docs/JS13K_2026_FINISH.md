# js13kGames 2026 finish plan

## Release truth

- Competition deadline: **13 September 2026, 13:00 CEST / 04:00 PDT**.
- `release/js13k-2026-rc1` is cut from the exact promoted v0.56 candidate.
- Fresh v0.56 qualification produced a one-file submission ZIP at **13,281 / 13,312 bytes** with **31 bytes reserve**.
- RC1 is the permanent fallback. Never replace it with a later candidate unless that candidate is fully qualified and hands-on playtested.

## Product doctrine for the final window

The game already has enough mechanics. Remaining work is release work:

1. make the first 60 seconds obvious;
2. make Smart Shift feel intentional;
3. make every world readable and winnable;
4. remove unfair or exploitable scoring/difficulty edges;
5. guarantee browser/runtime/submission integrity;
6. improve presentation only when it is byte-neutral or funded by deletion.

No new world, enemy class, progression system, online mode, major scoring model, or rendering subsystem enters the competition cartridge after RC1.

## Candidate ladder

### RC1 — v0.56 safety candidate

Qualified. Keep downloadable and untouched.

### RC2 — playfeel only

Allowed changes:

- P0/P1 gameplay bugs;
- stuck/unresponsive unicorn behavior;
- Smart Shift tie-breaking if hands-on play proves a repeatable selection failure;
- impossible/unfair difficulty spikes;
- objective/menu/rules ambiguity;
- severe full-screen readability problems;
- score exploits that materially change optimal play.

Not allowed:

- broad feature additions;
- new content added only because bytes remain;
- refactors without a player-visible or release-safety benefit;
- art detail that does not improve gameplay-scale recognition.

### FINAL

The final candidate must be a qualified RC, not a last-minute source snapshot.

## Mandatory playtest matrix

Run at least these nine campaign attempts before replacing RC1:

| World | Easy | Medium | Hard |
| --- | --- | --- | --- |
| Prismborough | 1 fresh-player run | 1 normal run | 1 pressure run |
| Washwater Bay | 1 fresh geography run | 1 normal run | 1 pressure run |
| Cloudtop Heights | 1 fresh geography run | 1 normal run | 1 pressure run |

Also run one Impossible attempt in each world as a viability check. Impossible does not need a high win rate, but a skilled run must retain a plausible recovery path.

For every run record:

- understood the current objective without opening docs? yes/no;
- any free unicorn inexplicably stopped? count;
- corrective double-Shift because Smart Shift chose the wrong unicorn? count;
- captures and successful rescues;
- intentional power-up pickups;
- confusing world-space labels or hidden targets;
- conquest result and rough completion time;
- any strategy that felt exploitable or obviously dominant.

## Acceptance gates

A candidate can replace RC1 only if all are true:

### Runtime

- no console/runtime errors;
- readable `local.html` and exact packed `index.html` both boot;
- pause/resume, restart, menu and fresh localStorage paths work;
- losing browser focus cannot leave movement stuck.

### Herd

- no unexplained free-AI stall beyond the existing liveness contract;
- collision recovery does not ping-pong;
- capture state is visually distinct from ordinary autonomy;
- three rapid Shifts sweep distinct unattended unicorns;
- distraction/stall/off-route urgency still outranks convenience;
- power-up opportunity remains useful but does not override crises.

### Worlds

- Prismborough reads as open civic-grid chaos;
- Washwater reads as a bridge-constrained waterfront;
- Cloudtop reads as a cliff-pass crosswind city;
- no spawn, power-up, landmark or generated building intersects a world barrier.

### Difficulty

- Easy should produce frequent first conquests once the controls are understood;
- Medium is the canonical game;
- Hard demands active herd management without relying on unavoidable capture chains;
- Impossible is brutal but not mechanically unwinnable.

### Submission

- exact ZIP <= 13,312 bytes;
- exactly one root `index.html`;
- fresh CI artifact downloaded and hashed;
- exact downloaded ZIP tested, not a locally rebuilt approximation;
- competition-site preview tested after upload.

## Timebox

### Friday, Sep 11

- RC1 frozen and downloaded.
- Hands-on playtest the exact RC1 artifact, not the source dev page.
- Log only reproducible P0/P1/P2 issues.
- If there is no serious issue, do not manufacture a v0.57 feature tranche.

### Saturday morning, Sep 12

- Land only proven fixes.
- Produce RC2 if needed.
- Run full historical + liveness + packed-browser + size qualification.
- Re-run the nine-run matrix on any gameplay-affecting RC2.

### Saturday afternoon

- Upload a qualified candidate to the js13k submission draft.
- Test the competition-hosted preview on a clean browser profile.
- Finalize title, description, screenshots, controls and short gameplay video.

### Saturday evening

- Hard cartridge freeze.
- Only submission-blocking fixes after this point.
- Generate/download/hash the FINAL artifact.

### Sunday, Sep 13 before 04:00 PDT

- Verify the already-uploaded final entry.
- Do not plan work that requires the deadline window itself.

## Ranking-oriented polish

Traditional js13k judging rewards a balanced entry across theme, innovation, gameplay, graphics, audio and controls. Final effort should therefore target weaknesses, not add more breadth.

Priority order for Unicorn Stampede:

1. **Controls:** Whip, Dash and Smart Shift must feel immediate and predictable.
2. **Gameplay:** the player should understand why they lost and what to do better next run.
3. **Innovation:** herd attention-management is the signature mechanic; make it visible and legible.
4. **Graphics:** world identity and readable silhouettes beat decorative density.
5. **Theme:** already unusually strong; destructive unicorns painting a city with rainbows should be obvious immediately.
6. **Audio:** preserve responsive procedural cues; only expand audio if it costs essentially nothing and improves action readability.

## Final decision rule

When deciding whether to make one more change, ask:

> Does this fix a failure a real player already demonstrated?

If not, ship the qualified candidate.
