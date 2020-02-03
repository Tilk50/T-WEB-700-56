'use strict';
const mongoose = require('mongoose');
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const getCrypto = function (req, res, next) {
    Crypto.findById(req.params.id, function (err, crypto) {
        if (err) return next(boom.internal('Internal server erreur', err));
        res.json({crypto: crypto});
    });
};

module.exports = getCrypto;
