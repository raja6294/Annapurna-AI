/**
 * trackingSocket.js
 * Handles real-time delivery tracking via Socket.IO.
 *
 * Rooms: each pickupId is a room.
 * Provider dashboard joins the room to receive NGO driver location updates.
 * NGO driver (or simulator) emits driver:location-update to broadcast position.
 */

const Pickup = require('../models/Pickup');
const logger = require('../utils/logger');

const initTrackingSocket = (io) => {
  const tracking = io.of('/tracking');

  tracking.on('connection', (socket) => {
    logger.info(`Socket connected [/tracking]: ${socket.id}`);

    // Provider dashboard subscribes to a specific pickup's location feed
    socket.on('join:pickup', ({ pickupId }) => {
      if (!pickupId) return;
      socket.join(`pickup:${pickupId}`);
      logger.info(`Socket ${socket.id} joined room pickup:${pickupId}`);
      socket.emit('joined:pickup', { pickupId, message: 'Subscribed to live tracking' });
    });

    // Leave a pickup room (cleanup)
    socket.on('leave:pickup', ({ pickupId }) => {
      if (!pickupId) return;
      socket.leave(`pickup:${pickupId}`);
    });

    /**
     * NGO driver sends their current GPS position.
     * Payload: { pickupId, latitude, longitude, accuracy, timestamp }
     */
    socket.on('driver:location-update', async (data) => {
      const { pickupId, latitude, longitude, accuracy, timestamp } = data;

      // Validate coordinates
      if (
        !pickupId ||
        typeof latitude !== 'number' ||
        typeof longitude !== 'number' ||
        latitude < -90 || latitude > 90 ||
        longitude < -180 || longitude > 180
      ) {
        socket.emit('error:location', { message: 'Invalid location data' });
        return;
      }

      try {
        // Persist current driver position in Pickup document
        await Pickup.findByIdAndUpdate(pickupId, {
          currentLatitude: latitude,
          currentLongitude: longitude,
          updatedAt: new Date(),
        });

        // Broadcast to all subscribers in this pickup's room (provider dashboard)
        tracking.to(`pickup:${pickupId}`).emit('delivery:location-updated', {
          pickupId,
          latitude,
          longitude,
          accuracy: accuracy || null,
          timestamp: timestamp || Date.now(),
        });
      } catch (err) {
        logger.error(`Error saving driver location for pickup ${pickupId}: ${err.message}`);
      }
    });

    /**
     * NGO driver sends a status change (e.g., ON_THE_WAY, ARRIVED)
     * Payload: { pickupId, status }
     */
    socket.on('driver:status-update', async (data) => {
      const { pickupId, status } = data;
      const validStatuses = ['NOT_STARTED', 'NGO_ACCEPTED', 'NGO_ON_THE_WAY', 'ARRIVED', 'HANDOVER_PENDING', 'COMPLETED'];
      if (!pickupId || !validStatuses.includes(status)) return;

      try {
        await Pickup.findByIdAndUpdate(pickupId, { status });
        tracking.to(`pickup:${pickupId}`).emit('delivery:status-updated', { pickupId, status });
        logger.info(`Pickup ${pickupId} status updated via socket: ${status}`);
      } catch (err) {
        logger.error(`Error updating pickup status via socket: ${err.message}`);
      }
    });

    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected [/tracking]: ${socket.id} — ${reason}`);
    });
  });
};

module.exports = initTrackingSocket;
