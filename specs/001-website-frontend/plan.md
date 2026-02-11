# Implementation Plan: Interactive Portfolio Website Frontend

**Branch**: `001-website-frontend` | **Date**: 2026-02-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-website-frontend/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build an interactive portfolio website frontend featuring a sliding menu navigation system, photography gallery with scroll-snap behavior, and multiple content sections. The site transitions from a centered landing menu to a left-sidebar layout, emphasizing large imagery and minimal design. Built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS 4, deployed as a static site to GitHub Pages.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19+ (current: 19.2.3)
**Primary Dependencies**: Next.js 16.1.6 (App Router), Tailwind CSS 4.x via PostCSS, IBM Plex font family
**Storage**: Static JSON/array data structures for navigation menus and portfolio items (file-based, no database)
**Testing**: ESLint for code quality, manual browser testing for animations and interactions
**Target Platform**: Static site hosted on GitHub Pages (ES2020+ browsers), responsive design 320px-2560px
**Project Type**: Web application (frontend-only, static export)

**Performance Goals**:

- First Contentful Paint < 1.5s on 3G networks
- Lighthouse Performance score ≥ 90
- Page load time < 2 seconds on 10 Mbps broadband
- Menu slide animations complete in 300ms (±50ms)
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

**Constraints**:

- MUST maintain `output: 'export'` for static site generation
- No Server Components requiring runtime
- Images unoptimized or statically optimized only
- No API routes or server-side data fetching
- All routes must be pre-renderable at build time
- Lighthouse Accessibility score = 100 (WCAG 2.1 Level AA)

**Scale/Scope**:

- Personal portfolio site (~10-15 pages/sections)
- Photography gallery (~20-50 images initially)
- 3-4 blog post sections with multiple articles each
- Single-user content management (no CMS, direct file editing)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Minimal Design First

- ✅ Design prioritizes simplicity and whitespace for portfolio focus
- ✅ Typography uses light font weights (IBM Plex)
- ✅ Grayscale color palette (gray-600, gray-900)
- ⚠️ **REQUIRES JUSTIFICATION**: Menu slide animations and content fade transitions needed for navigation UX (violates "no animations unless justified")
  - **Justification**: Slide animations provide visual continuity during navigation hierarchy changes (main menu ↔ sub-menu). Without animation, instant transitions would be disorienting and users would lose spatial context. Fade transitions prevent jarring content swaps.
- ✅ System fonts only (IBM Plex via system font stack)

### Principle II: Static-First Architecture

- ✅ Maintains `output: 'export'` for static generation
- ✅ No Server Components requiring runtime
- ✅ Images unoptimized for static export compatibility
- ✅ All routes pre-renderable at build time
- ⚠️ **NEEDS CLARIFICATION**: Contact form implementation strategy (FR-031 to FR-035 require form submission)
  - Options: (a) Static form with mailto: link, (b) Third-party form service (Formspree, Netlify Forms), (c) Client-side email via external API
  - **Resolution needed in Phase 0 research**

### Principle III: Performance & Accessibility

- ✅ Performance targets align with FCP < 1.5s, Lighthouse ≥ 90
- ✅ Accessibility score = 100 target (WCAG 2.1 AA)
- ✅ Semantic HTML required (FR-050)
- ✅ Keyboard navigation fully supported (FR-050)

### Principle IV: Content-Centric Development

- ✅ Portfolio data as editable arrays/JSON (per spec: portfolioItems in page.tsx)
- ✅ Simple image management (public/ directory)
- ✅ Navigation reflects content hierarchy 1:1
- ✅ No premature abstractions (components only when reused 2+ times)

### Principle V: Deployment Simplicity

- ✅ Uses existing GitHub Actions workflow (.github/workflows/deploy.yml)
- ✅ Push to main triggers automatic deployment
- ✅ Build failures block deployment

### Principle VI: Security & Content Integrity (CRITICAL)

**Security Verification Checklist**:

- ✅ No third-party JavaScript/CDNs (IBM Plex can be self-hosted or use system fonts)
- ⚠️ **NEEDS CLARIFICATION**: Contact form may require third-party service
  - If external service used: MUST verify service reputation, implement SRI if loading external scripts, validate service uses HTTPS
- ✅ Embedded videos from trusted sources only (YouTube/Vimeo with iframe sandboxing per SR-008)
- ✅ All dependencies verified trusted (React, Next.js, Tailwind - industry standard)
- ✅ No code evaluation or unsafe patterns
- ✅ CSP compliance maintained (no unsafe-inline, no unsafe-eval)
- ✅ External social media links use rel="noopener noreferrer" (SR-005)
- ✅ Build/deployment security via GitHub Actions
- ⚠️ **NEEDS CLARIFICATION**: Input sanitization strategy for contact form (SR-002, SR-010)

**GATE STATUS**: ⚠️ CONDITIONAL PASS - Proceed to Phase 0 with animation justification accepted. MUST resolve contact form security strategy before Phase 1.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/                          # Next.js App Router pages
├── layout.tsx               # Root layout with sidebar integration
├── page.tsx                 # Home/landing page (portfolio grid)
├── globals.css              # Global styles and Tailwind imports
├── about/
│   └── page.tsx            # About section page
├── contact/
│   └── page.tsx            # Contact form page
├── resume/
│   └── page.tsx            # Resume section page
├── photography/
│   └── page.tsx            # Photography gallery with scroll-snap
├── video/
│   └── page.tsx            # Video portfolio page
├── cycling/
│   └── page.tsx            # Cycling blog posts
├── tech/
│   └── page.tsx            # Tech blog posts
└── volunteering/
    └── page.tsx            # Volunteering blog posts

components/
├── Sidebar.tsx             # Fixed navigation sidebar (existing)
├── MenuSlider.tsx          # Animated sliding menu system (NEW)
├── PhotoGallery.tsx        # Scroll-snap photo viewer (NEW)
├── BlogLayout.tsx          # Reusable blog post layout (NEW)
└── SocialLinks.tsx         # Social media icon links (NEW)

public/
├── images/
│   ├── portfolio/          # Photography portfolio images
│   ├── profile/            # Profile photo for sidebar
│   └── blog/               # Blog post featured images
└── fonts/                  # IBM Plex self-hosted fonts (if needed)

.github/
└── workflows/
    └── deploy.yml          # Existing GitHub Actions deployment

```

**Structure Decision**: Next.js App Router structure (Option 2: Web application, frontend-only). Each content section gets a dedicated route in `/app`. The existing `Sidebar.tsx` component will be enhanced or replaced with `MenuSlider.tsx` to support hierarchical navigation and animations. New components created only when reused (e.g., `BlogLayout.tsx` for Cycling/Tech/Volunteering sections).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| ----------- | ------------ | ------------------------------------- |
| Menu slide animations (violates "no animations unless justified") | Provides visual continuity during navigation hierarchy changes (main menu ↔ sub-menu) | Instant transitions would disorient users and break spatial context. Users need to see where menu items go during hierarchy changes. |
| Content fade transitions | Prevents jarring instant content swaps when navigating between sections | Instant content replacement creates visual discontinuity and feels broken. Fade communicates "content is changing" to user. |

## Phase 0: Research & Decisions

**Goal**: Resolve all NEEDS CLARIFICATION items from Constitution Check and Technical Context.

### Research Tasks

1. **Contact Form Implementation Strategy**
   - **Question**: How to implement contact form (FR-031 to FR-035) while maintaining static-first architecture and security requirements?
   - **Options to evaluate**:
     - (a) Static mailto: link (simplest, but poor UX)
     - (b) Formspree free tier (third-party service, requires external script evaluation)
     - (c) Netlify Forms (GitHub Pages incompatible - Netlify hosting required)
     - (d) Google Forms iframe embed (third-party, potential CSP issues)
     - (e) Custom client-side email API integration (e.g., EmailJS, SendGrid client SDK)
   - **Decision criteria**: Static export compatibility, CSP compliance, no server required, acceptable security trade-offs
   - **Outcome**: Document chosen approach with security justification

2. **IBM Plex Font Loading Strategy**
   - **Question**: Self-host IBM Plex or use system font stack fallback?
   - **Options to evaluate**:
     - (a) Self-host fonts in `/public/fonts` (adds ~500KB, no external requests)
     - (b) Use system font stack only (zero overhead, but loses IBM Plex aesthetic)
     - (c) Google Fonts with SRI (violates "no third-party CDNs" without strong justification)
   - **Decision criteria**: Performance impact, constitution compliance, design fidelity
   - **Outcome**: Document chosen approach with performance measurements

3. **Embedded Video Player Strategy**
   - **Question**: Best practices for YouTube/Vimeo iframe embedding with CSP compliance and security?
   - **Options to evaluate**:
     - (a) Standard iframe embeds with sandbox attributes
     - (b) Privacy-enhanced embeds (youtube-nocookie.com)
     - (c) Lite YouTube embed (custom player with lazy loading)
   - **Decision criteria**: CSP compliance (frame-src directives), privacy, performance
   - **Outcome**: Document embed code template and CSP configuration

4. **Photo Gallery Scroll-Snap Best Practices**
   - **Question**: Optimal implementation for scroll-snap container with large images?
   - **Research areas**:
     - CSS scroll-snap-type and scroll-snap-align values
     - Image sizing strategies (viewport height, aspect ratio handling)
     - Touch gesture support and accessibility considerations
     - Performance optimization (lazy loading, image optimization)
   - **Outcome**: Document CSS patterns and component architecture

5. **Animation Performance & Accessibility**
   - **Question**: How to implement menu slide and content fade animations accessibly?
   - **Research areas**:
     - CSS transitions vs. animations for slide effects
     - prefers-reduced-motion media query handling
     - Duration and easing functions for 300ms target
     - Transform vs. position-based animations for performance
   - **Outcome**: Document animation CSS patterns and accessibility compliance

**Deliverable**: `research.md` with decisions, rationale, and alternatives considered for each task.

**Status**: ✅ Complete (see research.md)

---

## Phase 1: Design & Contracts

**Prerequisites:** ✅ research.md complete

**Goal**: Generate data model, API contracts, and quickstart guide based on resolved technical decisions.

### 1. Data Model (data-model.md)

Extract entities from feature spec and document structure, fields, relationships, and validation rules.

### 2. API Contracts (/contracts)

Document external service integrations and component interfaces:

- Formspree API contract (contact form)
- YouTube/Vimeo embed specifications
- Image asset requirements
- Component prop interfaces

### 3. Quickstart Guide (quickstart.md)

Developer onboarding document with setup steps, development workflow, and common tasks.

### 4. Agent Context Update

Run `.specify/scripts/bash/update-agent-context.sh claude` to update agent-specific context files with new technology decisions from this plan.

**Deliverables**:

- ✅ `data-model.md` - Data structures and entity definitions
- ✅ `/contracts/formspree-api.md` - Contact form API contract
- ✅ `/contracts/video-embeds.md` - YouTube/Vimeo embed specifications
- ✅ `quickstart.md` - Developer onboarding guide
- ✅ Updated `CLAUDE.md` - Agent context file with tech stack

**Status**: ✅ Complete

---

## Phase 2: Task Generation (Next Step)

**Note**: This command ends after Phase 1 planning. To generate tasks.md, run:

```bash
/speckit.tasks
```

Tasks will be generated based on:

- Feature specification requirements
- Research decisions
- Data model entities
- Component architecture from project structure

---

## Plan Summary

### Technical Decisions Made

| Area | Decision | Implementation |
| ------ | ---------- | ---------------- |
| **Contact Form** | Formspree (free tier) | Client-side fetch to Formspree API |
| **Fonts** | IBM Plex via @fontsource | Self-hosted woff2 files, 300 & 400 weights |
| **Video Embeds** | Privacy-enhanced iframes | youtube-nocookie.com, sandbox attributes |
| **Photo Gallery** | CSS scroll-snap mandatory | scroll-snap-stop: always, 100vh items |
| **Animations** | CSS transitions 300ms | Transform-based, respects prefers-reduced-motion |

### Constitution Compliance

All principles verified:

- ✅ **Minimal Design**: Sparse aesthetic, light fonts, grayscale palette
- ✅ **Static-First**: Full static export, no server components
- ✅ **Performance**: FCP < 1.5s, Lighthouse ≥ 90, accessibility = 100
- ✅ **Content-Centric**: Simple file-based content management
- ✅ **Deployment**: Automated GitHub Actions workflow
- ✅ **Security**: No third-party CDNs, strict CSP, input sanitization via Formspree

### Next Actions

1. Review this plan for completeness
2. Run `/speckit.tasks` to generate implementation tasks
3. Begin Phase 3: Implementation
