'use strict';

const Services = require('../services');
const UniversalFunctions = require('../utilityFunctions/universalFunctions.js');
const Config = require('../config');
const TokenManager = require('../lib/tokenManager.js');
const async = require('async');

const adminLogin = function (userData, callback) {
    let tokenToSend = null;
    let responseToSend = {};
    let tokenData = null;
    let adminDBData;
    userData.email = userData.email.toLowerCase();
    async.series([
        function (cb) {
            const getCriteria = {
                email: userData.email,
                IsDeleted: false
            };
            Services.adminService.getAdmin(getCriteria, {}, {}, function (err, data) {
                if (err) {
                    return cb({ errorMessage: 'DB Error: ' + err })
                }
                if (data.length == 0) {
                    return cb(Config.APP_CONSTANTS.ERROR_MESSAGES.INVALID_EMAIL_PASSWORD);
                }
                const checkPassword = UniversalFunctions.compareCryptedDataHash(userData.password, data[0].password);
                if (!checkPassword) {
                    return cb(Config.APP_CONSTANTS.ERROR_MESSAGES.INVALID_EMAIL_PASSWORD);
                }
                adminDBData = data;
                tokenData = {
                    id: data[0]._id,
                    username: data[0].username,
                    type: Config.APP_CONSTANTS.USER_ROLES.ADMIN
                };
                return cb();
            });
        },
        function (cb) {
            const setCriteria = {
                email: userData.email
            };
            const setQuery = {
                $push: {
                    loginAttempts: {
                        validAttempt: (tokenData != null),
                        ipAddress: userData.ipAddress
                    }
                }
            };
            Services.adminService.updateAdmin(setCriteria, setQuery, function (err, data) {
                return cb(err, data);
            });
        },
        function (cb) {
            if (tokenData && tokenData.id) {
                TokenManager.setToken(tokenData, function (err, output) {
                    if (err) {
                        return cb(err);
                    }
                    tokenToSend = output && output.accessToken || null;
                    return cb();
                });
            } else {
                return cb()
            }
        }
    ], function (err, data) {
        if (err) {
            return callback(err);
        }
        responseToSend = {
            access_token: tokenToSend,
            ipAddress: userData.ipAddress,
            userType: adminDBData[0].userType,
        };
        return callback(null, responseToSend)
    });
}

const adminLogout = function (token, callback) {
    TokenManager.expireToken(token, function (err, data) {
        if (!err && data == 1) {
            callback(null, SUCCESS_MESSAGE.DEFAULT);
        } else {
            callback(ERROR_MESSAGE.TOKEN_ALREADY_EXPIRED)
        }
    })
};

module.exports = {
    adminLogin: adminLogin,
    adminLogout: adminLogout
}