# Implementation Plan: Remediate Mobile Layout, Security Policy, and Delivery Compliance Gaps

**Branch**: `002-frontend-iteration` | **Date**: 2026-02-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-frontend-iteration/spec.md`

## Summary

Implement targeted remediations identified in the comprehensive code review: fix mobile sidebar/content layout behavior, align CSP with constitutional strictness while allowing approved video embeds, enforce accessible mobile typography, add photography placeholders, and close governance gaps (pinned workflow SHAs, Dependabot, clean lint gate). Preserve static export behavior and existing route architecture.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16.1.6, React 19.2.3, Tailwind CSS 4.x, @fontsource/ibm-plex-mono  
**Storage**: N/A (static file/data driven)  
**Testing**: ESLint, `next build`, npm audit (manual command checks)  
**Target Platform**: Static GitHub Pages deployment plus local Next.js runtime  
**Project Type**: Single Next.js web project  
**Performance Goals**: Maintain Lighthouse goals from constitution (Perf >= 90, Accessibility = 100)  
**Constraints**: `output: 'export'`; no API routes; no SSR-only runtime requirements  
**Scale/Scope**: Focused remediation across layout/components, security policy files, workflows, and static assets

## Constitution Check

*GATE: Must pass before implementation. Re-check after design and security updates.*

### Principle I — Apple HIG Compliance

- [x] Responsive layout changes address usability while preserving visual hierarchy.
- [x] Navigation behavior remains discoverable with context-aware sidebar logic.
- [x] Typography/readability constraints are maintained at mobile breakpoints.

### Principle III — Static-First Architecture

- [x] Next.js `output: 'export'` remains unchanged.
- [x] All routes and assets remain static-build compatible.

### Principle IV — Performance & Accessibility

- [x] Mobile body text minimum size requirement addressed.
- [x] Keyboard/focus/reduced-motion behavior preserved.
- [x] Lint/build/audit gates are part of verification scope.

### Principle VII — Security & Content Integrity

- [x] CSP tightened to avoid `unsafe-inline`/`unsafe-eval`.
- [x] Approved frame sources explicitly whitelisted for video embeds.
- [x] Workflow supply-chain hardening via SHA pinning.
- [x] Dependabot configuration added.

### Design Review Against Apple HIG *(for UI/visual/layout features)*

**Before proceeding with implementation:**

- [x] Feature design reviewed against relevant HIG sections (layout, navigation, accessibility)
- [x] Mobile readability target aligns with HIG typography guidance
- [x] Navigation hierarchy/affordance remains intact after responsive updates
- [x] Reduced-motion and dark mode behavior retained

## Project Structure

### Documentation (this feature)

```text
specs/002-frontend-iteration/
├── spec.md
├── plan.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── globals.css
├── data/photos.ts
└── hooks/
    └── useMediaQuery.ts (new)

components/
├── SiteLayout.tsx
└── MenuSlider.tsx

public/
└── images/portfolio/
    ├── photo-1.svg (new placeholder)
    └── photo-2.svg (new placeholder)

.github/
├── dependabot.yml (new)
└── workflows/
    ├── deploy.yml
    ├── claude.yml
    └── claude-code-review.yml
```

**Structure Decision**: Keep the current single-project App Router structure and apply minimal targeted edits to existing files.

## Implementation Approach

1. **Responsive layout remediation**
   - Introduce a shared viewport hook for desktop/mobile checks.
   - Update sidebar geometry and content offsets so desktop behavior remains unchanged while mobile remains readable.
   - Synchronize layout state on route changes to prevent stale view modes.

2. **CSP and video compatibility remediation**
   - Update CSP declarations in both `app/layout.tsx` and `public/_headers` to strict directives without unsafe tokens.
   - Add explicit `frame-src` entries for allowed embed providers.

3. **Accessibility/content fixes**
   - Remove sub-16px mobile body override.
   - Add local photography placeholders and point data model references to them.
   - Resolve lint warning so lint can run at zero warnings.

4. **Repository governance hardening**
   - Pin all workflow `uses:` references to commit SHAs.
   - Add Dependabot config for npm and GitHub Actions.

5. **Verification**
   - Run `npm run lint -- --max-warnings=0`.
   - Run `npm run build`.
   - Run `npm audit --audit-level=high`.
   - Spot-check generated routes and asset references.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| GitHub Pages cannot serve custom HTTP headers | CSP remains in meta + `_headers` for migration/readiness parity | Removing `_headers` would lose deploy-target portability and explicit policy documentation |
