const { calculateRedistributability } = require('./redistributabilityService');

const runFullAssessment = async (foodListing) => {
  return calculateRedistributability({
    images: foodListing.images,
    foodName: foodListing.foodName,
    foodType: foodListing.foodType,
    preparedAt: foodListing.preparedAt,
    surplusAt: foodListing.surplusAt,
    storageMethod: foodListing.storageMethod,
    storageTemperature: foodListing.storageTemperature,
    packagingType: foodListing.packagingType,
    packagingCondition: foodListing.packagingCondition,
    handlingInformation: foodListing.handlingInformation,
    exposureDuration: foodListing.exposureDuration,
  });
};

module.exports = { runFullAssessment };
