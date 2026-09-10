const User = require('../models/User');
const Provider = require('../models/Provider');
const NGO = require('../models/NGO');
const FoodListing = require('../models/FoodListing');
const FoodAssessment = require('../models/FoodAssessment');
const FoodOffer = require('../models/FoodOffer');
const Pickup = require('../models/Pickup');
const Route = require('../models/Route');
const Distribution = require('../models/Distribution');

const getDashboard = async (req, res, next) => {
  try {
    const [
      totalProviders,
      totalNgos,
      totalFoodListings,
      activeListings,
      aiAssessments,
      activeOffers,
      activePickups,
      completedDonations,
      distributions,
    ] = await Promise.all([
      Provider.countDocuments(),
      NGO.countDocuments(),
      FoodListing.countDocuments(),
      FoodListing.countDocuments({
        currentStatus: { $in: ['AVAILABLE', 'ACCEPTED', 'PICKUP_IN_PROGRESS'] },
      }),
      FoodAssessment.countDocuments(),
      FoodOffer.countDocuments({ status: { $in: ['ACCEPTED', 'PENDING'] } }),
      Pickup.countDocuments({ status: { $nin: ['COMPLETED', 'CANCELLED'] } }),
      FoodOffer.countDocuments({ status: 'COMPLETED' }),
      Distribution.find({ distributionStatus: 'COMPLETED' }),
    ]);

    const totalFoodRedistributed = distributions.reduce((s, d) => s + d.quantityDistributed, 0);
    const totalBeneficiaries = distributions.reduce((s, d) => s + d.beneficiariesServed, 0);
    const availableFood = await FoodListing.countDocuments({ currentStatus: 'AVAILABLE' });

    res.json({
      success: true,
      data: {
        totalProviders,
        totalNgos,
        totalFoodListings,
        activeListings,
        availableFood,
        aiAssessments,
        activeOffers,
        activePickups,
        completedDonations,
        totalFoodRedistributed,
        totalBeneficiaries,
        foodWasteAvoidedKg: Math.round(totalFoodRedistributed * 0.8),
        platformActivity: {
          recentListings: await FoodListing.find().sort({ createdAt: -1 }).limit(5),
          recentOffers: await FoodOffer.find().sort({ createdAt: -1 }).limit(5),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProviders = async (req, res, next) => {
  try {
    const providers = await Provider.find().populate('userId', 'name email phone isActive');
    res.json({ success: true, data: providers });
  } catch (error) {
    next(error);
  }
};

const getNgos = async (req, res, next) => {
  try {
    const ngos = await NGO.find().populate('userId', 'name email phone isActive');
    res.json({ success: true, data: ngos });
  } catch (error) {
    next(error);
  }
};

const getFoods = async (req, res, next) => {
  try {
    const foods = await FoodListing.find().populate('providerId').sort({ createdAt: -1 });
    res.json({ success: true, data: foods });
  } catch (error) {
    next(error);
  }
};

const getOffers = async (req, res, next) => {
  try {
    const offers = await FoodOffer.find()
      .populate('providerId ngoId foodListingId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: offers });
  } catch (error) {
    next(error);
  }
};

const getPickups = async (req, res, next) => {
  try {
    const pickups = await Pickup.find()
      .populate('providerId ngoId foodListingId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: pickups });
  } catch (error) {
    next(error);
  }
};

const getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.json({ success: true, data: routes });
  } catch (error) {
    next(error);
  }
};

const getDistributions = async (req, res, next) => {
  try {
    const distributions = await Distribution.find()
      .populate('ngoId foodListingId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: distributions });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const statusBreakdown = await FoodListing.aggregate([
      { $group: { _id: '$currentStatus', count: { $sum: 1 } } },
    ]);

    const monthlyOffers = await FoodOffer.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: { statusBreakdown, monthlyOffers },
    });
  } catch (error) {
    next(error);
  }
};

const updateNgoVerification = async (req, res, next) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.ngoId,
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    res.json({ success: true, data: ngo });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getProviders,
  getNgos,
  getFoods,
  getOffers,
  getPickups,
  getRoutes,
  getDistributions,
  getAnalytics,
  updateNgoVerification,
};
