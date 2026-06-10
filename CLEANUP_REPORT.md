# Cleanup Audit Report

Generated from static import/search inspection. No files were deleted.

## Active Homepage

- `app/page.tsx`
- `components/hero/Hero.tsx`
- `components/hero/BackgroundMarquee.tsx`
- `components/hero/BackgroundMarquee.module.css`
- `components/hero/HeroSignature3D.tsx`
- `components/hero/Hero.module.css`
- `components/providers/LenisProvider.tsx`
- `app/globals.css`
- `app/tokens.css`
- `app/layout.tsx`
- `public/models/im-signature.glb`

## Active Route/Page

- `app/api/notify/route.ts`
- `app/problems/ProblemTemplate.tsx`
- `app/problems/problemPageContent.ts`
- `app/problems/problemPage.module.css`
- `app/problems/attention-without-conversion/page.tsx`
- `app/problems/content-without-structure/page.tsx`
- `app/problems/manual-workflows/page.tsx`
- `app/problems/missing-growth-infrastructure/page.tsx`
- `app/methods/MethodTemplate.tsx`
- `app/methods/methodPageContent.ts`
- `app/methods/architect/page.tsx`
- `app/methods/audit/page.tsx`
- `app/methods/build/page.tsx`
- `app/methods/hand-over/page.tsx`

## Unused But Potentially Valuable

These appear to be previous richer homepage/scene-system building blocks. They are not currently imported by active app routes, but may be useful if the horizontal/scene portfolio version returns.

- `components/layout/HorizontalEngine.tsx`
- `components/layout/HorizontalEngine.module.css`
- `components/scenes/HeroScene.tsx`
- `components/scenes/AboutScene.tsx`
- `components/scenes/AboutScene.module.css`
- `components/scenes/ClarityScene.tsx`
- `components/scenes/ClarityScene.module.css`
- `components/scenes/ContactScene.tsx`
- `components/scenes/ContactScene.module.css`
- `components/scenes/CycleCardsScene.tsx`
- `components/scenes/CycleCardsScene.module.css`
- `components/scenes/DiagnosisScene.tsx`
- `components/scenes/MethodScene.tsx`
- `components/scenes/MethodScene.module.css`
- `components/scenes/ServicesScene.tsx`
- `components/scenes/ServicesScene.module.css`
- `components/scenes/TensionScene.tsx`
- `components/hook/HookSection.tsx`
- `components/hook/HookSection.module.css`
- `components/intro/HomeIntroGate.tsx`
- `components/intro/HomeIntroGate.module.css`
- `components/intro/LoaderIntro.tsx`
- `components/intro/LoaderIntro.module.css`
- `components/about/SystemStackLogoSlider.tsx`
- `components/about/SystemStackLogoSlider.module.css`
- `components/ui/Button.tsx`
- `components/ui/Button.module.css`
- `components/ui/Chip.tsx`
- `components/ui/Eyebrow.tsx`
- `components/ui/Eyebrow.module.css`
- `components/ui/GuestCursor.tsx`
- `components/ui/GuestCursor.module.css`
- `components/ui/ProgressDots.tsx`
- `components/ui/ProgressDots.module.css`
- `components/ui/SceneCard.tsx`
- `components/ui/SceneCard.module.css`
- `components/ui/TechChip.tsx`
- `components/ui/TechChip.module.css`
- `constants/animations.ts`

## Safe To Archive Later

These look like older implementations or duplicates that are not part of the active homepage or current route templates.

- `components/hero/Hero3D.tsx` - older manual Three.js/TextGeometry hero object; current active object is `HeroSignature3D.tsx`.
- `components/hero/hero-marquee.css` - not imported by the active hero.
- `components/StackCardSection.tsx`
- `components/StackCardSection.module.css`
- `components/CardStack.tsx`
- `components/CardStack.module.css`
- `components/GlassCard.tsx`
- `components/GlassCard.module.css`
- `components/ProgressDots.tsx`
- `components/ProgressDots.module.css`
- `hooks/useHorizontalScroll.ts`
- `hooks/useStackScroll.ts`
- `data/gaps.ts`
- `data/method.ts`
- `data/types.ts`
- `app/page.module.css` - not imported by the current `app/page.tsx`.
- `styles/globals.css` - separate from active `app/globals.css`; not currently imported.

## Static Assets To Review Before Archiving

- `public/im-signature.glb.glb` - duplicate/source copy of the active model now served from `public/models/im-signature.glb`.
- `public/3d-object-reference.png.png` - reference image only; not rendered by active code.
- `public/portrait.png`
- `portrait.png.png`
- `public/intro-karachi-earth.mp4.mp4`
- `public/intro/karachi-earth.mp4`
- `public/earth-intro.html`
- `public/hdr/studio_small_03_4k.hdr`
- `public/fonts/Lobster-Regular.ttf`
- `public/fonts/Lobster_Regular.json`

## Notes

- The active homepage is currently a simplified vertical page using `Hero` plus static About, Work, Stack, Contact sections.
- The older scene system appears internally coherent, but it is disconnected from active routes.
- No source files were removed in this audit.
