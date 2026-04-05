# Quickstart: Landing Node Foundation

**Feature Branch**: `001-landing-node-foundation`
**Date**: 2026-04-05

How to set up, run, and validate this feature end-to-end.

---

## Prerequisites

- Node.js 20+
- npm 10+
- Git (on branch `001-landing-node-foundation`)

---

## Setup

```bash
# Clone and install (if starting fresh)
git clone https://github.com/dustinniles/dustinniles.github.io.git
cd dustinniles.github.io
git checkout 001-landing-node-foundation
npm install
```

No new dependencies are added in this feature — `npm install` installs the same packages
as the main branch.

---

## Development

```bash
npm run dev
# → http://localhost:3000
```

**Key routes to verify during development:**

| Route | What to check |
|---|---|
| `/` | Name, role, value statement, four section cards visible without scroll |
| `/portfolio` | Project cards render, published-only filter works |
| `/portfolio/[slug]` | Five narrative sections, back-navigation link |
| `/lab` | Stub page renders without error |
| `/activity` | Stub or blog layout renders |
| `/activity/cycling` | Renders (blog layout) |
| `/activity/volunteering` | Renders (blog layout) |
| `/links` | Four category groups with external links |
| `/privacy` | Renders with content |
| `/terms` | Renders with content |
| `/about` | Unchanged — still renders correctly |

---

## Build Verification

```bash
npm run build
# Expected: exit 0, no TypeScript errors, no missing routes
```

After build, inspect the `/out` directory:

```bash
ls out/
# Should contain: index.html, portfolio/, lab/, activity/, links/, privacy/, terms/, about/, sitemap.xml, robots.txt
```

**Verify sitemap:**
```bash
cat out/sitemap.xml | grep '<loc>'
# Should list all routes including /portfolio/[slug] entries
```

**Verify robots.txt:**
```bash
cat out/robots.txt
# Should contain: Allow: / and Sitemap: https://dustinniles.github.io/sitemap.xml
```

---

## Metadata Validation

After build, spot-check HTML metadata in the `/out` directory:

```bash
# Home page
grep -A 2 'og:title' out/index.html

# A portfolio detail page (replace slug)
grep -A 2 'og:title' out/portfolio/nyu-emergency-alerts/index.html
grep 'application/ld+json' out/portfolio/nyu-emergency-alerts/index.html
```

Every page must have unique `<title>` and `<meta name="description">` — verify a sample of 3-4 pages.

---

## Accessibility & Performance Checks

```bash
# Run local production server to test with Lighthouse
npm run build
npx serve out -p 3000
# → open Chrome to http://localhost:3000
# → Run Lighthouse in DevTools: Performance ≥ 90, Accessibility = 100
```

**Reduced-motion test**:
1. macOS: System Settings → Accessibility → Display → Reduce Motion → ON
2. Reload the site
3. Navigate between pages — zero animations should play
4. Hover over portfolio cards — no transitions should occur

**Dark mode test**:
1. macOS: System Settings → Appearance → Dark
2. Verify all text is readable, borders are visible, accent color renders correctly

---

## Lint

```bash
npm run lint
# Expected: no errors, no warnings
```

---

## Constitution Check Verification

Before considering this feature merge-ready, verify against each gate:

- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run lint` passes
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse Performance ≥ 90
- [ ] All pages have unique `<title>` and `<meta description>`
- [ ] `sitemap.xml` contains all routes
- [ ] `robots.txt` points to sitemap
- [ ] JSON-LD present on home page and portfolio detail pages
- [ ] Zero animations with Reduce Motion enabled
- [ ] Dark mode contrast ratios pass (4.5:1 body text, 3:1 large text)
- [ ] All external links use `rel="noopener noreferrer"`
- [ ] No placeholder content in published portfolio entries (outcome must be quantifiable)
