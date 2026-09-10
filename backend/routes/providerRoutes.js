const express = require('express');
const { getDashboard, getPickups, getPickupById } = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, authorizeRoles('PROVIDER'));

router.get('/dashboard', getDashboard);
router.get('/pickups', getPickups);
router.get('/pickups/:pickupId', getPickupById);

module.exports = router;
