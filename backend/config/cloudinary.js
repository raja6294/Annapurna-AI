const cloudinary = require('cloudinary').v2;
const { cloudinary: cloudinaryConfig } = require('./env');

const isConfigured =
  cloudinaryConfig.cloudName &&
  cloudinaryConfig.apiKey &&
  cloudinaryConfig.apiSecret;

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudinaryConfig.cloudName,
    api_key: cloudinaryConfig.apiKey,
    api_secret: cloudinaryConfig.apiSecret,
  });
}

module.exports = { cloudinary, isConfigured };
