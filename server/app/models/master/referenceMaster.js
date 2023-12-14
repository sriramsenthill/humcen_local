const mongoose = require("mongoose");
const auditFieldsPlugin = require("../auditFieldsPlugin");

const schema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  description: { type: String },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    index: true,
  },
  referenceMasterIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReferenceValues",
      required: true,
      index: true,
    },
  ],
});

schema.plugin(auditFieldsPlugin);
const ReferenceMaster = mongoose.model("ReferenceMaster", schema);
module.exports = ReferenceMaster;
