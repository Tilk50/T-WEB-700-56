'use strict';
const mongoose = require('mongoose');
const rp = require('request-promise');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const priceSchema = require('../../schemas/PriceSchema');
const Price = new mongoose.model('price', priceSchema);
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
            'limit': '3',
            'convert': 'EUR'
        },
        headers: {
            'X-CMC_PRO_API_KEY': config.cointMarketKey
        },
        json: true,
        gzip: true
    };

    // Call the coins Market Api
    rp(requestOptions).then(response => {
        let cryptoList = response.data;
        cryptoList.forEach(element => {
            Crypto.findOne({coinMarketId: element.id}, function (err, crypto) {
                // Test if the crypto isn't already in the database
                if (crypto == null) {
                   createCrypto(element);
               } else {
                   updateCrypto(element, crypto);
               }
            });
        });
        res.json({
            status: "success",
            message: "Data updated"
        })
    });
};

const createCrypto = function (element) {
    Price.create({
        price: element.quote.EUR.price
    }, function (err, price) {
        Crypto.create({
            coinMarketId: element.id,
            name: element.name,
            symbol: element.symbol,
            max_supply: element.max_supply,
            price: element.quote.EUR.price,
            last_update: element.last_update,
            percent_change_1H: element.quote.EUR.percent_change_1h,
            percent_change_24H: element.quote.EUR.percent_change_24h,
            percent_change_7D: element.quote.EUR.percent_change_7d,
            market_cap: element.quote.EUR.market_cap,
            history: [
                price._id
            ]
        });
    });
};

const updateCrypto = function (element, crypto) {
  Price.create({
      price: element.quote.EUR.price
  }, function (err, price) {
      // Update datas for crypto
      crypto.price = element.quote.EUR.price;
      crypto.last_update = element.last_update;
      crypto.percent_change_1H = element.quote.EUR.percent_change_1h;
      crypto.percent_change_24H = element.quote.EUR.percent_change_24h;
      crypto.percent_change_7D = element.quote.EUR.percent_change_7d;
      crypto.market_cap = element.quote.EUR.market_cap;
      crypto.history.push(price._id);
      crypto.save();
  });
};

module.exports = importData;
