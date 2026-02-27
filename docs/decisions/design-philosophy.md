---
title: "Decision: Design Philosophy and HIG Compliance"
type: note
permalink: decisions/design-philosophy
tags:
  - decision
  - design
  - accessibility
  - hig
---

# Decision: Design Philosophy and HIG Compliance

## Context
- [decision] The site is a personal portfolio for a photographer/creative professional #portfolio
- [decision] Design must prioritize large imagery and content over UI chrome #design
- [decision] Apple Human Interface Guidelines (HIG) used as the design standard #hig

## Design Principles
- [decision] Minimal and sparse aesthetic: emphasize whitespace and large imagery over decorative elements #minimal
- [decision] Fixed sidebar navigation that remains accessible while content scrolls #layout
- [decision] Light font weights (300, 400) with subtle color hierarchy (foreground, secondary, tertiary) #typography
- [decision] IBM Plex Mono as the sole typeface -- monospace font providing a distinctive, technical aesthetic #typography
- [decision] Single-column content layout for portfolio items #layout

## HIG Compliance
- [decision] Full audit conducted against Apple HIG Foundations: Layout, Color, Typography, Dark Mode, Accessibility, Inclusion, Writing #hig
- [decision] WCAG 2.1 Level AA compliance targeted with Lighthouse Accessibility score of 100 #a11y
- [decision] 8px grid units for spacing consistency per HIG Layout foundations #spacing
- [decision] Color contrast ratios verified: 4.5:1 minimum for normal text, 3:1 for large text #contrast

## Dark Mode
- [decision] Dark mode supported via `prefers-color-scheme: dark` CSS media query #dark-mode
- [decision] Dark background uses `#1a1a1a` (dark gray, not pure black) per HIG recommendation #color
- [decision] All color values defined as CSS custom properties in `:root` and overridden in dark media query #theming

## Content Security
- [decision] Strict CSP policy: `default-src 'self'`, no `unsafe-inline` or `unsafe-eval` #security
- [decision] Frame sources restricted to YouTube (nocookie) and Vimeo for video embeds #security

## Relations
- related_to [[architecture/system-overview]]
- related_to [[patterns/theming]]
- related_to [[patterns/layout-system]]
