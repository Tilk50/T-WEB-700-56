'use strict';
const mongoose = require('mongoose');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const hideCrypto = function (req, res, next) {
    // Get the crypto
    Crypto.findOne({_id: req.params.id}, function (err, crypto) {
       if (err || crypto == null) return next(boom.notFound("Crypto not found"));
       crypto.show_in_list = ! crypto.show_in_list;
       crypto.save();
    });
    res.json({message: "ok boomer"});
};

module.exports = hideCrypto;
