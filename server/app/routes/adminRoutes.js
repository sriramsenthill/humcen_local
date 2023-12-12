const express = require("express");
const jwt = require("jsonwebtoken");

const data = require("../admin/data");
const config = require("../../config");
const adminSettings = require("../admin/settings");

const adminRouter = express.Router();

adminRouter.use(function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({});
  }

  try {
    const decodedUser = jwt.verify(token, config.jwtAdmin);
    req.user = decodedUser;
    req.userID = decodedUser._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Session Expired" });
  }
});

const country = require("../master/country");
adminRouter.post("/country/create", country.create);
adminRouter.post("/country/update", country.update);
adminRouter.post("/country/search", country.search);

//ADMIN DATA
adminRouter.get("/user", data.getUsers);

adminRouter.get("/partner", data.getPartners);

adminRouter.get("/customer", data.getCustomers);

adminRouter.get("/admin", data.getAdmins);

adminRouter.get("/job_order", data.getJobOrders);

adminRouter.get("/job_files/:jobID", data.getJobFiles); // For getting

adminRouter.put("/job_files_details/:jobID", data.updateJobFilesDetails); // For giving File access to the User, if Admin accepts Partner's Work, otherwise Admin deletes it

adminRouter.get("/job_files_details/:jobID", data.getJobFilesDetails); // For getting Partner's Work from Admin Side

adminRouter.get("/job_order/:jobID", data.getJobOrderById); // For getting Job Details from Admin Side

// ADMIN UNASSIGNED JOBS
adminRouter.get("/Unassigned", data.getUnassignedJobOrders);

adminRouter.get("/Unassigned/:jobID", data.getUnassignedJobById); // For getting Job Details from Admin Side

adminRouter.get(
  "/Unassigned/only-details/:jobID",
  data.getUnassignedJobDetailsById
); // Getting only the Necessary Details

adminRouter.get("/find-partner/:services/:country", data.getPartnersData); // Fetching out Available Partners to assign the Task

adminRouter.post("/assign", data.assignTask); // To manually assign Task to a Partner

adminRouter.get(
  "/user_files/:services/:id",
  data.getUnassignedJobFilesForAdmin
); // To fetch Unassigned User Files for Admin

adminRouter.get(
  "/cross-assign/find-partner/:services/:country/:partID",
  data.getPartnersDataForCrossAssign
); // Fetching out Available Partners to Cross Assign the Task

adminRouter.post("/cross_assign", data.crossAssignTask); // To manually assign Task to a Partner

adminRouter.get(
  "/user_files/:services/:id",
  data.getUnassignedJobFilesForAdmin
); // To fetch Unassigned User Files for Admin

// ADMIN BULK ORDERS
adminRouter.get("/process-base64-csv/:base", data.getCSVData); // Get CSV data through Python script

adminRouter.post("/create-bulk-orders", data.createBulkOrders); // Create Bulk Orders

adminRouter.get("/get-bulk-orders", data.getAllBulkOrders); // For Fetching Bulk Orders for Admin

adminRouter.get("/bulk-order/:id", data.getBulkOrderById); // Getting details of that particular Bulk Order

adminRouter.get("/bulk-order-file/:id", data.getBulkOrderFileById); // Getting details of that particular Bulk Order

adminRouter.get(
  "/bulk-order/partner/:service/:country",
  data.getPartnersForBulkOrder
); // Getting Partner's Details according to the service chosen by Admin

adminRouter.post("/bulk-order/assign/:id", data.assignBulkOrder); // API for Assigning Bulk Order Task to the Partner

adminRouter.get("/bulk-order-files", data.getBulkOrderFilesDetails); // Get details of User uploaded Bulk Order Files

adminRouter.get(
  "/that-bulk-order-file/:fileNo",
  data.getParticularBulkOrderFileDetails
); // This one fetches details from Bulk Order Files schema

adminRouter.get(
  "/only-that-bulk-order-file/:fileNo",
  data.getOnlyTheParticularBulkOrderFile
); // This one fetches only files from Bulk Order Files schema

adminRouter.get(
  "/bulk-assign-details/:bulkLists",
  data.getBulkOrderAssignTabDetails
); // Bulk Order details for Bulk Assign

adminRouter.get(
  "/find-partners/bulk-orders/:service/:country/:bulkOrders",
  data.getBulkOrderAssignPartners
); // Finding Partner details for Bulk Assign

adminRouter.post(
  "/bulk-orders/assign/:partnerID/:bulkIDs",
  data.assignBulkOrdersToPartners
); // Sending Assign Results for Partner Assign

// ADMIN SETTINGS
adminRouter.get("/settings", adminSettings.getAdminProfileSettings); // For fetching Admin's Profile Settings

adminRouter.put("/settings", adminSettings.updateAdminPersonalProfileSettings); // For Updating Admin's Personal Information Settings

adminRouter.put("/billing-settings", adminSettings.updateAdminBillingDetails); // For Updating Admin's Billing Information Settings

adminRouter.put(
  "/applicant-settings",
  adminSettings.updateAdminApplicantDetails
); // For Updating Admin's Applicant Details Settings

adminRouter.put("/pref-settings", adminSettings.updateAdminEmailNotifDetails); // For Updating Admin's Email Notification Settings

adminRouter.put("/password", adminSettings.updateAdminPassword); // For Updating Admin's Password

//ADMIN_NOTIFICATIONS
adminRouter.get("/get-notifs", data.getAdminNotification); // Get Notifications for Admin

adminRouter.put("/seen-notif/:notifId", data.notificationAdminSeen); // Make the notification, a visited one

adminRouter.put("/delete-notif", data.notifcationsAdminDelete); // For deleting the Selected Notifications

adminRouter.get("/sort-notif/:days", data.sortAdminNotifications); // Sorting Notifications on the basis of Time Interval

adminRouter.get("/clear-notif", data.clearAdminRecentNotifs); // Clearing out the Recent Notifications
adminRouter.post("/find-partner", data.getPartnersData);

module.exports = adminRouter;
