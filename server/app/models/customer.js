const mongoose = require("mongoose");

const emailPref = require("./emailPrefrences");
const auditFieldsPlugin = require("./auditFieldsPlugin");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    index: true,
    required: true,
  },
  emailPreference: emailPref,
});

customerSchema.plugin(auditFieldsPlugin);
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
