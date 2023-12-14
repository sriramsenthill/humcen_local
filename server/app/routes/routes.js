const express = require("express");
const router = express.Router();
const forms = require("../user/forms");
const userSettings = require("../user/settings");
const user_auth = require("../user/signInUp");

//USERS_FORMS
router.get("/api/job_order/:id", forms.getJobOrderOnID);

router.get("/api/job_order", forms.getJobOrders);

router.post(
  "/api/consultation",

  forms.createPatentConsultation
);

router.post(
  "/api/patent_drafting",

  forms.newVersionPatentDrafting
);

// router.post(
//   "/api/job_order",
//
//   forms.createJobOrderPatentDrafting
// );

router.post(
  "/api/patent_filing",

  forms.newVersionPatentFiling
);

router.post(
  "/api/patent_search",

  forms.newVersionPatentSearch
);

router.post(
  "/api/response_to_fer",

  forms.newVersionFER
);

router.post(
  "/api/freedom_to_operate",

  forms.newVersionFTO
);

router.post("/api/patent_illustration", forms.newVersionIllustration);

router.post("/api/patent_landscape", forms.newVersionLandscape);

router.post("/api/patent_watch", forms.newVersionWatch);

router.post("/api/patent_licensing", forms.newVersionLicense);

router.post(
  "/api/freedom_to_patent_portfolio_analysis",

  forms.newVersionPortfolioAnalysis
);

router.post(
  "/api/patent_translation_services",

  forms.newVersionTranslation
);

router.get(
  "/api/user/job_files_details/:jobID",
  forms.getJobFilesDetailsForUsers
);

router.get("/api/user/job_files/:jobID", forms.getJobFilesForUsers);

router.put("/api/user/job_order/approve/:jobID", forms.approveTheDoneWork); // Approval given by the User

router.put("/api/user/job_order/reject/:jobID", forms.rejectTheDoneWork);

// Users Notifications

router.get("/api/user/get-notifs/:userID", forms.getNotification); // Get Notifications for Customer

router.put("/api/seen-notif/:notifId/:userID", forms.notificationSeen); // Make the notification, a visited one

router.put("/api/delete-notif/:userID", forms.notifcationsDelete); // For deleting the Selected Notifications

router.get("/api/sort-notif/:userID/:days", forms.sortNotifications); // Sorting Notifications on the basis of Time Interval

router.get("/api/clear-notif/:userID", forms.clearRecentNotifs); // Clearing out the Recent Notifications

// Users Bulk Order

router.post("/api/new-bulk-order-request", forms.newBulkOrderRequest); // API for saving up Bulk Order Request

router.post("/api/bulk-order/upload-files", forms.uploadBulkOrderFiles); // API to get User Files uploaded for Bulk Order Generation

router.get("/api/bulk-order/check-request", forms.checkBulkOrderRequest); // API to check whether User had given a Bulk Order Request

//Users_Settings

router.get("/api/user/img", userSettings.getCustomerProfileImage);

router.get("/api/user/name", userSettings.getCustomerName);

router.get("/api/user/settings", userSettings.getCustomerSettings);

router.put("/api/user/settings", userSettings.updateCustomerSettings);

router.put("/api/user/pref-settings", userSettings.updatePreferentialSettings);

router.put("/api/user/password", userSettings.updateCustomerPassword);

//User_SignInUp

router.post("/api/customer", user_auth.signUpUser);

router.post("/api/auth/signin", user_auth.signInUser);

router.get("/api/verify-token", user_auth.verifyTokenMiddleware);

router.get("/", user_auth.getCustomerData);
module.exports = router;
