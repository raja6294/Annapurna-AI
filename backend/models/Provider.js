const mongoose = require('mongoose');

const ORG_TYPES = [
  'Restaurant',
  'Hotel',
  'Caterer',
  'Institutional Kitchen',
  'Food Processing Unit',
  'Other',
];

const providerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    organizationName: { type: String, required: true, trim: true },
    organizationType: { type: String, enum: ORG_TYPES, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    contactPerson: { type: String, required: true },
    phone: { type: String, required: true },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED'],
      default: 'VERIFIED',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Provider', providerSchema);
module.exports.ORG_TYPES = ORG_TYPES;
