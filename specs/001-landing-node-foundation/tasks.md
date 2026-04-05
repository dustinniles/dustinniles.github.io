# Tasks: Landing Node Foundation

**Input**: Design documents from `specs/001-landing-node-foundation/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/component-interfaces.md ✅

**Tests**: No automated tests — validation is `npm run build`, Lighthouse audit, and manual HTML inspection per quickstart.md.

**Organization**: Tasks grouped by user story (US1–US6) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete sibling tasks)
- **[Story]**: Which user story this task belongs to
- File paths are absolute from repository root

---

## Phase 1: Setup

**Purpose**: Verify dev environment is ready and `npm run dev` works on this branch.

- [X] T001 Verify `npm install` succeeds and `npm run dev` starts at http://localhost:3000
- [X] T002 Verify `npm run build` produces `/out` directory with current state (baseline build passes)

**Checkpoint**: Dev server running, baseline build confirmed clean.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Type system, CSS foundation, and data restructure that ALL user stories depend on.

⚠️ **CRITICAL**: No user story implementation can begin until this phase is complete.

- [X] T003 Add `ProjectMedia`, `ProjectEntry`, `NavigationSectionCard`, and `SocialLinkCategory` type to `app/types/index.ts`; extend `SocialMediaLink` with `category: SocialLinkCategory` field — per data-model.md
- [X] T004 [P] Create `app/data/projects.ts` exporting `projects: ProjectEntry[]` array with at least one draft placeholder entry (slug: `'placeholder-project'`, status: `'draft'`) so downstream pages compile
- [X] T005 [P] Update `app/data/social-links.ts` — add `category` field to all existing entries (LinkedIn → `'professional'`, GitHub → `'code'`); add additional entries for social/publications categories as stubs
- [X] T006 [P] Restructure `app/data/navigation.ts` — replace Work/Play/Contact/About hierarchy with four-section structure: Portfolio (children: projects, photography, video), Lab (leaf), Activity (children: cycling, volunteering), Links (leaf) — per contracts/component-interfaces.md FR-001–FR-004
- [X] T007 [P] Add `--color-accent` CSS custom property to `app/globals.css` `:root` block (`#2563eb` light, `#60a5fa` dark-mode override) — per contracts/component-interfaces.md CSS design contract
- [X] T008 Create `components/JsonLd.tsx` — Server Component that accepts `data: Record<string, unknown>` and renders `<script type="application/ld+json">` tag with `JSON.stringify(data)` — per contracts/component-interfaces.md

**Checkpoint**: `npm run build` must still pass after all foundational tasks. TypeScript must compile with zero errors.

---

## Phase 3: User Story 1 — Instant Positioning on Arrival (Priority: P1) 🎯 MVP

**Goal**: Home page communicates name, professional role, value statement, and four navigation paths — all within the initial viewport, within 5 seconds.

**Independent Test**: Open http://localhost:3000 without scrolling. Verify name, role, one-line value statement, and four labeled section cards (Portfolio, Lab, Activity, Links) are all visible. Repeat on a 375px-wide viewport.

### Design Review for US1 (REQUIRED before implementation) ⚠️

- [X] T009 [US1] Review home page layout against HIG Foundations: Layout (margins, safe areas, alignment) and HIG Components: Navigation and Search; verify all content fits in 1024px viewport height without scroll

### Implementation for User Story 1

- [X] T010 [US1] Rewrite `app/page.tsx` — Server Component showing: name ("Dustin Niles"), professional role and one-line value statement as header, and a 2×2 grid of `NavigationSectionCard` items (Portfolio, Lab, Activity, Links) each with label, one-line description, and link; inline `NavigationSectionCard[]` constant defined in same file
- [X] T011 [US1] Add per-page `metadata` export to `app/page.tsx` with title `'Dustin Niles'`, description (professional positioning statement), OG tags (`og:type: 'website'`, `og:url: '/'`), and `alternates.canonical: '/'`
- [X] T012 [US1] Verify home page is a Server Component (no `'use client'`), passes `npm run lint`, and `npm run build` succeeds with updated home page
- [X] T013 [US1] Verify on mobile (375px): open DevTools, set viewport to 375px, confirm no horizontal scroll and all four section cards are reachable by vertical scroll only

**Checkpoint**: Home page independently deployable and communicates identity within 5 seconds.

---

## Phase 4: User Story 2 — Outcome-Driven Portfolio Review (Priority: P1)

**Goal**: Portfolio section shows decision-document case studies with quantifiable outcomes. List view + detail view with all five narrative sections.

**Independent Test**: Navigate to `/portfolio`. Verify project cards render (title, domain tag, dateRange, outcome preview). Click a card. Verify detail page shows Context, Objective, Approach, Outcome, Lessons sections, back-navigation link, and `npm run build` generates the static route.

### Design Review for US2 (REQUIRED before implementation) ⚠️

- [X] T014 [US2] Review `ProjectCard` and `ProjectDetail` layout against HIG Foundations: Layout and HIG Patterns: Feedback (hover affordance); plan border-highlight hover using `--color-accent` and `border-color` transition per CSS design contract

### Implementation for User Story 2

- [X] T015 [P] [US2] Create `components/ProjectCard.tsx` — accepts `project: ProjectEntry`; renders title, first tag as domain label, `dateRange`, first sentence of `outcome`; links to `/portfolio/[slug]`; border `1px solid var(--border)` with hover `border-color: var(--color-accent)` transition; does not render if `status !== 'published'`; no broken layout when `media` is absent
- [X] T016 [P] [US2] Create `components/ProjectDetail.tsx` — accepts `project: ProjectEntry`; renders `<article>` root with five `<section>` blocks (Context, Objective, Approach, Outcome, Lessons) each with an `<h2>`; includes "← Back to Portfolio" link to `/portfolio`; renders `media` items with `alt` text when present; layout intact when `media` is absent
- [X] T017 [US2] Create `app/portfolio/page.tsx` — Server Component; imports `projects` from `app/data/projects.ts`; filters to `status === 'published'`; sorts `featured === true` entries first; renders `<ProjectCard>` for each; handles empty state with a message; includes `metadata` export (title: `'Portfolio'`, description, canonical: `'/portfolio'`)
- [X] T018 [US2] Create `app/portfolio/[slug]/page.tsx` — exports `dynamicParams = false`; exports `generateStaticParams()` returning slugs of all published projects; exports `generateMetadata({ params })` deriving title and description from matching `ProjectEntry`; renders `<ProjectDetail project={project} />`; includes `JsonLd` with `CreativeWork` schema (name, description, dateCreated from project data)
- [X] T019 [US2] Update `app/data/projects.ts` — replace draft placeholder with at least one `status: 'published'` entry that includes a quantifiable `outcome` string; confirm `npm run build` generates `/out/portfolio/` and `/out/portfolio/[slug]/` directories

**Checkpoint**: `/portfolio` lists entries, `/portfolio/[slug]` renders decision document, build produces static HTML for both.

---

## Phase 5: User Story 3 — Intentional Section Navigation (Priority: P2)

**Goal**: All four top-level sections and their sub-pages exist as routes. Navigation accurately labels and expands each section. Old routes remain in place (not deleted yet).

**Independent Test**: Navigate to each new route (`/portfolio`, `/portfolio/photography`, `/portfolio/video`, `/lab`, `/activity`, `/activity/cycling`, `/activity/volunteering`). Verify sidebar shows Portfolio/Lab/Activity/Links as top-level items, active item highlights correctly, and sub-items expand on click.

### Implementation for User Story 3

- [X] T020 [P] [US3] Create `app/portfolio/photography/page.tsx` — move content from `app/photography/page.tsx` (PhotoGallery component, metadata export); update metadata title to `'Photography | Portfolio'`
- [X] T021 [P] [US3] Create `app/portfolio/video/page.tsx` — move content from `app/video/page.tsx` (video embeds, data import); update metadata title to `'Video | Portfolio'`
- [X] T022 [P] [US3] Create `app/lab/page.tsx` — Server Component stub; heading "Lab", brief description "Vibe-coded micro-apps and tools — coming soon"; metadata (title: `'Lab'`, canonical: `'/lab'`)
- [X] T023 [P] [US3] Create `app/activity/page.tsx` — Server Component stub with heading "Activity" and links to `/activity/cycling` and `/activity/volunteering`; metadata (title: `'Activity'`, canonical: `'/activity'`)
- [X] T024 [P] [US3] Create `app/activity/cycling/page.tsx` — move content from `app/cycling/page.tsx` (BlogLayout with cycling posts); update metadata title to `'Cycling | Activity'`
- [X] T025 [P] [US3] Create `app/activity/volunteering/page.tsx` — move content from `app/volunteering/page.tsx` (BlogLayout with volunteering posts); update metadata title to `'Volunteering | Activity'`
- [X] T026 [US3] Verify `npm run build` passes with all new routes; confirm `/out/lab/`, `/out/activity/`, `/out/activity/cycling/`, `/out/activity/volunteering/`, `/out/portfolio/photography/`, `/out/portfolio/video/` directories exist in build output
- [X] T027 [US3] Manually test sidebar: navigate to each new section; confirm active state highlights in sidebar, parent section expands sub-navigation, and Escape key still closes expanded menus

**Checkpoint**: All new routes render, navigation hierarchy is correct, build passes.

---

## Phase 6: User Story 4 — Discovery via AI and Search (Priority: P2)

**Goal**: Every page has unique metadata, JSON-LD on home and portfolio detail pages, sitemap.xml and robots.txt generated at build.

**Independent Test**: Run `npm run build`, then inspect `/out/sitemap.xml` for all routes, `/out/robots.txt` for Allow and Sitemap pointer, and spot-check 3 pages' HTML for unique `<title>`, `<meta name="description">`, OG tags, and canonical link.

### Implementation for User Story 4

- [X] T028 [US4] Update `app/layout.tsx` — set `metadataBase: new URL('https://dustinniles.github.io')`, update `title` to `{ default: 'Dustin Niles', template: '%s | Dustin Niles' }`, update description to professional positioning statement; add `JsonLd` component to `<head>` with `Person` schema (name, url, sameAs array with LinkedIn/GitHub, jobTitle, location) and `WebSite` schema (name, url, description) — per FR-020, FR-025
- [X] T029 [P] [US4] Add `metadata` export with unique title, description, OG tags, and `alternates.canonical` to each page that is missing it: `app/lab/page.tsx`, `app/activity/page.tsx`, `app/activity/cycling/page.tsx`, `app/activity/volunteering/page.tsx`, `app/portfolio/photography/page.tsx`, `app/portfolio/video/page.tsx`, `app/about/page.tsx` (legacy route — not part of four-section nav, brought to metadata standards); add `JsonLd` with `ProfilePage` schema (mainEntity: Person reference) to `app/about/page.tsx` — per FR-026
- [X] T030 [P] [US4] Create `app/sitemap.ts` — returns `MetadataRoute.Sitemap` array covering all routes listed in contracts/component-interfaces.md sitemap contract; imports `projects` from `app/data/projects.ts` to generate `/portfolio/[slug]` entries for published projects only
- [X] T031 [P] [US4] Create `app/robots.ts` — returns `MetadataRoute.Robots` with `rules: { userAgent: '*', allow: '/' }` and `sitemap: 'https://dustinniles.github.io/sitemap.xml'`
- [X] T032 [US4] Run `npm run build`; verify `out/sitemap.xml` lists all expected routes including portfolio detail slugs; verify `out/robots.txt` contains `Allow: /` and correct sitemap URL; spot-check `out/index.html` for JSON-LD script tag and correct `<title>`

**Checkpoint**: Build produces valid sitemap.xml and robots.txt; all pages have unique metadata.

---

## Phase 7: User Story 5 — Design Communicates Technical Identity (Priority: P3)

**Goal**: Code Brutalism micro-interactions applied. Accent color active throughout. Entrance animations on headings. All motion gated behind prefers-reduced-motion. Dark mode intact.

**Independent Test**: Enable Reduce Motion in System Settings. Reload site — zero animations. Disable Reduce Motion. Hover over a portfolio card — border highlights with color transition. Set OS to Dark Mode — all text readable, accent color visible.

### Design Review for US5 (REQUIRED before implementation) ⚠️

- [X] T033 [US5] Review all new page designs (home, portfolio list, portfolio detail) against HIG Foundations: Typography and HIG Foundations: Accessibility (reduced-motion, contrast); confirm dark mode values for `--color-accent` meet 3:1 contrast on `--background` dark (`#1a1a1a`)

### Implementation for User Story 5

- [X] T034 [US5] Add animation keyframes to `@theme` block in `app/globals.css`: `--animate-fade-up` (opacity 0→1, translateY 0.5rem→0, 0.4s ease-out) and `--animate-blink` (cursor blink, 0.75s step-start infinite); both are automatically gated by the existing global `prefers-reduced-motion: reduce` rule
- [X] T035 [US5] Apply `motion-safe:animate-fade-up` entrance animation to the main heading on `app/page.tsx` (home) and the `<h1>` on `app/portfolio/page.tsx` — verify reduced-motion users see text immediately without layout shift
- [X] T036 [US5] Verify all `ProjectCard` instances use border-highlight hover (`transition: border-color 300ms ease`, hover `border-color: var(--color-accent)`) per CSS design contract in `components/ProjectCard.tsx`; run manual hover test
- [X] T037 [US5] Audit all new pages for dark mode: switch OS to Dark Mode and verify `--color-accent` renders, borders are visible against `--background` dark, and no text falls below 4.5:1 contrast ratio; fix any issues in `app/globals.css` or component inline styles

**Checkpoint**: Reduce Motion disables all motion. Hover affordance works. Dark mode intact. Lighthouse Accessibility = 100.

---

## Phase 8: User Story 6 — Trust and Authority Signals (Priority: P3)

**Goal**: Links page with categorized external profiles. Privacy and Terms pages with real content.

**Independent Test**: Navigate to `/links` — four category groups visible, each link opens in a new tab. Navigate to `/privacy` and `/terms` — readable content explaining data practices and contact info.

### Implementation for User Story 6

- [X] T038 [P] [US6] Create `components/LinkGroup.tsx` — accepts `{ category, label, links: SocialMediaLink[] }`; renders `label` as heading, each link as `<a target="_blank" rel="noopener noreferrer">`; returns `null` when `links` is empty
- [X] T039 [P] [US6] Create `app/links/page.tsx` — imports `socialLinks` from `app/data/social-links.ts`; groups by `category` (order: professional → code → social → publications); renders `<LinkGroup>` for each non-empty category; metadata (title: `'Links'`, description: 'Dustin Niles across the web', canonical: `'/links'`)
- [X] T040 [P] [US6] Create `app/privacy/page.tsx` — plain prose explaining: site collects no personal data beyond standard GitHub Pages server logs, no cookies set, no analytics; contact email `dustin@dustinniles.com`; metadata (title: `'Privacy Policy'`, canonical: `'/privacy'`)
- [X] T041 [P] [US6] Create `app/terms/page.tsx` — plain prose covering: content copyright Dustin Niles, attribution required for reuse, contact for permissions; metadata (title: `'Terms'`, canonical: `'/terms'`)
- [X] T042 [US6] Verify all external links across the entire site use `rel="noopener noreferrer"` — run `grep -r 'target="_blank"' app/ components/` and confirm every match also has `rel="noopener noreferrer"`

**Checkpoint**: `/links`, `/privacy`, `/terms` render, build passes, external link audit clean.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Remove old routes, final build verification, constitution gate re-check.

- [X] T043 Remove old route directories that have been superseded by new routes: `app/photography/`, `app/video/`, `app/cycling/`, `app/volunteering/` — confirm no remaining imports reference these paths before deleting
- [X] T044 [P] Update `app/work/page.tsx` and `app/play/page.tsx` to redirect visitors: replace content with a note and a link to the new Portfolio/Activity sections respectively (do not delete yet — leave for final cleanup after confirming no external links)
- [X] T045 Run `npm run build` — verify zero TypeScript errors, zero ESLint errors (`npm run lint`), and `/out` contains all expected directories
- [X] T046 [P] Run Lighthouse audit on built site (`npx serve out -p 3000`): Performance ≥ 90, Accessibility = 100; document any score below target and fix before marking done
- [ ] T047 [P] Re-check constitution gate: complete the HIG Design Review checklist in `specs/001-landing-node-foundation/plan.md` (check all 9 items); resolve any unchecked items
- [X] T048 [P] Verify `out/sitemap.xml` contains all 11 route categories from contracts/component-interfaces.md sitemap contract; verify `out/robots.txt` is correct
- [X] T049 Final manual walkthrough: home page (5-second test), portfolio list + one detail, lab stub, activity + cycling + volunteering, links (new-tab test), privacy, terms, about — all render with correct navigation active state; verify at least one page from `/out` renders correctly with JavaScript disabled in the browser (SC-007)

**Checkpoint**: All constitution gates pass. Build clean. Lighthouse scores met. Ready to merge to `main`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS all user stories**
- **US1 Home Page (Phase 3)**: Depends on Foundational (needs types + nav restructure)
- **US2 Portfolio (Phase 4)**: Depends on Foundational (needs `ProjectEntry` type + `projects.ts`)
- **US3 Navigation/Routes (Phase 5)**: Depends on Foundational (needs updated `navigation.ts`)
- **US4 SEO (Phase 6)**: Depends on US2 + US3 (needs all routes to exist before sitemap)
- **US5 Design (Phase 7)**: Depends on Foundational (needs `--color-accent`); can run alongside US3
- **US6 Trust Signals (Phase 8)**: Depends on Foundational (needs `SocialMediaLink.category`)
- **Polish (Phase 9)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — independent of US2–US6
- **US2 (P1)**: Can start after Foundational — independent of US1, US3–US6
- **US3 (P2)**: Can start after Foundational — independent of US1–US2, US5–US6
- **US4 (P2)**: Depends on US2 and US3 (needs all routes before sitemap generation)
- **US5 (P3)**: Can start after Foundational — independent of US1–US4, US6
- **US6 (P3)**: Can start after Foundational — independent of US1–US5

### Within Each Phase

- Tasks marked `[P]` within a phase have no dependency on each other and can run simultaneously
- Non-`[P]` tasks within a phase depend on `[P]` tasks in the same phase completing first

### Parallel Opportunities

After Foundational completes, the following can run simultaneously:

```bash
# Maximum parallelism after Phase 2:
US1 (T009–T013): Home page          ← start immediately
US2 (T014–T019): Portfolio model    ← start immediately
US3 (T020–T027): Section routes     ← start immediately
US5 (T033–T037): Design system      ← start immediately (only needs T007 from Foundational)
US6 (T038–T042): Trust signals      ← start immediately (only needs T005 from Foundational)

# US4 (T028–T032): SEO — wait until US2 + US3 are complete
```

---

## Implementation Strategy

### MVP (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 — Home page decision environment
4. Complete Phase 4: US2 — Portfolio model
5. **STOP and VALIDATE**: Home page communicates identity, portfolio shows case studies
6. Deploy to branch preview, get feedback

### Incremental Delivery

1. Setup + Foundational → clean baseline
2. US1 + US2 → MVP: identity + portfolio
3. US3 → Navigation complete: all sections reachable
4. US4 → SEO: site is AI/crawler-discoverable
5. US5 → Design: visual identity complete
6. US6 → Trust: links matrix + compliance pages
7. Polish → production-ready, merge to `main`

---

## Notes

- `[P]` tasks have no file conflicts with each other and can run in parallel
- `[US?]` label maps each task to its user story for traceability
- Old routes (`/photography`, `/video`, `/cycling`, `/volunteering`) are NOT deleted until Phase 9 — leave them intact during development to avoid broken navigation in intermediate states
- `npm run build` is the primary validation gate — run it after every phase checkpoint
- Lighthouse audit (Phase 9) is the final quality gate before merge
