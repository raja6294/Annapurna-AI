const { useMockAi } = require('../../config/env');

const analyzeFoodImages = async (images = [], foodName = '') => {
  if (!useMockAi) {
    // Future: call external AI service / FastAPI worker
    throw new Error('External AI service not configured. Set USE_MOCK_AI=true for demo mode.');
  }

  const detectedFood = foodName || 'Paneer Butter Masala with Steamed Rice';
  const confidence = 0.88 + Math.random() * 0.1;

  return {
    detectedFood,
    visualCondition: confidence > 0.9 ? 'GOOD' : 'FAIR',
    confidence: Math.round(confidence * 100) / 100,
    observations: [
      'Food appears visually fresh',
      'No obvious visible spoilage indicators detected',
      'Packaging integrity appears acceptable for redistribution review',
    ],
  };
};

module.exports = { analyzeFoodImages };
