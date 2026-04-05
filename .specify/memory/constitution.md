<!--
Sync Impact Report:
- Version change: 1.5.0 → 1.6.0 (MINOR)
- Modified principles:
  - Principle II (Minimal Design First → Technical Mono Design System): Revised to approve
    kinetic typography and micro-interactions under Code Brutalism aesthetic with strict
    prefers-reduced-motion guardrails. Wording shifted from prohibitive to permissive-with-guardrails.
  - Principle III (Static-First Architecture): Added approved CDN pattern for large multimedia
    assets (Cloudflare R2 / S3) and build-time Strava data generation.
  - Principle IV (Performance & Accessibility): WCAG target upgraded from 2.1 AA to 3.0+.
    Added structured data (JSON-LD) as a performance/discoverability requirement.
  - Principle V (Content-Centric Development): Added decision-document portfolio model as
    mandatory content structure. ProjectEntry interface added as standard.
  - Principle VII (Security): CSP frame-src updated to allow YouTube and Vimeo iframes
    (consistent with existing meta-CSP in layout.tsx). Rationale added.
- Added principles:
  - Principle VIII (Landing Node Architecture): New. Establishes site as a "decision
    environment" with four-section modular structure, AI crawler optimization, and
    continuous freshness requirements.
- Removed principles: None
- Templates requiring updates:
  - `.specify/templates/plan-template.md` ✅ No required changes (HIG review checklist intact)
  - `.specify/templates/spec-template.md` ✅ No required changes
  - `.specify/templates/tasks-template.md` ✅ No required changes (HIG design review tasks intact)
- Follow-up TODOs: None — no placeholders deferred
-->

# Dustin Niles Portfolio Constitution

## Core Principles

### I. Apple Human Interface Guidelines Compliance

All design decisions MUST align with Apple's Human Interface Guidelines (HIG) to ensure a design
language that users intuitively understand and trust. The website must follow HIG principles for
visual design, layout, typography, color, accessibility, and interaction patterns wherever
applicable to a static web portfolio.

**Primary HIG reference areas for this website:**
- **Foundations** (HIG Foundations section):
  - Layout: Spatial organization, margins, safe areas, alignment (https://developer.apple.com/design/human-interface-guidelines/foundations/layout)
  - Color: Color usage, contrast, semantic colors (https://developer.apple.com/design/human-interface-guidelines/foundations/color)
  - Typography: Font sizing, hierarchy, readability (reference only; IBM Plex family overrides font choice)
  - Dark Mode: Support for light and dark appearances (https://developer.apple.com/design/human-interface-guidelines/foundations/dark-mode)
  - Accessibility: Inclusive design for all users (https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility)
  - Inclusion: Diverse and accessible experiences (https://developer.apple.com/design/human-interface-guidelines/foundations/inclusion)
  - Writing: Clear, concise, and direct language (https://developer.apple.com/design/human-interface-guidelines/foundations/writing)

- **Components** (HIG Components section):
  - Layout and Organization: Page structure and information architecture (https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization)
  - Navigation and Search: Navigation patterns and wayfinding (https://developer.apple.com/design/human-interface-guidelines/components/navigation-and-search)
  - Content: Content presentation and media (https://developer.apple.com/design/human-interface-guidelines/components/content)

- **Patterns** (HIG Patterns section):
  - Feedback: User feedback and communication (https://developer.apple.com/design/human-interface-guidelines/patterns/feedback)
  - Loading: Loading states and progress (https://developer.apple.com/design/human-interface-guidelines/patterns/loading)

**Non-negotiable rules:**
- Visual hierarchy must follow HIG spacing and sizing standards
- Color must have sufficient contrast per WCAG standards (HIG requirement)
- Navigation must be intuitive and discoverable per HIG patterns
- Interactive elements must have clear affordances and states
- Error messages and feedback must be helpful and non-technical per HIG writing principles
- Layout must respect safe areas and consistent margins per HIG layout principles

**Font exception**: The IBM Plex font family (SIL OFL 1.1) is the required font family for this
website, with IBM Plex Mono as the primary/default typeface. This is the only override to Apple's
typography recommendations (which recommend SF Pro/SF Compact). All other typography rules from
HIG (sizing, hierarchy, contrast) still apply.

**Rationale:** Apple's HIG represents decades of research into human-computer interaction and
accessibility. Adopting HIG principles ensures your website feels native and intuitive to Apple
device users while maintaining professional standards that benefit all visitors.

### II. Technical Mono Design System

Within Apple HIG's guidelines, design decisions MUST implement the Technical Mono / Code
Brutalism aesthetic: monospaced typography, high-contrast layouts, and grid structures that
communicate technical craft and clarity. The aesthetic MUST feel intentional and purposeful —
never decorative.

**Non-negotiable rules:**
- Whitespace is a design element in alignment with HIG spatial principles
- Typography MUST use light font weights (300-400 for body, 300-600 for headings) per HIG hierarchy
- Color palette is grayscale-primary with a single defined accent variable; arbitrary color
  additions are prohibited
- Web fonts: Only IBM Plex family (SIL OFL 1.1), self-hosted via @fontsource — no external font
  CDNs. IBM Plex Mono is the primary/default typeface
- Kinetic typography and micro-interactions ARE permitted under the following conditions:
  - The interaction serves a demonstrable UX purpose (guides attention, confirms an action,
    communicates state)
  - All animations MUST be gated behind `@media (prefers-reduced-motion: no-preference)`
  - Reduced-motion fallbacks MUST be defined for every animated element
  - No purely decorative animations (animations that add no information or affordance)
- Border-based card layouts and terminal-grid visual patterns are the preferred structural
  elements — not shadows, gradients, or rounded decorative surfaces

**Rationale:** The Technical Mono aesthetic signals technical depth and authenticity in the 2026
"builder" culture. IBM Plex Mono provides the monospace foundation. Permitting micro-interactions
under strict guardrails prevents the aesthetic from feeling cold while preserving performance and
accessibility. Every visual choice must earn its place.

### III. Static-First Architecture

The site MUST be fully static-exportable to support GitHub Pages deployment. Dynamic features
requiring server-side rendering or APIs are prohibited unless they degrade gracefully to static
content.

**Non-negotiable rules:**
- Next.js configuration must maintain `output: 'export'`
- No Server Components requiring runtime (use Client Components with static fallbacks)
- Images must be unoptimized or use static optimization strategies
- All routes must be pre-renderable at build time
- No API routes or server-side data fetching at runtime

**Approved CDN pattern for multimedia assets:**
- Large video files, high-resolution images, and multimedia assets too large for Git MUST be
  hosted on Cloudflare R2 or Amazon S3 and served via CDN URL
- GitHub repository hard limit: no individual file over 100MB; keep repo under 500MB
- Dynamic data (e.g., Strava activities) MUST be fetched at build time via scripts in `/scripts/`
  and baked into static TypeScript data files in `app/data/` — not fetched at runtime

**Rationale:** GitHub Pages hosting requires static files. The CDN pattern extends this
architecture to support multimedia-rich content without sacrificing deployment reliability.
Build-time data generation preserves static export while enabling dynamic-feeling features.

### IV. Performance & Accessibility

The site MUST load quickly and be accessible to all users, including those with disabilities or
limited network connectivity. This aligns with Apple HIG's accessibility requirements.

**Non-negotiable rules:**
- First Contentful Paint (FCP) < 1.5s on 3G networks
- Total initial render < 3s on 3G networks
- Lighthouse Performance score ≥ 90
- Lighthouse Accessibility score = 100
- Semantic HTML required (proper heading hierarchy, landmarks, alt text)
- Keyboard navigation fully supported
- WCAG 3.0+ compliance target (minimum WCAG 2.1 Level AA; target 3.0 as standard matures)
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text (HIG + WCAG standard)
- Support for reduced-motion preferences (HIG motion principles) — mandatory, not optional
- Structured data (JSON-LD) MUST be present for `Person`, `WebSite`, and `ProfilePage` schemas
  to ensure AI crawler discoverability and search engine ranking

**Rationale:** Portfolio sites are viewed by potential clients/employers on various devices.
Accessibility is both ethical and professional. Structured data is required because in 2026, AI
systems crawl sites before humans — JSON-LD signals expertise and improves discovery.

### V. Content-Centric Development

Code changes MUST serve content presentation. Technical complexity requires justification
against content presentation benefits.

**Non-negotiable rules:**
- New components only when reused 2+ times or when complexity demands separation
- Portfolio data structure must be easily editable (TypeScript data files, typed interfaces)
- Image management must be straightforward (simple file placement in `/public` or CDN reference)
- Navigation structure must reflect content hierarchy 1:1 per HIG information architecture
- No premature abstractions or over-engineering

**Decision-document portfolio model (mandatory for all project entries):**
Every portfolio project entry MUST follow outcome-storytelling structure using the `ProjectEntry`
interface. The five required narrative fields are:
1. `context` — starting situation and constraints
2. `objective` — the specific goal
3. `approach` — what was done and why
4. `outcome` — quantifiable result (e.g., "increased student engagement by 65%")
5. `lessons` — reflection and transferable insight

Entries that do not include a quantifiable `outcome` MUST NOT be published as portfolio items.
Gallery-only or visual-only portfolio entries are prohibited; every entry must tell a decision story.

**Content freshness:** Portfolio content MUST be reviewed and updated on a monthly cycle.
A site with stale content signals inactivity to visitors and AI crawlers alike.

**Rationale:** This is a personal website, not an enterprise application. Code should enable
content updates, not obstruct them. The decision-document model transforms the site from a
"gallery of screens" into a "decision environment" that reduces perceived risk for evaluators.

### VI. Deployment Simplicity

The deployment process MUST remain automated, reliable, and require zero manual intervention
for standard updates.

**Non-negotiable rules:**
- GitHub Actions workflow is the single source of deployment truth
- Push to `main` branch triggers automatic deployment
- Build failures must block deployment
- No manual file uploads or FTP processes
- Deployment status visible via GitHub Actions UI
- CDN asset uploads (Cloudflare R2 / S3) are a separate workflow step, not part of the main
  deployment pipeline — they are manual or triggered separately

**Rationale:** Automated deployment ensures consistency, reduces errors, and allows focus on
content creation rather than infrastructure management.

### VII. Security & Content Integrity (CRITICAL)

This site displays personal views and content that MUST be protected against unauthorized
modification, injection, or tampering by third parties. All security measures are mandatory
and non-negotiable.

**Non-negotiable rules:**
- **No third-party JavaScript:** Absolutely no external scripts, CDNs, analytics, or tracking
  code unless explicitly approved and using Subresource Integrity (SRI)
- **No user input:** No forms, comments, or any user-generated content mechanisms that could
  enable injection attacks
- **Content Security Policy (CSP):** Strict CSP headers required in production; the approved
  policy is defined below
- **Dependency integrity:** All npm packages must be from trusted sources with regular security
  audits
- **GitHub repository protection:** Branch protection rules on `main` branch
- **HTTPS enforcement:** All traffic must use HTTPS (GitHub Pages provides this by default)
- **No inline event handlers:** All JavaScript event handling via addEventListener only
- **Supply chain security:** Dependabot enabled for automated vulnerability alerts
- **Build reproducibility:** Builds must be deterministic and auditable

**Approved Content Security Policy:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://www.strava.com;
  frame-src https://www.youtube.com https://player.vimeo.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'none';
```

*YouTube and Vimeo are approved frame-src origins for portfolio video embeds. The Strava
connect-src is approved for build-time data fetching only.*

**Rationale:** This is a personal platform for expressing views and showcasing work. Any
compromise of content integrity undermines trust, credibility, and personal safety. Static-first
architecture provides inherent security benefits, but proactive measures are required.

### VIII. Landing Node Architecture

The site MUST function as a "decision environment" — a digital headquarters that consolidates
professional authority, technical identity, and personal brand into a unified, high-integrity
presence. Visitors arrive to evaluate, hire, or collaborate; the site MUST immediately
communicate role, domain, and specific value within 5 seconds.

**Four-section modular structure (non-negotiable):**
| Section | Nav Label | Content Focus | Purpose |
|---|---|---|---|
| Institutional Core | Portfolio | Campus safety projects + communications metrics | Domain expertise and strategic impact |
| Technical Lab | Lab | Vibe-coded micro-apps and tools | Technical agility and experimental mindset |
| Activity Stream | Activity | Cycling data, heatmaps, Strava integration | Personal discipline and data literacy |
| Landing Matrix | Links | External socials, publications, authority signals | Centralizes presence, controls search |

**Non-negotiable rules:**
- The home page (`/`) MUST communicate positioning within 5 seconds (name, role, value statement)
- Navigation MUST reflect the four-section structure above; Work/Play labels are deprecated
- Each section MUST be independently navigable — visitors from different audience types
  (hiring managers, collaborators, cycling enthusiasts) MUST be able to find their intent path
  without reading through unrelated content
- Site architecture MUST be modular: new sections, case studies, and micro-apps MUST be addable
  without rebuilding the navigation system or layout
- AI crawler optimization is mandatory: every page MUST have a `<title>`, `<meta description>`,
  canonical URL, and Open Graph tags. `sitemap.xml` and `robots.txt` MUST be generated at build time
- `app/sitemap.ts` and `app/robots.ts` MUST be maintained and current
- Privacy policy (`/privacy`) and terms of service (`/terms`) pages MUST exist as trust signals

**Rationale:** In 2026, AI systems (Google AI Overview, autonomous research agents) crawl sites
before humans arrive. A site without structured metadata, canonical URLs, and explicit topic
signals is invisible to AI-mediated discovery. The four-section architecture prevents the
"single-page brochure" trap and enables the site to evolve alongside career progression.

## Technical Standards

### Technology Stack Constraints

- **Framework:** Next.js 14+ with App Router (current: 16.1.6)
- **Language:** TypeScript for all source files
- **Styling:** Tailwind CSS 4.x via PostCSS
- **Font:** IBM Plex family (SIL OFL 1.1), self-hosted via @fontsource; IBM Plex Mono is primary
- **Runtime:** React 19+ (current: 19.2.3)
- **Build target:** ES2020+ for modern browsers
- **Data scripts:** Node.js scripts in `/scripts/` for build-time data generation (e.g., Strava)

**Upgrade policy:** Minor and patch updates acceptable without review. Major version upgrades
require testing plan and rollback strategy.

### File Organization

- `/app` — Next.js App Router pages and layouts
- `/app/data` — TypeScript data files (navigation, projects, photos, videos, social links)
- `/app/types` — TypeScript interfaces and types
- `/components` — Reusable React components
- `/public` — Static assets (images, fonts, etc.)
- `/scripts` — Build-time data generation scripts (Strava fetch, asset processing)
- `/.github/workflows` — CI/CD automation
- `/.specify` — Project planning and specification artifacts

### Code Quality Gates

- ESLint must pass (`npm run lint`) before merge
- TypeScript compilation must succeed (`npm run build`) before merge
- No `any` types without explicit justification comment
- All components must be functional (no class components)

### Apple HIG Design Review

Before merging design or layout changes:
1. Verify spatial conformance with HIG Layout principles
2. Check color contrast per HIG Color and Accessibility guidelines (4.5:1 for normal text)
3. Confirm navigation patterns align with HIG Components: Navigation and Search
4. Validate interactive elements have proper affordances per HIG Patterns: Feedback
5. Test dark mode support per HIG Foundations: Dark Mode
6. Verify reduced-motion support — every animation MUST have a no-animation fallback

### Security Standards

**Repository Security:**
- GitHub branch protection on `main` (recommended but optional for solo developer):
  - Require status checks to pass before merging (if CI/CD configured)
  - Prohibit force pushes (recommended)
  - Prohibit deletions (recommended)
- Dependabot alerts enabled for dependency vulnerabilities
- Secret scanning enabled (GitHub Advanced Security if available)
- Two-factor authentication (2FA) required for repository access
- **Note**: PR reviews not required for solo developer project

**Dependency Management:**
- Run `npm audit` before every deployment
- Critical and high severity vulnerabilities must be addressed immediately
- Regularly update dependencies (monthly review cycle minimum)
- Avoid dependencies with known supply chain risks or poor maintenance
- Lock file (`package-lock.json`) must be committed and verified in CI

**Build Security:**
- CI/CD pipeline runs in isolated environment
- No secrets stored in code (environment variables only; API credentials via CI secrets)
- Build logs reviewed for suspicious activity
- Build artifacts verified before deployment
- GitHub Actions workflows use pinned versions (commit SHA, not tags)

**Runtime Security:**
- Prohibited: Code evaluation, dynamic script execution, unsafe HTML injection
- All external links use `rel="noopener noreferrer"`
- X-Frame-Options: DENY (prevent clickjacking)
- X-Content-Type-Options: nosniff

**Monitoring & Response:**
- Regular manual reviews of deployed content (monthly minimum)
- GitHub audit log monitoring for unauthorized access attempts
- Incident response plan: detect → isolate → investigate → remediate → document
- Backup strategy: Git history serves as content backup; can roll back any commit

## Development Workflow

### Making Changes (Solo Developer Workflow)

**Option 1: Direct to main** (simplest, for small changes)
1. Make changes on `main` branch
2. Test locally with `npm run dev`
3. Verify HIG alignment (especially for visual/layout changes)
4. Run `npm run lint` and `npm audit`
5. Run `npm run build` to verify static export
6. Commit with descriptive message
7. Push to `main` — triggers automatic deployment

**Option 2: Feature branch** (recommended for larger features)
1. Create feature branch from `main`
2. Make changes locally and test with `npm run dev`
3. Verify HIG alignment and Landing Node architecture compliance
4. Run `npm run lint` to verify code quality
5. Run `npm audit` to check for security vulnerabilities
6. Run `npm run build` to verify static export
7. Commit with descriptive message
8. Switch to `main`: `git checkout main`
9. Merge feature branch: `git merge <feature-branch>`
10. Push to `main`: `git push` — triggers automatic deployment
11. Delete feature branch: `git branch -d <feature-branch>`

**Note**: No pull request or review required for solo developer project.

### Adding Portfolio Content

1. Follow decision-document model (context → objective → approach → outcome → lessons)
2. Place images in `/public/images` or upload to CDN; update data files with paths
3. Add entry to `app/data/projects.ts` using `ProjectEntry` interface
4. Verify image alt text is descriptive and outcome is quantifiable
5. Run `npm run build` and preview generated output in `/out`

### Adding a Technical Lab Micro-App

1. Create self-contained client component under `app/lab/[slug]/page.tsx`
2. Add entry to `app/data/navigation.ts` under the Lab parent
3. Ensure micro-app works offline/without external APIs (static-first constraint)
4. Document the app's purpose and tech choices in the Lab index page entry

### Running Build-Time Data Scripts

1. Ensure API credentials are available (environment variables or `.env.local`)
2. Run script: `npx ts-node scripts/fetch-strava.ts` (or equivalent)
3. Verify generated data file in `app/data/`
4. Run `npm run build` to confirm static export includes updated data

### Emergency Fix Procedure

1. Create hotfix branch from current `main`
2. Apply minimal scoped fix
3. Run `npm run lint`, `npm audit`, and `npm run build`
4. Merge and deploy via normal workflow
5. Document root cause and prevention in specs or notes

## Governance

This constitution supersedes all other development practices and documentation for this project.
When conflicts arise between this constitution and other guidance (including CLAUDE.md), the
constitution takes precedence.

### Amendment Process

1. Amendments require explicit user approval (Dustin Niles)
2. Version number must be incremented according to semantic versioning:
   - **MAJOR:** Removing or fundamentally changing core principles (e.g., abandoning HIG
     compliance, dropping static-first architecture)
   - **MINOR:** Adding new principles, significant principle updates, or materially expanding
     guidance
   - **PATCH:** Clarifications, wording improvements, or non-semantic changes
3. Amendment date must be recorded in version line
4. Dependent templates in `.specify/templates/` must be reviewed and updated for consistency
5. All principle changes must be justified against their impact on design decisions and UX

### Compliance Review

- All feature specifications must reference relevant constitutional principles and HIG sections
- All implementation plans must document how they align with HIG, core principles, and Landing
  Node architecture
- Design/layout tasks that deviate from HIG require explicit justification and approval
- Code reviews should verify adherence to technical standards and HIG principles
- Design reviews should verify spatial, color, and interaction conformance with HIG guidelines
- Every new page or section must satisfy Principle VIII (Landing Node) metadata requirements

### Guidance Hierarchy

1. **Constitution** (this document) — Immutable principles, rules, and HIG references
2. **CLAUDE.md** — Practical development guidance aligned with constitution
3. **Specification artifacts** — Feature-specific details within constitutional bounds
4. **Code comments** — Implementation notes for specific edge cases

**Version**: 1.6.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-04-05
