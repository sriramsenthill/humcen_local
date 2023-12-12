const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../../config");

exports.create = async function (req, session, type, refId) {
  const existingUser = await User.findOne({
    email: req.body.email,
    orgId: req.orgId,
    statusFlag: 'A',
  }).select('_id').lean().exec();

  if (existingUser) throw new Error('User already exists. Try creating with another email.');
  const user = new User(req.body);
  user.type = type;
  if (type === 'CUSTOMER') {
    user.customerId = refId;
  } else if (type === 'PARTNER') {
    user.partnerId = refId;
  } else if (type === 'ADMIN') {
    user.adminId = refId;
  }

  user.isVerified = false;
  user.prefillAuditInfo(req);
  user.modifiedBy = user._id;
  user.password = await bcrypt.hash(req.body.password, 11);
  await user.save({ session });
  return user;
}

exports.isValidUser = async function (req, type) {
  const { email, password } = req.body;
  if (!email || !password) return;

  const user = await User.findOne({
    type,
    email,
    orgId: req.orgId,
    statusFlag: 'A',
  });

  if (!user) return;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : null;
}

exports.generateJwt = function (user, type) {
  let secretKey = '';
  if (type === 'CUSTOMER') {
    secretKey = config.jwtCustomer;
  } else if (type === 'PARTNER') {
    secretKey = config.jwtPartner;
  } else if (type === 'ADMIN') {
    secretKey = config.jwtAdmin;
  }

  if (!secretKey) return;
  return jwt.sign({
    _id: user._id,
    orgId: user.orgId,
    firstName: user.firstName,
    lastName: user.lastName,
  }, secretKey, {
    expiresIn: "1h",
  });
}