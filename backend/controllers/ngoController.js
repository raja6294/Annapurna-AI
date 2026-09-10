const FoodListing = require('../models/FoodListing');
const Provider = require('../models/Provider');
const FoodOffer = require('../models/FoodOffer');
const Pickup = require('../models/Pickup');
const Distribution = require('../models/Distribution');
const FoodAssessment = require('../models/FoodAssessment');
const { calculateMatchScore } = require('../services/matching/matchScoreService');
const {
  calculateRemainingWindowMinutes,
  formatWindow,
  getUrgencyLevel,
} = require('../utils/calculateTimeWindow');

const getFoodOpportunities = async (req, res, next) => {
  try {
    if (!req.ngo) {
      return res.status(400).json({ success: false, message: 'NGO profile not found' });
    }

    const now = new Date();
    const foods = await FoodListing.find({
      currentStatus: 'AVAILABLE',
      expiresAt: { $gt: now },
      quantityKg: { $gt: 0 },
    }).populate('providerId');

    const opportunities = await Promise.all(
      foods.map(async (food) => {
        const provider = await Provider.findById(food.providerId);
        const match = provider ? calculateMatchScore(food, req.ngo, provider) : null;
        const remaining = calculateRemainingWindowMinutes(food.expiresAt);

        return {
          foodId: food._id,
          listingId: food.listingId,
          foodName: food.foodName,
          foodType: food.foodType,
          category: food.category,
          quantityKg: food.quantityKg,
          numberOfPortions: food.numberOfPortions,
          providerName: provider?.organizationName,
          redistributabilityScore: food.redistributabilityScore,
          remainingWindow: formatWindow(remaining),
          remainingWindowMinutes: remaining,
          distance: match?.distance,
          estimatedTravelTime: match ? `${match.travelTime} minutes` : null,
          matchScore: match?.matchScore,
          urgency: getUrgencyLevel(remaining),
          images: food.images,
          city: food.city,
        };
      })
    );

    opportunities.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    res.json({ success: true, data: opportunities });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const ngoId = req.ngo._id;
    const [opportunities, offers, pickups, distributions] = await Promise.all([
      FoodListing.countDocuments({ currentStatus: 'AVAILABLE', expiresAt: { $gt: new Date() } }),
      FoodOffer.find({ ngoId }).sort({ createdAt: -1 }).limit(10),
      Pickup.find({ ngoId }).sort({ createdAt: -1 }).limit(10),
      Distribution.find({ ngoId }).sort({ createdAt: -1 }).limit(10),
    ]);

    const totalBeneficiaries = distributions.reduce((s, d) => s + d.beneficiariesServed, 0);

    res.json({
      success: true,
      data: {
        profile: req.ngo,
        availableOpportunitiesCount: opportunities,
        acceptedOffers: offers,
        upcomingPickups: pickups,
        distributionRecords: distributions,
        beneficiariesServed: totalBeneficiaries,
      },
    });
  } catch (error) {
    next(error);
  }
};

const acceptOffer = async (req, res, next) => {
  try {
    if (!req.ngo) {
      return res.status(400).json({ success: false, message: 'NGO profile not found' });
    }

    if (req.ngo.verificationStatus !== 'VERIFIED') {
      return res.status(403).json({
        success: false,
        message: 'Only verified NGOs can accept food offers',
      });
    }

    const food = await FoodListing.findById(req.params.foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found' });
    }

    if (food.currentStatus !== 'AVAILABLE') {
      return res.status(400).json({
        success: false,
        message: `Food is not available (status: ${food.currentStatus})`,
      });
    }

    if (food.expiresAt && new Date(food.expiresAt) <= new Date()) {
      food.currentStatus = 'EXPIRED';
      await food.save();
      return res.status(400).json({ success: false, message: 'Food has expired' });
    }

    const existingOffer = await FoodOffer.findOne({
      foodListingId: food._id,
      status: { $in: ['ACCEPTED', 'PENDING'] },
    });

    if (existingOffer) {
      return res.status(400).json({ success: false, message: 'Food has already been accepted' });
    }

    const provider = await Provider.findById(food.providerId);
    const match = calculateMatchScore(food, req.ngo, provider);
    const quantityAccepted = Number(req.body.quantityAccepted) || food.numberOfPortions;

    const offer = await FoodOffer.create({
      foodListingId: food._id,
      providerId: food.providerId,
      ngoId: req.ngo._id,
      quantityOffered: food.numberOfPortions,
      quantityAccepted,
      matchScore: match.matchScore,
      status: 'ACCEPTED',
      acceptedAt: new Date(),
    });

    food.currentStatus = 'ACCEPTED';
    await food.save();

    const { notifyProvider } = require('../services/notification/notificationService');
    const User = require('../models/User');
    const prov = await Provider.findById(food.providerId);
    const provUser = prov ? await User.findById(prov.userId) : null;

    if (provUser) {
      await notifyProvider(
        provUser._id,
        'OFFER_ACCEPTED',
        'NGO Accepted Your Food',
        `${req.ngo.organizationName} accepted ${food.foodName}`,
        food._id,
        offer._id
      );
    }

    const { saveRouteForPickup } = require('../services/logistics/routeService');

    const pickup = await Pickup.create({
      foodOfferId: offer._id,
      providerId: food.providerId,
      ngoId: req.ngo._id,
      foodListingId: food._id,
      pickupLocation: {
        latitude: provider.location.latitude,
        longitude: provider.location.longitude,
        address: provider.address,
      },
      destinationLocation: {
        latitude: req.ngo.location.latitude,
        longitude: req.ngo.location.longitude,
        address: req.ngo.address,
      },
      status: 'NGO_ACCEPTED',
      startedAt: new Date(),
      etaMinutes: match.travelTime,
      distanceRemaining: match.distance,
    });

    const route = await saveRouteForPickup(
      pickup._id,
      offer._id,
      { latitude: provider.location.latitude, longitude: provider.location.longitude },
      { latitude: req.ngo.location.latitude, longitude: req.ngo.location.longitude }
    );

    await Distribution.create({
      foodOfferId: offer._id,
      ngoId: req.ngo._id,
      foodListingId: food._id,
      quantityReceived: quantityAccepted,
      distributionStatus: 'RECEIVED',
    });

    res.status(201).json({
      success: true,
      message: 'Food offer accepted successfully',
      data: { offer, pickup, route },
    });
  } catch (error) {
    next(error);
  }
};

const getDistributions = async (req, res, next) => {
  try {
    const distributions = await Distribution.find({ ngoId: req.ngo._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: distributions });
  } catch (error) {
    next(error);
  }
};

const updateDistribution = async (req, res, next) => {
  try {
    const distribution = await Distribution.findById(req.params.id);
    if (!distribution) {
      return res.status(404).json({ success: false, message: 'Distribution not found' });
    }

    if (distribution.ngoId.toString() !== req.ngo._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (req.body.quantityDistributed !== undefined) {
      distribution.quantityDistributed = req.body.quantityDistributed;
    }
    if (req.body.beneficiariesServed !== undefined) {
      distribution.beneficiariesServed = req.body.beneficiariesServed;
    }
    if (req.body.distributionStatus) {
      distribution.distributionStatus = req.body.distributionStatus;
      if (req.body.distributionStatus === 'DISTRIBUTING') {
        distribution.distributedAt = new Date();
      }
      if (req.body.distributionStatus === 'COMPLETED') {
        distribution.completedAt = new Date();
      }
    }

    await distribution.save();
    res.json({ success: true, message: 'Distribution updated', data: distribution });
  } catch (error) {
    next(error);
  }
};

const createDistribution = async (req, res, next) => {
  try {
    const distribution = await Distribution.create({
      ...req.body,
      ngoId: req.ngo._id,
    });
    res.status(201).json({ success: true, data: distribution });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFoodOpportunities,
  getDashboard,
  acceptOffer,
  getDistributions,
  updateDistribution,
  createDistribution,
};
