# Post-Scene-3 Debug Pass

## Reported issue

Everything after scene 3 felt like a black screen with abstract shapes instead of complete sections.

## Root causes found

1. Overlay stage timing was calculated separately from the GSAP camera stage changes.
2. `AnimatePresence` was using `mode="wait"`, which could leave a visible empty gap during stage swaps.
3. Case studies, contact, and footer relied too heavily on sparse 3D backdrops instead of stronger section shells.

## Fixes applied

1. Added a shared stage event so the overlay now follows the exact stage changes emitted by the camera controller.
2. Removed `wait` mode from the overlay transitions and shortened enter/exit timing.
3. Strengthened the later section layouts with centered shells, intro gradients, left-edge accents, and better spacing.
4. Added a `debugStage` query-param hook to jump directly to any stage for verification.

## Verification

- `npm run lint`
- `npm run build`
- Headless stage captures and rendered DOM inspection for later sections

## Debug artifacts

- `stage-top.png`
- `debug-stage-2.png`
- `debug-stage-3.png`
- `debug-stage-4.png`
- `debug-stage-5.png`
- `debug-stage-4-dom.html`
