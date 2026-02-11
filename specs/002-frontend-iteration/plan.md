# Implementation Plan: Fix Landing Page Nav Alignment and Add Full Site Navigation

**Branch**: `002-frontend-iteration` | **Date**: 2026-02-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-frontend-iteration/spec.md`

## Summary

Implement centered navigation alignment on the landing page and build out the full two-level navigation hierarchy (Work → Resume/Photography/Video; Play → Cycling/Tech/Volunteering; Contact; About). US1 and US2 (alignment and top-level routing) are already implemented and verified. US3 and US4 (Work and Play sub-pages) require: (1) making the sidebar context-aware so it auto-expands and displays sub-navigation when the user is on a section page or sub-page, (2) removing any inline navigation added in prior implementation from the main content area, and (3) resolving the URL structure discrepancy between the spec assumption (nested paths) and the current implementation (flat paths).

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Next.js 16.1.6 (App Router, static export), React 19.2.3, Tailwind CSS 4.x via PostCSS, IBM Plex Sans via @fontsource
**Storage**: N/A — static file-based data in `app/data/` (navigation.ts, photos.ts, etc.)
**Testing**: N/A — no tests requested in spec
**Target Platform**: Static site exported to GitHub Pages
**Project Type**: Web (Next.js static export, single project)
**Performance Goals**: Lighthouse Performance ≥ 90, FCP < 1.5s on 3G (per constitution)
**Constraints**: Static export only (`output: 'export'`), no server-side rendering, no API routes
**Known architectural gap**: Constitution Principle VII requires strict CSP headers in production, but GitHub Pages does not support custom HTTP response headers. A `<meta http-equiv="Content-Security-Policy">` tag could partially satisfy the intent (covers script/style injection) but cannot set `frame-ancestors` or other fetch-directive-only policies. Addressing this fully would require a CDN or proxy layer (e.g., Cloudflare) — out of scope for this feature. This gap is pre-existing and not introduced by this change.
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
- [ ] Color contrast verified per HIG Color and Accessibility guidelines (4.5:1 for normal text, 3:1 for large text) *(deferred to post-implementation — verified via T032)*
- [x] Spatial design aligns with HIG Layout principles — sub-nav links will use consistent margins and spacing
- [x] Navigation patterns follow HIG Components: Navigation and Search — section → sub-section with back-navigation
- [x] Interactive elements have proper affordances per HIG Patterns: Feedback — hover/focus states inherited from existing link styles
- [ ] Dark mode support verified — CSS custom properties already in use; verify sub-nav uses `var(--foreground)` and `var(--text-secondary)` tokens *(deferred to post-implementation — verified via T034)*
- [ ] Reduced-motion — no animations planned; confirm no transition is added without `prefers-reduced-motion` guard *(deferred to post-implementation — verified via T035)*
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

**New finding for US3/US4 (revised)**: All 6 sub-pages already exist with placeholder content. The sidebar (`MenuSlider.tsx`) already renders an inline sub-menu for parent items (via `expandedParent` state), but `expandedParent` is initialized as `null` on every render — it is never derived from the current pathname. This means arriving at `/resume` by direct URL or page refresh shows no sub-navigation in the sidebar and no path back to `/work`.

A prior implementation (now to be removed) added a `SubNav.tsx` component rendered inside `app/work/page.tsx` and `app/play/page.tsx`, and added inline `← Work` / `← Play` back-links inside each sub-page's main content. Per the revised spec, all navigation must live in the sidebar only.

**FR-017 gap** (sub-pages → parent section): The sidebar must auto-expand the correct parent and display its children when the user is on a sub-page, providing navigation back to the parent section page (`/work` or `/play`).

**FR-009 / FR-013 gap** (section pages → sub-pages): The sidebar must auto-expand the Work or Play sub-menu when the user is on `/work` or `/play`, displaying the sub-section links. The `app/work/page.tsx` and `app/play/page.tsx` main content areas contain only a title and description — no sub-nav should appear there.

## Phase 1: Design — Sub-page Navigation

### Approach: Context-aware Sidebar

All sub-navigation (section → sub-pages) and back-navigation (sub-page → parent section) lives in the sidebar exclusively. The main content area of section pages and sub-pages contains only a title and placeholder description — no navigation links.

**Mechanism**: `MenuSlider.tsx` already renders an inline sub-menu for each parent nav item when `expandedParent === item.id`. The change required is to derive `expandedParent` from the current pathname rather than relying solely on click state.

**Implementation in `MenuSlider.tsx`**:

1. Add a `useEffect` that watches `pathname` and sets `expandedParent` to the `id` of the parent nav item whose `target` or any `children[].target` matches the current pathname. This ensures the sub-menu auto-expands on direct URL access, page refresh, and programmatic navigation.
2. The existing submenu rendering (`expandedParent === item.id`) handles display; clicking the parent item still toggles collapse as before.
3. No new sidebar component is needed — the existing `<ul id="submenu-${item.id}">` pattern already renders child links with correct styles and `aria-current`.

**FR-017 (sub-page → parent section)**: Satisfied automatically — when on `/resume`, the Work sub-menu is expanded in the sidebar, and the `Work` parent link (`item.target = '/work'`) is visible above the children list, serving as the path back.

**Alternative explicitly rejected**: Inline back-links in the main content area (`← Work` / `← Play` above the `<h1>`) — violates the design principle that navigation lives in the sidebar, clutters the content area, and is redundant once the sidebar shows the correct context.

**Alternative explicitly rejected**: `components/SubNav.tsx` rendered inside section page content — same issue; navigation belongs in the sidebar, not in `app/work/page.tsx` or `app/play/page.tsx`.

### Cleanup: Remove Prior Content-Area Navigation

Prior implementation (T008–T017) added:

- `components/SubNav.tsx` — to be deleted (not rendered anywhere after this change)
- `<SubNav>` in `app/work/page.tsx` — to be removed
- `<SubNav>` in `app/play/page.tsx` — to be removed
- Inline `← Work` back-links in `app/resume/page.tsx`, `app/photography/page.tsx`, `app/video/page.tsx` — to be removed
- Inline `← Play` back-links in `app/cycling/page.tsx`, `app/tech/page.tsx`, `app/volunteering/page.tsx` — to be removed

### Work and Play Section Pages

`app/work/page.tsx` and `app/play/page.tsx`: Remove `<SubNav>` import and usage. Retain only the page title and placeholder description. The sidebar handles all sub-section navigation.

### Sub-pages

Each of the 6 sub-pages: Remove the inline back-link above the `<h1>`. Retain only the page title and placeholder description. The sidebar handles back-navigation to the parent section.

## Implementation Summary

| Status | Requirement | Change |
| ------ | ----------- | ------ |
| ✓ Done | FR-001: Nav links centered on landing | `MenuSlider.tsx` (US1) |
| ✓ Done | FR-002–FR-008: Top-level routing + back to home | `SiteLayout.tsx`, `MenuSlider.tsx` (US2) |
| Needed | FR-009: Sidebar shows Work sub-nav when on /work or Work sub-pages | `components/MenuSlider.tsx` — auto-derive `expandedParent` from pathname |
| Needed | FR-010–FR-012: Work sub-pages accessible from sidebar | `components/MenuSlider.tsx` (same change as FR-009) |
| Needed | FR-013: Sidebar shows Play sub-nav when on /play or Play sub-pages | `components/MenuSlider.tsx` (same change as FR-009) |
| Needed | FR-014–FR-016: Play sub-pages accessible from sidebar | `components/MenuSlider.tsx` (same change as FR-009) |
| Needed | FR-017: Sub-pages → parent section back-nav via sidebar | `components/MenuSlider.tsx` (same change — parent link visible when sub-menu expanded) |
| ✓ Done | FR-018: Sub-pages → landing page back-nav | Sidebar profile name link (US2) |
| Needed | Cleanup: Remove content-area nav from prior implementation | `app/work/page.tsx`, `app/play/page.tsx`, 6 sub-pages, delete `components/SubNav.tsx` |

**New files to create**: None
**Files to modify**: `components/MenuSlider.tsx`
**Files to clean up**: `app/work/page.tsx`, `app/play/page.tsx`, `app/resume/page.tsx`, `app/photography/page.tsx`, `app/video/page.tsx`, `app/cycling/page.tsx`, `app/tech/page.tsx`, `app/volunteering/page.tsx`
**Files to delete**: `components/SubNav.tsx`
