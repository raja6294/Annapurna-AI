const mongoose = require('mongoose');

const PICKUP_STATUSES = [
  'NOT_STARTED',
  'NGO_ON_THE_WAY',
  'ARRIVED',
  'HANDOVER_PENDING',
  'COMPLETED',
  'CANCELLED',
];

const pickupSchema = new mongoose.Schema(
  {
    foodOfferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodOffer',
      required: true,
    },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    foodListingId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodListing', required: true },
    pickupLocation: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    destinationLocation: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    status: { type: String, enum: PICKUP_STATUSES, default: 'NOT_STARTED' },
    startedAt: { type: Date },
    arrivedAt: { type: Date },
    handoverAt: { type: Date },
    completedAt: { type: Date },
    currentLatitude: { type: Number },
    currentLongitude: { type: Number },
    etaMinutes: { type: Number, default: 0 },
    distanceRemaining: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pickup', pickupSchema);
module.exports.PICKUP_STATUSES = PICKUP_STATUSES;
