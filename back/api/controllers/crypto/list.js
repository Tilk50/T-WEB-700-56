'use strict';

const mongoose = require('mongoose');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const list = function (req, res, next) {
  Crypto.find(function (err, cryptoList) {
     if (err) return next(boom.internal("no data aviable"));
     res.json({status: "success", list: cryptoList});
  });
};

module.exports = list;
