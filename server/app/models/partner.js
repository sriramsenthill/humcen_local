const mongoose = require("mongoose");
const addressSchema = require("./address");
const emailPref = require("./emailPrefrences");
const auditFieldsPlugin = require("./auditFieldsPlugin");

const PartnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    index: true,
    required: true,
  },
  profileStage: { type: Number },
  emailPreference: emailPref,
  address: addressSchema,
  age: {
    type: Number,
  },
  position: {
    type: String,
  },
  applicantType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReferenceValues", // ref master code should be APPTYPE
  },
  businessName: {
    type: String,
  },
  companyId: {
    type: String,
  },
  vatPayer: {
    type: Boolean,
  },
  certificateNumber: {
    type: String,
  },
  jurisdiction: {
    type: String,
  },
  taxIdNo: {
    type: String,
  },
  linkedinProfile: {
    type: String,
  },
  yearsOfExp: {
    type: Number,
  },
  expertiseInPatentServiceIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatentService",
    },
  ],
  canHandlePatentServiceIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatentService",
    },
  ],
  bank: {
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    branch: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    address: {
      type: String,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    postcode: {
      type: Number,
    },
  },
});

PartnerSchema.plugin(auditFieldsPlugin);
const Partner = mongoose.model("Partner", PartnerSchema);
module.exports = Partner;
