const express = require('express');
const {
  getFoodOpportunities,
  getDashboard,
  acceptOffer,
  getDistributions,
  updateDistribution,
  createDistribution,
} = require('../controllers/ngoController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, authorizeRoles('NGO'));

router.get('/dashboard', getDashboard);
router.get('/food-opportunities', getFoodOpportunities);
router.get('/distribution', getDistributions);
router.post('/distribution', createDistribution);
router.patch('/distribution/:id', updateDistribution);

module.exports = router;
