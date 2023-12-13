const mongoose = require("mongoose");

module.exports = function auditFieldsPlugin(schema) {
  schema.add({
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      // required: true,
      index: true,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    modifiedAt: {
      type: Date,
      required: true,
      index: true,
    },
    statusFlag: { type: String, required: true, index: true },
  });

  schema.methods.prefillAuditInfo = function (req) {
    this.orgId = this.orgId || req.orgId;
    this.modifiedBy = req.userId;
    this.modifiedAt = Date.now();
    this.statusFlag = this.statusFlag || "A";
  };
};
