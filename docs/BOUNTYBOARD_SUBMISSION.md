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
- **Q or Shift:** hand off to the herd member needing the most attention; rapidly tap to scan the herd
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
