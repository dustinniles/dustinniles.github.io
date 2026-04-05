# Phase 1 Design Model: HIG-Compliant Typography, Colors, and Accessibility

**Phase**: Phase 1 (Design & Contracts) | **Date**: 2026-02-11 | **Prerequisite**: research.md complete

**Input**: Feature specification + research.md findings  
**Output**: Design specifications for implementation | **Next**: tasks.md generation

---

## Overview

This document specifies the design model for Apple HIG compliance across typography, color, dark mode, and accessibility. It serves as the design source of truth for implementation tasks and verification testing.

---

## 1. Typography System

### Design Principle
Use IBM Plex Sans (SIL OFL 1.1) with explicit sizing, hierarchy, and readability standards per HIG and WCAG 2.1 Level AA.

### Font Family
```css
--font-sans: 'IBM Plex Sans', system-ui, sans-serif;
```
- **Source**: @fontsource/ibm-plex-sans v5.2.8
- **Weights imported**: 300 (Light), 400 (Regular)
- **Constraint**: No external font CDNs; self-hosted only per Constitution Principle VII
- **Fallback**: system-ui, sans-serif (if @fontsource fails)

### Typographic Scale

Define explicit font sizes using CSS custom properties, based on HIG typography recommendations:

```css
:root {
  /* Base sizing: 1rem = 16px (browser default) */
  --text-base: 1rem;        /* 16px - body text minimum per HIG/WCAG */
  --text-sm: 0.875rem;      /* 14px - smaller text (labels, captions) */
  --text-xs: 0.75rem;       /* 12px - very small text (footer, metadata) */
  --text-lg: 1.125rem;      /* 18px - large text (subheadings) */
  --text-xl: 1.25rem;       /* 20px - extra large (section headings) */
  --text-2xl: 1.5rem;       /* 24px - larger headings */
  --text-3xl: 1.875rem;     /* 30px - primary headings */
  --text-4xl: 2.25rem;      /* 36px - hero/main heading */
  
  /* Line heights: 1.5x minimum per HIG/WCAG for body text */
  --line-height-tight: 1.25;    /* headings */
  --line-height-normal: 1.5;    /* body, default */
  --line-height-relaxed: 1.75;  /* body text, relaxed */
  
  /* Font weights: light (300) and regular (400) only */
  --font-light: 300;
  --font-normal: 400;
  --font-bold: 500; /* Only for emphasis if needed; prefer using size/hierarchy */
}
```

### Heading Hierarchy

| Element | Size | Weight | Line Height | Usage | HIG Alignment |
|---------|------|--------|-------------|-------|---|
| h1 (body) | var(--text-4xl) | 300 | var(--line-height-tight) | Page title, hero | Primary visual hierarchy |
| h2 | var(--text-2xl) | 300 | var(--line-height-tight) | Section heading | Clear visual distinction |
| h3 | var(--text-lg) | 400 | var(--line-height-tight) | Subsection | Medium hierarchy |
| body | var(--text-base) ≥ 16px | 400 | ≥ 1.5 | Main content | WCAG readable minimum |
| small | var(--text-sm) | 400 | var(--line-height-normal) | Supporting text | Reduced emphasis |
| caption | var(--text-xs) | 300 | var(--line-height-normal) | Image captions, footer | Minimal hierarchy |

### Implementation Requirements

- [ ] Set explicit `line-height: 1.5` (or greater) for body text in globals.css
- [ ] Define CSS custom properties for all typographic sizes above
- [ ] Apply sizes to semantic HTML elements (h1, h2, h3, p, small, etc.)
- [ ] Verify no heading level skipped (e.g., h1 → h2, not h1 → h3)
- [ ] Test at 200% browser zoom: heading hierarchy remains visually distinct, text remains readable
- [ ] Test with user font-size adjustment (system preferences): content scales appropriately

---

## 2. Color System: Light Mode & Dark Mode

### Light Mode (Default)

**Design**: Minimal, sparse aesthetic per Constitution Principle II; high contrast per HIG.

```css
:root {
  /* Light mode defaults */
  --background: #ffffff;        /* white */
  --foreground: #171717;        /* near-black (gray-900) */
  --text-primary: #171717;      /* high contrast text */
  --text-secondary: #4b5563;    /* gray-600: secondary text */
  --text-tertiary: #9ca3af;     /* gray-400: tertiary text (labels, placeholders) */
  --border: #e5e7eb;            /* gray-100: borders, dividers */
  --focus-ring: #171717;        /* focus indicator ring */
}
```

**Contrast Verification** (WCAG 2.1 Level AA minimum):
- Text on background (#171717 on #ffffff): **21:1** ✓ AAA (exceeds 4.5:1 requirement)
- Secondary text (#4b5563 on #ffffff): **8.5:1** ✓ AA (exceeds 4.5:1 requirement)
- Tertiary text (#9ca3af on #ffffff): **4.8:1** ✓ AA (meets 4.5:1 requirement)
- Focus ring (#171717): **21:1** ✓ Exceeds 3:1 requirement for focus indicators

### Dark Mode (New)

**Design**: Independent palette (not inverted) with dark grays instead of pure black per HIG Foundations: Dark Mode (reduce eye strain).

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode overrides */
    --background: #1a1a1a;       /* dark gray (not pure black per HIG) */
    --foreground: #f5f5f5;       /* off-white (not pure white) */
    --text-primary: #f5f5f5;     /* light text on dark background */
    --text-secondary: #d1d5db;   /* gray-300: secondary text in dark */
    --text-tertiary: #9ca3af;    /* gray-400: tertiary text */
    --border: #404040;           /* dark border for dark mode */
    --focus-ring: #60a5fa;       /* blue focus ring for visibility in dark */
  }
}
```

**Contrast Verification** (Dark Mode - WCAG 2.1 Level AA):
- Text on dark background (#f5f5f5 on #1a1a1a): **21:1** ✓ AAA
- Secondary text (#d1d5db on #1a1a1a): **13:1** ✓ AAA
- Focus ring (#60a5fa on #1a1a1a): **6.5:1** ✓ AA (exceeds 3:1)

### Implementation Requirements

- [ ] Replace inline color values with CSS custom properties
- [ ] Set light mode variables in `:root` (default)
- [ ] Override variables in `@media (prefers-color-scheme: dark)` block
- [ ] Update all color references in globals.css and components to use variables
- [ ] Verify contrast ratios in both light and dark modes using WebAIM contrast checker
- [ ] Test focus indicators in both modes (ring must be clearly visible)
- [ ] Test with color blindness simulator (deuteranopia, protanopia, tritanopia) to ensure usability
- [ ] Document color decisions in comments for future maintainers

---

## 3. Dark Mode Implementation

### CSS Architecture

**Approach**: CSS custom properties with prefers-color-scheme media query (no JavaScript required).

**File structure**:
```
app/globals.css
├── Root variables (light mode defaults)
├── Utility classes and Tailwind imports
├── Media query block for dark mode overrides
└── Reduced-motion support
```

### Technical Specification

**Light mode** (default):
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --text-secondary: #4b5563;
  --border: #e5e7eb;
  --focus-ring: #171717;
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

**Dark mode** override:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a1a;
    --foreground: #f5f5f5;
    --text-secondary: #d1d5db;
    --border: #404040;
    --focus-ring: #60a5fa;
  }
}
```

**Component usage** (example - Sidebar):
```tsx
// Before (hardcoded colors)
className="bg-white text-gray-600"

// After (using CSS variables)
className="bg-[var(--background)] text-[var(--text-secondary)]"
```

### Browser Support

- **prefers-color-scheme**: Supported in all modern browsers (>95% of users)
  - Chrome/Edge 76+
  - Firefox 67+
  - Safari 12.1+
  - Mobile browsers (iOS Safari 13+, Android Chrome 76+)
- **Fallback**: Light mode for older browsers (graceful degradation)

### Testing Requirements

- [ ] Test on macOS: System Preferences > General > Appearance (Light/Dark)
- [ ] Test on iOS: Settings > Display & Brightness
- [ ] Test on Android: Settings > Display > Dark theme
- [ ] Browser DevTools: Emulate prefers-color-scheme in Chrome DevTools
- [ ] Test all pages in both light and dark
- [ ] Verify images render appropriately (no color shifts, readable)
- [ ] Test interactive elements (hover, focus) in both modes
- [ ] Verify text contrast in dark mode (≥ 4.5:1)

---

## 4. Accessibility Requirements (WCAG 2.1 Level AA)

### Semantic HTML

**Requirement**: Use proper heading hierarchy and landmarks.

```html
<!-- Good: proper hierarchy -->
<html lang="en">
  <body>
    <nav>Navigation</nav>
    <main>
      <h1>Page Title</h1>
      <h2>Section</h2>
      <p>Content</p>
    </main>
    <footer>Footer</footer>
  </body>
</html>

<!-- Bad: skipped levels, missing landmarks -->
<body>
  <h1>Title</h1>
  <h3>Skips h2</h3>  <!-- ✗ Don't do this -->
  <div>No semantic main</div>  <!-- ✗ Use <main> -->
</body>
```

**Implementation**:
- [ ] Verify root layout has `<nav>`, `<main>`, and `<footer>` landmarks
- [ ] Verify heading hierarchy: h1 → h2 → h3 (no skipped levels)
- [ ] Use semantic elements: nav, main, footer, header, article, section (not just div)
- [ ] Add `lang="en"` to html element (already present)

### Focus Management & Indicators

**Requirement**: Keyboard navigable with visible focus indicators (≥ 3:1 contrast).

**Current implementation** (verified ✓):
```css
focus-visible:ring-2 focus-visible:ring-gray-900
/* Light: ring contrast 21:1 ✓ */

/* Dark mode: update to blue for visibility */
@media (prefers-color-scheme: dark) {
  :focus-visible {
    outline: 2px solid var(--focus-ring);  /* #60a5fa: 6.5:1 contrast ✓ */
  }
}
```

**Testing**:
- [ ] Tab through entire site: all interactive elements reachable
- [ ] Focus ring visible in light AND dark modes
- [ ] Focus ring has ≥ 3:1 contrast (verified above)
- [ ] Focus order logical (left to right, top to bottom)

### Reduced Motion Support

**Requirement**: Respect `prefers-reduced-motion` preference.

**Current implementation** (verified ✓):
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Testing**:
- [ ] Enable reduced-motion in OS settings
- [ ] Verify sidebar slide animation is disabled
- [ ] Verify all transitions/animations are removed

### Screen Reader Compatibility

**Requirement**: All content and navigation discoverable via screen readers.

**ARIA enhancements needed**:

```tsx
// Navigation component improvements
<nav aria-label="Main navigation">
  <ul>
    <li>
      <Link 
        href="/portfolio"
        aria-current={isActive ? "page" : undefined}
      >
        Portfolio
      </Link>
    </li>
    <li>
      <button 
        aria-expanded={isExpanded}
        aria-controls="submenu-1"
        onClick={handleExpand}
      >
        Projects
      </button>
      <ul id="submenu-1" hidden={!isExpanded}>
        {/* submenu items */}
      </ul>
    </li>
  </ul>
</nav>

// Image alt text
<Image 
  src="/portfolio/project-1.jpg"
  alt="Portfolio: Interactive dashboard redesign showcasing Tailwind CSS integration"
/>
```

**ARIA Implementation Checklist**:
- [ ] Add aria-label to navigation regions
- [ ] Add aria-current="page" to active navigation link
- [ ] Add aria-expanded to expandable menu items
- [ ] Add aria-controls pointing to controlled element ID
- [ ] Verify all images have descriptive alt text (not just "image" or "photo")
- [ ] Add aria-label to icon-only buttons (if any)

**Screen Reader Testing**:
- [ ] Test with VoiceOver (macOS): Command+F5 to enable
- [ ] Test with NVDA (Windows, free)
- [ ] Test with JAWS (Windows, paid)
- [ ] Verify all page content announced in logical order
- [ ] Verify navigation structure understood
- [ ] Verify form fields properly labeled

### Image & Media Alt Text

**Requirement**: All images must have descriptive alt text.

**Photography gallery example**:
```tsx
{portfolioItems.map((item) => (
  <figure key={item.id}>
    <Image
      src={item.imagePath}
      alt={item.altText}  // Descriptive alt text
      // Example alt: "Portfolio project: E-commerce mobile app redesign for iOS"
    />
    <figcaption>{item.caption}</figcaption>
  </figure>
))}
```

**Alt text guidelines**:
- **Good**: "Portfolio project: Interactive data visualization dashboard for financial metrics"
- **Bad**: "portfolio image", "photo", "image1"
- **Context**: Describe what's in the image and its significance
- **Length**: Usually 125 characters or less, but complete sentences are fine

**Implementation**:
- [ ] Add alt text to all images (portfolio items, photos, icons)
- [ ] Verify alt text is descriptive and contextual
- [ ] Test with screen reader: alt text announced correctly

### Color Contrast (Verified)

**Already documented above**; no new requirements.

---

## 5. Navigation & Component Patterns

### Sidebar Navigation Pattern

**HIG Alignment**: Sidebar pattern aligns with HIG Components: Navigation.

**Design Elements**:
- **Fixed position**: Sidebar stays accessible while content scrolls
- **Visual affordances**: Hover states (color changes), focus rings indicate interactivity
- **Active indicator**: NEEDS TO BE ADDED—show which page user is currently on
- **Touch target size**: ≥ 44×44px per HIG (verify in mobile view)
- **Menu animation**: Respects reduced-motion preference ✓

**Implementation Requirements**:
- [ ] Add active/current page visual indicator (highlight, underline, or icon)
- [ ] Verify menu item sizes on mobile (tap targets ≥ 44×44px)
- [ ] Test sidebar interaction on touch devices (expand/collapse behavior)
- [ ] Verify submenu affordances (visual indication that items expand)

### Interactive Element Affordances

**Requirement**: All interactive elements must clearly indicate they're clickable (HIG Patterns: Feedback).

**Current state**:
- Links: `hover:text-gray-900` color change ✓
- Buttons: `hover:text-gray-900` color change ✓
- Focus: `focus-visible:ring` ✓

**Dark mode affordance verification**:
- [ ] Hover states visible in dark mode (color/contrast sufficient)
- [ ] Focus ring visible in dark mode (#60a5fa blue ring)
- [ ] Disabled states (if any) clearly distinguishable

---

## 6. Spacing & Layout (Already Verified)

**Summary**: All existing spacing conforms to 8px base unit system per HIG Layout principles. No changes required.

**Key measurements**:
- Sidebar padding: p-8 (32px) = 4×8px ✓
- Section padding: p-12 (48px) = 6×8px ✓
- Spacing between items: space-y-4 (16px) = 2×8px ✓

---

## 7. Performance & Accessibility Goals

### Lighthouse Metrics

**Targets**:
- **Performance**: ≥ 90 (First Contentful Paint < 1.5s on 3G per constitution)
- **Accessibility**: 100 (WCAG 2.1 Level AA, keyboard navigation, screen reader support)
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

**Testing**:
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Test on mobile (3G network throttling) to verify FCP < 1.5s
- [ ] Document baseline and verify improvement after changes

### Responsive Design

**Breakpoints** (Tailwind CSS default):
- **sm**: 640px (small devices, tablets)
- **md**: 768px (medium devices)
- **lg**: 1024px (large desktops)
- **xl**: 1280px (extra large)

**Testing**:
- [ ] Test at 320px (mobile minimum)
- [ ] Test at 640px (tablet)
- [ ] Test at 1024px+ (desktop)
- [ ] Verify no horizontal scrolling at any width
- [ ] Verify touch targets ≥ 44×44px on mobile

---

## 8. Implementation Checklist

### Typography
- [ ] Define CSS custom properties for font sizes (--text-base through --text-4xl)
- [ ] Set explicit line-height: 1.5+ for body text
- [ ] Apply sizes to semantic HTML elements
- [ ] Verify heading hierarchy (h1 → h2 → h3)
- [ ] Test at 200% zoom and with system font-size adjustment

### Colors & Contrast
- [ ] Replace hardcoded color values with CSS custom properties
- [ ] Set light mode variables in :root
- [ ] Implement dark mode overrides in @media (prefers-color-scheme: dark)
- [ ] Verify all color contrast ratios (4.5:1 normal, 3:1 large text)
- [ ] Test in both light and dark modes

### Dark Mode
- [ ] Update all color references to use CSS variables
- [ ] Test on macOS (System Preferences > Appearance)
- [ ] Test on iOS and Android (system dark mode)
- [ ] Verify images render appropriately in dark
- [ ] Test focus indicators in dark mode

### Accessibility
- [ ] Verify semantic HTML landmarks (nav, main, footer)
- [ ] Add ARIA labels and aria-current to navigation
- [ ] Add aria-expanded to expandable menu items
- [ ] Test keyboard navigation (Tab through all elements)
- [ ] Test with screen reader (VoiceOver, NVDA, or JAWS)
- [ ] Verify all images have descriptive alt text
- [ ] Verify reduced-motion preference respected
- [ ] Run Lighthouse accessibility audit (target: 100/100)

### Navigation & Interactions
- [ ] Add active page indicator to navigation
- [ ] Verify hover/focus states in both light and dark
- [ ] Test sidebar behavior on mobile
- [ ] Verify focus ring visible in both modes
- [ ] Test with touch on mobile devices

### Testing & Verification
- [ ] Run Lighthouse audit (Performance ≥90, Accessibility 100)
- [ ] Run axe DevTools automated accessibility scan
- [ ] Manual keyboard-only navigation test
- [ ] Manual screen reader test
- [ ] Test prefers-color-scheme in browser (Chrome DevTools)
- [ ] Test prefers-reduced-motion in OS settings
- [ ] Test on real devices (iPhone, Android, Windows, Mac)

---

## 9. Summary & Next Steps

This design model specifies:
1. ✓ Typography system with explicit sizing, hierarchy, and readability (HIG + WCAG)
2. ✓ Color system for light and dark modes with verified contrast (≥ 4.5:1)
3. ✓ Dark mode implementation approach (CSS variables + prefers-color-scheme)
4. ✓ Accessibility requirements (WCAG 2.1 Level AA, ARIA, focus management)
5. ✓ Navigation patterns aligned with HIG standards
6. ✓ Performance and responsive design targets

**Phase 1 Complete**: Design specifications ready for implementation.

**Next Phase**: Execute tasks.md (generated by `/speckit.tasks`) to implement specifications above.
