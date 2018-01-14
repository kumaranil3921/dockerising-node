
const Models = require('../models');
const Config = require('../config/appConstants.js');

const getAdmin = function (criteria, projection, options, callback) {
  Models.Admins.find(criteria, projection, options, (err, result) => {
    if (err) {
      if (err.name === 'CastError') {
        return callback('Invalid Admin ID');
      }
      return callback(err);
    }
    return callback(null, result);
  });
};

const createAdmin = function (objToSave, callback) {
  new Models.Admins(objToSave).save((err, data) => {
    if (err) {
      if (err.code === 11000 && err.message.indexOf('phoneNo_1') > -1) {
        return callback(Config.ERROR_MESSAGES.PHONE_ALREADY_EXIST);
      }
      if (err.code === 11000 && err.message.indexOf('email_1') > -1) {
        return callback(Config.ERROR_MESSAGES.EMAIL_ALREADY_EXIST);
      }
      return callback(err);
    }
    return callback(null, data);
  });
};
// Update User in DB
const updateAdmin = function (criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Admins.findOneAndUpdate(criteria, dataToSet, options, (err, data) => {
    if (err) {
      if (err.name === 'CastError') {
        return callback(Config.ERROR_MESSAGES.APP_ERROR);
      }
      if (err.code === 11000 && err.message.indexOf('phoneNo_1') > -1) {
        return callback(Config.ERROR_MESSAGES.INVALID_ADMIN_ID);
      }
      if (err.code === 11000 && err.message.indexOf('email_1') > -1) {
        return callback(Config.ERROR_MESSAGES.EMAIL_ALREADY_EXIST);
      }
      return callback(err);
    }

    return callback(null, data);
  });
};

module.exports = {
  getAdmin,
  createAdmin,
  updateAdmin,
};
