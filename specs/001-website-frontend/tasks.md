# Tasks: Interactive Portfolio Website Frontend

**Input**: Design documents from `/specs/001-website-frontend/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: No test tasks generated — tests were not requested in the feature specification. Manual browser testing per quickstart.md applies.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3])
- Exact file paths are included in each description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and prepare the project environment for new components.

- [ ] T001 Install @fontsource/ibm-plex-sans npm dependency (npm install @fontsource/ibm-plex-sans)
- [ ] T002 [P] Add IBM Plex Sans font family to app/globals.css using Tailwind CSS v4 @theme directive: @theme { --font-sans: 'IBM Plex Sans', system-ui, sans-serif; } (CSS-first configuration — no tailwind.config.ts exists in Tailwind v4; postcss.config.mjs already configured)
- [ ] T003 [P] Create public/images/ subdirectories: public/images/portfolio/, public/images/profile/, public/images/blog/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared TypeScript types, global styles, navigation data, and utility hooks required by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T004 [P] Create app/types/index.ts with TypeScript interfaces for NavigationMenuItem, PortfolioPhoto, BlogPost, VideoItem, and SocialMediaLink (per data-model.md entity definitions; ContactFormSubmission excluded — contact is a static mailto: link per plan.md FR-031 decision, no form exists)
- [ ] T005 [P] Update app/globals.css with @fontsource/ibm-plex-sans imports for 300 and 400 weights, CSS transition utility classes (.slide-menu using transform/translateX, .content-fade using opacity), and prefers-reduced-motion media query (transition-duration: 0.01ms for all elements)
- [ ] T006 Create app/data/navigation.ts with NavigationMenuItem[] mainMenu array: Work (children: Resume, Photography, Video), Play (children: Cycling, Tech, Volunteering), Contact (direct link), About (direct link)
- [ ] T007 [P] Create app/hooks/useReducedMotion.ts React hook using window.matchMedia('(prefers-reduced-motion: reduce)') with addEventListener change handler and cleanup

**Checkpoint**: Types, global styles, navigation data, and animation hooks ready — user story implementation can begin.

---

## Phase 3: User Story 1 — Landing Page & Initial Navigation (Priority: P1) 🎯 MVP

**Goal**: Visitor arrives at homepage, sees centered menu with profile photo and name, clicks any item to trigger the menu sliding left into sidebar position while content appears on the right.

**Independent Test**: Load [http://localhost:3000](http://localhost:3000) → verify centered menu with profile header and Work/Play/Contact/About items → click "Work" → confirm menu slides left to sidebar and content area appears on the right.

### Implementation for User Story 1

- [ ] T008 [US1] Create components/MenuSlider.tsx as 'use client' component with isExpanded boolean state (default false), centered layout mode when false (menu fills viewport center), sidebar layout mode when true (menu fixed left at w-1/4), 300ms cubic-bezier(0.4, 0, 0.2, 1) CSS transform transition using will-change: transform, profile header section (div placeholder for profile photo + "Dustin Niles" h1 always visible), and main menu items rendered from app/data/navigation.ts using useReducedMotion hook to disable transitions when preferred
- [ ] T009 [US1] Update app/layout.tsx to replace existing Sidebar.tsx import with MenuSlider, implementing flex min-h-screen layout: MenuSlider renders as fixed-width sidebar (w-64 when expanded, full-width centered when not), content area div as flex-1 overflow-y-auto for scrollable pages
- [ ] T010 [US1] Update app/page.tsx to return a minimal empty main element as landing content (no portfolio grid), aligned with the centered menu initial state where no content area is visible
- [ ] T011 [P] [US1] Create stub route pages app/contact/page.tsx and app/about/page.tsx each exporting a default function returning a div with "Coming Soon" text (to be replaced with real content in Phase 6)

**Checkpoint**: Homepage shows centered menu → click triggers slide-to-sidebar transition → two-column layout established.

---

## Phase 4: User Story 2 — Sub-Menu Navigation (Priority: P2)

**Goal**: Clicking Work or Play reveals sub-items with a slide-left animation. A back arrow lets visitors return to the main menu with a slide-right animation. Profile header stays fixed throughout.

**Independent Test**: Click "Work" in main menu → verify sub-items (Resume, Photography, Video) slide in replacing main items → verify back arrow visible top-left → click back arrow → main menu slides back in. Repeat for "Play" (Cycling, Tech, Volunteering).

### Implementation for User Story 2

- [ ] T012 [P] [US2] Extend components/MenuSlider.tsx with activeMenu state ('main' | 'work' | 'play'), conditional rendering of Work/Play sub-menu items from navigation.ts children array, slide-left transition on parent menu item click (translateX(-100%) out, new items slide in), back arrow button in sub-menu header (top-left position, aria-label="Back to main menu") triggering slide-right return transition
- [ ] T013 [P] [US2] Create stub pages app/photography/page.tsx, app/resume/page.tsx, and app/video/page.tsx each exporting a default function returning a div with section name + "Coming Soon" text (to be replaced in Phases 5 and 6)
- [ ] T014 [P] [US2] Create stub pages app/cycling/page.tsx, app/tech/page.tsx, and app/volunteering/page.tsx each exporting a default function returning a div with section name + "Coming Soon" text (to be replaced in Phase 7)
- [ ] T015 [P] [US2] Add content fade-in transition to app/layout.tsx content area: wrap the {children} slot in a client component that uses usePathname() to detect route changes and applies CSS opacity transition (0→1, 300ms ease-in-out) on each navigation

**Checkpoint**: Full navigation hierarchy works — main menu → sub-menu → content page → back arrow → main menu. Content fades in on route change.

---

## Phase 5: User Story 3 — Photography Gallery (Priority: P3)

**Goal**: Photography section shows one large full-screen photo at a time. Scrolling snaps to the next complete photo. An animated arrow indicator guides visitors. Keyboard navigation works.

**Independent Test**: Navigate to /photography → verify single photo fills content area with no partial images → scroll down → confirm snap to exactly next complete photo → scroll up → confirm snap back → wait on first photo → arrow indicator fades in.

### Implementation for User Story 3

- [ ] T016 [P] [US3] Create app/data/photos.ts exporting PortfolioPhoto[] array with 2 placeholder entries using src paths referencing public/images/portfolio/, descriptive alt text, correct order, width: 1920, height: 1080, aspectRatio: 'landscape'
- [ ] T017 [US3] Create components/PhotoGallery.tsx as 'use client' component with scroll-snap container (scroll-snap-type: y mandatory, overscroll-behavior-y: contain, height: 100%, overflow-y: scroll), individual photo items at 100vh height (scroll-snap-align: start, scroll-snap-stop: always), img elements with object-fit: cover (first image loading="eager" decoding="async", subsequent loading="lazy" decoding="async"), and ArrowDown/ArrowUp keyboard event listener for scrollBy navigation
- [ ] T018 [US3] Create app/photography/page.tsx replacing the Phase 4 stub, importing photographyGallery from app/data/photos.ts and rendering PhotoGallery component with photos prop, page height set to fill content area
- [ ] T019 [US3] Add scroll indicator to components/PhotoGallery.tsx: arrow-down SVG element positioned below first photo item with initial opacity 0, CSS opacity transition to 1 triggered via setTimeout (1500ms) on mount using useEffect, hidden (opacity 0) on first scroll event via onScroll listener

**Checkpoint**: /photography shows scroll-snap gallery with one image at a time, arrow indicator, and keyboard navigation. Respects prefers-reduced-motion via hook.

---

## Phase 6: User Story 4 — Content Pages: About, Resume, Contact (Priority: P4)

**Goal**: Visitors can access biographical information, formatted resume, and a contact page with a mailto: link.

**Independent Test**: Navigate to /about → verify biographical text visible. Navigate to /resume → verify formatted career content. Navigate to /contact → verify mailto: link is present and correctly addressed.

### Implementation for User Story 4

- [ ] T020 [P] [US4] Create app/about/page.tsx replacing the Phase 4 stub, with biographical text content in semantic HTML (article, section elements), placeholder bio text with sections for background and interests, and an optional timeline section using ordered list with time elements
- [ ] T021 [P] [US4] Create app/resume/page.tsx replacing the Phase 4 stub, with formatted career information sections (Experience, Education, Skills) using semantic HTML (header, section, h2, h3, ul, p elements), IBM Plex font-light class for headings, placeholder content for each section
- [ ] T022 [P] [US4] Create app/contact/page.tsx replacing the Phase 4 stub, with a simple contact section containing a mailto: anchor element (href="mailto:dustin@dustinniles.com", aria-label="Email Dustin Niles") styled as a minimal text link using IBM Plex font-light, and a brief introductory sentence above the link

**Checkpoint**: All three content pages render independently. Contact page shows a mailto: link.

---

## Phase 7: User Story 5 — Blog-Style Content Pages (Priority: P5)

**Goal**: Cycling, Tech, and Volunteering sections each display blog-style posts with readable typography. A shared BlogLayout component is reused across all three sections.

**Independent Test**: Navigate to /cycling, /tech, /volunteering → verify each shows blog post list with titles, dates, and excerpts → verify readable typography with appropriate line height and width.

### Implementation for User Story 5

- [ ] T023 [P] [US5] Create app/data/blog-posts.ts exporting BlogPost[] array with 1 sample post per category (cycling, tech, volunteering), each with id, title, slug, content (markdown string), excerpt, category, publishDate, status: 'published', and optional readingTime
- [ ] T024 [US5] Create components/BlogLayout.tsx accepting posts: BlogPost[] prop, rendering post list view with each post as article element showing title (h2), formatted publishDate, excerpt (p), and readingTime badge; individual post content rendered as prose div with max-w-2xl, leading-relaxed, font-light IBM Plex typography classes
- [ ] T025 [P] [US5] Create app/cycling/page.tsx replacing the Phase 4 stub, importing blogPosts from app/data/blog-posts.ts, filtering by category === 'cycling', and rendering with BlogLayout component
- [ ] T026 [P] [US5] Create app/tech/page.tsx replacing the Phase 4 stub, importing blogPosts from app/data/blog-posts.ts, filtering by category === 'tech', and rendering with BlogLayout component
- [ ] T027 [P] [US5] Create app/volunteering/page.tsx replacing the Phase 4 stub, importing blogPosts from app/data/blog-posts.ts, filtering by category === 'volunteering', and rendering with BlogLayout component

**Checkpoint**: All three blog sections show filtered posts using shared BlogLayout. Typography is readable across all sections.

---

## Phase 8: User Story 6 — Video Portfolio Gallery (Priority: P6)

**Goal**: Video section shows embedded video players from YouTube or Vimeo using privacy-enhanced iframes with lazy loading and thumbnail fallbacks.

**Independent Test**: Navigate to /video → verify embedded iframe player(s) visible in 16:9 layout → click play on a video → verify playback within embedded player.

### Implementation for User Story 6

- [ ] T028 [P] [US6] Create app/data/videos.ts exporting VideoItem[] array with 1-2 sample YouTube entries (platform: 'youtube', placeholder videoId, title, description, thumbnail with src and alt, order, publishDate)
- [ ] T029 [US6] Create app/video/page.tsx replacing the Phase 4 stub, importing videoGallery from app/data/videos.ts and rendering each VideoItem as a section with 16:9 aspect ratio container div (relative, pb-[56.25%]) containing iframe (absolute inset-0 w-full h-full) with src derived from platform (youtube: <https://www.youtube-nocookie.com/embed/{videoId}>, vimeo: <https://player.vimeo.com/video/{videoId}>), allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen, sandbox="allow-scripts allow-same-origin allow-presentation", loading="lazy", and title from VideoItem

**Checkpoint**: /video renders embedded privacy-enhanced players that load lazily and play within the page layout.

---

## Phase 9: User Story 7 — Social Media Platform Links (Priority: P7)

**Goal**: Bottom of the left sidebar shows social media icons that open correct external profiles in new tabs.

**Independent Test**: View any page → look at sidebar bottom → verify platform icons visible → click each icon → verify correct external URL opens in new tab.

### Implementation for User Story 7

- [ ] T030 [P] [US7] Create app/data/social-links.ts exporting SocialMediaLink[] array with LinkedIn and GitHub entries (id, platform, icon: 'linkedin'/'github', url: valid https:// profile URL, order, ariaLabel: 'Visit Dustin Niles on {Platform}')
- [ ] T031 [US7] Create components/SocialLinks.tsx importing socialLinks from app/data/social-links.ts, rendering a nav element with role="list" containing anchor elements for each link: href={link.url}, target="_blank", rel="noopener noreferrer", aria-label={link.ariaLabel}, with platform name or icon placeholder text as visible content
- [ ] T032 [US7] Update components/MenuSlider.tsx to import and render SocialLinks component at the bottom of the sidebar layout (inside the sidebar div, below menu items, visible only when isExpanded is true / sidebar mode is active)

**Checkpoint**: Sidebar bottom shows social platform links that open externally with noopener noreferrer. All links open in new tab.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive layout, security headers, and final build validation across all user stories.

- [ ] T033 [P] Add keyboard accessibility to components/MenuSlider.tsx: onKeyDown handlers for Escape key to navigate back from sub-menus (sets activeMenu to 'main'), ensure all menu items are focusable (tabIndex=0 on interactive divs or use button elements), add visible focus styles (focus-visible:ring-2 Tailwind class)
- [ ] T034 [P] Add responsive mobile layout to app/globals.css and app/layout.tsx: media query breakpoint at max-width 640px (sm:) with single-column layout, MenuSlider collapsible or minimal sidebar mode per FR-046 to FR-049 (small back button on left when navigated past landing page)
- [ ] T035 [P] Add CSP meta tag to app/layout.tsx inside the html head element using `httpEquiv="Content-Security-Policy"` with `content="form-action 'none'"` (GitHub Pages static export cannot serve HTTP headers — async headers() in next.config.ts is ignored by the static build; frame-src cannot be enforced via meta tag, so video iframe security relies entirely on sandbox attributes per contracts/video-embeds.md)
- [ ] T036 [P] Run npm audit to verify no critical or high severity security vulnerabilities in installed dependencies
- [ ] T037 Run npm run lint && npm run build to validate zero ESLint errors and confirm successful static export generation in /out directory

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **BLOCKS all user stories**
- **User Stories (Phases 3–9)**: All depend on Foundational phase completion
  - Phases execute in priority order (P1 → P2 → P3 → ... → P7)
  - Each phase is independently testable before moving to next
- **Polish (Final Phase)**: Depends on all user story phases being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2 — no dependency on other user stories
- **US2 (P2)**: Starts after US1 — extends MenuSlider.tsx created in US1
- **US3 (P3)**: Starts after Phase 2 — independent of US1/US2 (different component/page)
- **US4 (P4)**: Starts after Phase 2 — independent (requires stubs from US2 to be replaced)
- **US5 (P5)**: Starts after Phase 2 — independent (requires stubs from US2 to be replaced)
- **US6 (P6)**: Starts after Phase 2 — independent (requires stubs from US2 to be replaced)
- **US7 (P7)**: Starts after US1 — adds SocialLinks to MenuSlider created in US1

### Within Each User Story

- Data files first (they have no dependencies)
- Components before pages (pages import components)
- Core component before enhancements (e.g., T017 before T019)
- Stubs before real implementations for later phases

---

## Parallel Execution Examples

### Phase 2: Foundation

```
Parallel batch 1 (all independent, different files):
  T004: Create app/types/index.ts
  T005: Update app/globals.css
  T007: Create app/hooks/useReducedMotion.ts

Then sequentially:
  T006: Create app/data/navigation.ts (requires T004 types)
```

### Phase 3: User Story 1

```
Sequential (each depends on prior):
  T008: Create components/MenuSlider.tsx
  T009: Update app/layout.tsx (requires T008)
  T010: Update app/page.tsx (requires T009)

Parallel with above (independent files):
  T011: Create app/contact/page.tsx + app/about/page.tsx
```

### Phase 4: User Story 2

```
Parallel batch (all independent within US2):
  T012: Extend components/MenuSlider.tsx
  T013: Create Work sub-section stubs
  T014: Create Play sub-section stubs
  T015: Add fade transition to app/layout.tsx
```

### Phase 5: User Story 3

```
Parallel:
  T016: Create app/data/photos.ts

Sequential:
  T017: Create components/PhotoGallery.tsx
  T018: Create app/photography/page.tsx (requires T016, T017)
  T019: Extend PhotoGallery with scroll indicator (requires T017)
```

### Phase 6: User Story 4

```
Parallel batch (all independent pages):
  T020: Create app/about/page.tsx
  T021: Create app/resume/page.tsx
  T022: Create app/contact/page.tsx
```

### Phase 7: User Story 5

```
Parallel batch 1:
  T023: Create app/data/blog-posts.ts
  T024: Create components/BlogLayout.tsx

Parallel batch 2 (after T023 and T024):
  T025: Create app/cycling/page.tsx
  T026: Create app/tech/page.tsx
  T027: Create app/volunteering/page.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete **Phase 1**: Setup (install font, configure Tailwind)
2. Complete **Phase 2**: Foundational (types, CSS, nav data, hooks)
3. Complete **Phase 3**: User Story 1 (landing page + menu slide)
4. **STOP and VALIDATE**: Load homepage, verify centered menu, click item, confirm slide animation
5. Deploy/demo the core navigation pattern

### Incremental Delivery

| Step | Phases | Deliverable |
|------|--------|-------------|
| 1 | Phase 1+2 | Foundation ready |
| 2 | Phase 3 (US1) | **MVP**: Landing page + menu slide animation |
| 3 | Phase 4 (US2) | Full hierarchical navigation with sub-menus |
| 4 | Phase 5 (US3) | Photography scroll-snap gallery |
| 5 | Phase 6 (US4) | About, Resume, Contact form |
| 6 | Phase 7 (US5) | Cycling/Tech/Volunteering blog sections |
| 7 | Phase 8 (US6) | Video portfolio embeds |
| 8 | Phase 9 (US7) | Social media links in sidebar |
| 9 | Final Phase | Keyboard access, mobile layout, CSP, build validation |

Each step delivers independently testable, deployable value.

---

## Notes

- **[P]** tasks = different files, no dependencies on incomplete tasks in same phase
- **[US#]** label maps each task to its user story for traceability
- No test tasks generated (TDD not requested; manual browser testing applies per quickstart.md)
- Stub pages created in US2 (Phase 4) are intentionally replaced in later phases — this is expected
- Commit after each phase checkpoint to preserve working increments
- Run `npm run build` after Phase 3 to verify static export compatibility before proceeding
