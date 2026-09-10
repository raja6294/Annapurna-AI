const express = require('express');
const { acceptOffer } = require('../controllers/ngoController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/:foodId/accept', protect, authorizeRoles('NGO'), acceptOffer);

module.exports = router;
