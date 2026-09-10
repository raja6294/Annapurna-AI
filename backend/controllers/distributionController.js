const Distribution = require('../models/Distribution');

const getDistributionById = async (req, res, next) => {
  try {
    const distribution = await Distribution.findById(req.params.id);
    if (!distribution) {
      return res.status(404).json({ success: false, message: 'Distribution not found' });
    }
    res.json({ success: true, data: distribution });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDistributionById };
