module.exports = {
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1/humcen_db',
  jwtCustomer: process.env.JWT_CUSTOMER || 'a3f3c0ff32404f272d7b91350bdd4676208e002c4d25fdd89f',
  jwtPartner: process.env.JWT_PARTNER || '82971a013b8e42866eef34d4bcf33dd61677aca234f8127a64',
  jwtAdmin: process.env.JWT_ADMIN || '01a6d37333a86009182f24e08a09c17e7250e5619df8c15203',
}

// const crypto = require('crypto');
// console.log('Random Key:', crypto.randomBytes(25).toString('hex'));