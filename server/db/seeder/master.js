const bcrypt = require("bcrypt");

const logger = require("../../app/logger");
const User = require("../../app/models/user");
const Organization = require("../../app/models/organization");

exports.organization = async function () {
  try {
    let org = await Organization.findOne({ code: 'CLOUD' }).lean();
    if (org) return global.rootOrg = org;

    const organization = new Organization({
      code: 'CLOUD',
      name: 'Cloud',
    });
    organization.orgId = organization._id;
    organization.modifiedBy = organization._id;
    organization.modifiedAt = Date.now();
    organization.statusFlag = 'A';
    await organization.save();
    org = organization.toJSON();
    logger.info('Root Org was created successfully...!');
    global.rootOrg = org;
  } catch (e) {
    console.error('', e);
  }
}

exports.adminUser = async function () {
  if (!global.rootOrg) return;
  try {
    const old = await User.findOne({
      type: 'ADMIN',
      orgId: global.rootOrg._id
    }).lean();
    if (old) return;

    const user = new User();
    user.type = 'ADMIN';
    user.email = 'admin@humcen.com';
    user.firstName = 'Humcen';
    user.lastName = 'Admin';
    user.password = await bcrypt.hash('abc123', 11);
    user.orgId = global.rootOrg._id;
    user.modifiedBy = user._id;
    user.modifiedAt = Date.now();
    user.statusFlag = 'A';
    logger.info('Admin was created successfully...!');
    await user.save();
  } catch (e) {
    console.error('', e);
  }
}