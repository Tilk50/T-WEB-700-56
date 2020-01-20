'use strict';

const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('User', userSchema);

const signUp = function(req, res, next) {
    if (req.body.user.password !== req.body.user.confirmPassword) {
        return next(boom.badRequest("Password and confirm password aren't the same"));
    } else {
        User.create({
            email: req.body.user.email,
            password: req.body.password
        }, function (err, user) {
            if (err) return next(boom.badRequest(err));
           res.json({
               status: "success",
               message: `User ${user.email} have been created`
           }) ;
        });
    }
};

module.exports = signUp;
