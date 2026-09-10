const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/annapurna_ai',
  jwtSecret: process.env.JWT_SECRET || 'annapurna_dev_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  mapProvider: process.env.MAP_PROVIDER || 'mock',
  mapApiKey: process.env.MAP_API_KEY,
  aiServiceUrl: process.env.AI_SERVICE_URL,
  useMockAi: process.env.USE_MOCK_AI !== 'false',
  useMockMap: process.env.USE_MOCK_MAP !== 'false',
  nodeEnv: process.env.NODE_ENV || 'development',
};
