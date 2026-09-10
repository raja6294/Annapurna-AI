const calculateDistance = require('../../utils/calculateDistance');

const estimateEta = (currentLat, currentLng, destLat, destLng, avgSpeedKmh = 25) => {
  const distanceKm = calculateDistance(currentLat, currentLng, destLat, destLng);
  const etaMinutes = Math.max(1, Math.round((distanceKm / avgSpeedKmh) * 60));
  return { distanceKm, etaMinutes };
};

module.exports = { estimateEta };
