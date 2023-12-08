const mongoose = require('mongoose');

module.exports = function auditFieldsPlugin(schema) {
  schema.add({
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    modifiedAt: {
      type: Date,
      default: Date.now(),
      required: true,
      index: true,
    },
    statusFlag: { type: String, required: true, index: true },
  });
};
