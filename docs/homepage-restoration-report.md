# Homepage Restoration Report

Date: 2026-04-17

## Scope

This pass corrected the homepage regressions introduced during the earlier restoration work. The main target was stages 3, 4, and 5, which had become misaligned and stopped behaving responsively because late legacy CSS overrides were fighting the existing stage system.

## What changed

- Reconnected `HeroOverlay` to the live viewport mode from `ExperienceShell`, so the overlay can switch between desktop, tablet, and mobile behavior again.
- Removed the conflicting late-stage homepage overrides from `src/app/globals.css` while keeping the legacy home header styling.
- Restored dynamic responsive behavior for the late homepage stages:
  - stage 3 uses the responsive case studies layout again instead of the broken fixed override
  - stage 4 follows the responsive contact stage layout again
  - stage 5 follows the responsive footer stage layout again
- Optimized the mobile versions of the late stages:
  - stage 3 mobile now uses a simpler single-card flow with compact meta and `Prev` / `Next` controls
  - stage 4 mobile hides the extra service pills and footer note, and only keeps the key contact channels visible
  - stage 5 mobile removes the extra services and social columns and keeps the footer focused on navigation and legal links
- Kept asteroid rendering removed from the hero scene so those GLB assets stay out of the homepage render path.
- Cleaned the malformed address separator in `src/data/siteConfig.ts`.

## Files updated

- `src/components/ExperienceShell.tsx`
- `src/components/HeroOverlay.tsx`
- `src/app/globals.css`
- `src/data/siteConfig.ts`

## Verification

- `npm run build` completed successfully on 2026-04-17.
- Interactive capture verification was rerun through Chrome DevTools Protocol after hydration, not just static headless screenshots.
- Verified active overlays by stage:
  - desktop `1440x1200`: stage 3 -> `.case-studies-stage`, stage 4 -> `.contact-stage`, stage 5 -> `.footer-stage`
  - mobile `390x844`: stage 3 -> `.case-studies-stage`, stage 4 -> `.contact-stage`, stage 5 -> `.footer-stage`

## Screenshot artifacts

- `docs/verification/stage-3-desktop.png`
- `docs/verification/stage-4-desktop.png`
- `docs/verification/stage-5-desktop.png`
- `docs/verification/stage-3-mobile.png`
- `docs/verification/stage-4-mobile.png`
- `docs/verification/stage-5-mobile.png`

## Notes

- `next build` still reports a non-blocking warning about multiple lockfiles and Turbopack inferring the workspace root.
