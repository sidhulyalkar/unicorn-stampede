# Unicorn Stampede showcase v1.1

This tranche turns the post-js13k build into a portfolio-grade web game without changing the frozen competition branch.

## Product goals

1. A player should identify Prismborough, Washwater Bay, and Cloudtop Heights from ten seconds of world-only footage.
2. Input should feel native on keyboard/mouse, controller, and touch-capable devices.
3. Audio should communicate world, phase, impact, and danger without becoming noisy.
4. Accessibility controls should be explicit and persistent.
5. The compact gameplay simulation remains the stable core; showcase systems wrap it in readable source files.

## v1.1 scope

### World motion and identity
- Prismborough: civic plaza, banners, flower beds, animated town flags and richer street life.
- Washwater Bay: animated water lane, piers, moving boats, foam, dock lights and harbor markers.
- Cloudtop Heights: drifting cloud banks, cable cars, ridge beacons, gust streaks and stronger vertical atmosphere.

### Input
- Gamepad left stick / d-pad steering.
- Gamepad shoulder / face button herd switching.
- Gamepad dash and whip actions.
- Touch steering pad plus Switch / Whip / Dash buttons when touch input is available.
- Preserve browser-safe menu click handling.

### Accessibility
- Reduced motion toggle.
- Screen shake toggle.
- High-contrast objective/selection markers.
- Separate music and SFX toggles.
- Persistent settings in localStorage.

### Audio
- Lightweight Web Audio ambient bed per world.
- Adaptive intensity from chaos / capture danger / conquest state.
- Separate music and SFX buses.
- Browser-autoplay-safe startup and resume behavior.

### Qualification
- Syntax checks for every showcase module.
- Static contracts for world identity, controls, settings and audio buses.
- Chromium and Firefox gameplay smoke.
- Rapid-click title regression.
- Cloudtop anti-stuck probe.
- Gamepad API smoke with mocked pad state.

## Later tranches

- richer deterministic building recipes and civic/industrial/residential archetypes
- actual ferries / opening bridge timing in Washwater
- elevation-aware route choices and protected/upwind paths in Cloudtop
- deterministic run telemetry and post-run statistics
- responsive website shell for embedding on sidhulyalkar.com
