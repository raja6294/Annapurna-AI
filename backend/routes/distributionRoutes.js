const express = require('express');
const { getDistributionById } = require('../controllers/distributionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/:id', getDistributionById);

module.exports = router;
