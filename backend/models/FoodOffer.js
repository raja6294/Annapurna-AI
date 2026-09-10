const mongoose = require('mongoose');

const OFFER_STATUSES = ['PENDING', 'ACCEPTED', 'CANCELLED', 'EXPIRED', 'COMPLETED'];

const foodOfferSchema = new mongoose.Schema(
  {
    foodListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodListing',
      required: true,
    },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    quantityOffered: { type: Number, required: true },
    quantityAccepted: { type: Number, required: true },
    matchScore: { type: Number, default: 0 },
    status: { type: String, enum: OFFER_STATUSES, default: 'ACCEPTED' },
    acceptedAt: { type: Date, default: Date.now },
    cancelledAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodOffer', foodOfferSchema);
module.exports.OFFER_STATUSES = OFFER_STATUSES;
