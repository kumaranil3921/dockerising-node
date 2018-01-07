'use strict';
require('dotenv').config()

const APP_CONSTANTS =
    {
        SWAGGER_DEFAULT_RESPONSE_MESSAGES: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 401, message: 'Unauthorized' },
            { code: 404, message: 'Data Not Found' },
            { code: 500, message: 'Internal Server Error' }
        ],
        SERVER: {
            APP_NAME: "user-management",
            PORT: process.env.PORT || 3001,
            PLUGINS_LOADING_ERROR: "Error while loading plugins",
            PLUGINS_LOADING_SUCCESS: "Plugins Loaded Successfully",
            BOOTSTRAP_ERROR: "Error while bootstrapping",
            BOOTSTRAP_SUCCESS: "Bootstrapping Finished Successfully",
            JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'SET_YOUR_SECRET_KEY'
        },
        USER_ROLES: {
            ADMIN: "admin",
            USER: "user"
        },
        ERROR_MESSAGES: {
            INVALID_ADMIN_ID: {
                statusCode: 400,
                customMessage: 'Invalid admin id.',
                type: 'INVALID_ADMIN_ID'
            },
            EMAIL_ALREADY_EXIST: {
                statusCode: 400,
                customMessage: 'Email address already exists',
                type: 'EMAIL_ALREADY_EXIST'
            },
            PHONE_ALREADY_EXIST: {
                statusCode: 400,
                customMessage: 'Email address already exists',
                type: 'EMAIL_ALREADY_EXIST'
            },
            INVALID_EMAIL_PASSWORD: {
                statusCode: 400,
                customMessage: 'Invalid email/phone or password',
                type: 'INVALID_EMAIL_PASSWORD'
            },
            IMP_ERROR: {
                statusCode: 500,
                customMessage: 'Implementation Error',
                type: 'IMP_ERROR'
            },
            INVALID_TOKEN: {
                statusCode: 401,
                customMessage: 'Invalid token provided',
                type: 'INVALID_TOKEN'
            },
            DB_ERROR: {
                statusCode: 400,
                customMessage: 'DB Error.',
                type: 'DB_ERROR'
            },
            DUPLICATE: {
                statusCode: 400,
                customMessage: 'Duplicate entry',
                type: 'DUPLICATE'
            },
            DUPLICATE_ADDRESS: {
                statusCode: 400,
                customMessage: 'Address already exist',
                type: 'DUPLICATE_ADDRESS'
            },
            APP_ERROR: {
                statusCode: 400,
                customMessage: 'Application Error',
                type: 'APP_ERROR'
            },
            INVALID_ID: {
                statusCode: 400,
                customMessage: 'Invalid Id Provided.',
                type: 'INVALID_ID'
            },
        },
        SUCCESS_MESSAGES: {
            CREATED: {
                statusCode: 201,
                customMessage: 'Created Successfully',
                type: 'CREATED'
            },
            REGISTERED: {
                statusCode: 201,
                customMessage: 'Registered Successfully',
                type: 'REGISTERED'
            },
            LOGIN: {
                statusCode: 201,
                customMessage: 'Login Successfully',
                type: 'REGISTERED'
            },
            DEFAULT: {
                statusCode: 200,
                customMessage: 'Success',
                type: 'DEFAULT'
            },
            UPDATED: {
                statusCode: 200,
                customMessage: 'Updated Successfully',
                type: 'UPDATED'
            },
            LOGOUT: {
                statusCode: 200,
                customMessage: 'Logged Out Successfully',
                type: 'LOGOUT'
            },
            DELETED: {
                statusCode: 200,
                customMessage: 'Deleted Successfully',
                type: 'DELETED'
            },
            ADDRESS_DELETED: {
                statusCode: 200,
                customMessage: 'Address Deleted Successfully',
                type: 'DELETED'
            },
            PASSWORD_UPDATED: {
                statusCode: 200,
                customMessage: 'Password Updated Successfully',
                type: 'UPDATED'
            },
            PASSWORD_RESET_SUCCESS: {
                statusCode: 200,
                customMessage: 'Your Password has been Reset',
                type: 'UPDATED'
            },
        }

    };

module.exports = APP_CONSTANTS;