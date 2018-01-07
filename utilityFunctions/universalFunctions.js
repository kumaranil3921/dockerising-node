'use strict';

const Boom = require('boom');
const CONFIG = require('../config');
const Models = require('../models');
const bcrypt = require('bcrypt');
const cryptDataHash = function (stringToCrypt) {
    const hash = bcrypt.hashSync(stringToCrypt, 10);
    return hash;
};

const compareCryptedDataHash = function (stringToCompare, CryptedString) {
    const res = bcrypt.compareSync(stringToCompare, CryptedString);
    return res;
};
const sendError = function (data) {

    if (typeof data == 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
        let errorToSend = Boom.create(data.statusCode, data.customMessage);
        errorToSend.output.payload.responseType = data.type;
        return errorToSend;
    } else { 
        const errorToSend = '';
        if (typeof data == 'object') {
            if (data.name == 'MongoError') {
                errorToSend += CONFIG.APP_CONSTANTS.ERROR_MESSAGES.DB_ERROR.customMessage;
                if (data.code == 11000) {
                    let duplicateValue = data.errmsg && data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
                    duplicateValue = duplicateValue.replace('}', '');
                    errorToSend += CONFIG.APP_CONSTANTS.ERROR_MESSAGES.DUPLICATE.customMessage + " : " + duplicateValue;
                    if (data.message.indexOf('customer_1_streetAddress_1_city_1_state_1_country_1_zip_1') > - 1) {
                        errorToSend = CONFIG.APP_CONSTANTS.ERROR_MESSAGES.DUPLICATE_ADDRESS.customMessage;
                    }
                }
            } else if (data.name == 'ApplicationError') {
                errorToSend += CONFIG.APP_CONSTANTS.ERROR_MESSAGES.APP_ERROR.customMessage + ' : ';
            } else if (data.name == 'ValidationError') {
                errorToSend += CONFIG.APP_CONSTANTS.ERROR_MESSAGES.APP_ERROR.customMessage + data.message;
            } else if (data.name == 'CastError') {
                errorToSend += CONFIG.APP_CONSTANTS.ERROR_MESSAGES.DB_ERROR.customMessage + CONFIG.APP_CONSTANTS.ERROR_MESSAGES.INVALID_ID.customMessage + data.value;
            }
        } else {
            errorToSend = data
        }
        let customErrorMessage = errorToSend;
        if (typeof customErrorMessage == 'string') {
            if (errorToSend.indexOf("[") > - 1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            }
            customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
        }
        return Boom.create(400, customErrorMessage)
    }
};

const sendSuccess = function (successMsg, data) {
    successMsg = successMsg || CONFIG.APP_CONSTANTS.SUCCESS_MESSAGES.DEFAULT.customMessage;
    if (typeof successMsg == 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
        return {
            statusCode: successMsg.statusCode,
            message: successMsg.customMessage,
            data: data || null
        };

    } else {
        return {
            statusCode: 200,
            message: successMsg,
            data: data || null
        };

    }
};
const failActionFunction = function ( request , reply , source , error )
	{
		let customErrorMessage = '';
		if ( error.output.payload.message.indexOf( "[" ) > - 1 )
			{
				customErrorMessage = error.output.payload.message.substr( error.output.payload.message.indexOf( "[" ) );
			} else
			{
				customErrorMessage = error.output.payload.message;
			}
		customErrorMessage           = customErrorMessage.replace( /"/g , '' );
		customErrorMessage           = customErrorMessage.replace( '[' , '' );
		customErrorMessage           = customErrorMessage.replace( ']' , '' );
		error.output.payload.message = customErrorMessage;
		delete error.output.payload.validation
		return reply( error );
	};




module.exports = {
    cryptDataHash: cryptDataHash,
    compareCryptedDataHash: compareCryptedDataHash,
    sendError: sendError,
    sendSuccess: sendSuccess,
    failActionFunction: failActionFunction
};