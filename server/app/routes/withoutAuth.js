const express = require("express");
const adminAuth = require("../admin/auth");
const partnerAuth = require("../partner/auth");
const customerAuth = require("../customer/auth");

const router = express.Router();

router.use(function (req, res, next) {
  if (global.rootOrg) {
    req.orgId = global.rootOrg._id;
  }
  next();
});

//Admin
router.post("/admin/signin", adminAuth.signInAdmin);

//Partner
router.post("/partner/signup", partnerAuth.signUpPartner);
router.post("/partner/signin", partnerAuth.signInPartner);

//Customer
router.post("/customer/signup", customerAuth.signUpCustomer);
router.post("/customer/signin", customerAuth.signInCustomer);

module.exports = router;
