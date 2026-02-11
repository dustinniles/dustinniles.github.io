# Tasks: Fix Landing Page Nav Alignment and Add Full Site Navigation

**Input**: Design documents from `/specs/002-frontend-iteration/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓

**Organization**: Tasks are grouped by user story. No tests requested — no test tasks generated.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Verify development environment and reproduce bugs before modifying any code

- [X] T001 Confirm dev environment — run `npm run dev`, load `http://localhost:3000`, and reproduce both bugs: (1) nav links appear left-justified on landing page, (2) refreshing `/work` or any subpage shows the full-screen overlay instead of page content

---

## Phase 2: Foundational

**Purpose**: No shared infrastructure needed. US3 and US4 both reuse the existing `MenuSlider.tsx` via the pathname-driven `expandedParent` effect added in T012 — no new shared components are created. `SubNav.tsx` (a prior implementation artifact) is deleted in T013.

> No Phase 2 tasks. All user story phases can begin after Phase 1.

---

## Phase 3: User Story 1 — Centered Navigation Links (Priority: P1) ✅ Complete

**Goal**: Work, Play, Contact, and About links appear horizontally centered under the profile photo and name on the landing page.

**Independent Test**: Load `http://localhost:3000`. All four nav links must be visually centered with equal margins on both sides relative to the profile photo above them — verified on desktop and mobile (320px) viewports.

### Implementation for User Story 1

- [X] T002 [US1] In `components/MenuSlider.tsx` ~line 122, add `${!isExpanded ? 'justify-center' : ''}` to the parent item `<Link>` className (applies to Work and Play which have sub-items)
- [X] T003 [US1] In `components/MenuSlider.tsx` ~line 160, add `${!isExpanded ? 'justify-center' : ''}` to the leaf item `<Link>` className (applies to Contact and About which have no sub-items)
- [X] T004 [US1] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T002–T003

**Checkpoint**: Load landing page — confirm Work, Play, Contact, About are center-aligned. US1 is fully testable and independently verifiable at this point.

---

## Phase 4: User Story 2 — Functional Navigation to Mock Subpages (Priority: P2) ✅ Complete

**Goal**: All four nav links navigate to their destination pages; subpages display correctly on direct URL access or refresh; the profile name in the expanded sidebar returns to the landing page.

**Independent Test**: (1) Click each nav link from landing page and confirm the destination page loads with visible content. (2) Refresh `/work` — page content must be visible, not blocked by the full-screen overlay. (3) From any subpage, click "Dustin Niles" in the sidebar and confirm it navigates to `/` and resets to the full-screen landing state.

### Implementation for User Story 2

- [X] T005 [P] [US2] In `components/SiteLayout.tsx`, import `usePathname` from `next/navigation` and replace `useState(false)` with `useState(() => pathname !== '/')` — use a lazy initializer so `isExpanded` initializes as `true` for any non-root pathname, preventing the full-screen overlay from covering subpage content on direct URL access or refresh
- [X] T006 [P] [US2] In `components/MenuSlider.tsx`, replace the unconditional `<h1>Dustin Niles</h1>` heading with a conditional: when `isExpanded`, render `<Link href="/" onClick={() => setIsExpanded(false)} className="font-light tracking-wide text-[var(--foreground)] text-xl hover:text-[var(--text-secondary)] transition-colors">Dustin Niles</Link>`; when `!isExpanded`, retain the original `<h1>` element unchanged
- [X] T007 [US2] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T005–T006

**Checkpoint**: Navigate from landing to each subpage; refresh each subpage URL; click "Dustin Niles" from a subpage. All scenarios must work correctly. US2 is independently verifiable at this point.

---

## Phase 5: User Story 3 — Navigation to Work Sub-pages (Priority: P3)

**Goal**: When on `/work` or any Work sub-page, the sidebar auto-expands and displays links to Resume, Photography, and Video. Each sub-page loads with placeholder content (title + description only — no inline navigation). The sidebar provides the path back to `/work` from any Work sub-page.

**Design change note**: Prior implementation added `components/SubNav.tsx` rendered inside `app/work/page.tsx` and inline `← Work` back-links in each Work sub-page. These are being removed. All navigation moves to the sidebar via context-aware `expandedParent` auto-derivation in `components/MenuSlider.tsx`.

**Independent Test**: Visit `/work` — sidebar must show Resume, Photography, Video links expanded under Work (no sub-nav in main content). Visit `/resume`, `/photography`, `/video` directly by URL — sidebar must show the Work sub-menu expanded with the current page highlighted; Work parent link must be clickable and navigate to `/work`. Main content of each page shows title and description only.

### Cleanup: Remove Work Content-Area Navigation

- [X] T008 [P] [US3] In `app/work/page.tsx`, remove the `SubNav` import and `<SubNav>` usage — retain only the page `<h1>` and description paragraph
- [X] T009 [P] [US3] In `app/resume/page.tsx`, remove the inline `← Work` back-link above the `<h1>`
- [X] T010 [P] [US3] In `app/photography/page.tsx`, remove the inline `← Work` back-link above the `<h1>`
- [X] T011 [P] [US3] In `app/video/page.tsx`, remove the inline `← Work` back-link above the `<h1>`

### Implementation: Sidebar Context-aware Sub-navigation

- [X] T012 [US3] In `components/MenuSlider.tsx`, add pathname-derived `expandedParent` using lazy initializer + render-time sync pattern (satisfies `react-hooks/set-state-in-effect` ESLint rule from Next.js config)
- [X] T013 [US3] Delete `components/SubNav.tsx` (no longer used after T008 cleanup)
- [X] T014 [US3] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T008–T013

**Checkpoint**: Visit `/work` — sidebar shows Work sub-menu expanded with Resume, Photography, Video links; main content shows title/description only. Visit `/resume` directly — sidebar still shows Work sub-menu expanded with Resume highlighted. Work parent link navigates to `/work`. US3 is fully testable and independently verifiable at this point.

---

## Phase 6: User Story 4 — Navigation to Play Sub-pages (Priority: P4)

**Goal**: When on `/play` or any Play sub-page, the sidebar auto-expands and displays links to Cycling, Tech, and Volunteering. Each sub-page loads with placeholder content (title + description only). The sidebar provides the path back to `/play` from any Play sub-page.

**Design change note**: Same pattern as US3. Prior implementation added `<SubNav>` in `app/play/page.tsx` and inline `← Play` back-links in each Play sub-page. These are being removed. The `useEffect` added in T012 already handles Play sub-pages — no additional `MenuSlider.tsx` changes are needed.

**Independent Test**: Visit `/play` — sidebar must show Cycling, Tech, Volunteering links expanded under Play (no sub-nav in main content). Visit `/cycling`, `/tech`, `/volunteering` directly by URL — sidebar must show the Play sub-menu expanded with the current page highlighted; Play parent link navigates to `/play`. Main content shows title and description only.

### Cleanup: Remove Play Content-Area Navigation

- [X] T015 [P] [US4] In `app/play/page.tsx`, remove the `SubNav` import and `<SubNav>` usage — retain only the page `<h1>` and description paragraph
- [X] T016 [P] [US4] In `app/cycling/page.tsx`, remove the inline `← Play` back-link above the `<h1>`
- [X] T017 [P] [US4] In `app/tech/page.tsx`, remove the inline `← Play` back-link above the `<h1>`
- [X] T018 [P] [US4] In `app/volunteering/page.tsx`, remove the inline `← Play` back-link above the `<h1>`
- [X] T019 [US4] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T015–T018

**Checkpoint**: Visit `/play` — sidebar shows Play sub-menu expanded; main content shows title/description only. Visit `/cycling` directly — sidebar shows Play sub-menu expanded with Cycling highlighted. Play parent link navigates to `/play`. US4 is fully testable and independently verifiable at this point.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full acceptance criteria validation across all four user stories

- [ ] T020 [P] Verify FR-001: nav links are centered on landing page at desktop viewport (visual inspection)
- [ ] T021 [P] Verify FR-001: nav links remain centered at mobile viewport 320px (DevTools responsive mode)
- [ ] T022 [P] Verify FR-002–FR-006: click Work, Play, Contact, About from landing page — each routes to the correct destination page without errors
- [ ] T023 [P] Verify FR-007: each of `/work`, `/play`, `/about`, `/contact` displays a page title identifying the section
- [ ] T024 [P] Verify FR-008: clicking "Dustin Niles" in the sidebar from each subpage navigates back to `/` and restores the full-screen landing state
- [ ] T025 [P] Verify FR-009/FR-013: visiting `/work` and `/play` causes the sidebar to show the three sub-section links expanded; main content area has no navigation links
- [ ] T026 [P] Verify FR-010–FR-012: click Resume, Photography, Video from the sidebar on `/work` — each routes to the correct sub-page without errors
- [ ] T027 [P] Verify FR-014–FR-016: click Cycling, Tech, Volunteering from the sidebar on `/play` — each routes to the correct sub-page without errors
- [ ] T028 [P] Verify FR-017: visiting `/resume`, `/photography`, `/video` directly — sidebar shows Work sub-menu expanded; clicking the Work parent link navigates to `/work`
- [ ] T029 [P] Verify FR-017: visiting `/cycling`, `/tech`, `/volunteering` directly — sidebar shows Play sub-menu expanded; clicking the Play parent link navigates to `/play`
- [ ] T030 [P] Verify SC-008: all 6 sub-pages (`/resume`, `/photography`, `/video`, `/cycling`, `/tech`, `/volunteering`) load correctly when accessed directly by URL
- [X] T031 Run `npm run build` for final static export validation — confirm `/out` directory is generated cleanly with no build errors
- [ ] T032 [P] Verify color contrast: use browser DevTools color picker to confirm sidebar sub-nav child link colors (`var(--text-tertiary)`, `var(--text-secondary)`) on `var(--background)` meet ≥ 4.5:1 ratio in both light and dark mode — required by constitution Principle IV and HIG Foundations: Color
- [ ] T033 [P] Verify keyboard navigation and hover affordances: tab through `/work` and `/play` pages to confirm sidebar sub-menu links (a) receive visible focus outlines and are keyboard-reachable, and (b) display a visible hover state when moused over — required by constitution Principle IV and HIG Patterns: Feedback (HIG-002)
- [ ] T034 [P] Verify dark mode: toggle OS to dark mode and load `/work`, `/resume`, `/play`, `/cycling` — confirm sidebar sub-nav links render legibly with no hardcoded colors — required by constitution Principle I and HIG Foundations: Dark Mode
- [ ] T035 [P] Verify reduced-motion: confirm the `useEffect` in `MenuSlider.tsx` does not introduce any CSS transition or animation without a `@media (prefers-reduced-motion: reduce)` guard — required by constitution Principle I and HIG Foundations: Accessibility
- [X] T036 Run `npm audit --audit-level=high` — confirm zero high or critical vulnerabilities before merge — required by constitution Security Standards
- [ ] T037 Run Lighthouse on `http://localhost:3000` (and at least one subpage, e.g. `/work`) — confirm Performance ≥ 90 and Accessibility = 100 on both pages before merge — required by constitution Principle IV (use `npx lighthouse <url> --only-categories=performance,accessibility --output=json` or Chrome DevTools Lighthouse panel)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: N/A
- **User Story 1 (Phase 3)**: Depends on Phase 1 completion only ✅
- **User Story 2 (Phase 4)**: Depends on Phase 1; US1 must complete first because both US1 (T002–T003) and US2 (T006) modify `components/MenuSlider.tsx` — implement sequentially to avoid conflicts ✅
- **User Story 3 (Phase 5)**: Depends on Phase 1; no functional dependency on US1/US2; T012 (`MenuSlider.tsx` pathname effect) covers both US3 and US4 — implement before starting US4
- **User Story 4 (Phase 6)**: Depends on T012 (sidebar pathname effect from Phase 5); cleanup tasks T015–T018 are independent of each other
- **Polish (Phase 7)**: Depends on all four user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories — independently testable ✅
- **US2 (P2)**: No functional dependency on US1; implement after US1 to avoid file conflicts on `components/MenuSlider.tsx` ✅
- **US3 (P3)**: No functional dependency on US1/US2; T012 (`MenuSlider.tsx` pathname effect) is shared with US4 — must complete before US4 begins
- **US4 (P4)**: Depends on T012 from US3; all cleanup tasks (T015–T018) are independent of each other

### Within Each User Story

- **US1**: T002 before T003 (same file, sequential edits); T004 (build) after both
- **US2**: T005 and T006 can run in parallel [P] (different files); T007 (build) after both
- **US3**: T008–T011 (cleanup, different files) can run in parallel [P]; T012 (`MenuSlider.tsx` pathname effect) can run in parallel with T008–T011; T013 (delete SubNav.tsx) after T008–T011 confirm no remaining imports; T014 (build) after all
- **US4**: T015–T018 (cleanup, different files) can run in parallel [P] after T012 is done; T019 (build) after all

### Parallel Opportunities

- **US2 implementation**: T005 (`SiteLayout.tsx`) and T006 (`MenuSlider.tsx`) are in different files
- **US3 cleanup**: T008–T011 are in different files and can all run in parallel
- **US4 cleanup**: T015–T018 are in different files and can all run in parallel
- **Phase 7 Polish**: T020–T030 are all independent visual checks and can be validated in parallel

---

## Parallel Example: User Story 3

```bash
# T008–T012 can all run in parallel (different files, no shared dependencies):
Task A: "Remove SubNav from app/work/page.tsx"         # T008
Task B: "Remove back-link from app/resume/page.tsx"    # T009
Task C: "Remove back-link from app/photography/page.tsx" # T010
Task D: "Remove back-link from app/video/page.tsx"     # T011
Task E: "Add pathname useEffect to MenuSlider.tsx"     # T012
# Then T013 (delete SubNav.tsx) after all above confirm no remaining SubNav imports
```

## Parallel Example: User Story 4

```bash
# After T012 is done, T015–T018 can run in parallel (different files):
Task A: "Remove SubNav from app/play/page.tsx"           # T015
Task B: "Remove back-link from app/cycling/page.tsx"     # T016
Task C: "Remove back-link from app/tech/page.tsx"        # T017
Task D: "Remove back-link from app/volunteering/page.tsx" # T018
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

User Story 1 is complete. ✅

### Incremental Delivery

1. Phase 1 → verify dev environment ✅
2. Phase 3 (US1) → centered nav links ✅
3. Phase 4 (US2) → functional navigation + back nav ✅
4. Phase 5 (US3) → remove content-area nav + add sidebar pathname effect → validate sidebar shows Work sub-nav contextually
5. Phase 6 (US4) → remove Play content-area nav → validate sidebar shows Play sub-nav contextually
6. Phase 7 (Polish) → run full acceptance criteria checklist → ready for merge to `main`

---

## Notes

- [P] tasks = different files, no merge conflicts
- [Story] label maps task to specific user story for traceability
- **No new files to create** — all nav moves into the existing `MenuSlider.tsx`
- **File to delete**: `components/SubNav.tsx`
- **File to modify (implementation)**: `components/MenuSlider.tsx` (T012 — pathname-driven `expandedParent` effect)
- **Files to clean up (US3)**: `app/work/page.tsx`, `app/resume/page.tsx`, `app/photography/page.tsx`, `app/video/page.tsx`
- **Files to clean up (US4)**: `app/play/page.tsx`, `app/cycling/page.tsx`, `app/tech/page.tsx`, `app/volunteering/page.tsx`
- **No tests requested** in spec — no test tasks generated
- **HIG review completed** in plan.md — all changes confirmed compliant; no additional design review tasks required
- **US1 and US2 are complete** — T001–T007 all verified; US3 (T008–T014) is the next implementation target
- **T032–T036** added to Phase 7 per analysis: color contrast, keyboard nav, dark mode, reduced-motion, and `npm audit` — required by constitution Principles I, IV, and Security Standards
