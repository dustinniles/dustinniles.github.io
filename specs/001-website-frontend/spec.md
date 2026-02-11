# Feature Specification: Apply Apple HIG Amendments to Portfolio Website Frontend

**Feature Branch**: `001-website-frontend`  
**Created**: 2026-02-11  
**Status**: In Progress  
**Input**: User description: "Revise specification to reflect Apple HIG amendments to constitution"

**Context**: The project constitution was amended on 2026-02-11 to establish Apple Human Interface Guidelines (HIG) as the primary design authority for the portfolio website. This specification defines how the existing 001-website-frontend feature must be revised to comply with HIG Principle I and ensures all current and future design decisions align with HIG standards.

## Clarifications

### Session 2026-02-11

- Q: Should the feature start with a baseline audit of the current design state, or assume all violations need fixing? → A: Conduct a full baseline audit first—review current design, document compliance gaps per HIG section, then create a prioritized fix list
- Q: What is the current typographic baseline in the existing codebase? → A: Inspect existing code first to determine if codebase uses px or rem units and base font size (will be determined during plan phase)
- Q: For dark mode color mapping approach? → A: Dual palette approach—maintain two separate, independently designed palettes (one light, one dark) each adhering to HIG principles
- Q: Which accessibility testing tools are mandatory vs. optional? → A: Defer testing strategy to implementation plan—let implementation team scope testing based on findings during development

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Design Review Against HIG Foundations (Priority: P1)

The portfolio website's visual design, layout, and typography must be reviewed and revised to ensure compliance with Apple's HIG Foundations standards. This includes layout spacing, color usage and contrast, dark mode support, and accessibility features. Visitors should experience a design that feels professional, consistent with Apple's design language, and accessible to all users.

**Why this priority**: HIG Foundations form the visual and interaction foundation of the entire site. Without this baseline review and correction, all subsequent design decisions will be misaligned with the constitution's primary principle.

**Independent Test**: Can be fully tested by conducting a comprehensive design review against each HIG Foundations section (Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing), documenting any deviations, and verifying that corrected designs conform to HIG standards before being deployed.

**Acceptance Scenarios**:

1. **Given** the portfolio website layout is reviewed against HIG Layout principles, **When** examining spacing, margins, and safe areas, **Then** all spacing must follow HIG spacing standards (8px base unit, multiples thereof)
2. **Given** the color palette is reviewed, **When** checking text contrast ratios, **Then** all text must meet WCAG 4.5:1 for normal text and 3:1 for large text (HIG requirement)
3. **Given** the Typography section is reviewed, **When** examining font sizes and hierarchy, **Then** font sizing must follow HIG typography hierarchy (using relative scaling where appropriate)
4. **Given** dark mode support is implemented, **When** users enable system dark mode, **Then** the site must display in a dark appearance with sufficient contrast maintained
5. **Given** accessibility features are verified, **When** testing keyboard navigation and screen reader compatibility, **Then** all interactive elements must be discoverable and operable via keyboard only
6. **Given** the About section contains writing content, **When** reviewing tone and clarity, **Then** all copy must follow HIG writing principles: clear, concise, direct language without jargon

---

### User Story 2 - Component and Navigation Pattern Alignment (Priority: P2)

The navigation structure, menu interactions, and content presentation patterns must be reviewed to ensure they align with HIG Components standards. This includes sidebar navigation patterns, menu item affordances, feedback mechanisms, and content hierarchy. Visitors should understand how to navigate intuitively without confusion.

**Why this priority**: Navigation and component patterns directly impact user experience and discoverability. HIG compliance ensures navigation feels native and intuitive to Apple device users.

**Independent Test**: Can be fully tested by comparing the current navigation structure against HIG Components: Navigation and Search guidelines, verifying that menu items have clear affordances (visual indicators of clickability), that feedback is provided for user interactions (hover states, active states), and that the information hierarchy follows HIG standards.

**Acceptance Scenarios**:

1. **Given** the sidebar navigation is reviewed, **When** examining menu items, **Then** each menu item must have a clear affordance indicating it is clickable (sufficient visual weight, color contrast, or interactive indicator)
2. **Given** menu animations are reviewed, **When** users click menu items, **Then** animations must provide appropriate feedback and follow HIG motion principles (no jarring movements, appropriate timing)
3. **Given** the content hierarchy is reviewed, **When** examining page layouts, **Then** the visual hierarchy must clearly distinguish primary content, secondary content, and supporting information
4. **Given** information architecture is evaluated, **When** reviewing the menu structure and page organization, **Then** the structure must be intuitive and follow HIG patterns for organizing information
5. **Given** the Photography gallery is reviewed, **When** examining interaction patterns, **Then** the scroll-snap behavior must provide appropriate feedback and follow HIG scrolling patterns

---

### User Story 3 - Dark Mode Implementation (Priority: P3)

The portfolio website must support both light and dark appearances with full visual fidelity in both modes. Colors, typography, images, and all interactive elements must be carefully considered for dark mode viewing. Users with dark mode enabled should experience no readability issues or broken layouts.

**Why this priority**: Dark mode support is mandatory per HIG Foundations: Dark Mode. While less critical than basic HIG compliance, it's essential for accessibility and modern user expectations.

**Independent Test**: Can be fully tested by enabling system dark mode on test devices/browsers, navigating through all pages, and verifying that colors maintain sufficient contrast, images remain visible and appropriately tonally adjusted, and the layout remains intact without any visual breaking.

**Acceptance Scenarios**:

1. **Given** the site is loaded with system dark mode enabled, **When** the page renders, **Then** all background colors must be dark (not pure black to reduce eye strain per HIG)
2. **Given** text is displayed in dark mode, **When** reading content, **Then** text contrast must remain ≥ 4.5:1 with dark backgrounds
3. **Given** the sidebar and header are displayed in dark mode, **When** examining colors, **Then** any accent colors must remain visually distinct against dark backgrounds
4. **Given** images are displayed in dark mode, **When** viewing Photography gallery content, **Then** images must remain visible and properly visible without color degradation
5. **Given** interactive elements are displayed in dark mode, **When** hovering over or focusing on elements, **Then** hover and focus states must be clearly visible in dark appearance

---

### User Story 4 - Accessibility Compliance Review (Priority: P4)

The portfolio website must meet WCAG 2.1 Level AA accessibility standards as required by HIG Foundations: Accessibility. This includes keyboard navigation, screen reader compatibility, color contrast, motion accessibility, and semantic HTML structure. Visitors with disabilities or different abilities should be able to access all content without barriers.

**Why this priority**: Accessibility is both an ethical requirement and a HIG mandate. This ensures the portfolio is inclusive to all visitors.

**Independent Test**: Can be fully tested using automated accessibility scanners (Lighthouse, axe DevTools) for contrast and semantic issues, manual keyboard navigation testing, and screen reader testing on at least one screen reader (NVDA, JAWS, or VoiceOver).

**Acceptance Scenarios**:

1. **Given** keyboard navigation is tested, **When** navigating using Tab and Enter keys only, **Then** all interactive elements must be reachable and operable
2. **Given** focus indicators are evaluated, **When** using keyboard navigation, **Then** focus indicators must be clearly visible with sufficient contrast (not just relying on default browser outlines)
3. **Given** semantic HTML is reviewed, **When** examining page structure, **Then** headings must use proper hierarchy (h1, h2, h3 in order), landmarks must be used appropriately (nav, main, footer), and form elements must have associated labels
4. **Given** screen reader testing is performed, **When** using a screen reader to navigate, **Then** all page content, navigation, and interactive elements must be properly announced
5. **Given** motion-based interactions are reviewed, **When** users have reduced-motion preference enabled, **Then** animations and transitions must be disabled or significantly reduced per HIG Accessibility guidelines
6. **Given** color is used to convey information, **When** examining the design, **Then** color alone must not be the only way to convey information—alternative visual indicators or text must be provided

---

### User Story 5 - IBM Plex Font Implementation and Typography Verification (Priority: P5)

The portfolio website must use IBM Plex Mono (SIL OFL 1.1) as the primary font family. Other fonts within the IBM Plex family may supplement where appropriate, but IBM Plex Mono is the standard. All HIG typography hierarchy and readability standards must be met. Font sizing, weights, line heights, and letter spacing must follow HIG guidelines. Users should experience clear, readable typography that maintains the minimal aesthetic while being fully accessible.

**Why this priority**: Typography directly impacts readability and professional presentation. IBM Plex Mono is the primary typeface, ensuring HIG-compliant sizing and hierarchy is essential.

**Independent Test**: Can be tested by verifying IBM Plex Mono is the primary font loaded, checking that font sizes follow HIG sizing standards (using relative units like rem), confirming line heights are ≥ 1.5 for body text per WCAG, and validating that text remains readable across all screen sizes.

**Acceptance Scenarios**:

1. **Given** the site loads, **When** examining network requests, **Then** IBM Plex Mono must be the primary font loaded (no external CDN fonts)
2. **Given** body text is displayed, **When** measuring font size, **Then** body text must be ≥ 16px (or equivalent in rem) for readability per HIG
3. **Given** headings are displayed, **When** examining hierarchy, **Then** heading sizes must use a clear scaling hierarchy (h1 > h2 > h3 with visible size differences)
4. **Given** line height is measured, **When** examining text readability, **Then** line height must be ≥ 1.5x font size for body text to ensure readability
5. **Given** text is displayed on small screens, **When** resizing the viewport to mobile dimensions, **Then** font sizes must remain readable without horizontal scrolling (no font size smaller than 16px)

---

### User Story 6 - Inclusion and Diverse User Support (Priority: P6)

The portfolio website must be designed to be inclusive and welcoming to visitors from diverse backgrounds. This includes ensuring the design doesn't perpetuate biases, uses inclusive language, and supports diverse input methods and abilities. Content and design should reflect and respect diversity.

**Why this priority**: HIG Foundations: Inclusion requires consideration of diverse users. This ensures the portfolio is welcoming to all visitors and demonstrates values of inclusivity.

**Independent Test**: Can be tested by reviewing copy for inclusive language (avoiding gendered or biased terms), ensuring imagery (if any) represents diversity, and verifying that the design doesn't assume user abilities or backgrounds.

**Acceptance Scenarios**:

1. **Given** all copy on the site is reviewed, **When** examining language used, **Then** language must be inclusive and avoid gendered, biased, or exclusionary terms
2. **Given** images and photography are displayed, **When** reviewing visual content, **Then** imagery must not perpetuate stereotypes or biases (if applicable to portfolio content)
3. **Given** interaction design is reviewed, **When** examining how users interact with the site, **Then** the design must accommodate diverse input methods (touch, keyboard, mouse, voice if applicable)
4. **Given** the About or biographical content is reviewed, **When** examining information presented, **Then** content should provide context about background and values without making assumptions about user backgrounds

---

### Edge Cases

- What happens when a user has system dark mode enabled but the browser doesn't support CSS media queries? (Should display light mode as safe fallback)
- How does the site behave when JavaScript is disabled? (Should maintain core navigation functionality with HTML-only fallbacks)
- What happens when a user with reduced-motion preference loads the site? (Should disable animations and transitions per HIG)
- How does text rendering appear on high-DPI displays? (Should remain crisp and readable, fonts should scale appropriately)
- What happens when extended Latin characters or diacritics are needed in names or content? (IBM Plex Sans should support these correctly)
- How does the Photography gallery handle high-resolution images on dark mode? (Images should render appropriately without color shift)

## Requirements *(mandatory)*

### Functional Requirements

#### Design Review and HIG Compliance
- **FR-001**: System MUST conduct a comprehensive baseline audit of current design state, documenting which HIG Foundations standards (Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing) are currently met, which have gaps, and prioritizing fixes accordingly
- **FR-002**: All spacing and layout MUST conform to HIG spacing standards using 8px base units and multiples thereof
- **FR-003**: All text MUST have sufficient color contrast per WCAG standards (4.5:1 for normal text, 3:1 for large text) in both light and dark modes
- **FR-004**: All typography MUST follow HIG typography hierarchy with clearly distinct sizing levels
- **FR-005**: Typography MUST use IBM Plex Mono as the primary typeface, sourced from @fontsource with no external CDN dependencies; other IBM Plex family members may supplement
- **FR-006**: Body text MUST be ≥ 16px (or equivalent in rem) for core readability
- **FR-007**: Line height for body text MUST be ≥ 1.5x font size for optimal readability

#### Navigation and Component Patterns
- **FR-008**: Navigation structure MUST align with HIG Components: Navigation and Search patterns
- **FR-009**: All menu items and interactive elements MUST have clear affordances indicating interactivity
- **FR-010**: Menu animations MUST provide appropriate user feedback and follow HIG motion principles
- **FR-011**: Content hierarchy MUST be visually distinct and follow HIG information architecture patterns
- **FR-012**: The Photography gallery scroll-snap behavior MUST provide appropriate feedback per HIG patterns

#### Dark Mode Support
- **FR-013**: System MUST support both light and dark appearances using CSS media query `prefers-color-scheme` with two independently designed color palettes (light and dark)
- **FR-014**: Dark mode palette MUST be designed as a separate, intentional palette (not inverted from light) with backgrounds using dark grays (not pure black #000 per HIG to reduce eye strain) and all colors meeting WCAG 4.5:1 contrast requirements
- **FR-015**: All interactive elements MUST remain visually distinct and properly afforded in both light and dark modes, with affordances tested in each palette
- **FR-016**: Images MUST remain visible and properly displayed in dark mode without color degradation; images must be tested in both light and dark appearances

#### Accessibility Requirements (WCAG 2.1 Level AA)
- **FR-017**: All interactive elements MUST be keyboard accessible (Tab, Enter, Escape navigation)
- **FR-018**: Focus indicators MUST be clearly visible with adequate contrast ratio (≥ 3:1)
- **FR-019**: Heading hierarchy MUST be semantic and properly structured (h1 → h2 → h3 in order)
- **FR-020**: Page landmarks MUST be properly implemented (nav, main, footer elements)
- **FR-021**: All form labels (including mailto: links) MUST be properly associated or described
- **FR-022**: Screen reader compatibility MUST be verified (all content and navigation discoverable via screen readers)
- **FR-023**: Images MUST have descriptive alt text (Photography gallery images MUST have alt text)
- **FR-024**: Motion-based interactions MUST respond to `prefers-reduced-motion` preference and disable/reduce animations
- **FR-025**: Color MUST not be the sole means of conveying information (use text labels, patterns, or icons in addition to color)
- **FR-026**: Skip links or equivalent navigation must be available to bypass repetitive content

#### Inclusion and Diverse User Support
- **FR-027**: All copy on the site MUST use inclusive language avoiding biased or exclusionary terms
- **FR-028**: Design patterns MUST accommodate diverse input methods and abilities
- **FR-029**: If imagery is used (beyond portfolio content), it MUST not perpetuate stereotypes or biases

#### Content and Security
- **FR-030**: Feature MUST NOT introduce third-party JavaScript or external scripts without explicit HIG and constitutional review
- **FR-031**: All external links MUST include `rel="noopener noreferrer"` attributes
- **FR-032**: Feature MUST maintain Content Security Policy compliance with no unsafe-inline or unsafe-eval directives

### Apple HIG Compliance Requirements *(mandatory for design/UI features)*

- **HIG-001**: Feature MUST comply with HIG Foundations: Layout for spatial organization, margins, and alignment (https://developer.apple.com/design/human-interface-guidelines/foundations/layout)
- **HIG-002**: Feature MUST comply with HIG Foundations: Color for color usage, contrast, and semantic colors (https://developer.apple.com/design/human-interface-guidelines/foundations/color)
- **HIG-003**: Feature MUST comply with HIG Foundations: Typography for font sizing and hierarchy (with IBM Plex Sans exception) (https://developer.apple.com/design/human-interface-guidelines/foundations/typography)
- **HIG-004**: Feature MUST support HIG Foundations: Dark Mode with full visual fidelity in dark appearance (https://developer.apple.com/design/human-interface-guidelines/foundations/dark-mode)
- **HIG-005**: Feature MUST comply with HIG Foundations: Accessibility for keyboard navigation, screen reader support, and WCAG 2.1 Level AA (https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility)
- **HIG-006**: Feature MUST comply with HIG Foundations: Inclusion for diverse user support and representation (https://developer.apple.com/design/human-interface-guidelines/foundations/inclusion)
- **HIG-007**: Feature MUST use HIG Foundations: Writing principles for clear, concise, direct language (https://developer.apple.com/design/human-interface-guidelines/foundations/writing)
- **HIG-008**: Feature MUST comply with HIG Components: Layout and Organization for page structure and information architecture (https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization)
- **HIG-009**: Navigation patterns MUST align with HIG Components: Navigation and Search (https://developer.apple.com/design/human-interface-guidelines/components/navigation-and-search)
- **HIG-010**: Content presentation MUST follow HIG Components: Content patterns (https://developer.apple.com/design/human-interface-guidelines/components/content)
- **HIG-011**: User feedback mechanisms MUST align with HIG Patterns: Feedback (https://developer.apple.com/design/human-interface-guidelines/patterns/feedback)
- **HIG-012**: Loading states MUST comply with HIG Patterns: Loading if applicable (https://developer.apple.com/design/human-interface-guidelines/patterns/loading)

*Design review checklist:*
- [ ] Spatial conformance with HIG Layout principles (8px unit spacing, margins, safe areas)
- [ ] Color contrast per HIG Color and Accessibility guidelines (4.5:1 normal, 3:1 large text)
- [ ] Navigation patterns align with HIG Components: Navigation and Search
- [ ] Interactive elements have clear affordances per HIG Patterns: Feedback
- [ ] Dark mode support per HIG Foundations: Dark Mode (both light and dark viable)
- [ ] Reduced-motion support per HIG Foundations: Accessibility
- [ ] Keyboard navigation fully functional per HIG Accessibility
- [ ] Screen reader compatibility verified per HIG Accessibility
- [ ] Inclusive language and design per HIG Foundations: Inclusion
- [ ] Typography uses IBM Plex Sans with HIG-compliant sizing and hierarchy
- [ ] All visual hierarchy and affordances follow HIG standards

### Key Entities *(data involved)*

This specification focuses on design review and compliance documentation rather than data creation. Key artifacts include:

- **HIG Compliance Checklist**: A comprehensive document mapping each HIG principle to the portfolio website design elements and verification status
- **Design Review Report**: Detailed findings from comparing current design against HIG standards, including specific sections reviewed, deviations found, and corrections applied
- **Dark Mode Design Specifications**: Color palette and design adjustments for dark appearance support
- **Accessibility Audit Results**: Automated and manual accessibility testing results against WCAG 2.1 Level AA

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of required HIG Foundations sections (Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing) must be reviewed and compliance status documented
- **SC-002**: All text elements must achieve WCAG contrast ratio requirements: 4.5:1 for normal text, 3:1 for large text in both light and dark modes
- **SC-003**: 100% of interactive elements must be keyboard accessible (Tab, Enter, Escape) with no dead-end navigation
- **SC-004**: All page headings must use semantic HTML heading hierarchy (h1, h2, h3) with no skipped levels
- **SC-005**: 100% of images and media must have descriptive alt text or aria-labels
- **SC-006**: Site must achieve Lighthouse Accessibility score of 100
- **SC-007**: Site must support dark mode with no broken layouts or unreadable text when system dark mode is enabled
- **SC-008**: Animations and transitions must respond to `prefers-reduced-motion` system preference
- **SC-009**: 100% of portfolio pages must maintain usable layout on screens from 320px to 2560px width
- **SC-010**: Body text must be ≥ 16px (or rem equivalent) for readability
- **SC-011**: Line height for body text must be ≥ 1.5x font size
- **SC-012**: IBM Plex Mono must be the primary font loaded (verifiable via network inspection)
- **SC-013**: No third-party JavaScript or external scripts (except for necessary functionality with SRI and constitutional review)
- **SC-014**: All HIG design review findings must be documented with specific references to HIG sections and compliance status
- **SC-015**: Focus indicators must have minimum 3:1 contrast ratio and be clearly visible
- **SC-016**: All skip links or navigation mechanisms must function to bypass repetitive content

## Amendments

### Session 2026-02-11 (Post-Implementation Fixes)

The following defects were identified and resolved after the initial implementation:

1. **Landing page text not centered** — The main content area lacked a left margin to account for the fixed 256px sidebar when expanded. Fixed by lifting sidebar state into a `SiteLayout` client wrapper that applies `margin-left: 256px` to `<main>` when the sidebar is expanded, and adding `text-center` to the landing page heading.

2. **Work and Play links not navigating** — Parent nav items with children were rendered as `<button>` elements that only toggled the sub-menu. Fixed by changing them to `<Link>` elements that navigate to `/work` and `/play` respectively while still expanding the sub-menu.

3. **Contact and About links not showing content** — The fixed sidebar overlapped the main content when collapsed (full-width), so navigated pages were hidden. Resolved by the `SiteLayout` margin fix (see item 1 above).

4. **Profile photo** — The photo placeholder has been replaced with the actual profile image from `public/images/profile/DUSTIN HEADSHOT.jpeg`.

5. **Primary font changed to IBM Plex Mono** — IBM Plex Mono is now the standard typeface. Other IBM Plex family fonts may supplement where appropriate. The `@fontsource/ibm-plex-sans` dependency has been replaced with `@fontsource/ibm-plex-mono`.

6. **SiteLayout client component introduced** — A new `components/SiteLayout.tsx` wraps `MenuSlider` and `<main>`, owning the `isExpanded` state and synchronising the sidebar width with a matching margin-left on the content area.

## Assumptions

- IBM Plex Sans is already integrated or will be integrated via @fontsource (not an external CDN)
- Current site uses Next.js 14+ with static export (output: 'export') which is compatible with HIG compliance
- No server-side rendering required; all compliance mechanisms can be achieved with static HTML/CSS/JavaScript
- Dark mode will be implemented using CSS `prefers-color-scheme` media query with two independently designed color palettes
- Current typography baseline (px vs. rem units, base font size) will be inspected during plan phase to determine unit conversion strategy
- Accessibility testing tools (Lighthouse, axe DevTools) are available for automated validation
- Testing strategy (balance of automated vs. manual testing, scope of manual testing) will be scoped during implementation planning based on findings from baseline audit
- HIG violations found during baseline audit will be prioritized and corrected as part of implementation (not just documented)

## Next Steps

1. Execute comprehensive design review against each HIG Foundations and Components section
2. Document all deviations and non-compliant elements
3. Create corrected designs and specifications for each area requiring updates
4. Implement dark mode support with proper color palette
5. Verify keyboard navigation and screen reader compatibility
6. Run automated accessibility audits and resolve any failures
7. Conduct final HIG compliance review before closing feature
