'use strict';

const mongoose = require('mongoose');
const config = require('config');

const dbUser = process.env.MG_USER;
const dbPassword = process.env.MG_PASSWORD;
const dbHost = process.env.MG_HOST;
const dbName = process.env.MG_NAME;
const dbPort = process.env.MG_PORT;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const mongoUri = `mongodb://localhost:27017/countOfMoneydb`;

mongoose.connect(mongoUri, options)
    .then(() => { console.log('successfully connected to the database'); })
    .catch(err => { console.log(`error connecting to the database: ${err}`); });
