'use strict';

const mongoose = require('mongoose');
const config = require('../../config/default');
const boom = require("@hapi/boom");
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('User', userSchema);
const jwt = require('jsonwebtoken');

const authenticator = {
  isAuthenticated: function (req, res, next) {
      let token = req.headers.authorization.replace('Bearer ', '');
        jwt.verify(token, config.secretKey, function (err, decoded) {
           if (err) {
               return next(boom.forbidden("Invalid token"))
           } else {
               User.findById(decoded.id, "-password", function (err, user) {
                    if (err) return next(boom.badRequest("User not found"));
                    req.currentUser = user;
                    next();
               });
           }
        });
  },

  isAdmin: function (req, res, next) {
        if(!req.currentUser.admin) {
          return next(boom.forbidden("Permission denied"));
        } else {
        next();
    }
  }
};

module.exports = authenticator;
