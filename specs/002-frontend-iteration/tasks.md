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

**Purpose**: No shared infrastructure needed for US1/US2. US3 introduces `SubNav.tsx`, a shared component reused by US4 — created in Phase 5 (US3) as its first task.

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

## Phase 5: User Story 3 — Navigation to Work Sub-pages (Priority: P3) ✅ Complete

**Goal**: The Work page displays navigation links to Resume, Photography, and Video sub-pages; each sub-page loads with placeholder content and provides a back-link to the Work section.

**Independent Test**: Visit `/work` — three sub-section links (Resume, Photography, Video) must be visible and functional. Visit `/resume`, `/photography`, and `/video` — each must display a `← Work` back-link above the `<h1>` that navigates to `/work`. Direct URL access to each sub-page must work without errors.

### Implementation for User Story 3

- [X] T008 [US3] Create `components/SubNav.tsx` with props `items: { label: string; href: string }[]` — renders a vertical list of Next.js `<Link>` elements using `font-light`, `text-[var(--text-secondary)]`, and `hover:text-[var(--foreground)]` styles matching existing link patterns
- [X] T009 [US3] Update `app/work/page.tsx` to import `SubNav` from `components/SubNav` and render it below the existing description with items: `[{ label: 'Resume', href: '/resume' }, { label: 'Photography', href: '/photography' }, { label: 'Video', href: '/video' }]`
- [X] T010 [P] [US3] Add `← Work` back-link as `<Link href="/work">` above the `<h1>` in `app/resume/page.tsx` — use `font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors` styles
- [X] T011 [P] [US3] Add `← Work` back-link as `<Link href="/work">` above the `<h1>` in `app/photography/page.tsx` — use `font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors` styles
- [X] T012 [P] [US3] Add `← Work` back-link as `<Link href="/work">` above the `<h1>` in `app/video/page.tsx` — use `font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors` styles
- [X] T013 [US3] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T008–T012

**Checkpoint**: Visit Work page — sub-section links visible and clickable. Each Work sub-page shows `← Work` back-link. US3 is fully testable and independently verifiable at this point.

---

## Phase 6: User Story 4 — Navigation to Play Sub-pages (Priority: P4) ✅ Complete

**Goal**: The Play page displays navigation links to Cycling, Tech, and Volunteering sub-pages; each sub-page loads with placeholder content and provides a back-link to the Play section.

**Independent Test**: Visit `/play` — three sub-section links (Cycling, Tech, Volunteering) must be visible and functional. Visit `/cycling`, `/tech`, and `/volunteering` — each must display a `← Play` back-link above the `<h1>` that navigates to `/play`. Direct URL access to each sub-page must work without errors.

### Implementation for User Story 4

- [X] T014 [US4] Update `app/play/page.tsx` to import `SubNav` from `components/SubNav` and render it below the existing description with items: `[{ label: 'Cycling', href: '/cycling' }, { label: 'Tech', href: '/tech' }, { label: 'Volunteering', href: '/volunteering' }]`
- [X] T015 [P] [US4] Add `← Play` back-link as `<Link href="/play">` above the `<h1>` in `app/cycling/page.tsx` — use `font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors` styles
- [X] T016 [P] [US4] Add `← Play` back-link as `<Link href="/play">` above the `<h1>` in `app/tech/page.tsx` — use `font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors` styles
- [X] T017 [P] [US4] Add `← Play` back-link as `<Link href="/play">` above the `<h1>` in `app/volunteering/page.tsx` — use `font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors` styles
- [X] T018 [US4] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T014–T017

**Checkpoint**: Visit Play page — sub-section links visible and clickable. Each Play sub-page shows `← Play` back-link. US4 is fully testable and independently verifiable at this point.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full acceptance criteria validation across all four user stories

- [ ] T019 [P] Verify FR-001: nav links are centered on landing page at desktop viewport (visual inspection)
- [ ] T020 [P] Verify FR-001: nav links remain centered at mobile viewport 320px (DevTools responsive mode)
- [ ] T021 [P] Verify FR-002–FR-006: click Work, Play, Contact, About from landing page — each routes to the correct destination page without errors
- [ ] T022 [P] Verify FR-007: each of `/work`, `/play`, `/about`, `/contact` displays a page title identifying the section
- [ ] T023 [P] Verify FR-008: clicking "Dustin Niles" in the sidebar from each subpage navigates back to `/` and restores the full-screen landing state
- [ ] T024 [P] Verify FR-009/FR-013: Work and Play pages each display three sub-section navigation links
- [ ] T025 [P] Verify FR-010–FR-012: click Resume, Photography, Video from Work page — each routes to the correct sub-page without errors
- [ ] T026 [P] Verify FR-014–FR-016: click Cycling, Tech, Volunteering from Play page — each routes to the correct sub-page without errors
- [ ] T027 [P] Verify FR-017: `/resume`, `/photography`, and `/video` each display `← Work` back-link that navigates to `/work`
- [ ] T028 [P] Verify FR-017: `/cycling`, `/tech`, and `/volunteering` each display `← Play` back-link that navigates to `/play`
- [ ] T029 [P] Verify SC-008: all 6 sub-pages (`/resume`, `/photography`, `/video`, `/cycling`, `/tech`, `/volunteering`) load correctly when accessed directly by URL
- [X] T030 Run `npm run build` for final static export validation — confirm `/out` directory is generated cleanly with no build errors
- [ ] T031 [P] Verify color contrast: use browser DevTools color picker to confirm `var(--text-secondary)` on `var(--background)` meets ≥ 4.5:1 ratio for SubNav link text and back-link text (`← Work` / `← Play`) in both light and dark mode — required by constitution Principle IV and HIG Foundations: Color
- [ ] T032 [P] Verify keyboard navigation: tab through `/work` and `/play` pages to confirm SubNav links receive visible focus outlines; tab through a Work and Play sub-page to confirm the back-link is keyboard-reachable — required by constitution Principle IV
- [ ] T033 [P] Verify dark mode: toggle OS to dark mode and load `/work`, `/resume`, `/play`, `/cycling` — confirm SubNav links and back-links render legibly using `var(--text-secondary)` and `var(--foreground)` tokens with no hardcoded colors — required by constitution Principle I and HIG Foundations: Dark Mode
- [ ] T034 [P] Verify reduced-motion: inspect `components/SubNav.tsx` and any back-link styles — confirm no CSS `transition` or `animation` property is present without a `@media (prefers-reduced-motion: reduce)` guard — required by constitution Principle I and HIG Foundations: Accessibility
- [X] T035 Run `npm audit --audit-level=high` — confirm zero high or critical vulnerabilities before merge — required by constitution Security Standards

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: N/A
- **User Story 1 (Phase 3)**: Depends on Phase 1 completion only ✅
- **User Story 2 (Phase 4)**: Depends on Phase 1; US1 must complete first because both US1 (T002–T003) and US2 (T006) modify `components/MenuSlider.tsx` — implement sequentially to avoid conflicts ✅
- **User Story 3 (Phase 5)**: Depends on Phase 1; no functional dependency on US1/US2; creates `SubNav.tsx` (T008) that US4 will reuse
- **User Story 4 (Phase 6)**: Depends on T008 (`SubNav.tsx` creation from Phase 5) — all other US4 tasks are independent
- **Polish (Phase 7)**: Depends on all four user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories — independently testable ✅
- **US2 (P2)**: No functional dependency on US1; implement after US1 to avoid file conflicts on `components/MenuSlider.tsx` ✅
- **US3 (P3)**: No functional dependency on US1/US2; creates shared `SubNav.tsx` component for US4 to reuse
- **US4 (P4)**: Depends on T008 (`SubNav.tsx`) from US3; all other US4 tasks (T015–T017) are independent

### Within Each User Story

- **US1**: T002 before T003 (same file, sequential edits); T004 (build) after both
- **US2**: T005 and T006 can run in parallel [P] (different files); T007 (build) after both
- **US3**: T008 (`SubNav.tsx`) before T009 (Work page imports it); T010, T011, T012 can run in parallel [P] (different files); T013 (build) after all
- **US4**: T014 before T015/T016/T017 (safety — confirm SubNav import pattern works); T015, T016, T017 can run in parallel [P] (different files); T018 (build) after all

### Parallel Opportunities

- **US2 implementation**: T005 (`SiteLayout.tsx`) and T006 (`MenuSlider.tsx`) are in different files
- **US3 back-links**: T010, T011, T012 are in different files (`resume/`, `photography/`, `video/`)
- **US4 back-links**: T015, T016, T017 are in different files (`cycling/`, `tech/`, `volunteering/`)
- **Phase 7 Polish**: T019–T029 are all independent visual checks and can be validated in parallel

---

## Parallel Example: User Story 3

```bash
# After T008 (SubNav.tsx) and T009 (work page) are done, T010–T012 can run in parallel:
Task A: "Add ← Work back-link to app/resume/page.tsx"
Task B: "Add ← Work back-link to app/photography/page.tsx"
Task C: "Add ← Work back-link to app/video/page.tsx"
```

## Parallel Example: User Story 4

```bash
# After T014 (play page) is done, T015–T017 can run in parallel:
Task A: "Add ← Play back-link to app/cycling/page.tsx"
Task B: "Add ← Play back-link to app/tech/page.tsx"
Task C: "Add ← Play back-link to app/volunteering/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

User Story 1 is complete. ✅

### Incremental Delivery

1. Phase 1 → verify dev environment ✅
2. Phase 3 (US1) → centered nav links ✅
3. Phase 4 (US2) → functional navigation + back nav ✅
4. Phase 5 (US3) → Work sub-page navigation → validate Work page sub-links and back-navigation
5. Phase 6 (US4) → Play sub-page navigation → validate Play page sub-links and back-navigation
6. Phase 7 (Polish) → run full acceptance criteria checklist → ready for merge to `main`

---

## Notes

- [P] tasks = different files, no merge conflicts
- [Story] label maps task to specific user story for traceability
- **New file to create**: `components/SubNav.tsx` (serves both US3 and US4)
- **Files to modify for US3**: `app/work/page.tsx`, `app/resume/page.tsx`, `app/photography/page.tsx`, `app/video/page.tsx`
- **Files to modify for US4**: `app/play/page.tsx`, `app/cycling/page.tsx`, `app/tech/page.tsx`, `app/volunteering/page.tsx`
- **No tests requested** in spec — no test tasks generated
- **HIG review completed** in plan.md — all changes confirmed compliant; no additional design review tasks required
- **US1 and US2 are complete** — T001–T007 all verified; US3 (T008–T013) is the next implementation target
- **T031–T035** added to Phase 7 per analysis: color contrast, keyboard nav, dark mode, reduced-motion, and `npm audit` — required by constitution Principles I, IV, and Security Standards
