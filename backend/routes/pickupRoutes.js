const express = require('express');
const { confirmHandover, updatePickupStatus, getPickupRoute, getLiveLocation } = require('../controllers/pickupController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/:pickupId/handover', authorizeRoles('PROVIDER'), confirmHandover);
router.patch('/:pickupId/status', authorizeRoles('NGO', 'PROVIDER'), updatePickupStatus);
router.get('/:pickupId/route', getPickupRoute);
router.get('/:pickupId/live-location', getLiveLocation);

module.exports = router;
