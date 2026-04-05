# Implementation Plan: Landing Node Foundation

**Branch**: `001-landing-node-foundation` | **Date**: 2026-04-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-landing-node-foundation/spec.md`

---

## Summary

Transform dustinniles.github.io from a placeholder-filled photo portfolio into a "landing node"
digital headquarters by implementing: a restructured four-section navigation (Portfolio, Lab,
Activity, Links); a decision-document portfolio model with outcome-driven case studies; a Code
Brutalism design system extension with micro-interactions; a landing matrix with trust-signal
pages; and AI/SEO optimization with JSON-LD, sitemap, and per-page metadata.

No new npm dependencies. All work targets the existing Next.js 16.1.6 + Tailwind CSS 4 +
TypeScript stack with static export to GitHub Pages.

---

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.3, Next.js 16.1.6
**Primary Dependencies**: Tailwind CSS 4 (PostCSS), @fontsource/ibm-plex-mono — unchanged
**New Dependencies**: None
**Storage**: TypeScript data files in `app/data/` — no database
**Testing**: `npm run build`, Lighthouse audit, manual HTML inspection
**Target Platform**: Static HTML/CSS/JS — GitHub Pages (dustinniles.github.io)
**Project Type**: Web (Next.js App Router, static export)
**Performance Goals**: FCP < 1.5s on 3G, Lighthouse Performance ≥ 90
**Constraints**: `output: 'export'` must be preserved — no server-side features
**Scale/Scope**: ~15 routes, <10 portfolio entries initially

---

## Constitution Check

*GATE: Must pass before implementation begins. Re-check after all phases complete.*

### Principle I — Apple HIG Compliance

- [x] Four-section navigation follows HIG Components: Navigation and Search (clear hierarchy,
  active state visible, user always knows location)
- [x] Home page decision cards follow HIG Layout (consistent margins, spatial clarity)
- [x] All interactive elements have affordance states per HIG Patterns: Feedback
- [x] Dark mode fully planned per HIG Foundations: Dark Mode

### Principle II — Technical Mono Design System

- [x] IBM Plex Mono remains primary typeface throughout
- [x] Micro-interactions gated behind `motion-safe:` and global reduced-motion rule
- [x] Border-based card containment — no shadows, gradients, or decorative rounds
- [x] Single `--color-accent` CSS variable defined; all accent uses reference it

### Principle III — Static-First Architecture

- [x] `output: 'export'` preserved — no API routes introduced
- [x] Portfolio detail routes use `generateStaticParams()` + `dynamicParams = false`
- [x] `sitemap.ts` and `robots.ts` generate static files at build time

### Principle IV — Performance & Accessibility

- [x] JSON-LD structured data planned for Person (home), WebSite (root layout), ProfilePage (about), and CreativeWork (portfolio details)
- [x] All animations wrapped in `prefers-reduced-motion: no-preference`
- [x] Per-page metadata with `metadataBase` set in root layout
- [x] Canonical URLs via `alternates.canonical` in each page's metadata export

### Principle V — Content-Centric Development

- [x] `ProjectEntry` interface follows decision-document model (5 narrative fields)
- [x] `outcome` field required for published entries — enforced by convention
- [x] No premature abstractions — `NavigationSectionCard` is an inline constant in `app/page.tsx`

### Principle VI — Deployment Simplicity

- [x] No changes to GitHub Actions workflow
- [x] Build remains: `npm run build` → static `/out`

### Principle VII — Security

- [x] JSON-LD data sourced only from `app/data/` TypeScript files — no user input
- [x] All external links use `target="_blank" rel="noopener noreferrer"`
- [x] CSP in `_headers` / layout meta-tag already allows YouTube/Vimeo frame-src
- [x] No new third-party scripts introduced

### Principle VIII — Landing Node Architecture

- [x] Home page satisfies 5-second positioning requirement
- [x] Four-section structure: Portfolio, Lab, Activity, Links
- [x] `sitemap.xml` and `robots.txt` generated at build
- [x] `/privacy` and `/terms` pages included in scope
- [x] Navigation data-driven — modular, extensible

### Design Review Against Apple HIG

- [ ] Feature design reviewed against relevant HIG sections (Foundations, Components, Patterns)
- [ ] Color contrast verified per HIG Color and Accessibility guidelines (4.5:1 for normal text, 3:1 for large text)
- [ ] Spatial design aligns with HIG Layout principles (margins, safe areas, alignment)
- [ ] Navigation patterns follow HIG Components: Navigation and Search
- [ ] Interactive elements have proper affordances per HIG Patterns: Feedback
- [ ] Dark mode support planned per HIG Foundations: Dark Mode
- [ ] Reduced-motion support planned per HIG Foundations: Accessibility
- [ ] Typography hierarchy maintains WCAG 2.1 Level AA compliance
- [ ] All text is clear and concise per HIG Foundations: Writing

*The design review checklist above must be completed during implementation, not planning.*

---

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-node-foundation/
├── plan.md              ← this file
├── research.md          ✅ complete
├── data-model.md        ✅ complete
├── quickstart.md        ✅ complete
├── contracts/
│   └── component-interfaces.md  ✅ complete
└── tasks.md             ← generated by /speckit.tasks (next step)
```

### Source Code Changes

```text
app/
├── page.tsx                    MODIFY — home page decision environment
├── layout.tsx                  MODIFY — metadataBase, JSON-LD Person + WebSite schemas
├── globals.css                 MODIFY — --color-accent variable, animation keyframes
├── types/index.ts              MODIFY — add ProjectEntry, NavigationSectionCard, extend SocialMediaLink
├── sitemap.ts                  CREATE — static sitemap generation
├── robots.ts                   CREATE — robots.txt generation
├── data/
│   ├── navigation.ts           MODIFY — restructure to four-section hierarchy
│   ├── projects.ts             CREATE — ProjectEntry data array
│   └── social-links.ts        MODIFY — add category field to entries
├── portfolio/
│   ├── page.tsx                CREATE — project card list
│   └── [slug]/
│       └── page.tsx            CREATE — project detail (generateStaticParams)
├── portfolio/photography/
│   └── page.tsx                CREATE — move from /photography
├── portfolio/video/
│   └── page.tsx                CREATE — move from /video
├── lab/
│   └── page.tsx                CREATE — stub (placeholder for future micro-apps)
├── activity/
│   ├── page.tsx                CREATE — section stub
│   ├── cycling/
│   │   └── page.tsx            CREATE — move from /cycling
│   └── volunteering/
│       └── page.tsx            CREATE — move from /volunteering
├── links/
│   └── page.tsx                CREATE — categorized authority links
├── privacy/
│   └── page.tsx                CREATE — privacy policy
└── terms/
    └── page.tsx                CREATE — terms of service

components/
├── ProjectCard.tsx             CREATE — portfolio list card
├── ProjectDetail.tsx           CREATE — decision-document full layout
├── JsonLd.tsx                  CREATE — JSON-LD script tag renderer
└── LinkGroup.tsx               CREATE — category group for links page
```

**Structure Decision**: Standard Next.js App Router structure. No `src/` wrapper.
All pages in `app/`, all reusable components in `components/`. No backend.

---

## Complexity Tracking

No constitution violations requiring justification.

The old routes (work/, play/, contact/) will be left in place during this branch to
avoid 404s. They are marked for removal in the polish phase once all new routes are
confirmed working.
