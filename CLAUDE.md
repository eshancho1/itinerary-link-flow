# Link: CLAUDE.md

Link is a tap-only NYC plan picker: drop a pin, set a radius and time, pick a plan type, and get up to 3 ready-to-go options. `PRD.md` is the source of truth for scope, data model and build order (M0–M11). Read it before starting a milestone.

## Stack

- Vite + React 18 + TypeScript + Tailwind + shadcn/ui (`src/components/ui`, generated, don't hand-edit unless fixing lint)
- Tests: vitest (`*.test.ts` next to the code)
- Hosting: Vercel, connected to GitHub. A push to `main` deploys to https://itinerary-link-flow.vercel.app
- Node 18 locally (`/usr/local/bin/node` is 18.17), so keep dev deps Node-18 compatible

## Commands

```sh
npm install
npm run dev      # http://localhost:8080  (add ?demo=1 for demo mode)
npm run build    # must pass before pushing
npm run lint     # 0 errors expected (warnings from shadcn files are known)
npm test         # vitest run
```

## Layout

- `src/pages/Index.tsx`: the page: map panel left, flow/results panel right (stacked on mobile)
- `src/components/Header.tsx`, `MapSection.tsx`: existing Lovable UI (map is still a mock until M2)
- `src/components/ChatSection.tsx`: legacy OpenAI chat, shown only when demo mode is off; removed in M3
- `src/components/results/`: reusable results UI: `ResultsPanel`, `OptionCard`, `StopRow`, `LegRow`. M3's flow and M8's lock-in screen should reuse these, not rebuild them
- `src/types/plan.ts`: the PRD data model. Keep it in sync with PRD.md. `Place` has two display-only extras (`address`, `category`) beyond the PRD
- `src/demo/`: demo mode. `places.ts` (hand-typed places), `plans.ts` (hand-picked options per area × plan type; times via the PRD split, walk minutes estimated in `src/lib/geo.ts`), `DemoResults.tsx` (area + plan-type chips → `ResultsPanel`), `plans.test.ts`
- `src/lib/labels.ts`: display labels for plan types, vibes, stop kinds; `MAX_OPTIONS`
- `src/lib/demo-mode.ts`: `?demo=1` / header toggle (`&area=` and `&type=` pick the demo scenario)

## Demo mode

`?demo=1` (or the header toggle) runs the app on hand-made sample data with no API calls. A "Sample data" badge must always be visible in demo mode. Sample places are hand-typed, long-running, well-known NYC spots. **Never save real Google API responses as sample data** (Google terms). Place IDs in demo data are fake (`demo-ev-veselka`).

## Rules

- Keep the existing visual design: use the color tokens in `src/index.css`, the shadcn components and the `gradient` / `floating` button variants. Don't introduce new palettes.
- Never more than 3 options on screen. No "load more".
- Free tiers only. Ask before anything that costs money (paid APIs, Vercel Pro, domains).
- No API keys in code or in the browser. Google key lives in the Vercel env var `GOOGLE_MAPS_KEY`, used only by the serverless function (M4+).
- Each provider call lives in its own file (`places.ts`, `routes.ts`).
- No LLM in the MVP.
- Every screen has a clear next action (see the no-stuck-states table in PRD.md).
