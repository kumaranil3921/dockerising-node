'use strict';

const Config = require('../config');
const Jwt = require('jsonwebtoken');
const async = require('async');
const Service = require('../services');


const setTokenInDB = function (userId, userType, tokenToSave, callback) {
    const criteria = {
        _id: userId
    };
    const setQuery = {
        accessToken: tokenToSave
    };
    //console.log("userType",userType);
    async.series([
        function (cb) {
            if (userType == Config.APP_CONSTANTS.USER_ROLES.ADMIN) {
                Service.adminService.updateAdmin(criteria, setQuery, { new: true }, function (err, dataAry) {
                    if (err) {
                        cb(err)
                    } else {
                        if (dataAry && dataAry._id) {
                            cb();
                        } else {
                            cb(Config.APP_CONSTANTS.ERROR_MESSAGES.IMP_ERROR)
                        }
                    }

                });
            } else {
                cb(Config.APP_CONSTANTS.ERROR_MESSAGES.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err) return callback(err)
        return callback()
    });
};

const expireTokenInDB = function (userId, userType, callback) {
    const criteria = {
        _id: userId
    };
    const setQuery = {
        accessToken: null
    };
    async.series([
        function (cb) {
            if (userType == Config.APP_CONSTANTS.USER_ROLES.ADMIN) {
                Service.adminService.updateAdmin(criteria, setQuery, { new: true }, function (err, dataAry) {
                    if (err) {
                        callback(err)
                    } else {
                        if (dataAry && dataAry.length > 0) {
                            cb();
                        } else {
                            callback(Config.APP_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN)
                        }
                    }

                });
            } else {
                cb(Config.APP_CONSTANTS.ERROR_MESSAGES.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err) {
            callback(err)
        } else {
            callback()
        }

    });
};


const verifyToken = function (token, callback) {
    const response = {
        valid: false
    };
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        console.log('jwt err', err, decoded)
        if (err) {
            callback(err)
        } else {
            //getTokenFromDB(decoded.id, decoded.type, token, callback);
        }
    });
};

const setToken = function (tokenData, callback) {
    if (!tokenData.id || !tokenData.type) {
        callback(Config.APP_CONSTANTS.ERROR_MESSAGES.IMP_ERROR);
    } else {
        const tokenToSend = Jwt.sign(tokenData, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY);
        setTokenInDB(tokenData.id, tokenData.type, tokenToSend, function (err, data) {
            callback(err, { accessToken: tokenToSend })
        })
    }
};

const expireToken = function (token, callback) {
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            callback(Config.APP_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN);
        } else {
            expireTokenInDB(decoded.id, decoded.type, function (err, data) {
                callback(err, data)
            });
        }
    });
};

const decodeToken = function (token, callback) {
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decodedData) {
        if (err) {
            callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN);
        } else {
            callback(null, decodedData)
        }
    })
};

module.exports = {
    expireToken: expireToken,
    setToken: setToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken
};