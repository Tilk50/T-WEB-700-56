'use strict';

const mongoose = require('mongoose');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const list = function (req, res, next) {
    var totalRow = 0;
    let filter = buildFilter(JSON.parse(req.query.filter));
    // This query is used to get the
    Crypto.find(
        filter
    ).exec(function (err, result) {
        if (err) return next(boom.internal("no data aviable"));
        totalRow = result.length;

        // This query is used to get
        Crypto
          .find(
            filter
          )
          .limit(parseInt(req.query.rowsRequest))
          .sort([[req.query.sortBy, parseInt(req.query.desc)]])
          .skip(parseInt(req.query.startRow))
          .exec(function(err, result) {
              if (err) return next(boom.internal("no data aviable"));
              // Return data
              res.json({list: result, totalRow: totalRow});
          });
    });
};

function buildFilter(queryFilter) {
    let filter = {};

    // Filter on the crypto name
    if(typeof queryFilter.name !== 'undefined' && queryFilter.name !== '') {
      filter.name = new RegExp(queryFilter.name, 'i');
    }

    // Filter on the crypto symbol
    if (typeof queryFilter.symbol !== 'undefined' && queryFilter.symbol !== '') {
      filter.symbol = new RegExp(queryFilter.symbol, 'i');
    }

    // Filter if we have to show all crypto or no
    if (typeof queryFilter.show_in_list !== "undefined" && queryFilter.show_in_list) {
        filter.show_in_list = true;
    }

    // Filter on the percent_change_1h
    if (typeof queryFilter.percent_change_1H !== "undefined" && queryFilter.percent_change_1H !== '') {
        switch (queryFilter.percent_change_1H) {
            case 'down':
                filter.percent_change_1H = {$lt: -1.0};
                break;
            case 'flat':
                filter.percent_change_1H = {$gte: -1.0, $lte: 1.0 };
                break;
            case 'up':
                filter.percent_change_1H = {$gt: 1.0};
                break;
        }
    }

    // Filter on the percent_change_24h
    if (typeof queryFilter.percent_change_24H !== "undefined" && queryFilter.percent_change_24H !== '') {
        switch (queryFilter.percent_change_24H) {
            case 'down':
                filter.percent_change_24H = {$lt: -1.0};
                break;
            case 'flat':
                filter.percent_change_24H = {$gte: -1.0, $lte: 1.0 };
                break;
            case 'up':
                filter.percent_change_24H = {$gt: 1.0};
                break;
        }
    }

    // Filter on the percent_change_7D
    if (typeof queryFilter.percent_change_7D !== "undefined" && queryFilter.percent_change_7D !== '') {
        switch (queryFilter.percent_change_7D) {
            case 'down':
                filter.percent_change_7D = {$lt: -1.0};
                break;
            case 'flat':
                filter.percent_change_7D = {$gte: -1.0, $lte: 1.0 };
                break;
            case 'up':
                filter.percent_change_7D = {$gt: 1.0};
                break;
        }
    }


    return filter
}

module.exports = list;
