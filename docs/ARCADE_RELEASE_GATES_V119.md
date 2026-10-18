# Unicorn Stampede v1.19: Arcade release-gate matrix

## Shipped automated checks

`scripts/showcase-v118-browser.mjs` covers collision, ranked fixed seed, score resets, team requirements, host event lifecycle, cloud checkpoint, opaque-origin storage and Q controls in Chromium and Firefox.

`scripts/showcase-v119-browser.mjs` adds **authoritative state-transition qualification**, rather than a replay of human input: it calls the existing damage (`hitObj`) and paint-bitset (`paintBits`) systems, then checks five landmark completions, Town Hall prereqs, district takeover, run-end mastery, restart and defeat across four worlds. Its deterministic path is intentionally accelerated and **does not prove ordinary players can finish the campaign**.

The same v1.19 suite supplies a fake Bounty SDK to test a cloud response arriving after a run ended, merging remote and newly earned mastery, preventing saves before hydration, and rejecting stale account responses. Results are emitted in `dist/arcade/qualification-v119.json` in the Arcade workflow artifact.

The historical showcase CI separately includes cross-browser randomized herd stress, movement input, boundary overlaps, capture/rescue transition tests, and restart/menu coverage.

## Real-host preview (not yet executed)

Use Bounty Studio > Test your build. Preview is non-production and its event console shows the actual host responses. Test both a signed-in account and Guest.

- [ ] Load a fresh submission ZIP, verify zero runtime exceptions and no startup hang.
- [ ] Medium Prismborough: host sees first active `gameplayStart`, numeric integer scores, `gameplayStop` on pause and `gameOver` only once after defeat or victory.
- [ ] Alternate world or difficulty: host sees only free-play terminal score zero.
- [ ] Signed-in save: finish a run, reload the preview, confirm mastery and settings come back; start during slow hydration, finish, and confirm neither local nor cloud progress disappears.
- [ ] Guest: finish a run, play another session without reload, and confirm no account-backed save is falsely claimed. Sign in mid-session, replay and reload.
- [ ] Reset or change game mode, verify the **ranked** result always uses Prismborough Medium and a stable procedural map.
- [ ] Reject or inspect an over-ceiling score. Configure leaderboard ceilings in Bounty Studio rather than blindly trusting client-side claims.
- [ ] Test alt-tab, muted audio, options SFX toggle, low frame rate, and mobile touch controls.
- [ ] Confirm the uploaded game is actually embedded and playable at common viewport sizes.

**No prize-backed competition should be launched using the client-only score bridge.** Bounty explicitly notes that reward-bearing rules require an authoritative server.

## Human first-play experiment (not yet performed)

Recruit at least five participants who have not previously played the game. Do not explain objectives beyond the main-menu instructions before their first attempt.

Record: time to identify the core objective (target <=15 seconds), time to first deliberate Whip/Dash demolition (median <=45 seconds), time to first useful herd handoff, whether the **TEAM X/Y** prerequisite is understood, whether a player understands when a building is invulnerable, first rescue comprehension, and whether the player can explain the next step after losing. Also record overlap/obscuration and frustration moments.

After the session, ask players to identify their most satisfying destruction moment, their least understandable transition, and whether they voluntarily want a rematch. Fix repeatable failures, not just one-off preferences.

## Release vs developer-only evidence

- A green GitHub workflow demonstrates runtime code and authored test contract health.
- Hosted Studio preview demonstrates real SDK message exchange.
- Human playtesting demonstrates usability and entertainment.
- Bounty submission review grants publishing approval.

All four are separate gates. Do not equate a fake-host test or script-forced conquest with real-user or live-host approval.
