const mongoose = require('mongoose');

const NOTIFICATION_TYPES = [
  'FOOD_AVAILABLE',
  'NGO_MATCHED',
  'OFFER_ACCEPTED',
  'PICKUP_STARTED',
  'NGO_ARRIVED',
  'HANDOVER_CONFIRMED',
  'DISTRIBUTION_COMPLETED',
  'FOOD_EXPIRING',
];

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: NOTIFICATION_TYPES, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedFoodId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodListing' },
    relatedOfferId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodOffer' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
module.exports.NOTIFICATION_TYPES = NOTIFICATION_TYPES;
