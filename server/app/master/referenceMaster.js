const mongoose = require('mongoose');
const appUtils = require("../appUtils");
const logger = require("../logger");
const ReferenceMaster = require("../models/master/referenceMaster"); // Assuming your schema is named ReferenceMaster
const ReferenceValues = require('../models/master/referenceValues');

// Create a new entry in the ReferenceMaster collection
exports.createReferenceMaster = async function (req, res) {
    if (!req.body.code || !req.body.name || !req.body.description) {
      return res.status(500).json({ error: 'Incomplete data' });
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const oldReferenceMaster = await ReferenceMaster.findOne({
        orgId: req.orgId,
        code: req.body.code,
      }).session(session);
  
      if (oldReferenceMaster && oldReferenceMaster._id) {
        return res.status(500).json({ error: 'Code already exists.' });
      }
  
      const referenceMaster = new ReferenceMaster(req.body);
      referenceMaster.prefillAuditInfo(req);
      await referenceMaster.save({ session });
  
      const referenceValues = new ReferenceValues({
        name: req.body.name,
        description: req.body.description,
        isActive: req.body.isActive || false,
      });
      referenceValues.prefillAuditInfo(req);
      await referenceValues.save({ session });
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({ _id: referenceMaster._id });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      
      logger.error(req, error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateReferenceMaster = async function (req, res) {
    if (!req.body._id || !req.body.name || !req.body.description || req.body.isActive === undefined || !req.body.country) {
      return res.status(500).json({ error: 'Incomplete data' });
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const referenceMaster = await ReferenceMaster.findById(req.body._id).session(session);
      if (!referenceMaster || !referenceMaster._id) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: 'ReferenceMaster not found' });
      }
  
      // Update ReferenceMaster
      referenceMaster.name = req.body.name;
      referenceMaster.description = req.body.descriptionReferenceMaster;
      referenceMaster.countryId = req.body.countryId;
      referenceMaster.prefillAuditInfo(req);
      await referenceMaster.save({ session });
  
      // Update corresponding entry in ReferenceValues
      const referenceValues = await ReferenceValues.findOne({ _id: referenceMaster._id }).session(session);
      if (referenceValues) {
        referenceValues.name = req.body.nameReferenceValue;
        referenceValues.description = req.body.descriptionReferenceValue;
        referenceValues.isActive = req.body.isActive;
        referenceValues.prefillAuditInfo(req);
        await referenceValues.save({ session });
      }
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({});
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
  
      logger.error(req, error);
      res.status(500).json({ error: error.message });
    }
  };
  


// Search in the ReferenceMaster collection
exports.searchReferenceMaster = async function (req, res) {
    try {
      const query = ReferenceMaster.find({
        orgId: req.orgId,
      });
      query.select('code name description');
      
      // Use appUtils functions for search criteria
      req.body.code &&
        query.where('code').equals(appUtils.getStartsWithRegex(req.body.code));
      req.body.name &&
        query.where('name').equals(appUtils.getInbetweenRegex(req.body.name));
      
      const dataToSend = {};
  
      // Use appUtils functions for codeOrName search
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
  
      const limit = req.body.limit || 20;
      const pageNo = req.body.pageNo || 1;
      query.skip(limit * (pageNo - 1));
      query.limit(limit);
      dataToSend.referenceValues = await query.lean().exec();
  
      res.status(200).json(dataToSend);
    } catch (error) {
      logger.error(req, error);
      res.status(500).json({ error: error.message });
    }
  };
