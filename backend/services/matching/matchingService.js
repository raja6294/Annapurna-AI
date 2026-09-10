const NGO = require('../../models/NGO');
const Provider = require('../../models/Provider');
const { calculateMatchScore } = require('./matchScoreService');

const findMatchesForFood = async (foodListing) => {
  const provider = await Provider.findById(foodListing.providerId);
  if (!provider) return [];

  const ngos = await NGO.find({ verificationStatus: 'VERIFIED' });

  const matches = ngos
    .map((ngo) => calculateMatchScore(foodListing, ngo, provider))
    .sort((a, b) => b.matchScore - a.matchScore);

  return matches.map((m) => {
    const ngo = ngos.find((n) => n._id.toString() === m.ngoId.toString());
    return {
      ...m,
      ngoName: ngo?.organizationName,
      ngoLocation: ngo?.location,
    };
  });
};

const findBestMatch = async (foodListing) => {
  const matches = await findMatchesForFood(foodListing);
  return matches[0] || null;
};

module.exports = { findMatchesForFood, findBestMatch };
