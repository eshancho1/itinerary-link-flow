# Link · Itinerary Planner

Plan a day out with an AI chat assistant and see it laid out on a map.

## North star

**People go out and enjoy the day they imagined, nearby and on time.**

**Metric:** itineraries planned with a mapped route each week.

## What it does (MVP)

- **Chat:** describe the day you want, and an LLM (OpenAI) suggests an itinerary.
- **Map:** a placeholder map panel with clickable pins. It isn't connected to a real map provider or to the chat yet.
- **Header actions:** New, Save and Share (the UI is there; they don't do anything yet).

The OpenAI API key is entered in the app at runtime and stored only in the browser's `localStorage`. No key is committed to this repo.

## Tech stack

Vite · React · TypeScript · Tailwind CSS · shadcn/ui

## Getting started

Requires Node.js 18+ and npm.

```sh
git clone https://github.com/eshancho1/itinerary-link-flow.git
cd itinerary-link-flow
npm install
npm run dev        # http://localhost:8080
```

Other scripts:

```sh
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run lint
```
