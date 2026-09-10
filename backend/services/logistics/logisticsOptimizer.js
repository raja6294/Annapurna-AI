const { findMatchesForFood } = require('../matching/matchingService');

const selectBestNgo = async (foodListing) => {
  const matches = await findMatchesForFood(foodListing);
  if (!matches.length) return null;

  // Already sorted by composite match score (not distance alone)
  const best = matches[0];
  return {
    selected: best,
    alternatives: matches.slice(1, 4),
    rationale:
      'Selected based on food compatibility, capacity, urgency, remaining window, and travel time — not distance alone.',
  };
};

module.exports = { selectBestNgo };
