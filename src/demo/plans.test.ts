import { describe, expect, it } from 'vitest';
import { distanceKm } from '@/lib/geo';
import { MAX_OPTIONS, PLAN_TYPES } from '@/lib/labels';
import type { PlanType } from '@/types/plan';
import { DEMO_AREA_IDS, DEMO_AREAS } from './places';
import { getDemoScenario, nextStart } from './plans';

const STOP_COUNTS: Record<PlanType, number[]> = {
  dinner: [1],
  'eat-view': [1, 2],
  'two-step': [2],
  'three-step': [3],
  surprise: [3],
};

const NOW = new Date('2026-11-15T12:00:00');

describe('demo places', () => {
  it('has unique place ids that are clearly fake', () => {
    const ids = DEMO_AREA_IDS.flatMap((a) => DEMO_AREAS[a].places.map((p) => p.placeId));
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^demo-/);
  });
});

describe.each(DEMO_AREA_IDS)('demo scenarios: %s', (areaId) => {
  it.each(PLAN_TYPES)('%s is a valid PlanResponse', (planType) => {
    const { request, response } = getDemoScenario(areaId, planType, NOW);
    const { plans } = response;

    expect(plans.length).toBeGreaterThan(0);
    expect(plans.length).toBeLessThanOrEqual(MAX_OPTIONS);

    const picks = new Set<string>();
    for (const plan of plans) {
      expect(STOP_COUNTS[planType]).toContain(plan.stops.length);
      expect(plan.legs).toHaveLength(plan.stops.length);
      expect(plan.legs[0].from).toBe('origin');

      let prevEnd = new Date(request.when).getTime();
      plan.stops.forEach((stop, i) => {
        expect(stop.planB).toBeDefined();
        expect(stop.planB!.placeId).not.toBe(stop.place.placeId);
        expect(distanceKm(request.pin, stop.place)).toBeLessThanOrEqual(request.radiusKm);
        expect(distanceKm(request.pin, stop.planB!)).toBeLessThanOrEqual(request.radiusKm);

        const start = new Date(stop.startTime).getTime();
        expect(start).toBeGreaterThanOrEqual(prevEnd);
        prevEnd = start + stop.durationMin * 60_000;

        expect(plan.legs[i].to).toBe(i);
        expect(plan.legs[i].minutes).toBeGreaterThan(0);
        expect(plan.legs[i].directionsUrl).toMatch(/^https:\/\/www\.google\.com\/maps\/dir\//);
        expect(picks.has(stop.place.placeId)).toBe(false); // options are distinct
        picks.add(stop.place.placeId);
      });
      // plan fits roughly in the requested total
      expect(prevEnd - new Date(request.when).getTime()).toBeLessThanOrEqual((request.totalMin + 15) * 60_000);
    }

    if (planType === 'surprise') {
      expect(new Set(plans.map((p) => p.vibe)).size).toBe(plans.length);
    }

    // pool never contains anything already shown
    const shown = new Set(plans.flatMap((p) => p.stops.flatMap((s) => [s.place.placeId, s.planB!.placeId])));
    for (const pl of Object.values(response.pool).flat()) expect(shown.has(pl.placeId)).toBe(false);
  });
});

describe('nextStart', () => {
  it('uses today when the time is still ahead, else tomorrow', () => {
    expect(nextStart(19, 0, NOW).getDate()).toBe(15);
    expect(nextStart(9, 0, NOW).getDate()).toBe(16);
  });
});
