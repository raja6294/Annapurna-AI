const http = require('http');
const { Server: SocketIOServer } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const { port, clientUrl } = require('./config/env');
const logger = require('./utils/logger');
const initTrackingSocket = require('./sockets/trackingSocket');

connectDB();

// Create HTTP server so Express and Socket.IO share the same port
const httpServer = http.createServer(app);

// Attach Socket.IO with CORS for the React frontend
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [clientUrl, 'http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Make io accessible in routes/controllers if needed
app.set('io', io);

// Initialize tracking socket namespace
initTrackingSocket(io);

httpServer.listen(port, () => {
  logger.info(`Annapurna AI server running on port ${port} (HTTP + Socket.IO)`);
});
