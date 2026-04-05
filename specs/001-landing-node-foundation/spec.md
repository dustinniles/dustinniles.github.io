# Feature Specification: Landing Node Foundation

**Feature Branch**: `001-landing-node-foundation`
**Created**: 2026-04-05
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Instant Positioning on Arrival (Priority: P1)

A hiring manager, collaborator, or institutional contact arrives at the home page for the
first time. Within 5 seconds they understand who Dustin is, what domain he works in, and
where to go next. The site communicates a clear professional identity rather than an empty
prompt to "Select a section."

**Why this priority**: The home page is the single highest-leverage page on the site. If it
fails to communicate positioning immediately, no other improvement matters. This is the "5-second
clarity" requirement that anchors the entire landing node concept.

**Independent Test**: Visit the home page cold and time how long it takes to answer: Who is
this person? What do they do? What should I click next? The site should answer all three
without scrolling.

**Acceptance Scenarios**:

1. **Given** a visitor lands on `/`, **When** they view the page without scrolling or
   clicking, **Then** they can read a name, professional role, and one-line value statement
   within the visible viewport.
2. **Given** a visitor lands on `/`, **When** they want to evaluate Dustin's professional
   work, **Then** they see a clearly labeled path to that content (Portfolio section).
3. **Given** a visitor lands on `/`, **When** they want to explore personal projects or
   interests, **Then** they see clearly labeled paths to Lab and Activity sections.
4. **Given** a visitor arrives on a mobile device, **When** they view the home page,
   **Then** all identity information and navigation paths are visible without horizontal
   scrolling.

---

### User Story 2 — Outcome-Driven Portfolio Review (Priority: P1)

A potential employer or client navigates to the Portfolio section and reads through project
case studies. Each entry explains the problem, what was done, and the measured result — not
just a title and a screenshot. They leave with enough information to evaluate whether Dustin
is the right fit for their need.

**Why this priority**: The current site has no real portfolio content — only placeholder
entries. The decision-document model is the core content innovation. Without it, the
Portfolio section provides no signal to evaluators.

**Independent Test**: A reader unfamiliar with the projects can read one entry and answer:
What was the situation? What was the goal? What happened? Was it successful?

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/portfolio`, **When** they view the page,
   **Then** they see a list of projects each showing title, domain, and quantifiable outcome.
2. **Given** a visitor clicks a project entry, **When** the detail page loads,
   **Then** they see five structured sections: Context, Objective, Approach, Outcome, Lessons.
3. **Given** a project entry exists, **When** the Outcome section is read,
   **Then** it contains at least one specific, quantifiable result (e.g., percentage change,
   count, timeframe) — not a vague qualitative statement.
4. **Given** a visitor is on a project detail page, **When** they want to browse more
   projects, **Then** they can navigate back to the portfolio list without using the
   browser back button.

---

### User Story 3 — Intentional Section Navigation (Priority: P2)

A visitor navigates the site's four-section structure (Portfolio, Lab, Activity, Links) and
quickly finds content relevant to their intent. The navigation labels and hierarchy
communicate what each section contains without requiring exploration to understand it.

**Why this priority**: The current Work/Play labels are ambiguous and don't map to the
landing-node architecture. This restructure makes the intent pathways clear for different
audience types.

**Independent Test**: Show the navigation to someone unfamiliar with the site and ask them
to predict what they'd find in each top-level section. They should correctly predict the
content without explanation.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they look at the top-level navigation,
   **Then** they see Portfolio, Lab, Activity, and Links as the four primary sections.
2. **Given** a visitor clicks Portfolio in the navigation, **When** the section expands,
   **Then** they see sub-items for Projects, Photography, and Video.
3. **Given** a visitor clicks Activity in the navigation, **When** the section expands,
   **Then** they see sub-items for Cycling and Volunteering.
4. **Given** a visitor is on a sub-page, **When** they look at the sidebar,
   **Then** the parent section is visually active and the current sub-page is highlighted.
5. **Given** a visitor navigates between sections, **When** they move from Portfolio to Lab
   or Activity, **Then** each section's sub-navigation appears contextually without
   requiring a full page reload.

---

### User Story 4 — Discovery via AI and Search (Priority: P2)

A recruiter, collaborator, or peer searches for Dustin's name or relevant professional
keywords on Google, an AI overview, or another discovery tool. The site appears in results
with accurate title, description, and rich structured data. When an AI summarizes the page,
it accurately represents Dustin's professional identity.

**Why this priority**: In 2026, AI-mediated discovery (Google AI Overviews, autonomous
research agents) indexes sites before humans visit them. A site with missing or inaccurate
metadata is effectively invisible to this layer.

**Independent Test**: Inspect each page's `<title>`, `<meta description>`, Open Graph
tags, JSON-LD structured data, and canonical URL. Each must be present, accurate, and
specific to the page (not inherited defaults).

**Acceptance Scenarios**:

1. **Given** any page on the site, **When** a search engine or AI crawler reads its
   metadata, **Then** it finds a unique, page-specific `<title>` and `<meta description>`.
2. **Given** the home page, **When** structured data is inspected,
   **Then** it contains a valid `Person` schema with name, role, location, and links.
3. **Given** a portfolio project page, **When** structured data is inspected,
   **Then** it contains a valid `CreativeWork` or `Article` schema with title, description,
   and date.
4. **Given** the site is built, **When** `sitemap.xml` is requested,
   **Then** it returns all public routes with correct `<lastmod>` dates.
5. **Given** the site is built, **When** `robots.txt` is requested,
   **Then** it permits crawling of all public content and points to `sitemap.xml`.

---

### User Story 5 — Design Communicates Technical Identity (Priority: P3)

A visitor experiences the site's visual language and immediately reads it as technically
sophisticated, intentional, and human. The monospace aesthetic signals technical craft
without feeling cold. Subtle motion on supported devices adds life without overwhelming.

**Why this priority**: Design is a trust signal. The Technical Mono / Code Brutalism
direction differentiates the site from generic AI-built portfolios and signals authentic
technical depth. It cannot precede content (Phases 1-4) but is essential for the complete
landing-node identity.

**Independent Test**: Show the site to a technically literate peer and ask: What impression
does the visual style give? Does it feel intentional? Does it feel cold or human? Does
any motion distract or aid?

**Acceptance Scenarios**:

1. **Given** a visitor views any content page, **When** they read it,
   **Then** all text uses a monospace typeface with consistent weight hierarchy.
2. **Given** a visitor views a portfolio project card, **When** they hover over it,
   **Then** a border-highlight or subtle translate micro-interaction provides affordance
   feedback without animation that persists after the interaction ends.
3. **Given** a visitor has `prefers-reduced-motion: reduce` enabled, **When** they view
   any page, **Then** no animations or transitions play — including entrance animations,
   hover effects, and typing animations.
4. **Given** a visitor views the site in dark mode, **When** they read any content,
   **Then** all color contrast ratios meet 4.5:1 for body text and 3:1 for large text.
5. **Given** a visitor views the site on a 375px-wide viewport, **When** they navigate,
   **Then** no content is clipped, no horizontal scrolling is required, and tap targets
   meet minimum size requirements.

---

### User Story 6 — Trust and Authority Signals (Priority: P3)

A visitor wants to understand Dustin's external presence and verify the site is a
legitimate, maintained professional resource. They find a consolidated links page that
surfaces all relevant platforms, and privacy/terms pages that signal compliance
and transparency.

**Why this priority**: Trust signals reduce friction for evaluators. A Links page
centralizes authority; privacy and terms pages satisfy both AI crawlers and
compliance-minded institutional visitors.

**Independent Test**: Navigate to `/links` and find all of Dustin's external profiles
organized by category. Navigate to `/privacy` and `/terms` and find readable, honest
explanations of data practices.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/links`, **When** they view the page,
   **Then** they see external links organized into labeled categories (Professional, Code,
   Social, Publications/Media).
2. **Given** a visitor clicks any external link, **When** it opens,
   **Then** it opens in a new tab with `rel="noopener noreferrer"` applied.
3. **Given** a visitor navigates to `/privacy`, **When** they read it,
   **Then** they find a clear explanation of what data the site collects (none beyond
   standard GitHub Pages analytics) and how to contact Dustin.
4. **Given** a visitor navigates to `/terms`, **When** they read it,
   **Then** they find terms governing use of site content, attribution requirements,
   and a contact method.

---

### Edge Cases

- A visitor arrives with JavaScript disabled — navigation structure and all text content
  must still render (static export guarantees this; verify via build output).
- A search engine crawler requests a route that doesn't exist — the 404 page must still
  include site-level metadata and navigation.
- A portfolio project entry has no associated media — the layout must degrade gracefully
  without broken image placeholders.
- A visitor deep-links directly to a project detail page — the page must be independently
  meaningful without requiring the visitor to enter through the portfolio list.
- The `prefers-color-scheme` media query returns `dark` — every design element in the
  Technical Mono system must have an explicit dark-mode value.

---

## Requirements *(mandatory)*

### Functional Requirements

**Navigation Architecture:**
- **FR-001**: The site navigation MUST include exactly four top-level sections: Portfolio,
  Lab, Activity, and Links.
- **FR-002**: Portfolio MUST contain sub-items: Projects, Photography, Video.
- **FR-003**: Activity MUST contain sub-items: Cycling, Volunteering.
- **FR-004**: Lab and Links MUST be top-level leaf items (no sub-navigation in Phase 1;
  Lab sub-items may be added in a subsequent phase).
- **FR-005**: The home page (`/`) MUST display a name, professional role/title, one-line
  value statement, and navigation entry points — all within the initial viewport.

**Portfolio Content Model:**
- **FR-006**: The site MUST define a `ProjectEntry` data structure with the following fields:
  id, title, slug, context, objective, approach, outcome, lessons, tags, dateRange,
  featured flag, and optional media array.
- **FR-007**: Every published portfolio project entry MUST include a non-empty `outcome`
  field containing at least one quantifiable result.
- **FR-008**: The portfolio MUST provide both a list view (`/portfolio`) and a detail view
  (`/portfolio/[slug]`), with the detail view rendering all five narrative sections.
- **FR-009**: All portfolio detail routes MUST be generated at build time (no runtime routing).

**Design System:**
- **FR-010**: All interactive card elements MUST provide a visible state change on hover
  (border, color, or position) that serves as an affordance signal.
- **FR-011**: All animations and transitions MUST be wrapped in a `prefers-reduced-motion:
  no-preference` media query. Users with reduced-motion enabled MUST see zero motion.
- **FR-012**: The design system MUST define a single accent color CSS variable for
  interactive/highlight elements; all uses of accent color MUST reference this variable.
- **FR-013**: Card and section layouts MUST use border-based containment — not box shadows,
  gradients, or rounded decorative surfaces.

**Landing Matrix & Trust Signals:**
- **FR-014**: The Links page (`/links`) MUST display external links in categorized groups,
  each group with a visible label.
- **FR-015**: Every external link on the site MUST use `target="_blank"` and
  `rel="noopener noreferrer"`.
- **FR-016**: A Privacy page (`/privacy`) MUST exist and accurately describe what data the
  site collects and how to contact the site owner.
- **FR-017**: A Terms page (`/terms`) MUST exist and describe content use and attribution.

**AI/SEO:**
- **FR-018**: Every page MUST have a unique `<title>` tag and `<meta name="description">`
  tag specific to that page's content.
- **FR-019**: Every page MUST include Open Graph tags: `og:title`, `og:description`,
  `og:type`, `og:url`.
- **FR-020**: The home page MUST include JSON-LD structured data for `Person` schema.
- **FR-021**: Portfolio project detail pages MUST include JSON-LD structured data for
  `CreativeWork` or `Article` schema.
- **FR-022**: A `sitemap.xml` MUST be generated at build time covering all public routes.
- **FR-023**: A `robots.txt` MUST be generated at build time permitting all crawlers on
  all public content and referencing the sitemap URL.
- **FR-024**: Every page MUST include a canonical URL `<link>` tag.
- **FR-025**: The root layout MUST include JSON-LD structured data for `WebSite` schema
  (name, url, description).
- **FR-026**: The `/about` page MUST include JSON-LD structured data for `ProfilePage`
  schema (mainEntity referencing the Person schema).

### Apple HIG Compliance Requirements

- **HIG-001**: Navigation MUST follow HIG Components: Navigation and Search — hierarchy
  is clear, active state is visible, and the user always knows where they are.
- **HIG-002**: All interactive elements (cards, links, buttons) MUST follow HIG Patterns:
  Feedback — providing visible state changes for hover, focus, and active states.
- **HIG-003**: Dark mode MUST be fully supported per HIG Foundations: Dark Mode — every
  color, border, and background value must have an explicit dark-mode declaration.
- **HIG-004**: Reduced-motion MUST be respected per HIG Foundations: Accessibility — no
  motion plays when `prefers-reduced-motion: reduce` is active.
- **HIG-005**: Typography hierarchy MUST follow HIG guidance — headings, body, and
  captions use distinct, consistent weights and sizes.
- **HIG-006**: Spatial layout MUST follow HIG Foundations: Layout — consistent margins,
  alignment, and safe-area padding across all viewport sizes.

*Design review checklist:*
- [ ] Spatial conformance with HIG Layout principles
- [ ] Color contrast per HIG Color and Accessibility guidelines (4.5:1 body, 3:1 large text)
- [ ] Navigation patterns align with HIG Components: Navigation and Search
- [ ] Interactive elements have proper affordances per HIG Patterns: Feedback
- [ ] Dark mode support per HIG Foundations: Dark Mode
- [ ] Reduced-motion support per HIG Foundations: Accessibility

### Key Entities

- **ProjectEntry**: A portfolio case study. Has five narrative fields (context, objective,
  approach, outcome, lessons), metadata (id, slug, title, tags, dateRange, featured),
  and an optional array of associated media items. The `outcome` field is the only
  required content field — entries without it cannot be published.

- **NavigationSection**: One of the four top-level site sections (Portfolio, Lab, Activity,
  Links). Each has a label, a route, an optional set of child items, and a short
  description used on the home page decision cards.

- **SocialMediaLink**: An external authority link. Has a platform name, URL, category
  (Professional, Code, Social, Publications), display label, and ARIA label.

- **SiteMetadata**: Per-page SEO configuration. Has title, description, canonical URL,
  Open Graph fields, and optional JSON-LD schema payload.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify Dustin's name, professional domain, and
  primary call-to-action within 5 seconds of the home page loading, without scrolling.
- **SC-002**: Every portfolio project detail page contains a quantifiable outcome statement
  (percentage, count, or measurable change) — 100% of published entries.
- **SC-003**: Every public page passes validation for `<title>`, `<meta description>`,
  Open Graph tags, canonical URL, and (where applicable) JSON-LD schema — 0 missing fields.
- **SC-004**: The site builds successfully to static output (`npm run build`) with zero
  errors after all navigation routes and portfolio routes are created.
- **SC-005**: Lighthouse Accessibility score remains at 100 after design system changes
  are applied.
- **SC-006**: Lighthouse Performance score remains at ≥ 90 after design system changes,
  including any new animations or kinetic typography.
- **SC-007**: All pages render correctly with JavaScript disabled (static export guarantee —
  verified by inspecting `/out` directory HTML).
- **SC-008**: A visitor with `prefers-reduced-motion: reduce` enabled experiences zero
  animations or transitions on any page.
- **SC-009**: The `sitemap.xml` generated at build time contains entries for all public
  routes, and `robots.txt` points to its URL.
- **SC-010**: All external links on the site use `rel="noopener noreferrer"` —
  verified by full-site HTML audit.

---

## Assumptions

- Portfolio project content (actual case studies) will be provided by Dustin separately
  (Phase 0 dependency). This spec covers the structural model and templates; real content
  is not a prerequisite for the architecture work.
- The Lab section navigation item will be a leaf (no sub-items) in Phase 1. Individual
  micro-app entries will be added in a subsequent feature branch.
- Kinetic typography is limited to entrance animations on headings (fade-up or character
  build-in). Complex scroll-triggered animations are out of scope for this phase.
- The Privacy and Terms pages will contain real content authored by Dustin. Placeholder
  text is acceptable for the initial commit but must be replaced before merging to `main`.
- Strava integration data is out of scope for this feature. The Cycling sub-page under
  Activity will be a stub or existing blog layout until Phase 6 is implemented.
