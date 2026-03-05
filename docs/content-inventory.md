# Content Inventory — martinwayforpeople.org

Extracted 2026-03-04. Every factual claim, statistic, characterization, date, attribution, and external link on the live site, organized by page and section. Use the checkboxes for a fact-check pass.

---

## 1. Site-Wide Metadata

**File:** `src/data/site-meta.ts`

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| M1 | "The city approved 1,693 daily car trips on the deadliest pedestrian corridor in Thurston County — without studying pedestrian safety." | OG/meta description | Characterization | [ ] |

**Notes:** "Deadliest pedestrian corridor" is a characterization. Verify: does Martin Way have the highest pedestrian fatality *rate* in the county, or the highest *count*? The hero section says "highest rate of pedestrian fatalities and serious injuries."

---

## 2. Homepage — Hero

**File:** `src/pages/index.astro`, lines 14–42

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| H1 | Address: "4505 Martin Way E · Olympia, WA" | Line 17 | Fact | [ ] |
| H2 | "1,693 net new daily trips" | Line 21 (headline) | Statistic | [ ] |
| H3 | Called a "deadly corridor" | Line 21 | Characterization | [ ] |
| H4 | "Martin Way has the highest rate of pedestrian fatalities and serious injuries in Thurston County" | Line 31 | Statistic | [ ] |
| H5 | "pedestrian crashes are rising, not falling" | Line 31 | Trend claim | [ ] |
| H6 | "A Chick-fil-A dual drive-through was approved here" | Line 31 | Fact | [ ] |
| H7 | "The 90-page traffic study never analyzes pedestrian safety" | Line 31 | Fact | [ ] |
| H8 | "We appealed. Permits are frozen." | Line 31 | Status claim | [ ] |

---

## 3. Homepage — Stats Bar

**File:** `src/pages/index.astro`, lines 44–64

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| S1 | "3,198" crashes on Martin Way, 2015–2025 | Line 48 | Statistic | [ ] |
| S2 | "7 of 11" fatalities were a pedestrian or cyclist | Lines 52–53 | Statistic | [ ] |
| S3 | "#2 Highest-risk intersection in Lacey — at the project site" | Lines 56–57 | Statistic | [ ] |
| S4 | "Zero" pages of pedestrian analysis in the 90-page traffic study | Lines 60–61 | Fact | [ ] |

**Notes on S2:** Verify denominator — is it 11 total traffic fatalities on Martin Way during 2015–2025, or some other scope? Verify numerator — 7 pedestrian *or cyclist* fatalities.

**Notes on S3:** Source should be the Lacey Safety Action Plan. Verify that the ranking is for the intersection at the project site specifically, and that "#2" refers to "high-risk intersection" (not some other metric).

---

## 4. Homepage — Trend Section (Charts)

**File:** `src/pages/index.astro`, lines 66–176

### 4a. All-Crashes Chart

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| T1 | "Crashes are declining" (section headline) | Line 70 | Trend claim | [ ] |
| T2 | Total crashes declining from 334 in 2015 to 223 in 2025 (per chart aria-label) | Line 77 | Statistic | [ ] |
| T3 | Year-by-year bar values (embedded in SVG rect heights) | Lines 81–91 | Data | [ ] |
| T4 | Average 346/yr for 2015–19 | Line 108 | Statistic | [ ] |
| T5 | Average 245/yr for 2020–25 | Line 112 | Statistic | [ ] |
| T6 | 29% decline | Line 114 | Calculation | [ ] |

**Notes on T2:** The aria-label says "334 in 2015" but the first bar's height suggests a value. Cross-check the actual 2015 crash count against WSDOT data. Verify 223 for 2025.

**Notes on T6:** Verify arithmetic: (346 − 245) / 346 = 29.2%. Correct if averages are correct.

### 4b. Pedestrian-Crashes Chart

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| T7 | "Pedestrians struck are not [declining]" (section headline) | Line 71 | Trend claim | [ ] |
| T8 | Pedestrian crashes rising from 3 in 2015 to 10 in 2025 (per aria-label) | Line 120 | Statistic | [ ] |
| T9 | Year-by-year pedestrian values: 3, 4, 3, 8, 3, 5, 6, 7, 7, 7, 10 | Lines 137–147 | Data | [ ] |
| T10 | Average 4.2/yr for 2015–19 | Line 164 | Statistic | [ ] |
| T11 | Average 7.0/yr for 2020–25 | Line 168 | Statistic | [ ] |
| T12 | 67% increase | Line 170 | Calculation | [ ] |

**Notes on T9:** These are pedestrian crashes specifically. Verify whether bicycle crashes are included or excluded from this chart. The chart header says "Pedestrians struck by vehicles" which suggests bicycles are excluded.

**Notes on T10:** (3+4+3+8+3)/5 = 4.2. Arithmetically correct if individual values are correct.

**Notes on T11:** (5+6+7+7+7+10)/6 = 7.0. Arithmetically correct if individual values are correct.

**Notes on T12:** (7.0 − 4.2) / 4.2 = 66.7% ≈ 67%. Correct if averages are correct.

### 4c. Chart Source Attribution

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| T13 | Source: "WSDOT Crash Data Portal, Thurston County, 2015–2025" | Line 175 | Attribution | [ ] |
| T14 | Link: `https://remoteapps.wsdot.wa.gov/highwaysafety/collision/data/portal/public/` | Line 175 | URL | [ ] |

---

## 5. Homepage — What Happened

**File:** `src/pages/index.astro`, lines 178–210

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| W1 | "In February 2026, the City of Olympia approved a new Chick-fil-A at 4505 Martin Way E" | Line 185 | Fact / Date | [ ] |
| W2 | "The project will add 1,693 vehicle trips per day" | Line 185 | Statistic | [ ] |
| W3 | "a four-lane undivided arterial" | Line 185 | Characterization | [ ] |
| W4 | "There are no mid-block pedestrian crossings along the project frontage" | Line 185 | Fact | [ ] |
| W5 | "The nearest signalized crosswalk — at College Street, roughly 500 feet away — is rated 'high stress' by the regional Crossing Strategy" | Line 185 | Fact / Statistic | [ ] |
| W6 | "The traffic study… analyzes vehicle delay at five intersections" | Line 188 | Fact | [ ] |
| W7 | "It runs about 90 pages" | Line 188 | Fact | [ ] |
| W8 | "It contains no pedestrian counts" | Line 188 | Fact | [ ] |
| W9 | "No pedestrian level-of-service analysis" | Line 188 | Fact | [ ] |
| W10 | "No assessment of how 1,693 new daily trips affect people who walk along and cross Martin Way" | Line 188 | Fact | [ ] |
| W11 | Link to traffic study: `https://ci-olympia-wa.smartgovcommunity.com/Blob/94c1d95e-…` | Line 188 | URL | [ ] |

**Notes on W2:** "1,693 vehicle trips per day" — is this "net new" (as stated in the hero) or total? The traffic study should specify. Verify the exact figure and whether it is net new or gross.

**Notes on W3:** Verify Martin Way is four-lane and undivided at the project site. Some segments may differ.

**Notes on W5:** Verify "roughly 500 feet" distance. Verify the College St crosswalk is rated "high stress" in the TRPC Crossing Strategy — look for exact language and scoring.

---

## 6. Homepage — Evidence Block (Government Sources)

**File:** `src/pages/index.astro`, lines 191–201

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| E1 | "Four separate government bodies have flagged this corridor for pedestrian danger" | Line 193 | Characterization | [ ] |
| E2 | "The traffic study addresses none of their findings" | Line 193 | Fact | [ ] |

### 6a. TRPC Crossing Strategy

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| E3 | "4500 Martin Way — a manufactured housing community directly across from the project site" | Line 196 | Fact | [ ] |
| E4 | "is 1 of 10 priority crossing locations on the entire 7-mile corridor" | Line 196 | Statistic | [ ] |
| E5 | "Pedestrian danger score: 23 out of 30" | Line 196 | Statistic | [ ] |
| E6 | Link: `https://www.trpc.org/martinway` | Line 196 | URL | [ ] |

**Notes on E3:** Verify that 4500 Martin Way is a manufactured housing community, and that it is "directly across" from 4505 Martin Way E (the project site).

**Notes on E4:** Verify "7-mile corridor" length and "10 priority crossing locations" against TRPC document.

### 6b. Lacey Safety Action Plan

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| E7 | "College St & Martin Way — 500 feet from the site" | Line 197 | Distance | [ ] |
| E8 | "one of the traffic study's own intersections" | Line 197 | Fact | [ ] |
| E9 | "is Lacey's #2 high-risk intersection" | Line 197 | Statistic | [ ] |
| E10 | "College St through the project intersection is the city's #1 high-risk corridor" | Line 197 | Statistic | [ ] |
| E11 | Link: `https://cityoflacey.org/wp-content/uploads/sites/3/2025/06/Adopted-Final-Safety-Action-Plan-2025-06-03.pdf` | Line 197 | URL | [ ] |

**Notes on E9/E10:** Verify the exact ranking language in the Lacey SAP. Is it "#2 high-risk intersection" or some variant (e.g., "second-highest crash intersection")?

### 6c. Thurston County Safety Action Plan

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| E12 | "Three of ten countywide high-injury intersections are on Martin Way" | Line 198 | Statistic | [ ] |
| E13 | "The county's highest-priority crossing project: $10.04 million for Martin Way pedestrian crossings" | Line 198 | Statistic | [ ] |
| E14 | Link: `https://www.thurstoncountywa.gov/media/29850` | Line 198 | URL | [ ] |

**Notes on E13:** Verify "$10.04 million" figure and that it is described as the "highest-priority crossing project." Check exact language.

### 6d. Olympia Capital Facilities Plan

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| E15 | "$1.637 million programmed for pedestrian safety on Martin Way" | Line 199 | Statistic | [ ] |
| E16 | "crosswalks and signals ending half a mile west of the project site" | Line 199 | Fact / Distance | [ ] |
| E17 | Link: `https://www.olympiawa.gov/services/transportation/index.php` | Line 199 | URL | [ ] |

**Notes on E16:** "Half a mile west" — verify that the Capital Facilities Plan improvement zone terminates approximately 0.5 mi west of 4505 Martin Way E.

---

## 7. Homepage — Bus Stops & Recent Crash

**File:** `src/pages/index.astro`, lines 203–209

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| B1 | "Two bus stops within 225 feet of the proposed driveway" | Line 204 | Fact / Distance | [ ] |
| B2 | "see 107 daily boardings and alightings" | Line 204 | Statistic | [ ] |
| B3 | "These are people on foot, walking to and from stops on a road with no crosswalks" | Line 204 | Characterization | [ ] |
| B4 | "The traffic study says nothing about them" | Line 204 | Fact | [ ] |
| B5 | "On December 16, 2025, a pedestrian was struck and seriously injured at Martin Way and Lilly Road" | Line 208 | Fact / Date | [ ] |
| B6 | "less than a mile from the project site" | Line 208 | Distance | [ ] |
| B7 | "one of 10 pedestrian crashes on the corridor that year" | Line 208 | Statistic | [ ] |
| B8 | "the most of any year in the past decade" | Line 208 | Statistic | [ ] |
| B9 | "Sixty-nine days later, the city approved the project" | Line 208 | Calculation / Date | [ ] |

**Notes on B1:** "225 feet" — verify distance from proposed driveway to each bus stop. Source is likely Intercity Transit data + site plan.

**Notes on B2:** "107 daily boardings and alightings" — verify source. Intercity Transit ridership data or public records request.

**Notes on B3:** "a road with no crosswalks" — after the W4/W5 correction, this should be consistent. There are no mid-block crosswalks, but there is a signalized crosswalk at College St. Is this paragraph referring to the immediate bus stop area specifically?

**Notes on B7/B8:** Verify that 2025 had exactly 10 pedestrian crashes, and that this is the highest single-year count 2015–2025. Cross-check against chart data T9 (which shows 10 for 2025).

**Notes on B9:** December 16, 2025 + 69 days = February 23, 2026. Verify the actual approval date.

---

## 8. Homepage — Status Banner

**File:** `src/pages/index.astro`, lines 237–241

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| A1 | "Appeal filed. All permits are frozen. A public hearing will be scheduled." | Line 240 | Status claim | [ ] |

**Notes:** This is a live status claim that may change. Verify current status of the appeal.

---

## 9. Homepage — Public Comment Card

**File:** `src/pages/index.astro`, lines 250–346

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| C1 | "The hearing examiner reviews every public comment" | Line 247 | Procedural claim | [ ] |
| C2 | "Once the hearing is scheduled, there will be a window for written comments" | Line 255 | Procedural claim | [ ] |
| C3 | "Your comment goes directly to the hearing examiner" | Line 255 | Procedural claim | [ ] |

### 9a. "What to focus on" bullet points

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| C4 | "The traffic study contains zero pedestrian safety analysis" | Line 262 | Fact | [ ] |
| C5 | "7 of 11 traffic fatalities on Martin Way involved a pedestrian or cyclist — and pedestrian crashes are increasing" | Line 266 | Statistic | [ ] |
| C6 | "1,693 new daily trips next to bus stops with 107 daily boardings and alightings" | Line 270 | Statistic | [ ] |
| C7 | "The city's Capital Facilities Plan programs $1.6M for Martin Way pedestrian safety — but the improvement zone ends half a mile west of this site, and the traffic study ignores the overlap" | Line 274 | Statistic / Fact | [ ] |
| C8 | "The Thurston Regional Planning Council identified this location as a priority crossing" | Line 278 | Fact | [ ] |

### 9b. Template Comment

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| C9 | "Project 25-3357" (project number) | Line 299 | Fact | [ ] |
| C10 | "Martin Way has the highest pedestrian fatality rate in Thurston County" | Line 301 | Statistic | [ ] |
| C11 | "Nearly half of fatal and serious collisions on this corridor involve pedestrians or cyclists" | Line 301 | Statistic | [ ] |
| C12 | "the city is spending $1.637 million to make Martin Way safer for pedestrians" | Line 303 | Statistic | [ ] |
| C13 | "1,693 net new daily vehicle trips… within 225 feet of a bus stop" | Line 303 | Statistic / Distance | [ ] |

**Notes on C10:** "Highest pedestrian fatality rate" — verify this is rate (per mile? per capita?) not just count.

**Notes on C11:** "Nearly half" — verify. If 7 of 11 fatalities involved ped/cyclist (S2), that's 64%, which is "nearly two-thirds," not "nearly half." However, this says "fatal and serious collisions" which is a different denominator. Clarify what dataset this refers to.

---

## 10. Homepage — Council Email Card

**File:** `src/pages/index.astro`, lines 348–437

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| D1 | "Council members can close the code gap that allowed this approval" | Line 353 | Characterization | [ ] |
| D2 | "The zoning code still allows drive-throughs in High Density Corridor zones" | Line 360 | Fact | [ ] |
| D3 | "approved as a staff decision with no council vote and no public hearing" | Line 360 | Procedural fact | [ ] |
| D4 | "In 2024, council voted against a drive-through on Plum Street" | Line 364 | Fact / Date | [ ] |
| D5 | "calling for 'intentional' over 'piecemeal' decisions" | Line 364 | Quote / Attribution | [ ] |
| D6 | "Every adopted plan for Martin Way envisions pedestrian-priority, mixed-use development" | Line 368 | Characterization | [ ] |

**Notes on D4/D5:** Verify the Plum Street drive-through vote date (2024) and the exact quote/attribution. The template email attributes the "intentional/piecemeal" quote to Councilmember Gilman.

### 10a. Council Contact Information

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| D7 | Clark Gilman — Position 4 — cgilman@ci.olympia.wa.us | Line 382–384 | Contact info | [ ] |
| D8 | Robert Vanderpool — Position 6 — rvanderpool@ci.olympia.wa.us | Line 387–389 | Contact info | [ ] |
| D9 | Yến Huỳnh — Position 2, Mayor Pro-tem — yhuynh@ci.olympia.wa.us | Line 392–394 | Contact info | [ ] |
| D10 | Kelly Green — Position 5 — kgreen@ci.olympia.wa.us | Line 397–399 | Contact info | [ ] |
| D11 | Dani Madrone — Position 3 — dmadrone@ci.olympia.wa.us | Line 402–404 | Contact info | [ ] |
| D12 | Paul Berendt — Position 7 — pberendt@ci.olympia.wa.us | Line 407–409 | Contact info | [ ] |

**Notes:** Verify all names, positions, and email addresses against current City of Olympia council roster. Council positions may have changed. Also note: the Mayor (Position 1) is absent from this list — intentional?

### 10b. Template Council Email

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| D13 | "In April 2024, this council voted against a drive-through on Plum Street" | Line 425 | Fact / Date | [ ] |
| D14 | 'Councilmember Gilman said, "We should be intentional, rather than piecemeal, in making major decisions like this."' | Line 425 | Direct quote | [ ] |
| D15 | "Type II permits are staff decisions" | Line 425 | Procedural fact | [ ] |
| D16 | "In February, city staff approved that Chick-fil-A drive-through" | Line 427 | Fact / Date | [ ] |
| D17 | "1,693 net new daily vehicle trips on Thurston County's most dangerous pedestrian corridor" | Line 427 | Statistic / Characterization | [ ] |
| D18 | "No pedestrian safety analysis" | Line 427 | Fact | [ ] |
| D19 | "Every plan envisions a pedestrian-priority Martin Way" | Line 431 | Characterization | [ ] |
| D20 | "Your code still permits drive-throughs in High Density Corridor zones" | Line 429 | Fact | [ ] |

**Notes on D14:** This is a direct quote attributed to a named council member at a public meeting. Verify against meeting minutes or recording.

---

## 11. Homepage — Footer

**File:** `src/pages/index.astro`, lines 442–460

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| F1 | "Built by residents of Olympia's eastside" | Line 445 | Identity claim | [ ] |
| F2 | "Not affiliated with any political organization" | Line 445 | Identity claim | [ ] |
| F3 | Data sources listed: WSDOT, TRPC, Intercity Transit, City of Olympia | Line 447–451 | Attribution | [ ] |
| F4 | "This site does not use cookies, analytics, or tracking of any kind" | Line 458 | Technical claim | [ ] |
| F5 | "Content: CC BY-SA 4.0 · Code: MIT" | Line 456 | License | [ ] |

**Notes on F4:** Verify no analytics/tracking in the codebase. No Google Analytics, no Cloudflare Analytics, no third-party scripts.

---

## 12. About Page — Data Sources Table

**File:** `src/pages/about.astro`, lines 27–48

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| AB1 | Crash data: 2015–2025, WSDOT Crash Data Portal | Line 37 | Attribution | [ ] |
| AB2 | Bus stops & ridership: Intercity Transit (schedule data & public records request) | Line 38 | Attribution | [ ] |
| AB3 | Priority crossings: TRPC Martin Way Crossing Strategy (June 2025) | Line 39 | Attribution / Date | [ ] |
| AB4 | Corridor study: TRPC Martin Way Corridor Study (October 2021) | Line 40 | Attribution / Date | [ ] |
| AB5 | Project site boundary: Thurston County GeoData | Line 41 | Attribution | [ ] |
| AB6 | Safety corridor: City of Olympia Capital Facilities Plan | Line 42 | Attribution | [ ] |
| AB7 | Traffic Impact Analysis: Transportation Engineering NorthWest (TENW), June 2, 2025 (applicant-prepared) | Line 43 | Attribution / Date | [ ] |
| AB8 | SEPA documents: City of Olympia CPED, Project No. 25-3357 | Line 44 | Attribution | [ ] |

**Notes on AB3:** "June 2025" — verify publication date of the TRPC Martin Way Crossing Strategy.

**Notes on AB7:** "June 2, 2025" — verify the TIA date. Also verify "applicant-prepared" characterization.

### 12a. Data Source URLs

| # | URL | Target | Status |
|---|-----|--------|--------|
| AB-L1 | `https://remoteapps.wsdot.wa.gov/highwaysafety/collision/data/portal/public/` | WSDOT Crash Data Portal | [ ] |
| AB-L2 | `https://www.trpc.org/martinway` | TRPC Crossing Strategy | [ ] |
| AB-L3 | `https://www.trpc.org/DocumentCenter/View/8937` | TRPC Corridor Study (Oct 2021) | [ ] |
| AB-L4 | `https://www.olympiawa.gov/services/transportation/index.php` | Olympia Capital Facilities Plan | [ ] |
| AB-L5 | `https://ci-olympia-wa.smartgovcommunity.com/Blob/94c1d95e-0e0d-46c3-8836-eac6b7eb1289` | Traffic Impact Analysis (TENW) | [ ] |
| AB-L6 | `https://ci-olympia-wa.smartgovcommunity.com/PublicNotice/PublicNoticeDetail/Index/d23d5890-c008-4476-ab1c-b2f10151846a?_conv=1` | SEPA documents | [ ] |

---

## 13. About Page — Methodology

**File:** `src/pages/about.astro`, lines 50–58

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| AM1 | "Crash data was obtained from the WSDOT Crash Data Portal for Thurston County from 2015 through 2025" | Line 53 | Methodology | [ ] |
| AM2 | "Three report types were queried: Total Crashes, Pedestrian Crashes, and Bicycle Crashes" | Line 53 | Methodology | [ ] |
| AM3 | "Records were spatially filtered… using a bounding box and then a manually drawn corridor polygon" | Line 53 | Methodology | [ ] |
| AM4 | "reverse-geocoded via the Google Maps Geocoding API" | Line 53 | Methodology | [ ] |
| AM5 | "The final dataset contains 3,198 crash records" | Line 53 | Statistic | [ ] |
| AM6 | "Per-year crash rates were cross-validated against TRPC's independently compiled data for the same corridor and period (2015–2019)" | Line 53 | Methodology | [ ] |
| AM7 | "agree within 7%" | Line 53 | Statistic | [ ] |
| AM8 | "Fatal crashes were identified by the severity field" | Line 56 | Methodology | [ ] |
| AM9 | "Full methodology is documented in the exhibit filed with the appeal" | Line 56 | Reference | [ ] |

**Notes on AM5:** Cross-check: S1 also claims 3,198. These must match.

**Notes on AM7:** "Agree within 7%" — verify the cross-validation. What is the TRPC figure for the same period?

---

## 14. Privacy Page

**File:** `src/pages/privacy.astro`

| # | Claim | Location | Type | Verified |
|---|-------|----------|------|----------|
| P1 | "Effective March 4, 2026" | Line 15 | Date | [ ] |
| P2 | "We also store a one-way hash of your IP address" | Line 21 | Technical claim | [ ] |
| P3 | "We do not store your raw IP address" | Line 21 | Technical claim | [ ] |
| P4 | "This site does not use cookies, analytics, or tracking of any kind" | Line 22 | Technical claim | [ ] |
| P5 | "Email addresses and IP hashes are stored in a Cloudflare D1 database" | Line 32 | Technical claim | [ ] |
| P6 | "Notification emails are sent through Resend" | Line 32 | Technical claim | [ ] |
| P7 | "We will delete your record within 5 business days" | Line 42 | Policy | [ ] |

**Notes on P2/P3:** Verify in the subscribe API endpoint (`src/pages/api/subscribe.ts`) that the IP is hashed, not stored raw.

---

## 15. Map Data (rendered client-side)

**File:** `src/islands/SafetyMap.astro` + `public/data/` files

The map renders data from these files at runtime. Claims embedded in the data:

| # | Data File | Contents | Verified |
|---|-----------|----------|----------|
| MAP1 | `public/data/crashes.geojson` | 3,198 crash records with date, time, severity, ped/bike/fatal flags, coordinates | [ ] |
| MAP2 | `public/data/bus_stops.csv` | Bus stop locations, routes, shelter info | [ ] |
| MAP3 | `public/data/crossings.csv` | Crossing locations, quantitative scores, top-10 flags | [ ] |
| MAP4 | `public/data/site_parcel.geojson` | Project site boundary, owner, acreage, assessed value | [ ] |
| MAP5 | `public/data/safety_corridor.geojson` | Safety corridor boundary, budget, construction year, improvements | [ ] |

**Notes:** The map shows property info (owner, assessed value) from the site parcel GeoJSON. Verify this is current public record data.

---

## 16. Cross-Cutting Issues to Check

| # | Issue | Claims affected |
|---|-------|-----------------|
| X1 | **"1,693" consistency** — used as "net new daily trips" (hero), "vehicle trips per day" (W2), "net new daily vehicle trips" (template). Verify all usages are consistent and match the TIA. | H2, W2, C6, C13, D17 |
| X2 | **"90 pages"** — the TIA is described as "about 90 pages." Verify actual page count. | H7, S4, W7 |
| X3 | **"7 of 11"** — used in stats bar and bullet points. Verify scope and time period. | S2, C5 |
| X4 | **"$1.637 million" vs "$1.6M"** — exact figure in evidence block, rounded in bullet. Verify source figure. | E15, C7, C12 |
| X5 | **"225 feet"** — bus stop distance. Used in body text and template. Verify measurement. | B1, C13 |
| X6 | **"500 feet"** — College St distance. Used in evidence block and W5. Verify measurement. | W5, E7 |
| X7 | **"Half a mile west"** — safety corridor terminus. Verify distance. | E16, C7 |
| X8 | **"Deadliest" / "most dangerous"** — meta description says "deadliest," hero says "highest rate of pedestrian fatalities and serious injuries," template says "most dangerous pedestrian corridor." Are these equivalent? | M1, H4, D17 |
| X9 | **"No crosswalks" vs corrected language** — B3 still says "on a road with no crosswalks." After the W4/W5 correction, this may need updating for consistency. The signalized crosswalk at College St exists; the accurate framing is "no mid-block crossings." | B3, W4, W5 |
| X10 | **Approval date** — "February 2026" (W1), "Sixty-nine days later" from Dec 16 2025 (B9). Verify exact date: Dec 16 + 69 = Feb 23, 2026. | W1, B9 |
| X11 | **"Nearly half" vs "7 of 11"** — template comment says "nearly half" of fatal and serious collisions involve ped/cyclists. If the stat is 7/11 (64%), "nearly half" understates it. Or "nearly half" may refer to a different denominator (all fatal + serious injury, not just fatal). Clarify. | C11, S2 |

---

## Summary

| Category | Count |
|----------|-------|
| Statistics / numbers | ~35 |
| Factual claims | ~25 |
| Characterizations | ~10 |
| Procedural / legal claims | ~8 |
| External URLs | ~12 |
| Contact information | 6 council members |
| Cross-cutting consistency issues | 11 |
| **Total checkable items** | **~107** |
