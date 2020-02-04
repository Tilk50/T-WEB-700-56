'use strict';

const mongoose = require('mongoose');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const boom = require('@hapi/boom');


const deleteUser = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if(err) {
            return next(boom.internal(err));
        }
        user.delete();
        res.json({message: "user deleted"});
    });
};

module.exports = deleteUser;
