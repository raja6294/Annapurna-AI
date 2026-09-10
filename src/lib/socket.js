/**
 * socket.js
 * Singleton Socket.IO client for real-time delivery tracking.
 *
 * Usage:
 *   import { getSocket, connectSocket, disconnectSocket } from './socket';
 *
 * The socket connects to the /tracking namespace on the backend.
 * Auth token is passed as query param so the backend can identify the user.
 */

import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000';

let socketInstance = null;

/**
 * Get or create the Socket.IO client instance.
 * Connects to the /tracking namespace.
 */
export const getSocket = () => {
  if (!socketInstance) {
    const token = (() => {
      try {
        const raw = localStorage.getItem('annapurna_auth');
        return raw ? JSON.parse(raw).token : null;
      } catch {
        return null;
      }
    })();

    socketInstance = io(`${BACKEND_URL}/tracking`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: { token },
      query: { token },
    });

    socketInstance.on('connect', () => {
      console.log('[Socket.IO] Connected to /tracking namespace:', socketInstance.id);
    });

    socketInstance.on('connect_error', (err) => {
      console.warn('[Socket.IO] Connection error:', err.message);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('[Socket.IO] Disconnected:', reason);
    });
  }

  return socketInstance;
};

/**
 * Connect the socket (lazy init).
 */
export const connectSocket = () => {
  const socket = getSocket();
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
};

/**
 * Disconnect and destroy the socket instance.
 * Call this on logout.
 */
export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

/**
 * Join a pickup room to receive live location updates.
 * @param {string} pickupId
 */
export const joinPickupRoom = (pickupId) => {
  const socket = getSocket();
  socket.emit('join:pickup', { pickupId });
};

/**
 * Leave a pickup room.
 * @param {string} pickupId
 */
export const leavePickupRoom = (pickupId) => {
  const socket = getSocket();
  socket.emit('leave:pickup', { pickupId });
};

export default getSocket;
