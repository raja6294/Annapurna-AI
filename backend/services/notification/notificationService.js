const Notification = require('../../models/Notification');

const createNotification = async ({ userId, type, title, message, relatedFoodId, relatedOfferId }) => {
  return Notification.create({
    userId,
    type,
    title,
    message,
    relatedFoodId,
    relatedOfferId,
  });
};

const notifyProvider = async (providerUserId, type, title, message, relatedFoodId, relatedOfferId) => {
  return createNotification({
    userId: providerUserId,
    type,
    title,
    message,
    relatedFoodId,
    relatedOfferId,
  });
};

const notifyNgo = async (ngoUserId, type, title, message, relatedFoodId, relatedOfferId) => {
  return createNotification({
    userId: ngoUserId,
    type,
    title,
    message,
    relatedFoodId,
    relatedOfferId,
  });
};

module.exports = { createNotification, notifyProvider, notifyNgo };
