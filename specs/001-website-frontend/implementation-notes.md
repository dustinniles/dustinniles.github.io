# Implementation Notes: 001-website-frontend

**Date**: 2026-02-11 | **Task**: T073 | **Branch**: 001-website-frontend

## Key Decisions & Rationale

### 1. CSS Custom Properties Over Tailwind Color Classes

**Decision**: Replaced all hardcoded Tailwind color classes (`text-gray-600`, `bg-white`, `border-gray-100`) with CSS custom properties via Tailwind's arbitrary value syntax (`text-[var(--text-secondary)]`).

**Rationale**: CSS variables switch automatically via `@media (prefers-color-scheme: dark)` without JavaScript, maintaining static export compatibility (Constitution Principle III). Tailwind color classes are compile-time constants that cannot respond to dark mode.

**Trade-off**: Slightly more verbose class names, but single source of truth for all colors in globals.css.

### 2. Focus Ring via Global CSS Rule

**Decision**: Implemented focus indicators as a single global CSS rule `*:focus-visible { outline: 2px solid var(--focus-ring); }` instead of per-element Tailwind classes.

**Rationale**: A single rule ensures consistent focus styling across ALL interactive elements, including dynamically added ones. Using `var(--focus-ring)` enables automatic light/dark switching. Removed all `focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:outline-none` classes from components.

**Trade-off**: No per-element customization, but consistency is more important for accessibility.

### 3. Dark Mode: CSS Media Query, Not JavaScript Toggle

**Decision**: Used `@media (prefers-color-scheme: dark)` in CSS, no `classList.toggle('dark')` JavaScript approach.

**Rationale**: Pure CSS approach requires zero JavaScript, works during static rendering, and cannot flash unstyled content (FOUC). Constitution Principle III (Static-First Architecture) requires this approach.

**Trade-off**: No user-controlled toggle (can't override system preference). Future enhancement if needed.

### 4. Global Footer Hidden Visually, Available to Screen Readers

**Decision**: Layout footer uses `class="sr-only"` to be present for screen readers but not visible in the UI.

**Rationale**: The visual footer (copyright year) is already in MenuSlider when expanded. Adding a visible footer in the main content area would conflict with the minimal aesthetic (Constitution Principle II). The SR-only footer satisfies semantic HTML requirements (T034) without visual intrusion.

### 5. Active Page Indicator: aria-current + Font Weight

**Decision**: Active navigation items use `aria-current="page"` attribute, lighter foreground color (`var(--foreground)` instead of secondary), and `font-normal` (400 weight) vs body `font-light` (300 weight).

**Rationale**: Satisfies T020 (visual indicator) and T036 (ARIA label). Using font weight difference instead of color alone satisfies T047 (color not sole conveyor). Keeps minimal aesthetic.

### 6. Color Updates Applied to All Page Files

**Decision**: Extended color migration beyond the task-specified components to all page files in `app/` directory.

**Rationale**: Task list specified `Sidebar.tsx`, `MenuSlider.tsx`, `SocialLinks.tsx`, and `layout.tsx` for color replacement, but all pages also contained hardcoded `text-gray-*` classes that would fail in dark mode. Completing the migration to all files ensures Phase 5 dark mode testing can pass.

### 7. `style-src 'unsafe-inline'` in CSP

**Decision**: Included `'unsafe-inline'` in `style-src` directive.

**Rationale**: Next.js 16 + Tailwind CSS 4 inject some inline styles during SSR/static generation. Removing `'unsafe-inline'` would break styled output. This is a known limitation of current Next.js + Tailwind stack. Future mitigation: nonce-based CSP if server-side rendering is introduced.

## Files Changed Summary

| File | Change Type | Description |
|------|-------------|-------------|
| `app/globals.css` | Modified | Typography CSS vars, color system, dark mode, focus ring, line heights |
| `app/layout.tsx` | Modified | Skip link, main id, footer landmark, expanded CSP |
| `components/MenuSlider.tsx` | Modified | Active indicator, ARIA, CSS variables, touch targets |
| `components/SocialLinks.tsx` | Modified | CSS variables, semantic nav fix |
| `components/Sidebar.tsx` | Modified | CSS variables |
| `components/BlogLayout.tsx` | Modified | CSS variables |
| `components/PhotoGallery.tsx` | Modified | CSS variable for arrow indicator |
| `app/page.tsx` | Modified | CSS variable |
| `app/about/page.tsx` | Modified | CSS variables, heading text update |
| `app/work/page.tsx` | Modified | CSS variables |
| `app/contact/page.tsx` | Modified | CSS variables |
| `app/resume/page.tsx` | Modified | CSS variables, h3 size corrected to text-[var(--text-lg)] |
| `app/video/page.tsx` | Modified | CSS variables |
| `app/volunteering/page.tsx` | Modified | CSS variables |
| `app/play/page.tsx` | Modified | CSS variables |
| `app/tech/page.tsx` | Modified | CSS variables |
| `app/cycling/page.tsx` | Modified | CSS variables |
| `public/_headers` | Created | CSP and security headers for static hosting |
| `specs/001-website-frontend/design-review-results.md` | Created | Phase 2 audit findings |
| `specs/001-website-frontend/accessibility-audit.md` | Created | Accessibility review results |
| `specs/001-website-frontend/hig-compliance-summary.md` | Created | Final HIG compliance status |
| `specs/001-website-frontend/security-audit.md` | Created | npm audit + security review |
| `specs/001-website-frontend/implementation-notes.md` | Created | This file |

## Testing Notes

Build verified: ✓ `npm run build` passes with no errors  
npm audit: ✓ 0 vulnerabilities  
TypeScript: ✓ No type errors  

Pending browser tests:
- Lighthouse accessibility audit (target 100)
- axe DevTools scan
- Screen reader VoiceOver
- Device dark mode visual verification
- 200% zoom readability
- 320px mobile layout
