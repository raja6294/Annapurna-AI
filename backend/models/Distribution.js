const mongoose = require('mongoose');

const DISTRIBUTION_STATUSES = ['RECEIVED', 'DISTRIBUTING', 'COMPLETED'];

const distributionSchema = new mongoose.Schema(
  {
    foodOfferId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodOffer', required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    foodListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodListing',
      required: true,
    },
    quantityReceived: { type: Number, required: true },
    quantityDistributed: { type: Number, default: 0 },
    beneficiariesServed: { type: Number, default: 0 },
    distributionStatus: {
      type: String,
      enum: DISTRIBUTION_STATUSES,
      default: 'RECEIVED',
    },
    distributedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Distribution', distributionSchema);
module.exports.DISTRIBUTION_STATUSES = DISTRIBUTION_STATUSES;
