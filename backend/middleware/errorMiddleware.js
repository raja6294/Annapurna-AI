const { nodeEnv } = require('../config/env');

const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (nodeEnv === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(nodeEnv === 'development' && err.stack ? { stack: err.stack } : {}),
  });
};

module.exports = { notFound, errorHandler };
