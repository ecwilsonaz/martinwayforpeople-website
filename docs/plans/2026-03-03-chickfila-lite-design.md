# Chickfila-Lite: Design Document

## Purpose

Replace the 7-page, 18,000-word Martin Way for People site with a single-page advocacy site that moves visitors to act. The original site serves as a research archive. This site makes the case and directs people to two actions.

## Audiences

**Neighbors and residents** who live near, walk along, or cross Martin Way. They already know the corridor is dangerous. They need to know an appeal exists and that their voice matters.

**Anti-Chick-fil-A sympathizers** recruited through Reddit and social media. They oppose the brand and want a concrete way to act. The site channels their motivation toward effective action.

## Core Message

The City of Olympia approved 1,693 new daily car trips on the deadliest pedestrian corridor in Thurston County — without studying pedestrian safety. An appeal has been filed. Permits are frozen. Public comments go directly to the hearing examiner.

## Actions (Priority Order)

1. **Submit a public comment** — time-limited, directly supports the appeal. Comments must focus on pedestrian safety to carry weight with the hearing examiner.
2. **Email city council** — ongoing, broader impact. Council can close the code gap that allowed the approval. Any concern is fair game: safety, values, community impact.

## Tone

Data-driven credibility. The facts create the outrage; the copy stays measured. No exclamation points, no "shocking" language. Empowerment framing on the CTAs: "Your comment becomes part of the record."

Light editorial aesthetic — warm paper background, dark text, serif headlines. Reads like a longform investigative piece, not a campaign site.

## Page Structure

### Single scroll page with six sections:

**1. Hero**
- Kicker: "Martin Way · Olympia, WA"
- Headline: "The city approved 1,693 new daily car trips on this corridor. Without studying pedestrian safety."
- One paragraph of context (~50 words)
- Primary CTA: "Submit a public comment" → anchor to action section
- Scroll hint

**2. Stats Bar**
- Dark band across full width
- Four statistics: 1,112 crashes / 27 pedestrians struck / $1.6M city investment / Zero pedestrian analysis
- Sources noted inline

**3. What Happened**
- 2–3 paragraphs (~200 words) distilling the appeal's core argument
- Callout box: TRPC identified the project site as one of 10 priority crossing locations; the traffic study does not reference this
- Bus rider data: 357 daily riders at adjacent stops, no marked crosswalks

**4. The Map**
- Full interactive Leaflet map ported from the original site
- Layers: vehicle crashes, pedestrian crashes, bus stops, TRPC priority crossings, project site, safety corridor
- Dark basemap, legend below
- Data: WSDOT crashes (2016–2025), Intercity Transit bus stops, TRPC crossings, site/corridor GeoJSON

**5. Take Action**
- Status banner: "Appeal filed. All permits are frozen."
- Two stacked action cards:

  **Primary card** (red border, "Time-limited" badge):
  - "Submit a public comment"
  - What to focus on: five talking points drawn from the appeal
  - Coaching note: "Keep comments focused on pedestrian safety. The hearing examiner rules on whether the environmental review was adequate."
  - CTA button: "Sign up for comment notification" (Tally form or email signup)

  **Secondary card** (neutral border, "Ongoing" badge):
  - "Email your city council"
  - Brief framing: council can close the code gap
  - Note: "For council emails, speak from whatever concerns you — safety, values, community impact."
  - CTA: "See council contacts & template" (expands or links to detail)

**6. Footer**
- One line: "Built by residents of Olympia's eastside."
- Source links: WSDOT, TRPC, Intercity Transit, City of Olympia
- Small link: "About this site & methodology" → /about page

### Secondary page: /about

- Methodology and data sources (condensed from original about page)
- Data source table
- Contact email
- License info (CC BY-SA 4.0 content, MIT code)
- Linked from footer only — no top nav

## What's Cut

| Original page | Status |
|---|---|
| Safety (map + analysis) | Map ported to main page; written analysis condensed to "What Happened" section |
| Money Trail | Cut entirely |
| Economy | Cut entirely |
| Timeline | Cut entirely |
| Action | Condensed to "Take Action" section |
| About | Kept as footer-linked secondary page |

Word count target: ~800 words (down from ~18,000).

## Tech Stack

- **Astro** — static site generator, same as original
- **Tailwind CSS** — utility-first styling, same as original
- **Leaflet** — interactive map, ported from original
- **Fonts**: Source Serif 4 (display/headlines), IBM Plex Sans (body) — self-hosted WOFF2
- **Deployment**: Cloudflare Workers via wrangler
- **Forms**: Tally embed or equivalent for email signup

## Data Assets (Ported from Original)

- `crashes.geojson` — 1,112 crash incidents (2016–2025)
- `bus_stops.csv` — 21 transit stops
- `crossings.csv` — 17 TRPC priority crossings
- `site_parcel.geojson` — project site boundary
- `safety_corridor.geojson` — $1.637M safety project area

## Design Consistency with Appeal

The site's factual claims align with the SEPA appeal (No. 25-3357). Key statistics and framing draw directly from the appeal's Statement of Harm and Statement of Errors. The site does not make claims beyond what the appeal documents.
