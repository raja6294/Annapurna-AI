const mongoose = require('mongoose');

const ASSESSMENT_STATUSES = [
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'MANUAL_REVIEW',
  'NOT_RECOMMENDED',
];

const foodAssessmentSchema = new mongoose.Schema(
  {
    foodListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodListing',
      required: true,
    },
    visualConditionScore: { type: Number, default: 0 },
    preparationTimingScore: { type: Number, default: 0 },
    storageScore: { type: Number, default: 0 },
    temperatureScore: { type: Number, default: 0 },
    packagingScore: { type: Number, default: 0 },
    handlingScore: { type: Number, default: 0 },
    remainingTimeScore: { type: Number, default: 0 },
    overallRedistributabilityScore: { type: Number, default: 0 },
    assessmentStatus: {
      type: String,
      enum: ASSESSMENT_STATUSES,
      default: 'PENDING',
    },
    aiObservations: [{ type: String }],
    estimatedRedistributionWindow: { type: Number, default: 0 },
    detectedFood: { type: String },
    modelName: { type: String, default: 'annapurna-mock-v1' },
    modelVersion: { type: String, default: '1.0.0' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodAssessment', foodAssessmentSchema);
module.exports.ASSESSMENT_STATUSES = ASSESSMENT_STATUSES;
