const calculateFreshnessScores = ({
  preparedAt,
  surplusAt,
  storageTemperature = 60,
  storageMethod = '',
  exposureDuration = 0,
  currentTime = new Date(),
}) => {
  const prepTime = new Date(preparedAt).getTime();
  const surplusTime = new Date(surplusAt).getTime();
  const now = new Date(currentTime).getTime();

  const hoursSincePrep = Math.max(0, (now - prepTime) / 3600000);
  const hoursSinceSurplus = Math.max(0, (now - surplusTime) / 3600000);

  let preparationTimingScore = Math.max(40, 100 - hoursSincePrep * 8);
  let remainingTimeScore = Math.max(30, 100 - hoursSinceSurplus * 12 - exposureDuration * 2);

  let storageScore = 85;
  const method = storageMethod.toLowerCase();
  if (method.includes('thermal') || method.includes('insulated')) storageScore = 92;
  else if (method.includes('refrigerat') || method.includes('chilled')) storageScore = 95;
  else if (method.includes('ambient')) storageScore = 65;

  let temperatureScore = 90;
  if (storageTemperature >= 55 && storageTemperature <= 70) temperatureScore = 95;
  else if (storageTemperature < 45 || storageTemperature > 75) temperatureScore = 70;

  return {
    preparationTimingScore: Math.round(preparationTimingScore),
    remainingTimeScore: Math.round(remainingTimeScore),
    storageScore,
    temperatureScore,
    hoursSincePrep: Math.round(hoursSincePrep * 10) / 10,
  };
};

module.exports = { calculateFreshnessScores };
