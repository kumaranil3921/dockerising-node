const TokenManager = require('../lib/tokenManager');
const hapiAuth = require('hapi-auth-bearer-token');

exports.register = function (server, options, next) {
  // Register Authorization Plugin
  server.register(hapiAuth, () => {
    server.auth.strategy('AdminAuth', 'bearer-access-token', {
      allowQueryToken: false,
      allowMultipleHeaders: true,
      accessTokenName: 'accessToken',
      validateFunc(token, callback) {
        TokenManager.verifyAdminToken(token, (err, response) => {
          if (err || !response || !response.userData) {
            callback(null, false, { token, userData: null });
          } else {
            callback(null, true, { token, userData: response.userData });
          }
        });
      },
    });
  });
  next();
};

exports.register.attributes = {
  name: 'auth-token-plugin',
};
