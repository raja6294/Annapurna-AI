/**
 * routeService.js
 * Calculates routes between two coordinates.
 *
 * When USE_MOCK_MAP=false: calls OSRM public API for real road routing.
 * When USE_MOCK_MAP=true:  uses straight-line approximation (offline dev).
 */

const Route = require('../../models/Route');
const calculateDistance = require('../../utils/calculateDistance');
const { useMockMap, osrmApiUrl } = require('../../config/env');

/**
 * Fetch real road route from OSRM.
 * OSRM expects coordinates as {lng},{lat} pairs.
 * Returns { distanceKm, durationMinutes, routeCoordinates: [{lat, lng}] }
 */
const fetchOsrmRoute = async (originLat, originLng, destLat, destLng) => {
  // Dynamically require node-fetch (CommonJS v2)
  const fetch = require('node-fetch');

  const url = `${osrmApiUrl}/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson&steps=false`;

  const response = await fetch(url, { timeout: 8000 });
  if (!response.ok) {
    throw new Error(`OSRM error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error('OSRM returned no routes');
  }

  const route = data.routes[0];
  const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
  const durationMinutes = Math.round(route.duration / 60);

  // GeoJSON coordinates are [lng, lat] — convert to {lat, lng}
  const routeCoordinates = route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));

  return { distanceKm, durationMinutes, routeCoordinates };
};

/**
 * Generates a straight-line mock route (for offline development).
 */
const getMockRoute = (originLat, originLng, destLat, destLng) => {
  const distanceKm = calculateDistance(originLat, originLng, destLat, destLng);
  const durationMinutes = Math.round(distanceKm * 3 + 5);
  const steps = 8;
  const routeCoordinates = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    routeCoordinates.push({
      lat: originLat + (destLat - originLat) * t,
      lng: originLng + (destLng - originLng) * t,
    });
  }
  return { distanceKm, durationMinutes, routeCoordinates };
};

/**
 * Main route calculation function.
 * Tries real OSRM first; falls back to mock if unavailable.
 */
const calculateRoute = async (originLat, originLng, destLat, destLng) => {
  if (!useMockMap) {
    try {
      const result = await fetchOsrmRoute(originLat, originLng, destLat, destLng);
      return {
        ...result,
        provider: 'osrm',
        fastestRoute: 'OSRM Road Route',
      };
    } catch (err) {
      // OSRM unreachable — fall back to mock with warning
      console.warn(`[routeService] OSRM unavailable, using mock: ${err.message}`);
    }
  }

  const mock = getMockRoute(originLat, originLng, destLat, destLng);
  return {
    ...mock,
    provider: 'mock',
    fastestRoute: 'Mock Direct Route',
  };
};

const saveRouteForPickup = async (pickupId, foodOfferId, origin, dest) => {
  const routeData = await calculateRoute(
    origin.latitude,
    origin.longitude,
    dest.latitude,
    dest.longitude
  );

  return Route.create({
    pickupId,
    foodOfferId,
    originLat: origin.latitude,
    originLng: origin.longitude,
    destLat: dest.latitude,
    destLng: dest.longitude,
    distanceKm: routeData.distanceKm,
    durationMinutes: routeData.durationMinutes,
    routeCoordinates: routeData.routeCoordinates,
    provider: routeData.provider,
  });
};

module.exports = { calculateRoute, saveRouteForPickup };
