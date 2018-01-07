'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Config = require('../config');
const LoginAttempts = new Schema({
    timestamp: { type: Date, default: Date.now },
    validAttempt: { type: Boolean, required: true },
    ipAddress: { type: String, required: true }
});
const Admins = new Schema({
    name: { type: String, trim: true, index: true, default: null, sparse: true },
    email: { type: String, trim: true, unique: true, index: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now, required: true },
    phoneNo: { type: String, required: true, trim: true, index: true, min: 5, max: 15, sparse: true },
    countryCode: { type: String, trim: true, min: 2, max: 5, sparse: true },
    timeZone: { type: String, trim: true, default: null },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    IsDeleted: { type: Boolean, default: false },
    accessToken: { type: String, trim: true, index: true, unique: true, sparse: true },
    userType: {
        type: String,
        enum: [
            Config.APP_CONSTANTS.USER_ROLES.ADMIN,
            Config.APP_CONSTANTS.USER_ROLES.USER
        ],
        default: Config.APP_CONSTANTS.USER_ROLES.ADMIN
    },
    loginAttempts: [LoginAttempts]
});

module.exports = mongoose.model('Admins', Admins);