# Implementation Plan: Fix Landing Page Nav Alignment and Navigation Links

**Branch**: `002-frontend-iteration` | **Date**: 2026-02-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-frontend-iteration/spec.md`

## Summary

Fix two UI bugs in the portfolio site's `MenuSlider` navigation component:

1. Center-align the navigation link text (Work, Play, Contact, About) in the full-screen landing view
2. Ensure subpages are immediately visible when accessed directly (URL/refresh), not blocked by the full-screen menu overlay

All four mock subpages (Work, Play, Contact, About) already exist with adequate placeholder content — no page creation required. The only code changes are two surgical modifications to `MenuSlider.tsx` and one to `SiteLayout.tsx`.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Next.js 16.1.6 (App Router, static export), React 19.2.3, Tailwind CSS 4.x via PostCSS
**Storage**: N/A (static site, no data persistence)
**Testing**: ESLint (`npm run lint`), TypeScript compiler (`npm run build`)
**Target Platform**: Web — static export to GitHub Pages
**Project Type**: Web application (Next.js with App Router)
**Performance Goals**: FCP < 1.5s on 3G (constitution requirement); changes are CSS-class additions only — no performance impact
**Constraints**: Static export (`output: 'export'`); no SSR; no external scripts; all routes pre-rendered
**Scale/Scope**: Personal portfolio site, ~10 pages, ~5 user-facing content routes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Design Review Against Apple HIG *(for UI/visual/layout features)*

**Before proceeding with implementation:**

- [x] Feature design reviewed against relevant HIG sections (Foundations: Layout, Components: Navigation and Search)
- [x] Color contrast verified — no color changes; existing CSS variables already meet 4.5:1 / 3:1 thresholds per constitution
- [x] Spatial design aligns with HIG Layout principles — centering nav links under the profile photo satisfies HIG's alignment consistency requirement
- [x] Navigation patterns follow HIG Components: Navigation and Search — sidebar nav pattern is preserved; landing → subpage flow matches standard hierarchical navigation
- [x] Interactive elements have proper affordances — no changes to hover/focus states; existing states preserved
- [x] Dark mode support maintained — changes are Tailwind class additions; CSS variables already handle dark mode
- [x] Reduced-motion support maintained — no new animations added; existing `useReducedMotion` hook unchanged
- [x] Typography hierarchy unchanged — no font, size, or weight changes

**Constitution compliance:**

- Principle I (HIG): Alignment fix brings layout into closer conformance with HIG spatial principles ✓
- Principle II (Minimal Design): Changes are minimal class additions; aesthetic unchanged ✓
- Principle III (Static-First): No new dynamic features; state initialization uses existing client component pattern ✓
- Principle IV (Accessibility): No regression — focus/hover affordances unchanged ✓
- Principle V (Content-Centric): No new abstractions or components added ✓

**No violations. No complexity tracking required.**

## Project Structure

### Documentation (this feature)

```text
specs/002-frontend-iteration/
├── plan.md              # This file
├── research.md          # Root cause analysis and fix rationale
├── quickstart.md        # Dev setup and test steps
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

No data-model.md or contracts/ — this feature has no data entities or API endpoints.

### Source Code (repository root)

```text
components/
├── MenuSlider.tsx        # MODIFY: justify-center in collapsed state; home link on name
└── SiteLayout.tsx        # MODIFY: initialize isExpanded from pathname

app/
├── work/page.tsx         # NO CHANGE — existing mock page is adequate
├── play/page.tsx         # NO CHANGE — existing mock page is adequate
├── about/page.tsx        # NO CHANGE — existing mock page is adequate
└── contact/page.tsx      # NO CHANGE — existing mock page is adequate
```

**Structure Decision**: Web application (frontend-only). No backend changes. All modifications are in existing `components/` files.

## Phase 0: Research

**Status: Complete.** See [research.md](./research.md) for full root cause analysis.

**Findings summary:**
- No NEEDS CLARIFICATION items in spec
- Three root causes identified (alignment, navigation state initialization, back-navigation)
- All four mock pages already exist — no new pages to create
- Fixes are surgical changes to 2 files (3 distinct edit points)

## Phase 1: Design

### Fix A — Nav Link Alignment in Collapsed Landing State

**File**: `components/MenuSlider.tsx`

**Root cause**: Link elements use `flex items-center` (vertical centering) but not `justify-center` (horizontal centering) within the fixed-width `w-48` `<ul>` container. The container is horizontally centered by the parent nav's `flex flex-col items-center`, but text within each link starts from the container's left edge.

**Change**: Add `justify-center` to the link className, conditionally on `!isExpanded`. This applies to both parent items (Work, Play — which have children) and leaf items (Contact, About — no children).

**Before** (parent item link, abbreviated):
```tsx
className={`... flex items-center ${active ? '...' : '...'}`}
```

**After** (parent item link):
```tsx
className={`... flex items-center ${!isExpanded ? 'justify-center' : ''} ${active ? '...' : '...'}`}
```

Same pattern applied to the leaf item link (~line 160).

---

### Fix B — Navigation State Initialization

**File**: `components/SiteLayout.tsx`

**Root cause**: `isExpanded` initializes to `false` unconditionally. When `isExpanded = false`, `MenuSlider` renders at `width: 100vw` with `z-index: 50`, covering the `<main>` content area. This breaks for direct URL access or page refresh to any subpage.

**Change**: Import `usePathname` from `next/navigation` and use a lazy initializer so `isExpanded` starts as `true` for any non-root pathname.

**Before**:
```tsx
const [isExpanded, setIsExpanded] = useState(false);
```

**After**:
```tsx
const pathname = usePathname();
const [isExpanded, setIsExpanded] = useState(() => pathname !== '/');
```

**Hydration safety**: Lazy `useState` initializer runs exactly once on client mount — safe for static export.

---

### Fix C — Back Navigation to Landing Page

**File**: `components/MenuSlider.tsx`

**Root cause**: In the expanded sidebar state, the profile name heading has no interactive target. No affordance exists for returning to `/` and the full-screen landing state.

**Change**: In the expanded sidebar state only, wrap the name in a `<Link href="/">` that calls `setIsExpanded(false)`.

**Before** (name heading):
```tsx
<h1 className={`font-light tracking-wide text-[var(--foreground)] ${isExpanded ? 'text-xl' : 'text-3xl'}`}>
  Dustin Niles
</h1>
```

**After** (conditional on state):
```tsx
{isExpanded ? (
  <Link
    href="/"
    onClick={() => setIsExpanded(false)}
    className="font-light tracking-wide text-[var(--foreground)] text-xl hover:text-[var(--text-secondary)] transition-colors"
  >
    Dustin Niles
  </Link>
) : (
  <h1 className="font-light tracking-wide text-[var(--foreground)] text-3xl">
    Dustin Niles
  </h1>
)}
```

**Note**: Collapsed/landing state retains `<h1>` — the full-screen menu IS the home view, no link needed.

---

### Acceptance Criteria Mapping

| Requirement | Fix | Verification |
|-------------|-----|--------------|
| FR-001: Nav links centered under photo/name | Fix A | Visual inspection on desktop + mobile |
| FR-002: Each link navigates to destination | Fix B | Click each of 4 links from landing; confirm page loads |
| FR-003–006: Mock pages exist and load | No change needed | Direct URL access to /work /play /about /contact |
| FR-007: Each mock page has a title | No change needed | Inspect page h1 element |
| FR-008: Back navigation to landing | Fix C | Click name in sidebar; confirm returns to `/` landing state |

---

### HIG Post-Design Review

- **Spatial conformance**: Navigation links centered under profile photo — correct visual hierarchy per HIG Layout
- **Navigation affordance**: Profile name as home link is a discoverable, standard web pattern (equivalent to logo link)
- **Interaction states**: All hover/focus states preserved; `transition-colors` retained on new link element
- **Minimal design**: Three targeted edits; no new components, no new abstractions, no aesthetic change

## Quickstart

See [quickstart.md](./quickstart.md) for local dev setup and test steps.
