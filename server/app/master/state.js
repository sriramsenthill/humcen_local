const appUtils = require("../appUtils");
const logger = require("../logger");
const State = require("../models/master/state");

exports.create = async function (req, res) {
  if (!req.body.code || !req.body.name)
    return res.status(500).json({ error: "Incomplete data" });

  try {
    const old = await State.findOne({
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

    const state = new State(req.body);
    state.prefillAuditInfo(req);
    await state.save();
    res.status(200).json({ _id: state._id });
  } catch (error) {
    logger.error(req, error);
    res.status(500).json({ error: error.message });
  }
};

exports.update = async function (req, res) {
  if (!req.body._id || !req.body.name || !req.body.countryId)
    return res.status(500).json({ error: "Incomplete data" });

  try {
    const state = await State.findById(req.body._id);
    if (!state || !state._id) {
      return res.status(500).json({ error: "State not found" });
    }

    state.name = req.body.name;
    state.countryId = req.body.countryId;
    state.prefillAuditInfo(req);
    await state.save();
    res.status(200).json({});
  } catch (error) {
    logger.error(req, error);
    res.status(500).json({ error: error.message });
  }
};

exports.search = async function (req, res) {
  try {
    const query = State.find({
      statusFlag: "A",
      orgId: req.orgId,
    });
    query.select("code name");
    query.sort("name");
    req.body.code &&
      query.where("code").equals(appUtils.getStartsWithRegex(req.body.code));
    req.body.name &&
      query.where("name").equals(appUtils.getInbetweenRegex(req.body.name));
    req.body.countryId && query.where("countryId").equals(req.body.countryId);
    const dataToSend = {};
    req.body.codeOrName &&
      query.and([
        {
          $or: [
            {
              name: appUtils.getInbetweenRegex(req.body.codeOrName),
            },
            {
              code: appUtils.getStartsWithRegex(req.body.codeOrName),
            },
          ],
        },
      ]);

    if (req.body.getCount) {
      dataToSend.total = await query.clone().countDocuments();
    }

    query.populate("countryId", "code name");
    const limit = req.body.limit || 20;
    const pageNo = req.body.pageNo || 1;
    query.skip(limit * (pageNo - 1));
    query.limit(limit);
    dataToSend.states = await query.lean().exec();
    res.status(200).json(dataToSend);
  } catch (error) {
    logger.error(req, error);
    res.status(500).json({ error: error.message });
  }
};
