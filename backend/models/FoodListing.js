const mongoose = require('mongoose');

const FOOD_TYPES = ['VEGETARIAN', 'NON_VEGETARIAN', 'VEGAN', 'EGG'];
const STATUSES = [
  'DRAFT',
  'ASSESSING',
  'AVAILABLE',
  'MATCHED',
  'ACCEPTED',
  'PICKUP_IN_PROGRESS',
  'HANDED_OVER',
  'COMPLETED',
  'EXPIRED',
  'NOT_RECOMMENDED',
];

const foodListingSchema = new mongoose.Schema(
  {
    listingId: { type: String, unique: true, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    foodName: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    foodType: { type: String, enum: FOOD_TYPES, required: true },
    quantityKg: { type: Number, required: true, min: 0 },
    numberOfPortions: { type: Number, required: true, min: 0 },
    preparedAt: { type: Date, required: true },
    surplusAt: { type: Date, required: true },
    storageMethod: { type: String, required: true },
    storageTemperature: { type: Number },
    packagingType: { type: String },
    packagingCondition: { type: String },
    handlingInformation: { type: String },
    exposureDuration: { type: Number, default: 0 },
    images: [{ type: String }],
    currentStatus: { type: String, enum: STATUSES, default: 'DRAFT' },
    redistributabilityScore: { type: Number, default: 0 },
    redistributionStatus: {
      type: String,
      enum: ['RECOMMENDED', 'MANUAL_REVIEW', 'NOT_RECOMMENDED', 'PENDING'],
      default: 'PENDING',
    },
    remainingRedistributionWindow: { type: Number, default: 0 },
    expiresAt: { type: Date },
    address: { type: String },
    city: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodListing', foodListingSchema);
module.exports.FOOD_TYPES = FOOD_TYPES;
module.exports.STATUSES = STATUSES;
