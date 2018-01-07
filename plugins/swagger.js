const hapiSwagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');

exports.register = (server, options, next) => {

    server.register([
        inert,
        vision,
        {
            'register': hapiSwagger,
            'options': {
                'info': {
                    'title': 'User Management api documentation'
                },
                'pathPrefixSize': 2

            }
        }], (err) => {
            if (err) {
                console.log('hapi-swagger load error: ${err}')
            } else {
                console.log('hapi-swagger interface loaded')
            }
        });
    next();
};
exports.register.attributes = {
    name: 'swagger-plugin'
};