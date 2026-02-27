---
title: "Decision: IBM Plex Mono Font"
type: note
permalink: decisions/font-choice
tags:
  - decision
  - typography
  - design
---

# Decision: IBM Plex Mono Font

## Context
- [decision] The site needed a typeface that conveys a technical, minimal aesthetic aligned with the portfolio's sparse design #design
- [decision] System fonts were initially considered for fast loading but lacked the desired character #typography

## Decision
- [decision] IBM Plex Mono selected as the sole typeface for the entire site #typography
- [decision] Loaded via `@fontsource/ibm-plex-mono` npm package (self-hosted, no external font CDN requests) #performance
- [decision] Two weights used: 300 (light) for body/navigation and 400 (regular) for active/emphasized elements #weights

## Rationale
- [decision] Monospace font provides a distinctive, developer/creative aesthetic that differentiates the portfolio #aesthetic
- [decision] IBM Plex is an open-source font family with excellent Unicode coverage and readability #quality
- [decision] Self-hosting via `@fontsource` avoids external network requests, respects CSP (`font-src 'self'`), and improves load performance #performance #security
- [decision] Light weight (300) creates the airy, minimal feel described in design principles #minimal

## Implementation
- [config] Font imported in `app/globals.css` via `@import "@fontsource/ibm-plex-mono/300.css"` and `@import "@fontsource/ibm-plex-mono/400.css"` #css
- [config] Applied globally via Tailwind `@theme` directive: `--font-sans: 'IBM Plex Mono', monospace` #tailwind
- [config] Body font-size set to `var(--text-base)` (1rem / 16px) with line-height `var(--line-height-normal)` (1.5) per WCAG #accessibility

## Relations
- related_to [[architecture/system-overview]]
- related_to [[decisions/design-philosophy]]
- related_to [[patterns/theming]]
