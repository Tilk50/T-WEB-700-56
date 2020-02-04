'use strict';

const mongoose = require('mongoose');
const userSchema = require ('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const boom = require('@hapi/boom');

const removeToFav = function (req, res, next) {
    User.findById(req.currentUser._id, function (err, user) {
       if (err) return next (boom.internal(err));
       let index = user.favorites.indexOf(req.params.id);
       if (index != -1) {
           user.favorites.splice(index, 1);
           user.save();
       }
       res.json({message: 'Remove successful'});
    });
};

module.exports = removeToFav;
