const express = require("express");
const router = express.Router();
const verifyToken = require("../verify_token/verifyToken");
const forms = require("../user/forms");
const userSettings = require("../user/settings");
const user_auth = require("../user/signInUp");

//USERS_FORMS
router.get("/api/job_order/:id", verifyToken, forms.getJobOrderOnID);

router.get("/api/job_order", verifyToken, forms.getJobOrders);


router.post(
  "/api/consultation",
  verifyToken,
  forms.createPatentConsultation
);

router.post(
  "/api/patent_drafting",
  verifyToken,
  forms.newVersionPatentDrafting
);

// router.post(
//   "/api/job_order",
//   verifyToken,
//   forms.createJobOrderPatentDrafting
// );

router.post(
  "/api/patent_filing",
  verifyToken,
  forms.newVersionPatentFiling
);

router.post(
  "/api/patent_search",
  verifyToken,
  forms.newVersionPatentSearch
);

router.post(
  "/api/response_to_fer",
  verifyToken,
  forms.newVersionFER
);

router.post(
  "/api/freedom_to_operate",
  verifyToken,
  forms.newVersionFTO
);

router.post("/api/patent_illustration", verifyToken, forms.newVersionIllustration);

router.post("/api/patent_landscape", verifyToken, forms.newVersionLandscape);

router.post("/api/patent_watch", verifyToken, forms.newVersionWatch);

router.post("/api/patent_licensing", verifyToken, forms.newVersionLicense);

router.post(
  "/api/freedom_to_patent_portfolio_analysis",
  verifyToken,
  forms.newVersionPortfolioAnalysis
);

router.post(
  "/api/patent_translation_services",
  verifyToken,
  forms.newVersionTranslation
);

router.get("/api/user/job_files_details/:jobID", verifyToken, forms.getJobFilesDetailsForUsers);

router.get("/api/user/job_files/:jobID", verifyToken, forms.getJobFilesForUsers);

router.put("/api/user/job_order/approve/:jobID", verifyToken, forms.approveTheDoneWork); // Approval given by the User

router.put("/api/user/job_order/reject/:jobID", verifyToken, forms.rejectTheDoneWork);

// Users Notifications

router.get("/api/user/get-notifs/:userID", verifyToken, forms.getNotification) // Get Notifications for Customer

router.put("/api/seen-notif/:notifId/:userID", verifyToken, forms.notificationSeen); // Make the notification, a visited one

router.put("/api/delete-notif/:userID", verifyToken, forms.notifcationsDelete); // For deleting the Selected Notifications

router.get("/api/sort-notif/:userID/:days", verifyToken, forms.sortNotifications); // Sorting Notifications on the basis of Time Interval

router.get("/api/clear-notif/:userID", verifyToken, forms.clearRecentNotifs); // Clearing out the Recent Notifications

// Users Bulk Order

router.post("/api/new-bulk-order-request", verifyToken, forms.newBulkOrderRequest); // API for saving up Bulk Order Request

router.post("/api/bulk-order/upload-files", verifyToken, forms.uploadBulkOrderFiles); // API to get User Files uploaded for Bulk Order Generation

router.get("/api/bulk-order/check-request", verifyToken, forms.checkBulkOrderRequest); // API to check whether User had given a Bulk Order Request


//Users_Settings

router.get("/api/user/img", verifyToken, userSettings.getCustomerProfileImage);

router.get("/api/user/name", verifyToken, userSettings.getCustomerName);

router.get("/api/user/settings", verifyToken, userSettings.getCustomerSettings);

router.put("/api/user/settings", verifyToken, userSettings.updateCustomerSettings);

router.put("/api/user/pref-settings", verifyToken, userSettings.updatePreferentialSettings);

router.put("/api/user/password", verifyToken, userSettings.updateCustomerPassword);

//User_SignInUp

router.post("/api/customer", user_auth.signUpUser);

router.post("/api/auth/signin", user_auth.signInUser);

router.get("/api/verify-token", verifyToken, user_auth.verifyTokenMiddleware);

router.get("/", verifyToken, user_auth.getCustomerData);
module.exports = router;
