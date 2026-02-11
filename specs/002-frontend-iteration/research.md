# Research: Fix Landing Page Nav Alignment and Navigation Links

**Branch**: `002-frontend-iteration` | **Date**: 2026-02-11

---

## Summary

No NEEDS CLARIFICATION items were raised in the spec. The tech stack is fully defined in the constitution. This research phase documents root cause analysis from codebase inspection.

---

## Root Cause Analysis

### Issue 1: Nav Links Left-Justified on Landing Page

**Decision**: Add `justify-center` conditionally to link className in `components/MenuSlider.tsx` when `!isExpanded`.

**Rationale**: The `MenuSlider` in collapsed state (`isExpanded = false`) covers the full viewport (`width: 100vw`) and shows the profile photo, name, and navigation links. The `<nav>` wrapping the link list uses `flex flex-col items-center`, which centers the `<ul>` container (fixed `w-48` = 12rem). However, each `<Link>` uses `flex items-center` (vertical centering only) without `justify-center` (horizontal centering within the flex container). The text therefore starts from the left edge of the `w-48` container, appearing left-justified even though the container itself is horizontally centered.

**Specific locations**:
- `components/MenuSlider.tsx` line ~122: parent item link (items with children, e.g., Work, Play)
- `components/MenuSlider.tsx` line ~160: leaf item link (items without children, e.g., Contact, About)

**Fix**: Conditionally append `justify-center` to the flex class string when `!isExpanded`.

**Alternatives considered**:
- Remove `w-48` from `<ul>` and let items be auto-width → rejected; items would have inconsistent widths and centering behavior would change in expanded sidebar mode
- Use `text-center` on links → rejected; does not affect flex container alignment and would conflict with expanded sidebar's left-aligned appearance

---

### Issue 2: Navigation Links Don't Work on Direct URL Access / Page Refresh

**Decision**: Initialize `isExpanded` in `components/SiteLayout.tsx` using `usePathname()` — default to `true` for any path other than `/`.

**Rationale**: `SiteLayout.tsx` initializes `const [isExpanded, setIsExpanded] = useState(false)` unconditionally. When `isExpanded = false`, the `MenuSlider` renders at `width: 100vw` with `z-index: 50`, completely covering the `<main>` content area behind it. This works correctly for client-side navigation from `/` (the onClick handler always calls `setIsExpanded(true)` before navigation), but breaks when:
- The user refreshes while on `/work`, `/play`, `/contact`, or `/about`
- The user types a URL directly into the browser
- The page is first loaded from a deployed static URL like `dustinniles.github.io/work`

In all these cases, the React state initializes fresh with `isExpanded = false`, the full-screen menu covers everything, and the actual page content is invisible.

**Fix**: Use `useState(() => pathname !== '/')` where `pathname` comes from `usePathname()`. This causes the component to mount in expanded (sidebar) mode for any route other than the root.

**Hydration note**: Using `useState` with a function initializer (lazy initialization) ensures the value is computed exactly once on mount on the client — safe for Next.js static export with client components.

**Alternatives considered**:
- `useEffect` to set `isExpanded = true` on mount when `pathname !== '/'` → rejected; causes a flash of the full-screen menu before switching to sidebar mode (visible layout shift)
- Separate non-overlay menu component for subpages → rejected; over-engineering; the existing conditional logic in MenuSlider already supports both modes

---

### Issue 3: No Explicit Path Back to Landing Page from Subpages

**Decision**: Wrap the profile name heading in the expanded sidebar with a `<Link href="/">` that also calls `setIsExpanded(false)`.

**Rationale**: FR-008 requires all mock pages to provide a navigational path back to the landing page. When on any subpage with the sidebar expanded, there is currently no interactive element that navigates to `/` and resets the full-screen landing view. The profile name `<h1>Dustin Niles</h1>` in the expanded sidebar is the natural "home" affordance (equivalent to a logo link in standard web patterns). Making it a link to `/` that resets `isExpanded = false` satisfies FR-008 with minimal change.

**Scope note**: This change applies only to the expanded sidebar state (`isExpanded = true`) — the collapsed landing state already shows the home content.

**Alternatives considered**:
- Add a separate "← Home" button to mock pages → rejected; creates duplicate navigation and inconsistency with site's minimal aesthetic
- Leave as-is and rely on the browser back button → rejected; not a discoverable in-site affordance, fails FR-008

---

### Existing Mock Pages Status

**Decision**: No changes needed to Work, Play, About, or Contact pages.

**Rationale**: Inspection of existing pages shows all four pages are already implemented with adequate mock content:
- `app/work/page.tsx` — Title "Work" + descriptive placeholder text ✓
- `app/play/page.tsx` — Title "Play" + descriptive placeholder text ✓
- `app/about/page.tsx` — Title "About" + structured placeholder sections ✓
- `app/contact/page.tsx` — Title "Get in Touch" + placeholder email link ✓

All satisfy FR-007 (page title) and are accessible via correct routes in `app/data/navigation.ts`.

---

## Files Modified

| File | Change | Reason |
|------|--------|--------|
| `components/MenuSlider.tsx` | Add `justify-center` to link classes in collapsed state; wrap expanded profile name in `<Link href="/">` | Fix alignment (Issue 1) + back navigation (Issue 3) |
| `components/SiteLayout.tsx` | Initialize `isExpanded` from `pathname !== '/'` | Fix broken navigation on direct URL access (Issue 2) |

## Files NOT Modified

| File | Reason |
|------|--------|
| `app/work/page.tsx` | Already has adequate mock content |
| `app/play/page.tsx` | Already has adequate mock content |
| `app/about/page.tsx` | Already has adequate mock content |
| `app/contact/page.tsx` | Already has adequate mock content |
| `app/data/navigation.ts` | All four nav items already correctly configured |
