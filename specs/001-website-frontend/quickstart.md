# Quick Start: Implementing HIG Compliance

**Purpose**: Rapid reference for developers implementing the HIG compliance feature.

**Prerequisites**: Read specs/001-website-frontend/data-model.md for detailed design specifications.

---

## Overview

Transform the portfolio website to achieve full Apple HIG compliance (Foundations and Components). Work spans 3 main areas:

1. **Typography & Colors**: Add CSS variables, explicit font sizing, dark mode support
2. **Accessibility**: ARIA labels, screen reader testing, semantic HTML verification
3. **Navigation**: Add active page indicator, enhance affordances, mobile touch targets

**Timeline**: Estimated 3-5 tasks (see tasks.md for detailed breakdown)

---

## Quick Reference: Key Changes

### 1. CSS Variables (globals.css)

**Add to `:root`**:
```css
:root {
  --font-sans: 'IBM Plex Sans', system-ui, sans-serif;
  
  /* Typography scale */
  --text-base: 1rem;
  --text-sm: 0.875rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* Line heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Colors - Light Mode */
  --background: #ffffff;
  --foreground: #171717;
  --text-secondary: #4b5563;
  --text-tertiary: #9ca3af;
  --border: #e5e7eb;
  --focus-ring: #171717;
}

/* Dark Mode Override */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a1a;
    --foreground: #f5f5f5;
    --text-secondary: #d1d5db;
    --text-tertiary: #9ca3af;
    --border: #404040;
    --focus-ring: #60a5fa;
  }
}
```

### 2. Body Styling (globals.css)

**Update**:
```css
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--line-height-normal);
}

/* Ensure explicit line-height for readability */
p, span, li {
  line-height: var(--line-height-normal);
}

h1, h2, h3 {
  line-height: var(--line-height-tight);
}
```

### 3. Component Color Updates

**Before** (hardcoded):
```tsx
className="bg-white text-gray-600 hover:text-gray-900"
```

**After** (using CSS variables):
```tsx
className="bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--foreground)]"
```

**For Tailwind arbitrary values**:
```tsx
// Use inline styles for CSS variables if Tailwind doesn't support
style={{ backgroundColor: 'var(--background)' }}

// Or update tailwind.config if available:
backgroundColor: 'var(--background)'
```

### 4. Navigation ARIA Enhancements

**MenuSlider.tsx updates**:
```tsx
// Add aria-label to nav
<nav aria-label="Main navigation">

// Add aria-current to active link
<Link 
  href={item.target}
  aria-current={isCurrentPage ? "page" : undefined}
>
  {item.label}
</Link>

// Add aria-expanded to expandable items
<button
  aria-expanded={expandedParent === item.id}
  aria-controls={`submenu-${item.id}`}
>
  {item.label}
</button>
<ul id={`submenu-${item.id}`} hidden={expandedParent !== item.id}>
  {/* items */}
</ul>
```

### 5. Image Alt Text

**Before**:
```tsx
<Image src="/portfolio/project.jpg" alt="project" />
```

**After**:
```tsx
<Image 
  src="/portfolio/project.jpg" 
  alt="Portfolio project: Interactive data visualization dashboard redesigned for iOS and Android using React Native"
/>
```

### 6. Testing Checklist

Quick verification:
- [ ] Run `npm run lint` - no ESLint errors
- [ ] Run `npm run build` - static export succeeds
- [ ] Open DevTools > Accessibility > Run Lighthouse
- [ ] Check Accessibility score = 100
- [ ] Test dark mode: DevTools > Rendering > Emulate CSS media feature preference `prefers-color-scheme: dark`
- [ ] Tab through page: all interactive elements reachable, focus visible
- [ ] VoiceOver (Mac): Cmd+F5 to enable; navigate using VO+Right Arrow
- [ ] Run axe DevTools in DevTools extensions

---

## Common Issues & Solutions

### Issue 1: Colors Not Updating in Dark Mode

**Problem**: Dark mode active but colors stay light.

**Solution**:
- Verify `@media (prefers-color-scheme: dark)` is in globals.css
- Check browser supports prefers-color-scheme (>95% do)
- DevTools: Settings > Rendering > Check `prefers-color-scheme` emulation
- Clear browser cache (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)

### Issue 2: Focus Ring Not Visible

**Problem**: Can't see focus indicator when tabbing.

**Solution**:
- Verify `focus-visible:ring-2 focus-visible:ring-gray-900` is applied
- Ensure ring color has ≥ 3:1 contrast with background
- Dark mode: update to blue (#60a5fa) for visibility
- Test with DevTools: Tab to element, check computed styles

### Issue 3: Animations Still Playing with Reduced Motion Enabled

**Problem**: `prefers-reduced-motion` not respected.

**Solution**:
- Verify `@media (prefers-reduced-motion: reduce)` block in globals.css
- Ensure all transitions use `transition-duration` (not hardcoded in `@keyframes`)
- Check any client-side animation libraries (update to respect prefers-reduced-motion)

### Issue 4: Images Look Wrong in Dark Mode

**Problem**: Images have poor contrast or color shift in dark.

**Solution**:
- Images themselves don't change color (CSS doesn't affect JPG/PNG directly)
- Consider adding dark mode filter if images are too bright: `filter: brightness(0.8) contrast(1.1)`
- Or use picture element with dark/light variants if critical
- Usually not needed; verify with real testing first

### Issue 5: Lighthouse Accessibility Not 100

**Problem**: Still missing points after changes.

**Common fixes**:
- Verify all images have alt text (not just portfolio items)
- Check form labels properly associated (if forms exist)
- Verify links have discernible text (not empty href or title-only)
- Run axe DevTools to get detailed error list
- Check color contrast in DevTools: Elements > Accessibility tab

---

## Reference: HIG Compliance Checklist

Quick checklist for developers:

**Typography**:
- [ ] Body text ≥ 16px (1rem)
- [ ] Line height ≥ 1.5x font size
- [ ] Heading hierarchy visually distinct (h1 > h2 > h3)
- [ ] IBM Plex Sans is only font loaded

**Colors**:
- [ ] Light mode text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [ ] Dark mode text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [ ] Background colors dark gray (#1a1a1a) not pure black
- [ ] All interactive elements have hover/focus states in both modes

**Dark Mode**:
- [ ] CSS variables updated in @media (prefers-color-scheme: dark)
- [ ] All colors use --variables, not hardcoded hex/rgb
- [ ] Images tested in dark (readable, no color shift)
- [ ] Tested on macOS (System Prefs > Appearance)
- [ ] Tested on iOS (Settings > Display & Brightness)

**Accessibility**:
- [ ] Keyboard navigation (Tab, Enter, Escape) works throughout
- [ ] Focus indicator visible in light AND dark modes
- [ ] All images have descriptive alt text (≠ "image" or "photo")
- [ ] Heading hierarchy: h1 → h2 → h3 (no skipped levels)
- [ ] ARIA: nav labels, aria-current on active link, aria-expanded on menu items
- [ ] Reduced-motion: animations disabled when prefers-reduced-motion enabled
- [ ] Screen reader testing: VoiceOver or NVDA
- [ ] Lighthouse Accessibility = 100

**Navigation**:
- [ ] Active page indicator visible in sidebar
- [ ] Menu items have hover/focus affordances
- [ ] Submenu items clearly expandable/collapsible
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Menu accessible with Escape key

**Performance**:
- [ ] Lighthouse Performance ≥ 90
- [ ] FCP < 1.5s on 3G (test with DevTools throttling)

---

## Files to Modify

| File | Purpose | Type |
|------|---------|------|
| app/globals.css | Add CSS variables, dark mode, typography | Required |
| components/MenuSlider.tsx | Add ARIA, active indicator, dark mode colors | Required |
| app/layout.tsx | Update color references to use CSS variables | Required |
| app/page.tsx | Verify heading hierarchy, add alt text | Required |
| components/SocialLinks.tsx | Update colors to use CSS variables | Required |
| [Any image components] | Add descriptive alt text | Required |

**Note**: See tasks.md for detailed task breakdown and implementation order.

---

## Testing Workflow

1. **Local Development**:
   ```bash
   npm run dev
   # Open http://localhost:3000
   # Test light mode, then enable dark mode in browser DevTools
   ```

2. **Accessibility**:
   ```bash
   npm run lint  # Check for obvious issues
   # Open DevTools > Lighthouse > Run audit
   # Verify Accessibility = 100
   ```

3. **Real Testing**:
   - macOS: System Preferences > General > Appearance (toggle Light/Dark)
   - iPhone: Settings > Display & Brightness > Dark
   - Android: Settings > Display > Dark theme
   - Screen reader: VoiceOver (Cmd+F5 on Mac)

4. **Build & Deploy**:
   ```bash
   npm run build
   # Verify /out directory created (static export)
   # Push to main to trigger GitHub Actions deployment
   ```

---

## Next Steps

1. Read data-model.md for detailed design specifications
2. Generate tasks.md using `/speckit.tasks` command
3. Implement tasks in order (dependency-aware)
4. Test after each task
5. Run full Lighthouse audit when complete
6. Push to main branch for automatic deployment

---

## Resources

- **Apple HIG**: https://developer.apple.com/design/human-interface-guidelines/
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **IBM Plex Sans**: https://github.com/IBM/plex

---

**Contact**: See CLAUDE.md for project guidance and constraints.
