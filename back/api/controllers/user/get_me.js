'use strict';
const mongoose = require('mongoose');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const cryptoSchema = require('../../schemas/CryptoSchema');
const Crypto = new mongoose.model('crypto', cryptoSchema);
const boom = require('@hapi/boom');

const getMe = function (req, res, next) {
    User.findById(req.currentUser._id)
        .select('-password')
        .exec(function (err, user) {
           let response = {};
           response.email = user.email;
           getFavs(user.favorites).then((favList) => {
              let mappedFavs = favList.map(elem => {
                  return (
                      {
                          id: elem._id,
                          name: elem.name,
                          price: elem.price
                      }
                  );
              });
              response.favorites = mappedFavs;
               res.json({user: response});
           });
        });
};

const getFavs = function (listFav) {
  return new Promise((resolve, rejected) => {
     let favs = [];
     listFav.forEach((cryptoId) => {
        favs.push(
            Crypto.findById(cryptoId, function (err, crypto) {
              if (err) resolve(boom.internal(err));
            }).exec());
     });
     let responses = Promise.all(favs);
     resolve(responses);
  });
};

module.exports = getMe;
