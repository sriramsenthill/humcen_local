const express = require("express");
const partnerAuth = require("../partner/auth");

const router = express.Router();

router.use(function (req, res, next) {
  if (global.rootOrg) {
    req.org = global.rootOrg;
    req.orgId = global.rootOrg._id;
  }
  next();
});

//Partner_SignInUp
router.post("/partner/signup", partnerAuth.signUpPartner);
router.post("/partner/signin", partnerAuth.signInPartner);

module.exports = router;