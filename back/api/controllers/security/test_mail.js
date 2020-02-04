'use strict';

const mongoose = require('mongoose');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('User', userSchema);

const testMail = function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
       if (user !== null) {
           res.json({ status:"Error", message: "This mail address is already used"});
       } else {
           res.json({ status:"Success", message: "You can use this mail address"});
       }
    });
};

module.exports = testMail;

