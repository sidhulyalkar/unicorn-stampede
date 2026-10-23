# Unicorn Stampede · Bounty Board Arcade listing

## Title
Unicorn Stampede

## Short tagline
Direct one unicorn. Orchestrate six. Demolish a town that fights back.

## Description (submission copy: 170+ words)

Unicorn Stampede is a colorful arcade-strategy game about coordinating a chaotic herd of semi-autonomous unicorns as they paint and demolish a living town. You control one unicorn at a time, but the others keep moving. Leave rainbow routes in motion, switch attention to the teammates who need it most, charge up spectacular dashes, and bring multiple unicorns together to smash heavily defended landmarks.

Your first mission is to destroy four civic landmarks, build enough Chaos through rainbow territory and building damage, then rally the herd to bring down Town Hall. But that is only the beginning. The town fights back with cleaning crews, capture vehicles, shifting terrain, and environmental hazards. Rescue stranded herd members before three captures end the run, then secure every district to complete your rainbow takeover.

Choose between four distinctive worlds: Prismborough's bustling streets, Washwater Bay's harbor crossings, Cloudtop Heights' windy mountain roads, and Faultline Frontier's fractured desert town. Each setting changes how you coordinate the herd, while all four share the same approachable controls.

Earn Style-like satisfaction from coordinated demolition, successful rescues, persistent route orders, and Herd Flow combinations across multiple unicorns. Experiment with faster strategies and replay for mastery stars. There is no 13 KB limit in this expanded post-competition showcase edition.

## Keyboard and mouse controls

- **W A S D:** steer the active unicorn and paint a rainbow route
- **Mouse + left click near the active unicorn's ring:** charge the Rainbow Whip
- **Space:** spend Whip charge to Dash, rescue or smash
- **F (or Q):** switch to the herd member most in need; tap F rapidly to scan the herd. Shift is not a switch key in the Arcade edition
- **P or Esc:** pause or resume
- **Enter / Space on title:** start selected world and difficulty
- **Options:** music, SFX, screen shake, reduced motion, contrast, touch controls

Gamepad and touch options are available in the showcase edition.

## Leaderboard policy

**Initial public board:** only **Prismborough on Medium**, with a shared fixed map seed, base campaign rules and a zero-start **bounded mastery score** (the game\'s ordinary campaign score remains unchanged). The leaderboard rewards peak unique coverage (up to 20,000), five permanent landmarks (up to 20,000), district control after Town Hall (up to 10,000), distinct-herd Flow (up to 7,500), conquest (30,000) and finishing within 12 minutes (up to 12,000). The maximum is **99,500**. Repainting cleaned roads, repeatedly destroying rebuilt buildings or idling cannot increase this score without new milestones. Other maps and difficulties are explicitly labelled **FREE PLAY** and report zero to the shared global board to protect fairness. Do not promote a high-stakes or prize-backed competition based on untrusted client scores. Bounty's submission must tick Leaderboards and set the expected maximum score to **99,500** (or a platform-accepted ceiling no lower than that), with test runs covering legitimate maximum cases. Client-generated achievement events are not cheat-proof: no money-backed competition without independent verification.

The four worlds still support free-play and three-star local/cloud mastery progression. Signed-in players can save progress in the uploaded Bounty hosted environment; anonymous players keep session-only progress where storage is restricted. The Arcade player itself has not been validated until the build is submitted to the private studio preview.

## Asset and build process

1. Run `npm run test:arcade` and the full showcase/browser suite.
2. Download `unicorn-stampede-arcade-preview` from the passing GitHub Actions **Arcade showcase qualification** run.
3. The artifact contains `unicorn-stampede-arcade.zip` (with root `index.html`), a SHA-256 `manifest.json`, the 1280 × 720 cover `unicorn-stampede-cover.png`, and two gameplay screenshots.
4. Submit the ZIP, cover, this 100+ word description and controls at https://www.bountyboard.gg/arcade/submit .
5. In the Bounty studio dashboard's **Test your build** preview, test signed in and Guest modes, score rejection ceilings, score callbacks, pause/resume, the cloud save read/write, and full win/loss runs. Do not infer SDK host success solely from GitHub CI.
6. Only publish when Bounty's review approves the submission and real player playtests confirm onboarding and fairness.

## v1.24 packaging and first-play readiness

The submission workflow now produces `submission-listing.txt`, a `submission-v124.json` technical attestation, the complete ZIP, the verified 16:9 cover, and screenshots from keyboard/mouse **and touch** tests in Chromium and Firefox. The attestation only means the submitted archive passed local/CI qualification. It does **not** indicate Bounty has approved the game.

**Touchscreen behavior:** on narrow portrait devices, a separate accessible Play/Tutorial control appears beneath the letterboxed game with a suggestion to rotate for a wider view. In landscape, real taps on the canvas title select world, difficulty and tutorial and start play. During play, the virtual joystick, Whip, Switch, Dash and Pause controls are available. Phone landscape is the preferred play format because the game is designed as a wide-screen arcade strategy title; do not advertise immersive portrait gameplay as equivalent.

**Studio form:** upload the versioned ZIP and 1280×720 cover from the **same** passing artifact. Set game features to **Leaderboards**, **Cloud saves**, and **Player identity**. Use a bounded score ceiling of at least 99,500 (assuming Bounty accepts that configured value), with `Prismborough / Medium` clearly designated the ranked lane. Do not enable Rewarded Ads, Multiplayer or A/B Experiments because they are not implemented in this version.

**Real host preview checks:** In Studio → **Test your build**, verify a signed-in player's first boot and a Guest's first boot. Inspect `gameLoadingFinished`, active-play `gameplayStart` and `gameplayStop`, integer `submitScore`, and one `gameOver` per run. Complete a short run, reload, inspect the saved mastery and settings on the signed-in identity, then switch to Guest and confirm no false cloud-save claim. Test a second, unranked world and ensure it does not post a positive ranked result. Validate the host's response to the leaderboard ceiling.

**First-player usability:** Recruit 5–8 people who have not seen the game, preferably including one touch-only player. Give them no special instructions beyond those shown. Measure time until the first deliberate smash, whether F switching is understood, whether they can interpret **TEAM x/y**, whether the mission compass helps, and whether anyone gets stuck without knowing the next objective. Ask one question afterward: "What was the most satisfying thing you did, and what confused you?" Treat repeated comprehension failures as changes to fix before promotion.

Review and launch remain separate decisions. Bounty's real preview is available on a submitted build while under review; local simulations and GitHub Actions cannot substitute for it.
