'use strict';

const mongoose = require('mongoose');
const config = require('config');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const signIn = function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) return next(boom.notFound("User not Found"));
        if (bcrypt.compareSync(req.body.password,  user.password)) {
            const token = jwt.sign({id: user._id}, config.secretKey, {expiresIn: '2h'});
            res.json({ status:"success", message: "You logged success", jwt: token });
        } else {
            return next(boom.badRequest("Invalid credentials"));
        }
    });
};

module.exports = signIn;
