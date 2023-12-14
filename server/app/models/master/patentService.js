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
  imageBlob: {
    type: Blob,
  },
});

schema.plugin(auditFieldsPlugin);
const State = mongoose.model("PatentService", schema);
module.exports = State;
