# Feature Specification: Fix Landing Page Nav Alignment and Navigation Links

**Feature Branch**: `002-frontend-iteration`
**Created**: 2026-02-11
**Status**: Draft
**Input**: User description: "Fix landing page nav alignment and broken nav links with mock subpages"

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
6. **Given** a visitor is on any subpage, **When** they view the page, **Then** there is a clear way to return to the landing page (via navigation or branding)

---

### Edge Cases

- What happens when a visitor navigates directly to a subpage URL (e.g., `/about`) by typing it in the browser?
- How do the navigation links appear at narrow viewport widths (e.g., 320px mobile)?
- Does centering remain consistent if the name or photo is replaced with content of a different width?

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

### Apple HIG Compliance Requirements *(mandatory for design/UI features)*

- **HIG-001**: Navigation layout MUST comply with HIG Foundations: Layout — spatial organization ensures visual hierarchy with the profile section anchoring the page and navigation links subordinate and centered below it
- **HIG-002**: Navigation links MUST follow HIG Patterns: Feedback — interactive elements must have clear affordances indicating they are tappable/clickable
- **HIG-003**: Visual alignment MUST comply with HIG Foundations: Layout — consistent alignment creates a sense of order and reinforces the minimal design aesthetic

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
- **SC-004**: A visitor can navigate from the landing page to any subpage and return to the landing page within 2 interactions

## Assumptions

- "Centered" means horizontally centered relative to the profile/header section of the landing page, not necessarily full-page width centering
- Mock subpages require only minimal placeholder content (page title, brief description) — no real portfolio content, contact forms, or bio is needed at this stage
- All four navigation links (Work, Play, Contact, About) currently exist in the implementation but their routes are either missing or not wired correctly
- The existing site navigation structure will be preserved; no new navigation patterns are introduced
- Subpage layouts should reflect the existing site's design language (sparse, minimal, consistent with current site chrome)
