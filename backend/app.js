const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { clientUrl } = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimitMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const foodRoutes = require('./routes/foodRoutes');
const aiRoutes = require('./routes/aiRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const offerRoutes = require('./routes/offerRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const routeRoutes = require('./routes/routeRoutes');
const distributionRoutes = require('./routes/distributionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const foodScanRoutes = require('./routes/foodScanRoutes');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: [clientUrl, 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Annapurna AI backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/distribution', distributionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/food-scans', foodScanRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
