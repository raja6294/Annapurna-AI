const FoodListing = require('../models/FoodListing');
const FoodOffer = require('../models/FoodOffer');
const Pickup = require('../models/Pickup');
const Route = require('../models/Route');
const FoodAssessment = require('../models/FoodAssessment');
const NGO = require('../models/NGO');

const getDashboard = async (req, res, next) => {
  try {
    const providerId = req.provider._id;

    const [listings, offers, pickups, assessments] = await Promise.all([
      FoodListing.find({ providerId }).sort({ createdAt: -1 }),
      FoodOffer.find({ providerId }).populate('ngoId').sort({ createdAt: -1 }),
      Pickup.find({ providerId }).populate('ngoId foodListingId').sort({ createdAt: -1 }),
      FoodAssessment.find({
        foodListingId: { $in: (await FoodListing.find({ providerId }).select('_id')).map((f) => f._id) },
      }),
    ]);

    res.json({
      success: true,
      data: {
        profile: req.provider,
        activeFoodListings: listings.filter((l) =>
          ['DRAFT', 'ASSESSING', 'AVAILABLE', 'ACCEPTED', 'PICKUP_IN_PROGRESS'].includes(l.currentStatus)
        ),
        allListings: listings,
        foodAssessmentResults: assessments,
        acceptedOffers: offers,
        activePickups: pickups.filter((p) => !['COMPLETED', 'CANCELLED'].includes(p.status)),
        completedHandovers: pickups.filter((p) => p.status === 'COMPLETED'),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPickups = async (req, res, next) => {
  try {
    const pickups = await Pickup.find({ providerId: req.provider._id })
      .populate('ngoId foodListingId foodOfferId')
      .sort({ createdAt: -1 });

    const enriched = await Promise.all(
      pickups.map(async (pickup) => {
        const route = await Route.findOne({ pickupId: pickup._id });
        const ngo = await NGO.findById(pickup.ngoId);
        const food = pickup.foodListingId;

        return {
          pickupId: pickup._id,
          ngoName: ngo?.organizationName,
          food: food?.foodName,
          quantity: pickup.foodOfferId?.quantityAccepted || food?.numberOfPortions,
          ngoLocation: pickup.destinationLocation,
          providerLocation: pickup.pickupLocation,
          distance: pickup.distanceRemaining,
          eta: pickup.etaMinutes,
          route,
          pickupStatus: pickup.status,
          startedAt: pickup.startedAt,
          arrivedAt: pickup.arrivedAt,
          handoverAt: pickup.handoverAt,
        };
      })
    );

    res.json({ success: true, data: enriched });
  } catch (error) {
    next(error);
  }
};

const getPickupById = async (req, res, next) => {
  try {
    const pickup = await Pickup.findById(req.params.pickupId)
      .populate('ngoId foodListingId foodOfferId');

    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup not found' });
    }

    if (pickup.providerId.toString() !== req.provider._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const route = await Route.findOne({ pickupId: pickup._id });
    const ngo = await NGO.findById(pickup.ngoId);

    res.json({
      success: true,
      data: {
        pickup,
        ngoName: ngo?.organizationName,
        route,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, getPickups, getPickupById };
