# Tasks: Apply Apple HIG Amendments to Portfolio Website Frontend

**Feature**: Apply Apple HIG Amendments to Portfolio Website Frontend  
**Branch**: `001-website-frontend` | **Date**: 2026-02-11  
**Design Artifacts**: [plan.md](plan.md) | [spec.md](spec.md) | [data-model.md](data-model.md) | [research.md](research.md) | [quickstart.md](quickstart.md)

---

## Executive Summary

Implement comprehensive Apple HIG compliance across the portfolio website frontend. Work spans 6 user stories (P1-P6) organized into phases, with each story independently testable. **Actual scope**: 76 tasks across 9 phases. Reorganized to conduct baseline audit (Phase 2A) BEFORE implementing CSS changes (Phase 2B), ensuring all fixes are informed by audit findings.

**Success Criteria**: Lighthouse Accessibility = 100, WCAG 2.1 Level AA compliance, full dark mode support, HIG Foundation alignment across Layout, Color, Typography, Dark Mode, Accessibility, and Inclusion principles.

---

## Implementation Strategy

### Phase Breakdown

1. **Phase 1: Setup** - Configure project for HIG-compliant development (T001-T004)
2. **Phase 2: Baseline Design Audit** - Audit current design state to identify HIG gaps before implementing changes (T013-T019)
3. **Phase 3: Foundational CSS** - Implement CSS infrastructure informed by Phase 2 audit findings (T005-T012)
4. **Phase 4: User Story 2** - Component and Navigation Pattern Alignment (P2) (T020-T025)
5. **Phase 5: User Story 3** - Dark Mode Implementation (P3) (T026-T033)
6. **Phase 6: User Story 4** - Accessibility Compliance Review (P4) (T034-T047)
7. **Phase 7: User Story 5** - IBM Plex Font Implementation and Typography Verification (P5) (T048-T057)
8. **Phase 8: User Story 6** - Inclusion and Diverse User Support (P6) (T058-T062)
9. **Phase 9: Polish & Cross-Cutting Concerns** - Final testing and deployment (T063-T076)

**CRITICAL CHANGE**: User Story 1 (Design Review/Audit) is Phase 2 and executes BEFORE CSS changes (Phase 3). This ensures all CSS variable implementations (T005-T012) are driven by specific audit findings.

### Parallelization Opportunities

- **Phase 1 tasks**: T001-T004 (setup/verification) can run in parallel
- **Phase 2 tasks**: T013-T019 (design review different HIG sections) can run in parallel
- **Phase 3 tasks**: T005-T012 (CSS variables and color system) can run in parallel, informed by Phase 2 findings
- **Phase 3-7 tasks**: Phases 3-7 largely independent after Phase 2B completes (parallel execution recommended)

### Dependency Chain

```
Phase 1 → Phase 2 (Baseline Audit) → Phase 3 (Foundational CSS) → Phases 4-8 (user stories, mostly parallel)
  (Setup)   (Identify gaps)         (Implement changes)                   (Implementation)
                ↓
            Phase 8 (polish, testing, deployment)
```

**Key improvement**: Audit findings in Phase 2A directly inform CSS changes in Phase 2B, preventing unnecessary changes and ensuring targeted fixes.

---

## Phase 1: Setup & Verification

**Goal**: Establish project configuration and verify prerequisites for HIG compliance work.

**Independent Test Criteria**: 
- Project builds successfully with no errors
- All required files and dependencies verified
- Repository is clean and ready for feature branch work

### Tasks

- [ ] T001 Verify project branch is `001-website-frontend` and main branch is up-to-date in `app/` directory structure

- [ ] T002 [P] Verify npm dependencies installed and Next.js 16.1.6, React 19.2.3, Tailwind CSS 4.x are correct versions in `package.json`

- [ ] T003 [P] Verify IBM Plex Sans @fontsource package is installed (v5.2.8 or later) with weights 300 and 400 imported in `app/globals.css`

- [ ] T004 Run `npm run build` to verify static export builds successfully; check `/out` directory is created in project root

- [ ] T004a [P] Verify component files exist: confirm `components/MenuSlider.tsx` and `components/SocialLinks.tsx` are present in the repository; if either is missing, halt Phase 2 and create a minimal placeholder component before proceeding (per H2 — these files are referenced in T010, T011, T017, T018, and T020–T025)

---

## Phase 2: Baseline Design Audit - Design Review Against HIG Foundations (P1)

**Story Goal**: Conduct comprehensive baseline audit of the portfolio website against Apple HIG Foundations standards (Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing). Document compliance state and identify gaps **before implementing any CSS changes**. Phase 3 (Foundational CSS) must not begin until this audit is complete.

**Independent Test Criteria**:
- All HIG Foundations sections (Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing) have been reviewed
- Design review findings document compliance/non-compliance with specific HIG references
- Layout spacing verified to conform to 8px base unit system
- Color contrast verified to meet WCAG AA standards (4.5:1 normal, 3:1 large text) in both light and dark modes
- Typography hierarchy verified to be visually distinct (h1 > h2 > h3 with clear size differences)
- Dark mode support tested with system prefers-color-scheme preference enabled

**Acceptance Scenarios** (from spec.md, User Story 1):
1. Layout spacing conforms to 8px base units in all margin/padding definitions
2. Text color contrast meets WCAG 4.5:1 for normal text and 3:1 for large text in both modes
3. Typography hierarchy shows clear visual distinction between h1, h2, h3 font sizes
4. Dark mode renders without broken layouts or unreadable text
5. All interactive elements have clear affordances (hover/focus states visible in both modes)
6. Accessibility features work (keyboard navigation, focus indicators, reduced-motion support)

### Tasks

- [ ] T013 [US1] Run comprehensive design review against HIG Foundations: Layout principles in `app/layout.tsx` and component files, documenting all spacing values and verifying 8px base unit conformance per research.md section 3

- [ ] T014 [US1] Audit color contrast in light mode: test #171717 on #ffffff (should be ≥ 21:1), #4b5563 on #ffffff (should be ≥ 8.5:1), #9ca3af on #ffffff (should be ≥ 4.8:1) using WebAIM contrast checker; document findings in design-review-results.md

- [ ] T015 [US1] Verify typography hierarchy is visually distinct: inspect `app/globals.css` CSS variables and Tailwind classes to confirm h1 (var(--text-4xl)), h2 (var(--text-2xl)), h3 (var(--text-lg)) have clearly different sizes; test at 200% browser zoom to confirm readability

- [ ] T016 [US1] Test dark mode rendering on all portfolio pages: enable `prefers-color-scheme: dark` in browser DevTools, navigate through all pages, verify no broken layouts, text remains readable (contrast ≥ 4.5:1), and focus indicators visible

- [ ] T017 [US1] [P] Verify affordances for interactive elements in light mode: inspect hover states in `components/MenuSlider.tsx`, `components/SocialLinks.tsx` for color change contrast, verify focus rings have ≥ 3:1 contrast against white background

- [ ] T018 [US1] [P] Verify affordances for interactive elements in dark mode: test hover states and focus rings against dark background (#1a1a1a), ensure hover text color (var(--foreground)) provides sufficient contrast, focus ring (#60a5fa) has ≥ 3:1 contrast

- [ ] T019 [US1] Document HIG Foundations compliance results: create `specs/001-website-frontend/design-review-results.md` with findings for Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing sections per data-model.md compliance checklist

---

## Phase 3: Foundational - Typography, Color System & Dark Mode

**Goal**: Establish CSS variables, typography scale, color system for both light and dark modes, informed by Phase 2 audit findings. These tasks are blocking prerequisites for all user stories.

**Independent Test Criteria**:
- CSS custom properties defined for typography (--text-base through --text-4xl)
- Light and dark mode color palettes defined in `:root` and `@media (prefers-color-scheme: dark)`
- Body text has explicit `line-height: 1.5` or greater
- All color references replaced with CSS variables
- Browser DevTools can emulate dark mode with proper color switching

### Tasks

- [ ] T005 [P] Create CSS custom properties for typography scale in `app/globals.css`: define --text-base, --text-sm, --text-xs, --text-lg, --text-xl, --text-2xl, --text-3xl, --text-4xl with rem values per data-model.md section 1

- [ ] T006 [P] Add CSS custom properties for color system in `app/globals.css` `:root` block: --background (#ffffff), --foreground (#171717), --text-secondary (#4b5563), --text-tertiary (#9ca3af), --border (#e5e7eb), --focus-ring (#171717) per data-model.md section 2

- [ ] T007 Create dark mode color overrides in `app/globals.css` using `@media (prefers-color-scheme: dark)` block: --background (#1a1a1a), --foreground (#f5f5f5), --text-secondary (#d1d5db), --text-tertiary (#9ca3af), --border (#404040), --focus-ring (#60a5fa) per data-model.md section 3

- [ ] T008 [P] Update body element styling in `app/globals.css`: set `background: var(--background)`, `color: var(--foreground)`, `font-size: var(--text-base)`, `line-height: var(--line-height-normal)` (minimum 1.5)

- [ ] T009 [P] Update semantic HTML element line heights in `app/globals.css`: set `p, span, li { line-height: var(--line-height-normal); }` and `h1, h2, h3 { line-height: var(--line-height-tight); }`

- [ ] T010 [P] Replace hardcoded color values in `components/Sidebar.tsx` and `components/MenuSlider.tsx` with CSS variables: update className references from `bg-white text-gray-600` to `bg-[var(--background)] text-[var(--text-secondary)]` or equivalent

- [ ] T011 [P] Replace hardcoded color values in `components/SocialLinks.tsx` with CSS variables: update all `hover:text-gray-900`, `text-gray-600` references to use `text-[var(--foreground)]`, `text-[var(--text-secondary)]` equivalents

- [ ] T012 Replace hardcoded color values in `app/layout.tsx` with CSS variables: update root layout styling to use --background, --foreground variables in body element styles

- [ ] T012a Add skip-to-content link in `app/layout.tsx`: insert `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--background)] focus:text-[var(--foreground)] focus:border focus:border-[var(--border)]">Skip to content</a>` as the first child of `<body>`; add `id="main-content"` to the `<main>` element; per FR-026 and SC-016

---

## Phase 4: User Story 2 - Component and Navigation Pattern Alignment (P2)

**Story Goal**: Review navigation structure, menu interactions, and content presentation patterns against HIG Components standards. Enhance affordances, add active page indicators, and ensure navigation patterns align with HIG Navigation and Search guidelines.

**Independent Test Criteria**:
- Sidebar navigation pattern aligns with HIG Components: Navigation (menu items have clear affordances)
- Active/current page indicator is visible in navigation
- Menu item affordances tested in both light and dark modes
- Navigation animations follow HIG motion principles and respect reduced-motion preference
- Information hierarchy is visually clear and distinguishable
- Touch targets on mobile are ≥ 44×44px per HIG

**Acceptance Scenarios** (from spec.md, User Story 2):
1. Each menu item has a clear affordance indicating it is clickable (visual weight, color contrast, or interactive indicator)
2. Menu animations provide appropriate feedback and follow HIG motion principles
3. Content hierarchy clearly distinguishes primary, secondary, and supporting information
4. Information architecture is intuitive and follows HIG patterns
5. Photography gallery scroll-snap provides appropriate feedback

### Tasks

- [ ] T020 [US2] Add active page visual indicator to navigation: modify `components/MenuSlider.tsx` to detect current page using Next.js router and apply visual highlight (e.g., `aria-current="page"` attribute and visual styling) to active link

- [ ] T021 [US2] Enhance navigation affordances in light mode: update `components/MenuSlider.tsx` menu item styling to have stronger color contrast on hover (`text-[var(--foreground)]` instead of gray-600), verify hover state provides clear feedback

- [ ] T022 [US2] [P] Enhance navigation affordances in dark mode: update `components/MenuSlider.tsx` hover states to provide sufficient contrast against dark background, test that hover color change is clearly visible with dark color scheme

- [ ] T023 [US2] Verify information architecture and content hierarchy: inspect `app/page.tsx` and content pages to confirm heading hierarchy (h1 → h2 → h3), visual hierarchy is clear, and information structure follows HIG patterns per data-model.md section 5

- [ ] T024 [US2] Test mobile navigation touch targets: verify sidebar menu items are ≥ 44×44px on mobile (320px viewport width), ensure menu expand/collapse button is accessible per HIG

- [ ] T025 [US2] Verify reduced-motion support for navigation animations: test with `prefers-reduced-motion: reduce` enabled, confirm sidebar animation disables per `@media (prefers-reduced-motion: reduce)` in globals.css

---

## Phase 5: User Story 3 - Dark Mode Implementation (P3)

**Story Goal**: Implement full dark mode support with independently designed dark color palette. Ensure all pages render correctly in dark mode with proper contrast, visible interactive elements, and appropriate image rendering. Users enabling system dark mode should experience full visual fidelity.

**Independent Test Criteria**:
- All pages render without broken layouts in dark mode
- Text color contrast maintained at ≥ 4.5:1 in dark appearance
- Background colors use dark grays (#1a1a1a) not pure black per HIG
- Interactive elements (buttons, links, focus rings) visually distinct in dark mode
- Images remain visible and readable in dark mode without color degradation
- Dark mode tested on multiple platforms (macOS, iOS, Android, browser DevTools)

**Acceptance Scenarios** (from spec.md, User Story 3):
1. Site loads with dark backgrounds when system dark mode enabled
2. Text contrast maintained ≥ 4.5:1 with dark backgrounds
3. Sidebar and header accent colors visually distinct in dark mode
4. Photography gallery images visible without color degradation in dark
5. Interactive element hover and focus states clearly visible in dark appearance

### Tasks

- [ ] T026 [US3] [P] Test dark mode on macOS: open System Preferences > General > Appearance, select Dark, reload portfolio site, navigate all pages and verify no broken layouts

- [ ] T027 [US3] [P] Test dark mode on iOS: open Settings > Display & Brightness > Dark, visit site in Safari, test all pages for proper rendering and readability

- [ ] T028 [US3] [P] Test dark mode on Android: open Settings > Display > Dark theme, visit site in Chrome, verify dark mode colors apply and images render appropriately

- [ ] T029 [US3] Test dark mode in browser DevTools: open Chrome DevTools > Rendering > Emulate CSS media feature preference `prefers-color-scheme: dark`, navigate all pages, verify all colors update via CSS variables

- [ ] T030 [US3] Test image rendering in dark mode: view portfolio gallery in both light and dark modes, verify images remain visible, have appropriate contrast with backgrounds, no unintended color shifts

- [ ] T031 [US3] [P] Verify text color contrast in dark mode: check --foreground (#f5f5f5) on --background (#1a1a1a) = 21:1 contrast, --text-secondary (#d1d5db) on dark = 13:1, both exceed WCAG AA requirements per data-model.md section 2

- [ ] T032 [US3] [P] Verify focus ring visibility in dark mode: test focus indicator color (#60a5fa blue) on dark background, ensure ≥ 3:1 contrast and clearly visible when tabbing through elements

- [ ] T033 [US3] Clear browser cache and test dark mode persistence: hard refresh (Cmd+Shift+R or Ctrl+Shift+R), verify dark mode settings persist and apply correctly on reload

---

## Phase 6: User Story 4 - Accessibility Compliance Review (P4)

**Story Goal**: Ensure portfolio website meets WCAG 2.1 Level AA accessibility standards. Implement keyboard navigation, screen reader compatibility, ARIA labels, semantic HTML structure, and color contrast. Visitors with disabilities should access all content without barriers.

**Independent Test Criteria**:
- All interactive elements accessible via Tab, Enter, Escape keys only (no mouse required)
- Focus indicators clearly visible with ≥ 3:1 contrast in both light and dark modes
- Heading hierarchy semantic (h1 → h2 → h3, no skipped levels)
- Page landmarks properly implemented (nav, main, footer)
- All images have descriptive alt text (not just "image" or generic labels)
- Screen reader compatibility verified (content announced in logical order)
- Animations and transitions respect prefers-reduced-motion preference
- Lighthouse Accessibility score = 100/100
- Color not the sole means of conveying information

**Acceptance Scenarios** (from spec.md, User Story 4):
1. All interactive elements reachable and operable via keyboard only
2. Focus indicators clearly visible in both light and dark appearances
3. Semantic HTML with proper heading hierarchy and landmarks
4. Screen reader announces all content and navigation correctly
5. Animations disabled or significantly reduced with prefers-reduced-motion
6. Color not sole conveyor of information (text labels, patterns, or icons used alongside color)

### Tasks

- [ ] T034 [US4] Add semantic HTML landmarks: verify `app/layout.tsx` has `<nav>`, `<main>`, `<footer>` elements properly implemented, check each page file has consistent landmark structure

- [ ] T035 [US4] Verify heading hierarchy in root layout and all pages: inspect `app/page.tsx`, `app/about/page.tsx`, and other pages to confirm h1 → h2 → h3 usage with no skipped levels, proper semantic structure

- [ ] T036 [US4] Add ARIA labels to navigation: update `components/MenuSlider.tsx` to include `aria-label="Main navigation"` on nav element, add `aria-current="page"` to active navigation link, add `aria-expanded` and `aria-controls` to expandable menu items

- [ ] T037 [US4] [P] Enhance menu accessibility in `components/MenuSlider.tsx`: add aria-label to expand/collapse button, add aria-controls pointing to submenu ID, ensure menu items are keyboard accessible (Enter/Space to activate, Escape to close)

- [ ] T038 [US4] Add descriptive alt text to all images: update `app/page.tsx` portfolio gallery to add descriptive alt text to each portfolio image (e.g., "Portfolio project: Interactive dashboard redesign for iOS and Android"), verify all images in other pages have alt text

- [ ] T039 [US4] [P] Update image elements for accessibility: ensure all `<Image>` components have alt prop filled with descriptive text per WCAG Image guidelines, check for any icon-only buttons and add aria-labels

- [ ] T040 [US4] Verify focus indicator contrast in light mode: test focus ring color (#171717) on white background has ≥ 3:1 contrast per WCAG focus visibility requirements

- [ ] T041 [US4] Verify focus indicator contrast in dark mode: test focus ring color (#60a5fa blue) on dark background has ≥ 3:1 contrast, ensure visible and clearly distinguishable

- [ ] T042 [US4] Verify reduced-motion support: test with `prefers-reduced-motion: reduce` enabled in OS settings, confirm sidebar animation disables, all transitions removed, animations duration set to 0.01ms

- [ ] T043 [US4] Conduct manual keyboard navigation test: tab through entire site on keyboard only, verify all links/buttons reachable, focus order logical (left-to-right, top-to-bottom), no keyboard traps

- [ ] T044 [US4] [P] Test with screen reader on macOS: enable VoiceOver (Cmd+F5), navigate site using VO+Right Arrow keys, verify all content announced in logical order, navigation understood, page structure clear

- [ ] T045 [US4] [P] Run Lighthouse accessibility audit: open DevTools > Lighthouse > select Accessibility, run audit targeting Accessibility score = 100/100, document any remaining issues in accessibility-audit.md

- [ ] T046 [US4] Run axe DevTools accessibility scan: install axe DevTools browser extension, run scan on all pages, resolve any flagged accessibility issues, document fixes in accessibility-audit.md

- [ ] T047 [US4] Verify color usage guidelines: check that color is not the sole means of conveying information (e.g., links use underline or text in addition to color, status indicators use icons or text alongside color)

---

## Phase 7: User Story 5 - IBM Plex Font Implementation and Typography Verification (P5)

**Story Goal**: Ensure portfolio uses IBM Plex Sans exclusively with HIG-compliant sizing, hierarchy, and readability standards. Typography must follow the minimal aesthetic while maintaining accessibility. Font sizing, weights, line heights, and spacing must align with HIG guidelines.

**Independent Test Criteria**:
- IBM Plex Sans is the only font loaded (verified via network requests)
- Body text size ≥ 16px (1rem) minimum per HIG/WCAG
- Line height ≥ 1.5x font size for body text readability
- Heading hierarchy uses clear, visually distinct sizing (h1 > h2 > h3)
- Font sizes use rem units allowing user zoom and font size preference scaling
- Font weights limited to 300 (light) and 400 (regular) per minimal aesthetic
- Text remains readable at 200% browser zoom and with system font size adjustments

**Acceptance Scenarios** (from spec.md, User Story 5):
1. Only IBM Plex Sans fonts loaded from @fontsource (no external CDN, no system font fallback)
2. Body text ≥ 16px (1rem) for readability per HIG
3. Heading sizes follow clear hierarchy with visible size differences
4. Line height ≥ 1.5x font size for body text per WCAG
5. Text readable on small screens without horizontal scrolling
6. Font sizing scales appropriately with user font size preferences

### Tasks

- [ ] T048 [US5] Verify IBM Plex Sans is sole font: check `app/globals.css` @fontsource imports include only IBM Plex Sans with weights 300 and 400, no fallback system fonts or external CDN fonts

- [ ] T049 [US5] Verify @fontsource IBM Plex Sans package version: check `package.json` for @fontsource/ibm-plex-sans (should be v5.2.8+), confirm weights 300 and 400 are imported in globals.css

- [ ] T050 [US5] [P] Test body text size: verify all body/paragraph text uses `var(--text-base)` (1rem = 16px minimum) or larger, check no body text smaller than 16px per HIG/WCAG minimum

- [ ] T051 [US5] [P] Test line height for body text: verify all `<p>`, `<span>`, `<li>` elements have `line-height: var(--line-height-normal)` (≥ 1.5) per data-model.md section 1

- [ ] T052 [US5] [P] Test heading hierarchy sizes: verify h1 uses var(--text-4xl) (36px), h2 uses var(--text-2xl) (24px), h3 uses var(--text-lg) (18px) with clear visual distinction per data-model.md section 1

- [ ] T053 [US5] Test typography at 200% browser zoom: open DevTools, set zoom to 200%, navigate all pages, verify heading hierarchy remains visually distinct, all text remains readable, no horizontal scrolling

- [ ] T054 [US5] [P] Test typography with system font size adjustment: on macOS, open System Preferences > Accessibility > Display > enable Larger Accessibility Sizes, reload site, verify text scales appropriately and remains readable

- [ ] T055 [US5] [P] Test typography on mobile (320px viewport): use DevTools responsive design mode, test at 320px width (mobile minimum), verify font sizes remain readable, no horizontal scrolling, text not too small

- [ ] T056 [US5] Verify font weights per constitution: inspect all elements in globals.css and components, confirm body text uses font-weight 300–400 only and headings use font-weight 300–600 (per Constitution Principle II); flag any weights outside these bounds as violations

- [ ] T057 [US5] Verify rem unit usage: check `app/globals.css` CSS variables use rem units (e.g., --text-base: 1rem), not px units for font sizing, ensuring user zoom and font size preferences scale correctly

---

## Phase 8: User Story 6 - Inclusion and Diverse User Support (P6)

**Story Goal**: Ensure portfolio website is inclusive and welcoming to visitors from diverse backgrounds. Design and copy must not perpetuate biases, use inclusive language, and support diverse input methods and abilities. Content should reflect and respect diversity.

**Independent Test Criteria**:
- All copy on site uses inclusive language avoiding biased or exclusionary terms
- Design patterns accommodate diverse input methods (keyboard, touch, mouse, voice if applicable)
- Imagery (if used beyond portfolio content) does not perpetuate stereotypes or biases
- Design doesn't assume user abilities or backgrounds
- Diverse user representation considered in content and visual design

**Acceptance Scenarios** (from spec.md, User Story 6):
1. All copy uses inclusive language without gendered, biased, or exclusionary terms
2. Design accommodates diverse input methods (touch, keyboard, mouse)
3. Imagery doesn't perpetuate stereotypes or biases (if applicable)
4. Interaction design doesn't assume user background or abilities

### Tasks

- [ ] T058 [US6] Audit copy for inclusive language: review all text in `app/page.tsx`, `app/about/page.tsx`, and other pages for inclusive language, remove gendered terms, biased language, or exclusionary phrasing

- [ ] T059 [US6] Review About/biographical content: ensure any biographical or background information in About section provides context without making assumptions about user backgrounds, respects diversity

- [ ] T060 [US6] Review portfolio imagery for representation: examine portfolio items and gallery images for diversity representation (if not just client work), ensure imagery doesn't perpetuate stereotypes

- [ ] T061 [US6] Verify diverse input method support: ensure navigation works with keyboard (Tab, Enter, Escape), touch (tap, scroll), and mouse (click, hover), no input method privileged over others

- [ ] T062 [US6] Check design accessibility for diverse abilities: verify site works for users with color blindness (test with color blindness simulator), low vision (test with zoom and contrast), dexterity challenges (keyboard navigation)

---

## Phase 9: Polish & Cross-Cutting Concerns

**Goal**: Final testing, verification, and deployment of HIG compliance feature.

**Independent Test Criteria**:
- All automated tests pass (Lighthouse, axe DevTools)
- All manual tests documented
- Build succeeds with no warnings or errors
- Feature can be deployed to production with no issues

### Tasks

- [ ] T063 Run full Lighthouse audit: execute complete Lighthouse audit (Performance, Accessibility, Best Practices, SEO) targeting Performance ≥ 90, Accessibility = 100, document results in lighthouse-audit.md

- [ ] T064 Verify Performance metrics: test First Contentful Paint (FCP) < 1.5s on 3G network throttling in DevTools, confirm Lighthouse Performance ≥ 90 per constitution goals

- [ ] T065 [P] Run Lighthouse Best Practices audit: verify no third-party JavaScript without purpose, HTTPS enforcement, CSP headers compliance, document in best-practices.md

- [ ] T066 [P] Verify SEO compliance: run Lighthouse SEO audit, ensure meta tags present, schema markup (if applicable), document results in seo-audit.md

- [ ] T067 Run final accessibility scan: execute axe DevTools scan on all pages, Lighthouse accessibility audit one more time, verify Accessibility = 100, document any remaining issues

- [ ] T068 Test build process: run `npm run build`, verify `/out` directory created with static export, no warnings or errors during build process

- [ ] T069 [P] Test production build locally: build site with `npm run build`, preview with local server (e.g., `npx serve out`), test all pages load correctly in production build

- [ ] T069a Implement CSP headers if absent: verify `public/_headers` exists with Content-Security-Policy as defined in constitution.md Security Standards; if missing or incomplete, create/update the file with the exact CSP policy (`default-src 'self'`, `script-src 'self'`, `style-src 'self'`, `img-src 'self' data:`, `font-src 'self'`, `frame-ancestors 'none'`) plus `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff`; per FR-032

- [ ] T070 [P] Verify CSP compliance: check `_headers` or GitHub Pages configuration for Content-Security-Policy headers, ensure no unsafe-inline/unsafe-eval, CSP compatible with all changes made

- [ ] T071 Verify external link security: spot-check portfolio and navigation external links include `rel="noopener noreferrer"` attribute to prevent security vulnerabilities

- [ ] T072 Create HIG compliance summary document: write `specs/001-website-frontend/hig-compliance-summary.md` documenting all HIG Foundations and Components compliance status, testing results, and implementation details

- [ ] T073 Document implementation decisions: update `specs/001-website-frontend/implementation-notes.md` with key decisions, trade-offs, and rationale for design choices made during implementation

- [ ] T073a Run `npm audit` before commit: execute `npm audit` in project root; address all critical and high severity vulnerabilities before proceeding; document results in `specs/001-website-frontend/security-audit.md`; per Constitution Principle VII security requirements

- [ ] T074 Prepare git commit: stage all changes, create meaningful commit message summarizing HIG compliance implementation across all user stories, sign with Co-Authored-By if pair programming

- [ ] T075 Create pull request: push feature branch to remote, create PR against main branch using template, reference spec.md and all design artifacts in PR description, request review

- [ ] T076 Verify deployment: confirm GitHub Actions workflow triggers on PR merge, static export deploys to GitHub Pages successfully, test live site for all changes

---

## Dependency Graph

```
Phase 1 (Setup)
     ↓
Phase 2 (Baseline Audit) → Identifies HIG gaps
     ↓
Phase 3 (Foundational CSS) → Implements gap fixes
     ↓
    ┌────────────────┬────────────────┬────────────────┬─────────────┐
    ↓                ↓                ↓                ↓             ↓
Phase 4 (US2)   Phase 5 (US3)   Phase 6 (US4)   Phase 7 (US5)  Phase 8 (US6)
[Navigation]    [Dark Mode]     [Accessibility] [Typography]   [Inclusion]
    ↓                ↓                ↓                ↓             ↓
    └────────────────┴────────────────┴────────────────┴─────────────┘
                              ↓
                      Phase 9 (Polish)
                    [Testing & Deployment]
```

**Key Dependencies**:
- Phase 1 must complete before any other work (setup/verification)
- Phase 2 (Baseline Audit) must complete BEFORE Phase 3 (audit findings drive CSS changes)
- Phase 3 must complete before Phases 4-8 (all stories depend on foundational CSS variables and color system)
- Phases 4-8 largely independent after Phase 3 completes; can execute in parallel
- Phase 9 (testing and deployment) depends on all previous phases
- **Critical design**: Phase 2 identifies specific gaps, then Phase 3 implements targeted fixes

---

## Parallel Execution Examples

### Example 1: Parallel Work in Phase 3 (Foundational)
**Team Size**: 2 developers

**Developer 1**:
- T005 (Typography CSS variables)
- T008 (Body styling)
- T009 (Line heights)

**Developer 2**:
- T006 (Color system)
- T007 (Dark mode overrides)
- T010 (Sidebar colors)

**Merge Point**: After both complete, continue with T011-T012

---

### Example 2: Parallel Work in Phase 4 (US2 - Navigation)
**Team Size**: 2 developers (assuming Phase 2 already complete)

**Developer 1**:
- T020 (Active page indicator)
- T021 (Light mode affordances)
- T023 (Information architecture)

**Developer 2**:
- T022 (Dark mode affordances)
- T024 (Mobile touch targets)
- T025 (Reduced-motion support)

**Merge Point**: After both complete, all Phase 4 tasks done

---

### Example 3: Parallel Work in Phase 6 (US4 - Accessibility)
**Team Size**: 3+ developers

**Developer 1**: Semantic & Landmarks
- T034 (Semantic HTML landmarks)
- T035 (Heading hierarchy)

**Developer 2**: ARIA & Navigation
- T036 (ARIA labels to nav)
- T037 (Menu accessibility)

**Developer 3**: Images & Alt Text
- T038 (Descriptive alt text)
- T039 (Image accessibility)

**Developer 4**: Focus & Testing
- T040 (Focus light mode)
- T041 (Focus dark mode)
- T042 (Reduced-motion)
- T043 (Keyboard navigation)

**Developer 5**: Screen Reader & Audits
- T044 (Screen reader testing)
- T045 (Lighthouse audit)
- T046 (axe DevTools)
- T047 (Color usage)

---

## Testing Summary per User Story

### User Story 1 Testing (Design Review)
- [ ] All HIG Foundations sections reviewed and documented
- [ ] Spacing verified to 8px base unit conformance
- [ ] Color contrast verified in both light and dark modes
- [ ] Typography hierarchy visually distinct
- [ ] Dark mode rendering verified without layout breaks

### User Story 2 Testing (Navigation)
- [ ] Active page indicator visible and functional
- [ ] Navigation affordances clear in both light and dark
- [ ] Information architecture clear and intuitive
- [ ] Mobile touch targets ≥ 44×44px
- [ ] Reduced-motion respected for animations

### User Story 3 Testing (Dark Mode)
- [ ] All pages render correctly in dark mode
- [ ] Text contrast maintained ≥ 4.5:1 in dark
- [ ] Images visible without color degradation
- [ ] Interactive elements visually distinct in dark
- [ ] Tested on macOS, iOS, Android, and browser DevTools

### User Story 4 Testing (Accessibility)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible in both modes
- [ ] Heading hierarchy semantic and proper
- [ ] All images have descriptive alt text
- [ ] Screen reader announces all content correctly
- [ ] Lighthouse Accessibility = 100
- [ ] axe DevTools scan passes with no issues

### User Story 5 Testing (Typography)
- [ ] IBM Plex Sans is sole font loaded
- [ ] Body text ≥ 16px
- [ ] Line height ≥ 1.5 for body text
- [ ] Heading hierarchy sizes clear and distinct
- [ ] Text readable at 200% zoom
- [ ] Text scales with system font size preferences
- [ ] Text readable on mobile (320px width)

### User Story 6 Testing (Inclusion)
- [ ] Copy uses inclusive language
- [ ] Design accommodates diverse input methods
- [ ] Imagery (if any) doesn't perpetuate stereotypes
- [ ] Diverse ability support tested (color blindness, low vision, dexterity)

### Final Testing (Phase 9)
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] FCP < 1.5s on 3G
- [ ] Build succeeds with no warnings
- [ ] Production build works correctly
- [ ] CSP compliance maintained
- [ ] All external links have rel="noopener noreferrer"

---

## Success Criteria

### Measurable Outcomes (from spec.md)

- **SC-001**: 100% of HIG Foundations sections reviewed and compliance documented ✓ (T013-T019)
- **SC-002**: All text elements achieve WCAG contrast (4.5:1 normal, 3:1 large) in light and dark ✓ (T014, T031)
- **SC-003**: 100% of interactive elements keyboard accessible ✓ (T043)
- **SC-004**: All page headings use semantic hierarchy (h1, h2, h3) with no skips ✓ (T035)
- **SC-005**: 100% of images have descriptive alt text ✓ (T038-T039)
- **SC-006**: Lighthouse Accessibility = 100 ✓ (T045)
- **SC-007**: Dark mode support fully functional ✓ (T026-T033)
- **SC-008**: Animations respect prefers-reduced-motion ✓ (T025, T042)
- **SC-009**: 100% of pages maintain usable layout on 320px-2560px widths ✓ (T055)
- **SC-010**: Body text ≥ 16px ✓ (T050)
- **SC-011**: Line height ≥ 1.5x for body text ✓ (T051)
- **SC-012**: IBM Plex Sans is sole font loaded ✓ (T048-T049)
- **SC-013**: No third-party JavaScript without review ✓ (T065)
- **SC-014**: HIG review findings documented with references ✓ (T019, T072)
- **SC-015**: Focus indicators ≥ 3:1 contrast ✓ (T040-T041)
- **SC-016**: Skip links/nav available to bypass repetitive content ✓ (T043)

---

## Implementation Notes

### Estimated Effort

- **Total Tasks**: 80 tasks (76 original + 4 added during analysis: T004a, T012a, T069a, T073a)
- **Estimated Duration**: 3-5 development days (assuming 1 developer)
- **Parallelization Potential**: Can reduce to 2-3 days with 2-3 developers working on parallel tasks
- **Critical Path**: Phase 1 → Phase 2 (Baseline Audit) → Phase 3 (CSS) → Phases 4-8 (Implementation) → Phase 9 (Polish)

### Risk Mitigation

1. **Dark Mode Complexity**: Test early and often on real devices; don't rely solely on DevTools emulation
2. **Accessibility Testing**: Include manual keyboard/screen reader testing; automated tools miss some issues
3. **Performance**: Monitor Lighthouse Performance score after CSS changes; large CSS variables may impact bundle size
4. **Deployment**: Test production build locally before pushing to GitHub Pages; static export has different constraints than dev server
5. **Breaking Changes**: All changes should be backward-compatible; no existing functionality should break

### Review Checkpoints

- After Phase 2: Verify design review complete and documented
- After Phase 3: Verify CSS variables working in both light and dark modes
- After Phase 6: Run Lighthouse audit and verify Accessibility = 100
- After Phase 9: Final full-site testing before merge to main

---

## Next Steps

1. ✓ Tasks generated (this document) with audit-first ordering
2. Review tasks.md and assign to team members
3. Begin Phase 1 (Setup) - should complete in 1 task
4. Begin Phase 2 (Baseline Design Audit) - critical first step, 7 tasks
   - Audit identifies specific HIG compliance gaps
   - Document findings to inform Phase 3 CSS changes
5. Begin Phase 3 (Foundational CSS) - implement CSS based on Phase 2 findings, 8 tasks
6. Parallelize Phases 4-8 based on team size (5 user stories, 53 tasks)
7. Complete Phase 9 (Polish) with full testing
8. Merge PR to main and deploy to production

**Target Completion**: 3-5 development days depending on team size and parallel work capability.

**Key Change**: Audit-first approach ensures CSS changes are targeted and justified by specific findings.

---

**Generated**: 2026-02-11 | **Command**: `/speckit.tasks` | **Status**: Ready for Implementation