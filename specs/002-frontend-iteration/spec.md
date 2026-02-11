# Feature Specification: Fix Landing Page Nav Alignment and Add Full Site Navigation

**Feature Branch**: `002-frontend-iteration`
**Created**: 2026-02-11
**Status**: Draft
**Input**: User description: "Fix landing page nav alignment and broken nav links with mock subpages. Add sub-pages per WebsiteFlow.md: Work (Resume, Photography, Video), Play (Cycling, Tech, Volunteering), Contact, About"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Centered Navigation Links on Landing Page (Priority: P1)

A visitor arrives at the personal website and sees the profile photo and name prominently displayed. Below the name, the navigation links — Work, Play, Contact, and About — appear horizontally centered, creating a visually balanced and symmetrical layout that reinforces the sparse, minimal design aesthetic of the site.

**Why this priority**: The landing page is the first impression for every visitor. Misaligned navigation creates a sense of broken or unpolished design, undermining the portfolio's credibility. Fixing alignment is a prerequisite for any further layout testing.

**Independent Test**: Can be fully tested by loading the landing page and visually confirming that the four navigation links are center-aligned under the profile photo and name, with equal visual margins on both sides.

**Acceptance Scenarios**:

1. **Given** a visitor loads the landing page, **When** they view the profile photo, name, and navigation links, **Then** the navigation links (Work, Play, Contact, About) appear horizontally centered beneath the name
2. **Given** a visitor views the landing page on a standard desktop viewport, **When** they visually inspect the layout, **Then** the navigation links have equal spacing on both left and right sides relative to the profile photo above them
3. **Given** a visitor views the landing page on a mobile viewport, **When** they view the navigation section, **Then** the navigation links remain centered and do not appear left-shifted

---

### User Story 2 - Functional Navigation to Mock Subpages (Priority: P2)

A visitor on the landing page clicks any of the four navigation links (Work, Play, Contact, or About) and is taken to the corresponding page. Each destination page loads successfully and displays enough structure and placeholder content to allow the site owner to evaluate and test subpage layouts before adding real content.

**Why this priority**: Broken navigation links prevent layout testing and give visitors dead ends. Mock pages with real routing allow the site structure to be validated end-to-end, even before final content is ready.

**Independent Test**: Can be fully tested by clicking each of the four navigation links from the landing page and confirming each lands on a distinct, accessible page with a title and placeholder content.

**Acceptance Scenarios**:

1. **Given** a visitor is on the landing page, **When** they click the "Work" navigation link, **Then** they are taken to the Work page without errors
2. **Given** a visitor is on the landing page, **When** they click the "Play" navigation link, **Then** they are taken to the Play page without errors
3. **Given** a visitor is on the landing page, **When** they click the "Contact" navigation link, **Then** they are taken to the Contact page without errors
4. **Given** a visitor is on the landing page, **When** they click the "About" navigation link, **Then** they are taken to the About page without errors
5. **Given** a visitor lands directly on any subpage URL (e.g., `/work`), **When** the page loads, **Then** it displays correctly without errors
6. **Given** a visitor is on any subpage, **When** they view the page, **Then** the sidebar displays the site owner's name as a link that navigates to the landing page

---

### User Story 3 - Navigation to Work Sub-pages (Priority: P3)

A visitor on the Work page sees three clear navigation links — Resume, Photography, and Video — and can access each of those sub-pages. Each sub-page loads successfully with a title and placeholder content that represents its purpose, and provides a clear path back to both the Work section and the landing page.

**Why this priority**: Work is the primary professional showcase section. Its sub-pages (Resume, Photography, Video) represent the core portfolio content. Before adding real content, the routing and layout hierarchy must be established and testable.

**Independent Test**: Can be fully tested by visiting the Work page and confirming three sub-section links are present and each leads to a distinct, accessible page with appropriate placeholder content.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Work page, **When** they view the page, **Then** the sidebar displays navigation links to Resume, Photography, and Video sub-sections
2. **Given** a visitor clicks the "Resume" link from the sidebar on the Work page, **When** the page loads, **Then** they see the Resume page with a title and placeholder content
3. **Given** a visitor clicks the "Photography" link from the sidebar on the Work page, **When** the page loads, **Then** they see the Photography page with a title and placeholder content
4. **Given** a visitor clicks the "Video" link from the sidebar on the Work page, **When** the page loads, **Then** they see the Video page with a title and placeholder content
5. **Given** a visitor is on any Work sub-page (Resume, Photography, or Video), **When** they view the page, **Then** the sidebar displays a clear path back to the Work section page
6. **Given** a visitor navigates directly to a Work sub-page URL (e.g., `/resume`), **When** the page loads, **Then** it displays correctly without errors and the sidebar shows the Work sub-navigation

---

### User Story 4 - Navigation to Play Sub-pages (Priority: P4)

A visitor on the Play page sees three navigation links — Cycling, Tech, and Volunteering — and can access each of those sub-pages. Each sub-page loads with a title and placeholder content representing its purpose, with clear navigation back to Play and to the landing page.

**Why this priority**: Play communicates personal interests and character. Its sub-pages need the same routing skeleton as Work sub-pages before real content is authored. Lower priority than Work because professional content typically takes precedence in a portfolio context.

**Independent Test**: Can be fully tested by visiting the Play page and confirming three sub-section links are present and each leads to a distinct, accessible page.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Play page, **When** they view the page, **Then** the sidebar displays navigation links to Cycling, Tech, and Volunteering sub-sections
2. **Given** a visitor clicks the "Cycling" link from the sidebar on the Play page, **When** the page loads, **Then** they see the Cycling page with a title and placeholder content
3. **Given** a visitor clicks the "Tech" link from the sidebar on the Play page, **When** the page loads, **Then** they see the Tech page with a title and placeholder content
4. **Given** a visitor clicks the "Volunteering" link from the sidebar on the Play page, **When** the page loads, **Then** they see the Volunteering page with a title and placeholder content
5. **Given** a visitor is on any Play sub-page (Cycling, Tech, or Volunteering), **When** they view the page, **Then** the sidebar displays a clear path back to the Play section page
6. **Given** a visitor navigates directly to a Play sub-page URL (e.g., `/cycling`), **When** the page loads, **Then** it displays correctly without errors and the sidebar shows the Play sub-navigation

---

### Edge Cases

- What happens when a visitor navigates directly to a sub-page URL (e.g., `/about`, `/resume`) by typing it in the browser?
- How do the navigation links appear at narrow viewport widths (e.g., 320px mobile)?
- Does centering remain consistent if the name or photo is replaced with content of a different width?
- What happens if a visitor navigates to a non-existent route (e.g., `/work/nonexistent`)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Navigation links (Work, Play, Contact, About) on the landing page MUST be horizontally centered relative to the profile photo and name displayed above them
- **FR-002**: Each navigation link (Work, Play, Contact, About) MUST successfully navigate to its corresponding destination page when clicked
- **FR-003**: A Work page MUST exist and be accessible via the Work navigation link, displaying placeholder content that represents the section's purpose
- **FR-004**: A Play page MUST exist and be accessible via the Play navigation link, displaying placeholder content that represents the section's purpose
- **FR-005**: A Contact page MUST exist and be accessible via the Contact navigation link, displaying placeholder content that represents the section's purpose
- **FR-006**: An About page MUST exist and be accessible via the About navigation link, displaying placeholder content that represents the section's purpose
- **FR-007**: All mock pages MUST display a page title identifying which section the visitor is viewing
- **FR-008**: All mock pages MUST provide a navigational path back to the landing page
- **FR-009**: When on the Work page or any Work sub-page, the sidebar MUST display navigation links to Resume, Photography, and Video sub-sections
- **FR-010**: A Resume page MUST exist under the Work section, accessible from the Work page and via direct URL (e.g., `/resume`), displaying placeholder content
- **FR-011**: A Photography page MUST exist under the Work section, accessible from the Work page and via direct URL (e.g., `/photography`), displaying placeholder content
- **FR-012**: A Video page MUST exist under the Work section, accessible from the Work page and via direct URL (e.g., `/video`), displaying placeholder content
- **FR-013**: When on the Play page or any Play sub-page, the sidebar MUST display navigation links to Cycling, Tech, and Volunteering sub-sections
- **FR-014**: A Cycling page MUST exist under the Play section, accessible from the Play page and via direct URL (e.g., `/cycling`), displaying placeholder content
- **FR-015**: A Tech page MUST exist under the Play section, accessible from the Play page and via direct URL (e.g., `/tech`), displaying placeholder content
- **FR-016**: A Volunteering page MUST exist under the Play section, accessible from the Play page and via direct URL (e.g., `/volunteering`), displaying placeholder content
- **FR-017**: When on a Work or Play sub-page, the sidebar MUST provide a navigational path back to the parent section page (Work or Play respectively), implemented via the sidebar's context-aware sub-navigation — not via inline back-links in the main content area
- **FR-018**: All Work and Play sub-pages MUST provide a navigational path back to the landing page *(complements FR-017 — FR-017 covers back to parent section; FR-018 covers back to landing)*

### Apple HIG Compliance Requirements *(mandatory for design/UI features)*

- **HIG-001**: Navigation layout MUST comply with HIG Foundations: Layout — spatial organization ensures visual hierarchy with the profile section anchoring the page and navigation links subordinate and centered below it
- **HIG-002**: Navigation links MUST follow HIG Patterns: Feedback — interactive elements must have clear affordances indicating they are tappable/clickable
- **HIG-003**: Visual alignment MUST comply with HIG Foundations: Layout — consistent alignment creates a sense of order and reinforces the minimal design aesthetic
- **HIG-004**: Section and sub-section navigation hierarchy MUST comply with HIG Components: Navigation and Search — breadcrumb or back-navigation patterns must clearly communicate the user's location within the site hierarchy

*Design review checklist:*

- [ ] Spatial conformance with HIG Layout principles
- [ ] Color contrast per HIG Color and Accessibility guidelines
- [ ] Navigation patterns align with HIG Components: Navigation and Search
- [ ] Interactive elements have proper affordances per HIG Patterns: Feedback

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Navigation links (Work, Play, Contact, About) are visually centered under the profile photo and name on the landing page, confirmed on both desktop and mobile viewports
- **SC-002**: All 4 navigation links successfully route to their respective destination pages with zero navigation errors
- **SC-003**: All 4 mock pages load without errors and display a section title and placeholder content
- **SC-004**: A visitor can navigate from the landing page to any top-level page (Work, Play, Contact, About) and return to the landing page within 2 interactions
- **SC-005**: All 3 Work sub-pages (Resume, Photography, Video) are accessible from the Work page with zero navigation errors
- **SC-006**: All 3 Play sub-pages (Cycling, Tech, Volunteering) are accessible from the Play page with zero navigation errors
- **SC-007**: A visitor can navigate from the landing page to any Work or Play sub-page and return to the landing page within 3 interactions
- **SC-008**: All 8 sub-pages (Resume, Photography, Video, Cycling, Tech, Volunteering, Contact, About) load without errors when accessed directly by URL

## Assumptions

- "Centered" means horizontally centered relative to the profile/header section of the landing page, not necessarily full-page width centering
- Mock pages require only minimal placeholder content (page title, brief description) — no real portfolio content, contact forms, or bio is needed at this stage
- All four top-level navigation links (Work, Play, Contact, About) currently exist in the implementation but their routes are either missing or not wired correctly
- Sub-page URLs follow a flat path convention: `/resume`, `/photography`, `/video`, `/cycling`, `/tech`, `/volunteering`. (Earlier drafts assumed nested paths like `/work/resume`; flat paths were adopted because all six sub-pages already existed at flat routes — see URL Routing Strategy Decision in plan.md.)
- Sub-section navigation (links to Resume/Photography/Video and Cycling/Tech/Volunteering) and all parent-section back-navigation live exclusively in the sidebar — not in the main content area of any page
- The sidebar is context-aware: it auto-expands and displays the relevant sub-navigation based on the current pathname, without requiring the user to manually open a menu
- All page layouts (section pages and sub-pages) should reflect the existing site's design language (sparse, minimal, consistent with current site chrome); section pages contain only a title and description with no inline navigation links
- Contact and About remain flat pages with no sub-sections (as per WebsiteFlow.md)
