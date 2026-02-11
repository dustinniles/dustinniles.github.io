# Implementation Plan: Fix Landing Page Nav Alignment and Add Full Site Navigation

**Branch**: `002-frontend-iteration` | **Date**: 2026-02-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-frontend-iteration/spec.md`

## Summary

Implement centered navigation alignment on the landing page and build out the full two-level navigation hierarchy (Work → Resume/Photography/Video; Play → Cycling/Tech/Volunteering; Contact; About). US1 and US2 (alignment and top-level routing) are already implemented and verified. US3 and US4 (Work and Play sub-pages) require: (1) updating section pages to display sub-navigation links, (2) adding parent-section back-navigation to each sub-page, and (3) resolving the URL structure discrepancy between the spec assumption (nested paths) and the current implementation (flat paths).

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Next.js 16.1.6 (App Router, static export), React 19.2.3, Tailwind CSS 4.x via PostCSS, IBM Plex Sans via @fontsource
**Storage**: N/A — static file-based data in `app/data/` (navigation.ts, photos.ts, etc.)
**Testing**: N/A — no tests requested in spec
**Target Platform**: Static site exported to GitHub Pages
**Project Type**: Web (Next.js static export, single project)
**Performance Goals**: Lighthouse Performance ≥ 90, FCP < 1.5s on 3G (per constitution)
**Constraints**: Static export only (`output: 'export'`), no server-side rendering, no API routes
**Scale/Scope**: Personal portfolio — 10 pages total (1 landing + 4 top-level + 6 sub-pages)

## Constitution Check

*GATE: Must pass before implementation. Re-check after design changes.*

### Principle I — Apple HIG Compliance

- [x] Navigation hierarchy (2 levels: section → sub-section) aligns with HIG Components: Navigation and Search
- [x] Back-navigation patterns will clearly communicate the user's location in the hierarchy (HIG-004)
- [x] Interactive elements (sub-nav links) will have clear affordances per HIG Patterns: Feedback
- [x] All page layouts maintain sparse, minimal aesthetic per HIG Foundations: Layout

### Principle III — Static-First Architecture

- [x] All new routes (`/work/resume` or flat equivalents) are statically pre-renderable via Next.js App Router
- [x] No server components requiring runtime; all pages are static
- [x] Navigation data sourced from `app/data/navigation.ts` — no API or server-side fetching

### Principle V — Content-Centric Development

- [x] Navigation structure reflects content hierarchy 1:1 per constitution requirement
- [x] No premature abstractions — sub-section navigation will reuse existing component patterns
- [x] New components only if a sub-nav link list pattern is reused across both Work and Play (2+ uses → justified)

### Design Review Against Apple HIG *(for UI/visual/layout features)*

**Before proceeding with implementation:**

- [x] Feature design reviewed against HIG Components: Navigation and Search — two-level hierarchy is a standard HIG pattern
- [ ] Color contrast verified per HIG Color and Accessibility guidelines (4.5:1 for normal text, 3:1 for large text)
- [x] Spatial design aligns with HIG Layout principles — sub-nav links will use consistent margins and spacing
- [x] Navigation patterns follow HIG Components: Navigation and Search — section → sub-section with back-navigation
- [x] Interactive elements have proper affordances per HIG Patterns: Feedback — hover/focus states inherited from existing link styles
- [ ] Dark mode support verified — CSS custom properties already in use; verify sub-nav uses `var(--foreground)` and `var(--text-secondary)` tokens
- [ ] Reduced-motion — no animations planned; confirm no transition is added without `prefers-reduced-motion` guard
- [x] Typography hierarchy maintains WCAG 2.1 Level AA compliance — existing light-weight type scale reused

## URL Routing Strategy Decision

**Current state**: All 6 sub-pages exist at **flat paths** (`/resume`, `/photography`, `/video`, `/cycling`, `/tech`, `/volunteering`). The `app/data/navigation.ts` targets are also flat (e.g., `target: '/resume'`).

**Spec assumption (FR-010–FR-016)**: Sub-page URLs follow a nested convention (`/work/resume`, `/play/cycling`, etc.).

**Decision**: **Keep flat paths.** Do not move or rename the existing page directories.

**Rationale**:

- All 6 sub-page files already exist and are correctly routed. Moving them to nested directories would require restructuring the App Router tree (`app/work/resume/page.tsx`), updating `navigation.ts` targets, and re-verifying all internal links — significant scope increase with no user-visible benefit.
- Flat paths are clean, bookmarkable, and unambiguous (e.g., `/resume` is clearer than `/work/resume` for a personal portfolio).
- The navigation hierarchy (Work → Resume/Photography/Video) is already expressed in `navigation.ts` through `parentId` relationships — the URL does not need to mirror this hierarchy to be navigable.
- The spec assumption was made without knowledge of the existing implementation. Since the spec is technology-agnostic and the success criteria are about navigability (not URL format), flat paths satisfy all functional requirements (FR-010–FR-016) and success criteria (SC-005–SC-007).

**Spec assumption to update**: The Assumptions section of `spec.md` states "Sub-page URLs follow a nested path convention." This should be revised to reflect flat paths. *(Note: spec assumption update is a documentation-only change, not a code change.)*

## Project Structure

### Documentation (this feature)

```text
specs/002-frontend-iteration/
├── plan.md              # This file
├── research.md          # Phase 0 output (complete)
├── spec.md              # Feature specification (updated with US3, US4)
├── tasks.md             # Phase 2 output (needs update for US3, US4)
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
app/
├── page.tsx               # Landing page (✓ complete)
├── layout.tsx             # Root layout with SiteLayout
├── globals.css
├── data/
│   └── navigation.ts      # Two-level nav data — flat targets (✓ complete)
├── work/
│   └── page.tsx           # Work section page — needs sub-nav links (US3)
├── play/
│   └── page.tsx           # Play section page — needs sub-nav links (US4)
├── contact/
│   └── page.tsx           # Contact page (✓ complete)
├── about/
│   └── page.tsx           # About page (✓ complete)
├── resume/
│   └── page.tsx           # Work sub-page — needs back-nav to /work (US3)
├── photography/
│   └── page.tsx           # Work sub-page — needs back-nav to /work (US3)
├── video/
│   └── page.tsx           # Work sub-page — needs back-nav to /work (US3)
├── cycling/
│   └── page.tsx           # Play sub-page — needs back-nav to /play (US4)
├── tech/
│   └── page.tsx           # Play sub-page — needs back-nav to /play (US4)
└── volunteering/
    └── page.tsx           # Play sub-page — needs back-nav to /play (US4)

components/
├── SiteLayout.tsx          # isExpanded state (✓ complete — US2)
└── MenuSlider.tsx          # Nav links, profile name link (✓ complete — US1, US2)
```

**Structure Decision**: Single Next.js project using App Router with flat sub-page routes. No monorepo or multi-project structure needed.

## Complexity Tracking

No constitution violations. All changes are additive to existing pages and follow established patterns.

## Phase 0: Research Summary

*(See `research.md` for full details — covers US1 and US2. No new NEEDS CLARIFICATION items for US3/US4.)*

**New finding for US3/US4**: All 6 sub-pages already exist with placeholder content. Work and Play section pages exist but lack sub-navigation links. Sub-pages have no explicit back-navigation to their parent section (back to `/work` or `/play`). The sidebar's profile name link (from US2) provides back-navigation to the landing page — satisfying FR-018 for all sub-pages without changes.

**FR-017 gap** (sub-pages → parent section): No current mechanism navigates from `/resume` back to `/work`. This must be added to each sub-page.

**FR-009 / FR-013 gap** (section pages → sub-pages): `app/work/page.tsx` and `app/play/page.tsx` contain only a title and description. Sub-section links must be added.

## Phase 1: Design — Sub-page Navigation

### Sub-navigation Component

A sub-nav list will appear on Work and Play section pages. Since the pattern is identical for both sections (a list of 3 child links), a single reusable component is justified (used 2+ times → meets constitution threshold).

**Component**: `components/SubNav.tsx`

- Props: `items: { label: string; href: string }[]`
- Renders a vertical list of links using existing link styles (font-light, `var(--text-secondary)`, hover state)
- No new design tokens; inherits existing CSS custom properties

### Parent-section Back-navigation

Each Work sub-page (`/resume`, `/photography`, `/video`) needs a link back to `/work`.
Each Play sub-page (`/cycling`, `/tech`, `/volunteering`) needs a link back to `/play`.

**Approach**: Inline back-link at the top of each page, above the `<h1>`. Pattern: `← Work` / `← Play`. Uses existing text-secondary color and light font weight. Consistent with minimal aesthetic.

**Alternative rejected**: Adding breadcrumb to sidebar — rejected; sidebar is shared global chrome; injecting per-page context into it requires prop drilling or context, over-engineering for this use case. Inline back-link on each page is simpler and more discoverable.

### Work Section Page Update

`app/work/page.tsx`: Add `<SubNav>` below the description with links to `/resume`, `/photography`, `/video` (labels: Resume, Photography, Video).

### Play Section Page Update

`app/play/page.tsx`: Add `<SubNav>` below the description with links to `/cycling`, `/tech`, `/volunteering` (labels: Cycling, Tech, Volunteering).

### Sub-page Back-navigation

Each of the 6 sub-pages gets an inline back-link above the `<h1>`:

- Resume, Photography, Video → `← Work` linking to `/work`
- Cycling, Tech, Volunteering → `← Play` linking to `/play`

The link to the landing page is already handled by the sidebar's "Dustin Niles" profile name link (FR-018 already satisfied via US2 completion).

## Implementation Summary

| Status | Requirement | Change |
| ------ | ----------- | ------ |
| ✓ Done | FR-001: Nav links centered on landing | `MenuSlider.tsx` (US1) |
| ✓ Done | FR-002–FR-008: Top-level routing + back to home | `SiteLayout.tsx`, `MenuSlider.tsx` (US2) |
| Needed | FR-009: Work page shows sub-nav links | Update `app/work/page.tsx` |
| Needed | FR-010–FR-012: Work sub-pages accessible from Work page | Update `app/work/page.tsx` |
| Needed | FR-013: Play page shows sub-nav links | Update `app/play/page.tsx` |
| Needed | FR-014–FR-016: Play sub-pages accessible from Play page | Update `app/play/page.tsx` |
| Needed | FR-017: Sub-pages → parent section back-nav | Add back-link to each of 6 sub-pages |
| ✓ Done | FR-018: Sub-pages → landing page back-nav | Sidebar profile name link (US2) |

**New files to create**: `components/SubNav.tsx`
**Files to modify**: `app/work/page.tsx`, `app/play/page.tsx`, and all 6 sub-pages
