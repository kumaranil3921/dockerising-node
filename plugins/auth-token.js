'use strict';
/**
 * Created by shahab on 12/7/15.
 */

const TokenManager = require('../Lib/TokenManager');
const UniversalFunctions = require('../Utils/UniversalFunctions');

exports.register = function (server, options, next) {

    //Register Authorization Plugin
    server.register(require('hapi-auth-bearer-token'), function (err) {
        server.auth.strategy('AdminAuth', 'bearer-access-token', {
            allowQueryToken: false,
            allowMultipleHeaders: true,
            accessTokenName: 'accessToken',
            validateFunc: function (token, callback) {
                TokenManager.verifyAdminToken(token, function (err, response) {
                    if (err || !response || !response.userData) {
                        callback(null, false, { token: token, userData: null })
                    } else {
                        callback(null, true, { token: token, userData: response.userData })
                    }
                });
            }
        });
    });
    next();
};

exports.register.attributes = {
    name: 'auth-token-plugin'
};