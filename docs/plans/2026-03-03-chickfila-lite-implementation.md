# Chickfila-Lite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILLS:
> - Use superpowers:executing-plans to implement this plan task-by-task.
> - Use the **humanizer** skill to review ALL site copy (every heading, paragraph, label, coaching note, and CTA) after writing it. Run humanizer on the completed index.astro and about.astro before the final review task. Fix any AI-isms: inflated symbolism, promotional language, em dash overuse, rule of three, vague attributions, AI vocabulary words ("tapestry", "comprehensive", "crucial", "landscape", "multifaceted", "holistic", etc.), and negative parallelisms.

**Goal:** Build a single-page advocacy site with an interactive crash map that drives visitors to submit public comments and email city council.

**Architecture:** Astro static site with one main scroll page and one /about page. The Leaflet safety map is ported from the original martinwayforpeople repo. Light editorial theme with Source Serif 4 and IBM Plex Sans fonts. Deploys to Cloudflare Workers.

**Tech Stack:** Astro 5, Tailwind CSS 3, Leaflet 1.9, Cloudflare Workers (wrangler)

**Writing Style:** Short sentences. Active voice. One idea per sentence. No compound sentences. Let the data hit hard. The appeal is legal prose — the site is not. Run the **humanizer** skill on all copy before finalizing.

**Original repo reference:** `/tmp/martinwayforpeople-review/`

---

### Task 1: Initialize the Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `wrangler.jsonc`

**Step 1: Create package.json**

```json
{
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.19"
  },
  "dependencies": {
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.18.0",
    "leaflet": "^1.9.4"
  }
}
```

**Step 2: Create astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
```

**Step 3: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

**Step 4: Create wrangler.jsonc**

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "chickfila-lite",
  "compatibility_date": "2025-09-27",
  "assets": {
    "directory": "./dist"
  }
}
```

**Step 5: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, lockfile generated

**Step 6: Verify Astro runs**

Run: `npx astro build 2>&1 || true`
Expected: May warn about missing pages — that's fine. Confirms Astro is installed.

**Step 7: Commit**

```bash
git init
git add package.json astro.config.mjs tsconfig.json wrangler.jsonc package-lock.json
git commit -m "chore: initialize Astro project with Tailwind and Leaflet"
```

---

### Task 2: Set up Tailwind config and global CSS

**Files:**
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`

**Step 1: Create tailwind.config.mjs**

The lite site uses a light theme. New color palette, new fonts.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        paper: { DEFAULT: '#f5f2ed', warm: '#ede8e0' },
        danger: { DEFAULT: '#b91c1c', light: '#fef2f2', dark: '#7f1d1d' },
        data: { DEFAULT: '#1e40af', light: '#eff6ff' },
        muted: { DEFAULT: '#475569', light: '#94a3b8' },
        border: '#d6d0c4',
        green: { deep: '#166534', bg: '#f0fdf4', border: '#bbf7d0' },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
    }
  }
}
```

**Step 2: Create src/styles/global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Fonts: Google Fonts loaded via <link> in BaseLayout ── */

* { -webkit-tap-highlight-color: transparent; }

body {
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
}

/* Fade-up entrance animation */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 0.7s ease-out both;
}
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }

/* Smooth scroll */
html { scroll-behavior: smooth; }
```

**Step 3: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css
git commit -m "chore: add Tailwind config with light editorial theme"
```

---

### Task 3: Copy data assets from original repo

**Files:**
- Create: `public/data/bus_stops.csv`
- Create: `public/data/crossings.csv`
- Create: `public/data/crashes.geojson`
- Create: `public/data/site_parcel.geojson`
- Create: `public/data/safety_corridor.geojson`

**Step 1: Copy data files**

```bash
mkdir -p public/data
cp /tmp/martinwayforpeople-review/public/data/bus_stops.csv public/data/
cp /tmp/martinwayforpeople-review/public/data/crossings.csv public/data/
cp /tmp/martinwayforpeople-review/public/data/crashes.geojson public/data/
cp /tmp/martinwayforpeople-review/public/data/site_parcel.geojson public/data/
cp /tmp/martinwayforpeople-review/public/data/safety_corridor.geojson public/data/
```

**Step 2: Verify files exist and have content**

Run: `wc -l public/data/*`
Expected: All files have content (crashes.geojson is the largest)

**Step 3: Commit**

```bash
git add public/data/
git commit -m "chore: copy map data assets from original repo"
```

---

### Task 4: Create data modules and BaseLayout

**Files:**
- Create: `src/data/site-meta.ts`
- Create: `src/data/appeal-status.ts`
- Create: `src/layouts/BaseLayout.astro`

**Step 1: Create src/data/site-meta.ts**

```typescript
export const siteMeta = {
  name: 'Martin Way for People',
  url: 'https://martinwayforpeople.org',
  ogImage: 'https://martinwayforpeople.org/images/og.png',
  description: 'The city approved 1,693 daily car trips on the deadliest pedestrian corridor in Thurston County — without studying pedestrian safety.',
} as const;
```

**Step 2: Create src/data/appeal-status.ts**

```typescript
export const appealStatus = {
  hearingScheduled: false,
  hearingDate: null as string | null,
  tallyFormUrl: 'https://tally.so/r/A7lDPB',
  appealFiledDate: '2026-03-13',
  planner: {
    name: 'Casey Mauck',
    email: 'cmauck@ci.olympia.wa.us',
    phone: '360.753.8048',
  },
} as const;
```

**Step 3: Create src/layouts/BaseLayout.astro**

Simplified from original — no breadcrumbs, no complex JSON-LD. Two pages total.

```astro
---
import '../styles/global.css';
import { siteMeta } from '../data/site-meta';

interface Props {
  title: string;
  description: string;
  canonicalPath: string;
}

const { title, description, canonicalPath } = Astro.props;
const canonicalUrl = siteMeta.url + canonicalPath;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={siteMeta.ogImage}>
  <meta property="og:url" content={canonicalUrl}>
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content={siteMeta.ogImage}>
  <link rel="canonical" href={canonicalUrl}>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,700;8..60,900&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <slot name="head" />
</head>
<body class="bg-paper text-ink antialiased">
  <slot />
</body>
</html>
```

**Step 4: Verify build**

Run: `npx astro build 2>&1 || true`
Expected: No import errors. May warn about no pages yet.

**Step 5: Commit**

```bash
git add src/data/ src/layouts/
git commit -m "feat: add site metadata, appeal status, and base layout"
```

---

### Task 5: Build the main page — Hero and Stats sections

**Files:**
- Create: `src/pages/index.astro`

**Step 1: Create the index page with Hero and Stats**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { siteMeta } from '../data/site-meta';
---

<BaseLayout
  title={`${siteMeta.name} — Pedestrian Safety on Martin Way`}
  description={siteMeta.description}
  canonicalPath="/"
>

<!-- ═══════════ HERO ═══════════ -->
<section class="min-h-screen flex flex-col justify-center px-6 max-w-3xl mx-auto pt-16 pb-20">
  <p class="text-sm font-semibold tracking-widest uppercase text-danger mb-6 animate-fade-up">
    Martin Way · Olympia, WA
  </p>
  <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight animate-fade-up delay-1">
    The city approved 1,693 new daily car trips on this&nbsp;corridor.
    <span class="text-danger">Without studying pedestrian&nbsp;safety.</span>
  </h1>
  <p class="mt-8 text-xl text-muted leading-relaxed max-w-2xl animate-fade-up delay-2">
    Martin Way has the highest pedestrian fatality rate in Thurston County. A Chick-fil-A dual drive-through was approved here. The 90-page traffic study never analyzes pedestrian safety. We appealed. Permits are frozen. Now we need your voice.
  </p>
  <div class="mt-10 animate-fade-up delay-3">
    <a href="#action"
       class="inline-flex items-center gap-2 bg-danger text-white px-8 py-4 text-base font-semibold rounded hover:bg-danger-dark transition-colors">
      Submit a public comment
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
  <p class="mt-16 text-sm text-muted-light tracking-wide animate-fade-up delay-4">↓ Scroll to see the evidence</p>
</section>

<!-- ═══════════ STATS BAR ═══════════ -->
<section class="bg-ink text-white py-12 px-6">
  <div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
    <div>
      <p class="font-display text-4xl sm:text-5xl font-black text-red-500">1,112</p>
      <p class="mt-2 text-sm text-muted-light">Crashes on Martin Way<br>2016–2025</p>
    </div>
    <div>
      <p class="font-display text-4xl sm:text-5xl font-black text-red-500">27</p>
      <p class="mt-2 text-sm text-muted-light">Pedestrians struck<br>by vehicles</p>
    </div>
    <div>
      <p class="font-display text-4xl sm:text-5xl font-black text-blue-400">$1.6M</p>
      <p class="mt-2 text-sm text-muted-light">City spending on<br>pedestrian safety here</p>
    </div>
    <div>
      <p class="font-display text-4xl sm:text-5xl font-black text-red-500">Zero</p>
      <p class="mt-2 text-sm text-muted-light">Pedestrian analysis<br>in the traffic study</p>
    </div>
  </div>
</section>

<!-- ═══════════ WHAT HAPPENED ═══════════ -->
<section class="max-w-3xl mx-auto px-6 py-20 border-t border-border">
  <p class="text-xs font-semibold tracking-[0.12em] uppercase text-muted-light mb-4">What happened</p>
  <h2 class="font-display text-3xl font-bold leading-snug mb-6">
    A 90-page traffic study that never mentions the people on foot
  </h2>
  <p class="text-muted text-lg leading-relaxed mb-4">
    In February 2026, the City of Olympia approved a new Chick-fil-A at 4505 Martin Way E. The project will add 1,693 vehicle trips per day to a four-lane undivided arterial. There are no marked pedestrian crossings near the site.
  </p>
  <p class="text-muted text-lg leading-relaxed mb-4">
    The traffic study analyzes vehicle delay at five intersections. It runs about 90 pages. It contains no pedestrian counts. No pedestrian level-of-service analysis. No assessment of how 1,700 new daily trips affect people who walk along and cross Martin Way.
  </p>

  <div class="bg-danger-light border-l-4 border-danger rounded-r-lg px-7 py-6 my-8">
    <p class="text-danger-dark text-base">
      The Thurston Regional Planning Council identified the project site as one of only <strong class="text-ink">10 priority locations</strong> for new pedestrian crossings along the entire 7-mile corridor. The traffic study does not reference this finding.
    </p>
  </div>

  <p class="text-muted text-lg leading-relaxed">
    Two bus stops next to the site serve 357 daily riders. These are people on foot, walking to and from stops on a road with no crosswalks. The traffic study says nothing about them.
  </p>
</section>

<!-- ═══════════ MAP ═══════════ -->
<section class="bg-ink py-20 px-6" id="map">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-8">
      <p class="text-xs font-semibold tracking-[0.12em] uppercase text-muted-light mb-4">The evidence</p>
      <h2 class="font-display text-3xl font-bold text-white mb-2">Every crash. Every bus stop. The project site.</h2>
      <p class="text-muted-light text-sm">Martin Way E corridor, 2016–2025 · Source: WSDOT, TRPC, Intercity Transit</p>
    </div>
    <div id="safety-map" class="border border-slate-700 rounded-xl shadow-xl shadow-black/30" role="application" aria-label="Interactive map of Martin Way showing crashes, bus stops, crossing locations, and the proposed Chick-fil-A site"></div>
    <div class="flex flex-wrap gap-6 justify-center mt-4">
      <span class="flex items-center gap-2 text-sm text-muted-light"><span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> Pedestrian crash</span>
      <span class="flex items-center gap-2 text-sm text-muted-light"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Vehicle crash</span>
      <span class="flex items-center gap-2 text-sm text-muted-light"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Bus stop</span>
      <span class="flex items-center gap-2 text-sm text-muted-light"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Priority crossing</span>
      <span class="flex items-center gap-2 text-sm text-muted-light"><span class="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-800"></span> Project site</span>
    </div>
  </div>
</section>

<!-- ═══════════ TAKE ACTION ═══════════ -->
<section class="bg-paper-warm py-20 px-6 border-t border-border" id="action">
  <div class="max-w-3xl mx-auto">

    <!-- Status banner -->
    <div class="bg-green-bg border border-green-border rounded-lg px-6 py-4 flex items-center gap-4 mb-8">
      <span class="w-3 h-3 bg-green-deep rounded-full flex-shrink-0 animate-pulse"></span>
      <p class="text-green-deep text-sm font-medium">Appeal filed. All permits are frozen. A public hearing will be scheduled.</p>
    </div>

    <h2 class="font-display text-4xl font-black leading-tight mb-4">
      Your comment becomes part of the&nbsp;record
    </h2>
    <p class="text-muted text-lg mb-12">
      The hearing examiner reviews every public comment. This is how you put pedestrian safety into the official record.
    </p>

    <!-- Primary: Public Comment -->
    <div class="bg-white border-2 border-danger rounded-lg p-8 sm:p-10 mb-6">
      <span class="inline-block text-xs font-bold tracking-widest uppercase bg-danger-light text-danger px-3 py-1 rounded-full mb-4">Time-limited</span>
      <h3 class="font-display text-2xl font-bold mb-3">Submit a public comment</h3>
      <p class="text-muted text-base mb-4">
        Once the hearing is scheduled, there will be a window for written comments. Your comment goes directly to the hearing examiner.
      </p>

      <p class="font-semibold text-ink mb-3">What to focus on:</p>
      <ul class="space-y-2 mb-6">
        <li class="pl-7 relative text-muted text-base">
          <span class="absolute left-0 text-danger font-bold">→</span>
          The traffic study contains zero pedestrian safety analysis
        </li>
        <li class="pl-7 relative text-muted text-base">
          <span class="absolute left-0 text-danger font-bold">→</span>
          Martin Way has the highest pedestrian fatality rate in the county
        </li>
        <li class="pl-7 relative text-muted text-base">
          <span class="absolute left-0 text-danger font-bold">→</span>
          1,693 new daily trips next to bus stops serving 357 riders
        </li>
        <li class="pl-7 relative text-muted text-base">
          <span class="absolute left-0 text-danger font-bold">→</span>
          The city is spending $1.6M on pedestrian safety on this same road
        </li>
        <li class="pl-7 relative text-muted text-base">
          <span class="absolute left-0 text-danger font-bold">→</span>
          TRPC identified this location as a priority crossing
        </li>
      </ul>

      <div class="bg-green-bg border border-green-border rounded-md px-5 py-4 mb-6">
        <p class="text-green-deep text-sm leading-relaxed">
          <strong class="block mb-1">Keep comments focused on pedestrian safety.</strong>
          The hearing examiner rules on whether the environmental review was adequate. Comments about traffic safety and the missing analysis carry the most weight.
        </p>
      </div>

      <a href="#" class="inline-flex items-center gap-2 bg-danger text-white px-6 py-3 text-base font-semibold rounded hover:bg-danger-dark transition-colors">
        Sign up for comment notification
      </a>
    </div>

    <!-- Secondary: Council Email -->
    <div class="bg-white border border-border rounded-lg p-8 sm:p-10">
      <span class="inline-block text-xs font-bold tracking-widest uppercase bg-data-light text-data px-3 py-1 rounded-full mb-4">Ongoing</span>
      <h3 class="font-display text-2xl font-bold mb-3">Email your city council</h3>
      <p class="text-muted text-base mb-4">
        Council members can close the code gap that allowed this approval. They can direct the Planning Commission to study drive-through impacts on Martin Way. For council emails, speak from whatever concerns you — safety, values, community impact.
      </p>
      <a href="#" class="inline-flex items-center gap-2 bg-white text-ink border border-border px-6 py-3 text-base font-semibold rounded hover:bg-paper transition-colors">
        See council contacts &amp; template
      </a>
    </div>

  </div>
</section>

<!-- ═══════════ FOOTER ═══════════ -->
<footer class="border-t border-border py-10 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <p class="text-sm text-muted-light">Built by residents of Olympia's eastside. Not affiliated with any political organization.</p>
    <p class="text-sm text-muted-light mt-2">
      Data from
      <a href="https://remoteapps.wsdot.wa.gov/highwaysafety/collision/data/portal" class="text-muted hover:text-ink underline">WSDOT</a>,
      <a href="https://www.trpc.org" class="text-muted hover:text-ink underline">TRPC</a>,
      <a href="https://www.intercitytransit.com" class="text-muted hover:text-ink underline">Intercity Transit</a>, and
      <a href="https://www.olympiawa.gov" class="text-muted hover:text-ink underline">City of Olympia</a> public records.
    </p>
    <p class="text-xs text-muted-light mt-4">
      <a href="/about" class="text-muted hover:text-ink underline">About this site &amp; methodology</a>
      · Content: CC BY-SA 4.0 · Code: MIT
    </p>
    <p class="text-xs text-muted-light mt-2">This site does not use cookies, analytics, or tracking of any kind.</p>
  </div>
</footer>

</BaseLayout>
```

**Step 2: Verify build**

Run: `npx astro build`
Expected: Build succeeds, `dist/index.html` exists

**Step 3: Preview**

Run: `npx astro dev`
Expected: Page loads at localhost:4321. Hero, stats, context, map placeholder, action cards, and footer all visible. Map won't work yet (island not built).

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build main page with hero, stats, context, action sections"
```

---

### Task 6: Port the interactive Leaflet map

This is the most complex task. Port the SafetyMap island from the original repo, adapting the Leaflet control styles to work on both the dark map section and the light overall theme.

**Files:**
- Create: `src/islands/SafetyMap.astro`

**Step 1: Create the SafetyMap island**

Port the full map implementation from `/tmp/martinwayforpeople-review/src/islands/SafetyMap.astro`. The map renders inside a dark section (`bg-ink`), so the dark Leaflet overrides stay as-is. Key details:

- Map center: `[47.048, -122.830]`, zoom 14
- `scrollWheelZoom: false`
- 6 layers: bus stops, crossings, site parcel, safety corridor, all crashes, pedestrian/fatal crashes
- Lazy loading via IntersectionObserver (200px rootMargin)
- CSV parser handles quoted fields
- Fatal pedestrian markers pulse red
- Layer control: `collapsed: false`, `position: 'topright'`

```astro
---
// SafetyMap island — lazy-loaded Leaflet map
---

<div id="safety-map" class="border border-slate-700 rounded-xl shadow-xl shadow-black/30" role="application" aria-label="Interactive map of Martin Way showing crashes, bus stops, crossing locations, and the proposed Chick-fil-A site"></div>

<style>
  #safety-map {
    min-height: 500px;
    height: 60vh;
    width: 100%;
    border-radius: 0.75rem;
    z-index: 0;
  }
  :global(.leaflet-popup-content-wrapper) {
    background: #1e293b;
    color: #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  }
  :global(.leaflet-popup-tip) {
    background: #1e293b;
  }
  :global(.leaflet-popup-content) {
    margin: 12px 16px;
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    font-size: 13px;
    line-height: 1.5;
  }
  :global(.leaflet-popup-content strong) {
    color: #ffffff;
    font-weight: 600;
  }
  :global(.leaflet-control-layers) {
    background: #1e293b !important;
    color: #e2e8f0 !important;
    border: 1px solid #334155 !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
  }
  :global(.leaflet-control-layers-toggle) {
    background-color: #1e293b !important;
    border: 1px solid #334155 !important;
  }
  :global(.leaflet-control-layers label) {
    color: #e2e8f0 !important;
  }
  :global(.leaflet-control-zoom a) {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
    border-color: #334155 !important;
  }
  :global(.leaflet-control-zoom a:hover) {
    background-color: #334155 !important;
  }
  :global(.fatal-ped-marker div) {
    animation: fatal-pulse 2s ease-in-out infinite;
  }
  @keyframes fatal-pulse {
    0%, 100% { box-shadow: 0 0 6px 2px rgba(218, 54, 51, 0.6); }
    50% { box-shadow: 0 0 18px 6px rgba(218, 54, 51, 0.95); }
  }
</style>

<script>
  // Full map initialization script — copy from original repo
  // /tmp/martinwayforpeople-review/src/islands/SafetyMap.astro <script> block
  //
  // Port the ENTIRE script block verbatim. It handles:
  // - Dynamic Leaflet import
  // - CSV parser for bus_stops.csv and crossings.csv
  // - GeoJSON loading for site_parcel, safety_corridor, crashes
  // - Layer groups and layer control
  // - IntersectionObserver lazy loading
  // - escapeHtml utility
  //
  // The only change: update font-family references from 'DM Sans' to 'IBM Plex Sans'
  // in the popup content style (already handled in the <style> block above).
</script>
```

**IMPORTANT:** Copy the full `<script>` block from the original SafetyMap.astro verbatim. The only text change is `'DM Sans'` → `'IBM Plex Sans'` in the CSS (already done above). The script references the same `/data/` paths and the data files are already copied.

**Step 2: Update index.astro to use the island**

Add the import at the top of index.astro's frontmatter:
```astro
import SafetyMap from '../islands/SafetyMap.astro';
```

Replace the bare `<div id="safety-map" ...>` in the map section with:
```astro
<SafetyMap />
```

Remove the duplicate `id="safety-map"` div and `role`/`aria-label` attributes from index.astro since they now live in the island component.

**Step 3: Verify the map loads**

Run: `npx astro dev`
Expected: Scroll to map section. Leaflet initializes, tiles load, crash data renders. Layer control shows all 6 layers. Popups work on click.

**Step 4: Commit**

```bash
git add src/islands/SafetyMap.astro src/pages/index.astro
git commit -m "feat: port interactive Leaflet safety map from original site"
```

---

### Task 7: Build the /about page

**Files:**
- Create: `src/pages/about.astro`

**Step 1: Create a minimal about page**

This page is linked from the footer only. It contains methodology, data sources, and contact info. Keep it simple — no hero section, just content.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="About & Methodology — Martin Way for People"
  description="Data sources, methodology, and contact information."
  canonicalPath="/about"
>

<main class="max-w-3xl mx-auto px-6 py-20">
  <a href="/" class="text-sm text-muted hover:text-ink underline mb-8 inline-block">← Back to main page</a>

  <h1 class="font-display text-3xl font-bold mb-8">About This Site</h1>

  <section class="mb-12">
    <h2 class="font-display text-xl font-bold mb-3">Who maintains this</h2>
    <p class="text-muted text-base leading-relaxed mb-2">
      This site is maintained by residents of Olympia's eastside. We are not affiliated with any political organization, campaign, or advocacy group.
    </p>
    <p class="text-muted text-base leading-relaxed">
      Contact: <a href="mailto:martinwayforpeople@pm.me" class="text-data underline">martinwayforpeople@pm.me</a>
    </p>
  </section>

  <section class="mb-12">
    <h2 class="font-display text-xl font-bold mb-3">Data sources</h2>
    <div class="border border-border rounded-lg overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-paper-warm">
          <tr>
            <th class="text-left px-4 py-3 font-semibold text-ink">Dataset</th>
            <th class="text-left px-4 py-3 font-semibold text-ink">Source</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr><td class="px-4 py-3 text-muted">Crash data (2016–2025)</td><td class="px-4 py-3 text-muted">WSDOT Crash Data Portal</td></tr>
          <tr><td class="px-4 py-3 text-muted">Bus stops &amp; ridership</td><td class="px-4 py-3 text-muted">Intercity Transit (GTFS &amp; public records request)</td></tr>
          <tr><td class="px-4 py-3 text-muted">Priority crossings</td><td class="px-4 py-3 text-muted">TRPC Martin Way Crossing Strategy (June 2025)</td></tr>
          <tr><td class="px-4 py-3 text-muted">Corridor study</td><td class="px-4 py-3 text-muted">TRPC Martin Way Corridor Study (October 2021)</td></tr>
          <tr><td class="px-4 py-3 text-muted">Project site boundary</td><td class="px-4 py-3 text-muted">Thurston County GeoData</td></tr>
          <tr><td class="px-4 py-3 text-muted">Safety corridor</td><td class="px-4 py-3 text-muted">City of Olympia Capital Facilities Plan</td></tr>
          <tr><td class="px-4 py-3 text-muted">Traffic Impact Analysis</td><td class="px-4 py-3 text-muted">TENW, June 2, 2025 (applicant-prepared)</td></tr>
          <tr><td class="px-4 py-3 text-muted">SEPA documents</td><td class="px-4 py-3 text-muted">City of Olympia CPED, Project No. 25-3357</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="font-display text-xl font-bold mb-3">Crash data methodology</h2>
    <p class="text-muted text-base leading-relaxed mb-2">
      Crash data was obtained from the WSDOT crash data portal for the Martin Way E corridor from 2016 through 2025. Records were geocoded and filtered to the corridor study area. Of 7,184 initial records, 444 were excluded for missing coordinates or locations outside the corridor. The final dataset contains 1,112 crash records.
    </p>
    <p class="text-muted text-base leading-relaxed">
      Pedestrian crashes were identified by collision type field. Fatal crashes were identified by severity field. Both classifications use WSDOT's standard coding.
    </p>
  </section>

  <section>
    <h2 class="font-display text-xl font-bold mb-3">License</h2>
    <p class="text-muted text-base leading-relaxed">
      Content is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" class="text-data underline">CC BY-SA 4.0</a>.
      Code is licensed under the <a href="https://opensource.org/licenses/MIT" class="text-data underline">MIT License</a>.
    </p>
  </section>
</main>

</BaseLayout>
```

**Step 2: Verify build and navigation**

Run: `npx astro build`
Expected: Build succeeds. `dist/about.html` exists. Footer link on main page navigates to /about.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page with methodology and data sources"
```

---

### Task 8: Final review, cleanup, and deploy

**Step 1: Run full build**

Run: `npx astro build`
Expected: Clean build, no warnings, `dist/` contains `index.html` and `about.html`

**Step 2: Preview locally**

Run: `npx astro preview`
Expected: Browse the full site at localhost:4321. Check:
- Hero renders with correct fonts and colors
- Stats bar displays 4 numbers on dark background
- "What happened" section is readable
- Map loads and all layers work
- Action cards display with correct borders and badges
- Footer links work, including /about
- About page renders data source table
- Mobile layout works (resize browser)

**Step 3: Run humanizer skill on all site copy**

Use the **humanizer** skill to review `src/pages/index.astro` and `src/pages/about.astro`. Fix any AI writing patterns:
- Inflated symbolism or promotional language
- Em dash overuse (one per page max)
- Rule of three patterns
- AI vocabulary ("comprehensive", "crucial", "landscape", "holistic", "tapestry", "multifaceted", "foster", "delve", "underscore", "pivotal")
- Negative parallelisms ("not just X, but Y")
- Vague attributions
- Excessive conjunctive phrases

**Step 4: Review copy for writing style**

Read through all text on the page after humanizer pass. Check:
- No compound sentences (split any that remain)
- Active voice throughout
- Short, direct sentences
- No exclamation points
- Data stated plainly without embellishment
- Copy sounds like a person wrote it, not a language model

**Step 5: Commit copy fixes**

```bash
git add src/pages/index.astro src/pages/about.astro
git commit -m "style: humanize site copy"
```

**Step 6: Deploy to Cloudflare**

Run: `npx wrangler deploy`
Expected: Site deployed and accessible at the Workers URL

**Step 7: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final review and cleanup"
```

---

## File Tree (Final)

```
chickfila-lite/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.jsonc
├── docs/
│   └── plans/
│       ├── 2026-03-03-chickfila-lite-design.md
│       └── 2026-03-03-chickfila-lite-implementation.md
├── public/
│   └── data/
│       ├── bus_stops.csv
│       ├── crossings.csv
│       ├── crashes.geojson
│       ├── site_parcel.geojson
│       └── safety_corridor.geojson
└── src/
    ├── data/
    │   ├── appeal-status.ts
    │   └── site-meta.ts
    ├── islands/
    │   └── SafetyMap.astro
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/
    │   ├── index.astro
    │   └── about.astro
    └── styles/
        └── global.css
```
