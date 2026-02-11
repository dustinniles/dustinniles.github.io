<!--
Sync Impact Report:
- Version change: 1.3.0 → 1.4.0 (MINOR)
- Modified principles: All existing principles reordered and updated to align with Apple HIG
- Added principles: Principle I - Apple Human Interface Guidelines Compliance (primary)
- New rationale: Apple HIG now serves as the primary design authority, with IBM Plex as the only font exception. Existing minimal design principles now operate within HIG guidelines.
- Key exception: IBM Plex Sans (SIL OFL 1.1) continues as standard font, superseding Apple's SF Pro typography recommendations
- Templates requiring updates:
  - `.specify/templates/spec-template.md` (add HIG compliance checklist to requirements)
  - `.specify/templates/plan-template.md` (add HIG review step to design phase)
  - `.specify/templates/tasks-template.md` (add HIG reference for design/layout tasks)
- Follow-up TODOs: None
-->

# Dustin Niles Portfolio Constitution

## Core Principles

### I. Apple Human Interface Guidelines Compliance

All design decisions MUST align with Apple's Human Interface Guidelines (HIG) to ensure a design language that users intuitively understand and trust. The website must follow HIG principles for visual design, layout, typography, color, accessibility, and interaction patterns wherever applicable to a static web portfolio.

**Primary HIG reference areas for this website:**
- **Foundations** (HIG Foundations section):
  - Layout: Spatial organization, margins, safe areas, alignment (https://developer.apple.com/design/human-interface-guidelines/foundations/layout)
  - Color: Color usage, contrast, semantic colors (https://developer.apple.com/design/human-interface-guidelines/foundations/color)
  - Typography: Font sizing, hierarchy, readability (reference only; IBM Plex overrides font choice)
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

**Font exception**: IBM Plex Sans (SIL OFL 1.1) is the required font family for this website. This is the only override to Apple's typography recommendations (which recommend SF Pro/SF Compact). All other typography rules from HIG (sizing, hierarchy, contrast) still apply.

**Rationale:** Apple's HIG represents decades of research into human-computer interaction and accessibility. Adopting HIG principles ensures your website feels native and intuitive to Apple device users while maintaining professional standards that benefit all visitors.

### II. Minimal Design First

Within Apple HIG's guidelines, design decisions MUST prioritize simplicity, whitespace, and visual clarity over feature complexity. The site serves as a canvas for portfolio work, not a showcase of technical features.

**Non-negotiable rules:**
- Whitespace is a design element in alignment with HIG spatial principles
- Typography must use light font weights (300-400 for body, 300-600 for headings) per HIG hierarchy
- Color palette restricted to grayscale (gray-600, gray-900) with minimal accent use, respecting HIG color guidance
- No animations, transitions, or interactive effects unless justified for UX and aligned with HIG motion principles
- Web fonts: Only IBM Plex Sans (SIL OFL 1.1), self-hosted from same origin via @fontsource—no external font CDNs

**Rationale:** A minimal aesthetic ensures portfolio content remains the focus while maintaining fast load times and professional presentation, complementing HIG's emphasis on clarity and focus.

### III. Static-First Architecture

The site MUST be fully static-exportable to support GitHub Pages deployment. Dynamic features requiring server-side rendering or APIs are prohibited unless they degrade gracefully to static content.

**Non-negotiable rules:**
- Next.js configuration must maintain `output: 'export'`
- No Server Components requiring runtime (use Client Components with static fallbacks)
- Images must be unoptimized or use static optimization strategies
- All routes must be pre-renderable at build time
- No API routes or server-side data fetching

**Rationale:** GitHub Pages hosting requires static files. This constraint ensures deployment reliability and eliminates hosting costs while maintaining performance.

### IV. Performance & Accessibility

The site MUST load quickly and be accessible to all users, including those with disabilities or limited network connectivity. This aligns with Apple HIG's accessibility requirements.

**Non-negotiable rules:**
- First Contentful Paint (FCP) < 1.5s on 3G networks
- Lighthouse Performance score ≥ 90
- Lighthouse Accessibility score = 100
- Semantic HTML required (proper heading hierarchy, landmarks, alt text)
- Keyboard navigation fully supported
- WCAG 2.1 Level AA compliance minimum (HIG requirement)
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text (HIG + WCAG standard)
- Support for reduced-motion preferences (HIG motion principles)

**Rationale:** Portfolio sites are often viewed by potential clients/employers on various devices and connections. Accessibility is both ethical and professional, aligning with HIG's inclusion principles.

### V. Content-Centric Development

Code changes MUST serve content presentation. Technical complexity requires justification against content presentation benefits.

**Non-negotiable rules:**
- New components only when reused 2+ times or when complexity demands separation
- Portfolio data structure must be easily editable (JSON, arrays, or frontmatter)
- Image management must be straightforward (simple file placement in `/public`)
- Navigation structure must reflect content hierarchy 1:1 per HIG information architecture principles
- No premature abstractions or over-engineering

**Rationale:** This is a personal website, not an enterprise application. Code should enable content updates, not obstruct them.

### VI. Deployment Simplicity

The deployment process MUST remain automated, reliable, and require zero manual intervention for standard updates.

**Non-negotiable rules:**
- GitHub Actions workflow is the single source of deployment truth
- Push to `main` branch triggers automatic deployment
- Build failures must block deployment
- No manual file uploads or FTP processes
- Deployment status visible via GitHub Actions UI

**Rationale:** Automated deployment ensures consistency, reduces errors, and allows focus on content creation rather than infrastructure management.

### VII. Security & Content Integrity (CRITICAL)

This site displays personal views and content that MUST be protected against unauthorized modification, injection, or tampering by third parties. All security measures are mandatory and non-negotiable.

**Non-negotiable rules:**
- **No third-party JavaScript:** Absolutely no external scripts, CDNs, analytics, or tracking code unless explicitly approved and using Subresource Integrity (SRI)
- **No user input:** No forms, comments, or any user-generated content mechanisms that could enable injection attacks
- **Content Security Policy (CSP):** Strict CSP headers required in production (no unsafe-inline, no unsafe-eval)
- **Dependency integrity:** All npm packages must be from trusted sources with regular security audits
- **GitHub repository protection:** Branch protection rules on `main` branch (require PR reviews, no force push)
- **Deployment verification:** Post-deployment checks to verify content matches source (no tampering in CI/CD)
- **HTTPS enforcement:** All traffic must use HTTPS (GitHub Pages provides this by default)
- **No inline event handlers:** All JavaScript event handling via addEventListener only
- **Supply chain security:** Dependabot enabled for automated vulnerability alerts
- **Build reproducibility:** Builds must be deterministic and auditable

**Rationale:** This is a personal platform for expressing views and showcasing work. Any compromise of content integrity or unauthorized access undermines trust, credibility, and personal safety. Static-first architecture provides inherent security benefits, but proactive measures are required to maintain content authenticity.

## Technical Standards

### Technology Stack Constraints

- **Framework:** Next.js 14+ with App Router (current: 16.1.6)
- **Language:** TypeScript for all source files
- **Styling:** Tailwind CSS 4.x via PostCSS
- **Font:** IBM Plex Sans (SIL OFL 1.1) self-hosted via @fontsource
- **Runtime:** React 19+ (current: 19.2.3)
- **Build target:** ES2020+ for modern browsers

**Upgrade policy:** Minor and patch updates acceptable without review. Major version upgrades require testing plan and rollback strategy.

### File Organization

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/public` - Static assets (images, fonts, etc.)
- `/.github/workflows` - CI/CD automation
- `/.specify` - Project planning and specification artifacts

### Code Quality Gates

- ESLint must pass (`npm run lint`) before merge
- TypeScript compilation must succeed (`npm run build`) before merge
- No `any` types without explicit justification comment
- All components must be functional (no class components)

### Apple HIG Design Review

Before merging design or layout changes:
1. Verify spatial conformance with HIG Layout principles
2. Check color contrast per HIG Color and Accessibility guidelines
3. Confirm navigation patterns align with HIG Components: Navigation and Search
4. Validate interactive elements have proper affordances per HIG Patterns: Feedback
5. Test dark mode support per HIG Foundations: Dark Mode
6. Verify reduced-motion support per HIG Foundations: Accessibility

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

**Content Security Policy:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'none';
```

**Build Security:**
- CI/CD pipeline runs in isolated environment
- No secrets stored in code (environment variables only)
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
- Backup strategy: Git history serves as content backup, can roll back any commit

## Development Workflow

### Making Changes (Solo Developer Workflow)

**Option 1: Direct to main** (simplest, for small changes)
1. Make changes on `main` branch
2. Test locally with `npm run dev`
3. Verify HIG alignment (especially for visual/layout changes)
4. Run `npm run lint` and `npm audit`
5. Run `npm run build` to verify static export
6. Commit with descriptive message
7. Push to `main` - triggers automatic deployment

**Option 2: Feature branch** (recommended, for larger features)
1. Create feature branch from `main`
2. Make changes locally and test with `npm run dev`
3. Verify HIG alignment (especially for visual/layout changes)
4. Run `npm run lint` to verify code quality
5. Run `npm audit` to check for security vulnerabilities
6. Run `npm run build` to verify static export
7. Commit with descriptive message
8. Switch to `main`: `git checkout main`
9. Merge feature branch: `git merge <feature-branch>`
10. Push to `main`: `git push` - triggers automatic deployment
11. Delete feature branch: `git branch -d <feature-branch>`

**Note**: No pull request or review required for solo developer project.

### Adding Portfolio Content

1. Place images in `/public/images` (or appropriate subdirectory)
2. Update portfolio data structure in `/app/page.tsx`
3. Test locally to verify image loading and layout
4. Follow standard workflow above

### Navigation Updates

1. Create new page in `/app/<page-name>/page.tsx`
2. Update `/components/Sidebar.tsx` navigation links (verify HIG navigation patterns)
3. Test navigation locally
4. Follow standard workflow above

## Governance

This constitution supersedes all other development practices and documentation for this project. When conflicts arise between this constitution and other guidance (including CLAUDE.md), the constitution takes precedence.

### Amendment Process

1. Amendments require explicit user approval (Dustin Niles)
2. Version number must be incremented according to semantic versioning:
   - **MAJOR:** Removing or fundamentally changing core principles (e.g., abandoning HIG compliance)
   - **MINOR:** Adding new principles, significant principle updates, or materially expanding guidance
   - **PATCH:** Clarifications, wording improvements, or non-semantic changes
3. Amendment date must be recorded in version line
4. Dependent templates in `.specify/templates/` must be reviewed and updated for consistency
5. All principle changes must be justified against their impact on design decisions and user experience

### Compliance Review

- All feature specifications must reference relevant constitutional principles and HIG sections
- All implementation plans must document how they align with HIG and core principles
- Design/layout tasks that deviate from HIG require explicit justification and approval
- Code reviews should verify adherence to technical standards and HIG principles
- Design reviews should verify spatial, color, and interaction conformance with HIG guidelines

### Guidance Hierarchy

1. **Constitution** (this document) - Immutable principles, rules, and HIG references
2. **CLAUDE.md** - Practical development guidance aligned with constitution
3. **Specification artifacts** - Feature-specific details within constitutional bounds
4. **Code comments** - Implementation notes for specific edge cases

**Version**: 1.4.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-11
