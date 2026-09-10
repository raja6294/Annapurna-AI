const calculateDistance = require('../../utils/calculateDistance');
const { calculateRemainingWindowMinutes } = require('../../utils/calculateTimeWindow');

const foodTypeToPreference = {
  VEGETARIAN: 'Vegetarian',
  NON_VEGETARIAN: 'Non-Vegetarian',
  VEGAN: 'Vegan',
  EGG: 'Egg',
};

const calculateMatchScore = (food, ngo, provider) => {
  const pref = foodTypeToPreference[food.foodType] || 'Vegetarian';
  const foodCompatibility = ngo.foodPreferences?.includes(pref) ? 100 : 60;

  const quantityFit =
    food.numberOfPortions <= ngo.storageCapacity
      ? 95
      : Math.max(50, 95 - (food.numberOfPortions - ngo.storageCapacity) * 2);

  const capacityScore = Math.min(
    100,
    Math.round((ngo.storageCapacity / Math.max(food.numberOfPortions, 1)) * 80)
  );

  const distance = calculateDistance(
    provider.location.latitude,
    provider.location.longitude,
    ngo.location.latitude,
    ngo.location.longitude
  );

  const distanceScore = Math.max(40, 100 - distance * 5);
  const travelTime = Math.round(distance * 3 + 5);
  const travelTimeScore = Math.max(40, 100 - travelTime * 2);

  const remainingMinutes = calculateRemainingWindowMinutes(food.expiresAt);
  const remainingWindowScore = Math.min(100, Math.round((remainingMinutes / 240) * 100));
  const urgencyScore =
    remainingMinutes <= 60 ? 98 : remainingMinutes <= 120 ? 90 : remainingMinutes <= 180 ? 80 : 70;

  const requirementFit =
    ngo.dailyFoodRequirement > 0
      ? Math.min(100, Math.round((food.numberOfPortions / ngo.dailyFoodRequirement) * 100))
      : 85;

  const factors = {
    foodCompatibility,
    quantityFit,
    capacity: capacityScore,
    requirementFit,
    distance: distanceScore,
    travelTime: travelTimeScore,
    urgency: urgencyScore,
    remainingWindow: remainingWindowScore,
  };

  const weights = {
    foodCompatibility: 0.2,
    quantityFit: 0.15,
    capacity: 0.1,
    requirementFit: 0.1,
    distance: 0.1,
    travelTime: 0.15,
    urgency: 0.1,
    remainingWindow: 0.1,
  };

  let matchScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    matchScore += factors[key] * weight;
  }

  return {
    ngoId: ngo._id,
    matchScore: Math.round(matchScore),
    factors,
    distance,
    travelTime,
  };
};

module.exports = { calculateMatchScore };
