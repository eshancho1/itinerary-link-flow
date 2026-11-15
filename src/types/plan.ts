// Data model from PRD.md ("How it works → Data model"). Keep in sync with the PRD.

export type StopKind = 'eat' | 'do' | 'wander'; // extend later
export type PlanType = 'dinner' | 'eat-view' | 'two-step' | 'three-step' | 'surprise';
export type Vibe =
  | 'cozy-date'
  | 'first-date'
  | 'fun-active'
  | 'chill-catchup'
  | 'fancy-night'
  | 'cheap-cheerful';

export type LatLng = { lat: number; lng: number };

export type Place = {
  placeId: string; // the only Google data stored long term
  name: string;
  lat: number;
  lng: number;
  priceLevel?: number;
  reservable?: boolean; // drives Reserve vs walk-in friendly
  bookingUrl?: string; // OpenTable / Resy / website
  // Display-only extras (not in the PRD model; Places API returns equivalents):
  address?: string;
  category?: string; // short descriptor, e.g. "French bistro · since 1998"
};

export type Stop = {
  kind: StopKind;
  place: Place;
  startTime: string; // ISO
  durationMin: number;
  planB?: Place; // shown on the card
  status?: 'pending' | 'booked' | 'walk-in';
};

export type Leg = {
  from: 'origin' | number;
  to: number;
  mode: 'walk' | 'transit';
  minutes: number;
  directionsUrl: string; // one link per leg
};

export type Plan = { id: string; vibe: Vibe; stops: Stop[]; legs: Leg[] };

export type PlanRequest = {
  pin: LatLng;
  origin?: LatLng; // where the user is now
  radiusKm: number;
  when: string;
  totalMin: number;
  planType: PlanType;
  transitOk: boolean;
  vibe?: Vibe;
};

export type PlanResponse = {
  plans: Plan[]; // up to 3
  pool: Record<StopKind, Place[]>; // backups for swaps
  excluded: string[]; // placeIds booked or skipped
};
