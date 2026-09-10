const Route = require('../../models/Route');
const calculateDistance = require('../../utils/calculateDistance');
const { useMockMap } = require('../../config/env');

const calculateRoute = async (originLat, originLng, destLat, destLng) => {
  const distanceKm = calculateDistance(originLat, originLng, destLat, destLng);
  const durationMinutes = Math.round(distanceKm * 3 + 5);

  const steps = 5;
  const routeCoordinates = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    routeCoordinates.push({
      lat: originLat + (destLat - originLat) * t,
      lng: originLng + (destLng - originLng) * t,
    });
  }

  return {
    distanceKm,
    durationMinutes,
    fastestRoute: useMockMap ? 'mock-direct-route' : 'external-route',
    routeCoordinates,
    provider: useMockMap ? 'mock' : process.env.MAP_PROVIDER || 'mock',
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
