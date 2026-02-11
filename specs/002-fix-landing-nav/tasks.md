# Tasks: Fix Landing Page Nav Alignment and Navigation Links

**Input**: Design documents from `/specs/002-fix-landing-nav/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓

**Organization**: Tasks are grouped by user story. No tests requested — no test tasks generated.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Verify development environment and reproduce bugs before modifying any code

- [X] T001 Confirm dev environment — run `npm run dev`, load `http://localhost:3000`, and reproduce both bugs: (1) nav links appear left-justified on landing page, (2) refreshing `/work` or any subpage shows the full-screen overlay instead of page content

---

## Phase 2: Foundational

**Purpose**: No shared infrastructure changes required — both user stories modify existing component files only

> No Phase 2 tasks. Both user story phases can begin immediately after Phase 1.

---

## Phase 3: User Story 1 — Centered Navigation Links (Priority: P1) 🎯 MVP

**Goal**: Work, Play, Contact, and About links appear horizontally centered under the profile photo and name on the landing page.

**Independent Test**: Load `http://localhost:3000`. All four nav links must be visually centered with equal margins on both sides relative to the profile photo above them — verified on desktop and mobile (320px) viewports.

### Implementation for User Story 1

- [X] T002 [US1] In `components/MenuSlider.tsx` ~line 122, add `${!isExpanded ? 'justify-center' : ''}` to the parent item `<Link>` className (applies to Work and Play which have sub-items)
- [X] T003 [US1] In `components/MenuSlider.tsx` ~line 160, add `${!isExpanded ? 'justify-center' : ''}` to the leaf item `<Link>` className (applies to Contact and About which have no sub-items)
- [X] T004 [US1] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T002–T003

**Checkpoint**: Load landing page — confirm Work, Play, Contact, About are center-aligned. US1 is fully testable and independently verifiable at this point.

---

## Phase 4: User Story 2 — Functional Navigation to Mock Subpages (Priority: P2)

**Goal**: All four nav links navigate to their destination pages; subpages display correctly on direct URL access or refresh; the profile name in the expanded sidebar returns to the landing page.

**Independent Test**: (1) Click each nav link from landing page and confirm the destination page loads with visible content. (2) Refresh `/work` — page content must be visible, not blocked by the full-screen overlay. (3) From any subpage, click "Dustin Niles" in the sidebar and confirm it navigates to `/` and resets to the full-screen landing state.

### Implementation for User Story 2

- [X] T005 [P] [US2] In `components/SiteLayout.tsx`, import `usePathname` from `next/navigation` and replace `useState(false)` with `useState(() => pathname !== '/')` — use a lazy initializer so `isExpanded` initializes as `true` for any non-root pathname, preventing the full-screen overlay from covering subpage content on direct URL access or refresh
- [X] T006 [P] [US2] In `components/MenuSlider.tsx`, replace the unconditional `<h1>Dustin Niles</h1>` heading with a conditional: when `isExpanded`, render `<Link href="/" onClick={() => setIsExpanded(false)} className="font-light tracking-wide text-[var(--foreground)] text-xl hover:text-[var(--text-secondary)] transition-colors">Dustin Niles</Link>`; when `!isExpanded`, retain the original `<h1>` element unchanged
- [X] T007 [US2] Run `npm run lint && npm run build` to confirm no TypeScript or lint errors from T005–T006

**Checkpoint**: Navigate from landing to each subpage; refresh each subpage URL; click "Dustin Niles" from a subpage. All scenarios must work correctly. US2 is independently verifiable at this point.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Full acceptance criteria validation across both user stories

- [ ] T008 [P] Verify FR-001: nav links are centered on landing page at desktop viewport (visual inspection)
- [ ] T009 [P] Verify FR-001: nav links remain centered at mobile viewport 320px (DevTools responsive mode)
- [ ] T010 [P] Verify FR-002–FR-006: click Work, Play, Contact, About from landing page — each routes to the correct destination page without errors
- [ ] T011 [P] Verify FR-007: each of `/work`, `/play`, `/about`, `/contact` displays a page title identifying the section
- [ ] T012 [P] Verify FR-008: clicking "Dustin Niles" in the sidebar from each subpage navigates back to `/` and restores the full-screen landing state
- [X] T013 Run `npm run build` for final static export validation — confirm `/out` directory is generated cleanly with no build errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: N/A
- **User Story 1 (Phase 3)**: Depends on Phase 1 completion only
- **User Story 2 (Phase 4)**: Depends on Phase 1; US1 must complete first because both US1 (T002–T003) and US2 (T006) modify `components/MenuSlider.tsx` — implement sequentially to avoid conflicts
- **Polish (Phase 5)**: Depends on Phase 3 and Phase 4 completion

### User Story Dependencies

- **US1 (P1)**: No dependency on US2 — independently testable
- **US2 (P2)**: No functional dependency on US1; implement after US1 to avoid file conflicts on `components/MenuSlider.tsx`

### Within Each User Story

- T002 before T003: same file, sequential edits at different locations in `components/MenuSlider.tsx`
- T003 before T004: build validation only after all edits in US1 are complete
- T005 and T006 can run in parallel [P]: different files (`SiteLayout.tsx` vs `MenuSlider.tsx`)
- T006 before T007: build validation only after all edits in US2 are complete

### Parallel Opportunities

- **US2 implementation**: T005 (`SiteLayout.tsx`) and T006 (`MenuSlider.tsx`) are in different files
- **Phase 5 Polish**: T008–T012 are all independent visual checks and can be validated in parallel

---

## Parallel Example: User Story 2

```bash
# T005 and T006 can be implemented in parallel (different files):
Task A: "Initialize isExpanded from usePathname() lazy initializer in components/SiteLayout.tsx"
Task B: "Wrap profile name in Link with setIsExpanded(false) in components/MenuSlider.tsx expanded state"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (Fix A — alignment)
3. **STOP and VALIDATE**: Load landing page, confirm nav links are centered on desktop + mobile
4. Proceed to Phase 4 if ready

### Incremental Delivery

1. Phase 1 → verify dev environment and reproduce bugs
2. Phase 3 (US1) → centered nav links → validate visually on landing page
3. Phase 4 (US2) → functional navigation + back nav → validate end-to-end routing and refresh
4. Phase 5 (Polish) → run full acceptance criteria checklist → ready for merge to `main`

---

## Notes

- [P] tasks = different files, no merge conflicts
- [Story] label maps task to specific user story for traceability
- **No new files to create** — all changes are surgical edits to two existing component files
- **No tests requested** in spec — no test tasks generated
- **HIG review completed** in plan.md — all changes confirmed compliant; no additional design review tasks required
- Three distinct edit points across two files: Fix A (MenuSlider.tsx line ~122), Fix A (MenuSlider.tsx line ~160), Fix B (SiteLayout.tsx), Fix C (MenuSlider.tsx expanded heading)
