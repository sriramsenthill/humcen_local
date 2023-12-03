require('dotenv').config();
const mongoose = require('mongoose');

const logger = require('./logger');
const models = require('./models');

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/humcen_db', {
      useUnifiedTopology: true,
    });
    this.logger.info('Connected to MongoDB..!');
  } catch (e) {
    this.logger.error('Error connecting to MongoDB', e);
  }
}

connectDb();

module.exports = {
  logger,
  models,
};
