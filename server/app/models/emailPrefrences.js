const mongoose = require('mongoose');

const emailPref = new mongoose.Schema({
  mails: {
    type: Boolean,
  },
  orderUpdates: {
    type: Boolean,
  },
  marketingEmails: {
    type: Boolean,
  },
  newsletter: {
    type: Boolean,
  },
});

module.exports = emailPref;
