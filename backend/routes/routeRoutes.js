const express = require('express');
const { calculateRouteBetween, getRouteByPickup } = require('../controllers/routeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/calculate', calculateRouteBetween);
router.get('/pickup/:pickupId', getRouteByPickup);

module.exports = router;
