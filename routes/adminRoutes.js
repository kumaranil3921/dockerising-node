'use strict';

const Controller = require('../controllers');
const UniversalFunctions = require('../utilityFunctions/universalFunctions.js');
const Config = require('../config')
const Joi = require('joi');
const adminlogin = {
    method: 'POST',
    path: '/api/admin/login',
    handler: function (request, reply) {
        const payloadData = {
            email: request.payload.email,
            password: request.payload.password,
            ipAddress: request.info.remoteAddress || null
        };
        Controller.AdminController.adminLogin(payloadData, function (err, data) {
            if (err) {
                reply(UniversalFunctions.sendError(err))
            } else {
                reply(UniversalFunctions.sendSuccess(null, data))
            }
        })
    },
    config: {
        description: 'Login for Super Admin',
        tags: [
            'api',
            'admin'
        ],
        //auth : 'AdminAuth',
        validate: {
            failAction: UniversalFunctions.failActionFunction,
            payload: {
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string()
                    .required()
            }
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: Config.APP_CONSTANTS.SWAGGER_DEFAULT_RESPONSE_MESSAGES
            }
        }
    }
}

module.exports = [
    adminlogin
]