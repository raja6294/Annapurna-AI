const express = require('express');
const { createFood, getMyFoods, getFoodById, makeAvailable } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const { createFoodRules } = require('../validators/foodValidator');
const { validate } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorizeRoles('PROVIDER'), upload.array('images', 5), createFoodRules, validate, createFood);
router.get('/my', authorizeRoles('PROVIDER'), getMyFoods);
router.get('/:foodId', getFoodById);
router.patch('/:foodId/available', authorizeRoles('PROVIDER'), makeAvailable);

module.exports = router;
