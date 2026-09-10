const FoodListing = require('../models/FoodListing');
const { findMatchesForFood, findBestMatch } = require('../services/matching/matchingService');
const { selectBestNgo } = require('../services/logistics/logisticsOptimizer');

const getMatchesForFood = async (req, res, next) => {
  try {
    const food = await FoodListing.findById(req.params.foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found' });
    }

    if (
      req.user.role === 'PROVIDER' &&
      food.providerId.toString() !== req.provider?._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const matches = await findMatchesForFood(food);
    const optimized = await selectBestNgo(food);

    res.json({
      success: true,
      data: {
        matches,
        recommended: optimized?.selected,
        alternatives: optimized?.alternatives,
        rationale: optimized?.rationale,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMatchesForFood };
