const mongoose = require("mongoose");

const config = require("../config");
const logger = require("../app/logger");
const Organization = require("../app/models/organization");
const seeder = require("./seeder");

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
  try {
    let org = await Organization.findOne({ code: 'CLOUD' });
    if (!org) {
      org = await seeder();
      logger.info('Root Org was created successfully...!');
    }
    global.rootOrg = org && org.toJSON();
  } catch (error) {
    logger.error("Root Org error:", error);
  }
}

exports.init = init;
exports.connect = connect;
