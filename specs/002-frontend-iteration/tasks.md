---
description: "Task list for 002 remediation implementation"
---

# Tasks: Remediate Mobile Layout, Security Policy, and Delivery Compliance Gaps

**Input**: Design documents from `/specs/002-frontend-iteration/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required)

**Tests**: No new automated test suite requested; verification tasks use lint/build/audit plus targeted manual route checks.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`US1`, `US2`, `US3`, `US4`)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Context)

**Purpose**: Capture baseline and ensure current branch context before edits.

- [X] T001 Confirm working branch is `002-frontend-iteration` and capture current gate status with `npm run lint`, `npm run build`, `npm audit --audit-level=high`
- [X] T002 Review current mobile layout/CSP/workflow/dependabot state in `components/SiteLayout.tsx`, `components/MenuSlider.tsx`, `app/layout.tsx`, `public/_headers`, `.github/workflows/*.yml`, and `.github/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure needed by multiple stories.

- [X] T003 Create reusable viewport hook in `app/hooks/useMediaQuery.ts` for responsive behavior in client components
- [X] T004 [P] Add local placeholder assets `public/images/portfolio/photo-1.svg` and `public/images/portfolio/photo-2.svg`

**Checkpoint**: Foundational utilities/assets are in place; user story implementation can begin.

---

## Phase 3: User Story 1 - Usable Mobile Navigation and Content Layout (Priority: P1) 🎯 MVP

**Goal**: Prevent mobile content collapse and keep layout state synchronized with route changes.

**Independent Test**: At 320px width, `/work`, `/play`, `/resume`, `/cycling` remain readable; navigating between `/` and subpages keeps correct layout mode.

### Implementation for User Story 1

- [X] T005 [US1] Update `components/SiteLayout.tsx` to use `useMediaQuery` and apply desktop left margin (`256px`) with reduced mobile offset for readability
- [X] T006 [US1] Update `components/SiteLayout.tsx` to synchronize `isExpanded` state on pathname and viewport changes (desktop: expanded off-root, collapsed on root; mobile: content-friendly reduced rail)
- [X] T007 [US1] Update `components/MenuSlider.tsx` container width logic for responsive behavior (avoid fixed 256px sidebar takeover on mobile)
- [X] T008 [US1] Preserve landing page centered navigation behavior while applying responsive updates in `components/MenuSlider.tsx` and `app/page.tsx`
- [X] T009 [US1] Verification: confirm route-driven responsive class logic in source and successful static build for `/`, `/work`, `/play`, `/resume`, `/cycling`

**Checkpoint**: Mobile layout is usable and route-driven layout state is stable.

---

## Phase 4: User Story 2 - Secure CSP That Still Allows Intended Media (Priority: P1)

**Goal**: Enforce strict CSP without unsafe directives while allowing approved video embeds.

**Independent Test**: `/video` renders embeds and policy strings include strict directives + approved frame sources.

### Implementation for User Story 2

- [X] T010 [US2] Update CSP meta policy in `app/layout.tsx` to remove `unsafe-inline` and include required restrictive directives plus `frame-src` for approved providers
- [X] T011 [US2] Fix `public/_headers` format and align CSP/security headers with strict policy and approved frame sources
- [X] T012 [US2] Ensure video provider list in `app/video/page.tsx` remains limited to approved domains expected by CSP
- [X] T013 [US2] Verification: confirm `/video` is statically generated and iframe domains match `frame-src` whitelist by source inspection

**Checkpoint**: Security policy and video rendering requirements are both satisfied.

---

## Phase 5: User Story 3 - Accessible Typography and Placeholder Content Integrity (Priority: P2)

**Goal**: Keep mobile text readable and eliminate broken photography image references.

**Independent Test**: Mobile body text remains >=16px; `/photography` loads placeholder assets successfully.

### Implementation for User Story 3

- [X] T014 [US3] Remove sub-16px mobile body override in `app/globals.css`
- [X] T015 [US3] Point `app/data/photos.ts` references to existing placeholder assets (or keep names aligned with newly added placeholders)
- [X] T016 [US3] Verify `components/PhotoGallery.tsx` renders placeholders correctly with existing alt text data
- [X] T017 [US3] Verification: confirm `/photography` route is generated and placeholder asset paths exist in `public/images/portfolio`

**Checkpoint**: Typography and placeholder integrity meet baseline accessibility/content requirements.

---

## Phase 6: User Story 4 - Delivery Pipeline Governance and Clean Quality Gates (Priority: P2)

**Goal**: Align repository governance with constitution and ensure quality gates pass cleanly.

**Independent Test**: Workflows pinned to SHAs, Dependabot config present, lint/build/audit pass.

### Implementation for User Story 4

- [X] T018 [US4] Resolve lint warning in `app/global-error.tsx` so lint can pass with zero warnings
- [X] T019 [US4] Pin all GitHub Action `uses:` entries in `.github/workflows/deploy.yml`, `.github/workflows/claude.yml`, and `.github/workflows/claude-code-review.yml` to commit SHAs
- [X] T020 [US4] Add `.github/dependabot.yml` for npm and GitHub Actions update monitoring
- [X] T021 [US4] Verify no unintended workflow behavior changes after pinning (workflow keys and steps preserved; only `uses:` refs changed)

**Checkpoint**: Governance controls are in place and lint gate is clean.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all stories.

- [X] T022 Run `npm run lint -- --max-warnings=0`
- [X] T023 Run `npm run build`
- [X] T024 Run `npm audit --audit-level=high`
- [X] T025 Validate static routes include `/video`, `/photography`, `/work`, `/play`, `/resume`, `/cycling`, `/tech`, `/volunteering`
- [X] T026 Update task checkboxes to reflect completed work and summarize verification evidence in `specs/002-frontend-iteration/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1
- **Phase 3 (US1)**: Depends on Phase 2
- **Phase 4 (US2)**: Can start after Phase 2; independent from US1 logic except shared files
- **Phase 5 (US3)**: Depends on placeholder assets from Phase 2
- **Phase 6 (US4)**: Independent from UI stories, can run in parallel after Phase 1
- **Phase 7 (Polish)**: Depends on completion of Phases 3–6

### User Story Dependencies

- **US1 (P1)**: Primary MVP for mobile usability
- **US2 (P1)**: Security parity with functional embeds; also critical
- **US3 (P2)**: Relies on placeholder assets and typography cleanup
- **US4 (P2)**: Governance hardening and gate cleanup

### Parallel Opportunities

- T004 (placeholder assets) can run in parallel with T003
- US2 (T010–T013) and US4 (T018–T021) can proceed in parallel with US1/US3 where files do not overlap

---

## Implementation Strategy

### MVP First

1. Complete US1 (mobile usability) and US2 (CSP + video compatibility)
2. Validate usability/security baseline

### Incremental Delivery

1. Add US3 (typography + placeholders)
2. Add US4 (workflow pinning + dependabot + lint cleanup)
3. Run final polish validation

---

## Notes

- Keep changes minimal and targeted to accepted review findings.
- Preserve static export architecture and existing route structure.
- Do not introduce new external runtime dependencies.

## Verification Evidence

- `npm run lint -- --max-warnings=0` passed.
- `npm run build` passed and generated static routes including `/video`, `/photography`, `/work`, `/play`, `/resume`, `/cycling`, `/tech`, `/volunteering`.
- `npm audit --audit-level=high` returned `found 0 vulnerabilities`.
- Source-level checks confirm:
  - No remaining inline `style={...}` usage in `app/` and `components/`.
  - CSP in `app/layout.tsx` and `public/_headers` excludes `unsafe-inline`/`unsafe-eval` and includes approved `frame-src` origins.
  - Workflow `uses:` entries are pinned to commit SHAs.
  - Placeholder assets exist at `public/images/portfolio/photo-1.svg` and `public/images/portfolio/photo-2.svg`.
