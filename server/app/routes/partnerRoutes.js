const express = require("express");
const jwt = require('jsonwebtoken');

const logger = require("../logger");
const config = require("../../config");

const partnerRouter = express.Router();

partnerRouter.use(function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({});
  }

  try {
    const decodedUser = jwt.verify(token, config.jwtPartner);
    req.user = decodedUser;
    req.userID = decodedUser._id;
    next();
  } catch (error) {
    logger.error('Failed to partner verify token:', error);
    return res.status(401).json({});
  }
});

partnerRouter.get("/verify-token", (req, res) => {
  res.status(200).json({ user: req.user });
});

//Partner_Settings
const partnerSetttings = require("../partner/settings");
partnerRouter.get("/img", partnerSetttings.fetchPartnerProfileImage);
partnerRouter.get("/settings", partnerSetttings.fetchPartnerSettings);
partnerRouter.get("/fields", partnerSetttings.fetchPartnerKnownFields);
partnerRouter.put("/settings", partnerSetttings.updatePartnerSettings);
partnerRouter.put("/bank-settings", partnerSetttings.updatePartnerBankDetails);
partnerRouter.put("/pref-settings", partnerSetttings.updatePartnerPrefSettings);
partnerRouter.put("/service-settings", partnerSetttings.editPartnerServices);
partnerRouter.put("/password", partnerSetttings.updatePartnerPassword);

//Partner_engine
const engine = require("../partner/engine");
partnerRouter.get("/jobs/:id", engine.getPartnerJobsById);
partnerRouter.get("/job_order", engine.getPartnerJobOrders);
partnerRouter.put("/accept/:jobId", engine.acceptJobOrder);
partnerRouter.put("/uploaded", engine.updateTimelineForUpload);

partnerRouter.delete("/reject/:service/:country/:jobId", engine.rejectJobOrder);
partnerRouter.get("/jobOrder/:services/:id", engine.getFilesForPartners);
// partnerRouter.get("api/:services/:jobID", engine.getJobDetailsForPartners);
partnerRouter.get("/partnerDetails/:services/:id", engine.findPartnersWithJobNo);
partnerRouter.put("/job-files", engine.addJobFiles);
partnerRouter.get("/job_files_details/:jobID", engine.getJobFilesDetailsForPartners);
partnerRouter.get("/get-bulk-order-file/:id", engine.getAssignedBulkOrderFile);
partnerRouter.put("/idleJob/:partner", engine.sendIdleJobToUnassigned);

// Partner Notifications
partnerRouter.get("/get-notifs/:userID", engine.getPartnerNotification) // Get Notifications for Customer
partnerRouter.put("/seen-notif/:notifId/:userID", engine.notificationPartnerSeen); // Make the notification, a visited one
partnerRouter.put("/delete-notif/:userID", engine.notifcationsPartnerDelete); // For deleting the Selected Notifications
partnerRouter.get("/sort-notif/:userID/:days", engine.sortPartnerNotifications); // Sorting Notifications on the basis of Time Interval
partnerRouter.get("/clear-notif/:userID", engine.clearRecentPartnerNotifs); // Clearing out the Recent Notifications

module.exports = partnerRouter;