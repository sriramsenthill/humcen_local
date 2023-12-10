const mongoose = require('mongoose');
const auditFieldsPlugin = require('./auditFieldsPlugin');
const addressSchema = require('./address');

const schema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  email: { type: String },
  phno: { type: String },
  address: addressSchema,
});

schema.plugin(auditFieldsPlugin);
const Organization = mongoose.model('Organization', schema);
module.exports = Organization;
