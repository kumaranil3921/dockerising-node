'use strict';
require('dotenv').config()

const mongo = {
    URI: process.env.LOCAL_MONGO_URI || 'mongodb://mongo:27017/user-management' , //localhost
    port: 27017,
    user: '',
    pass: '',
    DBName: 'user-management',
};

module.exports = {
    mongo: mongo
};