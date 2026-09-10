/**
 * foodScanController.js
 * Handles food image upload and AI freshness analysis.
 */

const path = require('path');
const fs = require('fs');
const { analyzeFoodImages } = require('../services/ai/imageAnalysis');
const logger = require('../utils/logger');

/**
 * POST /api/food-scans/upload
 * Accepts multiple food images via multipart/form-data.
 * Returns array of image URLs accessible from the frontend.
 */
const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images provided. Please upload at least one food photo.',
      });
    }

    const imageUrls = req.files.map((file) => {
      // Return URL path that the frontend can use to display the image
      return `/uploads/food/${file.filename}`;
    });

    logger.info(`Uploaded ${req.files.length} food image(s)`);

    res.json({
      success: true,
      message: `${req.files.length} image(s) uploaded successfully`,
      data: {
        imageUrls,
        count: req.files.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/food-scans/analyze
 * Analyzes uploaded food images using AI vision.
 * Body: { imageUrls: string[], foodName?: string, category?: string, storageMethod?: string }
 */
const analyzeImages = async (req, res, next) => {
  try {
    const { imageUrls = [], foodName, category, storageMethod } = req.body;

    if (!Array.isArray(imageUrls)) {
      return res.status(400).json({
        success: false,
        message: 'imageUrls must be an array of image paths.',
      });
    }

    // Convert URL paths to absolute filesystem paths
    const uploadsDir = path.join(__dirname, '../uploads/food');
    const imagePaths = imageUrls.map((url) => {
      // Strip leading /uploads/food/ or /uploads/ prefix
      const filename = path.basename(url);
      return path.join(uploadsDir, filename);
    });

    logger.info(`Analyzing ${imagePaths.length} image(s) for food: "${foodName || 'unknown'}"`);

    const result = await analyzeFoodImages(imagePaths, { foodName, category, storageMethod });

    res.json({
      success: true,
      message: result.isDemo
        ? 'Demo analysis complete (no AI key configured)'
        : 'AI analysis complete. Results are advisory only — not a food safety certification.',
      data: result,
    });
  } catch (error) {
    logger.error(`Food scan analysis error: ${error.message}`);

    // Return user-friendly error — never expose stack traces
    res.status(500).json({
      success: false,
      message: error.message.includes('AI analysis failed')
        ? error.message
        : 'AI analysis service encountered an error. Please try again.',
    });
  }
};

module.exports = { uploadImages, analyzeImages };
