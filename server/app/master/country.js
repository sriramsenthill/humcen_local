const logger = require("../logger");
const Country = require("../models/master/country");

exports.create = async function (req, res) {
  if (!req.body.code || !req.body.name)
    return res.status(500).json({ error: "Incomplete data" });

  try {
    const old = await Country.findOne({
      statusFlag: "A",
      orgId: req.orgId,
      code: req.body.code,
    })
      .select("_id")
      .lean()
      .exec();
    if (old && old._id) {
      return res.status(500).json({ error: "Code already exists." });
    }

    const country = new Country(req.body);
    country.prefillAuditInfo(req);
    await country.save();
    res.status(200).json({ _id: country._id });
  } catch (error) {
    logger.error(req, error);
    res.status(500).json({ error: error.message });
  }
};

exports.update = async function (req, res) {
  if (!req.body._id || !req.body.name)
    return res.status(500).json({ error: "Incomplete data" });

  try {
    const country = await Country.findById(req.body._id);
    if (!country || !country._id) {
      return res.status(500).json({ error: "Country not found" });
    }

    country.name = req.body.name;
    country.prefillAuditInfo(req);
    await country.save();
    res.status(200).json({});
  } catch (error) {
    logger.error(req, error);
    res.status(500).json({ error: error.message });
  }
};

exports.search = async function (req, res) {
  try {
    const query = Country.find({
      statusFlag: "A",
      orgId: req.orgId,
    });
    query.select("code name");
    query.sort("name");
    req.body.code &&
      query.where("code").equals({
        $regex: new RegExp("^" + req.body.code.toLowerCase(), "i"),
      });
    req.body.name &&
      query.where("name").equals({
        $regex: new RegExp("^" + req.body.name.toLowerCase(), "i"),
      });
    const countries = await query.lean().exec();
    res.status(200).json({ countries });
  } catch (error) {
    logger.error(req, error);
    res.status(500).json({ error: error.message });
  }
};
