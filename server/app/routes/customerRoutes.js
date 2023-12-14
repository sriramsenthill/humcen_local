const express = require("express");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const customerRouter = express.Router();

customerRouter.use(function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({});
  }

  try {
    const decodedUser = jwt.verify(token, config.jwtCustomer);
    req.user = decodedUser;
    req.userId = decodedUser._id;
    req.orgId = decodedUser.orgId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Session Expired" });
  }
});

module.exports = customerRouter;
