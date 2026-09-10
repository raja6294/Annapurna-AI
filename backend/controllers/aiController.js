const FoodListing = require('../models/FoodListing');
const FoodAssessment = require('../models/FoodAssessment');
const { runFullAssessment } = require('../services/ai/aiService');

const assessFood = async (req, res, next) => {
  try {
    const food = await FoodListing.findById(req.params.foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found' });
    }

    if (food.providerId.toString() !== req.provider._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to assess this food' });
    }

    food.currentStatus = 'ASSESSING';
    await food.save();

    const result = await runFullAssessment(food);

    let assessmentStatus = 'COMPLETED';
    if (result.status === 'NOT_RECOMMENDED') assessmentStatus = 'NOT_RECOMMENDED';
    else if (result.status === 'MANUAL_REVIEW') assessmentStatus = 'MANUAL_REVIEW';

    const assessment = await FoodAssessment.create({
      foodListingId: food._id,
      visualConditionScore: result.breakdown.visualCondition,
      preparationTimingScore: result.breakdown.preparationTiming,
      storageScore: result.breakdown.storage,
      temperatureScore: result.breakdown.temperature,
      packagingScore: result.breakdown.packaging,
      handlingScore: result.breakdown.handling,
      remainingTimeScore: result.breakdown.remainingTime,
      overallRedistributabilityScore: result.score,
      assessmentStatus,
      aiObservations: result.vision.observations,
      estimatedRedistributionWindow: result.estimatedWindowMinutes,
      detectedFood: result.vision.detectedFood,
    });

    const expiresAt = new Date(Date.now() + result.estimatedWindowMinutes * 60000);

    food.redistributabilityScore = result.score;
    food.redistributionStatus = result.status;
    food.remainingRedistributionWindow = result.estimatedWindowMinutes;
    food.expiresAt = expiresAt;
    food.currentStatus =
      result.status === 'NOT_RECOMMENDED' ? 'NOT_RECOMMENDED' : 'DRAFT';
    await food.save();

    res.json({
      success: true,
      message: 'AI assessment completed. This is advisory only — not a food safety certification.',
      data: {
        assessment,
        result: {
          score: result.score,
          status: result.status,
          estimatedWindowMinutes: result.estimatedWindowMinutes,
          breakdown: result.breakdown,
          vision: result.vision,
          disclaimer: result.disclaimer,
        },
        food,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { assessFood };
