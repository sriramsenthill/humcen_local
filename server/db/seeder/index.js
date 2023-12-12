const master = require("./master");

module.exports = async function () {
  await master.organization();
  await master.adminUser();
}
