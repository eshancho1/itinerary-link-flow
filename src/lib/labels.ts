import type { PlanType, StopKind, Vibe } from '@/types/plan';

export const PLAN_TYPE_LABELS: Record<PlanType, string> = {
  dinner: 'Dinner spot',
  'eat-view': 'Eat with a view',
  'two-step': '2-step date',
  'three-step': '3-step date',
  surprise: 'Surprise me',
};

export const PLAN_TYPES = Object.keys(PLAN_TYPE_LABELS) as PlanType[];

export const VIBE_LABELS: Record<Vibe, string> = {
  'cozy-date': 'Cozy date',
  'first-date': 'First date',
  'fun-active': 'Fun & active',
  'chill-catchup': 'Chill catch-up',
  'fancy-night': 'Fancy night',
  'cheap-cheerful': 'Cheap & cheerful',
};

export const STOP_KIND_LABELS: Record<StopKind, string> = {
  eat: 'Eat',
  do: 'Do',
  wander: 'Wander',
};

/** Max options ever shown at once (PRD guardrail). */
export const MAX_OPTIONS = 3;
