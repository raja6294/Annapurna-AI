const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    pickupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pickup', required: true },
    foodOfferId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodOffer' },
    originLat: { type: Number, required: true },
    originLng: { type: Number, required: true },
    destLat: { type: Number, required: true },
    destLng: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    routeCoordinates: [{ lat: Number, lng: Number }],
    provider: { type: String, default: 'mock' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Route', routeSchema);
