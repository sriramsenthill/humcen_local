const mongoose = require('mongoose');
const auditFieldsPlugin = require('../auditFieldsPlugin');

const CountrySchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
});

CountrySchema.plugin(auditFieldsPlugin);
const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;
