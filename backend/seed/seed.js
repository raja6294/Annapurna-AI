require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Provider = require('../models/Provider');
const NGO = require('../models/NGO');
const FoodListing = require('../models/FoodListing');
const FoodAssessment = require('../models/FoodAssessment');
const { generateListingId } = require('../utils/generateId');
const providerData = require('./providerData');
const ngoDataList = require('./ngoData');
const foodDataList = require('./foodData');
const { runFullAssessment } = require('../services/ai/aiService');

const seed = async () => {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    Provider.deleteMany({}),
    NGO.deleteMany({}),
    FoodListing.deleteMany({}),
    FoodAssessment.deleteMany({}),
  ]);

  console.log('Creating admin...');
  await User.create({
    name: 'MoFPI Platform Admin',
    email: 'admin@mofpi.gov.in',
    password: 'password123',
    role: 'ADMIN',
    phone: '+91 90000 00001',
  });

  console.log('Creating provider...');
  const providerUser = await User.create({
    name: 'Taj Grand Kitchens & Banquet',
    email: 'provider@tajkitchens.com',
    password: 'password123',
    role: 'PROVIDER',
    phone: providerData.phone,
  });

  const provider = await Provider.create({
    userId: providerUser._id,
    organizationName: providerData.organizationName,
    organizationType: providerData.organizationType,
    address: providerData.address,
    city: providerData.city,
    state: providerData.state,
    location: {
      latitude: providerData.latitude,
      longitude: providerData.longitude,
    },
    contactPerson: providerData.contactPerson,
    phone: providerData.phone,
    verificationStatus: 'VERIFIED',
  });

  console.log('Creating NGOs...');
  for (const ngoData of ngoDataList) {
    const user = await User.create({
      name: ngoData.name,
      email: ngoData.email,
      password: ngoData.password,
      role: 'NGO',
      phone: ngoData.phone,
    });

    await NGO.create({
      userId: user._id,
      organizationName: ngoData.organizationName,
      registrationNumber: ngoData.registrationNumber,
      address: ngoData.address,
      city: ngoData.city,
      state: ngoData.state,
      location: {
        latitude: ngoData.latitude,
        longitude: ngoData.longitude,
      },
      contactPerson: ngoData.contactPerson,
      phone: ngoData.phone,
      beneficiaryCount: ngoData.beneficiaryCount,
      dailyFoodRequirement: ngoData.dailyFoodRequirement,
      storageCapacity: ngoData.storageCapacity,
      foodPreferences: ngoData.foodPreferences,
      verificationStatus: ngoData.verificationStatus,
    });
  }

  console.log('Creating food listings with AI assessments...');
  const now = Date.now();

  for (let i = 0; i < foodDataList.length; i++) {
    const fd = foodDataList[i];
    const preparedAt = new Date(now - (90 + i * 30) * 60000);
    const surplusAt = new Date(now - (60 + i * 20) * 60000);

    const listing = await FoodListing.create({
      listingId: generateListingId(),
      providerId: provider._id,
      ...fd,
      preparedAt,
      surplusAt,
      currentStatus: i === 0 ? 'AVAILABLE' : 'DRAFT',
      address: provider.address,
      city: provider.city,
    });

    const result = await runFullAssessment(listing);
    const expiresAt = new Date(Date.now() + result.estimatedWindowMinutes * 60000);

    await FoodAssessment.create({
      foodListingId: listing._id,
      visualConditionScore: result.breakdown.visualCondition,
      preparationTimingScore: result.breakdown.preparationTiming,
      storageScore: result.breakdown.storage,
      temperatureScore: result.breakdown.temperature,
      packagingScore: result.breakdown.packaging,
      handlingScore: result.breakdown.handling,
      remainingTimeScore: result.breakdown.remainingTime,
      overallRedistributabilityScore: result.score,
      assessmentStatus: result.status === 'NOT_RECOMMENDED' ? 'NOT_RECOMMENDED' : 'COMPLETED',
      aiObservations: result.vision.observations,
      estimatedRedistributionWindow: result.estimatedWindowMinutes,
      detectedFood: result.vision.detectedFood,
    });

    listing.redistributabilityScore = result.score;
    listing.redistributionStatus = result.status;
    listing.remainingRedistributionWindow = result.estimatedWindowMinutes;
    listing.expiresAt = expiresAt;

    if (i === 0 && result.status !== 'NOT_RECOMMENDED') {
      listing.currentStatus = 'AVAILABLE';
    } else if (result.status === 'NOT_RECOMMENDED') {
      listing.currentStatus = 'NOT_RECOMMENDED';
    }

    await listing.save();
  }

  console.log('\n✅ Seed completed!\n');
  console.log('Demo credentials:');
  console.log('  Provider: provider@tajkitchens.com / password123');
  console.log('  NGO:      ngo@akshayashelter.org / password123');
  console.log('  Admin:    admin@mofpi.gov.in / password123');
  console.log('  Unverified NGO: janseva.delhi@gmail.com / password123\n');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
