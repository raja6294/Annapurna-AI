const { body } = require('express-validator');
const { FOOD_TYPES } = require('../models/FoodListing');

const createFoodRules = [
  body('foodName').trim().notEmpty().withMessage('Food name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('foodType').isIn(FOOD_TYPES).withMessage('Invalid food type'),
  body('quantityKg').isFloat({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  body('numberOfPortions').isInt({ gt: 0 }).withMessage('Portions must be greater than 0'),
  body('preparedAt').isISO8601().withMessage('Valid preparedAt date is required'),
  body('surplusAt').isISO8601().withMessage('Valid surplusAt date is required'),
  body('storageMethod').trim().notEmpty().withMessage('Storage method is required'),
];

module.exports = { createFoodRules };
