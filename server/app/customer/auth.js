const logger = require("../logger");
const users = require("../common/users");
const Customer = require("../models/customer"); // Import the Customer model

const type = "CUSTOMER";

const signUpCustomer = async (req, res) => {
  let session = null;
  try {
    session = await Customer.startSession();
    session.startTransaction();

    const customer = new Customer();
    const user = await users.create(req, session, type, customer._id);
    customer.userId = user._id;
    customer.prefillAuditInfo(req);
    customer.modifiedBy = user._id;
    await customer.save({ session });
    await session.commitTransaction();
    res.status(200).json({ id: user._id });
  } catch (error) {
    logger.error(req, "Error creating customer:", error);
    res.status(500).json({ error: error.message });
    session && (await session.abortTransaction());
  } finally {
    session && session.endSession();
  }
};

const signInCustomer = async (req, res) => {
  try {
    const user = await users.isValidUser(req, type);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = users.generateJwt(user, type);
    if (!token) return res.status(500).json({});

    res.status(200).json({ token });
  } catch (error) {
    logger.error(req, "Failed to sign in:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpCustomer,
  signInCustomer,
};
