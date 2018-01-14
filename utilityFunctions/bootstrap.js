
const Config = require('../config');
const Services = require('../services');
const async = require('async');
const mongoose = require('mongoose');
const universalFunctions = require('./universalFunctions.js');

// mongoose.connect(Config.DB_CONFIG.mongo.URI, {user: Config.DB_CONFIG.mongo.user, pass: Config.DB_CONFIG.mongo.pass}, function (err) {
mongoose.connect(Config.DB_CONFIG.mongo.URI, (err) => {
  if (err) {
    console.log('DB Error: ', err);
    process.exit(1);
  } else {
    console.log('MongoDB Connected');
  }
});
function insertData(email, datas, callback) {
  const adminData = datas;
  let needToCreate = true;
  async.series([function (cb) {
    const criteria = {
      email,
    };
    Services.adminService.getAdmin(criteria, {}, {}, (err, data) => {
      if (data && data.length > 0) {
        needToCreate = false;
      }
      cb();
    });
  }, function (cb) {
    if (needToCreate) {
      adminData.email = adminData.email.toLowerCase();
      adminData.password = universalFunctions.cryptDataHash(adminData.password);
      Services.adminService.createAdmin(adminData, (err, data) => {
        cb(err, data);
      });
    } else {
      cb();
    }
  }], (err, data) => {
    callback(err, data);
  });
}
exports.bootstrapAdmin = function (callback) {
  const adminData1 = {
    email: process.env.ADMIN_EMAIL || 'kumaranil3921@gmail.com',
    password: process.env.ADMIN_PASSWORD || '321321',
    name: process.env.ADMIN_NAME || 'Anil Kumar',
    phoneNo: process.env.ADMIN_PHONE || '9878768982',
    countryCode: process.env.ADMIN_PHONE_COUNTRY_CODE || '+91',
  };
  insertData(adminData1.email, adminData1, (err, res) => {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  });
};
