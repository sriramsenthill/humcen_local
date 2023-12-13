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
  emailPreference: emailPref,
  address: addressSchema,
  age: {
    type: Number,
  },
  position: {
    type: String,
  },
  applicantType: {
    type: String,
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
  expertiseIn: {
    type: [String],
  },
  canHandle: {
    type: String,
  },
  jobs: {
    type: [Number],
  },
  bank: {
    bankName: {
      type: String,
    },
    accountNum: {
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
    town: {
      type: String,
    },
    postCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
});

PartnerSchema.plugin(auditFieldsPlugin);
const Partner = mongoose.model("Partner", PartnerSchema);
module.exports = Partner;
