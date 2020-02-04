'use strict';

const mongoose = require('mongoose');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const boom = require('@hapi/boom');

const isInFav = function (req, res, next) {
    User.findById(req.currentUser._id, function (err, user) {
       if (err) return next(boom.internal(err));
       // Check if the crypto is already in the fav list from the user
       let response = user.favorites.indexOf(req.params.id) !== -1;
       res.json({isInFav: response});
    });
};

module.exports = isInFav;
