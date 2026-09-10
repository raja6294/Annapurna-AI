const mongoose = require('mongoose');

const FOOD_PREFERENCES = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Egg'];

const ngoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    organizationName: { type: String, required: true, trim: true },
    registrationNumber: { type: String, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    contactPerson: { type: String, required: true },
    phone: { type: String, required: true },
    beneficiaryCount: { type: Number, default: 0 },
    dailyFoodRequirement: { type: Number, default: 0 },
    storageCapacity: { type: Number, default: 100 },
    foodPreferences: [{ type: String, enum: FOOD_PREFERENCES }],
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NGO', ngoSchema);
module.exports.FOOD_PREFERENCES = FOOD_PREFERENCES;
