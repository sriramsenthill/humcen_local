const mongoose = require('mongoose');
const auditFieldsPlugin = require('../auditFieldsPlugin');

const schema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
    index: true,
  },
});

schema.plugin(auditFieldsPlugin);
const State = mongoose.model('State', schema);
module.exports = State;
