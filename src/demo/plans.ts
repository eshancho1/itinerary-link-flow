// Hand-made demo plans: for each area and plan type, up to 3 options picked by hand.
// Times and legs are computed in code (PRD time split + straight-line walking estimate).
// No API calls.

import type { Leg, Place, Plan, PlanRequest, PlanResponse, PlanType, Stop, StopKind, Vibe } from '@/types/plan';
import { directionsUrl, estimateWalkMinutes } from '@/lib/geo';
import { DEMO_AREAS, type DemoArea, type DemoAreaId, type DemoPlace } from './places';

/** [pick, planB] place ids, in visiting order. */
type StopSpec = [pick: string, planB: string];
type OptionSpec = { vibe: Vibe; stops: StopSpec[] };

type PlanTypeSettings = { hour: number; minute: number; totalMin: number };

/** When each demo plan type starts and how long it runs. */
export const DEMO_TIMING: Record<PlanType, PlanTypeSettings> = {
  dinner: { hour: 19, minute: 30, totalMin: 90 },
  'eat-view': { hour: 18, minute: 30, totalMin: 120 },
  'two-step': { hour: 19, minute: 0, totalMin: 150 },
  'three-step': { hour: 18, minute: 0, totalMin: 240 }, // "an evening"
  surprise: { hour: 14, minute: 0, totalMin: 210 }, // "3–4 hrs"
};

export const DEMO_RADIUS_KM = 1.5;

const SPECS: Record<DemoAreaId, Record<PlanType, OptionSpec[]>> = {
  'east-village': {
    dinner: [
      { vibe: 'cozy-date', stops: [['demo-ev-supper', 'demo-ev-lucien']] },
      { vibe: 'chill-catchup', stops: [['demo-ev-momofuku', 'demo-ev-ippudo']] },
      { vibe: 'cheap-cheerful', stops: [['demo-ev-veselka', 'demo-ev-mamouns']] },
    ],
    'eat-view': [
      { vibe: 'fancy-night', stops: [['demo-ev-mrpurple', 'demo-ev-lucien']] },
      { vibe: 'cheap-cheerful', stops: [['demo-ev-katz', 'demo-ev-kenka'], ['demo-ev-wburgbridge', 'demo-ev-tompkins']] },
      { vibe: 'chill-catchup', stops: [['demo-ev-veselka', 'demo-ev-mamouns'], ['demo-ev-tompkins', 'demo-ev-washsq']] },
    ],
    'two-step': [
      { vibe: 'first-date', stops: [['demo-ev-ippudo', 'demo-ev-momofuku'], ['demo-ev-deathco', 'demo-ev-mcsorleys']] },
      { vibe: 'cozy-date', stops: [['demo-ev-ilbuco', 'demo-ev-lucien'], ['demo-ev-angelika', 'demo-ev-nytw']] },
      { vibe: 'fun-active', stops: [['demo-ev-mamouns', 'demo-ev-kenka'], ['demo-ev-acebar', 'demo-ev-mercury']] },
    ],
    'three-step': [
      { vibe: 'cozy-date', stops: [['demo-ev-supper', 'demo-ev-lucien'], ['demo-ev-deathco', 'demo-ev-mcsorleys'], ['demo-ev-tompkins', 'demo-ev-stmarks']] },
      { vibe: 'first-date', stops: [['demo-ev-momofuku', 'demo-ev-ippudo'], ['demo-ev-nytw', 'demo-ev-angelika'], ['demo-ev-washsq', 'demo-ev-stmarks']] },
      { vibe: 'cheap-cheerful', stops: [['demo-ev-veselka', 'demo-ev-mamouns'], ['demo-ev-nuyorican', 'demo-ev-acebar'], ['demo-ev-wburgbridge', 'demo-ev-tompkins']] },
    ],
    surprise: [
      { vibe: 'chill-catchup', stops: [['demo-ev-mogador', 'demo-ev-veselka'], ['demo-ev-strand', 'demo-ev-mcsorleys'], ['demo-ev-washsq', 'demo-ev-stmarks']] },
      { vibe: 'fun-active', stops: [['demo-ev-wburgbridge', 'demo-ev-tompkins'], ['demo-ev-katz', 'demo-ev-kenka'], ['demo-ev-acebar', 'demo-ev-mercury']] },
      { vibe: 'cozy-date', stops: [['demo-ev-tompkins', 'demo-ev-stmarks'], ['demo-ev-ilbuco', 'demo-ev-lucien'], ['demo-ev-angelika', 'demo-ev-nytw']] },
    ],
  },
  williamsburg: {
    dinner: [
      { vibe: 'fancy-night', stops: [['demo-wb-luger', 'demo-wb-lilia']] },
      { vibe: 'cozy-date', stops: [['demo-wb-maison', 'demo-wb-diner']] },
      { vibe: 'cheap-cheerful', stops: [['demo-wb-fettesau', 'demo-wb-bestpizza']] },
    ],
    'eat-view': [
      { vibe: 'fancy-night', stops: [['demo-wb-westlight', 'demo-wb-maison']] },
      { vibe: 'cheap-cheerful', stops: [['demo-wb-bestpizza', 'demo-wb-fettesau'], ['demo-wb-domino', 'demo-wb-grandferry']] },
      { vibe: 'chill-catchup', stops: [['demo-wb-sundayinbk', 'demo-wb-diner'], ['demo-wb-mpj', 'demo-wb-grandferry']] },
    ],
    'two-step': [
      { vibe: 'first-date', stops: [['demo-wb-diner', 'demo-wb-sundayinbk'], ['demo-wb-musichall', 'demo-wb-unionpool']] },
      { vibe: 'fun-active', stops: [['demo-wb-fettesau', 'demo-wb-bestpizza'], ['demo-wb-bowl', 'demo-wb-barcade']] },
      { vibe: 'cozy-date', stops: [['demo-wb-lilia', 'demo-wb-maison'], ['demo-wb-nitehawk', 'demo-wb-spoonbill']] },
    ],
    'three-step': [
      { vibe: 'cozy-date', stops: [['demo-wb-maison', 'demo-wb-lilia'], ['demo-wb-nitehawk', 'demo-wb-spoonbill'], ['demo-wb-grandferry', 'demo-wb-domino']] },
      { vibe: 'fun-active', stops: [['demo-wb-bestpizza', 'demo-wb-fettesau'], ['demo-wb-barcade', 'demo-wb-bowl'], ['demo-wb-mccarren', 'demo-wb-bedford']] },
      { vibe: 'fancy-night', stops: [['demo-wb-luger', 'demo-wb-lilia'], ['demo-wb-musichall', 'demo-wb-unionpool'], ['demo-wb-domino', 'demo-wb-grandferry']] },
    ],
    surprise: [
      { vibe: 'chill-catchup', stops: [['demo-wb-devocion', 'demo-wb-sundayinbk'], ['demo-wb-spoonbill', 'demo-wb-nitehawk'], ['demo-wb-mpj', 'demo-wb-bedford']] },
      { vibe: 'fun-active', stops: [['demo-wb-mccarren', 'demo-wb-bedford'], ['demo-wb-fettesau', 'demo-wb-bestpizza'], ['demo-wb-barcade', 'demo-wb-bowl']] },
      { vibe: 'cozy-date', stops: [['demo-wb-domino', 'demo-wb-grandferry'], ['demo-wb-diner', 'demo-wb-maison'], ['demo-wb-nitehawk', 'demo-wb-musichall']] },
    ],
  },
  'west-village': {
    dinner: [
      { vibe: 'cozy-date', stops: [['demo-wv-viacarota', 'demo-wv-buvette']] },
      { vibe: 'fancy-night', stops: [['demo-wv-minetta', 'demo-wv-donangie']] },
      { vibe: 'cheap-cheerful', stops: [['demo-wv-johns', 'demo-wv-joes']] },
    ],
    'eat-view': [
      { vibe: 'fancy-night', stops: [['demo-wv-lebain', 'demo-wv-donangie']] },
      { vibe: 'cheap-cheerful', stops: [['demo-wv-joes', 'demo-wv-johns'], ['demo-wv-pier45', 'demo-wv-littleisland']] },
      { vibe: 'fun-active', stops: [['demo-wv-chelseamarket', 'demo-wv-cornerbistro'], ['demo-wv-littleisland', 'demo-wv-pier45']] },
    ],
    'two-step': [
      { vibe: 'first-date', stops: [['demo-wv-buvette', 'demo-wv-viacarota'], ['demo-wv-comedycellar', 'demo-wv-lpr']] },
      { vibe: 'cozy-date', stops: [['demo-wv-donangie', 'demo-wv-minetta'], ['demo-wv-vanguard', 'demo-wv-smalls']] },
      { vibe: 'cheap-cheerful', stops: [['demo-wv-cornerbistro', 'demo-wv-joes'], ['demo-wv-washsq', 'demo-wv-commerce']] },
    ],
    'three-step': [
      { vibe: 'cozy-date', stops: [['demo-wv-viacarota', 'demo-wv-buvette'], ['demo-wv-smalls', 'demo-wv-vanguard'], ['demo-wv-commerce', 'demo-wv-pier45']] },
      { vibe: 'first-date', stops: [['demo-wv-johns', 'demo-wv-joes'], ['demo-wv-ifc', 'demo-wv-comedycellar'], ['demo-wv-washsq', 'demo-wv-commerce']] },
      { vibe: 'fancy-night', stops: [['demo-wv-minetta', 'demo-wv-donangie'], ['demo-wv-bluenote', 'demo-wv-vanguard'], ['demo-wv-pier45', 'demo-wv-littleisland']] },
    ],
    surprise: [
      { vibe: 'chill-catchup', stops: [['demo-wv-reggio', 'demo-wv-joes'], ['demo-wv-threelives', 'demo-wv-ifc'], ['demo-wv-commerce', 'demo-wv-washsq']] },
      { vibe: 'fun-active', stops: [['demo-wv-highline', 'demo-wv-littleisland'], ['demo-wv-chelseamarket', 'demo-wv-cornerbistro'], ['demo-wv-ifc', 'demo-wv-lpr']] },
      { vibe: 'cozy-date', stops: [['demo-wv-pier45', 'demo-wv-littleisland'], ['demo-wv-buvette', 'demo-wv-viacarota'], ['demo-wv-smalls', 'demo-wv-vanguard']] },
    ],
  },
};

function toPlace({ kind: _kind, ...place }: DemoPlace): Place {
  return place;
}

function findPlace(area: DemoArea, id: string): DemoPlace {
  const place = area.places.find((pl) => pl.placeId === id);
  if (!place) throw new Error(`Demo data: unknown place ${id} in ${area.id}`);
  return place;
}

/** PRD time split: 3-step eat 40 / do 35 / wander 25; 2-step eat 60 / other 40. */
function splitWeights(kinds: StopKind[]): number[] {
  if (kinds.length === 1) return [1];
  if (kinds.length === 2) {
    const eatIdx = kinds.indexOf('eat');
    if (eatIdx === -1) return [0.5, 0.5];
    return kinds.map((_, i) => (i === eatIdx ? 0.6 : 0.4));
  }
  const byKind: Record<StopKind, number> = { eat: 0.4, do: 0.35, wander: 0.25 };
  const raw = kinds.map((k) => byKind[k]);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => w / sum);
}

const placeLabel = (pl: Place) => (pl.address ? `${pl.name}, ${pl.address}, New York, NY` : pl.name);

function buildPlan(area: DemoArea, id: string, spec: OptionSpec, start: Date, totalMin: number): Plan {
  const picks = spec.stops.map(([pick]) => findPlace(area, pick));

  const legs: Leg[] = picks.map((pl, i) => {
    const from = i === 0 ? area.pin : picks[i - 1];
    return {
      from: i === 0 ? 'origin' : i - 1,
      to: i,
      mode: 'walk',
      minutes: estimateWalkMinutes(from, pl),
      directionsUrl: directionsUrl(i === 0 ? area.pin : placeLabel(picks[i - 1]), placeLabel(pl), 'walk'),
    };
  });

  // Travel comes out of the total first, then the PRD split.
  const travel = legs.reduce((sum, l) => sum + l.minutes, 0);
  const remaining = Math.max(30, totalMin - travel);
  const weights = splitWeights(picks.map((pl) => pl.kind));
  const durations = weights.map((w) => Math.max(15, Math.round((remaining * w) / 5) * 5));

  // The first stop starts at the planned time (you leave your pin a few minutes before);
  // later stops start after the walk, rounded up to the next 5 minutes.
  const FIVE_MIN = 5 * 60_000;
  let t = start.getTime();
  const stops: Stop[] = picks.map((pl, i) => {
    if (i > 0) t = Math.ceil((t + legs[i].minutes * 60_000) / FIVE_MIN) * FIVE_MIN;
    const stop: Stop = {
      kind: pl.kind,
      place: toPlace(pl),
      startTime: new Date(t).toISOString(),
      durationMin: durations[i],
      planB: toPlace(findPlace(area, spec.stops[i][1])),
      status: pl.kind === 'eat' && !pl.reservable ? 'walk-in' : 'pending',
    };
    t += durations[i] * 60_000;
    return stop;
  });

  return { id, vibe: spec.vibe, stops, legs };
}

/** Next occurrence of hour:minute (today if still ahead, else tomorrow). */
export function nextStart(hour: number, minute: number, now: Date = new Date()): Date {
  const d = new Date(now);
  d.setHours(hour, minute, 0, 0);
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1);
  return d;
}

export type DemoScenario = { area: DemoArea; request: PlanRequest; response: PlanResponse };

export function getDemoScenario(areaId: DemoAreaId, planType: PlanType, now: Date = new Date()): DemoScenario {
  const area = DEMO_AREAS[areaId];
  const { hour, minute, totalMin } = DEMO_TIMING[planType];
  const start = nextStart(hour, minute, now);

  const plans = SPECS[areaId][planType].map((spec, i) =>
    buildPlan(area, `demo-${areaId}-${planType}-${i + 1}`, spec, start, totalMin),
  );

  const used = new Set(plans.flatMap((pl) => pl.stops.flatMap((s) => [s.place.placeId, s.planB?.placeId])));
  const pool: Record<StopKind, Place[]> = { eat: [], do: [], wander: [] };
  for (const pl of area.places) {
    if (!used.has(pl.placeId)) pool[pl.kind].push(toPlace(pl));
  }

  const request: PlanRequest = {
    pin: area.pin,
    radiusKm: DEMO_RADIUS_KM,
    when: start.toISOString(),
    totalMin,
    planType,
    transitOk: false,
  };

  return { area, request, response: { plans, pool, excluded: [] } };
}
