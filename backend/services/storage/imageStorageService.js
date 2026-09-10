const path = require('path');
const fs = require('fs');
const { cloudinary, isConfigured } = require('../../config/cloudinary');

const uploadImages = async (files = []) => {
  if (!files.length) return [];

  if (isConfigured) {
    const urls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'annapurna-ai/food',
      });
      urls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }
    return urls;
  }

  // Local fallback for demo without Cloudinary
  return files.map((file) => `/uploads/${path.basename(file.path)}`);
};

module.exports = { uploadImages };
