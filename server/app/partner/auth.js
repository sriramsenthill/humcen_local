const logger = require("../logger");
const users = require("../common/users");
const Partner = require("../models/partner"); // Import the Partner model

const type = "PARTNER";

const signUpPartner = async (req, res) => {
  let session = null;
  try {
    session = await Partner.startSession();
    session.startTransaction();

    const partner = new Partner();
    const user = await users.create(req, session, type, partner._id);
    partner.userId = user._id;
    partner.prefillAuditInfo(req);
    partner.modifiedBy = user._id;
    await partner.save({ session });
    await session.commitTransaction();
    res.status(200).json({});
  } catch (error) {
    logger.error(req, "Error creating partner:", error);
    res.status(500).json({ error: error.message });
    session && (await session.abortTransaction());
  } finally {
    session && session.endSession();
  }
};

const signInPartner = async (req, res) => {
  try {
    const user = await users.isValidUser(req, type);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = users.generateJwt(user, type);
    if (!token) return res.status(500).json({});

    res.status(200).json({ token });
  } catch (error) {
    logger.error(req, "Failed to sign in:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpPartner,
  signInPartner,
};
