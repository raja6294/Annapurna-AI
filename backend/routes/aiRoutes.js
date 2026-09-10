const express = require('express');
const { assessFood } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);
router.post('/assess/:foodId', authorizeRoles('PROVIDER'), assessFood);

module.exports = router;
