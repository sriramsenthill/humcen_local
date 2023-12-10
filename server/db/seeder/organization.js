const Organization = require("../../app/models/organization");

module.exports = async function () {
  try {
    const organization = new Organization({
      code: 'CLOUD',
      name: 'Cloud',
    });
    organization.orgId = organization._id;
    organization.modifiedBy = organization._id;
    organization.modifiedAt = Date.now();
    organization.statusFlag = 'A';
    await organization.save();
    return organization;
  } catch (e) {
    console.error('', e);
  }
}