const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, jwtSecret, { expiresIn: jwtExpiresIn });
};

module.exports = generateToken;
