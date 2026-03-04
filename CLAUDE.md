# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static advocacy site for pedestrian safety on Martin Way in Olympia, WA. Built with Astro, deployed to Cloudflare Workers. The site presents crash data, transit info, and civic action tools (public comment forms, council email templates) around a proposed Chick-fil-A drive-through on the county's deadliest pedestrian corridor.

Live at: https://martinwayforpeople.org

## Commands

- `npm run dev` — Start dev server (Astro + Vite)
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally
- `npx wrangler deploy` — Deploy to Cloudflare Workers

No test runner, linter, or formatter is configured.

## Architecture

**Astro 5 static site** with file-based routing, Tailwind CSS, and a single interactive island (Leaflet map).

### Source Layout

- `src/pages/` — Routes: `index.astro` (landing), `about.astro` (methodology)
- `src/layouts/BaseLayout.astro` — Shared HTML shell with SEO meta tags, Google Fonts, OG/Twitter cards
- `src/islands/SafetyMap.astro` — The only interactive component. Lazy-loads Leaflet via IntersectionObserver when scrolled into view. Fetches GeoJSON/CSV from `public/data/` at runtime.
- `src/data/` — TypeScript constants: `site-meta.ts` (site name, URL, OG image), `appeal-status.ts` (hearing dates, Tally form URL, planner contact)
- `src/styles/global.css` — Tailwind directives, `animate-fade-up` animation with `.delay-1` through `.delay-5`
- `public/data/` — Static data files: `crashes.geojson`, `bus_stops.csv`, `crossings.csv`, `site_parcel.geojson`, `safety_corridor.geojson`

### Key Patterns

- **Islands architecture**: Only `SafetyMap.astro` uses client-side JS. Everything else is static HTML + Tailwind. No React/Vue/Svelte.
- **Lazy loading**: Leaflet is dynamically imported only when the map container enters the viewport (200px rootMargin). The map guards against double-init with `_leafletInit` flag.
- **Data flow**: GeoJSON and CSV files are fetched client-side by the map's `<script>` block, parsed with a custom quote-aware CSV parser, and rendered as Leaflet layers/markers.
- **No trailing slashes**: Astro config uses `trailingSlash: 'never'` and `build.format: 'file'`.

### Design Tokens (tailwind.config.mjs)

| Token | Value | Usage |
|-------|-------|-------|
| `ink` | `#1a1a1a` | Body text |
| `paper` / `paper-warm` | `#f5f2ed` / `#ede8e0` | Page backgrounds |
| `danger` | `#b91c1c` | CTAs, alerts, fatal crash markers |
| `data` | `#1e40af` | Links, informational elements |
| `muted` | `#475569` | Secondary text (light and dark backgrounds) |
| `muted-light` | `#94a3b8` | Secondary text on **dark backgrounds only** (fails contrast on light) |
| `border` | `#d6d0c4` | Card/section borders |
| `green` | `#166534` | Status indicators |

**Typography**: `font-display` = Source Serif 4 (headings), `font-body` = IBM Plex Sans (body text).

### Accessibility

- **Color contrast**: All text passes WCAG AA. `text-muted-light` must only be used on dark backgrounds (`bg-ink`). Use `text-muted` for secondary text on light backgrounds.
- **Skip navigation**: BaseLayout includes a skip-to-content link targeting `#main-content`.
- **Reduced motion**: `global.css` includes a `prefers-reduced-motion: reduce` query that disables fade-up animations, pulse, and smooth scroll.
- **Decorative elements**: SVG icons and status dots use `aria-hidden="true"`. The SafetyMap has `role="application"` with a descriptive `aria-label`.
- **External links**: Links opening new tabs include `(opens in new tab)` screen-reader text.
