'use strict';
const mongoose = require('mongoose');
const priceSchema = require('../../schemas/PriceSchema');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Price = new mongoose.model('price', priceSchema);
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const getForChart = function (req, res, next) {
    //console.log('here in function', req.params);
    // Get the crypto
    Crypto.findById(req.params.id, function (err, crypto) {
        //console.log('crypto', crypto);
        if (err) return next(boom.internal(err));
        // Get the price list from the crypto
        let listPrice = crypto.history;
        getPrices(listPrice).then((finalList) => {
            let mappedList = finalList.map(elem => {
                return(
                    {
                        date: elem.update_date,
                        value: elem.price
                    }
                );
            });
           res.json({list: mappedList});
        });
    });
};
const getPrices = function(listPrice) {
    return new Promise((resolve, rejected) => {
        let response = [];
        listPrice.forEach((priceId) => {
            response.push(Price.findById(priceId, function (err, price) {
                if (err) resolve(boom.internal(err));
            }).exec())
        });
        let responses = Promise.all(response);
        resolve(responses);
    });
}

module.exports = getForChart;
