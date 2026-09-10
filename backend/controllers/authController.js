const User = require('../models/User');
const Provider = require('../models/Provider');
const NGO = require('../models/NGO');
const generateToken = require('../utils/generateToken');

const formatUserResponse = (user, profile = null) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role.toLowerCase(),
  isActive: user.isActive,
  profile,
});

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, profile } = req.body;

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, phone, password, role });
    let userProfile = null;

    if (role === 'PROVIDER' && profile) {
      userProfile = await Provider.create({
        userId: user._id,
        organizationName: profile.organizationName || name,
        organizationType: profile.organizationType || 'Institutional Kitchen',
        address: profile.address || 'Delhi',
        city: profile.city || 'New Delhi',
        state: profile.state || 'Delhi',
        location: {
          latitude: profile.latitude || 28.6315,
          longitude: profile.longitude || 77.2167,
        },
        contactPerson: profile.contactPerson || name,
        phone: profile.phone || phone || '0000000000',
        verificationStatus: 'VERIFIED',
      });
    } else if (role === 'NGO' && profile) {
      userProfile = await NGO.create({
        userId: user._id,
        organizationName: profile.organizationName || name,
        registrationNumber: profile.registrationNumber,
        address: profile.address || 'Delhi',
        city: profile.city || 'New Delhi',
        state: profile.state || 'Delhi',
        location: {
          latitude: profile.latitude || 28.651,
          longitude: profile.longitude || 77.192,
        },
        contactPerson: profile.contactPerson || name,
        phone: profile.phone || phone || '0000000000',
        beneficiaryCount: profile.beneficiaryCount || 100,
        dailyFoodRequirement: profile.dailyFoodRequirement || 100,
        storageCapacity: profile.storageCapacity || 150,
        foodPreferences: profile.foodPreferences || ['Vegetarian'],
        verificationStatus: profile.verificationStatus || 'PENDING',
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        user: formatUserResponse(user, userProfile),
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is inactive' });
    }

    let profile = null;
    if (user.role === 'PROVIDER') {
      profile = await Provider.findOne({ userId: user._id });
    } else if (user.role === 'NGO') {
      profile = await NGO.findOne({ userId: user._id });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: formatUserResponse(user, profile),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    let profile = null;
    if (req.user.role === 'PROVIDER') {
      profile = await Provider.findOne({ userId: req.user._id });
    } else if (req.user.role === 'NGO') {
      profile = await NGO.findOne({ userId: req.user._id });
    }

    res.json({
      success: true,
      data: formatUserResponse(req.user, profile),
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { register, login, getMe, logout };
