# Link — MVP PRD

Nov 15, 2026 · Eshan Chowdhury

## TL;DR

Drop a pin, set a radius and time, pick a plan type (a dinner spot, eat with a view, a 2- or 3-step date, or surprise me), and Link hands back up to 3 ready-to-go NYC options, with directions and a Reserve button. It's a free web app with no LLM in the MVP. It keeps the Lovable UI's design elements and rewires everything under them, so friends, partner interests and calendar planning can be added later without a rewrite.

**The problem.** I make plans because I want to see people, but there's rarely a set plan, at most one restaurant I *think* might be cool. Then it's last minute and I'm scrolling OpenTable for a dinner spot or a date idea. The stress isn't a lack of places. It's deciding what fits the mood, what's open, what's close together, what's bookable, and how to get there.

**The fix.** Link takes those decisions off the user. It picks for you, shows only 3 options, and has a one-tap fallback when something's booked.

## Goals and non-goals

The MVP succeeds if I can demo it live, and if I and ~10 friends use it for real plans and actually go.

**Goals**

- Real places only: every stop exists, is in NYC, and is open at its planned time.
- All taps, no typing: pin, radius, time, plan type, optional vibe chip.
- Results in under ~5 seconds, never more than 3 options on screen.
- Booked or not feeling it? One tap gets a replacement, the rest of the plan holds.
- Never stuck: every screen has a clear next action, and a demo mode works with no API keys.
- Runs at ~$0/month as a free web app.

**Non-goals for the MVP**

- LLM or free-text vibe input.
- Checking reservation availability, or booking on the user's behalf.
- Accounts, friends, multi-device sync, a calendar view of plans.
- Native iOS or Android apps.

| Metric | Why it matters | MVP target |
| --- | --- | --- |
| Plans locked in per week | Is anyone using it | 10+ |
| % of locked plans with a directions or Reserve tap | Proxy for actually going | 50%+ |
| Swaps per locked plan | Pick quality, lower is better | under 1.5 |
| Cost per month | Stays a free side project | under $5 |

## Target user and scenarios

New Yorkers in their 20s and 30s who make plans to see people but leave the details to the last minute. They get around by subway and on foot, and know their own neighborhood but get stuck anywhere new.

| Scenario | Inputs | What a good result feels like |
| --- | --- | --- |
| Last-minute date | Pin in the East Village, 1.5 km, an evening, 3-step date, "Cozy date" | Dinner, a bar or show, a walk, all close together, with a bookable or walk-in dinner |
| Plans with no plan | Pin near a friend's place, 2 km, 3–4 hrs, Surprise me | 3 different takes to pick from, e.g. waterfront, make something, food crawl |
| Planning ahead | Saturday 2pm, pin in Williamsburg, half a day, Eat with a view | A plan that's open at that time, added to my calendar |
| Friend in town | Pin in the West Village, 1.5 km, 3–4 hrs, "Chill catch-up" | Feels local, not touristy, easy to walk |

## The MVP experience

A short step-by-step flow, all taps: set the where and when once, then pick what kind of plan you want. The layout stays the Lovable one: map on the left, the flow and results on the right, collapsing to map-above-flow on a phone.

**Step by step**

1. **Where:** drop a pin on the live NYC map (or search, or use my location) and set the radius, 1–3 km, default 1.5 km (about 4 neighborhoods).
2. **When:** now, tonight, or a date and time, plus how long: 1 hr, 2 hrs, 3–4 hrs, an evening.
3. **What kind of plan:** one tap from the plan types below.
4. **Vibe (optional):** one chip, or skip and let the app pick.
5. **Results:** up to 3 options, each with Reserve, directions per leg and one-tap swaps. Pick one and lock it in.

Where and when stay set, so trying a different plan type is one tap, not a restart.

**Plan types**

| Plan type | Stops | Good for | If nothing fits |
| --- | --- | --- | --- |
| Dinner spot | 1: eat | Meeting a friend in a specific area, a quick grab | Widen radius, or show walk-in friendly spots |
| Eat with a view | 1–2: eat with a view, or grab food + a scenic spot | Sit, eat, enjoy the view | A well-lit park or waterfront next to a good grab-and-go spot |
| 2-step date | 2: eat + do, or eat + wander | Shorter dates, weeknights | Drop to a dinner spot + a nearby walk |
| 3-step date | 3: eat, do, wander | The full plan | Fall back to a 2-step date |
| Surprise me | 3 plans × 3 stops in 3 different vibes | No idea what we want | Fewer plans, with a reason |

Each option shows only what it needs: a dinner spot is 3 restaurant cards; a 3-step date is 3 plans of 3 stops. Never more than 3 options on screen.

**Time split for multi-stop plans.** Travel time comes out of the total first, then roughly eat 40%, do 35%, wander 25% for a 3-step date, and eat 60%, second stop 40% for a 2-step. Order can flip by time of day, e.g. wander first on a sunny afternoon, dinner last in the evening.

**Getting around:** one toggle, easy walking only or transit OK. Default: easy walking.

**Vibe chips are the curation, and the product.** Each chip maps to hand-tuned search terms per stop. Starting point:

| Vibe | Eat | Do | Wander |
| --- | --- | --- | --- |
| Cozy date | wine bar, small plates, candlelit restaurant | bookstore, jazz bar, cinema | waterfront at night, quiet park |
| First date | casual restaurant, cocktail bar | museum, arcade bar, comedy show | park, scenic street |
| Fun & active | food hall, street food | sip and paint, bowling, climbing gym | pier, bike path |
| Chill catch-up | café, brunch, casual bar | record store, gallery | park, neighborhood stroll |
| Fancy night | tasting menu, steakhouse, rooftop bar | theater, live music | skyline viewpoint |
| Cheap & cheerful | pizza, dumplings, taqueria | free gallery, open mic | park, waterfront |

"Eat with a view" adds its own terms: rooftop, waterfront restaurant, river view, plus well-lit parks and piers for the fallback.

## Reserve and swap flow

The app decides by default and never shows more than 3 options. Two buttons cover the two reasons to swap, because a booked-out pick needs something similar and a wrong pick needs something different.

Flow:

1. Restaurant card shows the pick plus a "Plan B" line.
2. Tap **Reserve** → opens the restaurant's OpenTable or Resy page (the app opens if installed).
3. On return, Link asks **"Got a table?"**
   - **Yes** → stop marked booked → plan set (directions + calendar).
   - **It's booked** → swap in Plan B (similar spot, same slot), queue a new Plan B, back to the plan.
   - **Not feeling it** (available on any card) → show 3 deliberately different alternatives, pick 1, back to the plan.
4. After the 3rd miss → nudge: walk-in friendly only, wider radius, or a different vibe.

| Tap | Means | App does |
| --- | --- | --- |
| **It's booked** | Right pick, no table | Swaps in Plan B (same vibe, price, distance) and queues a new Plan B. No list. |
| **Not feeling it** | Wrong pick | Shows 3 alternatives that differ from each other (cuisine, price or energy). Tap one. |

**Guardrails**

- One pick plus one visible Plan B per stop. Every other candidate stays hidden in the pool.
- Never more than 3 cards at once, no scrolling, no "load more".
- A place that's booked or skipped never comes back in that plan.
- A replacement must sit near the other stops, so the route still works.
- After 3 misses, offer "walk-in friendly only", a wider radius, or a different vibe instead of more options.
- Swaps use the candidate pool already fetched, so no extra Google calls.

**Later (not MVP):** a swipeable card deck for backups, with photos, reviews and menu per card. Photos and reviews are Google's priciest fields, so this waits until usage justifies it.

## Plan ahead and calendar

Planning ahead ships in the MVP as a date-and-time input plus Add to calendar. A calendar view of all plans waits for accounts in v2.

| Capability | MVP | v2 |
| --- | --- | --- |
| Plan for a future date and time | Yes: the "When" input; opening hours checked for that day | Same |
| Add a locked plan to my calendar | Yes: Google Calendar link or .ics file, one event per stop or one for the whole plan | Same |
| Share the plan with the other person | Yes: text summary + link with the plan encoded in the URL | Live shared plan |
| Saved plans | On this device only (browser storage) | Synced across devices |
| Day-of check | "Re-check" button re-verifies each stop is still open | Automatic reminder + weather check |
| Calendar of plans across days, edit later | No | Yes |

Risk: a plan made days ahead can go stale if a place changes hours or closes. Re-check covers it in the MVP.

## No stuck states, and demo mode

Every screen shows what happened and offers one obvious next tap. No blank panels, no spinners without an exit.

| State | What the user sees | Next action offered |
| --- | --- | --- |
| First open | Map centered on NYC, "Drop a pin or use my location" | Use my location |
| Location denied | Map stays usable, short note | Tap the map or search an address |
| Pin outside NYC | "Link only covers the five boroughs for now" | Move the pin |
| Loading | Skeleton plan cards, "Finding spots near you" | Cancel |
| Too few results | Fewer than 3 options, with a reason (e.g. late night, small radius) | Widen radius / change time / drop the vibe |
| Nothing open | "Most places are closed then" | Try a later start or tomorrow |
| A Google call fails | Options already found stay; the failed stop shows "Couldn't load" | Retry that stop |
| Swap pool runs out | "That's everything nearby for this vibe" | Widen radius / walk-in friendly only / change vibe |
| Quota cap hit | "Link is resting, try again later" + demo mode | Try demo mode |
| Plan locked | Summary with times, Reserve, directions per leg | Add to calendar / Share |

**Demo mode.** A toggle (and `?demo=1` in the URL) runs the whole app on hand-made sample data for 3 NYC areas (e.g. East Village, Williamsburg, West Village) with no API calls. It's for live demos, testing without keys, and building the UI before the backend works. It guarantees a demo never fails on stage and costs $0. Never save real Google responses as sample data.

## How it works

One backend function turns the inputs into up to 3 options plus a pool of backups. Every place and time comes from Google; the logic is plain code. Demo mode skips the backend entirely.

Pipeline (backend function `/api/plans`, holds all keys):

0. Input from the web app: pin, radius, when, duration, plan type, vibe, getting-around toggle.
1. **Vibe chip → search terms:** lookup table tuned by hand, no LLM.
2. **Pooled Places searches:** about 4 searches feed all options.
3. **Filter in code:** open at the planned time (60-min buffer), inside the radius, inside the five boroughs.
4. **Build options:** `planner.ts` applies the plan type, time split, distinct vibes, and Plan B per stop.
5. **Order and time the legs:** Google Routes, walk or transit time per leg.
6. Output: options + candidate pool → drives the map, cards, swaps and directions.

Demo mode: the web app reads sample data directly and skips steps 1–5.

**Data model**

```ts
type StopKind = 'eat' | 'do' | 'wander';      // extend later
type PlanType = 'dinner' | 'eat-view' | 'two-step' | 'three-step' | 'surprise';
type Vibe = 'cozy-date' | 'first-date' | 'fun-active'
          | 'chill-catchup' | 'fancy-night' | 'cheap-cheerful';

type Place = {
  placeId: string;        // the only Google data stored long term
  name: string; lat: number; lng: number;
  priceLevel?: number;
  reservable?: boolean;   // drives Reserve vs walk-in friendly
  bookingUrl?: string;    // OpenTable / Resy / website
};

type Stop = {
  kind: StopKind;
  place: Place;
  startTime: string;      // ISO
  durationMin: number;
  planB?: Place;          // shown on the card
  status?: 'pending' | 'booked' | 'walk-in';
};

type Leg = {
  from: 'origin' | number; to: number;
  mode: 'walk' | 'transit'; minutes: number;
  directionsUrl: string;  // one link per leg
};

type Plan = { id: string; vibe: Vibe; stops: Stop[]; legs: Leg[] };

type PlanRequest = {
  pin: { lat: number; lng: number };
  origin?: { lat: number; lng: number };  // where the user is now
  radiusKm: number; when: string; totalMin: number;
  planType: PlanType; transitOk: boolean; vibe?: Vibe;
};

type PlanResponse = {
  plans: Plan[];                            // up to 3
  pool: Record<StopKind, Place[]>;          // backups for swaps
  excluded: string[];                       // placeIds booked or skipped
};
```

**Stack and providers**

| Layer | Choice | Why |
| --- | --- | --- |
| App | Existing Vite + React + TS + Tailwind + shadcn, as a web app with add-to-home-screen | Free, no App Store, works on iPhone |
| Map | Google Maps JS (`@vis.gl/react-google-maps`) | Google terms require Google place data on a Google map |
| Places | Places API (New), Text Search, minimal field mask | Hours, price, reservable flag |
| Travel times | Routes API, route matrix | Transit times that work in NYC |
| Backend + hosting | One serverless function on Vercel | Free tier, keeps keys off the browser |
| Saved plans | Browser storage | No accounts in the MVP |

Each provider call lives in its own file (`places.ts`, `routes.ts`), so swapping one later touches one file. Adding an LLM in v2 means one new step between 1 and 2, nothing else.

## Cost, constraints and risks

The MVP should run at about $0 a month. Google Places is the only metered piece, and hard quota caps stop surprises.

| Item | Cost at MVP scale | Notes |
| --- | --- | --- |
| LLM | $0 | None in the MVP |
| Google Places | Free monthly allowance, then per call | ~4 pooled searches per request; request only needed fields (hours, price, reservable), skip reviews and photos |
| Google Routes | Free monthly allowance | One matrix call per request |
| Google Maps JS | Free monthly allowance | |
| Directions, Reserve, calendar links | $0 | Plain URLs, no API |
| Hosting + backend function | $0 | Vercel free tier |
| App Store | $0 | Not needed: web app, add to home screen |

**Constraints**

- No reservation availability or auto-booking: OpenTable's API is partner-only and Resy has no public API. Scraping either is off the table.
- Google's terms: show Google place data on a Google map, store only place IDs long term, no bulk copy of the city.
- Multi-stop links don't work with transit, so directions are one button per leg.
- NYC only: search a five-borough rectangle, then drop anything outside a borough outline (NYC Open Data).

**Risks**

| Risk | Mitigation |
| --- | --- |
| Picks feel generic or touristy | Hand-tuned vibe chips; downrank chains and the most-reviewed tourist spots |
| Dinner is booked out | Plan B shown up front, one-tap "It's booked" swap, walk-in friendly toggle |
| Place closed or kitchen closing early | Filter on hours with a 60-minute buffer; day-of re-check |
| Leaked key or a loop runs up the bill | Keys server-side only, quota caps, per-IP rate limit, demo mode as fallback |
| Live demo fails | Demo mode with sample data |

## Roadmap

- **v0 Demo (M0–M3), ships first:** step-by-step flow, real NYC map + radius, sample data, live Vercel URL. Gate: demo runs on a live URL.
- **v1 MVP (M4–M11), ship to friends:** real Google places, 5 plan types, Reserve + swaps, directions per leg, add to calendar, no stuck states. Gate: 10 friends use it for real plans.
- **v2 People (accounts arrive):** describe the other person's interests (LLM), friends' vetted spots, saved-plans calendar, swipeable backup cards, rate stops after. Gate: friend data clearly improves picks.
- **v3 Smarter picks:** OpenTable partner availability, weather-aware picks, learned preferences, group plan voting, native app if needed.

## Build order

Demo mode comes early, so the app is clickable and demoable fast. Each milestone ends in something testable on a phone.

- [ ] **M0 Setup:** read the repo, get it running, write `CLAUDE.md` (stack, commands, rules)
- [ ] **M1 Demo mode:** types from the data model, hand-made sample data for 3 NYC areas, results panel renders options from it. Demoable.
- [ ] **M2 Real map:** Google map in the existing panel, pin by tap/search/my location, radius circle, five-borough check
- [ ] **M3 Flow:** step-by-step flow (where, when, plan type, vibe), getting-around toggle; remove the API-key prompt and the chat box
- [ ] **M4 Backend:** one serverless function `/api/plans`, keys in env vars, quota caps, per-IP rate limit
- [ ] **M5 Places:** `places.ts`, pooled searches per vibe, minimal field mask, filtered to open-at-time (60-min buffer), radius and boroughs
- [ ] **M6 Planner:** `planner.ts`, pure code with unit tests: plan types, time split, distinct options, Plan B per stop
- [ ] **M7 Routes:** `routes.ts`, order the stops, walk or transit time per leg
- [ ] **M8 Lock in:** summary screen, Reserve links, directions per leg, Add to calendar, share link
- [ ] **M9 Swap flow:** It's booked, Not feeling it (3 options), the 3-miss nudge, walk-in friendly toggle
- [ ] **M10 States:** every row of the no-stuck-states table
- [ ] **M11 Ship:** final pass on iPhone, add to home screen, share with ~10 friends

**Environment:** Vercel project connected to the GitHub repo (push to `main` deploys). Google key in Vercel env var `GOOGLE_MAPS_KEY`, never in code. Maps JavaScript, Places (New) and Routes enabled, with quota caps and a budget alert.

## Open questions

- [ ] Are the 6 vibe chips the right ones? Any missing (e.g. "Group hang", "Rainy day")?
- [ ] Is 3 km a high enough max radius for cross-borough plans?
- [ ] Name: is "Link" final?
- [ ] Which 3 NYC areas for demo mode?
