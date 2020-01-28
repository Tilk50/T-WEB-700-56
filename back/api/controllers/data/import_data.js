'use strict';
const mongoose = require('mongoose');
const rp = require('request-promise');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('Crypto', cryptoSchema);
const config = require('../../config/default');

const importData = function (req, res, next) {
    /**
     * Function to get data from the api
     */
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
            'start': '1',
            'limit': '1',
            'convert': 'EUR,BTC'
        },
        headers: {
            'X-CMC_PRO_API_KEY': config.cointMarketKey
        },
        json: true,
        gzip: true
    };
};

module.exports = importData;
