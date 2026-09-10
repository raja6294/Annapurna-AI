const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');
const logger = require('./utils/logger');

connectDB();

app.listen(port, () => {
  logger.info(`Annapurna AI server running on port ${port}`);
});
