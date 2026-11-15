import type { LatLng } from '@/types/plan';

/** Great-circle distance in km. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const WALK_M_PER_MIN = 80;
const GRID_DETOUR = 1.3; // street grid vs. straight line

/** Rough walking minutes from straight-line distance. Demo only; real legs come from Routes (M7). */
export function estimateWalkMinutes(a: LatLng, b: LatLng): number {
  const meters = distanceKm(a, b) * 1000 * GRID_DETOUR;
  return Math.max(2, Math.round(meters / WALK_M_PER_MIN));
}

/** Plain Google Maps directions link (no API key, $0). */
export function directionsUrl(
  origin: LatLng | string,
  destination: LatLng | string,
  mode: 'walk' | 'transit',
): string {
  const fmt = (p: LatLng | string) => (typeof p === 'string' ? p : `${p.lat},${p.lng}`);
  const params = new URLSearchParams({
    api: '1',
    origin: fmt(origin),
    destination: fmt(destination),
    travelmode: mode === 'walk' ? 'walking' : 'transit',
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Plain Google Maps search link for a place by name + address. */
export function mapsSearchUrl(name: string, address?: string): string {
  const q = address ? `${name}, ${address}, New York, NY` : `${name}, New York, NY`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
