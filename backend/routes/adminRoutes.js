const express = require('express');
const {
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
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, authorizeRoles('ADMIN'));

router.get('/dashboard', getDashboard);
router.get('/providers', getProviders);
router.get('/ngos', getNgos);
router.get('/foods', getFoods);
router.get('/offers', getOffers);
router.get('/pickups', getPickups);
router.get('/routes', getRoutes);
router.get('/distributions', getDistributions);
router.get('/analytics', getAnalytics);
router.patch('/ngos/:ngoId/verification', updateNgoVerification);

module.exports = router;
