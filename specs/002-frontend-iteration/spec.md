# Feature Specification: Remediate Mobile Layout, Security Policy, and Delivery Compliance Gaps

**Feature Branch**: `002-frontend-iteration`  
**Created**: 2026-02-11  
**Status**: Draft  
**Input**: User description: "Conduct comprehensive review, accept valid findings, and update spec/plan/tasks then implement"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Usable Mobile Navigation and Content Layout (Priority: P1)

A visitor browsing on a narrow viewport (including 320px wide devices) can access any page and read content without the sidebar consuming almost all horizontal space.

**Why this priority**: This is a direct usability failure that blocks core content consumption on mobile.

**Independent Test**: Open `/work`, `/play`, `/resume`, and `/cycling` at 320px width and confirm content lines are readable without the effective content area collapsing to a narrow column.

**Acceptance Scenarios**:

1. **Given** a visitor is on a subpage at 320px width, **When** the page renders, **Then** main content is readable and not squeezed into a sidebar-sized remainder.
2. **Given** a visitor navigates between `/` and subpages, **When** route changes occur, **Then** layout mode (landing vs. content view) stays consistent with the current route.
3. **Given** a visitor returns to `/`, **When** the page renders, **Then** the landing experience remains visually centered and navigable.

---

### User Story 2 - Secure CSP That Still Allows Intended Media (Priority: P1)

A visitor can view embedded portfolio videos while the site maintains strict CSP posture aligned with the constitution (no unsafe-inline/unsafe-eval).

**Why this priority**: Security policy and functional media rendering are both constitutional requirements.

**Independent Test**: Load `/video` with CSP enabled and confirm YouTube/Vimeo embeds render while CSP violations do not block intended frame content.

**Acceptance Scenarios**:

1. **Given** the visitor opens `/video`, **When** video cards load, **Then** iframe embeds from approved providers render.
2. **Given** CSP is declared in layout metadata and header config, **When** policies are inspected, **Then** they omit `unsafe-inline` and `unsafe-eval`.
3. **Given** CSP is inspected, **When** directives are checked, **Then** only required sources are whitelisted, including frame sources for approved providers.

---

### User Story 3 - Accessible Typography and Placeholder Content Integrity (Priority: P2)

A visitor sees readable body text on mobile and functional photography placeholders rather than broken images while real assets are still pending.

**Why this priority**: Accessibility/readability and content integrity are baseline quality requirements.

**Independent Test**: Open pages on mobile and confirm body text remains at least 16px equivalent; open `/photography` and confirm placeholders render from local assets.

**Acceptance Scenarios**:

1. **Given** mobile viewport mode is active, **When** body content renders, **Then** effective body font size is not below 16px.
2. **Given** portfolio photos are not yet finalized, **When** `/photography` is loaded, **Then** local placeholder images render successfully with descriptive alt text.
3. **Given** static export build runs, **When** assets are emitted, **Then** placeholder image paths resolve with no 404 references in configured data.

---

### User Story 4 - Delivery Pipeline Governance and Clean Quality Gates (Priority: P2)

The maintainer can rely on CI/CD and dependency governance controls that align with the constitution, and local quality gates run cleanly.

**Why this priority**: Security and reliability requirements explicitly require pinned workflow actions, Dependabot, and passing lint/build checks.

**Independent Test**: Inspect workflows for pinned SHAs, confirm `.github/dependabot.yml` exists, and run lint/build/audit successfully.

**Acceptance Scenarios**:

1. **Given** GitHub Actions workflows are reviewed, **When** action references are inspected, **Then** they are pinned by commit SHA (not floating tags).
2. **Given** repository automation is reviewed, **When** dependency governance files are inspected, **Then** Dependabot configuration exists for npm and GitHub Actions.
3. **Given** quality checks are run, **When** lint/build/audit execute, **Then** they pass with no lint warnings.

### Edge Cases

- What happens when a visitor uses browser back/forward after manually toggling sidebar states?
- How does the mobile layout behave at 320px in both portrait and landscape?
- What happens when CSP is strict but a future video provider is added without whitelist updates?
- How does static export behave when placeholder assets are replaced by production images later?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Subpage layout MUST remain usable at 320px width with readable main content area.
- **FR-002**: Sidebar and main content layout MUST adapt responsively so desktop sidebar behavior does not collapse mobile content width.
- **FR-003**: Route changes MUST synchronize layout state so home and subpage presentation remain correct during direct loads and browser history navigation.
- **FR-004**: Landing page navigation experience MUST remain centered and functional after responsive layout remediation.
- **FR-005**: CSP declarations MUST allow approved embedded video frame origins required by `/video`.
- **FR-006**: CSP declarations MUST NOT include `unsafe-inline` or `unsafe-eval` directives.
- **FR-007**: CSP declarations MUST include core restrictive directives required by constitution security standards (`default-src`, `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, `frame-ancestors`, `base-uri`, `form-action`).
- **FR-008**: Video embeds MUST continue to load from privacy-conscious approved domains (`youtube-nocookie` and Vimeo player domain).
- **FR-009**: Mobile body text size MUST remain at least 16px equivalent.
- **FR-010**: Placeholder image assets for photography MUST exist in `public/images/portfolio` and be referenced by `app/data/photos.ts` until real assets are provided.
- **FR-011**: Lint checks MUST pass with zero warnings.
- **FR-012**: Build checks MUST pass with static export output.
- **FR-013**: `npm audit` MUST report zero high/critical issues at merge time.
- **FR-014**: GitHub workflow actions MUST be pinned to specific commit SHAs.
- **FR-015**: Dependabot configuration MUST exist to monitor npm and workflow dependencies.
- **FR-016**: Static-first architecture (`output: 'export'`) MUST remain unchanged.

### Apple HIG Compliance Requirements *(mandatory for design/UI features)*

- **HIG-001**: Responsive layout changes MUST preserve clear spatial organization per HIG Foundations: Layout.
- **HIG-002**: Mobile readability MUST preserve typographic clarity and hierarchy per HIG Foundations: Typography.
- **HIG-003**: Interactive navigation states MUST remain discoverable and accessible per HIG Components: Navigation and Search.
- **HIG-004**: Focus and interaction behavior MUST remain compatible with HIG Foundations: Accessibility, including keyboard navigation and reduced-motion behavior already implemented.

*Design review checklist:*
- [ ] Spatial conformance with HIG Layout principles
- [ ] Color contrast per HIG Color and Accessibility guidelines
- [ ] Navigation patterns align with HIG Components: Navigation and Search
- [ ] Interactive elements have proper affordances per HIG Patterns: Feedback
- [ ] Dark mode support preserved per HIG Foundations: Dark Mode
- [ ] Reduced-motion support preserved per HIG Foundations: Accessibility

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On 320px width, `/work`, `/play`, `/resume`, and `/cycling` display readable content with no narrow-column collapse caused by desktop sidebar offsets.
- **SC-002**: Navigating between `/` and any subpage keeps layout state aligned with route without stale sidebar state artifacts.
- **SC-003**: `/video` renders all configured embeds successfully under active CSP.
- **SC-004**: CSP declarations in `app/layout.tsx` and `public/_headers` contain no `unsafe-inline`/`unsafe-eval` and include required restrictive directives plus approved frame sources.
- **SC-005**: Body text renders at >=16px on mobile breakpoints.
- **SC-006**: `/photography` resolves configured placeholder images with no broken references.
- **SC-007**: `npm run lint` passes with zero warnings.
- **SC-008**: `npm run build` succeeds and statically prerenders routes.
- **SC-009**: `npm audit --audit-level=high` reports zero vulnerabilities.
- **SC-010**: All GitHub workflow `uses:` entries are pinned to commit SHAs.
- **SC-011**: `.github/dependabot.yml` is present and valid for npm + GitHub Actions ecosystems.

## Assumptions

- Photography assets are intentionally placeholder-only for now; production images will be swapped in a later content pass.
- GitHub Pages header limitations remain a hosting constraint; repo-level header policy files are still maintained for migration readiness and local policy parity.
- Existing dark mode and reduced-motion implementations are retained unless remediation work directly affects them.
