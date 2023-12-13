const express = require("express");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const engine = require("../partner/engine");
const partnerSetttings = require("../partner/settings");
const partnerProfile = require("../partner/partnerProfile");
const partnerRouter = express.Router();

partnerRouter.use(function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({});
  }

  try {
    const decodedUser = jwt.verify(token, config.jwtPartner);
    req.user = decodedUser;
    req.userId = decodedUser._id;
    req.orgId = decodedUser.orgId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Session Expired" });
  }
});

partnerRouter.get("/getLogInPartner", partnerProfile.getLogInPartner);

//Partner_Settings
partnerRouter.get("/img", partnerSetttings.fetchPartnerProfileImage);
partnerRouter.get("/settings", partnerSetttings.fetchPartnerSettings);
partnerRouter.get("/settingsProfile", partnerSetttings.fetchPartnerProfileSettings);
partnerRouter.get("/fields", partnerSetttings.fetchPartnerKnownFields);
partnerRouter.put("/settings", partnerSetttings.updatePartnerSettings);
partnerRouter.put("/settingsProfile", partnerSetttings.updatePartnerProfileSettings);
partnerRouter.put("/bank-settings", partnerSetttings.updatePartnerBankDetails);
partnerRouter.put("/pref-settings", partnerSetttings.updatePartnerPrefSettings);
partnerRouter.put("/service-settings", partnerSetttings.editPartnerServices);
partnerRouter.put("/password", partnerSetttings.updatePartnerPassword);

//Partner_engine

partnerRouter.get("/jobs/:id", engine.getPartnerJobsById);
partnerRouter.get("/job_order", engine.getPartnerJobOrders);
partnerRouter.put("/accept/:jobId", engine.acceptJobOrder);
partnerRouter.put("/uploaded", engine.updateTimelineForUpload);
partnerRouter.delete("/reject/:service/:country/:jobId", engine.rejectJobOrder);
partnerRouter.get("/jobOrder/:services/:id", engine.getFilesForPartners);
// partnerRouter.get("api/:services/:jobID", engine.getJobDetailsForPartners);
partnerRouter.get(
  "/partnerDetails/:services/:id",
  engine.findPartnersWithJobNo
);
partnerRouter.put("/job-files", engine.addJobFiles);
partnerRouter.get(
  "/job_files_details/:jobID",
  engine.getJobFilesDetailsForPartners
);
partnerRouter.get("/get-bulk-order-file/:id", engine.getAssignedBulkOrderFile);
partnerRouter.put("/idleJob/:partner", engine.sendIdleJobToUnassigned);

// Partner Notifications
partnerRouter.get("/get-notifs/:userID", engine.getPartnerNotification); // Get Notifications for Customer
partnerRouter.put(
  "/seen-notif/:notifId/:userID",
  engine.notificationPartnerSeen
); // Make the notification, a visited one
partnerRouter.put("/delete-notif/:userID", engine.notifcationsPartnerDelete); // For deleting the Selected Notifications
partnerRouter.get("/sort-notif/:userID/:days", engine.sortPartnerNotifications); // Sorting Notifications on the basis of Time Interval
partnerRouter.get("/clear-notif/:userID", engine.clearRecentPartnerNotifs); // Clearing out the Recent Notifications

module.exports = partnerRouter;
