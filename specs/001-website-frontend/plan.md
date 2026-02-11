# Implementation Plan: Apply Apple HIG Amendments to Portfolio Website Frontend

**Branch**: `001-website-frontend` | **Date**: 2026-02-11 | **Spec**: [specs/001-website-frontend/spec.md](specs/001-website-frontend/spec.md)
**Input**: Feature specification from `/specs/001-website-frontend/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Conduct a comprehensive design review of the existing portfolio website against Apple's Human Interface Guidelines (HIG) Foundations and Components standards, document compliance gaps, and implement corrections to ensure full HIG alignment. The portfolio uses Next.js 14+ (static export), TypeScript, Tailwind CSS 4.x, and IBM Plex Sans. The review covers Layout, Color, Typography, Dark Mode, Accessibility (WCAG 2.1 Level AA), Inclusion, and Writing principles. Implementations include dark mode color palette design, accessibility audit and fixes, semantic HTML structure verification, keyboard navigation validation, and contrast ratio corrections.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.2.3 and Next.js 16.1.6 (App Router)  
**Primary Dependencies**: Next.js 16.1.6 (App Router, static export), React 19.2.3, Tailwind CSS 4.x (via PostCSS), IBM Plex Sans via @fontsource  
**Storage**: N/A (static export to GitHub Pages, no database or server-side storage)  
**Testing**: Lighthouse (automated), axe DevTools (automated accessibility), manual review (keyboard navigation, screen reader testing, visual inspection)  
**Target Platform**: Web (static HTML/CSS/JS exported for GitHub Pages)
**Project Type**: Single web application (static site, no API or backend)  
**Performance Goals**: FCP < 1.5s on 3G, Lighthouse Performance ≥ 90, Lighthouse Accessibility = 100  
**Constraints**: Static export only (no server-side rendering or APIs), GitHub Pages deployment, CSP-compliant with no unsafe-inline/unsafe-eval  
**Scale/Scope**: Personal portfolio (single fixed sidebar layout, multiple content pages, photography gallery)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Constitutional Compliance

This feature MUST comply with the Project Constitution (v1.4.0):

- [✓] **Principle I: Apple HIG Compliance** - This feature IS the HIG compliance review itself. All design decisions must follow HIG Foundations and Components.
- [✓] **Principle II: Minimal Design First** - Existing minimal aesthetic must be preserved while achieving HIG compliance; IBM Plex Sans typography exception applies.
- [✓] **Principle III: Static-First Architecture** - Feature must maintain `output: 'export'` for Next.js; no server-side rendering or APIs introduced.
- [✓] **Principle IV: Performance & Accessibility** - HIG compliance inherently improves accessibility; performance goals: FCP < 1.5s, Lighthouse Accessibility = 100.
- [✓] **Principle V: Content-Centric Development** - Design review and corrections serve content presentation; no unnecessary technical complexity.
- [✓] **Principle VI: Deployment Simplicity** - Feature uses standard GitHub Actions deployment, no manual steps required.
- [✓] **Principle VII: Security & Content Integrity** - Feature includes CSP verification, no third-party scripts introduced, link security attributes enforced.

**Gate Status**: ✓ PASS - Feature scope fully compliant with all core principles.

### Design Review Against Apple HIG *(for UI/visual/layout features)*

**Before proceeding with Phase 0 research:**

- [ ] Current design state audited: Layout spacing (8px units), Color contrast (4.5:1 normal, 3:1 large text)
- [ ] Typography baseline documented: font sizes (px vs. rem), line heights, hierarchy
- [ ] Existing dark mode support evaluated (CSS media query, color palette gaps identified)
- [ ] Navigation patterns reviewed against HIG Components: Navigation and Search
- [ ] Interactive elements evaluated for affordances per HIG Patterns: Feedback
- [ ] Accessibility gaps identified: keyboard navigation, screen reader compatibility, WCAG 2.1 AA
- [ ] Reduced-motion support assessed and planned
- [ ] Semantic HTML structure verified (heading hierarchy, landmarks, alt text)
- [ ] Security review: CSP headers, link attributes (noopener noreferrer), no unsafe-inline

## Project Structure

### Documentation (this feature)

```text
specs/001-website-frontend/
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0 output (HIG audit findings)
├── data-model.md        # Phase 1 output (design specifications)
├── quickstart.md        # Phase 1 output (implementation quick start)
├── contracts/           # Phase 1 output (not applicable for design-only feature)
└── tasks.md             # Phase 2 output (implementation tasks - created by /speckit.tasks)
```

### Source Code (repository root - existing Next.js static site)

```text
app/
├── layout.tsx           # Root layout with Sidebar component
├── page.tsx             # Home page (portfolio grid)
├── about/page.tsx       # About page (if exists)
└── globals.css          # Global styles, Tailwind imports, CSS variables

components/
├── Sidebar.tsx          # Fixed navigation sidebar (REVIEW: HIG Navigation patterns)
└── [other components]   # Photography gallery, etc.

public/
├── images/              # Portfolio images
└── fonts/               # @fontsource IBM Plex Sans files

.github/workflows/
└── deploy.yml           # GitHub Pages deployment workflow

styles/ or CSS modules/  # Tailwind CSS configuration and theme files
```

**Structure Decision**: Single web application (Next.js App Router with static export). All design changes happen within `/app`, `/components`, `/public/`, and `/styles/` directories. No new backend or API code introduced by this feature—changes are purely design/styling/semantic HTML and dark mode support via CSS variables and media queries.

## Phase 1: Design & Contracts Completion

**Status**: ✓ COMPLETE (2026-02-11)

### Artifacts Generated

| Artifact | Path | Purpose | Status |
|----------|------|---------|--------|
| research.md | specs/001-website-frontend/research.md | Phase 0 findings: typography baseline, color contrast, dark mode strategy | ✓ Complete |
| data-model.md | specs/001-website-frontend/data-model.md | Design specifications: typography scale, color system (light/dark), accessibility | ✓ Complete |
| quickstart.md | specs/001-website-frontend/quickstart.md | Implementation guide with code snippets, testing checklist | ✓ Complete |
| contracts/ | N/A | Not applicable for design-only feature | — |

### Constitution Check - Phase 1 Re-evaluation

**Gate Status**: ✓ PASS (same as Phase 0)

All Constitutional Principles remain compliant:

- [✓] **Principle I: Apple HIG Compliance** - Design model explicitly specifies HIG Foundations (Layout, Color, Typography, Dark Mode, Accessibility) and Components alignment
- [✓] **Principle II: Minimal Design First** - Dark mode palette and typography enhancements preserve minimal aesthetic; no unnecessary complexity introduced
- [✓] **Principle III: Static-First Architecture** - Design changes use CSS variables and prefers-color-scheme media query (no JavaScript required); `output: 'export'` maintained
- [✓] **Principle IV: Performance & Accessibility** - WCAG 2.1 Level AA compliance (4.5:1 contrast, keyboard navigation, ARIA labels, screen reader support) improves accessibility; no performance regression expected
- [✓] **Principle V: Content-Centric Development** - Design changes serve content presentation and user experience; no unnecessary technical complexity
- [✓] **Principle VI: Deployment Simplicity** - Feature uses standard GitHub Actions deployment; static export workflow unchanged
- [✓] **Principle VII: Security & Content Integrity** - No third-party scripts introduced; CSP and link security maintained; design review is non-destructive

**Post-Phase 1 Assessment**: All design decisions maintain constitutional alignment. Feature can proceed to Phase 2 (task generation and implementation) without risk of constitutional violations.

---

## Phase 2: Task Generation (Next)

**Command**: `/speckit.tasks`

This will generate tasks.md with:
1. Ordered, dependency-aware implementation tasks
2. File-by-file change specifications
3. Testing requirements per task
4. Acceptance criteria (based on data-model.md)

**Estimated Tasks**:
- Task 1: CSS variables and typography system (globals.css)
- Task 2: Color system with dark mode support (globals.css)
- Task 3: Component color updates (MenuSlider, SocialLinks, etc.)
- Task 4: ARIA labels and semantic HTML (MenuSlider, layout)
- Task 5: Image alt text and accessibility review
- Task 6: Testing and Lighthouse audit
- Task 7: Documentation and deployment

---

## Complexity Tracking

> **No Constitutional violations to track** ✓
> 
> This feature operates entirely within Constitutional bounds. All design decisions align with Principles I (HIG Compliance), II (Minimal Design), III (Static-First), and maintain all security requirements (Principle VII).

| Aspect | Status | Notes |
|--------|--------|-------|
| HIG Alignment | ✓ Compliant | Layout (8px units), Color (contrast verified), Typography (IBM Plex Sans), Accessibility (WCAG 2.1 AA) |
| Static Export | ✓ Maintained | CSS variables + media queries, no JavaScript required for dark mode |
| Performance | ✓ No Impact | CSS-based changes have zero impact on bundle size or runtime performance |
| Security | ✓ Verified | No third-party scripts, CSP maintained, HTTPS ready |
| Deployment | ✓ Simple | Standard GitHub Actions workflow, no manual steps required |
