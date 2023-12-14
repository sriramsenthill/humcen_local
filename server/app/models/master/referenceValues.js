const mongoose = require("mongoose");
const auditFieldsPlugin = require("../auditFieldsPlugin");

const schema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  isActive: { type: Boolean },
});

schema.plugin(auditFieldsPlugin);
const State = mongoose.model("ReferenceValues", schema);
module.exports = State;
