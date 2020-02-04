'use strict';

const mongoose = require('mongoose');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const boom = require('@hapi/boom');

const addToFav = function (req, res, next) {
    User.findById(req.currentUser._id, function (err, user) {
        if (err) return next(boom.internal(err));
        user.favorites.push(req.params.id);
        user.save();
        res.json({message: 'Favorites updated', user: user});
    });
};

module.exports = addToFav;
