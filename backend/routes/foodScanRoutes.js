/**
 * foodScanRoutes.js
 * Routes for food image upload and AI freshness analysis.
 *
 * POST /api/food-scans/upload  — upload images (multer)
 * POST /api/food-scans/analyze — run AI freshness analysis on uploaded images
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { uploadImages, analyzeImages } = require('../controllers/foodScanController');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/food');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    // Sanitize filename: strip path traversal, keep extension
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `food_${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, safeName);
  },
});

// File filter — only allow images
const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Use JPG, PNG, or WebP.`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 10,                   // max 10 files per request
  },
});

// Multer error handler middleware
const handleMulterError = (err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Maximum size is 10 MB per image.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, message: 'Too many files. Maximum 10 images per upload.' });
    }
    return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// Upload route — requires provider auth
router.post(
  '/upload',
  protect,
  authorizeRoles('PROVIDER'),
  upload.array('images', 10),
  handleMulterError,
  uploadImages
);

// Analyze route — provider only, rate-limited via global apiLimiter in app.js
router.post(
  '/analyze',
  protect,
  authorizeRoles('PROVIDER'),
  analyzeImages
);

module.exports = router;
