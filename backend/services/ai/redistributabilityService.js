const { analyzeFoodImages } = require('./foodVisionService');
const { calculateFreshnessScores } = require('./freshnessService');

const calculateRedistributability = async (input) => {
  const {
    images = [],
    foodName,
    foodType,
    preparedAt,
    surplusAt,
    storageMethod,
    storageTemperature,
    packagingType,
    packagingCondition,
    handlingInformation,
    exposureDuration = 0,
    currentTime = new Date(),
  } = input;

  const vision = await analyzeFoodImages(images, foodName);
  const freshness = calculateFreshnessScores({
    preparedAt,
    surplusAt,
    storageTemperature,
    storageMethod,
    exposureDuration,
    currentTime,
  });

  const visualCondition = vision.confidence >= 0.85 ? 91 : vision.confidence >= 0.7 ? 78 : 55;
  const packagingScore =
    packagingCondition?.toLowerCase().includes('good') ||
    packagingCondition?.toLowerCase().includes('intact')
      ? 88
      : 72;
  const handlingScore = handlingInformation ? 85 : 75;

  const breakdown = {
    visualCondition,
    preparationTiming: freshness.preparationTimingScore,
    storage: freshness.storageScore,
    temperature: freshness.temperatureScore,
    packaging: packagingScore,
    handling: handlingScore,
    remainingTime: freshness.remainingTimeScore,
  };

  const score = Math.round(
    Object.values(breakdown).reduce((a, b) => a + b, 0) / Object.keys(breakdown).length
  );

  let status = 'RECOMMENDED';
  if (score < 60) status = 'NOT_RECOMMENDED';
  else if (score < 75) status = 'MANUAL_REVIEW';

  const baseWindow = foodType === 'VEGETARIAN' ? 240 : 180;
  const estimatedWindowMinutes = Math.max(
    30,
    Math.round(baseWindow * (score / 100) - freshness.hoursSincePrep * 15)
  );

  return {
    score,
    status,
    estimatedWindowMinutes,
    breakdown,
    vision,
    disclaimer:
      'AI assessment is advisory only and does not certify food safety. Manual verification required.',
  };
};

module.exports = { calculateRedistributability };
