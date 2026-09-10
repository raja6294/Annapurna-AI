const express = require('express');
const { getMatchesForFood } = require('../controllers/matchingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/food/:foodId', getMatchesForFood);

module.exports = router;
