'use strict';
const mongoose = require('mongoose');
const userSchema = require ('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const getFavs = function (req, res, next) {
    User.findById(req.currentUser._id, function (err, user) {
        if (err) return next(boom.internal(err));
        // Get the fav list from the user
        let favList = user.favorites;
        getCrypto(favList).then((cryptoList) => {
           res.json({list: cryptoList});
        });
    });
};

const getCrypto = function (listFav) {
    return new Promise((resolve, rejected) => {
       let response = [];
       listFav.forEach((cryptoId) => {
          // Get the crypto by the id
           response.push(
               Crypto.findById(cryptoId, function (err, crypto) {
                    if (err) resolve(boom.internal(err));
               }).exec());
       });
       let responses = Promise.all(response);
       resolve(responses);
    });
};

module.exports = getFavs;
