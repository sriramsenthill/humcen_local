const mongoose = require("mongoose");

const seeder = require("./seeder");
const config = require("../config");
const logger = require("../app/logger");

async function connect() {
  try {
    await mongoose.connect(config.mongodbUrl);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
  }
}

async function init() {
  await connect();
  seeder();
}

exports.init = init;
exports.connect = connect;
