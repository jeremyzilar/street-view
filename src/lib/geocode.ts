interface GeocodeCache {
  [key: string]: {
    lat: number;
    lng: number;
    timestamp: number;
  };
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let geocodeCache: GeocodeCache = {};

export function getCachedCoordinates(
  address: string
): { lat: number; lng: number } | null {
  const cached = geocodeCache[address];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { lat: cached.lat, lng: cached.lng };
  }
  return null;
}

export function cacheCoordinates(
  address: string,
  lat: number,
  lng: number
): void {
  geocodeCache[address] = {
    lat,
    lng,
    timestamp: Date.now(),
  };
}

export function clearGeocodeCache(): void {
  geocodeCache = {};
}

// Optional: Add a function to clean up old cache entries
export function cleanupGeocodeCache(): void {
  const now = Date.now();
  Object.keys(geocodeCache).forEach((key) => {
    if (now - geocodeCache[key].timestamp > CACHE_DURATION) {
      delete geocodeCache[key];
    }
  });
}
