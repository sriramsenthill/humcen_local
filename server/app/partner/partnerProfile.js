const logger = require("../logger");
const Partner = require("../models/partner");

const partnerProfile = {};
partnerProfile.getLogInPartner = async function (req, res) {
  try {
    const query = Partner.findOne({
      userId: req.userId,
    });
    query.populate("address.countryId", "code name");
    const partner = await query.lean().exec();
    res.status(200).json({ partner });
  } catch (e) {
    logger.error(req, e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = partnerProfile;
