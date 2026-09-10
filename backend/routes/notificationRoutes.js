const express = require('express');
const { getMyNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getMyNotifications);
router.patch('/:id/read', markAsRead);

module.exports = router;
