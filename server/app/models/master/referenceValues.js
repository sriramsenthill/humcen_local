const mongoose = require("mongoose");
const auditFieldsPlugin = require("../auditFieldsPlugin");

const schema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  isActive: { type: Boolean },
});

schema.plugin(auditFieldsPlugin);
const ReferenceValue = mongoose.model("ReferenceValue", schema);
module.exports = ReferenceValue;
