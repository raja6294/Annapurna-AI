const express = require('express');
const { confirmHandover, updatePickupStatus, getPickupRoute } = require('../controllers/pickupController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/:pickupId/handover', authorizeRoles('PROVIDER'), confirmHandover);
router.patch('/:pickupId/status', authorizeRoles('NGO', 'PROVIDER'), updatePickupStatus);
router.get('/:pickupId/route', getPickupRoute);

module.exports = router;
