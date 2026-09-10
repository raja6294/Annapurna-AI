const FoodListing = require('../models/FoodListing');
const FoodAssessment = require('../models/FoodAssessment');
const { generateListingId } = require('../utils/generateId');
const { uploadImages } = require('../services/storage/imageStorageService');
const { calculateRemainingWindowMinutes } = require('../utils/calculateTimeWindow');

const createFood = async (req, res, next) => {
  try {
    if (!req.provider) {
      return res.status(400).json({ success: false, message: 'Provider profile not found' });
    }

    const imageUrls = req.files?.length ? await uploadImages(req.files) : [];
    if (req.body.imageUrls) {
      try {
        const urls = Array.isArray(req.body.imageUrls)
          ? req.body.imageUrls
          : JSON.parse(req.body.imageUrls);
        if (Array.isArray(urls)) imageUrls.push(...urls);
      } catch {
        // ignore invalid imageUrls payload
      }
    }

    const listing = await FoodListing.create({
      listingId: generateListingId(),
      providerId: req.provider._id,
      foodName: req.body.foodName,
      category: req.body.category,
      foodType: req.body.foodType,
      quantityKg: Number(req.body.quantityKg),
      numberOfPortions: Number(req.body.numberOfPortions),
      preparedAt: req.body.preparedAt,
      surplusAt: req.body.surplusAt,
      storageMethod: req.body.storageMethod,
      storageTemperature: req.body.storageTemperature ? Number(req.body.storageTemperature) : undefined,
      packagingType: req.body.packagingType,
      packagingCondition: req.body.packagingCondition,
      handlingInformation: req.body.handlingInformation,
      exposureDuration: req.body.exposureDuration ? Number(req.body.exposureDuration) : 0,
      images: imageUrls,
      currentStatus: 'DRAFT',
      address: req.body.location || req.provider.address,
      city: req.provider.city,
      location: {
        latitude: req.body.latitude ? Number(req.body.latitude) : req.provider.location.latitude,
        longitude: req.body.longitude ? Number(req.body.longitude) : req.provider.location.longitude,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Food listing created successfully',
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

const getMyFoods = async (req, res, next) => {
  try {
    const foods = await FoodListing.find({ providerId: req.provider._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: foods });
  } catch (error) {
    next(error);
  }
};

const getFoodById = async (req, res, next) => {
  try {
    const food = await FoodListing.findById(req.params.foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found' });
    }

    if (
      req.user.role === 'PROVIDER' &&
      food.providerId.toString() !== req.provider?._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this food' });
    }

    const assessment = await FoodAssessment.findOne({ foodListingId: food._id }).sort({ createdAt: -1 });

    res.json({ success: true, data: { food, assessment } });
  } catch (error) {
    next(error);
  }
};

const makeAvailable = async (req, res, next) => {
  try {
    const food = await FoodListing.findById(req.params.foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found' });
    }

    if (food.providerId.toString() !== req.provider._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this food' });
    }

    const assessment = await FoodAssessment.findOne({
      foodListingId: food._id,
      assessmentStatus: { $in: ['COMPLETED', 'MANUAL_REVIEW'] },
    });

    if (!assessment) {
      return res.status(400).json({ success: false, message: 'AI assessment required before making available' });
    }

    if (food.redistributionStatus === 'NOT_RECOMMENDED') {
      return res.status(400).json({
        success: false,
        message: 'Food marked NOT_RECOMMENDED cannot be made available',
      });
    }

    if (food.quantityKg <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }

    const remaining = calculateRemainingWindowMinutes(food.expiresAt);
    if (remaining <= 0) {
      food.currentStatus = 'EXPIRED';
      await food.save();
      return res.status(400).json({ success: false, message: 'Food has expired' });
    }

    food.currentStatus = 'AVAILABLE';
    food.remainingRedistributionWindow = remaining;
    await food.save();

    res.json({
      success: true,
      message: 'Food is now available for NGOs',
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createFood, getMyFoods, getFoodById, makeAvailable };
