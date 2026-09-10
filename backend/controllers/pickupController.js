const Pickup = require('../models/Pickup');
const FoodOffer = require('../models/FoodOffer');
const FoodListing = require('../models/FoodListing');
const { notifyNgo } = require('../services/notification/notificationService');
const Provider = require('../models/Provider');
const User = require('../models/User');
const NGO = require('../models/NGO');

const confirmHandover = async (req, res, next) => {
  try {
    const pickup = await Pickup.findById(req.params.pickupId);
    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup not found' });
    }

    if (pickup.providerId.toString() !== req.provider._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (!['ARRIVED', 'HANDOVER_PENDING'].includes(pickup.status)) {
      // Allow demo flow: auto-advance to ARRIVED if NGO_ON_THE_WAY
      if (pickup.status === 'NGO_ON_THE_WAY') {
        pickup.status = 'ARRIVED';
        pickup.arrivedAt = new Date();
      } else {
        return res.status(400).json({
          success: false,
          message: `Pickup must be ARRIVED before handover (current: ${pickup.status})`,
        });
      }
    }

    pickup.status = 'COMPLETED';
    pickup.handoverAt = new Date();
    pickup.completedAt = new Date();
    await pickup.save();

    const offer = await FoodOffer.findById(pickup.foodOfferId);
    if (offer) {
      offer.status = 'COMPLETED';
      offer.completedAt = new Date();
      await offer.save();
    }

    const food = await FoodListing.findById(pickup.foodListingId);
    if (food) {
      food.currentStatus = 'HANDED_OVER';
      await food.save();
    }

    const ngo = await NGO.findById(pickup.ngoId);
    const ngoUser = ngo ? await User.findById(ngo.userId) : null;
    if (ngoUser) {
      await notifyNgo(
        ngoUser._id,
        'HANDOVER_CONFIRMED',
        'Handover Confirmed',
        `Provider confirmed handover of ${food?.foodName || 'food'}`,
        food?._id,
        offer?._id
      );
    }

    res.json({
      success: true,
      message: 'Handover confirmed successfully',
      data: { pickup, offer, food },
    });
  } catch (error) {
    next(error);
  }
};

const updatePickupStatus = async (req, res, next) => {
  try {
    const pickup = await Pickup.findById(req.params.pickupId);
    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup not found' });
    }

    const { status, currentLatitude, currentLongitude } = req.body;

    if (req.user.role === 'NGO' && pickup.ngoId.toString() !== req.ngo._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (status) {
      const validTransitions = {
        'NOT_STARTED': ['NGO_ON_THE_WAY', 'CANCELLED'],
        'NGO_ACCEPTED': ['NGO_ON_THE_WAY', 'CANCELLED'],
        'NGO_ON_THE_WAY': ['ARRIVED', 'CANCELLED'],
        'ARRIVED': ['HANDOVER_PENDING', 'COMPLETED'],
        'HANDOVER_PENDING': ['COMPLETED'],
        'COMPLETED': [],
        'CANCELLED': []
      };

      const allowedNextStates = validTransitions[pickup.status] || [];
      if (!allowedNextStates.includes(status)) {
        return res.status(400).json({ 
          success: false, 
          message: `Invalid transition from ${pickup.status} to ${status}` 
        });
      }
      pickup.status = status;
    }
    if (currentLatitude) pickup.currentLatitude = currentLatitude;
    if (currentLongitude) pickup.currentLongitude = currentLongitude;

    if (status === 'NGO_ON_THE_WAY') pickup.startedAt = new Date();
    if (status === 'ARRIVED') pickup.arrivedAt = new Date();

    await pickup.save();

    const food = await FoodListing.findById(pickup.foodListingId);
    if (food && status === 'NGO_ON_THE_WAY') {
      food.currentStatus = 'PICKUP_IN_PROGRESS';
      await food.save();
    }

    res.json({ success: true, data: pickup });
  } catch (error) {
    next(error);
  }
};

const getPickupRoute = async (req, res, next) => {
  try {
    const Route = require('../models/Route');
    const pickup = await Pickup.findById(req.params.pickupId);
    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup not found' });
    }

    const route = await Route.findOne({ pickupId: pickup._id });
    res.json({ success: true, data: { pickup, route } });
  } catch (error) {
    next(error);
  }
};

const getLiveLocation = async (req, res, next) => {
  try {
    const pickup = await Pickup.findById(req.params.pickupId).select(
      'status currentLatitude currentLongitude pickupLocation destinationLocation etaMinutes updatedAt'
    );
    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup not found' });
    }
    res.json({
      success: true,
      data: {
        pickupId: pickup._id,
        status: pickup.status,
        currentLatitude: pickup.currentLatitude,
        currentLongitude: pickup.currentLongitude,
        providerLocation: pickup.pickupLocation,
        ngoLocation: pickup.destinationLocation,
        etaMinutes: pickup.etaMinutes,
        lastUpdated: pickup.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { confirmHandover, updatePickupStatus, getPickupRoute, getLiveLocation };
