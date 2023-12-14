const mongoose = require("mongoose");
const auditFieldsPlugin = require("./auditFieldsPlugin");

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  type: {
    index: true,
    type: String,
    required: true,
    enum: ["CUSTOMER", "PARTNER", "ADMIN"],
  },
  email: { type: String, required: true },
  phno: { type: String },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  profileImg: {
    type: String,
  },
});

schema.plugin(auditFieldsPlugin);
const User = mongoose.model("User", schema);
module.exports = User;
