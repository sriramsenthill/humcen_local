const mongoose = require("mongoose");
const auditFieldsPlugin = require("./auditFieldsPlugin");

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    index: true,
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    index: true,
    required: true,
  },
  type: { type: String, enum: ["ADDRESS_PROOF", "PROFILE"], require: true },
  fileName: { type: String, require: true },
  document: { type: Blob },
});

schema.plugin(auditFieldsPlugin);
const PartnerDocument = mongoose.model("PartnerDocument", schema);
module.exports = PartnerDocument;
