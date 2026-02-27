---
title: "Pattern: Navigation System"
type: note
permalink: patterns/navigation
tags:
  - pattern
  - navigation
  - menu
  - data
---

# Pattern: Navigation System

## Overview
- [pattern] Hierarchical two-level navigation rendered in the fixed sidebar #navigation
- [pattern] Menu structure defined as static data in `app/data/navigation.ts`, not hardcoded in JSX #data-driven

## Data Model
- [data_flow] `NavigationMenuItem` interface defines each menu item with `id`, `label`, `target` (route path), `level` (0 or 1), `parentId`, `children` array, optional `icon`, and `order` #types
- [data_flow] Top-level items (level 0): Work, Play, Contact, About #structure
- [data_flow] Work children (level 1): Resume (`/resume`), Photography (`/photography`), Video (`/video`) #structure
- [data_flow] Play children (level 1): Cycling (`/cycling`), Tech (`/tech`), Volunteering (`/volunteering`) #structure
- [data_flow] Contact and About have no children (leaf items at level 0) #structure

## Interaction Pattern
- [pattern] Clicking a parent item (Work, Play) navigates to its target route AND toggles its submenu open/closed #interaction
- [pattern] `expandedParent` state tracks which parent's submenu is currently visible; only one at a time #state
- [pattern] Clicking a leaf item (Contact, About) navigates and expands the sidebar #interaction
- [pattern] Pressing Escape closes the expanded submenu first, then collapses the sidebar on second press #keyboard

## Active State Detection
- [pattern] `isActivePath(path)` checks if `pathname === path` or `pathname.startsWith(path + '/')` for parent highlighting #routing
- [pattern] Active items use `text-[var(--foreground)]` with `font-normal` (400 weight); inactive use `text-[var(--text-secondary)]` with `font-light` (300 weight) #styling
- [pattern] Active child links receive `aria-current="page"` attribute #a11y

## Submenu Rendering
- [pattern] Submenus use `<ul>` with `id={submenu-${item.id}}` matching parent's `aria-controls` attribute #a11y
- [pattern] Submenus are hidden via `hidden` class (CSS `display: none`) when not active, not via conditional rendering -- preserving DOM for accessibility #a11y
- [pattern] Submenu items indented with `pl-4` and separated by `border-l border-[var(--border)]` #styling

## Sync with Route Changes
- [pattern] `expandedParent` syncs to pathname during render using the "compare previous state" pattern (not `useEffect`) #react
- [pattern] When navigating to a child route, the corresponding parent's submenu auto-expands #navigation

## Social Links
- [pattern] Social links (LinkedIn, GitHub) rendered at sidebar bottom, visible only when sidebar is expanded and on desktop #social
- [pattern] Each link opens in new tab with `rel="noopener noreferrer"` and has an `aria-label` for screen readers #a11y
- [pattern] Icons are inline SVGs with `aria-hidden="true"` plus `sr-only` text labels #a11y

## Relations
- related_to [[architecture/system-overview]]
- related_to [[patterns/layout-system]]
- related_to [[patterns/theming]]
