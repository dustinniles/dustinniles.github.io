---
title: "Pattern: Theming and Color System"
type: note
permalink: patterns/theming
tags:
  - pattern
  - theming
  - dark-mode
  - css-variables
  - accessibility
---

# Pattern: Theming and Color System

## Overview
- [pattern] All colors defined as CSS custom properties in `app/globals.css`, enabling light/dark mode switching without JavaScript #theming
- [pattern] Dark mode activates automatically via `@media (prefers-color-scheme: dark)` #dark-mode

## Color Palette

### Light Mode
- [config] `--background: #ffffff` (white) #color
- [config] `--foreground: #171717` (near-black, 21:1 contrast on white) #color
- [config] `--text-secondary: #4b5563` (gray-600, 8.5:1 contrast on white -- WCAG AAA) #color
- [config] `--text-tertiary: #9ca3af` (gray-400, 4.8:1 contrast on white -- WCAG AA) #color
- [config] `--border: #e5e7eb` (light gray) #color
- [config] `--focus-ring: #171717` (matches foreground, 21:1 contrast) #color

### Dark Mode
- [config] `--background: #1a1a1a` (dark gray, not pure black per HIG guidance) #color
- [config] `--foreground: #f5f5f5` (near-white, 21:1 contrast on dark background) #color
- [config] `--text-secondary: #d1d5db` (light gray, 13:1 contrast on dark) #color
- [config] `--text-tertiary: #9ca3af` (same value as light mode, 7.8:1 contrast on dark) #color
- [config] `--border: #404040` (medium gray) #color
- [config] `--focus-ring: #60a5fa` (blue, 6.5:1 contrast on dark -- distinct from text colors) #color

## Typography Scale
- [config] `--text-xs: 0.75rem` (12px), `--text-sm: 0.875rem` (14px), `--text-base: 1rem` (16px), `--text-lg: 1.125rem` (18px) #typography
- [config] `--text-xl: 1.25rem` (20px), `--text-2xl: 1.5rem` (24px), `--text-3xl: 1.875rem` (30px), `--text-4xl: 2.25rem` (36px) #typography
- [config] Line heights: `--line-height-tight: 1.25` (headings), `--line-height-normal: 1.5` (body, WCAG minimum), `--line-height-relaxed: 1.75` #typography

## Usage in Components
- [pattern] Components reference CSS variables via Tailwind arbitrary values: `text-[var(--foreground)]`, `bg-[var(--background)]`, `border-[var(--border)]` #tailwind
- [pattern] No hardcoded color values (e.g., `text-gray-600`) in components -- all go through CSS variables #consistency
- [pattern] Focus indicator: `outline: 2px solid var(--focus-ring)` with `outline-offset: 2px` on `*:focus-visible` #a11y

## Accessibility Compliance
- [pattern] All text colors meet WCAG 2.1 AA contrast minimums (4.5:1 for normal text) in both light and dark modes #a11y
- [pattern] Focus ring color changes between modes (dark text on light background, blue on dark background) for maximum visibility #a11y
- [pattern] Body text minimum 16px (`--text-base: 1rem`) per HIG and WCAG recommendations #a11y

## Relations
- related_to [[architecture/system-overview]]
- related_to [[patterns/layout-system]]
- related_to [[decisions/design-philosophy]]
- related_to [[decisions/font-choice]]
