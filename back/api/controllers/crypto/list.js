'use strict';

const mongoose = require('mongoose');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const list = function (req, res, next) {
    let count = 0;
    let filter = buildFilter(JSON.parse(req.query.filter));
    // This query is used to get the
    Crypto.find(
        filter
    ).exec(function (err, result) {
        if (err) return next(boom.internal("no data aviable"));
       count = result.length;
    });

    // This query is used to return data
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
          res.json({list: result, totalRow: count});
      });
};

function buildFilter(queryFilter) {
    let filter = {};
    if(typeof queryFilter.name !== 'undefined' && queryFilter.name !== '') {
      filter.name = new RegExp(queryFilter.name, 'i');
    }

    if (typeof queryFilter.symbol !== 'undefined' && queryFilter.symbol !== '') {
      filter.symbol = new RegExp(queryFilter.symbol, 'i');
    }

    if (typeof queryFilter.show_in_list !== "undefined" && queryFilter.show_in_list) {
        filter.show_in_list = true;
    }
    return filter
}

module.exports = list;
