
const logger = require('../logger');
const users = require('../common/users');
const Partner = require("../models/partner"); // Import the Partner model

const type = 'PARTNER';

const signUpPartner = async (req, res) => {
  try {
    const partner = new Partner();
    const user = await users.create(req, type, partner._id);
    partner.userId = user._id;
    await partner.save();
    res.status(200).json({});
  } catch (error) {
    logger.error("Error creating partner:", error);
    res.status(500).json({ error: error.message });
  }
};

const signInPartner = async (req, res) => {
  try {
    const user = await users.isValidUser(req, type);
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const token = users.generateJwt(user, type);
    if (!token) return res.status(500).json({});

    res.status(200).json({ token });
  } catch (error) {
    logger.error("Failed to sign in:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpPartner,
  signInPartner
};