const servList = require("../../Works");
const mongoose = require('mongoose');
const emailPref = require('../models/emailPrefrences');
const Partner = require("../models/partner"); // Import the Partner model
const bcrypt = require("bcrypt"); // Import the bcrypt library
const User = require("../models/user");
const fetchPartnerProfileImage = async (req, res) => {
  const userID = req.userId;

  try {
    // Find the partner with the given userID
    const partner = await Partner.findOne({ userId: userID  });
    res.json(partner.profile_img);
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const fetchPartnerProfileSettings = async (req, res) => {
  const userID = req.userId;
  try {
    // Find the partner with the given userID
    const user = await User.findOne({ _id: userID });
    const partner = await Partner.findOne({ userId: userID  });
    const data ={
      userID: userID,
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      applicantType: partner.applicantType,
      businessName: partner.businessName,
      companyId: partner.companyId,
      vatPayer: partner.vatPayer,
      phno: user.phno,
      position: partner.position
    }
    res.json(data);
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchPartnerSettings = async (req, res) => {
  const userID = req.userId;
  try {
    const partner = await Partner.findOne({ userId: userID  });
    res.json(partner);
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchPartnerKnownFields = async (req, res) => {
  const userID = req.userId;
  try {
    // Find the partner with the given userID
    const partner = await Partner.findOne({ userId: userID  });
    res.json(partner.known_fields);

  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePartnerSettings = async (req, res) => {
  const userID = req.userId;
  const partner = await Partner.findOne({ userId: userID  });
  partner.applicantType = req.body.data.applicantType;
  partner.businessName = req.body.data.businessName;
  partner.companyId = req.body.data.companyId;
  partner.vatPayer = req.body.data.vatPayer;
  partner.firstName = req.body.data.firstName;
  partner.lastName = req.body.data.lastName;
  partner.email = req.body.data.email;
  partner.phno = req.body.data.phone;
  partner.position = req.body.data.position;
  partner.street = req.body.data.street;
  partner.town = req.body.data.town;
  partner.postCode = req.body.data.postCode;
  partner.country = req.body.data.country;
  partner
    .save()
    .then((res) => console.log("Successfully Updated"))
    .catch((error) =>
      console.error("Error in updating Profile Settings: ", error)
    );
};

const updatePartnerBankDetails = async (req, res) => {
  const userID = req.userId;
  const partner = await Partner.findOne({ userId: userID  });
  partner.bank.bankName = req.body.data.bankName;
  partner.bank.accountNum = req.body.data.accountNum;
  partner.bank.accountName = req.body.data.accountName;
  partner.bank.branch = req.body.data.branch;
  partner.bank.ifscCode = req.body.data.ifscCode;
  partner.bank.address = req.body.data.address;
  partner.bank.town = req.body.data.town;
  partner.bank.postCode = req.body.data.postCode;
  partner.bank.country = req.body.data.country;
  partner
    .save()
    .then((res) => console.log("Bank Details Successfully Updated"))
    .catch((error) =>
      console.error("Error in updating Profile Settings: ", error)
    );
};

const updatePartnerPrefSettings = async (req, res) => {
  const userID = req.userId;
  const partner = await Partner.findOne({ userId: userID  });
  const EmailPref = mongoose.model('EmailPref', emailPref);
  const newEmailPref = new EmailPref({
    mails: req.body.data.mails,
    orderUpdates: req.body.data.orderUpdates,
    marketingEmails: req.body.data.marketingEmails,
    newsletter: req.body.data.newsletter,
  });
  partner.emailPreference = newEmailPref;
  console.log(partner);
  partner
    .save()
    .then((res) => console.log("Partner's Preferentials Successfully Updated"))
    .catch((error) =>
      console.error(
        "Error in updating Partner's Preferential Profile Settings: ",
        error
      )
    );
};

const editPartnerServices = async (req, res) => {
  const serviceList = servList.map(elem => elem.title);
  const userID = req.userId;
  const partner = await Partner.findOne({ userId: userID  });
  req.body.data.known_fields.forEach((field) => {
    partner.known_fields[field] = true;
  });
  const remService = serviceList.filter((elem) => !req.body.data.known_fields.includes(elem));
  remService.forEach((service) => {
    partner.known_fields[service] = false;
  });
  partner
    .save()
    .then((res) => console.log("Partner's Service Settings Successfully Updated"))
    .catch((error) =>
      console.error(
        "Error in updating Partner's Service Settings: ",
        error
      )
    );
}

const updatePartnerPassword = async (req, res) => {
  const userID = req.userId;
  const partner = await Partner.findOne({ userId: userID  }); 
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating/updating Partner");
    }

    bcrypt.hash(req.body.data.password, salt, async (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error creating/updating Partner");
      }

      partner.password = hashedPassword;
      partner
        .save()
        .then((res) =>
          console.log("Successfully Updated the Partner's Password")
        )
        .catch((error) =>
          console.error("Error in updating Partner's Password: ", error)
        );
    });
  });
};

const updatePartnerProfileSettings = async (req, res) => {
  try {
    const userID = req.userId;
    const partner = await Partner.findOne({ userId: userID  });
    const user = await User.findOne({ _id: userID });
    user.firstName = req.body.data.firstName;
    user.email = req.body.data.email;
    user.lastName = req.body.data.lastName;
    partner.applicantType = req.body.data.applicantType;
    partner.businessName = req.body.data.businessName;
    partner.companyId = req.body.data.companyID;
    partner.vatPayer = req.body.data.vatPayer;
    user.phno = req.body.data.phone;
    partner.position = req.body.data.position;
    await Promise.all([user.save(), partner.save()]);
    console.log('User and Partner saved successfully');
  } catch (error) {
    console.error("Error in saving user and partner: ", error);
  }
}
module.exports = {
  fetchPartnerProfileImage,
  fetchPartnerSettings,
  fetchPartnerKnownFields,
  updatePartnerSettings,
  updatePartnerBankDetails,
  updatePartnerPrefSettings,
  updatePartnerPassword,
  editPartnerServices,
  fetchPartnerProfileSettings,
  updatePartnerProfileSettings
};