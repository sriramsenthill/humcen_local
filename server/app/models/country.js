const mongoose = require('mongoose');
const auditFieldsPlugin = require('./auditFieldsPlugin');

const schema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
});

schema.plugin(auditFieldsPlugin);
const Country = mongoose.model('Country', schema);
module.exports = Country;
