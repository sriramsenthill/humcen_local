const logger = require("../logger");
const users = require("../common/users");

const type = "ADMIN";

const signInAdmin = async (req, res) => {
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
  signInAdmin,
};
