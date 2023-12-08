const mongoose = require('mongoose');
const auditFieldsPlugin = require('./auditFieldsPlugin');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['CUSTOMER', 'PARTNER', 'ADMIN'],
  },
  email: { type: String, required: true },
  phno: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});
UserSchema.plugin(auditFieldsPlugin);

module.exports = mongoose.model('User', UserSchema);
