const mongoose = require('mongoose');
const addressSchema = require('./address');
const auditFieldsPlugin = require('./auditFieldsPlugin');
const CountrySchema = require('./country');
const emailPref = require('./emailPrefrences');

const PartnerSchema = new mongoose.Schema({
  emailPreference: emailPref,
  address: addressSchema,
  age: {
    type: Number,
  },
  position: {
    type: String,
  },
  applicant_type: {
    type: String,
  },
  business_name: {
    type: String,
  },
  company_id: {
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
  tax_ID_no: {
    type: String,
  },
  linkedin_profile: {
    type: String,
  },
  years_of_exp: {
    type: Number,
  },
  expertise_in: {
    type: [String],
  },
  can_handle: {
    type: String,
  },
  jobs: {
    type: [Number],
  },
  bank: {
    bank_name: {
      type: String,
    },
    account_num: {
      type: String,
    },
    account_name: {
      type: String,
    },
    branch: {
      type: String,
    },
    ifsc_code: {
      type: String,
    },
    address: {
      type: String,
    },
    town: {
      type: String,
    },
    post_code: {
      type: String,
    },
    country: {
      type: String,
    }
  },

});

PartnerSchema.plugin(auditFieldsPlugin);
const Partner = mongoose.model('Partner', PartnerSchema);
module.exports = Partner;
